import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, verifyPassword } from "@/lib/admin/auth";
import {
  getMFAConfig,
  generateBackupCodes,
  hashBackupCodes,
  saveMFAConfig,
  decrypt,
} from "@/lib/admin/mfa";

// GET: Get backup codes count
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = process.env.ADMIN_USERNAME || "admin";
    const config = await getMFAConfig(username);

    if (!config?.enabled) {
      return NextResponse.json(
        { error: "MFA not enabled" },
        { status: 400 }
      );
    }

    const remaining = config.backupCodes?.filter(Boolean).length ?? 0;

    return NextResponse.json({
      remaining,
      generatedAt: config.backupCodesGeneratedAt,
    });
  } catch (error) {
    console.error("Backup codes error:", error);
    return NextResponse.json(
      { error: "Failed to get backup codes" },
      { status: 500 }
    );
  }
}

// POST: Regenerate backup codes
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password required" },
        { status: 400 }
      );
    }

    // Verify password
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

    const username = process.env.ADMIN_USERNAME || "admin";
    const config = await getMFAConfig(username);

    if (!config?.enabled) {
      return NextResponse.json(
        { error: "MFA not enabled" },
        { status: 400 }
      );
    }

    // Generate new backup codes
    const newCodes = generateBackupCodes(10);
    const hashedCodes = await hashBackupCodes(newCodes);

    // Keep existing TOTP secret, update backup codes
    await saveMFAConfig(username, {
      enabled: config.enabled,
      totpSecret: config.totpSecret,
      backupCodes: hashedCodes,
      backupCodesGeneratedAt: new Date().toISOString(),
      enabledAt: config.enabledAt,
      lastVerifiedAt: config.lastVerifiedAt,
    });

    // Return new codes (display once)
    return NextResponse.json({
      success: true,
      backupCodes: newCodes,
    });
  } catch (error) {
    console.error("Regenerate backup codes error:", error);
    return NextResponse.json(
      { error: "Failed to regenerate backup codes" },
      { status: 500 }
    );
  }
}
