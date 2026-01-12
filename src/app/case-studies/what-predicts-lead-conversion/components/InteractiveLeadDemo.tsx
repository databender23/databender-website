'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Lead {
  id: number
  name: string
  location: string
  projectType: string
  urgency: string
  financialCapacity: string
  neighborhoodHistory: string
  propertyValue: string
  actualScore: 'High' | 'Medium' | 'Low'
  willConvert: boolean
  whyItMatters: string
}

// Leads designed to challenge intuition about property value
const sampleLeads: Lead[] = [
  {
    id: 1,
    name: 'The Thompsons',
    location: 'Scottsdale, AZ',
    projectType: 'Complete roof replacement',
    urgency: 'Timeline: "Need it done before monsoon season" (2 months)',
    financialCapacity: 'Recently refinanced, significant home equity available',
    neighborhoodHistory: 'Two neighbors completed similar projects last year',
    propertyValue: '$485,000 home',
    actualScore: 'High',
    willConvert: true,
    whyItMatters: 'Urgent timeline + available financing + local proof = high conversion. Property value is middle-of-the-road, but that doesn\'t matter.',
  },
  {
    id: 2,
    name: 'The Parkers',
    location: 'Paradise Valley, AZ',
    projectType: 'Premium roofing upgrade',
    urgency: 'Timeline: "Sometime in the next year or two"',
    financialCapacity: 'High income, but no indication of available financing',
    neighborhoodHistory: 'No recent projects in their neighborhood',
    propertyValue: '$1.2M home',
    actualScore: 'Low',
    willConvert: false,
    whyItMatters: 'Million-dollar home, but no urgency and no local proof. This is the "tire kicker" profile that wastes sales time.',
  },
  {
    id: 3,
    name: 'Robert Chen',
    location: 'Mesa, AZ',
    projectType: 'Storm damage repair',
    urgency: 'Timeline: "Insurance adjuster coming next week"',
    financialCapacity: 'Insurance claim approved, funds secured',
    neighborhoodHistory: 'New market area, no previous sales',
    propertyValue: '$320,000 home',
    actualScore: 'High',
    willConvert: true,
    whyItMatters: 'Extreme urgency + guaranteed funding overrides lack of local history. Lower property value, but this lead will close.',
  },
  {
    id: 4,
    name: 'The Hendersons',
    location: 'Fountain Hills, AZ',
    projectType: 'Considering options for next home',
    urgency: 'Timeline: "Just researching for now"',
    financialCapacity: 'Affluent, multiple properties',
    neighborhoodHistory: 'Popular area with several past projects',
    propertyValue: '$890,000 home',
    actualScore: 'Low',
    willConvert: false,
    whyItMatters: 'Despite the high property value and affluent profile, "just researching" means months of follow-up with no close.',
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

  // Pairs designed to test intuition: high-value home vs urgent modest home
  const leadPairs = [
    [sampleLeads[0], sampleLeads[1]], // Thompsons (converts) vs Parkers ($1.2M, doesn't)
    [sampleLeads[2], sampleLeads[3]], // Chen (converts) vs Hendersons ($890k, doesn't)
  ]

  const currentPair = leadPairs[currentPairIndex]
  const isComplete = currentPairIndex >= leadPairs.length

  const handleSelect = (leadId: number) => {
    if (showResult) return
    setSelectedLead(leadId)
    setShowResult(true)

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
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              score.correct === score.total ? 'bg-teal-500/10' : 'bg-amber-500/10'
            }`}
          >
            <span className="text-4xl">{score.correct === score.total ? '!' : '?'}</span>
          </motion.div>

          <h3 className="text-2xl font-bold text-text-primary mb-2">
            {score.correct === score.total ? 'You spotted the pattern!' : 'Property value is deceiving'}
          </h3>

          <p className="text-text-secondary mb-6">
            You got <span className="font-semibold text-teal-500">{score.correct} out of {score.total}</span> correct.
            {score.correct < score.total && (
              <span className="block mt-2">
                Most people assume expensive homes mean better leads. The data shows the opposite.
              </span>
            )}
          </p>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 mb-6">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-purple-700">The insight:</span> In both rounds, the lower-value
              property converted while the expensive one didn't. Why? <span className="font-medium">Urgency and
              financial capacity predict behavior. Property value doesn't.</span>
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
      {/* Header - mobile responsive */}
      <div className="p-4 sm:p-6 border-b border-border bg-bg-secondary/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-text-primary">Which Lead Will Convert?</h3>
            <p className="text-sm text-text-muted">Test your intuition against the data</p>
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
      <div className="p-4 sm:p-6">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {currentPair.map((lead) => {
            const isSelected = selectedLead === lead.id
            const isWinner = showResult && lead.willConvert
            const isLoser = showResult && !lead.willConvert && isSelected

            return (
              <motion.button
                key={lead.id}
                onClick={() => handleSelect(lead.id)}
                disabled={showResult}
                className={`text-left p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
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
                    <p className="text-sm text-text-muted">{lead.location}</p>
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
                      {lead.actualScore} Priority
                    </motion.div>
                  )}
                </div>

                {/* Lead details */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Project
                    </div>
                    <p className="text-sm text-text-secondary">{lead.projectType}</p>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Timeline
                    </div>
                    <p className="text-sm text-text-secondary">{lead.urgency}</p>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Financial Situation
                    </div>
                    <p className="text-sm text-text-secondary">{lead.financialCapacity}</p>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Local History
                    </div>
                    <p className="text-sm text-text-secondary">{lead.neighborhoodHistory}</p>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
                      Property Value
                    </div>
                    <p className="text-sm font-semibold text-text-primary">{lead.propertyValue}</p>
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
