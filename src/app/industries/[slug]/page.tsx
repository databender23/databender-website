"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { LottieWrapper, FloatingNodes } from "@/components/animations";
import { industryContent, getIndustryBySlug, type IndustryWithCta } from "@/lib/industries-data";

export default function IndustryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const industry = getIndustryBySlug(slug) as IndustryWithCta | undefined;
  const content = industryContent[slug];
  const [lottieData, setLottieData] = useState<object | null>(null);

  // Load Lottie animation
  useEffect(() => {
    if (industry?.lottie) {
      fetch(industry.lottie)
        .then((res) => res.json())
        .then((data) => setLottieData(data))
        .catch(() => setLottieData(null));
    }
  }, [industry?.lottie]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Industry not found</h1>
          <Button href="/industries">View All Industries</Button>
        </div>
      </div>
    );
  }

  const defaultContent = {
    challenges: [
      "Data scattered across multiple systems",
      "Manual processes that don't scale",
      "Lack of visibility into operations",
      "Difficulty making data-driven decisions",
    ],
    solutions: [
      { title: "Data Integration", description: "Unify all your data sources into a single view." },
      { title: "Analytics & Reporting", description: "Get real-time visibility into what matters." },
      { title: "AI & Automation", description: "Automate manual processes and surface insights." },
    ],
    benefits: [
      { title: "Trusted Data", description: "One source of truth you can actually rely on." },
      { title: "Faster Decisions", description: "Answers in seconds, not days of chasing spreadsheets." },
      { title: "Less Manual Work", description: "Automate the repetitive stuff so your team can focus." },
    ],
    useCases: [
      { title: "Operational Visibility", description: "See what's happening across your organization in real-time." },
      { title: "Performance Analytics", description: "Track KPIs and identify opportunities for improvement." },
      { title: "Automated Reporting", description: "Generate reports automatically, no manual work required." },
    ],
  };

  const pageContent = content || defaultContent;

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />

        {/* Teal glow spots */}
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        {/* Floating nodes */}
        <FloatingNodes nodeCount={15} showConnections={true} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <Link
                  href="/industries"
                  className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
                >
                  Industries
                </Link>
                <span className="text-text-muted">/</span>
                <span className="text-teal-500 text-sm font-medium">{industry.title}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                {industry.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                {industry.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="/contact">
                  Schedule Consultation
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href={industry.ctaHref || "/assessments/data-ai-readiness"}
                >
                  {industry.ctaText || "Take Assessment"}
                </Button>
              </motion.div>
            </div>

            {/* Right side - Lottie Animation */}
            {lottieData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-md">
                  <LottieWrapper
                    animationData={lottieData}
                    loop={true}
                    autoplay={true}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Common Challenges
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-8"
            >
              Sound familiar?
            </motion.h2>

            <ul className="space-y-4">
              {pageContent.challenges.map((challenge, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-6 h-6 text-error flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span className="text-text-secondary text-lg">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Our Solutions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              How we help
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-black/10"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {solution.title}
                </h3>
                <p
                  className="text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: solution.description }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {pageContent.benefits && pageContent.benefits.length > 0 && (
        <section className="section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                What You Get
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-text-primary"
              >
                The outcomes that matter
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageContent.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-teal-500/5 to-teal-500/10 border border-teal-500/20"
                >
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-teal-500 flex-shrink-0 mt-0.5"
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
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-text-secondary text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Use Cases
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              What this looks like in practice
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageContent.useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-black/10"
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {useCase.title}
                </h3>
                <p className="text-text-secondary">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-Industries */}
      {industry.subIndustries && industry.subIndustries.length > 0 && (
        <section className="section bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-text-primary"
              >
                Specialized Solutions
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {industry.subIndustries.map((sub, index) => {
                const subHref = `/industries/${sub.parentSlug}/${sub.slug}`;
                return (
                  <motion.a
                    key={sub.slug}
                    href={subHref}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group"
                  >
                    <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-teal-500 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-text-secondary">{sub.description}</p>
                    <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-sm mt-4 group-hover:gap-2 transition-all">
                      Learn more
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTA
        title="Ready to see what's possible?"
        description={industry.ctaSubtext || "Schedule a consultation to discuss your specific challenges and goals."}
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{
          label: industry.ctaText || "Take Assessment",
          href: industry.ctaHref || "/assessments/data-ai-readiness",
        }}
        variant="gradient"
      />
    </>
  );
}
