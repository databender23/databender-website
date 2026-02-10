/**
 * Day 0 Legal Guide Delivery Email Template
 *
 * Immediate email sent after downloading a legal industry guide
 * with the download link and CTA to schedule a discussion
 */

import type { SequenceTemplate } from "../../types";

interface Day0GuideLegalParams {
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
 * Generate Day 0 legal guide delivery email template
 */
export function getDay0GuideLegalTemplate(params: Day0GuideLegalParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    downloadUrl,
    contentUrl,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyText = company ? ` at ${company}` : "";

  const subject = `Your Guide: ${guideTitle}`;

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
                Your Guide Is Ready
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
                Thank you for downloading <strong>${guideTitle}</strong>. Your guide is ready for you below.
              </p>

              <!-- Download Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f0fdf9; border-radius: 8px; border: 1px solid #d1fae5;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      ${guideTitle}
                    </p>
                    <a href="${downloadUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Download Your Guide
                    </a>
                    <p style="margin: 16px 0 0; color: #6b7280; font-size: 13px;">
                      Or <a href="${contentUrl}" style="color: #1A9988; text-decoration: underline;">read online</a>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                This guide addresses the questions I hear most often from law firm leaders navigating AI and knowledge management decisions. Practical, usable guidance rather than vendor hype.
              </p>

              <!-- Security Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 16px 20px; border-radius: 8px; border-left: 4px solid #1A9988;">
                    <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                      <strong style="color: #1a1a1a;">A note on confidentiality:</strong> We understand the sensitive nature of legal work. Any conversations we have about your firm's data practices remain strictly confidential.
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Have questions about applying this to your firm${companyText}?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                I'm happy to discuss the specific challenges you're facing and share what I've seen work at other firms. No sales pressure, just a candid conversation about what makes sense for your situation.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Discussion
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-style: italic;">
                P.S. Have questions about the guide content? Just reply to this email. I read and respond to every message personally.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Rethink what's possible.
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

  const textBody = `Hi ${firstName},

Thank you for downloading ${guideTitle}. Your guide is ready for you.

DOWNLOAD YOUR GUIDE: ${downloadUrl}

Or read online: ${contentUrl}

This guide addresses the questions I hear most often from law firm leaders navigating AI and knowledge management decisions. Practical, usable guidance rather than vendor hype.

A note on confidentiality: We understand the sensitive nature of legal work. Any conversations we have about your firm's data practices remain strictly confidential.

---

Have questions about applying this to your firm${companyText}?

I'm happy to discuss the specific challenges you're facing and share what I've seen work at other firms. No sales pressure, just a candid conversation about what makes sense for your situation.

Schedule a discussion: ${calendarUrl}

---

P.S. Have questions about the guide content? Just reply to this email. I read and respond to every message personally.

---
Databender - Rethink what's possible.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `;

  return {
    subject,
    htmlBody,
    textBody,
  };
}
