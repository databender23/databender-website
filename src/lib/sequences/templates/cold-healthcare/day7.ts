/**
 * Day 7 Cold Healthcare Email Template
 *
 * Case study: 15-location group catches underwater locations before board meeting
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

  <p>One more note on this, then I'll leave you alone.</p>

  <p>A 15-location healthcare group was in the same spot most growing groups are. Three different PM systems from acquisitions, no unified view, and leadership flying blind on which locations were actually profitable.</p>

  <p>Six weeks later, they had real-time P&L by location and provider. Their ops team spotted two underwater locations in the first month and turned them around before the next board meeting. Their PE investors got the visibility they'd been asking for.</p>

  <p>Total cost was under $50K. They own the whole system. A traditional vendor had quoted them $180K with an 8-month timeline, plus ongoing licensing.</p>

  <p>If you're curious what this could look like for ${company}, happy to share specifics.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

One more note on this, then I'll leave you alone.

A 15-location healthcare group was in the same spot most growing groups are. Three different PM systems from acquisitions, no unified view, and leadership flying blind on which locations were actually profitable.

Six weeks later, they had real-time P&L by location and provider. Their ops team spotted two underwater locations in the first month and turned them around before the next board meeting. Their PE investors got the visibility they'd been asking for.

Total cost was under $50K. They own the whole system. A traditional vendor had quoted them $180K with an 8-month timeline, plus ongoing licensing.

If you're curious what this could look like for ${company}, happy to share specifics.

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
