"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface HotLeadResponse {
  leadId: string;
  name: string;
  company: string | null;
  email: string;
  createdAt: string;
  firstContactAt: string | null;
  responseTimeMinutes: number | null;
  status: string;
  tier: string;
}

interface ResponseTimeData {
  avgResponseMinutes: number | null;
  medianResponseMinutes: number | null;
  totalHotLeads: number;
  contactedCount: number;
  pendingCount: number;
  recentHotLeads: HotLeadResponse[];
  distribution: {
    under5: number;
    under30: number;
    under60: number;
    over60: number;
  };
}

interface ResponseTimeTrackerProps {
  days?: number;
  className?: string;
}

const RESPONSE_THRESHOLDS = {
  excellent: 5,  // Under 5 minutes
  good: 30,      // Under 30 minutes
  acceptable: 60, // Under 1 hour
};

function formatDuration(minutes: number | null): string {
  if (minutes === null) return "Pending";
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMins = Math.round(minutes % 60);
  if (hours < 24) {
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h`;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getResponseStatus(minutes: number | null): "excellent" | "good" | "acceptable" | "poor" | "pending" {
  if (minutes === null) return "pending";
  if (minutes <= RESPONSE_THRESHOLDS.excellent) return "excellent";
  if (minutes <= RESPONSE_THRESHOLDS.good) return "good";
  if (minutes <= RESPONSE_THRESHOLDS.acceptable) return "acceptable";
  return "poor";
}

const statusConfig = {
  excellent: {
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Excellent",
    dotColor: "bg-green-500",
  },
  good: {
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    label: "Good",
    dotColor: "bg-teal-500",
  },
  acceptable: {
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    label: "Slow",
    dotColor: "bg-amber-500",
  },
  poor: {
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    label: "Too Slow",
    dotColor: "bg-red-500",
  },
  pending: {
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    label: "Pending",
    dotColor: "bg-gray-400",
  },
};

export default function ResponseTimeTracker({ days = 30, className = "" }: ResponseTimeTrackerProps) {
  const [data, setData] = useState<ResponseTimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/analytics/response-time?days=${days}`);
        if (!response.ok) throw new Error("Failed to fetch response time data");
        const result = await response.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load response time data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [days]);

  const avgStatus = useMemo(() => {
    return getResponseStatus(data?.avgResponseMinutes ?? null);
  }, [data]);

  const distributionTotal = useMemo(() => {
    if (!data) return 0;
    return data.distribution.under5 + data.distribution.under30 + data.distribution.under60 + data.distribution.over60;
  }, [data]);

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-border shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">RESPONSE TIME</p>
            <h3 className="text-xl font-bold text-text-primary">Hot Lead Response</h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
            <p className="text-sm text-text-muted">Loading response data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl border border-border shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">RESPONSE TIME</p>
            <h3 className="text-xl font-bold text-text-primary">Hot Lead Response</h3>
          </div>
        </div>
        <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  const avgConfig = statusConfig[avgStatus];

  return (
    <div className={`bg-white rounded-xl border border-border shadow-sm p-6 relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">RESPONSE TIME</p>
          <h3 className="text-xl font-bold text-text-primary">Hot Lead Response</h3>
          <p className="text-sm text-text-muted mt-1">
            Time from hot lead alert to first contact
          </p>
        </div>

        {/* Average Response Time Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-4 py-3 rounded-lg border ${avgConfig.bgColor} ${avgConfig.borderColor}`}
        >
          <p className="text-xs text-text-muted mb-1">Average Response</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${avgConfig.color}`}>
              {formatDuration(data?.avgResponseMinutes ?? null)}
            </span>
          </div>
          <p className={`text-xs font-medium ${avgConfig.color} mt-1`}>
            {avgConfig.label} - Goal: &lt;5 min
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-text-primary">{data?.totalHotLeads ?? 0}</p>
          <p className="text-xs text-text-muted">Hot Leads</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{data?.contactedCount ?? 0}</p>
          <p className="text-xs text-text-muted">Contacted</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{data?.pendingCount ?? 0}</p>
          <p className="text-xs text-text-muted">Pending</p>
        </div>
        <div className="bg-teal-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-teal-600">
            {formatDuration(data?.medianResponseMinutes ?? null)}
          </p>
          <p className="text-xs text-text-muted">Median Time</p>
        </div>
      </div>

      {/* Distribution Bar */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Response Time Distribution</h4>
        <div className="h-8 rounded-lg overflow-hidden flex bg-gray-100">
          {distributionTotal > 0 ? (
            <>
              <div
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${(data!.distribution.under5 / distributionTotal) * 100}%` }}
                title={`Under 5 min: ${data!.distribution.under5}`}
              />
              <div
                className="bg-teal-500 transition-all duration-500"
                style={{ width: `${(data!.distribution.under30 / distributionTotal) * 100}%` }}
                title={`5-30 min: ${data!.distribution.under30}`}
              />
              <div
                className="bg-amber-500 transition-all duration-500"
                style={{ width: `${(data!.distribution.under60 / distributionTotal) * 100}%` }}
                title={`30-60 min: ${data!.distribution.under60}`}
              />
              <div
                className="bg-red-500 transition-all duration-500"
                style={{ width: `${(data!.distribution.over60 / distributionTotal) * 100}%` }}
                title={`Over 60 min: ${data!.distribution.over60}`}
              />
            </>
          ) : (
            <div className="flex-1 bg-gray-200" />
          )}
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            &lt;5 min ({data?.distribution.under5 ?? 0})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-teal-500"></span>
            5-30 min ({data?.distribution.under30 ?? 0})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            30-60 min ({data?.distribution.under60 ?? 0})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            &gt;60 min ({data?.distribution.over60 ?? 0})
          </span>
        </div>
      </div>

      {/* Recent Hot Leads Table */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Recent Hot Leads</h4>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-gray-100">
                <th className="pb-2 font-medium">Lead</th>
                <th className="pb-2 font-medium">Created</th>
                <th className="pb-2 font-medium">Response</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentHotLeads.map((lead, index) => {
                const responseStatus = getResponseStatus(lead.responseTimeMinutes);
                const config = statusConfig[responseStatus];
                return (
                  <motion.tr
                    key={lead.leadId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3">
                      <Link href={`/admin/leads/${lead.leadId}`} className="hover:text-teal-600">
                        <p className="font-medium text-text-primary">{lead.name}</p>
                        <p className="text-xs text-text-muted">{lead.company || lead.email}</p>
                      </Link>
                    </td>
                    <td className="py-3 text-text-muted">
                      {formatTimeAgo(lead.createdAt)}
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${config.color}`}>
                        {formatDuration(lead.responseTimeMinutes)}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}></span>
                        {config.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
              {(!data?.recentHotLeads || data.recentHotLeads.length === 0) && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-text-muted">
                    No hot leads in the selected period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Goal Reminder */}
      <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg">
        <p className="text-xs text-text-muted">
          <strong className="text-text-secondary">Speed matters:</strong> Research shows that responding to hot leads within 5 minutes increases conversion rates by 9x compared to responding in 30 minutes.
        </p>
      </div>
    </div>
  );
}
