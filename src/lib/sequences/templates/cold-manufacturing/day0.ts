/**
 * Day 0 Cold Manufacturing Email Template
 *
 * Initial outreach - economics shift + pain point hook
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

  <p>Can you see production efficiency and quality metrics in one view? Or does your team pull from 5 different systems to get the full picture?</p>

  <p>Most manufacturers have operational data that could drive real improvements. But it's trapped in separate systems. Custom integration and automation used to cost a fortune. That's changed.</p>

  <p>The economics of custom software shifted dramatically in the last 18 months. What used to cost $200K+ can now be done for $30K-$75K in weeks. Purpose-built solutions are now affordable enough to actually do something about it.</p>

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

Can you see production efficiency and quality metrics in one view? Or does your team pull from 5 different systems to get the full picture?

Most manufacturers have operational data that could drive real improvements. But it's trapped in separate systems. Custom integration and automation used to cost a fortune. That's changed.

The economics of custom software shifted dramatically in the last 18 months. What used to cost $200K+ can now be done for $30K-$75K in weeks. Purpose-built solutions are now affordable enough to actually do something about it.

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
