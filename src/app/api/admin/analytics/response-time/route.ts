import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

interface HotLeadResponse {
  leadId: string;
  name: string;
  company: string | null;
  email: string;
  createdAt: string;
  firstContactAt: string | null;
  responseTimeMinutes: number | null;
  status: string;
  tier: string;
}

function isHotLead(lead: Lead): boolean {
  // A lead is "hot" if:
  // 1. Tier A
  // 2. Behavior score >= 70
  // 3. Behavior tier is "Hot" or "Very Hot"
  return (
    lead.tier === "A" ||
    (lead.behaviorScore !== undefined && lead.behaviorScore >= 70) ||
    lead.behaviorTier === "Hot" ||
    lead.behaviorTier === "Very Hot"
  );
}

function getFirstContactTime(lead: Lead): string | null {
  if (!lead.contactHistory || lead.contactHistory.length === 0) {
    return null;
  }

  // Find the earliest contact
  const sortedContacts = [...lead.contactHistory].sort(
    (a, b) => new Date(a.contactedAt).getTime() - new Date(b.contactedAt).getTime()
  );

  return sortedContacts[0].contactedAt;
}

function calculateResponseMinutes(createdAt: string, firstContactAt: string | null): number | null {
  if (!firstContactAt) return null;

  const created = new Date(createdAt).getTime();
  const contacted = new Date(firstContactAt).getTime();
  const diffMs = contacted - created;

  // If contacted before created (data issue), return 0
  if (diffMs < 0) return 0;

  return diffMs / 60000; // Convert to minutes
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30", 10);

  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const leadsResult = await scanLeads({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 1000,
    });

    const leads = leadsResult.leads;

    // Filter to hot leads only
    const hotLeads = leads.filter(isHotLead);

    // Calculate response times
    const hotLeadResponses: HotLeadResponse[] = hotLeads.map((lead) => {
      const firstContactAt = getFirstContactTime(lead);
      const responseTimeMinutes = calculateResponseMinutes(lead.createdAt, firstContactAt);

      return {
        leadId: lead.leadId,
        name: `${lead.firstName} ${lead.lastName}`,
        company: lead.company || lead.identifiedCompany || null,
        email: lead.email,
        createdAt: lead.createdAt,
        firstContactAt,
        responseTimeMinutes,
        status: lead.status,
        tier: lead.tier || "C",
      };
    });

    // Sort by createdAt descending (most recent first)
    hotLeadResponses.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Calculate statistics
    const contactedLeads = hotLeadResponses.filter((l) => l.responseTimeMinutes !== null);
    const pendingLeads = hotLeadResponses.filter((l) => l.responseTimeMinutes === null);

    // Average response time
    const responseTimes = contactedLeads.map((l) => l.responseTimeMinutes as number);
    const avgResponseMinutes =
      responseTimes.length > 0
        ? responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length
        : null;

    // Median response time
    let medianResponseMinutes: number | null = null;
    if (responseTimes.length > 0) {
      const sorted = [...responseTimes].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      medianResponseMinutes =
        sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    // Distribution
    const distribution = {
      under5: responseTimes.filter((t) => t <= 5).length,
      under30: responseTimes.filter((t) => t > 5 && t <= 30).length,
      under60: responseTimes.filter((t) => t > 30 && t <= 60).length,
      over60: responseTimes.filter((t) => t > 60).length,
    };

    return NextResponse.json({
      avgResponseMinutes,
      medianResponseMinutes,
      totalHotLeads: hotLeadResponses.length,
      contactedCount: contactedLeads.length,
      pendingCount: pendingLeads.length,
      recentHotLeads: hotLeadResponses.slice(0, 10),
      distribution,
      period: {
        days,
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    console.error("Response time API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: "Failed to load response time data",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
