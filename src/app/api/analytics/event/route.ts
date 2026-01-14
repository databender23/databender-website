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
import { sendSlackAlert, shouldAlertForScore } from "@/lib/notifications/slack";

// Track which sessions have already received alerts to avoid duplicates
// Also cache geo data so it's available for non-pageview events
const alertedSessions = new Map<string, {
  leadTier?: string;
  companyAlerted?: boolean;
  geoData?: { country?: string; region?: string; city?: string };
}>();

// Clean up old entries periodically (simple in-memory cache)
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [key, value] of alertedSessions.entries()) {
    // Remove entries (we don't track timestamp, so just limit size)
    if (alertedSessions.size > 10000) {
      alertedSessions.delete(key);
    }
  }
}, 60 * 60 * 1000);

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

interface ReferrerInfo {
  source: string;
  medium: string;
  category: "search" | "ai-search" | "social" | "email" | "referral" | "direct" | "unknown";
  displayName: string;
}

function parseReferrerSource(referrer: string | undefined, utm?: { source?: string; medium?: string }): ReferrerInfo {
  // If we have UTM params, they take precedence
  if (utm?.source) {
    const medium = utm.medium || "campaign";
    let category: ReferrerInfo["category"] = "referral";

    // Categorize based on UTM medium
    if (medium === "social" || ["linkedin", "twitter", "facebook"].includes(utm.source.toLowerCase())) {
      category = "social";
    } else if (medium === "email" || medium === "newsletter") {
      category = "email";
    } else if (medium === "cpc" || medium === "paid") {
      category = "search"; // Paid search
    }

    return {
      source: utm.source.toLowerCase(),
      medium,
      category,
      displayName: `${utm.source}${utm.medium ? ` (${utm.medium})` : ""}`,
    };
  }

  if (!referrer) {
    return { source: "direct", medium: "none", category: "direct", displayName: "Direct" };
  }

  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();

    // AI Search Engines (growing category!)
    if (hostname.includes("perplexity")) {
      return { source: "perplexity", medium: "ai-search", category: "ai-search", displayName: "Perplexity AI" };
    }
    if (hostname.includes("you.com")) {
      return { source: "you.com", medium: "ai-search", category: "ai-search", displayName: "You.com" };
    }
    if (hostname.includes("phind")) {
      return { source: "phind", medium: "ai-search", category: "ai-search", displayName: "Phind" };
    }
    if (hostname.includes("kagi")) {
      return { source: "kagi", medium: "ai-search", category: "ai-search", displayName: "Kagi" };
    }
    if (hostname.includes("chat.openai") || hostname.includes("chatgpt")) {
      return { source: "chatgpt", medium: "ai-search", category: "ai-search", displayName: "ChatGPT" };
    }
    if (hostname.includes("claude.ai") || hostname.includes("anthropic")) {
      return { source: "claude", medium: "ai-search", category: "ai-search", displayName: "Claude" };
    }
    if (hostname.includes("gemini.google") || hostname.includes("bard.google")) {
      return { source: "gemini", medium: "ai-search", category: "ai-search", displayName: "Google Gemini" };
    }
    if (hostname.includes("copilot.microsoft")) {
      return { source: "copilot", medium: "ai-search", category: "ai-search", displayName: "Microsoft Copilot" };
    }

    // Traditional Search Engines
    if (hostname.includes("google")) {
      return { source: "google", medium: "organic", category: "search", displayName: "Google" };
    }
    if (hostname.includes("bing")) {
      return { source: "bing", medium: "organic", category: "search", displayName: "Bing" };
    }
    if (hostname.includes("duckduckgo")) {
      return { source: "duckduckgo", medium: "organic", category: "search", displayName: "DuckDuckGo" };
    }
    if (hostname.includes("yahoo")) {
      return { source: "yahoo", medium: "organic", category: "search", displayName: "Yahoo" };
    }
    if (hostname.includes("ecosia")) {
      return { source: "ecosia", medium: "organic", category: "search", displayName: "Ecosia" };
    }
    if (hostname.includes("brave")) {
      return { source: "brave", medium: "organic", category: "search", displayName: "Brave Search" };
    }

    // Social Media
    if (hostname.includes("linkedin")) {
      return { source: "linkedin", medium: "social", category: "social", displayName: "LinkedIn" };
    }
    if (hostname.includes("facebook") || hostname.includes("fb.com") || hostname.includes("fb.me")) {
      return { source: "facebook", medium: "social", category: "social", displayName: "Facebook" };
    }
    if (hostname.includes("twitter") || hostname.includes("t.co") || hostname.includes("x.com")) {
      return { source: "twitter", medium: "social", category: "social", displayName: "X (Twitter)" };
    }
    if (hostname.includes("instagram")) {
      return { source: "instagram", medium: "social", category: "social", displayName: "Instagram" };
    }
    if (hostname.includes("youtube")) {
      return { source: "youtube", medium: "social", category: "social", displayName: "YouTube" };
    }
    if (hostname.includes("reddit")) {
      return { source: "reddit", medium: "social", category: "social", displayName: "Reddit" };
    }
    if (hostname.includes("tiktok")) {
      return { source: "tiktok", medium: "social", category: "social", displayName: "TikTok" };
    }
    if (hostname.includes("threads.net")) {
      return { source: "threads", medium: "social", category: "social", displayName: "Threads" };
    }

    // Email clients (webmail)
    if (hostname.includes("mail.google") || hostname.includes("gmail")) {
      return { source: "gmail", medium: "email", category: "email", displayName: "Gmail" };
    }
    if (hostname.includes("outlook") || hostname.includes("mail.live") || hostname.includes("hotmail")) {
      return { source: "outlook", medium: "email", category: "email", displayName: "Outlook" };
    }
    if (hostname.includes("mail.yahoo")) {
      return { source: "yahoo-mail", medium: "email", category: "email", displayName: "Yahoo Mail" };
    }

    // Professional/Industry sites
    if (hostname.includes("clutch.co")) {
      return { source: "clutch", medium: "referral", category: "referral", displayName: "Clutch.co" };
    }
    if (hostname.includes("g2.com") || hostname.includes("g2crowd")) {
      return { source: "g2", medium: "referral", category: "referral", displayName: "G2" };
    }
    if (hostname.includes("capterra")) {
      return { source: "capterra", medium: "referral", category: "referral", displayName: "Capterra" };
    }

    // Generic referral - extract clean domain name
    const domainParts = hostname.replace("www.", "").split(".");
    const cleanDomain = domainParts.length >= 2
      ? `${domainParts[domainParts.length - 2]}.${domainParts[domainParts.length - 1]}`
      : hostname;

    return {
      source: cleanDomain,
      medium: "referral",
      category: "referral",
      displayName: cleanDomain
    };
  } catch {
    return { source: "unknown", medium: "unknown", category: "unknown", displayName: "Unknown" };
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
    const { event, visitorId, sessionId, device, isReturning, leadScore: clientLeadScore, pagesVisited, pageJourney, visitCount, sessionStartTime, entryPage, firstTouch, firstVisitDate } = body as {
      event: AnalyticsEvent;
      visitorId: string;
      sessionId: string;
      device: "desktop" | "mobile" | "tablet";
      isReturning?: boolean;
      leadScore?: number;
      pagesVisited?: string[];
      pageJourney?: PageJourneyStep[];
      visitCount?: number;
      sessionStartTime?: string;
      entryPage?: string;
      firstTouch?: {
        source: string;
        medium: string;
        landingPage: string;
        timestamp: string;
        referrer?: string;
        utmCampaign?: string;
        utmSource?: string;
      } | null;
      firstVisitDate?: string | null;
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

    // Parse referrer source with enhanced detection
    const referrerInfo = parseReferrerSource(event.referrer, event.utm);
    const { source: referrerSource, medium: referrerMedium, category: referrerCategory, displayName: referrerDisplayName } = referrerInfo;

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

    // Send Slack notifications (fire-and-forget, don't block response)
    // Only send for non-bot traffic with meaningful engagement
    // Skip admin pages - these aren't real leads
    const isAdminPage = event.page?.startsWith("/admin");
    if (!botDetected && !isAdminPage) {
      const sessionAlerts = alertedSessions.get(sessionId) || {};
      const pageCount = pagesVisited?.length || 1;

      // Cache geo data when we have it (from pageview events)
      // so it's available for non-pageview events that trigger alerts
      if (geoData.country || geoData.city || geoData.region) {
        sessionAlerts.geoData = geoData;
      }
      // Use cached geo data if current geoData is empty
      const alertGeoData = (geoData.country || geoData.city || geoData.region)
        ? geoData
        : (sessionAlerts.geoData || {});
      const hasChatInteraction = event.eventType === "chat_open" || event.eventType === "chat_message";
      const hasMultiPageEngagement = pageCount >= 2;

      // Only send lead alerts for engaged visitors (2+ pages or chatbot interaction)
      const { shouldAlert, tier } = shouldAlertForScore(currentLeadScore);
      if (shouldAlert && tier && sessionAlerts.leadTier !== tier && (hasMultiPageEngagement || hasChatInteraction)) {
        // Only alert if tier upgraded (not on every event at same tier)
        const tierOrder = { "Warm": 1, "Hot": 2, "Very Hot": 3 };
        const currentTierOrder = tierOrder[tier] || 0;
        const previousTierOrder = sessionAlerts.leadTier ? tierOrder[sessionAlerts.leadTier as keyof typeof tierOrder] || 0 : 0;

        if (currentTierOrder > previousTierOrder) {
          // Calculate session duration if we have start time
          let sessionDuration: number | undefined;
          if (sessionStartTime) {
            sessionDuration = Math.floor((Date.now() - new Date(sessionStartTime).getTime()) / 1000);
          }

          sendSlackAlert({
            type: "lead",
            score: currentLeadScore,
            tier,
            visitorId,
            sessionId,
            currentPage: event.page,
            pagesViewed: pagesVisited || [event.page],
            company: companyData?.name,
            country: alertGeoData.country,
            city: alertGeoData.city,
            region: alertGeoData.region,
            device,
            isReturning,
            visitCount,
            referrerSource,
            referrerCategory,
            referrerDisplayName,
            utmCampaign: event.utm?.campaign,
            utmSource: event.utm?.source,
            sessionDuration,
            entryPage,
            firstTouch,
            firstVisitDate,
          }).catch(() => {}); // Ignore errors, don't affect main flow

          sessionAlerts.leadTier = tier;
        }
      }

      // Send company identification alert only for engaged visitors (2+ pages)
      if (companyData && !sessionAlerts.companyAlerted && hasMultiPageEngagement) {
        sendSlackAlert({
          type: "company",
          companyName: companyData.name,
          companyDomain: companyData.domain,
          visitorId,
          currentPage: event.page,
          pagesViewed: pagesVisited || [event.page],
          leadScore: currentLeadScore,
          leadTier,
          country: alertGeoData.country,
        }).catch(() => {}); // Ignore errors

        sessionAlerts.companyAlerted = true;
      }

      // Always send conversion alerts (form submissions, chat leads)
      if (event.eventType === "form_submit" || event.eventType === "chat_lead_detected") {
        const conversionType = event.eventType === "chat_lead_detected"
          ? "chat_lead"
          : (event.data?.formName as string) || "form";

        sendSlackAlert({
          type: "conversion",
          conversionType,
          visitorId,
          page: event.page,
          leadScore: currentLeadScore,
          company: companyData?.name,
          journeyLength: pageJourney?.length,
        }).catch(() => {}); // Ignore errors
      }

      alertedSessions.set(sessionId, sessionAlerts);
    }

    return NextResponse.json({ success: true, eventId: trackedEvent.eventId, leadScore: currentLeadScore, leadTier });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
