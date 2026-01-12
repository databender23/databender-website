'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ExecutiveSummaryCard,
  PipelineDiagram,
  EntityStepAnnotations,
  RealWorldExamples,
  OldApproachFailure,
  BeforeAfterTransform,
  BusinessOutcome,
  RevealNumbers,
} from './components'
import { industryCards } from './components/DiagramConfig'

export default function EntityResolutionCaseStudy() {
  const [currentStep, setCurrentStep] = useState(1)

  // Refs for section visibility tracking
  const oldApproachRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Track section visibility for animations
  const oldApproachInView = useInView(oldApproachRef, { once: true, amount: 0.3 })
  const resultsInView = useInView(resultsRef, { once: true, amount: 0.3 })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-bg-secondary to-white">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-500 rounded-full border border-teal-500/20">
                Case Study
              </span>
              <span className="text-text-muted">|</span>
              <span className="text-sm text-text-muted">Entity Resolution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4"
            >
              An Army of AI Agents vs.{' '}
              <span className="text-teal-500">1.69 Million Broken Records</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary max-w-2xl mx-auto"
            >
              How AI agents that reason through data chaos turned an unsolvable problem into a competitive advantage
            </motion.p>
          </div>

          {/* Executive Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <ExecutiveSummaryCard />
          </motion.div>
        </div>
      </section>

      {/* Section 1: The Outcome (moved up - payoff first) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium mb-4 border border-green-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              The Outcome
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              A Capability Their Competitors Don&apos;t Have
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Better targeting, faster deals, and ownership tracking that competitors can&apos;t match—because they&apos;re still using the broken data.
            </p>
          </motion.div>

          <BusinessOutcome className="max-w-5xl mx-auto" />
        </div>
      </section>

      {/* Section 2: The Challenge */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium mb-4 border border-orange-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              The Challenge
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Public Data, Private Headaches
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              The underlying data comes from public tax rolls and county records. Anyone who has worked with government data knows the quality varies wildly - one county assigns the same ID to hundreds of different people, another scatters one person across dozens of IDs. Every company using this data inherits these problems.
            </p>
          </motion.div>

          <RealWorldExamples className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Section 3: What Didn't Work */}
      <section ref={oldApproachRef} className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-4 border border-red-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              What Didn&apos;t Work
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              Not Financially Feasible Before Agentic AI
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Rules-based systems can&apos;t handle the infinite variations in how names and addresses appear across county records.
            </p>
          </motion.div>

          <OldApproachFailure inView={oldApproachInView} className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Section 4: The Transformation */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4 border border-blue-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              The Transformation
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              From ID Chaos to Clean Profiles
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              See how fragmented, conflicting records become unified owner profiles with AI-validated confidence scores.
            </p>
          </motion.div>

          <BeforeAfterTransform className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Section 5: How We Did It (Technical Details) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4 border border-teal-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              How We Did It
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              10 AI Agents Working in Parallel
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A detailed look at how the agents reasoned through 1.69 million records.
            </p>
          </motion.div>

          {/* Main 2-column layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              {/* Left: Pipeline Diagram */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <PipelineDiagram
                  currentStep={currentStep}
                  className="w-full h-full"
                />
              </motion.div>

              {/* Right: Step Annotations */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <EntityStepAnnotations
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Results */}
      <section ref={resultsRef} className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-4 border border-emerald-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              The Results
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              What an Army of AI Agents Accomplished
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We deployed 10 agents for this project. We could have deployed hundreds. The reasoning scales infinitely—that&apos;s what changed.
            </p>
          </motion.div>

          <RevealNumbers inView={resultsInView} className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Section 7: Cross-Industry Applications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-teal-500 font-medium mb-2 tracking-wide uppercase text-sm">
              Works for Your Industry
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              The Same Approach, Tailored to Your Data
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Whatever messy data you deal with, we can clean it up.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryCards.map((item, index) => (
              <motion.div
                key={item.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`p-5 rounded-xl border ${
                  item.isCta
                    ? 'bg-gradient-to-br from-teal-500/5 to-teal-500/10 border-teal-500/30'
                    : 'bg-bg-primary border-border'
                } hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-text-primary text-sm">{item.industry}</span>
                </div>
                <h3 className="font-medium text-text-primary mb-1.5 text-sm">{item.challenge}</h3>
                <p className="text-xs text-text-secondary mb-3 leading-relaxed">
                  {item.description}
                </p>
                <p className={`text-xs font-medium ${item.isCta ? 'text-teal-500' : 'text-teal-500'}`}>
                  {item.metric}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-teal-500/5 via-bg-secondary to-teal-500/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                Your data could be your competitive advantage
              </h2>
              <p className="text-text-secondary">
                If your industry has messy data that everyone struggles with, we can help you fix it. Talk to us about your specific challenges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-4 bg-bg-primary text-text-primary font-medium rounded-lg border border-border hover:bg-bg-secondary transition-colors"
              >
                View All Case Studies
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-text-muted text-sm mb-4">From this project</p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">1.69M</p>
                  <p className="text-xs text-text-muted">Records Processed</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">125x</p>
                  <p className="text-xs text-text-muted">Cost Savings</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">10x</p>
                  <p className="text-xs text-text-muted">Faster to Market</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
