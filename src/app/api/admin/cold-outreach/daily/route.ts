import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

interface DailyData {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
}

function isColdSequence(lead: Lead): boolean {
  return lead.emailSequence?.sequenceType?.startsWith("cold-") === true;
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function getDateFromTimestamp(timestamp: string): string {
  return timestamp.split("T")[0];
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

    // Initialize daily buckets
    const dailyMap: Record<string, DailyData> = {};
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateKey = formatDateKey(currentDate);
      dailyMap[dateKey] = {
        date: dateKey,
        sent: 0,
        opened: 0,
        clicked: 0,
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Fetch all leads with cold sequences
    const result = await scanLeads({ limit: 1000 });
    const coldLeads = result.leads.filter(isColdSequence);

    for (const lead of coldLeads) {
      const seq = lead.emailSequence;
      if (!seq) continue;

      // Count emails sent per day
      const emailsSent = seq.emailsSent || {};
      const dayKeys = ["day0", "day2", "day7", "day14", "day21"] as const;

      for (const dayKey of dayKeys) {
        const sentRecord = emailsSent[dayKey];
        if (sentRecord?.sentAt) {
          const dateKey = getDateFromTimestamp(sentRecord.sentAt);
          if (dailyMap[dateKey]) {
            dailyMap[dateKey].sent += 1;
          }
        }
      }

      // Count opens by date
      if (lead.opens && lead.opens.length > 0) {
        for (const openEvent of lead.opens) {
          const dateKey = getDateFromTimestamp(openEvent.timestamp);
          if (dailyMap[dateKey]) {
            dailyMap[dateKey].opened += 1;
          }
        }
      }

      // Count clicks by date
      if (lead.clicks && lead.clicks.length > 0) {
        for (const clickEvent of lead.clicks) {
          const dateKey = getDateFromTimestamp(clickEvent.timestamp);
          if (dailyMap[dateKey]) {
            dailyMap[dateKey].clicked += 1;
          }
        }
      }
    }

    // Convert to sorted array
    const dailyArray = Object.values(dailyMap).sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    return NextResponse.json({
      days: dailyArray,
    });
  } catch (error) {
    console.error("Cold outreach daily API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to load daily data", details: errorMessage },
      { status: 500 }
    );
  }
}
