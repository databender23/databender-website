"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Hero, CTA, Stats } from "@/components/sections";
import { Button, Badge } from "@/components/ui";
import { getCaseStudyBySlug } from "@/lib/case-studies-data";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = getCaseStudyBySlug(slug);

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
        description={study.challengeBrief}
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

      {/* The Situation */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Challenge
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-lg leading-relaxed"
            >
              {study.challenge}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section bg-[#F8F9FA]">
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
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              What We Built
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-8"
            >
              Our approach
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
            {(study.quoteAuthor || study.quoteRole) && (
              <footer className="mt-6 text-text-muted">
                {study.quoteAuthor && <span className="font-semibold">{study.quoteAuthor}</span>}
                {study.quoteRole && <span>, {study.quoteRole}</span>}
              </footer>
            )}
          </motion.blockquote>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready for results like these?"
        description="Let's discuss how we can help your business achieve similar outcomes."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "See More Case Studies", href: "/case-studies" }}
        variant="gradient"
      />
    </>
  );
}
