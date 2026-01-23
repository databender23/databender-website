"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DailyData {
  date: string;
  sent: number;
  opened: number;
  clicked: number;
}

interface DailyChartProps {
  data: DailyData[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T12:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function DailyChart({ data }: DailyChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Daily Activity
        </h2>
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
            No activity data yet
          </p>
          <p className="text-sm text-text-muted">
            Daily email metrics will appear here once campaigns are running
          </p>
        </div>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    dateFormatted: formatDate(d.date),
  }));

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Daily Activity (Last 30 Days)
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="dateFormatted"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Line
              type="monotone"
              dataKey="sent"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3b82f6" }}
              activeDot={{ r: 5, fill: "#3b82f6" }}
              name="sent"
            />
            <Line
              type="monotone"
              dataKey="opened"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3, fill: "#22c55e" }}
              activeDot={{ r: 5, fill: "#22c55e" }}
              name="opened"
            />
            <Line
              type="monotone"
              dataKey="clicked"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a855f7" }}
              activeDot={{ r: 5, fill: "#a855f7" }}
              name="clicked"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
