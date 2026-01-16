/**
 * Cloudflare Turnstile Verification
 *
 * Free, GDPR-compliant invisible CAPTCHA for bot protection.
 * Falls back to allowing requests if Turnstile is not configured.
 */

import { isConfigured } from "./env";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface TurnstileResult {
  success: boolean;
  error?: string;
  skipped: boolean;
}

/**
 * Verify a Turnstile token
 *
 * @param token - The turnstile token from the client
 * @param remoteIp - Optional client IP for additional validation
 * @returns Verification result
 */
export async function verifyTurnstile(
  token: string | null | undefined,
  remoteIp?: string
): Promise<TurnstileResult> {
  // Skip verification if Turnstile is not configured
  if (!isConfigured.turnstile()) {
    return { success: true, skipped: true };
  }

  // Token is required if Turnstile is configured
  if (!token) {
    return {
      success: false,
      error: "Missing Turnstile verification token",
      skipped: false,
    };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY!;

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      console.error(`[Turnstile] API error: ${response.status}`);
      // Fail open if Cloudflare is down
      return { success: true, skipped: false, error: "Verification service unavailable" };
    }

    const data: TurnstileVerifyResponse = await response.json();

    if (data.success) {
      return { success: true, skipped: false };
    }

    const errorCodes = data["error-codes"] || [];
    const errorMessage = errorCodes.length > 0
      ? `Turnstile verification failed: ${errorCodes.join(", ")}`
      : "Turnstile verification failed";

    console.warn(`[Turnstile] Verification failed:`, errorCodes);

    return {
      success: false,
      error: errorMessage,
      skipped: false,
    };
  } catch (error) {
    console.error(`[Turnstile] Error verifying token:`, error);
    // Fail open on network errors
    return { success: true, skipped: false, error: "Verification error" };
  }
}

/**
 * Extract Turnstile token from request body
 */
export function getTurnstileToken(body: Record<string, unknown>): string | undefined {
  return (body.turnstileToken || body["cf-turnstile-response"]) as string | undefined;
}
