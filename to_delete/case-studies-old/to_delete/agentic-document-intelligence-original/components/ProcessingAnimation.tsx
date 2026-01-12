'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'

interface ProcessingAnimationProps {
  className?: string
}

export default function ProcessingAnimation({ className = '' }: ProcessingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [processStage, setProcessStage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const stageProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 5])

  useMotionValueEvent(stageProgress, 'change', (latest) => {
    setProcessStage(Math.floor(Math.max(0, Math.min(5, latest))))
  })

  const statusOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.65, 0.75], [0, 1, 1, 0])

  const stages = [
    { label: 'Receiving PDF...', icon: '📥' },
    { label: 'Extracting tables...', icon: '📊' },
    { label: 'Processing text...', icon: '📝' },
    { label: 'Linking cross-references...', icon: '🔗' },
    { label: 'Validating output...', icon: '✅' },
    { label: 'Complete!', icon: '✨' },
  ]

  const progressPercent = useTransform(scrollYProgress, [0.2, 0.7], [0, 100])
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(progressPercent, 'change', (latest) => {
    setPercent(Math.round(Math.max(0, Math.min(100, latest))))
  })

  return (
    <div ref={containerRef} className={`relative ${className}`}>
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
            Watch documents flow through the agent pipeline
          </p>
        </motion.div>

        {/* Processing Visualization */}
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-border shadow-card p-8">
            {/* Agent Pipeline */}
            <div className="flex items-center justify-between gap-4 mb-8">
              {stages.map((stage, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center gap-2 flex-1 transition-all duration-500 ${
                    index < processStage ? 'opacity-100' :
                    index === processStage ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                      index < processStage ? 'bg-success/20 border-2 border-success' :
                      index === processStage ? 'bg-teal-500/20 border-2 border-teal-500' :
                      'bg-bg-secondary border border-border'
                    }`}
                    animate={index === processStage ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {stage.icon}
                  </motion.div>
                  <span className={`text-xs text-center ${
                    index <= processStage ? 'text-text-primary' : 'text-text-muted'
                  }`}>
                    {stage.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="relative h-3 bg-bg-secondary rounded-full overflow-hidden border border-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-500 to-success rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Stats being generated */}
            <motion.div
              className="mt-8 grid grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: processStage > 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center p-4 bg-bg-secondary rounded-xl">
                <motion.div
                  className="text-2xl font-bold text-teal-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {Math.floor(percent * 10)}+
                </motion.div>
                <div className="text-xs text-text-muted">PDFs Processed</div>
              </div>
              <div className="text-center p-4 bg-bg-secondary rounded-xl">
                <motion.div
                  className="text-2xl font-bold text-blue-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  {Math.floor(percent * 25)}
                </motion.div>
                <div className="text-xs text-text-muted">Tables Extracted</div>
              </div>
              <div className="text-center p-4 bg-bg-secondary rounded-xl">
                <motion.div
                  className="text-2xl font-bold text-purple-500"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                >
                  {Math.floor(percent * 50)}
                </motion.div>
                <div className="text-xs text-text-muted">Cross-refs Linked</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-xl">
                <motion.div
                  className="text-2xl font-bold text-success"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                >
                  0
                </motion.div>
                <div className="text-xs text-text-muted">Manual Reviews</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom status */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
          style={{ opacity: statusOpacity }}
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-border shadow-sm">
            <motion.div
              className="w-2 h-2 rounded-full bg-success"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-text-muted font-mono">
              Processing... <span className="text-teal-500 font-semibold">{percent}%</span>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
