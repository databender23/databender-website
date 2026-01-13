'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface AnalyticsBIAnimationProps {
  className?: string
  isActive?: boolean
}

export default function AnalyticsBIAnimation({ className = '', isActive = true }: AnalyticsBIAnimationProps) {
  const [stage, setStage] = useState(0)

  // Cycle through animation stages
  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 4)
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  // Bar chart data - heights animate based on stage
  const barHeights = [
    [35, 55, 45, 70, 50],
    [45, 65, 75, 55, 60],
    [60, 45, 55, 80, 70],
    [50, 70, 60, 65, 75],
  ]

  // Pie chart segments
  const pieSegments = [
    { value: 35, color: '#1A9988' },
    { value: 25, color: '#2DD4BF' },
    { value: 25, color: '#99F6E4' },
    { value: 15, color: '#CCFBF1' },
  ]

  // Line chart points
  const linePoints = [
    [20, 35, 28, 45, 38, 55, 48, 62],
    [25, 30, 40, 35, 50, 45, 58, 55],
    [15, 40, 32, 50, 42, 48, 60, 58],
    [30, 25, 45, 40, 48, 52, 55, 65],
  ]

  const currentBars = barHeights[stage]
  const currentLine = linePoints[stage]

  // Generate SVG path for line chart
  const generateLinePath = (points: number[]) => {
    const width = 120
    const height = 50
    const stepX = width / (points.length - 1)

    return points
      .map((y, i) => {
        const x = i * stepX
        const scaledY = height - (y / 70) * height
        return `${i === 0 ? 'M' : 'L'} ${x} ${scaledY}`
      })
      .join(' ')
  }

  // Calculate pie chart path
  const calculatePieSegment = (startAngle: number, endAngle: number, radius: number = 30) => {
    const start = polarToCartesian(50, 50, radius, endAngle)
    const end = polarToCartesian(50, 50, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

    return [
      'M', 50, 50,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ')
  }

  const polarToCartesian = (cx: number, cy: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180
    return {
      x: cx + radius * Math.cos(angleInRadians),
      y: cy + radius * Math.sin(angleInRadians),
    }
  }

  // Build pie segments
  let cumulativeAngle = 0
  const pieChartPaths = pieSegments.map((segment) => {
    const startAngle = cumulativeAngle
    const endAngle = cumulativeAngle + (segment.value / 100) * 360
    cumulativeAngle = endAngle
    return {
      path: calculatePieSegment(startAngle, endAngle),
      color: segment.color,
    }
  })

  return (
    <div className={`relative w-full h-full min-h-[280px] ${className}`}>
      {/* Dashboard frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm overflow-hidden"
      >
        {/* Header bar */}
        <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="h-4 w-32 bg-gray-200 rounded-sm" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 grid grid-cols-2 gap-4 h-[calc(100%-2rem)]">
          {/* Bar chart panel */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm">
            <div className="h-3 w-16 bg-gray-200 rounded-sm mb-3" />
            <div className="flex items-end justify-between h-[calc(100%-1.5rem)] gap-2 px-2">
              {currentBars.map((height, index) => (
                <motion.div
                  key={index}
                  className="flex-1 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Pie chart panel */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm flex flex-col">
            <div className="h-3 w-20 bg-gray-200 rounded-sm mb-2" />
            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full max-w-[100px] max-h-[100px]">
                {pieChartPaths.map((segment, index) => (
                  <motion.path
                    key={index}
                    d={segment.path}
                    fill={segment.color}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    style={{ transformOrigin: '50px 50px' }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Line chart panel */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm col-span-2">
            <div className="h-3 w-24 bg-gray-200 rounded-sm mb-2" />
            <div className="relative h-[50px]">
              <svg
                viewBox="0 0 120 50"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 1, 2, 3].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={12.5 * i}
                    x2="120"
                    y2={12.5 * i}
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Line chart path */}
                <motion.path
                  d={generateLinePath(currentLine)}
                  fill="none"
                  stroke="#1A9988"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Data points */}
                {currentLine.map((y, i) => {
                  const x = (i * 120) / (currentLine.length - 1)
                  const scaledY = 50 - (y / 70) * 50
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={scaledY}
                      r="3"
                      fill="#1A9988"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    />
                  )
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Magnifying glass sweep */}
        {isActive && (
          <motion.div
            className="absolute pointer-events-none"
            initial={{ x: 20, y: 60, opacity: 0 }}
            animate={{
              x: [20, 180, 180, 20],
              y: [60, 60, 180, 180],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg
              className="w-10 h-10 text-teal-500/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.div>
        )}

        {/* Floating data indicators */}
        {isActive && (
          <>
            <motion.div
              className="absolute top-14 right-8 text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [-10, 0, 0, 10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              +24%
            </motion.div>
            <motion.div
              className="absolute bottom-20 left-8 text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              +12%
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}
