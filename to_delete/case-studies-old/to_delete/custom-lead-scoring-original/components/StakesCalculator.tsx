'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StakesCalculatorProps {
  inView: boolean
  className?: string
}

interface CalculatorLine {
  id: string
  text: string
  highlight?: 'warning' | 'error' | 'info'
  indent?: boolean
}

// Move lines outside component to avoid dependency issues
const CALCULATOR_LINES: CalculatorLine[] = [
  { id: 'header', text: '// Sales Team Performance Analysis' },
  { id: 'blank1', text: '' },
  { id: 'leads', text: 'leads_per_month        = 500' },
  { id: 'calls', text: 'calls_per_lead         = 2.3' },
  { id: 'total_calls', text: 'total_calls            = 1,150', indent: true },
  { id: 'blank2', text: '' },
  { id: 'bad_header', text: '// With Generic Scoring:' },
  { id: 'qualify_rate', text: 'qualify_rate           = 18%' },
  { id: 'wasted_header', text: '// Wasted effort:', highlight: 'warning' },
  { id: 'wasted_calls', text: 'wasted_calls           = 943/month', highlight: 'warning', indent: true },
  { id: 'wasted_hours', text: 'wasted_hours           = 157 hours', highlight: 'warning', indent: true },
  { id: 'blank3', text: '' },
  { id: 'missed_header', text: '// Missed Opportunities:', highlight: 'error' },
  { id: 'missed_hot', text: 'hot_leads_missed       = ~35%', highlight: 'error', indent: true },
  { id: 'revenue_lost', text: 'potential_revenue_lost = $$$', highlight: 'error', indent: true },
]

export default function StakesCalculator({ inView, className = '' }: StakesCalculatorProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const indexRef = useRef(0)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    if (!inView) {
      // Reset when not in view
      indexRef.current = 0
      hasStartedRef.current = false
      requestAnimationFrame(() => {
        setVisibleLines([])
        setIsComplete(false)
      })
      return
    }

    // Prevent re-running if already started
    if (hasStartedRef.current) return
    hasStartedRef.current = true

    const interval = setInterval(() => {
      if (indexRef.current < CALCULATOR_LINES.length) {
        const lineId = CALCULATOR_LINES[indexRef.current].id
        setVisibleLines((prev) => {
          // Prevent duplicate additions
          if (prev.includes(lineId)) return prev
          return [...prev, lineId]
        })
        indexRef.current++
      } else {
        clearInterval(interval)
        setIsComplete(true)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <div className={`${className}`}>
      <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border-b border-border">
          <div className="w-3 h-3 rounded-full bg-error/60" />
          <div className="w-3 h-3 rounded-full bg-warning/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
          <span className="ml-3 text-sm text-text-muted font-mono">sales_analysis.py</span>
        </div>

        {/* Terminal content */}
        <div className="p-6 font-mono text-sm min-h-[400px] bg-slate-900 text-slate-300">
          <AnimatePresence>
            {CALCULATOR_LINES.map((line) => {
              const isVisible = visibleLines.includes(line.id)
              if (!isVisible) return null

              const textColorClass =
                line.highlight === 'error' ? 'text-red-400' :
                line.highlight === 'warning' ? 'text-amber-400' :
                line.highlight === 'info' ? 'text-teal-400' :
                line.text.startsWith('//') ? 'text-slate-500' :
                'text-slate-300'

              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${textColorClass} ${line.indent ? 'pl-4' : ''} h-6 leading-6`}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Cursor */}
          {!isComplete && inView && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-teal-400 ml-1"
            />
          )}
        </div>

        {/* Summary card when complete */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-bg-secondary border-t border-border"
            >
              <div className="flex items-center gap-4 text-center justify-center">
                <div className="px-4 py-2 rounded-lg bg-error/10">
                  <div className="text-2xl font-bold text-error">157 hrs</div>
                  <div className="text-xs text-text-muted">Wasted Monthly</div>
                </div>
                <div className="text-text-muted">+</div>
                <div className="px-4 py-2 rounded-lg bg-warning/10">
                  <div className="text-2xl font-bold text-warning">35%</div>
                  <div className="text-xs text-text-muted">Hot Leads Missed</div>
                </div>
                <div className="text-text-muted">=</div>
                <div className="px-4 py-2 rounded-lg bg-teal-500/10">
                  <div className="text-2xl font-bold text-teal-500">Broken</div>
                  <div className="text-xs text-text-muted">Sales Pipeline</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
