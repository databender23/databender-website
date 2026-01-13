"use client";

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getVisitorId, getSessionId, getDeviceType, markConversion, isReturningVisitor } from "./visitor-id";
import type { AnalyticsEvent, EventType, UTMParams } from "./events";

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

async function sendEvent(
  event: AnalyticsEvent,
  visitorId: string,
  sessionId: string,
  device: string,
  isReturning: boolean
) {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, visitorId, sessionId, device, isReturning }),
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

  // Initialize IDs on mount
  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    sessionIdRef.current = getSessionId();
    deviceRef.current = getDeviceType();
    isReturningRef.current = isReturningVisitor();
    utmParamsRef.current = getUTMParams();
  }, []);

  // Track page exit on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!lastPathRef.current || pageEntryTimeRef.current === 0) return;
      const timeOnPage = Math.round((Date.now() - pageEntryTimeRef.current) / 1000);

      // Use sendBeacon for reliable exit tracking
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
      sendEvent(exitEvent, visitorIdRef.current, sessionIdRef.current, deviceRef.current, isReturningRef.current);
    }

    // Reset for new page
    lastPathRef.current = pathname;
    scrollDepthsRef.current = new Set();
    maxScrollDepthRef.current = 0;
    pageEntryTimeRef.current = Date.now();

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

    sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current, isReturningRef.current);
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

          const event: AnalyticsEvent = {
            eventType: "scroll_depth",
            page: pathname,
            data: { depth: milestone },
          };

          sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current, isReturningRef.current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const trackEvent = useCallback((eventType: EventType, data?: Record<string, string | number | boolean>) => {
    const event: AnalyticsEvent = {
      eventType,
      page: lastPathRef.current || pathname,
      data,
    };
    sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current, isReturningRef.current);
  }, [pathname]);

  const trackClick = useCallback((elementId: string, elementText?: string) => {
    trackEvent("click", { elementId, elementText: elementText || "" });
  }, [trackEvent]);

  const trackFormSubmit = useCallback((formName: string, success: boolean) => {
    trackEvent("form_submit", { formName, success });
    if (success) {
      markConversion(formName);
    }
  }, [trackEvent]);

  const trackChatOpen = useCallback(() => {
    trackEvent("chat_open");
  }, [trackEvent]);

  const trackChatMessage = useCallback(() => {
    trackEvent("chat_message");
  }, [trackEvent]);

  const trackChatLead = useCallback(() => {
    trackEvent("chat_lead_detected");
    markConversion("chat_lead");
  }, [trackEvent]);

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
