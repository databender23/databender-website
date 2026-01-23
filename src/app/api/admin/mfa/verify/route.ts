import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { recordFailedAttempt, clearLockout, isLockedOut } from "@/lib/admin/lockout";
import { createToken, setAuthCookie } from "@/lib/admin/auth";
import {
  verifyMFASession,
  getMFAConfig,
  verifyTOTP,
  verifyEmailOTP,
  verifyBackupCode,
  removeBackupCode,
  updateMFALastVerified,
  decrypt,
  type MFAMethod,
} from "@/lib/admin/mfa";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    // Check lockout
    const lockoutStatus = await isLockedOut(ip);
    if (lockoutStatus.locked) {
      const remainingMinutes = Math.ceil((lockoutStatus.remainingMs || 0) / 60000);
      return NextResponse.json(
        { error: `Account locked. Try again in ${remainingMinutes} minutes.` },
        { status: 423 }
      );
    }

    // Rate limit
    const rateLimitResult = await checkRateLimit("login", ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { mfaToken, code, method } = (await request.json()) as {
      mfaToken: string;
      code: string;
      method: MFAMethod;
    };

    if (!mfaToken || !code || !method) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify MFA session token
    const session = await verifyMFASession(mfaToken);
    if (!session) {
      return NextResponse.json(
        { error: "Invalid or expired session. Please log in again." },
        { status: 401 }
      );
    }

    // Get MFA config
    const mfaConfig = await getMFAConfig(session.username);
    if (!mfaConfig?.enabled) {
      return NextResponse.json(
        { error: "MFA not configured" },
        { status: 400 }
      );
    }

    let verified = false;

    switch (method) {
      case "totp": {
        const secret = decrypt(mfaConfig.totpSecret);
        verified = verifyTOTP(secret, code);
        break;
      }

      case "email": {
        const adminEmail = process.env.ADMIN_EMAIL;
        if (!adminEmail) {
          return NextResponse.json(
            { error: "Email OTP not configured" },
            { status: 400 }
          );
        }
        verified = verifyEmailOTP(adminEmail, code);
        break;
      }

      case "backup": {
        const result = await verifyBackupCode(code, mfaConfig.backupCodes);
        if (result.valid) {
          verified = true;
          // Remove used backup code
          await removeBackupCode(session.username, result.index);
        }
        break;
      }

      default:
        return NextResponse.json(
          { error: "Invalid MFA method" },
          { status: 400 }
        );
    }

    if (!verified) {
      await recordFailedAttempt(ip);
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 401 }
      );
    }

    // MFA verified - create auth session
    await clearLockout(ip);
    await updateMFALastVerified(session.username);

    const token = await createToken(session.username);
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MFA verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
