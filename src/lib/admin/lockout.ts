/**
 * Account Lockout Utility
 *
 * Tracks failed login attempts and implements account lockout after too many failures.
 * Uses DynamoDB for persistence, falls back to in-memory for development.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const LOCKOUT_TABLE = "databender-admin-lockout";
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// DynamoDB client (lazy initialized)
let docClient: DynamoDBDocumentClient | null = null;

function getDocClient(): DynamoDBDocumentClient | null {
  if (docClient) return docClient;

  // Skip DynamoDB in development without AWS credentials
  if (process.env.NODE_ENV !== "production" && !process.env.AWS_ACCESS_KEY_ID) {
    return null;
  }

  try {
    const client = new DynamoDBClient({
      region: process.env.DYNAMODB_REGION || "us-east-1",
    });
    docClient = DynamoDBDocumentClient.from(client);
    return docClient;
  } catch {
    console.warn("[Lockout] DynamoDB client initialization failed");
    return null;
  }
}

// In-memory fallback for development
const memoryStore = new Map<string, { attempts: number; lockedUntil?: number }>();

interface LockoutRecord {
  pk: string; // IP address or username
  attempts: number;
  lockedUntil?: number;
  lastAttempt: number;
  ttl: number; // DynamoDB TTL
}

/**
 * Check if an account/IP is currently locked out
 */
export async function isLockedOut(identifier: string): Promise<{ locked: boolean; remainingMs?: number }> {
  const client = getDocClient();

  if (client) {
    try {
      const result = await client.send(
        new GetCommand({
          TableName: LOCKOUT_TABLE,
          Key: { pk: identifier },
        })
      );

      const record = result.Item as LockoutRecord | undefined;
      if (record?.lockedUntil) {
        const now = Date.now();
        if (record.lockedUntil > now) {
          return { locked: true, remainingMs: record.lockedUntil - now };
        }
      }

      return { locked: false };
    } catch (error) {
      console.error("[Lockout] DynamoDB error:", error);
      // Fail open - don't lock out on DB errors
      return { locked: false };
    }
  }

  // In-memory fallback
  const record = memoryStore.get(identifier);
  if (record?.lockedUntil) {
    const now = Date.now();
    if (record.lockedUntil > now) {
      return { locked: true, remainingMs: record.lockedUntil - now };
    }
    // Lockout expired, clear it
    memoryStore.delete(identifier);
  }

  return { locked: false };
}

/**
 * Record a failed login attempt
 * Returns true if account is now locked
 */
export async function recordFailedAttempt(identifier: string): Promise<{ nowLocked: boolean; attempts: number }> {
  const client = getDocClient();
  const now = Date.now();

  if (client) {
    try {
      // Get current record
      const result = await client.send(
        new GetCommand({
          TableName: LOCKOUT_TABLE,
          Key: { pk: identifier },
        })
      );

      const existing = result.Item as LockoutRecord | undefined;
      const attempts = (existing?.attempts || 0) + 1;
      const nowLocked = attempts >= MAX_FAILED_ATTEMPTS;

      const record: LockoutRecord = {
        pk: identifier,
        attempts,
        lastAttempt: now,
        ...(nowLocked && { lockedUntil: now + LOCKOUT_DURATION_MS }),
        // TTL: 1 hour from now (auto-cleanup)
        ttl: Math.floor((now + 60 * 60 * 1000) / 1000),
      };

      await client.send(
        new PutCommand({
          TableName: LOCKOUT_TABLE,
          Item: record,
        })
      );

      return { nowLocked, attempts };
    } catch (error) {
      console.error("[Lockout] DynamoDB error:", error);
      // Fail open
      return { nowLocked: false, attempts: 1 };
    }
  }

  // In-memory fallback
  const existing = memoryStore.get(identifier) || { attempts: 0 };
  existing.attempts += 1;

  const nowLocked = existing.attempts >= MAX_FAILED_ATTEMPTS;
  if (nowLocked) {
    existing.lockedUntil = now + LOCKOUT_DURATION_MS;
  }

  memoryStore.set(identifier, existing);
  return { nowLocked, attempts: existing.attempts };
}

/**
 * Clear lockout after successful login
 */
export async function clearLockout(identifier: string): Promise<void> {
  const client = getDocClient();

  if (client) {
    try {
      await client.send(
        new DeleteCommand({
          TableName: LOCKOUT_TABLE,
          Key: { pk: identifier },
        })
      );
    } catch (error) {
      console.error("[Lockout] DynamoDB error:", error);
    }
    return;
  }

  // In-memory fallback
  memoryStore.delete(identifier);
}

/**
 * Get lockout status for display
 */
export async function getLockoutStatus(identifier: string): Promise<{
  attempts: number;
  locked: boolean;
  lockedUntil?: Date;
}> {
  const client = getDocClient();

  if (client) {
    try {
      const result = await client.send(
        new GetCommand({
          TableName: LOCKOUT_TABLE,
          Key: { pk: identifier },
        })
      );

      const record = result.Item as LockoutRecord | undefined;
      if (!record) {
        return { attempts: 0, locked: false };
      }

      const now = Date.now();
      const locked = record.lockedUntil ? record.lockedUntil > now : false;

      return {
        attempts: record.attempts,
        locked,
        lockedUntil: record.lockedUntil ? new Date(record.lockedUntil) : undefined,
      };
    } catch (error) {
      console.error("[Lockout] DynamoDB error:", error);
      return { attempts: 0, locked: false };
    }
  }

  // In-memory fallback
  const record = memoryStore.get(identifier);
  if (!record) {
    return { attempts: 0, locked: false };
  }

  const now = Date.now();
  const locked = record.lockedUntil ? record.lockedUntil > now : false;

  return {
    attempts: record.attempts,
    locked,
    lockedUntil: record.lockedUntil ? new Date(record.lockedUntil) : undefined,
  };
}
