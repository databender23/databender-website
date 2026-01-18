/**
 * Slack Notification Types
 *
 * Type definitions for Slack alert payloads.
 * Separated from main slack.ts for better organization.
 */

export interface LeadAlert {
  type: "lead";
  score: number;
  tier: "Warm" | "Hot" | "Very Hot";
  visitorId: string;
  sessionId: string;
  currentPage: string;
  pagesViewed: string[];
  company?: string;
  country?: string;
  city?: string;
  region?: string;
  device?: string;
  isReturning?: boolean;
  visitCount?: number;
  referrerSource?: string;
  referrerCategory?: "search" | "ai-search" | "social" | "email" | "referral" | "direct" | "unknown";
  referrerDisplayName?: string;
  utmCampaign?: string;
  utmSource?: string;
  sessionDuration?: number; // seconds
  entryPage?: string;
  // First-touch attribution (how they originally discovered the site)
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
}

export interface CompanyAlert {
  type: "company";
  companyName: string;
  companyDomain?: string;
  visitorId: string;
  currentPage: string;
  pagesViewed: string[];
  leadScore?: number;
  leadTier?: string;
  country?: string;
  // Enriched company data (from RB2B/Leadfeeder)
  personName?: string;
  personEmail?: string;
  linkedInUrl?: string;
  jobTitle?: string;
  employeeCount?: string;
  industry?: string;
  identificationSource?: "reverse_dns" | "rb2b" | "leadfeeder";
  confidence?: "low" | "medium" | "high";
}

export interface ConversionAlert {
  type: "conversion";
  conversionType: string;
  visitorId: string;
  page: string;
  leadScore?: number;
  company?: string;
  journeyLength?: number;
  formData?: Record<string, string>;
}

export type SlackAlert = LeadAlert | CompanyAlert | ConversionAlert;

/**
 * Tier colors for lead alerts
 */
export const TIER_COLORS: Record<string, string> = {
  "Very Hot": "#dc2626",
  "Hot": "#ea580c",
  "Warm": "#d97706"
};

/**
 * Confidence colors for company identification
 */
export const CONFIDENCE_COLORS: Record<string, string> = {
  high: "#22c55e",   // Green for person-level (RB2B with email)
  medium: "#3b82f6", // Blue for company-level (Leadfeeder)
  low: "#6b7280",    // Gray for reverse DNS
};

/**
 * Source labels for company identification
 */
export const SOURCE_LABELS: Record<string, string> = {
  rb2b: "RB2B",
  leadfeeder: "Leadfeeder",
  reverse_dns: "DNS",
};

/**
 * Confidence labels for display
 */
export const CONFIDENCE_LABELS: Record<string, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};
