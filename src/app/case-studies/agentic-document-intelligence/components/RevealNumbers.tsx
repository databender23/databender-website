'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RevealNumbersProps {
  inView: boolean
  className?: string
}

export default function RevealNumbers({ inView, className = '' }: RevealNumbersProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) {
      requestAnimationFrame(() => setStep(0))
      return
    }

    const timings = [0, 600, 1200, 1800, 2400]
    const timers: NodeJS.Timeout[] = []

    timings.forEach((delay, index) => {
      const timer = setTimeout(() => setStep(index + 1), delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [inView])

  // Knowledge enablement metrics
  const results = [
    {
      value: '1000s',
      label: 'Documents Captured',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
    },
    {
      value: '1',
      label: 'Knowledge Base',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      value: 'Instant',
      label: 'AI Answers',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      value: '∞',
      label: 'Possibilities',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ]

  return (
    <div className={`${className}`}>
      {/* Hero number */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
              <motion.span
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-amber-500"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(245, 158, 11, 0)',
                    '0 0 30px rgba(245, 158, 11, 0.3)',
                    '0 0 0px rgba(245, 158, 11, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1000s
              </motion.span>
              <motion.span
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-muted"
              >
                →
              </motion.span>
              <motion.span
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-teal-500"
                animate={{
                  textShadow: [
                    '0 0 0px rgba(26, 153, 136, 0)',
                    '0 0 30px rgba(26, 153, 136, 0.5)',
                    '0 0 0px rgba(26, 153, 136, 0)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                1
              </motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-xl text-text-secondary mt-3 sm:mt-4 px-2"
            >
              Thousands of documents → One knowledge base AI can use
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
          >
            <blockquote className="text-base sm:text-lg md:text-xl text-text-secondary italic text-center border-l-4 border-teal-500 pl-4 sm:pl-6 py-2">
              &ldquo;For the first time, we can ask AI questions about our own data. Twenty years of product knowledge, instantly accessible.&rdquo;
            </blockquote>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results grid */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-4xl mx-auto"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${result.bgColor} rounded-lg sm:rounded-xl p-3 sm:p-6 text-center`}
              >
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${result.color} mb-1 sm:mb-2`}>
                  {result.value}
                </div>
                <div className="text-xs sm:text-sm text-text-muted">{result.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* What AI Can Now Do */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-12 text-center"
          >
            <p className="text-xs sm:text-sm text-text-muted mb-3 sm:mb-4">What this enables:</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto px-2 sm:inline-flex sm:items-center sm:px-6 sm:py-4 sm:bg-bg-secondary sm:rounded-xl sm:border sm:border-border">
              <div className="text-center bg-bg-secondary sm:bg-transparent rounded-lg p-2 sm:p-0">
                <div className="text-sm sm:text-lg font-semibold text-teal-500">Search</div>
                <div className="text-[10px] sm:text-xs text-text-muted">Ask anything</div>
              </div>
              <div className="text-lg sm:text-2xl text-text-muted hidden sm:block">+</div>
              <div className="text-center bg-bg-secondary sm:bg-transparent rounded-lg p-2 sm:p-0">
                <div className="text-sm sm:text-lg font-semibold text-blue-500">Chat</div>
                <div className="text-[10px] sm:text-xs text-text-muted">AI assistant</div>
              </div>
              <div className="text-lg sm:text-2xl text-text-muted hidden sm:block">+</div>
              <div className="text-center bg-bg-secondary sm:bg-transparent rounded-lg p-2 sm:p-0">
                <div className="text-sm sm:text-lg font-semibold text-purple-500">Automate</div>
                <div className="text-[10px] sm:text-xs text-text-muted">Workflows</div>
              </div>
              <div className="text-lg sm:text-2xl text-text-muted hidden sm:block">+</div>
              <div className="text-center bg-bg-secondary sm:bg-transparent rounded-lg p-2 sm:p-0">
                <div className="text-sm sm:text-lg font-semibold text-green-500">Build</div>
                <div className="text-[10px] sm:text-xs text-text-muted">Applications</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final impact */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 sm:mt-12 text-center px-2"
          >
            <motion.p
              className="text-lg sm:text-2xl font-semibold text-text-primary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Your documents. Your knowledge. AI that finally understands your business.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
