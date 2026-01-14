"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { CTA } from "@/components/sections";
import {
  LegalScores,
  tierDescriptions,
} from "@/lib/legal-assessment";

interface ResultsData {
  scores: LegalScores;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
}

// Helper to read from sessionStorage without triggering lint warnings
function getStoredResults(): ResultsData | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("legalAssessmentResults");
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Subscribe function for useSyncExternalStore (no-op for sessionStorage)
function subscribe(): () => void {
  return () => {};
}

export default function LegalResultsClient() {
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
          <Button href="/assessments/legal">Take Assessment</Button>
        </div>
      </div>
    );
  }

  const { scores, contactInfo } = results;
  const tierInfo = tierDescriptions[scores.tier];

  const categoryLabels = {
    aiOpportunity: "AI Opportunity",
    dataReadiness: "Data Readiness",
    privacyPosture: "Privacy Posture",
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-500";
    if (score >= 50) return "text-teal-500";
    if (score >= 25) return "text-yellow-500";
    return "text-red-500";
  };

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-teal-500";
    if (score >= 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Radar chart data points
  const radarPoints = [
    { label: "AI Opportunity", value: scores.aiOpportunity, angle: -90 },
    { label: "Data Readiness", value: scores.dataReadiness, angle: 30 },
    { label: "Privacy Posture", value: scores.privacyPosture, angle: 150 },
  ];

  // Calculate radar polygon points
  const getRadarCoordinates = (value: number, angle: number, size: number) => {
    const radian = (angle * Math.PI) / 180;
    const radius = (value / 100) * size;
    return {
      x: size + radius * Math.cos(radian),
      y: size + radius * Math.sin(radian),
    };
  };

  const radarSize = 100;
  const radarCoords = radarPoints.map((p) =>
    getRadarCoordinates(p.value, p.angle, radarSize)
  );
  const radarPath = `M ${radarCoords.map((c) => `${c.x},${c.y}`).join(" L ")} Z`;

  // Grid lines for radar
  const gridLevels = [25, 50, 75, 100];

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
              Your Legal AI Readiness Results
            </h1>
            <p className="text-text-secondary">
              Hi {contactInfo.firstName}, here&apos;s your personalized assessment
            </p>
          </motion.div>

          {/* Overall Score with Radar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 rounded-2xl p-8 mb-8 border border-teal-500/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Radar Chart */}
              <div className="relative w-52 h-52 flex-shrink-0">
                <svg
                  viewBox={`0 0 ${radarSize * 2} ${radarSize * 2}`}
                  className="w-full h-full"
                >
                  {/* Grid lines */}
                  {gridLevels.map((level) => {
                    const coords = radarPoints.map((p) =>
                      getRadarCoordinates(level, p.angle, radarSize)
                    );
                    const path = `M ${coords.map((c) => `${c.x},${c.y}`).join(" L ")} Z`;
                    return (
                      <path
                        key={level}
                        d={path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-black/10"
                      />
                    );
                  })}

                  {/* Axes */}
                  {radarPoints.map((p, i) => {
                    const end = getRadarCoordinates(100, p.angle, radarSize);
                    return (
                      <line
                        key={i}
                        x1={radarSize}
                        y1={radarSize}
                        x2={end.x}
                        y2={end.y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-black/10"
                      />
                    );
                  })}

                  {/* Data polygon */}
                  <motion.path
                    d={radarPath}
                    fill="rgba(26, 153, 136, 0.2)"
                    stroke="#1A9988"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ transformOrigin: "center" }}
                  />

                  {/* Data points */}
                  {radarCoords.map((coord, i) => (
                    <motion.circle
                      key={i}
                      cx={coord.x}
                      cy={coord.y}
                      r="4"
                      fill="#1A9988"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  ))}

                  {/* Labels */}
                  {radarPoints.map((p, i) => {
                    const labelPos = getRadarCoordinates(120, p.angle, radarSize);
                    return (
                      <text
                        key={i}
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[8px] fill-text-secondary font-medium"
                      >
                        {p.label}
                      </text>
                    );
                  })}
                </svg>

                {/* Center Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-text-primary">
                    {scores.total}
                  </span>
                  <span className="text-xs text-text-muted">out of 100</span>
                </div>
              </div>

              {/* Tier Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-600 rounded-full text-sm font-medium mb-3">
                  {tierInfo.title}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {contactInfo.company}&apos;s AI Readiness
                </h2>
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
              {Object.entries(categoryLabels).map(([key, label]) => {
                const score = scores[key as keyof typeof categoryLabels];
                return (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-text-primary font-medium">
                        {label}
                      </span>
                      <span className={`font-bold ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="h-3 bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className={`h-full rounded-full ${getBarColor(score)}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#F8F9FA] rounded-2xl p-8 mb-8"
          >
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Priority Recommendations
            </h3>
            <ul className="space-y-3 mb-6">
              {scores.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium">{index + 1}</span>
                  </div>
                  <span className="text-text-secondary">{rec}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-text-primary mb-3">
              Suggested Next Steps
            </h4>
            <ul className="space-y-2">
              {tierInfo.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-text-secondary">{step}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="primary" size="lg" href="/contact">
              Discuss Your Results
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/industries/legal"
            >
              Explore Legal AI Solutions
            </Button>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Ready to transform your firm's efficiency?"
        description="Schedule a consultation to discuss your assessment results and explore privacy-first AI solutions for your practice."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Legal Solutions", href: "/industries/legal" }}
        variant="gradient"
      />
    </div>
  );
}
