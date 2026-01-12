'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface StorySectionProps {
  id: string
  children: React.ReactNode
  className?: string
  minHeight?: string
  onEnterView?: () => void
  variant?: 'primary' | 'secondary' | 'gradient'
}

export default function StorySection({
  id,
  children,
  className = '',
  minHeight = '100vh',
  onEnterView,
  variant = 'primary',
}: StorySectionProps) {
  const controls = useAnimation()

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
      onEnterView?.()
    } else {
      controls.start('hidden')
    }
  }, [inView, controls, onEnterView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  }

  const bgClass = {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary',
    gradient: 'bg-gradient-to-b from-bg-secondary to-bg-primary',
  }[variant]

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${bgClass} ${className}`}
      style={{ minHeight }}
    >
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{ minHeight }}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {children}
      </motion.div>
    </section>
  )
}
