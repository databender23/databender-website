"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ReferrerSourcesChartProps {
  data: { source: string; count: number }[];
}

const COLORS = ["#1A9988", "#2DB39F", "#40CDB6", "#66D9C4", "#8CE5D3", "#B3F0E2", "#D9F8F1"];

export default function ReferrerSourcesChart({ data }: ReferrerSourcesChartProps) {
  const chartData = data.map((item, index) => ({
    name: item.source,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Traffic Sources</h3>
      {chartData.length === 0 ? (
        <p className="text-text-muted text-sm">No data available</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(26, 26, 26, 0.1)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-sm text-text-secondary capitalize">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
