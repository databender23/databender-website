'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExecutiveSummaryCardProps {
  className?: string
}

export default function ExecutiveSummaryCard({ className = '' }: ExecutiveSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-3xl mx-auto ${className}`}
    >
      <div className="bg-bg-primary border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Header - always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-secondary transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-semibold text-text-primary">At a Glance</span>
          </div>
          <motion.svg
            className="w-5 h-5 text-text-muted"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Problem */}
                  <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Problem</span>
                    </div>
                    <p className="text-sm text-red-800">
                      Complex documents that traditional scanning tools turn into unusable data, requiring hours of manual cleanup.
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Solution</span>
                    </div>
                    <p className="text-sm text-teal-800">
                      A team of specialized AI workers that read, understand, and extract data from documents like humans do.
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Result</span>
                    </div>
                    <p className="text-sm text-green-800">
                      <span className="font-bold text-lg">10x</span> faster processing with 95%+ accuracy - no manual cleanup needed.
                    </p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-500">Minutes</div>
                    <div className="text-xs text-text-muted">Processing Time</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-500">0</div>
                    <div className="text-xs text-text-muted">Manual Reviews</div>
                  </div>
                  <div className="h-8 w-px bg-border" />
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-500">24/7</div>
                    <div className="text-xs text-text-muted">Autonomous</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
