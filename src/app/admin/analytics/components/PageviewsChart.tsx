"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PageviewsChartProps {
  data: { date: string; count: number }[];
}

export default function PageviewsChart({ data }: PageviewsChartProps) {
  const formattedData = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }));

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Daily Pageviews</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(26, 26, 26, 0.1)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6B7280" }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid rgba(26, 26, 26, 0.1)",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1A9988"
              strokeWidth={2}
              dot={{ fill: "#1A9988", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#1A9988" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
