'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

interface EasterEggsProviderProps {
  children: React.ReactNode
}

export function EasterEggsProvider({ children }: EasterEggsProviderProps) {
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [showKonamiReward, setShowKonamiReward] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showFunFacts, setShowFunFacts] = useState(false)
  const [showScrollMessage, setShowScrollMessage] = useState(false)
  // Track if scroll message has been shown this session (per page)
  const [hasShownScrollMessage, setHasShownScrollMessage] = useState(false)

  // Define triggerKonamiReward before it's used in useEffect
  const triggerKonamiReward = useCallback(() => {
    setShowKonamiReward(true)

    // Epic confetti explosion
    const duration = 3000
    const animationEnd = Date.now() + duration

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#14b8a6', '#2dd4bf', '#5eead4', '#f472b6', '#a78bfa', '#fbbf24']
      })
    }, 150)

    // Hide reward after animation
    setTimeout(() => setShowKonamiReward(false), 6000)
  }, [])

  // Konami code detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.code

      if (key === KONAMI_CODE[konamiIndex]) {
        const nextIndex = konamiIndex + 1
        setKonamiIndex(nextIndex)

        if (nextIndex === KONAMI_CODE.length) {
          // Success! Trigger the reward
          triggerKonamiReward()
          setKonamiIndex(0)
        }
      } else {
        setKonamiIndex(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiIndex, triggerKonamiReward])

  // Scroll to bottom detection - only show once per page session
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50

      // Only show if we haven't already shown it this session
      if (scrolledToBottom && !showScrollMessage && !hasShownScrollMessage) {
        setShowScrollMessage(true)
        setHasShownScrollMessage(true) // Mark as shown for this session
        // Hide after 5 seconds
        setTimeout(() => setShowScrollMessage(false), 5000)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showScrollMessage, hasShownScrollMessage])

  // Logo click handler - expose to children via context or direct prop
  const handleLogoClick = useCallback(() => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount >= 5) {
      setShowFunFacts(true)
      setLogoClickCount(0)
    }
  }, [logoClickCount])

  return (
    <>
      {/* Make logo click handler available globally */}
      <div
        id="easter-egg-logo-trigger"
        data-clicks={logoClickCount}
        style={{ display: 'none' }}
        onClick={handleLogoClick}
      />

      {children}

      {/* Konami Code Reward Modal */}
      <AnimatePresence>
        {showKonamiReward && <KonamiReward onClose={() => setShowKonamiReward(false)} />}
      </AnimatePresence>

      {/* Fun Facts Modal */}
      <AnimatePresence>
        {showFunFacts && <FunFacts onClose={() => setShowFunFacts(false)} />}
      </AnimatePresence>

      {/* Scroll to Bottom Message */}
      <AnimatePresence>
        {showScrollMessage && <ScrollBottomMessage />}
      </AnimatePresence>
    </>
  )
}

function KonamiReward({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: 'spring', damping: 15 }}
        className="bg-gray-900 border border-teal-500 rounded-2xl p-8 max-w-md mx-4 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: 3, duration: 0.5 }}
          className="text-6xl mb-4"
        >
          🎮
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          You Found It!
        </h3>
        <p className="text-gray-400 mb-4">
          The legendary Konami code still works!
        </p>
        <div className="bg-teal-500/20 border border-teal-500 rounded-lg p-4 mb-6">
          <p className="text-teal-400 text-sm mb-1">Secret Discount Code:</p>
          <p className="text-2xl font-mono font-bold text-white tracking-wider">
            KONAMI2024
          </p>
          <p className="text-gray-500 text-xs mt-2">
            10% off your first project
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          Awesome!
        </button>
      </motion.div>
    </motion.div>
  )
}

function FunFacts({ onClose }: { onClose: () => void }) {
  const facts = [
    "We've processed over 10 million records of messy data",
    "Our fastest data cleanup took just 2.3 seconds for 50,000 rows",
    "The team drinks approximately 847 cups of coffee per month",
    "Our AI has learned 127 different name formats",
    "We once found 47 different spellings of 'Cincinnati' in one dataset"
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="bg-gray-900 border border-teal-500 rounded-2xl p-8 max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <span className="text-4xl mb-2 block">🤫</span>
          <h3 className="text-2xl font-bold text-white">
            Secret Fun Facts
          </h3>
          <p className="text-gray-400 text-sm">
            You clicked the logo 5 times!
          </p>
        </div>

        <ul className="space-y-3 mb-6">
          {facts.map((fact, i) => (
            <motion.li
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-gray-300 text-sm"
            >
              <span className="text-teal-500">•</span>
              {fact}
            </motion.li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="w-full px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

function ScrollBottomMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gray-900/90 border border-teal-500/50 rounded-full px-6 py-3 shadow-lg shadow-teal-500/20 backdrop-blur-sm">
        <p className="text-gray-300 text-sm whitespace-nowrap">
          You scrolled all the way down?
          <span className="text-teal-400 ml-1">We like you already.</span>
          <span className="ml-2">💚</span>
        </p>
      </div>
    </motion.div>
  )
}

// Hook for logo click tracking
export function useLogoEasterEgg() {
  const [clickCount, setClickCount] = useState(0)
  const [showFunFacts, setShowFunFacts] = useState(false)

  const handleClick = useCallback(() => {
    const newCount = clickCount + 1
    setClickCount(newCount)

    if (newCount >= 5) {
      setShowFunFacts(true)
      setClickCount(0)
    }
  }, [clickCount])

  return {
    handleClick,
    showFunFacts,
    setShowFunFacts,
    clickCount
  }
}

export default EasterEggsProvider
