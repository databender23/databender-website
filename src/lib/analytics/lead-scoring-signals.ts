/**
 * Negative Signals and Sequential Pattern Detection for Lead Scoring
 *
 * Handles:
 * - Negative scoring signals (careers page, personal emails, competitors)
 * - Sequential pattern bonuses (case study → contact, multi-service → contact)
 * - Session velocity scoring (actions per session, engagement rate)
 */

/**
 * Negative signal point deductions
 */
export const NEGATIVE_SIGNALS = {
  CAREERS_PAGE_VISIT: -15,
  PERSONAL_EMAIL_DOMAIN: -10,
  COMPETITOR_EMAIL_DOMAIN: -100, // Disqualify
  INACTIVE_60_PLUS_DAYS: -10,
} as const;

/**
 * Personal email domains that indicate non-business leads
 */
export const PERSONAL_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "live.com",
  "msn.com",
  "ymail.com",
  "protonmail.com",
  "proton.me",
] as const;

/**
 * Known competitor domains - add actual competitors here
 * These leads get -100 points (effectively disqualified)
 */
export const COMPETITOR_DOMAINS = [
  // Add actual competitor domains here
  // Example: "competitorone.com", "rivaldatasolutions.com"
] as const;

/**
 * Sequential pattern bonus points
 */
export const SEQUENCE_BONUSES = {
  CASE_STUDY_TO_CONTACT: 15,
  MULTI_SERVICE_TO_CONTACT: 12,
  THREE_VISITS_IN_SEVEN_DAYS: 15,
  BLOG_TO_GUIDE_TO_CASE_STUDY: 10,
} as const;

/**
 * Session velocity bonus points
 */
export const SESSION_VELOCITY_SCORES = {
  HIGH_ACTION_COUNT: 8, // 5+ actions per session
  HIGH_ENGAGEMENT_RATE: 5, // >30 seconds average per page
} as const;

/**
 * Configuration for velocity scoring
 */
export const VELOCITY_CONFIG = {
  MIN_ACTIONS_FOR_BONUS: 5,
  MIN_SECONDS_PER_PAGE: 30,
} as const;

/**
 * Result of negative signal evaluation
 */
export interface NegativeSignalResult {
  totalDeduction: number;
  signals: {
    signal: string;
    points: number;
    reason: string;
  }[];
  isDisqualified: boolean;
}

/**
 * Check if a page path indicates a careers page visit
 */
export function isCareersPage(pagePath: string): boolean {
  const path = pagePath.toLowerCase();
  return path.includes("/careers") || path.includes("/jobs");
}

/**
 * Extract domain from email address
 */
export function extractEmailDomain(email: string): string | null {
  if (!email || !email.includes("@")) {
    return null;
  }
  return email.split("@")[1]?.toLowerCase() || null;
}

/**
 * Check if email is from a personal domain
 */
export function isPersonalEmail(email: string): boolean {
  const domain = extractEmailDomain(email);
  if (!domain) return false;
  return PERSONAL_EMAIL_DOMAINS.includes(
    domain as (typeof PERSONAL_EMAIL_DOMAINS)[number]
  );
}

/**
 * Check if email is from a competitor domain
 */
export function isCompetitorEmail(email: string): boolean {
  const domain = extractEmailDomain(email);
  if (!domain) return false;
  return COMPETITOR_DOMAINS.includes(
    domain as (typeof COMPETITOR_DOMAINS)[number]
  );
}

/**
 * Evaluate all negative signals for a visitor
 */
export function evaluateNegativeSignals(data: {
  pagesVisited: string[];
  email?: string;
  daysSinceLastVisit?: number;
}): NegativeSignalResult {
  const signals: NegativeSignalResult["signals"] = [];
  let totalDeduction = 0;
  let isDisqualified = false;

  // Check for careers page visit
  const visitedCareers = data.pagesVisited.some(isCareersPage);
  if (visitedCareers) {
    signals.push({
      signal: "careers_page",
      points: NEGATIVE_SIGNALS.CAREERS_PAGE_VISIT,
      reason: "Visited careers page (likely job seeker)",
    });
    totalDeduction += NEGATIVE_SIGNALS.CAREERS_PAGE_VISIT;
  }

  // Check email domain
  if (data.email) {
    if (isCompetitorEmail(data.email)) {
      signals.push({
        signal: "competitor_email",
        points: NEGATIVE_SIGNALS.COMPETITOR_EMAIL_DOMAIN,
        reason: "Email from competitor domain",
      });
      totalDeduction += NEGATIVE_SIGNALS.COMPETITOR_EMAIL_DOMAIN;
      isDisqualified = true;
    } else if (isPersonalEmail(data.email)) {
      signals.push({
        signal: "personal_email",
        points: NEGATIVE_SIGNALS.PERSONAL_EMAIL_DOMAIN,
        reason: "Personal email domain (non-business)",
      });
      totalDeduction += NEGATIVE_SIGNALS.PERSONAL_EMAIL_DOMAIN;
    }
  }

  // Check for extended inactivity
  if (
    data.daysSinceLastVisit !== undefined &&
    data.daysSinceLastVisit > 60
  ) {
    signals.push({
      signal: "inactive_60_days",
      points: NEGATIVE_SIGNALS.INACTIVE_60_PLUS_DAYS,
      reason: `Inactive for ${data.daysSinceLastVisit} days`,
    });
    totalDeduction += NEGATIVE_SIGNALS.INACTIVE_60_PLUS_DAYS;
  }

  return {
    totalDeduction,
    signals,
    isDisqualified,
  };
}

/**
 * Result of sequence pattern detection
 */
export interface SequencePatternResult {
  totalBonus: number;
  patterns: {
    pattern: string;
    bonus: number;
    description: string;
  }[];
}

/**
 * Check if page is a case study page
 */
function isCaseStudyPage(path: string): boolean {
  return path.startsWith("/case-studies");
}

/**
 * Check if page is a contact page
 */
function isContactPage(path: string): boolean {
  return path === "/contact" || path.startsWith("/contact");
}

/**
 * Check if page is a service page
 */
function isServicePage(path: string): boolean {
  return path.startsWith("/services");
}

/**
 * Check if page is a blog page
 */
function isBlogPage(path: string): boolean {
  return path.startsWith("/blog");
}

/**
 * Check if page is a guide/resource page
 */
function isGuidePage(path: string): boolean {
  return (
    path.startsWith("/resources/guides") || path.includes("guide")
  );
}

/**
 * Detect sequential patterns in page visit history
 */
export function detectSequencePatterns(data: {
  pageSequence: string[]; // Pages in order of visit
  visitDates?: (Date | string | number)[]; // Dates of visits
  hasDownloadedGuide?: boolean;
}): SequencePatternResult {
  const patterns: SequencePatternResult["patterns"] = [];
  let totalBonus = 0;
  const sequence = data.pageSequence;

  // Pattern 1: Case Study → Contact Page
  let sawCaseStudy = false;
  for (const page of sequence) {
    if (isCaseStudyPage(page)) {
      sawCaseStudy = true;
    }
    if (sawCaseStudy && isContactPage(page)) {
      patterns.push({
        pattern: "case_study_to_contact",
        bonus: SEQUENCE_BONUSES.CASE_STUDY_TO_CONTACT,
        description: "Viewed case study then contacted",
      });
      totalBonus += SEQUENCE_BONUSES.CASE_STUDY_TO_CONTACT;
      break;
    }
  }

  // Pattern 2: Multiple service pages (2+) → Contact
  const servicePages = sequence.filter(isServicePage);
  const uniqueServicePages = [...new Set(servicePages)];
  if (uniqueServicePages.length >= 2) {
    const contactIndex = sequence.findIndex(isContactPage);
    const lastServiceIndex = sequence.lastIndexOf(
      uniqueServicePages[uniqueServicePages.length - 1]
    );

    if (contactIndex > -1 && contactIndex > lastServiceIndex) {
      patterns.push({
        pattern: "multi_service_to_contact",
        bonus: SEQUENCE_BONUSES.MULTI_SERVICE_TO_CONTACT,
        description: `Explored ${uniqueServicePages.length} services then contacted`,
      });
      totalBonus += SEQUENCE_BONUSES.MULTI_SERVICE_TO_CONTACT;
    }
  }

  // Pattern 3: 3+ visits within 7 days
  if (data.visitDates && data.visitDates.length >= 3) {
    const sortedDates = data.visitDates
      .map((d) => new Date(d).getTime())
      .sort((a, b) => a - b);

    // Check if any 3 consecutive visits are within 7 days
    for (let i = 0; i <= sortedDates.length - 3; i++) {
      const firstVisit = sortedDates[i];
      const thirdVisit = sortedDates[i + 2];
      const daysDiff = (thirdVisit - firstVisit) / (1000 * 60 * 60 * 24);

      if (daysDiff <= 7) {
        patterns.push({
          pattern: "three_visits_seven_days",
          bonus: SEQUENCE_BONUSES.THREE_VISITS_IN_SEVEN_DAYS,
          description: "3+ visits within 7 days (high intent)",
        });
        totalBonus += SEQUENCE_BONUSES.THREE_VISITS_IN_SEVEN_DAYS;
        break;
      }
    }
  }

  // Pattern 4: Blog → Guide Download → Case Study
  if (data.hasDownloadedGuide) {
    let sawBlog = false;
    let sawGuide = false;

    for (const page of sequence) {
      if (isBlogPage(page)) {
        sawBlog = true;
      }
      if (sawBlog && (isGuidePage(page) || data.hasDownloadedGuide)) {
        sawGuide = true;
      }
      if (sawBlog && sawGuide && isCaseStudyPage(page)) {
        patterns.push({
          pattern: "blog_guide_case_study",
          bonus: SEQUENCE_BONUSES.BLOG_TO_GUIDE_TO_CASE_STUDY,
          description: "Blog → Guide → Case Study journey",
        });
        totalBonus += SEQUENCE_BONUSES.BLOG_TO_GUIDE_TO_CASE_STUDY;
        break;
      }
    }
  }

  return {
    totalBonus,
    patterns,
  };
}

/**
 * Result of session velocity analysis
 */
export interface SessionVelocityResult {
  totalBonus: number;
  metrics: {
    actionsPerSession: number;
    averageSecondsPerPage: number;
    hasHighActionCount: boolean;
    hasHighEngagement: boolean;
  };
}

/**
 * Calculate session velocity bonuses
 */
export function calculateSessionVelocity(data: {
  actionCount: number;
  sessionDurationSeconds: number;
  pageCount: number;
}): SessionVelocityResult {
  let totalBonus = 0;

  // Calculate average seconds per page
  const averageSecondsPerPage =
    data.pageCount > 0
      ? Math.round(data.sessionDurationSeconds / data.pageCount)
      : 0;

  // Check for high action count (5+ actions)
  const hasHighActionCount =
    data.actionCount >= VELOCITY_CONFIG.MIN_ACTIONS_FOR_BONUS;
  if (hasHighActionCount) {
    totalBonus += SESSION_VELOCITY_SCORES.HIGH_ACTION_COUNT;
  }

  // Check for high engagement rate (>30 seconds per page)
  const hasHighEngagement =
    averageSecondsPerPage >= VELOCITY_CONFIG.MIN_SECONDS_PER_PAGE;
  if (hasHighEngagement) {
    totalBonus += SESSION_VELOCITY_SCORES.HIGH_ENGAGEMENT_RATE;
  }

  return {
    totalBonus,
    metrics: {
      actionsPerSession: data.actionCount,
      averageSecondsPerPage,
      hasHighActionCount,
      hasHighEngagement,
    },
  };
}
