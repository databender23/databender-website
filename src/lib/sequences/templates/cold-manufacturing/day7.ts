/**
 * Day 7 Cold Manufacturing Email Template
 *
 * Case study: $45M manufacturer catches quality issue in hours, avoids $200K recall
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
 * Generate Day 7 cold manufacturing email template
 */
export function getDay7ColdManufacturingTemplate(params: ColdManufacturingParams): EmailTemplate {
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

  <p>One more thought on this.</p>

  <p>A $45M manufacturer was in a familiar spot: leadership reviews took two days to prepare because nobody could see production, quality, and shipping in one place. Their best people were assembling data instead of acting on it.</p>

  <p>Now their ops dashboard updates in real time. Leadership reviews start with answers, not questions. But the real payoff? They caught a quality issue in hours instead of weeks. Avoided a $200K+ recall. That one catch more than paid for the entire project.</p>

  <p>The system took 6 weeks to build at a one-time cost of $52K. They own it outright. No licensing, no vendor lock-in.</p>

  <p>If you're curious what that could look like for ${company}, happy to share specifics.</p>

  <p>--<br>
  Grant</p>

  <p style="margin-top: 40px; font-size: 11px; color: #999;">
    <a href="${unsubscribeUrl}" style="color: #999; text-decoration: underline;">Unsubscribe</a>
  </p>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

One more thought on this.

A $45M manufacturer was in a familiar spot: leadership reviews took two days to prepare because nobody could see production, quality, and shipping in one place. Their best people were assembling data instead of acting on it.

Now their ops dashboard updates in real time. Leadership reviews start with answers, not questions. But the real payoff? They caught a quality issue in hours instead of weeks. Avoided a $200K+ recall. That one catch more than paid for the entire project.

The system took 6 weeks to build at a one-time cost of $52K. They own it outright. No licensing, no vendor lock-in.

If you're curious what that could look like for ${company}, happy to share specifics.

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
