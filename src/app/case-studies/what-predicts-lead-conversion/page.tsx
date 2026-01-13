'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ExecutiveSummaryCard,
  InteractiveLeadDemo,
  CRMComparison,
  SimplifiedPipeline,
  FeatureImportanceV2,
} from './components'

export default function LeadScoringCaseStudy() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section - Lead with a question, not a pitch */}
      <section className="relative pt-20 md:pt-24 pb-20 lg:pb-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-bg-primary" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border mb-8"
            >
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-500/10 text-purple-600 rounded-full">
                Research Insight
              </span>
              <span className="text-sm text-text-muted">Lead Scoring</span>
            </motion.div>

            {/* Educational headline - question framing */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              What Actually Predicts{' '}
              <span className="text-purple-600">Lead Conversion</span>?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-text-secondary mb-4"
            >
              An analysis of 3 years of sales data revealed surprising patterns.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-text-muted max-w-2xl mx-auto mb-10"
            >
              Most sales teams prioritize leads based on intuition and surface-level signals.
              When we trained a model on actual conversion outcomes, it contradicted years of
              assumptions about what makes a "good" lead.
            </motion.p>

            {/* Single CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-text-primary bg-white border border-border rounded-xl hover:bg-bg-secondary transition-colors"
              >
                Test Your Intuition
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Summary Card */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <ExecutiveSummaryCard />
          </div>
        </div>
      </section>

      {/* The Problem - Educational framing about scoring approaches */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">The Common Approach</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Engagement Metrics vs. Intent Signals
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Most lead scoring tools prioritize engagement - email opens, page views, form fills.
                These metrics are easy to track, but they measure <em>activity</em>, not <em>intent</em>.
                A tire-kicker can look engaged while a serious buyer stays quiet until they're ready to move.
              </p>
            </motion.div>

            <CRMComparison className="mb-8" />
          </div>
        </div>
      </section>

      {/* Interactive Lead Demo */}
      <section id="demo" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Interactive Demo</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Test your intuition
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Two leads. One will convert, one won't. Can you tell which one based on property value alone?
                The answer might surprise you.
              </p>
            </motion.div>

            <InteractiveLeadDemo className="mb-8" />
          </div>
        </div>
      </section>

      {/* Feature Importance - Why These Signals Matter */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">The Evidence</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Why Intent Signals Outperform Engagement Metrics
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                When we trained models on 3 years of actual conversion data, the results contradicted
                common assumptions. Here's what the data revealed about what actually predicts a sale.
              </p>
            </motion.div>

            <FeatureImportanceV2 className="mb-8" />
          </div>
        </div>
      </section>

      {/* How This Approach Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Combining Multiple Data Sources
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                The key difference from standard CRM scoring: pulling in external data that reveals
                intent signals your CRM doesn't capture on its own.
              </p>
            </motion.div>

            <SimplifiedPipeline className="mb-8" />
          </div>
        </div>
      </section>

      {/* Why This Approach Works - Process Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Why This Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Scoring That Learns From Your Business
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                The difference between static rules and adaptive scoring: one approach treats every
                business the same, the other learns what actually works for yours.
              </p>
            </motion.div>

            {/* Process steps */}
            <div className="space-y-6 mb-12">
              {/* Step 1: Research */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl border border-border p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Deep Historical Analysis</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Before building anything, we dig into your historical sales data. Custom research tools
                      help us understand what's worked in the past: which leads converted, which stalled, and why.
                      This analysis surfaces patterns that generic tools miss because they don't know your business.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Win/loss analysis</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Conversion patterns</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Feature discovery</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Tailored Model */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl border border-border p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Model Tailored to Your Reality</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Every business has unique conversion drivers. A roofing company's best predictors differ
                      from a SaaS company's. We build models specifically for your situation, trained on your
                      data, reflecting your market dynamics. No generic templates.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Custom features</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Industry-specific signals</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Your data, your model</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Feedback Loop */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl border border-border p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Continuous Feedback Loop</h3>
                    <p className="text-sm text-text-secondary mb-3">
                      Scoring doesn't stop at deployment. We track which predictions were right and which missed.
                      As new conversion data comes in, we retrain models to capture shifting patterns. Markets
                      change, buyer behavior evolves, and scoring adapts with it.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Ongoing monitoring</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Model retraining</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">Performance tracking</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feedback loop visual - responsive grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 p-6"
            >
              {/* Mobile: 2x2 grid, Desktop: horizontal row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">1</div>
                  <div className="text-sm font-medium text-text-primary">New Sales Data</div>
                  <div className="text-xs text-text-muted">Conversions & losses</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">2</div>
                  <div className="text-sm font-medium text-text-primary">Analysis</div>
                  <div className="text-xs text-text-muted">What's working?</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">3</div>
                  <div className="text-sm font-medium text-text-primary">Model Update</div>
                  <div className="text-xs text-text-muted">Retrain & improve</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">4</div>
                  <div className="text-sm font-medium text-text-primary">Better Scores</div>
                  <div className="text-xs text-text-muted">Higher accuracy</div>
                </div>
              </div>
              <div className="text-center mt-4">
                <span className="text-xs text-blue-600 font-medium">Continuous improvement cycle</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lessons You Can Apply Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Lessons Learned</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                What Any Sales Team Can Apply
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Whether or not you build custom scoring, these insights can improve how you prioritize leads today.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  title: 'Prioritize Intent Over Activity',
                  desc: 'A lead who says "I need this done next month" is more valuable than one who opens every email but never commits to a timeline.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                },
                {
                  title: 'Question Your Assumptions',
                  desc: 'The data showed property value was a negative predictor. What "obvious" signals might be misleading your team?',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Look for Ability to Act',
                  desc: 'Urgency without capacity stalls. Capacity without urgency delays. Look for both: ready to move AND able to pay.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Leverage Social Proof',
                  desc: 'Neighborhood penetration mattered more than expected. Past wins in an area create trust that accelerates new deals.',
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Share focused, not sales focused */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-text-primary mb-4"
            >
              Found this useful?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-text-secondary mb-8"
            >
              Share it with your sales team, or explore more research from our work
              helping organizations make better use of their data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition-colors"
              >
                Explore More Case Studies
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-text-primary bg-white border border-border rounded-xl hover:bg-bg-secondary transition-colors"
              >
                Have Questions?
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20 bg-bg-primary" />
    </div>
  )
}
