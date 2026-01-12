'use client'

import { motion } from 'framer-motion'

interface GenericScoringFailProps {
  inView: boolean
  className?: string
}

export default function GenericScoringFail({ inView, className = '' }: GenericScoringFailProps) {
  const wrongMetrics = [
    { metric: 'Home Value', score: '85%', actual: 'Low correlation' },
    { metric: 'Years in Home', score: '72%', actual: 'Misleading' },
    { metric: 'Credit Score', score: '68%', actual: 'Not predictive' },
  ]

  const missedSignals = [
    { signal: 'Home Equity', impact: 'High', missed: true },
    { signal: 'Urgency Signals', impact: 'Critical', missed: true },
    { signal: 'Local Sales History', impact: 'High', missed: true },
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Generic CRM Scoring
          </div>
          <h3 className="text-xl font-semibold text-text-primary">
            What the generic model prioritized
          </h3>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Wrong metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
              Over-weighted Factors
            </h4>
            <div className="space-y-3">
              {wrongMetrics.map((item, index) => (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-error" />
                    <span className="text-text-primary font-medium">{item.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-text-primary font-semibold">{item.score}</div>
                    <div className="text-xs text-text-muted">{item.actual}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Missed signals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-4">
              Signals Completely Missed
            </h4>
            <div className="space-y-3">
              {missedSignals.map((item, index) => (
                <motion.div
                  key={item.signal}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-bg-secondary rounded-lg border-l-4 border-warning"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-text-primary font-medium">{item.signal}</span>
                  </div>
                  <span className="text-xs font-medium text-warning uppercase">{item.impact}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 pt-6 border-t border-border text-center"
        >
          <p className="text-text-secondary italic">
            &ldquo;Generic tools said home value mattered most. They were wrong.&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  )
}
