"use client";

import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import PageviewsChart from "./components/PageviewsChart";
import TopPagesTable from "./components/TopPagesTable";
import ReferrerSourcesChart from "./components/ReferrerSourcesChart";
import LocationBreakdown from "./components/LocationBreakdown";
import ScrollDepthChart from "./components/ScrollDepthChart";
import TechBreakdown from "./components/TechBreakdown";

interface AnalyticsData {
  period: { start: string; end: string; days: number };
  metrics: {
    pageviews: number;
    uniqueVisitors: number;
    sessions: number;
    conversions: number;
    conversionRate: string;
    chatOpens: number;
    chatMessages: number;
    botPageviews: number;
    returningVisitors: number;
    newVisitors: number;
    avgSessionDuration: number;
    bounceRate: string;
  };
  topPages: { page: string; count: number; avgTime?: number }[];
  dailyPageviews: { date: string; count: number }[];
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
  osBreakdown: Record<string, number>;
  topCountries: { country: string; count: number }[];
  topReferrers: { source: string; count: number }[];
  scrollDepthBreakdown: Record<number, number>;
  conversionBreakdown: Record<string, number>;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(7);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/analytics/overview?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch {
      setError("Failed to load analytics data");
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

  // Format session duration
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics Dashboard</h1>
          <p className="text-text-muted">
            {data.period.start} to {data.period.end}
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
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Page Views" value={data.metrics.pageviews} />
        <StatsCard title="Unique Visitors" value={data.metrics.uniqueVisitors} />
        <StatsCard title="Sessions" value={data.metrics.sessions} />
        <StatsCard
          title="Conversions"
          value={data.metrics.conversions}
          subtitle={`${data.metrics.conversionRate}% conversion rate`}
        />
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Avg Session"
          value={formatDuration(data.metrics.avgSessionDuration)}
          subtitle="Average time on site"
        />
        <StatsCard
          title="Bounce Rate"
          value={`${data.metrics.bounceRate}%`}
          subtitle="Single page sessions"
        />
        <StatsCard
          title="New Visitors"
          value={data.metrics.newVisitors}
          subtitle={`${data.metrics.sessions > 0 ? Math.round((data.metrics.newVisitors / data.metrics.sessions) * 100) : 0}% of sessions`}
        />
        <StatsCard
          title="Returning"
          value={data.metrics.returningVisitors}
          subtitle={`${data.metrics.sessions > 0 ? Math.round((data.metrics.returningVisitors / data.metrics.sessions) * 100) : 0}% of sessions`}
        />
      </div>

      {/* Chat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Chat Opens"
          value={data.metrics.chatOpens}
          subtitle="Users who opened chat"
        />
        <StatsCard
          title="Chat Messages"
          value={data.metrics.chatMessages}
          subtitle="Messages sent"
        />
        <StatsCard
          title="Bot Traffic"
          value={data.metrics.botPageviews}
          subtitle="Filtered from metrics"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageviewsChart data={data.dailyPageviews} />
        <TopPagesTable data={data.topPages} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReferrerSourcesChart data={data.topReferrers} />
        <LocationBreakdown data={data.topCountries} />
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScrollDepthChart data={data.scrollDepthBreakdown} />
        <TechBreakdown browserData={data.browserBreakdown} osData={data.osBreakdown} />
      </div>

      {/* Device Breakdown */}
      {Object.keys(data.deviceBreakdown).length > 0 && (
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Device Breakdown</h3>
          <div className="flex gap-8">
            {Object.entries(data.deviceBreakdown).map(([device, count]) => (
              <div key={device} className="text-center">
                <p className="text-2xl font-bold text-text-primary">{count}</p>
                <p className="text-sm text-text-muted capitalize">{device}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Breakdown */}
      {Object.keys(data.conversionBreakdown).length > 0 && (
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Conversion Types</h3>
          <div className="flex gap-8">
            {Object.entries(data.conversionBreakdown).map(([type, count]) => (
              <div key={type} className="text-center">
                <p className="text-2xl font-bold text-text-primary">{count}</p>
                <p className="text-sm text-text-muted">{type.replace(/_/g, " ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
