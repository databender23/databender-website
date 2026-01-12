'use client'

import { EasterEggsProvider, ScrollProgress } from '@/components/interactive'
import { ChatWidget } from '@/components/chat'
import { AnalyticsProvider } from '@/lib/analytics'

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AnalyticsProvider>
      <EasterEggsProvider>
        <ScrollProgress />
        {children}
        <ChatWidget />
      </EasterEggsProvider>
    </AnalyticsProvider>
  )
}

export default ClientProviders
