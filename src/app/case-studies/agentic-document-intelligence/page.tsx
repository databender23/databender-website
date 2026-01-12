'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  StorySection,
  StoryProgress,
  DocumentChaos,
  OCRFailure,
  RevealNumbers,
  ExecutiveSummaryCard,
  IntermediateCTA,
  SimplifiedArchitectureDiagram,
  ProcessingFlow,
  StepAnnotations,
  storySteps,
  industryCards,
} from './components'

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

  const activeStepConfig = storySteps.find(s => s.id === currentStep) || storySteps[0]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setCurrentStep(prev => Math.min(storySteps.length, prev + 1))
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setCurrentStep(prev => Math.max(1, prev - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-secondary to-bg-primary py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
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
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            AI Document Processing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            See how a team of specialized AI workers transforms complex documents into clean, usable data
          </motion.p>
        </div>

        {/* V2: Executive Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <ExecutiveSummaryCard />
        </motion.div>

        {/* Main interactive area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* V2: Simplified Architecture Diagram with toggle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <SimplifiedArchitectureDiagram
                currentStep={currentStep}
                highlightedAgents={activeStepConfig.highlightAgents}
                activeConnections={activeStepConfig.activeConnections}
                className="w-full"
              />

              {/* Processing Flow - shown when relevant */}
              <AnimatePresence>
                {currentStep >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-8"
                  >
                    <ProcessingFlow
                      isActive={currentStep >= 5}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* V2: Annotations with plain English */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <StepAnnotations
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                usePlainEnglish={true}
              />
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
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-teal-500/5 to-teal-500/10 rounded-2xl border border-teal-500/20">
            <div className="text-left">
              <h3 className="font-semibold text-text-primary">Ready to transform your document workflows?</h3>
              <p className="text-sm text-text-secondary">Let&apos;s build an AI team for your documents.</p>
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

// Immersive Story Experience Component (V2: Enhanced)
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
      {/* Story Progress Indicator - V2: Updated labels */}
      <StoryProgress currentAct={currentAct} />

      {/* V2: Executive Summary at top */}
      <div className="container mx-auto px-6 pt-24 pb-8">
        <ExecutiveSummaryCard />
      </div>

      {/* Act 1: The Problem */}
      <StorySection
        id="act1"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(0, 'problem')}
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
                AI Document Processing
              </span>
              <span className="text-text-muted">|</span>
              <span className="text-sm text-text-muted">Case Study</span>
            </motion.div>

            {/* V2: Updated progress label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Problem
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              Documents That Machines Can&apos;t Read
            </motion.h1>
            {/* V2: Plain English */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-4"
            >
              Hundreds of complex documents. Tables, columns, footnotes. No standard layout.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base text-text-muted mb-12 max-w-2xl mx-auto"
            >
              Every organization faces this: getting usable data out of complex documents. Scanning tools turn them into gibberish.
              Staff spend hours fixing errors. There has to be a better way.
            </motion.p>

            {/* Document chaos visualization */}
            <div className="w-full h-96 rounded-2xl bg-gradient-to-b from-bg-secondary to-border border border-border overflow-hidden shadow-sm">
              <DocumentChaos className="w-full h-full" />
            </div>
          </div>
        </div>
      </StorySection>

      {/* Act 2: What Didn't Work */}
      <StorySection
        id="act2"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(1, 'stakes')}
        variant="secondary"
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* V2: Updated progress label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              What Didn&apos;t Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              Traditional Scanning Failed
            </motion.h2>
            {/* V2: Plain English */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              Regular scanning tools couldn&apos;t handle the complexity. Tables got scrambled. References got lost.
            </motion.p>

            {/* OCR Failure visualization */}
            <OCRFailure
              inView={sectionInView.stakes}
              className="w-full"
            />

            {/* V2: Intermediate CTA */}
            <IntermediateCTA variant="challenges" />

            {/* Additional Stakes Context - V2: Plain English */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-6 rounded-xl bg-bg-primary border border-border shadow-sm max-w-lg mx-auto"
            >
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="font-semibold text-text-primary">The real problem:</span>{' '}
                Item codes got mixed with descriptions. Categories jumped across pages randomly.
                Multi-column layouts confused the reading order. Every document still needed someone to fix it by hand.
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              {/* V2: Updated progress label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                The Breakthrough
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
              >
                A Team of AI Specialists
              </motion.h2>
              {/* V2: Plain English */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary"
              >
                Instead of one tool trying to do everything, we built a team of AI workers - each one an expert in their area.
              </motion.p>
            </div>

            {/* V2: Simplified Architecture with toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <SimplifiedArchitectureDiagram
                currentStep={sectionInView.approach ? 7 : 1}
                highlightedAgents={sectionInView.approach ? ['orchestrator', 'assessment-agent', 'category-extractor-1', 'category-extractor-2', 'category-extractor-3', 'refinement-agent', 'validator'] : []}
                activeConnections={sectionInView.approach ? [
                  'orchestrator-assessment-agent',
                  'assessment-agent-category-extractor-1',
                  'assessment-agent-category-extractor-2',
                  'assessment-agent-category-extractor-3',
                  'category-extractor-1-refinement-agent',
                  'category-extractor-2-refinement-agent',
                  'category-extractor-3-refinement-agent',
                  'refinement-agent-validator',
                ] : []}
                className="w-full"
              />
            </motion.div>

            {/* V2: Approach Steps with Plain English */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { num: 1, text: 'AI that can see and read documents - understands layouts like a human would' },
                { num: 2, text: 'Multiple specialists work on different sections at the same time - way faster' },
                { num: 3, text: 'Talk to it in plain English to fix edge cases - no coding needed' },
                { num: 4, text: 'Quality checks catch errors automatically - no manual review required' },
              ].map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-lg bg-bg-secondary border border-border"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white text-sm font-bold flex items-center justify-center">
                    {step.num}
                  </span>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 4: How It Works */}
      <StorySection
        id="act4"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(3, 'transformation')}
        variant="secondary"
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              {/* V2: Updated progress label */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
              >
                How It Works
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
              >
                Read, Check, Deliver
              </motion.h2>
              {/* V2: Plain English */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary"
              >
                AI reads and extracts the data, then quality checks make sure everything is correct
              </motion.p>
            </div>

            {/* Processing Flow visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <ProcessingFlow
                isActive={sectionInView.transformation}
                className="w-full"
              />
            </motion.div>

            {/* V2: Intermediate CTA */}
            <IntermediateCTA variant="demo" />

            {/* V2: Key benefits with Plain English */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Work Happens in Parallel',
                  description: 'Multiple AI workers tackle different parts at once - a 100-page doc processes as fast as a 10-page one',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  ),
                  title: 'Talk to Fix Issues',
                  description: 'If something is wrong, just tell it in plain English. No coding or technical knowledge needed.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Self-Correcting',
                  description: 'Errors get caught and fixed automatically. The system learns and improves over time.',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-6 bg-bg-primary rounded-xl border border-border shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{benefit.title}</h3>
                  <p className="text-sm text-text-secondary">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 5: The Results */}
      <StorySection
        id="act5"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(4, 'reveal')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* V2: Updated progress label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-teal-500 font-medium mb-4 tracking-wide uppercase text-sm"
            >
              The Results
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
            >
              Hours Became Minutes
            </motion.h2>
            {/* V2: Plain English */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              What used to take hours of manual work now happens automatically in minutes.
            </motion.p>

            {/* Reveal Numbers */}
            <RevealNumbers
              inView={sectionInView.reveal}
              className="w-full"
            />

            {/* V2: Client Quote - Plain English */}
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
                &quot;We just upload the documents and get clean data back. No more spreadsheet wrangling, no more manual fixes. It just works.&quot;
              </p>
              <footer className="mt-6">
                <p className="text-text-muted text-sm">
                  Operations Team
                </p>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </StorySection>

      {/* V2: Industries & Applications with specific examples */}
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
                Works for Your Industry
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                The Same Approach, Tailored to Your Documents
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Whatever documents you deal with, an AI team can handle them.
              </p>
            </motion.div>

            {/* V2: Industry cards with specific examples */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryCards.map((item, index) => (
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
              Your documents deserve intelligent processing too.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary mb-10"
            >
              Let&apos;s build an AI team specifically for your documents.
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
              <p className="text-text-muted text-sm mb-4">Trusted by regulated industries</p>
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
export default function DocumentIntelligenceCaseStudyV2() {
  const [mode, setMode] = useState<ExperienceMode>('immersive')

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
            <InteractiveExperience />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
