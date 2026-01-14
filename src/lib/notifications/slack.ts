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
  city?: string;
  region?: string;
  device?: string;
  isReturning?: boolean;
  visitCount?: number;
  referrerSource?: string;
  referrerCategory?: "search" | "ai-search" | "social" | "email" | "referral" | "direct" | "unknown";
  referrerDisplayName?: string;
  utmCampaign?: string;
  utmSource?: string;
  sessionDuration?: number; // seconds
  entryPage?: string;
  // First-touch attribution (how they originally discovered the site)
  firstTouch?: {
    source: string;
    medium: string;
    landingPage: string;
    timestamp: string;
    referrer?: string;
    utmCampaign?: string;
    utmSource?: string;
  } | null;
  firstVisitDate?: string | null;
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

  // Build location string (City, Region or Country)
  let location = "";
  if (alert.city && alert.region) {
    location = `${alert.city}, ${alert.region}`;
  } else if (alert.city) {
    location = alert.city;
  } else if (alert.country) {
    location = alert.country;
  }

  // Format session duration
  const duration = alert.sessionDuration
    ? alert.sessionDuration >= 60
      ? `${Math.floor(alert.sessionDuration / 60)}m ${alert.sessionDuration % 60}s`
      : `${alert.sessionDuration}s`
    : null;

  // Calculate engagement quality (time per page)
  const pageCount = alert.pagesViewed.length;
  const timePerPage = alert.sessionDuration && pageCount > 0
    ? Math.round(alert.sessionDuration / pageCount)
    : null;
  const engagementQuality = timePerPage
    ? timePerPage >= 60 ? "Deep reading" : timePerPage >= 30 ? "Engaged" : "Quick scan"
    : null;

  // Identify interest areas from pages visited
  const interestAreas: string[] = [];
  const pages = alert.pagesViewed.join(" ");
  if (pages.includes("/services/ai") || pages.includes("/ai-services")) interestAreas.push("AI & Automation");
  if (pages.includes("/services/analytics") || pages.includes("/analytics-bi")) interestAreas.push("Analytics/BI");
  if (pages.includes("/services/data-ai-strategy") || pages.includes("/strategy")) interestAreas.push("Data Strategy");
  if (pages.includes("/industries/legal") || pages.includes("/legal")) interestAreas.push("Legal");
  if (pages.includes("/industries/healthcare") || pages.includes("/healthcare")) interestAreas.push("Healthcare");
  if (pages.includes("/industries/manufacturing") || pages.includes("/manufacturing")) interestAreas.push("Manufacturing");

  // Identify high-intent pages in journey
  const highIntentPages = alert.pagesViewed.filter(p =>
    p.includes("/contact") ||
    p.includes("/case-studies") ||
    p.includes("/assessment")
  );

  // Build quick assessment summary
  const assessmentParts: string[] = [];
  if (alert.company) assessmentParts.push(`from *${alert.company}*`);
  if (alert.isReturning && alert.visitCount && alert.visitCount > 2) {
    assessmentParts.push(`returning for *${alert.visitCount}th* visit`);
  } else if (alert.isReturning) {
    assessmentParts.push("returning visitor");
  }
  if (highIntentPages.some(p => p.includes("/contact"))) {
    assessmentParts.push("*viewing contact page*");
  } else if (highIntentPages.some(p => p.includes("/assessment"))) {
    assessmentParts.push("*taking assessment*");
  }
  if (interestAreas.length > 0) {
    assessmentParts.push(`interested in ${interestAreas[0]}`);
  }
  const quickAssessment = assessmentParts.length > 0
    ? assessmentParts.join(", ")
    : `${pageCount} pages in ${duration || "this session"}`;

  // Build visitor context line
  const visitorContext: string[] = [];
  if (alert.visitCount && alert.visitCount > 1) {
    visitorContext.push(`🔄 Visit #${alert.visitCount}`);
  } else if (alert.isReturning) {
    visitorContext.push("🔄 Returning");
  } else {
    visitorContext.push("✨ First visit");
  }
  if (duration) visitorContext.push(`⏱️ ${duration}`);
  if (engagementQuality && timePerPage) {
    visitorContext.push(`📖 ${engagementQuality} (~${timePerPage}s/page)`);
  }

  // Build source/attribution line with category-specific emoji
  const sourceInfo: string[] = [];
  const getCategoryEmoji = (category?: string) => {
    switch (category) {
      case "ai-search": return "🤖";
      case "search": return "🔍";
      case "social": return "👥";
      case "email": return "📧";
      case "referral": return "🔗";
      default: return "📍";
    }
  };

  if (alert.utmCampaign) {
    sourceInfo.push(`📣 Campaign: ${alert.utmCampaign}`);
  }

  // Show source with category context
  if (alert.referrerDisplayName && alert.referrerSource !== "direct") {
    const categoryEmoji = getCategoryEmoji(alert.referrerCategory);
    sourceInfo.push(`${categoryEmoji} ${alert.referrerDisplayName}`);
  } else if (alert.referrerSource === "direct") {
    sourceInfo.push("🎯 Direct");
  }

  if (location) sourceInfo.push(`🌍 ${location}`);
  if (alert.device) sourceInfo.push(`💻 ${alert.device}`);

  // Build intent signals
  const intentSignals: string[] = [];
  if (highIntentPages.length > 0) {
    if (highIntentPages.some(p => p.includes("/contact"))) intentSignals.push("📞 Contact page");
    if (highIntentPages.some(p => p.includes("/case-studies"))) intentSignals.push("📚 Case studies");
    if (highIntentPages.some(p => p.includes("/assessment"))) intentSignals.push("📋 Assessment");
  }

  // Format timestamp in Chicago timezone
  const now = new Date();
  const chicagoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const timeStr = chicagoTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Chicago" });
  const chicagoHour = chicagoTime.getHours();
  const chicagoDay = chicagoTime.getDay();
  const isBusinessHours = chicagoHour >= 9 && chicagoHour < 18 && chicagoDay >= 1 && chicagoDay <= 5;

  const blocks: object[] = [
    // Header with tier, score, and quick assessment
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${emoji} *${alert.tier} Lead* — Score: *${alert.score}*\n${quickAssessment}`
      }
    }
  ];

  // Company callout if identified (prominent placement)
  if (alert.company) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `🏢 *${alert.company}*`
      }
    });
  }

  // Pages and entry point
  blocks.push({
    type: "section",
    fields: [
      { type: "mrkdwn", text: `*Current Page*\n${alert.currentPage}` },
      { type: "mrkdwn", text: `*Entry Page*\n${alert.entryPage || alert.pagesViewed[0] || "Unknown"}` }
    ]
  });

  // Add visitor context (visit #, duration, engagement quality)
  if (visitorContext.length > 0) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: visitorContext.join("  •  ") }]
    });
  }

  // Add source/location info
  if (sourceInfo.length > 0) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: sourceInfo.join("  •  ") }]
    });
  }

  // Add interest areas if identified
  if (interestAreas.length > 0) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: `*Interests:* ${interestAreas.join(", ")}` }]
    });
  }

  // Add high-intent signals if any
  if (intentSignals.length > 0) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: `*High Intent:* ${intentSignals.join("  ")}` }]
    });
  }

  // Add first-touch attribution for returning visitors
  if (alert.isReturning && alert.firstTouch) {
    const firstTouchInfo: string[] = [];

    // Calculate days since first visit
    if (alert.firstVisitDate) {
      const daysSinceFirst = Math.floor(
        (Date.now() - new Date(alert.firstVisitDate).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceFirst > 0) {
        firstTouchInfo.push(`First visited ${daysSinceFirst}d ago`);
      }
    }

    // Show original discovery source
    const originalSource = alert.firstTouch.utmSource || alert.firstTouch.source;
    if (originalSource && originalSource !== "direct") {
      const mediumLabel = alert.firstTouch.medium === "ai-search" ? "via AI search" :
                         alert.firstTouch.medium === "organic" ? "via search" :
                         alert.firstTouch.medium === "social" ? "via social" :
                         alert.firstTouch.medium === "email" ? "via email" :
                         `(${alert.firstTouch.medium})`;
      firstTouchInfo.push(`originally from *${originalSource}* ${mediumLabel}`);
    }

    // Show original landing page if different from entry page
    if (alert.firstTouch.landingPage && alert.firstTouch.landingPage !== alert.entryPage) {
      firstTouchInfo.push(`first landed on ${alert.firstTouch.landingPage}`);
    }

    if (firstTouchInfo.length > 0) {
      blocks.push({
        type: "context",
        elements: [{ type: "mrkdwn", text: `🧭 *First Touch:* ${firstTouchInfo.join(" • ")}` }]
      });
    }
  }

  // Divider before journey
  blocks.push({ type: "divider" });

  // Add journey
  blocks.push({
    type: "section",
    text: { type: "mrkdwn", text: `*Journey (${pageCount} pages)*\n\`${journeyText}\`` }
  });

  // Footer with full visitor ID and timestamp
  const footerParts: string[] = [];
  footerParts.push(`🕐 ${timeStr}${isBusinessHours ? "" : " (after hours)"}`);
  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: footerParts.join("  •  ") }]
  });

  // Full visitor ID on its own line for easy searching
  blocks.push({
    type: "context",
    elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }]
  });

  // Build preview text for mobile push notifications
  const previewParts = [`${emoji} ${alert.tier} Lead (${alert.score} pts)`];
  if (alert.company) previewParts.push(`from ${alert.company}`);
  else if (interestAreas.length > 0) previewParts.push(interestAreas[0]);
  previewParts.push(`on ${alert.currentPage}`);

  return {
    text: previewParts.join(" • "), // Shows in mobile push notifications
    attachments: [{
      color: tierColors[alert.tier] || "#d97706",
      blocks
    }]
  };
}

function formatCompanyMessage(alert: CompanyAlert): object {
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");
  const pageCount = alert.pagesViewed.length;

  const details: string[] = [];
  if (alert.companyDomain) details.push(`🔗 ${alert.companyDomain}`);
  if (alert.country) details.push(`🌍 ${alert.country}`);
  if (alert.leadScore) details.push(`📊 Score: ${alert.leadScore} (${alert.leadTier || "Cold"})`);

  // Format timestamp in Chicago timezone
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Chicago" });

  return {
    text: `🏢 Company: ${alert.companyName} on ${alert.currentPage}`, // Mobile preview
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
        { type: "divider" },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Journey (${pageCount} pages)*\n\`${journeyText}\`` }
        },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `🕐 ${timeStr}` }]
        },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }]
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

  // Format timestamp in Chicago timezone
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Chicago" });

  // Mobile preview
  const previewText = alert.company
    ? `✅ Conversion: ${conversionLabel} from ${alert.company}`
    : `✅ Conversion: ${conversionLabel} on ${alert.page}`;

  return {
    text: previewText,
    attachments: [{
      color: "#22c55e",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `✅ *New Conversion!*\n*${conversionLabel}*${alert.company ? ` from *${alert.company}*` : ""}`
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
        { type: "divider" },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `🕐 ${timeStr}` }]
        },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }]
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
// Force rebuild 1768366381
