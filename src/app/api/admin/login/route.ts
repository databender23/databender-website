import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createToken, setAuthCookie } from "@/lib/admin/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isLockedOut, recordFailedAttempt, clearLockout } from "@/lib/admin/lockout";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    // Check if IP is locked out
    const lockoutStatus = await isLockedOut(ip);
    if (lockoutStatus.locked) {
      const remainingMinutes = Math.ceil((lockoutStatus.remainingMs || 0) / 60000);
      return NextResponse.json(
        { error: `Account locked. Try again in ${remainingMinutes} minutes.` },
        { status: 423 }
      );
    }

    // Rate limit login attempts (5 per 15 minutes)
    const rateLimitResult = await checkRateLimit("login", ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
            ...(rateLimitResult.reset && {
              "X-RateLimit-Reset": String(rateLimitResult.reset),
            }),
          },
        }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const isValid = await validateCredentials(username, password);

    if (!isValid) {
      // Record failed attempt and check if now locked
      const { nowLocked, attempts } = await recordFailedAttempt(ip);

      if (nowLocked) {
        return NextResponse.json(
          { error: "Too many failed attempts. Account locked for 15 minutes." },
          { status: 423 }
        );
      }

      const remainingAttempts = 5 - attempts;
      return NextResponse.json(
        { error: `Invalid credentials. ${remainingAttempts} attempts remaining.` },
        { status: 401 }
      );
    }

    // Clear lockout on successful login
    await clearLockout(ip);

    const token = await createToken(username);
    await setAuthCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
