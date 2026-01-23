/**
 * Day 0 Cold Healthcare Email Template
 *
 * Initial outreach about operational analytics and margin visibility
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

  <p>Most healthcare groups I talk to struggle with the same challenge: they can't see per-location profitability without weeks of manual spreadsheet work. The data exists, but it's scattered across billing, scheduling, and practice management systems.</p>

  <p>By the time leadership gets margin visibility, the problems are already months old.</p>

  <p>Is this something ${company} has solved, or is it still a challenge?</p>

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

Most healthcare groups I talk to struggle with the same challenge: they can't see per-location profitability without weeks of manual spreadsheet work. The data exists, but it's scattered across billing, scheduling, and practice management systems.

By the time leadership gets margin visibility, the problems are already months old.

Is this something ${company} has solved, or is it still a challenge?

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
