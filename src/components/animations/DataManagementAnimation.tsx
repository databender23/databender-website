'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface DataManagementAnimationProps {
  className?: string
  isActive?: boolean
}

interface DataNode {
  id: number
  angle: number
  distance: number
  type: 'database' | 'file' | 'cloud' | 'server' | 'chart'
  orbitDuration: number
  size: number
}

// Seeded random for consistent values across renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateNodes(count: number, seed: number): DataNode[] {
  const types: DataNode['type'][] = ['database', 'file', 'cloud', 'server', 'chart']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (360 / count) * i + seededRandom(seed + i) * 30 - 15,
    distance: 30 + seededRandom(seed + i + 100) * 15,
    type: types[i % types.length],
    orbitDuration: 20 + seededRandom(seed + i + 200) * 10,
    size: 32 + seededRandom(seed + i + 300) * 8,
  }))
}

interface DataParticle {
  id: number
  fromNode: number
  delay: number
  duration: number
}

function generateParticles(nodeCount: number, seed: number): DataParticle[] {
  return Array.from({ length: nodeCount * 2 }, (_, i) => ({
    id: i,
    fromNode: i % nodeCount,
    delay: seededRandom(seed + i + 400) * 3,
    duration: 2 + seededRandom(seed + i + 500) * 1.5,
  }))
}

export default function DataManagementAnimation({
  className = '',
  isActive = true,
}: DataManagementAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [nodes, setNodes] = useState<DataNode[]>([])
  const [particles, setParticles] = useState<DataParticle[]>([])
  const seedRef = useRef(42)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const nodeCount = isMobile ? 4 : 6
    setNodes(generateNodes(nodeCount, seedRef.current))
    setParticles(generateParticles(nodeCount, seedRef.current))
  }, [isMobile])

  // Icon components for each node type
  const nodeIcons: Record<DataNode['type'], React.ReactNode> = {
    database: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="8" ry="3" strokeWidth={1.5} />
        <path d="M4 5v14c0 1.657 3.582 3 8 3s8-1.343 8-3V5" strokeWidth={1.5} />
        <path d="M4 12c0 1.657 3.582 3 8 3s8-1.343 8-3" strokeWidth={1.5} />
      </svg>
    ),
    file: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    cloud: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
    server: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="6" rx="1" strokeWidth={1.5} />
        <rect x="3" y="14" width="18" height="6" rx="1" strokeWidth={1.5} />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    chart: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        {/* Orbital rings */}
        <motion.circle
          cx="100"
          cy="100"
          r="35"
          fill="none"
          stroke="rgba(26, 153, 136, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={isActive ? { rotate: 360 } : {}}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="rgba(26, 153, 136, 0.1)"
          strokeWidth="1"
          strokeDasharray="2 6"
          animate={isActive ? { rotate: -360 } : {}}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
        />

        {/* Connection lines to center */}
        {nodes.map((node) => {
          const angleRad = (node.angle * Math.PI) / 180
          const x = 100 + Math.cos(angleRad) * node.distance
          const y = 100 + Math.sin(angleRad) * node.distance
          return (
            <motion.line
              key={`line-${node.id}`}
              x1="100"
              y1="100"
              x2={x}
              y2={y}
              stroke="rgba(26, 153, 136, 0.2)"
              strokeWidth="1"
              animate={
                isActive
                  ? {
                      opacity: [0.2, 0.4, 0.2],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.id * 0.3,
              }}
            />
          )
        })}

        {/* Data particles flowing to center */}
        {isActive &&
          particles.map((particle) => {
            const node = nodes[particle.fromNode]
            if (!node) return null
            const angleRad = (node.angle * Math.PI) / 180
            const startX = 100 + Math.cos(angleRad) * node.distance
            const startY = 100 + Math.sin(angleRad) * node.distance
            return (
              <motion.circle
                key={`particle-${particle.id}`}
                r="2"
                fill="#1A9988"
                initial={{ cx: startX, cy: startY, opacity: 0 }}
                animate={{
                  cx: [startX, 100],
                  cy: [startY, 100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            )
          })}
      </svg>

      {/* Central hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg flex items-center justify-center"
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 4px 14px rgba(26, 153, 136, 0.3)',
                  '0 6px 20px rgba(26, 153, 136, 0.5)',
                  '0 4px 14px rgba(26, 153, 136, 0.3)',
                ],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      </motion.div>

      {/* Orbiting data nodes */}
      {nodes.map((node) => {
        const angleRad = (node.angle * Math.PI) / 180
        const x = 50 + Math.cos(angleRad) * node.distance
        const y = 50 + Math.sin(angleRad) * node.distance

        return (
          <motion.div
            key={`node-${node.id}`}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: node.size,
              height: node.size,
            }}
            animate={
              isActive
                ? {
                    rotate: [0, 360],
                  }
                : {}
            }
            transition={{
              duration: node.orbitDuration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              className="w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-teal-600"
              animate={
                isActive
                  ? {
                      rotate: [0, -360],
                    }
                  : {}
              }
              transition={{
                duration: node.orbitDuration,
                repeat: Infinity,
                ease: 'linear',
              }}
              whileHover={{ scale: 1.1 }}
            >
              {nodeIcons[node.type]}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Ambient glow effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-teal-500/5 blur-xl pointer-events-none" />
    </div>
  )
}
