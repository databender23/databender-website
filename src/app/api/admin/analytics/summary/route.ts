import { NextRequest, NextResponse } from "next/server";
import { sendDailySummaryEmail, generateDailySummary } from "@/lib/notifications/email-summary";

// Secret key to protect the endpoint (set in environment variables)
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * POST /api/admin/analytics/summary
 *
 * Triggers the daily analytics summary email.
 * Protected by CRON_SECRET to prevent unauthorized access.
 *
 * Can be called by:
 * - AWS EventBridge / CloudWatch scheduled event
 * - Vercel Cron
 * - External cron service (e.g., cron-job.org)
 *
 * Headers required:
 * - Authorization: Bearer <CRON_SECRET>
 *
 * Or query param:
 * - ?secret=<CRON_SECRET>
 */
export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");

  const providedSecret = authHeader?.replace("Bearer ", "") || secretParam;

  if (CRON_SECRET && providedSecret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await sendDailySummaryEmail();

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Daily summary email sent successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Email not configured or failed to send",
      });
    }
  } catch (error) {
    console.error("Summary email error:", error);
    return NextResponse.json(
      { error: "Failed to send summary email" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/analytics/summary
 *
 * Returns the summary data without sending an email.
 * Useful for previewing the summary or building custom dashboards.
 */
export async function GET(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");

  const providedSecret = authHeader?.replace("Bearer ", "") || secretParam;

  if (CRON_SECRET && providedSecret !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await generateDailySummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
