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

  // V2: Plain English labels
  const results = [
    {
      value: '10x',
      label: 'Faster',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10',
    },
    {
      value: '95%+',
      label: 'Accurate',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      value: '100%',
      label: 'Traceable',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      value: '24/7',
      label: 'Always On',
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
            className="text-center mb-12"
          >
            <motion.span
              className="text-6xl md:text-8xl font-bold text-teal-500"
              animate={{
                textShadow: [
                  '0 0 0px rgba(26, 153, 136, 0)',
                  '0 0 30px rgba(26, 153, 136, 0.5)',
                  '0 0 0px rgba(26, 153, 136, 0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              10x
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-text-secondary mt-4"
            >
              Faster - and it runs by itself
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote - V2: Plain English */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <blockquote className="text-lg md:text-xl text-text-secondary italic text-center border-l-4 border-teal-500 pl-6 py-2">
              &ldquo;What used to take our team hours now happens in minutes. We just upload the documents and get clean data back.&rdquo;
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
                className={`${result.bgColor} rounded-xl p-6 text-center`}
              >
                <div className={`text-3xl md:text-4xl font-bold ${result.color} mb-2`}>
                  {result.value}
                </div>
                <div className="text-sm text-text-muted">{result.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline Stages - V2: Plain English */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 px-6 py-4 bg-bg-secondary rounded-xl border border-border">
              <div className="text-center">
                <div className="text-sm text-text-muted mb-1">Step 1</div>
                <div className="text-lg font-semibold text-teal-500">AI Reads</div>
                <div className="text-xs text-text-muted">Sees like a human</div>
              </div>
              <div className="text-2xl text-text-muted">+</div>
              <div className="text-center">
                <div className="text-sm text-text-muted mb-1">Step 2</div>
                <div className="text-lg font-semibold text-purple-500">Quality Checks</div>
                <div className="text-xs text-text-muted">40+ validations</div>
              </div>
              <div className="text-2xl text-text-muted">=</div>
              <div className="text-center">
                <div className="text-sm text-text-muted mb-1">Result</div>
                <div className="text-lg font-semibold text-green-500">Clean Data</div>
                <div className="text-xs text-text-muted">Ready to use</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final impact - V2: Plain English */}
      <AnimatePresence>
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <motion.p
              className="text-2xl font-semibold text-text-primary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              From document to usable data in minutes, not hours.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
