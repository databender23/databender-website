/**
 * TOTP (Time-based One-Time Password) Generation and Verification
 *
 * Uses the otpauth library for RFC 6238 compliant TOTP.
 */

import { TOTP, Secret } from "otpauth";

const ISSUER = "Databender Admin";
const DIGITS = 6;
const PERIOD = 30;
const ALGORITHM = "SHA1";

/**
 * Generate a new TOTP secret
 * @returns Base32-encoded secret
 */
export function generateTOTPSecret(): string {
  // Generate a 20-byte (160-bit) secret - standard for TOTP
  const secret = new Secret({ size: 20 });
  return secret.base32;
}

/**
 * Generate the otpauth:// URI for QR code scanning
 */
export function generateTOTPUri(secret: string, label: string): string {
  const totp = new TOTP({
    issuer: ISSUER,
    label: label,
    secret: Secret.fromBase32(secret),
    algorithm: ALGORITHM,
    digits: DIGITS,
    period: PERIOD,
  });

  return totp.toString();
}

/**
 * Verify a TOTP code
 * @param secret Base32-encoded secret
 * @param code 6-digit code from authenticator app
 * @returns true if valid
 */
export function verifyTOTP(secret: string, code: string): boolean {
  const totp = new TOTP({
    secret: Secret.fromBase32(secret),
    algorithm: ALGORITHM,
    digits: DIGITS,
    period: PERIOD,
  });

  // Allow 1 window drift (30 seconds before/after)
  const delta = totp.validate({ token: code, window: 1 });
  return delta !== null;
}

/**
 * Generate the current TOTP code (for testing)
 */
export function generateCurrentTOTP(secret: string): string {
  const totp = new TOTP({
    secret: Secret.fromBase32(secret),
    algorithm: ALGORITHM,
    digits: DIGITS,
    period: PERIOD,
  });

  return totp.generate();
}
