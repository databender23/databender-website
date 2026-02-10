/**
 * Day 21 Legal Guide Email Template
 *
 * Soft final CTA - stepping back, warm close,
 * mention newsletter for ongoing insights
 */

import type { SequenceTemplate } from "../../types";

interface Day21GuideLegalParams {
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
 * Generate Day 21 legal guide soft CTA email template
 */
export function getDay21GuideLegalTemplate(params: Day21GuideLegalParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = `A final thought, ${firstName}`;

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
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                Stepping back for now
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
                I've sent you a few emails since you downloaded <strong>${guideTitle}</strong> a few weeks ago. I know inboxes get crowded, especially in legal where you're managing client communications, opposing counsel, and internal matters all at once.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                This will be my last follow-up for now. The door is always open if the topics we discussed become a priority down the road.
              </p>

              <!-- Option Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      If you would like to connect
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      I'm happy to have a confidential conversation about knowledge management, AI readiness, or data strategy whenever timing makes sense for your firm${companyContext}. No pressure, no pitch. Just an honest discussion about what's realistic and worthwhile.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule When Convenient
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <!-- Newsletter Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                    <p style="margin: 0 0 12px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      Staying in touch
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.6;">
                      Going forward, you'll get our monthly insights email with practical perspectives on data and AI for professional services firms. I focus on what's actually working, not vendor hype. You can unsubscribe anytime if it's not useful.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Thank you for taking the time to explore these topics. Wishing you and the team${companyContext} continued success.
              </p>

              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Best regards,<br />
                Grant
              </p>

              <!-- P.S. Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 16px 20px; border-left: 3px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      <strong style="color: #4a4a4a;">P.S.</strong> If timing isn't right now but might be in a few months (perhaps after a busy litigation period or once budget planning begins), just reply and let me know. I'll follow up then rather than now.
                    </p>
                  </td>
                </tr>
              </table>
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

I've sent you a few emails since you downloaded ${guideTitle} a few weeks ago. I know inboxes get crowded, especially in legal where you're managing client communications, opposing counsel, and internal matters all at once.

This will be my last follow-up for now. The door is always open if the topics we discussed become a priority down the road.

---

IF YOU WOULD LIKE TO CONNECT

I'm happy to have a confidential conversation about knowledge management, AI readiness, or data strategy whenever timing makes sense for your firm${companyContext}. No pressure, no pitch. Just an honest discussion about what's realistic and worthwhile.

Schedule when convenient: ${calendarUrl}

---

STAYING IN TOUCH

Going forward, you'll get our monthly insights email with practical perspectives on data and AI for professional services firms. I focus on what's actually working, not vendor hype. You can unsubscribe anytime if it's not useful.

---

Thank you for taking the time to explore these topics. Wishing you and the team${companyContext} continued success.

Best regards,
Grant

P.S. If timing isn't right now but might be in a few months (perhaps after a busy litigation period or once budget planning begins), just reply and let me know. I'll follow up then rather than now.

---
Databender - Rethink what's possible.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject,
    htmlBody,
    textBody,
  };
}
