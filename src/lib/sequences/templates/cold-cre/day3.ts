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

  <p>Following up on portfolio visibility.</p>

  <p>How long does it take to pull together investor reporting? One portfolio manager we work with spent 3 days per quarter on that before we built them a system that does it in 15 minutes. One-time cost, they own it, and it pulls from all their data sources automatically.</p>

  <p>The shift here: AI has made senior talent 3-5x more productive. So custom solutions that fit your exact workflow are now cheaper and faster than wrestling with expensive off-the-shelf software that only gets you 70% of the way there.</p>

  <p>Would 15 minutes be useful to see if this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on portfolio visibility.

How long does it take to pull together investor reporting? One portfolio manager we work with spent 3 days per quarter on that before we built them a system that does it in 15 minutes. One-time cost, they own it, and it pulls from all their data sources automatically.

The shift here: AI has made senior talent 3-5x more productive. So custom solutions that fit your exact workflow are now cheaper and faster than wrestling with expensive off-the-shelf software that only gets you 70% of the way there.

Would 15 minutes be useful to see if this applies to ${company}?

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
