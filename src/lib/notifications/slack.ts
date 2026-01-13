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

  const fields = [
    { type: "mrkdwn", text: `*Score:* ${alert.score} (${alert.tier})` },
    { type: "mrkdwn", text: `*Current Page:* ${alert.currentPage}` },
  ];

  if (alert.company) {
    fields.push({ type: "mrkdwn", text: `*Company:* ${alert.company}` });
  }
  if (alert.isReturning) {
    fields.push({ type: "mrkdwn", text: `*Visitor Type:* Returning` });
  }
  if (alert.referrerSource) {
    fields.push({ type: "mrkdwn", text: `*Source:* ${alert.referrerSource}` });
  }
  if (alert.country) {
    fields.push({ type: "mrkdwn", text: `*Location:* ${alert.country}` });
  }

  return {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: `${emoji} ${alert.tier} Lead Detected`, emoji: true }
      },
      {
        type: "section",
        fields: fields.slice(0, 4)
      },
      ...(fields.length > 4 ? [{
        type: "section",
        fields: fields.slice(4)
      }] : []),
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Journey:* ${journeyText}` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Visitor ID: ${alert.visitorId.slice(0, 8)}... | ${alert.device || "Unknown device"}` }
        ]
      }
    ]
  };
}

function formatCompanyMessage(alert: CompanyAlert): object {
  const fields = [
    { type: "mrkdwn", text: `*Company:* ${alert.companyName}` },
    { type: "mrkdwn", text: `*Current Page:* ${alert.currentPage}` },
  ];

  if (alert.companyDomain) {
    fields.push({ type: "mrkdwn", text: `*Domain:* ${alert.companyDomain}` });
  }
  if (alert.leadScore) {
    fields.push({ type: "mrkdwn", text: `*Lead Score:* ${alert.leadScore} (${alert.leadTier})` });
  }
  if (alert.country) {
    fields.push({ type: "mrkdwn", text: `*Location:* ${alert.country}` });
  }

  const journeyText = alert.pagesViewed.slice(-5).join(" → ");

  return {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🏢 Company Identified", emoji: true }
      },
      {
        type: "section",
        fields: fields.slice(0, 4)
      },
      ...(fields.length > 4 ? [{
        type: "section",
        fields: fields.slice(4)
      }] : []),
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Pages Viewed:* ${journeyText}` }
      },
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Visitor ID: ${alert.visitorId.slice(0, 8)}...` }
        ]
      }
    ]
  };
}

function formatConversionMessage(alert: ConversionAlert): object {
  const conversionLabel = alert.conversionType
    .replace(/_/g, " ")
    .replace(/\b\w/g, l => l.toUpperCase());

  const fields = [
    { type: "mrkdwn", text: `*Type:* ${conversionLabel}` },
    { type: "mrkdwn", text: `*Page:* ${alert.page}` },
  ];

  if (alert.company) {
    fields.push({ type: "mrkdwn", text: `*Company:* ${alert.company}` });
  }
  if (alert.leadScore) {
    fields.push({ type: "mrkdwn", text: `*Lead Score:* ${alert.leadScore}` });
  }
  if (alert.journeyLength) {
    fields.push({ type: "mrkdwn", text: `*Journey Length:* ${alert.journeyLength} pages` });
  }

  return {
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "✅ New Conversion!", emoji: true }
      },
      {
        type: "section",
        fields: fields.slice(0, 4)
      },
      ...(fields.length > 4 ? [{
        type: "section",
        fields: fields.slice(4)
      }] : []),
      {
        type: "context",
        elements: [
          { type: "mrkdwn", text: `Visitor ID: ${alert.visitorId.slice(0, 8)}...` }
        ]
      }
    ]
  };
}

export async function sendSlackAlert(alert: SlackAlert): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) {
    console.log("Slack webhook not configured, skipping notification");
    return false;
  }

  let message: object;

  switch (alert.type) {
    case "lead":
      message = formatLeadMessage(alert);
      break;
    case "company":
      message = formatCompanyMessage(alert);
      break;
    case "conversion":
      message = formatConversionMessage(alert);
      break;
    default:
      return false;
  }

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("Slack notification failed:", response.status);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Slack notification error:", error);
    return false;
  }
}

// Helper to check if we should send a lead alert based on score
export function shouldAlertForScore(score: number): { shouldAlert: boolean; tier?: "Warm" | "Hot" | "Very Hot" } {
  if (score >= 76) return { shouldAlert: true, tier: "Very Hot" };
  if (score >= 50) return { shouldAlert: true, tier: "Hot" };
  if (score >= 26) return { shouldAlert: true, tier: "Warm" };
  return { shouldAlert: false };
}
