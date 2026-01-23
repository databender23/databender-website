import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, verifyPassword } from "@/lib/admin/auth";
import {
  verifyTOTP,
  encrypt,
  hashBackupCodes,
  saveMFAConfig,
  getMFAConfig,
} from "@/lib/admin/mfa";

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { secret, code, backupCodes, password } = await request.json();

    if (!secret || !code || !backupCodes || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify current password
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!passwordHash) {
      return NextResponse.json(
        { error: "Password not configured" },
        { status: 500 }
      );
    }

    const passwordValid = await verifyPassword(password, passwordHash);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Verify the TOTP code works with the provided secret
    const codeValid = verifyTOTP(secret, code);
    if (!codeValid) {
      return NextResponse.json(
        { error: "Invalid verification code. Please check your authenticator app." },
        { status: 400 }
      );
    }

    // Encrypt the TOTP secret
    const encryptedSecret = encrypt(secret);

    // Hash backup codes
    const hashedBackupCodes = await hashBackupCodes(backupCodes);

    // Save MFA configuration
    const username = process.env.ADMIN_USERNAME || "admin";
    await saveMFAConfig(username, {
      enabled: true,
      totpSecret: encryptedSecret,
      backupCodes: hashedBackupCodes,
      backupCodesGeneratedAt: new Date().toISOString(),
      enabledAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MFA enable error:", error);
    return NextResponse.json(
      { error: "Failed to enable MFA" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Require authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = process.env.ADMIN_USERNAME || "admin";
    const config = await getMFAConfig(username);

    return NextResponse.json({
      enabled: config?.enabled ?? false,
      backupCodesRemaining: config?.backupCodes?.filter(Boolean).length ?? 0,
      enabledAt: config?.enabledAt,
      lastVerifiedAt: config?.lastVerifiedAt,
    });
  } catch (error) {
    console.error("MFA status error:", error);
    return NextResponse.json(
      { error: "Failed to get MFA status" },
      { status: 500 }
    );
  }
}
