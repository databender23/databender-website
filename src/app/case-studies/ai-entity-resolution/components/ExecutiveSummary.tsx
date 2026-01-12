'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface ExecutiveSummaryProps {
  className?: string
}

export default function ExecutiveSummary({ className = '' }: ExecutiveSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`bg-gradient-to-r from-teal-500/5 via-bg-secondary to-teal-500/5 border border-teal-500/20 rounded-2xl overflow-hidden ${className}`}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-teal-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">At a Glance</h3>
            <p className="text-sm text-text-muted">The 60-second summary</p>
          </div>
        </div>
        <motion.svg
          className="w-5 h-5 text-text-muted"
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
            <div className="px-6 pb-6 space-y-6">
              {/* Three-column summary */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* The Problem */}
                <div className="bg-bg-primary/50 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-orange-500">The Problem</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary">1.5M+ records</span> across multiple systems with no way to know how many are duplicates. Same people, different names, wasted resources.
                  </p>
                </div>

                {/* The Solution */}
                <div className="bg-bg-primary/50 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-teal-500">The Solution</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    AI that <span className="font-semibold text-text-primary">finds the same person</span> across messy databases using smart matching - like &quot;John Smith&quot; = &quot;J. Smith&quot; = &quot;Jonathan Smith&quot;.
                  </p>
                </div>

                {/* The Result */}
                <div className="bg-bg-primary/50 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-emerald-500">The Result</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary">1.5M records consolidated to 100K</span> unique customers. 125x cost savings vs manual review. Full audit trail.
                  </p>
                </div>
              </div>

              {/* Key metrics bar */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-teal-500">1.5M+</p>
                  <p className="text-xs text-text-muted">Records Processed</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">100K</p>
                  <p className="text-xs text-text-muted">Unique Identities</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-500">125x</p>
                  <p className="text-xs text-text-muted">Cost Savings</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">$200</p>
                  <p className="text-xs text-text-muted">AI Processing Cost</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Get Similar Results
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    document.getElementById('act1')?.scrollIntoView({ behavior: 'smooth' })
                    setIsExpanded(false)
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text-secondary text-sm font-medium rounded-lg hover:bg-bg-secondary transition-colors"
                >
                  Read Full Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
