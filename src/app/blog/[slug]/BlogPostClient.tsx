"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge, Button } from "@/components/ui";
import { CTA } from "@/components/sections";
import { getRecentPosts } from "@/lib/blog-data";
import type { BlogPost } from "@/types";

interface Props {
  post: BlogPost;
}

export default function BlogPostClient({ post }: Props) {
  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== post.slug).slice(0, 2);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-[#F8F9FA] to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-text-secondary hover:text-teal-500 transition-colors mb-6"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="teal">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-text-secondary">
                <span>{post.author}</span>
                <span className="w-1 h-1 rounded-full bg-text-muted" />
                <span>{formatDate(post.publishedAt)}</span>
                <span className="w-1 h-1 rounded-full bg-text-muted" />
                <span>{post.readingTime} min read</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="aspect-video rounded-2xl overflow-hidden bg-[#F8F9FA]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section pt-0">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-teal-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-blockquote:border-teal-500 prose-blockquote:text-text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 border-t border-black/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-text-muted">Tags:</span>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {recentPosts.length > 0 && (
        <section className="section bg-[#F8F9FA]">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {recentPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-6 rounded-xl bg-white border border-black/10 hover:border-teal-500/50 transition-all"
                >
                  <Badge variant="teal" className="mb-3">{relatedPost.category}</Badge>
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-teal-500 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-text-secondary text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="secondary" href="/blog">
                View All Posts
              </Button>
            </div>
          </div>
        </section>
      )}

      <CTA
        title="Have a data challenge?"
        description="Let's discuss how we can help transform your data into business value."
        primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
        secondaryCta={{ label: "Take Assessment", href: "/assessments/data-ai-readiness" }}
        variant="gradient"
      />
    </>
  );
}
