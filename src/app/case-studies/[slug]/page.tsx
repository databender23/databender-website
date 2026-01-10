"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Hero, CTA, Stats } from "@/components/sections";
import { Button, Badge } from "@/components/ui";

const caseStudyContent: Record<string, {
  title: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  approach: string[];
  results: { value: number; suffix?: string; prefix?: string; label: string }[];
  quote: string;
  images: string[];
}> = {
  "ai-entity-resolution": {
    title: "AI Entity Resolution for Mineral Rights",
    industry: "Energy",
    services: ["AI Data Cleanup", "Data Integration"],
    challenge: "A mineral rights company needed to resolve 1.69 million ownership records across multiple legacy systems. Manual review would have taken months and cost over $25,000 in analyst time. Accuracy was critical for legal and financial decisions.",
    solution: "We deployed AI-powered entity resolution that learned the company's specific data patterns and business rules. The system processed records at machine speed while documenting every decision for audit compliance.",
    approach: [
      "Analyzed data patterns and identified key matching criteria",
      "Trained AI models on sample datasets with expert validation",
      "Processed 1.69M records with human-level accuracy",
      "Generated comprehensive audit trail for every decision",
      "Delivered results in 3 weeks vs estimated 6+ months manual",
    ],
    results: [
      { value: 125, suffix: "x", label: "Cost savings vs manual" },
      { value: 1.69, suffix: "M", label: "Records processed" },
      { value: 3, label: "Weeks to completion" },
      { value: 100, suffix: "%", label: "Decision documentation" },
    ],
    quote: "What would cost $25,000+ in analyst time, AI completed for ~$200—with every decision documented for audit.",
    images: [
      "/images/case-studies/entity-resolution-1-1.png",
      "/images/case-studies/entity-resolution-2-1.png",
    ],
  },
  "custom-lead-scoring": {
    title: "Custom Lead Scoring for Home Services",
    industry: "Home Services",
    services: ["AI Insights", "Predictive Analytics"],
    challenge: "A growing roofing company was using generic CRM lead scoring that wasn't identifying the right leads. Their sales team was wasting time on low-quality prospects while high-value opportunities slipped through.",
    solution: "We built a custom ML scoring model trained on their actual conversion data. The model discovered patterns that generic tools missed—factors like home equity, urgency signals, and local sales history that actually predicted conversions.",
    approach: [
      "Analyzed historical conversion data to identify real predictors",
      "Built custom ML model trained on company-specific patterns",
      "Discovered that home equity and urgency signals outperformed generic metrics",
      "Integrated scoring into existing CRM workflow",
      "Provided ongoing model refinement as new data accumulated",
    ],
    results: [
      { value: 21, suffix: "%", prefix: "+", label: "More qualified leads" },
      { value: 35, suffix: "%", label: "Reduction in wasted calls" },
      { value: 2, suffix: "x", label: "Conversion rate improvement" },
      { value: 4, label: "Weeks to deployment" },
    ],
    quote: "Generic tools said home value mattered most. Our model discovered home equity, urgency, and local sales history are what actually predict conversions.",
    images: [
      "/images/case-studies/lead-scoring-1-1.png",
      "/images/case-studies/lead-scoring-2-1.png",
    ],
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudyContent[slug];

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Case study not found</h1>
          <Button href="/case-studies">View All Case Studies</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero
        subtitle="Case Study"
        title={study.title}
        description={study.challenge}
        primaryCta={{ label: "Get Similar Results", href: "/contact" }}
        secondaryCta={{ label: "View All Case Studies", href: "/case-studies" }}
      />

      {/* Tags */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="teal">{study.industry}</Badge>
            {study.services.map((service) => (
              <Badge key={service} variant="outline">{service}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Visuals */}
      {study.images && study.images.length > 0 && (
        <section className="section bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Case Study Overview
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-text-primary"
              >
                The full picture
              </motion.h2>
            </div>

            <div className="space-y-8">
              {study.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden shadow-xl border border-black/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt={`${study.title} - Page ${index + 1}`}
                    className="w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solution */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Solution
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg leading-relaxed"
            >
              {study.solution}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Our Approach
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-8"
            >
              How we did it
            </motion.h2>

            <ol className="space-y-4">
              {study.approach.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-text-secondary text-lg pt-1">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Results */}
      <Stats
        subtitle="Results"
        title="The impact"
        stats={study.results}
      />

      {/* Quote */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <svg
              className="w-12 h-12 text-teal-500/30 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed">
              &quot;{study.quote}&quot;
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready for results like these?"
        description="Let's discuss how we can help your business achieve similar outcomes."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
