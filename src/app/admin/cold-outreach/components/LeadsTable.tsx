"use client";

import Link from "next/link";

interface LeadItem {
  leadId: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  sequenceType: string;
  status: string;
  totalOpens: number;
  totalClicks: number;
  hasReplied: boolean;
  lastActivityAt?: string;
}

interface LeadsTableProps {
  leads: LeadItem[];
  filter: "all" | "replied" | "high-intent" | "needs-attention";
  onFilterChange: (filter: "all" | "replied" | "high-intent" | "needs-attention") => void;
}

function formatSequence(sequenceType: string): string {
  const names: Record<string, string> = {
    "cold-legal": "Legal",
    "cold-manufacturing": "Manufacturing",
    "cold-healthcare": "Healthcare",
    "cold-cre": "CRE",
  };
  return names[sequenceType] || sequenceType;
}

function getTimeAgo(dateStr?: string): string {
  if (!dateStr) return "Never";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMinutes > 0) return `${diffMinutes}m ago`;
  return "Just now";
}

function getActionNeeded(lead: LeadItem): { text: string; priority: "high" | "medium" | "low" } {
  if (lead.hasReplied) {
    return { text: "Follow up on reply", priority: "high" };
  }
  if (lead.totalOpens >= 3 || lead.totalClicks >= 2) {
    return { text: "High engagement - reach out", priority: "high" };
  }
  if (lead.totalOpens >= 1 || lead.totalClicks >= 1) {
    return { text: "Showing interest", priority: "medium" };
  }
  return { text: "Continue sequence", priority: "low" };
}

function getPriorityStyles(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-amber-100 text-amber-800";
    case "low":
      return "bg-gray-100 text-gray-600";
  }
}

export default function LeadsTable({ leads, filter, onFilterChange }: LeadsTableProps) {
  const filters: Array<{ value: typeof filter; label: string }> = [
    { value: "all", label: "All" },
    { value: "replied", label: "Replied" },
    { value: "high-intent", label: "High Intent" },
    { value: "needs-attention", label: "Needs Attention" },
  ];

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Leads Requiring Attention
        </h2>
        <div className="flex bg-gray-100 rounded-full p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                filter === f.value
                  ? "bg-white text-teal-600 shadow-sm"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-sm text-text-muted">
            No leads match this filter
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-text-muted">
                  Lead
                </th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">
                  Company
                </th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">
                  Sequence
                </th>
                <th className="text-center py-3 px-2 font-medium text-text-muted">
                  Opens
                </th>
                <th className="text-center py-3 px-2 font-medium text-text-muted">
                  Clicks
                </th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">
                  Status
                </th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">
                  Action Needed
                </th>
                <th className="text-right py-3 px-2 font-medium text-text-muted">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const action = getActionNeeded(lead);
                return (
                  <tr
                    key={lead.leadId}
                    className="border-b border-border last:border-0 hover:bg-bg-secondary/50 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <Link
                        href={`/admin/leads/${lead.leadId}`}
                        className="font-medium text-text-primary hover:text-teal-600 transition-colors"
                      >
                        {lead.firstName} {lead.lastName}
                      </Link>
                      <p className="text-xs text-text-muted truncate max-w-[200px]">
                        {lead.email}
                      </p>
                    </td>
                    <td className="py-3 px-2 text-text-secondary">
                      {lead.company || "-"}
                    </td>
                    <td className="py-3 px-2 text-text-secondary">
                      {formatSequence(lead.sequenceType)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`font-medium ${
                          lead.totalOpens >= 3
                            ? "text-green-600"
                            : lead.totalOpens >= 1
                            ? "text-amber-600"
                            : "text-text-muted"
                        }`}
                      >
                        {lead.totalOpens}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`font-medium ${
                          lead.totalClicks >= 2
                            ? "text-purple-600"
                            : lead.totalClicks >= 1
                            ? "text-purple-400"
                            : "text-text-muted"
                        }`}
                      >
                        {lead.totalClicks}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {lead.hasReplied ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-800">
                          Replied
                        </span>
                      ) : (
                        <span className="text-text-muted text-xs">
                          {lead.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityStyles(
                          action.priority
                        )}`}
                      >
                        {action.text}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right text-text-muted text-xs">
                      {getTimeAgo(lead.lastActivityAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
