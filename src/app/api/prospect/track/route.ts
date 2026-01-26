import { NextRequest, NextResponse } from "next/server";
import { getProspectPageBySlug } from "@/lib/prospect-pages-data";
import { UAParser } from "ua-parser-js";

/**
 * Prospect Page Tracking API
 *
 * Receives engagement events from prospect landing pages
 * and sends real-time Slack notifications.
 */

const SLACK_WEBHOOK_URL = process.env.SLACK_PROSPECT_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;

type ProspectEvent =
  | "page_opened"
  | "password_success"
  | "password_failure"
  | "scroll_50"
  | "scroll_100"
  | "section_viewed"
  | "time_2min"
  | "time_5min"
  | "cta_clicked"
  | "page_closed"
  | "return_visit";

interface TrackingPayload {
  slug: string;
  event: ProspectEvent;
  data?: {
    timestamp?: string;
    userAgent?: string;
    sessionId?: string;
    visitCount?: number;
    section?: string;
    attemptedPassword?: string;
    timeOnPageSeconds?: number;
    scrollDepth?: number;
    sectionsViewed?: string[];
  };
}

/**
 * Get device info from user agent
 */
function getDeviceInfo(userAgent: string): {
  deviceType: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
} {
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();
  const browser = parser.getBrowser();
  const os = parser.getOS();

  let deviceType: "mobile" | "desktop" | "tablet" = "desktop";
  if (device.type === "mobile") deviceType = "mobile";
  else if (device.type === "tablet") deviceType = "tablet";

  return {
    deviceType,
    browser: browser.name || "Unknown",
    os: os.name || "Unknown",
  };
}

/**
 * Get location from request headers (Vercel/Cloudflare)
 */
function getLocation(request: NextRequest): string {
  const city = request.headers.get("x-vercel-ip-city") || request.headers.get("cf-ipcity");
  const region = request.headers.get("x-vercel-ip-country-region") || request.headers.get("cf-region");
  const country = request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");

  if (city && region) return `${city}, ${region}`;
  if (city) return city;
  if (country) return country;
  return "Unknown";
}

/**
 * Format time duration
 */
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

/**
 * Get emoji for event type
 */
function getEventEmoji(event: ProspectEvent): string {
  const emojis: Record<ProspectEvent, string> = {
    page_opened: ":eyes:",
    password_success: ":unlock:",
    password_failure: ":x:",
    scroll_50: ":scroll:",
    scroll_100: ":checkered_flag:",
    section_viewed: ":mag:",
    time_2min: ":clock2:",
    time_5min: ":fire:",
    cta_clicked: ":calendar:",
    page_closed: ":wave:",
    return_visit: ":repeat:",
  };
  return emojis[event] || ":bell:";
}

/**
 * Build Slack message for each event type
 */
function buildSlackMessage(
  event: ProspectEvent,
  companyName: string,
  contactName: string,
  location: string,
  deviceInfo: { deviceType: string; browser: string; os: string },
  data?: TrackingPayload["data"]
): { text: string; blocks?: object[] } {
  const emoji = getEventEmoji(event);
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Chicago",
  });

  // Simple text fallback
  let text = `${emoji} ${companyName}: ${event}`;

  // Rich blocks for Slack
  const blocks: object[] = [];

  switch (event) {
    case "page_opened":
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${companyName}*\n\nSomeone just opened their assessment page`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Device:* ${deviceInfo.deviceType} (${deviceInfo.browser} on ${deviceInfo.os}) | *Location:* ${location} | *Time:* ${timestamp} CST`,
            },
          ],
        }
      );
      break;

    case "password_success":
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${companyName}*\n\n*${contactName}* unlocked their assessment`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Device:* ${deviceInfo.deviceType} | *Location:* ${location} | *Time:* ${timestamp} CST`,
            },
          ],
        }
      );
      text = `${emoji} ${contactName} unlocked the ${companyName} assessment`;
      break;

    case "password_failure":
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} *Failed password attempt* on ${companyName} assessment\n\nTried: \`${data?.attemptedPassword || "unknown"}\``,
        },
      });
      break;

    case "scroll_50":
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} *${contactName}* is halfway through the ${companyName} assessment`,
        },
      });
      break;

    case "scroll_100":
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} *${contactName}* finished scrolling the ${companyName} assessment`,
        },
      });
      break;

    case "section_viewed":
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} ${contactName} viewing: *"${data?.section || "Unknown section"}"*`,
        },
      });
      break;

    case "time_2min":
      blocks.push({
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${emoji} *${contactName}* has been reading for 2+ minutes`,
        },
      });
      break;

    case "time_5min":
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${contactName}* has been reading for 5+ minutes — *high engagement*`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `_Consider reaching out soon_`,
            },
          ],
        }
      );
      text = `${emoji} HIGH ENGAGEMENT: ${contactName} reading ${companyName} for 5+ minutes`;
      break;

    case "cta_clicked":
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${contactName} clicked "Schedule a Conversation"*\n\n:rotating_light: Follow up NOW`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Company:* ${companyName} | *Time:* ${timestamp} CST`,
            },
          ],
        }
      );
      text = `${emoji} CTA CLICKED: ${contactName} from ${companyName} wants to schedule!`;
      break;

    case "page_closed":
      const duration = data?.timeOnPageSeconds
        ? formatDuration(data.timeOnPageSeconds)
        : "Unknown";
      const scroll = data?.scrollDepth ?? 0;
      const sections = data?.sectionsViewed?.length ?? 0;

      let engagementScore = "LOW";
      if ((data?.timeOnPageSeconds ?? 0) > 180 && scroll >= 75) {
        engagementScore = "HIGH";
      } else if ((data?.timeOnPageSeconds ?? 0) > 60 && scroll >= 50) {
        engagementScore = "MEDIUM";
      }

      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *Session Complete: ${companyName}*`,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Viewer:*\n${contactName}` },
            { type: "mrkdwn", text: `*Duration:*\n${duration}` },
            { type: "mrkdwn", text: `*Scroll depth:*\n${scroll}%` },
            { type: "mrkdwn", text: `*Sections viewed:*\n${sections}` },
          ],
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Engagement score:* ${engagementScore}`,
            },
          ],
        }
      );
      text = `${emoji} Session complete: ${contactName} (${duration}, ${scroll}% scroll, ${engagementScore} engagement)`;
      break;

    case "return_visit":
      blocks.push(
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `${emoji} *${contactName}* is back on the ${companyName} assessment`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Visit #${data?.visitCount || 2}* | *Time:* ${timestamp} CST`,
            },
          ],
        }
      );
      text = `${emoji} RETURN VISIT: ${contactName} is back (visit #${data?.visitCount || 2})`;
      break;
  }

  return { text, blocks: blocks.length > 0 ? blocks : undefined };
}

/**
 * Send Slack notification
 */
async function sendSlackNotification(
  event: ProspectEvent,
  companyName: string,
  contactName: string,
  location: string,
  deviceInfo: { deviceType: string; browser: string; os: string },
  data?: TrackingPayload["data"]
): Promise<boolean> {
  if (!SLACK_WEBHOOK_URL) {
    console.log("Slack webhook not configured, skipping notification");
    return false;
  }

  const message = buildSlackMessage(
    event,
    companyName,
    contactName,
    location,
    deviceInfo,
    data
  );

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

/**
 * POST /api/prospect/track
 */
export async function POST(request: NextRequest) {
  try {
    // Parse body - handle both JSON and sendBeacon (text/plain)
    let payload: TrackingPayload;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      // sendBeacon sends as text/plain
      const text = await request.text();
      payload = JSON.parse(text);
    }

    const { slug, event, data } = payload;

    // Validate slug
    const page = getProspectPageBySlug(slug);
    if (!page) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    // Get device and location info
    const userAgent = data?.userAgent || request.headers.get("user-agent") || "";
    const deviceInfo = getDeviceInfo(userAgent);
    const location = getLocation(request);

    // Send Slack notification
    await sendSlackNotification(
      event,
      page.companyName,
      page.contactName,
      location,
      deviceInfo,
      data
    );

    // Log for debugging (remove in production)
    console.log(`[Prospect Track] ${page.companyName}: ${event}`, {
      location,
      device: deviceInfo.deviceType,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Prospect tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
