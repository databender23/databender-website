/**
 * Day 0 Cold Healthcare Email Template
 *
 * Hook with pain point + economics shift
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

  <p>Quick question: do you have visibility into profitability by location and provider, or just revenue?</p>

  <p>The economics of custom healthcare analytics have completely changed. What used to cost $200K+ and take a year can now be built in weeks for $30K-$75K. You own the result. No per-seat fees eating into your margins.</p>

  <p>Most groups I talk to are still paying Dental Intel or Jarvis pricing for 70% of the functionality they actually need. Purpose-built solutions are now cheaper and faster than configuring off-the-shelf.</p>

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

Quick question: do you have visibility into profitability by location and provider, or just revenue?

The economics of custom healthcare analytics have completely changed. What used to cost $200K+ and take a year can now be built in weeks for $30K-$75K. You own the result. No per-seat fees eating into your margins.

Most groups I talk to are still paying Dental Intel or Jarvis pricing for 70% of the functionality they actually need. Purpose-built solutions are now cheaper and faster than configuring off-the-shelf.

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
