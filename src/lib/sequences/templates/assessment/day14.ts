/**
 * Day 14 Assessment Email Template
 *
 * Case study email with industry-specific examples
 */

import type { SequenceTemplate } from "../../types";

interface Day14AssessmentParams {
  firstName: string;
  company?: string;
  industry?: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

interface CaseStudyContent {
  subject: string;
  headline: string;
  companyType: string;
  challenge: string;
  solution: string[];
  result: string;
  closingThought: string;
}

/**
 * Get industry-specific case study content
 */
function getCaseStudyContent(industry?: string): CaseStudyContent {
  switch (industry?.toLowerCase()) {
    case "healthcare":
      return {
        subject: "How a regional hospital system solved their pricing data challenge",
        headline: "Quick case study you might relate to",
        companyType: "A regional hospital system",
        challenge:
          "was struggling with price transparency data. Multiple file formats, inconsistent naming conventions, and no way to compare rates across payers. Their finance team was spending 20+ hours a week just trying to make sense of it.",
        solution: [
          "Consolidated and normalized pricing files from 12 different payers into a unified data model",
          "Built automated comparison dashboards that update as new files are published",
          "Created payer negotiation tools showing exactly where rates were below market",
        ],
        result:
          "Within 6 months, they improved margins on their top 50 procedures by 8-12% and eliminated nearly all manual reconciliation work.",
        closingThought:
          "The interesting part: the technology was straightforward. The real value was in understanding how to structure the data for actionable insights, not just compliance reporting.",
      };

    case "legal":
      return {
        subject: "How a 40-attorney firm stopped losing institutional knowledge",
        headline: "Quick case study you might relate to",
        companyType: "A 40-attorney firm",
        challenge:
          "was hemorrhaging institutional knowledge. Partners retiring, associates moving on, and years of work product scattered across network drives, email archives, and document management systems. Finding relevant precedents meant asking around or spending hours searching.",
        solution: [
          "Implemented a knowledge management system with semantic search across all document repositories",
          "Built automated tagging that categorized documents by practice area, client type, and matter type",
          "Created a research assistant that could surface relevant internal precedents in seconds",
        ],
        result:
          "Associates recovered an average of 3 billable hours per week previously spent on internal searches. More importantly, they stopped reinventing work that had already been done.",
        closingThought:
          "The key insight: the firm had decades of valuable work product. They just needed a way to make it discoverable. The AI didn't create new knowledge - it unlocked what was already there.",
      };

    case "manufacturing":
      return {
        subject: "How a $50M manufacturer stopped flying blind on leads",
        headline: "Quick case study you might relate to",
        companyType: "A $50M equipment manufacturer",
        challenge:
          "was flying blind on their sales pipeline. CRM data was inconsistent, lead sources weren't tracked properly, and nobody could answer basic questions about which marketing efforts actually drove revenue. The sales team trusted their gut over the data.",
        solution: [
          "Cleaned and enriched CRM data with missing company information and standardized industry codes",
          "Built lead scoring models based on actual conversion patterns, not assumptions",
          "Created visibility into the full customer journey from first touch to closed deal",
        ],
        result:
          "Lead-to-opportunity conversion improved 22% in the first quarter. More importantly, marketing finally had data to prove which channels deserved more investment.",
        closingThought:
          "The transformation wasn't about new tools. It was about trusting the data enough to act on it. Once the sales team saw the scoring model predict winners accurately, everything changed.",
      };

    default:
      return {
        subject: "How a fast-growing company escaped spreadsheet chaos",
        headline: "Quick case study you might relate to",
        companyType: "A fast-growing company",
        challenge:
          "was drowning in spreadsheets. Every department had their own version of the truth. Monthly reporting took a week. By the time leadership saw the numbers, they were already outdated. Decisions were made on intuition because the data couldn't be trusted.",
        solution: [
          "Built automated data pipelines replacing manual spreadsheet workflows",
          "Created a single source of truth with real-time dashboards for each department",
          "Implemented data quality checks that caught issues before they became problems",
        ],
        result:
          "They eliminated 15+ hours per week of manual data work and cut monthly close from 7 days to 2. Leadership finally had numbers they could act on in real-time.",
        closingThought:
          "The biggest win wasn't efficiency - it was confidence. When everyone trusts the data, decisions happen faster and teams stop debating numbers and start debating strategy.",
      };
  }
}

/**
 * Generate the Day 14 case study email
 */
export function getDay14AssessmentTemplate(params: Day14AssessmentParams): SequenceTemplate {
  const { firstName, industry, calendarUrl, unsubscribeUrl } = params;
  const content = getCaseStudyContent(industry);

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
                I wanted to share a quick story that might resonate with some of the challenges you mentioned in your assessment.
              </p>

              <!-- Case Study Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #1A9988;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      The Challenge
                    </p>
                    <p style="margin: 0 0 20px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      <strong style="color: #1A9988;">${content.companyType}</strong> ${content.challenge}
                    </p>

                    <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      What We Did
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
                      ${content.solution
                        .map(
                          (item) => `
                      <tr>
                        <td style="padding: 0 0 10px 0; vertical-align: top; width: 24px;">
                          <span style="color: #1A9988; font-size: 16px;">&#8226;</span>
                        </td>
                        <td style="padding: 0 0 10px 8px; color: #4a4a4a; font-size: 15px; line-height: 1.5;">
                          ${item}
                        </td>
                      </tr>
                      `
                        )
                        .join("")}
                    </table>

                    <p style="margin: 0 0 8px; color: #1a1a1a; font-size: 15px; font-weight: 600;">
                      The Result
                    </p>
                    <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                      ${content.result}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                ${content.closingThought}
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Sound familiar?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                If any of this resonates, I'd be happy to discuss what a similar approach might look like for your situation. No obligation - just a conversation about what's possible.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Let's Talk
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

I wanted to share a quick story that might resonate with some of the challenges you mentioned in your assessment.

---

THE CHALLENGE

${content.companyType} ${content.challenge}

WHAT WE DID

${content.solution.map((item) => `- ${item}`).join("\n")}

THE RESULT

${content.result}

---

${content.closingThought}

---

Sound familiar?

If any of this resonates, I'd be happy to discuss what a similar approach might look like for your situation. No obligation - just a conversation about what's possible.

Schedule a call: ${calendarUrl}

Best,
Grant

---
Databender - Boutique strategy. Enterprise delivery.
databender.co

Unsubscribe: ${unsubscribeUrl}
  `.trim();

  return {
    subject: content.subject,
    htmlBody,
    textBody,
  };
}
