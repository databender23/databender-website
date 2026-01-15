/**
 * Email Sequence Types
 *
 * Type definitions for the email nurture sequence system
 */

export type SequenceType = "assessment" | "guide-legal" | "guide-general";

export type SequenceStatus = "active" | "completed" | "paused" | "unsubscribed" | "bounced";

export type BounceType = "hard" | "soft" | "undetermined";

export type PauseReason =
  | "manual"
  | "bounce_hard"
  | "bounce_soft"
  | "complaint"
  | "replied"
  | "out_of_office";

export type SequenceDay = 0 | 2 | 7 | 14 | 21;

export const SEQUENCE_SCHEDULE: SequenceDay[] = [0, 2, 7, 14, 21];

export interface EmailSentRecord {
  sentAt: string;
  messageId?: string;
}

export interface EmailSequence {
  sequenceType: SequenceType;
  enrolledAt: string;
  status: SequenceStatus;
  pauseReason?: PauseReason | string;
  currentDay: number;
  emailsSent: {
    day0?: EmailSentRecord;
    day2?: EmailSentRecord;
    day7?: EmailSentRecord;
    day14?: EmailSentRecord;
    day21?: EmailSentRecord;
  };
  completedAt?: string;
  unsubscribedAt?: string;
  // Bounce/complaint tracking
  bounceType?: BounceType;
  bounceCount?: number;
  lastBounceAt?: string;
  lastBounceReason?: string;
  complainedAt?: string;
  repliedAt?: string;
  pausedAt?: string;
  resumedAt?: string;
}

export interface SequenceEmailParams {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  industry?: string;
  // Assessment-specific
  overallScore?: number;
  lowestCategory?: string;
  lowestCategoryScore?: number;
  highestCategory?: string;
  primaryChallenge?: string;
  assessmentName?: string;
  assessmentScores?: Record<string, number>;
  // Guide-specific
  guideTitle?: string;
  guideSlug?: string;
  downloadUrl?: string;
  contentUrl?: string;
  // Common
  calendarUrl: string;
  unsubscribeUrl: string;
}

export interface SequenceTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

export interface ProcessingResult {
  totalProcessed: number;
  emailsSent: number;
  errors: Array<{
    email: string;
    error: string;
  }>;
  completedSequences: number;
}

/**
 * Map assessment slugs to friendly names
 */
export const ASSESSMENT_NAMES: Record<string, string> = {
  "data-ai-readiness": "Data & AI Readiness Assessment",
  manufacturing: "Manufacturing AI Readiness Assessment",
  "healthcare-benchmark": "Healthcare Data Benchmark",
  "healthcare-ai-readiness": "Healthcare AI Readiness Assessment",
  legal: "Legal AI Readiness Assessment",
  "commercial-real-estate": "CRE Data & AI Assessment",
};

/**
 * Map guide slugs to sequence types
 */
export const GUIDE_SEQUENCE_MAP: Record<string, SequenceType> = {
  // Legal guides
  "legal-ai-readiness": "guide-legal",
  "ai-in-legal": "guide-legal",
  "associate-multiplier": "guide-legal",
  "win-more-pitches": "guide-legal",
  "partner-succession": "guide-legal",
  "last-vendor": "guide-legal",
  // Healthcare guides (use guide-general for now, can create guide-healthcare later)
  "hipaa-compliant-ai": "guide-general",
  "institutional-knowledge-healthcare": "guide-general",
  "document-intelligence-healthcare": "guide-general",
  // Manufacturing guides (use guide-general for now, can create guide-manufacturing later)
  "operational-visibility-playbook": "guide-general",
  "lead-scoring-manufacturing": "guide-general",
  "manufacturing-ai-privacy": "guide-general",
  "data-cleanup-manufacturing": "guide-general", // Legacy, kept for backwards compatibility
  // CRE guides (use guide-general for now, can create guide-cre later)
  "entity-resolution-cre": "guide-general",
  "data-room-review": "guide-general",
  "deal-prioritization": "guide-general",
  // Default fallback is "guide-general"
};

/**
 * Get the sequence type for a guide slug
 */
export function getGuideSequenceType(guideSlug: string): SequenceType {
  return GUIDE_SEQUENCE_MAP[guideSlug] || "guide-general";
}
