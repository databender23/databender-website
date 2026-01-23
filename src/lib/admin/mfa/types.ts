/**
 * MFA Type Definitions
 */

export interface MFAConfig {
  pk: string; // MFA#{username}
  sk: string; // #CONFIG
  enabled: boolean;
  totpSecret: string; // AES-256-GCM encrypted
  backupCodes: string[]; // Bcrypt hashed
  backupCodesGeneratedAt: string;
  enabledAt?: string;
  lastVerifiedAt?: string;
}

export interface MFASession {
  sessionId: string;
  username: string;
  type: "mfa_pending";
}

export interface EmailOTP {
  code: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

export type MFAMethod = "totp" | "email" | "backup";

export interface MFAVerifyRequest {
  mfaToken: string;
  code: string;
  method: MFAMethod;
}

export interface MFASetupResponse {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface MFAStatusResponse {
  enabled: boolean;
  backupCodesRemaining: number;
  lastVerifiedAt?: string;
}
