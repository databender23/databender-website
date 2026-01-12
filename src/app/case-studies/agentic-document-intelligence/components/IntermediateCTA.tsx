'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface IntermediateCTAProps {
  variant: 'challenges' | 'demo'
  className?: string
}

export default function IntermediateCTA({ variant, className = '' }: IntermediateCTAProps) {
  if (variant === 'challenges') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className={`mt-12 ${className}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal-500/5 to-teal-500/10 rounded-xl border border-teal-500/20">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-primary font-medium">Facing similar challenges?</p>
              <p className="text-xs text-text-secondary">Let&apos;s talk about your document workflows.</p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  if (variant === 'demo') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className={`mt-12 ${className}`}
      >
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-purple-500/10 rounded-xl border border-purple-500/20">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-text-primary font-medium">See how this could work for your documents</p>
              <p className="text-xs text-text-secondary">We&apos;ll show you a demo with your actual files.</p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            >
              Request demo
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return null
}
