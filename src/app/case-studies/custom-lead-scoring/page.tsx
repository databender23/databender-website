'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ExecutiveSummaryCard,
  InteractiveLeadDemo,
  CRMComparison,
  DayInTheLife,
  SimplifiedPipeline,
  FeatureImportanceV2,
  FrustratedSalesScene,
} from './components'

// Intermediate CTA component for use throughout the page
function IntermediateCTA({
  headline,
  subtext,
  buttonText,
  href,
  variant = 'default',
}: {
  headline: string
  subtext: string
  buttonText: string
  href: string
  variant?: 'default' | 'subtle' | 'strong'
}) {
  const bgClass =
    variant === 'strong'
      ? 'bg-gradient-to-r from-teal-500 to-teal-600'
      : variant === 'subtle'
      ? 'bg-bg-secondary border border-border'
      : 'bg-gradient-to-r from-teal-50 to-teal-100 border border-teal-200'

  const textClass =
    variant === 'strong'
      ? 'text-white'
      : 'text-text-primary'

  const buttonClass =
    variant === 'strong'
      ? 'bg-white text-teal-600 hover:bg-teal-50'
      : 'bg-teal-500 text-white hover:bg-teal-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-8 ${bgClass}`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className={`text-lg font-semibold ${textClass} mb-1`}>{headline}</h3>
          <p className={`text-sm ${variant === 'strong' ? 'text-white/80' : 'text-text-muted'}`}>
            {subtext}
          </p>
        </div>
        <Link
          href={href}
          className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-colors whitespace-nowrap ${buttonClass}`}
        >
          {buttonText}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.div>
  )
}

export default function LeadScoringCaseStudyV2() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section - Lead with Sales Pain */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-bg-primary" />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-border mb-8"
            >
              <span className="px-2 py-0.5 text-xs font-medium bg-teal-500/10 text-teal-600 rounded-full">
                Case Study
              </span>
              <span className="text-sm text-text-muted">AI Lead Scoring</span>
            </motion.div>

            {/* Emotional headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Your sales team spends{' '}
              <span className="text-red-500">60% of their time</span>{' '}
              on leads that will never buy.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-text-secondary mb-4"
            >
              What if they could know in advance which ones to prioritize?
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-text-muted max-w-2xl mx-auto mb-10"
            >
              This is the story of how we helped a sales team stop guessing and start closing,
              using AI that learns what actually predicts conversions in their business.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-teal-500 rounded-xl hover:bg-teal-600 transition-colors"
              >
                Talk to Us About Lead Scoring
              </Link>
              <a
                href="#demo"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-text-primary bg-white border border-border rounded-xl hover:bg-bg-secondary transition-colors"
              >
                Try the Interactive Demo
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

      {/* The Problem - Animated Scene */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">The Problem</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Generic scoring creates more problems than it solves
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Traditional CRM scoring treats a curious browser the same as a serious buyer.
                The result? Frustrated sales reps chasing leads that were never going to convert.
              </p>
            </motion.div>

            <FrustratedSalesScene className="mb-12" />

            <IntermediateCTA
              headline="Sound familiar?"
              subtext="You are not alone. Most sales teams struggle with lead prioritization."
              buttonText="See the Solution"
              href="#solution"
              variant="subtle"
            />
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
                Can you spot the winning lead?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Test your intuition against our AI. Look at two leads and guess which one will convert.
                You might be surprised by what actually matters.
              </p>
            </motion.div>

            <InteractiveLeadDemo className="mb-12" />
          </div>
        </div>
      </section>

      {/* CRM Comparison */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">The Difference</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Generic CRM vs. Custom AI Scoring
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                One asks &quot;Are they interested?&quot; The other asks &quot;Will they buy?&quot;
                That distinction changes everything.
              </p>
            </motion.div>

            <CRMComparison className="mb-12" />

            <IntermediateCTA
              headline="Ready to see the difference?"
              subtext="Let us show you what custom scoring could look like for your team."
              buttonText="Schedule a Demo"
              href="/contact"
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* How It Works - Simplified Pipeline */}
      <section id="solution" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">The Solution</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                AI scoring that runs itself
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                No complex setup. No manual intervention. Just smart lead prioritization
                that updates in real-time, 24/7.
              </p>
            </motion.div>

            <SimplifiedPipeline className="mb-12" />
          </div>
        </div>
      </section>

      {/* Feature Importance with Business Translations */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">The Discovery</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                What actually predicts conversions?
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Spoiler: it is not email opens or page views. Our AI discovered the signals
                that generic CRMs completely miss.
              </p>
            </motion.div>

            <FeatureImportanceV2 className="mb-12" />
          </div>
        </div>
      </section>

      {/* Day in the Life Narrative */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">In Practice</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                A day in the life with AI scoring
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Follow Sarah, a sales rep, through her day to see how intelligent lead scoring
                transforms the sales workflow.
              </p>
            </motion.div>

            <DayInTheLife className="mb-12" />

            <IntermediateCTA
              headline="Want your team to work like this?"
              subtext="We can build custom scoring tailored to your sales process."
              buttonText="Let us talk"
              href="/contact"
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">The Results</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Same leads. Smarter prioritization.
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                The impact of knowing which leads to call first.
              </p>
            </motion.div>

            {/* Results grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: '40-60%', label: 'Less wasted effort', color: 'text-green-500', bg: 'bg-green-50' },
                { value: '30s', label: 'Real-time updates', color: 'text-teal-500', bg: 'bg-teal-50' },
                { value: '7', label: 'Predictive features', color: 'text-blue-500', bg: 'bg-blue-50' },
                { value: '24/7', label: 'Autonomous operation', color: 'text-purple-500', bg: 'bg-purple-50' },
              ].map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${metric.bg} rounded-xl p-6 text-center border border-border`}
                >
                  <div className={`text-4xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                  <div className="text-sm text-text-muted">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-border shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg text-text-secondary italic mb-4">
                    &quot;The AI discovered patterns we never would have found. Our sales team finally knows
                    which leads to prioritize, and the system runs 24/7 without any intervention from us.&quot;
                  </p>
                  <footer>
                    <p className="font-semibold text-text-primary">Sales Operations Director</p>
                    <p className="text-sm text-text-muted">B2B Services Company</p>
                  </footer>
                </div>
              </div>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Applications</span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-2 mb-4">
                Every sales team can benefit
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                If you have leads and historical conversion data, we can build scoring that works for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { industry: 'B2B Sales', icon: '^', description: 'Predict which opportunities will close' },
                { industry: 'Real Estate', icon: '@', description: 'Identify serious buyers from browsers' },
                { industry: 'Financial Services', icon: '#', description: 'Score loan and policy applications' },
                { industry: 'Healthcare', icon: '+', description: 'Match patients to high-value services' },
                { industry: 'Insurance', icon: '*', description: 'Predict policy conversion likelihood' },
                { industry: 'Your Industry', icon: '?', description: 'Custom scoring for your specific needs' },
              ].map((item, index) => (
                <motion.div
                  key={item.industry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border ${
                    item.industry === 'Your Industry'
                      ? 'bg-teal-50 border-teal-200'
                      : 'bg-white border-border'
                  }`}
                >
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.industry}</h3>
                  <p className="text-sm text-text-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-teal-500 to-teal-600">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Your leads deserve smarter scoring too.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-white/90 mb-10"
            >
              Let us show you what AI-powered lead scoring could look like for your business.
              No commitment, just a conversation about your needs.
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
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-teal-600 bg-white rounded-xl hover:bg-teal-50 transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
              >
                View Other Case Studies
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-sm text-white/70"
            >
              Typical engagement: 4-6 weeks to deployed scoring model
            </motion.p>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-20 bg-bg-primary" />
    </div>
  )
}
