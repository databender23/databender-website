import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";

interface MonthlyData {
  month: string;
  monthLabel: string;
  qualifiedLeads: number;
  lvr: number | null;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthLabel(monthKey: string): string {
  const [year, month] = monthKey.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get leads from the last 7 months to calculate 6 months of LVR
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 7);
    startDate.setDate(1); // Start from beginning of month

    const leadsResult = await scanLeads({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 5000,
    });

    const leads = leadsResult.leads;

    // Group qualified leads by month
    // Qualified = status is qualified, opportunity, or customer
    const qualifiedStatuses = ["qualified", "opportunity", "customer"];
    const monthlyQualified: Record<string, number> = {};

    leads.forEach((lead) => {
      if (qualifiedStatuses.includes(lead.status)) {
        const createdDate = new Date(lead.createdAt);
        const monthKey = getMonthKey(createdDate);
        monthlyQualified[monthKey] = (monthlyQualified[monthKey] || 0) + 1;
      }
    });

    // Generate last 6 months of data
    const months: string[] = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(currentDate);
      d.setMonth(d.getMonth() - i);
      months.push(getMonthKey(d));
    }

    // Calculate LVR for each month
    const monthly: MonthlyData[] = months.map((month, index) => {
      const qualifiedLeads = monthlyQualified[month] || 0;
      let lvr: number | null = null;

      if (index > 0) {
        const prevMonth = months[index - 1];
        const prevQualified = monthlyQualified[prevMonth] || 0;
        if (prevQualified > 0) {
          lvr = ((qualifiedLeads - prevQualified) / prevQualified) * 100;
        } else if (qualifiedLeads > 0) {
          lvr = 100; // Infinite growth, cap at 100%
        }
      }

      return {
        month,
        monthLabel: getMonthLabel(month),
        qualifiedLeads,
        lvr,
      };
    });

    // Calculate current LVR (most recent month)
    const currentLVR = monthly[monthly.length - 1]?.lvr ?? null;

    // Calculate trend based on last 3 months of LVR
    const recentLVRs = monthly
      .slice(-3)
      .map((m) => m.lvr)
      .filter((lvr): lvr is number => lvr !== null);

    let trend: "up" | "down" | "stable" = "stable";
    if (recentLVRs.length >= 2) {
      const recent = recentLVRs[recentLVRs.length - 1];
      const previous = recentLVRs[recentLVRs.length - 2];
      if (recent > previous + 5) {
        trend = "up";
      } else if (recent < previous - 5) {
        trend = "down";
      }
    }

    // Calculate average LVR
    const validLVRs = monthly
      .map((m) => m.lvr)
      .filter((lvr): lvr is number => lvr !== null);
    const avgLVR =
      validLVRs.length > 0
        ? validLVRs.reduce((sum, lvr) => sum + lvr, 0) / validLVRs.length
        : 0;

    return NextResponse.json({
      monthly,
      currentLVR,
      trend,
      avgLVR,
    });
  } catch (error) {
    console.error("Lead velocity API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: "Failed to load lead velocity data",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
