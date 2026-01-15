/**
 * Day 21 Guide Email Template
 *
 * Soft final CTA - stepping back, mentioning newsletter
 */

import type { SequenceTemplate } from "../../types";

interface Day21GuideGeneralParams {
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
 * Generate Day 21 soft final CTA email
 */
export function getDay21GuideGeneralTemplate(params: Day21GuideGeneralParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = `Open to a quick chat, ${firstName}?`;

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
                A quick note before we step back
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
                We've sent a few emails since you downloaded <strong>${guideTitle}</strong> a few weeks ago. We know inboxes get crowded, so we wanted to let you know this will be our last direct follow-up for now.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                If any of the topics we've touched on are still relevant to what you're working on${companyContext}, we're always happy to have a conversation. No pressure, no pitch - just a chance to talk through what you're facing and see if there's a way we can help.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Call When Convenient
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>What happens next</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Going forward, you'll continue to receive our newsletter with practical insights on data and AI - the kind of content we wish someone had shared with us when we were navigating these challenges. It's typically once or twice a month, with real ideas you can act on.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Of course, if that's not useful for you, you can unsubscribe anytime with one click.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Wishing you and the team${companyContext} all the best.
              </p>

              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Best,<br />
                Grant
              </p>

              <!-- P.S. Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 16px 20px; border-radius: 8px;">
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                      <strong style="color: #4a4a4a;">P.S.</strong> If timing isn't right now but might be in a few months, just reply and let us know. We'll make a note to check back in then.
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

We've sent a few emails since you downloaded "${guideTitle}" a few weeks ago. We know inboxes get crowded, so we wanted to let you know this will be our last direct follow-up for now.

If any of the topics we've touched on are still relevant to what you're working on${companyContext}, we're always happy to have a conversation. No pressure, no pitch - just a chance to talk through what you're facing and see if there's a way we can help.

Schedule a call when convenient: ${calendarUrl}

---

WHAT HAPPENS NEXT

Going forward, you'll continue to receive our newsletter with practical insights on data and AI - the kind of content we wish someone had shared with us when we were navigating these challenges. It's typically once or twice a month, with real ideas you can act on.

Of course, if that's not useful for you, you can unsubscribe anytime with one click.

---

Wishing you and the team${companyContext} all the best.

Best,
Grant

P.S. If timing isn't right now but might be in a few months, just reply and let us know. We'll make a note to check back in then.

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
