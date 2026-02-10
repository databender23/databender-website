/**
 * Day 3 Cold Manufacturing Email Template
 *
 * Follow-up: plant managers get 10+ hours/week back, support 20% more volume
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
 * Generate Day 3 cold manufacturing email template
 */
export function getDay3ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>Following up on my note about operational visibility.</p>

  <p>Here's something that surprises most plant managers: they're spending 10+ hours a week just assembling reports. Pulling from the ERP, the MES, quality logs, Excel files. That's a quarter of their week gone before they do anything with the data.</p>

  <p>What if that reporting happened automatically? Your plant managers get that time back and spend it on what they're actually good at: improving operations. Manufacturers tell me they can support 20% more volume without adding headcount once the data stops being a bottleneck.</p>

  <p>No ERP overhaul needed. You connect what you already have. You own the result. No ongoing licensing fees.</p>

  <p>Would a 15-minute call be useful to explore whether this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on my note about operational visibility.

Here's something that surprises most plant managers: they're spending 10+ hours a week just assembling reports. Pulling from the ERP, the MES, quality logs, Excel files. That's a quarter of their week gone before they do anything with the data.

What if that reporting happened automatically? Your plant managers get that time back and spend it on what they're actually good at: improving operations. Manufacturers tell me they can support 20% more volume without adding headcount once the data stops being a bottleneck.

No ERP overhaul needed. You connect what you already have. You own the result. No ongoing licensing fees.

Would a 15-minute call be useful to explore whether this applies to ${company}?

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
