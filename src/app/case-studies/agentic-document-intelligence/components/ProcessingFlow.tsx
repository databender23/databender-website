'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProcessingFlowProps {
  isActive: boolean
  className?: string
}

interface DocumentPacket {
  id: number
  stage: 'input' | 'extracting' | 'validating' | 'output' | 'error' | 'retry'
  x: number
  hasError: boolean
}

// Processing stage component - V2: Plain English labels
function ProcessingStage({
  label,
  icon,
  isActive,
  color,
  count,
}: {
  label: string
  icon: React.ReactNode
  isActive: boolean
  color: string
  count?: number
}) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center
          border-2 transition-all duration-300
          ${isActive ? 'bg-white shadow-lg' : 'bg-bg-secondary'}
        `}
        style={{
          borderColor: isActive ? color : 'var(--border)',
          boxShadow: isActive ? `0 0 20px ${color}40` : undefined,
        }}
        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <span className="text-xs text-text-secondary mt-2 font-medium">{label}</span>
      {count !== undefined && (
        <motion.span
          className="text-xs font-bold mt-1"
          style={{ color }}
          key={count}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
        >
          {count}
        </motion.span>
      )}
    </div>
  )
}

// Animated document icon that flows through the pipeline
function FlowingDocument({
  packet,
  onComplete,
}: {
  packet: DocumentPacket
  onComplete: (id: number) => void
}) {
  useEffect(() => {
    if (packet.stage === 'output') {
      const timer = setTimeout(() => onComplete(packet.id), 500)
      return () => clearTimeout(timer)
    }
  }, [packet.stage, packet.id, onComplete])

  const stagePositions = {
    input: 0,
    extracting: 25,
    validating: 50,
    error: 60,
    retry: 30,
    output: 100,
  }

  const stageColors = {
    input: '#1A9988',
    extracting: '#3B82F6',
    validating: '#22C55E',
    error: '#EF4444',
    retry: '#F59E0B',
    output: '#22C55E',
  }

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2"
      initial={{ left: '0%', opacity: 0 }}
      animate={{
        left: `${stagePositions[packet.stage]}%`,
        opacity: packet.stage === 'output' ? 0 : 1,
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-10 h-12 rounded-lg flex items-center justify-center shadow-md"
        style={{
          backgroundColor: packet.hasError && packet.stage === 'error' ? '#FEE2E2' : '#FFFFFF',
          borderColor: stageColors[packet.stage],
          borderWidth: 2,
        }}
        animate={packet.stage === 'error' ? { x: [-2, 2, -2, 2, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {packet.hasError && packet.stage === 'error' && (
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <span className="text-white text-xs">!</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function ProcessingFlow({ isActive, className = '' }: ProcessingFlowProps) {
  const [documents, setDocuments] = useState<DocumentPacket[]>([])
  const [stats, setStats] = useState({
    processed: 0,
    inProgress: 0,
    errors: 0,
    retries: 0,
  })
  const [nextId, setNextId] = useState(0)

  const addDocument = useCallback(() => {
    const hasError = Math.random() < 0.15

    setDocuments(prev => [
      ...prev,
      {
        id: nextId,
        stage: 'input',
        x: 0,
        hasError,
      },
    ])
    setNextId(prev => prev + 1)
    setStats(prev => ({ ...prev, inProgress: prev.inProgress + 1 }))
  }, [nextId])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setDocuments(prev => {
        return prev.map(doc => {
          if (doc.stage === 'input') {
            return { ...doc, stage: 'extracting' }
          } else if (doc.stage === 'extracting') {
            return { ...doc, stage: 'validating' }
          } else if (doc.stage === 'validating') {
            if (doc.hasError) {
              setStats(s => ({ ...s, errors: s.errors + 1 }))
              return { ...doc, stage: 'error' }
            }
            return { ...doc, stage: 'output' }
          } else if (doc.stage === 'error') {
            setStats(s => ({ ...s, retries: s.retries + 1 }))
            return { ...doc, stage: 'retry', hasError: false }
          } else if (doc.stage === 'retry') {
            return { ...doc, stage: 'extracting' }
          }
          return doc
        })
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [isActive])

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      if (documents.length < 8) {
        addDocument()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive, documents.length, addDocument])

  const handleComplete = useCallback((id: number) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
    setStats(prev => ({
      ...prev,
      processed: prev.processed + 1,
      inProgress: Math.max(0, prev.inProgress - 1),
    }))
  }, [])

  const activeStage = documents.length > 0
    ? documents[documents.length - 1].stage
    : 'input'

  return (
    <div className={`${className}`}>
      <div className="bg-bg-primary rounded-2xl border border-border shadow-sm p-8">
        {/* Header - V2: Plain English */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Watch It Work</h3>
            <p className="text-sm text-text-secondary">Documents flow through the AI team automatically</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-text-secondary font-medium">Processing Live</span>
          </div>
        </div>

        {/* Pipeline visualization */}
        <div className="relative py-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-border via-gray-200 to-border rounded-full -translate-y-1/2" />

          <motion.div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 rounded-full -translate-y-1/2"
            initial={{ width: '0%' }}
            animate={{ width: isActive ? '100%' : '0%' }}
            transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
          />

          {/* Stages - V2: Plain English labels */}
          <div className="relative flex justify-between items-center px-4">
            <ProcessingStage
              label="Upload"
              isActive={activeStage === 'input'}
              color="#1A9988"
              icon={
                <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
            />

            <ProcessingStage
              label="Reading"
              isActive={activeStage === 'extracting'}
              color="#3B82F6"
              count={stats.inProgress}
              icon={
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />

            <ProcessingStage
              label="Checking"
              isActive={activeStage === 'validating' || activeStage === 'error'}
              color="#22C55E"
              icon={
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />

            <ProcessingStage
              label="Done"
              isActive={activeStage === 'output'}
              color="#22C55E"
              count={stats.processed}
              icon={
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              }
            />
          </div>

          <AnimatePresence>
            {documents.map(packet => (
              <FlowingDocument
                key={packet.id}
                packet={packet}
                onComplete={handleComplete}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Self-healing indicator - V2: Plain English */}
        <AnimatePresence>
          {stats.retries > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 mt-4 py-2 px-4 bg-amber-50 rounded-lg border border-amber-200"
            >
              <motion.svg
                className="w-4 h-4 text-amber-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <path fill="currentColor" d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
              </motion.svg>
              <span className="text-sm text-amber-700">
                Fixed automatically: <strong>{stats.retries}</strong> errors caught and corrected
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats bar - V2: Plain English */}
        <div className="mt-6 pt-6 border-t border-border grid grid-cols-4 gap-4">
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-teal-500"
              key={stats.processed}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {stats.processed}
            </motion.div>
            <div className="text-xs text-text-muted">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            <div className="text-xs text-text-muted">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-500">{stats.retries}</div>
            <div className="text-xs text-text-muted">Auto-Fixed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">0</div>
            <div className="text-xs text-text-muted">Need Human</div>
          </div>
        </div>
      </div>
    </div>
  )
}
