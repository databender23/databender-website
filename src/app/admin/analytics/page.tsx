"use client";

import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import PageviewsChart from "./components/PageviewsChart";
import TopPagesTable from "./components/TopPagesTable";

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
  };
  topPages: { page: string; count: number }[];
  dailyPageviews: { date: string; count: number }[];
  deviceBreakdown: Record<string, number>;
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
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
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
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-500">
            {data.period.start} to {data.period.end}
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
        >
          <option value={7}>Last 7 days</option>
          <option value={14}>Last 14 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats Grid */}
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

      {/* Chat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="Chat Opens"
          value={data.metrics.chatOpens}
          subtitle="Users who opened the chat widget"
        />
        <StatsCard
          title="Chat Messages"
          value={data.metrics.chatMessages}
          subtitle="Total messages sent by visitors"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PageviewsChart data={data.dailyPageviews} />
        <TopPagesTable data={data.topPages} />
      </div>

      {/* Device Breakdown */}
      {Object.keys(data.deviceBreakdown).length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
          <div className="flex gap-8">
            {Object.entries(data.deviceBreakdown).map(([device, count]) => (
              <div key={device} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500 capitalize">{device}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Breakdown */}
      {Object.keys(data.conversionBreakdown).length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Types</h3>
          <div className="flex gap-8">
            {Object.entries(data.conversionBreakdown).map(([type, count]) => (
              <div key={type} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500">{type.replace(/_/g, " ")}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
