/**
 * Day 3 Cold Legal Email Template
 *
 * Follow-up on first email - associate time spent searching
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
 * Generate Day 3 cold legal email template
 */
export function getDay3ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
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

  <p>Following up on my note about knowledge retention.</p>

  <p>One pattern I see with growing firms: associates spend 15-20% of their time searching for precedent documents and past work product. That's essentially one day per week lost to inefficiency.</p>

  <p>The firms solving this aren't buying expensive "AI platforms." They're building lightweight systems that surface relevant context automatically when matters come in.</p>

  <p>Would a 15-minute call be useful to explore whether this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on my note about knowledge retention.

One pattern I see with growing firms: associates spend 15-20% of their time searching for precedent documents and past work product. That's essentially one day per week lost to inefficiency.

The firms solving this aren't buying expensive "AI platforms." They're building lightweight systems that surface relevant context automatically when matters come in.

Would a 15-minute call be useful to explore whether this applies to ${company}?

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
