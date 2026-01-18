/**
 * Channel Attribution Summary API
 *
 * Returns W-shaped attribution summary aggregated by channel for a date range.
 * Shows credit distribution, conversion counts, and revenue per channel.
 *
 * GET /api/admin/analytics/attribution/channel-summary?days=30
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getChannelAttribution } from "@/lib/analytics/attribution";

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30", 10);

  // Validate days parameter
  if (isNaN(days) || days < 1 || days > 365) {
    return NextResponse.json(
      { error: "Invalid days parameter. Must be between 1 and 365." },
      { status: 400 }
    );
  }

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  try {
    const channelSummary = await getChannelAttribution(startDate, endDate);

    return NextResponse.json({
      success: true,
      ...channelSummary,
      meta: {
        model: "W-shaped",
        creditDistribution: {
          firstTouch: "30%",
          leadCreation: "30%",
          opportunityCreation: "30%",
          middleTouchpoints: "10%",
        },
        note: "Pre-opportunity conversions use 40/40/20 distribution",
      },
    });
  } catch (error) {
    console.error("Channel attribution summary error:", error);
    return NextResponse.json(
      { error: "Failed to fetch channel attribution data" },
      { status: 500 }
    );
  }
}
