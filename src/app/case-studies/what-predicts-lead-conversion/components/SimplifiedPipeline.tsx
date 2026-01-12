'use client'

import { motion } from 'framer-motion'

interface SimplifiedPipelineProps {
  className?: string
}

export default function SimplifiedPipeline({ className = '' }: SimplifiedPipelineProps) {
  return (
    <div className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Where the Data Comes From</h3>
        <p className="text-sm text-text-muted">Combining internal CRM data with external sources that reveal intent</p>
      </div>

      {/* Main pipeline visualization */}
      <div className="p-8">
        {/* Data Sources Row */}
        <div className="mb-8">
          <div className="text-xs font-medium text-text-muted uppercase tracking-wide mb-4 text-center">
            Data Sources
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Your CRM', desc: 'Leads, timelines, conversations', color: 'blue' },
              { name: 'Property Records', desc: 'Home equity, size, ownership', color: 'green' },
              { name: 'Census Data', desc: 'Demographics, household info', color: 'purple' },
              { name: 'Market Trends', desc: 'Local pricing, activity', color: 'orange' },
            ].map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`px-4 py-3 rounded-xl border text-center min-w-[140px] ${
                  source.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                  source.color === 'green' ? 'bg-green-50 border-green-200' :
                  source.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                  'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="text-sm font-medium text-text-primary">{source.name}</div>
                <div className="text-xs text-text-muted">{source.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>

        {/* Processing Core - Simplified */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 mb-8"
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Smart Prioritization
            </div>
            <p className="text-sm text-text-secondary">Learns from your actual sales outcomes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-4 border border-teal-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <span className="text-sm font-medium text-text-primary">Combine</span>
              </div>
              <p className="text-xs text-text-muted">
                Pull together CRM data with external sources for a complete picture of each lead
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-4 border border-teal-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <span className="text-sm font-medium text-text-primary">Score</span>
              </div>
              <p className="text-xs text-text-muted">
                Apply patterns learned from past wins and losses to predict who's most likely to convert
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-4 border border-teal-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <span className="text-sm font-medium text-text-primary">Update</span>
              </div>
              <p className="text-xs text-text-muted">
                Push prioritized rankings back to your CRM so sales sees them immediately
              </p>
            </div>
          </div>
        </motion.div>

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-8"
        >
          <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>

        {/* Output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-text-primary">Prioritized Lead List in Your CRM</div>
              <div className="text-xs text-text-muted">Sales team sees ranked leads with clear reasoning</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom insight - educational */}
      <div className="p-6 border-t border-border bg-bg-secondary">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Why external data matters:</span> Your CRM knows what leads
            tell you. External sources reveal what they don't - financial capacity, local market conditions,
            demographic patterns that correlate with buying behavior.
          </p>
        </div>
      </div>
    </div>
  )
}
