/**
 * W-Shaped Attribution Module
 *
 * Exports all attribution-related functionality
 */

// Types
export type {
  Touchpoint,
  TouchpointType,
  StoredTouchpoint,
  TouchpointCredit,
  AttributionResult,
  ChannelAttribution,
  ChannelSummary,
  Opportunity,
  StoredOpportunity,
  SelfReportedSource,
  StoredSelfReportedSource,
} from "./types";

// Constants
export {
  W_SHAPE_CREDITS,
  PRE_OPPORTUNITY_CREDITS,
  normalizeToChannel,
  normalizeSelfReportedResponse,
} from "./types";

// Storage functions
export {
  storeTouchpointToDB,
  getTouchpointsByVisitorId,
  getTouchpointsForDateRange,
  storeOpportunityToDB,
  getOpportunityByVisitorId,
  getOpportunitiesForDateRange,
  storeSelfReportedSourceToDB,
  getSelfReportedSourceByVisitorId,
} from "./storage";
