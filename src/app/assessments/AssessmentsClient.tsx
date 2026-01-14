"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { ResponsiveAnimation, DataVizAnimation } from "@/components/animations";

interface Assessment {
  slug: string;
  title: string;
  description: string;
  time: string;
  href: string;
  industry: string;
  icon: string;
}

const assessments: Assessment[] = [
  {
    slug: "data-ai-readiness",
    title: "Data & AI Readiness Assessment",
    description: "Find out if your organization is ready for AI, or what's blocking you. Get a personalized roadmap based on your current data maturity.",
    time: "10 minutes",
    href: "/assessments/data-ai-readiness",
    industry: "all",
    icon: "sparkles",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing Scale-Up Assessment",
    description: "Discover if your data infrastructure is ready to support your next phase of growth. Built specifically for $10M-$100M manufacturers.",
    time: "5 minutes",
    href: "/assessments/manufacturing",
    industry: "manufacturing",
    icon: "factory",
  },
  {
    slug: "healthcare-benchmark",
    title: "Healthcare Price Benchmark",
    description: "See how your pricing compares to competitors in your market. Get a preview of your competitive position.",
    time: "3 minutes",
    href: "/assessments/healthcare-benchmark",
    industry: "healthcare",
    icon: "heart",
  },
  {
    slug: "commercial-real-estate",
    title: "Portfolio Analytics Assessment",
    description: "See where your portfolio analytics stand and what centralized visibility could unlock. Built for property managers with 5-50 properties.",
    time: "5 minutes",
    href: "/assessments/commercial-real-estate",
    industry: "real-estate",
    icon: "building",
  },
];

const industries = [
  { value: "all", label: "All Industries" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "healthcare", label: "Healthcare" },
  { value: "real-estate", label: "Real Estate" },
];

const AssessmentIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    sparkles: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    factory: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    heart: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    building: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  };

  return <>{icons[icon] || icons.sparkles}</>;
};

export default function AssessmentsClient() {
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const filteredAssessments = assessments.filter(
    (a) => selectedIndustry === "all" || a.industry === "all" || a.industry === selectedIndustry
  );

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Animation - Above on desktop, below on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-8 order-last md:order-first mt-8 md:mt-0"
            >
              <ResponsiveAnimation
                lottieUrl="/animations/automation.json"
                MobileComponent={DataVizAnimation}
                className="w-full aspect-square"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Assessments
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Where do you stand?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl"
            >
              Free diagnostic tools to understand your data maturity and identify opportunities. No sales pitch at the end. Just practical guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button variant="primary" size="lg" href="#assessments">
                Start Assessment
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                Talk to an Expert
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Assessment Selection */}
      <section id="assessments" className="section">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Industry Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {industries.map((industry) => (
              <button
                key={industry.value}
                onClick={() => setSelectedIndustry(industry.value)}
                className={`px-4 sm:px-6 py-3 rounded-full font-medium transition-all min-h-[48px] ${
                  selectedIndustry === industry.value
                    ? "bg-teal-500 text-white"
                    : "bg-[#F8F9FA] text-text-secondary hover:bg-black/10"
                }`}
              >
                {industry.label}
              </button>
            ))}
          </div>

          {/* Assessments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {filteredAssessments.map((assessment, index) => (
              <motion.div
                key={assessment.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <Link
                  href={assessment.href}
                  className="group block p-5 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 mb-4 sm:mb-6">
                    <AssessmentIcon icon={assessment.icon} />
                  </div>

                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-text-muted">{assessment.time}</span>
                    {assessment.industry !== "all" && (
                      <>
                        <span className="text-text-muted">•</span>
                        <span className="text-sm text-teal-500 capitalize">{assessment.industry}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3 group-hover:text-teal-500 transition-colors">
                    {assessment.title}
                  </h3>

                  <p className="text-text-secondary text-sm sm:text-base mb-4 sm:mb-6">
                    {assessment.description}
                  </p>

                  <span className="inline-flex items-center text-teal-500 font-medium min-h-[44px]">
                    Start Assessment
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredAssessments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary mb-4">
                No assessments available for this industry yet.
              </p>
              <button
                onClick={() => setSelectedIndustry("all")}
                className="text-teal-500 font-medium hover:underline"
              >
                View all assessments
              </button>
            </div>
          )}
        </div>
      </section>

      {/* What to Expect */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 sm:mb-8 text-center"
            >
              What to Expect
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  number: "1",
                  title: "Answer Questions",
                  description: "Quick multiple-choice questions about your current situation. No technical knowledge required.",
                },
                {
                  number: "2",
                  title: "Get Your Score",
                  description: "See where you stand compared to similar organizations. Understand your strengths and gaps.",
                },
                {
                  number: "3",
                  title: "Receive Recommendations",
                  description: "Get specific, prioritized next steps based on your results. No generic advice.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Not sure which assessment to take?"
        description="Start with the Data & AI Readiness Assessment. It applies to any industry and gives you a complete picture of your data maturity."
        primaryCta={{ label: "Take Readiness Assessment", href: "/assessments/data-ai-readiness" }}
        secondaryCta={{ label: "Schedule a Call Instead", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
