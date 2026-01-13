'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface RealEstateAnimationProps {
  className?: string
  isActive?: boolean
}

interface FloatingElement {
  id: number
  x: number
  y: number
  rotation: number
  type: 'office' | 'home' | 'key' | 'dollar' | 'chart' | 'location'
  duration: number
  delay: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateElements(count: number, seed: number): FloatingElement[] {
  const types: FloatingElement['type'][] = ['office', 'home', 'key', 'dollar', 'chart', 'location']
  return Array.from({ length: count }, (_, i) => {
    // Distribute elements in a circular pattern around center
    const angle = (i / count) * 2 * Math.PI
    const radius = 30 + seededRandom(seed + i * 5) * 15
    return {
      id: i,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      rotation: seededRandom(seed + i * 5 + 1) * 10 - 5,
      type: types[i % types.length],
      duration: 3 + seededRandom(seed + i * 5 + 2) * 2,
      delay: seededRandom(seed + i * 5 + 3) * 2,
    }
  })
}

// SVG icons for each element type
const ElementIcon = ({ type }: { type: FloatingElement['type'] }) => {
  switch (type) {
    case 'office':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    case 'home':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'key':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    case 'dollar':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'chart':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    case 'location':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
  }
}

export default function RealEstateAnimation({
  className = '',
  isActive = true
}: RealEstateAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [elements, setElements] = useState<FloatingElement[]>([])
  const seedRef = useRef(42)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const elementCount = isMobile ? 6 : 12
    setElements(generateElements(elementCount, seedRef.current))
  }, [isMobile])

  return (
    <div className={`relative w-full h-full bg-transparent ${className}`}>
      {/* Central skyscraper building */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={isActive ? {
          y: [0, -4, 0, 4, 0],
        } : {}}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="relative">
          {/* Main building structure */}
          <svg
            className="w-20 h-28 md:w-24 md:h-32"
            viewBox="0 0 96 128"
            fill="none"
          >
            {/* Building body */}
            <rect
              x="16"
              y="24"
              width="64"
              height="100"
              rx="2"
              fill="white"
              stroke="#1A9988"
              strokeWidth="2"
            />
            {/* Building top accent */}
            <rect
              x="32"
              y="8"
              width="32"
              height="20"
              rx="2"
              fill="#1A9988"
              fillOpacity="0.1"
              stroke="#1A9988"
              strokeWidth="2"
            />
            {/* Antenna */}
            <line
              x1="48"
              y1="8"
              x2="48"
              y2="0"
              stroke="#1A9988"
              strokeWidth="2"
            />
            {/* Windows - row 1 */}
            <rect x="24" y="32" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            <rect x="36" y="32" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.5" />
            <rect x="52" y="32" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            <rect x="64" y="32" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.4" />
            {/* Windows - row 2 */}
            <rect x="24" y="48" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.5" />
            <rect x="36" y="48" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            <rect x="52" y="48" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.4" />
            <rect x="64" y="48" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            {/* Windows - row 3 */}
            <rect x="24" y="64" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.4" />
            <rect x="36" y="64" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.5" />
            <rect x="52" y="64" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            <rect x="64" y="64" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.5" />
            {/* Windows - row 4 */}
            <rect x="24" y="80" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            <rect x="36" y="80" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.4" />
            <rect x="52" y="80" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.5" />
            <rect x="64" y="80" width="8" height="8" rx="1" fill="#1A9988" fillOpacity="0.3" />
            {/* Entrance */}
            <rect
              x="36"
              y="100"
              width="24"
              height="24"
              rx="2"
              fill="#1A9988"
              fillOpacity="0.2"
              stroke="#1A9988"
              strokeWidth="1.5"
            />
          </svg>

          {/* Subtle glow effect behind building */}
          <div
            className="absolute inset-0 -z-10 blur-xl opacity-20"
            style={{ backgroundColor: '#1A9988' }}
          />
        </div>
      </motion.div>

      {/* Floating elements around the building */}
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
          animate={isActive ? {
            y: [0, -6, 0, 6, 0],
            rotate: [element.rotation, element.rotation + 3, element.rotation, element.rotation - 3, element.rotation],
          } : {}}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: element.delay,
          }}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl shadow-md bg-white border border-gray-200 flex items-center justify-center text-[#1A9988]">
            <ElementIcon type={element.type} />
          </div>
        </motion.div>
      ))}

      {/* Connecting lines / data flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {elements.slice(0, isMobile ? 3 : 6).map((element, i) => (
          <motion.line
            key={`line-${element.id}`}
            x1="50%"
            y1="50%"
            x2={`${element.x}%`}
            y2={`${element.y}%`}
            stroke="#1A9988"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={isActive ? {
              opacity: [0.15, 0.35, 0.15],
              strokeDashoffset: [0, -16, -32],
            } : { opacity: 0.15 }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, delay: i * 0.3 },
              strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
      </svg>

      {/* Floating particles for data flow effect */}
      {isActive && [...Array(isMobile ? 4 : 8)].map((_, i) => {
        const angle = (i / (isMobile ? 4 : 8)) * 2 * Math.PI
        const startRadius = 15
        const endRadius = 45
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: '#1A9988',
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [
                Math.cos(angle) * startRadius,
                Math.cos(angle) * endRadius,
              ],
              y: [
                Math.sin(angle) * startRadius,
                Math.sin(angle) * endRadius,
              ],
              opacity: [0.8, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        )
      })}
    </div>
  )
}
