"use client";

import { useState } from "react";
import type { Lead, LeadStatus, LeadTier } from "@/lib/leads/types";

interface LeadStatusControlsProps {
  lead: Lead;
  onUpdate: (updates: Partial<Lead>) => Promise<void>;
}

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "opportunity", label: "Opportunity" },
  { value: "customer", label: "Customer" },
  { value: "lost", label: "Lost" },
];

const TIER_OPTIONS: LeadTier[] = ["A", "B", "C"];

const INDUSTRY_OPTIONS = [
  { value: "", label: "Not Set" },
  { value: "legal", label: "Legal" },
  { value: "healthcare", label: "Healthcare" },
  { value: "commercial-real-estate", label: "Commercial Real Estate" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "accounting", label: "Accounting / CPA" },
  { value: "other", label: "Other" },
];

const TIER_COLORS: Record<LeadTier, { active: string; inactive: string }> = {
  A: {
    active: "bg-red-500 text-white border-red-500",
    inactive: "bg-white text-red-600 border-red-300 hover:bg-red-50",
  },
  B: {
    active: "bg-amber-500 text-white border-amber-500",
    inactive: "bg-white text-amber-600 border-amber-300 hover:bg-amber-50",
  },
  C: {
    active: "bg-gray-500 text-white border-gray-500",
    inactive: "bg-white text-gray-600 border-gray-300 hover:bg-gray-50",
  },
};

export default function LeadStatusControls({
  lead,
  onUpdate,
}: LeadStatusControlsProps) {
  const [updating, setUpdating] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");

  const handleStatusChange = async (status: LeadStatus) => {
    setUpdating("status");
    await onUpdate({ status });
    setUpdating(null);
  };

  const handleTierChange = async (tier: LeadTier) => {
    setUpdating("tier");
    await onUpdate({ tier });
    setUpdating(null);
  };

  const handleIndustryChange = async (industry: string) => {
    setUpdating("industry");
    await onUpdate({ industry: industry || undefined });
    setUpdating(null);
  };

  const handleAddTag = async () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (!trimmedTag) return;
    if (lead.tags?.includes(trimmedTag)) {
      setTagInput("");
      return;
    }

    setUpdating("tags");
    const newTags = [...(lead.tags || []), trimmedTag];
    await onUpdate({ tags: newTags });
    setTagInput("");
    setUpdating(null);
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    setUpdating("tags");
    const newTags = (lead.tags || []).filter((tag) => tag !== tagToRemove);
    await onUpdate({ tags: newTags });
    setUpdating(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Dropdown */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-4">
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Status
        </label>
        <div className="relative">
          <select
            value={lead.status}
            onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
            disabled={updating === "status"}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {updating === "status" && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
            </div>
          )}
        </div>
      </div>

      {/* Tier Buttons */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-4">
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Lead Tier
        </label>
        <div className="flex gap-2">
          {TIER_OPTIONS.map((tier) => {
            const isActive = lead.tier === tier;
            const colors = TIER_COLORS[tier];
            return (
              <button
                key={tier}
                onClick={() => handleTierChange(tier)}
                disabled={updating === "tier"}
                className={`flex-1 py-2 px-3 rounded-md border-2 font-bold text-sm transition-all disabled:opacity-50 ${
                  isActive ? colors.active : colors.inactive
                }`}
              >
                {tier}
              </button>
            );
          })}
        </div>
        {updating === "tier" && (
          <div className="flex justify-center mt-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
          </div>
        )}
        <p className="text-xs text-text-muted mt-2">
          A = Hot lead, B = Warm lead, C = Cold lead
        </p>
      </div>

      {/* Industry Dropdown */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-4">
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Industry
        </label>
        <div className="relative">
          <select
            value={lead.industry || ""}
            onChange={(e) => handleIndustryChange(e.target.value)}
            disabled={updating === "industry"}
            className="w-full px-3 py-2 border border-border rounded-md bg-bg-primary text-text-primary text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {updating === "industry" && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-500"></div>
            </div>
          )}
        </div>
        {lead.identifiedIndustry && (
          <p className="text-xs text-text-muted mt-2">
            Auto-detected: {lead.identifiedIndustry}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-4">
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Tags
        </label>

        {/* Existing Tags */}
        {lead.tags && lead.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {lead.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-sm"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  disabled={updating === "tags"}
                  className="hover:text-teal-900 disabled:opacity-50"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Add Tag Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a tag..."
            disabled={updating === "tags"}
            className="flex-1 px-3 py-1.5 border border-border rounded-md bg-bg-primary text-text-primary text-sm placeholder:text-text-muted focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
          />
          <button
            onClick={handleAddTag}
            disabled={updating === "tags" || !tagInput.trim()}
            className="px-3 py-1.5 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating === "tags" ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "+"
            )}
          </button>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-4">
        <label className="block text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          Timestamps
        </label>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Created</span>
            <span className="text-text-primary">
              {new Date(lead.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Updated</span>
            <span className="text-text-primary">
              {new Date(lead.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
          {lead.lastActivityAt && (
            <div className="flex justify-between">
              <span className="text-text-muted">Last Activity</span>
              <span className="text-text-primary">
                {new Date(lead.lastActivityAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
