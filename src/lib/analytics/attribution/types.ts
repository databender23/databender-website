/**
 * W-Shaped Attribution Model Types
 *
 * W-shaped attribution is ideal for B2B consulting sales cycles where:
 * - First Touch (30%): The initial awareness moment
 * - Lead Creation (30%): Form submission, chat lead, etc.
 * - Opportunity Creation (30%): When marked as opportunity in CRM
 * - Middle Touchpoints (10%): Distributed across assist touchpoints
 */

import type { UTMParams } from "../events";

// ============================================
// Touchpoint Types
// ============================================

export type TouchpointType =
  | "pageview"
  | "form_submit"
  | "chat_lead"
  | "assessment_complete"
  | "guide_download";

export interface Touchpoint {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: Date;
  type: TouchpointType;
  page: string;
  source: string;
  medium: string;
  campaign?: string;
  utmParams?: UTMParams;
  gclid?: string; // Google click ID for offline conversion tracking
}

/**
 * Touchpoint stored in DynamoDB
 * (timestamp as ISO string for storage)
 */
export interface StoredTouchpoint extends Omit<Touchpoint, "timestamp"> {
  timestamp: string;
  ttl: number;
}

// ============================================
// Attribution Result Types
// ============================================

export interface TouchpointCredit {
  touchpoint: Touchpoint;
  credit: number; // 0.0 to 1.0
}

export interface AttributionResult {
  visitorId: string;
  conversionTimestamp: Date;

  // W-shaped key touchpoints
  firstTouch: TouchpointCredit;
  leadCreation: TouchpointCredit;
  opportunityCreation?: TouchpointCredit;

  // Middle touchpoints (10% distributed)
  middleTouchpoints: TouchpointCredit[];

  // Aggregated channel credits
  channelCredits: Record<string, number>;

  // Total touchpoints in journey
  totalTouchpoints: number;
}

// ============================================
// Channel Attribution Summary
// ============================================

export interface ChannelAttribution {
  channel: string;
  totalCredit: number;
  conversions: number;
  revenue?: number;
  avgCreditPerConversion: number;
  // Position breakdown
  firstTouchCount: number;
  leadCreationCount: number;
  opportunityCount: number;
  assistCount: number;
}

export interface ChannelSummary {
  period: {
    startDate: string;
    endDate: string;
    days: number;
  };
  totalConversions: number;
  totalRevenue?: number;
  channels: ChannelAttribution[];
}

// ============================================
// Opportunity Tracking
// ============================================

export interface Opportunity {
  id: string;
  visitorId: string;
  timestamp: Date;
  dealValue?: number;
  // Attribution snapshot at opportunity creation
  attributionSnapshot?: AttributionResult;
}

export interface StoredOpportunity extends Omit<Opportunity, "timestamp" | "attributionSnapshot"> {
  timestamp: string;
  attributionSnapshot?: string; // JSON stringified
  ttl: number;
}

// ============================================
// Self-Reported Attribution
// ============================================

export interface SelfReportedSource {
  visitorId: string;
  timestamp: Date;
  response: string;
  normalizedChannel?: string;
}

export interface StoredSelfReportedSource extends Omit<SelfReportedSource, "timestamp"> {
  timestamp: string;
  ttl: number;
}

// ============================================
// W-Shape Credit Constants
// ============================================

export const W_SHAPE_CREDITS = {
  FIRST_TOUCH: 0.3,
  LEAD_CREATION: 0.3,
  OPPORTUNITY_CREATION: 0.3,
  MIDDLE_TOUCHPOINTS: 0.1,
} as const;

/**
 * When opportunity is not yet created, redistribute credits:
 * - First Touch: 40%
 * - Lead Creation: 40%
 * - Middle Touchpoints: 20%
 */
export const PRE_OPPORTUNITY_CREDITS = {
  FIRST_TOUCH: 0.4,
  LEAD_CREATION: 0.4,
  MIDDLE_TOUCHPOINTS: 0.2,
} as const;

// ============================================
// Channel Normalization
// ============================================

/**
 * Normalize source/medium to a channel name
 * Used for aggregating attribution across similar sources
 */
export function normalizeToChannel(source: string, medium: string): string {
  const src = source.toLowerCase();
  const med = medium.toLowerCase();

  // Paid channels
  if (med === "cpc" || med === "paid" || med === "ppc") {
    if (src === "google") return "google_ads";
    if (src === "linkedin") return "linkedin_ads";
    if (src === "facebook" || src === "meta") return "meta_ads";
    return "paid_other";
  }

  // Organic search
  if (med === "organic") {
    return "organic_search";
  }

  // AI search
  if (med === "ai-search") {
    return "ai_search";
  }

  // Social organic
  if (med === "social") {
    if (src === "linkedin") return "linkedin_organic";
    if (src === "twitter" || src === "x") return "twitter_organic";
    return "social_other";
  }

  // Email
  if (med === "email" || med === "newsletter") {
    return "email";
  }

  // Direct
  if (src === "direct" || med === "none") {
    return "direct";
  }

  // Referral
  if (med === "referral") {
    return "referral";
  }

  return "other";
}

// ============================================
// Self-Reported Response Normalization
// ============================================

const SELF_REPORTED_MAPPINGS: Record<string, string> = {
  // Search
  "google search": "organic_search",
  google: "organic_search",
  "searched online": "organic_search",
  "search engine": "organic_search",
  bing: "organic_search",
  duckduckgo: "organic_search",

  // AI Search
  chatgpt: "ai_search",
  claude: "ai_search",
  perplexity: "ai_search",
  "ai assistant": "ai_search",

  // Social
  linkedin: "linkedin_organic",
  twitter: "twitter_organic",
  x: "twitter_organic",
  facebook: "social_other",

  // Referral
  referral: "referral",
  colleague: "referral",
  friend: "referral",
  "word of mouth": "referral",
  recommendation: "referral",

  // Ads
  "google ads": "google_ads",
  advertisement: "paid_other",
  ad: "paid_other",

  // Email
  email: "email",
  newsletter: "email",

  // Events
  conference: "events",
  webinar: "events",
  event: "events",
  meetup: "events",
};

export function normalizeSelfReportedResponse(response: string): string {
  const normalized = response.toLowerCase().trim();

  // Direct match
  if (SELF_REPORTED_MAPPINGS[normalized]) {
    return SELF_REPORTED_MAPPINGS[normalized];
  }

  // Partial match
  for (const [key, channel] of Object.entries(SELF_REPORTED_MAPPINGS)) {
    if (normalized.includes(key)) {
      return channel;
    }
  }

  return "self_reported_other";
}
