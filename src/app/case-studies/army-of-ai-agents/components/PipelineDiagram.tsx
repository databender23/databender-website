'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { pipelineStages, stageConnections, colorClasses, StageId, getStepById } from './DiagramConfig'

interface PipelineDiagramProps {
  currentStep: number
  className?: string
}

// Icon components for each stage
function StageIcon({ icon, className = '' }: { icon: string; className?: string }) {
  const iconClass = `w-5 h-5 ${className}`

  switch (icon) {
    case 'database':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    case 'split':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    case 'merge':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3m0 0l4-4m-4 4l4 4" />
        </svg>
      )
    case 'link':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    case 'check':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    default:
      return null
  }
}

// Stage node component
function StageNode({
  stage,
  isHighlighted,
  position
}: {
  stage: typeof pipelineStages[0]
  isHighlighted: boolean
  position: { x: number; y: number }
}) {
  const colors = colorClasses[stage.color as keyof typeof colorClasses]

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: isHighlighted ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
          relative p-3 rounded-lg border-2 transition-all duration-300 max-w-[100px]
          ${isHighlighted
            ? `${colors.bgLight} ${colors.border} shadow-lg`
            : 'bg-bg-primary border-border'
          }
        `}
      >
        {/* Glow effect when highlighted */}
        {isHighlighted && (
          <motion.div
            className={`absolute inset-0 rounded-lg ${colors.bgLight} blur-xl`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center
            ${isHighlighted ? colors.bgLight : 'bg-bg-secondary'}
          `}>
            <StageIcon
              icon={stage.icon}
              className={isHighlighted ? colors.text : 'text-text-muted'}
            />
          </div>
          <div className="text-center">
            <p className={`text-xs font-semibold leading-tight ${isHighlighted ? colors.text : 'text-text-primary'}`}>
              {stage.label}
            </p>
            <p className="text-[10px] text-text-muted mt-0.5 leading-tight">
              {stage.plainEnglish}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Connection line component
function ConnectionLine({
  from,
  to,
  isActive
}: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  isActive: boolean
}) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={isActive ? '#1A9988' : '#6B7280'}
            opacity={isActive ? 1 : 0.3}
          />
        </marker>
      </defs>
      <motion.line
        x1={`${from.x}%`}
        y1={`${from.y}%`}
        x2={`${to.x}%`}
        y2={`${to.y}%`}
        stroke={isActive ? '#1A9988' : '#6B7280'}
        strokeWidth={isActive ? 2 : 1}
        strokeOpacity={isActive ? 1 : 0.3}
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </svg>
  )
}

export default function PipelineDiagram({ currentStep, className = '' }: PipelineDiagramProps) {
  const [showTechnical, setShowTechnical] = useState(false)

  const currentStepData = getStepById(currentStep)
  const highlightedStages = currentStepData?.highlightStages || []
  const activeConnections = currentStepData?.activeConnections || []

  // Position mapping for stages (percentage-based for responsiveness)
  // Adjusted to keep nodes away from edges
  const stagePositions: Record<StageId, { x: number; y: number }> = {
    input: { x: 18, y: 22 },
    collision: { x: 38, y: 22 },
    unstable: { x: 58, y: 22 },
    crossref: { x: 78, y: 22 },
    match: { x: 50, y: 52 },
    output: { x: 50, y: 80 }
  }

  // Connection endpoints (adjusted for visual flow)
  const connectionEndpoints: Record<string, { from: { x: number; y: number }; to: { x: number; y: number } }> = {
    'input-collision': { from: { x: 25, y: 22 }, to: { x: 31, y: 22 } },
    'collision-unstable': { from: { x: 45, y: 22 }, to: { x: 51, y: 22 } },
    'unstable-crossref': { from: { x: 65, y: 22 }, to: { x: 71, y: 22 } },
    'crossref-match': { from: { x: 78, y: 34 }, to: { x: 58, y: 47 } },
    'input-match': { from: { x: 18, y: 34 }, to: { x: 42, y: 47 } },
    'match-output': { from: { x: 50, y: 62 }, to: { x: 50, y: 72 } }
  }

  return (
    <div className={`${className}`}>
      {/* View toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3 md:mb-4">
        <h3 className="text-xs md:text-sm font-medium text-text-primary">Entity Resolution Pipeline</h3>
        <div className="flex items-center gap-1.5 md:gap-2">
          <button
            onClick={() => setShowTechnical(false)}
            className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium rounded-lg transition-colors ${
              !showTechnical
                ? 'bg-teal-500 text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
            }`}
          >
            Simple View
          </button>
          <button
            onClick={() => setShowTechnical(true)}
            className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-medium rounded-lg transition-colors ${
              showTechnical
                ? 'bg-teal-500 text-white'
                : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
            }`}
          >
            Technical Details
          </button>
        </div>
      </div>

      {/* Diagram container */}
      <div className="relative bg-bg-secondary rounded-lg md:rounded-xl border border-border p-4 md:p-8 min-h-[350px] md:min-h-[450px]">
        {/* Connection lines (render first, behind nodes) */}
        {stageConnections.map(connection => {
          const endpoints = connectionEndpoints[connection.id]
          if (!endpoints) return null

          return (
            <ConnectionLine
              key={connection.id}
              from={endpoints.from}
              to={endpoints.to}
              isActive={activeConnections.includes(connection.id)}
            />
          )
        })}

        {/* Stage nodes */}
        {pipelineStages.map(stage => (
          <StageNode
            key={stage.id}
            stage={stage}
            isHighlighted={highlightedStages.includes(stage.id)}
            position={stagePositions[stage.id]}
          />
        ))}

        {/* Technical details overlay */}
        {showTechnical && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 p-3 md:p-4 bg-bg-primary/95 backdrop-blur-sm rounded-lg border border-border"
          >
            <h4 className="text-xs md:text-sm font-semibold text-text-primary mb-1.5 md:mb-2">Technical Details</h4>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4 text-[10px] md:text-xs">
              <div>
                <p className="text-text-muted mb-0.5 md:mb-1">Match Types Used</p>
                <p className="text-text-secondary">10 different matching strategies including name variations, location proximity, and address normalization</p>
              </div>
              <div>
                <p className="text-text-muted mb-0.5 md:mb-1">AI Validation</p>
                <p className="text-text-secondary">10 parallel agents processing 200 owners per batch</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  )
}
