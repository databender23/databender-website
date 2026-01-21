import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  logConversation,
  sendConversationDigest,
  detectLeadIndicators,
  sendSlackNotification,
} from "@/lib/chat-logger";
import {
  formatContextForPrompt,
  type BrowsingContext,
} from "@/lib/analytics/browsing-context";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

const SYSTEM_PROMPT = `You are the Databender AI assistant. Be friendly, knowledgeable, and conversational—like talking to a helpful colleague who happens to know a lot about data and AI.

## About Databender
"Senior expertise. AI-powered speed."

Databender is an AI-first data analytics and AI consultancy founded by Grant Bender. We help mid-market companies ($10M-$500M revenue) transform their data and implement AI that actually works.

**Why companies choose us:**
- **AI-Augmented Team**: Every consultant uses AI in their workflow. Senior expertise + AI efficiency = enterprise-quality at a fraction of traditional consulting costs.
- **AI That Works**: Most AI projects fail on bad data. Ours don't—because we fix the data first.
- **From Insight to Action**: We don't stop at reports. Insights wire into daily operations—automated alerts, triggered workflows, decisions that happen automatically.
- **Regulated-Ready**: HIPAA, GDPR, SOC 2 compliance built in from day one. Healthcare, legal, finance—we know what auditors look for.

## Services

### Data & AI Strategy (Get the data right)
- **Data Foundation**: Data warehouse, pipelines, governance—built so you're not redoing it in a year
- **Data Integration**: Connect CRM, ERP, and everything else into one unified view
- **AI-Powered Data Cleanup**: Fix duplicates, standardize formats at 125x less cost than manual review
- **AI Readiness Assessment**: Clear picture of what's realistic and where quick wins are
- **AI Roadmapping**: Prioritize by ROI and feasibility, with quarterly milestones
- **AI Governance & Compliance**: Bias monitoring, audit trails, explainability for regulated industries

### Analytics & BI (See what's happening)
- **Custom Applications**: Visual applications that answer your real questions—KPIs, trends, drill-downs
- **Agentic Research**: AI agents that gather, analyze, and synthesize information from multiple sources
- **Operational Visibility**: Real-time views into daily operations with live monitoring and alerts
- **Predictive Analytics**: Demand planning, churn prediction, resource optimization you can trust
- **Managed Data Pipelines**: Reliable, automated data flows we build and maintain
- **Custom Analytical Applications**: Purpose-built tools for your specific workflows

### AI & Automation (Work smarter with AI)
- **Natural Language BI**: Ask questions in plain English, get accurate answers—no SQL required
- **Local LLM Integrations**: AI that stays on your servers—data never leaves for privacy-sensitive industries
- **Knowledge Management**: AI-powered search across documents, emails, systems
- **AI Enablement**: Custom AI for your specific workflows—document processing to decision automation
- **AI Agents & Automation**: Autonomous agents for research, customer service, data processing
- **RAG & Knowledge Systems**: Turn documents into answerable knowledge with sourced answers
- **Conversational AI**: Internal assistants and customer-facing chatbots powered by your data
- **Document Intelligence**: AI extraction from contracts, invoices, medical records, legal docs
- **Staff AI Augmentation**: Reduce repetitive work so employees can do more with less

## Industries We Serve

### Legal
Challenges: Associates spending 60% of time on non-legal work, knowledge walking out when partners retire, losing pitches to better-informed competitors
Solutions: Knowledge that stays (every precedent searchable forever), AI that stays in-house (privilege intact), due diligence in days not weeks, client intelligence across all touchpoints

### Healthcare
Challenges: More time on paperwork than patients, underpaid on payer contracts, AI tools wanting data in the cloud
Solutions: AI that stays on-premises (PHI never leaves), know what competitors get paid (price transparency analysis), modern data layer over legacy EHR, document intelligence for intake

### Commercial Real Estate
Challenges: Paying brokers for deal flow everyone sees, messy public data, owners hiding behind LLCs
Solutions: Ownership intelligence (track through LLCs and trusts), deal scoring (which properties to call first), document intelligence for data rooms, AI that protects your competitive edge

### Manufacturing
Challenges: Three phone calls to answer "how many truckloads shipped?", Salesforce can't show what's in production
Solutions: Systems that finally talk (CRM + ERP + production in one view), lead scoring, customer reorder prediction, talk to your data in plain English

## Proven Results (Case Studies)
- **125x cost savings**: AI entity resolution cleaned 1.69M broken records that would've taken 50 analysts months
- **31% higher success rate**: Custom lead scoring vs. standard CRM tools—discovered property value was actually a negative predictor
- **Instant AI answers**: Transformed decades of institutional knowledge (1000s of documents from 70+ manufacturers) into searchable AI knowledge base

## Your Role
1. Answer questions about Databender clearly and helpfully
2. Help visitors understand which services fit their situation
3. Qualify leads by learning about their industry, company size, challenges, and timeline
4. When ready to schedule: use this markdown link format: [Schedule with Grant](${BOOKING_URL})
5. If they prefer to be contacted: collect name, email, and briefly summarize their needs

## Guidelines
- Keep responses concise (2-4 sentences usually)—more detail only if they ask
- Be honest about what's realistic—don't oversell
- If you don't know something, say so and offer to connect them with the team
- For pricing: it varies by scope, suggest a consultation to scope it out
- Be conversational and natural, not robotic or salesy
- Use the case study metrics when relevant ("we've seen 125x cost savings on data cleanup projects")
- Match your language to theirs—technical with technical folks, plain English with executives
- Always use markdown link syntax for URLs: [link text](url) — never paste raw URLs`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  sessionId?: string;
  browsingContext?: BrowsingContext;
}

// Token limits
const MAX_INPUT_CHARS = 2000; // ~500 tokens per message
const MAX_CONVERSATION_CHARS = 8000; // ~2000 tokens total conversation
const MAX_OUTPUT_TOKENS = 300; // Keep responses concise

// Question limit for triggering email digest
const QUESTION_LIMIT = 10;

// Bot detection patterns
const BOT_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /axios/i,
  /node-fetch/i,
  /go-http-client/i,
  /postman/i,
  /insomnia/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /telegrambot/i,
  /discordbot/i,
  /slackbot/i,
  /applebot/i,
  /semrush/i,
  /ahrefs/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /bytespider/i,
  /headless/i,
  /phantom/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
];

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // No user agent = suspicious
  return BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

// Rate limiting is now handled by @/lib/rate-limit (Upstash Redis with in-memory fallback)

// ===========================================
// ORIGIN VALIDATION
// ===========================================
const ALLOWED_ORIGINS = [
  "https://databender.co",
  "https://www.databender.co",
  "http://localhost:3000",
  "http://localhost:3001",
];

function isValidOrigin(origin: string | null, referer: string | null): boolean {
  // In development, allow requests without origin (e.g., direct browser testing)
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  // Check origin header
  if (origin && ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))) {
    return true;
  }

  // Fallback to referer header
  if (referer && ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed))) {
    return true;
  }

  return false;
}

// ===========================================
// PROMPT INJECTION FILTER
// ===========================================
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /forget\s+(all\s+)?(previous|prior|above)/i,
  /you\s+are\s+now\s+(a|an|the)/i,
  /new\s+instructions?:/i,
  /system\s*:/i,
  /\[system\]/i,
  /\[inst\]/i,
  /\<\|system\|\>/i,
  /\<\|assistant\|\>/i,
  /pretend\s+(you('re|are)|to\s+be)/i,
  /act\s+as\s+(if|though|a|an)/i,
  /roleplay\s+as/i,
  /jailbreak/i,
  /dan\s+mode/i,
  /developer\s+mode/i,
  /bypass\s+(your|the|all)\s+(restrictions|rules|filters)/i,
  /override\s+(your|the|all)\s+(instructions|programming)/i,
];

function containsInjection(text: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

// ===========================================
// DAILY COST CAP
// ===========================================
const DAILY_REQUEST_LIMIT = 500; // Adjust based on your budget
let dailyRequestCount = 0;
let lastResetDate = new Date().toDateString();

function isDailyLimitReached(): boolean {
  const today = new Date().toDateString();

  // Reset counter at midnight
  if (today !== lastResetDate) {
    dailyRequestCount = 0;
    lastResetDate = today;
  }

  return dailyRequestCount >= DAILY_REQUEST_LIMIT;
}

function incrementDailyCount(): void {
  dailyRequestCount++;
}

// ===========================================
// MAIN HANDLER
// ===========================================
export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("user-agent");
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const ip = getClientIp(request);

    // 1. Block bots
    if (isBot(userAgent)) {
      return NextResponse.json(
        { error: "Service unavailable" },
        { status: 403 }
      );
    }

    // 2. Validate origin (production only)
    if (!isValidOrigin(origin, referer)) {
      return NextResponse.json(
        { error: "Invalid request origin" },
        { status: 403 }
      );
    }

    // 3. Check rate limit (Upstash Redis with in-memory fallback)
    const rateLimitResult = await checkRateLimit("chat", ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
            ...(rateLimitResult.reset && {
              "X-RateLimit-Reset": String(rateLimitResult.reset),
            }),
          },
        }
      );
    }

    // 4. Check daily cost cap
    if (isDailyLimitReached()) {
      return NextResponse.json(
        { error: "Chat service temporarily unavailable. Please try again tomorrow or contact us directly." },
        { status: 503 }
      );
    }

    const body: ChatRequest = await request.json();
    const { messages, sessionId = `session-${Date.now()}`, browsingContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Validate last user message length
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.content?.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: "Message too long. Please keep it under 2000 characters." },
        { status: 400 }
      );
    }

    // Calculate total conversation length
    const totalChars = messages.reduce((sum, m) => sum + (m.content?.length || 0), 0);
    if (totalChars > MAX_CONVERSATION_CHARS) {
      return NextResponse.json(
        { error: "Conversation too long. Please start a new chat." },
        { status: 400 }
      );
    }

    // 5. Check for prompt injection attempts
    const userMessages = messages.filter((m) => m.role === "user");
    const hasInjection = userMessages.some((m) => containsInjection(m.content));
    if (hasInjection) {
      console.warn(`Prompt injection attempt blocked from IP: ${ip}`);
      return NextResponse.json(
        { error: "Invalid message content" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY not configured");
      return NextResponse.json(
        { error: "Chat service not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // Filter to only user and assistant messages, skip the welcome message
    const conversationMessages = messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, MAX_INPUT_CHARS), // Enforce limit
      }));

    // Build system prompt with browsing context if available
    const contextAddition = browsingContext ? formatContextForPrompt(browsingContext) : "";
    const fullSystemPrompt = SYSTEM_PROMPT + contextAddition;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: MAX_OUTPUT_TOKENS,
      system: fullSystemPrompt,
      messages: conversationMessages,
    });

    const textContent = response.content.find((block) => block.type === "text");
    const content = textContent && "text" in textContent ? textContent.text : "";

    // Increment daily counter after successful API call
    incrementDailyCount();

    // Build complete conversation for logging
    const fullConversation = [...conversationMessages, { role: "assistant" as const, content }];
    const userMessageCount = fullConversation.filter((m) => m.role === "user").length;

    // Log conversation to file
    await logConversation(sessionId, fullConversation, userAgent || undefined);

    // Send notifications if limit reached
    if (userMessageCount >= QUESTION_LIMIT) {
      await Promise.all([
        sendConversationDigest(sessionId, fullConversation, "limit_reached"),
        sendSlackNotification(sessionId, fullConversation, "limit_reached"),
      ]);
    }
    // Or if lead indicators detected (check every 3 messages to avoid spam)
    else if (userMessageCount >= 3 && userMessageCount % 3 === 0) {
      if (detectLeadIndicators(fullConversation)) {
        await Promise.all([
          sendConversationDigest(sessionId, fullConversation, "lead_detected"),
          sendSlackNotification(sessionId, fullConversation, "lead_detected"),
        ]);
      }
    }

    return NextResponse.json({ content, sessionId }, { status: 200 });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
