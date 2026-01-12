'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Feature {
  technicalName: string
  businessQuestion: string
  importance: number
  isKeyPredictor: boolean
  explanation: string
}

const features: Feature[] = [
  {
    technicalName: 'Financial Capacity Signal',
    businessQuestion: 'Can they afford your product?',
    importance: 85,
    isKeyPredictor: true,
    explanation: 'Funding status, revenue signals, and budget indicators predict ability to buy.',
  },
  {
    technicalName: 'Urgency Indicator',
    businessQuestion: 'Are they under time pressure?',
    importance: 72,
    isKeyPredictor: true,
    explanation: 'Contract expirations, growth events, and timeline language indicate buying urgency.',
  },
  {
    technicalName: 'Local Success Rate',
    businessQuestion: 'Do companies like theirs tend to buy?',
    importance: 68,
    isKeyPredictor: true,
    explanation: 'Historical conversion rates for similar company profiles and geographies.',
  },
  {
    technicalName: 'Deal Size Indicator',
    businessQuestion: 'Is the opportunity worth pursuing?',
    importance: 55,
    isKeyPredictor: false,
    explanation: 'Estimated contract value based on company size and stated needs.',
  },
  {
    technicalName: 'Engagement Recency',
    businessQuestion: 'How recently did they show interest?',
    importance: 45,
    isKeyPredictor: false,
    explanation: 'Days since last meaningful interaction - recent engagement predicts readiness.',
  },
  {
    technicalName: 'Economic Context',
    businessQuestion: 'Is their market healthy?',
    importance: 38,
    isKeyPredictor: false,
    explanation: 'Industry growth, market conditions, and economic indicators for their sector.',
  },
  {
    technicalName: 'Firmographic Fit',
    businessQuestion: 'Do they match your ideal customer?',
    importance: 28,
    isKeyPredictor: false,
    explanation: 'Company size, industry, and profile match against your best customers.',
  },
]

interface FeatureImportanceV2Props {
  className?: string
}

export default function FeatureImportanceV2({ className = '' }: FeatureImportanceV2Props) {
  const [showTechnical, setShowTechnical] = useState(false)
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">What the AI Looks At</h3>
            <p className="text-sm text-text-muted">7 signals that predict which leads will convert</p>
          </div>

          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              showTechnical
                ? 'bg-teal-500 text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
            }`}
          >
            {showTechnical ? 'Business View' : 'Technical View'}
          </button>
        </div>
      </div>

      {/* Features list */}
      <div className="p-6 space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.technicalName}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative"
          >
            <button
              onClick={() => setExpandedFeature(
                expandedFeature === feature.technicalName ? null : feature.technicalName
              )}
              className="w-full text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {/* Key predictor badge */}
                  {feature.isKeyPredictor && (
                    <div className="w-2 h-2 rounded-full bg-teal-500" title="Key predictor" />
                  )}

                  {/* Feature name - toggle between business and technical */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={showTechnical ? 'tech' : 'business'}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="font-medium text-text-primary"
                    >
                      {showTechnical ? feature.technicalName : feature.businessQuestion}
                    </motion.span>
                  </AnimatePresence>

                  {/* Key predictor label */}
                  {feature.isKeyPredictor && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-teal-500/10 text-teal-600 rounded-full">
                      Key Predictor
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${
                    feature.isKeyPredictor ? 'text-teal-500' : 'text-text-muted'
                  }`}>
                    {feature.importance}%
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFeature === feature.technicalName ? 180 : 0 }}
                    className="text-text-muted"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    feature.isKeyPredictor
                      ? 'bg-gradient-to-r from-teal-400 to-teal-500'
                      : 'bg-gradient-to-r from-gray-300 to-gray-400'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${feature.importance}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
              </div>
            </button>

            {/* Expanded explanation */}
            <AnimatePresence>
              {expandedFeature === feature.technicalName && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-4 bg-bg-secondary rounded-lg">
                    <p className="text-sm text-text-secondary">
                      {feature.explanation}
                    </p>
                    {showTechnical && (
                      <p className="mt-2 text-xs text-text-muted">
                        Business question: &quot;{feature.businessQuestion}&quot;
                      </p>
                    )}
                    {!showTechnical && (
                      <p className="mt-2 text-xs text-text-muted">
                        Technical name: {feature.technicalName}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Insight callout */}
      <div className="p-6 border-t border-border bg-teal-50/50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">*</span>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-1">The Insight</h4>
            <p className="text-sm text-text-secondary">
              Generic CRM scoring focuses on engagement (email opens, page views).
              Custom ML scoring focuses on <span className="font-semibold text-teal-600">ability and intent to buy</span> -
              a completely different question with much better predictive power.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
