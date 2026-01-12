'use client'

import { useMemo, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'

// Sample customer records showing real-world entity resolution problems
// Data inspired by actual MineralHolder Owner ID mapping issues
const sampleRecords = [
  // Cluster 1 - Miller Paula: Same person with 4 different Owner IDs (Unstable ID problem)
  { id: 1, name: 'Miller Paula', address: 'Flower Mound, TX', phone: 'ID: 700576', email: 'mineral_owner_1@example.com', cluster: 1 },
  { id: 2, name: 'Miller Paula', address: 'Fluvanna, TX', phone: 'ID: 880625', email: 'mineral_owner_2@example.com', cluster: 1 },
  { id: 3, name: 'Miller Paula', address: 'San Augustine, TX', phone: 'ID: 1281581', email: 'mineral_owner_3@example.com', cluster: 1 },

  // Cluster 2 - Johnson William variations (common unstable pattern)
  { id: 4, name: 'Johnson William', address: 'Houston, TX', phone: 'ID: 445821', email: 'wjohnson@mail.com', cluster: 2 },
  { id: 5, name: 'William Johnson', address: 'Houston, TX', phone: 'ID: 889012', email: 'will.johnson@work.com', cluster: 2 },

  // Cluster 3 - Davis Family Trust variations
  { id: 6, name: 'Davis Family Trust', address: 'Dallas, TX', phone: 'ID: 234567', email: 'davis.trust@example.com', cluster: 3 },
  { id: 7, name: 'Davis Fam Trust', address: 'Dallas, TX', phone: 'ID: 567890', email: 'dfamily@trust.com', cluster: 3 },
  { id: 8, name: 'The Davis Family', address: 'Dallas, TX', phone: 'ID: 890123', email: 'davis.family@mail.com', cluster: 3 },

  // Cluster 4 - Thompson Robert variations
  { id: 9, name: 'Thompson Robert', address: 'Midland, TX', phone: 'ID: 112233', email: 'rthompson@email.com', cluster: 4 },
  { id: 10, name: 'R. Thompson', address: 'Midland, TX', phone: 'ID: 445566', email: 'robert.t@work.com', cluster: 4 },

  // Cluster 5 - Anderson Estate variations
  { id: 11, name: 'Anderson Estate', address: 'Odessa, TX', phone: 'ID: 778899', email: 'anderson.est@mail.com', cluster: 5 },
  { id: 12, name: 'Estate of Anderson', address: 'Odessa, TX', phone: 'ID: 334455', email: 'estate.anderson@trust.com', cluster: 5 },
]

// More records for chaos effect
const additionalRecords = Array.from({ length: 28 }, (_, i) => ({
  id: 13 + i,
  name: `Record ${13 + i}`,
  address: `${100 + i} Street`,
  phone: `555-${1000 + i}`,
  email: `user${i}@email.com`,
  cluster: (i % 5) + 1,
}))

const allRecords = [...sampleRecords, ...additionalRecords]

// Seeded random for consistent positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface RecordCard {
  id: number
  name: string
  address: string
  phone: string
  email: string
  cluster: number
  chaosX: number
  chaosY: number
  chaosRotation: number
  organizedX: number
  organizedY: number
}

interface CustomerRecordCardsProps {
  organizationLevel: number
  className?: string
  showLabels?: boolean
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

// Cluster colors (teal palette for organized state)
const clusterColors = [
  '#1A9988', // teal-500
  '#22B8A5', // lighter teal
  '#14857A', // darker teal
  '#2DD4BF', // teal-400
  '#0F766E', // teal-700
]

function RecordCardElement({
  record,
  organizationLevel,
  isHighlighted,
}: {
  record: RecordCard
  organizationLevel: number
  prefersReducedMotion?: boolean
  isHighlighted: boolean
}) {
  const orgLevel = useMotionValue(organizationLevel)

  useEffect(() => {
    orgLevel.set(organizationLevel)
  }, [organizationLevel, orgLevel])

  const smoothOrg = useSpring(orgLevel, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const x = useTransform(smoothOrg, (level) =>
    lerp(record.chaosX, record.organizedX, level)
  )

  const y = useTransform(smoothOrg, (level) =>
    lerp(record.chaosY, record.organizedY, level)
  )

  const rotate = useTransform(smoothOrg, (level) =>
    lerp(record.chaosRotation, 0, level)
  )

  const scale = useTransform(smoothOrg, (level) =>
    lerp(0.8, 1, level)
  )

  // Transition from orange/red (chaos) to cluster color (organized)
  const backgroundColor = useTransform(smoothOrg, (level) => {
    const chaosColor = { r: 251, g: 146, b: 60 } // orange
    const clusterColor = hexToRgb(clusterColors[(record.cluster - 1) % clusterColors.length])
    const r = Math.round(lerp(chaosColor.r, clusterColor.r, level))
    const g = Math.round(lerp(chaosColor.g, clusterColor.g, level))
    const b = Math.round(lerp(chaosColor.b, clusterColor.b, level))
    return `rgb(${r}, ${g}, ${b})`
  })

  const borderColor = useTransform(smoothOrg, (level) => {
    const chaosColor = { r: 239, g: 68, b: 68 } // red
    const clusterColor = hexToRgb(clusterColors[(record.cluster - 1) % clusterColors.length])
    const r = Math.round(lerp(chaosColor.r, clusterColor.r, level))
    const g = Math.round(lerp(chaosColor.g, clusterColor.g, level))
    const b = Math.round(lerp(chaosColor.b, clusterColor.b, level))
    return `rgb(${r}, ${g}, ${b})`
  })

  // Show detailed card for highlighted records
  const isDetailedCard = isHighlighted && record.id <= 12

  if (isDetailedCard) {
    return (
      <motion.div
        className="absolute bg-bg-secondary rounded-lg shadow-lg overflow-hidden"
        style={{
          width: 140,
          left: x,
          top: y,
          rotate,
          scale,
          x: '-50%',
          y: '-50%',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor,
        }}
      >
        {/* Card header */}
        <motion.div
          className="px-3 py-2"
          style={{ backgroundColor }}
        >
          <p className="text-white text-xs font-semibold truncate">{record.name}</p>
        </motion.div>
        {/* Card body */}
        <div className="px-3 py-2 space-y-1">
          <p className="text-text-muted text-[10px] truncate">{record.address}</p>
          <p className="text-text-muted text-[10px] truncate">{record.phone}</p>
          <p className="text-text-muted text-[10px] truncate">{record.email}</p>
        </div>
      </motion.div>
    )
  }

  // Simple card for other records
  return (
    <motion.div
      className="absolute rounded shadow-md"
      style={{
        width: 60,
        height: 40,
        left: x,
        top: y,
        rotate,
        scale,
        x: '-50%',
        y: '-50%',
        backgroundColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor,
      }}
    >
      {/* Mini lines representing data */}
      <div className="p-1.5 space-y-1">
        <div className="h-1 bg-white/40 rounded w-4/5" />
        <div className="h-1 bg-white/30 rounded w-3/5" />
        <div className="h-1 bg-white/20 rounded w-2/3" />
      </div>
    </motion.div>
  )
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 26, g: 153, b: 136 } // default teal
}

export default function CustomerRecordCards({
  organizationLevel,
  className = '',
  showLabels = true,
}: CustomerRecordCardsProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotionPreference = () =>
      setPrefersReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      )

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

  const effectiveRecordCount = isMobile ? 20 : allRecords.length

  const records = useMemo<RecordCard[]>(() => {
    const seed = 42
    const clusterCenters = [
      { x: 20, y: 25 },
      { x: 80, y: 25 },
      { x: 50, y: 50 },
      { x: 20, y: 75 },
      { x: 80, y: 75 },
    ]

    return allRecords.slice(0, effectiveRecordCount).map((record, i) => {
      const clusterCenter = clusterCenters[(record.cluster - 1) % 5]
      const clusterMembers = allRecords
        .slice(0, effectiveRecordCount)
        .filter((r) => r.cluster === record.cluster)
      const indexInCluster = clusterMembers.findIndex((r) => r.id === record.id)

      // Organize in a tight grid within cluster
      const cols = Math.ceil(Math.sqrt(clusterMembers.length))
      const col = indexInCluster % cols
      const row = Math.floor(indexInCluster / cols)
      const spacing = 8

      return {
        ...record,
        chaosX: seededRandom(seed + i * 7) * 90 + 5,
        chaosY: seededRandom(seed + i * 7 + 1) * 85 + 5,
        chaosRotation: seededRandom(seed + i * 7 + 2) * 60 - 30,
        organizedX: Math.max(10, Math.min(90, clusterCenter.x + (col - cols / 2) * spacing)),
        organizedY: Math.max(10, Math.min(90, clusterCenter.y + (row - cols / 2) * spacing)),
      }
    })
  }, [effectiveRecordCount])

  // Determine which records to highlight (the "same person" examples)
  const highlightedIds = [1, 2, 3] // Miller Paula variations - unstable ID example

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-text-primary/5 via-text-primary/10 to-text-primary/5 rounded-2xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(26, 153, 136, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 153, 136, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Record cards */}
      {records.map((record) => (
        <RecordCardElement
          key={record.id}
          record={record}
          organizationLevel={organizationLevel}
          prefersReducedMotion={prefersReducedMotion}
          isHighlighted={highlightedIds.includes(record.id)}
        />
      ))}

      {/* Cluster labels (when organized) */}
      {showLabels && organizationLevel > 0.7 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {[
            { label: 'Miller Paula', x: '20%', y: '8%' },
            { label: 'Johnson William', x: '80%', y: '8%' },
            { label: 'Davis Family Trust', x: '50%', y: '35%' },
            { label: 'Thompson Robert', x: '20%', y: '60%' },
            { label: 'Anderson Estate', x: '80%', y: '60%' },
          ].map((cluster, i) => (
            <div
              key={i}
              className="absolute text-center"
              style={{ left: cluster.x, top: cluster.y, transform: 'translateX(-50%)' }}
            >
              <span className="text-xs font-medium text-teal-500 bg-bg-primary/80 px-2 py-1 rounded-full border border-teal-500/30">
                {cluster.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-4 bg-bg-primary/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: organizationLevel < 0.5 ? 1 : 0, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-orange-400" />
          <span className="text-xs text-text-muted">Scattered records</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-4 flex items-center gap-4 bg-bg-primary/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-border"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: organizationLevel >= 0.5 ? 1 : 0, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-teal-500" />
          <span className="text-xs text-text-muted">Unified identities</span>
        </div>
      </motion.div>
    </div>
  )
}
