'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CREROICalculatorProps {
  className?: string
}

export function CREROICalculator({ className = '' }: CREROICalculatorProps) {
  const [propertyCount, setPropertyCount] = useState(15)
  const [leaseCount, setLeaseCount] = useState(50)
  const [avgCAMPerLease, setAvgCAMPerLease] = useState(15000)
  const [reportingHoursQuarterly, setReportingHoursQuarterly] = useState(40)
  const [showResults, setShowResults] = useState(false)
  const [animatedCAM, setAnimatedCAM] = useState(0)
  const [animatedHours, setAnimatedHours] = useState(0)
  const [animatedTotal, setAnimatedTotal] = useState(0)

  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const calculations = useMemo(() => {
    // Total annual CAM charges across portfolio
    const totalAnnualCAM = leaseCount * avgCAMPerLease

    // CAM recovery estimate (using 10% as midpoint of 5-15% range)
    const camRecoveryLow = Math.round(totalAnnualCAM * 0.05)
    const camRecoveryHigh = Math.round(totalAnnualCAM * 0.15)
    const camRecoveryMid = Math.round(totalAnnualCAM * 0.10)

    // Reporting time savings (80% reduction)
    const quarterlyHoursSaved = Math.round(reportingHoursQuarterly * 0.8)
    const annualHoursSaved = quarterlyHoursSaved * 4

    // Assume $75/hr for finance/reporting staff
    const reportingCostSavings = annualHoursSaved * 75

    // Total annual value
    const totalAnnualValue = camRecoveryMid + reportingCostSavings

    return {
      totalAnnualCAM,
      camRecoveryLow,
      camRecoveryHigh,
      camRecoveryMid,
      quarterlyHoursSaved,
      annualHoursSaved,
      reportingCostSavings,
      totalAnnualValue
    }
  }, [leaseCount, avgCAMPerLease, reportingHoursQuarterly])

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
      const eased = 1 - Math.pow(1 - progress, 3)

      setAnimatedCAM(Math.round(calculations.camRecoveryMid * eased))
      setAnimatedHours(Math.round(calculations.annualHoursSaved * eased))
      setAnimatedTotal(Math.round(calculations.totalAnnualValue * eased))

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
          What Could You Recover?
        </h3>
        <p className="text-text-secondary">
          See your potential CAM recovery and reporting time savings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-8">
          <SliderInput
            label="Properties in portfolio"
            value={propertyCount}
            onChange={(v) => { setPropertyCount(v); setShowResults(true) }}
            min={1}
            max={100}
            step={1}
            formatValue={(v) => `${v} properties`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
          />

          <SliderInput
            label="Total leases across portfolio"
            value={leaseCount}
            onChange={(v) => { setLeaseCount(v); setShowResults(true) }}
            min={10}
            max={500}
            step={10}
            formatValue={(v) => `${v} leases`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          <SliderInput
            label="Average annual CAM per lease"
            value={avgCAMPerLease}
            onChange={(v) => { setAvgCAMPerLease(v); setShowResults(true) }}
            min={5000}
            max={50000}
            step={1000}
            formatValue={(v) => formatCurrency(v)}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />

          <SliderInput
            label="Hours spent on quarterly reporting"
            value={reportingHoursQuarterly}
            onChange={(v) => { setReportingHoursQuarterly(v); setShowResults(true) }}
            min={8}
            max={120}
            step={4}
            formatValue={(v) => `${v} hours`}
            icon={
              <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <div className="text-sm text-text-secondary pb-2 border-b border-black/5">
                Based on your portfolio of {propertyCount} properties
              </div>

              <ResultCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="CAM expenses you could recover annually"
                value={formatCurrency(animatedCAM)}
                subtext={`5-15% of ${formatCurrency(calculations.totalAnnualCAM)} in annual CAM charges`}
                color="text-teal-600"
                highlight
              />

              <ResultCard
                icon={
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                label="Hours saved on reporting annually"
                value={`${animatedHours} hours`}
                subtext={`80% reduction: ${calculations.quarterlyHoursSaved} hours saved per quarter`}
                color="text-teal-600"
                highlight
              />

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="pt-4 border-t border-black/10"
              >
                <ResultCard
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  }
                  label="Total annual value"
                  value={formatCurrency(animatedTotal)}
                  subtext="CAM recovery + reporting time savings"
                  color="text-green-600"
                  highlight
                  large
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-4"
              >
                <motion.a
                  href="/assessments/commercial-real-estate"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-3 text-center bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all"
                >
                  Take the Portfolio Analytics Assessment
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
          className="font-semibold text-text-primary min-w-[100px] text-right"
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
  subtext?: string
  color: string
  highlight?: boolean
  large?: boolean
}

function ResultCard({
  icon,
  label,
  value,
  subtext,
  color,
  highlight,
  large
}: ResultCardProps) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg ${highlight ? 'bg-teal-50' : ''}`}
    >
      <span className={`${color}`}>{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-text-secondary">{label}</p>
        <p className={`${large ? 'text-3xl' : 'text-2xl'} font-bold ${color}`}>
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-text-secondary mt-1">{subtext}</p>
        )}
      </div>
    </div>
  )
}

export default CREROICalculator
