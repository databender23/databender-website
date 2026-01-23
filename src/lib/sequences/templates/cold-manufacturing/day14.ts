/**
 * Day 14 Cold Manufacturing Email Template
 *
 * Closing the loop - graceful close, door open
 * Plain-text style for better deliverability
 */

export interface ColdManufacturingParams {
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
 * Generate Day 14 cold manufacturing email template
 */
export function getDay14ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>I've sent a few notes about operational visibility and haven't heard back, so I'll assume the timing isn't right.</p>

  <p>I'll keep you on my radar for relevant insights about how other manufacturers are getting more from their data.</p>

  <p>If anything changes or you'd like to explore this later, my inbox is always open.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

I've sent a few notes about operational visibility and haven't heard back, so I'll assume the timing isn't right.

I'll keep you on my radar for relevant insights about how other manufacturers are getting more from their data.

If anything changes or you'd like to explore this later, my inbox is always open.

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
