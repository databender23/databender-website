"use client";

import { useState, useEffect, useCallback } from "react";
import LeadStatsCards from "./components/LeadStatsCards";
import LeadFilters, { LeadStatus, LeadTierFilter, ContactStatusFilter } from "./components/LeadFilters";
import LeadTable, { Lead } from "./components/LeadTable";
import type { ContactChannel } from "@/lib/leads/types";

interface LeadsApiResponse {
  leads: Lead[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  stats: {
    total: number;
    newThisWeek: number;
    avgBehaviorScore: number;
    conversionRate: number;
  };
}

export default function LeadsDashboard() {
  const [data, setData] = useState<LeadsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataFetchedAt, setDataFetchedAt] = useState<Date | null>(null);

  // Filter state
  const [status, setStatus] = useState<LeadStatus>("all");
  const [tier, setTier] = useState<LeadTierFilter>("all");
  const [industry, setIndustry] = useState("all");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [contactStatus, setContactStatus] = useState<ContactStatusFilter>("all");
  const [excludeChannels, setExcludeChannels] = useState<ContactChannel[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Sort state
  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortColumn,
        sortDirection,
      });

      if (status !== "all") params.append("status", status);
      if (tier !== "all") params.append("tier", tier);
      if (industry !== "all") params.append("industry", industry);
      if (search) params.append("search", search);
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      if (contactStatus !== "all") params.append("contactStatus", contactStatus);
      if (excludeChannels.length > 0) {
        params.append("excludeChannels", excludeChannels.join(","));
      }

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.details || result.error || "Failed to fetch leads");
      }
      setData(result);
      setDataFetchedAt(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads data");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sortColumn, sortDirection, status, tier, industry, search, dateFrom, dateTo, contactStatus, excludeChannels]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [status, tier, industry, search, dateFrom, dateTo, contactStatus, excludeChannels]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const handleClearFilters = () => {
    setStatus("all");
    setTier("all");
    setIndustry("all");
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setContactStatus("all");
    setExcludeChannels([]);
    setPage(1);
  };

  const handleExport = () => {
    const params = new URLSearchParams();
    if (status !== "all") params.append("status", status);
    if (tier !== "all") params.append("tier", tier);
    if (industry !== "all") params.append("industry", industry);
    if (search) params.append("search", search);
    if (dateFrom) params.append("dateFrom", dateFrom);
    if (dateTo) params.append("dateTo", dateTo);
    if (contactStatus !== "all") params.append("contactStatus", contactStatus);
    if (excludeChannels.length > 0) {
      params.append("excludeChannels", excludeChannels.join(","));
    }

    const queryString = params.toString();
    const exportUrl = `/api/admin/leads/export${queryString ? `?${queryString}` : ""}`;
    window.open(exportUrl, "_blank");
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg">{error}</div>
    );
  }

  // Placeholder data while API is being built
  const placeholderStats = data?.stats || {
    total: 0,
    newThisWeek: 0,
    avgBehaviorScore: 0,
    conversionRate: 0,
  };

  const leads = data?.leads || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Leads Dashboard</h1>
          <p className="text-text-muted">
            Manage and track all leads from the website
            {dataFetchedAt && (
              <span className="ml-3 text-xs">
                • Data as of: {dataFetchedAt.toLocaleString()}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <LeadStatsCards stats={placeholderStats} />

      {/* Filters */}
      <LeadFilters
        status={status}
        tier={tier}
        industry={industry}
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        contactStatus={contactStatus}
        excludeChannels={excludeChannels}
        onStatusChange={setStatus}
        onTierChange={setTier}
        onIndustryChange={setIndustry}
        onSearchChange={setSearch}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onContactStatusChange={setContactStatus}
        onExcludeChannelsChange={setExcludeChannels}
        onClearFilters={handleClearFilters}
      />

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>
          {data?.total ? `Showing ${leads.length} of ${data.total} leads` : "No leads found"}
        </span>
        {loading && (
          <span className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
            Loading...
          </span>
        )}
      </div>

      {/* Lead Table */}
      <LeadTable
        leads={leads}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-muted">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-secondary transition-colors"
            >
              First
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-secondary transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded-md transition-colors ${
                      page === pageNum
                        ? "bg-teal-500 text-white"
                        : "border border-border hover:bg-bg-secondary"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-secondary transition-colors"
            >
              Next
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-sm border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-bg-secondary transition-colors"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
