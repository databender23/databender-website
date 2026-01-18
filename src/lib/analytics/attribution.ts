/**
 * W-Shaped Attribution Model
 *
 * Implements W-shaped attribution for B2B consulting sales cycles:
 * - 30% credit: First touch (awareness)
 * - 30% credit: Lead creation (form submission, chat lead)
 * - 30% credit: Opportunity creation (when marked in CRM)
 * - 10% credit: Distributed across middle touchpoints
 */

import { v4 as uuidv4 } from "uuid";
import {
  storeTouchpointToDB,
  getTouchpointsByVisitorId,
  storeOpportunityToDB,
  getOpportunityByVisitorId,
  storeSelfReportedSourceToDB,
  getTouchpointsForDateRange,
  getOpportunitiesForDateRange,
} from "./attribution/storage";
import {
  type Touchpoint,
  type TouchpointType,
  type AttributionResult,
  type TouchpointCredit,
  type ChannelSummary,
  type ChannelAttribution,
  W_SHAPE_CREDITS,
  PRE_OPPORTUNITY_CREDITS,
  normalizeToChannel,
  normalizeSelfReportedResponse,
} from "./attribution/types";
import type { UTMParams } from "./events";

// ============================================
// Touchpoint Storage
// ============================================

export interface StoreTouchpointParams {
  visitorId: string;
  sessionId: string;
  timestamp?: Date;
  type: TouchpointType;
  page: string;
  source: string;
  medium: string;
  campaign?: string;
  utmParams?: UTMParams;
  gclid?: string;
}

/**
 * Store a touchpoint when a significant event occurs
 */
export async function storeTouchpoint(params: StoreTouchpointParams): Promise<void> {
  const touchpoint: Touchpoint = {
    id: uuidv4(),
    visitorId: params.visitorId,
    sessionId: params.sessionId,
    timestamp: params.timestamp || new Date(),
    type: params.type,
    page: params.page,
    source: params.source,
    medium: params.medium,
    campaign: params.campaign,
    utmParams: params.utmParams,
    gclid: params.gclid,
  };

  await storeTouchpointToDB(touchpoint);
}

// ============================================
// Attribution Calculation
// ============================================

/**
 * Calculate W-shaped attribution for a conversion
 *
 * @param visitorId - The visitor to calculate attribution for
 * @param conversionTimestamp - When the conversion (lead creation) occurred
 * @returns Attribution result with credit assigned to each touchpoint
 */
export async function calculateAttribution(
  visitorId: string,
  conversionTimestamp: Date
): Promise<AttributionResult | null> {
  // Get all touchpoints for this visitor up to conversion
  const allTouchpoints = await getTouchpointsByVisitorId(visitorId);

  // Filter to touchpoints before or at conversion time
  const touchpoints = allTouchpoints
    .filter((tp) => tp.timestamp <= conversionTimestamp)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  if (touchpoints.length === 0) {
    return null;
  }

  // Get opportunity if it exists
  const opportunity = await getOpportunityByVisitorId(visitorId);
  const hasOpportunity = opportunity && opportunity.timestamp <= new Date();

  // Identify key touchpoints
  const firstTouch = touchpoints[0];

  // Lead creation is the most recent conversion-type touchpoint
  const leadCreationTouchpoints = touchpoints.filter(
    (tp) =>
      tp.type === "form_submit" ||
      tp.type === "chat_lead" ||
      tp.type === "assessment_complete" ||
      tp.type === "guide_download"
  );
  const leadCreation =
    leadCreationTouchpoints.length > 0
      ? leadCreationTouchpoints[leadCreationTouchpoints.length - 1]
      : firstTouch;

  // Middle touchpoints (everything between first and lead creation, excluding them)
  const firstTouchTime = firstTouch.timestamp.getTime();
  const leadCreationTime = leadCreation.timestamp.getTime();
  const middleTouchpoints = touchpoints.filter((tp) => {
    const time = tp.timestamp.getTime();
    return time > firstTouchTime && time < leadCreationTime;
  });

  // Calculate credits based on whether opportunity exists
  let firstTouchCredit: number;
  let leadCreationCredit: number;
  let opportunityCredit: number;
  let middleCredit: number;

  if (hasOpportunity) {
    firstTouchCredit = W_SHAPE_CREDITS.FIRST_TOUCH;
    leadCreationCredit = W_SHAPE_CREDITS.LEAD_CREATION;
    opportunityCredit = W_SHAPE_CREDITS.OPPORTUNITY_CREATION;
    middleCredit = W_SHAPE_CREDITS.MIDDLE_TOUCHPOINTS;
  } else {
    firstTouchCredit = PRE_OPPORTUNITY_CREDITS.FIRST_TOUCH;
    leadCreationCredit = PRE_OPPORTUNITY_CREDITS.LEAD_CREATION;
    opportunityCredit = 0;
    middleCredit = PRE_OPPORTUNITY_CREDITS.MIDDLE_TOUCHPOINTS;
  }

  // Distribute middle credit across middle touchpoints
  const middleTouchpointCredits: TouchpointCredit[] = middleTouchpoints.map((tp) => ({
    touchpoint: tp,
    credit: middleTouchpoints.length > 0 ? middleCredit / middleTouchpoints.length : 0,
  }));

  // Build attribution result
  const result: AttributionResult = {
    visitorId,
    conversionTimestamp,
    firstTouch: { touchpoint: firstTouch, credit: firstTouchCredit },
    leadCreation: { touchpoint: leadCreation, credit: leadCreationCredit },
    middleTouchpoints: middleTouchpointCredits,
    channelCredits: {},
    totalTouchpoints: touchpoints.length,
  };

  // Add opportunity if exists
  if (hasOpportunity && opportunity) {
    // Find the touchpoint closest to opportunity creation
    const opportunityTouchpoint = findClosestTouchpoint(touchpoints, opportunity.timestamp);
    if (opportunityTouchpoint) {
      result.opportunityCreation = {
        touchpoint: opportunityTouchpoint,
        credit: opportunityCredit,
      };
    }
  }

  // Calculate channel credits
  result.channelCredits = calculateChannelCredits(result);

  return result;
}

/**
 * Find the touchpoint closest to a given timestamp
 */
function findClosestTouchpoint(touchpoints: Touchpoint[], targetTime: Date): Touchpoint | null {
  if (touchpoints.length === 0) return null;

  let closest = touchpoints[0];
  let closestDiff = Math.abs(touchpoints[0].timestamp.getTime() - targetTime.getTime());

  for (const tp of touchpoints) {
    const diff = Math.abs(tp.timestamp.getTime() - targetTime.getTime());
    if (diff < closestDiff) {
      closest = tp;
      closestDiff = diff;
    }
  }

  return closest;
}

/**
 * Aggregate credits by channel
 */
function calculateChannelCredits(result: AttributionResult): Record<string, number> {
  const credits: Record<string, number> = {};

  function addCredit(touchpoint: Touchpoint, credit: number) {
    const channel = normalizeToChannel(touchpoint.source, touchpoint.medium);
    credits[channel] = (credits[channel] || 0) + credit;
  }

  // First touch
  addCredit(result.firstTouch.touchpoint, result.firstTouch.credit);

  // Lead creation (avoid double counting if same as first touch)
  if (result.leadCreation.touchpoint.id !== result.firstTouch.touchpoint.id) {
    addCredit(result.leadCreation.touchpoint, result.leadCreation.credit);
  } else {
    // If same touchpoint, combine credits
    const channel = normalizeToChannel(
      result.firstTouch.touchpoint.source,
      result.firstTouch.touchpoint.medium
    );
    credits[channel] =
      (credits[channel] || 0) - result.firstTouch.credit + result.firstTouch.credit + result.leadCreation.credit;
  }

  // Opportunity (if exists)
  if (result.opportunityCreation) {
    addCredit(result.opportunityCreation.touchpoint, result.opportunityCreation.credit);
  }

  // Middle touchpoints
  for (const middle of result.middleTouchpoints) {
    addCredit(middle.touchpoint, middle.credit);
  }

  return credits;
}

// ============================================
// Channel Attribution Summary
// ============================================

/**
 * Get channel-level attribution summary for a date range
 */
export async function getChannelAttribution(
  startDate: Date,
  endDate: Date
): Promise<ChannelSummary> {
  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  // Get all touchpoints in date range
  const touchpoints = await getTouchpointsForDateRange(startStr, endStr);

  // Get opportunities in date range for revenue
  const opportunities = await getOpportunitiesForDateRange(startStr, endStr);

  // Group touchpoints by visitor
  const visitorTouchpoints = new Map<string, Touchpoint[]>();
  for (const tp of touchpoints) {
    const existing = visitorTouchpoints.get(tp.visitorId) || [];
    existing.push(tp);
    visitorTouchpoints.set(tp.visitorId, existing);
  }

  // Calculate attribution for each visitor who converted
  const channelData = new Map<
    string,
    {
      totalCredit: number;
      conversions: number;
      revenue: number;
      firstTouchCount: number;
      leadCreationCount: number;
      opportunityCount: number;
      assistCount: number;
    }
  >();

  let totalConversions = 0;
  let totalRevenue = 0;

  for (const [visitorId, vTouchpoints] of visitorTouchpoints) {
    // Check if visitor has a conversion touchpoint
    const conversionTouchpoint = vTouchpoints.find(
      (tp) =>
        tp.type === "form_submit" ||
        tp.type === "chat_lead" ||
        tp.type === "assessment_complete" ||
        tp.type === "guide_download"
    );

    if (!conversionTouchpoint) continue;

    totalConversions++;

    // Calculate attribution for this conversion
    const attribution = await calculateAttribution(visitorId, conversionTouchpoint.timestamp);
    if (!attribution) continue;

    // Get associated opportunity revenue if any
    const visitorOpportunity = opportunities.find((o) => o.visitorId === visitorId);
    const revenue = visitorOpportunity?.dealValue || 0;
    totalRevenue += revenue;

    // Aggregate channel credits
    for (const [channel, credit] of Object.entries(attribution.channelCredits)) {
      const existing = channelData.get(channel) || {
        totalCredit: 0,
        conversions: 0,
        revenue: 0,
        firstTouchCount: 0,
        leadCreationCount: 0,
        opportunityCount: 0,
        assistCount: 0,
      };

      existing.totalCredit += credit;
      existing.conversions++;
      existing.revenue += revenue * credit; // Weighted revenue

      channelData.set(channel, existing);
    }

    // Track position counts
    const firstTouchChannel = normalizeToChannel(
      attribution.firstTouch.touchpoint.source,
      attribution.firstTouch.touchpoint.medium
    );
    const leadChannel = normalizeToChannel(
      attribution.leadCreation.touchpoint.source,
      attribution.leadCreation.touchpoint.medium
    );

    const ftData = channelData.get(firstTouchChannel);
    if (ftData) ftData.firstTouchCount++;

    const lcData = channelData.get(leadChannel);
    if (lcData) lcData.leadCreationCount++;

    if (attribution.opportunityCreation) {
      const oppChannel = normalizeToChannel(
        attribution.opportunityCreation.touchpoint.source,
        attribution.opportunityCreation.touchpoint.medium
      );
      const oppData = channelData.get(oppChannel);
      if (oppData) oppData.opportunityCount++;
    }

    for (const middle of attribution.middleTouchpoints) {
      const assistChannel = normalizeToChannel(middle.touchpoint.source, middle.touchpoint.medium);
      const assistData = channelData.get(assistChannel);
      if (assistData) assistData.assistCount++;
    }
  }

  // Build channel attribution array
  const channels: ChannelAttribution[] = Array.from(channelData.entries())
    .map(([channel, data]) => ({
      channel,
      totalCredit: Math.round(data.totalCredit * 1000) / 1000,
      conversions: data.conversions,
      revenue: data.revenue > 0 ? Math.round(data.revenue * 100) / 100 : undefined,
      avgCreditPerConversion:
        data.conversions > 0
          ? Math.round((data.totalCredit / data.conversions) * 1000) / 1000
          : 0,
      firstTouchCount: data.firstTouchCount,
      leadCreationCount: data.leadCreationCount,
      opportunityCount: data.opportunityCount,
      assistCount: data.assistCount,
    }))
    .sort((a, b) => b.totalCredit - a.totalCredit);

  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return {
    period: {
      startDate: startStr,
      endDate: endStr,
      days,
    },
    totalConversions,
    totalRevenue: totalRevenue > 0 ? totalRevenue : undefined,
    channels,
  };
}

// ============================================
// Opportunity Management
// ============================================

/**
 * Mark opportunity creation for full W-shape attribution
 */
export async function markOpportunityCreated(
  visitorId: string,
  timestamp: Date,
  dealValue?: number
): Promise<void> {
  // Calculate attribution snapshot at opportunity creation
  const attribution = await calculateAttribution(visitorId, timestamp);

  await storeOpportunityToDB({
    id: uuidv4(),
    visitorId,
    timestamp,
    dealValue,
    attributionSnapshot: attribution || undefined,
  });
}

// ============================================
// Self-Reported Attribution
// ============================================

/**
 * Record "How did you hear about us?" response
 */
export async function recordSelfReportedSource(
  visitorId: string,
  response: string
): Promise<void> {
  const normalizedChannel = normalizeSelfReportedResponse(response);

  await storeSelfReportedSourceToDB({
    visitorId,
    timestamp: new Date(),
    response,
    normalizedChannel,
  });
}

// ============================================
// Re-exports
// ============================================

export {
  type Touchpoint,
  type TouchpointType,
  type AttributionResult,
  type ChannelSummary,
  type ChannelAttribution,
  W_SHAPE_CREDITS,
  PRE_OPPORTUNITY_CREDITS,
  normalizeToChannel,
  normalizeSelfReportedResponse,
} from "./attribution/types";
