import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import { getSessionsForDateRange } from "@/lib/analytics/dynamodb";
import type { Lead } from "@/lib/leads/types";

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7", 10);

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    // Fetch leads and sessions in parallel
    const [leadsResult, sessions] = await Promise.all([
      scanLeads({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        limit: 1000,
      }),
      getSessionsForDateRange(startStr, endStr),
    ]);

    const leads = leadsResult.leads;

    // Calculate visitor and company metrics from sessions
    const uniqueVisitors = new Set(sessions.map((s) => s.visitorId)).size;
    const identifiedCompanies = new Set(
      sessions
        .filter((s) => s.companyDomain)
        .map((s) => s.companyDomain!.toLowerCase())
    ).size;

    // Calculate action items
    const hotLeadsToContact = leads.filter(
      (l) =>
        (l.tier === "A" || (l.behaviorScore && l.behaviorScore >= 70)) &&
        (!l.contactHistory || l.contactHistory.length === 0)
    ).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newToday = leads.filter((l) => {
      const created = new Date(l.createdAt);
      return created >= today;
    }).length;

    const needFollowUp = leads.filter(
      (l) =>
        l.status === "contacted" &&
        l.contactHistory &&
        l.contactHistory.length > 0
    ).length;

    // Companies identified from analytics that aren't leads yet
    const leadDomains = new Set(
      leads
        .filter((l) => l.identifiedDomain)
        .map((l) => l.identifiedDomain!.toLowerCase())
    );
    const companiesToResearch = Array.from(
      new Set(
        sessions
          .filter((s) => s.companyDomain && !leadDomains.has(s.companyDomain.toLowerCase()))
          .map((s) => s.companyDomain!.toLowerCase())
      )
    ).length;

    // Priority leads: high score, not contacted, sorted by score
    const priorityLeads = leads
      .filter(
        (l) =>
          (l.behaviorScore && l.behaviorScore >= 40) &&
          (!l.contactHistory || l.contactHistory.length === 0)
      )
      .sort((a, b) => (b.behaviorScore || 0) - (a.behaviorScore || 0))
      .slice(0, 5)
      .map((l) => ({
        id: l.leadId,
        name: `${l.firstName} ${l.lastName}`,
        company: l.company || l.identifiedCompany || null,
        score: l.behaviorScore || 0,
        tier: l.tier || "C",
        status: l.status,
        industry: l.industry || null,
        createdAt: l.createdAt,
      }));

    // Funnel data with real analytics
    const funnel = {
      visitors: uniqueVisitors,
      identifiedCompanies,
      leads: leads.length,
      contacted: leads.filter((l) => l.status === "contacted" || l.status === "qualified" || l.status === "opportunity" || l.status === "customer").length,
      qualified: leads.filter((l) => l.status === "qualified" || l.status === "opportunity" || l.status === "customer").length,
      customers: leads.filter((l) => l.status === "customer").length,
    };

    // Top converting pages
    const pageLeadCounts: Record<string, number> = {};
    leads.forEach((l) => {
      const page = l.sourcePage || l.firstTouchLandingPage || "/";
      pageLeadCounts[page] = (pageLeadCounts[page] || 0) + 1;
    });

    const convertingContent = Object.entries(pageLeadCounts)
      .map(([page, count]) => ({
        page,
        leads: count,
        conversionRate: 0, // Would need pageview data to calculate
      }))
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 5);

    // Outreach coverage
    const linkedinContacted = leads.filter(
      (l) => l.contactHistory?.some((c) => c.channel === "linkedin")
    ).length;
    const emailContacted = leads.filter(
      (l) => l.contactHistory?.some((c) => c.channel === "email")
    ).length;
    const untouched = leads.filter(
      (l) => !l.contactHistory || l.contactHistory.length === 0
    ).length;

    const outreach = {
      linkedin: { contacted: linkedinContacted, total: leads.length },
      email: { contacted: emailContacted, total: leads.length },
      untouched,
    };

    // Channel quality
    const sourceScores: Record<string, { totalScore: number; count: number }> = {};
    leads.forEach((l) => {
      const source = l.utmSource || l.referrerSource || "direct";
      if (!sourceScores[source]) {
        sourceScores[source] = { totalScore: 0, count: 0 };
      }
      sourceScores[source].totalScore += l.behaviorScore || 0;
      sourceScores[source].count += 1;
    });

    const channels = Object.entries(sourceScores)
      .map(([source, data]) => ({
        source,
        avgScore: data.count > 0 ? data.totalScore / data.count : 0,
        leads: data.count,
      }))
      .filter((c) => c.leads >= 1)
      .sort((a, b) => b.avgScore - a.avgScore);

    return NextResponse.json({
      actionItems: {
        hotLeadsToContact,
        newToday,
        needFollowUp,
        companiesToResearch,
      },
      priorityLeads,
      funnel,
      convertingContent,
      outreach,
      channels,
      period: {
        days,
        start: startStr,
        end: endStr,
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({
      error: "Failed to load dashboard",
      details: errorMessage,
    }, { status: 500 });
  }
}
