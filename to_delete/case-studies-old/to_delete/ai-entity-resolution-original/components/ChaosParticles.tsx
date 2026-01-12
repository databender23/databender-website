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
  chaosX: number
  chaosY: number
  organizedX: number
  organizedY: number
  chaosRotation: number
  size: number
  driftOffsetX: number
  driftOffsetY: number
  driftSpeed: number
  clusterIndex: number
}

interface ChaosParticlesProps {
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
    lerp(particle.chaosX, particle.organizedX, level)
  )

  const y = useTransform(smoothOrg, (level) =>
    lerp(particle.chaosY, particle.organizedY, level)
  )

  const rotate = useTransform(smoothOrg, (level) =>
    lerp(particle.chaosRotation, 0, level)
  )

  // Transition from orange (chaos) to teal (organized)
  const backgroundColor = useTransform(smoothOrg, (level) => {
    const r = Math.round(lerp(251, 26, level))
    const g = Math.round(lerp(146, 153, level))
    const b = Math.round(lerp(60, 136, level))
    return `rgb(${r}, ${g}, ${b})`
  })

  const boxShadow = useTransform(smoothOrg, (level) => {
    const r = Math.round(lerp(251, 26, level))
    const g = Math.round(lerp(146, 153, level))
    const b = Math.round(lerp(60, 136, level))
    return `0 0 ${particle.size * 2}px rgba(${r}, ${g}, ${b}, 0.6)`
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
        rotate,
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

export default function ChaosParticles({
  particleCount = 400,
  organizationLevel,
  className = '',
}: ChaosParticlesProps) {
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
    ? Math.min(particleCount, 200)
    : particleCount

  const particles = useMemo<Particle[]>(() => {
    const seed = 42 // Consistent seed for deterministic generation
    const clusterCount = 5
    const clusterCenters = [
      { x: 25, y: 30 },
      { x: 75, y: 30 },
      { x: 50, y: 50 },
      { x: 25, y: 70 },
      { x: 75, y: 70 },
    ]

    return Array.from({ length: effectiveParticleCount }, (_, i) => {
      const clusterIndex = i % clusterCount
      const clusterCenter = clusterCenters[clusterIndex]

      const gridCols = Math.ceil(Math.sqrt(effectiveParticleCount / clusterCount))
      const particleInCluster = Math.floor(i / clusterCount)
      const col = particleInCluster % gridCols
      const row = Math.floor(particleInCluster / gridCols)

      const spacing = 2
      const organizedX =
        clusterCenter.x + (col - gridCols / 2) * spacing
      const organizedY =
        clusterCenter.y + (row - gridCols / 2) * spacing

      return {
        id: i,
        chaosX: seededRandom(seed + i * 7) * 100,
        chaosY: seededRandom(seed + i * 7 + 1) * 100,
        organizedX: Math.max(5, Math.min(95, organizedX)),
        organizedY: Math.max(5, Math.min(95, organizedY)),
        chaosRotation: seededRandom(seed + i * 7 + 2) * 720 - 360,
        size: 4 + seededRandom(seed + i * 7 + 3) * 4,
        driftOffsetX: (seededRandom(seed + i * 7 + 4) - 0.5) * 20,
        driftOffsetY: (seededRandom(seed + i * 7 + 5) - 0.5) * 20,
        driftSpeed: 3 + seededRandom(seed + i * 7 + 6) * 4,
        clusterIndex,
      }
    })
  }, [effectiveParticleCount])

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
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
