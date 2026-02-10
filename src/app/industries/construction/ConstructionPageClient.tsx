"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { constructionGuides } from "@/lib/lead-magnets-data";
import {
  calculateConstructionROI,
  projectCountOptions,
  avgProjectValueOptions,
  unbilledChangeOrderOptions,
  reportHoursOptions,
  formatCurrency,
} from "@/lib/construction-roi-calculator";

const CONSTRUCTION_LOTTIE_URL = "/animations/construction-industry.json";

// Jump link navigation items
const navItems = [
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "roi-calculator", label: "ROI" },
  { id: "faq", label: "FAQ" },
];

export default function ConstructionPageClient() {
  const content = industryContent["construction"];
  const [activeSection, setActiveSection] = useState("");

  // ROI Calculator state
  const [calcInputs, setCalcInputs] = useState({
    projectCount: projectCountOptions[1].value,
    avgProjectValue: avgProjectValueOptions[1].value,
    unbilledChangeOrderPct: unbilledChangeOrderOptions[1].value,
    reportHoursPerWeek: reportHoursOptions[1].value,
  });

  const roiResults = calculateConstructionROI(calcInputs);

  // Track active section on scroll
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

    navItems.forEach(({ id }) => {
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={CONSTRUCTION_LOTTIE_URL}
            className="mb-6"
            loop={true}
            heroTextHeight={280}
            maxSize={420}
            minSize={200}
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
              <span className="text-teal-500 text-sm font-medium">Construction</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Stop Finding Out About Margin Problems at Closeout
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-4"
            >
              Your job data is scattered across Procore, Sage, field apps, and spreadsheets. Change orders approved on site never make it to billing. We connect everything into one view so you know where every job stands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-teal-500">84%</span>
                <span className="text-text-muted">of contractors lack integrated systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-teal-500">2-5%</span>
                <span className="text-text-muted">of revenue lost to unbilled change orders</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" href="/assessments/construction" className="w-full sm:w-auto min-h-[48px]">
                Take the Readiness Assessment
              </Button>
              <Button variant="secondary" size="lg" href="/contact" className="w-full sm:w-auto min-h-[48px]">
                Schedule a Conversation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Jump Link Navigation */}
      <nav className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-black/5 hidden md:block">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-1 py-3">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === id
                    ? "bg-teal-500 text-white"
                    : "text-text-secondary hover:text-teal-500 hover:bg-teal-500/5"
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
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Common Challenges
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-6 sm:mb-8"
            >
              Sound familiar?
            </motion.h2>

            <ul className="space-y-3 sm:space-y-4">
              {content.challenges.slice(0, 4).map((challenge, index) => (
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
                  <span className="text-text-secondary text-base sm:text-lg">{challenge}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How We Help - Solution Cards */}
      <section id="solutions" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm"
            >
              How We Help
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              Visibility That Runs Your Business
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Job Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Job Visibility</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Real-time margin by job. Cost-to-complete updated daily. At-risk jobs flagged at week 4, not closeout. One source of truth for PMs, controllers, and owners.
              </p>
              <ul className="space-y-2">
                {["Real-time cost-to-complete", "At-risk jobs flagged early", "WIP reports in minutes", "One source of truth"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: Change Order Recovery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Change Order Recovery</h3>
              </div>
              <p className="text-text-secondary mb-4">
                2-5% of revenue lost to unbilled change orders every year. Field approvals that never make it to billing. We connect the field to accounting so nothing ages out unbilled.
              </p>
              <ul className="space-y-2">
                {["Field approval triggers billing alert", "Every item tracked to payment", "7-day billing cycle", "No more closeout surprises"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3: Cash Flow Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-black/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Cash Flow Visibility</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Monthly close goes from a week to a day. Data pulls automatically from Procore, Sage, field apps, and your spreadsheets.
              </p>
              <ul className="space-y-2">
                {["Automated data consolidation", "Cross-system analytics", "Predictive cash flow", "Board-ready reporting"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 4: Works With Your Stack (dark card) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 rounded-2xl text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Works With Your Stack</h3>
              </div>
              <p className="text-slate-300 mb-4">
                We don&apos;t replace Procore. We make it smarter. Your financial data lives in Sage. Your field notes are in Raken. We&apos;re the analytics layer that connects everything.
              </p>
              <ul className="space-y-2">
                {["Procore + Sage + field apps unified", "Real-time data, not 15-min latency", "Custom KPIs your way", "No rip-and-replace"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
              >
                ROI Calculator
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4"
              >
                What&apos;s Data Fragmentation Costing You?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
              >
                Plug in your numbers. See what better visibility could mean for your bottom line.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
            >
              {/* Calculator Inputs */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-black/10">
                <h3 className="text-lg font-bold text-text-primary mb-4">Your Business</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Active projects
                    </label>
                    <select
                      value={calcInputs.projectCount}
                      onChange={(e) => setCalcInputs({ ...calcInputs, projectCount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {projectCountOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Average project value
                    </label>
                    <select
                      value={calcInputs.avgProjectValue}
                      onChange={(e) => setCalcInputs({ ...calcInputs, avgProjectValue: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {avgProjectValueOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Estimated unbilled change orders
                    </label>
                    <select
                      value={calcInputs.unbilledChangeOrderPct}
                      onChange={(e) => setCalcInputs({ ...calcInputs, unbilledChangeOrderPct: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {unbilledChangeOrderOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Hours per week compiling reports
                    </label>
                    <select
                      value={calcInputs.reportHoursPerWeek}
                      onChange={(e) => setCalcInputs({ ...calcInputs, reportHoursPerWeek: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {reportHoursOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Calculator Results */}
              <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-5 sm:p-6 rounded-2xl border border-teal-500/20">
                <h3 className="text-lg font-bold text-text-primary mb-4">Your Numbers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-teal-500/20">
                    <span className="text-text-secondary">Potential recovered revenue</span>
                    <span className="text-xl font-bold text-teal-600">{formatCurrency(roiResults.potentialRecoveredRevenue)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-teal-500/20">
                    <span className="text-text-secondary">Reporting time savings</span>
                    <span className="text-xl font-bold text-teal-600">{formatCurrency(roiResults.potentialTimeSavings)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-teal-500/20">
                    <span className="text-text-secondary">Total annual benefit</span>
                    <span className="text-xl font-bold text-text-primary">{formatCurrency(roiResults.totalAnnualBenefit)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-teal-500/20">
                    <span className="text-text-secondary">Typical implementation</span>
                    <span className="text-lg font-semibold text-text-primary">
                      {formatCurrency(roiResults.implementationCostLow)}-{formatCurrency(roiResults.implementationCostHigh)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text-secondary">Estimated payback</span>
                    <span className="text-lg font-semibold text-teal-600">
                      {roiResults.paybackMonths} months
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="primary" size="md" href="/contact" className="w-full">
                    Get a Custom Analysis
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Guides Section */}
      <section id="guides" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Free Resources
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4"
            >
              Guides for Growing Contractors
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical guides for project visibility, change order recovery, and post-acquisition integration. No fluff, just strategies that work.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {constructionGuides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-5 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group min-h-[48px] h-full"
                >
                  <div className="flex items-center gap-2 text-teal-500 text-xs sm:text-sm font-medium mb-2 sm:mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Free Guide
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm mb-2 sm:mb-3">{guide.subtitle}</p>
                  <p className="text-text-secondary text-sm sm:text-base mb-3 sm:mb-4">{guide.description}</p>
                  <span className="inline-flex items-center gap-1 text-teal-500 font-medium text-xs sm:text-sm group-hover:gap-2 transition-all">
                    Get the Guide
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
            >
              Common Questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-8 sm:mb-10"
            >
              What contractors ask us
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  question: "Doesn't Procore already do this?",
                  answer: "Procore excels at project execution: RFIs, drawings, daily logs. We're the analytics layer that connects Procore to your accounting system and field apps. Think of us as the visibility that makes your Procore investment work harder. Real-time margin, not 15-minute-old data."
                },
                {
                  question: "Our PMs won't use another system.",
                  answer: "They don't have to. Your PMs keep using Procore and their existing tools. We surface insights from data that's already being entered. The only change for field staff? Their good work becomes visible to leadership."
                },
                {
                  question: "Our data is a mess.",
                  answer: "We hear that from almost every contractor. Here's what we find: your data is better than you think. It's just scattered across systems. Part of onboarding is a data audit where we tell you exactly what's possible with what you have."
                },
                {
                  question: "How long does implementation take?",
                  answer: "Read-only connections in weeks 1-2. First live application by week 3-4. Full visibility by week 8-12. We read data, we don't write to your systems. Zero production impact. Works with Procore, Sage, Vista, QuickBooks, and field apps."
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-5 sm:p-6 rounded-xl border border-black/10"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to see your jobs clearly?"
        description="Take the assessment to see where you stand, or schedule a call to talk through your situation."
        primaryCta={{ label: "Take the Assessment", href: "/assessments/construction" }}
        secondaryCta={{ label: "Schedule a Conversation", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
