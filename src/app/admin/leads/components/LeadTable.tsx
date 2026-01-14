"use client";

import { useRouter } from "next/navigation";
import type { LeadStatus } from "./LeadFilters";
import type { ContactChannel, ContactRecord } from "@/lib/leads/types";

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  status: LeadStatus;
  tier: "A" | "B" | "C";
  score: number;
  source: string;
  industry: string | null;
  createdAt: string;
  contactHistory?: ContactRecord[];
}

function hasBeenContactedVia(lead: Lead, channel: ContactChannel): boolean {
  if (!lead.contactHistory || lead.contactHistory.length === 0) {
    return false;
  }
  return lead.contactHistory.some((c) => c.channel === channel);
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-green-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

interface LeadTableProps {
  leads: Lead[];
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
}

type SortableColumn = "name" | "company" | "status" | "tier" | "score" | "source" | "createdAt";

const STATUS_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: "bg-blue-100", text: "text-blue-700", label: "New" },
  contacted: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Contacted" },
  qualified: { bg: "bg-teal-100", text: "text-teal-700", label: "Qualified" },
  converted: { bg: "bg-green-100", text: "text-green-700", label: "Converted" },
  lost: { bg: "bg-gray-100", text: "text-gray-700", label: "Lost" },
};

const TIER_BADGES: Record<string, { bg: string; text: string; label: string }> = {
  A: { bg: "bg-red-100", text: "text-red-700", label: "A" },
  B: { bg: "bg-amber-100", text: "text-amber-700", label: "B" },
  C: { bg: "bg-gray-100", text: "text-gray-700", label: "C" },
};

function SortIcon({
  column,
  sortColumn,
  sortDirection
}: {
  column: string;
  sortColumn: string;
  sortDirection: "asc" | "desc";
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

function SortableHeader({
  column,
  children,
  className = "",
  sortColumn,
  sortDirection,
  onSort,
}: {
  column: SortableColumn;
  children: React.ReactNode;
  className?: string;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
}) {
  return (
    <th
      className={`px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary group select-none ${className}`}
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon column={column} sortColumn={sortColumn} sortDirection={sortDirection} />
      </div>
    </th>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LeadTable({
  leads,
  sortColumn,
  sortDirection,
  onSort,
}: LeadTableProps) {
  const router = useRouter();

  const handleRowClick = (leadId: string) => {
    router.push(`/admin/leads/${leadId}`);
  };

  if (leads.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg shadow-card border border-border p-12 text-center">
        <svg
          className="w-12 h-12 text-text-muted mx-auto mb-4"
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
        <p className="text-text-muted">No leads found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg shadow-card border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-bg-secondary">
            <tr>
              <SortableHeader
                column="name"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Name
              </SortableHeader>
              <SortableHeader
                column="company"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Company
              </SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Email
              </th>
              <SortableHeader
                column="status"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Status
              </SortableHeader>
              <SortableHeader
                column="tier"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Tier
              </SortableHeader>
              <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider" title="LinkedIn Contact">
                LI
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider" title="Email Contact">
                EM
              </th>
              <SortableHeader
                column="score"
                className="text-center"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Score
              </SortableHeader>
              <SortableHeader
                column="source"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Source
              </SortableHeader>
              <SortableHeader
                column="createdAt"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                onSort={onSort}
              >
                Created
              </SortableHeader>
              <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-bg-card divide-y divide-border">
            {leads.map((lead) => {
              const statusBadge = STATUS_BADGES[lead.status] || STATUS_BADGES.new;
              const tierBadge = TIER_BADGES[lead.tier] || TIER_BADGES.C;

              return (
                <tr
                  key={lead.id}
                  className="hover:bg-bg-secondary/50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(lead.id)}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-text-primary">
                      {lead.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-text-secondary">
                      {lead.company || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-text-muted">{lead.email}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}
                    >
                      {statusBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${tierBadge.bg} ${tierBadge.text}`}
                    >
                      {tierBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {hasBeenContactedVia(lead, "linkedin") && <CheckIcon />}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    {hasBeenContactedVia(lead, "email") && <CheckIcon />}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <span className="text-sm font-medium text-text-primary">
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-text-muted capitalize">
                      {lead.source.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-text-muted">
                      {formatDate(lead.createdAt)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(lead.id);
                      }}
                      className="text-teal-500 hover:text-teal-600 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
