export type EventType =
  | "pageview"
  | "scroll_depth"
  | "click"
  | "form_submit"
  | "chat_open"
  | "chat_message"
  | "chat_lead_detected"
  | "cta_click"
  | "page_exit"
  // Form interaction events
  | "form_start"
  | "form_abandon"
  // Rage click detection
  | "rage_click"
  // Video engagement events
  | "video_play"
  | "video_progress"
  | "video_complete"
  // Copy event (comparison shopping indicator)
  | "copy_text";

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface AnalyticsEvent {
  eventType: EventType;
  page: string;
  referrer?: string;
  data?: Record<string, string | number | boolean>;
  // Enhanced client-side data
  screenWidth?: number;
  screenHeight?: number;
  viewportWidth?: number;
  viewportHeight?: number;
  utm?: UTMParams;
  pageLoadTime?: number;
  timeOnPage?: number;
}

export interface TrackedEvent extends AnalyticsEvent {
  eventId: string;
  visitorId: string;
  sessionId: string;
  timestamp: string;
  userAgent?: string;
  // Server-side enrichment
  ip?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  isBot?: boolean;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  // Company identification (from reverse DNS or enrichment services)
  companyName?: string;
  companyDomain?: string;
  companyIndustry?: string;
}

export interface Session {
  sessionId: string;
  visitorId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // seconds
  pageCount: number;
  entryPage: string;
  exitPage?: string;
  device: "desktop" | "mobile" | "tablet";
  isConverted: boolean;
  conversionType?: string;
  // Enhanced session data
  country?: string;
  countryCode?: string;
  region?: string;
  regionCode?: string;
  city?: string;
  referrerSource?: string;
  referrerMedium?: string;
  isReturning?: boolean;
  maxScrollDepth?: number;
  browser?: string;
  os?: string;
  // Company identification
  companyName?: string;
  companyDomain?: string;
  companyIndustry?: string;
  // Lead scoring
  leadScore?: number;
  leadTier?: "Cold" | "Warm" | "Hot" | "Very Hot";
  pagesVisited?: string[];
}

export interface PageJourneyStep {
  page: string;
  timestamp: string;
  referrer?: string;
}

export interface ConversionPath {
  conversionId: string;
  visitorId: string;
  sessionId: string;
  conversionType: string;
  conversionPage: string;
  timestamp: string;
  pageJourney: PageJourneyStep[];
  journeyLength: number;
  firstTouchPage: string;
  lastTouchPage: string;
  // Attribution metadata
  device?: string;
  country?: string;
  referrerSource?: string;
  referrerMedium?: string;
  utm?: UTMParams;
}

// ============================================
// Form Interaction Event Data
// ============================================

export interface FormStartEventData {
  formName: string;
  firstFieldFocused: string;
}

export interface FormAbandonEventData {
  formName: string;
  fieldsCompleted: number;
  totalFields: number;
  lastFieldFocused: string;
  timeSpent: number; // milliseconds
  completionPercentage: number;
}

// ============================================
// Rage Click Event Data
// ============================================

export interface RageClickEventData {
  element: string;
  elementText?: string;
  clickCount: number;
  coordinates: { x: number; y: number };
  timeWindow: number; // milliseconds
}

// ============================================
// Video Engagement Event Data
// ============================================

export type VideoMilestone = 25 | 50 | 75 | 90;

export interface VideoPlayEventData {
  videoId: string;
  videoTitle: string;
  duration: number; // seconds
}

export interface VideoProgressEventData {
  videoId: string;
  videoTitle: string;
  milestone: VideoMilestone;
  duration: number; // seconds
  currentTime: number; // seconds
}

export interface VideoCompleteEventData {
  videoId: string;
  videoTitle: string;
  duration: number; // seconds
  watchTime: number; // seconds (actual time watched)
}

// ============================================
// Copy Text Event Data
// ============================================

export type CopyElementType = "pricing" | "features" | "testimonial" | "contact" | "general";

export interface CopyTextEventData {
  textLength: number;
  element: CopyElementType;
  elementSelector?: string;
  // First 100 chars of copied text for context (truncated for privacy)
  textPreview?: string;
}
