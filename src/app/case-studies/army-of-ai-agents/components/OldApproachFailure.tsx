'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OldApproachFailureProps {
  inView: boolean
  className?: string
}

export default function OldApproachFailure({ inView, className = '' }: OldApproachFailureProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) {
      requestAnimationFrame(() => setStep(0))
      return
    }

    const timings = [0, 800, 1600, 2400, 3200]
    const timers: NodeJS.Timeout[] = []

    timings.forEach((delay, index) => {
      const timer = setTimeout(() => setStep(index + 1), delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [inView])

  // Name variations that all refer to the same person
  const nameVariations = [
    'John Miller',
    'Miller, John',
    'MILLER JOHN',
    'J. Miller',
    'John A Miller',
    'Miller John A',
    'JOHN MILLER JR',
    'Miller, John Jr.',
  ]

  // Address variations that all refer to the same location
  const addressVariations = [
    '123 Oak St',
    '123 Oak Street',
    '123 Oak St.',
    'Oak St 123',
    '123 Oak Street, Apt 1',
    '123 Oak St #1',
    '123 Oak St Unit 1',
  ]

  return (
    <div className={`${className}`}>
      <div className="bg-bg-primary rounded-xl md:rounded-2xl border border-border shadow-sm p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-3 bg-red-50 text-red-600 rounded-full text-xs md:text-sm font-medium mb-3 md:mb-4 border border-red-100">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            The Rules-Based Problem
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-text-primary">
            How many rules would you need to match these?
          </h3>
        </motion.div>

        {/* Name and Address variations */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8"
            >
              {/* Name variations */}
              <div className="bg-bg-secondary rounded-lg md:rounded-xl p-3 md:p-5">
                <h4 className="text-xs md:text-sm font-medium text-text-muted uppercase tracking-wide mb-2 md:mb-3 text-center">
                  Same Person, Different Names
                </h4>
                <div className="space-y-1 md:space-y-1.5 font-mono text-xs md:text-sm">
                  {nameVariations.map((name, index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-bg-primary rounded border border-amber-200 text-amber-700 truncate"
                    >
                      {name}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Address variations */}
              <div className="bg-bg-secondary rounded-lg md:rounded-xl p-3 md:p-5">
                <h4 className="text-xs md:text-sm font-medium text-text-muted uppercase tracking-wide mb-2 md:mb-3 text-center">
                  Same Address, Different Formats
                </h4>
                <div className="space-y-1 md:space-y-1.5 font-mono text-xs md:text-sm">
                  {addressVariations.map((addr, index) => (
                    <motion.div
                      key={addr}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="px-2 md:px-3 py-1 md:py-1.5 bg-bg-primary rounded border border-amber-200 text-amber-700 truncate"
                    >
                      {addr}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The rules explosion problem */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-red-100"
            >
              <h4 className="text-xs md:text-sm font-medium text-red-600 uppercase tracking-wide mb-3 md:mb-4 text-center">
                The Rules Explosion
              </h4>
              <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-red-500">8+</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Name formats</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-red-500">×</div>
                  <div className="text-[10px] md:text-xs text-text-muted">&nbsp;</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-red-500">7+</div>
                  <div className="text-[10px] md:text-xs text-text-muted">Address formats</div>
                </div>
              </div>
              <div className="text-center mt-3 md:mt-4 pt-3 md:pt-4 border-t border-red-200">
                <p className="text-xs md:text-sm text-text-secondary">
                  <span className="font-semibold text-red-600">56+ combinations</span> just for one person at one address.
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>Now multiply by <span className="font-semibold">1.69 million records</span> and <span className="font-semibold">3,000+ counties</span>.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The old approach */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 md:mt-6 p-3 md:p-4 bg-bg-secondary rounded-lg"
            >
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="text-center p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
                  <h5 className="text-xs md:text-sm font-medium text-red-600 mb-1.5 md:mb-2">The Old Way</h5>
                  <p className="text-xs md:text-sm text-text-secondary">
                    Junior analysts manually reviewing similar names, <span className="font-semibold">one by one</span>.
                    Months of work. High error rates. Unsustainable at scale.
                  </p>
                </div>
                <div className="text-center p-3 md:p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <h5 className="text-xs md:text-sm font-medium text-teal-600 mb-1.5 md:mb-2">With Agentic AI</h5>
                  <p className="text-xs md:text-sm text-text-secondary">
                    AI agents understand context - they know &ldquo;Miller, John&rdquo; and &ldquo;John Miller&rdquo; are the same person <span className="font-semibold">without being told</span>.
                  </p>
                </div>
              </div>
              <p className="text-center text-[10px] md:text-xs text-text-muted mt-3 md:mt-4">
                We&apos;ve completely replaced the job of a junior analyst with this approach.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Unlock - reasoning at scale */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 md:mt-6 p-4 md:p-5 bg-gradient-to-r from-teal-500/5 via-teal-500/10 to-teal-500/5 rounded-lg md:rounded-xl border border-teal-500/20"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-xs md:text-sm font-semibold text-teal-600 mb-1">The Unlock</h5>
                  <p className="text-xs md:text-sm text-text-secondary">
                    The problem wasn&apos;t finding patterns—humans are good at that. The problem was doing it <span className="font-semibold">1.69 million times</span>.
                    AI agents can reason like humans but work at machine scale, and that&apos;s what changed.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
