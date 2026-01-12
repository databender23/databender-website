'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DataFlowVisualizationProps {
  className?: string
  isActive?: boolean
}

const stages = [
  {
    id: 'input',
    label: '70+ Formats',
    sublabel: 'PDFs from manufacturers',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'amber',
    documents: ['Patient Charge Sheets', 'Usage Tickets', 'Product Catalogs', 'Order Forms'],
  },
  {
    id: 'ai',
    label: 'AI Agents',
    sublabel: 'Dynamic processing',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'teal',
    features: ['Vision AI reads layouts', 'Parallel extraction', 'Auto-validation'],
  },
  {
    id: 'data',
    label: 'Unified Data',
    sublabel: 'Standardized format',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    color: 'blue',
    fields: ['Manufacturer', 'Kit', 'Item Ref#', 'Description', 'Qty'],
  },
  {
    id: 'output',
    label: 'Mobile App',
    sublabel: 'Sales rep tool',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: 'green',
    benefits: ['Accurate lookups', 'Instant access', 'Always current'],
  },
]

export default function DataFlowVisualization({ className = '', isActive = true }: DataFlowVisualizationProps) {
  const [activeStage, setActiveStage] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className={`${className}`}>
      {/* Main flow */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-200 via-teal-200 via-blue-200 to-green-200 transform -translate-y-1/2 rounded-full hidden md:block" />

        {/* Animated pulse along the line */}
        {isActive && (
          <motion.div
            className="absolute top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 shadow-lg hidden md:block"
            animate={{
              left: ['0%', '33%', '66%', '100%'],
              scale: [1, 1.2, 1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Stages */}
        <div className="grid md:grid-cols-4 gap-6 relative z-10">
          {stages.map((stage, index) => {
            const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
              amber: { bg: 'bg-amber-500', border: 'border-amber-200', text: 'text-amber-600', light: 'bg-amber-50' },
              teal: { bg: 'bg-teal-500', border: 'border-teal-200', text: 'text-teal-600', light: 'bg-teal-50' },
              blue: { bg: 'bg-blue-500', border: 'border-blue-200', text: 'text-blue-600', light: 'bg-blue-50' },
              green: { bg: 'bg-green-500', border: 'border-green-200', text: 'text-green-600', light: 'bg-green-50' },
            }
            const colors = colorClasses[stage.color]
            const isActiveStage = activeStage === index

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`
                  relative p-5 rounded-xl border-2 transition-all duration-300
                  ${isActiveStage ? `${colors.border} ${colors.light} shadow-lg` : 'border-border bg-bg-primary'}
                `}
              >
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300
                  ${isActiveStage ? colors.bg + ' text-white' : colors.light + ' ' + colors.text}
                `}>
                  {stage.icon}
                </div>

                {/* Labels */}
                <h4 className={`font-semibold mb-1 transition-colors duration-300 ${isActiveStage ? colors.text : 'text-text-primary'}`}>
                  {stage.label}
                </h4>
                <p className="text-sm text-text-muted mb-3">{stage.sublabel}</p>

                {/* Stage-specific content */}
                <div className="space-y-1">
                  {stage.documents?.map((doc) => (
                    <div key={doc} className="text-xs text-text-secondary flex items-center gap-1">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                      </svg>
                      {doc}
                    </div>
                  ))}
                  {stage.features?.map((feature) => (
                    <div key={feature} className="text-xs text-text-secondary flex items-center gap-1">
                      <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                  {stage.fields?.map((field) => (
                    <div key={field} className="text-xs text-text-secondary flex items-center gap-1">
                      <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                      {field}
                    </div>
                  ))}
                  {stage.benefits?.map((benefit) => (
                    <div key={benefit} className="text-xs text-text-secondary flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Arrow to next (mobile) */}
                {index < stages.length - 1 && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
                    <svg className="w-6 h-6 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Key insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-lg border border-teal-100">
          <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="text-sm font-medium text-teal-700">
            One pipeline handles all 70+ formats - no custom code per manufacturer
          </span>
        </div>
      </motion.div>
    </div>
  )
}
