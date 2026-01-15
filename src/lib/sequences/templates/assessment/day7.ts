/**
 * Day 7 Assessment Email Template
 *
 * Value-add content email with industry-specific insights
 */

import { SequenceTemplate } from "../../types";

interface Day7AssessmentParams {
  firstName: string;
  company?: string;
  industry?: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

interface IndustryContent {
  subject: string;
  headline: string;
  intro: string;
  insights: string[];
  closingThought: string;
}

/**
 * Get industry-specific content for the value-add email
 */
function getIndustryContent(industry?: string, company?: string): IndustryContent {
  const companyName = company || "your company";

  switch (industry?.toLowerCase()) {
    case "healthcare":
      return {
        subject: "Resource: Price transparency data insights for healthcare organizations",
        headline: "Quick insight: What price transparency data reveals",
        intro:
          "We came across some interesting patterns in healthcare price transparency data that we thought might be relevant for organizations like yours.",
        insights: [
          "Organizations using transparency data for payer negotiations are seeing 8-15% better rates on average",
          "The most useful data often comes from analyzing competitor pricing within specific service lines, not broad comparisons",
          "Early adopters are building internal benchmarking tools that update automatically as new data is published",
        ],
        closingThought:
          "The real opportunity is in operationalizing this data, not just reporting on it. Most healthcare organizations are still treating it as a compliance exercise rather than a strategic asset.",
      };

    case "legal":
      return {
        subject: "Resource: AI adoption advantages for smaller law firms",
        headline: "Quick insight: Why smaller firms are winning the AI race",
        intro:
          "We wanted to share a pattern we are seeing in legal AI adoption that runs counter to what most people expect.",
        insights: [
          "Firms under 50 attorneys are implementing AI 3x faster than AmLaw 100 firms on average",
          "The advantage is not resources. It is decision-making speed and willingness to experiment",
          "Document review and contract analysis are showing the fastest ROI, often within 60 days",
        ],
        closingThought:
          "The firms seeing the best results are starting small, picking one specific use case, and expanding from there rather than trying to transform everything at once.",
      };

    case "manufacturing":
      return {
        subject: "Resource: Sales pipeline patterns in manufacturing",
        headline: "Quick insight: What predicts manufacturing deal velocity",
        intro:
          "We have been looking at sales pipeline data from manufacturing companies and noticed some patterns that might be useful for your team.",
        insights: [
          "Deals with engineering involvement before the proposal stage close 40% faster",
          "The biggest predictor of deal size is not company revenue. It is the number of stakeholders engaged early",
          "Quote-to-close cycles are 2x longer when pricing discussions happen before technical validation",
        ],
        closingThought:
          "The common thread is front-loading the technical conversation. Companies treating sales as purely a relationship game are leaving real revenue on the table.",
      };

    default:
      return {
        subject: "Thought you might find this useful",
        headline: "Quick insight: The real cost of data problems",
        intro:
          `We were thinking about your assessment results and wanted to share a framework that might be useful for ${companyName}.`,
        insights: [
          "Most companies underestimate data problem costs by 5-10x because they only count direct impacts",
          "The hidden costs are in delayed decisions, manual workarounds, and opportunities never pursued",
          "A simple way to estimate true cost: count the hours spent on data cleanup and multiply by 3x for the downstream effects",
        ],
        closingThought:
          "The companies that get this right start by making data problems visible, not by buying tools. Once leadership sees the real cost, the investment case makes itself.",
      };
  }
}

/**
 * Generate the Day 7 value-add content email
 */
export function getDay7AssessmentTemplate(params: Day7AssessmentParams): SequenceTemplate {
  const { firstName, company, industry, calendarUrl, unsubscribeUrl } = params;
  const content = getIndustryContent(industry, company);

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
                ${content.headline}
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
                ${content.intro}
              </p>

              <!-- Insights Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      A few things that stood out:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${content.insights
                        .map(
                          (insight) => `
                      <tr>
                        <td style="padding: 0 0 12px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 12px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          ${insight}
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
                ${content.closingThought}
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Hope this is useful. Happy to discuss if any of it resonates.
              </p>

              <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                Best,<br />
                Grant
              </p>

              <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px;">
                <a href="${calendarUrl}" style="color: #1A9988; text-decoration: none;">Schedule a quick call</a> if you'd like to chat through any of this.
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
                <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
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

${content.intro}

A few things that stood out:

${content.insights.map((insight) => `- ${insight}`).join("\n")}

${content.closingThought}

---

Hope this is useful. Happy to discuss if any of it resonates.

Best,
Grant

Schedule a quick call if you'd like to chat: ${calendarUrl}

---
Databender - Boutique strategy. Enterprise delivery.
Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject: content.subject,
    htmlBody,
    textBody,
  };
}
