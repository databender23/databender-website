'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ChaosParticles from './ChaosParticles'

interface TransformationSceneProps {
  className?: string
}

export default function TransformationScene({
  className = '',
}: TransformationSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMotionPreference = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }

    checkMotionPreference()

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', checkMotionPreference)

    return () => {
      motionQuery.removeEventListener('change', checkMotionPreference)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rawOrganizationLevel = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    [0, 1]
  )

  const organizationLevel = useSpring(rawOrganizationLevel, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  const processingOpacity = useTransform(
    organizationLevel,
    [0, 0.1, 0.85, 0.95],
    [0, 1, 1, 0]
  )

  const completeOpacity = useTransform(
    organizationLevel,
    [0.85, 1],
    [0, 1]
  )

  const progressPercentage = useTransform(
    organizationLevel,
    (level) => Math.round(level * 100)
  )

  const checkmarkScale = useTransform(
    organizationLevel,
    [0.9, 1],
    [0, 1]
  )

  const checkmarkRotate = useTransform(
    organizationLevel,
    [0.9, 1],
    [-45, 0]
  )

  const [currentOrg, setCurrentOrg] = useState(0)

  useEffect(() => {
    const unsubscribe = organizationLevel.on('change', (latest) => {
      setCurrentOrg(latest)
    })
    return () => unsubscribe()
  }, [organizationLevel])

  return (
    <section
      ref={containerRef}
      className={`relative h-[200vh] ${className}`}
      aria-label="Data transformation visualization"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl mx-4 my-8 shadow-xl border border-border">
        <div className="absolute inset-0">
          <ChaosParticles
            particleCount={400}
            organizationLevel={currentOrg}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            className="text-center"
            style={{ opacity: processingOpacity }}
          >
            <motion.p
              className="text-2xl md:text-4xl font-light text-white/80 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Processing...
            </motion.p>

            <div className="w-64 md:w-80 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 via-teal-400 to-teal-500 rounded-full"
                style={{
                  width: useTransform(
                    organizationLevel,
                    (level) => `${level * 100}%`
                  ),
                }}
              />
            </div>

            <motion.p className="mt-3 text-lg text-white/60 font-mono">
              <motion.span>{progressPercentage}</motion.span>% resolved
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute text-center"
            style={{ opacity: completeOpacity }}
          >
            <motion.div
              className="mb-4 mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full bg-teal-500/20 flex items-center justify-center"
              style={{
                scale: checkmarkScale,
                rotate: checkmarkRotate,
              }}
            >
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-teal-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: currentOrg > 0.9 ? 1 : 0,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    ease: 'easeOut',
                  }}
                />
              </svg>
            </motion.div>

            <motion.p
              className="text-3xl md:text-5xl font-semibold text-teal-400"
              initial={{ y: 20 }}
              animate={{ y: currentOrg > 0.9 ? 0 : 20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              Complete
            </motion.p>

            <motion.p
              className="mt-2 text-lg text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentOrg > 0.95 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              2.3M records unified into 847K golden entities
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex flex-col items-center text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentOrg < 0.1 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm mb-2">Scroll to transform</p>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 8, 0],
                    }
              }
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
