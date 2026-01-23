/**
 * Day 0 Cold Manufacturing Email Template
 *
 * Initial outreach about operational visibility
 * Plain-text style for better deliverability
 */

export interface ColdManufacturingParams {
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
 * Generate Day 0 cold manufacturing email template
 */
export function getDay0ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>Most growing manufacturers I talk to have the same challenge: production data lives in one system, quality in another, inventory in a third. Getting a real-time picture of operations means someone manually pulling reports from five different places.</p>

  <p>The companies scaling past $20M usually hit a wall where they can't make fast decisions because the data isn't unified.</p>

  <p>Is this something ${company} is dealing with, or have you already solved it?</p>

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

Most growing manufacturers I talk to have the same challenge: production data lives in one system, quality in another, inventory in a third. Getting a real-time picture of operations means someone manually pulling reports from five different places.

The companies scaling past $20M usually hit a wall where they can't make fast decisions because the data isn't unified.

Is this something ${company} is dealing with, or have you already solved it?

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
