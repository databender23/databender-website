/**
 * Day 3 Cold Legal Email Template
 *
 * Follow-up with specific stat/proof on the economics shift
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

  <p>Following up on my note about the economics shift in legal tech.</p>

  <p>Here's what's changed: AI has made senior talent 3-5x more productive. One experienced consultant now delivers what used to require a team of five. The cost savings flow directly to you.</p>

  <p>The firms getting ahead aren't buying another SaaS platform. They're building purpose-built systems that fit their workflow. No configuration headaches. No per-seat fees eating into margins.</p>

  <p>How many different systems do your people touch in a typical matter? That fragmentation is solvable now. It wasn't two years ago.</p>

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

Following up on my note about the economics shift in legal tech.

Here's what's changed: AI has made senior talent 3-5x more productive. One experienced consultant now delivers what used to require a team of five. The cost savings flow directly to you.

The firms getting ahead aren't buying another SaaS platform. They're building purpose-built systems that fit their workflow. No configuration headaches. No per-seat fees eating into margins.

How many different systems do your people touch in a typical matter? That fragmentation is solvable now. It wasn't two years ago.

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
