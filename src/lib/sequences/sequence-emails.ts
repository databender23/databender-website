/**
 * Email Sequence Email Sender
 *
 * Handles sending sequence emails via AWS SES with template selection
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { Lead } from "../leads/types";
import type { SequenceType, SequenceDay, SequenceTemplate, SequenceEmailParams, ColdSequenceDay } from "./types";
import { ASSESSMENT_NAMES } from "./types";
import {
  generateUnsubscribeToken,
  getAssessmentDetails,
} from "./sequence-service";

// Assessment templates
import { getDay0AssessmentTemplate } from "./templates/assessment/day0";
import { getDay2AssessmentTemplate } from "./templates/assessment/day2";
import { getDay7AssessmentTemplate } from "./templates/assessment/day7";
import { getDay14AssessmentTemplate } from "./templates/assessment/day14";
import { getDay21AssessmentTemplate } from "./templates/assessment/day21";

// Guide-legal templates
import { getDay0GuideLegalTemplate } from "./templates/guide-legal/day0";
import { getDay2GuideLegalTemplate } from "./templates/guide-legal/day2";
import { getDay7GuideLegalTemplate } from "./templates/guide-legal/day7";
import { getDay14GuideLegalTemplate } from "./templates/guide-legal/day14";
import { getDay21GuideLegalTemplate } from "./templates/guide-legal/day21";

// Guide-general templates
import { getDay0GuideGeneralTemplate } from "./templates/guide-general/day0";
import { getDay2GuideGeneralTemplate } from "./templates/guide-general/day2";
import { getDay7GuideGeneralTemplate } from "./templates/guide-general/day7";
import { getDay14GuideGeneralTemplate } from "./templates/guide-general/day14";
import { getDay21GuideGeneralTemplate } from "./templates/guide-general/day21";

// Cold-legal templates
import {
  getDay0ColdLegalTemplate,
  getDay3ColdLegalTemplate,
  getDay7ColdLegalTemplate,
  getDay14ColdLegalTemplate,
} from "./templates/cold-legal";

// Cold-manufacturing templates
import {
  getDay0ColdManufacturingTemplate,
  getDay3ColdManufacturingTemplate,
  getDay7ColdManufacturingTemplate,
  getDay14ColdManufacturingTemplate,
} from "./templates/cold-manufacturing";

// Cold-healthcare templates
import {
  getDay0ColdHealthcareTemplate,
  getDay3ColdHealthcareTemplate,
  getDay7ColdHealthcareTemplate,
  getDay14ColdHealthcareTemplate,
} from "./templates/cold-healthcare";

// Cold-cre templates
import {
  getDay0ColdCRETemplate,
  getDay3ColdCRETemplate,
  getDay7ColdCRETemplate,
  getDay14ColdCRETemplate,
} from "./templates/cold-cre";

// Tracking utilities
import { applyEmailTracking } from "./tracking";

/**
 * Send a sequence email to a lead
 */
export async function sendSequenceEmail(
  lead: Lead,
  day: SequenceDay | ColdSequenceDay
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!lead.emailSequence) {
    return { success: false, error: "Lead has no email sequence" };
  }

  const sequenceType = lead.emailSequence.sequenceType;
  const params = buildEmailParams(lead);
  const template = getEmailTemplate(day, sequenceType, params);

  if (!template) {
    return { success: false, error: `No template found for day ${day} ${sequenceType}` };
  }

  // Apply tracking to the email HTML
  const trackedHtmlBody = applyEmailTracking(
    template.htmlBody,
    lead.leadId,
    day,
    sequenceType
  );
  const trackedTemplate = {
    ...template,
    htmlBody: trackedHtmlBody,
  };

  try {
    const messageId = await sendEmail(lead.email, trackedTemplate);
    console.log(`[Sequence] Sent day ${day} email to ${lead.email}, messageId: ${messageId}`);
    return { success: true, messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[Sequence] Failed to send day ${day} email to ${lead.email}:`, error);
    return { success: false, error: errorMessage };
  }
}

/**
 * Build email parameters from a lead
 */
function buildEmailParams(lead: Lead): SequenceEmailParams {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co";
  const calendarUrl = process.env.NEXT_PUBLIC_BOOKING_URL || `${siteUrl}/contact`;
  const unsubscribeToken = generateUnsubscribeToken(lead.email);
  const unsubscribeUrl = `${siteUrl}/api/unsubscribe?token=${unsubscribeToken}`;

  // Get assessment details if available
  const assessmentDetails = getAssessmentDetails(lead);

  // Determine assessment name from resource slug or form type
  let assessmentName = "Data & AI Readiness Assessment";
  if (lead.resourceSlug && ASSESSMENT_NAMES[lead.resourceSlug]) {
    assessmentName = ASSESSMENT_NAMES[lead.resourceSlug];
  }

  return {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    company: lead.company,
    industry: lead.industry || lead.identifiedIndustry,
    // Assessment data
    overallScore: assessmentDetails.overallScore,
    lowestCategory: assessmentDetails.lowestCategory,
    lowestCategoryScore: assessmentDetails.lowestCategoryScore,
    highestCategory: assessmentDetails.highestCategory,
    primaryChallenge: lead.message, // Often contains the primary challenge
    assessmentName,
    assessmentScores: lead.assessmentScores,
    // Guide data
    guideTitle: lead.resourceTitle,
    guideSlug: lead.resourceSlug,
    downloadUrl: lead.resourceSlug ? `/guides/${lead.resourceSlug}.pdf` : undefined,
    contentUrl: lead.resourceSlug ? `/resources/guides/${lead.resourceSlug}/content` : undefined,
    // Common
    calendarUrl,
    unsubscribeUrl,
  };
}

/**
 * Get the appropriate email template based on day, sequence type, and params
 */
function getEmailTemplate(
  day: SequenceDay | ColdSequenceDay,
  sequenceType: SequenceType,
  params: SequenceEmailParams
): SequenceTemplate | null {
  // Assessment sequence templates
  if (sequenceType === "assessment") {
    // Build assessment-specific params with defaults
    const assessmentParams = {
      firstName: params.firstName,
      company: params.company,
      overallScore: params.overallScore ?? 0,
      lowestCategory: params.lowestCategory ?? "General",
      lowestCategoryScore: params.lowestCategoryScore ?? 0,
      highestCategory: params.highestCategory ?? "General",
      primaryChallenge: params.primaryChallenge,
      assessmentName: params.assessmentName ?? "Data & AI Readiness Assessment",
      industry: params.industry,
      calendarUrl: params.calendarUrl,
      unsubscribeUrl: params.unsubscribeUrl,
    };

    switch (day) {
      case 0:
        return getDay0AssessmentTemplate(assessmentParams);
      case 2:
        return getDay2AssessmentTemplate(assessmentParams);
      case 7:
        return getDay7AssessmentTemplate(assessmentParams);
      case 14:
        return getDay14AssessmentTemplate(assessmentParams);
      case 21:
        return getDay21AssessmentTemplate(assessmentParams);
    }
  }

  // Guide-legal sequence templates
  if (sequenceType === "guide-legal") {
    // Build guide-specific params with defaults
    const guideParams = {
      firstName: params.firstName,
      company: params.company,
      guideTitle: params.guideTitle ?? "Your Guide",
      guideSlug: params.guideSlug ?? "",
      downloadUrl: params.downloadUrl ?? "",
      contentUrl: params.contentUrl ?? "",
      calendarUrl: params.calendarUrl,
      unsubscribeUrl: params.unsubscribeUrl,
    };

    switch (day) {
      case 0:
        return getDay0GuideLegalTemplate(guideParams);
      case 2:
        return getDay2GuideLegalTemplate(guideParams);
      case 7:
        return getDay7GuideLegalTemplate(guideParams);
      case 14:
        return getDay14GuideLegalTemplate(guideParams);
      case 21:
        return getDay21GuideLegalTemplate(guideParams);
    }
  }

  // Guide-general sequence templates
  if (sequenceType === "guide-general") {
    // Build guide-specific params with defaults
    const guideParams = {
      firstName: params.firstName,
      company: params.company,
      guideTitle: params.guideTitle ?? "Your Guide",
      guideSlug: params.guideSlug ?? "",
      downloadUrl: params.downloadUrl ?? "",
      contentUrl: params.contentUrl ?? "",
      calendarUrl: params.calendarUrl,
      unsubscribeUrl: params.unsubscribeUrl,
    };

    switch (day) {
      case 0:
        return getDay0GuideGeneralTemplate(guideParams);
      case 2:
        return getDay2GuideGeneralTemplate(guideParams);
      case 7:
        return getDay7GuideGeneralTemplate(guideParams);
      case 14:
        return getDay14GuideGeneralTemplate(guideParams);
      case 21:
        return getDay21GuideGeneralTemplate(guideParams);
    }
  }

  // Cold outreach sequence templates
  // These use a different schedule: day 0, 3, 7, 14
  const coldParams = {
    firstName: params.firstName,
    company: params.company ?? "your company",
    unsubscribeUrl: params.unsubscribeUrl,
  };

  // Cold-legal sequence templates
  if (sequenceType === "cold-legal") {
    switch (day) {
      case 0:
        return getDay0ColdLegalTemplate(coldParams);
      case 3:
        return getDay3ColdLegalTemplate(coldParams);
      case 7:
        return getDay7ColdLegalTemplate(coldParams);
      case 14:
        return getDay14ColdLegalTemplate(coldParams);
    }
  }

  // Cold-manufacturing sequence templates
  if (sequenceType === "cold-manufacturing") {
    switch (day) {
      case 0:
        return getDay0ColdManufacturingTemplate(coldParams);
      case 3:
        return getDay3ColdManufacturingTemplate(coldParams);
      case 7:
        return getDay7ColdManufacturingTemplate(coldParams);
      case 14:
        return getDay14ColdManufacturingTemplate(coldParams);
    }
  }

  // Cold-healthcare sequence templates
  if (sequenceType === "cold-healthcare") {
    switch (day) {
      case 0:
        return getDay0ColdHealthcareTemplate(coldParams);
      case 3:
        return getDay3ColdHealthcareTemplate(coldParams);
      case 7:
        return getDay7ColdHealthcareTemplate(coldParams);
      case 14:
        return getDay14ColdHealthcareTemplate(coldParams);
    }
  }

  // Cold-cre sequence templates
  if (sequenceType === "cold-cre") {
    switch (day) {
      case 0:
        return getDay0ColdCRETemplate(coldParams);
      case 3:
        return getDay3ColdCRETemplate(coldParams);
      case 7:
        return getDay7ColdCRETemplate(coldParams);
      case 14:
        return getDay14ColdCRETemplate(coldParams);
    }
  }

  return null;
}

/**
 * Send an email via AWS SES
 * Uses COLD_SES_* credentials for cold outreach sequences (separate from website notifications)
 */
async function sendEmail(
  toEmail: string,
  template: SequenceTemplate
): Promise<string | undefined> {
  const awsRegion = process.env.COLD_SES_REGION || process.env.SES_REGION || "us-east-1";
  const fromEmail = process.env.COLD_SES_FROM_EMAIL || "grant@mail.databender.co";
  const fromName = process.env.COLD_SES_FROM_NAME || "Grant Bender";

  const clientConfig: {
    region: string;
    credentials?: { accessKeyId: string; secretAccessKey: string };
  } = {
    region: awsRegion,
  };

  // Use COLD_SES credentials for cold outreach (required for Amplify - no AWS_ prefix)
  if (process.env.COLD_SES_ACCESS_KEY_ID && process.env.COLD_SES_SECRET_ACCESS_KEY) {
    clientConfig.credentials = {
      accessKeyId: process.env.COLD_SES_ACCESS_KEY_ID,
      secretAccessKey: process.env.COLD_SES_SECRET_ACCESS_KEY,
    };
  }

  const sesClient = new SESClient(clientConfig);

  const command = new SendEmailCommand({
    Source: `${fromName} <${fromEmail}>`,
    Destination: {
      ToAddresses: [toEmail],
    },
    Message: {
      Subject: {
        Data: template.subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: template.htmlBody,
          Charset: "UTF-8",
        },
        Text: {
          Data: template.textBody,
          Charset: "UTF-8",
        },
      },
    },
  });

  const result = await sesClient.send(command);
  return result.MessageId;
}
