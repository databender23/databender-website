/**
 * Day 3 Cold CRE Email Template
 *
 * Follow-up on first email - lease intelligence and expiration tracking
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
 * Generate Day 3 cold CRE email template
 */
export function getDay3ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Following up on my note about portfolio intelligence.</p>

  <p>One pattern I see with growing portfolios: lease expirations sneak up on teams because the data is buried in PDFs. By the time someone notices, the negotiation window has shrunk and leverage is lost.</p>

  <p>The firms staying ahead are using automated systems that extract key lease terms and surface renewal timelines automatically.</p>

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

Following up on my note about portfolio intelligence.

One pattern I see with growing portfolios: lease expirations sneak up on teams because the data is buried in PDFs. By the time someone notices, the negotiation window has shrunk and leverage is lost.

The firms staying ahead are using automated systems that extract key lease terms and surface renewal timelines automatically.

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
