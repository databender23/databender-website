/**
 * Day 3 Cold Manufacturing Email Template
 *
 * Follow-up on first email - hidden costs of manual reporting
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
 * Generate Day 3 cold manufacturing email template
 */
export function getDay3ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>Following up on my note about operational visibility.</p>

  <p>One thing I've noticed: manufacturers often don't realize how much time their best people spend pulling data instead of analyzing it. I've seen plant managers spending 10+ hours a week just assembling reports.</p>

  <p>The fix isn't usually a big ERP overhaul. It's connecting what you already have so the data flows automatically.</p>

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

Following up on my note about operational visibility.

One thing I've noticed: manufacturers often don't realize how much time their best people spend pulling data instead of analyzing it. I've seen plant managers spending 10+ hours a week just assembling reports.

The fix isn't usually a big ERP overhaul. It's connecting what you already have so the data flows automatically.

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
