'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  id: string
  name: string
  businessQuestion: string
  rank: number
  direction: 'positive' | 'negative'
  isKeyPredictor: boolean
  explanation: string
  dataSource: string
  surprising?: boolean
}

// Features ordered by actual predictive importance from data analysis
// Each includes the business/psychological reason WHY it predicts conversion
const features: Feature[] = [
  {
    id: 'urgency',
    name: 'Project Urgency',
    businessQuestion: 'How soon do they want to start?',
    rank: 1,
    direction: 'positive',
    isKeyPredictor: true,
    explanation: 'Urgency is the strongest predictor because it signals psychological commitment. When someone says "I need this done before monsoon season," they\'ve mentally moved from browsing to buying. Research on consumer behavior shows that stated deadlines correlate strongly with purchase completion - they create internal pressure to act.',
    dataSource: 'CRM Data',
  },
  {
    id: 'financial',
    name: 'Financial Capacity',
    businessQuestion: 'Can they fund the project?',
    rank: 2,
    direction: 'positive',
    isKeyPredictor: true,
    explanation: 'Interest without ability to pay creates stalled deals. Financial capacity (available home equity, approved financing, insurance claims) removes the biggest friction point in the buying process. Even highly motivated buyers delay when they need to figure out how to pay.',
    dataSource: 'Property Data',
  },
  {
    id: 'local-success',
    name: 'Neighborhood Penetration',
    businessQuestion: 'Have you succeeded in their area?',
    rank: 3,
    direction: 'positive',
    isKeyPredictor: true,
    explanation: 'Social proof is powerful. When homeowners see neighbors with successful projects, it reduces perceived risk and provides visual validation. There\'s also a practical element: sales reps familiar with an area build relationships and referral networks that accelerate deals.',
    dataSource: 'Internal Sales History',
  },
  {
    id: 'property-size',
    name: 'Property Size',
    businessQuestion: 'Is the project scope worthwhile?',
    rank: 4,
    direction: 'positive',
    isKeyPredictor: false,
    explanation: 'Larger properties mean larger projects and higher contract values, which makes sense for high-ticket sales. However, it\'s a weaker signal than urgency or capacity because size doesn\'t indicate whether someone is ready to buy now.',
    dataSource: 'Property Data',
  },
  {
    id: 'household',
    name: 'Household Composition',
    businessQuestion: 'What does the household look like?',
    rank: 5,
    direction: 'negative',
    isKeyPredictor: false,
    explanation: 'Smaller households (empty nesters, retirees) have fewer competing priorities for their time and money. Families with young children juggle childcare costs, college savings, and limited bandwidth - even when they want to invest in their home, other priorities often win.',
    dataSource: 'Census Demographics',
  },
  {
    id: 'income',
    name: 'Income Level',
    businessQuestion: 'What is their income?',
    rank: 6,
    direction: 'positive',
    isKeyPredictor: false,
    explanation: 'Income is a weak predictor because it measures earning, not spending behavior. High earners often have equally high expenses, while moderate earners with good savings habits may be more ready to invest in home improvements.',
    dataSource: 'Census Demographics',
  },
  {
    id: 'property-value',
    name: 'Property Value',
    businessQuestion: 'How valuable is the property?',
    rank: 7,
    direction: 'negative',
    isKeyPredictor: false,
    explanation: 'The counterintuitive finding: property value was slightly negative. Higher-value homeowners often have more options, shop longer, and are more price-sensitive despite their wealth. They\'re also frequently targeted by competitors, leading to decision paralysis.',
    dataSource: 'Housing Market Data',
    surprising: true,
  },
]

// Convert rank to visual importance (inverted scale for progress bar)
const rankToImportance = (rank: number): number => {
  const importanceMap: Record<number, number> = {
    1: 95,
    2: 78,
    3: 62,
    4: 45,
    5: 35,
    6: 22,
    7: 12,
  }
  return importanceMap[rank] || 10
}

interface FeatureImportanceV2Props {
  className?: string
}

export default function FeatureImportanceV2({ className = '' }: FeatureImportanceV2Props) {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">What the Data Revealed</h3>
        <p className="text-sm text-text-muted mt-1">
          Signals ranked by how well they predict actual conversion. Click any row to understand why.
        </p>
      </div>

      {/* Features list */}
      <div className="p-6 space-y-4">
        {features.map((feature, index) => {
          const importance = rankToImportance(feature.rank)

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <button
                onClick={() => setExpandedFeature(
                  expandedFeature === feature.id ? null : feature.id
                )}
                className="w-full text-left"
              >
                {/* Mobile-optimized layout */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Rank badge */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                      feature.isKeyPredictor
                        ? 'bg-teal-500 text-white'
                        : 'bg-bg-secondary text-text-muted'
                    }`}>
                      {feature.rank}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Feature name and chevron on same line */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-text-primary truncate">
                          {feature.name}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedFeature === feature.id ? 180 : 0 }}
                          className="text-text-muted flex-shrink-0"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Badges wrap to second line on mobile */}
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {/* Direction indicator */}
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          feature.direction === 'positive'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {feature.direction === 'positive' ? 'Higher = Better' : 'Lower = Better'}
                        </span>

                        {/* Surprise badge */}
                        {feature.surprising && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                            Counterintuitive
                          </span>
                        )}

                        {/* Data source - hidden on mobile, shown on larger screens */}
                        <span className="text-xs text-text-muted hidden sm:inline">
                          {feature.dataSource}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar showing relative importance */}
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      feature.isKeyPredictor
                        ? 'bg-gradient-to-r from-teal-400 to-teal-500'
                        : feature.surprising
                        ? 'bg-gradient-to-r from-purple-300 to-purple-400'
                        : 'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${importance}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </button>

              {/* Expanded explanation */}
              <AnimatePresence>
                {expandedFeature === feature.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-3 p-4 rounded-lg ${
                      feature.surprising ? 'bg-purple-50 border border-purple-100' : 'bg-bg-secondary'
                    }`}>
                      <p className="text-sm text-text-secondary mb-2">
                        <span className="font-medium text-text-primary">{feature.businessQuestion}</span>
                      </p>
                      <p className="text-sm text-text-secondary">
                        {feature.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Key insight callout */}
      <div className="p-6 border-t border-border bg-purple-50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">The Key Insight</h4>
            <p className="text-sm text-text-secondary">
              The top 3 predictors all relate to <span className="font-medium">readiness to act</span>: urgency
              (timeline commitment), capacity (ability to pay), and local success (reduced perceived risk).
              Demographic factors like income and property value - the "obvious" signals - ranked at the bottom.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
