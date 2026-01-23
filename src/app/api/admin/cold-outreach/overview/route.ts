import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

interface SequenceMetrics {
  day0: { sent: number; opened: number; clicked: number };
  day2: { sent: number; opened: number; clicked: number };
  day7: { sent: number; opened: number; clicked: number };
  day14: { sent: number; opened: number; clicked: number };
  day21: { sent: number; opened: number; clicked: number };
  replies: number;
}

interface SequenceData {
  sequenceType: string;
  enrolled: number;
  metrics: SequenceMetrics;
}

function isColdSequence(lead: Lead): boolean {
  return (
    lead.emailSequence?.sequenceType?.startsWith("cold-") === true
  );
}

function getEmptyMetrics(): SequenceMetrics {
  return {
    day0: { sent: 0, opened: 0, clicked: 0 },
    day2: { sent: 0, opened: 0, clicked: 0 },
    day7: { sent: 0, opened: 0, clicked: 0 },
    day14: { sent: 0, opened: 0, clicked: 0 },
    day21: { sent: 0, opened: 0, clicked: 0 },
    replies: 0,
  };
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

    const startStr = startDate.toISOString().split("T")[0];
    const endStr = endDate.toISOString().split("T")[0];

    // Fetch all leads with cold sequences
    const result = await scanLeads({ limit: 1000 });
    const coldLeads = result.leads.filter(isColdSequence);

    // Initialize totals
    let sent = 0;
    let delivered = 0;
    let opened = 0;
    let clicked = 0;
    let replied = 0;
    let bounced = 0;
    let complained = 0;
    let unsubscribed = 0;

    // Track by sequence type
    const sequenceMap: Record<string, SequenceData> = {};

    for (const lead of coldLeads) {
      const seq = lead.emailSequence;
      if (!seq) continue;

      const seqType = seq.sequenceType;

      // Initialize sequence data if needed
      if (!sequenceMap[seqType]) {
        sequenceMap[seqType] = {
          sequenceType: seqType,
          enrolled: 0,
          metrics: getEmptyMetrics(),
        };
      }

      sequenceMap[seqType].enrolled += 1;

      // Count emails sent per day
      const emailsSent = seq.emailsSent || {};
      const dayKeys: Array<"day0" | "day2" | "day7" | "day14" | "day21"> = [
        "day0",
        "day2",
        "day7",
        "day14",
        "day21",
      ];

      for (const dayKey of dayKeys) {
        if (emailsSent[dayKey]?.sentAt) {
          sent += 1;
          sequenceMap[seqType].metrics[dayKey].sent += 1;

          // Check for bounces on this email
          if (seq.status !== "bounced") {
            delivered += 1;
          }
        }
      }

      // Count opens by day
      if (lead.opens && lead.opens.length > 0) {
        for (const openEvent of lead.opens) {
          opened += 1;
          const emailDay = openEvent.emailDay;
          const dayKey = `day${emailDay}` as keyof SequenceMetrics;
          if (
            dayKey in sequenceMap[seqType].metrics &&
            typeof sequenceMap[seqType].metrics[dayKey] === "object"
          ) {
            (
              sequenceMap[seqType].metrics[dayKey] as {
                sent: number;
                opened: number;
                clicked: number;
              }
            ).opened += 1;
          }
        }
      }

      // Count clicks by day
      if (lead.clicks && lead.clicks.length > 0) {
        for (const clickEvent of lead.clicks) {
          clicked += 1;
          const emailDay = clickEvent.emailDay;
          const dayKey = `day${emailDay}` as keyof SequenceMetrics;
          if (
            dayKey in sequenceMap[seqType].metrics &&
            typeof sequenceMap[seqType].metrics[dayKey] === "object"
          ) {
            (
              sequenceMap[seqType].metrics[dayKey] as {
                sent: number;
                opened: number;
                clicked: number;
              }
            ).clicked += 1;
          }
        }
      }

      // Count replies
      if (lead.hasReplied || seq.repliedAt) {
        replied += 1;
        sequenceMap[seqType].metrics.replies += 1;
      }

      // Count bounces
      if (seq.status === "bounced" || seq.bounceType) {
        bounced += 1;
      }

      // Count complaints
      if (seq.complainedAt) {
        complained += 1;
      }

      // Count unsubscribes
      if (seq.status === "unsubscribed" || seq.unsubscribedAt) {
        unsubscribed += 1;
      }
    }

    // Calculate rates (avoid division by zero)
    const deliveredRate = sent > 0 ? (delivered / sent) * 100 : 0;
    const openedRate = delivered > 0 ? (opened / delivered) * 100 : 0;
    const clickedRate = delivered > 0 ? (clicked / delivered) * 100 : 0;
    const repliedRate = coldLeads.length > 0 ? (replied / coldLeads.length) * 100 : 0;
    const bouncedRate = sent > 0 ? (bounced / sent) * 100 : 0;
    const complainedRate = sent > 0 ? (complained / sent) * 100 : 0;
    const unsubscribedRate =
      coldLeads.length > 0 ? (unsubscribed / coldLeads.length) * 100 : 0;

    return NextResponse.json({
      period: {
        start: startStr,
        end: endStr,
      },
      totals: {
        sent,
        delivered,
        deliveredRate,
        opened,
        openedRate,
        clicked,
        clickedRate,
        replied,
        repliedRate,
        bounced,
        bouncedRate,
        complained,
        complainedRate,
        unsubscribed,
        unsubscribedRate,
      },
      bySequence: Object.values(sequenceMap),
    });
  } catch (error) {
    console.error("Cold outreach overview API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to load overview", details: errorMessage },
      { status: 500 }
    );
  }
}
