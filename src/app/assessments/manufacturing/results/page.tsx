"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { CTA } from "@/components/sections";
import {
  ManufacturingScores,
  tierDescriptions,
} from "@/lib/manufacturing-assessment";

interface ResultsData {
  scores: ManufacturingScores;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
}

export default function ManufacturingResultsPage() {
  const [results, setResults] = useState<ResultsData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("manufacturingAssessmentResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            No results found
          </h1>
          <p className="text-text-secondary mb-6">
            Please complete the assessment first.
          </p>
          <Button href="/assessments/manufacturing">Take Assessment</Button>
        </div>
      </div>
    );
  }

  const { scores, contactInfo } = results;
  const tierInfo = tierDescriptions[scores.tier];

  const categoryLabels = {
    dataInfrastructure: "Data Infrastructure",
    salesProduction: "Sales & Production",
    visibility: "Operational Visibility",
    automation: "Automation & AI",
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

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Your Data Readiness Results
            </h1>
            <p className="text-text-secondary">
              Hi {contactInfo.firstName}, here&apos;s your personalized assessment
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
                    strokeDasharray={`${(scores.total / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-text-primary">
                    {scores.total}
                  </span>
                  <span className="text-sm text-text-muted">out of 100</span>
                </div>
              </div>

              {/* Tier Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-teal-500/20 text-teal-600 rounded-full text-sm font-medium mb-3">
                  {tierInfo.title}
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {contactInfo.company}&apos;s Data Readiness
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
              href="/industries/manufacturing"
            >
              Explore Manufacturing Solutions
            </Button>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <CTA
        title="Ready to accelerate your data journey?"
        description="Schedule a consultation to discuss your assessment results and create a roadmap for growth."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "View Services", href: "/services" }}
        variant="gradient"
      />
    </div>
  );
}
