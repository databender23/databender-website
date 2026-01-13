'use client'

import { ComponentType } from 'react'
import LottieWrapper from './LottieWrapper'

interface ResponsiveAnimationProps {
  /** Lottie animation URL */
  lottieUrl: string
  /** Framer Motion component (kept for future use) */
  MobileComponent?: ComponentType<{ className?: string; isActive?: boolean }>
  /** Additional class names */
  className?: string
  /** Whether animation is active */
  isActive?: boolean
  /** Lottie animation speed */
  speed?: number
  /** Whether to loop */
  loop?: boolean
}

/**
 * Animation wrapper - uses Lottie for all screen sizes
 */
export default function ResponsiveAnimation({
  lottieUrl,
  className = '',
  isActive = true,
  speed = 1,
  loop = true,
}: ResponsiveAnimationProps) {
  return (
    <LottieWrapper
      animationUrl={lottieUrl}
      className={className}
      speed={speed}
      loop={loop}
      autoplay={isActive}
    />
  )
}
