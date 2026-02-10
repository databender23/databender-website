/**
 * Day 0 Cold CRE Email Template
 *
 * Initial outreach: portfolio visibility across all properties, investor reporting on demand
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

  <p>Can you see performance across your entire portfolio right now? Or does pulling that together mean someone spending days in accounting, lease files, and property systems?</p>

  <p>Property managers with growing portfolios are building one view that covers every property, regardless of what software each one runs. Investor reports that used to take days now take minutes. Missed rent escalations get caught automatically. And the system belongs to you, not a vendor charging per seat.</p>

  <p>This kind of visibility costs a fraction of what it did two years ago. Weeks to build, not months.</p>

  <p>Worth a quick call to see if this is relevant for ${company}?</p>

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

Can you see performance across your entire portfolio right now? Or does pulling that together mean someone spending days in accounting, lease files, and property systems?

Property managers with growing portfolios are building one view that covers every property, regardless of what software each one runs. Investor reports that used to take days now take minutes. Missed rent escalations get caught automatically. And the system belongs to you, not a vendor charging per seat.

This kind of visibility costs a fraction of what it did two years ago. Weeks to build, not months.

Worth a quick call to see if this is relevant for ${company}?

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
