import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const username = process.env.ADMIN_USERNAME;

  // Test if the hash can verify the password
  const testPassword = "AlreadyDead26";
  let canVerify = false;

  if (hash) {
    try {
      canVerify = await bcrypt.compare(testPassword, hash);
    } catch (e) {
      return NextResponse.json({
        username,
        hashPresent: !!hash,
        hashLength: hash?.length,
        hashStart: hash?.substring(0, 10),
        error: String(e),
        canVerify: false
      });
    }
  }

  return NextResponse.json({
    username,
    hashPresent: !!hash,
    hashLength: hash?.length,
    hashStart: hash?.substring(0, 10),
    canVerify
  });
}
