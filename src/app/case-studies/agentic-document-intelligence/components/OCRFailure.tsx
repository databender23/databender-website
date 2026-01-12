'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OCRFailureProps {
  inView: boolean
  className?: string
}

export default function OCRFailure({ inView, className = '' }: OCRFailureProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) {
      requestAnimationFrame(() => setStep(0))
      return
    }

    const timings = [0, 800, 1600, 2400]
    const timers: NodeJS.Timeout[] = []

    timings.forEach((delay, index) => {
      const timer = setTimeout(() => setStep(index + 1), delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [inView])

  // Knowledge accessibility problems
  const failures = [
    { type: 'Search', issue: 'Can\'t find answers in documents', accuracy: 'Manual' },
    { type: 'AI Tools', issue: 'ChatGPT can\'t access your data', accuracy: 'None' },
    { type: 'Lookups', issue: 'Every question = dig through files', accuracy: 'Hours' },
  ]

  return (
    <div className={`${className}`}>
      <div className="bg-bg-primary rounded-2xl border border-border shadow-sm p-4 sm:p-6 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-red-100">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            The Problem
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary px-2">
            AI can&apos;t answer questions about YOUR data. It&apos;s locked in documents.
          </h3>
        </motion.div>

        {/* Failure grid */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8"
            >
              {failures.map((failure, index) => (
                <motion.div
                  key={failure.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="p-2 sm:p-4 bg-red-50 border border-red-100 rounded-lg sm:rounded-xl text-center"
                >
                  <div className="text-xl sm:text-3xl font-bold text-red-500 mb-0.5 sm:mb-1">{failure.accuracy}</div>
                  <div className="text-xs sm:text-sm font-medium text-text-primary">{failure.type}</div>
                  <div className="text-[10px] sm:text-xs text-red-600 mt-0.5 sm:mt-1 leading-tight">{failure.issue}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The real cost - V2: Plain English */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-bg-secondary rounded-xl p-4 sm:p-6"
            >
              <h4 className="text-xs sm:text-sm font-medium text-text-muted uppercase tracking-wide mb-3 sm:mb-4 text-center">
                What Happens Today
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="text-base sm:text-2xl font-bold text-text-primary">&ldquo;What&apos;s the part #?&rdquo;</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Simple question</div>
                </div>
                <div className="text-lg sm:text-xl text-text-muted rotate-90 sm:rotate-0">→</div>
                <div className="text-center">
                  <div className="text-base sm:text-2xl font-bold text-amber-500">Open 5 PDFs</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">Ctrl+F each one</div>
                </div>
                <div className="text-lg sm:text-xl text-text-muted rotate-90 sm:rotate-0">→</div>
                <div className="text-center">
                  <div className="text-base sm:text-2xl font-bold text-red-500">20 minutes</div>
                  <div className="text-[10px] sm:text-xs text-text-muted">To find the answer</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote - V2: Plain English */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 sm:mt-6 text-center px-2"
            >
              <p className="text-sm sm:text-base text-text-secondary italic">
                &ldquo;We have years of knowledge in these documents, but no one can find anything. New employees take months to get up to speed just learning where information lives.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
