'use client'

import { motion } from 'framer-motion'

interface AIServicesAnimationProps {
  className?: string
  isActive?: boolean
}

// Icon components for the outer agent nodes
function NodeIcon({ type, className = '' }: { type: string; className?: string }) {
  const iconClass = `w-5 h-5 sm:w-6 sm:h-6 ${className}`

  switch (type) {
    case 'sparkles':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    case 'robot':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'gear':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    case 'lightning':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    case 'chip':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    case 'brain':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    default:
      return null
  }
}

// Central AI hub component
function CentralHub({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-[#1A9988]/20 blur-xl"
        animate={{
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.3, 0.5, 0.3] : 0.2,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
      />

      {/* Inner pulse ring */}
      <motion.div
        className="absolute rounded-full border-2 border-[#1A9988]/30"
        animate={{
          scale: isActive ? [1, 1.5, 1] : 1,
          opacity: isActive ? [0.5, 0, 0.5] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        style={{ width: '100%', height: '100%', inset: 0 }}
      />

      {/* Main hub circle */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1A9988] to-[#147A6C] shadow-lg flex items-center justify-center">
        <motion.div
          animate={isActive ? { rotate: 360 } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <NodeIcon type="brain" className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Outer agent node component
function AgentNode({
  icon,
  angle,
  radius,
  rotationDirection,
  rotationDuration,
  delay,
  isActive,
}: {
  icon: string
  angle: number
  radius: number
  rotationDirection: 'clockwise' | 'counter-clockwise'
  rotationDuration: number
  delay: number
  isActive: boolean
}) {
  const direction = rotationDirection === 'clockwise' ? 1 : -1

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isActive ? direction * 360 : 0,
      }}
      transition={{
        opacity: { duration: 0.3, delay },
        scale: { duration: 0.3, delay },
        rotate: {
          duration: rotationDuration,
          repeat: Infinity,
          ease: 'linear',
        },
      }}
    >
      <motion.div
        className="absolute"
        style={{
          transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`,
        }}
        animate={
          isActive
            ? {
                rotate: [
                  `${angle}deg`,
                  `${angle + direction * 360}deg`,
                ],
              }
            : {}
        }
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Counter-rotate the content to keep it upright */}
        <motion.div
          className="transform -translate-x-1/2 -translate-y-1/2"
          animate={
            isActive
              ? {
                  rotate: [-direction * 360, 0],
                }
              : {}
          }
          transition={{
            duration: rotationDuration,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#1A9988]/30 shadow-md flex items-center justify-center hover:border-[#1A9988] transition-colors">
            <NodeIcon type={icon} className="text-[#1A9988]" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Animated connection line with dashed animation
function ConnectionLine({
  angle,
  radius,
  rotationDirection,
  rotationDuration,
  isActive,
}: {
  angle: number
  radius: number
  rotationDirection: 'clockwise' | 'counter-clockwise'
  rotationDuration: number
  isActive: boolean
}) {
  const direction = rotationDirection === 'clockwise' ? 1 : -1
  const innerRadius = 40 // Distance from center to line start
  const lineLength = radius - innerRadius - 20 // Leave gap for nodes

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: 0,
        height: 0,
      }}
      animate={{
        rotate: isActive ? direction * 360 : 0,
      }}
      transition={{
        duration: rotationDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <svg
        className="absolute overflow-visible"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: '0 0',
        }}
        width={lineLength}
        height="4"
      >
        <defs>
          <linearGradient id={`lineGradient-${angle}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A9988" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1A9988" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.line
          x1={innerRadius}
          y1="2"
          x2={innerRadius + lineLength}
          y2="2"
          stroke={`url(#lineGradient-${angle})`}
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={
            isActive
              ? {
                  strokeDashoffset: [0, -20],
                }
              : {}
          }
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </svg>
    </motion.div>
  )
}

// Floating particle effect
function FloatingParticle({
  angle,
  delay,
  isActive,
}: {
  angle: number
  delay: number
  isActive: boolean
}) {
  if (!isActive) return null

  const radius = 80

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-[#1A9988]"
      style={{
        transform: `rotate(${angle}deg) translateX(40px)`,
      }}
      animate={{
        x: [0, Math.cos((angle * Math.PI) / 180) * radius],
        y: [0, Math.sin((angle * Math.PI) / 180) * radius],
        opacity: [0, 1, 0],
        scale: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function AIServicesAnimation({
  className = '',
  isActive = true,
}: AIServicesAnimationProps) {
  // Define outer nodes configuration
  const nodes = [
    { icon: 'sparkles', angle: 0, rotationDirection: 'clockwise' as const, duration: 25 },
    { icon: 'robot', angle: 72, rotationDirection: 'counter-clockwise' as const, duration: 30 },
    { icon: 'gear', angle: 144, rotationDirection: 'clockwise' as const, duration: 28 },
    { icon: 'lightning', angle: 216, rotationDirection: 'counter-clockwise' as const, duration: 32 },
    { icon: 'chip', angle: 288, rotationDirection: 'clockwise' as const, duration: 26 },
  ]

  const radius = 90 // Distance from center to outer nodes

  return (
    <div className={`relative w-full aspect-square max-w-[280px] sm:max-w-[320px] mx-auto ${className}`}>
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A9988" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Outer orbit ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1A9988]/10"
        style={{ width: radius * 2 + 48, height: radius * 2 + 48 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Secondary orbit ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#1A9988]/5"
        style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Connection lines */}
      {nodes.map((node, index) => (
        <ConnectionLine
          key={`line-${index}`}
          angle={node.angle}
          radius={radius}
          rotationDirection={node.rotationDirection}
          rotationDuration={node.duration}
          isActive={isActive}
        />
      ))}

      {/* Floating particles */}
      {isActive &&
        nodes.map((node, index) => (
          <FloatingParticle
            key={`particle-${index}`}
            angle={node.angle}
            delay={index * 0.4}
            isActive={isActive}
          />
        ))}

      {/* Central hub */}
      <CentralHub isActive={isActive} />

      {/* Outer agent nodes */}
      {nodes.map((node, index) => (
        <AgentNode
          key={`node-${index}`}
          icon={node.icon}
          angle={node.angle}
          radius={radius}
          rotationDirection={node.rotationDirection}
          rotationDuration={node.duration}
          delay={index * 0.1}
          isActive={isActive}
        />
      ))}
    </div>
  )
}
