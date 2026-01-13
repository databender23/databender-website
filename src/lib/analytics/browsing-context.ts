/**
 * Browsing Context for Chatbot
 *
 * Gathers visitor browsing patterns to help the chatbot provide
 * more relevant responses. Designed to be helpful, not creepy.
 *
 * The chatbot uses this as background context - it should never
 * explicitly mention "I see you've been browsing..." but can
 * naturally tailor responses based on apparent interests.
 */

import { getSessionJourney, getVisitCount, isReturningVisitor } from "./visitor-id";

export interface BrowsingContext {
  // Current state
  currentPage: string;

  // Session summary (not granular tracking)
  pagesVisitedCount: number;
  sessionDurationMinutes: number;

  // Interest signals (derived, not explicit)
  interests: {
    services: string[];    // Which service areas they've explored
    industries: string[];  // Which industry pages they've viewed
    hasViewedCaseStudies: boolean;
    hasViewedContact: boolean;
    hasStartedAssessment: boolean;
  };

  // Engagement level (general, not creepy)
  engagementLevel: "browsing" | "exploring" | "researching";

  // Visitor type
  isReturningVisitor: boolean;
  visitNumber: number;
}

/**
 * Detect which service areas the visitor has shown interest in
 */
function detectServiceInterests(pages: string[]): string[] {
  const interests: string[] = [];
  const pageStr = pages.join(" ");

  if (pageStr.includes("/services/ai") || pageStr.includes("/ai-services") || pageStr.includes("ai-automation")) {
    interests.push("AI & Automation");
  }
  if (pageStr.includes("/services/analytics") || pageStr.includes("/analytics-bi") || pageStr.includes("dashboard")) {
    interests.push("Analytics & BI");
  }
  if (pageStr.includes("/services/data-ai-strategy") || pageStr.includes("/strategy") || pageStr.includes("data-foundation")) {
    interests.push("Data Strategy");
  }

  return interests;
}

/**
 * Detect which industries the visitor has shown interest in
 */
function detectIndustryInterests(pages: string[]): string[] {
  const interests: string[] = [];
  const pageStr = pages.join(" ");

  if (pageStr.includes("/industries/legal") || pageStr.includes("/legal")) {
    interests.push("Legal");
  }
  if (pageStr.includes("/industries/healthcare") || pageStr.includes("/healthcare")) {
    interests.push("Healthcare");
  }
  if (pageStr.includes("/industries/manufacturing") || pageStr.includes("/manufacturing")) {
    interests.push("Manufacturing");
  }
  if (pageStr.includes("/industries/real-estate") || pageStr.includes("/commercial-real-estate")) {
    interests.push("Commercial Real Estate");
  }

  return interests;
}

/**
 * Determine engagement level based on behavior
 */
function determineEngagementLevel(pageCount: number, durationMinutes: number): BrowsingContext["engagementLevel"] {
  // Researching: 4+ pages OR 5+ minutes
  if (pageCount >= 4 || durationMinutes >= 5) {
    return "researching";
  }
  // Exploring: 2-3 pages OR 2-5 minutes
  if (pageCount >= 2 || durationMinutes >= 2) {
    return "exploring";
  }
  // Browsing: just arrived
  return "browsing";
}

/**
 * Get the current browsing context for the chatbot
 */
export function getBrowsingContext(): BrowsingContext {
  if (typeof window === "undefined") {
    return getEmptyContext();
  }

  const journey = getSessionJourney();
  const pages = journey.map(j => j.page);
  const currentPage = typeof window !== "undefined" ? window.location.pathname : "/";

  // Calculate session duration
  const sessionStart = journey.length > 0
    ? new Date(journey[0].timestamp).getTime()
    : Date.now();
  const durationMinutes = Math.round((Date.now() - sessionStart) / 1000 / 60);

  // Detect interests
  const serviceInterests = detectServiceInterests(pages);
  const industryInterests = detectIndustryInterests(pages);

  // Check high-intent pages
  const pageStr = pages.join(" ");
  const hasViewedCaseStudies = pageStr.includes("/case-studies");
  const hasViewedContact = pageStr.includes("/contact");
  const hasStartedAssessment = pageStr.includes("/assessment");

  return {
    currentPage,
    pagesVisitedCount: pages.length,
    sessionDurationMinutes: durationMinutes,
    interests: {
      services: serviceInterests,
      industries: industryInterests,
      hasViewedCaseStudies,
      hasViewedContact,
      hasStartedAssessment,
    },
    engagementLevel: determineEngagementLevel(pages.length, durationMinutes),
    isReturningVisitor: isReturningVisitor(),
    visitNumber: getVisitCount(),
  };
}

/**
 * Empty context for SSR
 */
function getEmptyContext(): BrowsingContext {
  return {
    currentPage: "/",
    pagesVisitedCount: 0,
    sessionDurationMinutes: 0,
    interests: {
      services: [],
      industries: [],
      hasViewedCaseStudies: false,
      hasViewedContact: false,
      hasStartedAssessment: false,
    },
    engagementLevel: "browsing",
    isReturningVisitor: false,
    visitNumber: 1,
  };
}

/**
 * Format context for the chatbot system prompt
 * This creates a natural, non-creepy summary for the AI
 */
export function formatContextForPrompt(context: BrowsingContext): string {
  const parts: string[] = [];

  // Visitor type
  if (context.isReturningVisitor) {
    if (context.visitNumber > 2) {
      parts.push(`This is a returning visitor (visit #${context.visitNumber}) - they're clearly interested and evaluating seriously.`);
    } else {
      parts.push("This is a returning visitor - they found the site interesting enough to come back.");
    }
  }

  // Current page context
  const page = context.currentPage;
  if (page.includes("/services/ai") || page.includes("/ai-services")) {
    parts.push("They're currently on the AI & Automation services page.");
  } else if (page.includes("/services/analytics") || page.includes("/analytics-bi")) {
    parts.push("They're currently on the Analytics & BI services page.");
  } else if (page.includes("/services/data-ai-strategy")) {
    parts.push("They're currently on the Data & AI Strategy page.");
  } else if (page.includes("/industries/legal")) {
    parts.push("They're currently on the Legal industry page.");
  } else if (page.includes("/industries/healthcare")) {
    parts.push("They're currently on the Healthcare industry page.");
  } else if (page.includes("/industries/manufacturing")) {
    parts.push("They're currently on the Manufacturing industry page.");
  } else if (page.includes("/case-studies")) {
    parts.push("They're currently looking at case studies - likely evaluating our results.");
  } else if (page.includes("/contact")) {
    parts.push("They're on the contact page - likely ready to reach out.");
  } else if (page.includes("/assessment")) {
    parts.push("They're taking an assessment - actively evaluating their needs.");
  }

  // Interest areas (if they've browsed multiple areas)
  if (context.interests.services.length > 0) {
    parts.push(`They've shown interest in: ${context.interests.services.join(", ")}.`);
  }
  if (context.interests.industries.length > 0) {
    parts.push(`They appear to be in the ${context.interests.industries.join(" or ")} industry.`);
  }

  // High-intent signals
  if (context.interests.hasViewedCaseStudies && context.interests.hasViewedContact) {
    parts.push("They've viewed case studies AND the contact page - strong buying signals.");
  } else if (context.interests.hasViewedCaseStudies) {
    parts.push("They've reviewed case studies - likely evaluating our track record.");
  }
  if (context.interests.hasStartedAssessment) {
    parts.push("They've started an assessment - actively evaluating their situation.");
  }

  // Engagement level
  if (context.engagementLevel === "researching") {
    parts.push("They've spent significant time on the site - serious research mode.");
  }

  if (parts.length === 0) {
    return ""; // No meaningful context yet
  }

  return `
## Visitor Context (use naturally, never mention explicitly)
${parts.join("\n")}

Use this context to tailor your responses - reference relevant services, use industry-appropriate examples, and match their apparent level of seriousness. But NEVER say things like "I see you've been browsing..." - that's creepy. Just naturally incorporate relevant information.`;
}
