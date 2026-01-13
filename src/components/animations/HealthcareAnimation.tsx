'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface HealthcareAnimationProps {
  className?: string
  isActive?: boolean
}

// Medical icon components
const ShieldCrossIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 4L8 14v18c0 14 10 24 24 28 14-4 24-14 24-28V14L32 4z"
      fill="currentColor"
      opacity="0.15"
    />
    <path
      d="M32 4L8 14v18c0 14 10 24 24 28 14-4 24-14 24-28V14L32 4z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M32 20v24M20 32h24"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
)

const StethoscopeIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      d="M4 6a4 4 0 014-4h0a4 4 0 014 4v6a4 4 0 01-4 4h0a4 4 0 01-4-4V6z"
      strokeLinecap="round"
    />
    <path d="M12 12v1a5 5 0 005 5h0a5 5 0 005-5v-1" strokeLinecap="round" />
    <circle cx="22" cy="12" r="2" fill="currentColor" />
    <path d="M4 2v4M12 2v4" strokeLinecap="round" />
  </svg>
)

const HeartbeatIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="currentColor"
      opacity="0.2"
    />
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

const ClipboardIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 12h6M9 16h4" strokeLinecap="round" />
  </svg>
)

const PillIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path
      d="M8.5 8.5L15.5 15.5"
      strokeLinecap="round"
    />
    <rect
      x="5.5"
      y="5.5"
      width="13"
      height="13"
      rx="6.5"
      transform="rotate(45 12 12)"
    />
    <path
      d="M12 12l3.5 3.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
)

const DocumentIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
  </svg>
)

interface FloatingIcon {
  id: number
  Icon: React.ComponentType<{ className?: string }>
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: 'teal' | 'blue'
}

// Seeded random for consistent positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const floatingIconsConfig: Omit<FloatingIcon, 'x' | 'y' | 'duration' | 'delay'>[] = [
  { id: 1, Icon: StethoscopeIcon, size: 28, color: 'blue' },
  { id: 2, Icon: HeartbeatIcon, size: 24, color: 'teal' },
  { id: 3, Icon: ClipboardIcon, size: 26, color: 'blue' },
  { id: 4, Icon: PillIcon, size: 22, color: 'teal' },
  { id: 5, Icon: DocumentIcon, size: 24, color: 'blue' },
  { id: 6, Icon: HeartbeatIcon, size: 20, color: 'teal' },
]

export default function HealthcareAnimation({
  className = '',
  isActive = true,
}: HealthcareAnimationProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  // Generate floating icon positions on mount
  useEffect(() => {
    const seed = 42

    // Position icons in a circular pattern around center
    const angleStep = (2 * Math.PI) / floatingIconsConfig.length
    const radius = 35 // percentage from center

    const icons: FloatingIcon[] = floatingIconsConfig.map((config, i) => {
      const angle = angleStep * i - Math.PI / 2 // Start from top
      const jitterX = (seededRandom(seed + i * 3) - 0.5) * 8
      const jitterY = (seededRandom(seed + i * 3 + 1) - 0.5) * 8

      return {
        ...config,
        x: 50 + Math.cos(angle) * radius + jitterX,
        y: 50 + Math.sin(angle) * radius + jitterY,
        duration: 4 + seededRandom(seed + i * 3 + 2) * 2,
        delay: i * 0.3,
      }
    })

    requestAnimationFrame(() => {
      setFloatingIcons(icons)
      setIsMounted(true)
    })
  }, [])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    requestAnimationFrame(() => setPrefersReducedMotion(mediaQuery.matches))

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return <div className={`relative w-full h-full ${className}`} />
  }

  const shouldAnimate = isActive && !prefersReducedMotion

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Central shield with medical cross */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={
            shouldAnimate
              ? {
                  scale: [1, 1.03, 1],
                }
              : {}
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Soft glow behind shield */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-full bg-teal-500/10 blur-xl"
            animate={
              shouldAnimate
                ? {
                    opacity: [0.3, 0.5, 0.3],
                    scale: [0.9, 1.1, 0.9],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Shield icon */}
          <ShieldCrossIcon className="w-16 h-16 md:w-20 md:h-20 text-teal-500" />
        </motion.div>
      </div>

      {/* Floating medical icons */}
      {floatingIcons.map((icon) => {
        const colorClass = icon.color === 'teal' ? 'text-teal-500' : 'text-[#1A75DC]'
        const bgClass = icon.color === 'teal' ? 'bg-teal-50' : 'bg-blue-50'
        const borderClass = icon.color === 'teal' ? 'border-teal-200' : 'border-blue-200'

        return (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              shouldAnimate
                ? {
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0, 6, 0],
                    x: [0, 3, 0, -3, 0],
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={{
              opacity: { duration: 0.5, delay: icon.delay },
              scale: { duration: 0.5, delay: icon.delay },
              y: {
                duration: icon.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: icon.delay,
              },
              x: {
                duration: icon.duration * 1.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: icon.delay + 0.5,
              },
            }}
          >
            <div
              className={`
                p-2 rounded-lg shadow-sm border
                ${bgClass} ${borderClass}
                flex items-center justify-center
              `}
            >
              <div style={{ width: icon.size, height: icon.size }}>
                <icon.Icon className={`w-full h-full ${colorClass}`} />
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Subtle connecting lines to center */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.line
            key={`line-${icon.id}`}
            x1="50%"
            y1="50%"
            x2={`${icon.x}%`}
            y2={`${icon.y}%`}
            stroke={icon.color === 'teal' ? 'rgba(26, 153, 136, 0.15)' : 'rgba(26, 117, 220, 0.15)'}
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={
              shouldAnimate
                ? {
                    opacity: [0.1, 0.25, 0.1],
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
    </div>
  )
}
