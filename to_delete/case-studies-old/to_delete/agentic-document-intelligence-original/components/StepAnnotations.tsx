'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { storySteps, resultsMetrics, type StepConfig } from './DiagramConfig'

interface StepAnnotationsProps {
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

// Step navigation dot
function StepDot({
  step,
  isActive,
  isCompleted,
  onClick,
}: {
  step: StepConfig
  isActive: boolean
  isCompleted: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2"
      aria-label={`Go to step ${step.id}: ${step.title}`}
    >
      <motion.div
        className={`
          w-4 h-4 rounded-full border-2 transition-all duration-300
          ${isActive
            ? 'bg-teal-500 border-teal-500 shadow-lg shadow-teal-500/30'
            : isCompleted
              ? 'bg-teal-500/50 border-teal-500/50'
              : 'bg-transparent border-border'
          }
        `}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
      <span
        className={`
          text-xs font-medium transition-colors duration-300 whitespace-nowrap
          ${isActive ? 'text-teal-600' : 'text-text-muted group-hover:text-text-secondary'}
        `}
      >
        {step.id}
      </span>
    </button>
  )
}

// Results metrics display
function ResultsDisplay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-2 gap-4 mt-6"
    >
      {resultsMetrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="text-center p-4 bg-bg-secondary rounded-xl"
        >
          <motion.div
            className="text-3xl font-bold"
            style={{ color: metric.color }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          >
            {metric.value}
          </motion.div>
          <div className="text-xs text-text-muted mt-1">{metric.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Before/After comparison toggle
function ComparisonView({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-6 p-4 bg-bg-secondary rounded-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-sm font-medium text-red-700">Before: Traditional OCR</div>
          <div className="text-lg font-bold text-red-600 mt-1">$10,000</div>
          <div className="text-xs text-red-500">+ Manual Validation</div>
        </div>
        <div className="flex-shrink-0">
          <motion.svg
            className="w-6 h-6 text-text-muted"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <path fill="currentColor" d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </div>
        <div className="flex-1 text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm font-medium text-green-700">After: Agentic System</div>
          <div className="text-lg font-bold text-green-600 mt-1">$5,000</div>
          <div className="text-xs text-green-500">Fully Autonomous</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StepAnnotations({
  currentStep,
  onStepChange,
  className = '',
}: StepAnnotationsProps) {
  const activeStep = storySteps.find(s => s.id === currentStep) || storySteps[0]

  return (
    <div className={`${className}`}>
      {/* Step navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="flex items-center gap-1">
          {storySteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <StepDot
                step={step}
                isActive={step.id === currentStep}
                isCompleted={step.id < currentStep}
                onClick={() => onStepChange(step.id)}
              />
              {index < storySteps.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-1 transition-colors duration-300 ${
                    step.id < currentStep ? 'bg-teal-500/50' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="bg-bg-primary rounded-2xl border border-border shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-bg-secondary to-bg-primary px-6 py-4 border-b border-border">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-teal-500 uppercase tracking-wider">
                  Step {activeStep.id} of {storySteps.length}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary">{activeStep.title}</h3>
              <p className="text-sm text-teal-600 font-medium">{activeStep.subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-text-secondary leading-relaxed">{activeStep.description}</p>

              {/* Annotation callout */}
              <div className="mt-4 p-4 bg-teal-50 rounded-xl border border-teal-100">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-teal-800 leading-relaxed italic">
                    {activeStep.annotation}
                  </p>
                </div>
              </div>

              {/* Results display for final step */}
              {currentStep === 6 && <ResultsDisplay />}

              {/* Comparison view for relevant steps */}
              <ComparisonView isVisible={currentStep >= 5} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation footer */}
        <div className="px-6 py-4 bg-bg-secondary border-t border-border flex items-center justify-between">
          <button
            onClick={() => onStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${currentStep === 1
                ? 'text-text-muted cursor-not-allowed'
                : 'text-text-secondary hover:bg-bg-primary hover:shadow-sm'
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>

          <span className="text-xs text-text-muted">
            Use arrow keys or click dots to navigate
          </span>

          <button
            onClick={() => onStepChange(Math.min(storySteps.length, currentStep + 1))}
            disabled={currentStep === storySteps.length}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              ${currentStep === storySteps.length
                ? 'text-text-muted cursor-not-allowed'
                : 'text-teal-600 bg-teal-50 hover:bg-teal-100'
              }
            `}
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-text-muted mt-4">
        Press <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-text-muted font-mono">←</kbd> or{' '}
        <kbd className="px-1.5 py-0.5 bg-bg-secondary rounded text-text-muted font-mono">→</kbd> to navigate
      </p>
    </div>
  )
}
