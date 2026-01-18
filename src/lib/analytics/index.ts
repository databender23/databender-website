export { AnalyticsProvider, useAnalytics } from "./AnalyticsProvider";
export type {
  EventType,
  AnalyticsEvent,
  TrackedEvent,
  Session,
  PageJourneyStep,
  ConversionPath,
  // New event data types
  FormStartEventData,
  FormAbandonEventData,
  RageClickEventData,
  VideoPlayEventData,
  VideoProgressEventData,
  VideoCompleteEventData,
  VideoMilestone,
  CopyTextEventData,
  CopyElementType,
} from "./events";
export {
  getVisitorId,
  getSessionId,
  getDeviceType,
  markConversion,
  addPageToSessionJourney,
  getSessionJourney,
  getVisitorJourney,
} from "./visitor-id";
export type { PageVisit } from "./visitor-id";
export {
  // Core scoring functions
  calculateEventScore,
  calculateLeadScore,
  calculateReturningVisitorScore,
  calculatePageScore,
  scoreEmailDomain,
  getLeadTier,
  getTierColor,
  getTierBadgeClasses,
  aggregateLeadScoreMetrics,
  // Score constants
  LEAD_SCORE_THRESHOLDS,
  PAGE_SCORES,
  BEHAVIOR_SCORES,
  // Time decay
  calculateDecayMultiplier,
  applyTimeDecay,
  daysBetween,
  calculateDecayedTotalScore,
  getDecayStatus,
  DECAY_CONFIG,
  // Negative signals
  evaluateNegativeSignals,
  isPersonalEmail,
  isCompetitorEmail,
  isCareersPage,
  NEGATIVE_SIGNALS,
  PERSONAL_EMAIL_DOMAINS,
  COMPETITOR_DOMAINS,
  // Sequence patterns
  detectSequencePatterns,
  SEQUENCE_BONUSES,
  // Session velocity
  calculateSessionVelocity,
  SESSION_VELOCITY_SCORES,
  VELOCITY_CONFIG,
} from "./lead-scoring";
export type {
  LeadTier,
  ScoreBreakdown,
  VisitorScoreData,
  LeadScoreMetrics,
  TimestampedScore,
  NegativeSignalResult,
  SequencePatternResult,
  SessionVelocityResult,
} from "./lead-scoring";

// New tracking hooks
export { useVideoTracking } from "./useVideoTracking";
export { useFormTracking } from "./useFormTracking";

// W-Shaped Attribution
export {
  // Core attribution functions
  storeTouchpoint,
  calculateAttribution,
  getChannelAttribution,
  markOpportunityCreated,
  recordSelfReportedSource,
  // Constants
  W_SHAPE_CREDITS,
  PRE_OPPORTUNITY_CREDITS,
  normalizeToChannel,
  normalizeSelfReportedResponse,
} from "./attribution";
export type {
  Touchpoint,
  TouchpointType,
  AttributionResult,
  ChannelSummary,
  ChannelAttribution,
} from "./attribution";
