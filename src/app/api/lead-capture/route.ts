import { NextResponse } from "next/server";
import { sendGuideEmail } from "@/lib/notifications/guide-email";
import { getGuideContentBySlug } from "@/lib/guide-content-data";
import {
  createLead,
  enrichLeadWithAnalytics,
} from "@/lib/leads/lead-service";
import type { LeadFormType } from "@/lib/leads/types";
import { enrollAndSendDay0 } from "@/lib/sequences/processor";
import { getGuideSequenceType } from "@/lib/sequences/types";
import { BEHAVIOR_SCORES, getLeadTier } from "@/lib/analytics/lead-scoring";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstile, getTurnstileToken } from "@/lib/turnstile";

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface LeadData {
  firstName?: string;
  lastName?: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  formType: "audit" | "guide" | "assessment" | "newsletter";
  resourceSlug?: string;
  resourceTitle?: string;
  submittedAt: string;
  // Analytics data for lead enrichment
  visitorId?: string;
  sessionId?: string;
  sourcePage?: string;
  // Turnstile token
  turnstileToken?: string;
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
      newsletter: "Newsletter Signup",
    };

    const formTypeEmoji: Record<string, string> = {
      guide: "📖",
      audit: "🔍",
      assessment: "📊",
      newsletter: "📬",
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
          text: `${emoji} *New ${typeLabel}*${data.resourceTitle ? `\n*${data.resourceTitle}*` : ""}`,
        },
      },
    ];

    // Add name/email fields - handle newsletter (email only)
    if (data.firstName && data.lastName) {
      blocks.push({
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Name*\n${data.firstName} ${data.lastName}` },
          { type: "mrkdwn", text: `*Email*\n${data.email}` },
        ],
      });
    } else {
      blocks.push({
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Email*\n${data.email}` },
        ],
      });
    }

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

    // Build summary text - handle newsletter (email only)
    const fromText = data.firstName && data.lastName
      ? `from ${data.firstName} ${data.lastName}`
      : `from ${data.email}`;
    const titleText = data.resourceTitle ? `: ${data.resourceTitle}` : "";

    const payload = {
      text: `${emoji} New ${typeLabel}${titleText} ${fromText}`,
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
    const ip = getClientIp(request);

    // Rate limit form submissions (3 per minute)
    const rateLimitResult = await checkRateLimit("form", ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Verify Turnstile token (if configured)
    const turnstileToken = getTurnstileToken(body);
    const turnstileResult = await verifyTurnstile(turnstileToken, ip);
    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: turnstileResult.error || "Bot verification failed" },
        { status: 403 }
      );
    }

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
      visitorId,
      sessionId,
      sourcePage,
    } = body as LeadData;

    // Validate required fields - newsletter only needs email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // For non-newsletter forms, require name fields
    if (formType !== "newsletter" && (!firstName || !lastName)) {
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
      firstName: firstName || "(newsletter)",
      lastName: lastName || "(subscriber)",
      email,
      company,
      phone,
      message,
      submittedAt,
    });

    // Create lead in database (fire and forget to not block response)
    (async () => {
      try {
        // Enrich with analytics data if visitorId/sessionId provided
        let analyticsData: Record<string, unknown> = {};
        if (visitorId && sessionId) {
          analyticsData = await enrichLeadWithAnalytics(visitorId, sessionId);
        }

        // Add score boost based on form type - prioritize high-intent actions
        const existingScore = (analyticsData.behaviorScore as number) || 0;
        let scoreBoost = 0;

        if (formType === "guide") {
          scoreBoost = BEHAVIOR_SCORES.GUIDE_DOWNLOAD;
        } else if (formType === "newsletter") {
          scoreBoost = BEHAVIOR_SCORES.NEWSLETTER_SIGNUP;
        } else if (formType === "assessment") {
          scoreBoost = BEHAVIOR_SCORES.ASSESSMENT_COMPLETED;
        } else {
          scoreBoost = BEHAVIOR_SCORES.FORM_SUBMITTED;
        }

        const boostedScore = existingScore + scoreBoost;
        analyticsData.behaviorScore = boostedScore;
        analyticsData.behaviorTier = getLeadTier(boostedScore);

        const lead = await createLead({
          firstName: firstName || "Newsletter",
          lastName: lastName || "Subscriber",
          email,
          company,
          phone,
          message,
          formType: formType as LeadFormType,
          resourceSlug: resourceSlug || (formType === "newsletter" ? "newsletter" : undefined),
          resourceTitle: resourceTitle || (formType === "newsletter" ? "Newsletter Subscription" : undefined),
          sourcePage: sourcePage || (formType === "newsletter" ? "/" : `/resources/guides/${resourceSlug}`),
          leadSource: "website",
          visitorId,
          sessionId,
          ...analyticsData,
        });
        console.log(`Lead created for ${email} (score: ${analyticsData.behaviorScore || 0})`);

        // Enroll guide downloads in email sequence
        if (formType === "guide" && resourceSlug) {
          try {
            const sequenceType = getGuideSequenceType(resourceSlug);
            await enrollAndSendDay0(lead, sequenceType);
            console.log(`Guide sequence (${sequenceType}) started for ${email}`);
          } catch (seqErr) {
            console.error(`Failed to start guide sequence for ${email}:`, seqErr);
          }
        }
      } catch (err) {
        console.error("Lead creation failed:", err);
      }
    })();

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
    if (formType === "guide" && resourceSlug) {
      const guideContent = getGuideContentBySlug(resourceSlug);

      if (guideContent && firstName && lastName) {
        // Send guide email via SES
        const emailSent = await sendGuideEmail({
          firstName,
          lastName,
          email,
          company,
          guideTitle: resourceTitle || guideContent.title,
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
