"use client";

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getVisitorId,
  getSessionId,
  getDeviceType,
  markConversion,
  isReturningVisitor,
  getVisitCount,
  addPageToSessionJourney,
  getSessionJourney,
  setFirstTouchAttribution,
  getFirstTouchAttribution,
  getFirstVisitDate,
  type FirstTouchAttribution,
} from "./visitor-id";
import type { AnalyticsEvent, EventType, UTMParams, PageJourneyStep } from "./events";
import {
  calculateEventScore,
  getLeadTier,
  BEHAVIOR_SCORES,
  type LeadTier,
} from "./lead-scoring";

interface AnalyticsContextValue {
  trackEvent: (eventType: EventType, data?: Record<string, string | number | boolean>) => void;
  trackClick: (elementId: string, elementText?: string) => void;
  trackFormSubmit: (formName: string, success: boolean) => void;
  trackChatOpen: () => void;
  trackChatMessage: () => void;
  trackChatLead: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

function getUTMParams(): UTMParams | undefined {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};
  if (params.get("utm_source")) utm.source = params.get("utm_source")!;
  if (params.get("utm_medium")) utm.medium = params.get("utm_medium")!;
  if (params.get("utm_campaign")) utm.campaign = params.get("utm_campaign")!;
  if (params.get("utm_term")) utm.term = params.get("utm_term")!;
  if (params.get("utm_content")) utm.content = params.get("utm_content")!;
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function getScreenData() {
  if (typeof window === "undefined") return {};
  return {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
}

interface SendEventOptions {
  event: AnalyticsEvent;
  visitorId: string;
  sessionId: string;
  device: string;
  isReturning: boolean;
  pageJourney?: PageJourneyStep[];
  leadScore?: number;
  pagesVisited?: string[];
  visitCount?: number;
  sessionStartTime?: string;
  entryPage?: string;
  firstTouch?: FirstTouchAttribution | null;
  firstVisitDate?: string | null;
}

async function sendEvent(options: SendEventOptions) {
  const { event, visitorId, sessionId, device, isReturning, pageJourney, leadScore, pagesVisited, visitCount, sessionStartTime, entryPage, firstTouch, firstVisitDate } = options;
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        visitorId,
        sessionId,
        device,
        isReturning,
        ...(pageJourney && { pageJourney }),
        ...(leadScore !== undefined && { leadScore }),
        ...(pagesVisited && { pagesVisited }),
        ...(visitCount !== undefined && { visitCount }),
        ...(sessionStartTime && { sessionStartTime }),
        ...(entryPage && { entryPage }),
        ...(firstTouch && { firstTouch }),
        ...(firstVisitDate && { firstVisitDate }),
      }),
    });
  } catch (error) {
    console.error("Failed to send analytics event:", error);
  }
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lastPathRef = useRef<string>("");
  const scrollDepthsRef = useRef<Set<number>>(new Set());
  const maxScrollDepthRef = useRef<number>(0);
  const visitorIdRef = useRef<string>("");
  const sessionIdRef = useRef<string>("");
  const deviceRef = useRef<string>("desktop");
  const isReturningRef = useRef<boolean>(false);
  const pageEntryTimeRef = useRef<number>(0);
  const utmParamsRef = useRef<UTMParams | undefined>(undefined);

  // Lead scoring refs
  const leadScoreRef = useRef<number>(0);
  const pagesVisitedRef = useRef<string[]>([]);

  // Session tracking refs
  const visitCountRef = useRef<number>(1);
  const sessionStartTimeRef = useRef<string>("");
  const entryPageRef = useRef<string>("");

  // First-touch attribution refs
  const firstTouchRef = useRef<FirstTouchAttribution | null>(null);
  const firstVisitDateRef = useRef<string | null>(null);

  // Initialize IDs on mount
  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    sessionIdRef.current = getSessionId();
    deviceRef.current = getDeviceType();
    isReturningRef.current = isReturningVisitor();
    visitCountRef.current = getVisitCount();
    sessionStartTimeRef.current = new Date().toISOString();
    utmParamsRef.current = getUTMParams();

    // Get existing first-touch attribution or set it on first visit
    const existingFirstTouch = getFirstTouchAttribution();
    if (existingFirstTouch) {
      firstTouchRef.current = existingFirstTouch;
    } else {
      // First visit - capture how they discovered the site
      const referrer = typeof document !== "undefined" ? document.referrer : "";
      const utm = utmParamsRef.current;
      const landingPage = typeof window !== "undefined" ? window.location.pathname : "/";

      // Determine source and medium from referrer or UTM
      let source = "direct";
      let medium = "none";

      if (utm?.source) {
        source = utm.source;
        medium = utm.medium || "unknown";
      } else if (referrer) {
        try {
          const refUrl = new URL(referrer);
          source = refUrl.hostname.replace("www.", "");
          // Infer medium from common sources
          if (refUrl.hostname.includes("google") || refUrl.hostname.includes("bing") || refUrl.hostname.includes("duckduckgo")) {
            medium = "organic";
          } else if (refUrl.hostname.includes("linkedin") || refUrl.hostname.includes("twitter") || refUrl.hostname.includes("facebook")) {
            medium = "social";
          } else if (refUrl.hostname.includes("perplexity") || refUrl.hostname.includes("chat.openai") || refUrl.hostname.includes("claude.ai")) {
            medium = "ai-search";
          } else {
            medium = "referral";
          }
        } catch {
          source = referrer;
          medium = "referral";
        }
      }

      const newFirstTouch: FirstTouchAttribution = {
        source,
        medium,
        landingPage,
        timestamp: new Date().toISOString(),
        referrer: referrer || undefined,
        utmCampaign: utm?.campaign,
        utmSource: utm?.source,
      };

      setFirstTouchAttribution(newFirstTouch);
      firstTouchRef.current = newFirstTouch;
    }
    firstVisitDateRef.current = getFirstVisitDate();

    // Initialize lead score with returning visitor bonus
    if (isReturningRef.current) {
      leadScoreRef.current = BEHAVIOR_SCORES.RETURNING_VISITOR;
    }
  }, []);

  // Track page exit on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!lastPathRef.current || pageEntryTimeRef.current === 0) return;
      const timeOnPage = Math.round((Date.now() - pageEntryTimeRef.current) / 1000);

      // Use sendBeacon for reliable exit tracking (includes lead score data)
      const payload = JSON.stringify({
        event: {
          eventType: "page_exit",
          page: lastPathRef.current,
          timeOnPage,
          data: { maxScrollDepth: maxScrollDepthRef.current },
        },
        visitorId: visitorIdRef.current,
        sessionId: sessionIdRef.current,
        device: deviceRef.current,
        isReturning: isReturningRef.current,
        leadScore: leadScoreRef.current,
        pagesVisited: pagesVisitedRef.current,
      });
      navigator.sendBeacon("/api/analytics/event", payload);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!pathname || pathname === lastPathRef.current) return;

    // Send page_exit for previous page
    if (lastPathRef.current && pageEntryTimeRef.current > 0) {
      const timeOnPage = Math.round((Date.now() - pageEntryTimeRef.current) / 1000);
      const exitEvent: AnalyticsEvent = {
        eventType: "page_exit",
        page: lastPathRef.current,
        timeOnPage,
        data: { maxScrollDepth: maxScrollDepthRef.current },
      };
      sendEvent({
        event: exitEvent,
        visitorId: visitorIdRef.current,
        sessionId: sessionIdRef.current,
        device: deviceRef.current,
        isReturning: isReturningRef.current,
        leadScore: leadScoreRef.current,
        pagesVisited: pagesVisitedRef.current,
      });
    }

    // Reset for new page
    lastPathRef.current = pathname;
    scrollDepthsRef.current = new Set();
    maxScrollDepthRef.current = 0;
    pageEntryTimeRef.current = Date.now();

    // Add page to session journey for attribution tracking
    const referrer = typeof document !== "undefined" ? document.referrer : undefined;
    addPageToSessionJourney(pathname, referrer);

    // Set entry page on first pageview of session
    if (!entryPageRef.current) {
      entryPageRef.current = pathname;
    }

    // Track this page and update lead score
    if (!pagesVisitedRef.current.includes(pathname)) {
      pagesVisitedRef.current = [...pagesVisitedRef.current, pathname];
    }
    const pageScore = calculateEventScore("pageview", pathname);
    leadScoreRef.current += pageScore;

    const screenData = getScreenData();
    const event: AnalyticsEvent = {
      eventType: "pageview",
      page: pathname,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      ...screenData,
      utm: utmParamsRef.current,
      data: {
        title: typeof document !== "undefined" ? document.title : "",
      },
    };

    sendEvent({
      event,
      visitorId: visitorIdRef.current,
      sessionId: sessionIdRef.current,
      device: deviceRef.current,
      isReturning: isReturningRef.current,
      leadScore: leadScoreRef.current,
      pagesVisited: pagesVisitedRef.current,
      visitCount: visitCountRef.current,
      sessionStartTime: sessionStartTimeRef.current,
      entryPage: entryPageRef.current,
      firstTouch: firstTouchRef.current,
      firstVisitDate: firstVisitDateRef.current,
    });
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      maxScrollDepthRef.current = Math.max(maxScrollDepthRef.current, scrollPercent);
      const milestones = [25, 50, 75, 100];

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollDepthsRef.current.has(milestone)) {
          scrollDepthsRef.current.add(milestone);

          // Update lead score for scroll depth
          const scrollScore = calculateEventScore("scroll_depth", pathname, { depth: milestone });
          leadScoreRef.current += scrollScore;

          const event: AnalyticsEvent = {
            eventType: "scroll_depth",
            page: pathname,
            data: { depth: milestone },
          };

          sendEvent({
            event,
            visitorId: visitorIdRef.current,
            sessionId: sessionIdRef.current,
            device: deviceRef.current,
            isReturning: isReturningRef.current,
            leadScore: leadScoreRef.current,
            pagesVisited: pagesVisitedRef.current,
            visitCount: visitCountRef.current,
            sessionStartTime: sessionStartTimeRef.current,
            entryPage: entryPageRef.current,
            firstTouch: firstTouchRef.current,
            firstVisitDate: firstVisitDateRef.current,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const trackEvent = useCallback((eventType: EventType, data?: Record<string, string | number | boolean>) => {
    // Update lead score for this event type
    const eventScore = calculateEventScore(eventType, lastPathRef.current || pathname, data);
    leadScoreRef.current += eventScore;

    const event: AnalyticsEvent = {
      eventType,
      page: lastPathRef.current || pathname,
      data,
    };
    sendEvent({
      event,
      visitorId: visitorIdRef.current,
      sessionId: sessionIdRef.current,
      device: deviceRef.current,
      isReturning: isReturningRef.current,
      leadScore: leadScoreRef.current,
      pagesVisited: pagesVisitedRef.current,
      visitCount: visitCountRef.current,
      sessionStartTime: sessionStartTimeRef.current,
      entryPage: entryPageRef.current,
      firstTouch: firstTouchRef.current,
      firstVisitDate: firstVisitDateRef.current,
    });
  }, [pathname]);

  const trackClick = useCallback((elementId: string, elementText?: string) => {
    trackEvent("click", { elementId, elementText: elementText || "" });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    // Update lead score for form submit
    const eventScore = calculateEventScore("form_submit", lastPathRef.current || pathname, { formName, success });
    leadScoreRef.current += eventScore;

    const event: AnalyticsEvent = {
      eventType: "form_submit",
      page: lastPathRef.current || pathname,
      data: { formName, success },
    };

    // Include page journey for successful form submissions (conversions)
    sendEvent({
      event,
      visitorId: visitorIdRef.current,
      sessionId: sessionIdRef.current,
      device: deviceRef.current,
      isReturning: isReturningRef.current,
      leadScore: leadScoreRef.current,
      pagesVisited: pagesVisitedRef.current,
      visitCount: visitCountRef.current,
      sessionStartTime: sessionStartTimeRef.current,
      entryPage: entryPageRef.current,
      pageJourney: success ? getSessionJourney() : undefined,
      firstTouch: firstTouchRef.current,
      firstVisitDate: firstVisitDateRef.current,
    });

    if (success) {
      markConversion(formName);
    }
  }, [pathname]);

  const trackChatOpen = useCallback(() => {
    trackEvent("chat_open");
  }, [trackEvent]);

  const trackChatMessage = useCallback(() => {
    trackEvent("chat_message");
  }, [trackEvent]);

  const trackChatLead = useCallback(() => {
    // Update lead score for chat lead
    const eventScore = calculateEventScore("chat_lead_detected", lastPathRef.current || pathname);
    leadScoreRef.current += eventScore;

    const event: AnalyticsEvent = {
      eventType: "chat_lead_detected",
      page: lastPathRef.current || pathname,
    };

    // Include page journey for chat lead conversions
    sendEvent({
      event,
      visitorId: visitorIdRef.current,
      sessionId: sessionIdRef.current,
      device: deviceRef.current,
      isReturning: isReturningRef.current,
      leadScore: leadScoreRef.current,
      pagesVisited: pagesVisitedRef.current,
      visitCount: visitCountRef.current,
      sessionStartTime: sessionStartTimeRef.current,
      entryPage: entryPageRef.current,
      pageJourney: getSessionJourney(),
      firstTouch: firstTouchRef.current,
      firstVisitDate: firstVisitDateRef.current,
    });

    markConversion("chat_lead");
  }, [pathname]);

  return (
    <AnalyticsContext.Provider
      value={{
        trackEvent,
        trackClick,
        trackFormSubmit,
        trackChatOpen,
        trackChatMessage,
        trackChatLead,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics(): AnalyticsContextValue {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
}
