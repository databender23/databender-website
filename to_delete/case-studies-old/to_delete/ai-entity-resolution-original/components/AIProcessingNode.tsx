'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AIProcessingNodeProps {
  inView: boolean
  className?: string
}

interface RecordCard {
  id: number
  y: number
  delay: number
}

export function AIProcessingNode({ inView, className = '' }: AIProcessingNodeProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isProcessing, setIsProcessing] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)

  // Incoming record cards (left side)
  const incomingRecords: RecordCard[] = [
    { id: 1, y: 30, delay: 0 },
    { id: 2, y: 50, delay: 0.3 },
    { id: 3, y: 70, delay: 0.6 },
  ]

  // Matched pairs (right side)
  const matchedPairs = [
    { id: 1, y: 35, delay: 1.8 },
    { id: 2, y: 55, delay: 2.1 },
  ]

  // Cycle the animation every 3.5 seconds when in view
  useEffect(() => {
    if (!inView || prefersReducedMotion) return

    const interval = setInterval(() => {
      setIsProcessing(true)
      setTimeout(() => setIsProcessing(false), 500)
      setCycleKey(prev => prev + 1)
    }, 3500)

    return () => clearInterval(interval)
  }, [inView, prefersReducedMotion])

  const shouldAnimate = inView && !prefersReducedMotion

  return (
    <div className={`relative w-full h-64 md:h-80 ${className}`}>
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background gradient */}
        <defs>
          {/* AI Node gradient - now teal */}
          <radialGradient id="aiNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22B8A5" />
            <stop offset="100%" stopColor="#1A9988" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="aiGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Pulse ring gradient - now teal */}
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A9988" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1A9988" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background rect - slate for contrast */}
        <rect x="0" y="0" width="400" height="200" fill="#1e293b" rx="12" />

        {/* Grid pattern - teal tinted */}
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(26, 153, 136, 0.1)"
            strokeWidth="0.5"
          />
        </pattern>
        <rect x="0" y="0" width="400" height="200" fill="url(#grid)" />

        {/* Connection lines from records to AI node */}
        {incomingRecords.map((record) => (
          <motion.path
            key={`line-in-${record.id}-${cycleKey}`}
            d={`M 80 ${record.y * 2} Q 150 100 180 100`}
            fill="none"
            stroke="#fb923c"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={shouldAnimate ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{
              duration: 0.8,
              delay: record.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Connection lines from AI node to matched pairs */}
        {matchedPairs.map((pair) => (
          <motion.path
            key={`line-out-${pair.id}-${cycleKey}`}
            d={`M 220 100 Q 250 ${pair.y * 2} 300 ${pair.y * 2}`}
            fill="none"
            stroke="#1A9988"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={shouldAnimate ? { pathLength: 1, opacity: 0.6 } : {}}
            transition={{
              duration: 0.8,
              delay: pair.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Incoming record cards (left side) */}
        {incomingRecords.map((record) => (
          <motion.g
            key={`record-${record.id}-${cycleKey}`}
            initial={{ x: 20, opacity: 0 }}
            animate={shouldAnimate ? { x: 50, opacity: 1 } : { x: 50, opacity: 0.7 }}
            transition={{
              duration: 0.6,
              delay: record.delay,
              ease: 'easeOut',
            }}
          >
            {/* Record card */}
            <rect
              x="0"
              y={record.y * 2 - 12}
              width="40"
              height="24"
              rx="4"
              fill="#334155"
              stroke="#fb923c"
              strokeWidth="1.5"
            />
            {/* Record lines (representing data) */}
            <rect x="6" y={record.y * 2 - 6} width="28" height="3" rx="1" fill="#fb923c" opacity="0.6" />
            <rect x="6" y={record.y * 2 + 2} width="20" height="3" rx="1" fill="#fb923c" opacity="0.4" />
          </motion.g>
        ))}

        {/* Central AI Processing Node */}
        <g transform="translate(200, 100)">
          {/* Outer pulsing rings - now teal */}
          {[1, 2, 3].map((ring) => (
            <motion.circle
              key={`ring-${ring}`}
              cx="0"
              cy="0"
              r={35 + ring * 8}
              fill="none"
              stroke="#1A9988"
              strokeWidth="1"
              initial={{ opacity: 0.3, scale: 1 }}
              animate={shouldAnimate ? {
                opacity: [0.3, 0.1, 0.3],
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 2,
                delay: ring * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Main node glow (processing state) */}
          <motion.circle
            cx="0"
            cy="0"
            r="45"
            fill="url(#pulseGradient)"
            initial={{ opacity: 0.2 }}
            animate={isProcessing ? { opacity: 0.8, scale: 1.2 } : { opacity: 0.2, scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Main node circle */}
          <motion.circle
            cx="0"
            cy="0"
            r="35"
            fill="url(#aiNodeGradient)"
            filter="url(#aiGlow)"
            initial={{ scale: 1 }}
            animate={shouldAnimate ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Inner ring */}
          <circle
            cx="0"
            cy="0"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
          />

          {/* AI text / Brain icon representation */}
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="bold"
          >
            AI
          </text>

          {/* Decorative neural dots */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = Math.cos((angle * Math.PI) / 180) * 22
            const y = Math.sin((angle * Math.PI) / 180) * 22
            return (
              <motion.circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="3"
                fill="white"
                opacity="0.6"
                animate={shouldAnimate ? {
                  opacity: [0.6, 1, 0.6],
                } : {}}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            )
          })}
        </g>

        {/* Matched pairs (right side) */}
        {matchedPairs.map((pair) => (
          <motion.g
            key={`matched-${pair.id}-${cycleKey}`}
            initial={{ x: 280, opacity: 0, scale: 0.8 }}
            animate={shouldAnimate ? { x: 310, opacity: 1, scale: 1 } : { x: 310, opacity: 0.7, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: pair.delay,
              ease: 'easeOut',
            }}
          >
            {/* Matched pair container */}
            <rect
              x="0"
              y={pair.y * 2 - 16}
              width="70"
              height="32"
              rx="6"
              fill="#134e4a"
              stroke="#1A9988"
              strokeWidth="2"
            />

            {/* Two stacked cards representing matched pair */}
            <rect x="6" y={pair.y * 2 - 10} width="24" height="18" rx="2" fill="#1A9988" opacity="0.8" />
            <rect x="34" y={pair.y * 2 - 10} width="24" height="18" rx="2" fill="#1A9988" opacity="0.8" />

            {/* Match indicator */}
            <motion.circle
              cx="31"
              cy={pair.y * 2}
              r="5"
              fill="#134e4a"
              stroke="#1A9988"
              strokeWidth="1.5"
            />
            <motion.path
              d={`M 28 ${pair.y * 2} L 30 ${pair.y * 2 + 2} L 35 ${pair.y * 2 - 3}`}
              fill="none"
              stroke="#22B8A5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>
        ))}

        {/* Labels */}
        <text x="60" y="185" textAnchor="middle" fill="#94a3b8" fontSize="11">
          Unmatched Records
        </text>
        <text x="200" y="185" textAnchor="middle" fill="#22B8A5" fontSize="11">
          AI Processing
        </text>
        <text x="340" y="185" textAnchor="middle" fill="#1A9988" fontSize="11">
          Matched Entities
        </text>

        {/* Flowing particles (data traveling) */}
        {shouldAnimate && incomingRecords.map((record) => (
          <motion.circle
            key={`particle-in-${record.id}-${cycleKey}`}
            r="3"
            fill="#fb923c"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 0.8,
              delay: record.delay + 0.2,
              ease: 'easeInOut',
            }}
            style={{
              offsetPath: `path("M 80 ${record.y * 2} Q 150 100 180 100")`,
            }}
          />
        ))}

        {shouldAnimate && matchedPairs.map((pair) => (
          <motion.circle
            key={`particle-out-${pair.id}-${cycleKey}`}
            r="3"
            fill="#1A9988"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 0.8,
              delay: pair.delay + 0.2,
              ease: 'easeInOut',
            }}
            style={{
              offsetPath: `path("M 220 100 Q 250 ${pair.y * 2} 300 ${pair.y * 2}")`,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default AIProcessingNode
