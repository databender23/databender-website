'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface DocumentChaosProps {
  className?: string
}

interface Document {
  id: number
  x: number
  y: number
  rotation: number
  type: 'table' | 'text' | 'footnote' | 'crossref'
  hasError: boolean
  duration: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateDocuments(count: number, seed: number): Document[] {
  const types: Document['type'][] = ['table', 'text', 'footnote', 'crossref']
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + seededRandom(seed + i * 6) * 80,
    y: 10 + seededRandom(seed + i * 6 + 1) * 80,
    rotation: seededRandom(seed + i * 6 + 2) * 20 - 10,
    type: types[Math.floor(seededRandom(seed + i * 6 + 3) * 4)],
    hasError: seededRandom(seed + i * 6 + 4) > 0.6,
    duration: 4 + seededRandom(seed + i * 6 + 5) * 2,
  }))
}

export default function DocumentChaos({ className = '' }: DocumentChaosProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const seedRef = useRef(42) // Consistent seed for SSR

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const docCount = isMobile ? 12 : 20
    setDocuments(generateDocuments(docCount, seedRef.current))
  }, [isMobile])

  const typeIcons: Record<Document['type'], string> = {
    table: '📊',
    text: '📄',
    footnote: '📝',
    crossref: '🔗',
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {documents.map((doc) => (
        <motion.div
          key={doc.id}
          className="absolute"
          style={{
            left: `${doc.x}%`,
            top: `${doc.y}%`,
            transform: `translate(-50%, -50%) rotate(${doc.rotation}deg)`,
          }}
          animate={{
            y: [0, -5, 0, 5, 0],
            rotate: [doc.rotation, doc.rotation + 2, doc.rotation, doc.rotation - 2, doc.rotation],
          }}
          transition={{
            duration: doc.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`
            relative w-12 h-14 rounded-lg shadow-md
            ${doc.hasError ? 'bg-red-50 border-2 border-red-300' : 'bg-white border border-border'}
            flex items-center justify-center
          `}>
            <span className="text-lg">{typeIcons[doc.type]}</span>
            {doc.hasError && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white text-xs">!</span>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Connection lines that flicker (showing broken relationships) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {documents.slice(0, 5).map((doc, i) => {
          const nextDoc = documents[(i + 1) % documents.length]
          return (
            <motion.line
              key={`line-${doc.id}`}
              x1={`${doc.x}%`}
              y1={`${doc.y}%`}
              x2={`${nextDoc.x}%`}
              y2={`${nextDoc.y}%`}
              stroke="rgba(239, 68, 68, 0.3)"
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ opacity: [0.3, 0.1, 0.3, 0, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          )
        })}
      </svg>
    </div>
  )
}
