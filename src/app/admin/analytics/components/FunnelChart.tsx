"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface FunnelStage {
  key: string;
  label: string;
  value: number;
  color: string;
  benchmark?: { min: number; max: number };
}

interface FunnelData {
  visitors: number;
  identifiedCompanies: number;
  leads: number;
  contacted: number;
  qualified: number;
  opportunities: number;
  customers: number;
}

interface FunnelChartProps {
  days?: number;
}

// Benchmark ranges for conversion rates (as percentages)
const BENCHMARKS: Record<string, { min: number; max: number; label: string }> = {
  "visitor_lead": { min: 4, max: 6, label: "Visitor to Lead" },
  "lead_mql": { min: 20, max: 40, label: "MQL to SQL" },
  "qualified_opportunity": { min: 15, max: 30, label: "SQL to Opportunity" },
  "opportunity_customer": { min: 20, max: 40, label: "Opportunity to Close" },
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

function calculateRate(from: number, to: number): number {
  if (from === 0) return 0;
  return (to / from) * 100;
}

function formatRate(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

function getRateStatus(rate: number, benchmark?: { min: number; max: number }): "good" | "warning" | "poor" {
  if (!benchmark) return "good";
  if (rate >= benchmark.min) return "good";
  if (rate >= benchmark.min * 0.5) return "warning";
  return "poor";
}

const statusColors = {
  good: "text-green-600 bg-green-50",
  warning: "text-amber-600 bg-amber-50",
  poor: "text-red-600 bg-red-50",
};

const statusIcons = {
  good: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  poor: (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
};

export default function FunnelChart({ days = 7 }: FunnelChartProps) {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/analytics/funnel?days=${days}`);
        if (!response.ok) throw new Error("Failed to fetch funnel data");
        const result = await response.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load funnel data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [days]);

  const stages = useMemo((): FunnelStage[] => {
    if (!data) return [];
    return [
      { key: "visitors", label: "Visitors", value: data.visitors, color: "from-gray-400 to-gray-500" },
      { key: "identifiedCompanies", label: "Identified Companies", value: data.identifiedCompanies, color: "from-purple-400 to-purple-500" },
      { key: "leads", label: "Leads", value: data.leads, color: "from-blue-400 to-blue-500" },
      { key: "contacted", label: "Contacted", value: data.contacted, color: "from-amber-400 to-amber-500" },
      { key: "qualified", label: "Qualified (SQL)", value: data.qualified, color: "from-teal-400 to-teal-500" },
      { key: "opportunities", label: "Opportunities", value: data.opportunities, color: "from-indigo-400 to-indigo-500" },
      { key: "customers", label: "Customers", value: data.customers, color: "from-green-400 to-green-500" },
    ];
  }, [data]);

  const conversionRates = useMemo(() => {
    if (!data) return [];

    return [
      {
        label: "Visitor to Lead",
        rate: calculateRate(data.visitors, data.leads),
        benchmark: BENCHMARKS.visitor_lead,
      },
      {
        label: "Lead to Qualified",
        rate: calculateRate(data.leads, data.qualified),
        benchmark: BENCHMARKS.lead_mql,
      },
      {
        label: "Qualified to Opp",
        rate: calculateRate(data.qualified, data.opportunities),
        benchmark: BENCHMARKS.qualified_opportunity,
      },
      {
        label: "Opp to Customer",
        rate: calculateRate(data.opportunities, data.customers),
        benchmark: BENCHMARKS.opportunity_customer,
      },
    ];
  }, [data]);

  const maxValue = useMemo(() => {
    if (!stages.length) return 1;
    return Math.max(...stages.map((s) => s.value), 1);
  }, [stages]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">FUNNEL</p>
            <h3 className="text-xl font-bold text-text-primary">Lead Generation Funnel</h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
            <p className="text-sm text-text-muted">Loading funnel data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">FUNNEL</p>
            <h3 className="text-xl font-bold text-text-primary">Lead Generation Funnel</h3>
          </div>
        </div>
        <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">FUNNEL</p>
          <h3 className="text-xl font-bold text-text-primary">Lead Generation Funnel</h3>
          <p className="text-sm text-text-muted mt-1">Last {days} days</p>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="space-y-3 mb-8">
        {stages.map((stage, index) => {
          const widthPercent = Math.max((stage.value / maxValue) * 100, 8);
          const prevValue = index > 0 ? stages[index - 1].value : stage.value;
          const rate = index > 0 ? calculateRate(prevValue, stage.value) : 100;

          return (
            <motion.div
              key={stage.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="w-32 text-sm text-text-secondary text-right font-medium">
                {stage.label}
              </div>
              <div className="flex-1 h-10 bg-gray-100 rounded-lg overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${stage.color} rounded-lg flex items-center justify-end pr-3 relative group cursor-pointer`}
                >
                  <span className="text-white text-sm font-bold drop-shadow-sm">
                    {formatNumber(stage.value)}
                  </span>

                  {/* Hover tooltip */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                    <p className="text-sm font-bold text-text-primary">{stage.value.toLocaleString()}</p>
                    <p className="text-xs text-text-muted">{stage.label}</p>
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45" />
                  </div>
                </motion.div>
              </div>
              <div className="w-16 text-sm text-text-muted text-right">
                {index > 0 ? formatRate(rate) : ""}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Conversion Rate Cards with Benchmarks */}
      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-sm font-semibold text-text-primary mb-4">Conversion Rates vs Benchmarks</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {conversionRates.map((item) => {
            const status = getRateStatus(item.rate, item.benchmark);
            return (
              <div key={item.label} className="bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-text-muted mb-1">{item.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-text-primary">
                    {formatRate(item.rate)}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
                    {statusIcons[status]}
                  </span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  Target: {item.benchmark.min}-{item.benchmark.max}%
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overall Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-white rounded-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Overall Conversion</p>
            <p className="text-3xl font-bold text-teal-600">
              {data ? formatRate(calculateRate(data.visitors, data.customers)) : "0%"}
            </p>
            <p className="text-sm text-text-muted">Visitor to Customer</p>
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{data?.leads || 0}</p>
              <p className="text-xs text-text-muted">Total Leads</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{data?.customers || 0}</p>
              <p className="text-xs text-text-muted">Customers Won</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
