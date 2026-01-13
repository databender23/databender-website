/**
 * Slack Notification Service
 *
 * Sends real-time alerts to Slack for:
 * - Warm/Hot/Very Hot leads (score 26+)
 * - Identified companies
 * - Conversions
 */

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface LeadAlert {
  type: "lead";
  score: number;
  tier: "Warm" | "Hot" | "Very Hot";
  visitorId: string;
  sessionId: string;
  currentPage: string;
  pagesViewed: string[];
  company?: string;
  country?: string;
  device?: string;
  isReturning?: boolean;
  referrerSource?: string;
}

interface CompanyAlert {
  type: "company";
  companyName: string;
  companyDomain?: string;
  visitorId: string;
  currentPage: string;
  pagesViewed: string[];
  leadScore?: number;
  leadTier?: string;
  country?: string;
}

interface ConversionAlert {
  type: "conversion";
  conversionType: string;
  visitorId: string;
  page: string;
  leadScore?: number;
  company?: string;
  journeyLength?: number;
  formData?: Record<string, string>;
}

type SlackAlert = LeadAlert | CompanyAlert | ConversionAlert;

function getTierEmoji(tier: string): string {
  switch (tier) {
    case "Very Hot": return "🔥🔥";
    case "Hot": return "🔥";
    case "Warm": return "♨️";
    default: return "📊";
  }
}

function formatLeadMessage(alert: LeadAlert): object {
  const emoji = getTierEmoji(alert.tier);
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  // Color based on tier
  const tierColors: Record<string, string> = {
    "Very Hot": "#dc2626",
    "Hot": "#ea580c",
    "Warm": "#d97706"
  };

  const details: string[] = [];
  if (alert.company) details.push(`🏢 ${alert.company}`);
  if (alert.isReturning) details.push("🔄 Returning visitor");
  if (alert.referrerSource && alert.referrerSource !== "direct") {
    details.push(`📍 via ${alert.referrerSource}`);
  }
  if (alert.country) details.push(`🌍 ${alert.country}`);

  return {
    attachments: [{
      color: tierColors[alert.tier] || "#d97706",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${alert.tier} Lead Detected*\nScore: *${alert.score}* points`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Page*\n${alert.currentPage}` },
            { type: "mrkdwn", text: `*Device*\n${alert.device || "Unknown"}` }
          ]
        },
        ...(details.length > 0 ? [{
          type: "context",
          elements: [{ type: "mrkdwn", text: details.join("  •  ") }]
        }] : []),
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Journey*\n\`${journeyText}\`` }
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `Visitor: \`${alert.visitorId.slice(0, 8)}...\`` }
          ]
        }
      ]
    }]
  };
}

function formatCompanyMessage(alert: CompanyAlert): object {
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  const details: string[] = [];
  if (alert.companyDomain) details.push(`🔗 ${alert.companyDomain}`);
  if (alert.country) details.push(`🌍 ${alert.country}`);
  if (alert.leadScore) details.push(`📊 Score: ${alert.leadScore}`);

  return {
    attachments: [{
      color: "#3b82f6",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `🏢 *Company Identified*\n*${alert.companyName}*`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Current Page*\n${alert.currentPage}` },
            { type: "mrkdwn", text: `*Lead Tier*\n${alert.leadTier || "Cold"}` }
          ]
        },
        ...(details.length > 0 ? [{
          type: "context",
          elements: [{ type: "mrkdwn", text: details.join("  •  ") }]
        }] : []),
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Pages Viewed*\n\`${journeyText}\`` }
        },
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `Visitor: \`${alert.visitorId.slice(0, 8)}...\`` }
          ]
        }
      ]
    }]
  };
}

function formatConversionMessage(alert: ConversionAlert): object {
  const conversionLabel = alert.conversionType
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  const details: string[] = [];
  if (alert.company) details.push(`🏢 ${alert.company}`);
  if (alert.leadScore) details.push(`📊 Score: ${alert.leadScore}`);
  if (alert.journeyLength) details.push(`📄 ${alert.journeyLength} pages visited`);

  return {
    attachments: [{
      color: "#22c55e",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `✅ *New Conversion!*\n${conversionLabel}`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Page*\n${alert.page}` },
            { type: "mrkdwn", text: `*Type*\n${conversionLabel}` }
          ]
        },
        ...(details.length > 0 ? [{
          type: "context",
          elements: [{ type: "mrkdwn", text: details.join("  •  ") }]
        }] : []),
        {
          type: "context",
          elements: [
            { type: "mrkdwn", text: `Visitor: \`${alert.visitorId.slice(0, 8)}...\`` }
          ]
        }
      ]
    }]
  };
}

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

// Simple text formatters for better webhook compatibility
function formatLeadText(alert: LeadAlert): string {
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

function formatCompanyText(alert: CompanyAlert): string {
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  const lines = [
    "🏢 *Company Identified*",
    "",
    `*Company:* ${alert.companyName}`,
    `*Current Page:* ${alert.currentPage}`,
  ];

  if (alert.companyDomain) lines.push(`*Domain:* ${alert.companyDomain}`);
  if (alert.leadScore) lines.push(`*Lead Score:* ${alert.leadScore} (${alert.leadTier})`);
  if (alert.country) lines.push(`*Location:* ${alert.country}`);

  lines.push("", `*Pages Viewed:* ${journeyText}`);
  lines.push("", `_Visitor: ${alert.visitorId.slice(0, 8)}..._`);

  return lines.join("\n");
}

function formatConversionText(alert: ConversionAlert): string {
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

// Helper to check if we should send a lead alert based on score
export function shouldAlertForScore(score: number): { shouldAlert: boolean; tier?: "Warm" | "Hot" | "Very Hot" } {
  if (score >= 76) return { shouldAlert: true, tier: "Very Hot" };
  if (score >= 50) return { shouldAlert: true, tier: "Hot" };
  if (score >= 26) return { shouldAlert: true, tier: "Warm" };
  return { shouldAlert: false };
}
