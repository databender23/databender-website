/**
 * Day 2 Legal Guide Follow-up Email Template
 *
 * Knowledge management insight focused on challenges
 * law firms face finding prior work and institutional knowledge
 */

import type { SequenceTemplate } from "../../types";

interface Day2GuideLegalParams {
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
 * Generate Day 2 legal guide follow-up email template
 */
export function getDay2GuideLegalTemplate(params: Day2GuideLegalParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = "The knowledge management problem no one talks about";

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
                When finding prior work takes longer than doing it
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
                I hope you found the <strong>${guideTitle}</strong> useful. I wanted to follow up with a specific observation that comes up in nearly every conversation I have with law firm leaders.
              </p>

              <!-- Insight Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; font-weight: 600;">
                      The hidden cost of institutional knowledge
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      Most firms have decades of valuable work product - briefs, contracts, research memos, deal documents. The problem is not that this knowledge does not exist. It is that finding it is often harder than recreating it from scratch.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                The pattern we see repeatedly:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px 0;">
                <tr>
                  <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                    <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                  </td>
                  <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                    Associates spend hours searching network drives, email archives, and document management systems
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                    <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                  </td>
                  <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                    Partners rely on memory and personal networks to locate relevant precedents
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                    <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                  </td>
                  <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                    Work gets recreated because it is faster than finding the original
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                    <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                  </td>
                  <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                    When partners retire, their institutional knowledge leaves with them
                  </td>
                </tr>
              </table>

              <!-- Statistic Callout -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; font-style: italic;">
                      "Studies suggest knowledge workers spend 20-30% of their time searching for information. In law firms, where time is billed in six-minute increments, this represents significant unrealized value."
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                The good news: modern semantic search technology can make your existing knowledge base discoverable without requiring attorneys to change how they work. The search finds relevant documents based on meaning, not just keywords - the way a knowledgeable colleague would.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Does this resonate with what you are seeing${companyContext}?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                I would be glad to share what we have seen work at firms addressing this challenge. No pitch - just a conversation about whether there is a practical path forward for your situation.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Confidential Discussion
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Best,<br />
                Grant
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Data & AI for growing businesses
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

I hope you found the ${guideTitle} useful. I wanted to follow up with a specific observation that comes up in nearly every conversation I have with law firm leaders.

THE HIDDEN COST OF INSTITUTIONAL KNOWLEDGE

Most firms have decades of valuable work product - briefs, contracts, research memos, deal documents. The problem is not that this knowledge does not exist. It is that finding it is often harder than recreating it from scratch.

The pattern we see repeatedly:

- Associates spend hours searching network drives, email archives, and document management systems
- Partners rely on memory and personal networks to locate relevant precedents
- Work gets recreated because it is faster than finding the original
- When partners retire, their institutional knowledge leaves with them

"Studies suggest knowledge workers spend 20-30% of their time searching for information. In law firms, where time is billed in six-minute increments, this represents significant unrealized value."

The good news: modern semantic search technology can make your existing knowledge base discoverable without requiring attorneys to change how they work. The search finds relevant documents based on meaning, not just keywords - the way a knowledgeable colleague would.

---

Does this resonate with what you are seeing${companyContext}?

I would be glad to share what we have seen work at firms addressing this challenge. No pitch - just a conversation about whether there is a practical path forward for your situation.

Schedule a confidential discussion: ${calendarUrl}

Best,
Grant

---
Databender - Data & AI for growing businesses
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject,
    htmlBody,
    textBody,
  };
}
