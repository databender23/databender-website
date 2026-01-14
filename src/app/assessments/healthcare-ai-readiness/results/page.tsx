"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { CTA } from "@/components/sections";
import {
  HealthcareScores,
  healthcareTierDescriptions,
} from "@/lib/healthcare-assessment";

interface ResultsData {
  scores: HealthcareScores;
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
  const stored = sessionStorage.getItem("healthcareAIReadinessResults");
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

export default function HealthcareAIReadinessResultsPage() {
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
          <Button href="/assessments/healthcare-ai-readiness">Take Assessment</Button>
        </div>
      </div>
    );
  }

  const { scores, contactInfo } = results;
  const tierInfo = healthcareTierDescriptions[scores.tier];

  const categoryLabels = {
    documentManagement: "Document Management",
    knowledgeRetention: "Knowledge Retention",
    aiReadiness: "AI Readiness",
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

  // Calculate radar chart coordinates
  const radarSize = 200;
  const center = radarSize / 2;
  const maxRadius = 80;

  const getRadarPoint = (index: number, score: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = (score / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const categoryKeys = Object.keys(categoryLabels) as (keyof typeof categoryLabels)[];
  const radarPoints = categoryKeys.map((key, i) =>
    getRadarPoint(i, scores[key], categoryKeys.length)
  );
  const radarPath = radarPoints.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';

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
              Your AI Readiness Results
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
              <div className="relative flex-shrink-0">
                <svg width={radarSize} height={radarSize} className="overflow-visible">
                  {/* Background grid circles */}
                  {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <polygon
                      key={scale}
                      points={categoryKeys.map((_, i) => {
                        const angle = (Math.PI * 2 * i) / categoryKeys.length - Math.PI / 2;
                        const r = maxRadius * scale;
                        return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
                      }).join(' ')}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-black/10"
                    />
                  ))}

                  {/* Axis lines */}
                  {categoryKeys.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / categoryKeys.length - Math.PI / 2;
                    return (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={center + maxRadius * Math.cos(angle)}
                        y2={center + maxRadius * Math.sin(angle)}
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
                    stroke="rgb(26, 153, 136)"
                    strokeWidth="2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{ transformOrigin: `${center}px ${center}px` }}
                  />

                  {/* Data points */}
                  {radarPoints.map((point, i) => (
                    <motion.circle
                      key={i}
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="rgb(26, 153, 136)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    />
                  ))}

                  {/* Labels */}
                  {categoryKeys.map((key, i) => {
                    const angle = (Math.PI * 2 * i) / categoryKeys.length - Math.PI / 2;
                    const labelRadius = maxRadius + 25;
                    const x = center + labelRadius * Math.cos(angle);
                    const y = center + labelRadius * Math.sin(angle);
                    return (
                      <text
                        key={key}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-xs fill-text-muted font-medium"
                      >
                        {categoryLabels[key].split(' ').map((word, wi) => (
                          <tspan key={wi} x={x} dy={wi === 0 ? 0 : 12}>
                            {word}
                          </tspan>
                        ))}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Tier Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-600 rounded-full text-sm font-medium mb-3">
                  {tierInfo.title}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Overall Score: {scores.total}%
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
              href="/industries/healthcare"
            >
              Explore Healthcare Solutions
            </Button>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Ready to accelerate your AI journey?"
        description="Schedule a consultation to discuss your assessment results and create a strategic roadmap for AI adoption."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
        variant="gradient"
      />
    </div>
  );
}
