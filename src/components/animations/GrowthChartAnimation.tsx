'use client'

import { motion } from 'framer-motion'

interface GrowthChartAnimationProps {
  className?: string
  isActive?: boolean
}

export default function GrowthChartAnimation({
  className = '',
  isActive = true,
}: GrowthChartAnimationProps) {
  const bars = [
    { height: 35, delay: 0 },
    { height: 50, delay: 0.1 },
    { height: 42, delay: 0.2 },
    { height: 65, delay: 0.3 },
    { height: 58, delay: 0.4 },
    { height: 85, delay: 0.5 },
  ]

  const metrics = [
    { value: '+24%', x: 15, y: 25, delay: 0.8 },
    { value: '+67%', x: 75, y: 15, delay: 1.2 },
  ]

  return (
    <div className={`relative w-full h-full ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ background: 'transparent' }}
      >
        {/* Grid lines */}
        <g opacity={0.1}>
          {[20, 40, 60, 80].map((y) => (
            <motion.line
              key={y}
              x1="10"
              y1={y}
              x2="90"
              y2={y}
              stroke="#1A9988"
              strokeWidth="0.3"
              initial={{ opacity: 0 }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          ))}
        </g>

        {/* Animated bars */}
        {bars.map((bar, index) => {
          const barWidth = 10
          const gap = 3
          const startX = 12 + index * (barWidth + gap)
          const baseY = 88

          return (
            <motion.rect
              key={index}
              x={startX}
              y={baseY}
              width={barWidth}
              rx="2"
              fill="url(#barGradient)"
              initial={{ height: 0, y: baseY }}
              animate={
                isActive
                  ? { height: bar.height, y: baseY - bar.height }
                  : { height: 0, y: baseY }
              }
              transition={{
                duration: 0.8,
                delay: bar.delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            />
          )
        })}

        {/* Trend line */}
        <motion.path
          d="M 17 75 Q 30 65 42 70 T 67 50 T 82 25"
          fill="none"
          stroke="#1A9988"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isActive
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        />

        {/* Trend line glow */}
        <motion.path
          d="M 17 75 Q 30 65 42 70 T 67 50 T 82 25"
          fill="none"
          stroke="#1A9988"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.2}
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
        />

        {/* End point dot */}
        <motion.circle
          cx="82"
          cy="25"
          r="3"
          fill="#1A9988"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{ duration: 0.4, delay: 1.6 }}
        />

        {/* Pulsing ring around end point */}
        <motion.circle
          cx="82"
          cy="25"
          r="3"
          fill="none"
          stroke="#1A9988"
          strokeWidth="1"
          initial={{ scale: 1, opacity: 0 }}
          animate={
            isActive
              ? {
                  scale: [1, 2.5],
                  opacity: [0.6, 0],
                }
              : { scale: 1, opacity: 0 }
          }
          transition={{
            duration: 1.5,
            delay: 1.8,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />

        {/* Upward arrows */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <path
            d="M 88 45 L 92 38 L 96 45"
            fill="none"
            stroke="#1A9988"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.path
            d="M 92 38 L 92 52"
            fill="none"
            stroke="#1A9988"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.3, delay: 1.5 }}
          />
        </motion.g>

        {/* Small decorative arrow */}
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          animate={isActive ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <path
            d="M 5 55 L 8 50 L 11 55"
            fill="none"
            stroke="#1A9988"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="8"
            y1="50"
            x2="8"
            y2="60"
            stroke="#1A9988"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1A9988" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1A9988" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating metrics */}
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          className="absolute font-semibold text-xs"
          style={{
            left: `${metric.x}%`,
            top: `${metric.y}%`,
            color: '#1A9988',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={
            isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
          }
          transition={{ duration: 0.5, delay: metric.delay }}
        >
          <motion.span
            animate={
              isActive
                ? { y: [0, -3, 0] }
                : { y: 0 }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 0.5,
              delay: metric.delay + 0.5,
            }}
            className="inline-block"
          >
            {metric.value}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}
