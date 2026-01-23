/**
 * Day 7 Cold Healthcare Email Template
 *
 * Case study proof - PE-backed group operational analytics
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
 * Generate Day 7 cold healthcare email template
 */
export function getDay7ColdHealthcareTemplate(params: ColdHealthcareParams): EmailTemplate {
  const { firstName, company, unsubscribeUrl } = params;

  const subject = `Re: quick question about ${company}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
  <p>Hi ${firstName},</p>

  <p>Last follow-up on the margin visibility topic.</p>

  <p>We recently helped a 15-location healthcare group build a unified analytics platform that connects their PM, billing, and scheduling systems. They went from quarterly manual reporting to real-time per-location P&L visibility.</p>

  <p>The result: they identified two underperforming locations in the first month and turned them around before the next board meeting.</p>

  <p>If you're curious what that could look like for ${company}, happy to share specifics.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Last follow-up on the margin visibility topic.

We recently helped a 15-location healthcare group build a unified analytics platform that connects their PM, billing, and scheduling systems. They went from quarterly manual reporting to real-time per-location P&L visibility.

The result: they identified two underperforming locations in the first month and turned them around before the next board meeting.

If you're curious what that could look like for ${company}, happy to share specifics.

--
Grant

---
Unsubscribe: ${unsubscribeUrl}
  `;

  return {
    subject,
    htmlBody,
    textBody,
  };
}
