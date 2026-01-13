import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { trackEvent, updateSession, storeConversionPath } from "@/lib/analytics/dynamodb";
import type { AnalyticsEvent, TrackedEvent, PageJourneyStep, ConversionPath } from "@/lib/analytics/events";
import { lookupCompany, type CompanyInfo } from "@/lib/analytics/company-lookup";
import {
  calculateEventScore,
  getLeadTier,
  BEHAVIOR_SCORES,
} from "@/lib/analytics/lead-scoring";

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /scraper/i, /curl/i, /wget/i,
  /googlebot/i, /bingbot/i, /yandex/i, /baiduspider/i,
  /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i,
  /slackbot/i, /discordbot/i, /telegrambot/i,
  /applebot/i, /duckduckbot/i, /ia_archiver/i,
  /semrush/i, /ahrefs/i, /mj12bot/i, /dotbot/i,
  /headless/i, /phantom/i, /selenium/i, /puppeteer/i, /playwright/i,
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true;
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

function parseUserAgent(ua: string | null): { browser?: string; browserVersion?: string; os?: string; osVersion?: string } {
  if (!ua) return {};

  let browser: string | undefined;
  let browserVersion: string | undefined;
  let os: string | undefined;
  let osVersion: string | undefined;

  // Browser detection
  if (ua.includes("Firefox/")) {
    browser = "Firefox";
    browserVersion = ua.match(/Firefox\/([\d.]+)/)?.[1];
  } else if (ua.includes("Edg/")) {
    browser = "Edge";
    browserVersion = ua.match(/Edg\/([\d.]+)/)?.[1];
  } else if (ua.includes("Chrome/")) {
    browser = "Chrome";
    browserVersion = ua.match(/Chrome\/([\d.]+)/)?.[1];
  } else if (ua.includes("Safari/") && !ua.includes("Chrome")) {
    browser = "Safari";
    browserVersion = ua.match(/Version\/([\d.]+)/)?.[1];
  }

  // OS detection
  if (ua.includes("Windows NT")) {
    os = "Windows";
    const ntVersion = ua.match(/Windows NT ([\d.]+)/)?.[1];
    if (ntVersion === "10.0") osVersion = "10/11";
    else if (ntVersion === "6.3") osVersion = "8.1";
    else if (ntVersion === "6.1") osVersion = "7";
  } else if (ua.includes("Mac OS X")) {
    os = "macOS";
    osVersion = ua.match(/Mac OS X ([\d_]+)/)?.[1]?.replace(/_/g, ".");
  } else if (ua.includes("iPhone") || ua.includes("iPad")) {
    os = "iOS";
    osVersion = ua.match(/OS ([\d_]+)/)?.[1]?.replace(/_/g, ".");
  } else if (ua.includes("Android")) {
    os = "Android";
    osVersion = ua.match(/Android ([\d.]+)/)?.[1];
  } else if (ua.includes("Linux")) {
    os = "Linux";
  }

  return { browser, browserVersion, os, osVersion };
}

function parseReferrerSource(referrer: string | undefined): { source?: string; medium?: string } {
  if (!referrer) return { source: "direct", medium: "none" };

  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();

    if (hostname.includes("google")) return { source: "google", medium: "organic" };
    if (hostname.includes("bing")) return { source: "bing", medium: "organic" };
    if (hostname.includes("duckduckgo")) return { source: "duckduckgo", medium: "organic" };
    if (hostname.includes("facebook") || hostname.includes("fb.com")) return { source: "facebook", medium: "social" };
    if (hostname.includes("twitter") || hostname.includes("t.co")) return { source: "twitter", medium: "social" };
    if (hostname.includes("linkedin")) return { source: "linkedin", medium: "social" };
    if (hostname.includes("instagram")) return { source: "instagram", medium: "social" };
    if (hostname.includes("youtube")) return { source: "youtube", medium: "social" };
    if (hostname.includes("reddit")) return { source: "reddit", medium: "social" };

    return { source: hostname, medium: "referral" };
  } catch {
    return { source: "unknown", medium: "unknown" };
  }
}

async function getGeoLocation(ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  // Skip local/private IPs
  if (ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return {};
  }

  try {
    // Using ip-api.com (free tier: 45 requests/minute)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,regionName,city`, {
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) return {};
    const data = await response.json();
    return {
      country: data.country,
      region: data.regionName,
      city: data.city,
    };
  } catch {
    return {};
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, visitorId, sessionId, device, isReturning, leadScore: clientLeadScore, pagesVisited, pageJourney } = body as {
      event: AnalyticsEvent;
      visitorId: string;
      sessionId: string;
      device: "desktop" | "mobile" | "tablet";
      isReturning?: boolean;
      leadScore?: number;
      pagesVisited?: string[];
      pageJourney?: PageJourneyStep[];
    };

    if (!event || !visitorId || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || undefined;
    const timestamp = new Date().toISOString();

    // Get client IP (handles various proxy headers)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || undefined;

    // Parse user agent
    const { browser, browserVersion, os, osVersion } = parseUserAgent(userAgent || null);

    // Check if bot
    const botDetected = isBot(userAgent || null);

    // Get geolocation (only for pageviews to limit API calls)
    let geoData: { country?: string; region?: string; city?: string } = {};
    if (event.eventType === "pageview" && ip && !botDetected) {
      geoData = await getGeoLocation(ip);
    }

    // Attempt company identification from IP (only for pageviews, non-bots)
    let companyData: CompanyInfo | null = null;
    if (event.eventType === "pageview" && ip && !botDetected) {
      try {
        companyData = await lookupCompany(ip);
      } catch {
        // Company lookup failed - continue without company data
        // This is expected for most residential/mobile IPs
      }
    }

    const trackedEvent: TrackedEvent = {
      eventId: uuidv4(),
      visitorId,
      sessionId,
      timestamp,
      userAgent,
      ip,
      isBot: botDetected,
      browser,
      browserVersion,
      os,
      osVersion,
      ...geoData,
      ...(companyData && {
        companyName: companyData.name,
        companyDomain: companyData.domain,
        companyIndustry: companyData.industry,
      }),
      ...event,
    };

    // Track the event
    await trackEvent(trackedEvent);

    // Parse referrer source
    const { source: referrerSource, medium: referrerMedium } = parseReferrerSource(event.referrer);

    // Calculate lead score for this event
    const eventScore = calculateEventScore(event.eventType, event.page, event.data);

    // Use client-provided cumulative score if available, otherwise calculate from event
    // Note: Returning visitor bonus is added on the client side
    const currentLeadScore = (clientLeadScore || 0) + eventScore;
    const leadTier = getLeadTier(currentLeadScore);

    // Update session info for pageviews
    if (event.eventType === "pageview") {
      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1,
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: false,
        country: geoData.country,
        region: geoData.region,
        referrerSource,
        referrerMedium,
        isReturning: isReturning || false,
        browser,
        os,
        // Lead scoring data
        leadScore: currentLeadScore,
        leadTier,
        pagesVisited: pagesVisited || [event.page],
        // Include company data in session for easier querying
        ...(companyData && {
          companyName: companyData.name,
          companyDomain: companyData.domain,
          companyIndustry: companyData.industry,
        }),
      });
    }

    // Update exit page and scroll depth for page exits
    if (event.eventType === "page_exit") {
      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1,
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: false,
        duration: event.timeOnPage,
        maxScrollDepth: event.data?.maxScrollDepth as number,
        // Update lead score on exit
        leadScore: currentLeadScore,
        leadTier,
        pagesVisited: pagesVisited || [],
      });
    }

    // Update lead score for behavioral events (scroll, chat, etc.)
    if (["scroll_depth", "chat_open", "chat_message"].includes(event.eventType)) {
      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1,
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: false,
        leadScore: currentLeadScore,
        leadTier,
        pagesVisited: pagesVisited || [],
      });
    }

    // Mark conversion for form submissions and chat leads
    if (event.eventType === "form_submit" || event.eventType === "chat_lead_detected") {
      const conversionType = event.eventType === "chat_lead_detected"
        ? "chat_lead"
        : (event.data?.formName as string) || "form";

      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1,
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: true,
        conversionType,
        // Include final lead score on conversion
        leadScore: currentLeadScore,
        leadTier,
        pagesVisited: pagesVisited || [],
      });

      // Store conversion path for attribution analysis
      if (pageJourney && pageJourney.length > 0) {
        const journey = pageJourney;
        const firstTouchPage = journey[0].page;
        const lastTouchPage = journey.length > 1 ? journey[journey.length - 1].page : firstTouchPage;

        const conversionPath: ConversionPath = {
          conversionId: uuidv4(),
          visitorId,
          sessionId,
          conversionType,
          conversionPage: event.page,
          timestamp,
          pageJourney: journey,
          journeyLength: journey.length,
          firstTouchPage,
          lastTouchPage,
          device,
          country: geoData.country,
          referrerSource,
          referrerMedium,
          utm: event.utm,
        };

        try {
          await storeConversionPath(conversionPath);
        } catch (conversionPathError) {
          // Log but don't fail the request if conversion path storage fails
          console.error("Failed to store conversion path:", conversionPathError);
        }
      }
    }

    return NextResponse.json({ success: true, eventId: trackedEvent.eventId, leadScore: currentLeadScore, leadTier });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
