"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Badge, Button } from "@/components/ui";
import { LottieWrapper } from "@/components/animations";
import { CaseStudyThumbnail } from "@/components/case-studies";
import {
  testimonials,
  industryFilters,
  challengeFilters,
  serviceFilters,
  filterCaseStudies,
} from "@/lib/case-studies-data";

export default function CaseStudiesPage() {
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [challengeFilter, setChallengeFilter] = useState("All Challenges");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [lottieData, setLottieData] = useState<object | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const ROTATE_INTERVAL = 4000; // 4 seconds

  // Auto-rotate testimonials when in view and not paused
  useEffect(() => {
    if (!isInView || isPaused) {
      return;
    }

    const rotateTimeout = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, ROTATE_INTERVAL);

    return () => {
      clearTimeout(rotateTimeout);
    };
  }, [isInView, isPaused, currentSlide]);

  const handleSlideChange = (newSlide: number) => {
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    fetch("/animations/growth-chart.json")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => setLottieData(null));
  }, []);

  const filteredStudies = filterCaseStudies(industryFilter, challengeFilter, serviceFilter);
  const hasActiveFilters = industryFilter !== "All Industries" || challengeFilter !== "All Challenges" || serviceFilter !== "All Services";

  const clearFilters = () => {
    setIndustryFilter("All Industries");
    setChallengeFilter("All Challenges");
    setServiceFilter("All Services");
  };

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Lottie Animation - Above on desktop, below on mobile */}
            {lottieData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm mb-8 order-last md:order-first mt-8 md:mt-0"
              >
                <LottieWrapper
                  animationData={lottieData}
                  loop={true}
                  autoplay={true}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Case Studies
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
            >
              Results that speak for themselves
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            >
              Real projects. Measurable results. See how companies went from data chaos to clarity and what it meant for their business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button variant="primary" size="lg" href="/contact">
                Schedule Consultation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text-primary mb-6"
          >
            Find relevant stories
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">By Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {industryFilters.map((filter) => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>

            {/* Challenge Filter */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">By Challenge</label>
              <select
                value={challengeFilter}
                onChange={(e) => setChallengeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {challengeFilters.map((filter) => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">By Service</label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-black/10 bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {serviceFilters.map((filter) => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-teal-500 hover:text-teal-600 font-medium transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-text-primary mb-8"
          >
            {hasActiveFilters ? `${filteredStudies.length} matching ${filteredStudies.length === 1 ? 'story' : 'stories'}` : 'Featured success stories'}
          </motion.h2>

          {filteredStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg mb-4">No case studies match your filters.</p>
              <Button variant="secondary" onClick={clearFilters}>Clear filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group block h-full p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    {(study.diagramType || study.thumbnail) && (
                      <div className="aspect-video rounded-lg bg-white mb-4 overflow-hidden">
                        {study.diagramType ? (
                          <CaseStudyThumbnail
                            type={study.diagramType}
                            title={study.title}
                            heroMetric={study.heroMetric}
                          />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={study.thumbnail}
                            alt={study.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="teal">{study.industry}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors line-clamp-2">
                      {study.title}
                    </h3>

                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                      {study.challengeBrief}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold text-gradient">
                        {study.resultHighlight}
                      </span>
                      <svg
                        className="w-5 h-5 text-teal-500 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 bg-[#F8F9FA]"
        onViewportEnter={() => setIsInView(true)}
        onViewportLeave={() => setIsInView(false)}
        viewport={{ amount: 0.3 }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
              What our clients say
            </h2>
          </div>

          <div
            className="max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl border border-black/10 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 h-auto md:h-[420px]">
                  {/* Left Column - Highlight & Attribution */}
                  <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-teal-500/5 to-transparent overflow-hidden">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center mb-4">
                        <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-text-primary text-lg md:text-xl font-semibold leading-snug mb-6">
                        &quot;{testimonials[currentSlide].highlight}&quot;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/10">
                      <p className="font-semibold text-text-primary">{testimonials[currentSlide].name}</p>
                      <p className="text-sm text-text-muted">{testimonials[currentSlide].title}</p>
                      {testimonials[currentSlide].company && (
                        <p className="text-sm text-teal-600 font-medium mt-1">{testimonials[currentSlide].company}</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Full Quote */}
                  <div className="md:col-span-3 p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-black/10 overflow-hidden">
                    <div className="flex-1 flex items-center overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin' }}>
                      <p
                        className="text-text-secondary italic leading-relaxed"
                        style={{
                          fontSize: testimonials[currentSlide].quote.length > 600
                            ? '0.875rem'
                            : testimonials[currentSlide].quote.length > 400
                              ? '0.95rem'
                              : '1rem',
                        }}
                      >
                        {testimonials[currentSlide].quote}
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-black/5 flex-shrink-0">
                      <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleSlideChange(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              currentSlide === index ? "bg-teal-500" : "bg-black/20 hover:bg-black/40"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSlideChange(currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1)}
                          className="w-8 h-8 rounded-full bg-[#F8F9FA] border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleSlideChange((currentSlide + 1) % testimonials.length)}
                          className="w-8 h-8 rounded-full bg-[#F8F9FA] border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500/50 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <CTA
        title="Could this work for you?"
        description="30 minutes. We'll talk through your situation and whether an approach like this makes sense."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take the Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
