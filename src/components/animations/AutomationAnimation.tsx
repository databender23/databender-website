'use client'

import { motion } from 'framer-motion'

interface AutomationAnimationProps {
  className?: string
  isActive?: boolean
}

export default function AutomationAnimation({
  className = '',
  isActive = true
}: AutomationAnimationProps) {
  const teal = '#1A9988'
  const tealLight = '#2AB9A5'
  const gray = '#E5E7EB'
  const grayDark = '#9CA3AF'

  // Node positions for workflow
  const nodes = [
    { id: 'input', x: 50, y: 150, icon: 'gear' },
    { id: 'process', x: 200, y: 80, icon: 'robot' },
    { id: 'auto', x: 200, y: 220, icon: 'lightning' },
    { id: 'loop', x: 350, y: 150, icon: 'loop' },
    { id: 'output', x: 500, y: 150, icon: 'check' },
  ]

  // Connection paths between nodes
  const connections = [
    { from: 'input', to: 'process', path: 'M 80 150 Q 140 80 170 80' },
    { from: 'input', to: 'auto', path: 'M 80 150 Q 140 220 170 220' },
    { from: 'process', to: 'loop', path: 'M 230 80 Q 290 80 320 150' },
    { from: 'auto', to: 'loop', path: 'M 230 220 Q 290 220 320 150' },
    { from: 'loop', to: 'output', path: 'M 380 150 L 470 150' },
  ]

  const renderIcon = (icon: string, isActive: boolean) => {
    const iconColor = isActive ? teal : grayDark

    switch (icon) {
      case 'gear':
        return (
          <motion.g
            animate={isActive ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0px 0px' }}
          >
            <path
              d="M0 -12 L3 -12 L4 -9 L7 -10 L9 -7 L7 -5 L9 -3 L12 -4 L12 0 L12 4 L9 3 L7 5 L9 7 L7 10 L4 9 L3 12 L0 12 L-3 12 L-4 9 L-7 10 L-9 7 L-7 5 L-9 3 L-12 4 L-12 0 L-12 -4 L-9 -3 L-7 -5 L-9 -7 L-7 -10 L-4 -9 L-3 -12 Z"
              fill={iconColor}
              stroke="none"
            />
            <circle cx="0" cy="0" r="5" fill="white" />
          </motion.g>
        )
      case 'robot':
        return (
          <g>
            <rect x="-10" y="-8" width="20" height="16" rx="3" fill={iconColor} />
            <circle cx="-4" cy="-2" r="2.5" fill="white" />
            <circle cx="4" cy="-2" r="2.5" fill="white" />
            <rect x="-5" y="4" width="10" height="2" rx="1" fill="white" />
            <rect x="-2" y="-14" width="4" height="6" rx="2" fill={iconColor} />
            <motion.circle
              cx="0"
              cy="-14"
              r="2"
              fill={tealLight}
              animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>
        )
      case 'lightning':
        return (
          <motion.path
            d="M2 -12 L-6 2 L0 2 L-2 12 L6 -2 L0 -2 Z"
            fill={iconColor}
            animate={isActive ? { opacity: [1, 0.5, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )
      case 'loop':
        return (
          <motion.g
            animate={isActive ? { rotate: 360 } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '0px 0px' }}
          >
            <path
              d="M8 -4 A9 9 0 1 0 8 4"
              fill="none"
              stroke={iconColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M5 -8 L9 -4 L5 0" fill="none" stroke={iconColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </motion.g>
        )
      case 'check':
        return (
          <motion.path
            d="M-8 0 L-3 5 L8 -6"
            fill="none"
            stroke={iconColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <svg
        viewBox="0 0 550 300"
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        {/* Connection lines */}
        {connections.map((conn, index) => (
          <g key={conn.from + conn.to}>
            {/* Base path */}
            <path
              d={conn.path}
              fill="none"
              stroke={gray}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Animated flow particle */}
            {isActive && (
              <motion.circle
                r="4"
                fill={teal}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.4,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${index * 0.4}s`}
                  path={conn.path}
                />
              </motion.circle>
            )}
            {/* Second particle for denser flow */}
            {isActive && (
              <motion.circle
                r="3"
                fill={tealLight}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.4 + 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${index * 0.4 + 1}s`}
                  path={conn.path}
                />
              </motion.circle>
            )}
          </g>
        ))}

        {/* Arrow heads on connections */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={gray} />
          </marker>
        </defs>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.5 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {/* Node background circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="28"
              fill="white"
              stroke={isActive ? teal : gray}
              strokeWidth="2"
              animate={isActive ? {
                boxShadow: ['0 0 0 0 rgba(26, 153, 136, 0)', '0 0 0 8px rgba(26, 153, 136, 0.2)', '0 0 0 0 rgba(26, 153, 136, 0)']
              } : {}}
            />
            {/* Pulse ring effect */}
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="28"
                fill="none"
                stroke={teal}
                strokeWidth="2"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{
                  scale: [1, 1.3],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            )}
            {/* Icon */}
            <g transform={`translate(${node.x}, ${node.y})`}>
              {renderIcon(node.icon, isActive)}
            </g>
          </motion.g>
        ))}

        {/* Labels */}
        <text x="50" y="195" textAnchor="middle" fill={grayDark} fontSize="11" fontWeight="500">
          Input
        </text>
        <text x="200" y="125" textAnchor="middle" fill={grayDark} fontSize="11" fontWeight="500">
          AI Process
        </text>
        <text x="200" y="265" textAnchor="middle" fill={grayDark} fontSize="11" fontWeight="500">
          Automate
        </text>
        <text x="350" y="195" textAnchor="middle" fill={grayDark} fontSize="11" fontWeight="500">
          Iterate
        </text>
        <text x="500" y="195" textAnchor="middle" fill={grayDark} fontSize="11" fontWeight="500">
          Complete
        </text>
      </svg>
    </div>
  )
}
