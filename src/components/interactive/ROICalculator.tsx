'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ROICalculatorProps {
  className?: string
}

export function ROICalculator({ className = '' }: ROICalculatorProps) {
  const [records, setRecords] = useState(50000)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [showResults, setShowResults] = useState(false)
  const [animatedCost, setAnimatedCost] = useState(0)
  const [animatedSavings, setAnimatedSavings] = useState(0)
  const [animatedROI, setAnimatedROI] = useState(0)

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const calculations = useMemo(() => {
    const annualManualCost = hoursPerWeek * hourlyRate * 52
    const aiCost = Math.ceil(records / 10000) * 100 + 200 // Base $200 + $100 per 10k records
    const savings = annualManualCost - aiCost
    const roi = aiCost > 0 ? Math.round(savings / aiCost) : 0

    return {
      annualManualCost,
      aiCost,
      savings,
      roi
    }
  }, [records, hoursPerWeek, hourlyRate])

  // Animate numbers when results change
  useEffect(() => {
    if (!showResults) return

    const duration = 1000
    const steps = 30
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic

      setAnimatedCost(Math.round(calculations.annualManualCost * eased))
      setAnimatedSavings(Math.round(calculations.savings * eased))
      setAnimatedROI(Math.round(calculations.roi * eased))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [showResults, calculations])

  useEffect(() => {
    if (inView) {
      setTimeout(() => setShowResults(true), 500)
    }
  }, [inView])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          How Much Is Bad Data Costing You?
        </h3>
        <p className="text-text-secondary">
          Drag the sliders to see your potential savings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-8">
          <SliderInput
            label="Records in your CRM"
            value={records}
            onChange={(v) => { setRecords(v); setShowResults(true) }}
            min={10000}
            max={1000000}
            step={10000}
            formatValue={formatNumber}
            icon="📊"
          />

          <SliderInput
            label="Hours/week on manual cleanup"
            value={hoursPerWeek}
            onChange={(v) => { setHoursPerWeek(v); setShowResults(true) }}
            min={1}
            max={40}
            step={1}
            formatValue={(v) => `${v} hrs`}
            icon="⏱️"
          />

          <SliderInput
            label="Average hourly rate"
            value={hourlyRate}
            onChange={(v) => { setHourlyRate(v); setShowResults(true) }}
            min={25}
            max={150}
            step={5}
            formatValue={(v) => `$${v}/hr`}
            icon="💰"
          />
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white border border-black/10 rounded-xl p-6 space-y-6 shadow-lg"
            >
              <ResultCard
                icon="💸"
                label="You're burning annually"
                value={formatCurrency(animatedCost)}
                color="text-red-600"
                glow="shadow-red-500/20"
              />

              <ResultCard
                icon="⚡"
                label="AI could do this for"
                value={`~${formatCurrency(calculations.aiCost)}`}
                color="text-teal-600"
                glow="shadow-teal-500/20"
              />

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="pt-4 border-t border-black/10"
              >
                <ResultCard
                  icon="🎯"
                  label="Your potential savings"
                  value={formatCurrency(animatedSavings)}
                  subvalue={animatedROI > 0 ? `${animatedROI}x ROI` : ''}
                  color="text-green-600"
                  glow="shadow-green-500/30"
                  highlight
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <motion.a
                  href="/assessments/data-ai-readiness"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-3 text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                >
                  Get Your Free Assessment →
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

interface SliderInputProps {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step: number
  formatValue: (value: number) => string
  icon: string
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  formatValue,
  icon
}: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-text-secondary flex items-center gap-2">
          <span>{icon}</span>
          {label}
        </span>
        <motion.span
          key={value}
          initial={{ scale: 1.2, color: '#1A9988' }}
          animate={{ scale: 1, color: '#1A1A1A' }}
          className="font-semibold text-text-primary min-w-[80px] text-right"
        >
          {formatValue(value)}
        </motion.span>
      </div>

      <div className="relative">
        <div className="absolute inset-0 h-2 bg-gray-200 rounded-full" />
        <motion.div
          className="absolute inset-y-0 left-0 h-2 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-2 appearance-none bg-transparent cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-teal-500/50 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>
    </div>
  )
}

interface ResultCardProps {
  icon: string
  label: string
  value: string
  subvalue?: string
  color: string
  glow: string
  highlight?: boolean
}

function ResultCard({
  icon,
  label,
  value,
  subvalue,
  color,
  glow,
  highlight
}: ResultCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg ${highlight ? 'bg-teal-50' : ''}`}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className={`text-2xl font-bold ${color} ${highlight ? `drop-shadow-lg ${glow}` : ''}`}>
          {value}
          {subvalue && (
            <span className="ml-2 text-base font-normal text-text-secondary">
              ({subvalue})
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

export default ROICalculator
