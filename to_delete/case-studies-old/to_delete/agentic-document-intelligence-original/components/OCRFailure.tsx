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
      // Schedule state reset to avoid synchronous setState in effect
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

  const failures = [
    { type: 'Tables', issue: 'Columns misaligned', accuracy: '62%' },
    { type: 'Footnotes', issue: 'Lost references', accuracy: '45%' },
    { type: 'Cross-refs', issue: 'Broken links', accuracy: '38%' },
  ]

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl border border-border shadow-card p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-error/10 text-error rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Traditional OCR Results
          </div>
          <h3 className="text-xl font-semibold text-text-primary">
            $10,000 spent. Still needed manual validation.
          </h3>
        </motion.div>

        {/* Failure grid */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-4 mb-8"
            >
              {failures.map((failure, index) => (
                <motion.div
                  key={failure.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="p-4 bg-error/5 border border-error/20 rounded-xl text-center"
                >
                  <div className="text-3xl font-bold text-error mb-1">{failure.accuracy}</div>
                  <div className="text-sm font-medium text-text-primary">{failure.type}</div>
                  <div className="text-xs text-error mt-1">{failure.issue}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The real cost */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-bg-secondary rounded-xl p-6"
            >
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4 text-center">
                The Real Cost
              </h4>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">$10,000</div>
                  <div className="text-xs text-text-muted">OCR Processing</div>
                </div>
                <div className="text-xl text-text-muted">+</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">100+ hours</div>
                  <div className="text-xs text-text-muted">Manual Validation</div>
                </div>
                <div className="text-xl text-text-muted">=</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-error">Unsustainable</div>
                  <div className="text-xs text-text-muted">For 1000+ PDFs</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quote */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-text-secondary italic">
                &ldquo;Every extraction required a human to check it. We were paying for automation that didn&apos;t automate.&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
