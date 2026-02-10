/**
 * Day 0 Cold Manufacturing Email Template
 *
 * Initial outreach: answer "where's my order?" in 30 seconds, support more volume without adding headcount
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
 * Generate Day 0 cold manufacturing email template
 */
export function getDay0ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>When a customer calls and asks "where's my order?", how long does it take your team to answer? At most manufacturers your size, it's a scavenger hunt across the ERP, shop floor, and shipping.</p>

  <p>What if that answer took 30 seconds? One screen, real-time, across every system you already run.</p>

  <p>Manufacturers are getting there now without ripping out their ERP or buying another platform they'll use 10% of. Purpose-built systems that connect what you already have. You own the result, no ongoing licensing fees. And the cost is a fraction of what this kind of work ran even two years ago.</p>

  <p>Is this something ${company} is dealing with, or have you already solved it?</p>

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

When a customer calls and asks "where's my order?", how long does it take your team to answer? At most manufacturers your size, it's a scavenger hunt across the ERP, shop floor, and shipping.

What if that answer took 30 seconds? One screen, real-time, across every system you already run.

Manufacturers are getting there now without ripping out their ERP or buying another platform they'll use 10% of. Purpose-built systems that connect what you already have. You own the result, no ongoing licensing fees. And the cost is a fraction of what this kind of work ran even two years ago.

Is this something ${company} is dealing with, or have you already solved it?

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
