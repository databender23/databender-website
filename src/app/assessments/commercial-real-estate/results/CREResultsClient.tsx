"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { CTA } from "@/components/sections";
import {
  CREScores,
  CREProfile,
  tierDescriptions,
  categoryLabels,
} from "@/lib/cre-assessment";

interface ResultsData {
  scores: CREScores;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
  profile: CREProfile;
}

// Cache for useSyncExternalStore to avoid infinite loops
let cachedResults: ResultsData | null = null;
let cachedRaw: string | null = null;

// Helper to read from sessionStorage without triggering lint warnings
function getStoredResults(): ResultsData | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("creAssessmentResults");
  if (!stored) {
    cachedResults = null;
    cachedRaw = null;
    return null;
  }
  // Only re-parse if the raw string changed
  if (stored !== cachedRaw) {
    cachedRaw = stored;
    try {
      cachedResults = JSON.parse(stored);
    } catch {
      cachedResults = null;
    }
  }
  return cachedResults;
}

// Subscribe function for useSyncExternalStore (no-op for sessionStorage)
function subscribe(): () => void {
  return () => {};
}

export default function CREResultsClient() {
  // Use useSyncExternalStore to read from sessionStorage without lint warnings
  const results = useSyncExternalStore(
    subscribe,
    getStoredResults,
    () => null // Server snapshot
  );

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            No results found
          </h1>
          <p className="text-text-secondary mb-6">
            Please complete the assessment first.
          </p>
          <Button href="/assessments/commercial-real-estate">Take Assessment</Button>
        </div>
      </div>
    );
  }

  const { scores, contactInfo, profile } = results;
  const tierInfo = tierDescriptions[scores.tier];

  // Calculate percentages for display
  const portfolioVisibilityPercent = Math.round((scores.portfolioVisibility / 28) * 100);
  const investorReportingPercent = Math.round((scores.investorReporting / 28) * 100);

  const getScoreColor = (percent: number) => {
    if (percent >= 70) return "text-green-500";
    if (percent >= 40) return "text-teal-500";
    return "text-red-500";
  };

  const getBarColor = (percent: number) => {
    if (percent >= 70) return "bg-green-500";
    if (percent >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusLabel = (percent: number) => {
    if (percent >= 70) return "Strong";
    if (percent >= 40) return "Developing";
    return "Needs Attention";
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Portfolio Analytics Score
            </h1>
            <p className="text-text-secondary">
              Hi {contactInfo.firstName}, here&apos;s your personalized assessment
              for {contactInfo.company || profile.companyName || "your portfolio"}
            </p>
          </motion.div>

          {/* Overall Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 rounded-2xl p-8 mb-8 border border-teal-500/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Score Circle */}
              <div className="relative w-40 h-40 flex-shrink-0">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-black/10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-teal-500"
                    strokeDasharray={`${(scores.total / scores.maxTotal) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-text-primary">
                    {scores.total}
                  </span>
                  <span className="text-sm text-text-muted">of {scores.maxTotal}</span>
                </div>
              </div>

              {/* Tier Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-600 rounded-full text-sm font-medium mb-3">
                  {tierInfo.title}
                </div>
                <p className="text-text-secondary">{tierInfo.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Category Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-black/10 mb-8"
          >
            <h3 className="text-xl font-bold text-text-primary mb-6">
              Score Breakdown
            </h3>

            <div className="space-y-6">
              {/* Portfolio Visibility */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary font-medium">
                    {categoryLabels.portfolioVisibility}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted">
                      {getStatusLabel(portfolioVisibilityPercent)}
                    </span>
                    <span className={`font-bold ${getScoreColor(portfolioVisibilityPercent)}`}>
                      {scores.portfolioVisibility}/28
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-black/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${portfolioVisibilityPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-full rounded-full ${getBarColor(portfolioVisibilityPercent)}`}
                  />
                </div>
              </div>

              {/* Investor Reporting */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-primary font-medium">
                    {categoryLabels.investorReporting}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-text-muted">
                      {getStatusLabel(investorReportingPercent)}
                    </span>
                    <span className={`font-bold ${getScoreColor(investorReportingPercent)}`}>
                      {scores.investorReporting}/28
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-black/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${investorReportingPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`h-full rounded-full ${getBarColor(investorReportingPercent)}`}
                  />
                </div>
              </div>
            </div>

            {/* Lowest category callout */}
            <div className="mt-6 p-4 bg-[#F8F9FA] rounded-xl">
              <p className="text-text-secondary text-sm">
                <span className="font-medium text-text-primary">Your biggest opportunity:</span>{" "}
                {scores.lowestCategory === "portfolioVisibility"
                  ? "Portfolio Visibility. Building unified visibility across your properties would have the highest impact."
                  : "Investor Reporting. Streamlining your investor reporting process would save significant time and improve accuracy."}
              </p>
            </div>
          </motion.div>

          {/* Opportunity Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-teal-500/5 rounded-2xl p-8 mb-8 border border-teal-500/20"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4">
              What This Means
            </h3>
            <p className="text-text-secondary mb-4">{tierInfo.opportunity}</p>
            <p className="text-sm text-text-muted">
              <span className="font-medium text-text-secondary">Recommended next step:</span>{" "}
              {tierInfo.recommendedConversation}
            </p>
          </motion.div>

          {/* Dynamic Insights */}
          {scores.dynamicInsights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-8 border border-black/10 mb-8"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Based on Your Answers
              </h3>
              <div className="space-y-4">
                {scores.dynamicInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-text-secondary">{insight}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-[#F8F9FA] rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Suggested Next Steps
            </h3>
            <ul className="space-y-3">
              {tierInfo.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-text-secondary">{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Portfolio Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-black/10 mb-8"
          >
            <h4 className="font-semibold text-text-primary mb-3">Your Portfolio</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-muted">Properties:</span>{" "}
                <span className="text-text-primary">{profile.propertyCount}</span>
              </div>
              <div>
                <span className="text-text-muted">Investors:</span>{" "}
                <span className="text-text-primary capitalize">
                  {profile.externalInvestors === "institutional"
                    ? "Institutional LPs"
                    : profile.externalInvestors === "family-office"
                    ? "Family Office/Individual"
                    : profile.externalInvestors === "occasional"
                    ? "Occasional"
                    : "None"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-text-muted">Property Types:</span>{" "}
                <span className="text-text-primary capitalize">
                  {profile.propertyTypes.join(", ")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-center mb-8"
          >
            <p className="text-text-secondary mb-6">
              Want to discuss what addressing these gaps might look like for your portfolio?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href="/contact">
                Schedule a 20-Minute Call
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/industries/commercial-real-estate"
              >
                Explore CRE Solutions
              </Button>
            </div>
          </motion.div>

          {/* Email confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-sm text-text-muted">
              Your detailed report has been sent to {contactInfo.email} with specific
              recommendations for each area.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="Schedule a consultation to discuss your assessment results and create a roadmap for portfolio analytics."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
        variant="gradient"
      />
    </div>
  );
}
