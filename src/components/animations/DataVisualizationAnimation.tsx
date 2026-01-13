'use client'

import { motion } from 'framer-motion'

interface DataVisualizationAnimationProps {
  className?: string
  isActive?: boolean
}

export default function DataVisualizationAnimation({
  className = '',
  isActive = true,
}: DataVisualizationAnimationProps) {
  const barHeights = [60, 85, 45, 95, 70, 80, 55]
  const teal = '#1A9988'

  return (
    <div className={`relative w-full h-full flex items-end justify-center gap-2 p-4 ${className}`}>
      {/* Animated bars */}
      {barHeights.map((height, index) => (
        <motion.div
          key={index}
          className="w-6 rounded-t-sm"
          style={{ backgroundColor: teal }}
          initial={{ height: 0, opacity: 0 }}
          animate={
            isActive
              ? {
                  height: `${height}%`,
                  opacity: [0.6, 1, 0.8],
                }
              : { height: 0, opacity: 0 }
          }
          transition={{
            height: {
              duration: 0.8,
              delay: index * 0.1,
              ease: 'easeOut',
            },
            opacity: {
              duration: 2,
              delay: index * 0.1 + 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        />
      ))}

      {/* Baseline */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 h-0.5"
        style={{ backgroundColor: teal }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isActive ? { scaleX: 1, opacity: 0.3 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Grid lines */}
      {[25, 50, 75].map((position) => (
        <motion.div
          key={position}
          className="absolute left-4 right-4 h-px"
          style={{ bottom: `${position}%`, backgroundColor: teal }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      ))}
    </div>
  )
}
