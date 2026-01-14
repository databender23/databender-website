"use client";

import type { ContactChannel } from "@/lib/leads/types";

export type LeadStatus = "all" | "new" | "contacted" | "qualified" | "converted" | "lost";
export type LeadTierFilter = "all" | "A" | "B" | "C";
export type ContactStatusFilter = "all" | "not_contacted" | "contacted";

interface LeadFiltersProps {
  status: LeadStatus;
  tier: LeadTierFilter;
  industry: string;
  search: string;
  dateFrom: string;
  dateTo: string;
  contactStatus: ContactStatusFilter;
  excludeChannels: ContactChannel[];
  onStatusChange: (status: LeadStatus) => void;
  onTierChange: (tier: LeadTierFilter) => void;
  onIndustryChange: (industry: string) => void;
  onSearchChange: (search: string) => void;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
  onContactStatusChange: (contactStatus: ContactStatusFilter) => void;
  onExcludeChannelsChange: (channels: ContactChannel[]) => void;
  onClearFilters: () => void;
}

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" },
];

const TIER_OPTIONS: { value: LeadTierFilter; label: string }[] = [
  { value: "all", label: "All Tiers" },
  { value: "A", label: "Tier A (Hot)" },
  { value: "B", label: "Tier B (Warm)" },
  { value: "C", label: "Tier C (Cold)" },
];

const INDUSTRY_OPTIONS = [
  { value: "all", label: "All Industries" },
  { value: "legal", label: "Legal" },
  { value: "healthcare", label: "Healthcare" },
  { value: "commercial-real-estate", label: "Commercial Real Estate" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "other", label: "Other" },
];

const CONTACT_STATUS_OPTIONS: { value: ContactStatusFilter; label: string }[] = [
  { value: "all", label: "All Contact Status" },
  { value: "not_contacted", label: "Not Contacted" },
  { value: "contacted", label: "Contacted" },
];

const CHANNEL_OPTIONS: { value: ContactChannel; label: string }[] = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export default function LeadFilters({
  status,
  tier,
  industry,
  search,
  dateFrom,
  dateTo,
  contactStatus,
  excludeChannels,
  onStatusChange,
  onTierChange,
  onIndustryChange,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
  onContactStatusChange,
  onExcludeChannelsChange,
  onClearFilters,
}: LeadFiltersProps) {
  const hasActiveFilters =
    status !== "all" ||
    tier !== "all" ||
    industry !== "all" ||
    search !== "" ||
    dateFrom !== "" ||
    dateTo !== "" ||
    contactStatus !== "all" ||
    excludeChannels.length > 0;

  const handleExcludeChannelToggle = (channel: ContactChannel) => {
    if (excludeChannels.includes(channel)) {
      onExcludeChannelsChange(excludeChannels.filter((c) => c !== channel));
    } else {
      onExcludeChannelsChange([...excludeChannels, channel]);
    }
  };

  return (
    <div className="bg-bg-card rounded-lg p-4 shadow-card border border-border space-y-4">
      {/* First Row: Status, Tier, Industry, Contact Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Tier
          </label>
          <select
            value={tier}
            onChange={(e) => onTierChange(e.target.value as LeadTierFilter)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          >
            {TIER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Contact Status
          </label>
          <select
            value={contactStatus}
            onChange={(e) => onContactStatusChange(e.target.value as ContactStatusFilter)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          >
            {CONTACT_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Second Row: Search, Date Range, Exclude Channels */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-1">
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Name, email, or company..."
              className="w-full px-3 py-2 pl-9 border border-border rounded-md bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            From Date
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            To Date
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-text-muted mb-1.5">
            Exclude Channels
          </label>
          <div className="flex flex-wrap gap-2">
            {CHANNEL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleExcludeChannelToggle(opt.value)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  excludeChannels.includes(opt.value)
                    ? "bg-teal-100 border-teal-500 text-teal-700"
                    : "bg-bg-primary border-border text-text-muted hover:border-text-muted"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="w-full px-3 py-2 text-sm font-medium text-text-muted hover:text-error border border-border rounded-md hover:border-error/50 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
