'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import LeadParticles from './LeadParticles'

interface TransformationSceneProps {
  className?: string
}

export default function TransformationScene({ className = '' }: TransformationSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [organizationLevel, setOrganizationLevel] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Map scroll progress to organization level
  const orgLevelMotion = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])

  // Subscribe to changes and update state
  useMotionValueEvent(orgLevelMotion, 'change', (latest) => {
    setOrganizationLevel(Math.max(0, Math.min(1, latest)))
  })

  // Progress percentage for display
  const progressPercent = useTransform(scrollYProgress, [0.2, 0.7], [0, 100])

  // Status text based on progress
  const statusOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Sticky container for the visualization */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Header */}
        <motion.div
          className="absolute top-20 left-0 right-0 text-center z-10"
          style={{ opacity: statusOpacity }}
        >
          <p className="text-teal-500 font-medium mb-2 tracking-wide uppercase text-sm">
            Act IV
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
            The Solution
          </h2>
          <p className="text-lg text-text-secondary">
            Watch leads get scored in real-time
          </p>
        </motion.div>

        {/* Lead Particles Visualization */}
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="relative w-full h-[60vh] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-border overflow-hidden shadow-lg">
            <LeadParticles
              particleCount={300}
              organizationLevel={organizationLevel}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
          style={{ opacity: statusOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-48 h-2 bg-bg-secondary rounded-full overflow-hidden border border-border">
              <motion.div
                className="h-full bg-teal-500 rounded-full"
                style={{
                  width: useTransform(progressPercent, (v) => `${v}%`),
                }}
              />
            </div>
            <ProgressText progressPercent={progressPercent} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Separate component for the progress text to avoid hook issues
function ProgressText({ progressPercent }: { progressPercent: ReturnType<typeof useTransform<number, number>> }) {
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(progressPercent, 'change', (latest) => {
    setPercent(Math.round(Math.max(0, Math.min(100, latest))))
  })

  return (
    <span className="text-sm text-text-muted font-mono">
      Scoring leads...{' '}
      <span className="text-teal-500 font-semibold">{percent}%</span>
    </span>
  )
}
