'use client'

import { motion } from 'framer-motion'

interface WorkflowAnimationProps {
  className?: string
  isActive?: boolean
}

const steps = [
  { icon: '📥', label: 'Input' },
  { icon: '⚙️', label: 'Process' },
  { icon: '🤖', label: 'AI' },
  { icon: '📊', label: 'Output' },
]

export default function WorkflowAnimation({
  className = '',
  isActive = true
}: WorkflowAnimationProps) {
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          {/* Step Box */}
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
          >
            {/* Highlight ring */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  border: '2px solid #1A9988',
                  boxShadow: '0 0 12px rgba(26, 153, 136, 0.4)'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  delay: index * 0.5,
                  repeat: Infinity,
                  repeatDelay: steps.length * 0.5 - 0.5,
                }}
              />
            )}

            {/* Box */}
            <div
              className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="text-xl sm:text-2xl">{step.icon}</span>
            </div>

            {/* Label */}
            <span className="mt-1 text-[10px] sm:text-xs text-white/70 font-medium">
              {step.label}
            </span>
          </motion.div>

          {/* Arrow connector */}
          {index < steps.length - 1 && (
            <motion.div
              className="mx-1 sm:mx-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 + 0.1, duration: 0.3 }}
            >
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                className="text-[#1A9988] w-4 sm:w-5"
              >
                <motion.path
                  d="M0 6h16M12 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.15 + 0.2
                  }}
                />
              </svg>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
