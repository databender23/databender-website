import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getSessionsForDateRange } from "@/lib/analytics/dynamodb";

export async function GET(request: NextRequest) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const days = parseInt(searchParams.get("days") || "7", 10);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  try {
    const sessions = await getSessionsForDateRange(startStr, endStr);

    // Analyze common paths
    const pathCounts: Record<string, { count: number; converted: number; avgDuration: number; durations: number[] }> = {};

    for (const session of sessions) {
      if (!session.pagesVisited || session.pagesVisited.length < 2) continue;

      // Create a path string from pages visited (limit to first 5 pages for grouping)
      const pathKey = session.pagesVisited.slice(0, 5).join(" → ");

      if (!pathCounts[pathKey]) {
        pathCounts[pathKey] = { count: 0, converted: 0, avgDuration: 0, durations: [] };
      }

      pathCounts[pathKey].count++;
      if (session.isConverted) {
        pathCounts[pathKey].converted++;
      }
      if (session.duration) {
        pathCounts[pathKey].durations.push(session.duration);
      }
    }

    // Calculate average durations and sort by count
    const commonPaths = Object.entries(pathCounts)
      .map(([path, data]) => ({
        path,
        pages: path.split(" → "),
        count: data.count,
        converted: data.converted,
        conversionRate: data.count > 0 ? Math.round((data.converted / data.count) * 100) : 0,
        avgDuration: data.durations.length > 0
          ? Math.round(data.durations.reduce((a, b) => a + b, 0) / data.durations.length)
          : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Also analyze entry/exit page combinations
    const entryExitCounts: Record<string, { count: number; converted: number }> = {};

    for (const session of sessions) {
      if (!session.entryPage || !session.exitPage) continue;

      const key = `${session.entryPage} → ${session.exitPage}`;
      if (!entryExitCounts[key]) {
        entryExitCounts[key] = { count: 0, converted: 0 };
      }
      entryExitCounts[key].count++;
      if (session.isConverted) {
        entryExitCounts[key].converted++;
      }
    }

    const topEntryExitPaths = Object.entries(entryExitCounts)
      .map(([path, data]) => ({
        entry: path.split(" → ")[0],
        exit: path.split(" → ")[1],
        count: data.count,
        converted: data.converted,
        conversionRate: data.count > 0 ? Math.round((data.converted / data.count) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return NextResponse.json({
      commonPaths,
      topEntryExitPaths,
      totalSessions: sessions.length,
      period: { start: startStr, end: endStr, days },
    });
  } catch (error) {
    console.error("Error fetching paths data:", error);
    return NextResponse.json(
      { error: "Failed to fetch paths data" },
      { status: 500 }
    );
  }
}
