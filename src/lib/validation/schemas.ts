/**
 * Zod Validation Schemas
 *
 * Centralized input validation for all API endpoints.
 */

import { z } from "zod";

/**
 * Common field validators
 */
const emailField = z.string().email("Invalid email format").max(254);
const nameField = z.string().min(1).max(100).trim();
const companyField = z.string().min(1).max(200).trim();
const phoneField = z.string().max(20).optional();
const messageField = z.string().max(5000).trim().optional();

/**
 * Contact form schema
 */
export const contactFormSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  email: emailField,
  company: companyField,
  phone: phoneField,
  message: z.string().min(1, "Message is required").max(5000).trim(),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
  sourcePage: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

/**
 * Lead capture schema
 */
export const leadCaptureSchema = z.object({
  firstName: nameField.optional(),
  lastName: nameField.optional(),
  email: emailField,
  company: companyField.optional(),
  phone: phoneField,
  message: messageField,
  formType: z.enum(["audit", "guide", "assessment", "newsletter"]),
  resourceSlug: z.string().max(100).optional(),
  resourceTitle: z.string().max(200).optional(),
  submittedAt: z.string().optional(),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
  sourcePage: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>;

/**
 * Assessment schema
 */
export const assessmentScoresSchema = z.object({
  total: z.number().min(0).max(100),
  tier: z.string().max(50),
  dataInfrastructure: z.number().min(0).max(100).optional(),
  analyticsCapability: z.number().min(0).max(100).optional(),
  automationMaturity: z.number().min(0).max(100).optional(),
  aiReadiness: z.number().min(0).max(100).optional(),
}).passthrough(); // Allow additional score fields

export const assessmentContactSchema = z.object({
  firstName: nameField,
  lastName: nameField,
  email: emailField,
  company: companyField,
  phone: phoneField,
});

export const assessmentSchema = z.object({
  answers: z.record(z.string(), z.unknown()),
  scores: assessmentScoresSchema,
  contact: assessmentContactSchema,
  assessmentType: z.string().max(100).optional(),
  visitorId: z.string().max(100).optional(),
  sessionId: z.string().max(100).optional(),
  sourcePage: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;

/**
 * Webhook payload schema
 */
export const webhookPayloadSchema = z.object({
  action: z.enum(["update_status", "record_contact", "add_note", "update_tier"]),
  email: emailField,
  status: z.enum(["new", "contacted", "qualified", "opportunity", "customer", "lost"]).optional(),
  channel: z.enum(["linkedin", "email", "phone", "other"]).optional(),
  campaign: z.string().max(200).optional(),
  contactNotes: z.string().max(2000).optional(),
  note: z.string().max(2000).optional(),
  author: z.string().max(100).optional(),
  tier: z.enum(["A", "B", "C"]).optional(),
});

export type WebhookPayloadInput = z.infer<typeof webhookPayloadSchema>;

/**
 * Chat message schema
 */
export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(2000),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(100),
  sessionId: z.string().max(100).optional(),
  browsingContext: z.object({
    pageViews: z.array(z.unknown()).optional(),
    currentPage: z.string().optional(),
    referrer: z.string().optional(),
    timeOnSite: z.number().optional(),
  }).optional(),
});

export type ChatRequestInput = z.infer<typeof chatRequestSchema>;

/**
 * Helper to validate and parse input with Zod
 *
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns Parsed data or throws ZodError
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe validation that returns result object instead of throwing
 *
 * @param schema - The Zod schema to validate against
 * @param data - The data to validate
 * @returns Object with success flag and data or error
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

/**
 * Format Zod errors into a user-friendly message
 */
export function formatZodErrors(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
    })
    .join(", ");
}
