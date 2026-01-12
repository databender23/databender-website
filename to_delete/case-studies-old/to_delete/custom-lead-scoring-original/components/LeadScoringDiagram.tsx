'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { inputNodes, pipelineNodes, outputBuckets, diagramColors, safeguardRules } from './DiagramConfig'

// Seeded random for consistent positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

interface LeadScoringDiagramProps {
  currentStep: number
  showBeforeAfter?: 'before' | 'after' | 'transition'
  inView: boolean
  className?: string
}

export default function LeadScoringDiagram({
  currentStep,
  showBeforeAfter = 'after',
  inView,
  className = '',
}: LeadScoringDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [showModelDetails, setShowModelDetails] = useState(false)
  const [showSafeguards, setShowSafeguards] = useState(false)

  // Pre-compute scattered positions for chaos animation
  const scatteredItems = useMemo(() => {
    const seed = 42
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: 10 + seededRandom(seed + i * 5) * 80,
      top: 10 + seededRandom(seed + i * 5 + 1) * 80,
      driftX: (seededRandom(seed + i * 5 + 2) - 0.5) * 20,
      driftY: (seededRandom(seed + i * 5 + 3) - 0.5) * 20,
      duration: 2 + seededRandom(seed + i * 5 + 4) * 2,
    }))
  }, [])

  // Determine what to show based on current step
  const showDataSources = currentStep >= 2
  const showETL = currentStep >= 4
  const showMLModel = currentStep >= 4
  const showListener = currentStep >= 5
  const showPoster = currentStep >= 5
  const showOutputs = currentStep >= 5

  // Animation variants
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const connectionVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  }

  // Get icon color for a node
  const getIconColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      'bg-blue-500': 'text-blue-500',
      'bg-red-500': 'text-red-500',
      'bg-purple-500': 'text-purple-500',
      'bg-indigo-500': 'text-indigo-500',
      'bg-teal-500': 'text-teal-500',
      'bg-amber-500': 'text-amber-500',
      'bg-green-500': 'text-green-500',
    }
    return colorMap[color] || 'text-gray-400'
  }

  return (
    <div className={`relative ${className}`}>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-xl p-6 md:p-8 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-500" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative min-h-[500px] md:min-h-[550px]">
          {/* Step 1: Chaos state - scattered question marks */}
          <AnimatePresence>
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  {/* Scattered question marks representing confusion */}
                  {scatteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="absolute text-2xl md:text-3xl"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.8, 1, 0.8],
                        x: [0, item.driftX, 0],
                        y: [0, item.driftY, 0],
                      }}
                      transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        delay: item.id * 0.1,
                      }}
                      style={{
                        left: `${item.left}%`,
                        top: `${item.top}%`,
                      }}
                    >
                      {item.id % 3 === 0 ? '?' : item.id % 3 === 1 ? '👤' : '📋'}
                    </motion.div>
                  ))}

                  {/* Central message */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-center bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-600">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <motion.span
                          className="text-4xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          🎲
                        </motion.span>
                        <span className="text-xl font-semibold text-white">The Guessing Game</span>
                      </div>
                      <p className="text-slate-400 text-sm max-w-xs">
                        500+ leads per month. Generic CRM scoring. No way to prioritize.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Pipeline Diagram - Steps 2+ */}
          {currentStep >= 2 && (
            <div className="relative h-full">
              {/* Row 1: Data Sources */}
              <motion.div
                initial="hidden"
                animate={showDataSources && inView ? 'visible' : 'hidden'}
                className="grid grid-cols-3 gap-4 mb-6"
              >
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider col-span-3 mb-2">
                  Data Sources
                </div>
                {inputNodes.map((node, index) => (
                  <motion.div
                    key={node.id}
                    variants={nodeVariants}
                    transition={{ delay: index * 0.15, duration: 0.4 }}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      hoveredNode === node.id ? 'z-20' : 'z-10'
                    }`}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                        hoveredNode === node.id
                          ? 'bg-slate-700/80 border-blue-500/50 shadow-lg shadow-blue-500/20'
                          : 'bg-slate-800/60 border-slate-600/50'
                      }`}
                    >
                      <div className={`w-10 h-10 ${node.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <span className="text-xl">{node.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white text-sm">{node.shortLabel}</div>
                        <div className="text-xs text-slate-400 truncate">{node.description}</div>
                      </div>
                    </div>

                    {/* Hover tooltip with data types */}
                    <AnimatePresence>
                      {hoveredNode === node.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute left-0 top-full mt-2 w-64 p-4 bg-slate-800 rounded-xl border border-slate-600 shadow-xl z-30"
                        >
                          <div className="text-sm font-medium text-white mb-2">{node.label}:</div>
                          <ul className="space-y-1">
                            {node.dataTypes.map((type, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                <div className={`w-1.5 h-1.5 rounded-full ${node.color}`} />
                                {type}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>

              {/* Connection arrows from data sources to pipeline */}
              {showETL && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center mb-4"
                >
                  <svg width="300" height="40" className="text-slate-500">
                    <defs>
                      <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={diagramColors.blue.primary} />
                        <stop offset="100%" stopColor={diagramColors.teal.primary} />
                      </linearGradient>
                    </defs>
                    {/* Three arrows converging */}
                    <motion.path
                      d="M 50 5 L 150 35"
                      stroke="url(#arrowGrad)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8 4"
                      variants={connectionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.8 }}
                    />
                    <motion.path
                      d="M 150 5 L 150 35"
                      stroke="url(#arrowGrad)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8 4"
                      variants={connectionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                    <motion.path
                      d="M 250 5 L 150 35"
                      stroke="url(#arrowGrad)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8 4"
                      variants={connectionVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </svg>
                </motion.div>
              )}

              {/* Row 2: Processing Pipeline */}
              <AnimatePresence>
                {showETL && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-4 gap-4 mb-6"
                  >
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider col-span-4 mb-2">
                      Processing Pipeline
                    </div>
                    {pipelineNodes.map((node, index) => {
                      const isVisible =
                        (node.id === 'etl' && showETL) ||
                        (node.id === 'ml-model' && showMLModel) ||
                        (node.id === 'listener' && showListener) ||
                        (node.id === 'poster' && showPoster)

                      if (!isVisible) {
                        return (
                          <motion.div
                            key={node.id}
                            className="p-4 rounded-xl border border-dashed border-slate-600/30 bg-slate-800/20"
                          >
                            <div className="flex items-center justify-center h-16 text-slate-600">
                              <span className="text-2xl opacity-30">{node.icon}</span>
                            </div>
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={node.id}
                          variants={nodeVariants}
                          transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
                          className={`relative cursor-pointer transition-all duration-300 ${
                            hoveredNode === node.id ? 'z-20' : 'z-10'
                          }`}
                          onMouseEnter={() => setHoveredNode(node.id)}
                          onMouseLeave={() => setHoveredNode(null)}
                          onClick={() => {
                            if (node.id === 'ml-model') setShowModelDetails(!showModelDetails)
                          }}
                        >
                          {/* Glow effect for ML model */}
                          {node.id === 'ml-model' && (
                            <motion.div
                              className="absolute inset-0 rounded-xl"
                              animate={{
                                boxShadow: [
                                  '0 0 20px rgba(26, 153, 136, 0.2)',
                                  '0 0 40px rgba(26, 153, 136, 0.4)',
                                  '0 0 20px rgba(26, 153, 136, 0.2)',
                                ],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}

                          <div
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                              hoveredNode === node.id
                                ? `bg-slate-700/80 border-opacity-50 shadow-lg`
                                : 'bg-slate-800/60 border-slate-600/50'
                            }`}
                            style={{
                              borderColor: hoveredNode === node.id ? node.glowColor : undefined,
                              boxShadow: hoveredNode === node.id ? `0 4px 20px ${node.glowColor}` : undefined,
                            }}
                          >
                            <div className={`w-12 h-12 ${node.color} rounded-xl flex items-center justify-center shadow-lg`}>
                              <span className="text-2xl">{node.icon}</span>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-white text-sm">{node.shortLabel}</div>
                              <div className="text-xs text-slate-400">{node.description.split(' ').slice(0, 4).join(' ')}</div>
                            </div>
                          </div>

                          {/* Hover tooltip */}
                          <AnimatePresence>
                            {hoveredNode === node.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-4 bg-slate-800 rounded-xl border border-slate-600 shadow-xl z-30"
                              >
                                <div className="text-sm font-medium text-white mb-2">{node.label}</div>
                                <ul className="space-y-1">
                                  {node.dataTypes.map((type, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                                      <div className={`w-1.5 h-1.5 rounded-full ${node.color}`} />
                                      {type}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Safeguard rules callout */}
              {showMLModel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6"
                >
                  <button
                    onClick={() => setShowSafeguards(!showSafeguards)}
                    className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>🛡️</span>
                    <span>Safeguard Scoring Rules</span>
                    <motion.span
                      animate={{ rotate: showSafeguards ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {showSafeguards && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
                      >
                        <div className="space-y-2">
                          {safeguardRules.map((rule, i) => (
                            <div key={i} className="flex items-center gap-3 text-xs">
                              <span className="text-amber-400 font-medium">{rule.condition}:</span>
                              <span className="text-slate-300">{rule.description}</span>
                              <span className="text-success font-mono">min {rule.minScore}%</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Row 3: Output Buckets */}
              <AnimatePresence>
                {showOutputs && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="text-xs font-medium text-slate-400 uppercase tracking-wider col-span-3 mb-2">
                      Lead Scores → Salesforce
                    </div>
                    {outputBuckets.map((bucket, index) => {
                      const percentage = showBeforeAfter === 'before'
                        ? bucket.beforePercentage
                        : bucket.percentage

                      return (
                        <motion.div
                          key={bucket.id}
                          variants={nodeVariants}
                          transition={{ delay: 0.5 + index * 0.15, duration: 0.4 }}
                          className={`p-4 rounded-xl border ${bucket.bgColor} ${bucket.borderColor} border-opacity-50`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${bucket.color}`}>{bucket.label}</span>
                            <motion.span
                              className={`text-lg font-bold ${bucket.color}`}
                              key={percentage}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                            >
                              {percentage}%
                            </motion.span>
                          </div>

                          {/* Animated bar */}
                          <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${
                                bucket.id === 'hot' ? 'bg-success' :
                                bucket.id === 'warm' ? 'bg-warning' : 'bg-gray-400'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                            />
                          </div>

                          <p className="text-xs text-slate-400 mt-2">{bucket.description}</p>
                        </motion.div>
                      )
                    })}

                    {/* Before/After toggle hint */}
                    {showBeforeAfter && currentStep >= 5 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="col-span-3 text-center pt-2"
                      >
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          showBeforeAfter === 'after'
                            ? 'bg-success/20 text-success'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {showBeforeAfter === 'after' ? 'After: ML Scoring with 0.81 threshold' : 'Before: Generic CRM Scoring'}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Real-time indicator */}
              {showListener && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-0 right-0 flex items-center gap-2 text-xs text-teal-400"
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-teal-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span>Real-time: polling every 30s</span>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
