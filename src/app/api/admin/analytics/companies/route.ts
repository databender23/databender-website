import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getEventsForDateRange, getSessionsForDateRange } from "@/lib/analytics/dynamodb";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { TrackedEvent, Session } from "@/lib/analytics/events";
import type { Lead, ContactChannel } from "@/lib/leads/types";

// Key pages that indicate high intent
const KEY_PAGE_PATTERNS = [
  /\/pricing/i,
  /\/contact/i,
  /\/assessment/i,
  /\/case-stud/i,
  /\/demo/i,
];


interface CompanyData {
  company: string;
  domain: string;
  industry: string;
  visitors: number;
  sessions: number;
  behaviorScore: number;
  pagesViewed: string[];
  keyPages: string[];
  lastVisit: string;
  isLead: boolean;
  leadStatus?: string;
  contactedVia?: ContactChannel[];
}

interface CompanyTotals {
  totalIdentified: number;
  withLeads: number;
  notContacted: number;
}

interface CompaniesResponse {
  companies: CompanyData[];
  totals: CompanyTotals;
  availableIndustries: string[];
  period: { start: string; end: string; days: number };
}

function calculateBehaviorScore(company: {
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

function extractKeyPages(pages: string[]): string[] {
  const keyPages: string[] = [];
  for (const page of pages) {
    for (const pattern of KEY_PAGE_PATTERNS) {
      if (pattern.test(page) && !keyPages.includes(page)) {
        keyPages.push(page);
        break;
      }
    }
  }
  return keyPages;
}

/**
 * Build a map of company domains to their lead data
 */
function buildLeadMap(leads: Lead[]): Map<string, Lead> {
  const leadMap = new Map<string, Lead>();

  for (const lead of leads) {
    // Match by identifiedDomain or company email domain
    if (lead.identifiedDomain) {
      const existingLead = leadMap.get(lead.identifiedDomain.toLowerCase());
      // Keep the most recent lead if multiple exist
      if (!existingLead || new Date(lead.createdAt) > new Date(existingLead.createdAt)) {
        leadMap.set(lead.identifiedDomain.toLowerCase(), lead);
      }
    }

    // Also try to match by company name (lowercased, normalized)
    if (lead.company) {
      const normalizedCompany = lead.company.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!leadMap.has(normalizedCompany)) {
        leadMap.set(normalizedCompany, lead);
      }
    }
  }

  return leadMap;
}

/**
 * Check if a company has an associated lead
 */
function findLeadForCompany(
  companyDomain: string,
  companyName: string,
  leadMap: Map<string, Lead>
): Lead | null {
  // Try domain first
  const domainLead = leadMap.get(companyDomain.toLowerCase());
  if (domainLead) return domainLead;

  // Try normalized company name
  const normalizedName = companyName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const nameLead = leadMap.get(normalizedName);
  if (nameLead) return nameLead;

  return null;
}

/**
 * Extract contact channels from a lead's contact history
 */
function getContactChannels(lead: Lead): ContactChannel[] {
  if (!lead.contactHistory || lead.contactHistory.length === 0) {
    return [];
  }

  const channels = new Set<ContactChannel>();
  for (const record of lead.contactHistory) {
    channels.add(record.channel);
  }
  return Array.from(channels);
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  // Parse query parameters
  const industryFilter = searchParams.get("industry") || null;
  const minScore = parseInt(searchParams.get("minScore") || "0", 10);
  const notContactedOnly = searchParams.get("notContacted") === "true";
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");
  const days = parseInt(searchParams.get("days") || "30", 10);

  // Calculate date range
  const endDate = endDateParam ? new Date(endDateParam) : new Date();
  const startDate = startDateParam
    ? new Date(startDateParam)
    : new Date(endDate.getTime() - days * 24 * 60 * 60 * 1000);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    // Fetch analytics data and leads in parallel
    const [events, sessions, leadsResult] = await Promise.all([
      getEventsForDateRange(startStr, endStr),
      getSessionsForDateRange(startStr, endStr),
      scanLeads({ limit: 1000 }), // Get all leads for matching
    ]);

    const leads = leadsResult.leads;
    const leadMap = buildLeadMap(leads);

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
    const companies: CompanyData[] = [];
    const industriesSet = new Set<string>();

    // Counters for totals
    let totalWithLeads = 0;
    let totalNotContacted = 0;

    for (const [, data] of companiesMap) {
      const pageviews = data.events.filter((e) => e.eventType === "pageview");
      const pagesViewed = [...new Set(pageviews.map((e) => e.page))];
      const uniqueVisitors = new Set(data.events.map((e) => e.visitorId)).size;
      const uniqueSessions = new Set(data.events.map((e) => e.sessionId)).size;

      // Get timestamps
      const timestamps = data.events.map((e) => new Date(e.timestamp).getTime());
      const lastVisit = new Date(Math.max(...timestamps)).toISOString();

      // Check for conversions
      const convertedSessions = data.sessions.filter((s) => s.isConverted);

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

      // Calculate behavior score
      const behaviorScore = calculateBehaviorScore({
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

      // Extract key pages
      const keyPages = extractKeyPages(pagesViewed);

      // Check if company has an associated lead
      const associatedLead = findLeadForCompany(data.domain, data.name, leadMap);
      const isLead = !!associatedLead;
      const leadStatus = associatedLead?.status;
      const contactedVia = associatedLead ? getContactChannels(associatedLead) : [];
      const hasBeenContacted = contactedVia.length > 0;

      // Track industry
      if (data.industry) {
        industriesSet.add(data.industry);
      }

      // Update totals counters (before applying filters)
      if (isLead) totalWithLeads++;
      if (!hasBeenContacted) totalNotContacted++;

      // Apply filters
      if (behaviorScore < minScore) continue;
      if (industryFilter && data.industry !== industryFilter) continue;
      if (notContactedOnly && hasBeenContacted) continue;

      companies.push({
        company: data.name,
        domain: data.domain,
        industry: data.industry || "Unknown",
        visitors: uniqueVisitors,
        sessions: uniqueSessions,
        behaviorScore,
        pagesViewed,
        keyPages,
        lastVisit,
        isLead,
        leadStatus,
        contactedVia: contactedVia.length > 0 ? contactedVia : undefined,
      });
    }

    // Sort by behaviorScore descending by default
    companies.sort((a, b) => b.behaviorScore - a.behaviorScore);

    // Build totals
    const totals: CompanyTotals = {
      totalIdentified: companiesMap.size,
      withLeads: totalWithLeads,
      notContacted: totalNotContacted,
    };

    // Build available industries list
    const availableIndustries = Array.from(industriesSet).sort();

    const response: CompaniesResponse = {
      companies,
      totals,
      availableIndustries,
      period: { start: startStr, end: endStr, days },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Companies analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch company analytics" }, { status: 500 });
  }
}
