import { v4 as uuidv4 } from "uuid";

const VISITOR_ID_KEY = "db_visitor_id";
const SESSION_ID_KEY = "db_session_id";
const SESSION_EXPIRY_KEY = "db_session_expiry";
const FIRST_VISIT_KEY = "db_first_visit";
const VISIT_COUNT_KEY = "db_visit_count";
const SESSION_JOURNEY_KEY = "db_session_journey";
const VISITOR_JOURNEY_KEY = "db_visitor_journey";
const FIRST_TOUCH_SOURCE_KEY = "db_first_touch_source";
const FIRST_TOUCH_LANDING_KEY = "db_first_touch_landing";
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const MAX_JOURNEY_LENGTH = 50; // Limit to prevent localStorage overflow

export interface FirstTouchAttribution {
  source: string;
  medium: string;
  landingPage: string;
  timestamp: string;
  referrer?: string;
  utmCampaign?: string;
  utmSource?: string;
}

export interface PageVisit {
  page: string;
  timestamp: string;
  referrer?: string;
}

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  if (!visitorId) {
    visitorId = uuidv4();
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    localStorage.setItem(VISIT_COUNT_KEY, "1");
  }
  return visitorId;
}

export function isReturningVisitor(): boolean {
  if (typeof window === "undefined") return false;

  const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
  return visitCount > 1;
}

export function getVisitCount(): number {
  if (typeof window === "undefined") return 1;
  return parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "1", 10);
}

/**
 * Store first-touch attribution data (only on first visit)
 * This persists how the visitor originally discovered the site
 */
export function setFirstTouchAttribution(attribution: FirstTouchAttribution): void {
  if (typeof window === "undefined") return;

  // Only set if not already set (preserve original discovery source)
  if (localStorage.getItem(FIRST_TOUCH_SOURCE_KEY)) {
    return;
  }

  try {
    localStorage.setItem(FIRST_TOUCH_SOURCE_KEY, JSON.stringify(attribution));
    localStorage.setItem(FIRST_TOUCH_LANDING_KEY, attribution.landingPage);
  } catch {
    // Handle quota exceeded
    console.warn("Failed to store first-touch attribution");
  }
}

/**
 * Get first-touch attribution data
 * Returns how the visitor originally discovered the site
 */
export function getFirstTouchAttribution(): FirstTouchAttribution | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(FIRST_TOUCH_SOURCE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Get the original landing page that brought the visitor to the site
 */
export function getFirstTouchLandingPage(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FIRST_TOUCH_LANDING_KEY);
}

/**
 * Get the first visit timestamp
 */
export function getFirstVisitDate(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(FIRST_VISIT_KEY);
}

export function incrementVisitCount(): void {
  if (typeof window === "undefined") return;

  const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
  localStorage.setItem(VISIT_COUNT_KEY, String(visitCount + 1));
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  const now = Date.now();
  const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  // Check if session expired or doesn't exist
  if (!sessionId || !expiry || now > parseInt(expiry, 10)) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    // Increment visit count for new sessions (except first ever visit)
    if (localStorage.getItem(VISIT_COUNT_KEY)) {
      incrementVisitCount();
    }
  }

  // Extend session expiry
  localStorage.setItem(SESSION_EXPIRY_KEY, String(now + SESSION_DURATION_MS));

  return sessionId;
}

export function getDeviceType(): "desktop" | "mobile" | "tablet" {
  if (typeof window === "undefined") return "desktop";

  const ua = navigator.userAgent.toLowerCase();

  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function markConversion(conversionType: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem("db_conversion", conversionType);
}

export function getConversion(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("db_conversion");
}

/**
 * Add a page visit to the current session journey
 */
export function addPageToSessionJourney(page: string, referrer?: string): void {
  if (typeof window === "undefined") return;

  const journey = getSessionJourney();
  const visit: PageVisit = {
    page,
    timestamp: new Date().toISOString(),
    referrer,
  };

  // Avoid duplicate consecutive pages
  if (journey.length > 0 && journey[journey.length - 1].page === page) {
    return;
  }

  journey.push(visit);

  // Keep journey under max length (remove oldest entries)
  const trimmedJourney = journey.slice(-MAX_JOURNEY_LENGTH);

  try {
    sessionStorage.setItem(SESSION_JOURNEY_KEY, JSON.stringify(trimmedJourney));
  } catch {
    // Handle quota exceeded by trimming more aggressively
    const smallerJourney = trimmedJourney.slice(-10);
    sessionStorage.setItem(SESSION_JOURNEY_KEY, JSON.stringify(smallerJourney));
  }

  // Also update the cross-session visitor journey
  addPageToVisitorJourney(visit);
}

/**
 * Get the current session's page journey
 */
export function getSessionJourney(): PageVisit[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = sessionStorage.getItem(SESSION_JOURNEY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Clear the session journey (called when session expires)
 */
export function clearSessionJourney(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_JOURNEY_KEY);
}

/**
 * Add a page visit to the cross-session visitor journey (localStorage)
 */
function addPageToVisitorJourney(visit: PageVisit): void {
  if (typeof window === "undefined") return;

  const journey = getVisitorJourney();

  // Avoid duplicate consecutive pages
  if (journey.length > 0 && journey[journey.length - 1].page === visit.page) {
    return;
  }

  journey.push(visit);

  // Keep a longer history for cross-session analysis
  const trimmedJourney = journey.slice(-100);

  try {
    localStorage.setItem(VISITOR_JOURNEY_KEY, JSON.stringify(trimmedJourney));
  } catch {
    // Handle quota exceeded
    const smallerJourney = trimmedJourney.slice(-20);
    localStorage.setItem(VISITOR_JOURNEY_KEY, JSON.stringify(smallerJourney));
  }
}

/**
 * Get the visitor's complete page journey across all sessions
 */
export function getVisitorJourney(): PageVisit[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(VISITOR_JOURNEY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
