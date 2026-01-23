import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, verifyPassword } from "@/lib/admin/auth";
import { disableMFA, getMFAConfig, verifyTOTP, decrypt } from "@/lib/admin/mfa";

export async function POST(request: NextRequest) {
  try {
    // Require authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { password, code } = await request.json();

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
        { error: "MFA is not enabled" },
        { status: 400 }
      );
    }

    // If MFA is enabled, require TOTP code for extra security
    if (code) {
      const secret = decrypt(config.totpSecret);
      const codeValid = verifyTOTP(secret, code);
      if (!codeValid) {
        return NextResponse.json(
          { error: "Invalid verification code" },
          { status: 400 }
        );
      }
    }

    // Disable MFA
    await disableMFA(username);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MFA disable error:", error);
    return NextResponse.json(
      { error: "Failed to disable MFA" },
      { status: 500 }
    );
  }
}
