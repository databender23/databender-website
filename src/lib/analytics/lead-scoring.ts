/**
 * Lead Intent Scoring System
 *
 * Calculates a lead score based on visitor behavior to identify purchase intent.
 * Higher scores indicate visitors more likely to convert.
 *
 * Features:
 * - Page-based scoring
 * - Behavior-based scoring
 * - Time decay (50% every 30 days, expires at 90 days)
 * - Negative signals (careers page, personal email, competitors)
 * - Sequential pattern bonuses
 * - Session velocity scoring
 */

// Re-export decay and signal modules for convenience
export * from "./lead-scoring-decay";
export * from "./lead-scoring-signals";

// Import for internal use
import {
  applyTimeDecay,
  daysBetween,
  TimestampedScore,
} from "./lead-scoring-decay";
import {
  evaluateNegativeSignals,
  detectSequencePatterns,
  calculateSessionVelocity,
  NegativeSignalResult,
  SequencePatternResult,
  SessionVelocityResult,
} from "./lead-scoring-signals";

// Score thresholds for lead classification
export const LEAD_SCORE_THRESHOLDS = {
  COLD: { min: 0, max: 25, label: "Cold" },
  WARM: { min: 26, max: 50, label: "Warm" },
  HOT: { min: 51, max: 75, label: "Hot" },
  VERY_HOT: { min: 76, max: Infinity, label: "Very Hot" },
} as const;

export type LeadTier = "Cold" | "Warm" | "Hot" | "Very Hot";

// Page-based scoring rules
export const PAGE_SCORES: Record<string, number> = {
  // High-intent pages
  "/contact": 30,
  "/assessment": 25,
  "/free-assessment": 25,

  // Service pages (matched by pattern in scoring function)
  "/services": 15,

  // Case study pages (matched by pattern)
  "/case-studies": 20,

  // Industry pages (matched by pattern)
  "/industries": 10,

  // Resource pages
  "/resources": 15,
  "/resources/guides": 15,

  // Lower-intent pages
  "/": 5,
  "/about": 5,
  "/blog": 5,
};

// Behavior-based scoring rules
export const BEHAVIOR_SCORES = {
  // Scroll engagement
  SCROLL_DEPTH_50: 5,
  SCROLL_DEPTH_100: 10,

  // Chat engagement
  CHAT_OPENED: 20,
  CHAT_MESSAGE_SENT: 15,

  // Form engagement
  FORM_SUBMITTED: 50,
  ASSESSMENT_COMPLETED: 40,
  GUIDE_DOWNLOAD: 75, // High-intent action - prioritize immediately
  NEWSLETTER_SIGNUP: 60, // Engaged prospect - wants to stay informed

  // Session engagement
  MULTIPLE_PAGES_SESSION: 15, // 3+ pages in session
  LONG_SESSION_DURATION: 10, // > 2 minutes

  // Visitor type
  RETURNING_VISITOR: 25,
} as const;

export interface ScoreBreakdown {
  pageScore: number;
  behaviorScore: number;
  negativeScore: number;
  sequenceBonus: number;
  velocityBonus: number;
  totalScore: number;
  tier: LeadTier;
  reasons: string[];
  isDisqualified: boolean;
  negativeSignals?: NegativeSignalResult;
  sequencePatterns?: SequencePatternResult;
  velocityMetrics?: SessionVelocityResult;
}

export interface VisitorScoreData {
  pagesVisited: string[];
  pageSequence?: string[]; // Pages in order of visit for sequence detection
  maxScrollDepth: number;
  chatOpened: boolean;
  chatMessagesSent: number;
  formSubmitted: boolean;
  assessmentCompleted: boolean;
  hasDownloadedGuide?: boolean;
  pageCount: number;
  sessionDurationSeconds: number;
  actionCount?: number; // Total actions in session for velocity scoring
  isReturningVisitor: boolean;
  email?: string; // For personal/competitor domain detection
  lastVisitDate?: Date | string | number; // For inactivity penalty
  visitDates?: (Date | string | number)[]; // For 3+ visits in 7 days pattern
  eventTimestamps?: TimestampedScore[]; // For time decay calculation
}

/**
 * Calculate score for a specific page path
 */
export function calculatePageScore(pagePath: string): number {
  // Exact match first
  if (PAGE_SCORES[pagePath] !== undefined) {
    return PAGE_SCORES[pagePath];
  }

  // Pattern matching for dynamic routes
  if (pagePath.startsWith("/services/")) {
    return PAGE_SCORES["/services"] || 15;
  }
  if (pagePath.startsWith("/case-studies/")) {
    return PAGE_SCORES["/case-studies"] || 20;
  }
  if (pagePath.startsWith("/industries/")) {
    return PAGE_SCORES["/industries"] || 10;
  }
  if (pagePath.startsWith("/resources/guides/")) {
    return PAGE_SCORES["/resources/guides"] || 15;
  }
  if (pagePath.startsWith("/blog/")) {
    return PAGE_SCORES["/blog"] || 5;
  }
  if (pagePath.startsWith("/assessment")) {
    return PAGE_SCORES["/assessment"] || 25;
  }

  // Default score for unknown pages
  return 2;
}

/**
 * Get the lead tier based on total score
 */
export function getLeadTier(score: number): LeadTier {
  if (score <= LEAD_SCORE_THRESHOLDS.COLD.max) return "Cold";
  if (score <= LEAD_SCORE_THRESHOLDS.WARM.max) return "Warm";
  if (score <= LEAD_SCORE_THRESHOLDS.HOT.max) return "Hot";
  return "Very Hot";
}

/**
 * Get tier color for UI display
 */
export function getTierColor(tier: LeadTier): string {
  switch (tier) {
    case "Cold":
      return "#6B7280"; // gray
    case "Warm":
      return "#F59E0B"; // amber
    case "Hot":
      return "#EF4444"; // red
    case "Very Hot":
      return "#DC2626"; // deep red
  }
}

/**
 * Get Tailwind CSS classes for tier badge
 */
export function getTierBadgeClasses(tier: LeadTier): string {
  switch (tier) {
    case "Cold":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "Warm":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "Hot":
      return "bg-red-100 text-red-700 border-red-200";
    case "Very Hot":
      return "bg-red-200 text-red-800 border-red-300";
  }
}

/**
 * Calculate complete lead score breakdown from visitor data
 * Includes negative signals, sequence patterns, and velocity bonuses
 */
export function calculateLeadScore(data: VisitorScoreData): ScoreBreakdown {
  const reasons: string[] = [];
  let pageScore = 0;
  let behaviorScore = 0;
  let negativeScore = 0;
  let sequenceBonus = 0;
  let velocityBonus = 0;
  let isDisqualified = false;

  // Calculate page-based score (sum of unique pages visited)
  const uniquePages = [...new Set(data.pagesVisited)];
  for (const page of uniquePages) {
    const score = calculatePageScore(page);
    pageScore += score;
  }
  if (pageScore > 0) {
    reasons.push(`Visited ${uniquePages.length} page(s)`);
  }

  // Scroll depth scoring
  if (data.maxScrollDepth >= 100) {
    behaviorScore += BEHAVIOR_SCORES.SCROLL_DEPTH_100;
    reasons.push("Scrolled to bottom of page");
  } else if (data.maxScrollDepth >= 50) {
    behaviorScore += BEHAVIOR_SCORES.SCROLL_DEPTH_50;
    reasons.push("Scrolled 50%+ of page");
  }

  // Chat engagement
  if (data.chatOpened) {
    behaviorScore += BEHAVIOR_SCORES.CHAT_OPENED;
    reasons.push("Opened chat widget");
  }
  if (data.chatMessagesSent > 0) {
    behaviorScore += BEHAVIOR_SCORES.CHAT_MESSAGE_SENT * data.chatMessagesSent;
    reasons.push(`Sent ${data.chatMessagesSent} chat message(s)`);
  }

  // Form engagement
  if (data.formSubmitted) {
    behaviorScore += BEHAVIOR_SCORES.FORM_SUBMITTED;
    reasons.push("Submitted a form");
  }
  if (data.assessmentCompleted) {
    behaviorScore += BEHAVIOR_SCORES.ASSESSMENT_COMPLETED;
    reasons.push("Completed assessment");
  }

  // Session engagement
  if (data.pageCount >= 3) {
    behaviorScore += BEHAVIOR_SCORES.MULTIPLE_PAGES_SESSION;
    reasons.push("Viewed 3+ pages in session");
  }
  if (data.sessionDurationSeconds >= 120) {
    behaviorScore += BEHAVIOR_SCORES.LONG_SESSION_DURATION;
    reasons.push("Session > 2 minutes");
  }

  // Returning visitor
  if (data.isReturningVisitor) {
    behaviorScore += BEHAVIOR_SCORES.RETURNING_VISITOR;
    reasons.push("Returning visitor");
  }

  // Apply time decay to behavioral scores if timestamps provided
  if (data.eventTimestamps && data.eventTimestamps.length > 0) {
    const now = new Date();
    let decayedBehaviorScore = 0;

    for (const event of data.eventTimestamps) {
      const days = daysBetween(event.timestamp, now);
      const decayedScore = applyTimeDecay(event.score, days);
      decayedBehaviorScore += decayedScore;
    }

    // Replace behavior score with decayed version
    if (decayedBehaviorScore < behaviorScore) {
      reasons.push(
        `Time decay applied (${behaviorScore} → ${decayedBehaviorScore})`
      );
      behaviorScore = decayedBehaviorScore;
    }
  }

  // Evaluate negative signals
  const daysSinceLastVisit = data.lastVisitDate
    ? daysBetween(data.lastVisitDate)
    : undefined;

  const negativeSignalResult = evaluateNegativeSignals({
    pagesVisited: data.pagesVisited,
    email: data.email,
    daysSinceLastVisit,
  });

  negativeScore = negativeSignalResult.totalDeduction;
  isDisqualified = negativeSignalResult.isDisqualified;

  for (const signal of negativeSignalResult.signals) {
    reasons.push(`${signal.reason} (${signal.points})`);
  }

  // Detect sequence patterns
  const sequencePatternResult = detectSequencePatterns({
    pageSequence: data.pageSequence || data.pagesVisited,
    visitDates: data.visitDates,
    hasDownloadedGuide: data.hasDownloadedGuide,
  });

  sequenceBonus = sequencePatternResult.totalBonus;

  for (const pattern of sequencePatternResult.patterns) {
    reasons.push(`${pattern.description} (+${pattern.bonus})`);
  }

  // Calculate session velocity
  const velocityResult = calculateSessionVelocity({
    actionCount: data.actionCount || data.pageCount,
    sessionDurationSeconds: data.sessionDurationSeconds,
    pageCount: data.pageCount,
  });

  velocityBonus = velocityResult.totalBonus;

  if (velocityResult.metrics.hasHighActionCount) {
    reasons.push(`High action count: ${velocityResult.metrics.actionsPerSession} actions (+8)`);
  }
  if (velocityResult.metrics.hasHighEngagement) {
    reasons.push(
      `High engagement: ${velocityResult.metrics.averageSecondsPerPage}s/page (+5)`
    );
  }

  // Calculate total score (negative scores are already negative)
  const totalScore = Math.max(
    0,
    pageScore + behaviorScore + negativeScore + sequenceBonus + velocityBonus
  );

  // Disqualified leads are forced to Cold tier
  const tier = isDisqualified ? "Cold" : getLeadTier(totalScore);

  return {
    pageScore,
    behaviorScore,
    negativeScore,
    sequenceBonus,
    velocityBonus,
    totalScore,
    tier,
    reasons,
    isDisqualified,
    negativeSignals: negativeSignalResult,
    sequencePatterns: sequencePatternResult,
    velocityMetrics: velocityResult,
  };
}

/**
 * Calculate incremental score for a single event
 * Used for real-time score updates as events occur
 */
export function calculateEventScore(
  eventType: string,
  page: string,
  data?: Record<string, string | number | boolean>
): number {
  let score = 0;

  switch (eventType) {
    case "pageview":
      score = calculatePageScore(page);
      break;

    case "scroll_depth":
      const depth = data?.depth as number;
      if (depth >= 100) {
        score = BEHAVIOR_SCORES.SCROLL_DEPTH_100;
      } else if (depth >= 50) {
        score = BEHAVIOR_SCORES.SCROLL_DEPTH_50;
      }
      break;

    case "chat_open":
      score = BEHAVIOR_SCORES.CHAT_OPENED;
      break;

    case "chat_message":
      score = BEHAVIOR_SCORES.CHAT_MESSAGE_SENT;
      break;

    case "form_submit":
      const formName = data?.formName as string;
      if (formName?.toLowerCase().includes("assessment")) {
        score = BEHAVIOR_SCORES.ASSESSMENT_COMPLETED;
      } else {
        score = BEHAVIOR_SCORES.FORM_SUBMITTED;
      }
      break;

    case "chat_lead_detected":
      score = BEHAVIOR_SCORES.FORM_SUBMITTED; // Same as form submit
      break;
  }

  return score;
}

/**
 * Calculate lead score for a returning visitor with time decay applied
 * Use this when a visitor returns to get their current effective score
 */
export function calculateReturningVisitorScore(
  historicalData: VisitorScoreData,
  newSessionData?: Partial<VisitorScoreData>
): ScoreBreakdown {
  // Merge new session data with historical data
  const mergedData: VisitorScoreData = {
    ...historicalData,
    ...newSessionData,
    // Combine pages visited
    pagesVisited: [
      ...historicalData.pagesVisited,
      ...(newSessionData?.pagesVisited || []),
    ],
    // Use new session metrics for current session
    pageCount: newSessionData?.pageCount ?? historicalData.pageCount,
    sessionDurationSeconds:
      newSessionData?.sessionDurationSeconds ??
      historicalData.sessionDurationSeconds,
    // Mark as returning
    isReturningVisitor: true,
  };

  return calculateLeadScore(mergedData);
}

/**
 * Quick score check for a single email address
 * Returns negative points if personal or competitor domain
 */
export function scoreEmailDomain(email: string): {
  points: number;
  reason: string | null;
  isDisqualified: boolean;
} {
  const result = evaluateNegativeSignals({
    pagesVisited: [],
    email,
  });

  const emailSignal = result.signals.find(
    (s) => s.signal === "personal_email" || s.signal === "competitor_email"
  );

  return {
    points: emailSignal?.points || 0,
    reason: emailSignal?.reason || null,
    isDisqualified: result.isDisqualified,
  };
}

// Re-export metrics functions from dedicated module
export {
  aggregateLeadScoreMetrics,
  type LeadScoreMetrics,
} from "./lead-scoring-metrics";
