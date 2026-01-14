import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getSessionsForDateRange } from "@/lib/analytics/dynamodb";

interface RegionStats {
  region: string;
  regionCode: string;
  country: string;
  countryCode: string;
  visitors: Set<string>;
  sessions: number;
  leads: number;
}

interface CityStats {
  city: string;
  region: string;
  regionCode: string;
  country: string;
  countryCode: string;
  visitors: Set<string>;
  leads: number;
}

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7", 10);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const sessions = await getSessionsForDateRange(startStr, endStr);

    // Filter to sessions with geo data, excluding admin-only sessions
    const sessionsWithGeo = sessions.filter(
      (s) => s.country && s.country !== "Unknown" && !s.entryPage?.startsWith("/admin")
    );

    // Aggregate by region
    const regionMap = new Map<string, RegionStats>();
    // Aggregate by city
    const cityMap = new Map<string, CityStats>();

    sessionsWithGeo.forEach((session) => {
      const country = session.country || "Unknown";
      const countryCode = session.countryCode || "";
      const region = session.region || "Unknown";
      const regionCode = session.regionCode || "";
      const city = session.city || "Unknown";

      // Region key: combine country and region for uniqueness
      const regionKey = `${country}:${region}`;
      if (!regionMap.has(regionKey)) {
        regionMap.set(regionKey, {
          region,
          regionCode,
          country,
          countryCode,
          visitors: new Set(),
          sessions: 0,
          leads: 0,
        });
      }
      const regionStats = regionMap.get(regionKey)!;
      regionStats.visitors.add(session.visitorId);
      regionStats.sessions++;
      if (session.isConverted) {
        regionStats.leads++;
      }

      // City key: combine country, region, and city for uniqueness
      const cityKey = `${country}:${region}:${city}`;
      if (!cityMap.has(cityKey)) {
        cityMap.set(cityKey, {
          city,
          region,
          regionCode,
          country,
          countryCode,
          visitors: new Set(),
          leads: 0,
        });
      }
      const cityStats = cityMap.get(cityKey)!;
      cityStats.visitors.add(session.visitorId);
      if (session.isConverted) {
        cityStats.leads++;
      }
    });

    // Transform to arrays and sort by visitor count
    const byRegion = Array.from(regionMap.values())
      .map((stats) => ({
        region: stats.region,
        regionCode: stats.regionCode,
        country: stats.country,
        countryCode: stats.countryCode,
        visitors: stats.visitors.size,
        sessions: stats.sessions,
        leads: stats.leads,
      }))
      .sort((a, b) => b.visitors - a.visitors);

    const byCity = Array.from(cityMap.values())
      .map((stats) => ({
        city: stats.city,
        region: stats.region,
        regionCode: stats.regionCode,
        country: stats.country,
        countryCode: stats.countryCode,
        visitors: stats.visitors.size,
        leads: stats.leads,
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 50); // Limit to top 50 cities

    // Calculate summary metrics
    const totalVisitors = new Set(sessionsWithGeo.map((s) => s.visitorId)).size;
    const totalSessions = sessionsWithGeo.length;
    const totalLeads = sessionsWithGeo.filter((s) => s.isConverted).length;
    const uniqueCountries = new Set(sessionsWithGeo.map((s) => s.country)).size;
    const uniqueRegions = regionMap.size;

    // Top country
    const countryVisitors = new Map<string, Set<string>>();
    sessionsWithGeo.forEach((s) => {
      if (!countryVisitors.has(s.country!)) {
        countryVisitors.set(s.country!, new Set());
      }
      countryVisitors.get(s.country!)!.add(s.visitorId);
    });
    const topCountry = Array.from(countryVisitors.entries())
      .sort((a, b) => b[1].size - a[1].size)[0]?.[0] || "N/A";

    return NextResponse.json({
      period: { start: startStr, end: endStr, days },
      byRegion,
      byCity,
      summary: {
        totalVisitors,
        totalSessions,
        totalLeads,
        uniqueCountries,
        uniqueRegions,
        topCountry,
      },
    });
  } catch (error) {
    console.error("Geographic analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch geographic analytics" },
      { status: 500 }
    );
  }
}
