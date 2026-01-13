'use client'

import { motion } from 'framer-motion'

interface AssistantBotAnimationProps {
  className?: string
  isActive?: boolean
}

export default function AssistantBotAnimation({
  className = '',
  isActive = true
}: AssistantBotAnimationProps) {
  const teal = '#1A9988'

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      {/* Floating chat bubbles */}
      <motion.div
        className="absolute top-0 right-0 w-6 h-4 rounded-full"
        style={{ backgroundColor: teal, opacity: 0.6 }}
        animate={isActive ? {
          y: [0, -6, 0],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-4 left-0 w-5 h-3 rounded-full"
        style={{ backgroundColor: teal, opacity: 0.4 }}
        animate={isActive ? {
          y: [0, -4, 0],
          scale: [1, 1.15, 1],
        } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-4 h-3 rounded-full"
        style={{ backgroundColor: teal, opacity: 0.5 }}
        animate={isActive ? {
          y: [0, -5, 0],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* Robot head */}
      <motion.div
        className="absolute inset-4 rounded-2xl border-2 flex flex-col items-center justify-center"
        style={{ borderColor: teal, backgroundColor: 'rgba(26, 153, 136, 0.08)' }}
        animate={isActive ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Antenna */}
        <motion.div
          className="absolute -top-3 w-2 h-3 rounded-full"
          style={{ backgroundColor: teal }}
          animate={isActive ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Eyes container */}
        <div className="flex gap-4 mb-2">
          {/* Left eye */}
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: teal }}
            animate={isActive ? {
              scaleY: [1, 0.1, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Right eye */}
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: teal }}
            animate={isActive ? {
              scaleY: [1, 0.1, 1],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        {/* Smile */}
        <motion.div
          className="w-8 h-2 rounded-b-full"
          style={{ backgroundColor: teal, opacity: 0.7 }}
          animate={isActive ? { scaleX: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  )
}
