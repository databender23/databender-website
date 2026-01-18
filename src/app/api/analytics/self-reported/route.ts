/**
 * Self-Reported Attribution API
 *
 * Record "How did you hear about us?" responses for attribution.
 * This is a public endpoint (no admin auth) as it's called from forms.
 *
 * POST /api/analytics/self-reported
 * {
 *   visitorId: string,
 *   response: string
 * }
 */

import { NextRequest, NextResponse } from "next/server";
import { recordSelfReportedSource } from "@/lib/analytics/attribution";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { visitorId, response } = body as {
      visitorId: string;
      response: string;
    };

    if (!visitorId || !response) {
      return NextResponse.json(
        { error: "visitorId and response are required" },
        { status: 400 }
      );
    }

    // Validate response length
    if (response.length > 500) {
      return NextResponse.json(
        { error: "Response too long. Maximum 500 characters." },
        { status: 400 }
      );
    }

    await recordSelfReportedSource(visitorId, response);

    return NextResponse.json({
      success: true,
      message: "Self-reported source recorded",
    });
  } catch (error) {
    console.error("Self-reported attribution error:", error);
    return NextResponse.json(
      { error: "Failed to record self-reported source" },
      { status: 500 }
    );
  }
}
