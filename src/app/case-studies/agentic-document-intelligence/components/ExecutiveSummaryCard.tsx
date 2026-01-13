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
          className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between hover:bg-bg-secondary transition-colors"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm sm:text-base font-semibold text-text-primary">At a Glance</span>
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
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Problem */}
                  <div className="p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs font-semibold text-red-600 uppercase tracking-wide">Problem</span>
                    </div>
                    <p className="text-xs sm:text-sm text-red-800">
                      Critical information buried in PDFs, scans, and spreadsheets. Every question requires someone to dig through files.
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="p-3 sm:p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs font-semibold text-teal-600 uppercase tracking-wide">Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-teal-800">
                      Vision AI that reads documents like a human, extracting structured data from any format automatically.
                    </p>
                  </div>

                  {/* Result */}
                  <div className="p-3 sm:p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-600 uppercase tracking-wide">Result</span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-800">
                      Ask questions in plain English. Get sourced answers in seconds. Build apps on your own data.
                    </p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border grid grid-cols-4 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-6">
                  <div className="text-center">
                    <div className="text-sm sm:text-lg font-bold text-teal-500">1000s</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Documents</div>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-border hidden sm:block" />
                  <div className="text-center">
                    <div className="text-sm sm:text-lg font-bold text-teal-500">1</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Knowledge Base</div>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-border hidden sm:block" />
                  <div className="text-center">
                    <div className="text-sm sm:text-lg font-bold text-teal-500">Instant</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Answers</div>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-border hidden sm:block" />
                  <div className="text-center">
                    <div className="text-sm sm:text-lg font-bold text-teal-500">24/7</div>
                    <div className="text-[10px] sm:text-xs text-text-muted">Available</div>
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
