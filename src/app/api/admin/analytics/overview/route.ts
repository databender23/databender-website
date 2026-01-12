import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange, getSessionsForDateRange } from "@/lib/analytics/dynamodb";

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7", 10);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const [events, sessions] = await Promise.all([
      getEventsForDateRange(startStr, endStr),
      getSessionsForDateRange(startStr, endStr),
    ]);

    // Calculate metrics
    const pageviews = events.filter((e) => e.eventType === "pageview").length;
    const uniqueVisitors = new Set(events.map((e) => e.visitorId)).size;
    const totalSessions = sessions.length;
    const conversions = sessions.filter((s) => s.isConverted).length;
    const chatOpens = events.filter((e) => e.eventType === "chat_open").length;
    const chatMessages = events.filter((e) => e.eventType === "chat_message").length;

    // Top pages
    const pageCounts: Record<string, number> = {};
    events
      .filter((e) => e.eventType === "pageview")
      .forEach((e) => {
        pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
      });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }));

    // Pageviews by day
    const pageviewsByDay: Record<string, number> = {};
    events
      .filter((e) => e.eventType === "pageview")
      .forEach((e) => {
        const day = e.timestamp.split("T")[0];
        pageviewsByDay[day] = (pageviewsByDay[day] || 0) + 1;
      });

    const dailyPageviews = Object.entries(pageviewsByDay)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));

    // Device breakdown
    const deviceCounts: Record<string, number> = {};
    sessions.forEach((s) => {
      deviceCounts[s.device] = (deviceCounts[s.device] || 0) + 1;
    });

    // Conversion breakdown
    const conversionTypes: Record<string, number> = {};
    sessions
      .filter((s) => s.isConverted && s.conversionType)
      .forEach((s) => {
        conversionTypes[s.conversionType!] = (conversionTypes[s.conversionType!] || 0) + 1;
      });

    return NextResponse.json({
      period: { start: startStr, end: endStr, days },
      metrics: {
        pageviews,
        uniqueVisitors,
        sessions: totalSessions,
        conversions,
        conversionRate: totalSessions > 0 ? ((conversions / totalSessions) * 100).toFixed(1) : "0",
        chatOpens,
        chatMessages,
      },
      topPages,
      dailyPageviews,
      deviceBreakdown: deviceCounts,
      conversionBreakdown: conversionTypes,
    });
  } catch (error) {
    console.error("Analytics overview error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
