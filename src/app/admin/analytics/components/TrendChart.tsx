"use client";

import { useState, useMemo } from "react";

interface TrendData {
  date: string;
  sessions: number;
  visitors: number;
  leads: number;
}

interface Props {
  data: TrendData[];
  isLoading?: boolean;
}

type MetricType = "sessions" | "visitors" | "leads";

function formatDate(dateString: string, short = false): string {
  const date = new Date(dateString);
  if (short) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatDateFull(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const metricLabels: Record<MetricType, string> = {
  sessions: "Sessions",
  visitors: "Visitors",
  leads: "Leads",
};

export default function TrendChart({ data, isLoading = false }: Props) {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("sessions");

  const { maxValue, total, average, peakDay, peakValue } = useMemo(() => {
    if (data.length === 0) {
      return { maxValue: 1, total: 0, average: 0, peakDay: null, peakValue: 0 };
    }

    const values = data.map((d) => d[selectedMetric]);
    const max = Math.max(...values, 1);
    const sum = values.reduce((acc, v) => acc + v, 0);
    const avg = Math.round(sum / data.length);

    // Find peak day
    let peakIndex = 0;
    let peak = 0;
    values.forEach((v, i) => {
      if (v > peak) {
        peak = v;
        peakIndex = i;
      }
    });

    return {
      maxValue: max,
      total: sum,
      average: avg,
      peakDay: data[peakIndex]?.date || null,
      peakValue: peak,
    };
  }, [data, selectedMetric]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
                TRENDS
              </p>
              <h3 className="text-xl font-bold text-text-primary">
                Traffic Over Time
              </h3>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
              <p className="text-sm text-text-muted">Loading trend data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
                TRENDS
              </p>
              <h3 className="text-xl font-bold text-text-primary">
                Traffic Over Time
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium text-text-primary mb-1">
              No trend data yet
            </p>
            <p className="text-sm text-text-muted">
              Traffic data will appear here as visitors arrive
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Limit to last 30 days for display
  const displayData = data.slice(-30);

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden">
      <div className="p-6">
        {/* Header with metric selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
              TRENDS
            </p>
            <h3 className="text-xl font-bold text-text-primary">
              Traffic Over Time
            </h3>
          </div>

          {/* Pill button toggle */}
          <div className="flex bg-gray-100 rounded-full p-1">
            {(["sessions", "visitors", "leads"] as MetricType[]).map((metric) => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedMetric === metric
                    ? "bg-white text-teal-600 shadow-sm"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {metricLabels[metric]}
              </button>
            ))}
          </div>
        </div>

        {/* Chart area */}
        <div className="relative mb-8">
          {/* Y-axis gridlines and labels */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center w-full">
                <span className="w-12 text-xs text-text-muted text-right pr-3 flex-shrink-0">
                  {Math.round(maxValue * (1 - i / 4)).toLocaleString()}
                </span>
                <div className="flex-1 border-t border-gray-100" />
              </div>
            ))}
          </div>

          {/* Bars container */}
          <div className="ml-14 h-64 flex items-end gap-1 relative">
            {displayData.map((item, index) => {
              const value = item[selectedMetric];
              const heightPercent = Math.max((value / maxValue) * 100, 1);
              const showLabel = index === 0 || index === displayData.length - 1 || index % 5 === 0;

              return (
                <div
                  key={item.date}
                  className="flex-1 min-w-[8px] max-w-[28px] flex flex-col items-center"
                >
                  {/* Bar with tooltip */}
                  <div className="w-full h-full flex items-end relative group cursor-pointer">
                    <div
                      className="relative w-full group"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {/* Gradient bar */}
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-sm group-hover:from-teal-600 group-hover:to-teal-500 transition-colors duration-200" />

                      {/* Tooltip */}
                      <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap">
                        <p className="text-xs text-text-muted mb-1">
                          {formatDate(item.date)}
                        </p>
                        <p className="text-lg font-bold text-text-primary">
                          {value.toLocaleString()}
                        </p>
                        <p className="text-xs text-text-muted">
                          {metricLabels[selectedMetric]}
                        </p>
                        {/* Tooltip arrow */}
                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 transform rotate-45" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis labels */}
          <div className="ml-14 flex gap-1 mt-3">
            {displayData.map((item, index) => {
              const showLabel = index === 0 || index === displayData.length - 1 || index % 5 === 0;
              return (
                <div
                  key={`label-${item.date}`}
                  className="flex-1 min-w-[8px] max-w-[28px] text-center"
                >
                  {showLabel && (
                    <span className="text-xs text-text-muted whitespace-nowrap">
                      {formatDate(item.date, true)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary stats below chart */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              Total for Period
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {total.toLocaleString()}
            </p>
            <p className="text-sm text-text-muted">
              {metricLabels[selectedMetric]}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
              Average Per Day
            </p>
            <p className="text-2xl font-bold text-text-primary">
              {average.toLocaleString()}
            </p>
            <p className="text-sm text-text-muted">
              {metricLabels[selectedMetric]}/day
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-1">
                  Peak Day
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {peakValue.toLocaleString()}
                </p>
                <p className="text-sm text-text-muted">
                  {peakDay ? formatDate(peakDay, true) : "N/A"}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-6 pt-4">
          <div
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${
              selectedMetric === "sessions" ? "opacity-100" : "opacity-50 hover:opacity-75"
            }`}
            onClick={() => setSelectedMetric("sessions")}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-t from-teal-500 to-teal-400"></span>
            <span className="text-sm text-text-muted">Sessions</span>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${
              selectedMetric === "visitors" ? "opacity-100" : "opacity-50 hover:opacity-75"
            }`}
            onClick={() => setSelectedMetric("visitors")}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-t from-teal-500 to-teal-400"></span>
            <span className="text-sm text-text-muted">Visitors</span>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer transition-opacity ${
              selectedMetric === "leads" ? "opacity-100" : "opacity-50 hover:opacity-75"
            }`}
            onClick={() => setSelectedMetric("leads")}
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-t from-teal-500 to-teal-400"></span>
            <span className="text-sm text-text-muted">Leads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
