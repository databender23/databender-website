import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

interface ActivityItem {
  id: string;
  timestamp: string;
  email: string;
  type: "open" | "click" | "reply" | "bounce" | "complaint" | "sent";
  emailDay: number;
  sequenceType: string;
  url?: string;
}

function isColdSequence(lead: Lead): boolean {
  return lead.emailSequence?.sequenceType?.startsWith("cold-") === true;
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  try {
    // Fetch all leads with cold sequences
    const result = await scanLeads({ limit: 1000 });
    const coldLeads = result.leads.filter(isColdSequence);

    const activities: ActivityItem[] = [];

    for (const lead of coldLeads) {
      const seq = lead.emailSequence;
      if (!seq) continue;

      const seqType = seq.sequenceType;

      // Add open events
      if (lead.opens && lead.opens.length > 0) {
        for (const openEvent of lead.opens) {
          activities.push({
            id: `open-${lead.leadId}-${openEvent.timestamp}`,
            timestamp: openEvent.timestamp,
            email: lead.email,
            type: "open",
            emailDay: openEvent.emailDay,
            sequenceType: seqType,
          });
        }
      }

      // Add click events
      if (lead.clicks && lead.clicks.length > 0) {
        for (const clickEvent of lead.clicks) {
          activities.push({
            id: `click-${lead.leadId}-${clickEvent.timestamp}`,
            timestamp: clickEvent.timestamp,
            email: lead.email,
            type: "click",
            emailDay: clickEvent.emailDay,
            sequenceType: seqType,
            url: clickEvent.url,
          });
        }
      }

      // Add reply events
      if (seq.repliedAt) {
        activities.push({
          id: `reply-${lead.leadId}`,
          timestamp: seq.repliedAt,
          email: lead.email,
          type: "reply",
          emailDay: seq.currentDay || 0,
          sequenceType: seqType,
        });
      }

      // Add bounce events
      if (seq.lastBounceAt) {
        activities.push({
          id: `bounce-${lead.leadId}`,
          timestamp: seq.lastBounceAt,
          email: lead.email,
          type: "bounce",
          emailDay: seq.currentDay || 0,
          sequenceType: seqType,
        });
      }

      // Add complaint events
      if (seq.complainedAt) {
        activities.push({
          id: `complaint-${lead.leadId}`,
          timestamp: seq.complainedAt,
          email: lead.email,
          type: "complaint",
          emailDay: seq.currentDay || 0,
          sequenceType: seqType,
        });
      }

      // Add sent events (from emailsSent records)
      const emailsSent = seq.emailsSent || {};
      const dayKeys = ["day0", "day2", "day7", "day14", "day21"] as const;
      const dayNumbers: Record<string, number> = {
        day0: 0,
        day2: 2,
        day7: 7,
        day14: 14,
        day21: 21,
      };

      for (const dayKey of dayKeys) {
        const sentRecord = emailsSent[dayKey];
        if (sentRecord?.sentAt) {
          activities.push({
            id: `sent-${lead.leadId}-${dayKey}`,
            timestamp: sentRecord.sentAt,
            email: lead.email,
            type: "sent",
            emailDay: dayNumbers[dayKey],
            sequenceType: seqType,
          });
        }
      }
    }

    // Sort by timestamp (most recent first)
    activities.sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime();
      const bTime = new Date(b.timestamp).getTime();
      return bTime - aTime;
    });

    // Limit results
    const limitedActivities = activities.slice(0, limit);

    return NextResponse.json({
      items: limitedActivities,
      totalCount: activities.length,
    });
  } catch (error) {
    console.error("Cold outreach activity API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to load activity", details: errorMessage },
      { status: 500 }
    );
  }
}
