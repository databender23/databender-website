import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { generateTOTPSecret, generateTOTPUri, generateBackupCodes } from "@/lib/admin/mfa";
import QRCode from "qrcode";

export async function GET() {
  try {
    // Require authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate TOTP secret
    const secret = generateTOTPSecret();
    const username = process.env.ADMIN_USERNAME || "admin";
    const uri = generateTOTPUri(secret, username);

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(uri, {
      width: 256,
      margin: 2,
      color: {
        dark: "#1A9988", // Teal brand color
        light: "#FFFFFF",
      },
    });

    // Generate backup codes
    const backupCodes = generateBackupCodes(10);

    return NextResponse.json({
      secret,
      qrCodeDataUrl,
      uri,
      backupCodes,
    });
  } catch (error) {
    console.error("MFA setup error:", error);
    return NextResponse.json(
      { error: "Failed to generate MFA setup" },
      { status: 500 }
    );
  }
}
