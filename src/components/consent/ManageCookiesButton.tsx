'use client'

import { useConsent } from '@/lib/consent'

export function ManageCookiesButton() {
  const { openPreferences } = useConsent()

  return (
    <button
      onClick={openPreferences}
      className="text-text-muted hover:text-text-secondary transition-colors"
    >
      Manage Cookies
    </button>
  )
}

export default ManageCookiesButton
