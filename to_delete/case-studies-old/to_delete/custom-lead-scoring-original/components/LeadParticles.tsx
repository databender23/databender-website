'use client'

import { useMemo, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

// Seeded random for consistent particle positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface Particle {
  id: number
  scatteredX: number
  scatteredY: number
  scoredX: number
  scoredY: number
  size: number
  driftOffsetX: number
  driftOffsetY: number
  driftSpeed: number
  score: 'hot' | 'warm' | 'cold'
}

interface LeadParticlesProps {
  particleCount?: number
  organizationLevel: number
  className?: string
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

function ParticleElement({
  particle,
  organizationLevel,
  prefersReducedMotion,
}: {
  particle: Particle
  organizationLevel: number
  prefersReducedMotion: boolean
}) {
  const orgLevel = useMotionValue(organizationLevel)

  useEffect(() => {
    orgLevel.set(organizationLevel)
  }, [organizationLevel, orgLevel])

  const smoothOrg = useSpring(orgLevel, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const x = useTransform(smoothOrg, (level) =>
    lerp(particle.scatteredX, particle.scoredX, level)
  )

  const y = useTransform(smoothOrg, (level) =>
    lerp(particle.scatteredY, particle.scoredY, level)
  )

  // Color based on score - gray when scattered, colored when organized
  const scoreColors = {
    hot: { r: 34, g: 197, b: 94 },    // Green - high quality
    warm: { r: 245, g: 158, b: 11 },   // Amber - medium quality
    cold: { r: 156, g: 163, b: 175 },  // Gray - low quality
  }

  const targetColor = scoreColors[particle.score]
  const grayColor = { r: 156, g: 163, b: 175 }

  const backgroundColor = useTransform(smoothOrg, (level) => {
    const r = Math.round(lerp(grayColor.r, targetColor.r, level))
    const g = Math.round(lerp(grayColor.g, targetColor.g, level))
    const b = Math.round(lerp(grayColor.b, targetColor.b, level))
    return `rgb(${r}, ${g}, ${b})`
  })

  const boxShadow = useTransform(smoothOrg, (level) => {
    const r = Math.round(lerp(grayColor.r, targetColor.r, level))
    const g = Math.round(lerp(grayColor.g, targetColor.g, level))
    const b = Math.round(lerp(grayColor.b, targetColor.b, level))
    const glowIntensity = particle.score === 'hot' ? 0.6 : 0.3
    return `0 0 ${particle.size * 2}px rgba(${r}, ${g}, ${b}, ${glowIntensity * level})`
  })

  const driftAnimation = prefersReducedMotion
    ? {}
    : {
        x: [0, particle.driftOffsetX, -particle.driftOffsetX * 0.5, 0],
        y: [0, particle.driftOffsetY, -particle.driftOffsetY * 0.5, 0],
      }

  const driftTransition = prefersReducedMotion
    ? {}
    : {
        duration: particle.driftSpeed,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }

  return (
    <motion.div
      key={particle.id}
      className="absolute rounded-full"
      style={{
        width: particle.size,
        height: particle.size,
        left: x,
        top: y,
        backgroundColor,
        boxShadow,
        x: '-50%',
        y: '-50%',
      }}
      animate={organizationLevel < 0.3 ? driftAnimation : {}}
      transition={organizationLevel < 0.3 ? driftTransition : { duration: 0.5 }}
    />
  )
}

export default function LeadParticles({
  particleCount = 300,
  organizationLevel,
  className = '',
}: LeadParticlesProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const checkMotionPreference = () => {
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )
    }

    checkMobile()
    checkMotionPreference()

    window.addEventListener('resize', checkMobile)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionQuery.addEventListener('change', checkMotionPreference)

    return () => {
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', checkMotionPreference)
    }
  }, [])

  const effectiveParticleCount = isMobile
    ? Math.min(particleCount, 150)
    : particleCount

  const particles = useMemo<Particle[]>(() => {
    const seed = 42 // Consistent seed for deterministic generation
    // Organize into three columns: Hot, Warm, Cold
    const columns = [
      { x: 25, label: 'hot' as const },
      { x: 50, label: 'warm' as const },
      { x: 75, label: 'cold' as const },
    ]

    return Array.from({ length: effectiveParticleCount }, (_, i) => {
      // Distribute: 20% hot, 30% warm, 50% cold
      let score: 'hot' | 'warm' | 'cold'
      let columnIndex: number
      if (i < effectiveParticleCount * 0.2) {
        score = 'hot'
        columnIndex = 0
      } else if (i < effectiveParticleCount * 0.5) {
        score = 'warm'
        columnIndex = 1
      } else {
        score = 'cold'
        columnIndex = 2
      }

      const column = columns[columnIndex]

      const indexInColumn =
        score === 'hot' ? i :
        score === 'warm' ? i - effectiveParticleCount * 0.2 :
        i - effectiveParticleCount * 0.5

      const row = Math.floor(indexInColumn / 8)
      const col = indexInColumn % 8

      const scoredX = column.x + (col - 4) * 2
      const scoredY = 20 + row * 4

      return {
        id: i,
        scatteredX: seededRandom(seed + i * 5) * 100,
        scatteredY: seededRandom(seed + i * 5 + 1) * 100,
        scoredX: Math.max(5, Math.min(95, scoredX)),
        scoredY: Math.max(10, Math.min(90, scoredY)),
        size: score === 'hot' ? 6 : score === 'warm' ? 5 : 4,
        driftOffsetX: (seededRandom(seed + i * 5 + 2) - 0.5) * 15,
        driftOffsetY: (seededRandom(seed + i * 5 + 3) - 0.5) * 15,
        driftSpeed: 3 + seededRandom(seed + i * 5 + 4) * 3,
        score,
      }
    })
  }, [effectiveParticleCount])

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Column labels when organized */}
      <motion.div
        className="absolute inset-x-0 top-4 flex justify-around text-xs font-medium"
        style={{ opacity: organizationLevel }}
      >
        <span className="text-success">Hot Leads</span>
        <span className="text-warning">Warm</span>
        <span className="text-text-muted">Cold</span>
      </motion.div>

      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          particle={particle}
          organizationLevel={organizationLevel}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  )
}
