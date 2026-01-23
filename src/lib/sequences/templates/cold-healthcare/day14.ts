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

  <p>The short version of what we do: custom healthcare analytics at a fraction of what it used to cost. Weeks instead of months. You own it, no per-seat fees.</p>

  <p>If that ever becomes relevant, just reply to this thread. Happy to pick it up whenever.</p>

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

The short version of what we do: custom healthcare analytics at a fraction of what it used to cost. Weeks instead of months. You own it, no per-seat fees.

If that ever becomes relevant, just reply to this thread. Happy to pick it up whenever.

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
