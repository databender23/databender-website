/**
 * MFA Session Management
 *
 * Short-lived JWT tokens for MFA verification step.
 */

import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "crypto";
import type { MFASession } from "./types";

const MFA_SESSION_EXPIRY_SECONDS = 600; // 10 minutes

/**
 * Get JWT secret for MFA sessions (same as auth)
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET required for MFA sessions");
  }
  return new TextEncoder().encode(secret);
}

/**
 * Create an MFA session token after password verification
 */
export async function createMFASession(username: string): Promise<string> {
  const sessionId = randomUUID();

  return new SignJWT({
    sessionId,
    username,
    type: "mfa_pending",
  } satisfies MFASession)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MFA_SESSION_EXPIRY_SECONDS}s`)
    .sign(getJwtSecret());
}

/**
 * Verify and decode an MFA session token
 * @returns Session data or null if invalid/expired
 */
export async function verifyMFASession(token: string): Promise<MFASession | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());

    if (payload.type !== "mfa_pending") {
      return null;
    }

    return {
      sessionId: payload.sessionId as string,
      username: payload.username as string,
      type: "mfa_pending",
    };
  } catch {
    return null;
  }
}
