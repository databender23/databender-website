'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface ManufacturingROICalculatorProps {
  className?: string
}

export function ManufacturingROICalculator({ className = '' }: ManufacturingROICalculatorProps) {
  const [staffCount, setStaffCount] = useState(5)
  const [hoursHunting, setHoursHunting] = useState(2)
  const [hourlyRate, setHourlyRate] = useState(25)
  const [showResults, setShowResults] = useState(false)
  const [animatedCost, setAnimatedCost] = useState(0)
  const [animatedHours, setAnimatedHours] = useState(0)
  const [animatedCapacity, setAnimatedCapacity] = useState(0)

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const calculations = useMemo(() => {
    // Hours wasted per week across all staff
    const weeklyHoursWasted = staffCount * hoursHunting * 5 // 5 days per week
    // Annual cost of wasted time
    const annualCost = weeklyHoursWasted * hourlyRate * 52
    // With 80% reduction in hunting time
    const hoursSavedWeekly = Math.round(weeklyHoursWasted * 0.8)
    // Capacity increase (as percentage of a 40-hour week per person)
    const capacityIncrease = Math.round((hoursSavedWeekly / (staffCount * 40)) * 100)
    // Annual savings (80% of wasted cost)
    const annualSavings = Math.round(annualCost * 0.8)

    return {
      weeklyHoursWasted,
      annualCost,
      hoursSavedWeekly,
      capacityIncrease,
      annualSavings
    }
  }, [staffCount, hoursHunting, hourlyRate])

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

      setAnimatedCost(Math.round(calculations.annualCost * eased))
      setAnimatedHours(Math.round(calculations.hoursSavedWeekly * eased))
      setAnimatedCapacity(Math.round(calculations.capacityIncrease * eased))

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

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          How Much Time Is Your Team Losing?
        </h3>
        <p className="text-text-secondary">
          Drag the sliders to see what you could save
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-8">
          <SliderInput
            label="Staff who answer customer questions"
            value={staffCount}
            onChange={(v) => { setStaffCount(v); setShowResults(true) }}
            min={1}
            max={25}
            step={1}
            formatValue={(v) => `${v} people`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />

          <SliderInput
            label="Hours/day hunting for answers"
            value={hoursHunting}
            onChange={(v) => { setHoursHunting(v); setShowResults(true) }}
            min={0.5}
            max={4}
            step={0.5}
            formatValue={(v) => `${v} hrs`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <SliderInput
            label="Average hourly rate"
            value={hourlyRate}
            onChange={(v) => { setHourlyRate(v); setShowResults(true) }}
            min={15}
            max={75}
            step={5}
            formatValue={(v) => `$${v}/hr`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
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
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Time lost weekly hunting for answers"
                value={`${calculations.weeklyHoursWasted} hours`}
                color="text-red-600"
              />

              <ResultCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="That costs you annually"
                value={formatCurrency(animatedCost)}
                color="text-red-600"
              />

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="pt-4 border-t border-black/10 space-y-4"
              >
                <ResultCard
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                  label="Hours you could get back weekly"
                  value={`${animatedHours} hours`}
                  color="text-teal-600"
                  highlight
                />

                <ResultCard
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  label="Extra capacity without hiring"
                  value={`+${animatedCapacity}%`}
                  color="text-green-600"
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
                  href="/assessments/manufacturing"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-3 text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                >
                  Take the 5-Minute Assessment
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
  icon: React.ReactNode
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
          {icon}
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
  icon: React.ReactNode
  label: string
  value: string
  color: string
  highlight?: boolean
}

function ResultCard({
  icon,
  label,
  value,
  color,
  highlight
}: ResultCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg ${highlight ? 'bg-teal-50' : ''}`}
    >
      <span className={`${color}`}>{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default ManufacturingROICalculator
