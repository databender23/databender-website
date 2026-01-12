'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { storySteps, resultsMetrics, colorClasses, getStepById } from './DiagramConfig'

interface EntityStepAnnotationsProps {
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

export default function EntityStepAnnotations({
  currentStep,
  onStepChange,
  className = ''
}: EntityStepAnnotationsProps) {
  const activeStep = getStepById(currentStep) || storySteps[0]
  const totalSteps = storySteps.length

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        onStepChange(Math.min(totalSteps, currentStep + 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        onStepChange(Math.max(1, currentStep - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, onStepChange, totalSteps])

  return (
    <div className={`${className}`}>
      {/* Step navigation dots */}
      <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
        {storySteps.map(step => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`
              w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300
              ${currentStep === step.id
                ? 'bg-teal-500 scale-125'
                : currentStep > step.id
                  ? 'bg-teal-500/50 hover:bg-teal-500/70'
                  : 'bg-border hover:bg-text-muted/50'
              }
            `}
            aria-label={`Go to step ${step.id}: ${step.plainEnglishTitle}`}
          />
        ))}
      </div>

      {/* Step content */}
      <div className="bg-bg-secondary rounded-lg md:rounded-xl border border-border overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-6"
          >
            {/* Step number */}
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-teal-500 text-white text-xs md:text-sm font-bold">
                {currentStep}
              </span>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-text-muted">
                Step {currentStep} of {totalSteps}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-1.5 md:mb-2">
              {activeStep.plainEnglishTitle}
            </h3>

            {/* Description */}
            <p className="text-xs md:text-base text-text-secondary leading-relaxed mb-4 md:mb-6">
              {activeStep.plainEnglishDescription}
            </p>

            {/* Stats (if available) */}
            {activeStep.stats && activeStep.stats.length > 0 && (
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                {activeStep.stats.map(stat => {
                  const colors = colorClasses[stat.color as keyof typeof colorClasses]
                  return (
                    <div
                      key={stat.label}
                      className={`p-2 md:p-3 rounded-lg ${colors.bgLight} border ${colors.border}`}
                    >
                      <p className={`text-base md:text-lg font-bold ${colors.text}`}>{stat.value}</p>
                      <p className="text-[10px] md:text-xs text-text-muted">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Results metrics (step 7 only) */}
            {currentStep === 7 && (
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                {resultsMetrics.map(metric => {
                  const colors = colorClasses[metric.color]
                  return (
                    <div
                      key={metric.label}
                      className={`p-3 md:p-4 rounded-lg ${colors.bgLight} border ${colors.border}`}
                    >
                      <p className={`text-xl md:text-2xl font-bold ${colors.text}`}>{metric.value}</p>
                      <p className="text-xs md:text-sm text-text-muted">{metric.label}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Competitive advantage callout (step 7) */}
            {currentStep === 7 && (
              <div className="p-3 md:p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs md:text-sm text-text-secondary">
                  <span className="font-semibold text-emerald-500">Competitive Advantage:</span>{' '}
                  Everyone in this industry uses the same data source. Everyone has the same problems.
                  This client fixed theirs. Their competitors are still guessing.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation footer */}
        <div className="px-3 py-3 md:px-6 md:py-4 bg-bg-primary border-t border-border flex items-center justify-between">
          <button
            onClick={() => onStepChange(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className={`
              flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors
              ${currentStep === 1
                ? 'text-text-muted cursor-not-allowed'
                : 'text-text-secondary hover:bg-bg-secondary'
              }
            `}
          >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Previous</span>
          </button>

          <span className="text-[10px] md:text-xs text-text-muted hidden sm:block">
            Use arrow keys to navigate
          </span>

          <button
            onClick={() => onStepChange(Math.min(totalSteps, currentStep + 1))}
            disabled={currentStep === totalSteps}
            className={`
              flex items-center gap-1 md:gap-2 px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors
              ${currentStep === totalSteps
                ? 'text-text-muted cursor-not-allowed'
                : 'text-text-secondary hover:bg-bg-secondary'
              }
            `}
          >
            <span className="hidden sm:inline">Next</span>
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
