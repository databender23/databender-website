"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Hero, CTA } from "@/components/sections";
import { Badge } from "@/components/ui";
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
      <Hero
        subtitle="Blog"
        title="Insights & Ideas"
        description="Practical insights on data management, AI implementation, and business intelligence from our team."
      />

      <section className="section">
        <div className="container mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className="group block h-full p-6 rounded-2xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/50 transition-all duration-300"
                >
                  {post.featuredImage && (
                    <div className="aspect-video rounded-lg bg-white mb-4 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="teal">{post.category}</Badge>
                    {post.featured && <Badge variant="outline">Featured</Badge>}
                  </div>

                  <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-teal-500 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-text-muted">
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
