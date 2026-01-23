/**
 * MFA Secret Encryption
 *
 * Uses AES-256-GCM for authenticated encryption of TOTP secrets.
 */

import { createCipheriv, createDecipheriv, randomBytes, createHash } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

/**
 * Get encryption key from environment or derive from JWT_SECRET
 */
function getEncryptionKey(): Buffer {
  const mfaKey = process.env.MFA_ENCRYPTION_KEY;
  if (mfaKey) {
    return Buffer.from(mfaKey, "base64");
  }

  // Fallback: derive from JWT_SECRET (not recommended for production)
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("MFA_ENCRYPTION_KEY or JWT_SECRET required for MFA encryption");
  }

  console.warn("MFA: Using derived key from JWT_SECRET. Set MFA_ENCRYPTION_KEY for production.");
  return createHash("sha256").update(jwtSecret).digest();
}

/**
 * Encrypt a plaintext string
 * @returns Base64-encoded ciphertext (iv + tag + encrypted)
 */
export function encrypt(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  // Format: base64(iv + tag + encrypted)
  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

/**
 * Decrypt a ciphertext string
 * @param ciphertext Base64-encoded ciphertext
 * @returns Decrypted plaintext
 */
export function decrypt(ciphertext: string): string {
  const key = getEncryptionKey();
  const data = Buffer.from(ciphertext, "base64");

  const iv = data.subarray(0, IV_LENGTH);
  const tag = data.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const encrypted = data.subarray(IV_LENGTH + TAG_LENGTH);

  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  return decipher.update(encrypted).toString("utf8") + decipher.final("utf8");
}
