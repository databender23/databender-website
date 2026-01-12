'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

interface DiagramProps {
  reduced?: boolean
  interactive?: boolean
  compact?: boolean
}

interface CaseStudyDiagramProps {
  type: 'entity-resolution' | 'lead-scoring' | 'document-intelligence'
  interactive?: boolean
  compact?: boolean
  className?: string
}

export function CaseStudyDiagram({ type, interactive = true, compact = false, className = '' }: CaseStudyDiagramProps) {
  const prefersReducedMotion = useReducedMotion()

  const diagrams: Record<string, React.FC<DiagramProps>> = {
    'entity-resolution': EntityResolutionDiagram,
    'lead-scoring': LeadScoringDiagram,
    'document-intelligence': DocumentIntelligenceDiagram,
  }

  const DiagramComponent = diagrams[type]
  if (!DiagramComponent) return null

  return (
    <div className={`relative w-full ${compact ? 'h-48' : 'h-80'} ${className}`}>
      <DiagramComponent
        reduced={prefersReducedMotion ?? false}
        interactive={interactive}
        compact={compact}
      />
    </div>
  )
}

// Shared background component
function DiagramBackground({ children, theme = 'purple' }: { children: React.ReactNode, theme?: 'purple' | 'blue' | 'teal' }) {
  const colors = {
    purple: { primary: 'rgba(138, 43, 226, 0.12)', secondary: 'rgba(26, 153, 136, 0.1)', accent: '#a855f7' },
    blue: { primary: 'rgba(59, 130, 246, 0.12)', secondary: 'rgba(34, 197, 94, 0.1)', accent: '#3b82f6' },
    teal: { primary: 'rgba(26, 153, 136, 0.12)', secondary: 'rgba(138, 43, 226, 0.1)', accent: '#14b8a6' },
  }
  const c = colors[theme]

  return (
    <div className="absolute inset-0 rounded-xl overflow-hidden" style={{
      background: 'linear-gradient(145deg, #0f0a1e 0%, #1a1033 40%, #251545 100%)',
    }}>
      {/* Grid pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(${c.accent}10 1px, transparent 1px), linear-gradient(90deg, ${c.accent}10 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />
      {/* Glow effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full" style={{
        background: `radial-gradient(circle, ${c.primary} 0%, transparent 70%)`,
      }} />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full" style={{
        background: `radial-gradient(circle, ${c.secondary} 0%, transparent 70%)`,
      }} />
      {children}
    </div>
  )
}

// Entity Resolution: Pacman Army - each agent processes a lane of data
// Classic Pacman colors: Yellow, Red (Blinky), Pink (Pinky), Cyan (Inky), Orange (Clyde)
function EntityResolutionDiagram({ reduced, interactive: _interactive, compact: _compact }: DiagramProps) {
  // Animation cycle duration
  const cycleDuration = 4

  // 5 processing lanes - each Pacman handles one lane
  const lanes = [
    { y: 20, color: '#FFFF00', name: 'Pac-Man', startDelay: 0 },      // Yellow
    { y: 35, color: '#FF0000', name: 'Blinky', startDelay: 0.3 },     // Red
    { y: 50, color: '#FFB8FF', name: 'Pinky', startDelay: 0.15 },     // Pink
    { y: 65, color: '#00FFDE', name: 'Inky', startDelay: 0.45 },      // Cyan
    { y: 80, color: '#FFB852', name: 'Clyde', startDelay: 0.6 },      // Orange
  ]

  // Messy data chunks per lane (on the right side)
  const messyData = [
    { rot: -8, color: '#ef4444' },
    { rot: 12, color: '#f97316' },
    { rot: -5, color: '#eab308' },
  ]

  // Pacman size
  const pacSize = 5

  // Pacman SVG path generator (facing right)
  const getPacmanPath = (x: number, y: number, size: number, mouthOpen: boolean) => {
    const r = size
    if (!mouthOpen) {
      return `M ${x + r} ${y} A ${r} ${r} 0 1 0 ${x + r} ${y + 0.01} Z`
    }
    const mouthAngle = 30 * (Math.PI / 180)
    const x1 = x + r * Math.cos(mouthAngle)
    const y1 = y - r * Math.sin(mouthAngle)
    const x2 = x + r * Math.cos(-mouthAngle)
    const y2 = y - r * Math.sin(-mouthAngle)
    return `M ${x} ${y} L ${x1} ${y1} A ${r} ${r} 0 1 0 ${x2} ${y2} Z`
  }

  return (
    <DiagramBackground theme="purple">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2" preserveAspectRatio="xMidYMid meet">

        {/* === PROCESSING LANES === */}
        {lanes.map((lane, laneIdx) => (
          <motion.g key={`lane-${laneIdx}`}>

            {/* Lane track line (subtle) */}
            <line
              x1="8"
              y1={lane.y}
              x2="92"
              y2={lane.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="8"
              strokeLinecap="round"
            />

            {/* Messy data chunks on the RIGHT - get eaten */}
            {messyData.map((data, dataIdx) => (
              <motion.rect
                key={`mess-${laneIdx}-${dataIdx}`}
                x={60 + dataIdx * 12}
                y={lane.y - 3}
                width="8"
                height="6"
                rx="1"
                fill={data.color}
                style={{
                  transform: `rotate(${data.rot}deg)`,
                  transformOrigin: `${64 + dataIdx * 12}px ${lane.y}px`
                }}
                initial={{ opacity: 0.8 }}
                animate={reduced ? { opacity: 0.5 } : {
                  opacity: [0.8, 0.8, 0.8, 0, 0],
                  scale: [1, 1, 1, 0, 0],
                }}
                transition={{
                  duration: cycleDuration,
                  delay: lane.startDelay + dataIdx * 0.4,
                  repeat: Infinity,
                  times: [0, 0.3 + dataIdx * 0.15, 0.4 + dataIdx * 0.15, 0.45 + dataIdx * 0.15, 1],
                }}
              />
            ))}

            {/* Dots/pellets in the lane */}
            {[0, 1, 2, 3, 4].map((dotIdx) => (
              <motion.circle
                key={`dot-${laneIdx}-${dotIdx}`}
                cx={25 + dotIdx * 10}
                cy={lane.y}
                r="1.2"
                fill="white"
                initial={{ opacity: 0.6 }}
                animate={reduced ? { opacity: 0.3 } : {
                  opacity: [0.6, 0.6, 0, 0, 0.6],
                }}
                transition={{
                  duration: cycleDuration,
                  delay: lane.startDelay + dotIdx * 0.15,
                  repeat: Infinity,
                  times: [0, 0.2 + dotIdx * 0.1, 0.25 + dotIdx * 0.1, 0.9, 1],
                }}
              />
            ))}

            {/* PACMAN - moves across the lane */}
            <motion.g
              initial={{ x: 0 }}
              animate={reduced ? { x: 40 } : { x: [0, 70, 70, 0] }}
              transition={{
                duration: cycleDuration,
                delay: lane.startDelay,
                repeat: Infinity,
                times: [0, 0.7, 0.9, 1],
                ease: "linear",
              }}
            >
              {/* Pacman body - static open mouth */}
              <path
                d={getPacmanPath(12, lane.y, pacSize, true)}
                fill={lane.color}
              />
              {/* Eye */}
              <circle
                cx={12 + pacSize * 0.3}
                cy={lane.y - pacSize * 0.35}
                r={pacSize * 0.15}
                fill="#000"
              />
            </motion.g>

            {/* CLEAN RESULT - appears on LEFT after processing */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={reduced ? { opacity: 1, scale: 1 } : {
                opacity: [0, 0, 0, 1, 1, 1, 0],
                scale: [0, 0, 0, 1, 1, 1, 0],
              }}
              transition={{
                duration: cycleDuration,
                delay: lane.startDelay,
                repeat: Infinity,
                times: [0, 0.6, 0.65, 0.72, 0.85, 0.92, 1],
              }}
            >
              <rect
                x="2"
                y={lane.y - 4}
                width="8"
                height="8"
                rx="1.5"
                fill="rgba(20, 184, 166, 0.3)"
                stroke="#14b8a6"
                strokeWidth="0.8"
              />
              <text
                x="6"
                y={lane.y + 1.5}
                fill="#14b8a6"
                fontSize="5"
                textAnchor="middle"
                fontWeight="bold"
              >
                ✓
              </text>
            </motion.g>

          </motion.g>
        ))}

        {/* === LABELS === */}
        {/* Left label */}
        <motion.text
          x="6"
          y="96"
          fill="#14b8a6"
          fontSize="3"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Clean
        </motion.text>

        {/* Center label */}
        <motion.text
          x="50"
          y="96"
          fill="#FFFF00"
          fontSize="3"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          5 AI Agents
        </motion.text>

        {/* Right label */}
        <motion.text
          x="80"
          y="96"
          fill="#ef4444"
          fontSize="3"
          fontWeight="bold"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          1.69M Chaos
        </motion.text>

        {/* Divider arrows */}
        <motion.text
          x="28"
          y="96"
          fill="rgba(255,255,255,0.4)"
          fontSize="3"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ←
        </motion.text>
        <motion.text
          x="66"
          y="96"
          fill="rgba(255,255,255,0.4)"
          fontSize="3"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ←
        </motion.text>

      </svg>
    </DiagramBackground>
  )
}

// Lead Scoring: Sequential animation - leads flow in, get scored, list reorders
function LeadScoringDiagram({ reduced, interactive, compact }: DiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Animation cycle: ~8 seconds total, repeats
  // Lead 1 (Website, score 45): enters at 0s, appears in list at 1.5s
  // Lead 2 (Referral, score 78): enters at 2.5s, appears at 4s, reorders list
  // Lead 3 (Phone, score 92): enters at 5s, appears at 6.5s, becomes #1
  const cycleDuration = 8

  // Lead sources (shown on left)
  const leadSources = [
    { icon: '🌐', label: 'Website', color: '#3b82f6', y: 20 },
    { icon: '📞', label: 'Phone', color: '#22c55e', y: 42 },
    { icon: '🤝', label: 'Referral', color: '#f59e0b', y: 64 },
  ]

  // Leads enter sequentially with their eventual scores
  const sequentialLeads = [
    { source: '🌐', score: 45, color: '#6b7280', sourceY: 28, enterDelay: 0 },
    { source: '🤝', score: 78, color: '#f59e0b', sourceY: 72, enterDelay: 2.5 },
    { source: '📞', score: 92, color: '#22c55e', sourceY: 50, enterDelay: 5 },
  ]

  return (
    <DiagramBackground theme="purple">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2" preserveAspectRatio="xMidYMid meet">

        {/* Section Labels */}
        {!compact && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <text x="12" y="10" fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle">Sources</text>
            <text x="50" y="10" fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle">Score</text>
            <text x="86" y="10" fill="rgba(255,255,255,0.4)" fontSize="2.5" textAnchor="middle">Priority</text>
          </motion.g>
        )}

        {/* LEFT: Lead source channels */}
        <motion.g>
          {leadSources.map((source, i) => (
            <motion.g key={source.label}>
              {/* Source channel box */}
              <motion.rect
                x="2"
                y={source.y}
                width="18"
                height="16"
                rx="3"
                fill={source.color}
                opacity="0.15"
                stroke={source.color}
                strokeWidth="0.8"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              />

              {/* Source icon */}
              <motion.text
                x="11"
                y={source.y + 8}
                fontSize="6"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {source.icon}
              </motion.text>

              {/* Source label */}
              {!compact && (
                <motion.text
                  x="11"
                  y={source.y + 14}
                  fill={source.color}
                  fontSize="2"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {source.label}
                </motion.text>
              )}
            </motion.g>
          ))}
        </motion.g>

        {/* CENTER: Scoring Engine */}
        <motion.g
          onMouseEnter={() => interactive && setHoveredNode('scoring')}
          onMouseLeave={() => setHoveredNode(null)}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
        >
          {/* Processing indicator ring */}
          <motion.circle
            cx="50"
            cy="50"
            r="14"
            fill="transparent"
            stroke="#a855f7"
            strokeWidth="0.5"
            strokeDasharray="4 2"
            initial={{ rotate: 0 }}
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />

          {/* Main scoring hub */}
          <motion.rect
            x="38"
            y="38"
            width="24"
            height="24"
            rx="4"
            fill="#1a1033"
            stroke="#a855f7"
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
          />

          {/* Scoring icon */}
          <text x="50" y="48" fontSize="6" textAnchor="middle">⚡</text>
          <text x="50" y="57" fill="#a855f7" fontSize="3" fontWeight="bold" textAnchor="middle">SCORE</text>

          {/* Data signals around hub */}
          <motion.g>
            <motion.circle cx="38" cy="38" r="3" fill="#f59e0b" opacity="0.3" />
            <text x="38" y="39" fontSize="3" textAnchor="middle">⏰</text>
            <motion.circle cx="62" cy="38" r="3" fill="#22c55e" opacity="0.3" />
            <text x="62" y="39" fontSize="3" textAnchor="middle">💰</text>
            <motion.circle cx="50" cy="66" r="3" fill="#3b82f6" opacity="0.3" />
            <text x="50" y="67" fontSize="3" textAnchor="middle">📍</text>
          </motion.g>

          {/* Tooltip */}
          {hoveredNode === 'scoring' && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <rect x="30" y="72" width="40" height="8" rx="2" fill="rgba(0,0,0,0.95)" />
              <text x="50" y="78" fill="white" fontSize="2.5" textAnchor="middle">Enriches with external data</text>
            </motion.g>
          )}
        </motion.g>

        {/* ANIMATED LEADS flowing in sequentially */}
        {sequentialLeads.map((lead, i) => (
          <motion.g key={`flow-${i}`}>
            {/* Lead dot traveling from source to scorer */}
            <motion.circle
              r="3"
              fill={lead.color}
              initial={{ opacity: 0 }}
              animate={reduced ? { opacity: 0.6, cx: 50, cy: 50 } : {
                opacity: [0, 1, 1, 1, 0],
                cx: [20, 30, 50, 50, 50],
                cy: [lead.sourceY, lead.sourceY, 50, 50, 50],
              }}
              transition={{
                duration: 1.5,
                delay: lead.enterDelay,
                repeat: Infinity,
                repeatDelay: cycleDuration - 1.5,
                times: [0, 0.2, 0.6, 0.8, 1],
              }}
            />

            {/* Score popup when lead is processed */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={reduced ? { opacity: 1, scale: 1 } : {
                opacity: [0, 0, 1, 1, 0],
                scale: [0, 0, 1.2, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: lead.enterDelay + 0.8,
                repeat: Infinity,
                repeatDelay: cycleDuration - 2,
                times: [0, 0.1, 0.3, 0.8, 1],
              }}
            >
              <circle cx="50" cy="50" r="8" fill={lead.color} opacity="0.3" />
              <text x="50" y="53" fill="white" fontSize="5" fontWeight="bold" textAnchor="middle">
                {lead.score}
              </text>
            </motion.g>
          </motion.g>
        ))}

        {/* RIGHT: Dynamic ranked list that builds and reorders */}
        <motion.g>
          {/* Lead 1: Website (45) - starts at position 1, moves to position 3 */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={reduced ? { opacity: 1, x: 0, y: 48 } : {
              opacity: [0, 0, 1, 1, 1, 1, 1],
              x: [20, 20, 0, 0, 0, 0, 0],
              y: [0, 0, 0, 0, 24, 24, 48],
            }}
            transition={{
              duration: cycleDuration,
              delay: 0,
              repeat: Infinity,
              times: [0, 0.15, 0.22, 0.45, 0.52, 0.75, 0.82],
            }}
          >
            <rect x="73" y="16" width="24" height="18" rx="3" fill="#6b7280" opacity="0.2" stroke="#6b7280" strokeWidth="1" />
            <circle cx="78" cy="21" r="3.5" fill="#6b7280" />
            <text x="78" y="23" fill="white" fontSize="3.5" fontWeight="bold" textAnchor="middle">3</text>
            <text x="86" y="21" fontSize="3.5" textAnchor="middle">🌐</text>
            <text x="92" y="21" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle">45</text>
          </motion.g>

          {/* Lead 2: Referral (78) - appears, then moves to position 2 */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={reduced ? { opacity: 1, x: 0, y: 24 } : {
              opacity: [0, 0, 0, 0, 1, 1, 1],
              x: [20, 20, 20, 20, 0, 0, 0],
              y: [0, 0, 0, 0, 0, 0, 24],
            }}
            transition={{
              duration: cycleDuration,
              delay: 0,
              repeat: Infinity,
              times: [0, 0.3, 0.45, 0.48, 0.52, 0.75, 0.82],
            }}
          >
            <rect x="73" y="16" width="24" height="18" rx="3" fill="#f59e0b" opacity="0.25" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="78" cy="21" r="3.5" fill="#f59e0b" />
            <text x="78" y="23" fill="white" fontSize="3.5" fontWeight="bold" textAnchor="middle">2</text>
            <text x="86" y="21" fontSize="3.5" textAnchor="middle">🤝</text>
            <text x="92" y="21" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle">78</text>
          </motion.g>

          {/* Lead 3: Phone (92) - appears at #1, stays #1 */}
          <motion.g
            initial={{ opacity: 0, x: 20 }}
            animate={reduced ? { opacity: 1, x: 0, y: 0 } : {
              opacity: [0, 0, 0, 0, 0, 0, 1],
              x: [20, 20, 20, 20, 20, 20, 0],
            }}
            transition={{
              duration: cycleDuration,
              delay: 0,
              repeat: Infinity,
              times: [0, 0.5, 0.6, 0.7, 0.78, 0.8, 0.85],
            }}
          >
            <rect x="73" y="16" width="24" height="18" rx="3" fill="#22c55e" opacity="0.35" stroke="#22c55e" strokeWidth="1" />
            <circle cx="78" cy="21" r="3.5" fill="#22c55e" />
            <text x="78" y="23" fill="white" fontSize="3.5" fontWeight="bold" textAnchor="middle">1</text>
            <text x="86" y="21" fontSize="3.5" textAnchor="middle">📞</text>
            <text x="92" y="21" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle">92</text>

            {/* Call first indicator */}
            {!compact && (
              <motion.text
                x="85"
                y="37"
                fill="#22c55e"
                fontSize="2"
                textAnchor="middle"
                animate={reduced ? { opacity: 1 } : { opacity: [0, 1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ← Call first
              </motion.text>
            )}
          </motion.g>

          {/* Ranking column header - shows final state */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Column divider lines */}
            <line x1="73" y1="14" x2="97" y2="14" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="73" y1="82" x2="97" y2="82" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </motion.g>
        </motion.g>

        {/* Hero metric */}
        {!compact && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <rect x="73" y="86" width="24" height="10" rx="2" fill="rgba(34, 197, 94, 0.15)" />
            <text x="85" y="93" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle">
              31<tspan fill="#22c55e" fontSize="3">%</tspan>
              <tspan fill="rgba(255,255,255,0.5)" fontSize="2"> better</tspan>
            </text>
          </motion.g>
        )}

        {/* Bottom label */}
        {!compact && (
          <motion.text
            x="12"
            y="92"
            fill="rgba(255,255,255,0.3)"
            fontSize="2"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            All channels
          </motion.text>
        )}
      </svg>
    </DiagramBackground>
  )
}

// Document Intelligence: Cloud of Files Flow
// Question pops up → AI crawls through file cloud → Insights generated
function DocumentIntelligenceDiagram({ reduced, interactive: _interactive, compact }: DiagramProps) {
  // Files arranged in a cloud formation (center of diagram)
  const fileCloud = [
    { icon: '📄', x: 38, y: 32 },  // top left
    { icon: '📊', x: 52, y: 28 },  // top center
    { icon: '📧', x: 62, y: 35 },  // top right
    { icon: '🖼️', x: 35, y: 48 },  // middle left
    { icon: '📝', x: 50, y: 50 },  // center
    { icon: '💬', x: 65, y: 50 },  // middle right
    { icon: '📹', x: 42, y: 65 },  // bottom left
    { icon: '📑', x: 58, y: 68 },  // bottom right
  ]

  // Animation cycle duration
  const cycleDuration = 8

  return (
    <DiagramBackground theme="teal">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2" preserveAspectRatio="xMidYMid meet">

        {/* === LEFT: USER ASKS QUESTION === */}
        <motion.g>
          {/* User icon - always visible */}
          <circle cx="10" cy="50" r="7" fill="rgba(59, 130, 246, 0.15)" />
          <text x="10" y="54" fontSize="9" textAnchor="middle">👤</text>

          {/* Question bubble - POPS UP as Step 1 */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={reduced ? { opacity: 1, scale: 1 } : {
              opacity: [0, 0, 1, 1, 1, 1, 1, 0],
              scale: [0, 0, 1.2, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: cycleDuration,
              repeat: Infinity,
              times: [0, 0.02, 0.08, 0.12, 0.8, 0.85, 0.9, 1],
            }}
          >
            <circle cx="18" cy="38" r="5" fill="rgba(59, 130, 246, 0.4)" />
            <text x="18" y="40" fontSize="5" textAnchor="middle">❓</text>
          </motion.g>

          {!compact && (
            <text x="10" y="66" fill="rgba(255,255,255,0.4)" fontSize="2" textAnchor="middle">Ask</text>
          )}
        </motion.g>

        {/* Arrow from question to cloud */}
        <motion.path
          d="M 22 45 Q 28 45 32 42"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={reduced ? { pathLength: 1, opacity: 0.5 } : {
            pathLength: [0, 0, 1, 1, 1, 1],
            opacity: [0, 0, 0.7, 0.7, 0.7, 0],
          }}
          transition={{
            duration: cycleDuration,
            repeat: Infinity,
            times: [0, 0.1, 0.18, 0.7, 0.85, 1],
          }}
        />

        {/* === CENTER: FILE CLOUD === */}
        {/* Cloud background shape */}
        <ellipse cx="50" cy="50" rx="22" ry="25" fill="rgba(255,255,255,0.03)" />

        {/* Files in cloud formation */}
        {fileCloud.map((file, i) => (
          <motion.g key={`cloud-file-${i}`}>
            {/* File icon */}
            <motion.text
              x={file.x}
              y={file.y}
              fontSize="8"
              textAnchor="middle"
              initial={{ opacity: 0.5 }}
              animate={reduced ? { opacity: 0.6 } : {
                opacity: [0.4, 0.4, 0.4, 1, 0.4, 0.4],
              }}
              transition={{
                duration: cycleDuration,
                repeat: Infinity,
                times: [0, 0.15 + i * 0.06, 0.18 + i * 0.06, 0.24 + i * 0.06, 0.30 + i * 0.06, 1],
              }}
            >
              {file.icon}
            </motion.text>

            {/* Scan ring - appears when this file is being scanned */}
            <motion.circle
              cx={file.x}
              cy={file.y - 2}
              r="6"
              fill="transparent"
              stroke="#14b8a6"
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={reduced ? { opacity: 0 } : {
                opacity: [0, 0, 0, 1, 0, 0],
                scale: [0.5, 0.5, 0.5, 1.1, 1.2, 0.5],
              }}
              transition={{
                duration: cycleDuration,
                repeat: Infinity,
                times: [0, 0.15 + i * 0.06, 0.18 + i * 0.06, 0.24 + i * 0.06, 0.30 + i * 0.06, 1],
              }}
            />

            {/* Small checkmark after scan */}
            <motion.g
              initial={{ opacity: 0, scale: 0 }}
              animate={reduced ? { opacity: 0.5, scale: 1 } : {
                opacity: [0, 0, 0, 0, 1, 1, 0],
                scale: [0, 0, 0, 0, 1, 1, 0],
              }}
              transition={{
                duration: cycleDuration,
                repeat: Infinity,
                times: [0, 0.15 + i * 0.06, 0.24 + i * 0.06, 0.28 + i * 0.06, 0.32 + i * 0.06, 0.85, 1],
              }}
            >
              <circle cx={file.x + 4} cy={file.y - 6} r="2" fill="#22c55e" />
              <text x={file.x + 4} y={file.y - 4.5} fill="white" fontSize="2.5" textAnchor="middle">✓</text>
            </motion.g>
          </motion.g>
        ))}

        {/* Central scanning indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0 } : {
            opacity: [0, 0, 1, 1, 1, 0, 0],
          }}
          transition={{
            duration: cycleDuration,
            repeat: Infinity,
            times: [0, 0.12, 0.18, 0.6, 0.65, 0.7, 1],
          }}
        >
          {/* Pulsing scan effect in center */}
          <motion.circle
            cx="50"
            cy="50"
            r="18"
            fill="transparent"
            stroke="#14b8a6"
            strokeWidth="0.5"
            strokeDasharray="3 2"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '50px 50px' }}
          />
          <text x="50" y="52" fontSize="6" textAnchor="middle">🔍</text>
        </motion.g>

        {!compact && (
          <motion.text
            x="50"
            y="82"
            fill="rgba(255,255,255,0.4)"
            fontSize="2"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Your files
          </motion.text>
        )}

        {/* Arrow from cloud to answer */}
        <motion.path
          d="M 72 50 L 78 50"
          fill="none"
          stroke="#14b8a6"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={reduced ? { pathLength: 1, opacity: 0.5 } : {
            pathLength: [0, 0, 0, 0, 1, 1, 0],
            opacity: [0, 0, 0, 0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: cycleDuration,
            repeat: Infinity,
            times: [0, 0.6, 0.65, 0.68, 0.72, 0.9, 1],
          }}
        />

        {/* === RIGHT: INSIGHTS/ANSWER === */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={reduced ? { opacity: 1, scale: 1 } : {
            opacity: [0, 0, 0, 0, 0, 1, 1, 0],
            scale: [0.8, 0.8, 0.8, 0.8, 0.8, 1, 1, 0.8],
          }}
          transition={{
            duration: cycleDuration,
            repeat: Infinity,
            times: [0, 0.6, 0.65, 0.7, 0.72, 0.78, 0.9, 1],
          }}
        >
          {/* Answer card */}
          <rect x="80" y="34" width="16" height="32" rx="2" fill="rgba(34, 197, 94, 0.2)" />

          {/* Insights icon */}
          <text x="88" y="44" fontSize="8" textAnchor="middle">💡</text>

          {/* Chart representation */}
          <rect x="83" y="50" width="3" height="6" rx="0.5" fill="#22c55e" opacity="0.8" />
          <rect x="87" y="48" width="3" height="8" rx="0.5" fill="#14b8a6" opacity="0.8" />
          <rect x="91" y="52" width="3" height="4" rx="0.5" fill="#22c55e" opacity="0.6" />

          {/* Text lines */}
          <rect x="83" y="60" width="10" height="1.5" rx="0.5" fill="rgba(255,255,255,0.3)" />
          <rect x="83" y="63" width="8" height="1.5" rx="0.5" fill="rgba(255,255,255,0.2)" />

          {!compact && (
            <text x="88" y="74" fill="rgba(255,255,255,0.4)" fontSize="2" textAnchor="middle">Insights</text>
          )}
        </motion.g>

        {/* Title at top */}
        {!compact && (
          <motion.text
            x="50"
            y="10"
            fill="white"
            fontSize="3"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Ask a Question → AI Searches → Get Insights
          </motion.text>
        )}

        {/* Bottom tagline */}
        {!compact && (
          <motion.text
            x="50"
            y="94"
            fill="rgba(255,255,255,0.3)"
            fontSize="2"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            PDFs • Docs • Emails • Images • Videos • More
          </motion.text>
        )}
      </svg>
    </DiagramBackground>
  )
}

export { EntityResolutionDiagram, LeadScoringDiagram, DocumentIntelligenceDiagram }
