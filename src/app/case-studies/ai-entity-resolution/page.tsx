'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  StorySection,
  CustomerRecordCards,
  StakesCalculator,
  TransformationScene,
  RevealNumbers,
  StoryProgress,
  ExecutiveSummary,
  JourneyMap,
  IntermediateCTA,
} from './components'

export default function EntityResolutionCaseStudyV2() {
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

      {/* Hero Section with Executive Summary */}
      <section className="min-h-screen pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-500 rounded-full border border-teal-500/20">
              Case Study
            </span>
            <span className="text-text-muted">|</span>
            <span className="text-sm text-text-muted">Data Unification</span>
          </motion.div>

          {/* Main Title - Business Friendly */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-text-primary text-center mb-4"
          >
            Turning Data Chaos Into a{' '}
            <span className="text-teal-500">Single Source of Truth</span>
          </motion.h1>

          {/* Subtitle - Relatable Hook */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary text-center mb-8 max-w-3xl mx-auto"
          >
            When you have millions of records and no idea how many are duplicates...
          </motion.p>

          {/* Executive Summary Card */}
          <ExecutiveSummary className="mb-12" />

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center text-text-muted"
          >
            <p className="text-sm mb-2">Scroll for the full story</p>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </div>
      </section>

      {/* Act 1: The Chaos - Visual Records */}
      <StorySection
        id="act1"
        minHeight="100vh"
        onEnterView={() => handleSectionEnter(0, 'chaos')}
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
                Act I
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-text-primary mb-6"
              >
                The Problem
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary mb-4"
              >
                Same person. Different names. Scattered everywhere.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-base text-text-muted max-w-2xl mx-auto"
              >
                &quot;John Smith&quot; in one system. &quot;J. Smith&quot; in another. &quot;Jonathan Smith&quot; somewhere else.
                All the same person - but how do you know?
              </motion.p>
            </div>

            {/* Customer Record Cards Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-full h-[500px] rounded-2xl bg-bg-secondary border border-border overflow-hidden shadow-lg"
            >
              <CustomerRecordCards
                organizationLevel={0}
                showLabels={false}
                className="w-full h-full"
              />
            </motion.div>

            {/* Intermediate CTA */}
            <IntermediateCTA
              variant="question"
              title="Sound familiar?"
              subtitle="Most organizations have 20-40% duplicate records without knowing it."
              buttonText="Get a Free Assessment"
              buttonHref="/contact"
              className="mt-8"
            />
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
              The Stakes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              What if you tried to fix this manually?
            </motion.p>

            {/* Stakes Calculator */}
            <div className="max-w-xl mx-auto">
              <StakesCalculator
                inView={sectionInView.stakes}
                className="w-full"
              />
            </div>

            {/* Additional context */}
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

      {/* Act 3: The Solution - Journey Map */}
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
                The Solution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-text-secondary max-w-2xl mx-auto"
              >
                AI that finds the same person across messy databases
              </motion.p>
            </div>

            {/* Journey Map - Customer-Friendly Architecture */}
            <JourneyMap className="w-full" />

            {/* Intermediate CTA */}
            <IntermediateCTA
              variant="action"
              title="Want to see how this works for your data?"
              subtitle="We'll analyze a sample of your records and show you the potential."
              buttonText="Schedule a Demo"
              buttonHref="/contact"
              className="mt-12"
            />
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
              The Results
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary mb-12"
            >
              From chaos to clarity. The numbers speak for themselves.
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
                &quot;We finally know who our customers are. One record per person,
                every decision documented. What seemed impossible became routine.&quot;
              </p>
              <footer className="mt-6">
                <p className="text-text-muted text-sm">
                  - Operations Director
                </p>
              </footer>
            </motion.blockquote>
          </div>
        </div>
      </StorySection>

      {/* Use Cases Section */}
      <StorySection
        id="use-cases"
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
                Where This Works
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                Finding the same person across your data
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Same approach. Different industries. Always the same goal: one record per real person.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  industry: 'Healthcare',
                  challenge: 'Patient Record Matching',
                  description: 'Same patient, different visits, different systems. Unify records across facilities.',
                  metric: '90%+ duplicate reduction',
                },
                {
                  industry: 'Financial Services',
                  challenge: 'Customer Data Unification',
                  description: 'One customer, multiple products, multiple names. Create a single customer view.',
                  metric: 'Single source of truth',
                },
                {
                  industry: 'Real Estate',
                  challenge: 'Property & Owner Records',
                  description: 'Same property, different records over time. Track ownership accurately.',
                  metric: '10x faster research',
                },
                {
                  industry: 'Manufacturing',
                  challenge: 'Supplier Consolidation',
                  description: 'Same vendor, different names from M&A. Consolidate your supplier base.',
                  metric: '30%+ duplicate suppliers found',
                },
                {
                  industry: 'Legal',
                  challenge: 'Conflicts & Matter Matching',
                  description: 'Same party, different case names. Automate conflicts checks.',
                  metric: '80% faster conflicts review',
                },
                {
                  industry: 'Your Industry',
                  challenge: 'Custom Data Challenges',
                  description: 'Any messy data that needs matching, deduplication, or consolidation.',
                  metric: "Let's discuss your use case",
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
                  <p className={`text-sm font-medium ${item.isCta ? 'text-teal-500' : 'text-teal-500'}`}>
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
              Let&apos;s find the same person across your databases - automatically.
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
                Schedule a Consultation
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
              <p className="text-text-muted text-sm mb-6">
                Trusted by data teams who needed to find the truth in their data
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">125x</p>
                  <p className="text-xs text-text-muted">Cost Savings</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">99.7%</p>
                  <p className="text-xs text-text-muted">Match Accuracy</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-text-primary">100%</p>
                  <p className="text-xs text-text-muted">Audit Trail</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </StorySection>
    </div>
  )
}
