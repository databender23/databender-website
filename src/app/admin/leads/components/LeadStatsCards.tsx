"use client";

interface LeadStats {
  total: number;
  newThisWeek: number;
  avgBehaviorScore: number;
  conversionRate: number;
}

interface LeadStatsCardsProps {
  stats: LeadStats;
}

export default function LeadStatsCards({ stats }: LeadStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border card-hover">
        <p className="text-sm text-text-muted font-medium">Total Leads</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-text-primary">
            {stats.total.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-text-muted mt-1">All time</p>
      </div>

      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border card-hover">
        <p className="text-sm text-text-muted font-medium">New This Week</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-teal-500">
            {stats.newThisWeek.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-text-muted mt-1">Last 7 days</p>
      </div>

      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border card-hover">
        <p className="text-sm text-text-muted font-medium">Avg Behavior Score</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-text-primary">
            {stats.avgBehaviorScore}
          </span>
        </div>
        <p className="text-sm text-text-muted mt-1">Based on engagement</p>
      </div>

      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border card-hover">
        <p className="text-sm text-text-muted font-medium">Conversion Rate</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-3xl font-bold text-text-primary">
            {stats.conversionRate.toFixed(1)}%
          </span>
        </div>
        <p className="text-sm text-text-muted mt-1">Leads converted</p>
      </div>
    </div>
  );
}
