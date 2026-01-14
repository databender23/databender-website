"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CompanyData {
  company: string;
  domain: string;
  industry: string;
  visitors: number;
  sessions: number;
  behaviorScore: number;
  pagesViewed: string[];
  keyPages: string[];
  lastVisit: string;
  isLead: boolean;
  leadStatus?: string;
  contactedVia?: string[];
}

interface Props {
  companies: CompanyData[];
  availableIndustries: string[];
  totals: {
    totalIdentified: number;
    withLeads: number;
    notContacted: number;
  };
  isLoading?: boolean;
  onFilterChange?: (filters: {
    industry?: string;
    minScore?: number;
    notContacted?: boolean;
  }) => void;
}

type SortColumn = "company" | "industry" | "score" | "visitors" | "lastVisit";
type SortDirection = "asc" | "desc";

function getScoreColor(score: number): string {
  if (score >= 70) return "#1A9988";
  if (score >= 40) return "#f59e0b";
  return "#9ca3af";
}

function getKeyPageBadgeColor(page: string): string {
  const lowerPage = page.toLowerCase();
  if (lowerPage.includes("pricing")) return "bg-teal-50 text-teal-700 border-teal-200";
  if (lowerPage.includes("contact")) return "bg-teal-50 text-teal-700 border-teal-200";
  if (lowerPage.includes("case") || lowerPage.includes("study"))
    return "bg-teal-50 text-teal-700 border-teal-200";
  if (lowerPage.includes("service")) return "bg-teal-50 text-teal-700 border-teal-200";
  return "bg-gray-50 text-gray-600 border-gray-200";
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 7) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  return "Just now";
}

function ScoreCircle({ score }: { score: number }) {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = `${(score / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-12 h-12">
      <svg className="w-12 h-12 -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-sm font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
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

export default function CompanyIntelligence({
  companies,
  availableIndustries,
  totals,
  isLoading = false,
  onFilterChange,
}: Props) {
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [notContactedFilter, setNotContactedFilter] = useState<boolean>(false);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleFilterChange = (
    industry: string,
    minScore: number,
    notContacted: boolean
  ) => {
    setIndustryFilter(industry);
    setMinScoreFilter(minScore);
    setNotContactedFilter(notContacted);
    onFilterChange?.({
      industry: industry !== "all" ? industry : undefined,
      minScore: minScore > 0 ? minScore : undefined,
      notContacted: notContacted || undefined,
    });
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;

    // Apply filters
    if (industryFilter !== "all") {
      filtered = filtered.filter((c) => c.industry === industryFilter);
    }
    if (minScoreFilter > 0) {
      filtered = filtered.filter((c) => c.behaviorScore >= minScoreFilter);
    }
    if (notContactedFilter) {
      filtered = filtered.filter(
        (c) => !c.contactedVia || c.contactedVia.length === 0
      );
    }

    // Apply sorting
    return [...filtered].sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortColumn) {
        case "company":
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case "industry":
          aValue = a.industry.toLowerCase();
          bValue = b.industry.toLowerCase();
          break;
        case "score":
          aValue = a.behaviorScore;
          bValue = b.behaviorScore;
          break;
        case "visitors":
          aValue = a.visitors;
          bValue = b.visitors;
          break;
        case "lastVisit":
          aValue = new Date(a.lastVisit).getTime();
          bValue = new Date(b.lastVisit).getTime();
          break;
        default:
          aValue = a.behaviorScore;
          bValue = b.behaviorScore;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [
    companies,
    industryFilter,
    minScoreFilter,
    notContactedFilter,
    sortColumn,
    sortDirection,
  ]);

  const hasActiveFilters =
    industryFilter !== "all" || minScoreFilter > 0 || notContactedFilter;

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden p-6">
        {/* Subtle teal glow in corner */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl" />

        <div className="relative">
          <p className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-1">
            COMPANIES
          </p>
          <h3 className="text-xl font-bold text-text-primary">
            Identified Companies
          </h3>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-teal-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm relative overflow-hidden">
      {/* Subtle teal glow in corner */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-1">
            COMPANIES
          </p>
          <h3 className="text-xl font-bold text-text-primary">
            Identified Companies
          </h3>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-teal-50 to-white p-4 rounded-lg border border-teal-100">
            <p className="text-3xl font-bold text-gradient">{totals.totalIdentified}</p>
            <p className="text-sm text-text-muted">Identified</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-white p-4 rounded-lg border border-green-100">
            <p className="text-3xl font-bold text-green-600">{totals.withLeads}</p>
            <p className="text-sm text-text-muted">Converted</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-lg border border-amber-100">
            <p className="text-3xl font-bold text-amber-600">{totals.notContacted}</p>
            <p className="text-sm text-text-muted">Not Contacted</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-end gap-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">
              Industry
            </label>
            <select
              value={industryFilter}
              onChange={(e) =>
                handleFilterChange(e.target.value, minScoreFilter, notContactedFilter)
              }
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none min-w-[160px] transition-all"
            >
              <option value="all">All Industries</option>
              {availableIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1.5">
              Min Score
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={minScoreFilter || ""}
              onChange={(e) =>
                handleFilterChange(
                  industryFilter,
                  parseInt(e.target.value) || 0,
                  notContactedFilter
                )
              }
              placeholder="0"
              className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none w-24 transition-all"
            />
          </div>

          <button
            onClick={() =>
              handleFilterChange(industryFilter, minScoreFilter, !notContactedFilter)
            }
            className={`px-4 py-2.5 text-sm font-medium rounded-full transition-all ${
              notContactedFilter
                ? "bg-teal-500 text-white shadow-sm"
                : "bg-white text-text-secondary border border-gray-200 hover:border-teal-500 hover:text-teal-600"
            }`}
          >
            Not Contacted
          </button>

          {hasActiveFilters && (
            <button
              onClick={() => handleFilterChange("all", 0, false)}
              className="px-4 py-2.5 text-sm font-medium text-text-muted hover:text-red-500 border border-gray-200 rounded-lg hover:border-red-200 transition-all ml-auto"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Companies Table */}
        {filteredAndSortedCompanies.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-text-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="text-text-muted font-medium">
              {hasActiveFilters
                ? "No companies match your filters"
                : "No companies identified yet"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th
                    className="text-left py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide cursor-pointer hover:text-text-primary group select-none"
                    onClick={() => handleSort("company")}
                  >
                    <div className="flex items-center gap-1">
                      Company
                      <SortIcon
                        column="company"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th
                    className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide cursor-pointer hover:text-text-primary group select-none"
                    onClick={() => handleSort("industry")}
                  >
                    <div className="flex items-center gap-1">
                      Industry
                      <SortIcon
                        column="industry"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide cursor-pointer hover:text-text-primary group select-none"
                    onClick={() => handleSort("score")}
                  >
                    <div className="flex items-center justify-center gap-1">
                      Score
                      <SortIcon
                        column="score"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide">
                    Key Pages
                  </th>
                  <th
                    className="text-left py-3 px-2 text-xs font-semibold text-text-muted uppercase tracking-wide cursor-pointer hover:text-text-primary group select-none"
                    onClick={() => handleSort("lastVisit")}
                  >
                    <div className="flex items-center gap-1">
                      Last Visit
                      <SortIcon
                        column="lastVisit"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                      />
                    </div>
                  </th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-text-muted uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                  {filteredAndSortedCompanies.map((company) => (
                    <tr
                      key={company.domain}
                      className={`border-b border-gray-50 cursor-pointer transition-all group ${
                        expandedCompany === company.domain
                          ? "bg-teal-50/30"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setExpandedCompany(
                          expandedCompany === company.domain ? null : company.domain
                        )
                      }
                    >
                      <td className="py-4 px-6">
                        <div className={`border-l-2 pl-3 transition-colors ${
                          expandedCompany === company.domain
                            ? "border-teal-500"
                            : "border-transparent group-hover:border-teal-300"
                        }`}>
                          <p className="font-semibold text-text-primary">
                            {company.company}
                          </p>
                          <p className="text-xs text-text-muted">{company.domain}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm text-text-secondary">
                          {company.industry || "-"}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex justify-center">
                          <ScoreCircle score={company.behaviorScore} />
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex gap-1.5 flex-wrap max-w-[200px]">
                          {company.keyPages.slice(0, 3).map((page) => (
                            <span
                              key={page}
                              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getKeyPageBadgeColor(
                                page
                              )}`}
                            >
                              {page}
                            </span>
                          ))}
                          {company.keyPages.length > 3 && (
                            <span className="text-xs text-text-muted font-medium">
                              +{company.keyPages.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-1.5 text-sm text-text-muted">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {formatDate(company.lastVisit)}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {company.isLead ? (
                            <Link
                              href={`/admin/leads?search=${encodeURIComponent(
                                company.company
                              )}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-teal-500 hover:text-teal-600 text-sm font-medium transition-colors"
                            >
                              View
                            </Link>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(
                                  `/admin/leads/new?company=${encodeURIComponent(
                                    company.company
                                  )}&domain=${encodeURIComponent(company.domain)}`,
                                  "_blank"
                                );
                              }}
                              className="px-3 py-1.5 text-sm font-medium text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 transition-all"
                            >
                              Add Lead
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Expanded Row Details */}
            <AnimatePresence>
              {expandedCompany && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white overflow-hidden"
                >
                  {filteredAndSortedCompanies
                    .filter((c) => c.domain === expandedCompany)
                    .map((company) => (
                      <div key={company.domain} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Visit Stats */}
                          <div className="bg-white p-4 rounded-lg border border-gray-100">
                            <h4 className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-3">
                              Visit Statistics
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-text-muted">Visitors</span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {company.visitors}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-text-muted">Sessions</span>
                                <span className="text-sm font-semibold text-text-primary">
                                  {company.sessions}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-text-muted">
                                  Behavior Score
                                </span>
                                <span
                                  className="text-sm font-semibold"
                                  style={{ color: getScoreColor(company.behaviorScore) }}
                                >
                                  {company.behaviorScore}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Contact History */}
                          <div className="bg-white p-4 rounded-lg border border-gray-100">
                            <h4 className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-3">
                              Contact History
                            </h4>
                            {company.contactedVia && company.contactedVia.length > 0 ? (
                              <div className="flex gap-2 flex-wrap">
                                {company.contactedVia.map((channel) => (
                                  <span
                                    key={channel}
                                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 capitalize"
                                  >
                                    {channel}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-text-muted italic">
                                No contact history
                              </p>
                            )}
                          </div>

                          {/* Pages Viewed */}
                          <div className="bg-white p-4 rounded-lg border border-gray-100">
                            <h4 className="text-xs font-semibold text-teal-500 uppercase tracking-wider mb-3">
                              Page Journey ({company.pagesViewed.length} pages)
                            </h4>
                            <div className="max-h-32 overflow-y-auto space-y-1.5 scrollbar-thin">
                              {company.pagesViewed.slice(0, 10).map((page, idx) => (
                                <div
                                  key={page}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-text-muted font-medium">
                                    {idx + 1}
                                  </span>
                                  <span
                                    className="text-text-secondary truncate"
                                    title={page}
                                  >
                                    {page}
                                  </span>
                                </div>
                              ))}
                              {company.pagesViewed.length > 10 && (
                                <p className="text-xs text-text-muted pl-7">
                                  +{company.pagesViewed.length - 10} more pages
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
