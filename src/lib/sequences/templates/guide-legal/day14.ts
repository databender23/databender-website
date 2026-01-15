/**
 * Day 14 Legal Guide Email Template
 *
 * Case study of a 40-attorney firm implementing knowledge management
 * with semantic search and recovered billable time
 */

import type { SequenceTemplate } from "../../types";

interface Day14GuideLegalParams {
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
 * Generate Day 14 legal guide case study email template
 */
export function getDay14GuideLegalTemplate(params: Day14GuideLegalParams): SequenceTemplate {
  const {
    firstName,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const subject = "How a 40-attorney firm stopped reinventing the wheel";

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
                Case study: Knowledge that pays for itself
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
                We wanted to share a story that illustrates what we discussed in the guide. This is a real engagement - details adjusted to protect confidentiality.
              </p>

              <!-- Case Study Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <!-- The Firm -->
                    <p style="margin: 0 0 16px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      The Firm
                    </p>
                    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      A 40-attorney firm with three practice areas: commercial litigation, corporate transactions, and employment law. In business for 25+ years, with substantial work product accumulated across network drives, a document management system, and partner email archives.
                    </p>

                    <!-- The Challenge -->
                    <p style="margin: 0 0 16px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      The Challenge
                    </p>
                    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      Associates routinely spent hours searching for relevant precedents. The firm's document management system search was keyword-based and returned hundreds of results for any general query. Partners knew the work existed somewhere but could not point people to it efficiently. When senior partners retired, their institutional knowledge effectively disappeared.
                    </p>

                    <!-- The Approach -->
                    <p style="margin: 0 0 16px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      The Approach
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          <strong>Semantic search layer:</strong> Implemented AI-powered search across all document repositories. Attorneys describe what they need in plain language; the system finds relevant documents based on meaning, not just keywords.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          <strong>Automated categorization:</strong> AI automatically tagged documents by practice area, matter type, client industry, and document type - without requiring anyone to go back and organize years of files.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          <strong>On-premise deployment:</strong> The entire system runs within the firm's infrastructure. Client data never leaves their control - critical for maintaining confidentiality obligations.
                        </td>
                      </tr>
                    </table>

                    <!-- The Results -->
                    <p style="margin: 0 0 16px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      The Results
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      After six months of use, the firm measured the impact. Associates recovered an average of <strong>3 billable hours per week</strong> that had previously been spent on internal searches. Just as importantly, work quality improved because attorneys were building on the firm's best prior work rather than starting from scratch. The managing partner estimated the system paid for itself within the first quarter.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Key Insight -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; font-style: italic;">
                      "The AI did not create new knowledge - it unlocked what was already there. That is the part people often miss. Your firm's decades of work product is a competitive asset, if you can access it."
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Sound familiar?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If the challenges here resonate with what your firm is experiencing, we would be glad to discuss what a similar approach might look like for your situation. Every firm is different, but the underlying patterns are often similar.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Discuss Your Situation
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

  const textBody = `Hi ${firstName},

We wanted to share a story that illustrates what we discussed in the guide. This is a real engagement - details adjusted to protect confidentiality.

---

CASE STUDY: KNOWLEDGE THAT PAYS FOR ITSELF

THE FIRM
A 40-attorney firm with three practice areas: commercial litigation, corporate transactions, and employment law. In business for 25+ years, with substantial work product accumulated across network drives, a document management system, and partner email archives.

THE CHALLENGE
Associates routinely spent hours searching for relevant precedents. The firm's document management system search was keyword-based and returned hundreds of results for any general query. Partners knew the work existed somewhere but could not point people to it efficiently. When senior partners retired, their institutional knowledge effectively disappeared.

THE APPROACH
- Semantic search layer: Implemented AI-powered search across all document repositories. Attorneys describe what they need in plain language; the system finds relevant documents based on meaning, not just keywords.
- Automated categorization: AI automatically tagged documents by practice area, matter type, client industry, and document type - without requiring anyone to go back and organize years of files.
- On-premise deployment: The entire system runs within the firm's infrastructure. Client data never leaves their control - critical for maintaining confidentiality obligations.

THE RESULTS
After six months of use, the firm measured the impact. Associates recovered an average of 3 billable hours per week that had previously been spent on internal searches. Just as importantly, work quality improved because attorneys were building on the firm's best prior work rather than starting from scratch. The managing partner estimated the system paid for itself within the first quarter.

---

"The AI did not create new knowledge - it unlocked what was already there. That is the part people often miss. Your firm's decades of work product is a competitive asset, if you can access it."

---

Sound familiar?

If the challenges here resonate with what your firm is experiencing, we would be glad to discuss what a similar approach might look like for your situation. Every firm is different, but the underlying patterns are often similar.

Schedule a discussion: ${calendarUrl}

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
