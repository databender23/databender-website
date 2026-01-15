/**
 * Day 2 Guide Follow-up Email Template
 *
 * Follow-up insight based on common challenges related to the guide topic
 */

import type { SequenceTemplate } from "../../types";

interface Day2GuideGeneralParams {
  firstName: string;
  company?: string;
  guideTitle: string;
  guideSlug: string;
  downloadUrl: string;
  contentUrl: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

interface GuideInsight {
  subject: string;
  headline: string;
  challenge: string;
  insights: string[];
  recommendation: string;
}

/**
 * Get content based on guide topic
 */
function getGuideInsight(guideTitle: string, guideSlug: string): GuideInsight {
  const slugLower = guideSlug.toLowerCase();

  if (slugLower.includes("data") && slugLower.includes("strategy")) {
    return {
      subject: "The challenge nobody warns you about",
      headline: "One challenge that trips up most data strategies",
      challenge:
        "Most organizations start their data strategy journey focused on tools and technology. But the biggest challenge we see isn't choosing the right platform. It's getting people to actually use the data once it's available.",
      insights: [
        "80% of data initiatives fail not because of technology, but because of adoption",
        "The organizations that succeed treat data literacy as a change management project, not an IT project",
        "Starting with a single team's pain point builds momentum faster than company-wide rollouts",
      ],
      recommendation:
        "The most successful data strategies we've seen start small. They solve one real problem for one team and expand from there. Quick wins build the trust that makes bigger initiatives possible.",
    };
  }

  if (slugLower.includes("ai") || slugLower.includes("automation")) {
    return {
      subject: "What we wish someone told us about AI projects",
      headline: "The AI challenge nobody talks about",
      challenge:
        "After working on dozens of AI implementations, we've noticed a pattern: the technical work is rarely what determines success or failure. It's usually something more fundamental.",
      insights: [
        "Most AI projects stall because of data quality, not algorithm sophistication",
        "Starting with 'What AI should we use?' instead of 'What problem are we solving?' leads to expensive dead ends",
        "The best AI use cases are often boring: automating tedious manual work, not replacing human judgment",
      ],
      recommendation:
        "Before investing in any AI initiative, try a simple exercise: identify the three tasks your team spends the most time on that feel like they should be automated. That's usually where the real opportunity lives.",
    };
  }

  if (slugLower.includes("analytics") || slugLower.includes("bi")) {
    return {
      subject: "Why most dashboards go unused",
      headline: "The analytics trap most organizations fall into",
      challenge:
        "We've seen this pattern countless times: an organization invests in a beautiful analytics platform, builds dozens of dashboards, and then... nobody uses them. The data is there, but decisions are still made on gut instinct.",
      insights: [
        "The problem isn't usually the tool. It's that the dashboards answer questions nobody is asking",
        "Successful analytics programs start with decisions, not data: 'What will you do differently if you had this number?'",
        "A single metric that drives action is worth more than a hundred reports that get ignored",
      ],
      recommendation:
        "Try this: for each report or dashboard, ask 'Who will look at this, and what decision will they make based on it?' If you can't answer that clearly, the report probably won't get used.",
    };
  }

  // Default fallback for general guides
  return {
    subject: "A common pattern we see",
    headline: "One thing we keep seeing organizations struggle with",
    challenge:
      "After working with many organizations on data and technology challenges, there's one pattern that comes up again and again: the gap between having data and actually using it to make better decisions.",
      insights: [
        "Most organizations have more data than they can effectively use. The constraint is rarely access, it's action",
        "The 'perfect solution' mindset often delays progress for months or years",
        "Small, focused improvements compound faster than big transformation projects",
      ],
      recommendation:
        "The organizations that make the most progress focus on one problem at a time, solve it well, learn from it, and then move on to the next. It's less exciting than a big transformation, but it actually works.",
  };
}

/**
 * Generate Day 2 guide follow-up email template
 */
export function getDay2GuideGeneralTemplate(params: Day2GuideGeneralParams): SequenceTemplate {
  const {
    firstName,
    company,
    guideTitle,
    guideSlug,
    calendarUrl,
    unsubscribeUrl,
  } = params;

  const insight = getGuideInsight(guideTitle, guideSlug);
  const companyContext = company ? ` at ${company}` : "";

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
                ${insight.headline}
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
                We wanted to follow up on the guide you downloaded (<strong>${guideTitle}</strong>) with something we've been thinking about.
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                ${insight.challenge}
              </p>

              <!-- Insights Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      What we've observed:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${insight.insights
                        .map(
                          (item) => `
                      <tr>
                        <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          ${item}
                        </td>
                      </tr>
                      `
                        )
                        .join("")}
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                ${insight.recommendation}
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Does any of this resonate with what you're seeing${companyContext}?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If you'd like to talk through your specific situation, we're happy to chat. Sometimes just having a sounding board helps clarify the path forward.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Let's Talk Through It
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
                Databender - Boutique strategy. Enterprise delivery.
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

  const textBody = `
Hi ${firstName},

We wanted to follow up on the guide you downloaded ("${guideTitle}") with something we've been thinking about.

${insight.headline}

${insight.challenge}

WHAT WE'VE OBSERVED:

${insight.insights.map((item) => `- ${item}`).join("\n")}

${insight.recommendation}

---

Does any of this resonate with what you're seeing${companyContext}?

If you'd like to talk through your specific situation, we're happy to chat. Sometimes just having a sounding board helps clarify the path forward.

Schedule a conversation: ${calendarUrl}

Best,
Grant

---
Databender - Boutique strategy. Enterprise delivery.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject: insight.subject,
    htmlBody,
    textBody,
  };
}
