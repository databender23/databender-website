import { promises as fs } from "fs";
import path from "path";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatLogEntry {
  sessionId: string;
  timestamp: string;
  messages: ChatMessage[];
  messageCount: number;
  userAgent?: string;
}

const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "chat-logs.json");

/**
 * Ensure the logs directory exists
 */
async function ensureLogDir(): Promise<void> {
  try {
    await fs.access(LOG_DIR);
  } catch {
    await fs.mkdir(LOG_DIR, { recursive: true });
  }
}

/**
 * Log a chat conversation to file
 */
export async function logConversation(
  sessionId: string,
  messages: ChatMessage[],
  userAgent?: string
): Promise<void> {
  try {
    await ensureLogDir();

    const entry: ChatLogEntry = {
      sessionId,
      timestamp: new Date().toISOString(),
      messages,
      messageCount: messages.filter((m) => m.role === "user").length,
      userAgent,
    };

    // Read existing logs
    let logs: ChatLogEntry[] = [];
    try {
      const existing = await fs.readFile(LOG_FILE, "utf-8");
      logs = JSON.parse(existing);
    } catch {
      // File doesn't exist yet, start fresh
    }

    // Update or add entry for this session
    const existingIndex = logs.findIndex((l) => l.sessionId === sessionId);
    if (existingIndex >= 0) {
      logs[existingIndex] = entry;
    } else {
      logs.push(entry);
    }

    // Keep only last 1000 conversations to prevent file bloat
    if (logs.length > 1000) {
      logs = logs.slice(-1000);
    }

    await fs.writeFile(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Failed to log conversation:", error);
  }
}

/**
 * Send email digest of a conversation via AWS SES
 * Supports both:
 * - IAM roles (when deployed on AWS Amplify) - no credentials needed
 * - Explicit credentials via env vars (for local development)
 */
export async function sendConversationDigest(
  sessionId: string,
  messages: ChatMessage[],
  trigger: "limit_reached" | "lead_detected"
): Promise<void> {
  const awsRegion = process.env.SES_REGION || process.env.AWS_REGION || "us-east-1";
  const fromEmail = process.env.SES_FROM_EMAIL || "notifications@databender.co";
  const notifyEmail = process.env.CHAT_NOTIFY_EMAIL || "info@databender.co";

  // Skip if explicitly disabled
  if (process.env.DISABLE_CHAT_EMAILS === "true") {
    return;
  }

  try {
    // Use explicit credentials if provided, otherwise use default credential chain
    // (IAM roles on Amplify, ~/.aws/credentials locally, etc.)
    const clientConfig: { region: string; credentials?: { accessKeyId: string; secretAccessKey: string } } = {
      region: awsRegion,
    };

    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      clientConfig.credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      };
    }

    const sesClient = new SESClient(clientConfig);

    const userMessages = messages.filter((m) => m.role === "user");
    const conversationHtml = messages
      .map(
        (m) =>
          `<p><strong>${m.role === "user" ? "Visitor" : "Bot"}:</strong> ${m.content}</p>`
      )
      .join("");

    const subject =
      trigger === "limit_reached"
        ? `Chat Limit Reached - ${userMessages.length} questions`
        : `Potential Lead Detected in Chat`;

    const htmlBody = `
      <h2>Chat Conversation Digest</h2>
      <p><strong>Session ID:</strong> ${sessionId}</p>
      <p><strong>Trigger:</strong> ${trigger === "limit_reached" ? "Question limit reached" : "Lead detected"}</p>
      <p><strong>Total messages:</strong> ${messages.length}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <hr />
      <h3>Conversation:</h3>
      ${conversationHtml}
    `;

    const command = new SendEmailCommand({
      Source: `Databender Chat <${fromEmail}>`,
      Destination: {
        ToAddresses: [notifyEmail],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: "UTF-8",
          },
        },
      },
    });

    await sesClient.send(command);
    console.log(`Email digest sent for session ${sessionId}`);
  } catch (error) {
    console.error("Failed to send email digest:", error);
  }
}

/**
 * Check if conversation contains lead indicators
 */
export function detectLeadIndicators(messages: ChatMessage[]): boolean {
  const leadKeywords = [
    "email",
    "contact",
    "phone",
    "call me",
    "reach out",
    "schedule",
    "meeting",
    "consultation",
    "demo",
    "pricing",
    "cost",
    "quote",
    "proposal",
    "@", // email in message
  ];

  const allContent = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase())
    .join(" ");

  return leadKeywords.some((keyword) => allContent.includes(keyword));
}

/**
 * Send Slack notification for chat events
 */
export async function sendSlackNotification(
  sessionId: string,
  messages: ChatMessage[],
  trigger: "limit_reached" | "lead_detected"
): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  try {
    const userMessages = messages.filter((m) => m.role === "user");
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || "N/A";

    // Truncate conversation for Slack (last 6 messages)
    const recentMessages = messages.slice(-6);
    const conversationText = recentMessages
      .map((m) => `*${m.role === "user" ? "Visitor" : "Bot"}:* ${m.content}`)
      .join("\n");

    const emoji = trigger === "lead_detected" ? ":fire:" : ":speech_balloon:";
    const title = trigger === "lead_detected"
      ? "Potential Lead Detected!"
      : `Chat Limit Reached (${userMessages.length} questions)`;

    const payload = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `${emoji} ${title}`,
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Session:*\n\`${sessionId.slice(0, 20)}...\``,
            },
            {
              type: "mrkdwn",
              text: `*Messages:*\n${messages.length} total`,
            },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Last question:*\n> ${lastUserMessage.slice(0, 200)}${lastUserMessage.length > 200 ? "..." : ""}`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Recent conversation:*\n${conversationText.slice(0, 2500)}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Sent from Databender Chat | ${new Date().toLocaleString()}`,
            },
          ],
        },
      ],
    };

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log(`Slack notification sent for session ${sessionId}`);
  } catch (error) {
    console.error("Failed to send Slack notification:", error);
  }
}
