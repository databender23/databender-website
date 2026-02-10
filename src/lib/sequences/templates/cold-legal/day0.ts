/**
 * Day 0 Cold Legal Email Template
 *
 * Hook with outcome: associates find precedent in minutes, not hours
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

  <p>What if your associates could find relevant precedent in minutes instead of hours? At most mid-sized firms, they're spending a full day per week searching for work that partners already solved. That's billable time evaporating.</p>

  <p>Firms like yours are building internal search systems that surface past work the moment a new matter comes in. Associates bill more. Partners stop re-answering the same questions. The knowledge stays in the firm, even when people leave.</p>

  <p>These systems cost a fraction of what they did two years ago, and you own the result outright. No per-seat licensing.</p>

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

What if your associates could find relevant precedent in minutes instead of hours? At most mid-sized firms, they're spending a full day per week searching for work that partners already solved. That's billable time evaporating.

Firms like yours are building internal search systems that surface past work the moment a new matter comes in. Associates bill more. Partners stop re-answering the same questions. The knowledge stays in the firm, even when people leave.

These systems cost a fraction of what they did two years ago, and you own the result outright. No per-seat licensing.

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
