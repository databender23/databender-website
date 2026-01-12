'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FrustratedSalesSceneProps {
  className?: string
}

const scenarios = [
  {
    id: 1,
    thought: '"Another voicemail. This lead had a high score but ghosted after the first call."',
    reality: 'The CRM scored them high because they opened 5 emails. They were never going to buy.',
  },
  {
    id: 2,
    thought: '"Great, 47 new leads this morning. Where do I even start?"',
    reality: 'Without intelligent scoring, sales reps either pick randomly or use gut instinct.',
  },
  {
    id: 3,
    thought: '"Why did I spend 30 minutes with this startup? They do not even have budget."',
    reality: 'Engagement metrics do not tell you if someone can actually afford your product.',
  },
]

export default function FrustratedSalesScene({ className = '' }: FrustratedSalesSceneProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [showReality, setShowReality] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowReality(false)
      setTimeout(() => {
        setCurrentScenario((prev) => (prev + 1) % scenarios.length)
        setTimeout(() => setShowReality(true), 1500)
      }, 500)
    }, 5000)

    // Show reality for first scenario
    const initialTimeout = setTimeout(() => setShowReality(true), 1500)

    return () => {
      clearInterval(interval)
      clearTimeout(initialTimeout)
    }
  }, [])

  const scenario = scenarios[currentScenario]

  return (
    <div className={`${className}`}>
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
        {/* Scene header */}
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm text-gray-400">A typical Monday morning...</span>
          </div>
          <div className="flex gap-1">
            {scenarios.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentScenario === index ? 'bg-teal-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scene content */}
        <div className="p-8 min-h-[280px] flex flex-col items-center justify-center">
          {/* Character */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-6"
          >
            <div className="relative">
              {/* Person icon */}
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>

              {/* Frustration indicators */}
              <motion.div
                className="absolute -top-2 -right-2 text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
              >
                {'>'}:(
              </motion.div>
            </div>
          </motion.div>

          {/* Thought bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative max-w-md"
            >
              <div className="bg-gray-700/80 backdrop-blur rounded-2xl p-6 border border-gray-600">
                <p className="text-gray-200 text-center italic">
                  {scenario.thought}
                </p>
              </div>

              {/* Bubble tail */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-700/80 rotate-45 border-r border-b border-gray-600" />
            </motion.div>
          </AnimatePresence>

          {/* Reality check */}
          <AnimatePresence>
            {showReality && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-8 max-w-md"
              >
                <div className="flex items-start gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-400 text-sm">!</span>
                  </div>
                  <p className="text-sm text-red-300">
                    <span className="font-medium text-red-400">The reality: </span>
                    {scenario.reality}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats bar */}
        <div className="px-6 py-4 border-t border-gray-700 bg-gray-800/50">
          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-red-400">60%</div>
              <div className="text-xs text-gray-500">Time wasted on bad leads</div>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div>
              <div className="text-2xl font-bold text-red-400">35%</div>
              <div className="text-xs text-gray-500">Good leads missed entirely</div>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div>
              <div className="text-2xl font-bold text-red-400">$$$</div>
              <div className="text-xs text-gray-500">Revenue left on the table</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
