"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTA } from "@/components/sections";
import { Badge } from "@/components/ui";
import { ResponsiveAnimation, DataVisualizationAnimation } from "@/components/animations";
import { blogPosts, blogCategories } from "@/lib/blog-data";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                Blog
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4 sm:mb-6"
              >
                Insights & Ideas
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8"
              >
                Practical insights on data management, AI implementation, and business intelligence from our team.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center lg:col-span-2"
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <ResponsiveAnimation
                  lottieUrl="/animations/man-robot-workplace.json"
                  MobileComponent={DataVisualizationAnimation}
                  className="w-full aspect-square"
                  loop={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 sm:py-2 rounded-full text-sm font-medium transition-all min-h-[44px] ${
                  selectedCategory === category
                    ? "bg-teal-500 text-white"
                    : "bg-black/5 text-text-secondary hover:bg-black/10 hover:text-text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full p-4 sm:p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300"
                >
                  {post.featuredImage && (
                    <div className="aspect-video rounded-lg bg-white mb-3 sm:mb-4 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                    <Badge variant="teal">{post.category}</Badge>
                    {post.featured && <Badge variant="outline">Featured</Badge>}
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary text-sm mb-3 sm:mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs sm:text-sm text-text-muted">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text-secondary text-lg">
                No posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTA
        title="Want insights delivered to your inbox?"
        description="Subscribe to get our latest articles on data, AI, and business intelligence."
        primaryCta={{ label: "Contact Us", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
