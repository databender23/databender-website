"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui";
import { EmailCaptureForm } from "@/components/forms";
import { legalGuides, type Guide } from "@/lib/lead-magnets-data";
import { getGuideContentBySlug } from "@/lib/guide-content-data";

// Icon components for topic bullets
const IconCheck = () => (
  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface Props {
  guide: Guide;
}

export default function GuidePageClient({ guide }: Props) {
  const guideContent = getGuideContentBySlug(guide.slug);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />
        <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-40" />

        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Guide Info */}
            <div>
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
                <span className="text-teal-500 text-sm font-medium">Free Guide</span>
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
                Free Download
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-3"
              >
                {guide.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-muted mb-6"
              >
                {guide.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-text-secondary text-lg leading-relaxed mb-8"
              >
                {guide.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-text-primary mb-4">
                  What&apos;s inside:
                </h3>
                <ul className="space-y-3">
                  {guide.topics.map((topic, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IconCheck />
                      <span className="text-text-secondary">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 text-sm text-text-muted"
              >
                Written for: {guide.targetAudience}
              </motion.p>
            </div>

            {/* Right - Download Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-2xl border border-black/10 shadow-lg sticky top-24"
            >
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Get Your Free Copy
              </h3>
              <p className="text-text-secondary mb-6">
                Enter your details and we&apos;ll send it right over.
              </p>

              <EmailCaptureForm
                formType="guide"
                resourceSlug={guide.slug}
                resourceTitle={guide.title}
                submitButtonText="Send Me the Guide"
                showCompanyField={true}
                showPhoneField={false}
                showMessageField={false}
                downloadUrl={guideContent?.pdfUrl}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof / Additional Info */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">15+</div>
                <div className="text-sm text-text-muted">Pages of insights</div>
              </div>
              <div className="w-px h-12 bg-black/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">5 min</div>
                <div className="text-sm text-text-muted">Read time</div>
              </div>
              <div className="w-px h-12 bg-black/10" />
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient">100%</div>
                <div className="text-sm text-text-muted">Actionable</div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-text-secondary"
            >
              No fluff, no endless theory. Just practical strategies you can
              implement this week. Based on real results from firms like yours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Other Guides */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            More Resources for Legal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {legalGuides
              .filter((g) => g.slug !== guide.slug)
              .slice(0, 3)
              .map((otherGuide, index) => (
                <motion.div
                  key={otherGuide.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={`/resources/guides/${otherGuide.slug}`}
                    className="block p-6 rounded-xl bg-[#F8F9FA] border border-black/10 hover:border-teal-500/30 transition-all group"
                  >
                    <div className="text-teal-500 text-xs font-medium mb-2">
                      Free Guide
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-teal-500 transition-colors mb-2">
                      {otherGuide.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {otherGuide.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="secondary" href="/industries/legal">
              View All Legal Resources
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
