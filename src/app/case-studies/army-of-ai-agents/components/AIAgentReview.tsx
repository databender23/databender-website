'use client'

import { motion } from 'framer-motion'

interface AIAgentReviewProps {
  className?: string
}

export default function AIAgentReview({ className = '' }: AIAgentReviewProps) {
  return (
    <div className={`${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
            How We Validated Every Decision
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            50,000+ merge and split decisions. Manual review would take 500 hours.
            We deployed AI agents to validate each one.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-bg-secondary border border-border mb-8"
        >
          <div className="font-mono text-sm space-y-4">
            {/* Orchestrator */}
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-500 font-semibold">
                ORCHESTRATOR
              </span>
            </div>

            {/* Arrow down */}
            <div className="text-center text-text-muted">│</div>

            {/* Batch */}
            <div className="p-4 rounded-lg bg-bg-primary border border-border">
              <div className="text-text-muted text-xs mb-2">Batch 1 (200 owners)</div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="p-2 rounded bg-purple-500/10 border border-purple-500/30 text-center"
                  >
                    <span className="text-purple-500 text-xs">Agent {i}</span>
                    <div className="text-text-muted text-[10px]">20 IDs</div>
                  </motion.div>
                ))}
              </div>
              <div className="text-center text-text-muted text-xs mt-2">
                All 10 agents run in parallel
              </div>
            </div>

            {/* Arrow down */}
            <div className="text-center text-text-muted">│</div>

            {/* Aggregator */}
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                Aggregator (combines results, runs async)
              </span>
            </div>

            {/* Arrow down */}
            <div className="text-center text-text-muted">│</div>

            {/* Output */}
            <div className="text-center">
              <span className="inline-block px-4 py-2 rounded-lg bg-bg-primary border border-border text-text-secondary">
                batch_combined.csv + documented reasoning
              </span>
            </div>
          </div>

          {/* Repeat indicator */}
          <div className="mt-4 pt-4 border-t border-border text-center text-text-muted text-sm">
            Process repeats until all owners reviewed
          </div>
        </motion.div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-teal-500/5 border border-teal-500/20 mb-8"
        >
          <p className="text-text-primary text-center">
            <span className="font-semibold">AI agents review decisions the same way a human analyst would.</span>
            {' '}Ten of them work in parallel until the job is done. Every decision gets documented reasoning.
          </p>
        </motion.div>

        {/* Cost comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Manual */}
          <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-orange-500">Manual Review</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Time required</span>
                <span className="text-text-primary font-medium">~500 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">At $50/hour</span>
                <span className="text-text-primary font-medium">$25,000+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Consistency</span>
                <span className="text-text-primary font-medium">Variable</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Documentation</span>
                <span className="text-text-primary font-medium">Spotty</span>
              </div>
            </div>
          </div>

          {/* AI */}
          <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">AI Agent Review</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Time required</span>
                <span className="text-text-primary font-medium">Hours (parallel)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">API cost</span>
                <span className="text-text-primary font-medium">~$200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Consistency</span>
                <span className="text-text-primary font-medium">100% (same rules)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-muted">Documentation</span>
                <span className="text-text-primary font-medium">Every decision</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8 pt-8"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">200</p>
            <p className="text-xs text-text-muted">Owners per Batch</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-500">10</p>
            <p className="text-xs text-text-muted">Parallel Agents</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">125x</p>
            <p className="text-xs text-text-muted">Cost Savings</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
