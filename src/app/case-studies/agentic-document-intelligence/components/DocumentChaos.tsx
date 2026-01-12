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
  const seedRef = useRef(42)

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

  // V2: Use icons instead of emojis for better accessibility
  const typeIcons: Record<Document['type'], React.ReactNode> = {
    table: (
      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeWidth={1.5} />
      </svg>
    ),
    text: (
      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    footnote: (
      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    crossref: (
      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
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
            {typeIcons[doc.type]}
            {doc.hasError && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">!</span>
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
