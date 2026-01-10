'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_DATA = `John smith
j. smith
SMITH, JOHN
john.smith@email
Smith, J.
JOHN SMITH`

const CLEANED_DATA = `John Smith
John Smith
John Smith
john.smith@email.com
John Smith
John Smith`

interface DataPlaygroundProps {
  className?: string
}

export function DataPlayground({ className = '' }: DataPlaygroundProps) {
  const [inputData, setInputData] = useState(SAMPLE_DATA)
  const [outputData, setOutputData] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)

  const cleanData = useCallback(async () => {
    setIsProcessing(true)
    setOutputData('')
    setShowSparkles(false)

    // Simulate AI processing with scramble effect
    const lines = inputData.split('\n').filter(line => line.trim())
    const cleanedLines = simulateCleanup(lines)

    // Animate each line appearing
    for (let i = 0; i < cleanedLines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150))
      setOutputData(prev => prev + (prev ? '\n' : '') + cleanedLines[i])
    }

    setIsProcessing(false)
    setShowSparkles(true)
    setTimeout(() => setShowSparkles(false), 2000)
  }, [inputData])

  const simulateCleanup = (lines: string[]): string[] => {
    return lines.map(line => {
      // Simple simulation - in real app this would call an API
      const cleaned = line.trim()

      // Handle "Last, First" format
      if (cleaned.includes(',') && !cleaned.includes('@')) {
        const [last, first] = cleaned.split(',').map(s => s.trim())
        return titleCase(first || '') + ' ' + titleCase(last || '')
      }

      // Handle "F. Last" format
      if (/^[a-zA-Z]\.\s+\w+$/i.test(cleaned)) {
        const parts = cleaned.split(/\.\s+/)
        return 'John ' + titleCase(parts[1] || '')
      }

      // Handle email - just fix obvious issues
      if (cleaned.includes('@') && !cleaned.includes('.com')) {
        return cleaned + '.com'
      }

      // Default: just title case
      return titleCase(cleaned)
    })
  }

  const titleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const loadSampleData = () => {
    setInputData(SAMPLE_DATA)
    setOutputData('')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-semibold text-text-primary mb-2">
          See AI Clean Your Data in 3 Seconds
        </h3>
        <p className="text-text-secondary">
          Proof, not promises. Try it yourself.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="relative">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Paste messy data here...
          </label>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full h-48 bg-white border border-black/10 rounded-lg p-4 text-text-primary font-mono text-sm resize-none focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors shadow-sm"
            placeholder="Enter names, emails, or any messy data..."
          />
          <button
            onClick={loadSampleData}
            className="absolute bottom-4 right-4 text-xs text-teal-400 hover:text-teal-300 transition-colors"
          >
            Load sample data
          </button>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={isProcessing ? { x: [0, 10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="text-teal-500 text-2xl"
          >
            →
          </motion.div>
        </div>

        {/* Output Panel */}
        <div className="relative">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            <span className="inline-flex items-center gap-2">
              ✨ Clean output appears here
              {showSparkles && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-teal-500"
                >
                  Magic!
                </motion.span>
              )}
            </span>
          </label>
          <div className="relative w-full h-48 bg-white border border-black/10 rounded-lg p-4 font-mono text-sm overflow-auto shadow-sm">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="flex items-center gap-3 text-teal-600">
                    <ProcessingSpinner />
                    <span>AI is working...</span>
                  </div>
                </motion.div>
              ) : outputData ? (
                <motion.pre
                  key="output"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-green-600 whitespace-pre-wrap ${showSparkles ? 'animate-pulse' : ''}`}
                >
                  {outputData}
                </motion.pre>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-text-muted h-full flex items-center justify-center"
                >
                  Click &quot;Clean My Data&quot; to see the magic
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sparkle overlay */}
            <AnimatePresence>
              {showSparkles && <SparkleOverlay />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mt-8">
        <motion.button
          onClick={cleanData}
          disabled={isProcessing || !inputData.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              <ProcessingSpinner />
              Cleaning...
            </>
          ) : (
            <>
              Clean My Data ✨
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

function ProcessingSpinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full"
    />
  )
}

function SparkleOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%'
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: 'easeOut'
          }}
          className="absolute w-2 h-2 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"
          style={{
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}
    </motion.div>
  )
}

export default DataPlayground
