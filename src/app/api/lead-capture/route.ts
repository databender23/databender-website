import { NextResponse } from "next/server";
import { sendGuideEmail } from "@/lib/notifications/guide-email";
import { getGuideContentBySlug } from "@/lib/guide-content-data";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  formType: "audit" | "guide" | "assessment";
  resourceSlug: string;
  resourceTitle: string;
  submittedAt: string;
}

/**
 * Send Slack notification for lead capture
 */
async function sendLeadSlackNotification(data: LeadData): Promise<void> {
  if (!SLACK_WEBHOOK_URL) {
    console.log("Slack webhook not configured, skipping notification");
    return;
  }

  try {
    const formTypeLabels: Record<string, string> = {
      guide: "Guide Download",
      audit: "Audit Request",
      assessment: "Assessment",
    };

    const formTypeEmoji: Record<string, string> = {
      guide: "📖",
      audit: "🔍",
      assessment: "📊",
    };

    const emoji = formTypeEmoji[data.formType] || "📋";
    const typeLabel = formTypeLabels[data.formType] || data.formType;

    // Format timestamp in Chicago timezone
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Chicago",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const blocks: any[] = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} *New ${typeLabel}*\n*${data.resourceTitle}*`,
        },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name*\n${data.firstName} ${data.lastName}` },
          { type: "mrkdwn", text: `*Email*\n${data.email}` },
        ],
      },
    ];

    // Add company if provided
    if (data.company) {
      blocks.push({
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Company*\n${data.company}` },
          { type: "mrkdwn", text: `*Type*\n${typeLabel}` },
        ],
      });
    }

    // Add message if provided (for audits)
    if (data.message) {
      blocks.push({
        type: "section",
        text: { type: "mrkdwn", text: `*Message*\n${data.message}` },
      });
    }

    // Add timestamp
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: `🕐 ${timeStr} CT` }],
    });

    const payload = {
      text: `${emoji} New ${typeLabel}: ${data.resourceTitle} from ${data.firstName} ${data.lastName}`,
      attachments: [
        {
          color: data.formType === "audit" ? "#ea580c" : "#1A9988",
          blocks,
        },
      ],
    };

    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Slack notification failed:", response.status, errorText);
    }
  } catch (error) {
    console.error("Slack notification error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      formType,
      resourceSlug,
      resourceTitle,
      submittedAt,
    } = body as LeadData;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission
    console.log("Lead capture submission:", {
      formType,
      resourceSlug,
      resourceTitle,
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      submittedAt,
    });

    // Send Slack notification (fire and forget)
    sendLeadSlackNotification({
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      formType,
      resourceSlug,
      resourceTitle,
      submittedAt,
    }).catch((err) => console.error("Slack notification failed:", err));

    // Handle guide downloads
    if (formType === "guide") {
      const guideContent = getGuideContentBySlug(resourceSlug);

      if (guideContent) {
        // Send guide email via SES
        const emailSent = await sendGuideEmail({
          firstName,
          lastName,
          email,
          company,
          guideTitle: resourceTitle,
          guideSlug: resourceSlug,
          downloadUrl: guideContent.pdfUrl,
          contentUrl: `/resources/guides/${resourceSlug}/content`,
        });

        if (!emailSent) {
          console.warn(`Guide email failed to send for ${email}`);
        }
      } else {
        console.warn(`No guide content found for slug: ${resourceSlug}`);
      }
    }

    // Handle audit requests (notify team)
    if (formType === "audit") {
      // Audit requests are handled via Slack notification above
      // Could add additional email notification to sales team here
      console.log(`Audit request received: ${resourceTitle} from ${company}`);
    }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
