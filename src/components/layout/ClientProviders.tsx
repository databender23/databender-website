'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { EasterEggsProvider, ScrollProgress } from '@/components/interactive'
import { ChatWidget } from '@/components/chat'
import { AnalyticsProvider } from '@/lib/analytics'

// Scroll to top on route change
function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AnalyticsProvider>
      <EasterEggsProvider>
        <ScrollToTop />
        <ScrollProgress />
        {children}
        <ChatWidget />
      </EasterEggsProvider>
    </AnalyticsProvider>
  )
}

export default ClientProviders
