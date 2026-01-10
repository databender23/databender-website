'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useScroll } from 'framer-motion'

interface ScrollProgressProps {
  className?: string
}

export function ScrollProgress({ className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling 100px
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gray-800/50 z-[60] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-teal-500 to-teal-300 origin-left"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-teal-400/50 to-transparent blur-sm origin-left"
        style={{ scaleX, left: '100%', transform: 'translateX(-100%)' }}
      />
    </motion.div>
  )
}

export default ScrollProgress
