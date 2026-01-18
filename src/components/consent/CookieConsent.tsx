'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useConsent, type ConsentCategory } from '@/lib/consent'

// Separate component for preferences modal to handle local state properly
function PreferencesModal({
  onClose,
  onSave,
  initialAnalytics,
  initialMarketing,
  isGPCEnabled
}: {
  onClose: () => void
  onSave: (categories: ConsentCategory[]) => void
  initialAnalytics: boolean
  initialMarketing: boolean
  isGPCEnabled: boolean
}) {
  // Local state initialized from props (no effect needed)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(initialAnalytics)
  const [marketingEnabled, setMarketingEnabled] = useState(initialMarketing)

  const handleSave = useCallback(() => {
    const categories: ConsentCategory[] = ['necessary']
    if (analyticsEnabled) categories.push('analytics')
    if (marketingEnabled) categories.push('marketing')
    onSave(categories)
  }, [analyticsEnabled, marketingEnabled, onSave])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">
              Cookie Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label="Close preferences"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Manage your cookie preferences below. You can enable or disable different types of cookies.
          </p>
          {isGPCEnabled && (
            <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <p className="text-teal-700 text-sm">
                <strong>Global Privacy Control Detected:</strong> Your browser has signaled a preference for privacy.
                Non-essential cookies are automatically disabled.
              </p>
            </div>
          )}
        </div>

        {/* Cookie Categories */}
        <div className="p-6 space-y-6">
          {/* Necessary Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary">Necessary</h3>
                <span className="text-xs bg-gray-100 text-text-muted px-2 py-0.5 rounded">
                  Always Active
                </span>
              </div>
              <p className="text-text-secondary text-sm mt-1">
                Essential for the website to function. These cannot be disabled.
                Includes security, session management, and basic functionality.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-11 h-6 bg-teal-500 rounded-full relative">
                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
              </div>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">Analytics</h3>
              <p className="text-text-secondary text-sm mt-1">
                Help us understand how visitors interact with our website.
                Used to improve site performance and user experience.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => !isGPCEnabled && setAnalyticsEnabled(!analyticsEnabled)}
                disabled={isGPCEnabled}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  analyticsEnabled && !isGPCEnabled ? 'bg-teal-500' : 'bg-gray-200'
                } ${isGPCEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`${analyticsEnabled ? 'Disable' : 'Enable'} analytics cookies`}
              >
                <motion.span
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  animate={{ left: analyticsEnabled && !isGPCEnabled ? '1.25rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">Marketing</h3>
              <p className="text-text-secondary text-sm mt-1">
                Used to deliver relevant advertisements and track ad campaign performance.
                May be shared with advertising partners.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => !isGPCEnabled && setMarketingEnabled(!marketingEnabled)}
                disabled={isGPCEnabled}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  marketingEnabled && !isGPCEnabled ? 'bg-teal-500' : 'bg-gray-200'
                } ${isGPCEnabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                aria-label={`${marketingEnabled ? 'Disable' : 'Enable'} marketing cookies`}
              >
                <motion.span
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                  animate={{ left: marketingEnabled && !isGPCEnabled ? '1.25rem' : '0.25rem' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-gray-50 rounded-b-xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Link
              href="/privacy"
              className="text-sm text-teal-500 hover:text-teal-600 underline"
              onClick={onClose}
            >
              View Privacy Policy
            </Link>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function CookieConsent() {
  const {
    showBanner,
    setShowBanner,
    showPreferences,
    setShowPreferences,
    acceptAll,
    acceptNecessaryOnly,
    giveConsent,
    consent,
    isGPCEnabled
  } = useConsent()

  const handleOpenPreferences = useCallback(() => {
    setShowBanner(false)
    setShowPreferences(true)
  }, [setShowBanner, setShowPreferences])

  const handleClosePreferences = useCallback(() => {
    setShowPreferences(false)
  }, [setShowPreferences])

  const handleSavePreferences = useCallback((categories: ConsentCategory[]) => {
    giveConsent(categories)
  }, [giveConsent])

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div className="container mx-auto max-w-4xl">
              <div className="bg-white border border-border rounded-xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Text content */}
                  <div className="flex-1">
                    <h3 className="text-text-primary font-semibold mb-1">
                      We value your privacy
                    </h3>
                    <p className="text-text-secondary text-sm">
                      We use cookies to enhance your browsing experience and analyze site traffic.
                      {isGPCEnabled && (
                        <span className="block mt-1 text-teal-600">
                          Global Privacy Control detected - non-essential cookies are disabled.
                        </span>
                      )}
                      {' '}
                      <Link
                        href="/privacy"
                        className="text-teal-500 hover:text-teal-600 underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleOpenPreferences}
                      className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Manage Preferences
                    </button>
                    <button
                      onClick={acceptNecessaryOnly}
                      className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Necessary Only
                    </button>
                    <button
                      onClick={acceptAll}
                      disabled={isGPCEnabled}
                      className="px-4 py-2 text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal - mounted fresh each time to get current consent values */}
      <AnimatePresence>
        {showPreferences && (
          <PreferencesModal
            onClose={handleClosePreferences}
            onSave={handleSavePreferences}
            initialAnalytics={consent.analytics}
            initialMarketing={consent.marketing}
            isGPCEnabled={isGPCEnabled}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default CookieConsent
