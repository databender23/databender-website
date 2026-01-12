'use client'

import { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { diagramConfig, colors, type DiagramNode, type DiagramConnection } from './DiagramConfig'

interface EntityResolutionDiagramProps {
  currentStep: number
  isPlaying: boolean
  className?: string
}

// Helper to calculate bezier curve path between two nodes
function getConnectionPath(
  fromNode: DiagramNode,
  toNode: DiagramNode,
  offset: number = 0
): string {
  const startX = fromNode.x
  const startY = fromNode.y
  const endX = toNode.x
  const endY = toNode.y

  // Calculate control points for smooth curve
  const midX = (startX + endX) / 2
  const midY = (startY + endY) / 2

  // Add some curve variation
  const dx = endX - startX
  const curveOffset = Math.abs(dx) * 0.3 + offset

  return `M ${startX} ${startY} Q ${midX} ${midY - curveOffset} ${endX} ${endY}`
}

// Animated particle along path
function FlowParticle({
  path,
  color,
  delay,
  duration,
  size = 4,
}: {
  path: string
  color: string
  delay: number
  duration: number
  size?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.circle
      r={size}
      fill={color}
      filter="url(#glow)"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        offsetDistance: ['0%', '100%'],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: duration * 0.5,
        ease: 'linear',
      }}
      style={{
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
      }}
    />
  )
}

// Node component with hover states and pulse animation
function DiagramNodeComponent({
  node,
  isHighlighted,
  isActive,
  onHover,
}: {
  node: DiagramNode
  isHighlighted: boolean
  isActive: boolean
  onHover: (nodeId: string | null) => void
}) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    onHover(node.id)
  }, [node.id, onHover])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    onHover(null)
  }, [onHover])

  const pulseAnimation = useMemo(() => {
    if (prefersReducedMotion || !isHighlighted) return {}
    return {
      scale: [1, 1.08, 1],
      opacity: [0.8, 1, 0.8],
    }
  }, [prefersReducedMotion, isHighlighted])

  const getIcon = () => {
    switch (node.icon) {
      case 'database':
        return (
          <path
            d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 18c-4.42 0-8-1.34-8-3v-2.34c1.81.93 4.76 1.34 8 1.34s6.19-.41 8-1.34V17c0 1.66-3.58 3-8 3zm0-6c-4.42 0-8-1.34-8-3v-2.34c1.81.93 4.76 1.34 8 1.34s6.19-.41 8-1.34V11c0 1.66-3.58 3-8 3zm0-6c-4.42 0-8-1.34-8-3s3.58-3 8-3 8 1.34 8 3-3.58 3-8 3z"
            fill="currentColor"
          />
        )
      case 'server':
        return (
          <path
            d="M4 1h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 8h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zm0 8h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM6 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 8a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
            fill="currentColor"
          />
        )
      case 'archive':
        return (
          <path
            d="M3 3h18v4H3V3zm0 6h18v12H3V9zm5 4h8v2H8v-2z"
            fill="currentColor"
          />
        )
      case 'brain':
        return (
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z"
            fill="currentColor"
          />
        )
      case 'filter':
        return (
          <path
            d="M4.25 5.61C6.27 8.2 10 13 10 13v6c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-6s3.72-4.8 5.74-7.39A.998.998 0 0018.95 4H5.04c-.83 0-1.3.95-.79 1.61z"
            fill="currentColor"
          />
        )
      case 'match':
        return (
          <path
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
            fill="currentColor"
          />
        )
      case 'parallel':
        return (
          <path
            d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"
            fill="currentColor"
          />
        )
      case 'search':
        return (
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="currentColor"
          />
        )
      case 'link':
        return (
          <path
            d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
            fill="currentColor"
          />
        )
      case 'clipboard':
        return (
          <path
            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
            fill="currentColor"
          />
        )
      case 'users':
        return (
          <path
            d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
            fill="currentColor"
          />
        )
      default:
        return (
          <circle cx="12" cy="12" r="8" fill="currentColor" />
        )
    }
  }

  const nodeSize = node.size
  const iconSize = nodeSize * 0.45

  return (
    <motion.g
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isHighlighted ? 1 : 0.3,
        scale: 1,
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Outer glow ring */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={nodeSize / 2 + 8}
        fill="transparent"
        stroke={node.color}
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={pulseAnimation}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          filter: `drop-shadow(0 0 10px ${node.glowColor})`,
        }}
      />

      {/* Main node background */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={nodeSize / 2}
        fill={colors.background.dark}
        stroke={node.color}
        strokeWidth={isHighlighted ? 3 : 1.5}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
        style={{
          filter: isHighlighted ? `drop-shadow(0 0 15px ${node.glowColor})` : 'none',
        }}
      />

      {/* Inner gradient fill */}
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={nodeSize / 2 - 3}
        fill={`url(#gradient-${node.type})`}
        opacity={isHighlighted ? 0.3 : 0.1}
      />

      {/* Icon */}
      <motion.svg
        x={node.x - iconSize / 2}
        y={node.y - iconSize / 2}
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        style={{ color: node.color }}
        animate={{
          opacity: isHighlighted ? 1 : 0.5,
        }}
      >
        {getIcon()}
      </motion.svg>

      {/* Label */}
      <motion.text
        x={node.x}
        y={node.y + nodeSize / 2 + 12}
        textAnchor="middle"
        fill={colors.text.primary}
        fontSize={node.type === 'orchestrator' ? 10 : 8}
        fontWeight={600}
        animate={{ opacity: isHighlighted ? 1 : 0.4 }}
      >
        {node.label}
      </motion.text>

      {/* Sublabel */}
      {node.sublabel && (
        <motion.text
          x={node.x}
          y={node.y + nodeSize / 2 + 22}
          textAnchor="middle"
          fill={colors.text.muted}
          fontSize={6}
          animate={{ opacity: isHighlighted ? 0.8 : 0.3 }}
        >
          {node.sublabel}
        </motion.text>
      )}

      {/* Tooltip on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <rect
              x={node.x - 40}
              y={node.y - nodeSize / 2 - 30}
              width={80}
              height={20}
              rx={4}
              fill="rgba(0, 0, 0, 0.9)"
            />
            <text
              x={node.x}
              y={node.y - nodeSize / 2 - 16}
              textAnchor="middle"
              fill={colors.text.primary}
              fontSize={7}
            >
              {node.label}: {node.sublabel}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  )
}

// Connection line with optional particles
function ConnectionLine({
  connection,
  fromNode,
  toNode,
  isHighlighted,
  isActive,
}: {
  connection: DiagramConnection
  fromNode: DiagramNode
  toNode: DiagramNode
  isHighlighted: boolean
  isActive: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const path = getConnectionPath(fromNode, toNode)

  return (
    <g>
      {/* Base path */}
      <motion.path
        d={path}
        fill="none"
        stroke={connection.color}
        strokeWidth={isHighlighted ? 2 : 1}
        strokeDasharray={isHighlighted ? 'none' : '4 2'}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isHighlighted ? 0.8 : 0.2,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          filter: isHighlighted ? `drop-shadow(0 0 4px ${connection.color})` : 'none',
        }}
      />

      {/* Animated particles */}
      {isHighlighted && connection.particles && !prefersReducedMotion && (
        <>
          <FlowParticle
            path={path}
            color={connection.color}
            delay={0}
            duration={2}
            size={3}
          />
          <FlowParticle
            path={path}
            color={connection.color}
            delay={0.7}
            duration={2}
            size={3}
          />
          <FlowParticle
            path={path}
            color={connection.color}
            delay={1.4}
            duration={2}
            size={3}
          />
        </>
      )}
    </g>
  )
}

export default function EntityResolutionDiagram({
  currentStep,
  isPlaying,
  className = '',
}: EntityResolutionDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  const currentStepData = diagramConfig.steps.find((s) => s.id === currentStep)
  const highlightedNodes = currentStepData?.highlightNodes || []
  const highlightedConnections = currentStepData?.highlightConnections || []

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width || 800,
          height: rect.height || 500,
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Get node by ID
  const getNodeById = useCallback((id: string) => {
    return diagramConfig.nodes.find((n) => n.id === id)
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Background */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(145deg, ${colors.background.dark} 0%, ${colors.background.medium} 40%, ${colors.background.light} 100%)`,
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${colors.subagent.purple}10 1px, transparent 1px), linear-gradient(90deg, ${colors.subagent.purple}10 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Ambient glow effects */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${colors.subagent.purple}40 0%, transparent 70%)`,
          }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.success.teal}40 0%, transparent 70%)`,
          }}
        />
      </div>

      {/* SVG Diagram */}
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="relative w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Definitions */}
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Node gradients */}
          <radialGradient id="gradient-source" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.chaos.orange} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.chaos.red} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-orchestrator" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.orchestrator?.teal || '#1A9988'} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.orchestrator?.teal || '#1A9988'} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-subagent" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.subagent?.purple || '#8b5cf6'} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.subagent?.purple || '#8b5cf6'} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-strategy" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.subagent?.blue || '#3b82f6'} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.subagent?.blue || '#3b82f6'} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-workflow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.subagent?.purple || '#8b5cf6'} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.subagent?.indigo || '#6366f1'} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-validator" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.success.green} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.success.teal} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-output" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.success.teal} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.success.green} stopOpacity="0.1" />
          </radialGradient>

          <radialGradient id="gradient-audit" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={colors.success.green} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.success.teal} stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Connections layer */}
        <g className="connections-layer">
          {diagramConfig.connections.map((connection) => {
            const fromNode = getNodeById(connection.from)
            const toNode = getNodeById(connection.to)
            if (!fromNode || !toNode) return null

            return (
              <ConnectionLine
                key={connection.id}
                connection={connection}
                fromNode={fromNode}
                toNode={toNode}
                isHighlighted={highlightedConnections.includes(connection.id)}
                isActive={isPlaying}
              />
            )
          })}
        </g>

        {/* Nodes layer */}
        <g className="nodes-layer">
          {diagramConfig.nodes.map((node) => (
            <DiagramNodeComponent
              key={node.id}
              node={node}
              isHighlighted={highlightedNodes.includes(node.id)}
              isActive={isPlaying}
              onHover={setHoveredNode}
            />
          ))}
        </g>

        {/* Hero metric overlay for final step */}
        <AnimatePresence>
          {currentStep === 8 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <rect
                x="35"
                y="5"
                width="30"
                height="15"
                rx="4"
                fill="rgba(0, 0, 0, 0.7)"
              />
              <text
                x="50"
                y="13"
                textAnchor="middle"
                fill={colors.text.primary}
                fontSize="8"
                fontWeight="bold"
              >
                125<tspan fill={colors.subagent.purple}>x</tspan>
              </text>
              <text
                x="50"
                y="18"
                textAnchor="middle"
                fill={colors.text.muted}
                fontSize="3"
              >
                Cost Savings
              </text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Step indicator pills */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {diagramConfig.steps.map((step) => (
          <motion.div
            key={step.id}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: currentStep >= step.id ? colors.subagent.purple : colors.text.muted,
            }}
            animate={{
              scale: currentStep === step.id ? 1.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
    </div>
  )
}
