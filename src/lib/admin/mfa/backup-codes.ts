/**
 * MFA Backup Codes
 *
 * Single-use recovery codes for when TOTP/Email OTP unavailable.
 */

import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

const CODE_COUNT = 10;
const BCRYPT_ROUNDS = 10;

/**
 * Generate backup codes in XXXX-XXXX format
 * @returns Array of plaintext codes (display once, then discard)
 */
export function generateBackupCodes(count: number = CODE_COUNT): string[] {
  const codes: string[] = [];

  for (let i = 0; i < count; i++) {
    // 4 bytes = 8 hex characters
    const hex = randomBytes(4).toString("hex").toUpperCase();
    codes.push(`${hex.slice(0, 4)}-${hex.slice(4)}`);
  }

  return codes;
}

/**
 * Hash backup codes for storage
 * @param codes Plaintext codes
 * @returns Array of bcrypt hashes
 */
export async function hashBackupCodes(codes: string[]): Promise<string[]> {
  const normalized = codes.map((code) => code.replace("-", "").toUpperCase());
  return Promise.all(normalized.map((code) => bcrypt.hash(code, BCRYPT_ROUNDS)));
}

/**
 * Verify a backup code against stored hashes
 * @returns Index of matching code, or -1 if invalid
 */
export async function verifyBackupCode(
  code: string,
  hashedCodes: string[]
): Promise<{ valid: boolean; index: number }> {
  const normalized = code.replace("-", "").toUpperCase();

  for (let i = 0; i < hashedCodes.length; i++) {
    // Skip empty slots (already used codes)
    if (!hashedCodes[i]) continue;

    if (await bcrypt.compare(normalized, hashedCodes[i])) {
      return { valid: true, index: i };
    }
  }

  return { valid: false, index: -1 };
}
