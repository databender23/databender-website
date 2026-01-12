'use client'

import { motion } from 'framer-motion'
import { storyProgressLabels } from './DiagramConfig'

interface StoryProgressProps {
  currentAct: number
  className?: string
}

export default function StoryProgress({ currentAct, className = '' }: StoryProgressProps) {
  const handleClick = (anchor: string) => {
    const element = document.getElementById(anchor)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 ${className}`}
      aria-label="Story progress"
    >
      {storyProgressLabels.map((act) => {
        const isActive = currentAct === act.id
        const isPast = currentAct > act.id

        return (
          <button
            key={act.id}
            onClick={() => handleClick(act.anchor)}
            className="group relative flex items-center gap-3"
            aria-label={`Go to ${act.label}`}
            aria-current={isActive ? 'step' : undefined}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                isActive
                  ? 'bg-teal-500 border-teal-500'
                  : isPast
                  ? 'bg-teal-500/50 border-teal-500/50'
                  : 'bg-transparent border-text-muted/30'
              }`}
              animate={{ scale: isActive ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <span
              className={`absolute left-6 whitespace-nowrap text-sm font-medium
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${isActive ? 'text-teal-500' : 'text-text-secondary'}`}
            >
              {act.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
