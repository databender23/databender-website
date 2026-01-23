"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import OverviewCards from "./components/OverviewCards";
import SequenceTable from "./components/SequenceTable";
import DailyChart from "./components/DailyChart";
import DeliverabilityHealth from "./components/DeliverabilityHealth";
import ActivityFeed from "./components/ActivityFeed";
import LeadsTable from "./components/LeadsTable";

export interface OverviewData {
  period: { start: string; end: string };
  totals: {
    sent: number;
    delivered: number;
    deliveredRate: number;
    opened: number;
    openedRate: number;
    clicked: number;
    clickedRate: number;
    replied: number;
    repliedRate: number;
    bounced: number;
    bouncedRate: number;
    complained: number;
    complainedRate: number;
    unsubscribed: number;
    unsubscribedRate: number;
  };
  bySequence: Array<{
    sequenceType: string;
    enrolled: number;
    metrics: {
      day0: { sent: number; opened: number; clicked: number };
      day2: { sent: number; opened: number; clicked: number };
      day7: { sent: number; opened: number; clicked: number };
      day14: { sent: number; opened: number; clicked: number };
      day21: { sent: number; opened: number; clicked: number };
      replies: number;
    };
  }>;
}

export interface DailyData {
  days: Array<{
    date: string;
    sent: number;
    opened: number;
    clicked: number;
  }>;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  email: string;
  type: "open" | "click" | "reply" | "bounce" | "complaint" | "sent";
  emailDay: number;
  sequenceType: string;
  url?: string;
}

export interface LeadItem {
  leadId: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  sequenceType: string;
  status: string;
  totalOpens: number;
  totalClicks: number;
  hasReplied: boolean;
  lastActivityAt?: string;
}

export default function ColdOutreachDashboard() {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [activityData, setActivityData] = useState<ActivityItem[]>([]);
  const [leadsData, setLeadsData] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(30);
  const [leadsFilter, setLeadsFilter] = useState<"all" | "replied" | "high-intent" | "needs-attention">("all");
  const [dataFetchedAt, setDataFetchedAt] = useState<Date | null>(null);

  // Fetch all data when days changes
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [overviewRes, dailyRes, activityRes, leadsRes] = await Promise.all([
          fetch(`/api/admin/cold-outreach/overview?days=${days}`),
          fetch(`/api/admin/cold-outreach/daily?days=${days}`),
          fetch(`/api/admin/cold-outreach/activity?limit=20`),
          fetch(`/api/admin/cold-outreach/leads?filter=${leadsFilter}`),
        ]);

        if (!overviewRes.ok) throw new Error("Failed to fetch overview data");
        if (!dailyRes.ok) throw new Error("Failed to fetch daily data");
        if (!activityRes.ok) throw new Error("Failed to fetch activity data");
        if (!leadsRes.ok) throw new Error("Failed to fetch leads data");

        const [overview, daily, activity, leads] = await Promise.all([
          overviewRes.json(),
          dailyRes.json(),
          activityRes.json(),
          leadsRes.json(),
        ]);

        setOverviewData(overview);
        setDailyData(daily);
        setActivityData(activity.items || []);
        setLeadsData(leads.leads || []);
        setDataFetchedAt(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [days, leadsFilter]);

  // Separate function for leads-only refresh (used by filter change)
  const handleFilterChange = useCallback(async (newFilter: typeof leadsFilter) => {
    setLeadsFilter(newFilter);
  }, []);

  if (loading && !overviewData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error && !overviewData) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cold Outreach Performance</h1>
          <p className="text-text-muted">
            {overviewData?.period.start} to {overviewData?.period.end}
            {dataFetchedAt && (
              <span className="ml-3 text-xs">
                Data as of: {dataFetchedAt.toLocaleString()}
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
            <option value={90}>Last 90 days</option>
          </select>
          <Link
            href="/admin/cold-outreach/compose"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Compose
          </Link>
          <Link
            href="/admin/leads"
            className="text-sm text-teal-500 hover:text-teal-600 hover:underline"
          >
            All Leads
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      {overviewData && <OverviewCards data={overviewData.totals} />}

      {/* Daily Chart */}
      {dailyData && <DailyChart data={dailyData.days} />}

      {/* Sequence Table */}
      {overviewData && <SequenceTable data={overviewData.bySequence} />}

      {/* Two Column: Deliverability + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {overviewData && <DeliverabilityHealth data={overviewData.totals} />}
        <ActivityFeed items={activityData} />
      </div>

      {/* Leads Table */}
      <LeadsTable
        leads={leadsData}
        filter={leadsFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}
