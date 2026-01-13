'use client'

import { useEffect, useState, ComponentType } from 'react'
import LottieWrapper from './LottieWrapper'

interface ResponsiveAnimationProps {
  /** Lottie animation URL for desktop */
  lottieUrl: string
  /** Framer Motion component for mobile */
  MobileComponent: ComponentType<{ className?: string; isActive?: boolean }>
  /** Additional class names */
  className?: string
  /** Whether animation is active */
  isActive?: boolean
  /** Lottie animation speed (desktop only) */
  speed?: number
  /** Whether to loop (desktop Lottie only) */
  loop?: boolean
}

/**
 * Responsive animation wrapper that shows:
 * - Lottie animation on desktop (md and above)
 * - Framer Motion component on mobile (below md)
 */
export default function ResponsiveAnimation({
  lottieUrl,
  MobileComponent,
  className = '',
  isActive = true,
  speed = 1,
  loop = true,
}: ResponsiveAnimationProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Show nothing during SSR to avoid hydration mismatch
  if (!isMounted) {
    return <div className={`w-full h-full ${className}`} />
  }

  if (isMobile) {
    return <MobileComponent className={className} isActive={isActive} />
  }

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
