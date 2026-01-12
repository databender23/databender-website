'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { resultsMetrics } from './DiagramConfig'

interface RevealNumbersProps {
  inView: boolean
  className?: string
}

export default function RevealNumbers({ inView, className = '' }: RevealNumbersProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!inView) {
      // Schedule state reset to avoid synchronous setState in effect
      requestAnimationFrame(() => setStep(0))
      return
    }

    const timings = [0, 600, 1200, 1800, 2400]
    const timers: NodeJS.Timeout[] = []

    timings.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setStep(index + 1)
      }, delay)
      timers.push(timer)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [inView])

  const results = [
    {
      value: '40-60%',
      label: 'Less Wasted Effort',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'Sales reps focus on leads that actually convert',
    },
    {
      value: '30s',
      label: 'Real-time Updates',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
      description: 'New leads scored within 30 seconds',
    },
    {
      value: '7',
      label: 'ML Features',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Custom features discovered through analysis',
    },
    {
      value: '24/7',
      label: 'Autonomous Scoring',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'System runs continuously without intervention',
    },
  ]

  const technicalHighlights = [
    { label: 'Custom ML Model', detail: 'Optimized for your specific conversion patterns' },
    { label: 'Real-time Listener', detail: 'Continuous monitoring for instant scoring' },
    { label: 'Adaptive Sync', detail: 'Intelligent batching for optimal performance' },
    { label: 'Business Rules', detail: 'Safeguard logic for strategic priorities' },
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
            className="text-center mb-12"
          >
            <motion.span
              className="text-6xl md:text-8xl font-bold text-success"
              animate={{
                textShadow: [
                  '0 0 0px rgba(34, 197, 94, 0)',
                  '0 0 30px rgba(34, 197, 94, 0.5)',
                  '0 0 0px rgba(34, 197, 94, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              40-60%
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-text-secondary mt-4"
            >
              Less Wasted Sales Effort
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
            className="max-w-2xl mx-auto mb-12"
          >
            <blockquote className="text-lg md:text-xl text-text-secondary italic text-center border-l-4 border-teal-500 pl-6 py-2">
              &ldquo;The ML model discovered hidden patterns our generic scoring missed entirely. Now our sales team knows exactly which leads to prioritize.&rdquo;
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${result.bgColor} rounded-xl p-6 text-center group relative`}
              >
                <div className={`text-3xl md:text-4xl font-bold ${result.color} mb-2`}>
                  {result.value}
                </div>
                <div className="text-sm text-text-muted">{result.label}</div>

                {/* Hover tooltip */}
                <div className="absolute inset-x-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="bg-text-primary text-white text-xs rounded-lg px-3 py-2 shadow-lg mx-2">
                    {result.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical Highlights */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <h3 className="text-center text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
              Technical Implementation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technicalHighlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-bg-secondary rounded-lg p-4 border border-border"
                >
                  <div className="text-sm font-semibold text-text-primary mb-1">{item.label}</div>
                  <div className="text-xs text-text-muted">{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architecture callout */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-bg-secondary rounded-xl border border-border">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☁️</span>
                <span className="text-sm text-text-muted">Salesforce</span>
              </div>
              <motion.div
                className="text-xl text-teal-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <span className="text-sm text-text-muted">ML Model</span>
              </div>
              <motion.div
                className="text-xl text-teal-500"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                →
              </motion.div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <span className="text-sm font-medium text-success">Prioritized Leads</span>
              </div>
            </div>

            <motion.p
              className="mt-6 text-xl font-semibold text-text-primary"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Same leads. Smarter prioritization. Better conversions.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
