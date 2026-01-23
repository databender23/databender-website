/**
 * Day 0 Cold Legal Email Template
 *
 * Hook with pain point + economics shift
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
 * Generate Day 0 cold legal email template
 */
export function getDay0ColdLegalTemplate(params: ColdLegalParams): EmailTemplate {
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

  <p>How much time do your associates spend searching for precedent that partners already solved? At most mid-sized firms, it's one day per week. Sometimes more.</p>

  <p>Law firms are running on systems built for how work was done 10 years ago. The economics have shifted. Custom solutions that actually fit your workflow are now faster and cheaper than wrestling with off-the-shelf legal tech.</p>

  <p>What used to cost $200K+ can now be done for $30K-$75K in weeks. You own the result. No per-seat licensing.</p>

  <p>Is this something ${company} has looked into?</p>

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

How much time do your associates spend searching for precedent that partners already solved? At most mid-sized firms, it's one day per week. Sometimes more.

Law firms are running on systems built for how work was done 10 years ago. The economics have shifted. Custom solutions that actually fit your workflow are now faster and cheaper than wrestling with off-the-shelf legal tech.

What used to cost $200K+ can now be done for $30K-$75K in weeks. You own the result. No per-seat licensing.

Is this something ${company} has looked into?

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
