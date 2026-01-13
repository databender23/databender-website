'use client'

import { motion } from 'framer-motion'

interface ProfessionalServicesAnimationProps {
  className?: string
  isActive?: boolean
}

interface FloatingIcon {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  icon: 'person' | 'document' | 'chart' | 'presentation' | 'lightbulb' | 'checkmark'
}

const floatingIcons: FloatingIcon[] = [
  { id: 1, x: 15, y: 20, delay: 0, duration: 4, icon: 'person' },
  { id: 2, x: 80, y: 25, delay: 0.5, duration: 4.5, icon: 'document' },
  { id: 3, x: 20, y: 75, delay: 1, duration: 5, icon: 'chart' },
  { id: 4, x: 85, y: 70, delay: 0.3, duration: 4.2, icon: 'presentation' },
  { id: 5, x: 50, y: 10, delay: 0.7, duration: 4.8, icon: 'lightbulb' },
  { id: 6, x: 50, y: 85, delay: 0.2, duration: 4.3, icon: 'checkmark' },
]

const IconComponents: Record<FloatingIcon['icon'], React.ReactNode> = {
  person: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  chart: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  presentation: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  lightbulb: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
  checkmark: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
}

export default function ProfessionalServicesAnimation({
  className = '',
  isActive = true,
}: ProfessionalServicesAnimationProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Central Briefcase Icon */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={
          isActive
            ? {
                scale: [1, 1.05, 1],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-[#1A9988] to-[#147a6c] shadow-lg flex items-center justify-center">
          <svg
            className="w-10 h-10 md:w-12 md:h-12 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Floating Service Icons */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={
            isActive
              ? {
                  y: [0, -8, 0, 8, 0],
                  x: [0, 3, 0, -3, 0],
                }
              : {}
          }
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white border border-gray-200 shadow-md flex items-center justify-center text-[#1A9988]">
            {IconComponents[icon.icon]}
          </div>
        </motion.div>
      ))}

      {/* Subtle connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.line
            key={`line-${icon.id}`}
            x1="50%"
            y1="50%"
            x2={`${icon.x}%`}
            y2={`${icon.y}%`}
            stroke="rgba(26, 153, 136, 0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={
              isActive
                ? {
                    opacity: [0.15, 0.3, 0.15],
                  }
                : { opacity: 0.15 }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: icon.delay,
            }}
          />
        ))}
      </svg>

      {/* Ambient glow behind central icon */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1A9988]/10 blur-xl -z-10"
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
