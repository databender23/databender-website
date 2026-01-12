'use client'

import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StakesCalculatorProps {
  inView: boolean
  className?: string
}

export default function StakesCalculator({ inView, className = '' }: StakesCalculatorProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [currentStep, setCurrentStep] = useState(0)

  const recordsText = '1,500,000 records'

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Typewriter effect for records
  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      if (prefersReducedMotion && inView) {
        setTypedText(recordsText)
        setCurrentStep(7)
      }
      return
    }

    setTypedText('')
    setCurrentStep(0)

    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex < recordsText.length) {
        setTypedText(recordsText.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typeInterval)
        // Start the staggered animation sequence
        setTimeout(() => setCurrentStep(1), 300)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [inView, prefersReducedMotion])

  // Progress through animation steps
  useEffect(() => {
    if (currentStep === 0 || prefersReducedMotion) return

    const delays: Record<number, number> = {
      1: 300,  // x 30 seconds
      2: 300,  // = line
      3: 600,  // 12,500 hours
      4: 300,  // $25,000+
      5: 300,  // 6+ months
      6: 400,  // What if 30%
    }

    if (delays[currentStep]) {
      const timer = setTimeout(() => setCurrentStep(currentStep + 1), delays[currentStep])
      return () => clearTimeout(timer)
    }
  }, [currentStep, prefersReducedMotion])

  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  const calculatingVariants: Variants = {
    calculating: {
      opacity: [0.5, 1, 0.5],
      transition: { duration: 0.3, repeat: 3 }
    },
    done: { opacity: 1 }
  }

  return (
    <div className={`font-mono text-sm md:text-base ${className}`}>
      <div
        className="bg-text-primary border border-text-muted/20 rounded-xl p-6 shadow-xl"
        style={{
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-text-muted/20">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <span className="ml-2 text-text-muted/60 text-xs">manual_approach.sh</span>
        </div>

        {/* Calculator content */}
        <div className="space-y-3">
          {/* Line 1: Records */}
          <div className="flex items-center">
            <span className="text-text-muted/60 mr-3">$</span>
            <span className="text-white">{typedText}</span>
            {typedText.length < recordsText.length && inView && (
              <motion.span
                className="inline-block w-2 h-5 bg-teal-400 ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>

          {/* Line 2: x 30 seconds */}
          <motion.div
            className="flex items-center"
            variants={lineVariants}
            initial="hidden"
            animate={currentStep >= 1 ? 'visible' : 'hidden'}
          >
            <span className="text-text-muted/60 mr-3">&nbsp;</span>
            <span className="text-text-muted/80">x</span>
            <span className="text-white ml-2">30 seconds each</span>
          </motion.div>

          {/* Line 3: Divider */}
          <motion.div
            className="flex items-center"
            variants={lineVariants}
            initial="hidden"
            animate={currentStep >= 2 ? 'visible' : 'hidden'}
          >
            <span className="text-text-muted/60 mr-3">&nbsp;</span>
            <span className="text-text-muted/40">{'─'.repeat(20)}</span>
          </motion.div>

          {/* Line 4: = Hours */}
          <motion.div
            className="flex items-center"
            variants={lineVariants}
            initial="hidden"
            animate={currentStep >= 2 ? 'visible' : 'hidden'}
          >
            <span className="text-text-muted/60 mr-3">=</span>
            <motion.span
              className="text-white font-bold"
              variants={calculatingVariants}
              initial="calculating"
              animate={currentStep >= 3 ? 'done' : 'calculating'}
            >
              {currentStep >= 3 ? '12,500 hours' : 'calculating...'}
            </motion.span>
          </motion.div>

          {/* Spacer */}
          <div className="h-2" />

          {/* Line 5: Cost */}
          <motion.div
            className="flex items-center"
            variants={lineVariants}
            initial="hidden"
            animate={currentStep >= 4 ? 'visible' : 'hidden'}
          >
            <span className="text-text-muted/60 mr-3">&gt;</span>
            <span className="text-text-muted/80">Labor cost:</span>
            <motion.span
              className="ml-2 text-orange-400 font-bold text-lg"
              initial={{ textShadow: '0 0 0px rgba(251, 146, 60, 0)' }}
              animate={currentStep >= 4 ? {
                textShadow: [
                  '0 0 0px rgba(251, 146, 60, 0)',
                  '0 0 20px rgba(251, 146, 60, 0.8)',
                  '0 0 10px rgba(251, 146, 60, 0.5)'
                ]
              } : {}}
              transition={{ duration: 0.6 }}
            >
              $25,000+
            </motion.span>
          </motion.div>

          {/* Line 6: Timeline */}
          <motion.div
            className="flex items-center"
            variants={lineVariants}
            initial="hidden"
            animate={currentStep >= 5 ? 'visible' : 'hidden'}
          >
            <span className="text-text-muted/60 mr-3">&gt;</span>
            <span className="text-text-muted/80">Timeline:</span>
            <motion.span
              className="ml-2 text-orange-400 font-bold text-lg"
              initial={{ textShadow: '0 0 0px rgba(251, 146, 60, 0)' }}
              animate={currentStep >= 5 ? {
                textShadow: [
                  '0 0 0px rgba(251, 146, 60, 0)',
                  '0 0 20px rgba(251, 146, 60, 0.8)',
                  '0 0 10px rgba(251, 146, 60, 0.5)'
                ]
              } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              6+ months
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Emotional hook - appears after animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={currentStep >= 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20"
      >
        <p className="text-lg font-semibold text-text-primary text-center">
          What if <span className="text-orange-500">30%</span> of your database is duplicates?
        </p>
        <p className="text-sm text-text-muted text-center mt-2">
          That&apos;s thousands in wasted marketing dollars per year.
        </p>
      </motion.div>
    </div>
  )
}
