/**
 * Email Sequence Processing Cron Endpoint
 *
 * Processes all active email sequences and sends emails at appropriate times.
 * Should be called daily by a cron job (e.g., AWS EventBridge, Vercel Cron).
 *
 * Authentication: Requires CRON_SECRET in Authorization header
 */

import { NextRequest, NextResponse } from "next/server";
import { processSequenceEmails } from "@/lib/sequences/processor";

export async function POST(request: NextRequest) {
  // Verify cron secret
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret) {
    console.error("[Cron] CRON_SECRET not configured");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    console.warn("[Cron] Unauthorized sequence processing attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log("[Cron] Starting email sequence processing...");

  try {
    const result = await processSequenceEmails();

    console.log("[Cron] Sequence processing complete:", result);

    return NextResponse.json({
      success: true,
      processed: result.totalProcessed,
      emailsSent: result.emailsSent,
      completedSequences: result.completedSequences,
      errors: result.errors.length,
      errorDetails: result.errors.length > 0 ? result.errors : undefined,
    });
  } catch (error) {
    console.error("[Cron] Sequence processing failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for manual testing (with same auth)
export async function GET(request: NextRequest) {
  return POST(request);
}
