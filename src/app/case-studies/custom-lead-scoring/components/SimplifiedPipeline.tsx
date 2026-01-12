'use client'

import { motion } from 'framer-motion'

interface SimplifiedPipelineProps {
  className?: string
}

export default function SimplifiedPipeline({ className = '' }: SimplifiedPipelineProps) {
  const stages = [
    {
      id: 'data-in',
      icon: '...',
      label: 'Data In',
      description: 'CRM, market signals, demographics',
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      id: 'analysis',
      icon: '(@)',
      label: 'AI Analysis',
      description: 'Pattern discovery & scoring',
      color: 'bg-teal-500',
      lightColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
    },
    {
      id: 'score',
      icon: '#',
      label: 'Score Assigned',
      description: '0-100 conversion probability',
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      id: 'crm',
      icon: '+',
      label: 'CRM Updated',
      description: 'Real-time, automatic sync',
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
  ]

  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary text-center">How It Works</h3>
        <p className="text-sm text-text-muted text-center">From raw data to prioritized leads in seconds</p>
      </div>

      {/* Pipeline visualization */}
      <div className="p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              {/* Stage card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col items-center p-6 rounded-xl ${stage.lightColor} border ${stage.borderColor} w-40`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 ${stage.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                  <span className="text-2xl text-white">{stage.icon}</span>
                </div>

                {/* Label */}
                <h4 className="font-semibold text-text-primary text-center mb-1">
                  {stage.label}
                </h4>

                {/* Description */}
                <p className="text-xs text-text-muted text-center">
                  {stage.description}
                </p>

                {/* Step number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-text-primary text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </motion.div>

              {/* Arrow connector */}
              {index < stages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.15 }}
                  className="hidden md:flex items-center px-4"
                >
                  <motion.svg
                    className="w-12 h-6 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 24"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M0 12h40M32 4l8 8-8 8"
                      strokeDasharray="48"
                      animate={{
                        strokeDashoffset: [48, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                        delay: index * 0.5,
                      }}
                    />
                  </motion.svg>
                </motion.div>
              )}

              {/* Mobile arrow (vertical) */}
              {index < stages.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="md:hidden py-2"
                >
                  <svg className="w-6 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 32">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 0v24M4 16l8 8 8-8" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Time indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full border border-teal-100">
            <motion.div
              className="w-2 h-2 rounded-full bg-teal-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-teal-600">
              New leads scored in ~30 seconds
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom callout */}
      <div className="p-6 border-t border-border bg-bg-secondary">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-text-secondary">Runs 24/7 autonomously</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-text-secondary">Self-healing with auto-retry</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-text-secondary">No manual intervention needed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
