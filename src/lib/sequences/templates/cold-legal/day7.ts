/**
 * Day 7 Cold Legal Email Template
 *
 * Case study: what a 40-attorney firm achieved with their Firm Intelligence Platform
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
 * Generate Day 7 cold legal email template
 */
export function getDay7ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
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

  <p>A 40-attorney firm recently launched what they call their "Firm Intelligence Platform." Here's what changed for them: associates find precedent 70% faster. New matters automatically surface related past work. Partners stop fielding the same research questions.</p>

  <p>The bigger win? A senior partner is retiring next year. His 30 years of institutional knowledge is already in the system. The firm isn't losing it when he walks out the door.</p>

  <p>The whole project took 8 weeks and cost a fraction of what traditional vendors quoted. The firm owns the code. No subscription, no per-seat fees.</p>

  <p>Curious what this could look like for ${company}? You'd work directly with me, not junior consultants.</p>

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

A 40-attorney firm recently launched what they call their "Firm Intelligence Platform." Here's what changed for them: associates find precedent 70% faster. New matters automatically surface related past work. Partners stop fielding the same research questions.

The bigger win? A senior partner is retiring next year. His 30 years of institutional knowledge is already in the system. The firm isn't losing it when he walks out the door.

The whole project took 8 weeks and cost a fraction of what traditional vendors quoted. The firm owns the code. No subscription, no per-seat fees.

Curious what this could look like for ${company}? You'd work directly with me, not junior consultants.

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
