'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import type { AgentNodeConfig } from './DiagramConfig'

interface AgentNodeProps {
  config: AgentNodeConfig
  isActive: boolean
  isHighlighted: boolean
  onClick?: () => void
  showTooltip?: boolean
}

// Icon components for each agent type
const AgentIcons = {
  brain: ({ color }: { color: string }) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54" />
    </svg>
  ),
  search: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6" />
      <path d="M8 11h6" />
    </svg>
  ),
  table: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
    </svg>
  ),
  paragraph: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 4v16" />
      <path d="M17 4v16" />
      <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" />
    </svg>
  ),
  link: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  wand: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  ),
  shield: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  parallel: ({ color }: { color: string }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h18" />
      <path d="M3 12h18" />
      <path d="M3 16h18" />
      <circle cx="6" cy="8" r="1" fill={color} />
      <circle cx="12" cy="12" r="1" fill={color} />
      <circle cx="18" cy="16" r="1" fill={color} />
    </svg>
  ),
}

export default function AgentNode({
  config,
  isActive,
  isHighlighted,
  onClick,
  showTooltip = true,
}: AgentNodeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = AgentIcons[config.icon]

  const sizeClasses = {
    large: 'w-24 h-24',
    medium: 'w-18 h-18',
    small: 'w-14 h-14',
  }

  const iconScale = config.size === 'large' ? 1.3 : config.size === 'medium' ? 1 : 0.8

  return (
    <div
      className="relative"
      style={{
        position: 'absolute',
        left: `${config.position.x}%`,
        top: `${config.position.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow effect when active */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
            transform: 'scale(2)',
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1.8, 2.2, 1.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main node */}
      <motion.button
        className={`
          relative flex flex-col items-center justify-center rounded-2xl
          border-2 transition-all duration-300 cursor-pointer
          ${sizeClasses[config.size]}
          ${isHighlighted
            ? 'border-current bg-white shadow-lg'
            : 'border-gray-200 bg-gray-50'
          }
        `}
        style={{
          borderColor: isHighlighted ? config.color : undefined,
          boxShadow: isHighlighted ? `0 4px 20px ${config.glowColor}` : undefined,
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon */}
        <div
          className="transition-all duration-300"
          style={{ transform: `scale(${iconScale})` }}
        >
          <IconComponent color={isHighlighted ? config.color : '#9CA3AF'} />
        </div>

        {/* Label */}
        <span
          className={`
            text-xs font-medium mt-1 text-center px-1
            ${isHighlighted ? 'text-gray-900' : 'text-gray-400'}
          `}
        >
          {config.shortLabel}
        </span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      {showTooltip && isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-50 w-64 p-4 bg-white rounded-xl shadow-xl border border-gray-100"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: config.size === 'large' ? '110px' : '85px',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.color }}
            />
            <h4 className="font-semibold text-gray-900 text-sm">{config.label}</h4>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">{config.description}</p>
        </motion.div>
      )}
    </div>
  )
}
