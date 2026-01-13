import { v4 as uuidv4 } from "uuid";

const VISITOR_ID_KEY = "db_visitor_id";
const SESSION_ID_KEY = "db_session_id";
const SESSION_EXPIRY_KEY = "db_session_expiry";
const FIRST_VISIT_KEY = "db_first_visit";
const VISIT_COUNT_KEY = "db_visit_count";
const SESSION_DURATION_MS = 30 * 60 * 1000; // 30 minutes

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
