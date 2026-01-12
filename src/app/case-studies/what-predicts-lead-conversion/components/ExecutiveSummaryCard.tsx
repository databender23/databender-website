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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Summary: What We Learned</h3>
            <p className="text-sm text-text-muted">60-second overview</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center"
        >
          <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
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
            <div className="px-6 pb-6 space-y-4">
              {/* The Common Belief */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-bg-secondary border border-border">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg text-amber-600">?</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">The Common Belief</h4>
                  <p className="text-sm text-text-secondary">
                    Sales teams often assume that wealthier prospects make better leads. Higher property values,
                    bigger budgets, more engagement activity - these seem like obvious predictors of success.
                  </p>
                </div>
              </div>

              {/* What the Data Showed */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-purple-100">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">What the Data Showed</h4>
                  <p className="text-sm text-text-secondary">
                    Analysis of 3 years of sales outcomes revealed that <span className="font-medium text-purple-700">property
                    value was actually a negative predictor</span>. What mattered most: project urgency, ability to pay,
                    and prior success in the lead's neighborhood.
                  </p>
                </div>
              </div>

              {/* The Implication */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">The Implication</h4>
                  <p className="text-sm text-text-secondary">
                    Intent signals (urgency, capacity) outperform engagement signals (email opens, page views).
                    When scoring was rebuilt around these insights, success rates improved by 31% compared to
                    standard CRM-based scoring.
                  </p>
                </div>
              </div>

              {/* Key insight callout */}
              <div className="pt-2 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">31%</div>
                    <div className="text-xs text-text-muted">Higher success rate</div>
                  </div>
                  <div className="w-px h-10 bg-purple-200" />
                  <div className="text-left flex-1">
                    <p className="text-sm text-text-secondary">
                      vs. standard Salesforce lead scoring, by prioritizing intent signals over engagement metrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
