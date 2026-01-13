export { AnalyticsProvider, useAnalytics } from "./AnalyticsProvider";
export type { EventType, AnalyticsEvent, TrackedEvent, Session, PageJourneyStep, ConversionPath } from "./events";
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
  calculateEventScore,
  calculateLeadScore,
  getLeadTier,
  getTierColor,
  getTierBadgeClasses,
  aggregateLeadScoreMetrics,
  LEAD_SCORE_THRESHOLDS,
  PAGE_SCORES,
  BEHAVIOR_SCORES,
} from "./lead-scoring";
export type { LeadTier, ScoreBreakdown, VisitorScoreData, LeadScoreMetrics } from "./lead-scoring";
