import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange, getSessionsForDateRange, getConversionPathsForDateRange } from "@/lib/analytics/dynamodb";
import {
  getLeadTier,
  calculatePageScore,
  type LeadTier,
} from "@/lib/analytics/lead-scoring";

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
    const [events, sessions, conversionPaths] = await Promise.all([
      getEventsForDateRange(startStr, endStr),
      getSessionsForDateRange(startStr, endStr),
      getConversionPathsForDateRange(startStr, endStr),
    ]);

    // Filter out bot traffic and admin pages for metrics
    const humanEvents = events.filter((e) => !e.isBot);
    const humanSessions = sessions; // Sessions are only created for non-bots in pageviews

    // Helper to check if a page is an admin page
    const isAdminPage = (page: string) => page.startsWith("/admin");

    // Calculate metrics (excluding admin pages)
    const pageviews = humanEvents.filter((e) => e.eventType === "pageview" && !isAdminPage(e.page)).length;
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

    // Top pages with time on page (excluding admin pages)
    const pageCounts: Record<string, { count: number; totalTime: number }> = {};
    humanEvents
      .filter((e) => e.eventType === "pageview" && !isAdminPage(e.page))
      .forEach((e) => {
        if (!pageCounts[e.page]) pageCounts[e.page] = { count: 0, totalTime: 0 };
        pageCounts[e.page].count += 1;
      });

    // Add time data from page_exit events (excluding admin pages)
    humanEvents
      .filter((e) => e.eventType === "page_exit" && e.timeOnPage && !isAdminPage(e.page))
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

    // Pageviews by day (excluding admin pages)
    const pageviewsByDay: Record<string, number> = {};
    humanEvents
      .filter((e) => e.eventType === "pageview" && !isAdminPage(e.page))
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

    // Calculate bounce rate (sessions with only 1 pageview, excluding admin pages)
    const sessionPageCounts: Record<string, number> = {};
    humanEvents
      .filter((e) => e.eventType === "pageview" && !isAdminPage(e.page))
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

    // Company identification stats
    const sessionsWithCompany = humanSessions.filter((s) => s.companyName);
    const uniqueCompanies = new Set(sessionsWithCompany.map((s) => s.companyDomain?.toLowerCase())).size;

    // Top companies by visit count
    const companyVisits: Record<string, { name: string; domain: string; visits: number }> = {};
    sessionsWithCompany.forEach((s) => {
      if (s.companyDomain) {
        const key = s.companyDomain.toLowerCase();
        if (!companyVisits[key]) {
          companyVisits[key] = { name: s.companyName!, domain: s.companyDomain, visits: 0 };
        }
        companyVisits[key].visits += 1;
      }
    });

    const topCompanies = Object.values(companyVisits)
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)
      .map(({ name, domain, visits }) => ({ name, domain, visits }));

    // Lead score metrics
    const tierBreakdown: Record<LeadTier, number> = {
      Cold: 0,
      Warm: 0,
      Hot: 0,
      "Very Hot": 0,
    };

    // Calculate scores from sessions that have lead scores
    const sessionsWithScores = humanSessions.filter((s) => s.leadScore !== undefined && s.leadScore > 0);
    let totalLeadScore = 0;

    sessionsWithScores.forEach((s) => {
      const score = s.leadScore || 0;
      totalLeadScore += score;
      const tier = s.leadTier || getLeadTier(score);
      tierBreakdown[tier as LeadTier]++;
    });

    const averageLeadScore = sessionsWithScores.length > 0
      ? Math.round(totalLeadScore / sessionsWithScores.length)
      : 0;

    // Calculate page contributions to lead scores (excluding admin pages)
    const pageScoreContributions: Record<string, { score: number; visits: number }> = {};
    sessionsWithScores.forEach((s) => {
      const pages = (s.pagesVisited || []).filter((page) => !isAdminPage(page));
      pages.forEach((page) => {
        const pageScore = calculatePageScore(page);
        if (!pageScoreContributions[page]) {
          pageScoreContributions[page] = { score: 0, visits: 0 };
        }
        pageScoreContributions[page].score += pageScore;
        pageScoreContributions[page].visits++;
      });
    });

    const topScoringPages = Object.entries(pageScoreContributions)
      .map(([page, data]) => ({
        page,
        contributedScore: data.score,
        visits: data.visits,
      }))
      .sort((a, b) => b.contributedScore - a.contributedScore)
      .slice(0, 10);

    // High score visitors (Hot and Very Hot)
    const highScoreVisitors = humanSessions
      .filter((s) => {
        const score = s.leadScore || 0;
        const tier = s.leadTier || getLeadTier(score);
        return tier === "Hot" || tier === "Very Hot";
      })
      .sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0))
      .slice(0, 10)
      .map((s) => ({
        visitorId: s.visitorId,
        score: s.leadScore || 0,
        tier: (s.leadTier || getLeadTier(s.leadScore || 0)) as LeadTier,
        pagesVisited: s.pagesVisited || [],
        country: s.country,
        device: s.device,
      }));

    // Attribution summary
    const totalConversionPaths = conversionPaths.length;
    const avgJourneyLength = totalConversionPaths > 0
      ? Math.round((conversionPaths.reduce((sum, c) => sum + c.journeyLength, 0) / totalConversionPaths) * 10) / 10
      : 0;
    const singlePageConversions = conversionPaths.filter((c) => c.journeyLength === 1).length;

    // Top first-touch pages (entry points that lead to conversions, excluding admin pages)
    const firstTouchCounts: Record<string, number> = {};
    conversionPaths.forEach((c) => {
      const page = c.firstTouchPage;
      if (!isAdminPage(page)) {
        firstTouchCounts[page] = (firstTouchCounts[page] || 0) + 1;
      }
    });

    const topFirstTouchPages = Object.entries(firstTouchCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

    // Top last-touch pages (pages where conversions happen, excluding admin pages)
    const lastTouchCounts: Record<string, number> = {};
    conversionPaths.forEach((c) => {
      const page = c.lastTouchPage;
      if (!isAdminPage(page)) {
        lastTouchCounts[page] = (lastTouchCounts[page] || 0) + 1;
      }
    });

    const topLastTouchPages = Object.entries(lastTouchCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([page, count]) => ({ page, count }));

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
      // Company identification
      companyIdentification: {
        identifiedCompanies: uniqueCompanies,
        identifiedSessions: sessionsWithCompany.length,
        topCompanies,
      },
      // Lead scoring metrics
      leadScoring: {
        tierBreakdown,
        averageScore: averageLeadScore,
        topScoringPages,
        highScoreVisitors,
      },
      // Attribution summary
      attribution: {
        trackedConversions: totalConversionPaths,
        averageJourneyLength: avgJourneyLength,
        singlePageConversions,
        multiPageConversions: totalConversionPaths - singlePageConversions,
        topFirstTouchPages,
        topLastTouchPages,
      },
    });
  } catch (error) {
    console.error("Analytics overview error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
