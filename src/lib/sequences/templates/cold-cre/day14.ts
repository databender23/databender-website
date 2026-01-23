/**
 * Day 14 Cold CRE Email Template
 *
 * Closing the loop - graceful close, door open
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
 * Generate Day 14 cold CRE email template
 */
export function getDay14ColdCRETemplate(params: ColdCREParams): EmailTemplate {
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

  <p>Sent a few notes about portfolio analytics. Haven't heard back, so timing probably isn't right.</p>

  <p>The short version if it's ever useful: custom portfolio visibility that used to cost $200K+ now runs $30K-$75K. Weeks, not months. You own the result.</p>

  <p>If priorities shift or this becomes relevant, the door's open.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Sent a few notes about portfolio analytics. Haven't heard back, so timing probably isn't right.

The short version if it's ever useful: custom portfolio visibility that used to cost $200K+ now runs $30K-$75K. Weeks, not months. You own the result.

If priorities shift or this becomes relevant, the door's open.

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
