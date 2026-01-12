'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface IntermediateCTAProps {
  variant?: 'question' | 'action' | 'stat'
  title: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  className?: string
}

export default function IntermediateCTA({
  variant = 'action',
  title,
  subtitle,
  buttonText = 'Learn More',
  buttonHref = '/contact',
  className = '',
}: IntermediateCTAProps) {
  const variantStyles = {
    question: {
      bg: 'bg-gradient-to-r from-orange-500/5 to-orange-500/10',
      border: 'border-orange-500/20',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
      buttonBg: 'bg-orange-500 hover:bg-orange-600',
    },
    action: {
      bg: 'bg-gradient-to-r from-teal-500/5 to-teal-500/10',
      border: 'border-teal-500/20',
      iconBg: 'bg-teal-500/10',
      iconColor: 'text-teal-500',
      buttonBg: 'bg-teal-500 hover:bg-teal-600',
    },
    stat: {
      bg: 'bg-gradient-to-r from-purple-500/5 to-purple-500/10',
      border: 'border-purple-500/20',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
      buttonBg: 'bg-purple-500 hover:bg-purple-600',
    },
  }

  const styles = variantStyles[variant]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-xl ${styles.bg} border ${styles.border} ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
            {variant === 'question' && (
              <svg className={`w-6 h-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {variant === 'action' && (
              <svg className={`w-6 h-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
            {variant === 'stat' && (
              <svg className={`w-6 h-6 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
          </div>
        </div>
        <Link
          href={buttonHref}
          className={`px-5 py-2.5 ${styles.buttonBg} text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap`}
        >
          {buttonText}
        </Link>
      </div>
    </motion.div>
  )
}
