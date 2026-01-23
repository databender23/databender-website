/**
 * Day 7 Cold Legal Email Template
 *
 * Case study/social proof with ownership differentiator
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

  <p>We recently helped a 40-attorney firm build what they call their "Firm Intelligence Platform." Connects their DMS, billing, and matter management. When a new matter comes in, relevant past work surfaces automatically. Associates find precedent 70% faster.</p>

  <p>The project took 8 weeks. They own the code. No subscription. When a partner retires next year, that institutional knowledge stays in the system.</p>

  <p>This kind of work used to cost $200K and take 6+ months. We delivered it for a fraction of that because one senior consultant with AI can now do what used to require a team.</p>

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

We recently helped a 40-attorney firm build what they call their "Firm Intelligence Platform." Connects their DMS, billing, and matter management. When a new matter comes in, relevant past work surfaces automatically. Associates find precedent 70% faster.

The project took 8 weeks. They own the code. No subscription. When a partner retires next year, that institutional knowledge stays in the system.

This kind of work used to cost $200K and take 6+ months. We delivered it for a fraction of that because one senior consultant with AI can now do what used to require a team.

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
