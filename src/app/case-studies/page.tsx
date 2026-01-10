"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hero, CTA } from "@/components/sections";
import { Badge } from "@/components/ui";

const caseStudies = [
  {
    slug: "ai-entity-resolution",
    title: "AI Entity Resolution for Mineral Rights",
    client: "Energy Sector Client",
    industry: "Energy",
    services: ["AI Data Cleanup", "Data Integration"],
    challenge: "1.69 million records with complex ownership relationships needed resolution.",
    result: "125x cost savings",
    quote: "What would cost $25,000+ in analyst time, AI completed for ~$200—with every decision documented for audit.",
    featured: true,
    thumbnail: "/images/case-studies/entity-resolution-1-1.png",
  },
  {
    slug: "custom-lead-scoring",
    title: "Custom Lead Scoring for Home Services",
    client: "Roofing Company",
    industry: "Home Services",
    services: ["AI Insights", "Predictive Analytics"],
    challenge: "Generic CRM scoring wasn't identifying the right leads.",
    result: "+21% qualified leads",
    quote: "Generic tools said home value mattered most. Our model discovered home equity, urgency, and local sales history are what actually predict conversions.",
    featured: true,
    thumbnail: "/images/case-studies/lead-scoring-1-1.png",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <Hero
        subtitle="Case Studies"
        title="Real results for real companies"
        description="See how we've helped companies like yours transform their data into business value."
        primaryCta={{ label: "Get Similar Results", href: "/contact" }}
      />

      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.thumbnail}
                      alt={study.title}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="teal">{study.industry}</Badge>
                      {study.services.map((service) => (
                        <Badge key={service} variant="outline">{service}</Badge>
                      ))}
                    </div>

                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-teal-500 transition-colors">
                      {study.title}
                    </h2>

                    <p className="text-text-secondary mb-6">
                      {study.challenge}
                    </p>

                    <blockquote className="border-l-2 border-teal-500 pl-4 mb-6">
                      <p className="text-text-primary italic">
                        &quot;{study.quote}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-gradient">
                          {study.result}
                        </span>
                      </div>
                      <span className="inline-flex items-center text-teal-500 font-medium">
                        Read case study
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
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
