'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode
} from 'react'

// Consent categories
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

export interface ConsentState {
  necessary: boolean  // Always true - required for basic functionality
  analytics: boolean
  marketing: boolean
  timestamp: string | null
  version: string
}

interface ConsentContextValue {
  consent: ConsentState
  hasConsent: (category: ConsentCategory) => boolean
  giveConsent: (categories: ConsentCategory[]) => void
  withdrawConsent: () => void
  acceptAll: () => void
  acceptNecessaryOnly: () => void
  isConsentGiven: boolean
  showBanner: boolean
  setShowBanner: (show: boolean) => void
  openPreferences: () => void
  showPreferences: boolean
  setShowPreferences: (show: boolean) => void
  isGPCEnabled: boolean
}

const CONSENT_STORAGE_KEY = 'databender_consent'
const CONSENT_VERSION = '1.0'
const CONSENT_EXPIRY_MONTHS = 12

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  timestamp: null,
  version: CONSENT_VERSION
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

function isConsentExpired(timestamp: string | null): boolean {
  if (!timestamp) return true
  const consentDate = new Date(timestamp)
  const expiryDate = new Date(consentDate)
  expiryDate.setMonth(expiryDate.getMonth() + CONSENT_EXPIRY_MONTHS)
  return new Date() > expiryDate
}

function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null
    const parsed = JSON.parse(stored) as ConsentState
    // Check version compatibility and expiry
    if (parsed.version !== CONSENT_VERSION || isConsentExpired(parsed.timestamp)) {
      localStorage.removeItem(CONSENT_STORAGE_KEY)
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function saveConsent(consent: ConsentState): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Storage might be full or disabled
  }
}

function checkGlobalPrivacyControl(): boolean {
  if (typeof window === 'undefined') return false
  // Check for Global Privacy Control signal
  // @ts-expect-error - GPC is not yet in TypeScript Navigator type
  return navigator.globalPrivacyControl === true
}

// Initialize state functions - called once during first render on client
function getInitialState(): {
  consent: ConsentState
  isConsentGiven: boolean
  showBanner: boolean
  isGPCEnabled: boolean
} {
  const gpcEnabled = checkGlobalPrivacyControl()
  const storedConsent = getStoredConsent()

  if (storedConsent) {
    // If GPC is enabled, override non-necessary consent to false
    if (gpcEnabled) {
      return {
        consent: { ...storedConsent, analytics: false, marketing: false },
        isConsentGiven: true,
        showBanner: false,
        isGPCEnabled: gpcEnabled
      }
    }
    return {
      consent: storedConsent,
      isConsentGiven: true,
      showBanner: false,
      isGPCEnabled: gpcEnabled
    }
  }

  if (gpcEnabled) {
    // GPC enabled, no stored consent - treat as opt-out of non-necessary
    const gpcConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    saveConsent(gpcConsent)
    return {
      consent: gpcConsent,
      isConsentGiven: true,
      showBanner: false,
      isGPCEnabled: gpcEnabled
    }
  }

  // No stored consent, no GPC - show banner
  return {
    consent: defaultConsent,
    isConsentGiven: false,
    showBanner: true,
    isGPCEnabled: false
  }
}

// For SSR - return default values
function getServerSnapshot(): {
  consent: ConsentState
  isConsentGiven: boolean
  showBanner: boolean
  isGPCEnabled: boolean
} {
  return {
    consent: defaultConsent,
    isConsentGiven: false,
    showBanner: false, // Don't show banner during SSR
    isGPCEnabled: false
  }
}

// Simple store for initial state
let listeners: Array<() => void> = []
let clientInitialState: ReturnType<typeof getInitialState> | null = null

function subscribeToStore(callback: () => void) {
  listeners.push(callback)
  return () => {
    listeners = listeners.filter(l => l !== callback)
  }
}

function getStoreSnapshot() {
  if (typeof window === 'undefined') return getServerSnapshot()
  if (!clientInitialState) {
    clientInitialState = getInitialState()
  }
  return clientInitialState
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  // Use useSyncExternalStore to handle hydration properly
  const initialState = useSyncExternalStore(
    subscribeToStore,
    getStoreSnapshot,
    getServerSnapshot
  )

  const [consent, setConsent] = useState<ConsentState>(initialState.consent)
  const [isConsentGiven, setIsConsentGiven] = useState(initialState.isConsentGiven)
  const [showBanner, setShowBanner] = useState(initialState.showBanner)
  const [showPreferences, setShowPreferences] = useState(false)
  const isGPCEnabled = initialState.isGPCEnabled

  const hasConsent = useCallback((category: ConsentCategory): boolean => {
    if (category === 'necessary') return true
    // If GPC is enabled, non-necessary tracking is always denied
    if (isGPCEnabled) return false
    return consent[category]
  }, [consent, isGPCEnabled])

  const giveConsent = useCallback((categories: ConsentCategory[]) => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: categories.includes('analytics') && !isGPCEnabled,
      marketing: categories.includes('marketing') && !isGPCEnabled,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    setConsent(newConsent)
    saveConsent(newConsent)
    setIsConsentGiven(true)
    setShowBanner(false)
    setShowPreferences(false)
  }, [isGPCEnabled])

  const withdrawConsent = useCallback(() => {
    const newConsent: ConsentState = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    setConsent(newConsent)
    saveConsent(newConsent)
    setIsConsentGiven(true)
    setShowPreferences(false)
  }, [])

  const acceptAll = useCallback(() => {
    giveConsent(['necessary', 'analytics', 'marketing'])
  }, [giveConsent])

  const acceptNecessaryOnly = useCallback(() => {
    giveConsent(['necessary'])
  }, [giveConsent])

  const openPreferences = useCallback(() => {
    setShowPreferences(true)
  }, [])

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasConsent,
        giveConsent,
        withdrawConsent,
        acceptAll,
        acceptNecessaryOnly,
        isConsentGiven,
        showBanner,
        setShowBanner,
        openPreferences,
        showPreferences,
        setShowPreferences,
        isGPCEnabled
      }}
    >
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
}

export default ConsentProvider
