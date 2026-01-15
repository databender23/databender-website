/**
 * Day 0 Assessment Results Email Template
 *
 * Immediate email sent after completing an assessment
 * with personalized results and CTA to schedule a call
 */

export interface Day0AssessmentParams {
  firstName: string;
  company?: string;
  overallScore: number;
  lowestCategory: string;
  highestCategory: string;
  assessmentName: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Generate Day 0 assessment results email template
 */
export function getDay0AssessmentTemplate(params: Day0AssessmentParams): EmailTemplate {
  const {
    firstName,
    company,
    overallScore,
    lowestCategory,
    highestCategory,
    assessmentName,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const companyText = company ? ` at ${company}` : "";
  const scoreColor = overallScore >= 70 ? "#1A9988" : overallScore >= 40 ? "#f59e0b" : "#ef4444";

  const subject = `Your ${assessmentName} Results`;

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
                Your Assessment Results
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
                Thank you for completing the <strong>${assessmentName}</strong>${companyText}. Here's a snapshot of your results:
              </p>

              <!-- Score Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                      Overall Score
                    </p>
                    <p style="margin: 0; color: ${scoreColor}; font-size: 48px; font-weight: 700;">
                      ${overallScore}<span style="font-size: 24px; color: #9ca3af;">/100</span>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Insights -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 16px 20px; background-color: #ecfdf5; border-radius: 8px; border-left: 4px solid #1A9988;">
                    <p style="margin: 0 0 4px; color: #1A9988; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Strongest Area
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">
                      ${highestCategory}
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="padding: 16px 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0 0 4px; color: #b45309; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Biggest Opportunity
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 500;">
                      ${lowestCategory}
                    </p>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Want to discuss your results?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                We'd be happy to walk through your assessment results and share specific recommendations for improving your ${lowestCategory.toLowerCase()} capabilities. No sales pitch, just practical advice.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Call
                    </a>
                  </td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-style: italic;">
                P.S. Have questions about your results? Just reply to this email. We read and respond to every message personally.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Boutique strategy. Enterprise delivery.
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

  const textBody = `Hi ${firstName},

Thank you for completing the ${assessmentName}${companyText}. Here's a snapshot of your results:

OVERALL SCORE: ${overallScore}/100

Strongest Area: ${highestCategory}

Biggest Opportunity: ${lowestCategory}

---

Want to discuss your results?

We'd be happy to walk through your assessment results and share specific recommendations for improving your ${lowestCategory.toLowerCase()} capabilities. No sales pitch, just practical advice.

Schedule a call: ${calendarUrl}

---

P.S. Have questions about your results? Just reply to this email. We read and respond to every message personally.

---
Databender - Boutique strategy. Enterprise delivery.

Unsubscribe: ${unsubscribeUrl}
  `;

  return {
    subject,
    htmlBody,
    textBody,
  };
}
