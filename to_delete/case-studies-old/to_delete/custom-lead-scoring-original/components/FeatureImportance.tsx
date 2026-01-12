'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modelFeatures } from './DiagramConfig'

interface FeatureImportanceProps {
  inView: boolean
  showInsight?: boolean
  className?: string
}

export default function FeatureImportance({
  inView,
  showInsight = false,
  className = '',
}: FeatureImportanceProps) {
  const [revealed, setRevealed] = useState(false)
  const [sortByActual, setSortByActual] = useState(false)

  // Auto-reveal insight when showInsight prop changes
  useEffect(() => {
    if (showInsight && !revealed) {
      // Use setTimeout(0) to defer state update and avoid infinite loop
      const timer = setTimeout(() => {
        setRevealed(true)
        setSortByActual(true)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [showInsight, revealed])

  // Sort features based on current view
  const sortedFeatures = [...modelFeatures].sort((a, b) => {
    if (sortByActual) {
      return b.importance - a.importance
    }
    return a.genericRank - b.genericRank
  })

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Header with toggle */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">7-Feature ML Model</h3>
              <p className="text-sm text-text-muted">What actually predicts roofing project conversions?</p>
            </div>

            {/* Toggle button */}
            <button
              onClick={() => {
                setRevealed(true)
                setSortByActual(!sortByActual)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                sortByActual
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
              }`}
            >
              {sortByActual ? 'Showing: ML Discovery' : 'Showing: Generic CRM'}
            </button>
          </div>
        </div>

        {/* Features list */}
        <div className="p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {sortedFeatures.map((feature, index) => {
              const isDiscovered = feature.discovered
              const barWidth = sortByActual ? feature.importance : (100 - feature.genericRank * 10)

              return (
                <motion.div
                  key={feature.name}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    layout: { duration: 0.5, type: 'spring', bounce: 0.2 },
                    opacity: { duration: 0.3 },
                    delay: inView ? index * 0.1 : 0,
                  }}
                  className="relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {/* Discovery indicator */}
                      {sortByActual && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className={`w-2 h-2 rounded-full ${
                            isDiscovered ? 'bg-success' : 'bg-error'
                          }`}
                        />
                      )}
                      <span className="font-medium text-text-primary">{feature.name}</span>

                      {/* "Hidden gem" badge for discovered features */}
                      {sortByActual && isDiscovered && index < 3 && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded-full"
                        >
                          Key Predictor
                        </motion.span>
                      )}

                      {/* "Overrated" badge for non-discovered high-ranked generics */}
                      {sortByActual && !isDiscovered && feature.genericRank <= 2 && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="px-2 py-0.5 text-xs font-medium bg-error/10 text-error rounded-full"
                        >
                          Overrated
                        </motion.span>
                      )}
                    </div>

                    <span className={`text-sm font-semibold ${
                      sortByActual
                        ? isDiscovered ? 'text-success' : 'text-text-muted'
                        : 'text-text-primary'
                    }`}>
                      {sortByActual ? `${feature.importance}%` : `#${feature.genericRank}`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full transition-colors duration-500 ${
                        sortByActual
                          ? isDiscovered
                            ? 'bg-gradient-to-r from-teal-500 to-success'
                            : 'bg-gray-300'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 0.8, delay: inView ? 0.2 + index * 0.1 : 0 }}
                    />
                  </div>

                  {/* Tooltip with field name and description */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-12 left-0 right-0 z-10 pointer-events-none">
                    <div className="bg-slate-800 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
                      <code className="text-teal-300">{feature.field}</code>
                      <p className="mt-1 text-slate-300">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Insight reveal */}
        <AnimatePresence>
          {revealed && sortByActual && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-teal-500/5 border-t border-teal-500/20">
                <div className="flex items-start gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
                    className="text-3xl"
                  >
                    💡
                  </motion.div>
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="font-semibold text-text-primary mb-1"
                    >
                      The Discovery
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm text-text-secondary leading-relaxed"
                    >
                      <strong className="text-teal-600">Home Equity</strong> + <strong className="text-teal-600">Local Sales History</strong> + <strong className="text-teal-600">Urgency</strong> are the real conversion drivers.
                      Generic CRMs focus on project value and house size. Our 7-feature model discovers what actually predicts success.
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to action to toggle */}
        {!revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="p-4 text-center border-t border-border"
          >
            <button
              onClick={() => {
                setRevealed(true)
                setSortByActual(true)
              }}
              className="text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center gap-2 mx-auto transition-colors"
            >
              <span>Reveal what ML discovered</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
