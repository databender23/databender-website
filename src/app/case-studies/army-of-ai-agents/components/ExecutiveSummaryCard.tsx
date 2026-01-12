'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resultsMetrics, colorClasses } from './DiagramConfig'

interface ExecutiveSummaryCardProps {
  className?: string
}

export default function ExecutiveSummaryCard({ className = '' }: ExecutiveSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`bg-gradient-to-r from-teal-500/5 via-bg-secondary to-teal-500/5 border border-teal-500/20 rounded-xl md:rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 md:px-6 md:py-4 flex items-center justify-between hover:bg-teal-500/5 transition-colors"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-teal-500/10 flex items-center justify-center">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary text-sm md:text-base">At a Glance</h3>
            <p className="text-xs md:text-sm text-text-muted">The 60-second summary</p>
          </div>
        </div>
        <motion.svg
          className="w-4 h-4 md:w-5 md:h-5 text-text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-4 md:space-y-6">
              {/* Three-column summary */}
              <div className="grid md:grid-cols-3 gap-3 md:gap-4">
                {/* The Problem */}
                <div className="bg-bg-primary/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-border">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-orange-500">The Problem</span>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Offers going to wrong people. Real owners missed entirely. Competitors reaching them first.
                    Everyone knew the data was broken—but <span className="font-semibold text-text-primary">fixing it would take 50 analysts months of work</span>. Not worth it.
                  </p>
                </div>

                {/* The Solution */}
                <div className="bg-bg-primary/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-border">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-teal-500">The Solution</span>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    An <span className="font-semibold text-text-primary">army of AI agents</span> that reason through data chaos—understanding
                    that &ldquo;Miller, John&rdquo; and &ldquo;John Miller&rdquo; are the same person without being told.
                    10 agents doing in hours what 50 analysts couldn&apos;t do in months.
                  </p>
                </div>

                {/* The Result */}
                <div className="bg-bg-primary/50 rounded-lg md:rounded-xl p-3 md:p-4 border border-border">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-emerald-500">The Result</span>
                  </div>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    Problems that were <span className="font-semibold text-text-primary">previously unsolvable are now solvable</span>.
                    Better targeting. Faster deals. A capability their competitors don&apos;t have—and can&apos;t easily replicate.
                  </p>
                </div>
              </div>

              {/* Key metrics bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 pt-3 md:pt-4 border-t border-border">
                {resultsMetrics.map((metric, index) => (
                  <div key={metric.label} className="flex items-center gap-3 md:gap-6">
                    <div className="text-center">
                      <p className={`text-xl md:text-2xl font-bold ${colorClasses[metric.color].text}`}>
                        {metric.value}
                      </p>
                      <p className="text-[10px] md:text-xs text-text-muted">{metric.label}</p>
                    </div>
                    {index < resultsMetrics.length - 1 && (
                      <div className="w-px h-6 md:h-8 bg-border hidden sm:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
