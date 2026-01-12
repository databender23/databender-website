'use client'

import { motion } from 'framer-motion'

interface CRMComparisonProps {
  className?: string
}

export default function CRMComparison({ className = '' }: CRMComparisonProps) {
  const genericCRM = {
    title: 'Generic CRM Scoring',
    subtitle: 'What most tools use',
    metrics: [
      { name: 'Email opens', icon: '!', hasIt: true, note: 'Surface-level engagement' },
      { name: 'Page views', icon: '!', hasIt: true, note: 'Quantity over quality' },
      { name: 'Form fills', icon: '!', hasIt: true, note: 'Basic lead capture' },
      { name: 'Time on site', icon: '!', hasIt: true, note: 'Easy to game' },
      { name: 'Financial fit', icon: '?', hasIt: false, note: 'Cannot assess' },
      { name: 'Market patterns', icon: '?', hasIt: false, note: 'No context' },
      { name: 'Buying signals', icon: '?', hasIt: false, note: 'Missed entirely' },
      { name: 'Historical success', icon: '?', hasIt: false, note: 'Not analyzed' },
    ],
    result: 'Treats interested browsers the same as serious buyers',
    resultType: 'negative' as const,
  }

  const customML = {
    title: 'Custom ML Scoring',
    subtitle: 'Built for your business',
    metrics: [
      { name: 'Financial capacity signals', icon: '+', hasIt: true, note: 'Can they afford your product?' },
      { name: 'Market success patterns', icon: '+', hasIt: true, note: 'Do companies like theirs tend to buy?' },
      { name: 'Engagement recency', icon: '+', hasIt: true, note: 'How recently did they show interest?' },
      { name: 'Urgency indicators', icon: '+', hasIt: true, note: 'Are they under time pressure?' },
      { name: 'Geographic success rate', icon: '+', hasIt: true, note: 'How do leads from their area convert?' },
      { name: 'Behavioral patterns', icon: '+', hasIt: true, note: 'What actions predict conversion?' },
      { name: 'Firmographic fit', icon: '+', hasIt: true, note: 'Does their company profile match winners?' },
      { name: 'Business rules', icon: '+', hasIt: true, note: 'Your strategic priorities honored' },
    ],
    result: 'Predicts who will actually buy, not just who is clicking',
    resultType: 'positive' as const,
  }

  return (
    <div className={`${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Generic CRM */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-border bg-bg-secondary">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{genericCRM.title}</h3>
                <p className="text-sm text-text-muted">{genericCRM.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {genericCRM.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  metric.hasIt ? 'bg-amber-50 border border-amber-100' : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  metric.hasIt ? 'bg-amber-200 text-amber-700' : 'bg-red-200 text-red-700'
                }`}>
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{metric.name}</div>
                  <div className="text-xs text-text-muted">{metric.note}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-border bg-red-50">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-red-700">{genericCRM.result}</p>
            </div>
          </div>
        </motion.div>

        {/* Custom ML */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-teal-500 shadow-card overflow-hidden relative"
        >
          {/* Recommended badge */}
          <div className="absolute -top-px -right-px">
            <div className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
              Recommended
            </div>
          </div>

          <div className="p-6 border-b border-teal-100 bg-teal-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{customML.title}</h3>
                <p className="text-sm text-text-muted">{customML.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {customML.metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-teal-50 border border-teal-100"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white">
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{metric.name}</div>
                  <div className="text-xs text-text-muted">{metric.note}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-teal-100 bg-teal-50">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-teal-700 font-medium">{customML.result}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-bg-secondary rounded-xl border border-border text-center"
      >
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">The difference?</span>{' '}
          Generic scoring asks &quot;Are they interested?&quot; Custom ML asks &quot;Will they buy?&quot;
        </p>
      </motion.div>
    </div>
  )
}
