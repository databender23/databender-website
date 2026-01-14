import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getSessionsForDateRange } from "@/lib/analytics/dynamodb";
import { scanLeads } from "@/lib/leads/dynamodb";
import { categorizeSource, extractDomain, type TrafficSource } from "@/lib/analytics/source-categorization";
import type { Session } from "@/lib/analytics/events";
import type { Lead } from "@/lib/leads/types";

interface SourceMetrics {
  source: string;
  sessions: number;
  visitors: number;
  leads: number;
  conversionRate: number;
  avgBehaviorScore: number;
}

interface ReferrerMetrics {
  domain: string;
  visitors: number;
  leads: number;
  avgScore: number;
}

interface SourcesResponse {
  period: {
    start: string;
    end: string;
    days: number;
  };
  sources: SourceMetrics[];
  topReferrers: ReferrerMetrics[];
}

/**
 * GET /api/admin/analytics/sources
 * Returns traffic source quality metrics
 *
 * Query params:
 * - startDate: YYYY-MM-DD (optional, defaults to 30 days ago)
 * - endDate: YYYY-MM-DD (optional, defaults to today)
 * - days: number (optional, alternative to date range, defaults to 30)
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Verify admin authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  // Parse date range from query params
  let startStr: string;
  let endStr: string;
  let days: number;

  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const daysParam = searchParams.get("days");

  if (startDateParam && endDateParam) {
    startStr = startDateParam;
    endStr = endDateParam;
    const startDate = new Date(startStr);
    const endDate = new Date(endStr);
    days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    days = parseInt(daysParam || "30", 10);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startStr = startDate.toISOString().split("T")[0];
    endStr = endDate.toISOString().split("T")[0];
  }

  try {
    // Fetch sessions and leads in parallel
    const [sessions, leadsResult] = await Promise.all([
      getSessionsForDateRange(startStr, endStr),
      getAllLeadsInRange(startStr, endStr),
    ]);

    // Build source metrics
    const sourceData = aggregateBySource(sessions, leadsResult);

    // Build referrer metrics
    const referrerData = aggregateByReferrer(sessions, leadsResult);

    const response: SourcesResponse = {
      period: {
        start: startStr,
        end: endStr,
        days,
      },
      sources: sourceData,
      topReferrers: referrerData,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Traffic sources analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch traffic source analytics" },
      { status: 500 }
    );
  }
}

/**
 * Fetch all leads within date range using pagination
 */
async function getAllLeadsInRange(startDate: string, endDate: string): Promise<Lead[]> {
  const allLeads: Lead[] = [];
  let lastKey: string | undefined;

  do {
    const result = await scanLeads({
      startDate,
      endDate: endDate + "T23:59:59.999Z",
      limit: 100,
      lastKey,
    });
    allLeads.push(...result.leads);
    lastKey = result.lastKey;
  } while (lastKey);

  return allLeads;
}

/**
 * Aggregate metrics by traffic source category
 */
function aggregateBySource(sessions: Session[], leads: Lead[]): SourceMetrics[] {
  // Map to track metrics per source
  const sourceMap = new Map<TrafficSource, {
    sessions: number;
    visitors: Set<string>;
    leads: number;
    totalBehaviorScore: number;
    behaviorScoreCount: number;
  }>();

  // Initialize all source types
  const allSources: TrafficSource[] = ["linkedin", "twitter", "organic", "direct", "referral", "paid", "other"];
  for (const source of allSources) {
    sourceMap.set(source, {
      sessions: 0,
      visitors: new Set(),
      leads: 0,
      totalBehaviorScore: 0,
      behaviorScoreCount: 0,
    });
  }

  // Process sessions
  for (const session of sessions) {
    const source = categorizeSource(
      session.referrerSource || null,
      undefined, // UTM source not stored directly on session
      session.referrerMedium
    );

    const data = sourceMap.get(source)!;
    data.sessions++;
    data.visitors.add(session.visitorId);

    if (session.leadScore !== undefined && session.leadScore > 0) {
      data.totalBehaviorScore += session.leadScore;
      data.behaviorScoreCount++;
    }
  }

  // Process leads - attribute to their source
  for (const lead of leads) {
    const source = categorizeSource(
      lead.referrerSource || null,
      lead.utmSource,
      lead.utmMedium
    );

    const data = sourceMap.get(source)!;
    data.leads++;
  }

  // Convert to array and calculate derived metrics
  const results: SourceMetrics[] = [];

  for (const [source, data] of sourceMap) {
    const visitorCount = data.visitors.size;

    // Only include sources with activity
    if (data.sessions > 0 || data.leads > 0) {
      results.push({
        source,
        sessions: data.sessions,
        visitors: visitorCount,
        leads: data.leads,
        conversionRate: visitorCount > 0
          ? parseFloat(((data.leads / visitorCount) * 100).toFixed(2))
          : 0,
        avgBehaviorScore: data.behaviorScoreCount > 0
          ? Math.round(data.totalBehaviorScore / data.behaviorScoreCount)
          : 0,
      });
    }
  }

  // Sort by sessions descending
  return results.sort((a, b) => b.sessions - a.sessions);
}

/**
 * Aggregate metrics by referring domain
 */
function aggregateByReferrer(sessions: Session[], leads: Lead[]): ReferrerMetrics[] {
  // Map to track metrics per referrer domain
  const referrerMap = new Map<string, {
    visitors: Set<string>;
    leads: number;
    totalScore: number;
    scoreCount: number;
  }>();

  // Process sessions
  for (const session of sessions) {
    if (!session.referrerSource) continue;

    const domain = extractDomain(session.referrerSource);

    // Skip internal/direct traffic
    if (domain === "direct" || domain.includes("databender")) continue;

    if (!referrerMap.has(domain)) {
      referrerMap.set(domain, {
        visitors: new Set(),
        leads: 0,
        totalScore: 0,
        scoreCount: 0,
      });
    }

    const data = referrerMap.get(domain)!;
    data.visitors.add(session.visitorId);

    if (session.leadScore !== undefined && session.leadScore > 0) {
      data.totalScore += session.leadScore;
      data.scoreCount++;
    }
  }

  // Process leads
  for (const lead of leads) {
    if (!lead.referrerSource) continue;

    const domain = extractDomain(lead.referrerSource);
    if (domain === "direct" || domain.includes("databender")) continue;

    if (!referrerMap.has(domain)) {
      referrerMap.set(domain, {
        visitors: new Set(),
        leads: 0,
        totalScore: 0,
        scoreCount: 0,
      });
    }

    referrerMap.get(domain)!.leads++;
  }

  // Convert to array
  const results: ReferrerMetrics[] = [];

  for (const [domain, data] of referrerMap) {
    results.push({
      domain,
      visitors: data.visitors.size,
      leads: data.leads,
      avgScore: data.scoreCount > 0
        ? Math.round(data.totalScore / data.scoreCount)
        : 0,
    });
  }

  // Sort by visitors descending, limit to top 20
  return results
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 20);
}
