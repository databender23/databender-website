/**
 * Day 7 Cold CRE Email Template
 *
 * Case study proof - portfolio analytics platform
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
 * Generate Day 7 cold CRE email template
 */
export function getDay7ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Last follow-up on the portfolio intelligence topic.</p>

  <p>We recently helped a 25-property portfolio manager build a unified analytics platform that connects their accounting system, extracts lease terms automatically, and generates investor-ready reports on demand.</p>

  <p>The result: what used to take their team 3 days per quarter now takes 15 minutes. And they caught a $40K/year rent escalation that had been missed.</p>

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

Last follow-up on the portfolio intelligence topic.

We recently helped a 25-property portfolio manager build a unified analytics platform that connects their accounting system, extracts lease terms automatically, and generates investor-ready reports on demand.

The result: what used to take their team 3 days per quarter now takes 15 minutes. And they caught a $40K/year rent escalation that had been missed.

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
