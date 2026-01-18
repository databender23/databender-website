/**
 * Lead Score Metrics and Aggregation Functions
 *
 * Functions for aggregating and analyzing lead scores across visitors.
 */

import { calculatePageScore, getLeadTier, LeadTier } from "./lead-scoring";

/**
 * Calculate aggregate lead score metrics for analytics
 */
export interface LeadScoreMetrics {
  averageScore: number;
  tierBreakdown: Record<LeadTier, number>;
  topScoringPages: { page: string; contributedScore: number; visits: number }[];
  totalScored: number;
  disqualifiedCount: number;
}

export function aggregateLeadScoreMetrics(
  visitorScores: {
    score: number;
    pagesVisited: string[];
    isDisqualified?: boolean;
  }[]
): LeadScoreMetrics {
  if (visitorScores.length === 0) {
    return {
      averageScore: 0,
      tierBreakdown: { Cold: 0, Warm: 0, Hot: 0, "Very Hot": 0 },
      topScoringPages: [],
      totalScored: 0,
      disqualifiedCount: 0,
    };
  }

  // Calculate average score (excluding disqualified)
  const qualifiedVisitors = visitorScores.filter((v) => !v.isDisqualified);
  const totalScore = qualifiedVisitors.reduce((sum, v) => sum + v.score, 0);
  const averageScore =
    qualifiedVisitors.length > 0
      ? Math.round(totalScore / qualifiedVisitors.length)
      : 0;

  // Count disqualified
  const disqualifiedCount = visitorScores.filter(
    (v) => v.isDisqualified
  ).length;

  // Calculate tier breakdown
  const tierBreakdown: Record<LeadTier, number> = {
    Cold: 0,
    Warm: 0,
    Hot: 0,
    "Very Hot": 0,
  };

  for (const visitor of visitorScores) {
    const tier = visitor.isDisqualified ? "Cold" : getLeadTier(visitor.score);
    tierBreakdown[tier]++;
  }

  // Calculate top scoring pages
  const pageContributions: Record<
    string,
    { score: number; visits: number }
  > = {};

  for (const visitor of visitorScores) {
    const uniquePages = [...new Set(visitor.pagesVisited)];
    for (const page of uniquePages) {
      const pageScore = calculatePageScore(page);
      if (!pageContributions[page]) {
        pageContributions[page] = { score: 0, visits: 0 };
      }
      pageContributions[page].score += pageScore;
      pageContributions[page].visits++;
    }
  }

  const topScoringPages = Object.entries(pageContributions)
    .map(([page, data]) => ({
      page,
      contributedScore: data.score,
      visits: data.visits,
    }))
    .sort((a, b) => b.contributedScore - a.contributedScore)
    .slice(0, 10);

  return {
    averageScore,
    tierBreakdown,
    topScoringPages,
    totalScored: visitorScores.length,
    disqualifiedCount,
  };
}
