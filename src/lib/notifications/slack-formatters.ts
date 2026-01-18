/**
 * Slack Message Formatters
 *
 * Formatting functions for Slack Block Kit messages.
 * Separated from main slack.ts for better organization.
 */

import type { LeadAlert, CompanyAlert, ConversionAlert } from "./slack-types";
import {
  TIER_COLORS,
  CONFIDENCE_COLORS,
  SOURCE_LABELS,
  CONFIDENCE_LABELS,
} from "./slack-types";

/**
 * Get emoji for lead tier
 */
export function getTierEmoji(tier: string): string {
  switch (tier) {
    case "Very Hot": return "🔥🔥";
    case "Hot": return "🔥";
    case "Warm": return "♨️";
    default: return "📊";
  }
}

/**
 * Get emoji for referrer category
 */
function getCategoryEmoji(category?: string): string {
  switch (category) {
    case "ai-search": return "🤖";
    case "search": return "🔍";
    case "social": return "👥";
    case "email": return "📧";
    case "referral": return "🔗";
    default: return "📍";
  }
}

/**
 * Format timestamp in Chicago timezone
 */
function getChicagoTime(): { timeStr: string; isBusinessHours: boolean } {
  const now = new Date();
  const chicagoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
  const timeStr = chicagoTime.toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "America/Chicago"
  });
  const chicagoHour = chicagoTime.getHours();
  const chicagoDay = chicagoTime.getDay();
  const isBusinessHours = chicagoHour >= 9 && chicagoHour < 18 && chicagoDay >= 1 && chicagoDay <= 5;
  return { timeStr, isBusinessHours };
}

/**
 * Format lead alert as Slack Block Kit message
 */
export function formatLeadMessage(alert: LeadAlert): object {
  const emoji = getTierEmoji(alert.tier);
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");
  const { timeStr, isBusinessHours } = getChicagoTime();

  // Build location string
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

  // Calculate engagement quality
  const pageCount = alert.pagesViewed.length;
  const timePerPage = alert.sessionDuration && pageCount > 0
    ? Math.round(alert.sessionDuration / pageCount) : null;
  const engagementQuality = timePerPage
    ? timePerPage >= 60 ? "Deep reading" : timePerPage >= 30 ? "Engaged" : "Quick scan"
    : null;

  // Identify interest areas
  const interestAreas: string[] = [];
  const pages = alert.pagesViewed.join(" ");
  if (pages.includes("/services/ai") || pages.includes("/ai-services")) interestAreas.push("AI & Automation");
  if (pages.includes("/services/analytics") || pages.includes("/analytics-bi")) interestAreas.push("Analytics/BI");
  if (pages.includes("/services/data-ai-strategy") || pages.includes("/strategy")) interestAreas.push("Data Strategy");
  if (pages.includes("/industries/legal") || pages.includes("/legal")) interestAreas.push("Legal");
  if (pages.includes("/industries/healthcare") || pages.includes("/healthcare")) interestAreas.push("Healthcare");
  if (pages.includes("/industries/manufacturing") || pages.includes("/manufacturing")) interestAreas.push("Manufacturing");

  // Identify high-intent pages
  const highIntentPages = alert.pagesViewed.filter(p =>
    p.includes("/contact") || p.includes("/case-studies") || p.includes("/assessment")
  );

  // Build quick assessment
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
  if (interestAreas.length > 0) assessmentParts.push(`interested in ${interestAreas[0]}`);
  const quickAssessment = assessmentParts.length > 0
    ? assessmentParts.join(", ")
    : `${pageCount} pages in ${duration || "this session"}`;

  // Build visitor context
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

  // Build source info
  const sourceInfo: string[] = [];
  if (alert.utmCampaign) sourceInfo.push(`📣 Campaign: ${alert.utmCampaign}`);
  if (alert.referrerDisplayName && alert.referrerSource !== "direct") {
    sourceInfo.push(`${getCategoryEmoji(alert.referrerCategory)} ${alert.referrerDisplayName}`);
  } else if (alert.referrerSource === "direct") {
    sourceInfo.push("🎯 Direct");
  }
  if (location) sourceInfo.push(`🌍 ${location}`);
  if (alert.device) sourceInfo.push(`💻 ${alert.device}`);

  // Build intent signals
  const intentSignals: string[] = [];
  if (highIntentPages.some(p => p.includes("/contact"))) intentSignals.push("📞 Contact page");
  if (highIntentPages.some(p => p.includes("/case-studies"))) intentSignals.push("📚 Case studies");
  if (highIntentPages.some(p => p.includes("/assessment"))) intentSignals.push("📋 Assessment");

  // Build blocks
  const blocks: object[] = [
    { type: "section", text: { type: "mrkdwn", text: `${emoji} *${alert.tier} Lead* | Score: *${alert.score}*\n${quickAssessment}` } }
  ];

  if (alert.company) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: `🏢 *${alert.company}*` } });
  }

  blocks.push({
    type: "section",
    fields: [
      { type: "mrkdwn", text: `*Current Page*\n${alert.currentPage}` },
      { type: "mrkdwn", text: `*Entry Page*\n${alert.entryPage || alert.pagesViewed[0] || "Unknown"}` }
    ]
  });

  if (visitorContext.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: visitorContext.join("  •  ") }] });
  }
  if (sourceInfo.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: sourceInfo.join("  •  ") }] });
  }
  if (interestAreas.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `*Interests:* ${interestAreas.join(", ")}` }] });
  }
  if (intentSignals.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `*High Intent:* ${intentSignals.join("  ")}` }] });
  }

  // First-touch attribution
  if (alert.isReturning && alert.firstTouch) {
    const firstTouchInfo: string[] = [];
    if (alert.firstVisitDate) {
      const daysSinceFirst = Math.floor((Date.now() - new Date(alert.firstVisitDate).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceFirst > 0) firstTouchInfo.push(`First visited ${daysSinceFirst}d ago`);
    }
    const originalSource = alert.firstTouch.utmSource || alert.firstTouch.source;
    if (originalSource && originalSource !== "direct") {
      const mediumLabel = alert.firstTouch.medium === "ai-search" ? "via AI search" :
                         alert.firstTouch.medium === "organic" ? "via search" :
                         alert.firstTouch.medium === "social" ? "via social" :
                         alert.firstTouch.medium === "email" ? "via email" : `(${alert.firstTouch.medium})`;
      firstTouchInfo.push(`originally from *${originalSource}* ${mediumLabel}`);
    }
    if (alert.firstTouch.landingPage && alert.firstTouch.landingPage !== alert.entryPage) {
      firstTouchInfo.push(`first landed on ${alert.firstTouch.landingPage}`);
    }
    if (firstTouchInfo.length > 0) {
      blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `🧭 *First Touch:* ${firstTouchInfo.join(" • ")}` }] });
    }
  }

  blocks.push({ type: "divider" });
  blocks.push({ type: "section", text: { type: "mrkdwn", text: `*Journey (${pageCount} pages)*\n\`${journeyText}\`` } });
  blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `🕐 ${timeStr}${isBusinessHours ? "" : " (after hours)"}` }] });
  blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }] });

  // Preview text
  const previewParts = [`${emoji} ${alert.tier} Lead (${alert.score} pts)`];
  if (alert.company) previewParts.push(`from ${alert.company}`);
  else if (interestAreas.length > 0) previewParts.push(interestAreas[0]);
  previewParts.push(`on ${alert.currentPage}`);

  return {
    text: previewParts.join(" • "),
    attachments: [{ color: TIER_COLORS[alert.tier] || "#d97706", blocks }]
  };
}

/**
 * Format company alert as Slack Block Kit message
 */
export function formatCompanyMessage(alert: CompanyAlert): object {
  const journeyText = alert.pagesViewed.slice(-5).join(" → ");
  const pageCount = alert.pagesViewed.length;
  const { timeStr } = getChicagoTime();
  const alertColor = CONFIDENCE_COLORS[alert.confidence || "medium"] || "#3b82f6";

  const getConfidenceBadge = () => {
    const source = SOURCE_LABELS[alert.identificationSource || "reverse_dns"] || "Unknown";
    const conf = CONFIDENCE_LABELS[alert.confidence || "low"] || "";
    return `${source} • ${conf}`;
  };

  // Build header
  let headerText = `🏢 *Company Identified*\n*${alert.companyName}*`;
  if (alert.personName) {
    headerText = `👤 *Person Identified*\n*${alert.personName}*`;
    if (alert.jobTitle) headerText += `\n${alert.jobTitle}`;
    headerText += `\n🏢 ${alert.companyName}`;
  }

  const blocks: object[] = [{ type: "section", text: { type: "mrkdwn", text: headerText } }];

  if (alert.linkedInUrl) {
    blocks.push({ type: "section", text: { type: "mrkdwn", text: `🔗 <${alert.linkedInUrl}|View LinkedIn Profile>` } });
  }
  if (alert.personEmail) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `📧 ${alert.personEmail}` }] });
  }

  const companyDetails: string[] = [];
  if (alert.companyDomain) companyDetails.push(`🔗 ${alert.companyDomain}`);
  if (alert.industry) companyDetails.push(`🏭 ${alert.industry}`);
  if (alert.employeeCount) companyDetails.push(`👥 ${alert.employeeCount} employees`);
  if (companyDetails.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: companyDetails.join("  •  ") }] });
  }

  const details: string[] = [];
  if (alert.country) details.push(`🌍 ${alert.country}`);
  if (alert.leadScore) details.push(`📊 Score: ${alert.leadScore} (${alert.leadTier || "Cold"})`);
  if (details.length > 0) {
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: details.join("  •  ") }] });
  }

  blocks.push({
    type: "section",
    fields: [
      { type: "mrkdwn", text: `*Current Page*\n${alert.currentPage}` },
      { type: "mrkdwn", text: `*Lead Tier*\n${alert.leadTier || "Cold"}` }
    ]
  });

  blocks.push({ type: "divider" });
  blocks.push({ type: "section", text: { type: "mrkdwn", text: `*Journey (${pageCount} pages)*\n\`${journeyText}\`` } });
  blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `🔍 ${getConfidenceBadge()}  •  🕐 ${timeStr}` }] });
  blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }] });

  let previewText = `🏢 Company: ${alert.companyName}`;
  if (alert.personName) previewText = `👤 ${alert.personName} (${alert.companyName})`;
  previewText += ` on ${alert.currentPage}`;

  return { text: previewText, attachments: [{ color: alertColor, blocks }] };
}

/**
 * Format conversion alert as Slack Block Kit message
 */
export function formatConversionMessage(alert: ConversionAlert): object {
  const conversionLabel = alert.conversionType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const { timeStr } = getChicagoTime();

  const details: string[] = [];
  if (alert.company) details.push(`🏢 ${alert.company}`);
  if (alert.leadScore) details.push(`📊 Score: ${alert.leadScore}`);
  if (alert.journeyLength) details.push(`📄 ${alert.journeyLength} pages visited`);

  const previewText = alert.company
    ? `✅ Conversion: ${conversionLabel} from ${alert.company}`
    : `✅ Conversion: ${conversionLabel} on ${alert.page}`;

  return {
    text: previewText,
    attachments: [{
      color: "#22c55e",
      blocks: [
        { type: "section", text: { type: "mrkdwn", text: `✅ *New Conversion!*\n*${conversionLabel}*${alert.company ? ` from *${alert.company}*` : ""}` } },
        { type: "section", fields: [{ type: "mrkdwn", text: `*Page*\n${alert.page}` }, { type: "mrkdwn", text: `*Type*\n${conversionLabel}` }] },
        ...(details.length > 0 ? [{ type: "context", elements: [{ type: "mrkdwn", text: details.join("  •  ") }] }] : []),
        { type: "divider" },
        { type: "context", elements: [{ type: "mrkdwn", text: `🕐 ${timeStr}` }] },
        { type: "context", elements: [{ type: "mrkdwn", text: `🔑 Visitor ID: \`${alert.visitorId}\`` }] }
      ]
    }]
  };
}
