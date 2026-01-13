'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AICapabilitiesProps {
  className?: string
}

const capabilities = [
  {
    id: 'search',
    title: 'Search & Find',
    description: 'Ask questions in plain English. Get instant answers from thousands of documents.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    color: 'teal',
    demo: {
      type: 'search',
      query: "What's the part number for the 4.5mm cortical screw from AAP?",
      answer: "AAP-CS45-20 (20mm) and AAP-CS45-24 (24mm) - Large Fragment 4.5 Kit",
    },
  },
  {
    id: 'chat',
    title: 'Chat With Your Data',
    description: 'A ChatGPT-style interface that knows your business. Ask complex questions, get sourced answers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    color: 'blue',
    demo: {
      type: 'chat',
      messages: [
        { role: 'user', text: 'Which kits include titanium locking plates?' },
        { role: 'ai', text: 'Based on your documents, 12 kits include titanium locking plates: AAP Large Fragment, Maxx Distal Radius, Vilex Alphalok...' },
      ],
    },
  },
  {
    id: 'automate',
    title: 'Automate Workflows',
    description: 'New documents trigger actions automatically. Catalogs update inventory. Forms route to the right team.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'purple',
    demo: {
      type: 'workflow',
      steps: [
        { label: 'New catalog uploaded', icon: '📄' },
        { label: 'AI reads & structures', icon: '🤖' },
        { label: 'Inventory updated', icon: '✓' },
      ],
    },
  },
  {
    id: 'build',
    title: 'Build Applications',
    description: 'Mobile apps, dashboards, integrations - all powered by your structured knowledge base.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    color: 'amber',
    demo: {
      type: 'apps',
      examples: ['Mobile App', 'Dashboard', 'API'],
    },
  },
  {
    id: 'grow',
    title: 'Growing Knowledge',
    description: 'New documents automatically expand what AI knows. Your institutional memory grows over time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'green',
    demo: {
      type: 'growth',
      stats: { docs: '1,000+', growing: '+50/month' },
    },
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; light: string }> = {
  teal: { bg: 'bg-teal-500', text: 'text-teal-600', border: 'border-teal-200', light: 'bg-teal-50' },
  blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-200', light: 'bg-blue-50' },
  purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-200', light: 'bg-purple-50' },
  amber: { bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-200', light: 'bg-amber-50' },
  green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-200', light: 'bg-green-50' },
}

function InlineDemo({ capability }: { capability: typeof capabilities[0] }) {
  const colors = colorClasses[capability.color]

  if (capability.demo.type === 'search') {
    return (
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
        <div className="bg-white rounded-lg p-2.5 sm:p-3 border border-gray-200">
          <p className="text-xs sm:text-sm text-text-secondary italic">&ldquo;{capability.demo.query}&rdquo;</p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${colors.light} rounded-lg p-2.5 sm:p-3 border ${colors.border}`}
        >
          <div className="flex items-start gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg">✨</span>
            <p className="text-xs sm:text-sm text-text-primary font-medium">{capability.demo.answer}</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (capability.demo.type === 'chat') {
    return (
      <div className="mt-3 sm:mt-4 space-y-2">
        {capability.demo.messages?.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`p-2.5 sm:p-3 rounded-lg ${
              msg.role === 'user'
                ? 'bg-white border border-gray-200 ml-4 sm:ml-8'
                : `${colors.light} mr-4 sm:mr-8 border ${colors.border}`
            }`}
          >
            <div className="flex items-start gap-1.5 sm:gap-2">
              {msg.role === 'ai' && <span className="text-xs sm:text-sm">🤖</span>}
              <p className="text-xs sm:text-sm text-text-primary">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (capability.demo.type === 'workflow') {
    return (
      <div className="mt-3 sm:mt-4">
        <div className="flex items-center justify-between gap-1 sm:gap-2 bg-white rounded-lg p-2.5 sm:p-4 border border-gray-200">
          {capability.demo.steps?.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="flex-1 text-center"
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colors.light} flex items-center justify-center text-lg sm:text-xl mx-auto mb-1.5 sm:mb-2`}>
                {step.icon}
              </div>
              <p className="text-[10px] sm:text-xs text-text-secondary leading-tight">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (capability.demo.type === 'apps') {
    return (
      <div className="mt-3 sm:mt-4">
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {capability.demo.examples?.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`px-2.5 sm:px-4 py-2 sm:py-3 rounded-lg ${colors.light} border ${colors.border} flex items-center gap-1.5 sm:gap-2`}
            >
              <span className="text-base sm:text-lg">{app === 'Mobile App' ? '📱' : app === 'Dashboard' ? '📊' : '🔗'}</span>
              <p className="text-xs sm:text-sm font-medium text-text-primary">{app}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (capability.demo.type === 'growth') {
    return (
      <div className="mt-3 sm:mt-4">
        <div className="flex items-center justify-around bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className={`text-xl sm:text-3xl font-bold ${colors.text}`}>{capability.demo.stats?.docs}</p>
            <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 sm:mt-1">Documents</p>
          </motion.div>
          <div className="h-10 sm:h-12 w-px bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="text-center"
          >
            <p className={`text-xl sm:text-3xl font-bold ${colors.text}`}>{capability.demo.stats?.growing}</p>
            <p className="text-[10px] sm:text-xs text-text-muted mt-0.5 sm:mt-1">Growing</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}

export default function AICapabilities({ className = '' }: AICapabilitiesProps) {
  const [expandedId, setExpandedId] = useState<string>(capabilities[0].id)

  const toggleCapability = (id: string) => {
    setExpandedId(expandedId === id ? '' : id)
  }

  return (
    <div className={`${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 sm:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-teal-100">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          What This Enables
        </div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary mb-2 sm:mb-3 px-2">
          Five Ways to Use Your Knowledge Base
        </h3>
        <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto px-2">
          Once structured, your documents become the foundation for search,
          AI assistants, automated workflows, and custom applications.
        </p>
      </motion.div>

      {/* Accordion capabilities */}
      <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
        {capabilities.map((capability, index) => {
          const colors = colorClasses[capability.color]
          const isExpanded = expandedId === capability.id

          return (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg sm:rounded-xl border-2 overflow-hidden transition-colors duration-200 ${
                isExpanded
                  ? `${colors.border} ${colors.light}`
                  : 'border-border bg-bg-primary hover:border-gray-300'
              }`}
            >
              {/* Header - always visible */}
              <button
                onClick={() => toggleCapability(capability.id)}
                className="w-full text-left p-3 sm:p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isExpanded ? colors.bg + ' text-white' : colors.light + ' ' + colors.text
                  }`}>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 [&>svg]:w-full [&>svg]:h-full">
                      {capability.icon}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className={`text-sm sm:text-base font-semibold ${isExpanded ? colors.text : 'text-text-primary'}`}>
                      {capability.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-text-secondary mt-0.5 line-clamp-2 sm:line-clamp-none">
                      {capability.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 ml-2 sm:ml-4 ${isExpanded ? colors.text : 'text-text-muted'}`}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>

              {/* Expandable demo content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="border-t border-border/50 pt-3 sm:pt-4">
                        <p className="text-[10px] sm:text-xs text-text-muted uppercase tracking-wide mb-2">Example</p>
                        <InlineDemo capability={capability} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs sm:text-sm text-text-muted mt-4 sm:mt-6"
      >
        Tap each capability to see an example
      </motion.p>
    </div>
  )
}
