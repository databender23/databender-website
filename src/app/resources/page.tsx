"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { ResponsiveAnimation, StudentAnimation } from "@/components/animations";
import { blogPosts } from "@/lib/blog-data";
import { caseStudies } from "@/lib/case-studies-data";
import { CaseStudyDiagram } from "@/components/case-studies/CaseStudyDiagrams";

const ResourceIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, React.ReactNode> = {
    "case-study": (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    assessment: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    blog: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    guide: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  };

  return <>{icons[icon] || icons["case-study"]}</>;
};

const resourceCategories = [
  {
    title: "Case Studies",
    description: "See how we've helped companies like yours solve data challenges and implement AI.",
    icon: "case-study",
    href: "/case-studies",
    count: caseStudies.length,
    countLabel: "case studies",
  },
  {
    title: "Assessments",
    description: "Free diagnostic tools to understand your data maturity and AI readiness.",
    icon: "assessment",
    href: "/assessments",
    count: 3,
    countLabel: "assessments",
  },
  {
    title: "Blog",
    description: "Practical insights on data strategy, AI implementation, and industry trends.",
    icon: "blog",
    href: "/blog",
    count: blogPosts.length,
    countLabel: "articles",
  },
  {
    title: "Guides",
    description: "In-depth resources for law firms on knowledge management, BD, and technology.",
    icon: "guide",
    href: "/industries/legal#guides",
    count: 4,
    countLabel: "guides",
  },
];

export default function ResourcesPage() {
  const [blogIndex, setBlogIndex] = useState(0);
  const [blogPaused, setBlogPaused] = useState(false);

  // Get case studies with diagram types
  const featuredStudies = caseStudies.filter(study => study.diagramType);

  // Auto-rotate blog posts
  useEffect(() => {
    if (blogPaused) return;
    const timer = setInterval(() => {
      setBlogIndex((prev) => (prev + 1) % blogPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [blogPaused]);

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 md:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Resources
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
              >
                Tools, insights, and proof
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              >
                Assessments to diagnose your situation. Case studies that show what&apos;s possible. Articles that cut through the hype.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              >
                <Button variant="primary" size="lg" href="/assessments">
                  Take Free Assessment
                </Button>
                <Button variant="secondary" size="lg" href="/case-studies">
                  View Case Studies
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center lg:col-span-2"
            >
              <div className="w-full max-w-md">
                <ResponsiveAnimation
                  lottieUrl="/animations/student.json"
                  MobileComponent={StudentAnimation}
                  className="w-full aspect-square"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group block p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-500/10 text-teal-500 mb-4">
                    <ResourceIcon icon={category.icon} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    {category.description}
                  </p>
                  <span className="text-teal-500 text-sm font-medium">
                    {category.count} {category.countLabel} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies Grid */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              >
                Case Studies
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary"
              >
                Real results from real projects
              </motion.p>
            </div>
            <Button variant="secondary" href="/case-studies">
              View All
            </Button>
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
                  className="group block h-full rounded-2xl overflow-hidden bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 hover:shadow-lg transition-all duration-300"
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
        </div>
      </section>

      {/* Blog Posts Carousel */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              >
                Blog
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-text-secondary"
              >
                Practical insights, no fluff
              </motion.p>
            </div>
            <Button variant="secondary" href="/blog">
              View All
            </Button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setBlogPaused(true)}
            onMouseLeave={() => setBlogPaused(false)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Main Featured Item */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={blogPosts[blogIndex].slug}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Link
                      href={`/blog/${blogPosts[blogIndex].slug}`}
                      className="group block rounded-2xl bg-white border border-black/10 hover:border-teal-500/50 transition-all duration-300 overflow-hidden"
                    >
                      {blogPosts[blogIndex].featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blogPosts[blogIndex].featuredImage}
                            alt={blogPosts[blogIndex].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block px-3 py-1 text-xs bg-purple-500/10 text-purple-600 rounded-full">
                            {blogPosts[blogIndex].category}
                          </span>
                          <span className="text-text-muted text-sm">
                            {blogPosts[blogIndex].readingTime} min read
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-teal-500 transition-colors">
                          {blogPosts[blogIndex].title}
                        </h3>
                        <p className="text-text-secondary line-clamp-2">
                          {blogPosts[blogIndex].excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sidebar Navigation */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {blogPosts.map((post, index) => (
                  <button
                    key={post.slug}
                    onClick={() => setBlogIndex(index)}
                    className={`flex items-center gap-4 p-3 rounded-xl text-left transition-all duration-300 ${
                      index === blogIndex
                        ? "bg-purple-500/10 border-2 border-purple-500"
                        : "bg-white border-2 border-transparent hover:border-black/10"
                    }`}
                  >
                    {post.featuredImage && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                        {post.category}
                      </span>
                      <h4 className={`font-medium text-sm line-clamp-2 ${
                        index === blogIndex ? "text-text-primary" : "text-text-secondary"
                      }`}>
                        {post.title}
                      </h4>
                    </div>
                    {index === blogIndex && (
                      <div className="w-1 h-8 bg-purple-500 rounded-full flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 flex gap-1">
              {blogPosts.map((_, index) => (
                <div
                  key={index}
                  className="h-1 flex-1 rounded-full bg-black/20 overflow-hidden cursor-pointer"
                  onClick={() => setBlogIndex(index)}
                >
                  <motion.div
                    className="h-full bg-purple-500"
                    initial={{ width: "0%" }}
                    animate={{
                      width: index === blogIndex ? "100%" : index < blogIndex ? "100%" : "0%",
                    }}
                    transition={{
                      duration: index === blogIndex && !blogPaused ? 5 : 0.3,
                      ease: "linear",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Not sure where to start?"
        description="Take our free assessment to understand your data maturity and AI readiness. No sales pitch, just practical guidance."
        primaryCta={{ label: "Take Free Assessment", href: "/assessments" }}
        secondaryCta={{ label: "Schedule a Call", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
