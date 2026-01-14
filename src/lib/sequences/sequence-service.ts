/**
 * Email Sequence Service
 *
 * Business logic for managing email nurture sequences
 */

import { getLeadByEmail, updateLead, scanLeadsWithActiveSequences } from "../leads/dynamodb";
import type { Lead } from "../leads/types";
import type {
  SequenceType,
  SequenceStatus,
  SequenceDay,
  EmailSequence,
  SEQUENCE_SCHEDULE,
} from "./types";

/**
 * Enroll a lead in an email sequence
 */
export async function enrollInSequence(
  email: string,
  sequenceType: SequenceType
): Promise<boolean> {
  const lead = await getLeadByEmail(email.toLowerCase());

  if (!lead) {
    console.error(`[Sequence] Lead not found for email: ${email}`);
    return false;
  }

  // Don't re-enroll if already in a sequence
  if (lead.emailSequence && lead.emailSequence.status === "active") {
    console.log(`[Sequence] Lead ${email} already in active sequence`);
    return false;
  }

  // Don't enroll if previously unsubscribed
  if (lead.emailSequence?.status === "unsubscribed") {
    console.log(`[Sequence] Lead ${email} previously unsubscribed, skipping enrollment`);
    return false;
  }

  const emailSequence: EmailSequence = {
    sequenceType,
    enrolledAt: new Date().toISOString(),
    status: "active",
    currentDay: 0,
    emailsSent: {},
  };

  try {
    await updateLead(lead.email, lead.createdAt, { emailSequence });
    console.log(`[Sequence] Enrolled ${email} in ${sequenceType} sequence`);
    return true;
  } catch (error) {
    console.error(`[Sequence] Failed to enroll ${email}:`, error);
    return false;
  }
}

/**
 * Pause a lead's email sequence
 */
export async function pauseSequence(
  email: string,
  reason: string
): Promise<boolean> {
  const lead = await getLeadByEmail(email.toLowerCase());

  if (!lead || !lead.emailSequence) {
    console.error(`[Sequence] No active sequence found for: ${email}`);
    return false;
  }

  const updatedSequence: EmailSequence = {
    ...lead.emailSequence,
    status: "paused",
    pauseReason: reason,
  };

  try {
    await updateLead(lead.email, lead.createdAt, { emailSequence: updatedSequence });
    console.log(`[Sequence] Paused sequence for ${email}: ${reason}`);
    return true;
  } catch (error) {
    console.error(`[Sequence] Failed to pause sequence for ${email}:`, error);
    return false;
  }
}

/**
 * Unsubscribe a lead from email sequences
 */
export async function unsubscribeFromSequence(email: string): Promise<boolean> {
  const lead = await getLeadByEmail(email.toLowerCase());

  if (!lead) {
    console.error(`[Sequence] Lead not found for unsubscribe: ${email}`);
    return false;
  }

  const updatedSequence: EmailSequence = {
    ...(lead.emailSequence || {
      sequenceType: "assessment" as SequenceType,
      enrolledAt: new Date().toISOString(),
      currentDay: 0,
      emailsSent: {},
    }),
    status: "unsubscribed",
    unsubscribedAt: new Date().toISOString(),
  };

  try {
    await updateLead(lead.email, lead.createdAt, { emailSequence: updatedSequence });
    console.log(`[Sequence] Unsubscribed ${email}`);
    return true;
  } catch (error) {
    console.error(`[Sequence] Failed to unsubscribe ${email}:`, error);
    return false;
  }
}

/**
 * Mark a sequence as completed
 */
export async function completeSequence(email: string): Promise<boolean> {
  const lead = await getLeadByEmail(email.toLowerCase());

  if (!lead || !lead.emailSequence) {
    return false;
  }

  const updatedSequence: EmailSequence = {
    ...lead.emailSequence,
    status: "completed",
    completedAt: new Date().toISOString(),
  };

  try {
    await updateLead(lead.email, lead.createdAt, { emailSequence: updatedSequence });
    console.log(`[Sequence] Completed sequence for ${email}`);
    return true;
  } catch (error) {
    console.error(`[Sequence] Failed to complete sequence for ${email}:`, error);
    return false;
  }
}

/**
 * Record that an email was sent
 */
export async function recordEmailSent(
  email: string,
  day: SequenceDay,
  messageId?: string
): Promise<boolean> {
  const lead = await getLeadByEmail(email.toLowerCase());

  if (!lead || !lead.emailSequence) {
    return false;
  }

  const dayKey = `day${day}` as keyof EmailSequence["emailsSent"];
  const updatedSequence: EmailSequence = {
    ...lead.emailSequence,
    currentDay: day,
    emailsSent: {
      ...lead.emailSequence.emailsSent,
      [dayKey]: {
        sentAt: new Date().toISOString(),
        messageId,
      },
    },
  };

  // Mark as completed if this was the final email (day 21)
  if (day === 21) {
    updatedSequence.status = "completed";
    updatedSequence.completedAt = new Date().toISOString();
  }

  try {
    await updateLead(lead.email, lead.createdAt, { emailSequence: updatedSequence });
    return true;
  } catch (error) {
    console.error(`[Sequence] Failed to record email sent for ${email}:`, error);
    return false;
  }
}

/**
 * Get all leads with active sequences that need processing
 */
export async function getLeadsForSequenceProcessing(): Promise<Lead[]> {
  return scanLeadsWithActiveSequences();
}

/**
 * Calculate the next email day for a lead
 */
export function getNextEmailDay(lead: Lead): SequenceDay | null {
  if (!lead.emailSequence || lead.emailSequence.status !== "active") {
    return null;
  }

  const enrolledAt = new Date(lead.emailSequence.enrolledAt);
  const now = new Date();
  const daysSinceEnrollment = Math.floor(
    (now.getTime() - enrolledAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const schedule: SequenceDay[] = [0, 2, 7, 14, 21];
  const sent = lead.emailSequence.emailsSent;

  for (const day of schedule) {
    const dayKey = `day${day}` as keyof typeof sent;
    if (daysSinceEnrollment >= day && !sent[dayKey]) {
      return day;
    }
  }

  return null; // All emails sent
}

/**
 * Check if a lead should receive an email today
 */
export function shouldSendEmail(lead: Lead): boolean {
  return getNextEmailDay(lead) !== null;
}

/**
 * Generate an unsubscribe token for a lead
 */
export function generateUnsubscribeToken(email: string): string {
  const payload = {
    email: email.toLowerCase(),
    ts: Date.now(),
  };
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

/**
 * Decode an unsubscribe token
 */
export function decodeUnsubscribeToken(
  token: string
): { email: string; ts: number } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const payload = JSON.parse(decoded);
    if (payload.email && payload.ts) {
      return payload;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Get assessment details from a lead for email personalization
 */
export function getAssessmentDetails(lead: Lead): {
  overallScore: number;
  lowestCategory: string;
  lowestCategoryScore: number;
  highestCategory: string;
} {
  const scores = lead.assessmentScores || {};
  const entries = Object.entries(scores);

  if (entries.length === 0) {
    return {
      overallScore: 0,
      lowestCategory: "General",
      lowestCategoryScore: 0,
      highestCategory: "General",
    };
  }

  // Calculate overall score as average
  const total = entries.reduce((sum, [, score]) => sum + score, 0);
  const overallScore = Math.round(total / entries.length);

  // Find lowest and highest categories
  let lowestCategory = entries[0][0];
  let lowestScore = entries[0][1];
  let highestCategory = entries[0][0];
  let highestScore = entries[0][1];

  for (const [category, score] of entries) {
    if (score < lowestScore) {
      lowestScore = score;
      lowestCategory = category;
    }
    if (score > highestScore) {
      highestScore = score;
      highestCategory = category;
    }
  }

  return {
    overallScore,
    lowestCategory: formatCategoryName(lowestCategory),
    lowestCategoryScore: lowestScore,
    highestCategory: formatCategoryName(highestCategory),
  };
}

/**
 * Format a category key into a readable name
 */
function formatCategoryName(key: string): string {
  // Convert camelCase or snake_case to Title Case
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}
