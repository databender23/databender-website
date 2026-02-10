"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { HeroLottie } from "@/components/animations";
import { ManufacturingROICalculator } from "@/components/interactive/ManufacturingROICalculator";
import { industryContent } from "@/lib/industries-data";
import { manufacturingGuides } from "@/lib/lead-magnets-data";

const MANUFACTURING_LOTTIE_URL = "/animations/manufacturing-industry.json";

// Jump link navigation items
const navItems = [
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "roi-calculator", label: "ROI" },
  { id: "guides", label: "Guides" },
];

export default function ManufacturingPageClient() {
  const content = industryContent["manufacturing"];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <HeroLottie
            lottieUrl={MANUFACTURING_LOTTIE_URL}
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
              <span className="text-teal-500 text-sm font-medium">Manufacturing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
            >
              Do More With the Team You Have
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
            >
              Growing manufacturers hit a wall. Orders slip. Production scrambles.
              Everyone&apos;s hunting for answers across spreadsheets and phone calls.
              We build the visibility that gets you out of firefighting mode.
            </motion.p>

            {/* Stat Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-6 sm:mb-8"
            >
              {[
                { stat: "80%", label: "Time recoverable" },
                { stat: "20%+", label: "More capacity without hiring" },
                { stat: "30 min", label: "Per 'Where's my order?' query" },
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
              <Button variant="secondary" size="lg" href="/assessments/manufacturing" className="w-full sm:w-auto min-h-[48px]">
                Take Readiness Assessment
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

      {/* Challenges - Compact Grid */}
      <section id="challenges" className="section scroll-mt-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm text-center"
          >
            Sound Familiar?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-8 sm:mb-12 text-center"
          >
            Where Time Disappears
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.challenges.slice(0, 4).map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 bg-white rounded-xl border border-black/10"
              >
                <p className="text-text-secondary text-sm sm:text-base">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions - Stacked Cards */}
      <section id="solutions" className="section scroll-mt-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
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
              Visibility That Runs Your Business
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Operational Visibility */}
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
                <h3 className="text-xl font-bold text-text-primary">See Everything in One Place</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Orders, production, shipments, quality. Answer &quot;Where&apos;s my order?&quot; in 30 seconds.
                At-risk orders flagged before they&apos;re late.
              </p>
              <ul className="space-y-2">
                {["Real-time order status", "Customer history without switching systems", "At-risk orders flagged early", "Quality tied to specific orders"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 2: Labor Productivity */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Do More With Your Team</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Your people spend hours on work that should take minutes. We automate the hunting.
                Your team runs operations instead of chasing data.
              </p>
              <ul className="space-y-2">
                {["Reports that generate themselves", "New hires find their own answers", "CSRs handle 3x more inquiries", "No more hunting through folders"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 3: Supply Chain */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text-primary">Supply Chain Visibility</h3>
              </div>
              <p className="text-text-secondary mb-4">
                Suppliers surprise you with delays. By the time you know, it&apos;s too late.
                We connect supplier data so you see what&apos;s at risk before it&apos;s late.
              </p>
              <ul className="space-y-2">
                {["At-risk deliveries flagged early", "Vendor performance tracked", "Production impact calculated", "Proactive customer alerts"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Card 4: Privacy */}
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
                <h3 className="text-xl font-bold">AI That Stays Private</h3>
              </div>
              <p className="text-slate-300 mb-4">
                Your costs and margins are competitive advantage. Most AI tools want to send it to their cloud.
                We run everything on your equipment. Your data never leaves.
              </p>
              <ul className="space-y-2">
                {["Everything stays in-house", "No contracts with OpenAI", "Complete audit trails", "Works with your existing ERP"].map((item, i) => (
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

      {/* ROI Calculator - Full Width */}
      <section id="roi-calculator" className="section scroll-mt-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ManufacturingROICalculator />
          </div>
        </div>
      </section>

      {/* FAQ - Accordion Style */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
              >
                You&apos;re Probably Wondering...
              </motion.h2>
            </div>

            <div className="space-y-3">
              {[
                {
                  question: "Our ERP already does this.",
                  answer: "Your ERP excels at transactions. We unlock the 'so what?' by combining ERP data with what it can't see: supplier performance and cross-system patterns that predict problems. We read from your ERP, we don't replace it."
                },
                {
                  question: "We don't have IT staff to manage this.",
                  answer: "Most manufacturers your size don't. That's exactly who we built this for. We handle the technical work. Your plant managers use the applications."
                },
                {
                  question: "Implementation will disrupt production.",
                  answer: "We read data. We don't write to your systems. Zero production impact. Applications appear when they're ready."
                },
                {
                  question: "How long does implementation take?",
                  answer: "Read-only connections in weeks 1-2. First live application by week 3-4. Full operational visibility by week 8-12. We read data, we don't write to your systems. Zero production impact. Works with NetSuite, Epicor, SAP Business One, Infor, JobBOSS, and Global Shop Solutions."
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-black/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-text-primary">&ldquo;{faq.question}&rdquo;</span>
                    <svg
                      className={`w-5 h-5 text-text-muted transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="p-5 pt-0 bg-white">
                      <p className="text-text-secondary">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides - Compact 3-up */}
      <section id="guides" className="section scroll-mt-32 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm"
            >
              Free Resources
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary"
            >
              Guides for Manufacturing Leaders
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {manufacturingGuides.slice(0, 3).map((guide, index) => (
              <motion.div
                key={guide.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className="block p-6 rounded-xl bg-white border border-black/10 hover:border-teal-500/30 hover:shadow-lg transition-all group h-full"
                >
                  <div className="flex items-center gap-2 text-teal-500 text-xs font-medium mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Free Guide
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">{guide.description}</p>
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
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Ready to stop firefighting?"
        description="Schedule a call to talk through your specific situation, or take our 5-minute assessment to see where you stand."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/manufacturing" }}
        variant="gradient"
      />
    </>
  );
}
