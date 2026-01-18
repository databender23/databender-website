'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EasterEggsProvider, ScrollProgress } from '@/components/interactive'
import { ChatWidget } from '@/components/chat'
import { AnalyticsProvider } from '@/lib/analytics'
import { ConsentProvider } from '@/lib/consent'
import { CookieConsent } from '@/components/consent'

// Scroll to top on route change
function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Use multiple methods for cross-browser/mobile compatibility
    // iOS Safari sometimes ignores window.scrollTo without the options object
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Fallback for older browsers and edge cases
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ConsentProvider>
      <AnalyticsProvider>
        <EasterEggsProvider>
          <ScrollToTop />
          <ScrollProgress />
          {children}
          <ChatWidget />
          <CookieConsent />
        </EasterEggsProvider>
      </AnalyticsProvider>
    </ConsentProvider>
  )
}

export default ClientProviders
