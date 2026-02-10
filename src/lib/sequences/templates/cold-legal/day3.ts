/**
 * Day 3 Cold Legal Email Template
 *
 * Follow-up with specific outcomes: less fragmentation, better win rates
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
 * Generate Day 3 cold legal email template
 */
export function getDay3ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
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

  <p>Following up on my note about associate productivity.</p>

  <p>Here's what firms are getting right now: a single system that connects their DMS, billing, and matter management. New matter comes in, relevant past work shows up automatically. No toggling between five systems. No asking around the office hoping someone remembers.</p>

  <p>The result? Associates spend time on legal work, not searching. Pitches include real data on past wins (firms report 31% better win rates when they can). And when a senior partner leaves, the institutional knowledge doesn't walk out the door.</p>

  <p>These purpose-built systems cost a fraction of what SaaS platforms charge. And you own them outright. No per-seat fees eating into margins.</p>

  <p>Worth 15 minutes to see if this applies to ${company}?</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

Following up on my note about associate productivity.

Here's what firms are getting right now: a single system that connects their DMS, billing, and matter management. New matter comes in, relevant past work shows up automatically. No toggling between five systems. No asking around the office hoping someone remembers.

The result? Associates spend time on legal work, not searching. Pitches include real data on past wins (firms report 31% better win rates when they can). And when a senior partner leaves, the institutional knowledge doesn't walk out the door.

These purpose-built systems cost a fraction of what SaaS platforms charge. And you own them outright. No per-seat fees eating into margins.

Worth 15 minutes to see if this applies to ${company}?

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
