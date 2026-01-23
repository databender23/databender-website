/**
 * Day 7 Cold Healthcare Email Template
 *
 * Case study/social proof - PE-backed group operational analytics
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

  <p>One more note on the analytics economics, then I'll leave you alone.</p>

  <p>We recently built a unified platform for a 15-location healthcare group. Connected their three different PM systems, billing, and scheduling into one view. Six weeks from start to real-time P&L by location and provider. Total cost was under $50K. They own everything.</p>

  <p>The old way? They'd priced it out at $180K with an 8-month timeline from a traditional vendor. Plus ongoing licensing.</p>

  <p>They caught two underwater locations in the first month. Turned them around before the next board meeting.</p>

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

One more note on the analytics economics, then I'll leave you alone.

We recently built a unified platform for a 15-location healthcare group. Connected their three different PM systems, billing, and scheduling into one view. Six weeks from start to real-time P&L by location and provider. Total cost was under $50K. They own everything.

The old way? They'd priced it out at $180K with an 8-month timeline from a traditional vendor. Plus ongoing licensing.

They caught two underwater locations in the first month. Turned them around before the next board meeting.

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
