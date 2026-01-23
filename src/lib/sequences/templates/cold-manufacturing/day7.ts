/**
 * Day 7 Cold Manufacturing Email Template
 *
 * Case study proof - unified operations dashboard
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
 * Generate Day 7 cold manufacturing email template
 */
export function getDay7ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>One more thought on the operational visibility topic.</p>

  <p>We recently helped a $45M manufacturer connect their ERP, MES, and quality systems into a unified operations dashboard. What used to take 2 days to compile for leadership reviews now updates automatically. Built in 6 weeks. One-time cost of $52K. They own it outright.</p>

  <p>The bigger win: they caught a quality issue within hours instead of weeks. Avoided a $200K+ recall.</p>

  <p>That's what happens when you build first, not configure. No wrestling with off-the-shelf limitations. No ongoing licensing fees eating into the ROI.</p>

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

One more thought on the operational visibility topic.

We recently helped a $45M manufacturer connect their ERP, MES, and quality systems into a unified operations dashboard. What used to take 2 days to compile for leadership reviews now updates automatically. Built in 6 weeks. One-time cost of $52K. They own it outright.

The bigger win: they caught a quality issue within hours instead of weeks. Avoided a $200K+ recall.

That's what happens when you build first, not configure. No wrestling with off-the-shelf limitations. No ongoing licensing fees eating into the ROI.

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
