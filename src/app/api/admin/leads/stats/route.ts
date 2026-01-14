import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeadStats } from "@/lib/leads/lead-service";

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  try {
    // Default to last 30 days if no dates provided
    const endDate = searchParams.get("endDate") || new Date().toISOString().split("T")[0];
    const startDate =
      searchParams.get("startDate") ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    const stats = await getLeadStats(startDate, endDate);

    return NextResponse.json({
      period: { startDate, endDate },
      stats,
    });
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    return NextResponse.json({ error: "Failed to fetch lead statistics" }, { status: 500 });
  }
}
