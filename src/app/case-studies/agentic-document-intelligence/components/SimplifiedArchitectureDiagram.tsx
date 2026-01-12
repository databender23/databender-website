'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AgentNode from './AgentNode'
import { agentNodes, connections, type AgentType, type ConnectionConfig } from './DiagramConfig'

interface SimplifiedArchitectureDiagramProps {
  currentStep: number
  highlightedAgents: AgentType[]
  activeConnections: string[]
  onAgentClick?: (agentId: AgentType) => void
  className?: string
}

// Animated particle that flows along connections
function FlowParticle({
  path,
  color,
  delay = 0,
  duration = 2,
}: {
  path: string
  color: string
  delay?: number
  duration?: number
}) {
  return (
    <motion.circle
      r="4"
      fill={color}
      filter="url(#glow)"
      initial={{ offsetDistance: '0%' }}
      animate={{ offsetDistance: '100%' }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        offsetPath: `path('${path}')`,
      }}
    />
  )
}

// Connection line component with animated particles
function ConnectionLine({
  config,
  isActive,
  fromPos,
  toPos,
}: {
  config: ConnectionConfig
  isActive: boolean
  fromPos: { x: number; y: number }
  toPos: { x: number; y: number }
}) {
  const midX = (fromPos.x + toPos.x) / 2
  const midY = (fromPos.y + toPos.y) / 2

  let path: string
  if (config.type === 'feedback') {
    const offsetX = 80
    path = `M ${fromPos.x} ${fromPos.y} Q ${fromPos.x + offsetX} ${midY} ${toPos.x} ${toPos.y}`
  } else {
    path = `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY - 20} ${toPos.x} ${toPos.y}`
  }

  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray={config.type === 'feedback' ? '6 4' : undefined}
        initial={{
          stroke: 'rgba(156, 163, 175, 0.3)',
          pathLength: 0,
        }}
        animate={{
          stroke: isActive ? config.color : 'rgba(156, 163, 175, 0.3)',
          pathLength: 1,
          opacity: isActive ? 1 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />
      {isActive && (
        <>
          <FlowParticle path={path} color={config.color} delay={0} duration={2} />
          <FlowParticle path={path} color={config.color} delay={0.7} duration={2} />
          <FlowParticle path={path} color={config.color} delay={1.4} duration={2} />
        </>
      )}
    </g>
  )
}

// V2: Simple view component - 4 nodes max
function SimpleView({ isActive }: { isActive: boolean }) {
  const stages = [
    {
      id: 'input',
      label: 'Documents In',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: '#6B7280',
      bgColor: 'bg-gray-100',
      borderColor: 'border-gray-300',
    },
    {
      id: 'team',
      label: 'AI Team',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: '#1A9988',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-500',
    },
    {
      id: 'check',
      label: 'Quality Check',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
    },
    {
      id: 'output',
      label: 'Clean Data',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: '#22C55E',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
    },
  ]

  return (
    <div className="relative p-8 bg-gradient-to-br from-bg-secondary to-bg-primary rounded-2xl border border-border">
      <div className="flex items-center justify-between gap-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isActive ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-20 h-20 rounded-xl ${stage.bgColor} border-2 ${stage.borderColor} flex items-center justify-center shadow-sm`}
                style={{ color: stage.color }}
              >
                {stage.icon}
              </div>
              <span className="text-sm font-medium text-text-primary mt-2">{stage.label}</span>
            </motion.div>

            {index < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={isActive ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.1 }}
                className="flex items-center"
              >
                <motion.svg
                  className="w-8 h-8 text-teal-500"
                  animate={isActive ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Simple explanation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-text-secondary text-sm">
          Your documents go in, a team of specialized AI workers process them,
          quality checks catch any errors, and clean data comes out.
        </p>
      </motion.div>
    </div>
  )
}

export default function SimplifiedArchitectureDiagram({
  currentStep,
  highlightedAgents,
  activeConnections,
  onAgentClick,
  className = '',
}: SimplifiedArchitectureDiagramProps) {
  const [viewMode, setViewMode] = useState<'simple' | 'technical'>('simple')

  const containerWidth = 700
  const containerHeight = 550

  const getPixelPos = useCallback((pos: { x: number; y: number }) => ({
    x: (pos.x / 100) * containerWidth,
    y: (pos.y / 100) * containerHeight,
  }), [])

  const nodePositions = useMemo(() => {
    const positions: Record<AgentType, { x: number; y: number }> = {} as Record<AgentType, { x: number; y: number }>
    agentNodes.forEach(node => {
      positions[node.id] = getPixelPos(node.position)
    })
    return positions
  }, [getPixelPos])

  return (
    <div className={`relative ${className}`}>
      {/* V2: View toggle */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setViewMode('simple')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${viewMode === 'simple'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-bg-secondary text-text-secondary hover:bg-bg-primary border border-border'
            }
          `}
        >
          Simple View
        </button>
        <button
          onClick={() => setViewMode('technical')}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${viewMode === 'technical'
              ? 'bg-teal-500 text-white shadow-sm'
              : 'bg-bg-secondary text-text-secondary hover:bg-bg-primary border border-border'
            }
          `}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Technical Details
          </span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'simple' ? (
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <SimpleView isActive={true} />
          </motion.div>
        ) : (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Technical view - Full architecture */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700">
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />

              {/* Ambient glow spots */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />

              {/* Input indicator */}
              <motion.div
                className="absolute left-4 top-1/3 flex flex-col items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-14 h-16 bg-gray-700 rounded-lg border border-gray-600 flex flex-col items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs text-gray-400 mt-1">PDF</span>
                </div>
                <motion.svg
                  className="w-6 h-6 text-teal-400"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path fill="currentColor" d="M5 11l7 7 7-7H5z" transform="rotate(-90 12 12)" />
                </motion.svg>
              </motion.div>

              {/* Output indicator */}
              <motion.div
                className="absolute right-4 bottom-4 flex flex-col items-center gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.svg
                  className="w-6 h-6 text-green-400"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path fill="currentColor" d="M11 5l7 7-7 7V5z" transform="rotate(90 12 12)" />
                </motion.svg>
                <div className="w-14 h-16 bg-green-500/20 rounded-lg border border-green-500/40 flex flex-col items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-green-400 mt-1">CSV</span>
                </div>
              </motion.div>

              {/* SVG for connections */}
              <svg
                viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ minHeight: '400px' }}
              >
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {connections.map((conn) => {
                  const fromNode = agentNodes.find(n => n.id === conn.from)
                  const toNode = agentNodes.find(n => n.id === conn.to)
                  if (!fromNode || !toNode) return null

                  const connectionId = `${conn.from}-${conn.to}`
                  const isActive = activeConnections.includes(connectionId)

                  return (
                    <ConnectionLine
                      key={connectionId}
                      config={conn}
                      isActive={isActive}
                      fromPos={nodePositions[conn.from]}
                      toPos={nodePositions[conn.to]}
                    />
                  )
                })}
              </svg>

              {/* Agent Nodes */}
              <div className="relative w-full" style={{ minHeight: '400px' }}>
                {agentNodes.map((node) => (
                  <AgentNode
                    key={node.id}
                    config={node}
                    isActive={highlightedAgents.includes(node.id) && currentStep >= 2}
                    isHighlighted={highlightedAgents.includes(node.id)}
                    onClick={() => onAgentClick?.(node.id)}
                    usePlainEnglish={true}
                  />
                ))}
              </div>

              {/* Self-healing loop indicator */}
              {activeConnections.includes('validator-refinement-agent') && (
                <motion.div
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.svg
                    className="w-4 h-4 text-red-400"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                  </motion.svg>
                  <span className="text-xs text-red-300 font-medium">Auto-Retry Active</span>
                </motion.div>
              )}
            </div>

            {/* Legend with plain English */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500" />
                <span className="text-text-secondary">Project Manager</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-text-secondary">Document Scanner</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-text-secondary">Specialist Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-text-secondary">Error Fixer</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-text-secondary">Quality Checker</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-red-400" style={{ borderTop: '2px dashed' }} />
                <span className="text-text-secondary">Auto-Retry</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
