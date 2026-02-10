/**
 * Day 7 Cold CRE Email Template
 *
 * Case study: 25-property manager catches $40K missed escalation, generates reports on demand
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

  <p>One more note on this.</p>

  <p>A 25-property manager had the same problem most growing portfolios have: data in Yardi, lease terms in PDFs, supplemental tracking in Excel. Nobody could see portfolio-wide performance without spending days assembling it.</p>

  <p>Here's what they can do now: generate investor reports on demand. See performance across all 25 properties in one view. Lease terms get extracted from PDFs automatically, so nothing gets buried. The system took 6 weeks to build. They own it outright.</p>

  <p>The payoff that got everyone's attention? They caught a $40K/year rent escalation that had been missed. ROI in the first quarter. Total project cost was under $50K.</p>

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

One more note on this.

A 25-property manager had the same problem most growing portfolios have: data in Yardi, lease terms in PDFs, supplemental tracking in Excel. Nobody could see portfolio-wide performance without spending days assembling it.

Here's what they can do now: generate investor reports on demand. See performance across all 25 properties in one view. Lease terms get extracted from PDFs automatically, so nothing gets buried. The system took 6 weeks to build. They own it outright.

The payoff that got everyone's attention? They caught a $40K/year rent escalation that had been missed. ROI in the first quarter. Total project cost was under $50K.

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
