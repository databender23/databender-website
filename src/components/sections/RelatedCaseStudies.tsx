"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getCaseStudyBySlug, type CaseStudy } from "@/lib/case-studies-data";
import { CaseStudyDiagram } from "@/components/case-studies/CaseStudyDiagrams";

interface RelatedCaseStudiesProps {
  caseStudySlugs: string[];
  title?: string;
  subtitle?: string;
}

export default function RelatedCaseStudies({
  caseStudySlugs,
  title = "See It In Action",
  subtitle = "Real results from similar organizations",
}: RelatedCaseStudiesProps) {
  // Get case studies from slugs
  const caseStudies = caseStudySlugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => cs !== undefined);

  if (caseStudies.length === 0) return null;

  return (
    <section className="section">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
          >
            Case Studies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary text-lg max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        </div>

        <div
          className={`grid gap-6 ${
            caseStudies.length === 1
              ? "max-w-2xl mx-auto"
              : caseStudies.length === 2
              ? "max-w-4xl mx-auto grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block h-full rounded-2xl overflow-hidden bg-white border border-black/10 hover:border-teal-500/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Animated Diagram */}
                {study.diagramType && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <CaseStudyDiagram
                      type={study.diagramType}
                      compact={true}
                      interactive={false}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Hero Metric Callout */}
                  {study.heroMetric && (
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl sm:text-3xl font-bold text-gradient">
                        {study.heroMetric.value}
                      </span>
                      <span className="text-sm font-medium text-text-secondary">
                        {study.heroMetric.label}
                      </span>
                    </div>
                  )}

                  {/* Industry Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600">
                      {study.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-teal-600 transition-colors">
                    {study.title}
                  </h3>

                  {/* Problem Statement */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {study.challengeBrief}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
                    Read the story
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
