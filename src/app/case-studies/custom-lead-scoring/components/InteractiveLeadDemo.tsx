'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Lead {
  id: number
  name: string
  company: string
  role: string
  engagement: string
  financialSignals: string
  marketContext: string
  actualScore: number
  willConvert: boolean
  whyItMatters: string
}

const sampleLeads: Lead[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    company: 'TechFlow Inc.',
    role: 'VP of Operations',
    engagement: 'Downloaded whitepaper, visited pricing page 3x',
    financialSignals: 'Company raised Series B, expanding team',
    marketContext: 'Competitors in their space already use similar solutions',
    actualScore: 92,
    willConvert: true,
    whyItMatters: 'Financial capacity + buying signals + market pressure = high intent',
  },
  {
    id: 2,
    name: 'Mike Johnson',
    company: 'StartupXYZ',
    role: 'Founder',
    engagement: 'Opened 12 emails, attended webinar',
    financialSignals: 'Pre-revenue startup, bootstrapped',
    marketContext: 'New market entrant, exploring options',
    actualScore: 34,
    willConvert: false,
    whyItMatters: 'High engagement but no financial capacity - a "tire kicker"',
  },
  {
    id: 3,
    name: 'Lisa Park',
    company: 'Enterprise Global',
    role: 'Director of IT',
    engagement: 'One demo request, no follow-up',
    financialSignals: 'Fortune 500, active vendor budget',
    marketContext: 'Current vendor contract expiring in 3 months',
    actualScore: 78,
    willConvert: true,
    whyItMatters: 'Low engagement but strong buying signals - needs nurturing, not ignoring',
  },
  {
    id: 4,
    name: 'James Wilson',
    company: 'Local Services Co.',
    role: 'Owner',
    engagement: 'Filled out contact form, called office',
    financialSignals: 'Stable small business, limited budget',
    marketContext: 'No competitors using similar solutions locally',
    actualScore: 45,
    willConvert: false,
    whyItMatters: 'Interested but market signals show low urgency and fit',
  },
]

interface InteractiveLeadDemoProps {
  className?: string
}

export default function InteractiveLeadDemo({ className = '' }: InteractiveLeadDemoProps) {
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [selectedLead, setSelectedLead] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Create pairs of leads to compare
  const leadPairs = [
    [sampleLeads[0], sampleLeads[1]], // Sarah vs Mike
    [sampleLeads[2], sampleLeads[3]], // Lisa vs James
  ]

  const currentPair = leadPairs[currentPairIndex]
  const isComplete = currentPairIndex >= leadPairs.length

  const handleSelect = (leadId: number) => {
    if (showResult) return
    setSelectedLead(leadId)
    setShowResult(true)

    // Check if correct (selected the one that will convert)
    const selected = currentPair.find(l => l.id === leadId)
    if (selected?.willConvert) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }))
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }))
    }
  }

  const handleNext = () => {
    setCurrentPairIndex(prev => prev + 1)
    setSelectedLead(null)
    setShowResult(false)
  }

  const handleReset = () => {
    setCurrentPairIndex(0)
    setSelectedLead(null)
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
  }

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-white rounded-2xl border border-border shadow-card p-8 ${className}`}
      >
        <div className="text-center max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-20 h-20 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-4xl">{score.correct === score.total ? '*' : '?'}</span>
          </motion.div>

          <h3 className="text-2xl font-bold text-text-primary mb-2">
            {score.correct === score.total ? 'Great Intuition!' : 'Tricky, Right?'}
          </h3>

          <p className="text-text-secondary mb-6">
            You got <span className="font-semibold text-teal-500">{score.correct} out of {score.total}</span> correct.
            {score.correct < score.total && (
              <span className="block mt-2">
                Do not worry - even experienced sales reps struggle with this. That is exactly why AI scoring helps.
              </span>
            )}
          </p>

          <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 mb-6">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-teal-600">The insight:</span> Traditional metrics like email opens
              and page views can be misleading. AI scoring looks at the complete picture - financial signals,
              market context, and behavioral patterns together.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border bg-bg-secondary/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Which Lead Would You Call First?</h3>
            <p className="text-sm text-text-muted">Test your intuition against AI scoring</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Round {currentPairIndex + 1}/{leadPairs.length}</span>
            <div className="flex gap-1">
              {leadPairs.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < currentPairIndex
                      ? 'bg-teal-500'
                      : i === currentPairIndex
                      ? 'bg-teal-500/50'
                      : 'bg-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lead Cards */}
      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {currentPair.map((lead) => {
            const isSelected = selectedLead === lead.id
            const isWinner = showResult && lead.willConvert
            const isLoser = showResult && !lead.willConvert && isSelected

            return (
              <motion.button
                key={lead.id}
                onClick={() => handleSelect(lead.id)}
                disabled={showResult}
                className={`text-left p-6 rounded-xl border-2 transition-all duration-300 ${
                  isWinner
                    ? 'border-green-500 bg-green-50'
                    : isLoser
                    ? 'border-red-400 bg-red-50'
                    : isSelected
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-border hover:border-teal-300 hover:shadow-md'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                {/* Lead header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-text-primary">{lead.name}</h4>
                    <p className="text-sm text-text-muted">{lead.role} at {lead.company}</p>
                  </div>
                  {showResult && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        lead.willConvert
                          ? 'bg-green-500 text-white'
                          : 'bg-red-400 text-white'
                      }`}
                    >
                      Score: {lead.actualScore}
                    </motion.div>
                  )}
                </div>

                {/* Lead details */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Engagement
                    </div>
                    <p className="text-sm text-text-secondary">{lead.engagement}</p>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Financial Signals
                    </div>
                    <p className="text-sm text-text-secondary">{lead.financialSignals}</p>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Market Context
                    </div>
                    <p className="text-sm text-text-secondary">{lead.marketContext}</p>
                  </div>
                </div>

                {/* Result explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <div className={`flex items-start gap-2 ${lead.willConvert ? 'text-green-700' : 'text-red-600'}`}>
                        <span>{lead.willConvert ? '+' : '-'}</span>
                        <p className="text-sm">{lead.whyItMatters}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        {/* Next button */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors inline-flex items-center gap-2"
              >
                {currentPairIndex < leadPairs.length - 1 ? 'Next Round' : 'See Results'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
