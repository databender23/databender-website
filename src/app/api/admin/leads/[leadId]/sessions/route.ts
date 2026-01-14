import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeadById } from "@/lib/leads/lead-service";
import { getSessionsByVisitorId } from "@/lib/analytics/dynamodb";

interface RouteContext {
  params: Promise<{ leadId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leadId } = await context.params;

  try {
    // Get the lead to find their visitorId
    const lead = await getLeadById(leadId);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    if (!lead.visitorId) {
      return NextResponse.json({
        sessions: [],
        message: "No visitor tracking data for this lead",
      });
    }

    // Get sessions for this visitor (last 90 days)
    const sessions = await getSessionsByVisitorId(lead.visitorId, 90);

    return NextResponse.json({
      sessions,
      visitorId: lead.visitorId,
      totalSessions: sessions.length,
    });
  } catch (error) {
    console.error("Error fetching lead sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}
