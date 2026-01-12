'use client'

import { motion } from 'framer-motion'
import { CaseStudyDiagram } from './CaseStudyDiagrams'

interface CaseStudyThumbnailProps {
  type: 'entity-resolution' | 'lead-scoring' | 'document-intelligence'
  title: string
  heroMetric?: {
    value: string
    label: string
  }
  className?: string
}

export function CaseStudyThumbnail({
  type,
  title,
  heroMetric,
  className = '',
}: CaseStudyThumbnailProps) {
  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden cursor-pointer ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Diagram background */}
      <div className="absolute inset-0">
        <CaseStudyDiagram
          type={type}
          compact={true}
          interactive={false}
          className="w-full h-full"
        />
      </div>

      {/* Hero metric overlay */}
      {heroMetric && (
        <motion.div
          className="absolute top-3 right-3 text-right bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xl font-bold text-white">
            {heroMetric.value}
          </div>
          <div className="text-xs text-white/80">
            {heroMetric.label}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default CaseStudyThumbnail
