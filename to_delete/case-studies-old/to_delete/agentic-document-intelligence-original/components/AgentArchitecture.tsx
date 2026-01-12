'use client'

import { motion } from 'framer-motion'

interface AgentArchitectureProps {
  inView: boolean
  className?: string
}

export default function AgentArchitecture({ inView, className = '' }: AgentArchitectureProps) {
  const agents = [
    {
      id: 'orchestrator',
      label: 'Orchestrator',
      description: 'Routes documents, manages workflow',
      icon: '🎯',
      color: 'bg-teal-500',
      position: 'center',
    },
    {
      id: 'table-extractor',
      label: 'Table Extractor',
      description: 'Specialized for complex tables',
      icon: '📊',
      color: 'bg-blue-500',
      position: 'left',
    },
    {
      id: 'text-extractor',
      label: 'Text Extractor',
      description: 'Handles body content & footnotes',
      icon: '📝',
      color: 'bg-purple-500',
      position: 'left',
    },
    {
      id: 'crossref-extractor',
      label: 'Cross-Reference',
      description: 'Links related sections',
      icon: '🔗',
      color: 'bg-indigo-500',
      position: 'left',
    },
    {
      id: 'validator',
      label: 'Validator',
      description: 'Checks & self-heals errors',
      icon: '✅',
      color: 'bg-success',
      position: 'right',
    },
  ]

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl border border-border shadow-card p-8">
        {/* Visual Architecture */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          {/* Input - Documents */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-20 bg-bg-secondary rounded-lg border border-border flex items-center justify-center shadow-sm">
                <span className="text-2xl">📄</span>
              </div>
              <span className="text-xs text-text-muted">PDFs</span>
            </div>
          </motion.div>

          {/* Arrow to extractors */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute left-20 top-1/2 -translate-y-1/2"
          >
            <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Extractors Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-32 top-1/2 -translate-y-1/2 flex flex-col gap-3"
          >
            {agents.filter(a => a.position === 'left').map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-border"
              >
                <div className={`w-10 h-10 ${agent.color} rounded-lg flex items-center justify-center text-white`}>
                  <span>{agent.icon}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{agent.label}</div>
                  <div className="text-xs text-text-muted">{agent.description}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Orchestrator (Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <motion.div
              className="relative"
              animate={inView ? {
                boxShadow: [
                  '0 0 0px rgba(26, 153, 136, 0)',
                  '0 0 30px rgba(26, 153, 136, 0.4)',
                  '0 0 0px rgba(26, 153, 136, 0)',
                ]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-3xl">🎯</span>
                <span className="text-xs mt-1 font-medium">Orchestrator</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Connection lines (animated) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Lines from extractors to orchestrator */}
            {[0, 1, 2].map((i) => (
              <motion.path
                key={`line-left-${i}`}
                d={`M 220 ${180 + i * 60} Q 300 ${200 + i * 30} 320 250`}
                fill="none"
                stroke="rgba(26, 153, 136, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
              />
            ))}
            {/* Line from orchestrator to validator */}
            <motion.path
              d="M 380 250 Q 440 250 480 250"
              fill="none"
              stroke="rgba(34, 197, 94, 0.4)"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            />
          </svg>

          {/* Validator (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="absolute right-32 top-1/2 -translate-y-1/2"
          >
            <div className="flex items-center gap-3 p-4 bg-success/10 rounded-xl border border-success/30">
              <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center text-white">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">Validator</div>
                <div className="text-xs text-text-muted">Self-healing errors</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow to output */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="absolute right-20 top-1/2 -translate-y-1/2"
          >
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Output - Clean Data */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-20 bg-success/10 rounded-lg border border-success/30 flex items-center justify-center shadow-sm">
                <span className="text-2xl">✨</span>
              </div>
              <span className="text-xs text-success font-medium">Clean Data</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-center mt-6 pt-6 border-t border-border"
        >
          <p className="text-text-secondary">
            Specialized agents work in parallel, each expert in their domain.
            <br />
            <span className="text-teal-500 font-medium">The validator catches what others miss.</span>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
