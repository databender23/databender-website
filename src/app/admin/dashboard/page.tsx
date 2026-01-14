"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ActionCards from "./components/ActionCards";
import PriorityLeads from "./components/PriorityLeads";
import LeadFunnel from "./components/LeadFunnel";
import ConvertingContent from "./components/ConvertingContent";
import OutreachCoverage from "./components/OutreachCoverage";
import ChannelQuality from "./components/ChannelQuality";

export interface DashboardData {
  // Action items
  actionItems: {
    hotLeadsToContact: number;
    newToday: number;
    needFollowUp: number;
    companiesToResearch: number;
  };
  // Priority leads (high score, not contacted)
  priorityLeads: Array<{
    id: string;
    name: string;
    company: string | null;
    score: number;
    tier: string;
    status: string;
    industry: string | null;
    createdAt: string;
  }>;
  // Funnel metrics
  funnel: {
    visitors: number;
    identifiedCompanies: number;
    leads: number;
    contacted: number;
    qualified: number;
    customers: number;
  };
  // Top converting pages
  convertingContent: Array<{
    page: string;
    leads: number;
    conversionRate: number;
  }>;
  // Outreach coverage
  outreach: {
    linkedin: { contacted: number; total: number };
    email: { contacted: number; total: number };
    untouched: number;
  };
  // Channel quality
  channels: Array<{
    source: string;
    avgScore: number;
    leads: number;
  }>;
  period: {
    days: number;
    start: string;
    end: string;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(7);
  const [dataFetchedAt, setDataFetchedAt] = useState<Date | null>(null);

  useEffect(() => {
    fetchData();
  }, [days]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/dashboard?days=${days}`);
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      const result = await response.json();
      setData(result);
      setDataFetchedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Lead Generation Command Center</h1>
          <p className="text-text-muted">
            {data.period.start} to {data.period.end}
            {dataFetchedAt && (
              <span className="ml-3 text-xs">
                • Data as of: {dataFetchedAt.toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 border border-border rounded-md bg-bg-primary text-text-primary focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          >
            <option value={7}>Last 7 days</option>
            <option value={14}>Last 14 days</option>
            <option value={30}>Last 30 days</option>
          </select>
          <Link
            href="/admin/analytics"
            className="text-sm text-teal-500 hover:text-teal-600 hover:underline"
          >
            Full Analytics →
          </Link>
        </div>
      </div>

      {/* Action Required Cards */}
      <ActionCards data={data.actionItems} />

      {/* Priority Leads */}
      <PriorityLeads leads={data.priorityLeads} />

      {/* Funnel */}
      <LeadFunnel data={data.funnel} period={data.period.days} />

      {/* Two Column: Converting Content + Outreach Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConvertingContent data={data.convertingContent} />
        <OutreachCoverage data={data.outreach} />
      </div>

      {/* Channel Quality */}
      <ChannelQuality data={data.channels} />
    </div>
  );
}
