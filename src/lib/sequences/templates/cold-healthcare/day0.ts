/**
 * Day 0 Cold Healthcare Email Template
 *
 * Hook with outcome: margin visibility by location, catch issues before board meetings
 * Plain-text style for better deliverability
 */

export interface ColdHealthcareParams {
  firstName: string;
  company: string;
  unsubscribeUrl: string;
}

export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody: string;
}

/**
 * Generate Day 0 cold healthcare email template
 */
export function getDay0ColdHealthcareTemplate(params: ColdHealthcareParams): EmailTemplate {
  const { firstName, company, unsubscribeUrl } = params;

  const subject = `quick question about ${company}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
  <p>Hi ${firstName},</p>

  <p>Quick question: can you see true profitability by location and provider right now? Or just revenue?</p>

  <p>Growing healthcare groups tell me the same thing. They know some locations are underwater, but they can't prove it until someone spends a week pulling data together. By then, the board meeting is over and the conversation moves on.</p>

  <p>Groups your size are solving this by building one view across all their PM systems, billing, and scheduling. Real margin visibility. Location-level P&L that updates automatically. No more paying for bloated software that gives you 100 features when you need 10.</p>

  <p>Is this something ${company} has already figured out?</p>

  <p>--<br>
  Grant Bender<br>
  Databender Consulting<br>
  databender.co</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Quick question: can you see true profitability by location and provider right now? Or just revenue?

Growing healthcare groups tell me the same thing. They know some locations are underwater, but they can't prove it until someone spends a week pulling data together. By then, the board meeting is over and the conversation moves on.

Groups your size are solving this by building one view across all their PM systems, billing, and scheduling. Real margin visibility. Location-level P&L that updates automatically. No more paying for bloated software that gives you 100 features when you need 10.

Is this something ${company} has already figured out?

--
Grant Bender
Databender Consulting
databender.co

---
Unsubscribe: ${unsubscribeUrl}
  `;

  return {
    subject,
    htmlBody,
    textBody,
  };
}
