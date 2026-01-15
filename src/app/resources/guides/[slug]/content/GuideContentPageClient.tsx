"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { legalGuides, healthcareGuides, manufacturingGuides, creGuides, type Guide } from "@/lib/lead-magnets-data";
import type { GuideContent } from "@/lib/guide-content-data";

// Helper to determine guide industry
function getGuideIndustry(slug: string): { name: string; href: string } {
  if (legalGuides.some(g => g.slug === slug)) {
    return { name: "Legal Resources", href: "/industries/legal" };
  }
  if (healthcareGuides.some(g => g.slug === slug)) {
    return { name: "Healthcare Resources", href: "/industries/healthcare" };
  }
  if (manufacturingGuides.some(g => g.slug === slug)) {
    return { name: "Manufacturing Resources", href: "/industries/manufacturing" };
  }
  if (creGuides.some(g => g.slug === slug)) {
    return { name: "Commercial Real Estate Resources", href: "/industries/commercial-real-estate" };
  }
  return { name: "Resources", href: "/resources" };
}

interface Props {
  guide: Guide;
  guideContent: GuideContent;
}

export default function GuideContentPageClient({ guide, guideContent }: Props) {
  const industry = getGuideIndustry(guide.slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean and minimal */}
      <section className="relative border-b border-gray-100">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-2xl mx-auto">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mb-8 text-sm"
            >
              <Link
                href={industry.href}
                className="text-text-muted hover:text-teal-500 transition-colors"
              >
                {industry.name}
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-text-muted truncate">{guide.title}</span>
            </motion.nav>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                Free Guide
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-text-primary mb-4 leading-[1.15]"
            >
              {guideContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed"
            >
              {guideContent.subtitle}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6"
            >
              <a
                href={guideContent.pdfUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-primary text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="max-w-2xl mx-auto prose-content"
            dangerouslySetInnerHTML={{ __html: guideContent.content }}
          />

          {/* End mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mt-16 flex justify-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gray-200" />
              <div className="w-2 h-2 bg-teal-500 rounded-full" />
              <div className="w-8 h-px bg-gray-200" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 border border-gray-100">
              <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
                Next Step
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">
                See what this looks like for your firm
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                30 minutes. We&apos;ll look at what you&apos;re dealing with and show you what&apos;s possible. No pitch deck, no pressure.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button variant="primary" href="/contact">
                  Schedule a Conversation
                </Button>
                <a
                  href={guideContent.pdfUrl}
                  className="text-text-muted hover:text-teal-500 text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>

            {/* Branding footer */}
            <div className="mt-12 text-center">
              <p className="text-sm text-text-muted">
                <span className="font-semibold text-text-primary">databender</span>
                <span className="mx-2 text-gray-300">|</span>
                Data & AI Consulting for Growing Businesses
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
