export type EventType =
  | "pageview"
  | "scroll_depth"
  | "click"
  | "form_submit"
  | "chat_open"
  | "chat_message"
  | "chat_lead_detected"
  | "cta_click";

export interface AnalyticsEvent {
  eventType: EventType;
  page: string;
  referrer?: string;
  data?: Record<string, string | number | boolean>;
}

export interface TrackedEvent extends AnalyticsEvent {
  eventId: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  userAgent?: string;
}

export interface Session {
  sessionId: string;
  visitorId: string;
  startTime: string;
  endTime?: string;
  pageCount: number;
  entryPage: string;
  exitPage?: string;
  device: "desktop" | "mobile" | "tablet";
  isConverted: boolean;
  conversionType?: string;
}
