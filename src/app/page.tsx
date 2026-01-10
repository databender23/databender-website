"use client";

import { motion } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Hero, Features, Stats, CTA } from "@/components/sections";
import { Card, Button } from "@/components/ui";
import { ROICalculator } from "@/components/interactive";
import { useState, useEffect, useRef } from "react";

// Icons for features
const DataIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Industry icons
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const FactoryIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default function HomePage() {
  const capabilities = [
    {
      title: "Get your data in order",
      description:
        "Connect scattered systems. Clean messy records. Build a foundation you can trust.",
      icon: <DataIcon />,
      href: "/services",
    },
    {
      title: "See what's happening",
      description:
        "Dashboards that answer real questions. Reports that run themselves. Visibility across your whole operation.",
      icon: <ChartIcon />,
      href: "/services",
    },
    {
      title: "Work smarter with AI",
      description:
        "AI that actually answers correctly. Automation that saves real hours. Intelligence that improves over time.",
      icon: <AIIcon />,
      href: "/services",
    },
  ];

  const differentiators = [
    {
      title: "Senior + Scale",
      description:
        "Senior experts guide your project. A 200-person team delivers it. Direct access to experienced consultants backed by capacity to execute quickly.",
      icon: <UsersIcon />,
    },
    {
      title: "AI That Works",
      description:
        "AI analytics that actually answer correctly—because we build the foundation first. Most AI projects fail because the data isn't ready.",
      icon: <LightbulbIcon />,
    },
    {
      title: "From Insight to Action",
      description:
        "We don't stop at dashboards. We automate decisions, trigger workflows, and integrate insights into your daily operations.",
      icon: <CogIcon />,
    },
    {
      title: "Regulated-Ready",
      description:
        "HIPAA, GDPR, SOC 2. Compliance built in from day one. If your industry requires it, we know how to build it right.",
      icon: <ShieldIcon />,
    },
  ];

  const industries = [
    {
      title: "Professional Services",
      description: "Knowledge management, client intelligence, firm analytics for law firms and consultancies.",
      icon: <BriefcaseIcon />,
      href: "/industries/professional-services",
    },
    {
      title: "Healthcare",
      description: "Operational visibility, multi-location analytics, and compliance for healthcare organizations.",
      icon: <HeartIcon />,
      href: "/industries/healthcare",
    },
    {
      title: "Commercial Real Estate",
      description: "Portfolio intelligence and unified visibility for property managers.",
      icon: <BuildingIcon />,
      href: "/industries/commercial-real-estate",
    },
    {
      title: "Manufacturing",
      description: "Sales intelligence and operational visibility for scale-up manufacturers.",
      icon: <FactoryIcon />,
      href: "/industries/manufacturing",
    },
  ];

  const stats = [
    { value: 125, suffix: "x", label: "Cost savings vs manual review" },
    { value: 21, suffix: "%", prefix: "+", label: "More qualified leads" },
    { value: 3, label: "Weeks to value" },
    { value: 100, suffix: "%", label: "Decision coverage" },
  ];

  // Lottie animation setup
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch("https://assets2.lottiefiles.com/packages/lf20_qp1q7mct.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Failed to load Lottie animation:", error));
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.30);
    }
  }, [animationData]);

  return (
    <>
      {/* Hero Section */}
      <Hero
        subtitle="Data Analytics & AI Solutions"
        title="Boutique Strategy. Enterprise Delivery."
        description="Databender empowers firms to work efficiently, compliantly, and intelligently using data and AI."
        primaryCta={{ label: "Take the Free Assessment", href: "/assessments/data-ai-readiness" }}
        secondaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        size="large"
        media={
          <div className="w-full max-w-lg">
            {animationData && (
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={true}
                renderer="svg"
                className="w-full h-auto"
              />
            )}
          </div>
        }
      />

      {/* What We Do Section */}
      <Features
        subtitle="What We Do"
        title="Three capabilities. One partner."
        features={capabilities}
        columns={3}
      />

      {/* Why Databender Section */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Why Databender
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary"
            >
              Why companies choose us
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-black/10"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Industries
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-4"
            >
              Experience in your industry
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-2xl mx-auto"
            >
              We&apos;ve solved data problems across healthcare, legal, real estate, and manufacturing. That cross-industry experience means we bring proven approaches—not experiments.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card
                key={index}
                title={industry.title}
                description={industry.description}
                icon={industry.icon}
                href={industry.href}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" href="/industries">
              See How We Help Your Industry
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <Stats
        subtitle="Results"
        title="Results that matter"
        stats={stats}
      />

      {/* ROI Calculator */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <ROICalculator />
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl bg-[#F8F9FA] border border-black/10"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                AI Entity Resolution
              </h3>
              <p className="text-text-secondary mb-6 text-lg italic">
                &quot;What would cost $25,000+ in analyst time, AI completed for ~$200—with every decision documented for audit.&quot;
              </p>
              <Button variant="ghost" href="/case-studies/ai-entity-resolution">
                Read Case Study
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-xl bg-[#F8F9FA] border border-black/10"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Custom Lead Scoring
              </h3>
              <p className="text-text-secondary mb-6 text-lg italic">
                &quot;Generic tools said home value mattered most. Our model discovered home equity, urgency, and local sales history are what actually predict conversions.&quot;
              </p>
              <Button variant="ghost" href="/case-studies/custom-lead-scoring">
                Read Case Study
              </Button>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" href="/case-studies">
              See All Case Studies
            </Button>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="section bg-gradient-to-br from-teal-500/10 via-white to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Not sure where to start?
            </h2>
            <p className="text-text-secondary text-lg md:text-xl mb-8">
              Take our free 2-minute assessment. We&apos;ll analyze your situation and show you exactly where to focus first.
            </p>
            <ul className="text-left max-w-md mx-auto mb-8 space-y-3">
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Personalized recommendations based on your answers
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Clarity on your biggest data gaps
              </li>
              <li className="flex items-start gap-3 text-text-secondary">
                <svg className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Suggested next steps—no obligation
              </li>
            </ul>
            <Button
              variant="primary"
              size="lg"
              href="/assessments/data-ai-readiness"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Take the Free Assessment
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Brief */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              About Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-text-primary mb-6"
            >
              Who we are
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg mb-8 whitespace-pre-line"
            >
              Databender is an AI and data consultancy that helps organizations do more with the teams they already have.{'\n\n'}We design and build data platforms, automation pipelines, and AI-powered tools that eliminate busywork, improve compliance, and enable better decisions — turning AI into an everyday operational advantage.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="secondary" href="/about">
                Learn More About Us
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA
        title="Ready to transform your data?"
        description="Schedule a 30-minute consultation. No pitch decks—just a conversation about your situation."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment First", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
