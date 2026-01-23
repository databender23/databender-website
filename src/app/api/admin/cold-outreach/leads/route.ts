import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

interface LeadItem {
  leadId: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  sequenceType: string;
  status: string;
  totalOpens: number;
  totalClicks: number;
  hasReplied: boolean;
  lastActivityAt?: string;
}

function isColdSequence(lead: Lead): boolean {
  return lead.emailSequence?.sequenceType?.startsWith("cold-") === true;
}

function transformLead(lead: Lead): LeadItem {
  return {
    leadId: lead.leadId,
    email: lead.email,
    firstName: lead.firstName,
    lastName: lead.lastName,
    company: lead.company,
    sequenceType: lead.emailSequence?.sequenceType || "unknown",
    status: lead.emailSequence?.status || lead.status,
    totalOpens: lead.totalOpens || 0,
    totalClicks: lead.totalClicks || 0,
    hasReplied: lead.hasReplied || !!lead.emailSequence?.repliedAt,
    lastActivityAt: lead.lastActivityAt,
  };
}

function isHighIntent(lead: Lead): boolean {
  const opens = lead.totalOpens || 0;
  const clicks = lead.totalClicks || 0;
  return opens >= 3 || clicks >= 1;
}

function needsAttention(lead: Lead): boolean {
  const hasReplied = lead.hasReplied || !!lead.emailSequence?.repliedAt;
  const isHighEngagement = isHighIntent(lead);
  const seqStatus = lead.emailSequence?.status;

  // Needs attention if:
  // 1. Has replied but not yet followed up (status still active)
  // 2. High engagement but not contacted
  // 3. Bounced or complained
  return (
    (hasReplied && seqStatus === "active") ||
    (isHighEngagement && lead.status === "new") ||
    seqStatus === "bounced" ||
    !!lead.emailSequence?.complainedAt
  );
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter") || "all";

  try {
    // Fetch all leads with cold sequences
    const result = await scanLeads({ limit: 1000 });
    let coldLeads = result.leads.filter(isColdSequence);

    // Apply filter
    switch (filter) {
      case "replied":
        coldLeads = coldLeads.filter(
          (lead) => lead.hasReplied || !!lead.emailSequence?.repliedAt
        );
        break;
      case "high-intent":
        coldLeads = coldLeads.filter(isHighIntent);
        break;
      case "needs-attention":
        coldLeads = coldLeads.filter(needsAttention);
        break;
      // "all" - no filtering
    }

    // Sort by last activity (most recent first), then by engagement
    coldLeads.sort((a, b) => {
      // Replied leads first
      const aReplied = a.hasReplied || !!a.emailSequence?.repliedAt;
      const bReplied = b.hasReplied || !!b.emailSequence?.repliedAt;
      if (aReplied && !bReplied) return -1;
      if (!aReplied && bReplied) return 1;

      // Then by total engagement (opens + clicks)
      const aEngagement = (a.totalOpens || 0) + (a.totalClicks || 0);
      const bEngagement = (b.totalOpens || 0) + (b.totalClicks || 0);
      if (aEngagement !== bEngagement) return bEngagement - aEngagement;

      // Then by last activity
      const aTime = a.lastActivityAt ? new Date(a.lastActivityAt).getTime() : 0;
      const bTime = b.lastActivityAt ? new Date(b.lastActivityAt).getTime() : 0;
      return bTime - aTime;
    });

    // Limit to top 50
    const limitedLeads = coldLeads.slice(0, 50);

    return NextResponse.json({
      leads: limitedLeads.map(transformLead),
      totalCount: coldLeads.length,
    });
  } catch (error) {
    console.error("Cold outreach leads API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to load leads", details: errorMessage },
      { status: 500 }
    );
  }
}
