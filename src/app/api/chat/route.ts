import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import {
  logConversation,
  sendConversationDigest,
  detectLeadIndicators,
} from "@/lib/chat-logger";

const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com";

const SYSTEM_PROMPT = `You are the DataBender AI assistant, helping visitors learn about DataBender's data and AI consulting services. Be friendly, professional, and helpful.

## About DataBender
DataBender helps mid-market companies (typically $10M-$500M revenue) transform their data into actionable insights and implement AI solutions that actually work.

## Services

### Data & AI Strategy
Build a solid data foundation, assess AI readiness, and create actionable roadmaps:
- Data Foundation: Build infrastructure that scales—data warehouse, pipelines, governance
- Data Integration: Connect all systems into one unified view (CRM, ERP, etc.)
- AI-Powered Data Cleanup: Intelligent cleaning at 125x less cost than manual review
- AI Readiness Assessment: Evaluate infrastructure, capabilities, and readiness
- AI Roadmapping: Prioritize AI initiatives based on ROI and feasibility
- AI Governance & Compliance: Responsible AI for regulated industries

### Analytics & BI
Visual dashboards, real-time visibility, and predictive insights:
- Dashboards: Visual dashboards that answer your real questions
- Agentic Research: AI agents that gather and synthesize information
- Operational Visibility: Real-time views into daily operations
- Predictive Analytics: Forecasts you can trust—demand planning, churn prediction
- Managed Data Pipelines: Reliable, automated data flows
- Custom Analytical Applications: Purpose-built tools for your workflows

### AI Services & Automation
AI enablement, knowledge management, and natural language interfaces:
- Natural Language BI: Ask questions in plain English, get accurate answers
- Local LLM Integrations: AI that stays on your servers for privacy
- Knowledge Management: AI-powered search across documents and systems
- AI Agents & Automation: Autonomous agents for research, customer service, workflows
- RAG & Knowledge Systems: Turn documents into answerable knowledge
- Conversational AI: Internal assistants and customer-facing chatbots
- Document Intelligence: AI extraction from contracts, invoices, legal docs

## Industries Served
- Legal: Knowledge management, client intelligence, business development for law firms
- Healthcare: Operational visibility, multi-location analytics, compliance
- Commercial Real Estate: Portfolio intelligence, tenant analytics, due diligence
- Manufacturing: Sales intelligence, production visibility, operational analytics

## Your Role
1. Answer questions about DataBender's services clearly and helpfully
2. Help visitors understand which services might help their situation
3. Qualify leads by understanding their:
   - Industry and company size
   - Current challenges with data/analytics/AI
   - Timeline and priorities
4. When someone wants to schedule a consultation, provide this booking link: ${BOOKING_URL}
5. If they prefer to be contacted, collect their name, email, and briefly summarize their needs

## Guidelines
- Keep responses concise but helpful (2-4 sentences usually)
- Don't oversell—be honest about what's realistic
- If you don't know something, say so and offer to connect them with the team
- For pricing questions: explain that it varies by scope and suggest a consultation
- Be conversational, not robotic`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  sessionId?: string;
}

// Token limits
const MAX_INPUT_CHARS = 2000; // ~500 tokens per message
const MAX_CONVERSATION_CHARS = 8000; // ~2000 tokens total conversation
const MAX_OUTPUT_TOKENS = 300; // Keep responses concise

// Question limit for triggering email digest
const QUESTION_LIMIT = 10;

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, sessionId = `session-${Date.now()}` } = body;
    const userAgent = request.headers.get("user-agent") || undefined;

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

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: MAX_OUTPUT_TOKENS,
      system: SYSTEM_PROMPT,
      messages: conversationMessages,
    });

    const textContent = response.content.find((block) => block.type === "text");
    const content = textContent && "text" in textContent ? textContent.text : "";

    // Build complete conversation for logging
    const fullConversation = [...conversationMessages, { role: "assistant" as const, content }];
    const userMessageCount = fullConversation.filter((m) => m.role === "user").length;

    // Log conversation to file
    await logConversation(sessionId, fullConversation, userAgent);

    // Send email digest if limit reached
    if (userMessageCount >= QUESTION_LIMIT) {
      await sendConversationDigest(sessionId, fullConversation, "limit_reached");
    }
    // Or if lead indicators detected (check every 3 messages to avoid spam)
    else if (userMessageCount >= 3 && userMessageCount % 3 === 0) {
      if (detectLeadIndicators(fullConversation)) {
        await sendConversationDigest(sessionId, fullConversation, "lead_detected");
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
