/**
 * Day 2 Assessment Follow-up Email Template
 *
 * Personalized insight based on lowest scoring category
 */

import type { SequenceTemplate } from "../../types";

interface Day2AssessmentParams {
  firstName: string;
  company?: string;
  lowestCategory: string;
  lowestCategoryScore: number;
  assessmentName: string;
  calendarUrl: string;
  unsubscribeUrl: string;
}

interface CategoryInsight {
  headline: string;
  insight: string;
  statistic: string;
  recommendation: string;
}

/**
 * Get personalized insight content based on the lowest scoring category
 */
function getCategoryInsight(category: string, _score: number): CategoryInsight {
  const categoryLower = category.toLowerCase();

  if (categoryLower.includes("data quality") || categoryLower === "data quality") {
    return {
      headline: "Your data quality score caught our attention",
      insight:
        "Organizations with data quality challenges often find themselves making decisions based on incomplete or inconsistent information. The hidden cost isn't just inaccurate reports - it's the hours spent reconciling data, the opportunities missed because insights came too late, and the erosion of trust in analytics across your team.",
      statistic:
        "Companies that invest in data quality typically see 15-25% improvement in operational efficiency and significantly faster decision-making cycles.",
      recommendation:
        "The good news: data quality improvements often deliver ROI within months, not years. A focused enrichment and validation strategy can get your team trusting the numbers again without disrupting daily operations.",
    };
  }

  if (
    categoryLower.includes("search") ||
    categoryLower.includes("accessibility") ||
    categoryLower.includes("access")
  ) {
    return {
      headline: "Finding information shouldn't be this hard",
      insight:
        "Your score suggests your team may be spending considerable time just locating the data they need. This 'search tax' is one of the most overlooked productivity drains in organizations - knowledge workers can spend up to 30% of their day searching for information.",
      statistic:
        "Organizations that improve data accessibility typically save 5-10 hours per employee per week - time that can be redirected to analysis and action.",
      recommendation:
        "The fix doesn't require a complete infrastructure overhaul. It's about making your existing data discoverable so your team spends time on analysis, not searching.",
    };
  }

  if (categoryLower.includes("automation")) {
    return {
      headline: "Manual processes are holding you back",
      insight:
        "Your automation score indicates there may be substantial manual work in your data workflows. Every manual step is a potential bottleneck, error source, and scaling constraint. More importantly, it's keeping your team focused on data mechanics instead of strategic insights.",
      statistic:
        "Teams that automate routine data tasks typically reclaim 20-40% of their time for higher-value analysis and decision support.",
      recommendation:
        "The path forward doesn't require replacing everything at once. Automating your highest-friction processes first frees your team to focus on the work that actually matters, and builds momentum for what comes next.",
    };
  }

  if (
    categoryLower.includes("ai readiness") ||
    categoryLower.includes("ai") ||
    categoryLower.includes("machine learning")
  ) {
    return {
      headline: "Your data foundation may be limiting AI potential",
      insight:
        "Your AI readiness score suggests there are foundational gaps that could prevent successful AI adoption. Many organizations jump into AI initiatives only to discover their data isn't structured, clean, or accessible enough to train effective models.",
      statistic:
        "80% of AI project failures trace back to data quality and preparation issues, not algorithm selection or technical implementation.",
      recommendation:
        "Before investing heavily in AI tools, addressing these foundation gaps will set you up to actually get results from AI, not just buy software. Fix the foundation first. The AI payoff follows.",
    };
  }

  // Default fallback for other categories
  return {
    headline: `Your ${category} score reveals an opportunity`,
    insight:
      "Looking at your assessment results, this area stood out as having the most room for improvement. In our experience, addressing foundational gaps like this creates a multiplier effect - improvements here often unlock progress in other areas.",
    statistic:
      "Organizations that systematically address their lowest-scoring areas typically see 2-3x faster progress on their overall data maturity.",
    recommendation:
      "A targeted approach here can build momentum fast. Quick wins in your weakest area often unlock progress everywhere else.",
  };
}

/**
 * Generate Day 2 assessment follow-up email template
 */
export function getDay2AssessmentTemplate(params: Day2AssessmentParams): SequenceTemplate {
  const { firstName, company, lowestCategory, lowestCategoryScore, assessmentName, calendarUrl, unsubscribeUrl } =
    params;

  const insight = getCategoryInsight(lowestCategory, lowestCategoryScore);
  const companyContext = company ? ` at ${company}` : "";
  const scoreDisplay = Math.round(lowestCategoryScore);

  const subject = "One thing that stood out from your assessment";

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
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
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
                I was reviewing your ${assessmentName} results and wanted to share a specific observation.
              </p>

              <!-- Score Highlight Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f0fdf9; border-left: 4px solid #1A9988; padding: 20px; border-radius: 0 8px 8px 0;">
                    <p style="margin: 0 0 8px; color: #1A9988; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Area of Focus
                    </p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">
                      ${lowestCategory}: ${scoreDisplay}/100
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                ${insight.insight}
              </p>

              <!-- Statistic Callout -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; color: #1a1a1a; font-size: 15px; line-height: 1.6; font-style: italic;">
                      "${insight.statistic}"
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                ${insight.recommendation}
              </p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;" />

              <p style="margin: 0 0 16px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                <strong>Want to explore what this could look like${companyContext}?</strong>
              </p>

              <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                I'd be happy to walk through your results in more detail and discuss practical next steps. No pitch, just a conversation about what makes sense for your situation.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${calendarUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1A9988; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; border-radius: 8px;">
                      Schedule a 15-Minute Call
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

  const textBody = `
Hi ${firstName},

I was reviewing your ${assessmentName} results and wanted to share a specific observation.

AREA OF FOCUS: ${lowestCategory} - ${scoreDisplay}/100

${insight.headline}

${insight.insight}

"${insight.statistic}"

${insight.recommendation}

---

Want to explore what this could look like${companyContext}?

I'd be happy to walk through your results in more detail and discuss practical next steps. No pitch, just a conversation about what makes sense for your situation.

Schedule a call: ${calendarUrl}

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
