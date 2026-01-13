import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getConversionPathsForDateRange } from "@/lib/analytics/dynamodb";
import type { ConversionPath } from "@/lib/analytics/events";

interface PageAttribution {
  page: string;
  firstTouchCount: number;
  lastTouchCount: number;
  assistCount: number;
  totalAppearances: number;
  influenceScore: number;
  conversionRate: number;
}

interface ConversionPathAnalysis {
  path: string[];
  pathString: string;
  count: number;
  percentage: number;
}

interface AttributionData {
  period: { start: string; end: string; days: number };
  totalConversions: number;
  averageJourneyLength: number;
  singlePageConversions: number;
  multiPageConversions: number;
  firstTouchAttribution: PageAttribution[];
  lastTouchAttribution: PageAttribution[];
  assistPages: PageAttribution[];
  topConversionPaths: ConversionPathAnalysis[];
  conversionsByType: Record<string, number>;
  conversionsByDevice: Record<string, number>;
  conversionsBySource: Record<string, number>;
}

function calculateAttribution(conversions: ConversionPath[]): AttributionData {
  const totalConversions = conversions.length;

  if (totalConversions === 0) {
    return {
      period: { start: "", end: "", days: 0 },
      totalConversions: 0,
      averageJourneyLength: 0,
      singlePageConversions: 0,
      multiPageConversions: 0,
      firstTouchAttribution: [],
      lastTouchAttribution: [],
      assistPages: [],
      topConversionPaths: [],
      conversionsByType: {},
      conversionsByDevice: {},
      conversionsBySource: {},
    };
  }

  // Calculate journey statistics
  const totalJourneyLength = conversions.reduce((sum, c) => sum + c.journeyLength, 0);
  const averageJourneyLength = Math.round((totalJourneyLength / totalConversions) * 10) / 10;
  const singlePageConversions = conversions.filter((c) => c.journeyLength === 1).length;
  const multiPageConversions = conversions.filter((c) => c.journeyLength > 1).length;

  // First-touch attribution
  const firstTouchCounts: Record<string, number> = {};
  conversions.forEach((c) => {
    const page = c.firstTouchPage;
    firstTouchCounts[page] = (firstTouchCounts[page] || 0) + 1;
  });

  // Last-touch attribution
  const lastTouchCounts: Record<string, number> = {};
  conversions.forEach((c) => {
    const page = c.lastTouchPage;
    lastTouchCounts[page] = (lastTouchCounts[page] || 0) + 1;
  });

  // Assist pages (pages in the middle of the journey)
  const assistCounts: Record<string, number> = {};
  const allPageAppearances: Record<string, number> = {};

  conversions.forEach((c) => {
    const journey = c.pageJourney || [];
    const uniquePages = new Set<string>();

    journey.forEach((step, index) => {
      const page = step.page;
      uniquePages.add(page);

      // Count assists (not first or last in journey with 3+ pages)
      if (journey.length >= 3 && index > 0 && index < journey.length - 1) {
        assistCounts[page] = (assistCounts[page] || 0) + 1;
      }
    });

    // Count total appearances
    uniquePages.forEach((page) => {
      allPageAppearances[page] = (allPageAppearances[page] || 0) + 1;
    });
  });

  // Calculate influence score (percentage of conversions that touched this page)
  const calculateInfluenceScore = (page: string): number => {
    const appearances = allPageAppearances[page] || 0;
    return Math.round((appearances / totalConversions) * 100);
  };

  // Build attribution objects
  const buildPageAttribution = (
    counts: Record<string, number>,
    type: "first" | "last" | "assist"
  ): PageAttribution[] => {
    return Object.entries(counts)
      .map(([page, count]) => ({
        page,
        firstTouchCount: firstTouchCounts[page] || 0,
        lastTouchCount: lastTouchCounts[page] || 0,
        assistCount: assistCounts[page] || 0,
        totalAppearances: allPageAppearances[page] || 0,
        influenceScore: calculateInfluenceScore(page),
        conversionRate: Math.round((count / totalConversions) * 100),
      }))
      .sort((a, b) => {
        if (type === "first") return b.firstTouchCount - a.firstTouchCount;
        if (type === "last") return b.lastTouchCount - a.lastTouchCount;
        return b.assistCount - a.assistCount;
      })
      .slice(0, 15);
  };

  const firstTouchAttribution = buildPageAttribution(firstTouchCounts, "first");
  const lastTouchAttribution = buildPageAttribution(lastTouchCounts, "last");
  const assistPages = buildPageAttribution(assistCounts, "assist");

  // Top conversion paths
  const pathCounts: Record<string, number> = {};
  conversions.forEach((c) => {
    const journey = c.pageJourney || [];
    // Limit path display to first 5 pages for readability
    const pathPages = journey.slice(0, 5).map((step) => step.page);
    const pathString = pathPages.join(" -> ");
    pathCounts[pathString] = (pathCounts[pathString] || 0) + 1;
  });

  const topConversionPaths: ConversionPathAnalysis[] = Object.entries(pathCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([pathString, count]) => ({
      path: pathString.split(" -> "),
      pathString,
      count,
      percentage: Math.round((count / totalConversions) * 100),
    }));

  // Breakdowns
  const conversionsByType: Record<string, number> = {};
  conversions.forEach((c) => {
    const type = c.conversionType || "unknown";
    conversionsByType[type] = (conversionsByType[type] || 0) + 1;
  });

  const conversionsByDevice: Record<string, number> = {};
  conversions.forEach((c) => {
    const device = c.device || "unknown";
    conversionsByDevice[device] = (conversionsByDevice[device] || 0) + 1;
  });

  const conversionsBySource: Record<string, number> = {};
  conversions.forEach((c) => {
    const source = c.referrerSource || "direct";
    conversionsBySource[source] = (conversionsBySource[source] || 0) + 1;
  });

  return {
    period: { start: "", end: "", days: 0 },
    totalConversions,
    averageJourneyLength,
    singlePageConversions,
    multiPageConversions,
    firstTouchAttribution,
    lastTouchAttribution,
    assistPages,
    topConversionPaths,
    conversionsByType,
    conversionsByDevice,
    conversionsBySource,
  };
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "30", 10);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const conversions = await getConversionPathsForDateRange(startStr, endStr);

    const attributionData = calculateAttribution(conversions);
    attributionData.period = { start: startStr, end: endStr, days };

    return NextResponse.json(attributionData);
  } catch (error) {
    console.error("Attribution analysis error:", error);
    return NextResponse.json({ error: "Failed to fetch attribution data" }, { status: 500 });
  }
}
