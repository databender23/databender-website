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
            <h3 className="font-semibold text-text-primary">At a Glance</h3>
            <p className="text-sm text-text-muted">60-second executive summary</p>
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
              {/* Problem */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">!</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">The Problem</h4>
                  <p className="text-sm text-text-secondary">
                    Sales teams spend <span className="font-semibold text-red-600">60% of their time</span> chasing
                    leads that will never convert. Generic CRM scoring treats all leads equally.
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-teal-50 border border-teal-100">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">*</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">The Solution</h4>
                  <p className="text-sm text-text-secondary">
                    Custom AI that <span className="font-semibold text-teal-600">learns what actually predicts conversions</span> in
                    your business - not generic rules, but patterns discovered from your data.
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-100">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">+</span>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-1">The Result</h4>
                  <p className="text-sm text-text-secondary">
                    <span className="font-semibold text-green-600">40-60% less wasted effort</span>.
                    Sales reps know exactly which leads to call first. Scores update in real-time, 24/7.
                  </p>
                </div>
              </div>

              {/* Key stat */}
              <div className="pt-2 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">40-60%</div>
                  <div className="text-xs text-text-muted">Less wasted time</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">30s</div>
                  <div className="text-xs text-text-muted">Real-time updates</div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-500">24/7</div>
                  <div className="text-xs text-text-muted">Fully autonomous</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
