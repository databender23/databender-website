import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";

// JWT_SECRET is required in production, falls back to dev secret only in development
function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (isProduction) {
      throw new Error("JWT_SECRET environment variable is required in production");
    }
    // Development-only fallback - never used in production
    return new TextEncoder().encode("dev-only-jwt-secret-not-for-production");
  }
  return new TextEncoder().encode(secret);
}

const COOKIE_NAME = "admin_token";
const TOKEN_EXPIRY = "8h";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createToken(username: string): Promise<string> {
  return new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(getJwtSecret());
}

export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as { username: string };
  } catch {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // Strict CSRF protection - cookie only sent for same-site requests
    maxAge: 8 * 60 * 60, // 8 hours
    path: "/", // Root path to cover both /admin/* pages and /api/admin/* routes
  });
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || null;
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthCookie();
  if (!token) return false;

  const payload = await verifyToken(token);
  return payload !== null;
}

export async function validateCredentials(username: string, password: string): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (username !== adminUsername) return false;

  // Password hash is required in production - fail secure
  if (!adminPasswordHash) {
    if (isProduction) {
      console.error("ADMIN_PASSWORD_HASH not configured - login disabled in production");
      return false;
    }
    // Development-only: allow a dev password (not the old production password)
    console.warn("ADMIN_PASSWORD_HASH not set - using development password");
    return password === "dev-password-only";
  }

  return verifyPassword(password, adminPasswordHash);
}
