"use client";

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
  isExcludedVisitor,
  type FirstTouchAttribution,
} from "./visitor-id";
import type {
  AnalyticsEvent,
  EventType,
  UTMParams,
  PageJourneyStep,
  FormStartEventData,
  FormAbandonEventData,
  RageClickEventData,
  VideoPlayEventData,
  VideoProgressEventData,
  VideoCompleteEventData,
  CopyTextEventData,
  CopyElementType,
  VideoMilestone,
} from "./events";
import {
  calculateEventScore,
  BEHAVIOR_SCORES,
} from "./lead-scoring";

// ============================================
// Consent Check Helper
// ============================================
// Read consent directly from localStorage to avoid circular dependency with useConsent hook
function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    // Check for Global Privacy Control first
    // @ts-expect-error - GPC is not yet in TypeScript Navigator type
    if (navigator.globalPrivacyControl === true) return false;

    const stored = localStorage.getItem("databender_consent");
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

// ============================================
// Rage Click Detection Configuration
// ============================================
const RAGE_CLICK_THRESHOLD = 3; // Number of clicks to trigger rage click
const RAGE_CLICK_TIME_WINDOW = 750; // Milliseconds
const RAGE_CLICK_RADIUS = 50; // Pixels - clicks within this radius count

// ============================================
// Form Tracking State Interface
// ============================================
interface FormTrackingState {
  formName: string;
  startTime: number;
  fieldsCompleted: Set<string>;
  lastFieldFocused: string;
  totalFields: number;
}

interface AnalyticsContextValue {
  trackEvent: (eventType: EventType, data?: Record<string, string | number | boolean>) => void;
  trackClick: (elementId: string, elementText?: string) => void;
  trackFormSubmit: (formName: string, success: boolean) => void;
  trackChatOpen: () => void;
  trackChatMessage: () => void;
  trackChatLead: () => void;
  // New form interaction methods
  trackFormStart: (formName: string, firstFieldFocused: string) => void;
  trackFormAbandon: (formName: string, fieldsCompleted: number, totalFields: number, lastFieldFocused: string, timeSpent: number) => void;
  // Video tracking hook
  useVideoTracking: (videoId: string, videoTitle: string) => VideoTrackingHooks;
}

// ============================================
// Video Tracking Hook Interface
// ============================================
interface VideoTrackingHooks {
  onPlay: (duration: number) => void;
  onProgress: (currentTime: number, duration: number) => void;
  onComplete: (duration: number, watchTime: number) => void;
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

  // Exclusion tracking (for internal team members)
  const isExcludedRef = useRef<boolean>(false);

  // Form tracking refs
  const formStatesRef = useRef<Map<string, FormTrackingState>>(new Map());

  // Rage click detection refs
  const clickHistoryRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const rageClickDebouncedRef = useRef<boolean>(false);

  // Video milestone tracking refs (to avoid duplicate events)
  const videoMilestonesRef = useRef<Map<string, Set<VideoMilestone>>>(new Map());

  // Initialize IDs on mount
  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    sessionIdRef.current = getSessionId();
    deviceRef.current = getDeviceType();
    isReturningRef.current = isReturningVisitor();
    visitCountRef.current = getVisitCount();
    sessionStartTimeRef.current = new Date().toISOString();
    utmParamsRef.current = getUTMParams();

    // Check if this visitor should be excluded from analytics
    isExcludedRef.current = isExcludedVisitor(visitorIdRef.current);

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
      if (isExcludedRef.current) return; // Skip analytics for excluded visitors
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
    if (isExcludedRef.current) return; // Skip analytics for excluded visitors

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

  // Track scroll depth (requires analytics consent)
  useEffect(() => {
    const handleScroll = () => {
      if (isExcludedRef.current) return; // Skip analytics for excluded visitors
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent
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

  // ============================================
  // Rage Click Detection (requires analytics consent)
  // ============================================
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

      const now = Date.now();
      const x = e.clientX;
      const y = e.clientY;

      // Add current click to history
      clickHistoryRef.current.push({ x, y, timestamp: now });

      // Remove old clicks outside the time window
      clickHistoryRef.current = clickHistoryRef.current.filter(
        (click) => now - click.timestamp <= RAGE_CLICK_TIME_WINDOW
      );

      // Check for rage click: 3+ clicks in same area within time window
      if (clickHistoryRef.current.length >= RAGE_CLICK_THRESHOLD && !rageClickDebouncedRef.current) {
        // Check if clicks are within the radius
        const recentClicks = clickHistoryRef.current.slice(-RAGE_CLICK_THRESHOLD);
        const firstClick = recentClicks[0];
        const allWithinRadius = recentClicks.every((click) => {
          const dx = click.x - firstClick.x;
          const dy = click.y - firstClick.y;
          return Math.sqrt(dx * dx + dy * dy) <= RAGE_CLICK_RADIUS;
        });

        if (allWithinRadius) {
          // Debounce to avoid duplicate rage click events
          rageClickDebouncedRef.current = true;
          setTimeout(() => {
            rageClickDebouncedRef.current = false;
          }, 2000);

          // Get element info
          const target = e.target as HTMLElement;
          const elementTag = target.tagName.toLowerCase();
          const elementId = target.id ? `#${target.id}` : "";
          const elementClass = target.className && typeof target.className === "string"
            ? `.${target.className.split(" ").slice(0, 2).join(".")}`
            : "";
          const elementSelector = `${elementTag}${elementId}${elementClass}`;

          const rageClickData: RageClickEventData = {
            element: elementSelector,
            elementText: target.textContent?.slice(0, 50) || undefined,
            clickCount: clickHistoryRef.current.length,
            coordinates: { x: firstClick.x, y: firstClick.y },
            timeWindow: now - recentClicks[0].timestamp,
          };

          const event: AnalyticsEvent = {
            eventType: "rage_click",
            page: pathname,
            data: {
              element: rageClickData.element,
              elementText: rageClickData.elementText || "",
              clickCount: rageClickData.clickCount,
              x: rageClickData.coordinates.x,
              y: rageClickData.coordinates.y,
              timeWindow: rageClickData.timeWindow,
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
          });

          // Clear click history after rage click detected
          clickHistoryRef.current = [];
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  // ============================================
  // Copy Text Detection (requires analytics consent)
  // ============================================
  useEffect(() => {
    const handleCopy = () => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const selectedText = selection.toString();
      if (selectedText.length === 0) return;

      // Determine what type of content was copied based on ancestor elements
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer as HTMLElement;
      const element = container.nodeType === Node.TEXT_NODE
        ? container.parentElement
        : container;

      let elementType: CopyElementType = "general";
      let elementSelector = "";

      if (element) {
        // Check for pricing content
        const pricingSelectors = ["[data-pricing]", ".pricing", "#pricing", "[class*='price']"];
        for (const selector of pricingSelectors) {
          if (element.closest(selector)) {
            elementType = "pricing";
            break;
          }
        }

        // Check for features content
        if (elementType === "general") {
          const featureSelectors = ["[data-features]", ".features", "#features", "[class*='feature']"];
          for (const selector of featureSelectors) {
            if (element.closest(selector)) {
              elementType = "features";
              break;
            }
          }
        }

        // Check for testimonial content
        if (elementType === "general") {
          const testimonialSelectors = ["[data-testimonial]", ".testimonial", "[class*='testimonial']", "blockquote"];
          for (const selector of testimonialSelectors) {
            if (element.closest(selector)) {
              elementType = "testimonial";
              break;
            }
          }
        }

        // Check for contact content
        if (elementType === "general") {
          const contactSelectors = ["[data-contact]", ".contact", "#contact", "[class*='contact']", "address"];
          for (const selector of contactSelectors) {
            if (element.closest(selector)) {
              elementType = "contact";
              break;
            }
          }
        }

        // Build element selector for debugging
        const tag = element.tagName?.toLowerCase() || "";
        const id = element.id ? `#${element.id}` : "";
        const className = element.className && typeof element.className === "string"
          ? `.${element.className.split(" ").slice(0, 2).join(".")}`
          : "";
        elementSelector = `${tag}${id}${className}`;
      }

      const copyData: CopyTextEventData = {
        textLength: selectedText.length,
        element: elementType,
        elementSelector: elementSelector || undefined,
        textPreview: selectedText.slice(0, 100),
      };

      const event: AnalyticsEvent = {
        eventType: "copy_text",
        page: pathname,
        data: {
          textLength: copyData.textLength,
          element: copyData.element,
          elementSelector: copyData.elementSelector || "",
          textPreview: copyData.textPreview || "",
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
      });
    };

    document.addEventListener("copy", handleCopy);
    return () => document.removeEventListener("copy", handleCopy);
  }, [pathname]);

  // ============================================
  // Form Tracking - Abandonment Detection (requires analytics consent)
  // ============================================
  useEffect(() => {
    const handleFormAbandon = () => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

      // Check for partially completed forms on page exit
      formStatesRef.current.forEach((formState, formName) => {
        if (formState.fieldsCompleted.size > 0 && formState.fieldsCompleted.size < formState.totalFields) {
          const timeSpent = Date.now() - formState.startTime;
          const completionPercentage = Math.round((formState.fieldsCompleted.size / formState.totalFields) * 100);

          const abandonData: FormAbandonEventData = {
            formName,
            fieldsCompleted: formState.fieldsCompleted.size,
            totalFields: formState.totalFields,
            lastFieldFocused: formState.lastFieldFocused,
            timeSpent,
            completionPercentage,
          };

          // Use sendBeacon for reliable exit tracking
          const payload = JSON.stringify({
            event: {
              eventType: "form_abandon",
              page: pathname,
              data: {
                formName: abandonData.formName,
                fieldsCompleted: abandonData.fieldsCompleted,
                totalFields: abandonData.totalFields,
                lastFieldFocused: abandonData.lastFieldFocused,
                timeSpent: abandonData.timeSpent,
                completionPercentage: abandonData.completionPercentage,
              },
            },
            visitorId: visitorIdRef.current,
            sessionId: sessionIdRef.current,
            device: deviceRef.current,
            isReturning: isReturningRef.current,
            leadScore: leadScoreRef.current,
            pagesVisited: pagesVisitedRef.current,
          });
          navigator.sendBeacon("/api/analytics/event", payload);
        }
      });
    };

    window.addEventListener("beforeunload", handleFormAbandon);
    return () => window.removeEventListener("beforeunload", handleFormAbandon);
  }, [pathname]);

  const trackEvent = useCallback((eventType: EventType, data?: Record<string, string | number | boolean>) => {
    if (isExcludedRef.current) return; // Skip analytics for excluded visitors
    // Skip behavioral tracking events without consent (allow form_submit as it's conversion-related)
    const behavioralEvents: EventType[] = ["click", "scroll_depth", "rage_click", "copy_text", "form_start", "form_abandon", "video_play", "video_progress", "video_complete"];
    if (behavioralEvents.includes(eventType) && !hasAnalyticsConsent()) return;

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
    if (isExcludedRef.current) return; // Skip analytics for excluded visitors

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
    if (isExcludedRef.current) return; // Skip analytics for excluded visitors

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

  // ============================================
  // Form Interaction Tracking (requires analytics consent)
  // ============================================
  const trackFormStart = useCallback((formName: string, firstFieldFocused: string) => {
    if (isExcludedRef.current) return;
    if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

    // Only track if form hasn't been started yet
    if (formStatesRef.current.has(formName)) return;

    // Get total fields in form
    const form = document.querySelector(`form[name="${formName}"], form[data-form-name="${formName}"]`);
    const totalFields = form
      ? form.querySelectorAll("input:not([type='hidden']):not([type='submit']), textarea, select").length
      : 0;

    // Initialize form tracking state
    formStatesRef.current.set(formName, {
      formName,
      startTime: Date.now(),
      fieldsCompleted: new Set([firstFieldFocused]),
      lastFieldFocused: firstFieldFocused,
      totalFields,
    });

    const formStartData: FormStartEventData = {
      formName,
      firstFieldFocused,
    };

    const event: AnalyticsEvent = {
      eventType: "form_start",
      page: pathname,
      data: {
        formName: formStartData.formName,
        firstFieldFocused: formStartData.firstFieldFocused,
        totalFields,
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
    });
  }, [pathname]);

  const trackFormAbandon = useCallback((
    formName: string,
    fieldsCompleted: number,
    totalFields: number,
    lastFieldFocused: string,
    timeSpent: number
  ) => {
    if (isExcludedRef.current) return;
    if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

    const completionPercentage = Math.round((fieldsCompleted / totalFields) * 100);

    const abandonData: FormAbandonEventData = {
      formName,
      fieldsCompleted,
      totalFields,
      lastFieldFocused,
      timeSpent,
      completionPercentage,
    };

    const event: AnalyticsEvent = {
      eventType: "form_abandon",
      page: pathname,
      data: {
        formName: abandonData.formName,
        fieldsCompleted: abandonData.fieldsCompleted,
        totalFields: abandonData.totalFields,
        lastFieldFocused: abandonData.lastFieldFocused,
        timeSpent: abandonData.timeSpent,
        completionPercentage: abandonData.completionPercentage,
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
    });

    // Clear form state after abandon is tracked
    formStatesRef.current.delete(formName);
  }, [pathname]);

  // ============================================
  // Video Tracking Hook (requires analytics consent)
  // ============================================
  const useVideoTracking = useCallback((videoId: string, videoTitle: string): VideoTrackingHooks => {
    // Initialize milestone tracking for this video
    if (!videoMilestonesRef.current.has(videoId)) {
      videoMilestonesRef.current.set(videoId, new Set());
    }

    const onPlay = (duration: number) => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

      const playData: VideoPlayEventData = {
        videoId,
        videoTitle,
        duration,
      };

      const event: AnalyticsEvent = {
        eventType: "video_play",
        page: pathname,
        data: {
          videoId: playData.videoId,
          videoTitle: playData.videoTitle,
          duration: playData.duration,
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
      });
    };

    const onProgress = (currentTime: number, duration: number) => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent
      if (duration === 0) return;

      const progressPercent = (currentTime / duration) * 100;
      const milestones: VideoMilestone[] = [25, 50, 75, 90];
      const trackedMilestones = videoMilestonesRef.current.get(videoId);

      for (const milestone of milestones) {
        if (progressPercent >= milestone && trackedMilestones && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone);

          const progressData: VideoProgressEventData = {
            videoId,
            videoTitle,
            milestone,
            duration,
            currentTime,
          };

          const event: AnalyticsEvent = {
            eventType: "video_progress",
            page: pathname,
            data: {
              videoId: progressData.videoId,
              videoTitle: progressData.videoTitle,
              milestone: progressData.milestone,
              duration: progressData.duration,
              currentTime: progressData.currentTime,
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
          });
        }
      }
    };

    const onComplete = (duration: number, watchTime: number) => {
      if (isExcludedRef.current) return;
      if (!hasAnalyticsConsent()) return; // Skip if no analytics consent

      const completeData: VideoCompleteEventData = {
        videoId,
        videoTitle,
        duration,
        watchTime,
      };

      const event: AnalyticsEvent = {
        eventType: "video_complete",
        page: pathname,
        data: {
          videoId: completeData.videoId,
          videoTitle: completeData.videoTitle,
          duration: completeData.duration,
          watchTime: completeData.watchTime,
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
      });

      // Clear milestones for this video after completion
      videoMilestonesRef.current.delete(videoId);
    };

    return { onPlay, onProgress, onComplete };
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
        trackFormStart,
        trackFormAbandon,
        useVideoTracking,
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
