'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <LostRobot />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white mt-8 mb-4"
        >
          404 - Data Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-lg mb-8"
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
          <Link
            href="/"
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition-colors"
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-teal-500 hover:text-white transition-colors"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

function LostRobot() {
  const [lookDirection, setLookDirection] = useState<'left' | 'right' | 'up'>('left')
  const [isThinking, setIsThinking] = useState(false)

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
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-500"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: ['0 0 10px #14b8a6', '0 0 20px #14b8a6', '0 0 10px #14b8a6']
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full"
          />
        </motion.div>

        {/* Head */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-28 bg-gray-700 rounded-2xl border-4 border-gray-600"
        >
          {/* Face screen */}
          <div className="absolute inset-2 bg-gray-900 rounded-lg overflow-hidden">
            {/* Eyes */}
            <div className="flex justify-center gap-6 mt-4">
              <motion.div
                animate={eyeOffset[lookDirection]}
                className="relative w-8 h-8 bg-teal-500 rounded-full"
              >
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-50" />
              </motion.div>
              <motion.div
                animate={eyeOffset[lookDirection]}
                className="relative w-8 h-8 bg-teal-500 rounded-full"
              >
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full opacity-50" />
              </motion.div>
            </div>

            {/* Mouth */}
            <motion.div
              animate={isThinking ? { width: ['60%', '20%', '60%'] } : {}}
              transition={{ repeat: Infinity, duration: 0.5 }}
              className="mx-auto mt-4 w-12 h-2 bg-teal-500 rounded-full"
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
        <div className="absolute top-[138px] left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-700 rounded-xl border-4 border-gray-600">
          {/* Chest light */}
          <motion.div
            animate={{
              backgroundColor: ['#ef4444', '#14b8a6', '#ef4444'],
              boxShadow: ['0 0 10px #ef4444', '0 0 10px #14b8a6', '0 0 10px #ef4444']
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
          />

          {/* Panel lines */}
          <div className="absolute top-10 left-2 right-2 h-px bg-gray-600" />
          <div className="absolute top-12 left-2 right-2 h-px bg-gray-600" />
        </div>

        {/* Arms */}
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
          className="absolute top-[145px] left-4 w-3 h-16 bg-gray-600 rounded-full origin-top"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-500 rounded-full" />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-[145px] right-4 w-3 h-16 bg-gray-600 rounded-full origin-top"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-gray-500 rounded-full" />
        </motion.div>

        {/* Question marks floating */}
        <motion.span
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            x: [-20, -30, -20]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: 0 }}
          className="absolute -top-4 left-0 text-2xl text-teal-400"
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
          className="absolute -top-4 right-0 text-2xl text-teal-400"
        >
          ?
        </motion.span>
      </div>

      {/* Shadow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-gray-800 rounded-full blur-sm"
      />
    </motion.div>
  )
}
