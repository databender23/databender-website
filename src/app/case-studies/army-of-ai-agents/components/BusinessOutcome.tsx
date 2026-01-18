'use client'

import { motion } from 'framer-motion'

interface BusinessOutcomeProps {
  className?: string
}

export default function BusinessOutcome({ className = '' }: BusinessOutcomeProps) {
  return (
    <div className={`${className}`}>
      {/* Three-column advantages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8"
      >
        {/* More Accurate Offers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-bg-primary rounded-lg md:rounded-xl border border-border p-4 md:p-6 shadow-sm"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-teal-50 flex items-center justify-center text-teal-500 mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="font-semibold text-text-primary text-base md:text-lg mb-1.5 md:mb-2">More Accurate Offers</h4>
          <p className="text-xs md:text-sm text-text-secondary mb-3 md:mb-4">
            Know exactly who owns what before making contact. No more sending offers to the wrong person or missing key owners.
          </p>

          {/* Accuracy comparison visual */}
          <div className="bg-bg-secondary rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between text-[10px] md:text-xs text-text-muted mb-1.5 md:mb-2">
              <span>Targeting Confidence</span>
              <span className="font-medium">Before → After</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="flex-1">
                <div className="h-1.5 md:h-2 bg-red-100 rounded-full overflow-hidden">
                  <div className="h-full w-[62%] bg-red-400 rounded-full" />
                </div>
                <p className="text-[10px] md:text-xs text-red-500 mt-0.5 md:mt-1">62%</p>
              </div>
              <svg className="w-3 h-3 md:w-4 md:h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="flex-1">
                <div className="h-1.5 md:h-2 bg-teal-100 rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-teal-500 rounded-full" />
                </div>
                <p className="text-[10px] md:text-xs text-teal-600 font-medium mt-0.5 md:mt-1">94%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Faster to Deals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-bg-primary rounded-lg md:rounded-xl border border-border p-4 md:p-6 shadow-sm"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-text-primary text-base md:text-lg mb-1.5 md:mb-2">Faster to Deals</h4>
          <p className="text-xs md:text-sm text-text-secondary mb-3 md:mb-4">
            Skip manual research. Data is ready on day one. Start outreach immediately instead of spending weeks cleaning data.
          </p>

          {/* Timeline comparison visual */}
          <div className="bg-bg-secondary rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between text-[10px] md:text-xs text-text-muted mb-2 md:mb-3">
              <span>Time to First Contact</span>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[10px] md:text-xs text-text-muted w-12 md:w-16">Before:</span>
                <div className="flex-1 flex items-center gap-0.5 md:gap-1">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex-1 h-2 md:h-3 bg-red-200 rounded" />
                  ))}
                </div>
                <span className="text-[10px] md:text-xs text-red-500 whitespace-nowrap">6 weeks</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[10px] md:text-xs text-text-muted w-12 md:w-16">After:</span>
                <div className="flex-1 flex items-center gap-0.5 md:gap-1">
                  <div className="w-6 md:w-8 h-2 md:h-3 bg-teal-500 rounded" />
                </div>
                <span className="text-[10px] md:text-xs text-teal-600 font-medium">Hours</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Track Ownership Changes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-bg-primary rounded-lg md:rounded-xl border border-border p-4 md:p-6 shadow-sm"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-purple-50 flex items-center justify-center text-purple-500 mb-3 md:mb-4">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h4 className="font-semibold text-text-primary text-base md:text-lg mb-1.5 md:mb-2">Track Ownership Changes</h4>
          <p className="text-xs md:text-sm text-text-secondary mb-3 md:mb-4">
            See when properties change hands before competitors. First-mover advantage on new deals.
          </p>

          {/* Change detection visual */}
          <div className="bg-bg-secondary rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between text-[10px] md:text-xs text-text-muted mb-2 md:mb-3">
              <span>Change Detection</span>
              <span className="px-1.5 py-0.5 bg-green-100 text-green-600 rounded text-[9px] md:text-[10px] font-medium">Live</span>
            </div>
            <div className="space-y-1.5 md:space-y-2 font-mono text-[10px] md:text-xs">
              <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-400 flex-shrink-0" />
                <span className="truncate">UNIFIED-1234 ownership transferred</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-400 flex-shrink-0" />
                <span className="truncate">12 new properties linked</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 text-text-secondary">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="truncate">Address update detected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Competitive advantage callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 rounded-xl md:rounded-2xl border border-teal-500/20 p-4 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-teal-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-bold text-text-primary mb-1.5 md:mb-2">
              The Competitive Advantage
            </h4>
            <p className="text-xs md:text-base text-text-secondary">
              Everyone working with public tax data has these problems. Fixing them was never financially feasible, until AI agents made it possible.
              <span className="font-semibold text-teal-600"> This client did. Their competitors haven&apos;t.</span>
            </p>
          </div>
          <div className="flex-shrink-0 hidden md:block">
            <div className="text-right">
              <p className="text-3xl font-bold text-teal-500">1.25M</p>
              <p className="text-sm text-text-muted">Unique owners identified</p>
            </div>
          </div>
        </div>

        {/* Client quote */}
        <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-teal-500/20">
          <blockquote className="text-center">
            <p className="text-xs md:text-base text-text-secondary italic">
              &ldquo;Before this, we were sending four mailers to the same person and missing actual property owners entirely. Now we know exactly who owns what before we reach out.&rdquo;
            </p>
          </blockquote>
        </div>
      </motion.div>
    </div>
  )
}
