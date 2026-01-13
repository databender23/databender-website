import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange, getSessionsForDateRange } from "@/lib/analytics/dynamodb";
import type { TrackedEvent, Session } from "@/lib/analytics/events";

interface CompanyAnalytics {
  companyName: string;
  companyDomain: string;
  companyIndustry?: string;
  visitCount: number;
  uniqueVisitors: number;
  pageviews: number;
  pagesViewed: string[];
  lastVisit: string;
  firstVisit: string;
  isConverted: boolean;
  conversionTypes: string[];
  avgSessionDuration: number;
  maxScrollDepth: number;
  // Engagement scoring
  engagementScore: number;
  // Intent signals
  viewedContactPage: boolean;
  viewedPricingPage: boolean;
  viewedServicesPages: boolean;
  viewedCaseStudies: boolean;
  multipleVisits: boolean;
  // Inferred interests based on page views
  interestedServices: string[];
  interestedIndustries: string[];
  // Lead tier based on engagement
  leadTier: "Cold" | "Warm" | "Hot" | "Very Hot";
}

// Service page patterns to detect interest
const SERVICE_PATTERNS: Record<string, RegExp> = {
  "Data & AI Strategy": /\/services\/data-ai-strategy/i,
  "Analytics & BI": /\/services\/analytics-bi/i,
  "AI & Automation": /\/services\/ai-services/i,
  "Document Intelligence": /document-intelligence|agentic-document/i,
  "AI Agents": /ai-agents|army-of-ai-agents/i,
  "Lead Scoring": /lead-conversion|lead-scoring/i,
};

// Industry page patterns to detect interest
const INDUSTRY_PATTERNS: Record<string, RegExp> = {
  "Legal": /\/industries\/legal/i,
  "Healthcare": /\/industries\/healthcare/i,
  "Manufacturing": /\/industries\/manufacturing/i,
  "Finance": /\/industries\/finance/i,
  "Professional Services": /\/industries\/professional-services/i,
};

// High-intent page patterns - used for detecting contact/pricing views
// Note: These are currently checked inline in the company analysis loop
// Future enhancement: Could use this array for more flexible pattern matching

function calculateEngagementScore(company: {
  pageviews: number;
  visitCount: number;
  uniqueVisitors: number;
  isConverted: boolean;
  viewedContactPage: boolean;
  viewedPricingPage: boolean;
  viewedServicesPages: boolean;
  viewedCaseStudies: boolean;
  avgSessionDuration: number;
  maxScrollDepth: number;
}): number {
  let score = 0;

  // Base engagement from pageviews (max 30 points)
  score += Math.min(company.pageviews * 2, 30);

  // Multiple visits shows strong interest (max 20 points)
  score += Math.min(company.visitCount * 5, 20);

  // High-intent page views (10 points each)
  if (company.viewedContactPage) score += 15;
  if (company.viewedPricingPage) score += 15;

  // Content engagement (5 points each)
  if (company.viewedServicesPages) score += 5;
  if (company.viewedCaseStudies) score += 10;

  // Session duration bonus (max 10 points)
  if (company.avgSessionDuration > 60) score += 5;
  if (company.avgSessionDuration > 180) score += 5;

  // Scroll depth bonus (max 5 points)
  if (company.maxScrollDepth >= 75) score += 5;

  // Conversion bonus
  if (company.isConverted) score += 25;

  return score;
}

function determineLeadTier(score: number): "Cold" | "Warm" | "Hot" | "Very Hot" {
  if (score >= 75) return "Very Hot";
  if (score >= 50) return "Hot";
  if (score >= 25) return "Warm";
  return "Cold";
}

function extractInterests(pages: string[]): { services: string[]; industries: string[] } {
  const services: Set<string> = new Set();
  const industries: Set<string> = new Set();

  for (const page of pages) {
    // Check service patterns
    for (const [service, pattern] of Object.entries(SERVICE_PATTERNS)) {
      if (pattern.test(page)) {
        services.add(service);
      }
    }
    // Check industry patterns
    for (const [industry, pattern] of Object.entries(INDUSTRY_PATTERNS)) {
      if (pattern.test(page)) {
        industries.add(industry);
      }
    }
  }

  return {
    services: Array.from(services),
    industries: Array.from(industries),
  };
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30", 10);
  const minEngagement = parseInt(searchParams.get("minEngagement") || "0", 10);
  const tierFilter = searchParams.get("tier") || null;

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

    // Filter to only events with company data
    const companyEvents = events.filter(
      (e): e is TrackedEvent & { companyName: string; companyDomain: string } =>
        !e.isBot && !!e.companyName && !!e.companyDomain
    );

    // Filter sessions with company data
    const companySessions = sessions.filter(
      (s): s is Session & { companyName: string; companyDomain: string } =>
        !!s.companyName && !!s.companyDomain
    );

    // Group by company domain (more reliable than name)
    const companiesMap = new Map<string, {
      name: string;
      domain: string;
      industry?: string;
      events: TrackedEvent[];
      sessions: Session[];
    }>();

    for (const event of companyEvents) {
      const key = event.companyDomain.toLowerCase();
      if (!companiesMap.has(key)) {
        companiesMap.set(key, {
          name: event.companyName,
          domain: event.companyDomain,
          industry: event.companyIndustry,
          events: [],
          sessions: [],
        });
      }
      companiesMap.get(key)!.events.push(event);
    }

    for (const session of companySessions) {
      const key = session.companyDomain.toLowerCase();
      if (!companiesMap.has(key)) {
        companiesMap.set(key, {
          name: session.companyName,
          domain: session.companyDomain,
          industry: session.companyIndustry,
          events: [],
          sessions: [],
        });
      }
      companiesMap.get(key)!.sessions.push(session);
    }

    // Build company analytics
    const companies: CompanyAnalytics[] = [];

    for (const [, data] of companiesMap) {
      const pageviews = data.events.filter((e) => e.eventType === "pageview");
      const pagesViewed = [...new Set(pageviews.map((e) => e.page))];
      const uniqueVisitors = new Set(data.events.map((e) => e.visitorId)).size;
      const uniqueSessions = new Set(data.events.map((e) => e.sessionId)).size;

      // Get timestamps
      const timestamps = data.events.map((e) => new Date(e.timestamp).getTime());
      const lastVisit = new Date(Math.max(...timestamps)).toISOString();
      const firstVisit = new Date(Math.min(...timestamps)).toISOString();

      // Check for conversions
      const convertedSessions = data.sessions.filter((s) => s.isConverted);
      const conversionTypes = [...new Set(convertedSessions.map((s) => s.conversionType).filter(Boolean))] as string[];

      // Calculate average session duration
      const durationsWithData = data.sessions.filter((s) => s.duration && s.duration > 0);
      const avgSessionDuration = durationsWithData.length > 0
        ? Math.round(durationsWithData.reduce((sum, s) => sum + (s.duration || 0), 0) / durationsWithData.length)
        : 0;

      // Get max scroll depth
      const scrollDepths = data.sessions.filter((s) => s.maxScrollDepth).map((s) => s.maxScrollDepth!);
      const maxScrollDepth = scrollDepths.length > 0 ? Math.max(...scrollDepths) : 0;

      // Check intent signals
      const viewedContactPage = pagesViewed.some((p) => /\/contact/i.test(p));
      const viewedPricingPage = pagesViewed.some((p) => /\/pricing/i.test(p));
      const viewedServicesPages = pagesViewed.some((p) => /\/services\//i.test(p));
      const viewedCaseStudies = pagesViewed.some((p) => /\/case-studies\//i.test(p));

      // Extract interests
      const { services: interestedServices, industries: interestedIndustries } = extractInterests(pagesViewed);

      // Calculate engagement score
      const engagementScore = calculateEngagementScore({
        pageviews: pageviews.length,
        visitCount: uniqueSessions,
        uniqueVisitors,
        isConverted: convertedSessions.length > 0,
        viewedContactPage,
        viewedPricingPage,
        viewedServicesPages,
        viewedCaseStudies,
        avgSessionDuration,
        maxScrollDepth,
      });

      const leadTier = determineLeadTier(engagementScore);

      // Apply filters
      if (engagementScore < minEngagement) continue;
      if (tierFilter && leadTier !== tierFilter) continue;

      companies.push({
        companyName: data.name,
        companyDomain: data.domain,
        companyIndustry: data.industry,
        visitCount: uniqueSessions,
        uniqueVisitors,
        pageviews: pageviews.length,
        pagesViewed,
        lastVisit,
        firstVisit,
        isConverted: convertedSessions.length > 0,
        conversionTypes,
        avgSessionDuration,
        maxScrollDepth,
        engagementScore,
        viewedContactPage,
        viewedPricingPage,
        viewedServicesPages,
        viewedCaseStudies,
        multipleVisits: uniqueSessions > 1,
        interestedServices,
        interestedIndustries,
        leadTier,
      });
    }

    // Sort by engagement score (highest first)
    companies.sort((a, b) => b.engagementScore - a.engagementScore);

    // Calculate summary stats
    const summary = {
      totalIdentified: companies.length,
      tierBreakdown: {
        "Very Hot": companies.filter((c) => c.leadTier === "Very Hot").length,
        "Hot": companies.filter((c) => c.leadTier === "Hot").length,
        "Warm": companies.filter((c) => c.leadTier === "Warm").length,
        "Cold": companies.filter((c) => c.leadTier === "Cold").length,
      },
      totalConverted: companies.filter((c) => c.isConverted).length,
      totalHighIntent: companies.filter((c) => c.viewedContactPage || c.viewedPricingPage).length,
    };

    return NextResponse.json({
      period: { start: startStr, end: endStr, days },
      summary,
      companies,
    });
  } catch (error) {
    console.error("Companies analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch company analytics" }, { status: 500 });
  }
}
