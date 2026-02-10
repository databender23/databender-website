"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { distributionGuides } from "@/lib/lead-magnets-data";

const DISTRIBUTION_LOTTIE_URL = "/animations/wholesale-distribution.json";

const NAV_ITEMS = [
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "faq", label: "FAQ" },
  { id: "guides", label: "Guides" },
];

export default function WholesaleDistributionPageClient() {
  const content = industryContent["wholesale-distribution"];
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trimmedGuides = distributionGuides.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={DISTRIBUTION_LOTTIE_URL}
            className="mb-6"
            loop={true}
            heroTextHeight={240}
            maxSize={380}
            minSize={180}
          />

          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Link
                href="/industries"
                className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
              >
                Industries
              </Link>
              <span className="text-text-muted">/</span>
              <span className="text-teal-500 text-sm font-medium">Wholesale Distribution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Compete on Data, Not Just Relationships
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              15-25% of revenue tied up in slow-moving inventory. Customer profitability invisible. Pricing in spreadsheets. We fix that. Works with your existing ERP.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6 sm:mb-8"
            >
              {[
                { stat: "2-5%", label: "Margin lift from pricing discipline" },
                { stat: "15-30%", label: "Inventory reduction potential" },
                { stat: "4-6 mo", label: "Typical payback period" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-teal-500">{item.stat}</div>
                  <div className="text-xs sm:text-sm text-text-muted">{item.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto min-h-[48px]">
                Schedule Consultation
              </Button>
              <Button variant="secondary" size="lg" href="/tools/customer-profitability-calculator" className="w-full sm:w-auto min-h-[48px]">
                Try the Profitability Calculator
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Jump Link Navigation */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-1 py-3">
            {NAV_ITEMS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                  activeSection === id
                    ? "bg-teal-500 text-white"
                    : "text-text-secondary hover:text-teal-500 hover:bg-teal-500/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Challenges Section */}
      <section id="challenges" className="section bg-[#F8F9FA] scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              Sound familiar?
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.challenges.slice(0, 4).map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-black/5"
              >
                <svg
                  className="w-5 h-5 text-error flex-shrink-0 mt-0.5"
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
                <span className="text-text-secondary text-sm sm:text-base">{challenge}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Solutions Cards */}
      <section id="solutions" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm"
            >
              What We Build
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              Three Levers That Move the Needle
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Inventory Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-500/5 to-teal-500/10 p-6 sm:p-8 rounded-2xl border border-teal-500/20"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Inventory Intelligence</h3>
              <p className="text-text-secondary mb-4">
                15-25% of revenue tied up in inventory. Too much of it is the wrong stuff. We build forecasting that actually predicts demand.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Dead stock flagged automatically",
                  "Demand forecasting beyond 'last year + 10%'",
                  "Optimized reorder points by SKU",
                  "30% less cash tied up in inventory",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" href="/resources/guides/inventory-intelligence-guide" className="text-teal-500 p-0 h-auto">
                Get the Guide →
              </Button>
            </motion.div>

            {/* Profitability Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Customer Profitability</h3>
              <p className="text-text-secondary mb-4">
                Some &quot;best customers&quot; are money-losers after cost-to-serve. Returns, expedited shipping, hand-holding. Now you can see who actually makes you money.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "True margin by customer, not just revenue",
                  "Cost-to-serve visibility",
                  "Identify customers to grow vs. fire",
                  "Margin-based sales comp alignment",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" href="/tools/customer-profitability-calculator" className="text-amber-500 p-0 h-auto">
                Try the Calculator →
              </Button>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-teal-500/5 to-teal-500/10 p-6 sm:p-8 rounded-2xl border border-teal-500/20"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-3">Pricing Discipline</h3>
              <p className="text-text-secondary mb-4">
                Pricing in spreadsheets and sales rep heads. Every deal a negotiation. We build visibility and guardrails. <strong className="text-text-primary">2-5% margin improvement</strong> from discipline alone.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Real-time margin visibility on quotes",
                  "Pricing guardrails and exception alerts",
                  "Historical context on every customer",
                  "Tariff response in hours, not weeks",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" href="/resources/guides/pricing-discipline-distribution" className="text-teal-500 p-0 h-auto">
                Get the Guide →
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-[#F8F9FA] scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
              >
                We Know You&apos;ve Been Burned Before
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  question: "\"Our ERP already does this\"",
                  answer: "ERPs capture data but don't deliver insights. We add cross-system visibility your ERP wasn't designed to provide."
                },
                {
                  question: "\"We don't have time for another system\"",
                  answer: "First deliverable in 4-6 weeks. We work around your busy season. No disruption to operations."
                },
                {
                  question: "\"Our data isn't good enough\"",
                  answer: "We've worked with messy data before. Perfect data isn't required. Knowing where to start is."
                },
                {
                  question: "\"Our sales reps won't use it\"",
                  answer: "We build for adoption. Tools that save time, not add data entry. If it doesn't make their job easier, we've failed."
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white p-5 rounded-xl"
                >
                  <h3 className="text-base font-semibold text-text-primary mb-2">
                    {item.question}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {item.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Free Guides Section */}
      <section id="guides" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3"
            >
              Free Guides for Distributors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical strategies for inventory, profitability, and pricing. No fluff.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {trimmedGuides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-5 sm:p-6 rounded-xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group h-full"
                >
                  <div className="flex items-center gap-2 text-teal-500 text-xs font-medium mb-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Free Guide
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">{guide.description}</p>
                  <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
                    Get the Guide
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Assessment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <p className="text-text-secondary mb-4">
              Not sure where to start? Take a 5-minute assessment and get a custom action plan.
            </p>
            <Button variant="secondary" size="lg" href="/assessments/data-ai-readiness">
              Take the Data &amp; AI Readiness Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to compete with data?"
        description="Schedule a call to discuss your specific situation, or try our free profitability calculator."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Try the Calculator", href: "/tools/customer-profitability-calculator" }}
        variant="gradient"
      />
    </>
  );
}
