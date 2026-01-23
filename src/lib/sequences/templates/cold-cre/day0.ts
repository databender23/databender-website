/**
 * Day 0 Cold CRE Email Template
 *
 * Initial outreach about portfolio intelligence
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
 * Generate Day 0 cold CRE email template
 */
export function getDay0ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Most property managers I talk to with 10+ properties hit the same wall: portfolio data lives in accounting, lease terms in PDFs, and tenant info in a different system. Getting a real-time picture of portfolio health means someone manually assembling spreadsheets.</p>

  <p>By the time investor reports are ready, the data is already stale.</p>

  <p>Is this something ${company} has solved, or is it still a challenge?</p>

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

Most property managers I talk to with 10+ properties hit the same wall: portfolio data lives in accounting, lease terms in PDFs, and tenant info in a different system. Getting a real-time picture of portfolio health means someone manually assembling spreadsheets.

By the time investor reports are ready, the data is already stale.

Is this something ${company} has solved, or is it still a challenge?

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
