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
  // Additional fields for filtering
  trafficSource?: string;
  country?: string;
  region?: string;
  city?: string;
  device?: string;
}

export interface CompanyFilters {
  industry?: string;
  minScore?: number;
  maxScore?: number;
  notContacted?: boolean;
  trafficSource?: string;
  country?: string;
  region?: string;
  device?: string;
  keyPage?: string;
  recency?: string;
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
  onFilterChange?: (filters: CompanyFilters) => void;
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
  // Filter state
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [maxScoreFilter, setMaxScoreFilter] = useState<number>(100);
  const [notContactedFilter, setNotContactedFilter] = useState<boolean>(false);
  const [trafficSourceFilter, setTrafficSourceFilter] = useState<string>("all");
  const [recencyFilter, setRecencyFilter] = useState<string>("all");
  const [keyPageFilter, setKeyPageFilter] = useState<string>("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);

  // UI state
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [sortColumn, setSortColumn] = useState<SortColumn>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Compute available filter options from data
  const availableTrafficSources = useMemo(() => {
    const sources = new Set<string>();
    companies.forEach((c) => {
      if (c.trafficSource) sources.add(c.trafficSource);
    });
    return Array.from(sources).sort();
  }, [companies]);

  const availableKeyPages = useMemo(() => {
    const pages = new Set<string>();
    companies.forEach((c) => {
      c.keyPages.forEach((p) => pages.add(p));
    });
    return Array.from(pages).sort();
  }, [companies]);

  const handleFilterChange = (filters: Partial<CompanyFilters>) => {
    onFilterChange?.({
      industry: industryFilter !== "all" ? industryFilter : undefined,
      minScore: minScoreFilter > 0 ? minScoreFilter : undefined,
      maxScore: maxScoreFilter < 100 ? maxScoreFilter : undefined,
      notContacted: notContactedFilter || undefined,
      trafficSource: trafficSourceFilter !== "all" ? trafficSourceFilter : undefined,
      recency: recencyFilter !== "all" ? recencyFilter : undefined,
      keyPage: keyPageFilter !== "all" ? keyPageFilter : undefined,
      ...filters,
    });
  };

  // Quick filter presets for lead tiers
  const applyTierFilter = (tier: "hot" | "warm" | "cold" | "all") => {
    let min = 0;
    let max = 100;
    switch (tier) {
      case "hot":
        min = 70;
        max = 100;
        break;
      case "warm":
        min = 40;
        max = 69;
        break;
      case "cold":
        min = 0;
        max = 39;
        break;
      case "all":
      default:
        min = 0;
        max = 100;
    }
    setMinScoreFilter(min);
    setMaxScoreFilter(max);
    handleFilterChange({ minScore: min > 0 ? min : undefined, maxScore: max < 100 ? max : undefined });
  };

  const clearAllFilters = () => {
    setIndustryFilter("all");
    setMinScoreFilter(0);
    setMaxScoreFilter(100);
    setNotContactedFilter(false);
    setTrafficSourceFilter("all");
    setRecencyFilter("all");
    setKeyPageFilter("all");
    onFilterChange?.({});
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

    // Apply filters (client-side filtering in addition to API filtering)
    if (industryFilter !== "all") {
      filtered = filtered.filter((c) => c.industry === industryFilter);
    }
    if (minScoreFilter > 0) {
      filtered = filtered.filter((c) => c.behaviorScore >= minScoreFilter);
    }
    if (maxScoreFilter < 100) {
      filtered = filtered.filter((c) => c.behaviorScore <= maxScoreFilter);
    }
    if (notContactedFilter) {
      filtered = filtered.filter(
        (c) => !c.contactedVia || c.contactedVia.length === 0
      );
    }
    if (trafficSourceFilter !== "all") {
      filtered = filtered.filter((c) =>
        c.trafficSource?.toLowerCase().includes(trafficSourceFilter.toLowerCase())
      );
    }
    if (keyPageFilter !== "all") {
      filtered = filtered.filter((c) =>
        c.keyPages.some((p) => p.toLowerCase().includes(keyPageFilter.toLowerCase()))
      );
    }
    if (recencyFilter !== "all") {
      const now = new Date();
      filtered = filtered.filter((c) => {
        const lastVisitDate = new Date(c.lastVisit);
        const hoursSince = (now.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60);
        const daysSince = hoursSince / 24;
        switch (recencyFilter) {
          case "24h": return hoursSince <= 24;
          case "7d": return daysSince <= 7;
          case "30d": return daysSince <= 30;
          case "stale": return daysSince > 30;
          default: return true;
        }
      });
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
    maxScoreFilter,
    notContactedFilter,
    trafficSourceFilter,
    keyPageFilter,
    recencyFilter,
    sortColumn,
    sortDirection,
  ]);

  const hasActiveFilters =
    industryFilter !== "all" ||
    minScoreFilter > 0 ||
    maxScoreFilter < 100 ||
    notContactedFilter ||
    trafficSourceFilter !== "all" ||
    recencyFilter !== "all" ||
    keyPageFilter !== "all";

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

        {/* Quick Filter Buttons - Lead Tier */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-medium text-text-muted mr-2">Quick filters:</span>
          <button
            onClick={() => applyTierFilter("hot")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              minScoreFilter >= 70 && maxScoreFilter === 100
                ? "bg-red-500 text-white"
                : "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
            }`}
          >
            🔥 Hot (70+)
          </button>
          <button
            onClick={() => applyTierFilter("warm")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              minScoreFilter === 40 && maxScoreFilter === 69
                ? "bg-amber-500 text-white"
                : "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100"
            }`}
          >
            🌡️ Warm (40-69)
          </button>
          <button
            onClick={() => applyTierFilter("cold")}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              minScoreFilter === 0 && maxScoreFilter === 39
                ? "bg-gray-500 text-white"
                : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100"
            }`}
          >
            ❄️ Cold (0-39)
          </button>
          <button
            onClick={() => {
              setNotContactedFilter(!notContactedFilter);
              handleFilterChange({ notContacted: !notContactedFilter || undefined });
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              notContactedFilter
                ? "bg-teal-500 text-white"
                : "bg-teal-50 text-teal-600 border border-teal-200 hover:bg-teal-100"
            }`}
          >
            📭 Not Contacted
          </button>
          <button
            onClick={() => {
              setRecencyFilter(recencyFilter === "24h" ? "all" : "24h");
              handleFilterChange({ recency: recencyFilter === "24h" ? undefined : "24h" });
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
              recencyFilter === "24h"
                ? "bg-green-500 text-white"
                : "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
            }`}
          >
            ⚡ Last 24h
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
          <div className="flex flex-wrap items-end gap-4">
            {/* Industry Filter */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Industry
              </label>
              <select
                value={industryFilter}
                onChange={(e) => {
                  setIndustryFilter(e.target.value);
                  handleFilterChange({ industry: e.target.value !== "all" ? e.target.value : undefined });
                }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none min-w-[140px] transition-all"
              >
                <option value="all">All Industries</option>
                {availableIndustries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Traffic Source Filter */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Traffic Source
              </label>
              <select
                value={trafficSourceFilter}
                onChange={(e) => {
                  setTrafficSourceFilter(e.target.value);
                  handleFilterChange({ trafficSource: e.target.value !== "all" ? e.target.value : undefined });
                }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none min-w-[140px] transition-all"
              >
                <option value="all">All Sources</option>
                <option value="linkedin">LinkedIn</option>
                <option value="google">Google (Organic)</option>
                <option value="direct">Direct</option>
                {availableTrafficSources
                  .filter((s) => !["linkedin", "google", "direct"].some((k) => s.toLowerCase().includes(k)))
                  .map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
              </select>
            </div>

            {/* Recency Filter */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Last Visit
              </label>
              <select
                value={recencyFilter}
                onChange={(e) => {
                  setRecencyFilter(e.target.value);
                  handleFilterChange({ recency: e.target.value !== "all" ? e.target.value : undefined });
                }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none min-w-[120px] transition-all"
              >
                <option value="all">Any Time</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="stale">Stale (30+ days)</option>
              </select>
            </div>

            {/* Key Pages Filter */}
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Viewed Page
              </label>
              <select
                value={keyPageFilter}
                onChange={(e) => {
                  setKeyPageFilter(e.target.value);
                  handleFilterChange({ keyPage: e.target.value !== "all" ? e.target.value : undefined });
                }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none min-w-[140px] transition-all"
              >
                <option value="all">Any Page</option>
                <option value="contact">Contact Page</option>
                <option value="pricing">Pricing Page</option>
                <option value="case-stud">Case Studies</option>
                <option value="assessment">Assessment</option>
                {availableKeyPages
                  .filter((p) => !["contact", "pricing", "case-stud", "assessment"].some((k) => p.toLowerCase().includes(k)))
                  .map((page) => (
                    <option key={page} value={page}>
                      {page}
                    </option>
                  ))}
              </select>
            </div>

            {/* Advanced Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-3 py-2.5 text-sm font-medium text-text-muted hover:text-teal-600 transition-all"
            >
              {showAdvancedFilters ? "Less ▲" : "More ▼"}
            </button>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2.5 text-sm font-medium text-text-muted hover:text-red-500 border border-gray-200 rounded-lg hover:border-red-200 transition-all ml-auto"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Advanced Filters Row */}
          {showAdvancedFilters && (
            <div className="flex flex-wrap items-end gap-4 mt-4 pt-4 border-t border-gray-100">
              {/* Score Range */}
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">
                  Score Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={minScoreFilter || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 0;
                      setMinScoreFilter(val);
                      handleFilterChange({ minScore: val > 0 ? val : undefined });
                    }}
                    placeholder="Min"
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none w-20 transition-all"
                  />
                  <span className="text-text-muted">-</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={maxScoreFilter === 100 ? "" : maxScoreFilter}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 100;
                      setMaxScoreFilter(val);
                      handleFilterChange({ maxScore: val < 100 ? val : undefined });
                    }}
                    placeholder="Max"
                    className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-text-primary focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none w-20 transition-all"
                  />
                </div>
              </div>

              {/* Filter Stats */}
              <div className="text-sm text-text-muted ml-auto">
                Showing <span className="font-semibold text-teal-600">{filteredAndSortedCompanies.length}</span> of{" "}
                <span className="font-semibold">{companies.length}</span> companies
              </div>
            </div>
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
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
