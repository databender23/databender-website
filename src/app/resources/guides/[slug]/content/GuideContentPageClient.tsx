"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import type { Guide } from "@/lib/lead-magnets-data";
import type { GuideContent } from "@/lib/guide-content-data";

interface Props {
  guide: Guide;
  guideContent: GuideContent;
}

export default function GuideContentPageClient({ guide, guideContent }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-teal-500/5">
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-40" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <Link
                href="/industries/legal"
                className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
              >
                Legal Resources
              </Link>
              <span className="text-text-muted">/</span>
              <Link
                href={`/resources/guides/${guide.slug}`}
                className="text-text-secondary hover:text-teal-500 transition-colors text-sm"
              >
                {guide.title}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-600 rounded-full text-sm font-medium mb-4"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Free Guide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-3"
            >
              {guideContent.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-muted mb-6"
            >
              {guideContent.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-4"
            >
              <a
                href={guideContent.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-[#1A1A1A] transition-colors shadow-lg hover:shadow-teal-500/25"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
              <span className="text-text-muted text-sm">5 min read</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto prose-content"
            dangerouslySetInnerHTML={{ __html: guideContent.content }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-text-primary mb-4"
            >
              Ready to Multiply Your Associates?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary mb-8"
            >
              See what AI-powered workflows could look like for your firm.
              No pressure, no sales pitch. Just a conversation about possibilities.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button variant="primary" href="/contact">
                Schedule a Conversation
              </Button>
              <Button variant="secondary" href="/industries/legal">
                Explore Legal Solutions
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
