"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { industryContent } from "@/lib/industries-data";
import { healthcareGuides } from "@/lib/lead-magnets-data";

const HEALTHCARE_LOTTIE_URL = "/animations/healthcare-industry.json";

// Jump link navigation items
const navItems = [
  { id: "problem", label: "The Problem" },
  { id: "solution", label: "How We Help" },
  { id: "results", label: "Results" },
  { id: "privacy", label: "Privacy" },
  { id: "faq", label: "FAQ" },
  { id: "guides", label: "Guides" },
];

export default function HealthcarePageClient() {
  const content = industryContent["healthcare"];
  const [activeSection, setActiveSection] = useState("");

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
      {/* Hero Section - Simplified */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-16 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={HEALTHCARE_LOTTIE_URL}
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
              <span className="text-teal-500 text-sm font-medium">Healthcare</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Find Any Answer in Seconds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto"
            >
              AI that searches your protocols, policies, and payer requirements. Ask in plain English, get answers with sources. Nothing leaves your building.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="primary" size="lg" href="/contact" className="min-h-[48px]">
                See a Demo
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

      {/* The Problem Section - Consolidated */}
      <section id="problem" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                The Problem
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Your Team Is Drowning in Documentation
              </h2>
              <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
                The information exists. Finding it is the problem.
              </p>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              {[
                { stat: "13 hrs", label: "Per physician per week on prior auth" },
                { stat: "93%", label: "Say PA delays patient care" },
                { stat: "82%", label: "Report higher denial rates" },
                { stat: "15 min", label: "Average time to find a protocol" },
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-[#F8F9FA]">
                  <p className="text-2xl sm:text-3xl font-bold text-teal-500 mb-1">{item.stat}</p>
                  <p className="text-text-secondary text-xs sm:text-sm">{item.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Pain Points - Horizontal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Knowledge walks out",
                  description: "Your most experienced staff carry decades of knowledge. When they leave, it goes with them.",
                },
                {
                  title: "Prior auth eats everything",
                  description: "Staff spend hours hunting for clinical documentation that should take minutes to find.",
                },
                {
                  title: "Denials keep climbing",
                  description: "82% of health systems report higher denial rates. Most are preventable with better documentation.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="p-5 rounded-xl border border-black/10 bg-white"
                >
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - How We Help */}
      <section id="solution" className="section bg-[#F8F9FA] scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                How We Help
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Ask Questions. Get Answers. That Simple.
              </h2>
            </motion.div>

            {/* Main Value Prop - Large Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 sm:p-10 rounded-2xl border border-black/10 mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
                    Document Intelligence
                  </h3>
                  <p className="text-text-secondary mb-4">
                    We turn your scattered documents into a searchable knowledge base. Protocols, policies, payer requirements, clinical guidelines. All findable in seconds.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "\"What's our sepsis protocol?\" → Instant answer with source",
                      "\"Blue Cross requirements for this MRI?\" → Current criteria, one click",
                      "\"Pull documentation for this prior auth\" → AI gathers what you need",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-6 rounded-xl border border-teal-500/20">
                  <p className="text-sm text-teal-600 font-medium mb-2">What becomes searchable</p>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li>• Clinical protocols and procedures</li>
                    <li>• Policy and compliance manuals</li>
                    <li>• Payer requirements by procedure</li>
                    <li>• Formulary and product information</li>
                    <li>• Training materials and SOPs</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Three Capabilities - Icon Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Prior Auth in Minutes",
                  description: "Cut PA documentation time by 80%. AI finds and organizes what payers require.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Denial Prevention",
                  description: "Right documentation before submission. 15-25% denial reduction typical.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  ),
                  title: "Knowledge Capture",
                  description: "When someone retires, what they knew stays. New hires productive from day one.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-5 rounded-xl bg-white border border-black/10 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Mini Case Study + ROI */}
      <section id="results" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                Results
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                From 15 Minutes to 30 Seconds
              </h2>
            </motion.div>

            {/* Case Study Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-teal-500/10 to-teal-500/5 p-6 sm:p-8 rounded-2xl border border-teal-500/20 mb-8"
            >
              <p className="text-text-secondary text-base sm:text-lg mb-6">
                A 12-location specialty practice had 20 years of clinical knowledge scattered across shared drives and key people&apos;s memories. We turned 3,000+ documents into a searchable knowledge base. Now protocol lookups take 30 seconds. New hires get answers from day one.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { stat: "30 sec", label: "Protocol lookups (was 15 min)" },
                  { stat: "3,000+", label: "Documents searchable" },
                  { stat: "Day 1", label: "New hire productivity" },
                  { stat: "4-6 mo", label: "Typical payback" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-teal-600">{item.stat}</p>
                    <p className="text-text-secondary text-xs sm:text-sm">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ROI Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl border border-black/10"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-3">The ROI math</h3>
              <p className="text-text-secondary text-sm mb-4">
                Take your denial rate, multiply by claims. If document intelligence cuts denials by 15%, payback is months, not years. Add time savings: 13 hours per physician per week on PA, 5+ hours per staff member on document hunting. At scale, that&apos;s FTE-level capacity without adding headcount.
              </p>
              <Button variant="secondary" size="sm" href="/contact">
                Get Your Numbers
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy Section - Consolidated */}
      <section id="privacy" className="section bg-[#F8F9FA] scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                  Privacy & Compliance
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  42% of Breaches Come from Vendors. Yours Won&apos;t.
                </h2>
                <p className="text-text-secondary mb-4">
                  Most AI tools want your patient data in their cloud. We do it differently. Everything runs on your servers. Patient information never leaves your building.
                </p>
                <p className="text-text-primary font-medium">
                  HIPAA compliant is the minimum. Your PHI never touches an outside system.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl border border-black/10"
              >
                <ul className="space-y-4">
                  {[
                    { title: "Runs on your systems", desc: "AI on your computers. Data never touches outside servers." },
                    { title: "No extra vendor agreements", desc: "No new contracts with AI companies." },
                    { title: "Complete audit trail", desc: "Every query logged. See who searched what." },
                    { title: "Works with Epic, Cerner, athenahealth, and 40+ others", desc: "Connects to your existing EHR. No rip-and-replace." },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <span className="font-medium text-text-primary text-sm">{item.title}</span>
                        <p className="text-text-secondary text-xs">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* PE-Backed Callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 p-6 rounded-xl bg-white border border-black/10"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">PE-Backed? We Get It.</h3>
                  <p className="text-text-secondary text-sm">
                    Portfolio-wide visibility without the 18-month integration. Different PMS at every location? We give you one unified view. EBITDA improvements you can measure. Exit-ready reporting.
                  </p>
                </div>
                <Button variant="secondary" size="sm" href="/resources/guides/pe-healthcare-operations">
                  PE Operations Guide
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Simplified */}
      <section id="faq" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                FAQ
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                Common Questions
              </h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "\"Epic already has AI features\"",
                  a: "Epic provides excellent tools for Epic data. We work with everything else: faxes, PDFs, external records, payer documents, policy manuals. The 97% of healthcare information that lives outside your EHR.",
                },
                {
                  q: "\"We're too small for this\"",
                  a: "We work with organizations from 5 locations to 50. The technology that was enterprise-only two years ago now costs a fraction. Pricing scales with your size.",
                },
                {
                  q: "\"How do we know the AI is accurate?\"",
                  a: "Every answer includes links to source documents. Staff verify before acting. AI accelerates the search, humans make decisions. No black boxes.",
                },
                {
                  q: "\"Our staff won't adopt new technology\"",
                  a: "It's a search box. Staff type a question, get an answer. As simple as Google. Most teams are using it within days.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-[#F8F9FA] border border-black/5"
                >
                  <h3 className="text-base font-semibold text-text-primary mb-2">{item.q}</h3>
                  <p className="text-text-secondary text-sm">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="section bg-[#F8F9FA] scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                Free Resources
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3">
                Guides for Healthcare Leaders
              </h2>
              <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto">
                Practical insights for deploying AI that keeps patient data private.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {healthcareGuides.map((guide, index) => (
                <motion.div
                  key={guide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/resources/guides/${guide.slug}`}
                    className="block p-5 rounded-xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-md transition-all group h-full"
                  >
                    <div className="flex items-center gap-2 text-teal-500 text-xs font-medium mb-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Free Guide
                    </div>
                    <h3 className="text-base font-bold text-text-primary mb-1 group-hover:text-teal-500 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-text-muted text-xs mb-2">{guide.subtitle}</p>
                    <p className="text-text-secondary text-sm">{guide.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Single Focus */}
      <CTA
        title="See what this looks like for you"
        description="30 minutes. We'll look at your situation and show you what's possible. No pitch deck."
        primaryCta={{ label: "Schedule a Demo", href: "/contact" }}
        secondaryCta={{ label: "Take the 5-Min Assessment", href: "/assessments/healthcare-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
