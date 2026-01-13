'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface LegalAnimationProps {
  className?: string
  isActive?: boolean
}

interface LegalIcon {
  id: number
  x: number
  y: number
  rotation: number
  type: 'document' | 'briefcase' | 'pen' | 'paragraph' | 'shield' | 'contract'
  duration: number
  delay: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateIcons(count: number, seed: number): LegalIcon[] {
  const types: LegalIcon['type'][] = ['document', 'briefcase', 'pen', 'paragraph', 'shield', 'contract']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 15 + seededRandom(seed + i * 6) * 70,
    y: 15 + seededRandom(seed + i * 6 + 1) * 70,
    rotation: seededRandom(seed + i * 6 + 2) * 10 - 5,
    type: types[Math.floor(seededRandom(seed + i * 6 + 3) * 6)],
    duration: 4 + seededRandom(seed + i * 6 + 4) * 3,
    delay: seededRandom(seed + i * 6 + 5) * 2,
  }))
}

export default function LegalAnimation({ className = '', isActive = true }: LegalAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [icons, setIcons] = useState<LegalIcon[]>([])
  const seedRef = useRef(77)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const iconCount = isMobile ? 6 : 8
    setIcons(generateIcons(iconCount, seedRef.current))
  }, [isMobile])

  const iconComponents: Record<LegalIcon['type'], React.ReactNode> = {
    document: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    pen: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    paragraph: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 6v15M17 6v15M9 9a3 3 0 110-6h8v6" />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    contract: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Central Scales of Justice */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={isActive ? {
            y: [0, -6, 0],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-24 h-24 md:w-32 md:h-32"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Base */}
            <motion.rect
              x="40"
              y="85"
              width="20"
              height="6"
              rx="2"
              fill="#1A9988"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
            />
            {/* Pillar */}
            <motion.rect
              x="47"
              y="35"
              width="6"
              height="52"
              rx="1"
              fill="#1A9988"
              initial={{ scaleY: 0 }}
              animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              style={{ transformOrigin: 'bottom' }}
            />
            {/* Top bar */}
            <motion.rect
              x="15"
              y="32"
              width="70"
              height="4"
              rx="2"
              fill="#1A9988"
              initial={{ scaleX: 0 }}
              animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            {/* Left scale pan - animated tilt */}
            <motion.g
              animate={isActive ? { rotate: [-2, 2, -2] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '50px 34px' }}
            >
              {/* Left chain */}
              <line x1="22" y1="36" x2="22" y2="52" stroke="#1A9988" strokeWidth="2" />
              {/* Left pan */}
              <motion.path
                d="M10 52 Q22 58 34 52"
                stroke="#1A9988"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* Right chain */}
              <line x1="78" y1="36" x2="78" y2="48" stroke="#1A9988" strokeWidth="2" />
              {/* Right pan */}
              <motion.path
                d="M66 48 Q78 54 90 48"
                stroke="#1A9988"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </motion.g>
            {/* Center ornament */}
            <motion.circle
              cx="50"
              cy="28"
              r="6"
              fill="#1A9988"
              initial={{ scale: 0 }}
              animate={isActive ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.6, type: 'spring' }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating legal icons */}
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? {
            opacity: 1,
            scale: 1,
            y: [0, -8, 0, 8, 0],
            rotate: [icon.rotation, icon.rotation + 3, icon.rotation, icon.rotation - 3, icon.rotation],
          } : { opacity: 0, scale: 0 }}
          transition={{
            opacity: { duration: 0.4, delay: icon.delay * 0.3 },
            scale: { duration: 0.4, delay: icon.delay * 0.3 },
            y: { duration: icon.duration, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
            rotate: { duration: icon.duration, repeat: Infinity, ease: 'easeInOut', delay: icon.delay },
          }}
        >
          <div className="w-12 h-12 rounded-xl bg-white/90 border border-gray-200 shadow-sm flex items-center justify-center text-[#1A9988]">
            {iconComponents[icon.type]}
          </div>
        </motion.div>
      ))}

      {/* Subtle connecting lines between some icons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {icons.slice(0, 4).map((icon, i) => {
          const nextIcon = icons[(i + 2) % icons.length]
          return (
            <motion.line
              key={`line-${icon.id}`}
              x1={`${icon.x}%`}
              y1={`${icon.y}%`}
              x2={`${nextIcon.x}%`}
              y2={`${nextIcon.y}%`}
              stroke="rgba(26, 153, 136, 0.15)"
              strokeWidth="1"
              strokeDasharray="6 6"
              initial={{ opacity: 0 }}
              animate={isActive ? {
                opacity: [0.15, 0.3, 0.15],
                pathLength: [0, 1, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
