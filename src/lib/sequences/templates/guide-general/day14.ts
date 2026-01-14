/**
 * Day 14 Guide Email Template
 *
 * Case study of a fast-growing company drowning in spreadsheets
 * that automated pipelines and built real-time dashboards
 */

import type { SequenceTemplate } from "../../types";

interface Day14GuideGeneralParams {
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
 * Generate Day 14 case study email
 */
export function getDay14GuideGeneralTemplate(params: Day14GuideGeneralParams): SequenceTemplate {
  const {
    firstName,
    company,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyContext = company ? ` at ${company}` : "";

  const subject = "How they eliminated 15+ hours of spreadsheet work per week";

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
                Quick story you might relate to
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
                I wanted to share a quick story that might resonate with some of what you're dealing with.
              </p>

              <!-- Case Study Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      The Situation
                    </p>
                    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      <strong style="color: #1A9988;">A fast-growing company</strong> was drowning in spreadsheets. Their growth was outpacing their systems. Every department had their own version of the truth - different Excel files, different numbers, different definitions of basic metrics.
                    </p>
                    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      Monthly reporting took a full week. By the time leadership saw the numbers, they were already stale. Decisions were made on gut instinct because nobody trusted the data. The operations team spent more time reconciling spreadsheets than actually analyzing what was happening in the business.
                    </p>

                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      What Changed
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          Built automated data pipelines that replaced manual spreadsheet workflows
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          Created a single source of truth with real-time dashboards for each department
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          Implemented data quality checks that caught issues before they became problems
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 0 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 0 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          Standardized definitions so everyone was speaking the same language
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 8px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      The Results
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      They eliminated <strong>15+ hours per week</strong> of manual data work. Monthly close went from 7 days to 2. Leadership finally had numbers they could act on in real-time. But the biggest win? When everyone trusts the data, decisions happen faster and teams stop debating numbers and start debating strategy.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                The interesting thing: the technology wasn't complicated. What made the difference was understanding which problems to solve first and building solutions that people would actually use.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Sound familiar?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If any of this resonates with what you're experiencing${companyContext}, I'd be happy to discuss what a similar approach might look like for your situation. No obligation - just a conversation about what's possible.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Let's Talk
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

  const textBody = `
Hi ${firstName},

I wanted to share a quick story that might resonate with some of what you're dealing with.

---

THE SITUATION

A fast-growing company was drowning in spreadsheets. Their growth was outpacing their systems. Every department had their own version of the truth - different Excel files, different numbers, different definitions of basic metrics.

Monthly reporting took a full week. By the time leadership saw the numbers, they were already stale. Decisions were made on gut instinct because nobody trusted the data. The operations team spent more time reconciling spreadsheets than actually analyzing what was happening in the business.

WHAT CHANGED

- Built automated data pipelines that replaced manual spreadsheet workflows
- Created a single source of truth with real-time dashboards for each department
- Implemented data quality checks that caught issues before they became problems
- Standardized definitions so everyone was speaking the same language

THE RESULTS

They eliminated 15+ hours per week of manual data work. Monthly close went from 7 days to 2. Leadership finally had numbers they could act on in real-time. But the biggest win? When everyone trusts the data, decisions happen faster and teams stop debating numbers and start debating strategy.

---

The interesting thing: the technology wasn't complicated. What made the difference was understanding which problems to solve first and building solutions that people would actually use.

---

Sound familiar?

If any of this resonates with what you're experiencing${companyContext}, I'd be happy to discuss what a similar approach might look like for your situation. No obligation - just a conversation about what's possible.

Schedule a call: ${calendarUrl}

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
