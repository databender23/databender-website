"use client";

/**
 * Cloudflare Turnstile Component
 *
 * Invisible CAPTCHA widget that provides a verification token for form submissions.
 * Only renders if NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured.
 */

import { useEffect, useRef, useCallback } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: (error: string) => void;
  onExpire?: () => void;
  action?: string;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact" | "invisible";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: (error: string) => void;
          "expired-callback"?: () => void;
          action?: string;
          theme?: string;
          size?: string;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export function Turnstile({
  onVerify,
  onError,
  onExpire,
  action,
  theme = "auto",
  size = "invisible",
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const scriptLoadedRef = useRef(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile || !siteKey) return;
    if (widgetIdRef.current) return; // Already rendered

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": onExpire,
        action,
        theme,
        size,
      });
    } catch (e) {
      console.error("[Turnstile] Failed to render widget:", e);
    }
  }, [siteKey, onVerify, onError, onExpire, action, theme, size]);

  useEffect(() => {
    // Skip if no site key configured
    if (!siteKey) {
      console.log("[Turnstile] Not configured, skipping widget");
      return;
    }

    // Load the Turnstile script if not already loaded
    if (!scriptLoadedRef.current && typeof window !== "undefined") {
      const existingScript = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );

      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        script.onload = () => {
          scriptLoadedRef.current = true;
          renderWidget();
        };
        document.head.appendChild(script);
      } else {
        scriptLoadedRef.current = true;
        // Script exists, check if turnstile is ready
        if (window.turnstile) {
          renderWidget();
        } else {
          existingScript.addEventListener("load", renderWidget);
        }
      }
    } else if (scriptLoadedRef.current) {
      renderWidget();
    }

    return () => {
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget may already be removed
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, renderWidget]);

  // Don't render if not configured
  if (!siteKey) {
    return null;
  }

  return <div ref={containerRef} className="cf-turnstile" />;
}

/**
 * Hook to manage Turnstile token state
 */
export function useTurnstile() {
  const tokenRef = useRef<string | null>(null);

  const handleVerify = useCallback((token: string) => {
    tokenRef.current = token;
  }, []);

  const handleExpire = useCallback(() => {
    tokenRef.current = null;
  }, []);

  const getToken = useCallback(() => tokenRef.current, []);

  return {
    handleVerify,
    handleExpire,
    getToken,
    isConfigured: Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  };
}
