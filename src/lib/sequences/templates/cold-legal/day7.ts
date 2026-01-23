/**
 * Day 7 Cold Legal Email Template
 *
 * Case study proof - Firm Intelligence Platform
 * Plain-text style for better deliverability
 */

export interface ColdLegalParams {
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
 * Generate Day 7 cold legal email template
 */
export function getDay7ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
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

  <p>Last follow-up on the knowledge retention topic.</p>

  <p>We recently helped a 40-attorney firm build what they call their "Firm Intelligence Platform." It connects their DMS, billing, and matter management to surface relevant past work automatically.</p>

  <p>The result: associates find relevant precedent 70% faster, and partners no longer worry about losing client history when people leave.</p>

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

Last follow-up on the knowledge retention topic.

We recently helped a 40-attorney firm build what they call their "Firm Intelligence Platform." It connects their DMS, billing, and matter management to surface relevant past work automatically.

The result: associates find relevant precedent 70% faster, and partners no longer worry about losing client history when people leave.

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
