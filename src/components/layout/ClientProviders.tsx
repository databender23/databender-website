'use client'

import { EasterEggsProvider, ScrollProgress } from '@/components/interactive'
import { ChatWidget } from '@/components/chat'

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <EasterEggsProvider>
      <ScrollProgress />
      {children}
      <ChatWidget />
    </EasterEggsProvider>
  )
}

export default ClientProviders
