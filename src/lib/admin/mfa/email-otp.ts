/**
 * Email OTP (One-Time Password)
 *
 * Backup MFA method - sends 6-digit code via SES.
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { randomInt } from "crypto";
import type { EmailOTP } from "./types";

const SES_REGION = process.env.SES_REGION || "us-east-1";
const FROM_EMAIL = process.env.SES_FROM_EMAIL || "notifications@mail.databender.co";
const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

// In-memory OTP storage (per-process, sufficient for single admin)
const otpStore = new Map<string, EmailOTP>();

/**
 * Generate a 6-digit OTP code
 */
function generateOTPCode(): string {
  return String(randomInt(100000, 999999));
}

/**
 * Send email OTP to admin
 */
export async function sendEmailOTP(email: string): Promise<{ sent: boolean; expiresIn: number }> {
  const code = generateOTPCode();
  const now = Date.now();

  // Store OTP
  otpStore.set(email.toLowerCase(), {
    code,
    createdAt: now,
    expiresAt: now + OTP_EXPIRY_MS,
    attempts: 0,
  });

  // Send via SES
  try {
    const client = new SESClient({ region: SES_REGION });

    await client.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: {
            Data: "Databender Admin Login Code",
            Charset: "UTF-8",
          },
          Body: {
            Html: {
              Data: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #1A9988;">Databender Admin Login</h2>
                  <p>Your verification code is:</p>
                  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 20px 0;">
                    ${code}
                  </div>
                  <p style="color: #666;">This code expires in 5 minutes.</p>
                  <p style="color: #999; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
                </div>
              `,
              Charset: "UTF-8",
            },
            Text: {
              Data: `Your Databender admin login code is: ${code}\n\nThis code expires in 5 minutes.`,
              Charset: "UTF-8",
            },
          },
        },
      })
    );

    return { sent: true, expiresIn: OTP_EXPIRY_MS / 1000 };
  } catch (error) {
    console.error("Failed to send OTP email:", error);
    otpStore.delete(email.toLowerCase());
    throw new Error("Failed to send verification email");
  }
}

/**
 * Verify an email OTP code
 */
export function verifyEmailOTP(email: string, code: string): boolean {
  const stored = otpStore.get(email.toLowerCase());

  if (!stored) {
    return false;
  }

  // Check expiry
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return false;
  }

  // Check attempts
  stored.attempts++;
  if (stored.attempts > MAX_ATTEMPTS) {
    otpStore.delete(email.toLowerCase());
    return false;
  }

  // Verify code
  if (stored.code === code) {
    otpStore.delete(email.toLowerCase());
    return true;
  }

  return false;
}

/**
 * Get remaining time for current OTP (for UI feedback)
 */
export function getOTPTimeRemaining(email: string): number | null {
  const stored = otpStore.get(email.toLowerCase());
  if (!stored) return null;

  const remaining = stored.expiresAt - Date.now();
  return remaining > 0 ? Math.ceil(remaining / 1000) : null;
}
