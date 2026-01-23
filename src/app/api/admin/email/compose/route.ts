/**
 * High-Touch Email Compose API
 *
 * POST - Send a high-touch email with tracking
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { sendHighTouchEmail } from "@/lib/email/send-email";

export async function POST(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      to,
      firstName,
      lastName,
      company,
      subject,
      body: emailBody,
      trackOpens = true,
      trackClicks = true,
      templateId,
      tags,
    } = body;

    // Validate required fields
    if (!to || !firstName || !company || !subject || !emailBody) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "to, firstName, company, subject, and body are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Send the email
    const result = await sendHighTouchEmail({
      to,
      firstName,
      lastName,
      company,
      subject,
      body: emailBody,
      trackOpens,
      trackClicks,
      templateId,
      tags,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leadId: result.leadId,
      emailId: result.emailId,
      messageId: result.messageId,
      isNewLead: result.isNewLead,
    });
  } catch (error) {
    console.error("[API] Email compose error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
