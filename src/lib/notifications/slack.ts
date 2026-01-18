/**
 * Slack Notification Service
 *
 * Sends real-time alerts to Slack for:
 * - Warm/Hot/Very Hot leads (score 26+)
 * - Identified companies (with person-level data from RB2B)
 * - Conversions
 *
 * Company identification sources:
 * - RB2B: Person-level (name, email, LinkedIn, job title) - US only
 * - Leadfeeder: Company-level (name, domain, industry, size)
 * - Reverse DNS: Basic company name inference
 */

import type { SlackAlert, LeadAlert, CompanyAlert, ConversionAlert } from "./slack-types";
import { formatLeadMessage, formatCompanyMessage, formatConversionMessage, getTierEmoji } from "./slack-formatters";

// Re-export types for external consumers
export type { SlackAlert, LeadAlert, CompanyAlert, ConversionAlert };

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

/**
 * Send a Slack alert notification
 */
export async function sendSlackAlert(alert: SlackAlert): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) {
    console.log("Slack webhook not configured, skipping notification");
    return false;
  }

  let payload: object;

  switch (alert.type) {
    case "lead":
      payload = formatLeadMessage(alert);
      break;
    case "company":
      payload = formatCompanyMessage(alert);
      break;
    case "conversion":
      payload = formatConversionMessage(alert);
      break;
    default:
      return false;
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Slack notification failed:", response.status, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Slack notification error:", error);
    return false;
  }
}

/**
 * Format lead alert as plain text (for webhook compatibility)
 */
export function formatLeadText(alert: LeadAlert): string {
  const emoji = getTierEmoji(alert.tier);
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  const lines = [
    `${emoji} *${alert.tier} Lead Detected*`,
    "",
    `*Score:* ${alert.score} (${alert.tier})`,
    `*Current Page:* ${alert.currentPage}`,
  ];

  if (alert.company) lines.push(`*Company:* ${alert.company}`);
  if (alert.isReturning) lines.push(`*Visitor Type:* Returning`);
  if (alert.referrerSource) lines.push(`*Source:* ${alert.referrerSource}`);
  if (alert.country && alert.device) {
    lines.push(`*Location:* ${alert.country} | ${alert.device}`);
  }

  lines.push("", `*Journey:* ${journeyText}`);
  lines.push("", `_Visitor: ${alert.visitorId.slice(0, 8)}..._`);

  return lines.join("\n");
}

/**
 * Format company alert as plain text (for webhook compatibility)
 */
export function formatCompanyText(alert: CompanyAlert): string {
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  // Determine header based on person-level or company-level identification
  const headerLine = alert.personName
    ? "👤 *Person Identified*"
    : "🏢 *Company Identified*";

  const lines = [headerLine, ""];

  // Person info (if from RB2B)
  if (alert.personName) {
    lines.push(`*Person:* ${alert.personName}`);
    if (alert.jobTitle) lines.push(`*Title:* ${alert.jobTitle}`);
    if (alert.personEmail) lines.push(`*Email:* ${alert.personEmail}`);
    if (alert.linkedInUrl) lines.push(`*LinkedIn:* ${alert.linkedInUrl}`);
    lines.push("");
  }

  // Company info
  lines.push(`*Company:* ${alert.companyName}`);
  if (alert.companyDomain) lines.push(`*Domain:* ${alert.companyDomain}`);
  if (alert.industry) lines.push(`*Industry:* ${alert.industry}`);
  if (alert.employeeCount) lines.push(`*Size:* ${alert.employeeCount} employees`);

  lines.push(`*Current Page:* ${alert.currentPage}`);
  if (alert.leadScore) lines.push(`*Lead Score:* ${alert.leadScore} (${alert.leadTier})`);
  if (alert.country) lines.push(`*Location:* ${alert.country}`);

  // Identification source
  const sourceLabelsExtended: Record<string, string> = {
    rb2b: "RB2B (Person-level)",
    leadfeeder: "Leadfeeder (Company-level)",
    reverse_dns: "Reverse DNS",
  };
  const source = sourceLabelsExtended[alert.identificationSource || "reverse_dns"] || "Unknown";
  lines.push(`*Source:* ${source} (${alert.confidence || "low"} confidence)`);

  lines.push("", `*Pages Viewed:* ${journeyText}`);
  lines.push("", `_Visitor: ${alert.visitorId.slice(0, 8)}..._`);

  return lines.join("\n");
}

/**
 * Format conversion alert as plain text (for webhook compatibility)
 */
export function formatConversionText(alert: ConversionAlert): string {
  const conversionLabel = alert.conversionType
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  const lines = [
    "✅ *New Conversion!*",
    "",
    `*Type:* ${conversionLabel}`,
    `*Page:* ${alert.page}`,
  ];

  if (alert.company) lines.push(`*Company:* ${alert.company}`);
  if (alert.leadScore) lines.push(`*Lead Score:* ${alert.leadScore}`);
  if (alert.journeyLength) lines.push(`*Journey Length:* ${alert.journeyLength} pages`);

  lines.push("", `_Visitor: ${alert.visitorId.slice(0, 8)}..._`);

  return lines.join("\n");
}

/**
 * Check if we should send a lead alert based on score
 */
export function shouldAlertForScore(score: number): {
  shouldAlert: boolean;
  tier?: "Warm" | "Hot" | "Very Hot";
} {
  if (score >= 76) return { shouldAlert: true, tier: "Very Hot" };
  if (score >= 50) return { shouldAlert: true, tier: "Hot" };
  if (score >= 26) return { shouldAlert: true, tier: "Warm" };
  return { shouldAlert: false };
}
