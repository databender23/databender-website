'use client'

import { motion } from 'framer-motion'

interface StudentAnimationProps {
  className?: string
  isActive?: boolean
}

export default function StudentAnimation({ className = '', isActive = true }: StudentAnimationProps) {
  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }

  const floatDelayed = (delay: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay,
    },
  })

  return (
    <div className={`relative w-full h-full min-h-[200px] ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Central Graduation Cap */}
        <motion.g animate={isActive ? floatAnimation : {}}>
          {/* Cap top */}
          <polygon
            points="100,60 140,80 100,100 60,80"
            fill="#1A9988"
          />
          {/* Cap base */}
          <rect x="85" y="95" width="30" height="8" rx="2" fill="#158276" />
          {/* Tassel */}
          <line x1="140" y1="80" x2="150" y2="100" stroke="#1A9988" strokeWidth="2" />
          <circle cx="150" cy="105" r="4" fill="#1A9988" />
        </motion.g>

        {/* Floating Lightbulb - top left */}
        <motion.g animate={isActive ? floatDelayed(0.5) : {}}>
          <circle cx="50" cy="55" r="12" fill="#FCD34D" opacity="0.9" />
          <rect x="46" y="67" width="8" height="6" rx="1" fill="#9CA3AF" />
          <path d="M50 48 L50 42" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
          <path d="M43 51 L38 48" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
          <path d="M57 51 L62 48" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
        </motion.g>

        {/* Floating Document - top right */}
        <motion.g animate={isActive ? floatDelayed(1) : {}}>
          <rect x="140" y="45" width="20" height="26" rx="2" fill="white" stroke="#1A9988" strokeWidth="1.5" />
          <line x1="144" y1="53" x2="156" y2="53" stroke="#1A9988" strokeWidth="1" opacity="0.5" />
          <line x1="144" y1="58" x2="156" y2="58" stroke="#1A9988" strokeWidth="1" opacity="0.5" />
          <line x1="144" y1="63" x2="152" y2="63" stroke="#1A9988" strokeWidth="1" opacity="0.5" />
        </motion.g>

        {/* Floating Pencil - bottom */}
        <motion.g animate={isActive ? floatDelayed(1.5) : {}}>
          <rect x="75" y="135" width="50" height="8" rx="1" fill="#F59E0B" />
          <polygon points="125,135 125,143 132,139" fill="#FCD34D" />
          <polygon points="132,139 135,139 133.5,136 133.5,142" fill="#374151" />
          <rect x="70" y="135" width="5" height="8" fill="#F472B6" />
        </motion.g>

        {/* Subtle background circle */}
        <circle cx="100" cy="100" r="70" fill="#1A9988" opacity="0.05" />
      </svg>
    </div>
  )
}
