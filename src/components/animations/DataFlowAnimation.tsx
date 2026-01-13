'use client'

import { motion } from 'framer-motion'

interface DataFlowAnimationProps {
  className?: string
  isActive?: boolean
}

export default function DataFlowAnimation({
  className = '',
  isActive = true
}: DataFlowAnimationProps) {
  const teal = '#1A9988'
  const tealLight = '#2BB3A0'

  const nodes = [
    { x: 40, icon: 'M4 4h4v4H4V4zm0 6h4v4H4v-4zm0 6h4v4H4v-4zm6-12h4v4h-4V4zm0 6h4v4h-4v-4zm0 6h4v4h-4v-4z' },
    { x: 120, icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
    { x: 200, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 240 80"
        className="w-full h-auto max-w-[300px] mx-auto"
        style={{ background: 'transparent' }}
      >
        {/* Connecting lines */}
        <path
          d="M 56 40 L 104 40 M 136 40 L 184 40"
          stroke={teal}
          strokeWidth="2"
          strokeOpacity="0.3"
          fill="none"
        />

        {/* Flowing particles */}
        {isActive && [0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            r="3"
            fill={tealLight}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              cx: [56, 104, 136, 184],
              cy: [40, 40, 40, 40],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            {/* Node background */}
            <motion.circle
              cx={node.x}
              cy={40}
              r="16"
              fill="white"
              stroke={teal}
              strokeWidth="2"
              initial={{ scale: 0.9 }}
              animate={isActive ? {
                scale: [0.95, 1, 0.95],
              } : { scale: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Pulse effect */}
            {isActive && (
              <motion.circle
                cx={node.x}
                cy={40}
                r="16"
                fill="none"
                stroke={teal}
                strokeWidth="1"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.4,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            )}

            {/* Icon */}
            <g transform={`translate(${node.x - 8}, 32)`}>
              <path
                d={node.icon}
                fill="none"
                stroke={teal}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="scale(0.7)"
              />
            </g>
          </g>
        ))}

        {/* Labels */}
        <text x={nodes[0].x} y="68" textAnchor="middle" fill="#6B7280" fontSize="8" fontWeight="500">
          Source
        </text>
        <text x={nodes[1].x} y="68" textAnchor="middle" fill="#6B7280" fontSize="8" fontWeight="500">
          Process
        </text>
        <text x={nodes[2].x} y="68" textAnchor="middle" fill="#6B7280" fontSize="8" fontWeight="500">
          Insight
        </text>
      </svg>
    </div>
  )
}
