/**
 * MFA DynamoDB Storage
 *
 * Stores MFA configuration in DynamoDB with in-memory fallback for development.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { MFAConfig } from "./types";

const TABLE_NAME = "databender-admin-mfa";
const REGION = process.env.DYNAMODB_REGION || "us-east-1";

// Lazy-initialized client
let docClient: DynamoDBDocumentClient | null = null;

// In-memory fallback for development
const inMemoryStore = new Map<string, MFAConfig>();

function getClient(): DynamoDBDocumentClient {
  if (!docClient) {
    const client = new DynamoDBClient({ region: REGION });
    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return docClient;
}

/**
 * Check if MFA is enabled globally (env var override)
 */
export function isMFAGloballyEnabled(): boolean {
  const mfaEnabled = process.env.MFA_ENABLED;
  // Default to false in development, true in production
  if (mfaEnabled === undefined) {
    return process.env.NODE_ENV === "production";
  }
  return mfaEnabled === "true";
}

/**
 * Get MFA configuration for a user
 */
export async function getMFAConfig(username: string): Promise<MFAConfig | null> {
  // Check global MFA disable
  if (!isMFAGloballyEnabled()) {
    console.log("[MFA Storage] MFA globally disabled");
    return null;
  }

  const pk = `MFA#${username}`;
  const sk = "#CONFIG";

  // Try DynamoDB first
  try {
    const result = await getClient().send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { pk, sk },
      })
    );

    if (result.Item) {
      console.log("[MFA Storage] Found MFA config in DynamoDB for", username);
      return result.Item as MFAConfig;
    }
    console.log("[MFA Storage] No MFA config in DynamoDB for", username);
  } catch (error) {
    console.error("[MFA Storage] DynamoDB read error:", error);
    // In production, don't silently fall back
    if (process.env.NODE_ENV === "production") {
      // Still check in-memory as last resort, but log warning
      const inMemory = inMemoryStore.get(pk);
      if (inMemory) {
        console.warn("[MFA Storage] CRITICAL: Using in-memory data in production - data not persisted!");
        return inMemory;
      }
      return null;
    }
  }

  // Check in-memory fallback (development only)
  const inMemory = inMemoryStore.get(pk);
  if (inMemory) {
    console.log("[MFA Storage] Found MFA config in memory for", username);
  }
  return inMemory || null;
}

/**
 * Save MFA configuration
 */
export async function saveMFAConfig(username: string, config: Omit<MFAConfig, "pk" | "sk">): Promise<void> {
  const pk = `MFA#${username}`;
  const sk = "#CONFIG";

  const item: MFAConfig = {
    pk,
    sk,
    ...config,
  };

  // Try DynamoDB first
  try {
    await getClient().send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: item,
      })
    );
    console.log("[MFA Storage] Saved MFA config to DynamoDB for", username);
    return;
  } catch (error) {
    console.error("[MFA Storage] DynamoDB write failed:", error);

    // In production, don't silently fall back - MFA data must be persisted
    if (process.env.NODE_ENV === "production") {
      throw new Error("Failed to save MFA configuration to database");
    }
  }

  // Fall back to in-memory only in development
  console.warn("[MFA Storage] Using in-memory fallback (development only)");
  inMemoryStore.set(pk, item);
}

/**
 * Update last verified timestamp
 */
export async function updateMFALastVerified(username: string): Promise<void> {
  const pk = `MFA#${username}`;
  const sk = "#CONFIG";
  const now = new Date().toISOString();

  try {
    await getClient().send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk, sk },
        UpdateExpression: "SET lastVerifiedAt = :now",
        ExpressionAttributeValues: { ":now": now },
      })
    );
  } catch (error) {
    console.warn("[MFA Storage] Failed to update lastVerifiedAt:", error);
    // Update in-memory if exists
    const stored = inMemoryStore.get(pk);
    if (stored) {
      stored.lastVerifiedAt = now;
    }
  }
}

/**
 * Remove a used backup code
 */
export async function removeBackupCode(username: string, index: number): Promise<void> {
  const pk = `MFA#${username}`;
  const sk = "#CONFIG";

  try {
    await getClient().send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk, sk },
        UpdateExpression: `REMOVE backupCodes[${index}]`,
      })
    );
  } catch (error) {
    console.warn("[MFA Storage] Failed to remove backup code:", error);
    // Update in-memory if exists
    const stored = inMemoryStore.get(pk);
    if (stored && stored.backupCodes) {
      stored.backupCodes[index] = ""; // Mark as used
    }
  }
}

/**
 * Disable MFA for a user
 */
export async function disableMFA(username: string): Promise<void> {
  const pk = `MFA#${username}`;
  const sk = "#CONFIG";

  try {
    await getClient().send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk, sk },
        UpdateExpression: "SET enabled = :false",
        ExpressionAttributeValues: { ":false": false },
      })
    );
  } catch (error) {
    console.warn("[MFA Storage] Failed to disable MFA:", error);
    const stored = inMemoryStore.get(pk);
    if (stored) {
      stored.enabled = false;
    }
  }
}

/**
 * Check if user has MFA enabled
 */
export async function isMFAEnabled(username: string): Promise<boolean> {
  if (!isMFAGloballyEnabled()) {
    return false;
  }

  const config = await getMFAConfig(username);
  return config?.enabled ?? false;
}
