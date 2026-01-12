'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

// Seeded random for consistent animation values
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface ServiceAnimationProps {
  service: string
  className?: string
}

export function ServiceAnimation({ service, className = '' }: ServiceAnimationProps) {
  const prefersReducedMotion = useReducedMotion()

  const animations: Record<string, React.FC<{ reduced?: boolean }>> = {
    'data-integration': DataIntegrationAnimation,
    'ai-data-cleanup': AIDataCleanupAnimation,
    'data-foundation': DataFoundationAnimation,
    'dashboards-analytics': DashboardsAnimation,
    'natural-language-bi': NaturalLanguageBIAnimation,
    'operational-visibility': OperationalVisibilityAnimation,
    'ai-insights': AIInsightsAnimation,
    'predictive-analytics': PredictiveAnalyticsAnimation,
  }

  const AnimationComponent = animations[service] || DefaultAnimation

  return (
    <div className={`relative w-full h-64 ${className}`}>
      <AnimationComponent reduced={prefersReducedMotion ?? false} />
    </div>
  )
}

// Data Integration: Multiple colored streams merging
function DataIntegrationAnimation({ reduced }: { reduced?: boolean }) {
  const streams = [
    { color: '#ef4444', delay: 0, y: 20 },
    { color: '#3b82f6', delay: 0.2, y: 80 },
    { color: '#22c55e', delay: 0.4, y: 140 },
  ]

  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {streams.map((stream, i) => (
        <motion.g key={i}>
          {/* Source stream */}
          <motion.path
            d={`M 10 ${stream.y} Q 60 ${stream.y} 100 80`}
            fill="none"
            stroke={stream.color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={reduced ? {} : { pathLength: 1 }}
            transition={{ duration: 1, delay: stream.delay, repeat: Infinity, repeatDelay: 2 }}
          />
          {/* Flowing dots */}
          <motion.circle
            r="4"
            fill={stream.color}
            initial={{ opacity: 0 }}
            animate={reduced ? {} : {
              opacity: [0, 1, 1, 0],
              offsetDistance: ['0%', '100%'],
            }}
            transition={{ duration: 1.5, delay: stream.delay, repeat: Infinity, repeatDelay: 1.5 }}
            style={{ offsetPath: `path("M 10 ${stream.y} Q 60 ${stream.y} 100 80")` }}
          />
        </motion.g>
      ))}
      {/* Merged output */}
      <motion.path
        d="M 100 80 L 190 80"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={reduced ? {} : { pathLength: 1 }}
        transition={{ duration: 0.5, delay: 1, repeat: Infinity, repeatDelay: 2.5 }}
      />
      {/* Glow */}
      <motion.circle
        cx="190"
        cy="80"
        r="8"
        fill="#14b8a6"
        initial={{ opacity: 0, scale: 0 }}
        animate={reduced ? {} : { opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  )
}

// AI Data Cleanup: Messy to organized
function AIDataCleanupAnimation({ reduced }: { reduced?: boolean }) {
  const messyPositions = [
    { x: 20, y: 30 }, { x: 45, y: 60 }, { x: 15, y: 90 },
    { x: 55, y: 25 }, { x: 40, y: 110 }, { x: 25, y: 70 },
  ]
  const cleanPositions = [
    { x: 130, y: 30 }, { x: 130, y: 50 }, { x: 130, y: 70 },
    { x: 160, y: 30 }, { x: 160, y: 50 }, { x: 160, y: 70 },
  ]

  // Pre-compute random rotations with seeded values
  const rotations = useMemo(() => {
    const seed = 42
    return messyPositions.map((_, i) => ({
      initial: seededRandom(seed + i * 3) * 30 - 15,
      mid1: seededRandom(seed + i * 3 + 1) * 30 - 15,
      mid2: seededRandom(seed + i * 3 + 2) * 30 - 15,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* Messy side label */}
      <text x="35" y="130" fill="#6b7280" fontSize="10" textAnchor="middle">Messy</text>
      {/* Clean side label */}
      <text x="145" y="130" fill="#14b8a6" fontSize="10" textAnchor="middle">Clean</text>

      {/* Processing arrow */}
      <motion.path
        d="M 75 70 L 105 70"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeDasharray="4 2"
        initial={{ opacity: 0.3 }}
        animate={reduced ? {} : { opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <polygon points="105,65 115,70 105,75" fill="#14b8a6" />

      {/* Data blocks */}
      {messyPositions.map((pos, i) => (
        <motion.rect
          key={i}
          x={pos.x}
          y={pos.y}
          width="20"
          height="12"
          rx="2"
          fill="#ef4444"
          initial={{ rotate: rotations[i].initial }}
          animate={reduced ? {} : {
            x: [pos.x, pos.x, cleanPositions[i].x],
            y: [pos.y, pos.y, cleanPositions[i].y],
            rotate: [rotations[i].mid1, rotations[i].mid2, 0],
            fill: ['#ef4444', '#fbbf24', '#14b8a6'],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}

      {/* Sparkle on clean side */}
      <motion.circle
        cx="175"
        cy="50"
        r="3"
        fill="#14b8a6"
        initial={{ opacity: 0, scale: 0 }}
        animate={reduced ? {} : { opacity: [0, 1, 0], scale: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: 2.5, repeat: Infinity, repeatDelay: 2.5 }}
      />
    </svg>
  )
}

// Data Foundation: Building blocks stacking
function DataFoundationAnimation({ reduced }: { reduced?: boolean }) {
  const blocks = [
    { width: 80, y: 100, delay: 0 },
    { width: 60, y: 75, delay: 0.3 },
    { width: 40, y: 50, delay: 0.6 },
  ]

  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {blocks.map((block, i) => (
        <motion.rect
          key={i}
          x={100 - block.width / 2}
          y={block.y}
          width={block.width}
          height="20"
          rx="3"
          fill={`rgba(20, 184, 166, ${1 - i * 0.2})`}
          initial={{ y: -50, opacity: 0 }}
          animate={reduced ? { y: block.y, opacity: 1 } : { y: block.y, opacity: 1 }}
          transition={{ duration: 0.5, delay: block.delay, repeat: reduced ? 0 : Infinity, repeatDelay: 2 }}
        />
      ))}
      {/* Foundation line */}
      <line x1="20" y1="125" x2="180" y2="125" stroke="#374151" strokeWidth="2" />
      {/* Top glow */}
      <motion.circle
        cx="100"
        cy="35"
        r="10"
        fill="#14b8a6"
        initial={{ opacity: 0, scale: 0 }}
        animate={reduced ? {} : { opacity: [0, 0.5, 0], scale: [0, 1.5, 0] }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatDelay: 2 }}
      />
    </svg>
  )
}

// Dashboards: Chart animation
function DashboardsAnimation({ reduced }: { reduced?: boolean }) {
  const bars = [40, 70, 55, 90, 60, 75]

  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* Chart background */}
      <rect x="20" y="20" width="160" height="100" rx="4" fill="#1f2937" stroke="#374151" />

      {/* Grid lines */}
      {[40, 60, 80, 100].map((y, i) => (
        <line key={i} x1="30" y1={y} x2="170" y2={y} stroke="#374151" strokeWidth="0.5" />
      ))}

      {/* Bars */}
      {bars.map((height, i) => (
        <motion.rect
          key={i}
          x={35 + i * 22}
          y={110 - height}
          width="16"
          height={height}
          rx="2"
          fill={i === 3 ? '#14b8a6' : '#0d9488'}
          initial={{ height: 0, y: 110 }}
          animate={reduced ? { height, y: 110 - height } : { height, y: 110 - height }}
          transition={{ duration: 0.5, delay: i * 0.1, repeat: reduced ? 0 : Infinity, repeatDelay: 3 }}
        />
      ))}

      {/* Highlight on max bar */}
      <motion.circle
        cx="101"
        cy="25"
        r="4"
        fill="#14b8a6"
        initial={{ opacity: 0 }}
        animate={reduced ? {} : { opacity: [0, 1, 0] }}
        transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  )
}

// Natural Language BI: Chat to chart
function NaturalLanguageBIAnimation({ reduced }: { reduced?: boolean }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* Chat bubble */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={reduced ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <rect x="15" y="40" width="60" height="35" rx="8" fill="#374151" />
        <polygon points="35,75 45,75 40,85" fill="#374151" />
        <motion.text
          x="45"
          y="62"
          fill="#9ca3af"
          fontSize="8"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { opacity: [0, 1] }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Show sales
        </motion.text>
      </motion.g>

      {/* Arrow */}
      <motion.path
        d="M 85 60 L 115 60"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />
      <motion.polygon
        points="115,55 125,60 115,65"
        fill="#14b8a6"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1 }}
        transition={{ delay: 1 }}
      />

      {/* Chart result */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <rect x="130" y="35" width="55" height="50" rx="4" fill="#1f2937" />
        {[20, 35, 25, 40].map((h, i) => (
          <motion.rect
            key={i}
            x={138 + i * 11}
            y={75 - h}
            width="8"
            height={h}
            rx="1"
            fill="#14b8a6"
            initial={{ height: 0, y: 75 }}
            animate={reduced ? { height: h, y: 75 - h } : { height: h, y: 75 - h }}
            transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* Lightbulb */}
      <motion.text
        x="157"
        y="30"
        fontSize="16"
        initial={{ opacity: 0, y: 10 }}
        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        💡
      </motion.text>
    </svg>
  )
}

// Operational Visibility: Eye with data rays
function OperationalVisibilityAnimation({ reduced }: { reduced?: boolean }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* Eye outline */}
      <motion.ellipse
        cx="100"
        cy="70"
        rx="50"
        ry="30"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Iris */}
      <motion.circle
        cx="100"
        cy="70"
        r="20"
        fill="#0d9488"
        initial={{ scale: 0 }}
        animate={reduced ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Pupil */}
      <motion.circle
        cx="100"
        cy="70"
        r="8"
        fill="#042f2e"
        initial={{ scale: 0 }}
        animate={reduced ? { scale: [1] } : { scale: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Scanning rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line
          key={i}
          x1="100"
          y1="70"
          x2={100 + Math.cos(angle * Math.PI / 180) * 60}
          y2={70 + Math.sin(angle * Math.PI / 180) * 40}
          stroke="#14b8a6"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={reduced ? {} : { opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
        />
      ))}

      {/* Data points */}
      {[
        { x: 40, y: 50 }, { x: 160, y: 50 },
        { x: 30, y: 90 }, { x: 170, y: 90 },
      ].map((pos, i) => (
        <motion.circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r="4"
          fill="#14b8a6"
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0.5 } : { opacity: [0, 1, 0] }}
          transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  )
}

// AI Insights: Brain with nodes lighting up
function AIInsightsAnimation({ reduced }: { reduced?: boolean }) {
  const nodes = [
    { cx: 100, cy: 40 },
    { cx: 60, cy: 60 }, { cx: 140, cy: 60 },
    { cx: 50, cy: 90 }, { cx: 100, cy: 80 }, { cx: 150, cy: 90 },
    { cx: 70, cy: 110 }, { cx: 130, cy: 110 },
  ]

  const connections = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
    [3, 6], [4, 6], [4, 7], [5, 7],
  ]

  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      {/* Connections */}
      {connections.map(([from, to], i) => (
        <motion.line
          key={i}
          x1={nodes[from].cx}
          y1={nodes[from].cy}
          x2={nodes[to].cx}
          y2={nodes[to].cy}
          stroke="#374151"
          strokeWidth="1"
          initial={{ opacity: 0.3 }}
          animate={reduced ? {} : { opacity: [0.3, 0.8, 0.3], stroke: ['#374151', '#14b8a6', '#374151'] }}
          transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r="8"
          fill="#1f2937"
          stroke="#14b8a6"
          strokeWidth="2"
          initial={{ scale: 1 }}
          animate={reduced ? {} : {
            scale: [1, 1.2, 1],
            fill: ['#1f2937', '#14b8a6', '#1f2937'],
          }}
          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
        />
      ))}

      {/* Central glow */}
      <motion.circle
        cx="100"
        cy="75"
        r="30"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={reduced ? {} : { opacity: [0, 0.3, 0], scale: [0.5, 1.5, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </svg>
  )
}

// Predictive Analytics: Graph extending into future
function PredictiveAnalyticsAnimation({ reduced }: { reduced?: boolean }) {
  const historicalPoints = [
    { x: 20, y: 90 }, { x: 40, y: 70 }, { x: 60, y: 80 },
    { x: 80, y: 55 }, { x: 100, y: 60 },
  ]
  const predictedPoints = [
    { x: 100, y: 60 }, { x: 120, y: 45 }, { x: 140, y: 35 },
    { x: 160, y: 25 }, { x: 180, y: 20 },
  ]

  const historicalPath = historicalPoints.map((p, i) =>
    (i === 0 ? 'M' : 'L') + `${p.x} ${p.y}`
  ).join(' ')

  const predictedPath = predictedPoints.map((p, i) =>
    (i === 0 ? 'M' : 'L') + `${p.x} ${p.y}`
  ).join(' ')

  return (
    <svg viewBox="0 0 200 120" className="w-full h-full">
      {/* Background */}
      <rect x="10" y="10" width="180" height="100" rx="4" fill="#1f2937" />

      {/* Grid */}
      {[30, 50, 70, 90].map((y, i) => (
        <line key={i} x1="15" y1={y} x2="185" y2={y} stroke="#374151" strokeWidth="0.5" />
      ))}

      {/* Now line */}
      <line x1="100" y1="15" x2="100" y2="105" stroke="#4b5563" strokeWidth="1" strokeDasharray="4 4" />
      <text x="100" y="115" fill="#6b7280" fontSize="8" textAnchor="middle">Now</text>

      {/* Historical data */}
      <motion.path
        d={historicalPath}
        fill="none"
        stroke="#6b7280"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Predicted data */}
      <motion.path
        d={predictedPath}
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeDasharray="6 3"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1, delay: 1 }}
      />

      {/* Points */}
      {historicalPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6b7280" />
      ))}
      {predictedPoints.slice(1).map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="4"
          fill="#14b8a6"
          initial={{ opacity: 0, scale: 0 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.2 }}
        />
      ))}

      {/* Confidence band */}
      <motion.path
        d="M 100 60 Q 140 25 180 15 L 180 30 Q 140 50 100 60 Z"
        fill="#14b8a6"
        initial={{ opacity: 0 }}
        animate={reduced ? { opacity: 0.1 } : { opacity: 0.1 }}
        transition={{ delay: 1.5 }}
      />
    </svg>
  )
}

// Default animation
function DefaultAnimation({ reduced }: { reduced?: boolean }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full">
      <motion.circle
        cx="100"
        cy="70"
        r="30"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={reduced ? { pathLength: 1 } : { pathLength: 1, rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="100"
        cy="70"
        r="15"
        fill="#14b8a6"
        initial={{ scale: 0 }}
        animate={reduced ? { scale: 1 } : { scale: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </svg>
  )
}

export default ServiceAnimation
