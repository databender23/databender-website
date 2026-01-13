'use client'

import { motion } from 'framer-motion'

interface HumanAIAnimationProps {
  className?: string
  isActive?: boolean
}

export default function HumanAIAnimation({ className = '', isActive = true }: HumanAIAnimationProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* Human Icon */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        animate={isActive ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="12" cy="7" r="4" fill="#4A4A4A" />
        <path
          d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"
          stroke="#4A4A4A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Connecting Data Flow */}
      <div className="relative flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#1A9988' }}
            animate={isActive ? {
              scale: [1, 1.3, 1],
              opacity: [0.4, 1, 0.4],
            } : {}}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* AI/Robot Icon */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        animate={isActive ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        {/* Robot head */}
        <rect x="5" y="8" width="14" height="12" rx="2" fill="#1A9988" />
        {/* Antenna */}
        <line x1="12" y1="8" x2="12" y2="4" stroke="#1A9988" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1.5" fill="#1A9988" />
        {/* Eyes */}
        <motion.circle
          cx="9"
          cy="13"
          r="1.5"
          fill="white"
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.circle
          cx="15"
          cy="13"
          r="1.5"
          fill="white"
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Mouth */}
        <rect x="9" y="16" width="6" height="2" rx="1" fill="white" />
      </motion.svg>
    </div>
  )
}
