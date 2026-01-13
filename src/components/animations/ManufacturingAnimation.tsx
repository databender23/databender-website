'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface ManufacturingAnimationProps {
  className?: string
  isActive?: boolean
}

interface FloatingElement {
  id: number
  x: number
  y: number
  type: 'gear' | 'wrench' | 'robot' | 'conveyor' | 'chart' | 'checkmark'
  size: 'sm' | 'md'
  duration: number
  delay: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateFloatingElements(count: number, seed: number): FloatingElement[] {
  const types: FloatingElement['type'][] = ['gear', 'wrench', 'robot', 'conveyor', 'chart', 'checkmark']
  const sizes: FloatingElement['size'][] = ['sm', 'md']

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 5 + seededRandom(seed + i * 5) * 90,
    y: 5 + seededRandom(seed + i * 5 + 1) * 90,
    type: types[Math.floor(seededRandom(seed + i * 5 + 2) * types.length)],
    size: sizes[Math.floor(seededRandom(seed + i * 5 + 3) * sizes.length)],
    duration: 3 + seededRandom(seed + i * 5 + 4) * 2,
    delay: seededRandom(seed + i * 5 + 4) * 2,
  }))
}

// Icon components for manufacturing elements
function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z"
      />
    </svg>
  )
}

function RobotArmIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  )
}

function ConveyorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16h16M4 16l2-2m-2 2l2 2m14-2l-2-2m2 2l-2 2" />
      <rect x="6" y="8" width="12" height="4" rx="1" strokeWidth={1.5} />
    </svg>
  )
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  )
}

function CheckmarkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

// Central factory/gear icon
function CentralGearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 80 80">
      {/* Outer gear teeth */}
      <path
        stroke="currentColor"
        strokeWidth={2}
        d="M40 8l3 6h-6l3-6zm0 64l-3-6h6l-3 6zM8 40l6-3v6l-6-3zm64 0l-6 3v-6l6 3zM14.5 14.5l5.5 3.5-3.5 3.5-2-7zm51 0l-2 7-3.5-3.5 5.5-3.5zm0 51l-5.5-3.5 3.5-3.5 2 7zm-51 0l2-7 3.5 3.5-5.5 3.5z"
      />
      {/* Main gear body */}
      <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth={2.5} />
      {/* Inner circle */}
      <circle cx="40" cy="40" r="12" stroke="currentColor" strokeWidth={2} />
      {/* Center dot */}
      <circle cx="40" cy="40" r="4" fill="currentColor" />
    </svg>
  )
}

export default function ManufacturingAnimation({
  className = '',
  isActive = true
}: ManufacturingAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [elements, setElements] = useState<FloatingElement[]>([])
  const seedRef = useRef(123)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const elementCount = isMobile ? 6 : 10
    setElements(generateFloatingElements(elementCount, seedRef.current))
  }, [isMobile])

  const getIcon = (type: FloatingElement['type'], sizeClass: string) => {
    const icons = {
      gear: <GearIcon className={sizeClass} />,
      wrench: <WrenchIcon className={sizeClass} />,
      robot: <RobotArmIcon className={sizeClass} />,
      conveyor: <ConveyorIcon className={sizeClass} />,
      chart: <ChartIcon className={sizeClass} />,
      checkmark: <CheckmarkIcon className={sizeClass} />,
    }
    return icons[type]
  }

  const getIconColor = (type: FloatingElement['type']) => {
    const colors = {
      gear: 'text-[#1A9988]',
      wrench: 'text-gray-500',
      robot: 'text-[#1A9988]/80',
      conveyor: 'text-gray-400',
      chart: 'text-[#1A9988]/70',
      checkmark: 'text-emerald-500',
    }
    return colors[type]
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Central rotating gear */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={isActive ? { rotate: 360 } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <CentralGearIcon className="w-24 h-24 md:w-32 md:h-32 text-[#1A9988]/30" />
        </motion.div>
      </div>

      {/* Secondary smaller gear (counter-rotating) */}
      <motion.div
        className="absolute"
        style={{ top: '25%', left: '65%' }}
        animate={isActive ? { rotate: -360 } : {}}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <GearIcon className="w-10 h-10 md:w-14 md:h-14 text-[#1A9988]/20" />
      </motion.div>

      {/* Another small gear */}
      <motion.div
        className="absolute"
        style={{ top: '60%', left: '25%' }}
        animate={isActive ? { rotate: 360 } : {}}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <GearIcon className="w-8 h-8 md:w-12 md:h-12 text-[#1A9988]/15" />
      </motion.div>

      {/* Floating industrial elements */}
      {elements.map((element) => {
        const sizeClass = element.size === 'sm' ? 'w-5 h-5' : 'w-7 h-7'
        const containerSize = element.size === 'sm' ? 'w-10 h-10' : 'w-12 h-12'

        return (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={isActive ? {
              y: [0, -8, 0, 8, 0],
              x: [0, 4, 0, -4, 0],
            } : {}}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: element.delay,
            }}
          >
            <motion.div
              className={`
                ${containerSize} rounded-lg bg-white/80 backdrop-blur-sm
                border border-gray-200/50 shadow-sm
                flex items-center justify-center
                ${getIconColor(element.type)}
              `}
              animate={isActive && element.type === 'gear' ? { rotate: 360 } : {}}
              transition={element.type === 'gear' ? {
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              } : {}}
            >
              {getIcon(element.type, sizeClass)}
            </motion.div>
          </motion.div>
        )
      })}

      {/* Subtle connection lines between elements */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A9988" stopOpacity="0" />
            <stop offset="50%" stopColor="#1A9988" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1A9988" stopOpacity="0" />
          </linearGradient>
        </defs>
        {elements.slice(0, 4).map((element, i) => {
          const nextElement = elements[(i + 1) % elements.length]
          return (
            <motion.line
              key={`line-${element.id}`}
              x1={`${element.x}%`}
              y1={`${element.y}%`}
              x2={`${nextElement.x}%`}
              y2={`${nextElement.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="6 4"
              animate={isActive ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.3 }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          )
        })}
      </svg>

      {/* Subtle pulse effect in center */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.1, 0.05, 0.1] } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#1A9988]/10" />
      </motion.div>
    </div>
  )
}
