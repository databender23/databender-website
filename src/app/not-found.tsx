'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { FloatingNodes } from '@/components/animations'

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-teal-500/5" />

      {/* Teal glow spots */}
      <div className="glow-spot glow-spot-teal glow-spot-lg absolute -top-20 -right-20 opacity-40" />
      <div className="glow-spot glow-spot-teal-subtle glow-spot-md absolute bottom-0 left-1/4 opacity-30" />

      {/* Floating nodes background */}
      <FloatingNodes nodeCount={15} showConnections={true} />

      <div className="relative z-10 text-center max-w-lg">
        <LostRobot />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-text-primary mt-8 mb-4"
        >
          404 - Data Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-text-secondary text-lg mb-8"
        >
          Looks like this data got lost in the pipeline. Our AI is searching, but
          it seems this page doesn&apos;t exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="primary"
            size="lg"
            href="/"
            icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            }
            iconPosition="left"
          >
            Back to Homepage
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="/contact"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

function LostRobot() {
  const [lookDirection, setLookDirection] = useState<'left' | 'right' | 'up'>('left')
  const [isThinking, setIsThinking] = useState(false)
  const [isHappy, setIsHappy] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const directions: Array<'left' | 'right' | 'up'> = ['left', 'right', 'up']
      const newDirection = directions[Math.floor(Math.random() * directions.length)]
      setLookDirection(newDirection)

      // Occasionally show thinking animation
      if (Math.random() > 0.7) {
        setIsThinking(true)
        setTimeout(() => setIsThinking(false), 1500)
      }

      // Occasionally show happy expression
      if (Math.random() > 0.85) {
        setIsHappy(true)
        setTimeout(() => setIsHappy(false), 2000)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const eyeOffset = {
    left: { x: -3, y: 0 },
    right: { x: 3, y: 0 },
    up: { x: 0, y: -3 }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative inline-block"
    >
      {/* Robot Container */}
      <div className="relative w-48 h-48 mx-auto">
        {/* Antenna */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-300"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: ['0 0 10px #1A9988', '0 0 20px #1A9988', '0 0 10px #1A9988']
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full"
          />
        </motion.div>

        {/* Head */}
        <motion.div
          animate={{
            y: [0, -2, 0],
            rotate: isThinking ? 8 : 0
          }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
            rotate: { duration: 0.3 }
          }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-28 bg-[#F8F9FA] rounded-2xl border-2 border-gray-200 shadow-lg"
        >
          {/* Face screen */}
          <div className="absolute inset-2 bg-white rounded-lg overflow-hidden border border-gray-100">
            {/* Eyes */}
            <div className="flex justify-center gap-4 mt-3">
              {isHappy ? (
                // Happy crescent eyes
                <>
                  <div className="w-10 h-5 border-b-4 border-teal-500 rounded-b-full" />
                  <div className="w-10 h-5 border-b-4 border-teal-500 rounded-b-full" />
                </>
              ) : (
                // Normal eyes with sparkles
                <>
                  <motion.div
                    animate={eyeOffset[lookDirection]}
                    className="relative w-10 h-10 bg-teal-500 rounded-full shadow-[0_0_12px_rgba(26,153,136,0.5)]"
                  >
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full opacity-70" />
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-50" />
                  </motion.div>
                  <motion.div
                    animate={eyeOffset[lookDirection]}
                    className="relative w-10 h-10 bg-teal-500 rounded-full shadow-[0_0_12px_rgba(26,153,136,0.5)]"
                  >
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full opacity-70" />
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-50" />
                  </motion.div>
                </>
              )}
            </div>

            {/* Mouth */}
            <motion.div
              animate={isHappy ? { scaleX: [1, 1.2, 1] } : isThinking ? { width: ['60%', '20%', '60%'] } : {}}
              transition={{ repeat: Infinity, duration: isHappy ? 0.8 : 0.5 }}
              className={`mx-auto mt-3 h-2 bg-teal-500 rounded-full ${isHappy ? 'w-14' : 'w-10'}`}
            />

            {/* Thinking dots */}
            {isThinking && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    className="w-2 h-2 bg-teal-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Body */}
        <div className="absolute top-[138px] left-1/2 -translate-x-1/2 w-24 h-20 bg-[#F8F9FA] rounded-xl border-2 border-gray-200 shadow-lg">
          {/* Chest light */}
          <motion.div
            animate={{
              backgroundColor: ['#ef4444', '#1A9988', '#ef4444'],
              boxShadow: ['0 0 10px #ef4444', '0 0 10px #1A9988', '0 0 10px #ef4444']
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          />

          {/* Panel lines */}
          <div className="absolute top-10 left-2 right-2 h-px bg-gray-200" />
          <div className="absolute top-12 left-2 right-2 h-px bg-gray-200" />
        </div>

        {/* Arms */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute top-[145px] left-4 w-3 h-16 bg-gray-200 rounded-full origin-top"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-300 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-[145px] right-4 w-3 h-16 bg-gray-200 rounded-full origin-top"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-300 rounded-full" />
        </motion.div>

        {/* Question marks floating */}
        <motion.span
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            x: [-20, -30, -20]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 0 }}
          className="absolute -top-4 left-0 text-2xl text-teal-500 font-bold"
        >
          ?
        </motion.span>
        <motion.span
          animate={{
            y: [0, -25, 0],
            opacity: [0, 1, 0],
            x: [20, 30, 20]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 1 }}
          className="absolute -top-4 right-0 text-2xl text-teal-500 font-bold"
        >
          ?
        </motion.span>
      </div>

      {/* Shadow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.1, 0.2] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-300 rounded-full blur-sm"
      />
    </motion.div>
  )
}
