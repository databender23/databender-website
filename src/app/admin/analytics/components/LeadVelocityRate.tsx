"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface MonthlyData {
  month: string;
  monthLabel: string;
  qualifiedLeads: number;
  lvr: number | null;
}

interface LeadVelocityData {
  monthly: MonthlyData[];
  currentLVR: number | null;
  trend: "up" | "down" | "stable";
  avgLVR: number;
}

interface LeadVelocityRateProps {
  className?: string;
}

const LVR_HEALTHY_THRESHOLD = 15;

function formatLVR(lvr: number | null): string {
  if (lvr === null) return "N/A";
  const sign = lvr >= 0 ? "+" : "";
  return `${sign}${lvr.toFixed(1)}%`;
}

function getLVRStatus(lvr: number | null): "healthy" | "warning" | "concerning" {
  if (lvr === null) return "warning";
  if (lvr >= LVR_HEALTHY_THRESHOLD) return "healthy";
  if (lvr >= 0) return "warning";
  return "concerning";
}

const statusConfig = {
  healthy: {
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    label: "Healthy Growth",
  },
  warning: {
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    label: "Needs Attention",
  },
  concerning: {
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    label: "Declining",
  },
};

const trendIcons = {
  up: (
    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  down: (
    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
    </svg>
  ),
  stable: (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
    </svg>
  ),
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: MonthlyData }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3">
      <p className="text-sm font-medium text-text-primary mb-1">{data.monthLabel}</p>
      <div className="space-y-1">
        <p className="text-xs text-text-muted">
          Qualified Leads: <span className="font-medium text-text-primary">{data.qualifiedLeads}</span>
        </p>
        <p className="text-xs text-text-muted">
          LVR: <span className={`font-medium ${data.lvr !== null && data.lvr >= LVR_HEALTHY_THRESHOLD ? "text-green-600" : data.lvr !== null && data.lvr >= 0 ? "text-amber-600" : "text-red-600"}`}>
            {formatLVR(data.lvr)}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function LeadVelocityRate({ className = "" }: LeadVelocityRateProps) {
  const [data, setData] = useState<LeadVelocityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/analytics/lead-velocity");
        if (!response.ok) throw new Error("Failed to fetch lead velocity data");
        const result = await response.json();
        setData(result);
        setError("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load lead velocity data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const status = useMemo(() => {
    return getLVRStatus(data?.currentLVR ?? null);
  }, [data]);

  const chartData = useMemo(() => {
    if (!data) return [];
    return data.monthly.map((m) => ({
      ...m,
      lvrDisplay: m.lvr ?? 0,
    }));
  }, [data]);

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-border shadow-sm p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">VELOCITY</p>
            <h3 className="text-xl font-bold text-text-primary">Lead Velocity Rate (LVR)</h3>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
            <p className="text-sm text-text-muted">Loading velocity data...</p>
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
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">VELOCITY</p>
            <h3 className="text-xl font-bold text-text-primary">Lead Velocity Rate (LVR)</h3>
          </div>
        </div>
        <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  const config = statusConfig[status];

  return (
    <div className={`bg-white rounded-xl border border-border shadow-sm p-6 relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">VELOCITY</p>
          <h3 className="text-xl font-bold text-text-primary">Lead Velocity Rate (LVR)</h3>
          <p className="text-sm text-text-muted mt-1">
            Month-over-month growth in qualified leads
          </p>
        </div>

        {/* Current LVR Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-4 py-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={config.color}>{config.icon}</span>
            <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold ${config.color}`}>
              {formatLVR(data?.currentLVR ?? null)}
            </span>
            {data?.trend && (
              <span className="flex items-center gap-1">
                {trendIcons[data.trend]}
              </span>
            )}
          </div>
          <p className="text-xs text-text-muted mt-1">
            Target: +{LVR_HEALTHY_THRESHOLD}%+
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="monthLabel"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `${value}%`}
              domain={["auto", "auto"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={LVR_HEALTHY_THRESHOLD} stroke="#22c55e" strokeDasharray="5 5" label={{ value: "Target", fill: "#22c55e", fontSize: 11 }} />
            <ReferenceLine y={0} stroke="#e5e7eb" />
            <Line
              type="monotone"
              dataKey="lvrDisplay"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ fill: "#14b8a6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#0d9488" }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Breakdown */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Monthly Breakdown</h4>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {data?.monthly.map((month, index) => (
            <motion.div
              key={month.month}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-center p-2 bg-gray-50 rounded-lg"
            >
              <p className="text-xs text-text-muted mb-1">{month.monthLabel}</p>
              <p className="text-lg font-bold text-text-primary">{month.qualifiedLeads}</p>
              <p className={`text-xs font-medium ${month.lvr !== null && month.lvr >= LVR_HEALTHY_THRESHOLD ? "text-green-600" : month.lvr !== null && month.lvr >= 0 ? "text-amber-600" : month.lvr !== null ? "text-red-600" : "text-gray-400"}`}>
                {formatLVR(month.lvr)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-white rounded-lg">
        <p className="text-xs text-text-muted">
          <strong className="text-text-secondary">Lead Velocity Rate (LVR)</strong> measures the month-over-month growth rate of qualified leads.
          A healthy LVR of 15%+ indicates consistent pipeline growth. Formula: (This Month - Last Month) / Last Month x 100
        </p>
      </div>
    </div>
  );
}
