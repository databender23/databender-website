"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ScrollDepthChartProps {
  data: Record<number, number>;
}

export default function ScrollDepthChart({ data }: ScrollDepthChartProps) {
  const chartData = [
    { depth: "25%", count: data[25] || 0 },
    { depth: "50%", count: data[50] || 0 },
    { depth: "75%", count: data[75] || 0 },
    { depth: "100%", count: data[100] || 0 },
  ];

  const hasData = chartData.some((d) => d.count > 0);

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Scroll Depth</h3>
      {!hasData ? (
        <p className="text-text-muted text-sm">No data available</p>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(26, 26, 26, 0.1)" />
              <XAxis
                dataKey="depth"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                stroke="#6B7280"
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                stroke="#6B7280"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(26, 26, 26, 0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => [value, "Visitors"]}
              />
              <Bar
                dataKey="count"
                fill="#1A9988"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      <p className="text-xs text-text-muted mt-2">
        Number of visitors reaching each scroll milestone
      </p>
    </div>
  );
}
