import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange, getSessionsForDateRange } from "@/lib/analytics/dynamodb";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { TrackedEvent, Session } from "@/lib/analytics/events";

interface PageMetrics {
  page: string;
  views: number;
  uniqueVisitors: number;
  leads: number;
  conversionRate: number;
}

interface EntryPageMetrics {
  page: string;
  entries: number;
}

interface ContentAnalyticsResponse {
  pages: PageMetrics[];
  entryPages: EntryPageMetrics[];
  period: {
    start: string;
    end: string;
  };
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  // Support both date range and days parameter for flexibility
  const daysParam = searchParams.get("days");
  let startDate = searchParams.get("startDate");
  let endDate = searchParams.get("endDate");

  // Default to last 30 days if no params provided
  const now = new Date();
  if (!startDate && !endDate && !daysParam) {
    endDate = now.toISOString().split("T")[0];
    const start = new Date(now);
    start.setDate(start.getDate() - 30);
    startDate = start.toISOString().split("T")[0];
  } else if (daysParam) {
    const days = parseInt(daysParam, 10) || 30;
    endDate = now.toISOString().split("T")[0];
    const start = new Date(now);
    start.setDate(start.getDate() - days);
    startDate = start.toISOString().split("T")[0];
  } else {
    // Fill in missing date range values
    if (!endDate) {
      endDate = now.toISOString().split("T")[0];
    }
    if (!startDate) {
      const start = new Date(now);
      start.setDate(start.getDate() - 30);
      startDate = start.toISOString().split("T")[0];
    }
  }

  const limit = parseInt(searchParams.get("limit") || "20", 10);

  try {
    // Fetch events, sessions, and leads in parallel
    const [events, sessions, leadsResult] = await Promise.all([
      getEventsForDateRange(startDate!, endDate!),
      getSessionsForDateRange(startDate!, endDate!),
      scanLeads({
        startDate: startDate!,
        endDate: endDate!,
        limit: 1000, // Fetch a large number for accurate aggregation
      }),
    ]);

    // Filter out bot traffic and admin pages
    const humanEvents = events.filter((e) => !e.isBot);
    const pageviewEvents = humanEvents.filter(
      (e) => e.eventType === "pageview" && !e.page.startsWith("/admin")
    );

    // Aggregate page metrics
    const pageMetricsMap = aggregatePageMetrics(pageviewEvents, leadsResult.leads);

    // Sort by views and take top N
    const sortedPages = Object.values(pageMetricsMap)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);

    // Calculate entry pages from sessions
    const entryPages = calculateEntryPages(sessions, limit);

    const response: ContentAnalyticsResponse = {
      pages: sortedPages,
      entryPages,
      period: {
        start: startDate!,
        end: endDate!,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Content analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content analytics" },
      { status: 500 }
    );
  }
}

interface LeadLike {
  sourcePage?: string;
}

function aggregatePageMetrics(
  pageviewEvents: TrackedEvent[],
  leads: LeadLike[]
): Record<string, PageMetrics> {
  const pageMetrics: Record<string, {
    views: number;
    visitors: Set<string>;
    leads: number;
  }> = {};

  // Aggregate pageviews and unique visitors
  for (const event of pageviewEvents) {
    const page = event.page;

    if (!pageMetrics[page]) {
      pageMetrics[page] = {
        views: 0,
        visitors: new Set(),
        leads: 0,
      };
    }

    pageMetrics[page].views++;
    pageMetrics[page].visitors.add(event.visitorId);
  }

  // Count leads by source page
  for (const lead of leads) {
    const sourcePage = lead.sourcePage;
    if (sourcePage && pageMetrics[sourcePage]) {
      pageMetrics[sourcePage].leads++;
    }
  }

  // Transform to final format with conversion rates
  const result: Record<string, PageMetrics> = {};

  for (const [page, metrics] of Object.entries(pageMetrics)) {
    const uniqueVisitors = metrics.visitors.size;
    const leads = metrics.leads;
    const conversionRate = uniqueVisitors > 0
      ? Math.round((leads / uniqueVisitors) * 10000) / 100
      : 0;

    result[page] = {
      page,
      views: metrics.views,
      uniqueVisitors,
      leads,
      conversionRate,
    };
  }

  return result;
}

function calculateEntryPages(
  sessions: Session[],
  limit: number
): EntryPageMetrics[] {
  const entryPageCounts: Record<string, number> = {};

  for (const session of sessions) {
    const entryPage = session.entryPage;
    // Exclude admin pages from entry pages
    if (entryPage && !entryPage.startsWith("/admin")) {
      entryPageCounts[entryPage] = (entryPageCounts[entryPage] || 0) + 1;
    }
  }

  return Object.entries(entryPageCounts)
    .map(([page, entries]) => ({ page, entries }))
    .sort((a, b) => b.entries - a.entries)
    .slice(0, limit);
}
