/**
 * Email Sequences Module
 *
 * Exports all sequence-related functionality
 */

// Types
export type {
  SequenceType,
  SequenceStatus,
  SequenceDay,
  EmailSequence,
  EmailSentRecord,
  SequenceEmailParams,
  SequenceTemplate,
  ProcessingResult,
} from "./types";

export {
  SEQUENCE_SCHEDULE,
  ASSESSMENT_NAMES,
  GUIDE_SEQUENCE_MAP,
  getGuideSequenceType,
} from "./types";

// Service functions
export {
  enrollInSequence,
  pauseSequence,
  unsubscribeFromSequence,
  completeSequence,
  recordEmailSent,
  getLeadsForSequenceProcessing,
  getNextEmailDay,
  shouldSendEmail,
  generateUnsubscribeToken,
  decodeUnsubscribeToken,
  getAssessmentDetails,
} from "./sequence-service";

// Email sending
export { sendSequenceEmail } from "./sequence-emails";

// Processor
export {
  processSequenceEmails,
  sendDay0Email,
  enrollAndSendDay0,
} from "./processor";
