'use client'

import { motion } from 'framer-motion'

interface CRMComparisonProps {
  className?: string
}

export default function CRMComparison({ className = '' }: CRMComparisonProps) {
  const engagementSignals = {
    title: 'Engagement Signals',
    subtitle: 'What most CRMs measure',
    signals: [
      { name: 'Email opens', note: 'Did they open your emails?', strength: 'weak' },
      { name: 'Page views', note: 'How many times did they visit?', strength: 'weak' },
      { name: 'Form submissions', note: 'Did they fill out a form?', strength: 'moderate' },
      { name: 'Time on site', note: 'How long did they browse?', strength: 'weak' },
      { name: 'Content downloads', note: 'Did they download your whitepaper?', strength: 'moderate' },
    ],
    limitation: 'These show activity, but not commitment. A tire-kicker can score high on all of these.',
  }

  const intentSignals = {
    title: 'Intent Signals',
    subtitle: 'What actually predicts conversion',
    signals: [
      { name: 'Project urgency', note: 'When do they want to start?', strength: 'strong' },
      { name: 'Financial capacity', note: 'Can they fund the project?', strength: 'strong' },
      { name: 'Neighborhood history', note: 'Have you succeeded in their area?', strength: 'strong' },
      { name: 'Stated timeline', note: 'Have they committed to a date?', strength: 'strong' },
      { name: 'External triggers', note: 'Insurance claims, life events, etc.', strength: 'moderate' },
    ],
    advantage: 'These reveal readiness to buy. A quiet lead with strong intent signals often closes faster.',
  }

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'bg-teal-100 border-teal-200 text-teal-700'
      case 'moderate': return 'bg-amber-50 border-amber-200 text-amber-700'
      case 'weak': return 'bg-gray-50 border-gray-200 text-gray-600'
      default: return 'bg-gray-50 border-gray-200 text-gray-600'
    }
  }

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case 'strong': return 'Strong predictor'
      case 'moderate': return 'Moderate'
      case 'weak': return 'Weak predictor'
      default: return ''
    }
  }

  return (
    <div className={`${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Engagement Signals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-border shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-border bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{engagementSignals.title}</h3>
                <p className="text-sm text-text-muted">{engagementSignals.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {engagementSignals.signals.map((signal, index) => (
              <motion.div
                key={signal.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getStrengthColor(signal.strength)}`}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{signal.name}</div>
                  <div className="text-xs text-text-muted">{signal.note}</div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                  {getStrengthLabel(signal.strength)}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-border bg-gray-50">
            <p className="text-sm text-text-secondary italic">{engagementSignals.limitation}</p>
          </div>
        </motion.div>

        {/* Intent Signals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border-2 border-teal-200 shadow-card overflow-hidden"
        >
          <div className="p-6 border-b border-teal-100 bg-teal-50/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{intentSignals.title}</h3>
                <p className="text-sm text-text-muted">{intentSignals.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {intentSignals.signals.map((signal, index) => (
              <motion.div
                key={signal.name}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-center gap-3 p-3 rounded-lg border ${getStrengthColor(signal.strength)}`}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary">{signal.name}</div>
                  <div className="text-xs text-text-muted">{signal.note}</div>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                  {getStrengthLabel(signal.strength)}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-teal-100 bg-teal-50">
            <p className="text-sm text-teal-700 italic">{intentSignals.advantage}</p>
          </div>
        </motion.div>
      </div>

      {/* Key insight - educational framing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-6 bg-purple-50 rounded-xl border border-purple-100"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-2">Why Does This Matter?</h4>
            <p className="text-sm text-text-secondary mb-3">
              Most CRM scoring tools default to engagement metrics because they're easy to track automatically.
              But engagement measures <em>interest</em>, not <em>readiness</em>. The challenge is that intent signals
              often require combining CRM data with external sources - property records, census data, market trends -
              that standard tools don't access.
            </p>
            <p className="text-sm text-text-secondary">
              When we rebuilt scoring around intent signals instead of engagement, conversion rates improved by{' '}
              <span className="font-semibold text-purple-700">31%</span> compared to standard Salesforce lead scoring.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
