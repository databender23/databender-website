/**
 * Day 0 Cold Legal Email Template
 *
 * Initial outreach about knowledge retention/institutional memory
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
 * Generate Day 0 cold legal email template
 */
export function getDay0ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
  const { firstName, company, unsubscribeUrl } = params;

  const subject = `quick question about ${company}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
  <p>Hi ${firstName},</p>

  <p>When a partner leaves a firm like ${company}, they take decades of client knowledge with them. The associates scrambling to fill the gap often spend weeks recreating context that should have been preserved.</p>

  <p>Most mid-sized firms I talk to don't realize how much institutional knowledge lives only in people's heads until it's too late.</p>

  <p>Is this something you've thought about, or has it already happened?</p>

  <p>--<br>
  Grant Bender<br>
  Databender Consulting<br>
  databender.co</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

When a partner leaves a firm like ${company}, they take decades of client knowledge with them. The associates scrambling to fill the gap often spend weeks recreating context that should have been preserved.

Most mid-sized firms I talk to don't realize how much institutional knowledge lives only in people's heads until it's too late.

Is this something you've thought about, or has it already happened?

--
Grant Bender
Databender Consulting
databender.co

---
Unsubscribe: ${unsubscribeUrl}
  `;

  return {
    subject,
    htmlBody,
    textBody,
  };
}
