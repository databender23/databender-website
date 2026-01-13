import { NextResponse } from "next/server";

// Debug endpoint to check env var availability (doesn't expose values)
export async function GET() {
  return NextResponse.json({
    env_check: {
      ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
      ANTHROPIC_API_KEY_length: process.env.ANTHROPIC_API_KEY?.length || 0,
      ANTHROPIC_API_KEY_prefix: process.env.ANTHROPIC_API_KEY?.slice(0, 10) || "not set",
      NODE_ENV: process.env.NODE_ENV,
      all_env_keys: Object.keys(process.env).filter(k =>
        k.includes("ANTHROPIC") ||
        k.includes("SES") ||
        k.includes("SLACK") ||
        k.includes("AWS")
      ),
    },
    timestamp: new Date().toISOString(),
  });
}
