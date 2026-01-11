"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Button } from "@/components/ui";
import { LottieWrapper } from "@/components/animations";
import { blogPosts } from "@/lib/blog-data";
import { caseStudies } from "@/lib/case-studies-data";

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
  const recentPosts = blogPosts.slice(0, 3);
  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured).slice(0, 2);
  const [lottieData, setLottieData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/student.json")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch(() => setLottieData(null));
  }, []);

  return (
    <>
      {/* Hero with Lottie */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-60" />
        <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-40" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-6"
              >
                Tools, insights, and proof
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8"
              >
                Assessments to diagnose your situation. Case studies that show what&apos;s possible. Articles that cut through the hype.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button variant="primary" size="lg" href="/assessments">
                  Take Free Assessment
                </Button>
                <Button variant="secondary" size="lg" href="/case-studies">
                  View Case Studies
                </Button>
              </motion.div>
            </div>

            {lottieData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-md">
                  <LottieWrapper
                    animationData={lottieData}
                    loop={true}
                    playOnView={true}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            )}
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

      {/* Featured Case Studies */}
      <section className="section">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              >
                Featured Case Studies
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCaseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group block p-8 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <span className="inline-block px-3 py-1 text-sm bg-teal-500/10 text-teal-500 rounded-full mb-4">
                    {caseStudy.industry}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-teal-500 transition-colors">
                    {caseStudy.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {caseStudy.challengeBrief}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-teal-500">
                      {caseStudy.resultHighlight}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-text-primary mb-2"
              >
                Latest from the Blog
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-6 rounded-2xl bg-white border border-black/10 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
                >
                  <span className="inline-block px-3 py-1 text-xs bg-black/5 text-text-muted rounded-full mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
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
