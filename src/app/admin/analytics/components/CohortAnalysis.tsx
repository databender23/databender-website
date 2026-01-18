"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface CohortRow {
  cohortWeek: string;
  cohortLabel: string;
  totalLeads: number;
  conversions: number;
  conversionRate: number;
  avgTimeToConvert: number | null;
  bySource: {
    organic: { leads: number; conversions: number; rate: number };
    paid: { leads: number; conversions: number; rate: number };
    referral: { leads: number; conversions: number; rate: number };
    aiSearch: { leads: number; conversions: number; rate: number };
    direct: { leads: number; conversions: number; rate: number };
  };
}

interface CohortData {
  cohorts: CohortRow[];
  summary: {
    totalLeads: number;
    totalConversions: number;
    overallConversionRate: number;
    bestCohort: { week: string; rate: number } | null;
    bestSource: { source: string; rate: number } | null;
  };
}

interface CohortAnalysisProps {
  className?: string;
}

type ViewMode = "weekly" | "bySource";
type SourceKey = "organic" | "paid" | "referral" | "aiSearch" | "direct";

const SOURCE_LABELS: Record<SourceKey, string> = {
  organic: "Organic",
  paid: "Paid",
  referral: "Referral",
  aiSearch: "AI Search",
  direct: "Direct",
};

const SOURCE_COLORS: Record<SourceKey, string> = {
  organic: "text-green-600",
  paid: "text-purple-600",
  referral: "text-blue-600",
  aiSearch: "text-amber-600",
  direct: "text-gray-600",
};

function getHeatmapColor(rate: number): string {
  if (rate === 0) return "bg-gray-100 text-gray-400";
  if (rate < 5) return "bg-red-100 text-red-700";
  if (rate < 10) return "bg-amber-100 text-amber-700";
  if (rate < 20) return "bg-yellow-100 text-yellow-700";
  if (rate < 30) return "bg-lime-100 text-lime-700";
  if (rate < 40) return "bg-green-100 text-green-700";
  return "bg-teal-200 text-teal-800";
}

function formatDays(minutes: number | null): string {
  if (minutes === null) return "-";
  const days = Math.round(minutes / 1440);
  if (days === 0) return "<1 day";
  if (days === 1) return "1 day";
  return `${days} days`;
}

export default function CohortAnalysis({ className = "" }: CohortAnalysisProps) {
  const [data, setData] = useState<CohortData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/analytics/cohorts");
        if (!response.ok) throw new Error("Failed to fetch cohort data");
        const result = await response.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cohort data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sourceTotals = useMemo(() => {
    if (!data) return null;

    const totals: Record<SourceKey, { leads: number; conversions: number; rate: number }> = {
      organic: { leads: 0, conversions: 0, rate: 0 },
      paid: { leads: 0, conversions: 0, rate: 0 },
      referral: { leads: 0, conversions: 0, rate: 0 },
      aiSearch: { leads: 0, conversions: 0, rate: 0 },
      direct: { leads: 0, conversions: 0, rate: 0 },
    };

    data.cohorts.forEach((cohort) => {
      (Object.keys(cohort.bySource) as SourceKey[]).forEach((source) => {
        totals[source].leads += cohort.bySource[source].leads;
        totals[source].conversions += cohort.bySource[source].conversions;
      });
    });

    (Object.keys(totals) as SourceKey[]).forEach((source) => {
      totals[source].rate = totals[source].leads > 0
        ? (totals[source].conversions / totals[source].leads) * 100
        : 0;
    });

    return totals;
  }, [data]);

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-border shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">COHORTS</p>
            <h3 className="text-xl font-bold text-text-primary">Cohort Analysis</h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
            <p className="text-sm text-text-muted">Loading cohort data...</p>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">COHORTS</p>
            <h3 className="text-xl font-bold text-text-primary">Cohort Analysis</h3>
          </div>
        </div>
        <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl border border-border shadow-sm p-6 relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">COHORTS</p>
          <h3 className="text-xl font-bold text-text-primary">Cohort Analysis</h3>
          <p className="text-sm text-text-muted mt-1">
            Lead conversion rates by acquisition week and source
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setViewMode("weekly")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              viewMode === "weekly"
                ? "bg-white text-teal-600 shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setViewMode("bySource")}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              viewMode === "bySource"
                ? "bg-white text-teal-600 shadow-sm"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            By Source
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-text-primary">{data?.summary.totalLeads ?? 0}</p>
          <p className="text-xs text-text-muted">Total Leads</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{data?.summary.totalConversions ?? 0}</p>
          <p className="text-xs text-text-muted">Conversions</p>
        </div>
        <div className="bg-teal-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-teal-600">
            {(data?.summary.overallConversionRate ?? 0).toFixed(1)}%
          </p>
          <p className="text-xs text-text-muted">Overall Rate</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {data?.summary.bestSource?.source || "-"}
          </p>
          <p className="text-xs text-text-muted">
            Best Source ({(data?.summary.bestSource?.rate ?? 0).toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Weekly View - Heatmap Table */}
      {viewMode === "weekly" && (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-gray-100">
                <th className="pb-3 font-medium">Cohort Week</th>
                <th className="pb-3 font-medium text-right">Leads</th>
                <th className="pb-3 font-medium text-right">Conversions</th>
                <th className="pb-3 font-medium text-right">Conv. Rate</th>
                <th className="pb-3 font-medium text-right">Avg. Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.cohorts.map((cohort, index) => (
                <motion.tr
                  key={cohort.cohortWeek}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 font-medium text-text-primary">{cohort.cohortLabel}</td>
                  <td className="py-3 text-right text-text-secondary">{cohort.totalLeads}</td>
                  <td className="py-3 text-right text-text-secondary">{cohort.conversions}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(cohort.conversionRate)}`}>
                      {cohort.conversionRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 text-right text-text-muted">
                    {formatDays(cohort.avgTimeToConvert)}
                  </td>
                </motion.tr>
              ))}
              {(!data?.cohorts || data.cohorts.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-text-muted">
                    No cohort data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* By Source View - Heatmap Grid */}
      {viewMode === "bySource" && (
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-gray-100">
                <th className="pb-3 font-medium">Cohort</th>
                {(Object.keys(SOURCE_LABELS) as SourceKey[]).map((source) => (
                  <th key={source} className={`pb-3 font-medium text-center ${SOURCE_COLORS[source]}`}>
                    {SOURCE_LABELS[source]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.cohorts.map((cohort, index) => (
                <motion.tr
                  key={cohort.cohortWeek}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-gray-50"
                >
                  <td className="py-3 font-medium text-text-primary">{cohort.cohortLabel}</td>
                  {(Object.keys(cohort.bySource) as SourceKey[]).map((source) => {
                    const sourceData = cohort.bySource[source];
                    return (
                      <td key={source} className="py-2 px-1 text-center">
                        <div className={`mx-auto w-full max-w-[80px] px-2 py-1.5 rounded ${getHeatmapColor(sourceData.rate)}`}>
                          <div className="text-xs font-bold">{sourceData.rate.toFixed(0)}%</div>
                          <div className="text-[10px] opacity-75">
                            {sourceData.conversions}/{sourceData.leads}
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
              {/* Totals Row */}
              {sourceTotals && (
                <tr className="border-t-2 border-gray-200 bg-gray-50 font-medium">
                  <td className="py-3 text-text-primary">Total</td>
                  {(Object.keys(sourceTotals) as SourceKey[]).map((source) => (
                    <td key={source} className="py-2 px-1 text-center">
                      <div className={`mx-auto w-full max-w-[80px] px-2 py-1.5 rounded ${getHeatmapColor(sourceTotals[source].rate)}`}>
                        <div className="text-xs font-bold">{sourceTotals[source].rate.toFixed(1)}%</div>
                        <div className="text-[10px] opacity-75">
                          {sourceTotals[source].conversions}/{sourceTotals[source].leads}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="text-xs font-semibold text-text-primary mb-3">Conversion Rate Legend</h4>
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(0)}`}>0%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(3)}`}>1-5%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(7)}`}>5-10%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(15)}`}>10-20%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(25)}`}>20-30%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(35)}`}>30-40%</span>
          <span className={`px-2 py-1 rounded text-xs ${getHeatmapColor(50)}`}>40%+</span>
        </div>
      </div>

      {/* Insights */}
      {data?.summary.bestCohort && (
        <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg">
          <p className="text-xs text-text-muted">
            <strong className="text-text-secondary">Best performing cohort:</strong> {data.summary.bestCohort.week} with a {data.summary.bestCohort.rate.toFixed(1)}% conversion rate.
            {data.summary.bestSource && (
              <> <strong className="text-text-secondary ml-2">Top source:</strong> {data.summary.bestSource.source} converts at {data.summary.bestSource.rate.toFixed(1)}%.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
