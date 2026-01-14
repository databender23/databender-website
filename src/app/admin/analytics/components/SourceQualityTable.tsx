"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SourceData {
  source: string;
  sessions: number;
  visitors: number;
  leads: number;
  conversionRate: number;
  avgBehaviorScore: number;
}

interface Props {
  sources: SourceData[];
  isLoading?: boolean;
}

type SortColumn = "source" | "sessions" | "visitors" | "leads" | "conversionRate" | "avgBehaviorScore";
type SortDirection = "asc" | "desc";

// Source type color mapping
const sourceColors: Record<string, { bg: string; dot: string }> = {
  linkedin: { bg: "bg-blue-500", dot: "bg-blue-500" },
  twitter: { bg: "bg-sky-500", dot: "bg-sky-500" },
  organic: { bg: "bg-green-500", dot: "bg-green-500" },
  google: { bg: "bg-green-500", dot: "bg-green-500" },
  direct: { bg: "bg-purple-500", dot: "bg-purple-500" },
  referral: { bg: "bg-orange-500", dot: "bg-orange-500" },
  paid: { bg: "bg-pink-500", dot: "bg-pink-500" },
  facebook: { bg: "bg-blue-600", dot: "bg-blue-600" },
  email: { bg: "bg-amber-500", dot: "bg-amber-500" },
  social: { bg: "bg-indigo-500", dot: "bg-indigo-500" },
};

function getSourceColor(source: string): { bg: string; dot: string } {
  const lowerSource = source.toLowerCase();
  return sourceColors[lowerSource] || { bg: "bg-gray-400", dot: "bg-gray-400" };
}

function formatSourceName(source: string): string {
  const sourceMap: Record<string, string> = {
    google: "Google",
    linkedin: "LinkedIn",
    facebook: "Facebook",
    twitter: "Twitter",
    direct: "Direct",
    email: "Email",
    organic: "Organic",
    referral: "Referral",
    paid: "Paid",
    social: "Social",
  };

  const lowerSource = source.toLowerCase();
  if (sourceMap[lowerSource]) {
    return sourceMap[lowerSource];
  }

  // Capitalize first letter of each word
  return source
    .split(/[_-]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function SortIcon({
  column,
  sortColumn,
  sortDirection,
}: {
  column: SortColumn;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}) {
  if (sortColumn !== column) {
    return (
      <svg
        className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  }

  return (
    <svg
      className="w-4 h-4 text-teal-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {sortDirection === "asc" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      )}
    </svg>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse p-2">
      <div className="h-10 bg-gradient-to-r from-bg-secondary to-bg-secondary/50 rounded-lg mb-4" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-14 bg-gradient-to-r from-bg-secondary to-bg-secondary/30 rounded-lg mb-2"
          style={{ opacity: 1 - i * 0.15 }}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-teal-500"
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
      <h4 className="text-text-primary font-medium mb-2">No Traffic Data Yet</h4>
      <p className="text-text-muted text-sm text-center max-w-xs">
        Traffic source metrics will appear here once visitors start arriving from different channels.
      </p>
    </div>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function SourceQualityTable({ sources, isLoading }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("sessions");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedSources = [...sources].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const columns: { key: SortColumn; label: string; align?: "right" | "center" }[] = [
    { key: "source", label: "Source" },
    { key: "sessions", label: "Sessions", align: "right" },
    { key: "visitors", label: "Visitors", align: "right" },
    { key: "leads", label: "Leads", align: "right" },
    { key: "conversionRate", label: "Conv %", align: "right" },
    { key: "avgBehaviorScore", label: "Avg Score", align: "right" },
  ];

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Subtle glow spot in top right */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="p-6 pb-4 relative">
        <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1 block">
          Analytics
        </span>
        <h3 className="text-xl font-semibold text-text-primary">
          Traffic Sources
        </h3>
        <p className="text-sm text-text-muted mt-1">
          Compare channel performance by conversion rates and engagement scores
        </p>
      </div>

      {isLoading ? (
        <div className="px-6 pb-6">
          <LoadingSkeleton />
        </div>
      ) : sources.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto px-6 pb-6">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-3 text-xs font-semibold text-teal-600 uppercase tracking-wider cursor-pointer hover:text-teal-700 group select-none transition-colors ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    <div className={`flex items-center gap-1 ${col.align === "right" ? "justify-end" : ""}`}>
                      {col.label}
                      <SortIcon
                        column={col.key}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {sortedSources.map((source, index) => {
                const isHighConversion = source.conversionRate > 5;
                const isHighScore = source.avgBehaviorScore > 60;
                const sourceColor = getSourceColor(source.source);

                return (
                  <motion.tr
                    key={source.source}
                    variants={rowVariants}
                    className={`border-b border-border/50 hover:bg-teal-50/30 transition-colors ${
                      index % 2 === 1 ? "bg-gray-50/30" : ""
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${sourceColor.dot}`} />
                        <span className="font-medium text-text-primary">
                          {formatSourceName(source.source)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-text-secondary text-right">
                      {source.sessions.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-text-secondary text-right">
                      {source.visitors.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-text-secondary text-right">
                      {source.leads.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {isHighConversion ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-50 text-teal-600 text-sm font-medium">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          {source.conversionRate.toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-text-secondary text-sm">
                          {source.conversionRate.toFixed(1)}%
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      {isHighScore ? (
                        <span className="text-sm font-semibold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                          {source.avgBehaviorScore.toFixed(0)}
                        </span>
                      ) : (
                        <span className="text-text-secondary text-sm">
                          {source.avgBehaviorScore.toFixed(0)}
                        </span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      )}
    </div>
  );
}
