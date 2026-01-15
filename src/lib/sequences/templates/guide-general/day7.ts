/**
 * Day 7 Guide Email Template
 *
 * "The data problem nobody talks about" - hidden costs of data inefficiency
 */

import type { SequenceTemplate } from "../../types";

interface Day7GuideGeneralParams {
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
 * Generate Day 7 data problem cost framework email
 */
export function getDay7GuideGeneralTemplate(params: Day7GuideGeneralParams): SequenceTemplate {
  const {
    firstName,
    company,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = "The data problem nobody talks about";

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
                The hidden cost of data problems
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
                We wanted to share something that rarely comes up in conversations about data strategy, but it's often the biggest factor in whether organizations move forward or stay stuck.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                <strong>It's the hidden cost of data inefficiency.</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                Most organizations know they have data problems. What they often don't realize is how expensive those problems actually are.
              </p>

              <!-- Cost Framework Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      The three costs nobody counts:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 0 16px 0; vertical-align: top; width: 32px;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A9988; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 14px; font-weight: 600;">1</span>
                        </td>
                        <td style="padding: 0 0 16px 12px;">
                          <p style="margin: 0 0 4px; color: #1a1a1a; font-size: 15px; font-weight: 600;">Hours lost to manual work</p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.5;">Every hour spent cleaning spreadsheets, reconciling numbers, or hunting for data is an hour not spent on analysis, strategy, or serving customers.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0; vertical-align: top; width: 32px;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A9988; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 14px; font-weight: 600;">2</span>
                        </td>
                        <td style="padding: 0 0 16px 12px;">
                          <p style="margin: 0 0 4px; color: #1a1a1a; font-size: 15px; font-weight: 600;">Decisions made on incomplete information</p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.5;">When data is hard to access or trust, people default to gut instinct. Sometimes that works. Often, it leads to expensive mistakes that could have been avoided.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 0 0; vertical-align: top; width: 32px;">
                          <span style="display: inline-block; width: 24px; height: 24px; background-color: #1A9988; color: #ffffff; border-radius: 50%; text-align: center; line-height: 24px; font-size: 14px; font-weight: 600;">3</span>
                        </td>
                        <td style="padding: 0 0 0 12px;">
                          <p style="margin: 0 0 4px; color: #1a1a1a; font-size: 15px; font-weight: 600;">Opportunities never pursued</p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 14px; line-height: 1.5;">The hardest cost to measure is what you never attempted. The analysis that would take too long. The question that couldn't be answered. The insight that stayed hidden in the noise.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Quick Exercise -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #fef3c7; border-radius: 8px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px; color: #b45309; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Quick exercise
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6;">
                      Think about your team's last month. How many hours were spent on data cleanup, manual reporting, or tracking down information? Multiply that by your average fully-loaded hourly rate. That's the floor of what data inefficiency is costing you - and it doesn't include the opportunity cost.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                The good news: these problems are solvable. Not with some massive transformation project, but with focused improvements in the areas that matter most. The trick is knowing where to start.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Worth a conversation?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If you'd like to talk through what this looks like${companyContext}, we're happy to share what we've seen work in similar situations. No pitch - just a chance to think through the problem together.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Quick Call
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
                Databender - Senior expertise. AI-powered speed.
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

We wanted to share something that rarely comes up in conversations about data strategy, but it's often the biggest factor in whether organizations move forward or stay stuck.

It's the hidden cost of data inefficiency.

Most organizations know they have data problems. What they often don't realize is how expensive those problems actually are.

THE THREE COSTS NOBODY COUNTS:

1. Hours lost to manual work
Every hour spent cleaning spreadsheets, reconciling numbers, or hunting for data is an hour not spent on analysis, strategy, or serving customers.

2. Decisions made on incomplete information
When data is hard to access or trust, people default to gut instinct. Sometimes that works. Often, it leads to expensive mistakes that could have been avoided.

3. Opportunities never pursued
The hardest cost to measure is what you never attempted. The analysis that would take too long. The question that couldn't be answered. The insight that stayed hidden in the noise.

---

QUICK EXERCISE:
Think about your team's last month. How many hours were spent on data cleanup, manual reporting, or tracking down information? Multiply that by your average fully-loaded hourly rate. That's the floor of what data inefficiency is costing you - and it doesn't include the opportunity cost.

---

The good news: these problems are solvable. Not with some massive transformation project, but with focused improvements in the areas that matter most. The trick is knowing where to start.

---

Worth a conversation?

If you'd like to talk through what this looks like${companyContext}, we're happy to share what we've seen work in similar situations. No pitch - just a chance to think through the problem together.

Schedule a call: ${calendarUrl}

Best,
Grant

---
Databender - Senior expertise. AI-powered speed.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject,
    htmlBody,
    textBody,
  };
}
