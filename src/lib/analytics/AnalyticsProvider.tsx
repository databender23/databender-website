"use client";

import { createContext, useContext, useEffect, useRef, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getVisitorId, getSessionId, getDeviceType, markConversion } from "./visitor-id";
import type { AnalyticsEvent, EventType } from "./events";

interface AnalyticsContextValue {
  trackEvent: (eventType: EventType, data?: Record<string, string | number | boolean>) => void;
  trackClick: (elementId: string, elementText?: string) => void;
  trackFormSubmit: (formName: string, success: boolean) => void;
  trackChatOpen: () => void;
  trackChatMessage: () => void;
  trackChatLead: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

async function sendEvent(event: AnalyticsEvent, visitorId: string, sessionId: string, device: string) {
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, visitorId, sessionId, device }),
    });
  } catch (error) {
    console.error("Failed to send analytics event:", error);
  }
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lastPathRef = useRef<string>("");
  const scrollDepthsRef = useRef<Set<number>>(new Set());
  const visitorIdRef = useRef<string>("");
  const sessionIdRef = useRef<string>("");
  const deviceRef = useRef<string>("desktop");

  // Initialize IDs on mount
  useEffect(() => {
    visitorIdRef.current = getVisitorId();
    sessionIdRef.current = getSessionId();
    deviceRef.current = getDeviceType();
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!pathname || pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;
    scrollDepthsRef.current = new Set(); // Reset scroll tracking for new page

    const event: AnalyticsEvent = {
      eventType: "pageview",
      page: pathname,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
      data: {
        title: typeof document !== "undefined" ? document.title : "",
      },
    };

    sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      const milestones = [25, 50, 75, 100];

      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !scrollDepthsRef.current.has(milestone)) {
          scrollDepthsRef.current.add(milestone);

          const event: AnalyticsEvent = {
            eventType: "scroll_depth",
            page: pathname,
            data: { depth: milestone },
          };

          sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current);
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
    sendEvent(event, visitorIdRef.current, sessionIdRef.current, deviceRef.current);
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
