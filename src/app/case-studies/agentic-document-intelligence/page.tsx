'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ExecutiveSummaryCard,
  RealWorldExamples,
  OCRFailure,
  BeforeAfterTransform,
  SalesRepOutcome,
  RevealNumbers,
  AICapabilities,
  industryCards,
} from './components'

export default function DocumentIntelligenceCaseStudy() {
  const [sectionInView, setSectionInView] = useState({
    problem: false,
    challenge: false,
    capabilities: false,
    transform: false,
    example: false,
    results: false,
  })

  // Refs for scroll navigation
  const problemRef = useRef<HTMLDivElement>(null)
  const challengeRef = useRef<HTMLDivElement>(null)
  const capabilitiesRef = useRef<HTMLDivElement>(null)
  const transformRef = useRef<HTMLDivElement>(null)
  const exampleRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-secondary to-bg-primary">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-teal-500/10 text-teal-600 rounded-full border border-teal-500/20">
                Document Intelligence
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
            >
              Turn Your Documents Into
              <span className="text-teal-500"> AI-Ready Knowledge</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-text-secondary mb-6 md:mb-8 max-w-2xl mx-auto px-2"
            >
              Your organization&apos;s expertise lives in documents. Now AI can access it -
              search, chat, automate, and build applications using YOUR data.
            </motion.p>

            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <ExecutiveSummaryCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 1: The Problem - Knowledge Locked Away */}
      <section
        ref={problemRef}
        className="py-12 md:py-20 bg-bg-secondary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setSectionInView(prev => ({ ...prev, problem: true }))}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-red-500 font-medium uppercase tracking-wide text-xs sm:text-sm">The Problem</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-3 md:mb-4 px-2">
              Your Knowledge Is Locked Away
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
              AI assistants are powerful, but they can&apos;t answer questions about YOUR business.
              Your expertise is trapped in documents they can&apos;t read.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <OCRFailure inView={sectionInView.problem} />
          </div>
        </div>
      </section>

      {/* Section 2: The Challenge - Different Formats */}
      <section
        ref={challengeRef}
        className="py-12 md:py-20 bg-bg-primary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <RealWorldExamples className="max-w-6xl mx-auto" />
        </div>
      </section>

      {/* Section 3: What This Enables - AI Capabilities */}
      <section
        ref={capabilitiesRef}
        className="py-12 md:py-20 bg-bg-secondary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setSectionInView(prev => ({ ...prev, capabilities: true }))}
          >
            <AICapabilities className="max-w-6xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Section 4: The Transformation */}
      <section
        ref={transformRef}
        className="py-12 md:py-20 bg-bg-primary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setSectionInView(prev => ({ ...prev, transform: true }))}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-teal-500 font-medium uppercase tracking-wide text-xs sm:text-sm">How It Works</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-3 md:mb-4 px-2">
              AI That Reads Like You Do
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
              Our AI doesn&apos;t need special formatting or rules for each document type.
              It sees and understands documents the way humans do - then structures the knowledge for AI use.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterTransform />
          </div>
        </div>
      </section>

      {/* Section 5: See It In Action */}
      <section
        ref={exampleRef}
        className="py-12 md:py-20 bg-bg-secondary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setSectionInView(prev => ({ ...prev, example: true }))}
          >
            <SalesRepOutcome className="max-w-5xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Section 6: Results */}
      <section
        ref={resultsRef}
        className="py-12 md:py-20 bg-bg-primary"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onViewportEnter={() => setSectionInView(prev => ({ ...prev, results: true }))}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-teal-500 font-medium uppercase tracking-wide text-xs sm:text-sm">The Outcome</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-3 md:mb-4 px-2">
              AI That Knows Your Business
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
              Thousands of documents become a single knowledge base. AI can finally answer questions
              about YOUR data, YOUR processes, YOUR expertise.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <RevealNumbers inView={sectionInView.results} />
          </div>
        </div>
      </section>

      {/* Cross-Industry Applications */}
      <section className="py-12 md:py-20 bg-bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-teal-500 font-medium uppercase tracking-wide text-xs sm:text-sm">
              Any Industry, Any Documents
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-3 md:mb-4 px-2">
              Your Documents Could Power AI
            </h2>
            <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
              Wherever you have institutional knowledge locked in documents,
              we can transform it into an AI-ready knowledge base.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {industryCards.map((card, index) => (
              <motion.div
                key={card.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 md:p-6 rounded-xl border ${
                  card.isCta
                    ? 'bg-gradient-to-br from-teal-500/5 to-teal-500/10 border-teal-500/30'
                    : 'bg-bg-primary border-border'
                } hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-semibold text-text-primary">{card.industry}</span>
                </div>
                <h3 className="font-medium text-text-primary mb-2">{card.challenge}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {card.description}
                </p>
                <p className={`text-sm font-medium ${card.isCta ? 'text-teal-600' : 'text-teal-500'}`}>
                  {card.metric}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-bg-primary to-teal-500/5">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-4 md:mb-6 px-2"
            >
              Ready to unlock your institutional knowledge?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-xl text-text-secondary mb-8 md:mb-10 px-2"
            >
              Let&apos;s discuss how your documents can become an AI-ready knowledge base
              that powers search, chat, automation, and custom applications.
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
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors duration-300"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold text-text-primary border border-border rounded-lg hover:bg-bg-secondary transition-colors duration-300"
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
              className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border"
            >
              <p className="text-text-muted text-xs sm:text-sm mb-4">Trusted by regulated industries</p>
              <div className="flex items-center justify-center gap-4 md:gap-8 opacity-50">
                <div className="h-6 w-16 md:h-8 md:w-24 bg-text-muted/20 rounded" />
                <div className="h-6 w-16 md:h-8 md:w-24 bg-text-muted/20 rounded" />
                <div className="h-6 w-16 md:h-8 md:w-24 bg-text-muted/20 rounded" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
