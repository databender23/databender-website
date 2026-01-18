/**
 * Opportunity Creation API
 *
 * Mark opportunity creation for full W-shaped attribution.
 * Typically called when a lead is marked as opportunity in CRM.
 *
 * POST /api/admin/analytics/attribution/opportunity
 * {
 *   visitorId: string,
 *   dealValue?: number,
 *   timestamp?: string (ISO date, defaults to now)
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  markOpportunityCreated,
  calculateAttribution,
} from "@/lib/analytics/attribution";

export async function POST(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { visitorId, dealValue, timestamp } = body as {
      visitorId: string;
      dealValue?: number;
      timestamp?: string;
    };

    if (!visitorId) {
      return NextResponse.json(
        { error: "visitorId is required" },
        { status: 400 }
      );
    }

    const opportunityTime = timestamp ? new Date(timestamp) : new Date();

    // Mark the opportunity
    await markOpportunityCreated(visitorId, opportunityTime, dealValue);

    // Calculate and return the attribution result
    const attribution = await calculateAttribution(visitorId, opportunityTime);

    return NextResponse.json({
      success: true,
      message: "Opportunity marked successfully",
      visitorId,
      opportunityTime: opportunityTime.toISOString(),
      dealValue,
      attribution: attribution
        ? {
            totalTouchpoints: attribution.totalTouchpoints,
            channelCredits: attribution.channelCredits,
            firstTouchChannel: attribution.firstTouch.touchpoint.source,
            leadCreationChannel: attribution.leadCreation.touchpoint.source,
            opportunityChannel: attribution.opportunityCreation?.touchpoint.source,
          }
        : null,
    });
  } catch (error) {
    console.error("Opportunity creation error:", error);
    return NextResponse.json(
      { error: "Failed to mark opportunity" },
      { status: 500 }
    );
  }
}
