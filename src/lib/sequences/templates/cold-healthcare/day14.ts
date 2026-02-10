/**
 * Day 14 Cold Healthcare Email Template
 *
 * Graceful close, door open
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
 * Generate Day 14 cold healthcare email template
 */
export function getDay14ColdHealthcareTemplate(params: ColdHealthcareParams): EmailTemplate {
  const { firstName, unsubscribeUrl } = params;

  const subject = "closing the loop";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a;">
  <p>Hi ${firstName},</p>

  <p>Haven't heard back, so I'll assume the timing isn't right. No worries.</p>

  <p>If it's ever useful: groups like yours are getting real margin visibility across every location, catching problems before board meetings instead of after, and giving PE investors the reporting they actually want. HIPAA-compliant, no per-seat fees, and you own the result.</p>

  <p>Just reply to this thread whenever it makes sense. Happy to pick it up.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Haven't heard back, so I'll assume the timing isn't right. No worries.

If it's ever useful: groups like yours are getting real margin visibility across every location, catching problems before board meetings instead of after, and giving PE investors the reporting they actually want. HIPAA-compliant, no per-seat fees, and you own the result.

Just reply to this thread whenever it makes sense. Happy to pick it up.

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
