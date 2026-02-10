/**
 * Day 3 Cold CRE Email Template
 *
 * Follow-up: investor reporting in minutes, lease terms extracted automatically
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
 * Generate Day 3 cold CRE email template
 */
export function getDay3ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Following up on portfolio visibility.</p>

  <p>How long does your team spend on investor reporting? One portfolio manager was burning 3 days per quarter pulling numbers from Yardi, lease PDFs, and Excel trackers. Now they generate those reports in 15 minutes. Same data, same accuracy, but the system pulls from every source automatically.</p>

  <p>The other thing that changed: lease terms get extracted from PDFs automatically. Rent escalations, renewal dates, CAM caps. No more missing a $40K/year escalation buried in a 90-page lease. The system catches it.</p>

  <p>One-time cost, you own the result. No per-seat fees or vendor lock-in.</p>

  <p>Would 15 minutes be useful to see if this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on portfolio visibility.

How long does your team spend on investor reporting? One portfolio manager was burning 3 days per quarter pulling numbers from Yardi, lease PDFs, and Excel trackers. Now they generate those reports in 15 minutes. Same data, same accuracy, but the system pulls from every source automatically.

The other thing that changed: lease terms get extracted from PDFs automatically. Rent escalations, renewal dates, CAM caps. No more missing a $40K/year escalation buried in a 90-page lease. The system catches it.

One-time cost, you own the result. No per-seat fees or vendor lock-in.

Would 15 minutes be useful to see if this applies to ${company}?

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
