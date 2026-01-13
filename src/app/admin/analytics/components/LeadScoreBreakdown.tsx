"use client";

import { getTierBadgeClasses, type LeadTier } from "@/lib/analytics/lead-scoring";

interface LeadScoreData {
  tierBreakdown: Record<LeadTier, number>;
  averageScore: number;
  topScoringPages: { page: string; contributedScore: number; visits: number }[];
  highScoreVisitors: {
    visitorId: string;
    score: number;
    tier: LeadTier;
    pagesVisited: string[];
    country?: string;
    device?: string;
  }[];
}

interface LeadScoreBreakdownProps {
  data: LeadScoreData;
}

function TierBadge({ tier }: { tier: LeadTier }) {
  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getTierBadgeClasses(tier)}`}>
      {tier}
    </span>
  );
}

function TierDistributionBar({ tierBreakdown }: { tierBreakdown: Record<LeadTier, number> }) {
  const total = Object.values(tierBreakdown).reduce((sum, count) => sum + count, 0);
  if (total === 0) return null;

  const tiers: LeadTier[] = ["Cold", "Warm", "Hot", "Very Hot"];
  const colors: Record<LeadTier, string> = {
    Cold: "bg-gray-400",
    Warm: "bg-amber-400",
    Hot: "bg-red-400",
    "Very Hot": "bg-red-600",
  };

  return (
    <div className="w-full">
      <div className="flex h-6 rounded-lg overflow-hidden">
        {tiers.map((tier) => {
          const count = tierBreakdown[tier] || 0;
          const percent = (count / total) * 100;
          if (percent === 0) return null;
          return (
            <div
              key={tier}
              className={`${colors[tier]} flex items-center justify-center transition-all`}
              style={{ width: `${percent}%` }}
              title={`${tier}: ${count} (${percent.toFixed(1)}%)`}
            >
              {percent >= 10 && (
                <span className="text-xs font-medium text-white">{count}</span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs text-text-muted">
        {tiers.map((tier) => (
          <div key={tier} className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${colors[tier]}`} />
            <span>{tier}: {tierBreakdown[tier] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LeadScoreBreakdown({ data }: LeadScoreBreakdownProps) {
  const { tierBreakdown, averageScore, topScoringPages, highScoreVisitors } = data;
  const totalVisitors = Object.values(tierBreakdown).reduce((sum, count) => sum + count, 0);

  // Calculate percentage of hot + very hot leads
  const hotLeads = (tierBreakdown["Hot"] || 0) + (tierBreakdown["Very Hot"] || 0);
  const hotPercentage = totalVisitors > 0 ? ((hotLeads / totalVisitors) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Average Lead Score</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{averageScore}</p>
          <p className="text-sm text-text-muted mt-1">
            Out of possible 200+
          </p>
        </div>
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Hot Leads</p>
          <p className="text-3xl font-bold text-red-500 mt-2">{hotLeads}</p>
          <p className="text-sm text-text-muted mt-1">
            {hotPercentage}% of visitors
          </p>
        </div>
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <p className="text-sm text-text-muted font-medium">Total Scored</p>
          <p className="text-3xl font-bold text-text-primary mt-2">{totalVisitors}</p>
          <p className="text-sm text-text-muted mt-1">
            Visitors with scores
          </p>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Lead Score Distribution</h3>
        <TierDistributionBar tierBreakdown={tierBreakdown} />
        <p className="text-xs text-text-muted mt-4">
          Cold (0-25) | Warm (26-50) | Hot (51-75) | Very Hot (76+)
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Scoring Pages */}
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Scoring Pages</h3>
          <p className="text-sm text-text-muted mb-4">Pages contributing most to lead scores</p>
          {topScoringPages.length === 0 ? (
            <p className="text-text-muted text-sm">No data available</p>
          ) : (
            <div className="space-y-3">
              {topScoringPages.slice(0, 8).map((page, index) => {
                const maxScore = topScoringPages[0]?.contributedScore || 1;
                return (
                  <div key={page.page} className="flex items-center gap-3">
                    <span className="text-sm text-text-muted w-6">{index + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-text-secondary font-medium truncate max-w-[200px]" title={page.page}>
                          {page.page}
                        </span>
                        <div className="flex items-center gap-3 text-sm text-text-muted">
                          <span>{page.visits} visits</span>
                          <span className="font-medium text-teal-600">+{page.contributedScore}</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-500 rounded-full transition-all"
                          style={{ width: `${(page.contributedScore / maxScore) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* High Score Visitors */}
        <div className="bg-bg-card rounded-lg p-6 shadow-card border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">High-Score Visitors</h3>
          <p className="text-sm text-text-muted mb-4">Recent visitors with high purchase intent</p>
          {highScoreVisitors.length === 0 ? (
            <p className="text-text-muted text-sm">No high-score visitors yet</p>
          ) : (
            <div className="space-y-4">
              {highScoreVisitors.slice(0, 6).map((visitor) => (
                <div key={visitor.visitorId} className="border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-text-secondary">
                        {visitor.visitorId.slice(0, 8)}...
                      </span>
                      <TierBadge tier={visitor.tier} />
                    </div>
                    <span className="text-lg font-bold text-text-primary">{visitor.score}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    {visitor.country && <span>{visitor.country}</span>}
                    {visitor.device && <span className="capitalize">{visitor.device}</span>}
                    <span>{visitor.pagesVisited.length} pages</span>
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    <span className="font-medium">Journey: </span>
                    {visitor.pagesVisited.slice(0, 4).map((page, i) => (
                      <span key={i}>
                        {page.length > 20 ? page.slice(0, 20) + "..." : page}
                        {i < Math.min(visitor.pagesVisited.length, 4) - 1 && " -> "}
                      </span>
                    ))}
                    {visitor.pagesVisited.length > 4 && ` (+${visitor.pagesVisited.length - 4} more)`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
