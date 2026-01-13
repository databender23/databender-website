'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface HeroDataAnimationProps {
  className?: string
  isActive?: boolean
}

interface DataNode {
  id: number
  x: number
  y: number
  size: number
  type: 'database' | 'chart' | 'gear' | 'cloud' | 'document'
  duration: number
  delay: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateNodes(count: number, seed: number): DataNode[] {
  const types: DataNode['type'][] = ['database', 'chart', 'gear', 'cloud', 'document']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 8 + seededRandom(seed + i * 5) * 84,
    y: 8 + seededRandom(seed + i * 5 + 1) * 84,
    size: 40 + seededRandom(seed + i * 5 + 2) * 24,
    type: types[i % types.length],
    duration: 4 + seededRandom(seed + i * 5 + 3) * 3,
    delay: seededRandom(seed + i * 5 + 4) * 2,
  }))
}

// Define connections between nodes (pairs of node indices)
const nodeConnections = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [0, 4],
  [1, 5],
]

export default function HeroDataAnimation({
  className = '',
  isActive = true
}: HeroDataAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [nodes, setNodes] = useState<DataNode[]>([])
  const seedRef = useRef(123)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const nodeCount = isMobile ? 6 : 10
    setNodes(generateNodes(nodeCount, seedRef.current))
  }, [isMobile])

  const nodeIcons: Record<DataNode['type'], React.ReactNode> = {
    database: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={1.5} />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" strokeWidth={1.5} />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" strokeWidth={1.5} />
      </svg>
    ),
    chart: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V9m4 7v-5m4 5v-8m4 8V7" />
      </svg>
    ),
    gear: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    cloud: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    document: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  }

  if (!isActive) {
    return <div className={`relative w-full h-full ${className}`} />
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Connecting lines between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A9988" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#1A9988" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1A9988" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.length > 0 && nodeConnections.map(([fromIdx, toIdx], i) => {
          const fromNode = nodes[fromIdx % nodes.length]
          const toNode = nodes[toIdx % nodes.length]
          if (!fromNode || !toNode) return null
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                pathLength: { duration: 1.5, delay: i * 0.2 },
                opacity: { duration: 3, repeat: Infinity, delay: i * 0.3 }
              }}
            />
          )
        })}
      </svg>

      {/* Floating data nodes */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -8, 0, 8, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: node.delay },
            scale: { duration: 0.5, delay: node.delay },
            y: {
              duration: node.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            },
          }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(26, 153, 136, 0.3) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: node.duration * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay,
            }}
          />

          {/* Node circle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full bg-white border border-[#1A9988]/20 shadow-lg"
            style={{
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
              width: node.size * 0.7,
              height: node.size * 0.7,
            }}
            animate={{
              boxShadow: [
                '0 4px 12px rgba(26, 153, 136, 0.15)',
                '0 4px 20px rgba(26, 153, 136, 0.3)',
                '0 4px 12px rgba(26, 153, 136, 0.15)',
              ],
            }}
            transition={{
              duration: node.duration * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: node.delay + 0.5,
            }}
          >
            <div className="text-[#1A9988]">
              {nodeIcons[node.type]}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
