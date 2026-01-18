import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { scanLeads } from "@/lib/leads/dynamodb";
import type { Lead } from "@/lib/leads/types";

type SourceKey = "organic" | "paid" | "referral" | "aiSearch" | "direct";

interface SourceData {
  leads: number;
  conversions: number;
  rate: number;
}

interface CohortRow {
  cohortWeek: string;
  cohortLabel: string;
  totalLeads: number;
  conversions: number;
  conversionRate: number;
  avgTimeToConvert: number | null;
  bySource: Record<SourceKey, SourceData>;
}

function getWeekKey(date: Date): string {
  // Get the Monday of the week
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split("T")[0];
}

function getWeekLabel(weekKey: string): string {
  const date = new Date(weekKey + "T12:00:00");
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 6);

  return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

function categorizeSource(lead: Lead): SourceKey {
  const utmSource = lead.utmSource?.toLowerCase() || "";
  const utmMedium = lead.utmMedium?.toLowerCase() || "";
  const referrerSource = lead.referrerSource?.toLowerCase() || "";

  // AI Search detection
  if (
    utmSource.includes("perplexity") ||
    utmSource.includes("chatgpt") ||
    utmSource.includes("claude") ||
    utmSource.includes("bing-copilot") ||
    referrerSource.includes("perplexity") ||
    referrerSource.includes("chatgpt")
  ) {
    return "aiSearch";
  }

  // Paid traffic
  if (
    utmMedium === "cpc" ||
    utmMedium === "ppc" ||
    utmMedium === "paid" ||
    utmSource.includes("google_ads") ||
    utmSource.includes("linkedin_ads") ||
    utmSource.includes("facebook_ads")
  ) {
    return "paid";
  }

  // Referral traffic
  if (
    utmMedium === "referral" ||
    lead.leadSource === "referral" ||
    (referrerSource && !["google", "bing", "yahoo", "duckduckgo"].some((s) => referrerSource.includes(s)))
  ) {
    return "referral";
  }

  // Organic search
  if (
    utmMedium === "organic" ||
    ["google", "bing", "yahoo", "duckduckgo"].some((s) => referrerSource.includes(s))
  ) {
    return "organic";
  }

  // Direct traffic
  return "direct";
}

function isConverted(lead: Lead): boolean {
  return lead.status === "qualified" || lead.status === "opportunity" || lead.status === "customer";
}

function calculateTimeToConvert(lead: Lead): number | null {
  if (!isConverted(lead)) return null;

  // Estimate conversion time based on status change
  // In a real implementation, you'd track status change timestamps
  // For now, use last activity or updatedAt as proxy
  const created = new Date(lead.createdAt).getTime();
  const converted = new Date(lead.updatedAt || lead.createdAt).getTime();

  if (converted <= created) return null;

  return (converted - created) / 60000; // Minutes
}

export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get leads from the last 12 weeks
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 84); // 12 weeks

    const leadsResult = await scanLeads({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      limit: 2000,
    });

    const leads = leadsResult.leads;

    // Group leads by week
    const weeklyData: Record<
      string,
      {
        leads: Lead[];
        bySource: Record<SourceKey, Lead[]>;
      }
    > = {};

    leads.forEach((lead) => {
      const weekKey = getWeekKey(new Date(lead.createdAt));
      const source = categorizeSource(lead);

      if (!weeklyData[weekKey]) {
        weeklyData[weekKey] = {
          leads: [],
          bySource: {
            organic: [],
            paid: [],
            referral: [],
            aiSearch: [],
            direct: [],
          },
        };
      }

      weeklyData[weekKey].leads.push(lead);
      weeklyData[weekKey].bySource[source].push(lead);
    });

    // Generate last 8 weeks of cohorts
    const weeks: string[] = [];
    const currentDate = new Date();
    for (let i = 7; i >= 0; i--) {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - i * 7);
      weeks.push(getWeekKey(d));
    }

    // Build cohort rows
    const cohorts: CohortRow[] = weeks.map((weekKey) => {
      const data = weeklyData[weekKey];
      const allLeads = data?.leads || [];
      const conversions = allLeads.filter(isConverted);

      // Calculate average time to convert
      const conversionTimes = conversions
        .map(calculateTimeToConvert)
        .filter((t): t is number => t !== null);
      const avgTimeToConvert =
        conversionTimes.length > 0
          ? conversionTimes.reduce((sum, t) => sum + t, 0) / conversionTimes.length
          : null;

      // Build source breakdown
      const bySource: Record<SourceKey, SourceData> = {
        organic: { leads: 0, conversions: 0, rate: 0 },
        paid: { leads: 0, conversions: 0, rate: 0 },
        referral: { leads: 0, conversions: 0, rate: 0 },
        aiSearch: { leads: 0, conversions: 0, rate: 0 },
        direct: { leads: 0, conversions: 0, rate: 0 },
      };

      if (data) {
        (Object.keys(data.bySource) as SourceKey[]).forEach((source) => {
          const sourceLeads = data.bySource[source];
          const sourceConversions = sourceLeads.filter(isConverted);
          bySource[source] = {
            leads: sourceLeads.length,
            conversions: sourceConversions.length,
            rate:
              sourceLeads.length > 0
                ? (sourceConversions.length / sourceLeads.length) * 100
                : 0,
          };
        });
      }

      return {
        cohortWeek: weekKey,
        cohortLabel: getWeekLabel(weekKey),
        totalLeads: allLeads.length,
        conversions: conversions.length,
        conversionRate:
          allLeads.length > 0 ? (conversions.length / allLeads.length) * 100 : 0,
        avgTimeToConvert,
        bySource,
      };
    });

    // Calculate summary
    const totalLeads = leads.length;
    const totalConversions = leads.filter(isConverted).length;
    const overallConversionRate =
      totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0;

    // Find best cohort
    const bestCohort = cohorts
      .filter((c) => c.totalLeads >= 3) // Need minimum sample size
      .sort((a, b) => b.conversionRate - a.conversionRate)[0];

    // Find best source
    const sourceTotals: Record<SourceKey, { leads: number; conversions: number }> = {
      organic: { leads: 0, conversions: 0 },
      paid: { leads: 0, conversions: 0 },
      referral: { leads: 0, conversions: 0 },
      aiSearch: { leads: 0, conversions: 0 },
      direct: { leads: 0, conversions: 0 },
    };

    cohorts.forEach((cohort) => {
      (Object.keys(cohort.bySource) as SourceKey[]).forEach((source) => {
        sourceTotals[source].leads += cohort.bySource[source].leads;
        sourceTotals[source].conversions += cohort.bySource[source].conversions;
      });
    });

    const bestSource = (Object.entries(sourceTotals) as [SourceKey, { leads: number; conversions: number }][])
      .filter(([, data]) => data.leads >= 5) // Need minimum sample size
      .map(([source, data]) => ({
        source:
          source === "aiSearch"
            ? "AI Search"
            : source.charAt(0).toUpperCase() + source.slice(1),
        rate: data.leads > 0 ? (data.conversions / data.leads) * 100 : 0,
      }))
      .sort((a, b) => b.rate - a.rate)[0] || null;

    return NextResponse.json({
      cohorts,
      summary: {
        totalLeads,
        totalConversions,
        overallConversionRate,
        bestCohort: bestCohort
          ? { week: bestCohort.cohortLabel, rate: bestCohort.conversionRate }
          : null,
        bestSource,
      },
    });
  } catch (error) {
    console.error("Cohorts API error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: "Failed to load cohort data",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
