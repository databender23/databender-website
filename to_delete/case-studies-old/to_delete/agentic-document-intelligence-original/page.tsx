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
  AgentArchitectureDiagram,
  ProcessingFlow,
  StepAnnotations,
  storySteps,
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
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const activeStepConfig = storySteps.find(s => s.id === currentStep) || storySteps[0]

  // Keyboard navigation
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
            className="text-4xl md:text-5xl font-bold text-text-primary mb-4"
          >
            Agentic Document Intelligence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-text-secondary max-w-2xl mx-auto"
          >
            Explore how a multi-agent AI system transforms complex documents into production-ready structured data
          </motion.p>
        </div>

        {/* Main interactive area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AgentArchitectureDiagram
                currentStep={currentStep}
                highlightedAgents={activeStepConfig.highlightAgents}
                activeConnections={activeStepConfig.activeConnections}
                onAgentClick={(agentId) => setSelectedAgent(agentId)}
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

            {/* Annotations & Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StepAnnotations
                currentStep={currentStep}
                onStepChange={setCurrentStep}
              />

              {/* Agent details modal */}
              <AnimatePresence>
                {selectedAgent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="mt-6 p-4 bg-bg-primary rounded-xl border border-border shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-primary">Agent Details</h4>
                      <button
                        onClick={() => setSelectedAgent(null)}
                        className="text-text-muted hover:text-text-secondary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Click on any agent in the diagram to learn more about its role.
                    </p>
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
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-teal-500/5 to-teal-500/10 rounded-2xl border border-teal-500/20">
            <div className="text-left">
              <h3 className="font-semibold text-text-primary">Ready to transform your document workflows?</h3>
              <p className="text-sm text-text-secondary">Let&apos;s build an agentic system for your documents.</p>
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

// Immersive Story Experience Component (Enhanced Original)
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
      {/* Story Progress Indicator */}
      <StoryProgress currentAct={currentAct} />

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
                Agentic AI
              </span>
              <span className="text-text-muted">·</span>
              <span className="text-sm text-text-muted">Document Processing</span>
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
              Hundreds of complex documents. Multiple formats. No standard structure.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-base text-text-muted mb-12 max-w-2xl mx-auto"
            >
              Organizations face the same challenge: extracting structured data from complex documents with varying layouts,
              multi-column formats, and embedded tables. Manual data entry takes hours per document and remains error-prone.
            </motion.p>

            {/* Document chaos visualization */}
            <div className="w-full h-96 rounded-2xl bg-gradient-to-b from-bg-secondary to-border border border-border overflow-hidden shadow-lg">
              <DocumentChaos className="w-full h-full" />
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
              Traditional OCR broke on multi-column layouts. Tables became gibberish.
            </motion.p>

            {/* OCR Failure visualization */}
            <OCRFailure
              inView={sectionInView.stakes}
              className="w-full"
            />

            {/* Additional Stakes Context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-6 rounded-xl bg-bg-primary border border-border shadow-sm max-w-lg mx-auto"
            >
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="font-semibold text-text-primary">Item codes merged with descriptions.</span>{' '}
                Categories spanned pages unpredictably. Multi-column layouts confused the parsing order.
                Every kit still required manual cleanup—defeating the purpose of automation.
              </p>
            </motion.div>
          </div>
        </div>
      </StorySection>

      {/* Act 3: The Breakthrough - Enhanced with new Architecture Diagram */}
      <StorySection
        id="act3"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(2, 'approach')}
      >
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-6xl mx-auto">
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
                A multi-agent system with parallel category extraction and AI-powered refinement.
              </motion.p>
            </div>

            {/* Enhanced Agent Architecture visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <AgentArchitectureDiagram
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

            {/* Approach Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {[
                { num: 1, text: 'Assessment Agent uses AI vision to understand document structure automatically' },
                { num: 2, text: 'Parallel subagents process different sections concurrently for speed' },
                { num: 3, text: 'Refinement Agent enables conversational corrections for edge cases' },
                { num: 4, text: 'Validator ensures production-ready output with external data enrichment' },
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

      {/* Act 4: The Transformation - Enhanced Processing Flow */}
      <StorySection
        id="act4"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(3, 'transformation')}
        variant="secondary"
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
                Act IV
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
              >
                The Two-Stage Pipeline
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary"
              >
                AI extraction meets deterministic post-processing for reliable, deployable data
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

            {/* Key benefits */}
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
                  title: 'Parallel Subagent Processing',
                  description: 'Multiple specialized agents work concurrently, processing in parallel for dramatic speed gains',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: 'Conversational Refinement',
                  description: 'Natural language interface lets anyone guide corrections without technical knowledge',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Self-Healing Validation',
                  description: 'Comprehensive validation with feedback loops ensures production-ready output every time',
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
              From hours of manual data entry to minutes of automated processing.
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
                &quot;What used to take our team hours now happens in minutes. The parallel agents handle our largest documents, and the autonomous validation eliminated manual review entirely.&quot;
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
                Beyond Healthcare
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Where agentic document processing creates value
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                The same multi-agent approach transforms document workflows across industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  industry: 'Healthcare',
                  challenge: 'Medical Documentation',
                  description: 'Extract structured data from complex clinical documents, catalogs, and compliance paperwork with external data enrichment.',
                  metric: '10x faster processing',
                },
                {
                  industry: 'Legal',
                  challenge: 'Contract Analysis',
                  description: 'Extract clauses, obligations, and risks from contracts. Autonomous agents handle due diligence at scale.',
                  metric: 'Review documents in hours, not days',
                },
                {
                  industry: 'Insurance',
                  challenge: 'Claims Processing',
                  description: 'Parse supporting documents and extract key facts autonomously. Route to adjusters with structured data.',
                  metric: 'Eliminate manual data entry',
                },
                {
                  industry: 'Financial Services',
                  challenge: 'Compliance Documentation',
                  description: 'Extract data from applications and regulatory filings. Full audit trail for every extraction decision.',
                  metric: 'Zero manual data entry',
                },
                {
                  industry: 'Manufacturing',
                  challenge: 'Technical Specifications',
                  description: 'Parse product specs and engineering documents into structured data ready for downstream systems.',
                  metric: 'Centralized product database',
                },
                {
                  industry: 'Your Industry',
                  challenge: 'Custom Document Workflows',
                  description: 'Any document type that requires understanding structure, context, and relationships - we can automate it.',
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
              Your documents deserve intelligent processing too.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-secondary mb-10"
            >
              Let&apos;s build an agentic system that handles your complex documents autonomously.
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
export default function DocumentIntelligenceCaseStudy() {
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
