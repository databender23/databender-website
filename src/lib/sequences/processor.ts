/**
 * Email Sequence Processor
 *
 * Batch processes email sequences, sending emails at the appropriate times
 */

import type { Lead } from "../leads/types";
import type { ProcessingResult, SequenceDay, ColdSequenceDay, SequenceType } from "./types";
import { SEQUENCE_SCHEDULE, COLD_SEQUENCE_SCHEDULE } from "./types";
import {
  getLeadsForSequenceProcessing,
  getNextEmailDay,
  recordEmailSent,
  completeSequence,
} from "./sequence-service";
import { sendSequenceEmail } from "./sequence-emails";

/**
 * Process all active email sequences
 * Called by the daily cron job
 */
export async function processSequenceEmails(): Promise<ProcessingResult> {
  const result: ProcessingResult = {
    totalProcessed: 0,
    emailsSent: 0,
    errors: [],
    completedSequences: 0,
  };

  console.log("[Sequence Processor] Starting email sequence processing...");

  try {
    // Get all leads with active sequences
    const leads = await getLeadsForSequenceProcessing();
    console.log(`[Sequence Processor] Found ${leads.length} leads with active sequences`);

    for (const lead of leads) {
      result.totalProcessed++;

      try {
        await processLeadSequence(lead, result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`[Sequence Processor] Error processing ${lead.email}:`, error);
        result.errors.push({
          email: lead.email,
          error: errorMessage,
        });
      }
    }

    console.log(
      `[Sequence Processor] Complete. Processed: ${result.totalProcessed}, ` +
        `Sent: ${result.emailsSent}, Errors: ${result.errors.length}, ` +
        `Completed: ${result.completedSequences}`
    );
  } catch (error) {
    console.error("[Sequence Processor] Fatal error:", error);
    throw error;
  }

  return result;
}

/**
 * Check if a sequence type is a cold outreach sequence
 */
function isColdSequence(sequenceType: SequenceType): boolean {
  return sequenceType.startsWith("cold-");
}

/**
 * Get the final day for a sequence type
 */
function getFinalDay(sequenceType: SequenceType): number {
  if (isColdSequence(sequenceType)) {
    return COLD_SEQUENCE_SCHEDULE[COLD_SEQUENCE_SCHEDULE.length - 1];
  }
  return SEQUENCE_SCHEDULE[SEQUENCE_SCHEDULE.length - 1];
}

/**
 * Process a single lead's email sequence
 */
async function processLeadSequence(
  lead: Lead,
  result: ProcessingResult
): Promise<void> {
  // Skip leads who have replied (especially important for cold sequences)
  if (lead.hasReplied) {
    console.log(`[Sequence Processor] Skipping ${lead.email}: already replied`);
    return;
  }

  // Determine which email to send (if any)
  const nextDay = getNextEmailDay(lead);

  if (nextDay === null) {
    // No more emails to send - sequence is complete
    console.log(`[Sequence Processor] Sequence complete for ${lead.email}`);
    await completeSequence(lead.email);
    result.completedSequences++;
    return;
  }

  console.log(`[Sequence Processor] Processing ${lead.email}, next email: day ${nextDay}`);

  // Send the email
  const sendResult = await sendSequenceEmail(lead, nextDay as SequenceDay | ColdSequenceDay);

  if (sendResult.success) {
    // Record that the email was sent
    await recordEmailSent(lead.email, nextDay as SequenceDay, sendResult.messageId);
    result.emailsSent++;
    console.log(`[Sequence Processor] Sent day ${nextDay} email to ${lead.email}`);

    // Check if this was the final email
    const sequenceType = lead.emailSequence?.sequenceType;
    if (sequenceType && nextDay === getFinalDay(sequenceType)) {
      result.completedSequences++;
    }
  } else {
    result.errors.push({
      email: lead.email,
      error: sendResult.error || "Failed to send email",
    });
    console.error(
      `[Sequence Processor] Failed to send day ${nextDay} email to ${lead.email}: ${sendResult.error}`
    );
  }
}

/**
 * Send the Day 0 email immediately (used when enrolling a lead)
 */
export async function sendDay0Email(lead: Lead): Promise<boolean> {
  if (!lead.emailSequence) {
    console.error(`[Sequence] Cannot send Day 0 email - no sequence for ${lead.email}`);
    return false;
  }

  // Check if Day 0 was already sent
  if (lead.emailSequence.emailsSent.day0) {
    console.log(`[Sequence] Day 0 already sent for ${lead.email}`);
    return true;
  }

  const sendResult = await sendSequenceEmail(lead, 0);

  if (sendResult.success) {
    await recordEmailSent(lead.email, 0, sendResult.messageId);
    console.log(`[Sequence] Sent Day 0 email to ${lead.email}`);
    return true;
  } else {
    console.error(`[Sequence] Failed to send Day 0 email to ${lead.email}: ${sendResult.error}`);
    return false;
  }
}

/**
 * Enroll a lead and send Day 0 email in one operation
 * This is a convenience function for API routes
 */
export async function enrollAndSendDay0(
  lead: Lead,
  sequenceType: SequenceType
): Promise<boolean> {
  // Import here to avoid circular dependency
  const { enrollInSequence } = await import("./sequence-service");
  const { getLeadByEmail } = await import("../leads/dynamodb");

  // Enroll the lead
  const enrolled = await enrollInSequence(lead.email, sequenceType);
  if (!enrolled) {
    return false;
  }

  // Fetch the updated lead with sequence data
  const updatedLead = await getLeadByEmail(lead.email);
  if (!updatedLead) {
    console.error(`[Sequence] Lead not found after enrollment: ${lead.email}`);
    return false;
  }

  // Send Day 0 email
  return sendDay0Email(updatedLead);
}
