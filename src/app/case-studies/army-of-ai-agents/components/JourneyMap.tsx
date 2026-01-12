'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface JourneyMapProps {
  className?: string
}

const journeySteps = [
  {
    id: 1,
    icon: 'chaos',
    title: 'Fix Collision IDs',
    plainEnglish: 'Separate people who share an ID',
    description: '44,421 groups where different people shared the same Owner ID. We split them into 51,609 unique COL-* IDs.',
    color: '#f97316', // orange
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 2,
    icon: 'sort',
    title: 'Consolidate Unstable IDs',
    plainEnglish: 'Merge records for same person',
    description: '99,581 groups where one person had multiple IDs. Consolidated into UNS-* IDs using 10 different match types.',
    color: '#8b5cf6', // purple
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 3,
    icon: 'match',
    title: 'Cross-Reference Check',
    plainEnglish: 'Find duplicates across processes',
    description: 'Some owners appeared in both Step 1 and Step 2. Found 3,889 matches, created 3,670 UNIFIED-* IDs.',
    color: '#3b82f6', // blue
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 4,
    icon: 'verify',
    title: 'Match Stable Records',
    plainEnglish: 'Connect clean records to groups',
    description: '1.38 million stable records matched to consolidated groups. Used location, address, and name-based matching.',
    color: '#1A9988', // teal
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/30',
  },
  {
    id: 5,
    icon: 'golden',
    title: 'Apply Exclude List',
    plainEnglish: 'Match do-not-contact owners',
    description: '5,724 owners on the exclude list. Matched 4,817 (84.2%) to the cleaned database. Automatic suppression.',
    color: '#22c55e', // green
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
]

function StepIcon({ type, color }: { type: string; color: string }) {
  const iconStyle = { color }

  switch (type) {
    case 'chaos':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8l2 2m0-2L8 10m6-2l2 2m0-2l-2 2" />
        </svg>
      )
    case 'sort':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      )
    case 'match':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    case 'verify':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'golden':
      return (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    default:
      return null
  }
}

export default function JourneyMap({ className = '' }: JourneyMapProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <div className={`${className}`}>
      {/* Journey path - horizontal on desktop, vertical on mobile */}
      <div className="relative">
        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/30 via-purple-500/30 via-blue-500/30 via-teal-500/30 to-emerald-500/30" />

          <div className="grid grid-cols-5 gap-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step node */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center relative z-10 bg-bg-primary cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <StepIcon type={step.icon} color={step.color} />
                  </motion.div>

                  {/* Arrow between steps */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)]">
                      <svg className="w-full h-2" viewBox="0 0 100 8" fill="none">
                        <path
                          d="M0 4 L90 4 M85 0 L95 4 L85 8"
                          stroke={step.color}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.5"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Step content */}
                  <div className="mt-4 text-center">
                    <p className="text-xs font-medium text-text-muted mb-1">Step {step.id}</p>
                    <h4 className="font-semibold text-text-primary text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-text-muted italic">{step.plainEnglish}</p>
                  </div>
                </div>

                {/* Expanded tooltip on hover */}
                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 w-64 p-4 rounded-xl ${step.bgColor} border ${step.borderColor} bg-bg-primary shadow-lg z-20`}
                  >
                    <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: Vertical layout */}
        <div className="lg:hidden space-y-6">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-xl ${step.bgColor} border ${step.borderColor} flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <StepIcon type={step.icon} color={step.color} />
                  </motion.div>
                  {index < journeySteps.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <p className="text-xs font-medium text-text-muted mb-1">Step {step.id}</p>
                  <h4 className="font-semibold text-text-primary mb-1">{step.title}</h4>
                  <p className="text-sm text-teal-500 italic mb-2">{step.plainEnglish}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-6 rounded-xl bg-gradient-to-r from-orange-500/5 via-teal-500/10 to-emerald-500/5 border border-teal-500/20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-orange-500">1.69M</p>
            <p className="text-xs text-text-muted">Records Processed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-500">44,421</p>
            <p className="text-xs text-text-muted">Collision Groups Fixed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-teal-500">99,581</p>
            <p className="text-xs text-text-muted">Unstable IDs Merged</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-500">1.25M</p>
            <p className="text-xs text-text-muted">Unique Owners</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
