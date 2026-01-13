'use client'

import { motion } from 'framer-motion'

interface RoadmapAnimationProps {
  className?: string
  isActive?: boolean
}

export default function RoadmapAnimation({
  className = '',
  isActive = true
}: RoadmapAnimationProps) {
  const milestones = [
    { x: 20, y: 80, label: 'Start' },
    { x: 110, y: 50, label: 'Plan' },
    { x: 200, y: 70, label: 'Build' },
    { x: 280, y: 40, label: 'Launch' },
  ]

  const pathD = `M ${milestones[0].x} ${milestones[0].y}
    Q 65 ${milestones[0].y - 20} ${milestones[1].x} ${milestones[1].y}
    Q 155 ${milestones[1].y + 30} ${milestones[2].x} ${milestones[2].y}
    Q 240 ${milestones[2].y - 20} ${milestones[3].x} ${milestones[3].y}`

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg
        viewBox="0 0 300 120"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background path */}
        <path
          d={pathD}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated progress path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#1A9988"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            duration: 2.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 1,
          }}
        />

        {/* Milestone markers */}
        {milestones.map((milestone, index) => (
          <motion.g key={index}>
            {/* Outer ring */}
            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="12"
              fill="white"
              stroke="#1A9988"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                delay: index * 0.4,
                duration: 0.4,
                ease: 'backOut',
              }}
            />

            {/* Inner dot */}
            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="5"
              fill="#1A9988"
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : { scale: 0 }}
              transition={{
                delay: index * 0.4 + 0.2,
                duration: 0.3,
                ease: 'backOut',
              }}
            />

            {/* Pulse effect */}
            <motion.circle
              cx={milestone.x}
              cy={milestone.y}
              r="12"
              fill="none"
              stroke="#1A9988"
              strokeWidth="1"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={isActive ? {
                scale: [1, 1.8],
                opacity: [0.6, 0]
              } : { scale: 1, opacity: 0 }}
              transition={{
                delay: index * 0.4 + 0.5,
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  )
}
