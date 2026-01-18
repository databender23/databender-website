import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import { getSessionsForDateRange } from "@/lib/analytics/dynamodb";

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

    // Calculate funnel stages from lead statuses
    const totalLeads = leads.length;

    // Contacted: leads that have any contact history OR have been marked as contacted+
    const contacted = leads.filter(
      (l) =>
        l.status === "contacted" ||
        l.status === "qualified" ||
        l.status === "opportunity" ||
        l.status === "customer" ||
        (l.contactHistory && l.contactHistory.length > 0)
    ).length;

    // Qualified (SQL): leads that have progressed to qualified status or beyond
    const qualified = leads.filter(
      (l) =>
        l.status === "qualified" ||
        l.status === "opportunity" ||
        l.status === "customer"
    ).length;

    // Opportunities: leads in opportunity stage or beyond
    const opportunities = leads.filter(
      (l) => l.status === "opportunity" || l.status === "customer"
    ).length;

    // Customers: won deals
    const customers = leads.filter((l) => l.status === "customer").length;

    return NextResponse.json({
      visitors: uniqueVisitors,
      identifiedCompanies,
      leads: totalLeads,
      contacted,
      qualified,
      opportunities,
      customers,
      period: {
        days,
        start: startStr,
        end: endStr,
      },
    });
  } catch (error) {
    console.error("Funnel API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: "Failed to load funnel data",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
