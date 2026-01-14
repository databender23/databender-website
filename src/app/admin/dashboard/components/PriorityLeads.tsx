"use client";

import Link from "next/link";

interface Lead {
  id: string;
  name: string;
  company: string | null;
  score: number;
  tier: string;
  status: string;
  industry: string | null;
  createdAt: string;
}

interface PriorityLeadsProps {
  leads: Lead[];
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return "Just now";
}

function getTierColor(tier: string): string {
  switch (tier) {
    case "A":
      return "bg-green-100 text-green-800";
    case "B":
      return "bg-blue-100 text-blue-800";
    case "C":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-amber-600";
  return "text-gray-500";
}

export default function PriorityLeads({ leads }: PriorityLeadsProps) {
  if (leads.length === 0) {
    return (
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          🔥 Priority Leads
        </h2>
        <p className="text-text-muted text-sm">
          No high-priority leads waiting for contact. Great job!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">
          🔥 Priority Leads
        </h2>
        <Link
          href="/admin/leads?sortColumn=behaviorScore&sortDirection=desc"
          className="text-sm text-teal-500 hover:text-teal-600 hover:underline"
        >
          View All →
        </Link>
      </div>
      <div className="space-y-3">
        {leads.slice(0, 5).map((lead) => (
          <Link
            key={lead.id}
            href={`/admin/leads/${lead.id}`}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-teal-500 hover:bg-bg-secondary/50 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-medium text-text-primary group-hover:text-teal-600 transition-colors">
                  {lead.name}
                </span>
                <span className="text-sm text-text-muted">
                  {lead.company || "Unknown company"}
                  {lead.industry && ` · ${lead.industry}`}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                {lead.score}
              </span>
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTierColor(lead.tier)}`}>
                Tier {lead.tier}
              </span>
              <span className="text-xs text-text-muted w-16 text-right">
                {getTimeAgo(lead.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
