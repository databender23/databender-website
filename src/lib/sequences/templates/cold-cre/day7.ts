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

  <p>One more note on portfolio analytics.</p>

  <p>A 25-property manager we worked with had data scattered across Yardi, lease PDFs, and Excel trackers. They couldn't see portfolio-wide performance without someone spending days pulling it together. Sound familiar?</p>

  <p>We built them a purpose-built system in 6 weeks. Connects to their accounting, extracts lease terms automatically, generates investor reports on demand. Total cost was under $50K. They own it outright.</p>

  <p>The kicker: they caught a $40K/year rent escalation that had been missed. ROI in the first quarter.</p>

  <p>If you're curious what something like this could look like for ${company}, happy to share specifics.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

One more note on portfolio analytics.

A 25-property manager we worked with had data scattered across Yardi, lease PDFs, and Excel trackers. They couldn't see portfolio-wide performance without someone spending days pulling it together. Sound familiar?

We built them a purpose-built system in 6 weeks. Connects to their accounting, extracts lease terms automatically, generates investor reports on demand. Total cost was under $50K. They own it outright.

The kicker: they caught a $40K/year rent escalation that had been missed. ROI in the first quarter.

If you're curious what something like this could look like for ${company}, happy to share specifics.

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
