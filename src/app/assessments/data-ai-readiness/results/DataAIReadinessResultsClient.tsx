"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CTA } from "@/components/sections";
import { Card } from "@/components/ui";
import { tierDescriptions } from "@/lib/assessment-scoring";
import { services } from "@/lib/services-data";
import type { AssessmentScores } from "@/types";

interface AssessmentResults {
  scores: AssessmentScores;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
  };
}

// Cache for useSyncExternalStore to avoid infinite loops
let cachedResults: AssessmentResults | null = null;
let cachedRaw: string | null = null;

// Helper to read from sessionStorage without triggering lint warnings
function getStoredResults(): AssessmentResults | null {
  if (typeof window === "undefined") return null;
  const stored = sessionStorage.getItem("assessmentResults");
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function subscribe(_cb: () => void): () => void {
  // sessionStorage doesn't have events, so no subscription needed
  return () => {};
}

export default function DataAIReadinessResultsClient() {
  const router = useRouter();
  const [hasConfettiFired, setHasConfettiFired] = useState(false);

  // Use useSyncExternalStore to read from sessionStorage without lint warnings
  const results = useSyncExternalStore(
    subscribe,
    getStoredResults,
    () => null // Server snapshot
  );

  const fireConfetti = useCallback(() => {
    if (hasConfettiFired) return;
    setHasConfettiFired(true);

    // Main burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#14b8a6", "#2dd4bf", "#5eead4", "#99f6e4", "#ffffff"],
    });

    // Side bursts
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ["#14b8a6", "#2dd4bf", "#ffffff"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ["#14b8a6", "#2dd4bf", "#ffffff"],
      });
    }, 200);
  }, [hasConfettiFired]);

  // Fire confetti after results load
  useEffect(() => {
    if (results && !hasConfettiFired) {
      const timer = setTimeout(fireConfetti, 800);
      return () => clearTimeout(timer);
    }
  }, [results, hasConfettiFired, fireConfetti]);

  // Redirect if no results
  useEffect(() => {
    if (results === null && typeof window !== "undefined") {
      // Small delay to allow initial render
      const timer = setTimeout(() => {
        const stored = sessionStorage.getItem("assessmentResults");
        if (!stored) {
          router.push("/assessments/data-ai-readiness");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [results, router]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading your results...</p>
        </div>
      </div>
    );
  }

  const { scores, contactInfo } = results;
  const tier = tierDescriptions[scores.tier];
  const suggestedServices = tier.suggestedServices
    .map((slug) => services.find((s) => s.slug === slug))
    .filter(Boolean);

  const categories = [
    { key: "dataInfrastructure", label: "Data Infrastructure", max: 25 },
    { key: "analyticsCapability", label: "Analytics Capability", max: 25 },
    { key: "automationMaturity", label: "Automation Maturity", max: 25 },
    { key: "aiReadiness", label: "AI Readiness", max: 25 },
  ];

  return (
    <>
      {/* Hero with Score */}
      <section className="relative min-h-[60vh] flex items-center pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-500 font-medium mb-4"
            >
              {contactInfo.firstName}, here are your results
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-teal-500/10 border-4 border-teal-500 mb-4">
                <span className="text-5xl font-bold text-gradient">
                  {Math.round((scores.total / 66) * 100)}
                </span>
              </div>
              <p className="text-text-muted">out of 100</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              {tier.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-text-secondary text-lg"
            >
              {tier.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Score Breakdown */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-text-primary mb-8 text-center"
            >
              Your Score Breakdown
            </motion.h2>

            <div className="space-y-6">
              {categories.map((cat, index) => {
                const score = scores[cat.key as keyof AssessmentScores] as number;
                const percentage = (score / cat.max) * 100;

                return (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-text-primary font-medium">
                        {cat.label}
                      </span>
                      <span className="text-teal-500 font-bold">
                        {score}/{cat.max}
                      </span>
                    </div>
                    <div className="h-3 bg-[#F8F9FA] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-text-primary mb-8 text-center"
            >
              Our Recommendations
            </motion.h2>

            <ul className="space-y-4">
              {tier.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white border border-black/10"
                >
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-teal-500 text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-text-primary">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Suggested Services */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text-primary mb-8 text-center"
          >
            Suggested Services for You
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {suggestedServices.map((service) => (
              service && (
                <Card
                  key={service.slug}
                  title={service.title}
                  description={service.description}
                  href={`/services/${service.slug}`}
                />
              )
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="Schedule a consultation to discuss your results and get a customized action plan."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore Services", href: "/services" }}
        variant="gradient"
      />
    </>
  );
}
