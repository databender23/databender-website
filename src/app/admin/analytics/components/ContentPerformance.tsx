"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

interface ParsedPage {
  section: string;
  pageName: string;
  fullPath: string;
}

type SortColumn = "section" | "pageName" | "views" | "uniqueVisitors" | "leads" | "conversionRate";
type SortDirection = "asc" | "desc";

// Mapping of slug to human-readable names
const PAGE_NAMES: Record<string, string> = {
  // Services
  "data-ai-strategy": "Data & AI Strategy",
  "analytics-bi": "Analytics & BI",
  "ai-services": "AI Services",
  "data-engineering": "Data Engineering",
  // Industries
  "legal": "Legal",
  "healthcare": "Healthcare",
  "manufacturing": "Manufacturing",
  "commercial-real-estate": "Commercial Real Estate",
  // Resources
  "guides": "Guides",
  "case-studies": "Case Studies",
  // Assessments
  "data-ai-readiness": "Data & AI Readiness",
  "healthcare-benchmark": "Healthcare Benchmark",
  // Case studies
  "agentic-document-intelligence": "Agentic Document Intelligence",
  "army-of-ai-agents": "Army of AI Agents",
  "what-predicts-lead-conversion": "Lead Conversion Prediction",
  // Guides
  "associate-multiplier": "Associate Multiplier",
  "win-more-pitches": "Win More Pitches",
  "partner-succession": "Partner Succession",
  "last-vendor": "Last Vendor Guide",
};

function parsePath(path: string): ParsedPage {
  // Handle empty or root path
  if (!path || path === "/" || path === "") {
    return { section: "Home", pageName: "Homepage", fullPath: "/" };
  }

  // Remove leading/trailing slashes and split
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const segments = cleanPath.split("/");

  // Determine section based on first segment
  const firstSegment = segments[0]?.toLowerCase() || "";

  let section = "Other";
  let pageName = "";

  switch (firstSegment) {
    case "services":
      section = "Services";
      pageName = segments[1] ? (PAGE_NAMES[segments[1]] || formatSlug(segments[1])) : "Overview";
      break;
    case "industries":
      section = "Industries";
      pageName = segments[1] ? (PAGE_NAMES[segments[1]] || formatSlug(segments[1])) : "Overview";
      break;
    case "resources":
      section = "Resources";
      if (segments[1] === "guides" && segments[2]) {
        pageName = PAGE_NAMES[segments[2]] || formatSlug(segments[2]);
      } else {
        pageName = segments[1] ? formatSlug(segments[1]) : "Overview";
      }
      break;
    case "blog":
      section = "Blog";
      pageName = segments[1] ? formatSlug(segments[1]) : "Blog Index";
      break;
    case "case-studies":
      section = "Case Studies";
      pageName = segments[1] ? (PAGE_NAMES[segments[1]] || formatSlug(segments[1])) : "Overview";
      break;
    case "assessments":
      section = "Assessments";
      if (segments[1]) {
        pageName = PAGE_NAMES[segments[1]] || formatSlug(segments[1]);
        if (segments[2] === "results") {
          pageName += " Results";
        }
      } else {
        pageName = "Assessment Hub";
      }
      break;
    case "about":
      section = "Company";
      pageName = "About Us";
      break;
    case "contact":
      section = "Company";
      pageName = "Contact";
      break;
    case "our-process":
      section = "Company";
      pageName = "Our Process";
      break;
    default:
      section = "Other";
      pageName = formatSlug(firstSegment);
  }

  return { section, pageName, fullPath: path };
}

function formatSlug(slug: string): string {
  if (!slug) return "";
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

function getSectionColor(section: string): string {
  const colors: Record<string, string> = {
    "Home": "bg-teal-100 text-teal-700",
    "Services": "bg-blue-100 text-blue-700",
    "Industries": "bg-purple-100 text-purple-700",
    "Resources": "bg-amber-100 text-amber-700",
    "Blog": "bg-pink-100 text-pink-700",
    "Case Studies": "bg-indigo-100 text-indigo-700",
    "Assessments": "bg-emerald-100 text-emerald-700",
    "Company": "bg-slate-100 text-slate-700",
  };
  return colors[section] || "bg-gray-100 text-gray-700";
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
        className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
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
      className="w-3.5 h-3.5 text-teal-500"
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
        <div key={i} className="h-12 bg-gray-50 rounded-lg" />
      ))}
    </div>
  );
}

export default function ContentPerformance({ pages, isLoading }: Props) {
  const [sortColumn, setSortColumn] = useState<SortColumn>("views");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Parse all pages
  const parsedPages = pages.map(page => ({
    ...page,
    parsed: parsePath(page.page),
  }));

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const sortedPages = [...parsedPages].sort((a, b) => {
    let aVal: string | number;
    let bVal: string | number;

    if (sortColumn === "section") {
      aVal = a.parsed.section;
      bVal = b.parsed.section;
    } else if (sortColumn === "pageName") {
      aVal = a.parsed.pageName;
      bVal = b.parsed.pageName;
    } else {
      aVal = a[sortColumn];
      bVal = b[sortColumn];
    }

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
                  <th
                    onClick={() => handleSort("section")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-left ${
                      sortColumn === "section" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      Section
                      <SortIcon column="section" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("pageName")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-left ${
                      sortColumn === "pageName" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      Page
                      <SortIcon column="pageName" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("views")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-right ${
                      sortColumn === "views" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1 justify-end">
                      Views
                      <SortIcon column="views" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("uniqueVisitors")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-right ${
                      sortColumn === "uniqueVisitors" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1 justify-end">
                      Unique
                      <SortIcon column="uniqueVisitors" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("leads")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-right ${
                      sortColumn === "leads" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1 justify-end">
                      Leads
                      <SortIcon column="leads" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("conversionRate")}
                    className={`px-3 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none group transition-colors text-right ${
                      sortColumn === "conversionRate" ? "text-teal-600" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-1 justify-end">
                      Conv
                      <SortIcon column="conversionRate" sortColumn={sortColumn} sortDirection={sortDirection} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedPages.map((page, index) => {
                  const conversionStyle = getConversionBadgeStyle(page.conversionRate);
                  const sectionColor = getSectionColor(page.parsed.section);
                  const viewsPercentage = maxViews > 0 ? (page.views / maxViews) * 100 : 0;

                  return (
                    <tr
                      key={page.page}
                      className="border-b border-border/50 hover:bg-teal-50/30 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sectionColor}`}>
                          {page.parsed.section}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="min-w-0" title={page.parsed.fullPath}>
                          <span className="font-medium text-text-primary text-sm">
                            {page.parsed.pageName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
                              style={{ width: `${viewsPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-text-primary min-w-[40px] text-right">
                            {page.views.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-sm text-text-secondary">
                          {page.uniqueVisitors.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-sm text-text-secondary">
                          {page.leads.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${conversionStyle}`}
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
