'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  StorySection,
  StoryProgress,
  LeadParticles,
  GenericScoringFail,
  StakesCalculator,
  MLModelNode,
  TransformationScene,
  RevealNumbers,
  LeadScoringDiagram,
  FeatureImportance,
  StepAnnotations,
  storySteps,
} from './components'

type ExperienceMode = 'immersive' | 'interactive'

// Mode switcher component - Fixed position top right like Document Intelligence
function ModeSwitcher({
  mode,
  onModeChange,
}: {
  mode: ExperienceMode
  onModeChange: (mode: ExperienceMode) => void
}) {
  return (
    <div className="fixed top-24 right-6 z-50 bg-white rounded-xl shadow-lg border border-slate-200 p-1">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onModeChange('immersive')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${mode === 'immersive'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
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
              : 'text-slate-600 hover:bg-slate-100'
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
function InteractiveExperience({
  currentStep,
  setCurrentStep,
  showBeforeAfter,
  setShowBeforeAfter,
}: {
  currentStep: number
  setCurrentStep: (step: number) => void
  showBeforeAfter: 'before' | 'after'
  setShowBeforeAfter: (state: 'before' | 'after') => void
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentStep(Math.min(storySteps.length, currentStep + 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentStep(Math.max(1, currentStep - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, setCurrentStep])

  // Handle step changes
  const handleStepChange = (step: number) => {
    setCurrentStep(step)
    if (step >= 5) {
      setShowBeforeAfter('after')
    } else if (step === 1) {
      setShowBeforeAfter('before')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-600 rounded-full border border-teal-500/20">
              Interactive Case Study
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Real-Time ML Lead Scoring
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Explore how custom ML scoring with discovered features reduced wasted sales effort by 40-60%
          </motion.p>
        </div>

        {/* Main interactive area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* ML Pipeline Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LeadScoringDiagram
                currentStep={currentStep}
                showBeforeAfter={showBeforeAfter}
                inView={true}
                className="mb-8"
              />

              {/* Feature Importance - shown on step 3+ */}
              <AnimatePresence>
                {currentStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <FeatureImportance
                      inView={true}
                      showInsight={currentStep >= 3}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Annotations & Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StepAnnotations
                currentStep={currentStep}
                onStepChange={handleStepChange}
                className="mb-6"
              />

              {/* Before/After toggle (shown on step 5+) */}
              <AnimatePresence>
                {currentStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-4 bg-white rounded-xl border border-slate-200 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 font-medium">Compare Results:</span>
                      <button
                        onClick={() => setShowBeforeAfter(showBeforeAfter === 'before' ? 'after' : 'before')}
                        className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                          showBeforeAfter === 'after'
                            ? 'bg-teal-500/10 text-teal-600 border border-teal-500/30'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {showBeforeAfter === 'after' ? 'After ML (0.81 threshold)' : 'Before (Generic CRM)'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Cards (shown on step 6) */}
              <AnimatePresence>
                {currentStep >= 6 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: '40-60%', label: 'Less Wasted Effort', color: 'text-green-600', bg: 'bg-green-50' },
                        { value: '30s', label: 'Real-time Updates', color: 'text-teal-600', bg: 'bg-teal-50' },
                        { value: '7', label: 'ML Features', color: 'text-blue-600', bg: 'bg-blue-50' },
                        { value: '24/7', label: 'Autonomous', color: 'text-purple-600', bg: 'bg-purple-50' },
                      ].map((metric, index) => (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`${metric.bg} rounded-xl p-4 text-center border border-slate-200`}
                        >
                          <motion.div
                            className={`text-2xl md:text-3xl font-bold ${metric.color} mb-1`}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 + index * 0.1 }}
                          >
                            {metric.value}
                          </motion.div>
                          <div className="text-xs text-slate-500">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Client quote */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-100"
                    >
                      <p className="text-sm text-slate-700 italic">
                        &quot;The ML model discovered hidden patterns that generic scoring completely missed. Our sales team finally knows which leads to prioritize.&quot;
                      </p>
                      <footer className="mt-2 text-xs text-slate-500">
                        — Sales Operations Team
                      </footer>
                    </motion.blockquote>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl border border-teal-100">
            <div className="text-left">
              <h3 className="font-semibold text-slate-900">Ready to transform your lead scoring?</h3>
              <p className="text-sm text-slate-600">Let&apos;s build a custom ML model for your sales team.</p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Immersive Story Experience Component
function ImmersiveExperience() {
  const [activeSection, setActiveSection] = useState(0)
  const [sectionInView, setSectionInView] = useState<Record<string, boolean>>({
    problem: false,
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
      <StoryProgress currentAct={currentAct} />

      {/* Act 1: The Problem */}
      <StorySection
        id="act1"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(0, 'problem')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
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
              <span className="text-sm text-text-muted">Lead Scoring</span>
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
              Hundreds of leads per month. No way to tell which ones would convert.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base text-text-muted mb-12 max-w-2xl mx-auto"
            >
              Sales teams using generic CRM scoring that treats all leads equally waste significant time
              on low-quality prospects while high-value opportunities slip through the cracks.
            </motion.p>

            <div className="w-full h-96 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-border overflow-hidden shadow-lg">
              <LeadParticles
                particleCount={300}
                organizationLevel={0}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </StorySection>

      {/* Act 2: The Stakes */}
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
              The CRM&apos;s generic scoring was costing them opportunities.
            </motion.p>

            <GenericScoringFail
              inView={sectionInView.stakes}
              className="mb-12"
            />

            <div className="max-w-xl mx-auto">
              <StakesCalculator
                inView={sectionInView.stakes}
                className="w-full"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-6 rounded-xl bg-white border border-border shadow-sm max-w-lg mx-auto"
            >
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="font-semibold text-text-primary">Generic scoring uses obvious metrics.</span>{' '}
                But the real conversion drivers - financial capacity, local success patterns, and urgency signals - are invisible to traditional scoring.
              </p>
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 3: The Breakthrough */}
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
                A custom ML model trained on what actually predicts conversions in your business.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <FeatureImportance
                inView={sectionInView.approach}
                showInsight={sectionInView.approach}
                className="max-w-2xl mx-auto"
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <MLModelNode
                  inView={sectionInView.approach}
                  className="w-full"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {[
                  { num: 1, text: 'Integrated multiple data sources: CRM data, market intelligence, demographics' },
                  { num: 2, text: 'Built autonomous pipeline to enrich each lead with predictive signals' },
                  { num: 3, text: 'Trained custom ML model optimized for your specific conversion patterns' },
                  { num: 4, text: 'Deployed real-time listener for continuous scoring updates' },
                  { num: 5, text: 'Added business rules safeguards for strategic priorities' },
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
          </div>
        </div>
      </StorySection>

      {/* Act 4: The Transformation */}
      <StorySection
        id="act4"
        minHeight="200vh"
        onEnterView={() => handleSectionEnter(3, 'transformation')}
        variant="secondary"
      >
        <TransformationScene className="w-full" />
      </StorySection>

      {/* Act 5: The Results */}
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
              Same leads. Real-time scoring. Dramatic efficiency gains.
            </motion.p>

            <RevealNumbers
              inView={sectionInView.reveal}
              className="w-full"
            />

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
                &quot;The system discovered patterns we never would have found. The autonomous scoring runs 24/7 and our sales team finally knows which leads to prioritize.&quot;
              </p>
              <footer className="mt-6">
                <p className="text-text-muted text-sm">
                  — Sales Operations Team
                </p>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </StorySection>

      {/* Technical Architecture Section */}
      <StorySection
        id="architecture"
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
                Under the Hood
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Technical Architecture
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                A complete end-to-end ML pipeline running autonomously 24/7
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Data Integration',
                  icon: '🔄',
                  items: ['CRM Data', 'Market Intelligence', 'Demographics', 'Autonomous ETL'],
                },
                {
                  title: 'ML Scoring',
                  icon: '🧠',
                  items: ['Custom ML Model', 'Discovered Features', 'Optimized Threshold', 'Business Rules'],
                },
                {
                  title: 'Real-time Engine',
                  icon: '📡',
                  items: ['Continuous Monitoring', 'Priority Queue', 'Deduplication', 'Smart Batching'],
                },
                {
                  title: 'Deployment',
                  icon: '📤',
                  items: ['Adaptive Sync', 'Auto-retry Logic', 'Self-healing', '24/7 Autonomous'],
                },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-white border border-border hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-3xl mb-3">{section.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-3">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </StorySection>

      {/* Industries & Applications */}
      <StorySection
        id="applications"
        minHeight="auto"
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
                Where custom lead scoring creates value
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The same ML-powered approach helps sales teams across industries focus on leads that actually convert.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  industry: 'Real Estate',
                  icon: '🏠',
                  challenge: 'Buyer Intent Scoring',
                  description: 'Identify serious buyers from casual browsers. Predict which leads are ready to transact based on browsing patterns, engagement, and market signals.',
                  metric: '40% more closed deals',
                },
                {
                  industry: 'Insurance',
                  icon: '📋',
                  challenge: 'Policy Conversion Prediction',
                  description: 'Score leads based on risk profile, life events, and engagement patterns. Focus agents on prospects most likely to bind a policy.',
                  metric: '2.5x quote-to-bind ratio',
                },
                {
                  industry: 'B2B Sales',
                  icon: '💼',
                  challenge: 'Enterprise Deal Scoring',
                  description: 'Predict which opportunities will close based on stakeholder engagement, timing signals, and historical win patterns.',
                  metric: '30% shorter sales cycles',
                },
                {
                  industry: 'Financial Services',
                  icon: '🏦',
                  challenge: 'Loan Application Scoring',
                  description: 'Prioritize applications based on completion likelihood and approval probability. Reduce time spent on leads that will not fund.',
                  metric: '50% fewer abandoned apps',
                },
                {
                  industry: 'Healthcare',
                  icon: '🏥',
                  challenge: 'Patient Acquisition',
                  description: 'Score inbound inquiries to identify high-value patients. Match leads with services where they are most likely to convert.',
                  metric: '35% higher patient LTV',
                },
                {
                  industry: 'Your Industry',
                  icon: '🎯',
                  challenge: 'Custom Scoring Models',
                  description: 'Any sales process with historical conversion data can benefit from ML-powered lead scoring tailored to your specific patterns.',
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
                      : 'bg-white border-border'
                  } hover:shadow-lg transition-shadow duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
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
              Your leads deserve smarter scoring too.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary mb-10"
            >
              Let&apos;s build a custom ML model that discovers what actually predicts conversions in your business.
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

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 pt-8 border-t border-border"
            >
              <p className="text-text-muted text-sm mb-4">Trusted by growing businesses</p>
              <div className="flex items-center justify-center gap-8 opacity-50">
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
export default function LeadScoringCaseStudy() {
  const [mode, setMode] = useState<ExperienceMode>('immersive')
  const [interactiveStep, setInteractiveStep] = useState(1)
  const [showBeforeAfter, setShowBeforeAfter] = useState<'before' | 'after'>('after')

  return (
    <>
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
            <InteractiveExperience
              currentStep={interactiveStep}
              setCurrentStep={setInteractiveStep}
              showBeforeAfter={showBeforeAfter}
              setShowBeforeAfter={setShowBeforeAfter}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
