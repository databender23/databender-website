'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  StorySection,
  ChaosParticles,
  StakesCalculator,
  AIProcessingNode,
  TransformationScene,
  RevealNumbers,
  StoryProgress,
  EntityResolutionDiagram,
  StepAnnotations,
  DiagramProvider,
} from './components'
import { colors, diagramConfig } from './components/DiagramConfig'

type ExperienceMode = 'immersive' | 'interactive'

// Mode switcher component
function ModeSwitcher({
  mode,
  onModeChange,
}: {
  mode: ExperienceMode
  onModeChange: (mode: ExperienceMode) => void
}) {
  return (
    <div className="fixed top-24 right-6 z-50 bg-bg-primary rounded-xl shadow-lg border border-border p-1">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onModeChange('immersive')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${mode === 'immersive'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-text-secondary hover:bg-bg-secondary'
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            Story Mode
          </span>
        </button>
        <button
          onClick={() => onModeChange('interactive')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${mode === 'interactive'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-text-secondary hover:bg-bg-secondary'
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Interactive
          </span>
        </button>
      </div>
    </div>
  )
}

// Interactive Experience Component
function InteractiveExperience() {
  const [currentStep, setCurrentStep] = useState(1)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentStep(prev => Math.min(diagramConfig.steps.length, prev + 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentStep(prev => Math.max(1, prev - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className="min-h-screen py-24"
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`,
      }}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              Interactive Case Study
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Agentic Entity Resolution
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 max-w-2xl mx-auto"
          >
            Explore how a multi-workflow AI pipeline with parallel matching strategies resolves millions of records autonomously
          </motion.p>
        </div>

        {/* Main interactive area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Architecture Diagram */}
            <motion.div
              className="lg:col-span-2 relative aspect-video min-h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <EntityResolutionDiagram
                currentStep={currentStep}
                isPlaying={false}
                className="w-full h-full"
              />
            </motion.div>

            {/* Annotations & Controls */}
            <motion.div
              className="lg:col-span-1 p-6 rounded-2xl border border-white/10"
              style={{
                background: `linear-gradient(135deg, ${colors.background.dark}90 0%, ${colors.background.medium}90 100%)`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StepAnnotations currentStep={currentStep} />

              {/* Step navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  disabled={currentStep === 1}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${currentStep === 1
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white/70 hover:bg-white/10'
                    }
                  `}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                <span className="text-xs text-white/40">
                  {currentStep} / {diagramConfig.steps.length}
                </span>

                <button
                  onClick={() => setCurrentStep(prev => Math.min(diagramConfig.steps.length, prev + 1))}
                  disabled={currentStep === diagramConfig.steps.length}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${currentStep === diagramConfig.steps.length
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-purple-300 bg-purple-500/20 hover:bg-purple-500/30'
                    }
                  `}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Bottom summary bar */}
          <motion.div
            className="mt-8 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-teal-500/10 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">1.5M+</p>
                <p className="text-xs text-white/50">Input Records</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">4 Workflows</p>
                <p className="text-xs text-white/50">Parallel Strategies</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-400">100K</p>
                <p className="text-xs text-white/50">Unified Records</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">125x</p>
                <p className="text-xs text-white/50">Cost Savings</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-2xl border border-white/10">
            <div className="text-left">
              <h3 className="font-semibold text-white">Ready to unify your data?</h3>
              <p className="text-sm text-white/60">Let&apos;s build an agentic resolution system for your records.</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </motion.div>

        {/* Keyboard hint */}
        <p className="text-center text-xs text-white/30 mt-8">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono">←</kbd> or{' '}
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/50 font-mono">→</kbd> to navigate
        </p>
      </div>
    </div>
  )
}

// Immersive Story Experience Component
function ImmersiveExperience() {
  const [activeSection, setActiveSection] = useState(0)
  const [sectionInView, setSectionInView] = useState<Record<string, boolean>>({
    chaos: false,
    stakes: false,
    approach: false,
    transformation: false,
    reveal: false,
    cta: false,
  })

  const handleSectionEnter = useCallback((index: number, sectionId: string) => {
    setActiveSection(index)
    setSectionInView((prev) => ({ ...prev, [sectionId]: true }))
  }, [])

  const currentAct = Math.min(activeSection + 1, 5)

  return (
    <div className="relative w-full bg-bg-primary">
      {/* Story Progress Indicator */}
      <StoryProgress currentAct={currentAct} />

      {/* Act 1: The Chaos */}
      <StorySection
        id="act1"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(0, 'chaos')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Industry Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-600 rounded-full border border-teal-500/20">
                Agentic AI
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-sm text-text-muted">Entity Resolution</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Act I
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              The Problem
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-4"
            >
              Millions of records. Multiple source systems. Zero unified truth.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base text-text-muted mb-12 max-w-2xl mx-auto"
            >
              Organizations face fragmented data across legacy systems with no unified view of entities.
              Every match matters for compliance, operations, and decision-making accuracy.
            </motion.p>

            {/* Chaos Particles Visualization */}
            <div className="w-full h-96 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-border overflow-hidden shadow-lg">
              <ChaosParticles
                particleCount={400}
                organizationLevel={0}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </StorySection>

      {/* Act 2: First Attempts / The Stakes */}
      <StorySection
        id="act2"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(1, 'stakes')}
        variant="secondary"
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Act II
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              First Attempts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              The manual approach: what it would have really cost.
            </motion.p>

            {/* Stakes Calculator */}
            <div className="max-w-xl mx-auto">
              <StakesCalculator
                inView={sectionInView.stakes}
                className="w-full"
              />
            </div>

            {/* Additional Stakes Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-6 rounded-xl bg-bg-primary border border-border shadow-sm max-w-lg mx-auto"
            >
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="font-semibold text-text-primary">But cost wasn&apos;t the only problem.</span>{' '}
                Manual review meant inconsistent matching rules, no audit trail, and
                decisions that couldn&apos;t be defended in legal disputes.
              </p>
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 3: The Breakthrough / The Approach */}
      <StorySection
        id="act3"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(2, 'approach')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                Act III
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
              >
                The Breakthrough
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary"
              >
                A multi-workflow agentic pipeline with parallel matching strategies.
              </motion.p>
            </div>

            {/* Two-column layout: Visualization + Approach Steps */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* AI Processing Node */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <AIProcessingNode
                  inView={sectionInView.approach}
                  className="w-full"
                />
              </motion.div>

              {/* Approach Steps - Agentic Architecture */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {[
                  { num: 1, text: 'Orchestrator autonomously coordinates multiple specialized workflows in parallel' },
                  { num: 2, text: 'Matching strategies run concurrently: exact, fuzzy, contextual, and more' },
                  { num: 3, text: 'Self-healing validation with rejection rules catches false positives automatically' },
                  { num: 4, text: 'AI agents review ambiguous matches with human-level reasoning' },
                ].map((step, index) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-bg-secondary border border-border"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <p className="text-text-secondary text-sm leading-relaxed pt-0.5">
                      {step.text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Parallel Processing Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-12 p-6 rounded-xl bg-gradient-to-r from-teal-500/5 to-teal-500/10 border border-teal-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">90,000x Reduction via Smart Blocking</h4>
                  <p className="text-sm text-text-secondary">
                    Comparing millions of records naively means trillions of pairs. Smart blocking strategies reduce this
                    to manageable candidate sets. Multiple matching strategies then run in parallel, each optimized for
                    different scenarios like name variations, temporal changes, and cross-reference matching.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 4: The Solution / Transformation */}
      <StorySection
        id="act4"
        minHeight="200vh"
        onEnterView={() => handleSectionEnter(3, 'transformation')}
        variant="secondary"
      >
        {/* TransformationScene handles its own sticky positioning and scroll-driven animation */}
        <TransformationScene className="w-full" />
      </StorySection>

      {/* Act 5: The Impact / Results */}
      <StorySection
        id="act5"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(4, 'reveal')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              Act V
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              The Impact
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              The numbers speak for themselves.
            </motion.p>

            {/* Reveal Numbers */}
            <RevealNumbers
              inView={sectionInView.reveal}
              className="w-full"
            />

            {/* Client Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-12 border-t border-border"
            >
              <svg
                className="w-10 h-10 text-teal-500/30 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed max-w-3xl mx-auto">
                &quot;The agentic approach resolved millions of records autonomously, with every decision documented for compliance. What seemed impossible became routine.&quot;
              </p>
              <footer className="mt-6">
                <p className="text-text-muted text-sm">
                  — Operations Team
                </p>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </StorySection>

      {/* Industries & Applications */}
      <StorySection
        id="applications"
        minHeight="auto"
        variant="secondary"
      >
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-teal-500 font-medium mb-3 tracking-wide uppercase text-sm">
                Cross-Industry Applications
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Where agentic entity resolution creates value
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The same multi-agent approach solves data matching challenges across industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  industry: 'Healthcare',
                  challenge: 'Patient Record Matching',
                  description: 'Unify patient records across facilities and systems. Parallel subagents process different sources simultaneously for speed.',
                  metric: 'Reduce duplicate records by 90%+',
                },
                {
                  industry: 'Financial Services',
                  challenge: 'Customer Data Unification',
                  description: 'Create golden customer records for compliance. Multi-strategy cascade handles name variations and corporate hierarchies.',
                  metric: 'Single customer view across all products',
                },
                {
                  industry: 'Real Estate',
                  challenge: 'Property & Ownership Records',
                  description: 'Match property records across multiple databases. Temporal alignment handles ownership changes over time.',
                  metric: 'Accelerate research 10x',
                },
                {
                  industry: 'Manufacturing',
                  challenge: 'Supplier & Parts Consolidation',
                  description: 'Deduplicate vendor databases from M&A activity. Fuzzy matching handles variations automatically.',
                  metric: 'Identify 30%+ duplicate suppliers',
                },
                {
                  industry: 'Legal',
                  challenge: 'Conflicts & Matter Matching',
                  description: 'Automate conflicts checks across databases. Full audit trail for every matching decision.',
                  metric: 'Reduce conflicts check time 80%',
                },
                {
                  industry: 'Your Industry',
                  challenge: 'Custom Data Challenges',
                  description: 'Any scenario with messy records that need matching, deduplication, or consolidation - our agentic approach scales.',
                  metric: 'Let\'s discuss your use case',
                  isCta: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.industry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border ${
                    item.isCta
                      ? 'bg-gradient-to-br from-teal-500/5 to-teal-500/10 border-teal-500/30'
                      : 'bg-bg-primary border-border'
                  } hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-text-primary">{item.industry}</span>
                  </div>
                  <h3 className="font-medium text-text-primary mb-2">{item.challenge}</h3>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <p className={`text-sm font-medium ${item.isCta ? 'text-teal-600' : 'text-teal-500'}`}>
                    {item.metric}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </StorySection>

      {/* Final CTA */}
      <StorySection
        id="cta"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(5, 'cta')}
        className="flex items-center justify-center"
        variant="gradient"
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-text-primary mb-6"
            >
              Your data chaos can become clarity too.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary mb-10"
            >
              Let&apos;s discuss how agentic entity resolution can transform your data infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors duration-300"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-text-primary border border-border rounded-lg hover:bg-bg-secondary transition-colors duration-300"
              >
                View All Case Studies
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-border"
            >
              <p className="text-text-muted text-sm mb-4">Trusted by data teams at</p>
              <div className="flex items-center justify-center gap-8 opacity-50">
                {/* Placeholder for client logos */}
                <div className="h-8 w-24 bg-text-muted/20 rounded" />
                <div className="h-8 w-24 bg-text-muted/20 rounded" />
                <div className="h-8 w-24 bg-text-muted/20 rounded" />
              </div>
            </motion.div>
          </div>
        </div>
      </StorySection>
    </div>
  )
}

// Main Page Component with Mode Switcher
export default function EntityResolutionCaseStudy() {
  const [mode, setMode] = useState<ExperienceMode>('immersive')

  return (
    <DiagramProvider initialMode="deep-dive" autoPlayInterval={5000}>
      <ModeSwitcher mode={mode} onModeChange={setMode} />
      <AnimatePresence mode="wait">
        {mode === 'immersive' ? (
          <motion.div
            key="immersive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ImmersiveExperience />
          </motion.div>
        ) : (
          <motion.div
            key="interactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InteractiveExperience />
          </motion.div>
        )}
      </AnimatePresence>
    </DiagramProvider>
  )
}
