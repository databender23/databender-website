"use client";

import { useState, useEffect } from "react";

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

function PageAttributionTable({
  title,
  data,
  primaryMetric,
}: {
  title: string;
  data: PageAttribution[];
  primaryMetric: "firstTouchCount" | "lastTouchCount" | "assistCount";
}) {
  const maxValue = data[0]?.[primaryMetric] || 1;

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="space-y-3">
        {data.length === 0 ? (
          <p className="text-text-muted text-sm">No data available</p>
        ) : (
          data.slice(0, 10).map((item, index) => (
            <div key={item.page} className="flex items-center gap-3">
              <span className="text-sm text-text-muted w-6">{index + 1}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary font-medium truncate max-w-[200px]">
                    {item.page}
                  </span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-text-muted">
                      {item[primaryMetric]} ({item.conversionRate}%)
                    </span>
                    <span
                      className="text-xs text-text-muted bg-bg-secondary px-2 py-0.5 rounded"
                      title="Influence score - % of conversions that touched this page"
                    >
                      {item.influenceScore}% influence
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 rounded-full transition-all"
                    style={{ width: `${(item[primaryMetric] / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ConversionPathsTable({ data }: { data: ConversionPathAnalysis[] }) {
  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Top Conversion Paths</h3>
      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-text-muted text-sm">No conversion paths available</p>
        ) : (
          data.map((pathData, index) => (
            <div key={pathData.pathString} className="border-b border-border pb-3 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">
                  #{index + 1} - {pathData.count} conversions ({pathData.percentage}%)
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-1">
                {pathData.path.map((page, pageIndex) => (
                  <div key={pageIndex} className="flex items-center">
                    <span className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded truncate max-w-[150px]">
                      {page}
                    </span>
                    {pageIndex < pathData.path.length - 1 && (
                      <span className="text-text-muted mx-1">-&gt;</span>
                    )}
                  </div>
                ))}
                {pathData.path.length >= 5 && (
                  <span className="text-xs text-text-muted">...</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function BreakdownCard({
  title,
  data,
}: {
  title: string;
  data: Record<string, number>;
}) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="space-y-2">
        {sortedEntries.length === 0 ? (
          <p className="text-text-muted text-sm">No data available</p>
        ) : (
          sortedEntries.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-text-secondary capitalize">
                {key.replace(/_/g, " ")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{value}</span>
                <span className="text-xs text-text-muted">
                  ({total > 0 ? Math.round((value / total) * 100) : 0}%)
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AttributionReport() {
  const [data, setData] = useState<AttributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(30);
  const [dataFetchedAt, setDataFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/analytics/attribution?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setDataFetchedAt(new Date());
    } catch {
      setError("Failed to load attribution data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Content Attribution</h2>
          <p className="text-text-muted text-sm">
            {data.period.start} to {data.period.end}
            {dataFetchedAt && (
              <span className="ml-3 text-xs">
                • Data as of: {dataFetchedAt.toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-4 py-2 border border-border rounded-md bg-bg-primary text-text-primary focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={60}>Last 60 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Total Conversions</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{data.totalConversions}</p>
        </div>
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Avg Journey Length</p>
          <p className="text-3xl font-bold text-text-primary mt-2">
            {data.averageJourneyLength} <span className="text-lg font-normal">pages</span>
          </p>
        </div>
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Single-Page Conversions</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{data.singlePageConversions}</p>
          <p className="text-sm text-text-muted mt-1">
            {data.totalConversions > 0
              ? `${Math.round((data.singlePageConversions / data.totalConversions) * 100)}%`
              : "0%"} of total
          </p>
        </div>
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Multi-Page Journeys</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{data.multiPageConversions}</p>
          <p className="text-sm text-text-muted mt-1">
            {data.totalConversions > 0
              ? `${Math.round((data.multiPageConversions / data.totalConversions) * 100)}%`
              : "0%"} of total
          </p>
        </div>
      </div>

      {/* Attribution Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageAttributionTable
          title="First-Touch Attribution"
          data={data.firstTouchAttribution}
          primaryMetric="firstTouchCount"
        />
        <PageAttributionTable
          title="Last-Touch Attribution"
          data={data.lastTouchAttribution}
          primaryMetric="lastTouchCount"
        />
      </div>

      {/* Assist Pages */}
      <PageAttributionTable
        title="Assist Pages (Influence on Multi-Page Journeys)"
        data={data.assistPages}
        primaryMetric="assistCount"
      />

      {/* Conversion Paths */}
      <ConversionPathsTable data={data.topConversionPaths} />

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownCard title="By Conversion Type" data={data.conversionsByType} />
        <BreakdownCard title="By Device" data={data.conversionsByDevice} />
        <BreakdownCard title="By Traffic Source" data={data.conversionsBySource} />
      </div>
    </div>
  );
}
