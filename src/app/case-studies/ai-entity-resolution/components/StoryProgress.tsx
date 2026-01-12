'use client'

import { motion } from 'framer-motion'

interface StoryProgressProps {
  currentAct: number // 1-5
  className?: string
}

const acts = [
  { id: 'act1', label: 'The Problem' },
  { id: 'act2', label: 'The Stakes' },
  { id: 'act3', label: 'The Solution' },
  { id: 'act4', label: 'The Transformation' },
  { id: 'act5', label: 'The Results' },
]

export function StoryProgress({ currentAct, className = '' }: StoryProgressProps) {
  const handleDotClick = (actId: string) => {
    const element = document.getElementById(actId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center ${className}`}
      aria-label="Story progress"
    >
      {/* Vertical connecting line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-px h-[calc(100%-24px)] bg-border" />

      {/* Progress fill line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-teal-500 to-teal-500/50 origin-top"
        style={{ top: 12, height: 'calc(100% - 24px)' }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: Math.min((currentAct - 1) / (acts.length - 1), 1) }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Act dots */}
      <div className="relative flex flex-col gap-8">
        {acts.map((act, index) => {
          const actNumber = index + 1
          const isActive = actNumber === currentAct
          const isPast = actNumber < currentAct

          return (
            <div key={act.id} className="relative group">
              {/* Clickable dot */}
              <motion.button
                onClick={() => handleDotClick(act.id)}
                className="relative flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-full"
                aria-label={`Go to ${act.label}`}
                aria-current={isActive ? 'step' : undefined}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Outer glow for active state */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-teal-500/30"
                    initial={{ scale: 1, opacity: 0 }}
                    animate={{ scale: 2, opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Dot background */}
                <motion.div
                  className="relative rounded-full"
                  initial={false}
                  animate={{
                    width: isActive ? 16 : 10,
                    height: isActive ? 16 : 10,
                    backgroundColor: isActive
                      ? '#1A9988'
                      : isPast
                      ? '#22B8A5'
                      : 'rgba(26, 26, 26, 0.2)',
                    boxShadow: isActive
                      ? '0 0 20px rgba(26, 153, 136, 0.6)'
                      : 'none',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />

                {/* Inner dot for past states */}
                {isPast && (
                  <motion.div
                    className="absolute w-2 h-2 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </motion.button>

              {/* Hover label */}
              <motion.div
                className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="hidden group-hover:block px-3 py-1.5 bg-white border border-border rounded-lg shadow-lg whitespace-nowrap">
                  <span className="text-xs font-medium text-text-primary">
                    {act.label}
                  </span>
                </div>
              </motion.div>

              {/* Act number for accessibility */}
              <span className="sr-only">Act {actNumber}: {act.label}</span>
            </div>
          )
        })}
      </div>

      {/* Current act indicator label (always visible) */}
      <motion.div
        className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-text-muted">
          Act {currentAct}
        </span>
      </motion.div>
    </nav>
  )
}

export default StoryProgress
