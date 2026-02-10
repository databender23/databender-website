/**
 * Day 7 Legal Guide Email Template
 *
 * Why smaller firms have AI advantages: less legacy tech,
 * faster decision-making, on-premise deployment options
 */

import type { SequenceTemplate } from "../../types";

interface Day7GuideLegalParams {
  firstName: string;
  company?: string;
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  contentUrl: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

/**
 * Generate Day 7 legal guide AI advantages email template
 */
export function getDay7GuideLegalTemplate(params: Day7GuideLegalParams): SequenceTemplate {
  const {
    firstName,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const subject = "Why smaller firms are winning the AI race";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #1A9988 0%, #147a6c 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600;">
                The unexpected advantage smaller firms have
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                I wanted to share an observation that runs counter to what most people assume about AI adoption in legal.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                <strong>Conventional wisdom says large firms have the advantage.</strong> More resources, dedicated IT teams, vendor relationships. But the data tells a different story.
              </p>

              <!-- Key Insight Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f0fdf9; border-radius: 8px; border: 1px solid #d1fae5;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      What I'm seeing
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600; line-height: 1.4;">
                      Firms under 50 attorneys are implementing AI 3x faster than AmLaw 100 firms on average
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                <strong>Why?</strong> It comes down to three structural advantages smaller firms possess:
              </p>

              <!-- Advantages List -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 0 16px 0;">
                          <p style="margin: 0 0 4px; color: #1A9988; font-size: 14px; font-weight: 600;">
                            1. Faster Decision-Making
                          </p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                            No committees, no six-month approval processes. When partners see value, they can act. Large firm technology decisions often take 12-18 months; smaller firms regularly deploy in 60-90 days.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px 0;">
                          <p style="margin: 0 0 4px; color: #1A9988; font-size: 14px; font-weight: 600;">
                            2. Less Legacy Technology
                          </p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                            Large firms are often locked into enterprise contracts and complex integrations. Smaller firms have more flexibility to adopt modern solutions without navigating years of technical debt.
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0;">
                          <p style="margin: 0 0 4px; color: #1A9988; font-size: 14px; font-weight: 600;">
                            3. On-Premise and Private Cloud Options
                          </p>
                          <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                            Contrary to perception, sophisticated AI solutions can now run entirely within your infrastructure. Client data never leaves your control - addressing the security concerns that rightfully make attorneys cautious about cloud-based AI tools.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Security Emphasis -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; font-style: italic;">
                      "The most successful implementations I see start with a specific, bounded use case - not a firm-wide transformation. Document review, contract analysis, or research assistance. Prove value there, then expand."
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                The firms getting this right are not trying to boil the ocean. They pick one high-value use case, deploy it thoughtfully with proper security controls, and build confidence from there.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Curious what a practical first step might look like for your firm?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                I'm happy to discuss which use cases typically deliver the fastest ROI and what security architecture makes sense for legal environments. Confidential conversation, no pressure.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a Discussion
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Best,<br />
                Grant
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 13px; text-align: center;">
                Databender - Rethink what's possible.
              </p>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 12px; text-align: center;">
                <a href="https://databender.co" style="color: #9ca3af; text-decoration: none;">databender.co</a>
              </p>
              <p style="margin: 16px 0 0; color: #9ca3af; font-size: 11px; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a> from these emails
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textBody = `Hi ${firstName},

I wanted to share an observation that runs counter to what most people assume about AI adoption in legal.

Conventional wisdom says large firms have the advantage. More resources, dedicated IT teams, vendor relationships. But the data tells a different story.

WHAT I'M SEEING:
Firms under 50 attorneys are implementing AI 3x faster than AmLaw 100 firms on average

Why? It comes down to three structural advantages smaller firms possess:

1. FASTER DECISION-MAKING
No committees, no six-month approval processes. When partners see value, they can act. Large firm technology decisions often take 12-18 months; smaller firms regularly deploy in 60-90 days.

2. LESS LEGACY TECHNOLOGY
Large firms are often locked into enterprise contracts and complex integrations. Smaller firms have more flexibility to adopt modern solutions without navigating years of technical debt.

3. ON-PREMISE AND PRIVATE CLOUD OPTIONS
Contrary to perception, sophisticated AI solutions can now run entirely within your infrastructure. Client data never leaves your control - addressing the security concerns that rightfully make attorneys cautious about cloud-based AI tools.

"The most successful implementations I see start with a specific, bounded use case - not a firm-wide transformation. Document review, contract analysis, or research assistance. Prove value there, then expand."

The firms getting this right are not trying to boil the ocean. They pick one high-value use case, deploy it thoughtfully with proper security controls, and build confidence from there.

---

Curious what a practical first step might look like for your firm?

I'm happy to discuss which use cases typically deliver the fastest ROI and what security architecture makes sense for legal environments. Confidential conversation, no pressure.

Schedule a discussion: ${calendarUrl}

Best,
Grant

---
Databender - Rethink what's possible.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject,
    htmlBody,
    textBody,
  };
}
