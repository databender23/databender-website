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

    // Filter out bot traffic for metrics
    const humanEvents = events.filter((e) => !e.isBot);
    const humanSessions = sessions; // Sessions are only created for non-bots in pageviews

    // Calculate metrics
    const pageviews = humanEvents.filter((e) => e.eventType === "pageview").length;
    const uniqueVisitors = new Set(humanEvents.map((e) => e.visitorId)).size;
    const totalSessions = humanSessions.length;
    const conversions = humanSessions.filter((s) => s.isConverted).length;
    const chatOpens = humanEvents.filter((e) => e.eventType === "chat_open").length;
    const chatMessages = humanEvents.filter((e) => e.eventType === "chat_message").length;

    // Bot count
    const botPageviews = events.filter((e) => e.isBot && e.eventType === "pageview").length;

    // Returning vs new visitors
    const returningVisitors = humanSessions.filter((s) => s.isReturning).length;
    const newVisitors = humanSessions.filter((s) => !s.isReturning).length;

    // Average session duration
    const sessionsWithDuration = humanSessions.filter((s) => s.duration && s.duration > 0);
    const avgSessionDuration = sessionsWithDuration.length > 0
      ? Math.round(sessionsWithDuration.reduce((sum, s) => sum + (s.duration || 0), 0) / sessionsWithDuration.length)
      : 0;

    // Top pages with time on page
    const pageCounts: Record<string, { count: number; totalTime: number }> = {};
    humanEvents
      .filter((e) => e.eventType === "pageview")
      .forEach((e) => {
        if (!pageCounts[e.page]) pageCounts[e.page] = { count: 0, totalTime: 0 };
        pageCounts[e.page].count += 1;
      });

    // Add time data from page_exit events
    humanEvents
      .filter((e) => e.eventType === "page_exit" && e.timeOnPage)
      .forEach((e) => {
        if (pageCounts[e.page]) {
          pageCounts[e.page].totalTime += e.timeOnPage || 0;
        }
      });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([page, data]) => ({
        page,
        count: data.count,
        avgTime: data.count > 0 ? Math.round(data.totalTime / data.count) : 0,
      }));

    // Pageviews by day
    const pageviewsByDay: Record<string, number> = {};
    humanEvents
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
    humanSessions.forEach((s) => {
      deviceCounts[s.device] = (deviceCounts[s.device] || 0) + 1;
    });

    // Browser breakdown
    const browserCounts: Record<string, number> = {};
    humanSessions.forEach((s) => {
      if (s.browser) {
        browserCounts[s.browser] = (browserCounts[s.browser] || 0) + 1;
      }
    });

    // OS breakdown
    const osCounts: Record<string, number> = {};
    humanSessions.forEach((s) => {
      if (s.os) {
        osCounts[s.os] = (osCounts[s.os] || 0) + 1;
      }
    });

    // Country breakdown
    const countryCounts: Record<string, number> = {};
    humanSessions.forEach((s) => {
      if (s.country) {
        countryCounts[s.country] = (countryCounts[s.country] || 0) + 1;
      }
    });

    const topCountries = Object.entries(countryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    // Referrer source breakdown
    const referrerCounts: Record<string, number> = {};
    humanSessions.forEach((s) => {
      const source = s.referrerSource || "direct";
      referrerCounts[source] = (referrerCounts[source] || 0) + 1;
    });

    const topReferrers = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, count]) => ({ source, count }));

    // Scroll depth breakdown
    const scrollDepthCounts: Record<number, number> = { 25: 0, 50: 0, 75: 0, 100: 0 };
    humanEvents
      .filter((e) => e.eventType === "scroll_depth" && e.data?.depth)
      .forEach((e) => {
        const depth = e.data?.depth as number;
        if (scrollDepthCounts[depth] !== undefined) {
          scrollDepthCounts[depth] += 1;
        }
      });

    // Calculate bounce rate (sessions with only 1 pageview)
    const sessionPageCounts: Record<string, number> = {};
    humanEvents
      .filter((e) => e.eventType === "pageview")
      .forEach((e) => {
        sessionPageCounts[e.sessionId] = (sessionPageCounts[e.sessionId] || 0) + 1;
      });
    const bouncedSessions = Object.values(sessionPageCounts).filter((count) => count === 1).length;
    const bounceRate = totalSessions > 0 ? ((bouncedSessions / totalSessions) * 100).toFixed(1) : "0";

    // Conversion breakdown
    const conversionTypes: Record<string, number> = {};
    humanSessions
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
        botPageviews,
        returningVisitors,
        newVisitors,
        avgSessionDuration,
        bounceRate,
      },
      topPages,
      dailyPageviews,
      deviceBreakdown: deviceCounts,
      browserBreakdown: browserCounts,
      osBreakdown: osCounts,
      topCountries,
      topReferrers,
      scrollDepthBreakdown: scrollDepthCounts,
      conversionBreakdown: conversionTypes,
    });
  } catch (error) {
    console.error("Analytics overview error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
