"use client";

import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import PageviewsChart from "./components/PageviewsChart";
import TopPagesTable from "./components/TopPagesTable";
import ReferrerSourcesChart from "./components/ReferrerSourcesChart";
import LocationBreakdown from "./components/LocationBreakdown";
import ScrollDepthChart from "./components/ScrollDepthChart";
import TechBreakdown from "./components/TechBreakdown";
import IdentifiedCompanies from "./components/IdentifiedCompanies";
import LeadScoreBreakdown from "./components/LeadScoreBreakdown";
import AttributionReport from "./components/AttributionReport";
import type { LeadTier } from "@/lib/analytics/lead-scoring";

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
  companyIdentification?: {
    identifiedCompanies: number;
    identifiedSessions: number;
    topCompanies: { name: string; domain: string; visits: number }[];
  };
  leadScoring?: {
    tierBreakdown: Record<LeadTier, number>;
    averageScore: number;
    topScoringPages: { page: string; contributedScore: number; visits: number }[];
    highScoreVisitors: {
      visitorId: string;
      score: number;
      tier: LeadTier;
      pagesVisited: string[];
      country?: string;
      device?: string;
    }[];
  };
  attribution?: {
    trackedConversions: number;
    averageJourneyLength: number;
    singlePageConversions: number;
    multiPageConversions: number;
    topFirstTouchPages: { page: string; count: number }[];
    topLastTouchPages: { page: string; count: number }[];
  };
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <StatsCard
          title="Companies ID'd"
          value={data.companyIdentification?.identifiedCompanies || 0}
          subtitle="From IP reverse DNS"
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

      {/* Attribution Summary */}
      {data.attribution && data.attribution.trackedConversions > 0 && (
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Conversion Attribution Summary</h3>
            <a
              href="/admin/analytics/attribution"
              className="text-sm text-teal-500 hover:text-teal-600 hover:underline"
            >
              View Full Report
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{data.attribution.trackedConversions}</p>
              <p className="text-sm text-text-muted">Tracked Conversions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{data.attribution.averageJourneyLength}</p>
              <p className="text-sm text-text-muted">Avg Pages/Conversion</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{data.attribution.singlePageConversions}</p>
              <p className="text-sm text-text-muted">Single-Page</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{data.attribution.multiPageConversions}</p>
              <p className="text-sm text-text-muted">Multi-Page</p>
            </div>
          </div>
          {data.attribution.topFirstTouchPages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">Top Entry Points</p>
                <div className="space-y-1">
                  {data.attribution.topFirstTouchPages.slice(0, 3).map((item) => (
                    <div key={item.page} className="flex justify-between text-sm">
                      <span className="text-text-muted truncate max-w-[180px]">{item.page}</span>
                      <span className="text-text-primary font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">Top Conversion Pages</p>
                <div className="space-y-1">
                  {data.attribution.topLastTouchPages.slice(0, 3).map((item) => (
                    <div key={item.page} className="flex justify-between text-sm">
                      <span className="text-text-muted truncate max-w-[180px]">{item.page}</span>
                      <span className="text-text-primary font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lead Score Section */}
      {data.leadScoring && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">Lead Intent Scoring</h2>
            <span className="text-sm text-text-muted">Based on visitor behavior signals</span>
          </div>
          <LeadScoreBreakdown data={data.leadScoring} />
        </div>
      )}

      {/* Identified Companies */}
      <IdentifiedCompanies days={days} />
    </div>
  );
}
