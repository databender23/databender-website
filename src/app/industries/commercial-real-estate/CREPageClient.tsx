"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { CREROICalculator } from "@/components/interactive";
import { creBrokerGuides, crePropertyManagerGuides, creAssessments } from "@/lib/lead-magnets-data";

const CRE_LOTTIE_URL = "/animations/commercial-real-estate.json";

export default function CREPageClient() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past hero
      setShowStickyNav(window.scrollY > 600);

      // Update active section based on scroll position
      const sections = ["brokers", "property-managers", "calculator", "faq"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Sticky Navigation */}
      <AnimatePresence>
        {showStickyNav && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/10 shadow-sm"
          >
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-center gap-1 sm:gap-2 py-3 overflow-x-auto">
                {[
                  { id: "brokers", label: "For Brokers" },
                  { id: "property-managers", label: "For Property Managers" },
                  { id: "calculator", label: "ROI Calculator" },
                  { id: "faq", label: "FAQ" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                      activeSection === item.id
                        ? "bg-teal-500 text-white"
                        : "text-text-secondary hover:text-teal-500 hover:bg-teal-50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={CRE_LOTTIE_URL}
            className="mb-6"
            loop={true}
            heroTextHeight={280}
            maxSize={380}
            minSize={180}
          />

          <div className="max-w-4xl mx-auto text-center">
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
              <span className="text-teal-500 text-sm font-medium">Commercial Real Estate</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Find the Real Owner.
              <br />
              <span className="text-teal-500">Before Your Competitor Does.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              The owner is hidden behind three LLCs. Your portfolio data lives in four different systems.
              We solve both problems.
            </motion.p>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-8 pb-8 border-b border-black/10"
            >
              {[
                { stat: "95%+", label: "Ownership accuracy" },
                { stat: "1.69M", label: "Records cleaned" },
                { stat: "80%", label: "Reporting time saved" },
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
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollToSection("brokers")}
                className="w-full sm:w-auto min-h-[48px]"
              >
                I&apos;m a Broker / Investor
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => scrollToSection("property-managers")}
                className="w-full sm:w-auto min-h-[48px]"
              >
                I Manage Properties
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Pain Points */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Sending mailers to the wrong people while missing actual owners",
                "Competitors reach the decision-maker before you figure out who that is",
                "Every property uses different software. Portfolio-wide view takes days.",
                "Quarterly reports eat two weeks. You're never confident the numbers are right.",
              ].map((pain, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 p-4 bg-white rounded-lg border border-black/5"
                >
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
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
                  <span className="text-text-secondary text-sm">{pain}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOR BROKERS & INVESTORS ===== */}
      <section id="brokers" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-medium mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                For Brokers &amp; Investors
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                Find owners. Close deals. First.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-text-secondary text-lg max-w-2xl mx-auto"
              >
                We fixed 1.69 million broken ownership records for one client. That kind of work is what we do.
              </motion.p>
            </div>

            {/* Three Capabilities in Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Find the Real Owner",
                  subtitle: "Not the LLC",
                  description: "The property is owned by an LLC, which is owned by a trust, which is managed by another LLC. We trace through the layers to find the actual decision-maker.",
                  stat: "95%+",
                  statLabel: "accuracy vs 80% AI-only",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  ),
                },
                {
                  title: "Due Diligence Overnight",
                  subtitle: "Not next month",
                  description: "AI reads every lease, rent roll, and financial document in the data room. You get a summary in the morning with red flags highlighted.",
                  stat: "85%",
                  statLabel: "faster than manual",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  ),
                },
                {
                  title: "Know Which Deals to Chase",
                  subtitle: "Stop guessing",
                  description: "You have 10,000 potential targets. We score them based on what actually predicts a sale: hold period, tax situation, loan timing. We tell you which 100 to call first.",
                  stat: "10K→100",
                  statLabel: "prioritized targets",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-teal-500 text-sm font-medium mb-3">{item.subtitle}</p>
                  <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-black/5">
                    <span className="text-2xl font-bold text-teal-500">{item.stat}</span>
                    <span className="text-text-muted text-xs ml-2">{item.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Case Study Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-2">Real results from a real client</h3>
                  <p className="text-text-secondary">
                    Same owner under ten different names. Different owners sharing the same ID. All sorted out in 14 hours, not months.
                  </p>
                </div>
                <Button variant="secondary" href="/case-studies/army-of-ai-agents" className="whitespace-nowrap">
                  Read the Case Study
                </Button>
              </div>
            </motion.div>

            {/* Broker CTA */}
            <div className="text-center mt-10">
              <Button variant="primary" size="lg" href="/assessments/deal-intelligence">
                Take the Deal Intelligence Assessment
              </Button>
              <p className="text-text-muted text-sm mt-2">5 minutes. See where your deal data stands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOR PROPERTY MANAGERS ===== */}
      <section id="property-managers" className="section bg-[#F8F9FA] scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-medium mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                For Property Managers
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4"
              >
                One view. Every property.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="text-text-secondary text-lg max-w-2xl mx-auto"
              >
                Managing 5 to 50 properties across different systems? You shouldn&apos;t need a data team just to see your own portfolio.
              </motion.p>
            </div>

            {/* Three Capabilities in Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  title: "Portfolio Visibility",
                  subtitle: "All systems, one view",
                  description: "Yardi here, AppFolio there, MRI somewhere else. We connect your systems so you see occupancy, NOI, and collections across all properties in one place.",
                  stat: "4+",
                  statLabel: "systems unified",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  ),
                },
                {
                  title: "Investor Reports in Hours",
                  subtitle: "Not two weeks",
                  description: "Stop the quarterly scramble. We automate the data pull and consolidation. You review a polished, ILPA-compliant report instead of building it from scratch.",
                  stat: "80%",
                  statLabel: "time reduction",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  ),
                },
                {
                  title: "Catch Renewals Early",
                  subtitle: "6-9 months out, not 30 days",
                  description: "Most property managers find out about lease expirations too late to negotiate properly. We surface renewals early and flag below-market rates.",
                  stat: "5-15%",
                  statLabel: "CAM recovery typical",
                  icon: (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1">{item.title}</h3>
                  <p className="text-teal-500 text-sm font-medium mb-3">{item.subtitle}</p>
                  <p className="text-text-secondary text-sm mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-black/5">
                    <span className="text-2xl font-bold text-teal-500">{item.stat}</span>
                    <span className="text-text-muted text-xs ml-2">{item.statLabel}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Before/After */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div className="p-6 rounded-xl bg-white border border-black/10">
                <span className="text-red-400 text-sm font-medium uppercase tracking-wide">Before</span>
                <p className="text-text-secondary mt-2">
                  Pull data from each property. Consolidate in Excel. Format in PowerPoint. Fix the errors they find. Send again. Takes two weeks.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20">
                <span className="text-teal-500 text-sm font-medium uppercase tracking-wide">After</span>
                <p className="text-text-secondary mt-2">
                  Data pulls automatically. Click to generate report. Review polished output. Send to investors. Takes a day.
                </p>
              </div>
            </motion.div>

            {/* PM CTA */}
            <div className="text-center mt-10">
              <Button variant="primary" size="lg" href="/assessments/commercial-real-estate">
                Take the Portfolio Analytics Assessment
              </Button>
              <p className="text-text-muted text-sm mt-2">5 minutes. See where your portfolio data stands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROI CALCULATOR ===== */}
      <section id="calculator" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <CREROICalculator />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
              >
                Questions we hear often
              </motion.h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Yardi (or MRI, or AppFolio) already does this.",
                  answer: "Those are excellent property management systems, and we don't replace them. They excel at managing individual properties but can't see across systems. We create the unified layer that connects everything while you keep your existing PM systems."
                },
                {
                  question: "CoStar already has ownership data.",
                  answer: "CoStar is great for market data. Ownership is different. Appraisers cite 'less than 50% accuracy' on CoStar ownership. We verify through entity resolution, not just data aggregation. We tell you who to call, not just who might own it."
                },
                {
                  question: "Reonomy does what you do.",
                  answer: "Reonomy targets 80% accuracy with AI-only approaches. We hit 95%+ by combining AI with human verification. For a $10M deal, that 15% difference is the difference between reaching the owner and chasing the wrong person."
                },
                {
                  question: "Our data is a mess. We're not ready.",
                  answer: "Messy data isn't a barrier. It's where we start. We cleaned 1.69M records from exactly this kind of mess. Data cleanup is our foundation, not your prerequisite."
                },
                {
                  question: "How long until we see value?",
                  answer: "First applications in 4-6 weeks, reporting automation in 8-12 weeks. We prove value before the big commitment."
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 sm:p-6 rounded-xl bg-[#F8F9FA] border border-black/5"
                >
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
                    &quot;{faq.question}&quot;
                  </h3>
                  <p className="text-text-secondary text-sm sm:text-base">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPLEMENTATION TIMELINE ===== */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2"
            >
              What to Expect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary"
            >
              See ROI in 30-60 days. Not 12-18 months.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">For Brokers</h3>
              <div className="space-y-3">
                {[
                  { week: "Week 1-2", task: "Connect data sources, initial ownership analysis" },
                  { week: "Week 3-4", task: "First verified owner list delivered" },
                  { week: "Week 5-8", task: "Ongoing pipeline enrichment" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-teal-500 font-semibold text-sm min-w-[70px]">{item.week}</span>
                    <span className="text-text-secondary text-sm">{item.task}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl bg-white border border-black/10"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">For Property Managers</h3>
              <div className="space-y-3">
                {[
                  { week: "Week 1-2", task: "System connections (Yardi, AppFolio, etc.)" },
                  { week: "Week 3-4", task: "First unified application live" },
                  { week: "Week 5-8", task: "Investor reporting automation" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-teal-500 font-semibold text-sm min-w-[70px]">{item.week}</span>
                    <span className="text-text-secondary text-sm">{item.task}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== RESOURCES (Condensed) ===== */}
      <section id="resources" className="section scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2"
            >
              Free Resources
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary"
            >
              Guides and assessments for brokers and property managers
            </motion.p>
          </div>

          {/* Assessments */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {creAssessments.map((assessment, index) => (
              <motion.div
                key={assessment.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={assessment.slug === "deal-intelligence" ? "/assessments/deal-intelligence" : "/assessments/commercial-real-estate"}
                  className="block p-5 rounded-xl bg-gradient-to-br from-teal-500/10 to-teal-500/5 border border-teal-500/20 hover:border-teal-500/40 transition-all group h-full"
                >
                  <div className="text-teal-500 text-xs font-medium mb-2">{assessment.timeEstimate} Assessment</div>
                  <h4 className="text-lg font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                    {assessment.title}
                  </h4>
                  <p className="text-text-secondary text-sm">{assessment.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Guides Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[...creBrokerGuides.slice(0, 3), ...crePropertyManagerGuides.slice(0, 3)].map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-4 rounded-xl bg-white border border-black/10 hover:border-teal-500/30 transition-all group h-full"
                >
                  <div className="text-teal-500 text-xs font-medium mb-1">Free Guide</div>
                  <h4 className="text-base font-bold text-text-primary group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h4>
                  <p className="text-text-muted text-xs mt-1">{guide.subtitle}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <CTA
        title="Ready to see what's possible?"
        description="Whether you're chasing deals or managing a portfolio, we can help. Schedule a consultation to discuss your specific challenges."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "See the Case Study", href: "/case-studies/army-of-ai-agents" }}
        variant="gradient"
      />
    </>
  );
}
