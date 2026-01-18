/**
 * Time Decay Functions for Lead Scoring
 *
 * Applies decay to behavioral scores based on time since event occurred.
 * - 50% decay every 30 days
 * - Score goes to 0 after 90 days of inactivity
 */

/**
 * Configuration for time decay calculation
 */
export const DECAY_CONFIG = {
  /** Decay rate per period (50% = 0.5) */
  DECAY_RATE: 0.5,
  /** Period in days for decay rate application */
  DECAY_PERIOD_DAYS: 30,
  /** Maximum days before score decays to 0 */
  MAX_DECAY_DAYS: 90,
} as const;

/**
 * Calculate the decay multiplier based on days since event
 *
 * Formula: Decayed Score = Original Score * (1 - 0.5 * (Days Since Event / 30))
 * Capped at 90 days (returns 0 multiplier after 90 days)
 *
 * @param daysSinceEvent - Number of days since the scoring event occurred
 * @returns Multiplier between 0 and 1 to apply to the original score
 */
export function calculateDecayMultiplier(daysSinceEvent: number): number {
  // No decay for same-day events
  if (daysSinceEvent <= 0) {
    return 1;
  }

  // Score goes to 0 after max decay period
  if (daysSinceEvent >= DECAY_CONFIG.MAX_DECAY_DAYS) {
    return 0;
  }

  // Apply decay formula: 1 - (DECAY_RATE * (days / DECAY_PERIOD))
  const decayFactor =
    DECAY_CONFIG.DECAY_RATE *
    (daysSinceEvent / DECAY_CONFIG.DECAY_PERIOD_DAYS);

  // Ensure multiplier doesn't go below 0
  return Math.max(0, 1 - decayFactor);
}

/**
 * Apply time decay to a score
 *
 * @param originalScore - The original score before decay
 * @param daysSinceEvent - Number of days since the scoring event
 * @returns Decayed score (rounded to nearest integer)
 */
export function applyTimeDecay(
  originalScore: number,
  daysSinceEvent: number
): number {
  const multiplier = calculateDecayMultiplier(daysSinceEvent);
  return Math.round(originalScore * multiplier);
}

/**
 * Calculate days between two dates
 *
 * @param eventDate - Date of the scoring event
 * @param currentDate - Current date (defaults to now)
 * @returns Number of days between dates
 */
export function daysBetween(
  eventDate: Date | string | number,
  currentDate: Date = new Date()
): number {
  const event = new Date(eventDate);
  const current = new Date(currentDate);

  // Reset time components for accurate day calculation
  event.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);

  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((current.getTime() - event.getTime()) / msPerDay);
}

/**
 * Score event with timestamp for decay tracking
 */
export interface TimestampedScore {
  score: number;
  eventType: string;
  timestamp: Date | string | number;
  page?: string;
}

/**
 * Apply decay to multiple timestamped scores
 *
 * @param scores - Array of scores with timestamps
 * @param currentDate - Current date for decay calculation
 * @returns Total decayed score
 */
export function calculateDecayedTotalScore(
  scores: TimestampedScore[],
  currentDate: Date = new Date()
): number {
  let totalDecayedScore = 0;

  for (const scoreEvent of scores) {
    const days = daysBetween(scoreEvent.timestamp, currentDate);
    const decayedScore = applyTimeDecay(scoreEvent.score, days);
    totalDecayedScore += decayedScore;
  }

  return totalDecayedScore;
}

/**
 * Get decay status information for display
 *
 * @param daysSinceEvent - Days since the scoring event
 * @returns Object with decay percentage and status label
 */
export function getDecayStatus(daysSinceEvent: number): {
  decayPercentage: number;
  label: string;
  isExpired: boolean;
} {
  if (daysSinceEvent >= DECAY_CONFIG.MAX_DECAY_DAYS) {
    return {
      decayPercentage: 100,
      label: "Expired",
      isExpired: true,
    };
  }

  const multiplier = calculateDecayMultiplier(daysSinceEvent);
  const decayPercentage = Math.round((1 - multiplier) * 100);

  let label: string;
  if (decayPercentage === 0) {
    label = "Fresh";
  } else if (decayPercentage < 25) {
    label = "Recent";
  } else if (decayPercentage < 50) {
    label = "Aging";
  } else if (decayPercentage < 75) {
    label = "Stale";
  } else {
    label = "Nearly Expired";
  }

  return {
    decayPercentage,
    label,
    isExpired: false,
  };
}
