/**
 * AWS SNS Signature Verification
 *
 * Verifies that incoming SNS notifications are authentic and from AWS.
 */

import { createVerify } from "crypto";

interface SNSMessage {
  Type: "SubscriptionConfirmation" | "Notification" | "UnsubscribeConfirmation";
  MessageId: string;
  TopicArn: string;
  Message: string;
  Timestamp: string;
  SignatureVersion: string;
  Signature: string;
  SigningCertURL: string;
  SubscribeURL?: string;
  Token?: string;
  Subject?: string;
}

// Cache for signing certificates to avoid repeated fetches
const certCache = new Map<string, { cert: string; expiry: number }>();
const CERT_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Validate that the SigningCertURL is from a valid AWS domain
 */
function isValidCertUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);

    // Must be HTTPS
    if (parsedUrl.protocol !== "https:") {
      return false;
    }

    // Must be from an AWS SNS endpoint
    const validHosts = [
      /^sns\.[a-z0-9-]+\.amazonaws\.com$/,
      /^sns\.[a-z0-9-]+\.amazonaws\.com\.cn$/,
    ];

    return validHosts.some((pattern) => pattern.test(parsedUrl.hostname));
  } catch {
    return false;
  }
}

/**
 * Fetch and cache the signing certificate
 */
async function fetchCertificate(url: string): Promise<string | null> {
  // Check cache first
  const cached = certCache.get(url);
  if (cached && cached.expiry > Date.now()) {
    return cached.cert;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[SNS] Failed to fetch certificate: ${response.status}`);
      return null;
    }

    const cert = await response.text();

    // Cache the certificate
    certCache.set(url, {
      cert,
      expiry: Date.now() + CERT_CACHE_TTL_MS,
    });

    return cert;
  } catch (error) {
    console.error(`[SNS] Error fetching certificate:`, error);
    return null;
  }
}

/**
 * Build the string to sign based on message type
 */
function buildStringToSign(message: SNSMessage): string {
  const lines: string[] = [];

  if (message.Type === "Notification") {
    lines.push("Message", message.Message);
    lines.push("MessageId", message.MessageId);
    if (message.Subject) {
      lines.push("Subject", message.Subject);
    }
    lines.push("Timestamp", message.Timestamp);
    lines.push("TopicArn", message.TopicArn);
    lines.push("Type", message.Type);
  } else {
    // SubscriptionConfirmation or UnsubscribeConfirmation
    lines.push("Message", message.Message);
    lines.push("MessageId", message.MessageId);
    lines.push("SubscribeURL", message.SubscribeURL || "");
    lines.push("Timestamp", message.Timestamp);
    lines.push("Token", message.Token || "");
    lines.push("TopicArn", message.TopicArn);
    lines.push("Type", message.Type);
  }

  return lines.join("\n") + "\n";
}

export interface VerificationResult {
  valid: boolean;
  error?: string;
}

/**
 * Verify an SNS message signature
 */
export async function verifySnsSignature(
  message: SNSMessage
): Promise<VerificationResult> {
  // Validate SigningCertURL
  if (!isValidCertUrl(message.SigningCertURL)) {
    return {
      valid: false,
      error: `Invalid SigningCertURL: ${message.SigningCertURL}`,
    };
  }

  // Only support SignatureVersion 1 (SHA1)
  if (message.SignatureVersion !== "1") {
    return {
      valid: false,
      error: `Unsupported SignatureVersion: ${message.SignatureVersion}`,
    };
  }

  // Fetch the certificate
  const certificate = await fetchCertificate(message.SigningCertURL);
  if (!certificate) {
    return {
      valid: false,
      error: "Failed to fetch signing certificate",
    };
  }

  try {
    // Build the string to sign
    const stringToSign = buildStringToSign(message);

    // Verify the signature
    const verifier = createVerify("SHA1");
    verifier.update(stringToSign);

    const isValid = verifier.verify(
      certificate,
      message.Signature,
      "base64"
    );

    if (isValid) {
      return { valid: true };
    }

    return {
      valid: false,
      error: "Signature verification failed",
    };
  } catch (error) {
    return {
      valid: false,
      error: `Signature verification error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Parse and verify an SNS message from raw body
 */
export async function parseAndVerifySnsMessage(
  body: string
): Promise<{ message: SNSMessage | null; error?: string }> {
  // Parse JSON
  let message: SNSMessage;
  try {
    message = JSON.parse(body);
  } catch {
    return { message: null, error: "Invalid JSON body" };
  }

  // Basic validation
  if (!message.Type || !message.TopicArn || !message.SigningCertURL || !message.Signature) {
    return { message: null, error: "Missing required SNS message fields" };
  }

  // Verify signature
  const verifyResult = await verifySnsSignature(message);
  if (!verifyResult.valid) {
    console.warn(`[SNS] Signature verification failed: ${verifyResult.error}`);
    return { message: null, error: verifyResult.error };
  }

  return { message };
}
