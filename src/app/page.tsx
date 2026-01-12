"use client";

import { motion, AnimatePresence } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Hero, Features, CTA } from "@/components/sections";
import { Badge } from "@/components/ui";
import Link from "next/link";
import { caseStudies } from "@/lib/case-studies-data";
import { blogPosts } from "@/lib/blog-data";
import { testimonials } from "@/lib/case-studies-data";
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


// Featured Content Carousel Component with Stats
function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);


  // Combine case studies and blog posts into featured items
  // Build featured items: specific order for first two, then remaining shuffled
  const allCaseStudyItems = caseStudies.map((study) => ({
    type: "case-study" as const,
    slug: study.slug,
    title: study.title,
    description: study.challengeBrief,
    image: study.thumbnail,
    badge: study.industry,
    highlight: study.resultHighlight,
    href: `/case-studies/${study.slug}`,
  }));

  const allBlogItems = blogPosts.map((post) => ({
    type: "blog" as const,
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    badge: post.category,
    highlight: `${post.readingTime} min read`,
    href: `/blog/${post.slug}`,
  }));

  const allItems = [...allCaseStudyItems, ...allBlogItems];

  // First two in specific order
  const prioritySlugs = ["ai-augmented-onshore-vs-offshore", "army-of-ai-agents"];
  const priorityItems = prioritySlugs
    .map((slug) => allItems.find((item) => item.slug === slug))
    .filter(Boolean) as typeof allItems;

  // Remaining items in original order
  const remainingItems = allItems.filter((item) => !prioritySlugs.includes(item.slug));

  const featuredItems = [...priorityItems, ...remainingItems];

  // Auto-rotate
  useEffect(() => {
    if (!isInView || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isInView, isPaused, featuredItems.length]);

  // Scroll to keep current item visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = container.children[currentIndex] as HTMLElement;
      if (activeButton) {
        const containerTop = container.scrollTop;
        const containerBottom = containerTop + container.clientHeight;
        const itemTop = activeButton.offsetTop;
        const itemBottom = itemTop + activeButton.offsetHeight;

        if (itemTop < containerTop) {
          container.scrollTo({ top: itemTop, behavior: "smooth" });
        } else if (itemBottom > containerBottom) {
          container.scrollTo({ top: itemBottom - container.clientHeight, behavior: "smooth" });
        }
      }
    }
  }, [currentIndex]);

  const currentItem = featuredItems[currentIndex];

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  return (
    <motion.section
      className="section bg-[#F8F9FA]"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
      viewport={{ amount: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-text-primary"
          >
            See how we deliver results
          </motion.h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
            {/* Main Featured Item */}
            <div className="lg:col-span-3 order-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.slug}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full"
                >
                  <Link
                    href={currentItem.href}
                    className="group block h-full rounded-2xl overflow-hidden bg-white border border-black/10 hover:border-teal-500/50 transition-all duration-300"
                  >
                    {currentItem.image && (
                      <div className="aspect-[4/3] sm:aspect-[16/9] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={currentItem.image}
                          alt={currentItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wide ${
                          currentItem.type === "case-study"
                            ? "bg-teal-500/10 text-teal-600"
                            : "bg-purple-500/10 text-purple-600"
                        }`}>
                          {currentItem.type === "case-study" ? "Case Study" : "Blog"}
                        </span>
                        <Badge variant="outline">{currentItem.badge}</Badge>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3 group-hover:text-teal-500 transition-colors">
                        {currentItem.title}
                      </h3>

                      <p className="text-text-secondary mb-4 line-clamp-2">
                        {currentItem.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${
                          currentItem.type === "case-study" ? "text-gradient text-lg" : "text-text-muted text-sm"
                        }`}>
                          {currentItem.highlight}
                        </span>
                        <span className="flex items-center gap-2 text-teal-500 font-medium text-sm group-hover:gap-3 transition-all">
                          Read more
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar with thumbnails - hidden on mobile for cleaner UX */}
            <div className="hidden lg:flex lg:col-span-2 flex-col lg:max-h-[650px] order-3">
              <div ref={scrollContainerRef} className="flex flex-col gap-3 overflow-y-auto pr-2 scrollbar-thin flex-1 min-h-0">
              {featuredItems.map((item, index) => (
                <button
                  key={item.slug}
                  onClick={() => goToSlide(index)}
                  className={`flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-teal-500/10 border-2 border-teal-500"
                      : "bg-white border-2 border-transparent hover:border-black/10"
                  }`}
                >
                  {item.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      item.type === "case-study" ? "text-teal-600" : "text-purple-600"
                    }`}>
                      {item.type === "case-study" ? "Case Study" : "Blog"}
                    </span>
                    <h4 className={`font-medium text-sm line-clamp-2 ${
                      index === currentIndex ? "text-text-primary" : "text-text-secondary"
                    }`}>
                      {item.title}
                    </h4>
                  </div>
                  {index === currentIndex && (
                    <div className="w-1 h-8 bg-teal-500 rounded-full flex-shrink-0" />
                  )}
                </button>
              ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/10">
                <div className="flex gap-2">
                  <button
                    onClick={goToPrev}
                    className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <div className="flex gap-4">
                  <Link href="/case-studies" className="text-sm text-text-muted hover:text-teal-500 transition-colors">
                    All Case Studies
                  </Link>
                  <Link href="/blog" className="text-sm text-text-muted hover:text-teal-500 transition-colors">
                    All Posts
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation - only visible on mobile */}
          <div className="flex lg:hidden items-center justify-between mt-4 pt-4 border-t border-black/10">
            <div className="flex gap-3">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500 transition-colors active:scale-95"
                aria-label="Previous item"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center text-text-secondary hover:text-teal-500 hover:border-teal-500 transition-colors active:scale-95"
                aria-label="Next item"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-text-muted">
              {currentIndex + 1} / {featuredItems.length}
            </div>
            <div className="flex gap-4">
              <Link href="/case-studies" className="text-sm text-text-muted hover:text-teal-500 transition-colors">
                Case Studies
              </Link>
              <Link href="/blog" className="text-sm text-text-muted hover:text-teal-500 transition-colors">
                Blog
              </Link>
            </div>
          </div>

          {/* Progress bar - larger touch targets on mobile */}
          <div className="mt-4 lg:mt-6 flex gap-1.5 lg:gap-1">
            {featuredItems.map((_, index) => (
              <div
                key={index}
                className="h-2 lg:h-1 flex-1 rounded-full bg-black/20 overflow-hidden cursor-pointer"
                onClick={() => goToSlide(index)}
              >
                <motion.div
                  className="h-full bg-teal-500"
                  initial={{ width: "0%" }}
                  animate={{
                    width: index === currentIndex ? "100%" : index < currentIndex ? "100%" : "0%",
                  }}
                  transition={{
                    duration: index === currentIndex && !isPaused ? 5 : 0.3,
                    ease: "linear",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
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
        "Connect siloed systems. Clean messy records. Build a single source of truth you can rely on.",
      icon: <DataIcon />,
      href: "/services",
    },
    {
      title: "See what's happening",
      description:
        "Dashboards that answer what your CFO asks. Reports that update themselves. Visibility across your whole operation.",
      icon: <ChartIcon />,
      href: "/services",
    },
    {
      title: "Work smarter with AI",
      description:
        "AI that gives accurate answers. Automation that frees up hours each week. Systems that learn from your corrections.",
      icon: <AIIcon />,
      href: "/services",
    },
  ];

  const differentiators = [
    {
      title: "AI-Augmented Team",
      description:
        "Every consultant and developer has integrated AI into their workflow. Humans handle strategy and judgment. AI handles the grunt work. You get enterprise-quality delivery at a fraction of traditional consulting costs.",
      icon: <UsersIcon />,
    },
    {
      title: "AI That Works",
      description:
        "AI analytics that give accurate answers—because we fix the data first. Most AI projects fail on bad data. Ours don't.",
      icon: <LightbulbIcon />,
    },
    {
      title: "From Insight to Action",
      description:
        "We don't stop at dashboards. We wire insights into your daily operations—automated alerts, triggered workflows, decisions that happen without you.",
      icon: <CogIcon />,
    },
    {
      title: "Regulated-Ready",
      description:
        "HIPAA, GDPR, SOC 2—compliance built in from day one. We've done this in healthcare, legal, and finance. We know what auditors look for.",
      icon: <ShieldIcon />,
    },
  ];

  // Lottie animation setup
  const [animationData, setAnimationData] = useState(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    fetch("/animations/hero-data.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Failed to load Lottie animation:", error));
  }, []);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.25);
    }
  }, [animationData]);

  return (
    <>
      {/* 1. Hero Section */}
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

      {/* 2. What We Do Section */}
      <Features
        subtitle="What We Do"
        title="Three capabilities. One partner."
        features={capabilities}
        columns={3}
      />

      {/* 3. Results & Case Studies */}
      <FeaturedCarousel />

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
