'use client'

import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react'

interface RevealNumbersProps {
  inView: boolean
  className?: string
}

export default function RevealNumbers({ inView, className = '' }: RevealNumbersProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Schedule state update to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setPrefersReducedMotion(mediaQuery.matches)
    })

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Animation sequence progression
  useEffect(() => {
    if (!inView) {
      // Schedule reset to avoid synchronous setState in effect
      requestAnimationFrame(() => setCurrentStep(0))
      return
    }

    if (prefersReducedMotion) {
      requestAnimationFrame(() => setCurrentStep(6))
      return
    }

    // Step timings
    const stepTimings = [
      0,      // Step 1: "3 weeks" appears
      500,    // Step 2: Records count
      500,    // Step 3: Cost comparison starts
      400,    // Step 4: Strikethrough
      300,    // Step 5: Arrow and new cost
      300,    // Step 6: 125x multiplier
    ]

    const timers: NodeJS.Timeout[] = []
    let totalDelay = 0
    stepTimings.forEach((delay, index) => {
      totalDelay += delay
      const timer = setTimeout(() => setCurrentStep(index + 1), totalDelay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [inView, prefersReducedMotion])

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const strikethroughVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.4, ease: 'easeInOut' }
    }
  }

  const scaleUpVariants: Variants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.175, 0.885, 0.32, 1.275] // Bounce easing
      }
    }
  }

  const pulseGlowVariants: Variants = {
    pulse: {
      textShadow: [
        '0 0 20px rgba(26, 153, 136, 0.5)',
        '0 0 60px rgba(26, 153, 136, 0.8)',
        '0 0 20px rgba(26, 153, 136, 0.5)'
      ],
      transition: { duration: 1.5, repeat: Infinity }
    }
  }

  return (
    <div className={`text-center space-y-6 md:space-y-8 ${className}`}>
      {/* Main timeline: Weeks to minutes */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={currentStep >= 1 ? 'visible' : 'hidden'}
      >
        <span
          className="text-text-primary font-bold block"
          style={{
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 1,
          }}
        >
          10x faster
        </span>
      </motion.div>

      {/* Records count */}
      <motion.div
        variants={slideRightVariants}
        initial="hidden"
        animate={currentStep >= 2 ? 'visible' : 'hidden'}
        className="text-text-secondary text-xl md:text-2xl"
      >
        <span className="text-text-primary font-semibold">1.5M+</span> records resolved into <span className="text-teal-500 font-semibold">100K</span> unified entities
      </motion.div>

      {/* Cost comparison */}
      <div className="py-4 md:py-6">
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          {/* Old cost with strikethrough */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={currentStep >= 3 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative inline-block"
          >
            <span className="text-text-muted text-2xl md:text-4xl font-bold">
              $25,000
            </span>
            {/* Strikethrough line */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 h-1 bg-orange-500 origin-left"
              variants={strikethroughVariants}
              initial="hidden"
              animate={currentStep >= 4 ? 'visible' : 'hidden'}
              style={{
                boxShadow: '0 0 10px rgba(249, 115, 22, 0.8)',
                transform: 'translateY(-50%)'
              }}
            />
          </motion.div>

          {/* Arrow */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={currentStep >= 5 ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-text-muted text-2xl md:text-3xl"
          >
            {'\u2192'}
          </motion.span>

          {/* New cost */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={currentStep >= 5 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-teal-500 text-3xl md:text-5xl font-bold"
            style={{
              textShadow: currentStep >= 5 ? '0 0 30px rgba(26, 153, 136, 0.5)' : 'none'
            }}
          >
            $200
          </motion.span>
        </div>
      </div>

      {/* 125x multiplier */}
      <motion.div
        variants={scaleUpVariants}
        initial="hidden"
        animate={currentStep >= 6 ? 'visible' : 'hidden'}
        className="pt-4"
      >
        <motion.span
          className="text-teal-500 font-black inline-block"
          style={{
            fontSize: 'clamp(4rem, 15vw, 10rem)',
            lineHeight: 1
          }}
          variants={pulseGlowVariants}
          animate={currentStep >= 6 ? 'pulse' : undefined}
        >
          125
          <span className="text-teal-400" style={{ fontSize: '0.6em' }}>x</span>
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={currentStep >= 6 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-text-muted text-lg md:text-xl mt-2"
        >
          cost savings
        </motion.p>
      </motion.div>
    </div>
  )
}
