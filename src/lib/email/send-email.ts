/**
 * High-Touch Email Sending
 *
 * Handles sending individual high-touch emails via AWS SES
 * with tracking and lead record updates.
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { v4 as uuidv4 } from "uuid";
import { applyEmailTracking } from "../sequences/tracking";
import { getLeadByEmail, updateLead, putLead } from "../leads/dynamodb";
import type { Lead } from "../leads/types";
import { generateUnsubscribeToken } from "../sequences/sequence-service";

export interface SendEmailInput {
  to: string;
  firstName: string;
  lastName?: string;
  company: string;
  subject: string;
  body: string;
  trackOpens?: boolean;
  trackClicks?: boolean;
  templateId?: string;
  tags?: string[];
}

export interface SendEmailResult {
  success: boolean;
  leadId?: string;
  emailId?: string;
  messageId?: string;
  error?: string;
  isNewLead?: boolean;
}

/**
 * Convert plain text/markdown body to HTML
 * Supports basic markdown: **bold**, paragraphs, links
 */
function markdownToHtml(text: string): string {
  // Escape HTML entities first
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Convert **bold** to <strong>
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert markdown links [text](url) to <a> tags
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="color: #1A9988; text-decoration: underline;">$1</a>'
  );

  // Convert newlines to paragraphs
  const paragraphs = html.split(/\n\n+/);
  html = paragraphs
    .map((p) => {
      // Convert single newlines within paragraphs to <br>
      const withBreaks = p.replace(/\n/g, "<br>");
      return `<p style="margin: 0 0 16px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">${withBreaks}</p>`;
    })
    .join("");

  return html;
}

/**
 * Build full HTML email template
 */
function buildHtmlEmail(
  bodyHtml: string,
  unsubscribeUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Rethink what's possible.
              </p>
              <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Build plain text version of email
 */
function buildTextEmail(body: string, unsubscribeUrl: string): string {
  return `${body}

---
Databender - Rethink what's possible.

Unsubscribe: ${unsubscribeUrl}`;
}

/**
 * Replace template placeholders with actual values
 */
function replaceTemplateVariables(
  text: string,
  variables: Record<string, string>
): string {
  let result = text;
  for (const [key, value] of Object.entries(variables)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "gi");
    result = result.replace(pattern, value);
  }
  return result;
}

/**
 * Send a high-touch email and record it
 */
export async function sendHighTouchEmail(
  input: SendEmailInput
): Promise<SendEmailResult> {
  const {
    to,
    firstName,
    lastName,
    company,
    subject,
    body,
    trackOpens = true,
    trackClicks = true,
    templateId,
    tags,
  } = input;

  const email = to.toLowerCase();
  const emailId = uuidv4();

  // Replace template variables in subject and body
  const variables: Record<string, string> = {
    firstName,
    lastName: lastName || "",
    company,
    email,
  };

  const processedSubject = replaceTemplateVariables(subject, variables);
  const processedBody = replaceTemplateVariables(body, variables);

  // Find existing lead or create new one
  let lead = await getLeadByEmail(email);
  let isNewLead = false;

  if (!lead) {
    // Create a new lead record
    const now = new Date().toISOString();
    const leadId = uuidv4();
    const pk = `LEAD#${email}`;
    const sk = `#CREATED#${now}`;

    lead = {
      pk,
      sk,
      leadId,
      email,
      firstName,
      lastName: lastName || "",
      company,
      formType: "contact",
      sourcePage: "/admin/cold-outreach/compose",
      status: "contacted",
      leadSource: "cold-research",
      tags: tags || [],
      createdAt: now,
      updatedAt: now,
    } as Lead;

    await putLead(lead);
    isNewLead = true;
  }

  // Generate unsubscribe URL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co";
  const unsubscribeToken = generateUnsubscribeToken(email);
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${unsubscribeToken}`;

  // Convert body to HTML
  const bodyHtml = markdownToHtml(processedBody);
  let fullHtml = buildHtmlEmail(bodyHtml, unsubscribeUrl);
  const textBody = buildTextEmail(processedBody, unsubscribeUrl);

  // Apply tracking if enabled
  if (trackOpens || trackClicks) {
    fullHtml = applyEmailTracking(
      fullHtml,
      lead.leadId,
      0, // emailDay 0 for high-touch
      "high-touch",
      emailId
    );

    // If only opens enabled, we still want the pixel but can strip click tracking
    // For now, applyEmailTracking handles both together - this is fine for most cases
  }

  // Send via SES
  try {
    const messageId = await sendViaSES(email, processedSubject, fullHtml, textBody);

    // Record the email in the lead's history
    const highTouchEmail = {
      emailId,
      subject: processedSubject,
      sentAt: new Date().toISOString(),
      templateId,
      trackOpens,
      trackClicks,
    };

    const existingHighTouch = lead.highTouchEmails || [];
    await updateLead(lead.email, lead.createdAt, {
      highTouchEmails: [...existingHighTouch, highTouchEmail],
      status: lead.status === "new" ? "contacted" : lead.status,
      lastActivityAt: new Date().toISOString(),
    });

    console.log(
      `[HighTouch] Sent email to ${email}, messageId: ${messageId}, emailId: ${emailId}`
    );

    return {
      success: true,
      leadId: lead.leadId,
      emailId,
      messageId,
      isNewLead,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[HighTouch] Failed to send email to ${email}:`, error);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send an email via AWS SES
 * Uses COLD_SES_* credentials for high-touch emails from Grant's main address
 */
async function sendViaSES(
  toEmail: string,
  subject: string,
  htmlBody: string,
  textBody: string
): Promise<string | undefined> {
  const awsRegion = process.env.COLD_SES_REGION || process.env.SES_REGION || "us-east-1";
  const fromEmail = process.env.HIGH_TOUCH_FROM_EMAIL || "grant@databender.co";
  const fromName = process.env.HIGH_TOUCH_FROM_NAME || "Grant Bender";

  const clientConfig: {
    region: string;
    credentials?: { accessKeyId: string; secretAccessKey: string };
  } = {
    region: awsRegion,
  };

  // Use COLD_SES credentials for cold outreach (required for Amplify - no AWS_ prefix)
  if (process.env.COLD_SES_ACCESS_KEY_ID && process.env.COLD_SES_SECRET_ACCESS_KEY) {
    clientConfig.credentials = {
      accessKeyId: process.env.COLD_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.COLD_SES_SECRET_ACCESS_KEY,
    };
  }

  const sesClient = new SESClient(clientConfig);

  const command = new SendEmailCommand({
    Source: `${fromName} <${fromEmail}>`,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: "UTF-8",
        },
        Text: {
          Data: textBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  const result = await sesClient.send(command);
  return result.MessageId;
}
