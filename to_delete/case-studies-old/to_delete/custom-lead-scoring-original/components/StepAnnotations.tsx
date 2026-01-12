'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { storySteps } from './DiagramConfig'

interface StepAnnotationsProps {
  currentStep: number
  onStepChange: (step: number) => void
  className?: string
}

export default function StepAnnotations({
  currentStep,
  onStepChange,
  className = '',
}: StepAnnotationsProps) {
  const activeStep = storySteps.find((s) => s.id === currentStep) || storySteps[0]

  return (
    <div className={`${className}`}>
      {/* Step navigation dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {storySteps.map((step) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`relative group transition-all duration-300 ${
              currentStep === step.id ? 'z-10' : ''
            }`}
            aria-label={`Go to step ${step.id}: ${step.title}`}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === step.id
                  ? 'bg-teal-500 scale-125'
                  : currentStep > step.id
                  ? 'bg-teal-500/50'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {step.title}
              </div>
              <div className="w-2 h-2 bg-slate-800 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1" />
            </div>
          </button>
        ))}
      </div>

      {/* Current step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-600 rounded-full text-sm font-medium mb-3"
          >
            <span>Step {currentStep}</span>
            <span className="text-teal-500/50">/</span>
            <span className="text-teal-500/70">{storySteps.length}</span>
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-3xl font-bold text-text-primary mb-2"
          >
            {activeStep.title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-teal-600 font-medium mb-4"
          >
            {activeStep.subtitle}
          </motion.p>

          {/* Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            {activeStep.narrative}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <motion.button
          onClick={() => onStepChange(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentStep === 1
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-slate-100 text-text-secondary hover:bg-slate-200'
          }`}
          whileHover={currentStep !== 1 ? { x: -4 } : {}}
          whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>

        <motion.button
          onClick={() => onStepChange(Math.min(storySteps.length, currentStep + 1))}
          disabled={currentStep === storySteps.length}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            currentStep === storySteps.length
              ? 'bg-teal-500/50 text-white cursor-not-allowed'
              : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
          whileHover={currentStep !== storySteps.length ? { x: 4 } : {}}
          whileTap={currentStep !== storySteps.length ? { scale: 0.95 } : {}}
        >
          {currentStep === storySteps.length ? 'Complete' : 'Next'}
          {currentStep !== storySteps.length && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </motion.button>
      </div>
    </div>
  )
}
