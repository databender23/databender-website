'use client'

import { motion } from 'framer-motion'
import { DiagramProvider, useDiagramContext } from './DiagramProvider'
import EntityResolutionDiagram from './EntityResolutionDiagram'
import StepAnnotations from './StepAnnotations'
import ModeSwitch from './ModeSwitch'
import { colors } from './DiagramConfig'

interface InteractiveDiagramContentProps {
  className?: string
}

function InteractiveDiagramContent({ className = '' }: InteractiveDiagramContentProps) {
  const { currentStep, isPlaying, mode } = useDiagramContext()

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="text-purple-400 font-medium mb-3 tracking-wide uppercase text-sm">
          Interactive Journey
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          How AI Entity Resolution Works
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore the step-by-step transformation from chaotic data to golden records.
          Use the controls below to navigate through each stage of the process.
        </p>
      </motion.div>

      {/* Controls */}
      <div className="mb-6">
        <ModeSwitch />
      </div>

      {/* Main content area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Diagram (2/3 width on large screens) */}
        <motion.div
          className="lg:col-span-2 relative aspect-video min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EntityResolutionDiagram
            currentStep={currentStep}
            isPlaying={isPlaying}
            className="w-full h-full"
          />
        </motion.div>

        {/* Annotations sidebar (1/3 width on large screens) */}
        <motion.div
          className="lg:col-span-1 p-6 rounded-2xl border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${colors.background.dark}90 0%, ${colors.background.medium}90 100%)`,
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StepAnnotations currentStep={currentStep} />
        </motion.div>
      </div>

      {/* Bottom summary bar */}
      <motion.div
        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-teal-500/10 border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">1.69M</p>
            <p className="text-xs text-white/50">Input Records</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">3 weeks</p>
            <p className="text-xs text-white/50">Processing Time</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-teal-400">847K</p>
            <p className="text-xs text-white/50">Golden Records</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">125x</p>
            <p className="text-xs text-white/50">Cost Savings</p>
          </div>
        </div>
      </motion.div>

      {/* Mode description */}
      <motion.div
        className="mt-4 text-center text-sm text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {mode === 'guided-tour' ? (
          <p>
            <span className="text-purple-400">Guided Tour</span>: Auto-plays through each step. Click pause to explore at your own pace.
          </p>
        ) : (
          <p>
            <span className="text-purple-400">Deep Dive</span>: Click on any step to explore in detail. Hover over nodes for more information.
          </p>
        )}
      </motion.div>
    </div>
  )
}

interface InteractiveDiagramSectionProps {
  className?: string
}

export default function InteractiveDiagramSection({
  className = '',
}: InteractiveDiagramSectionProps) {
  return (
    <section
      className={`relative py-16 md:py-24 ${className}`}
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`,
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: colors.subagent.purple }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: colors.success.teal }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <DiagramProvider initialMode="guided-tour" autoPlayInterval={5000}>
          <InteractiveDiagramContent />
        </DiagramProvider>
      </div>
    </section>
  )
}
