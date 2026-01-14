"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Features, CTA } from "@/components/sections";
import { Badge, Button } from "@/components/ui";
import { FloatingNodes } from "@/components/animations";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";
import { testimonials } from "@/lib/case-studies-data";
import { CaseStudyDiagram } from "@/components/case-studies/CaseStudyDiagrams";
import { useState, useEffect } from "react";
import { preloadLottie } from "@/components/animations/LottieWrapper";
import { HeroLottie } from "@/components/animations";

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


// Results Grid - Show all case studies with animated diagrams
function ResultsGrid() {
  // Get case studies with diagram types (ordered by impact)
  const featuredStudies = caseStudies.filter(study => study.diagramType);

  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
          >
            Real Results
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary"
          >
            See how we deliver results
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/case-studies/${study.slug}`}
                className="group block h-full rounded-2xl overflow-hidden bg-white border border-black/10 hover:border-teal-500/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Animated Diagram */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {study.diagramType && (
                    <CaseStudyDiagram
                      type={study.diagramType}
                      compact={true}
                      interactive={false}
                      className="w-full h-full"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Hero Metric Callout */}
                  {study.heroMetric && (
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl sm:text-3xl font-bold text-gradient">
                        {study.heroMetric.value}
                      </span>
                      <span className="text-sm font-medium text-text-secondary">
                        {study.heroMetric.label}
                      </span>
                    </div>
                  )}

                  {/* Industry Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-600">
                      {study.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-teal-600 transition-colors">
                    {study.title}
                  </h3>

                  {/* Problem Statement */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {study.challengeBrief}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
                    Read the story
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-text-muted hover:text-teal-500 transition-colors font-medium"
          >
            View all case studies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Social Proof Carousel Component
function SocialProofSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isInView || isPaused || isExpanded) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isInView, isPaused, isExpanded]);

  // Reset expanded state when slide changes
  useEffect(() => {
    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => setIsExpanded(false));
  }, [currentSlide]);

  const currentTestimonial = testimonials[currentSlide];
  const isLongQuote = currentTestimonial.quote.length > 200;

  return (
    <motion.section
      className="section"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
          >
            Client Success
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-text-primary"
          >
            What our clients say
          </motion.h2>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 md:p-12 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mb-4 sm:mb-6 leading-relaxed">
                &quot;{currentTestimonial.highlight}&quot;
              </p>

              <motion.div
                initial={false}
                animate={{ height: "auto" }}
                className="overflow-hidden"
              >
                <p className="text-text-secondary mb-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  {isExpanded || !isLongQuote
                    ? currentTestimonial.quote
                    : currentTestimonial.quote.substring(0, 200) + "..."}
                </p>

                {isLongQuote && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-teal-500 hover:text-teal-600 text-sm font-medium mb-4 inline-flex items-center gap-1 transition-colors"
                  >
                    {isExpanded ? (
                      <>
                        Show less
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Read full testimonial
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </motion.div>

              <div className="pt-4">
                <p className="font-semibold text-text-primary">{currentTestimonial.name}</p>
                <p className="text-sm text-text-muted">
                  {currentTestimonial.title}
                  {currentTestimonial.company && `, ${currentTestimonial.company}`}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots - larger touch targets on mobile */}
          <div className="flex justify-center gap-3 sm:gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`h-3 sm:h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-teal-500 w-10 sm:w-8"
                    : "bg-black/20 hover:bg-black/40 w-3 sm:w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function HomePage() {
  const capabilities = [
    {
      title: "Get your data in order",
      description:
        "We connect, clean, and organize so you can leverage the full power of data & AI.",
      icon: <DataIcon />,
      href: "/services",
    },
    {
      title: "See what's happening",
      description:
        "Stop guessing what's working. Analytics that reveal what actually drives results, not what you assume. Make decisions based on evidence, not gut feelings.",
      icon: <ChartIcon />,
      href: "/services",
    },
    {
      title: "Work smarter with AI",
      description:
        "AI that knows your business, not just the internet. Ask questions in plain English. Automate tedious work. Get answers from your own data in seconds.",
      icon: <AIIcon />,
      href: "/services",
    },
  ];

  const differentiators = [
    {
      title: "AI-Augmented Team",
      description:
        "Senior consultants with AI integrated into every workflow. Strategy and judgment stay human. Repetitive work gets automated. Enterprise quality, boutique pricing.",
      icon: <UsersIcon />,
    },
    {
      title: "AI That Works",
      description:
        "AI that gives accurate answers—because we fix the data first. Most AI projects fail on bad data. We build on solid foundations, not wishful thinking.",
      icon: <LightbulbIcon />,
    },
    {
      title: "From Insight to Action",
      description:
        "We don't stop at dashboards. We wire insights into daily operations—automated alerts, triggered workflows, decisions that execute without you.",
      icon: <CogIcon />,
    },
    {
      title: "Regulated-Ready",
      description:
        "HIPAA, GDPR, SOC 2—compliance built in from day one. We've delivered in healthcare, legal, and finance. We know what auditors look for.",
      icon: <ShieldIcon />,
    },
  ];

  // Preload hero animation for faster initial render
  useEffect(() => {
    preloadLottie("/animations/hero-data.json");
  }, []);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />

        {/* Teal glow spots */}
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        {/* Floating nodes background */}
        <FloatingNodes nodeCount={20} showConnections={true} />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Lottie Animation - dynamically sized to fit viewport */}
          <HeroLottie
            lottieUrl="/animations/hero-data.json"
            className="mb-6"
            loop={false}
            heroTextHeight={280}
            maxSize={420}
            minSize={200}
          />

          {/* Hero Content */}
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Data Analytics & AI Solutions
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6"
            >
              Boutique Strategy. Enterprise Delivery.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              Databender empowers firms to work efficiently, compliantly, and intelligently using data and AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
            >
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
                Take free assessment
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                Schedule Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. What We Do Section */}
      <Features
        subtitle="What We Do"
        title="Three capabilities. One partner."
        features={capabilities}
        columns={3}
      />

      {/* 3. Results & Case Studies */}
      <ResultsGrid />

      {/* 4. Why Us Section */}
      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {differentiators.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-5 sm:p-6 rounded-xl bg-[#F8F9FA] border border-black/10 text-center"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 mb-3 sm:mb-4 mx-auto flex items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Social Proof */}
      <SocialProofSection />

      {/* 6. Final CTA */}
      <CTA
        title="Ready to see what's possible?"
        description="30 minutes. We'll talk about your situation and see if we can help."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment First", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
