/**
 * Day 3 Cold Healthcare Email Template
 *
 * Follow-up: ops team stops chasing data and starts improving operations
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

  <p>Following up on my note about margin visibility.</p>

  <p>Here's what growing groups deal with: every acquisition brings a different PM system. Eaglesoft here, Dentrix there, maybe Open Dental at the newest location. Your ops team spends more time chasing data than improving operations. Board decks take weeks of manual assembly.</p>

  <p>Imagine your team opening one dashboard and seeing real-time P&L by location, provider, and payer. Across all systems. HIPAA-compliant from day one. They stop assembling spreadsheets and start spotting the locations that need attention.</p>

  <p>That takes 4 to 6 weeks to build. You own it. No subscriptions.</p>

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

Following up on my note about margin visibility.

Here's what growing groups deal with: every acquisition brings a different PM system. Eaglesoft here, Dentrix there, maybe Open Dental at the newest location. Your ops team spends more time chasing data than improving operations. Board decks take weeks of manual assembly.

Imagine your team opening one dashboard and seeing real-time P&L by location, provider, and payer. Across all systems. HIPAA-compliant from day one. They stop assembling spreadsheets and start spotting the locations that need attention.

That takes 4 to 6 weeks to build. You own it. No subscriptions.

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
