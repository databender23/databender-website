'use client'

import { motion } from 'framer-motion'

interface WaveyBirdieAnimationProps {
  className?: string
  isActive?: boolean
}

export default function WaveyBirdieAnimation({
  className = '',
  isActive = true,
}: WaveyBirdieAnimationProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main bird body */}
      <motion.svg
        viewBox="0 0 48 48"
        className="w-full h-full"
        animate={isActive ? {
          y: [0, -4, 0],
          rotate: [0, 2, -2, 0],
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Bird body */}
        <motion.path
          d="M12 28c0-8.837 7.163-16 16-16s16 7.163 16 16-7.163 16-16 16-16-7.163-16-16z"
          fill="#1A9988"
          opacity={0.9}
        />
        {/* Wing */}
        <motion.path
          d="M8 26c4-6 10-8 16-6"
          stroke="#1A9988"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={isActive ? {
            d: ['M8 26c4-6 10-8 16-6', 'M6 22c4-8 12-10 18-6', 'M8 26c4-6 10-8 16-6'],
          } : {}}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Beak */}
        <path
          d="M40 26l6-2-6-2z"
          fill="#E67E22"
        />
        {/* Eye */}
        <circle cx="36" cy="24" r="2" fill="white" />
        <circle cx="36.5" cy="24" r="1" fill="#1A1A1A" />
      </motion.svg>

      {/* Trailing dots */}
      {isActive && [0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#1A9988]"
          style={{
            width: 4 - i,
            height: 4 - i,
            left: `${10 - i * 8}%`,
            top: '50%',
          }}
          animate={{
            opacity: [0.6, 0.2, 0.6],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
