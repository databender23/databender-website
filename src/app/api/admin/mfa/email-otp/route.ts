import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyMFASession, sendEmailOTP } from "@/lib/admin/mfa";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  try {
    // Rate limit email OTP requests (stricter than login)
    const rateLimitResult = await checkRateLimit("form", ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before requesting another code." },
        { status: 429 }
      );
    }

    const { mfaToken } = await request.json();

    if (!mfaToken) {
      return NextResponse.json(
        { error: "Missing MFA session token" },
        { status: 400 }
      );
    }

    // Verify MFA session
    const session = await verifyMFASession(mfaToken);
    if (!session) {
      return NextResponse.json(
        { error: "Invalid or expired session. Please log in again." },
        { status: 401 }
      );
    }

    // Get admin email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail) {
      return NextResponse.json(
        { error: "Email OTP not configured. Use TOTP or backup code." },
        { status: 400 }
      );
    }

    // Send OTP email
    const result = await sendEmailOTP(adminEmail);

    // Mask email for response
    const [localPart, domain] = adminEmail.split("@");
    const maskedEmail = `${localPart[0]}***@${domain}`;

    return NextResponse.json({
      success: true,
      sentTo: maskedEmail,
      expiresIn: result.expiresIn,
    });
  } catch (error) {
    console.error("Email OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
