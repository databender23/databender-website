'use client'

import { motion } from 'framer-motion'

interface DataVizAnimationProps {
  className?: string
  isActive?: boolean
}

export default function DataVizAnimation({
  className = '',
  isActive = true
}: DataVizAnimationProps) {
  const teal = '#1A9988'
  const tealLight = '#2BB5A2'
  const tealDark = '#157A6B'
  const gray = '#E5E7EB'
  const grayDark = '#9CA3AF'

  // Bar chart data
  const bars = [
    { height: 60, delay: 0 },
    { height: 85, delay: 0.1 },
    { height: 45, delay: 0.2 },
    { height: 95, delay: 0.3 },
    { height: 70, delay: 0.4 },
  ]

  // Line chart points
  const linePoints = [
    { x: 0, y: 70 },
    { x: 25, y: 45 },
    { x: 50, y: 60 },
    { x: 75, y: 30 },
    { x: 100, y: 40 },
  ]

  const linePath = linePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Pie chart segments
  const pieSegments = [
    { startAngle: 0, endAngle: 120, color: teal },
    { startAngle: 120, endAngle: 220, color: tealLight },
    { startAngle: 220, endAngle: 300, color: tealDark },
    { startAngle: 300, endAngle: 360, color: gray },
  ]

  // Scatter plot points
  const scatterPoints = [
    { x: 15, y: 25, size: 4 },
    { x: 35, y: 55, size: 5 },
    { x: 55, y: 35, size: 4 },
    { x: 70, y: 70, size: 6 },
    { x: 85, y: 45, size: 4 },
    { x: 45, y: 80, size: 5 },
    { x: 25, y: 65, size: 4 },
    { x: 75, y: 25, size: 5 },
  ]

  // Helper to create pie segment path
  const createPieSegment = (
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
  ) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Bar Chart - Top Left */}
        <g transform="translate(20, 20)">
          {/* Axis lines */}
          <motion.line
            x1="0"
            y1="100"
            x2="100"
            y2="100"
            stroke={grayDark}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke={grayDark}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Bars */}
          {bars.map((bar, i) => (
            <motion.rect
              key={i}
              x={8 + i * 18}
              y={100 - bar.height}
              width="12"
              height={bar.height}
              fill={i % 2 === 0 ? teal : tealLight}
              rx="2"
              initial={{ scaleY: 0, originY: 1 }}
              animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{
                duration: 0.6,
                delay: bar.delay,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: `${14 + i * 18}px 100px` }}
            />
          ))}
        </g>

        {/* Line Chart - Top Right */}
        <g transform="translate(140, 20)">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y, i) => (
            <motion.line
              key={i}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke={gray}
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 0.5 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}

          {/* Line path */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={teal}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
          />

          {/* Data points on line */}
          {linePoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="white"
              stroke={teal}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.15 }}
            />
          ))}
        </g>

        {/* Pie Chart - Bottom Left */}
        <g transform="translate(70, 200)">
          {pieSegments.map((segment, i) => (
            <motion.path
              key={i}
              d={createPieSegment(0, 0, 50, segment.startAngle, segment.endAngle)}
              fill={segment.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.12,
                ease: 'easeOut',
              }}
              style={{ transformOrigin: '0px 0px' }}
            />
          ))}

          {/* Center circle for donut effect */}
          <motion.circle
            cx="0"
            cy="0"
            r="25"
            fill="white"
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
          />

          {/* Percentage text */}
          <motion.text
            x="0"
            y="4"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={teal}
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.3 }}
          >
            67%
          </motion.text>
        </g>

        {/* Scatter Plot - Bottom Right */}
        <g transform="translate(160, 150)">
          {/* Axis */}
          <motion.line
            x1="0"
            y1="100"
            x2="100"
            y2="100"
            stroke={grayDark}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            stroke={grayDark}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />

          {/* Scatter points */}
          {scatterPoints.map((point, i) => (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={point.size}
              fill={teal}
              fillOpacity={0.7}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isActive
                  ? {
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 0.7],
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.5,
                delay: 1 + i * 0.08,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Trend line */}
          <motion.line
            x1="10"
            y1="75"
            x2="90"
            y2="30"
            stroke={tealDark}
            strokeWidth="1.5"
            strokeDasharray="4 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />
        </g>

        {/* Floating data indicators */}
        <g>
          {/* Floating plus signs */}
          {[
            { x: 280, y: 40, delay: 1.8 },
            { x: 320, y: 80, delay: 2.0 },
            { x: 350, y: 130, delay: 2.2 },
          ].map((item, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={
                isActive
                  ? {
                      opacity: [0, 0.6, 0.6, 0],
                      y: [10, 0, 0, -10],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 3,
                delay: item.delay,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <text
                x={item.x}
                y={item.y}
                fill={teal}
                fontSize="16"
                fontWeight="300"
              >
                +
              </text>
            </motion.g>
          ))}

          {/* Pulsing data dots */}
          {[
            { x: 300, y: 220, delay: 1.5 },
            { x: 340, y: 250, delay: 1.7 },
            { x: 370, y: 200, delay: 1.9 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r="3"
              fill={tealLight}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isActive
                  ? {
                      opacity: [0, 0.8, 0.8, 0],
                      scale: [0, 1, 1.5, 2],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 2.5,
                delay: dot.delay,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          ))}
        </g>

        {/* Decorative connecting lines */}
        <motion.path
          d="M 120 70 Q 130 90 140 70"
          fill="none"
          stroke={gray}
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />
        <motion.path
          d="M 120 200 Q 140 180 160 200"
          fill="none"
          stroke={gray}
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isActive ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        />
      </svg>
    </div>
  )
}
