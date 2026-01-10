'use client'

import { EasterEggsProvider, ScrollProgress } from '@/components/interactive'

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <EasterEggsProvider>
      <ScrollProgress />
      {children}
    </EasterEggsProvider>
  )
}

export default ClientProviders
