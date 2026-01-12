'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { colors, heroMetrics } from './DiagramConfig'

interface StepAnnotationsProps {
  currentStep: number
  className?: string
}

// Step content configurations - multi-workflow agentic pipeline
const stepContents = [
  {
    step: 1,
    title: 'The Data Chaos',
    subtitle: 'Where it all begins',
    description: 'Records scattered across multiple source systems. Each uses different identifiers and data quality standards with no unified view.',
    stats: [
      { label: 'Total Records', value: '1.5M+', color: colors.chaos.red },
      { label: 'Source Systems', value: '3+', color: colors.chaos.orange },
      { label: 'No Unified ID', value: 'None', color: colors.chaos.yellow },
    ],
    icon: 'chaos',
    color: colors.chaos.orange,
  },
  {
    step: 2,
    title: 'Orchestrator Coordination',
    subtitle: 'Autonomous pipeline control',
    description: 'The Orchestrator Agent autonomously coordinates the entire pipeline, routing records through specialized workflows without human intervention.',
    stats: [
      { label: 'Workflows', value: '4', color: colors.orchestrator.teal },
      { label: 'Autonomous', value: '24/7', color: colors.subagent.purple },
      { label: 'Throughput', value: 'High', color: colors.success.teal },
    ],
    icon: 'brain',
    color: colors.orchestrator.teal,
  },
  {
    step: 3,
    title: 'Parallel Workflows',
    subtitle: 'Concurrent processing',
    description: 'Multiple workflows process different record types simultaneously. Group matching and temporal alignment run in parallel for speed.',
    stats: [
      { label: 'Parallel', value: 'Yes', color: colors.subagent.purple },
      { label: 'Match Types', value: '4', color: colors.chaos.orange },
      { label: 'Speed Gain', value: '10x', color: colors.success.teal },
    ],
    icon: 'filter',
    color: colors.subagent.purple,
  },
  {
    step: 4,
    title: 'Cross-Reference Matching',
    subtitle: 'Intelligent matching',
    description: 'Multi-step process: deduplication within sources, cross-referencing between sources, and confidence-based matching creates unified identifiers.',
    stats: [
      { label: 'Master Records', value: '1M+', color: colors.subagent.blue },
      { label: 'Confidence', value: '85%+', color: colors.subagent.indigo },
      { label: 'Unified IDs', value: '100K', color: colors.success.teal },
    ],
    icon: 'link',
    color: colors.subagent.blue,
  },
  {
    step: 5,
    title: 'Strategy Cascade',
    subtitle: 'Parallel matching strategies',
    description: 'Multiple matching strategies run in parallel: exact matching, fuzzy name matching, contextual patterns. Each optimized for different scenarios.',
    stats: [
      { label: 'Strategies', value: '10', color: colors.subagent.blue },
      { label: 'Parallel', value: 'Yes', color: colors.subagent.indigo },
      { label: 'Match Rate', value: '87%', color: colors.success.teal },
    ],
    icon: 'parallel',
    color: colors.subagent.blue,
  },
  {
    step: 6,
    title: 'Post-Match Validation',
    subtitle: 'Quality assurance',
    description: 'Automated rejection rules catch false positives. Confidence scoring ensures only high-quality matches. Edge cases flagged for AI review.',
    stats: [
      { label: 'Quality Rules', value: '8+', color: colors.success.green },
      { label: 'Confidence', value: '50-100%', color: colors.success.teal },
      { label: 'False Positives', value: '<2%', color: colors.subagent.purple },
    ],
    icon: 'shield',
    color: colors.success.green,
  },
  {
    step: 7,
    title: 'AI Review System',
    subtitle: 'Human-level reasoning',
    description: 'AI agents review ambiguous matches using human-level reasoning. Decisions documented with explanations. Feedback loops improve future matching.',
    stats: [
      { label: 'AI Reviews', value: '~5%', color: colors.chaos.orange },
      { label: 'Approval Rate', value: '94%', color: colors.success.green },
      { label: 'Self-Improving', value: 'Yes', color: colors.success.teal },
    ],
    icon: 'brain',
    color: colors.chaos.orange,
  },
  {
    step: 8,
    title: 'Unified Records',
    subtitle: 'Transformation complete',
    description: 'Golden master records with unique identifiers. Every decision documented with full audit trail for compliance and transparency.',
    stats: [
      { label: 'Unique IDs', value: '100K', color: colors.success.teal },
      { label: 'Cost Savings', value: '125x', color: colors.subagent.purple },
      { label: 'Audit Trail', value: '100%', color: colors.success.green },
    ],
    icon: 'check',
    color: colors.success.teal,
  },
]

// Icon components
function StepIcon({ type, color }: { type: string; color: string }) {
  const iconStyle = { color }

  switch (type) {
    case 'chaos':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 8l2 2m0-2L8 10m6-2l2 2m0-2l-2 2" />
        </svg>
      )
    case 'brain':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    case 'filter':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      )
    case 'parallel':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'retry':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    case 'check':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'link':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={iconStyle}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    default:
      return null
  }
}

export default function StepAnnotations({
  currentStep,
  className = '',
}: StepAnnotationsProps) {
  const currentContent = stepContents.find((s) => s.step === currentStep)
  const totalSteps = stepContents.length

  if (!currentContent) return null

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Step indicator */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{ backgroundColor: `${currentContent.color}20` }}
            >
              <StepIcon type={currentContent.icon} color={currentContent.color} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                Step {currentStep} of {totalSteps}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: currentContent.color }}
              >
                {currentContent.subtitle}
              </p>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentContent.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {currentContent.description}
          </motion.p>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {currentContent.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <p
                  className="text-lg md:text-xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-white/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between text-xs text-white/40 mb-2">
              <span>Pipeline Progress</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${colors.chaos.orange}, ${colors.subagent.purple}, ${colors.success.teal})`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Final step hero metrics */}
      <AnimatePresence>
        {currentStep === 8 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 p-6 rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-purple-500/10"
          >
            <div className="text-center">
              <p className="text-sm text-white/60 mb-2">Total Transformation</p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    ${heroMetrics.aiCost}
                  </p>
                  <p className="text-xs text-teal-400">AI Cost</p>
                </div>
                <div className="text-white/30 text-2xl">vs</div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white/50 line-through">
                    ${heroMetrics.manualCost.toLocaleString()}+
                  </p>
                  <p className="text-xs text-white/40">Manual Cost</p>
                </div>
              </div>
              <motion.div
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.05, 1] }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-xl font-bold text-white">
                  {heroMetrics.costSavingsMultiplier}x Cost Savings
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Export step data for external use
export { stepContents }
