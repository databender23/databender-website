'use client'

import { useEffect, useState, useRef, ComponentType } from 'react'
import { motion } from 'framer-motion'
import LottieWrapper from './LottieWrapper'

interface HeroLottieProps {
  /** Lottie animation URL */
  lottieUrl: string
  /** Framer Motion component (kept for future use) */
  MobileComponent?: ComponentType<{ className?: string; isActive?: boolean }>
  /** Additional class names for the outer container */
  className?: string
  /** Whether animation is active */
  isActive?: boolean
  /** Lottie animation speed */
  speed?: number
  /** Whether to loop */
  loop?: boolean
  /** Priority loading */
  priority?: boolean
  /** Keep animation looping on mobile */
  keepPlayingOnMobile?: boolean
  /**
   * Estimated height of hero text content in pixels.
   * Used to calculate available space for animation.
   * Default: 200 (title + subtitle only, buttons can be below fold)
   */
  heroTextHeight?: number
  /**
   * Maximum size as percentage of calculated space.
   * Default: 0.9 (90% of available space)
   */
  maxSizeRatio?: number
  /**
   * Minimum animation size in pixels.
   * Default: 150
   */
  minSize?: number
  /**
   * Maximum animation size in pixels.
   * Default: 400
   */
  maxSize?: number
  /**
   * Percentage of animation height to crop from the top (0-50).
   * Useful for Lottie files with built-in whitespace.
   * Default: 0
   */
  cropTop?: number
}

/**
 * Hero animation component that dynamically sizes based on viewport height
 * to ensure hero text is always visible without scrolling.
 *
 * Calculates: available_height = viewport_height - header - padding - text_content
 * Then sizes the animation to fit within that space while maintaining aspect ratio.
 */
export default function HeroLottie({
  lottieUrl,
  className = '',
  isActive = true,
  speed = 1,
  loop = true,
  priority = true,
  keepPlayingOnMobile = false,
  heroTextHeight = 200,
  maxSizeRatio = 0.9,
  minSize = 150,
  maxSize = 400,
  cropTop = 0,
}: HeroLottieProps) {
  const [animationSize, setAnimationSize] = useState<number>(maxSize)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastWidthRef = useRef<number>(0)
  const initializedRef = useRef<boolean>(false)

  useEffect(() => {
    const calculateSize = (forceRecalc = false) => {
      const currentWidth = window.innerWidth

      // Only recalculate if width changed or on initial mount
      // This prevents resize events from mobile URL bar changes (which only affect height)
      if (!forceRecalc && initializedRef.current && currentWidth === lastWidthRef.current) {
        return
      }

      lastWidthRef.current = currentWidth
      initializedRef.current = true

      // Get viewport height
      const vh = window.innerHeight

      // Estimate header height (varies by breakpoint)
      const headerHeight = currentWidth >= 768 ? 80 : 64

      // Padding (pt-20 = 80px on mobile, pt-24 = 96px on desktop)
      const topPadding = currentWidth >= 768 ? 96 : 80

      // Bottom margin/padding
      const bottomPadding = 40

      // Calculate available space for animation
      const availableHeight = vh - headerHeight - topPadding - heroTextHeight - bottomPadding

      // Apply ratio and constraints
      let size = Math.floor(availableHeight * maxSizeRatio)
      size = Math.max(minSize, Math.min(maxSize, size))

      setAnimationSize(size)
    }

    // Calculate on mount
    calculateSize(true)

    // Recalculate on resize (but only if width changed)
    const handleResize = () => calculateSize(false)
    window.addEventListener('resize', handleResize)

    // Orientation change always triggers recalc
    const handleOrientationChange = () => {
      // Small delay to let the browser settle after orientation change
      setTimeout(() => calculateSize(true), 100)
    }
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [heroTextHeight, maxSizeRatio, minSize, maxSize])

  // Calculate crop offset in pixels
  const cropOffset = cropTop > 0 ? Math.floor(animationSize * (cropTop / 100)) : 0
  const visibleHeight = animationSize - cropOffset

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex justify-center items-center ${className}`}
    >
      <div
        className="transition-all duration-300 ease-out overflow-hidden"
        style={{
          width: animationSize,
          height: cropTop > 0 ? visibleHeight : animationSize,
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            width: animationSize,
            height: animationSize,
            marginTop: cropTop > 0 ? -cropOffset : 0,
          }}
        >
          <LottieWrapper
            animationUrl={lottieUrl}
            className="w-full h-full"
            speed={speed}
            loop={loop}
            autoplay={isActive}
            priority={priority}
            freezeAfterFirstLoop={!keepPlayingOnMobile}
            mobileOptimized={true}
          />
        </div>
      </div>
    </motion.div>
  )
}
