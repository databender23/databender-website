'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useDiagramContext, type DiagramMode } from './DiagramProvider'
import { colors } from './DiagramConfig'

interface ModeSwitchProps {
  className?: string
}

export default function ModeSwitch({ className = '' }: ModeSwitchProps) {
  const { mode, setMode, isPlaying, togglePlay, currentStep, goToStep, totalSteps } =
    useDiagramContext()

  const modes: { id: DiagramMode; label: string; icon: ReactNode }[] = [
    {
      id: 'guided-tour',
      label: 'Guided Tour',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 'deep-dive',
      label: 'Deep Dive',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
        {modes.map((m) => (
          <motion.button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${mode === m.id ? 'text-white' : 'text-white/50 hover:text-white/70'}
            `}
            style={{
              backgroundColor: mode === m.id ? colors.subagent.purple + '30' : 'transparent',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {m.icon}
            <span>{m.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Playback Controls (Guided Tour mode only) */}
      {mode === 'guided-tour' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-between gap-4"
        >
          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => goToStep(currentStep > 1 ? currentStep - 1 : totalSteps)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous step"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <motion.button
              onClick={togglePlay}
              className="p-3 rounded-xl border border-white/20 text-white transition-colors"
              style={{
                backgroundColor: isPlaying ? colors.subagent.purple + '40' : 'transparent',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </motion.button>

            <motion.button
              onClick={() => goToStep(currentStep < totalSteps ? currentStep + 1 : 1)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next step"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Step dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <motion.button
                key={step}
                onClick={() => goToStep(step)}
                className="relative w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: currentStep === step ? colors.subagent.purple + '30' : 'transparent',
                  border: `1px solid ${currentStep >= step ? colors.subagent.purple : 'rgba(255,255,255,0.1)'}`,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Go to step ${step}`}
              >
                <span
                  className="text-xs font-medium"
                  style={{
                    color: currentStep >= step ? colors.subagent.purple : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {step}
                </span>
                {currentStep === step && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${colors.subagent.purple}` }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Deep Dive mode step selector */}
      {mode === 'deep-dive' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-sm text-white/50 mr-2">Jump to:</span>
          {[
            { step: 1, label: 'Chaos' },
            { step: 2, label: 'Pattern' },
            { step: 3, label: 'Matching' },
            { step: 4, label: 'Audit' },
            { step: 5, label: 'Golden' },
          ].map(({ step, label }) => (
            <motion.button
              key={step}
              onClick={() => goToStep(step)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                ${
                  currentStep === step
                    ? 'border-purple-500/50 text-white bg-purple-500/20'
                    : 'border-white/10 text-white/60 hover:text-white hover:border-white/20'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="flex items-center gap-4 text-xs text-white/30">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">
            <span className="sr-only">Left/Right arrows</span>
            &#8592;&#8594;
          </kbd>
          Navigate
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">Space</kbd>
          Play/Pause
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">1-5</kbd>
          Jump to step
        </span>
      </div>
    </div>
  )
}
