/**
 * Day 0 Guide Delivery Email Template
 *
 * Immediate email sent after downloading a guide
 * with download link and CTA to discuss how strategies apply
 */

import type { SequenceTemplate } from "../../types";

interface Day0GuideGeneralParams {
  firstName: string;
  company?: string;
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  contentUrl: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

/**
 * Generate Day 0 guide delivery email template
 */
export function getDay0GuideGeneralTemplate(params: Day0GuideGeneralParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    downloadUrl,
    contentUrl,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = `Your guide: ${guideTitle}`;

  const htmlBody = `
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
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #1A9988 0%, #147a6c 100%);">
              <img src="https://databender.co/images/logo-white.png" alt="Databender" style="height: 32px; margin-bottom: 16px;" />
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Your Guide is Ready
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thank you for downloading <strong>${guideTitle}</strong>. We put this together based on patterns we've seen working with organizations like yours, and we hope you find it valuable.
              </p>

              <!-- Download Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f0fdf9; border-radius: 8px; border: 1px solid #1A9988;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      ${guideTitle}
                    </p>
                    <a href="${downloadUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Download Your Guide
                    </a>
                    <p style="margin: 16px 0 0; color: #6b7280; font-size: 13px;">
                      Or <a href="${contentUrl}" style="color: #1A9988; text-decoration: none;">read it online</a>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                As you go through the guide, you'll find practical frameworks and approaches that have worked well for other organizations. That said, every situation is different, and what works best often depends on your specific context.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Want to discuss how these strategies apply${companyContext}?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                We'd be happy to have a quick conversation about what you're working on and share ideas for putting these concepts into practice. No pitch, just a chance to talk through your specific situation.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Conversation
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-style: italic;">
                P.S. Have questions as you read through? Just reply to this email. We read and respond to every message personally.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Boutique strategy. Enterprise delivery.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="https://databender.co" style="color: #9ca3af; text-decoration: none;">databender.co</a>
              </p>
              <p style="margin: 16px 0 0; color: #9ca3af; font-size: 11px; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> from these emails
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

  const textBody = `
Hi ${firstName},

Thank you for downloading "${guideTitle}". We put this together based on patterns we've seen working with organizations like yours, and we hope you find it valuable.

DOWNLOAD YOUR GUIDE: ${downloadUrl}

Or read it online: ${contentUrl}

As you go through the guide, you'll find practical frameworks and approaches that have worked well for other organizations. That said, every situation is different, and what works best often depends on your specific context.

---

Want to discuss how these strategies apply${companyContext}?

We'd be happy to have a quick conversation about what you're working on and share ideas for putting these concepts into practice. No pitch, just a chance to talk through your specific situation.

Schedule a conversation: ${calendarUrl}

---

P.S. Have questions as you read through? Just reply to this email. We read and respond to every message personally.

---
Databender - Boutique strategy. Enterprise delivery.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject,
    htmlBody,
    textBody,
  };
}
