/**
 * Day 0 Cold CRE Email Template
 *
 * Initial outreach about portfolio intelligence
 * Plain-text style for better deliverability
 */

export interface ColdCREParams {
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
 * Generate Day 0 cold CRE email template
 */
export function getDay0ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Can you see performance across your entire portfolio in one view? Or does pulling that together mean manual work across accounting, lease files, and property systems?</p>

  <p>The economics of custom portfolio analytics have shifted. What used to cost $200K+ can now be done for $30K-$75K in weeks. You own the result. No per-seat fees.</p>

  <p>Property managers with growing portfolios don't need more spreadsheets. They need unified visibility that doesn't require enterprise budgets to build.</p>

  <p>Worth a quick call to see if this is relevant for ${company}?</p>

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

Can you see performance across your entire portfolio in one view? Or does pulling that together mean manual work across accounting, lease files, and property systems?

The economics of custom portfolio analytics have shifted. What used to cost $200K+ can now be done for $30K-$75K in weeks. You own the result. No per-seat fees.

Property managers with growing portfolios don't need more spreadsheets. They need unified visibility that doesn't require enterprise budgets to build.

Worth a quick call to see if this is relevant for ${company}?

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
