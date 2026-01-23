/**
 * Day 3 Cold Healthcare Email Template
 *
 * Follow up with specific stat/proof - data integration challenge
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
 * Generate Day 3 cold healthcare email template
 */
export function getDay3ColdHealthcareTemplate(params: ColdHealthcareParams): EmailTemplate {
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

  <p>Following up on my note about analytics economics.</p>

  <p>Here's what I see with growing healthcare groups: every acquisition brings a different PM system. Eaglesoft here, Dentrix there, maybe Open Dental at the newest location. The data exists, but pulling it together for a board deck takes weeks of manual work.</p>

  <p>One senior consultant with the right AI tools can now build unified analytics across all those systems in 4-6 weeks. HIPAA-compliant from day one. Real-time visibility by location, provider, and payer. And you own the whole thing.</p>

  <p>Worth a 15-minute call to see if this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on my note about analytics economics.

Here's what I see with growing healthcare groups: every acquisition brings a different PM system. Eaglesoft here, Dentrix there, maybe Open Dental at the newest location. The data exists, but pulling it together for a board deck takes weeks of manual work.

One senior consultant with the right AI tools can now build unified analytics across all those systems in 4-6 weeks. HIPAA-compliant from day one. Real-time visibility by location, provider, and payer. And you own the whole thing.

Worth a 15-minute call to see if this applies to ${company}?

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
