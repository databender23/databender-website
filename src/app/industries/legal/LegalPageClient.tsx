"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { legalGuides } from "@/lib/lead-magnets-data";
import { industryContent } from "@/lib/industries-data";
import {
  calculateROI,
  attorneyOptions,
  billingRateOptions,
  searchHoursOptions,
  formatCurrency,
} from "@/lib/legal-roi-calculator";

const LEGAL_LOTTIE_URL = "/animations/legal.json";

const navItems = [
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "roi-calculator", label: "ROI" },
  { id: "faq", label: "FAQ" },
];

export default function LegalPageClient() {
  const content = industryContent["legal"];
  const [activeSection, setActiveSection] = useState("");

  // ROI Calculator state
  const [calcInputs, setCalcInputs] = useState({
    attorneyCount: attorneyOptions[1].value,
    billingRate: billingRateOptions[1].value,
    searchHoursPerWeek: searchHoursOptions[1].value,
  });

  const roiResults = calculateROI(calcInputs);

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

  const displayGuides = legalGuides.filter((g) =>
    ["associate-multiplier", "own-your-ai", "economics-of-legal-ai"].includes(g.slug)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={LEGAL_LOTTIE_URL}
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
              <span className="text-teal-500 text-sm font-medium">Legal</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Find Any Precedent in Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 max-w-2xl mx-auto"
            >
              AI that searches decades of your firm&apos;s work product. Ask in plain English, get answers with citations. Runs on your servers. You own the code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
              <Button variant="primary" size="lg" href="/contact" className="w-full sm:w-auto min-h-[48px]">
                Schedule a 30-Minute Demo
              </Button>
              <Button variant="secondary" size="lg" href="/assessments/legal" className="w-full sm:w-auto min-h-[48px]">
                5-Min Assessment → Get Your AI Roadmap
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
              {content.challenges.map((challenge, index) => (
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

            {/* Industry Stats Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="bg-white p-4 rounded-xl border border-black/10 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-teal-600 mb-1">21%</p>
                <p className="text-text-secondary text-sm">of attorney time spent searching for information</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-black/10 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-teal-600 mb-1">74%</p>
                <p className="text-text-secondary text-sm">of billable tasks automatable with AI</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-black/10 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-teal-600 mb-1">300 hrs</p>
                <p className="text-text-secondary text-sm">written off annually by the average partner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section id="solutions" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-3 sm:mb-4 tracking-wide uppercase text-sm"
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
                Built for how law firms actually work
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Document Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-black/10"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">Document Intelligence</h3>
                <p className="text-text-secondary text-sm sm:text-base mb-4">
                  Your entire history, searchable. Every brief, memo, contract, and deposition indexed and findable in seconds. Ask in plain English, get answers with citations.
                </p>
                <ul className="space-y-2 mb-4">
                  {["Past briefs and motions searchable by topic", "Contract templates and precedents findable", "Research memos and opinions indexed", "Deposition transcripts searchable across hundreds"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-teal-600 text-sm font-medium">
                  One firm cut research time 60%. Associates find what they need in minutes, not hours.
                </p>
              </motion.div>

              {/* Card 2: Knowledge Preservation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-black/10"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">Knowledge Preservation</h3>
                <p className="text-text-secondary text-sm sm:text-base mb-4">
                  Stop losing expertise when partners retire. 30 years of experience shouldn&apos;t walk out the door. We capture institutional knowledge and make it accessible to every associate from day one.
                </p>
                <ul className="space-y-2 mb-4">
                  {["How partners handled similar issues", "Firm-specific knowledge preserved", "Training that scales across all associates", "Fewer repeat mistakes"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Card 3: Entity Resolution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-black/10"
              >
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2">Entity Resolution</h3>
                <p className="text-text-secondary text-sm sm:text-base mb-4">
                  Know who you&apos;re really dealing with. LLCs owned by trusts managed by other LLCs. We processed 1.69 million records and resolved them to 1.25 million actual owners at a fraction of manual review costs.
                </p>
                <ul className="space-y-2 mb-4">
                  {["Beneficial owners identified", "Related parties mapped", "Corporate hierarchies untangled", "Conflict checks in minutes"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                      <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Card 4: Ownership Model (dark themed) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Ownership Model</h3>
                <p className="text-slate-300 text-sm sm:text-base mb-4">
                  One investment. No per-seat fees. No annual renewals. The code is yours. Runs on your servers. Client data never leaves your building. Designed for ABA 512 compliance.
                </p>
                <ul className="space-y-2 mb-4">
                  {["You own the code outright", "No recurring vendor fees", "Works with iManage, NetDocuments", "Live in 8-12 weeks"].map((item, i) => (
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
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi-calculator" className="section scroll-mt-24">
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
                What&apos;s Search Time Costing You?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
              >
                Plug in your numbers. See what document intelligence could save your firm.
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
              <div className="bg-[#F8F9FA] p-5 sm:p-6 rounded-2xl border border-black/10">
                <h3 className="text-lg font-bold text-text-primary mb-4">Your Firm</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Number of attorneys
                    </label>
                    <select
                      value={calcInputs.attorneyCount}
                      onChange={(e) => setCalcInputs({ ...calcInputs, attorneyCount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {attorneyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Average billing rate
                    </label>
                    <select
                      value={calcInputs.billingRate}
                      onChange={(e) => setCalcInputs({ ...calcInputs, billingRate: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {billingRateOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Hours per attorney per week searching for documents
                    </label>
                    <select
                      value={calcInputs.searchHoursPerWeek}
                      onChange={(e) => setCalcInputs({ ...calcInputs, searchHoursPerWeek: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                    >
                      {searchHoursOptions.map((opt) => (
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
                    <span className="text-text-secondary">Annual search time cost</span>
                    <span className="text-xl font-bold text-text-primary">{formatCurrency(roiResults.annualSearchCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-teal-500/20">
                    <span className="text-text-secondary">Potential annual savings (60%)</span>
                    <span className="text-xl font-bold text-teal-600">{formatCurrency(roiResults.potentialAnnualSavings)}</span>
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
              What firms ask us
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  question: "We already have Westlaw/Lexis.",
                  answer: "Westlaw and Lexis search published law. We search YOUR firm's work product. The briefs, memos, contracts, and research your attorneys have produced over decades. Different problem, different solution."
                },
                {
                  question: "Our data is too messy to index.",
                  answer: "Everyone says that. We've indexed firms with 15+ years of unorganized work product. The data is better than you think. Part of onboarding is a document audit where we tell you exactly what's possible."
                },
                {
                  question: "What about client confidentiality?",
                  answer: "Everything runs on your servers. Client data never touches an outside system. No contracts with OpenAI or any cloud AI provider. Complete audit trails on every query. Designed for ABA 512 compliance from day one."
                },
                {
                  question: "How long does implementation take?",
                  answer: "Document intelligence is live in 8-12 weeks. You're using it while we're still adding documents. Works with iManage, NetDocuments, or whatever you're running."
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

      {/* Free Guides Section */}
      <section id="guides" className="section bg-[#F8F9FA] scroll-mt-24">
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
              Guides for Forward-Thinking Firms
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto"
            >
              Practical insights you can use today. No fluff, no sales pitches, just strategies from firms that have done it.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayGuides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-5 sm:p-8 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group min-h-[48px]"
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
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {guide.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
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

      {/* CTA */}
      <CTA
        title="Let's talk about your firm"
        description="30 minutes. We'll look at your specific situation and show you what's possible. Want a custom audit instead? We do those too."
        primaryCta={{ label: "Schedule a 30-Minute Demo", href: "/contact" }}
        secondaryCta={{ label: "5-Min Assessment", href: "/assessments/legal" }}
        variant="gradient"
      />
    </>
  );
}
