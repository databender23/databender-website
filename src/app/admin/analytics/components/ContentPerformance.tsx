"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageData {
  page: string;
  views: number;
  uniqueVisitors: number;
  leads: number;
  conversionRate: number;
}

interface Props {
  pages: PageData[];
  isLoading?: boolean;
}

type SortColumn = "page" | "views" | "uniqueVisitors" | "leads" | "conversionRate";
type SortDirection = "asc" | "desc";

function formatPagePath(path: string): { display: string; label?: string } {
  // Handle homepage
  if (path === "" || path === "/") {
    return { display: "/", label: "Homepage" };
  }

  // Remove leading slash for display
  const cleanPath = path.startsWith("/") ? path : "/" + path;

  // Truncate long paths
  if (cleanPath.length > 35) {
    return { display: "..." + cleanPath.slice(-32) };
  }

  return { display: cleanPath };
}

function getConversionBadgeStyle(rate: number): string {
  if (rate > 5) {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (rate >= 2) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  return "bg-gray-100 text-gray-600 border-gray-200";
}

function getRankBadge(index: number): { gradient: string; shadow: string } | null {
  if (index === 0) {
    return {
      gradient: "from-amber-400 to-amber-500",
      shadow: "shadow-amber-200",
    };
  }
  if (index === 1) {
    return {
      gradient: "from-slate-300 to-slate-400",
      shadow: "shadow-slate-200",
    };
  }
  if (index === 2) {
    return {
      gradient: "from-orange-300 to-orange-400",
      shadow: "shadow-orange-200",
    };
  }
  return null;
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
    <motion.svg
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
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
    </motion.svg>
  );
}

function PageIcon() {
  return (
    <svg
      className="w-4 h-4 text-text-muted flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function EmptyDocumentIcon() {
  return (
    <svg
      className="w-12 h-12 text-teal-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-10 bg-gray-100 rounded-lg" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-50 rounded-lg" />
      ))}
    </div>
  );
}

function ViewsBar({ views, maxViews }: { views: number; maxViews: number }) {
  const percentage = maxViews > 0 ? (views / maxViews) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-text-primary min-w-[60px] text-right">
        {views.toLocaleString()}
      </span>
      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
        />
      </div>
    </div>
  );
}

export default function ContentPerformance({ pages, isLoading }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("views");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedPages = [...pages].sort((a, b) => {
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

  const maxViews = Math.max(...pages.map((p) => p.views), 1);

  const columns: { key: SortColumn; label: string; align?: "right" | "center" }[] = [
    { key: "page", label: "Page" },
    { key: "views", label: "Views", align: "right" },
    { key: "uniqueVisitors", label: "Unique", align: "right" },
    { key: "leads", label: "Leads", align: "right" },
    { key: "conversionRate", label: "Conv Rate", align: "right" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden"
    >
      {/* Subtle glow decoration */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 relative">
        <span className="text-xs font-semibold tracking-wider text-teal-600 uppercase">
          Content
        </span>
        <h3 className="text-xl font-semibold text-text-primary mt-1">
          Top Performing Pages
        </h3>
        <p className="text-sm text-text-muted mt-1">
          Pages ranked by engagement and conversion performance
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 relative">
        {isLoading ? (
          <LoadingSkeleton />
        ) : pages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
              <EmptyDocumentIcon />
            </div>
            <p className="text-text-muted text-sm font-medium">No page data yet</p>
            <p className="text-text-muted/70 text-xs mt-1">
              Page analytics will appear once visitors arrive
            </p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors ${
                        sortColumn === col.key
                          ? "text-teal-600"
                          : "text-text-muted hover:text-text-primary"
                      } ${col.align === "right" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`flex items-center gap-1.5 ${
                          col.align === "right" ? "justify-end" : ""
                        }`}
                      >
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
              <tbody>
                  {sortedPages.map((page, index) => {
                    const pathInfo = formatPagePath(page.page);
                    const rankBadge = getRankBadge(index);
                    const conversionStyle = getConversionBadgeStyle(page.conversionRate);

                    return (
                      <tr
                        key={page.page}
                        className="border-b border-border/50 hover:bg-teal-50/30 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {rankBadge ? (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15,
                                  delay: index * 0.05,
                                }}
                                className={`w-6 h-6 rounded-full bg-gradient-to-br ${rankBadge.gradient} ${rankBadge.shadow} shadow text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                              >
                                {index + 1}
                              </motion.span>
                            ) : (
                              <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-medium flex items-center justify-center flex-shrink-0">
                                {index + 1}
                              </span>
                            )}
                            <div className="flex items-center gap-2 min-w-0">
                              <PageIcon />
                              <div className="min-w-0" title={page.page}>
                                <span className="font-medium text-text-primary text-sm block truncate">
                                  {pathInfo.display}
                                </span>
                                {pathInfo.label && (
                                  <span className="text-xs text-text-muted">
                                    {pathInfo.label}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <ViewsBar views={page.views} maxViews={maxViews} />
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm text-text-secondary font-medium">
                            {page.uniqueVisitors.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-sm text-text-secondary font-medium">
                            {page.leads.toLocaleString()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${conversionStyle}`}
                          >
                            {page.conversionRate.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
