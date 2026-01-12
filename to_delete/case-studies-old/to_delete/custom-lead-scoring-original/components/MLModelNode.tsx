'use client'

import { motion } from 'framer-motion'

interface MLModelNodeProps {
  inView: boolean
  className?: string
}

export default function MLModelNode({ inView, className = '' }: MLModelNodeProps) {
  const dataInputs = [
    { label: 'CRM Data', icon: '📊' },
    { label: 'Property Records', icon: '🏠' },
    { label: 'Sales History', icon: '📈' },
    { label: 'Urgency Signals', icon: '⚡' },
  ]

  const patternsLearned = [
    'Home equity > $50K predicts 3x conversion',
    'Recent storm damage = urgent buyer',
    'Neighbors who converted = warm territory',
    'Multiple quote requests = high intent',
  ]

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl border border-border shadow-card p-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Data Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
              Data Sources
            </h4>
            {dataInputs.map((input, index) => (
              <motion.div
                key={input.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg"
              >
                <span className="text-xl">{input.icon}</span>
                <span className="text-text-primary font-medium">{input.label}</span>
                {/* Arrow pointing right */}
                <motion.svg
                  className="w-4 h-4 text-teal-500 ml-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={inView ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.div>
            ))}
          </motion.div>

          {/* ML Model Core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            {/* Glowing brain node */}
            <motion.div
              className="relative w-32 h-32 flex items-center justify-center"
              animate={inView ? {
                boxShadow: [
                  '0 0 20px rgba(26, 153, 136, 0.2)',
                  '0 0 40px rgba(26, 153, 136, 0.4)',
                  '0 0 20px rgba(26, 153, 136, 0.2)',
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-teal-500/30"
                animate={inView ? { rotate: 360 } : {}}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-teal-500/50"
                animate={inView ? { rotate: -360 } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Core */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🧠</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="mt-4 text-center"
            >
              <div className="text-lg font-semibold text-text-primary">Custom ML Model</div>
              <div className="text-sm text-text-muted">Trained on your data</div>
            </motion.div>
          </motion.div>

          {/* Patterns Learned */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
              Patterns Discovered
            </h4>
            {patternsLearned.map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-teal-500/5 rounded-lg border-l-4 border-teal-500"
              >
                <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span className="text-sm text-text-secondary">{pattern}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
