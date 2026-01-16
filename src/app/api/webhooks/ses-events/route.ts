/**
 * SES Events Webhook
 *
 * Receives bounce/complaint/delivery notifications from AWS SES via SNS.
 *
 * Setup required in AWS:
 * 1. Create SNS topic for SES notifications
 * 2. Configure SES to publish Bounce/Complaint events to the topic
 * 3. Create HTTPS subscription pointing to this endpoint
 * 4. Confirm the subscription (handled automatically below)
 *
 * SNS Message Types:
 * - SubscriptionConfirmation: Initial subscription setup
 * - Notification: Actual event data
 * - UnsubscribeConfirmation: Topic unsubscribe
 */

import { NextRequest, NextResponse } from "next/server";
import {
  handleBounce,
  handleComplaint,
} from "@/lib/sequences/sequence-service";
import type { BounceType } from "@/lib/sequences/types";
import { parseAndVerifySnsMessage } from "@/lib/sns-verify";

// SNS message structure
interface SNSMessage {
  Type: "SubscriptionConfirmation" | "Notification" | "UnsubscribeConfirmation";
  MessageId: string;
  TopicArn: string;
  Message: string;
  Timestamp: string;
  SignatureVersion: string;
  Signature: string;
  SigningCertURL: string;
  SubscribeURL?: string; // For SubscriptionConfirmation
  Token?: string;
  Subject?: string;
}

// SES Bounce notification structure
interface SESBounceNotification {
  notificationType: "Bounce";
  bounce: {
    bounceType: "Permanent" | "Transient" | "Undetermined";
    bounceSubType: string;
    bouncedRecipients: Array<{
      emailAddress: string;
      action?: string;
      status?: string;
      diagnosticCode?: string;
    }>;
    timestamp: string;
    feedbackId: string;
    reportingMTA?: string;
  };
  mail: {
    timestamp: string;
    source: string;
    messageId: string;
    destination: string[];
  };
}

// SES Complaint notification structure
interface SESComplaintNotification {
  notificationType: "Complaint";
  complaint: {
    complainedRecipients: Array<{
      emailAddress: string;
    }>;
    timestamp: string;
    feedbackId: string;
    complaintFeedbackType?: string;
    userAgent?: string;
  };
  mail: {
    timestamp: string;
    source: string;
    messageId: string;
    destination: string[];
  };
}

// SES Delivery notification structure (for logging)
interface SESDeliveryNotification {
  notificationType: "Delivery";
  delivery: {
    timestamp: string;
    processingTimeMillis: number;
    recipients: string[];
    smtpResponse: string;
    reportingMTA: string;
  };
  mail: {
    timestamp: string;
    source: string;
    messageId: string;
    destination: string[];
  };
}

type SESNotification =
  | SESBounceNotification
  | SESComplaintNotification
  | SESDeliveryNotification;

/**
 * Map SES bounce types to our internal types
 */
function mapBounceType(sesBounceType: string): BounceType {
  switch (sesBounceType) {
    case "Permanent":
      return "hard";
    case "Transient":
      return "soft";
    default:
      return "undetermined";
  }
}

/**
 * Handle incoming SNS/SES events
 */
export async function POST(request: NextRequest) {
  try {
    // Get raw body for SNS message
    const body = await request.text();

    // Parse and verify SNS signature
    const { message: snsMessage, error: verifyError } = await parseAndVerifySnsMessage(body);

    if (!snsMessage) {
      console.error(`[SES Webhook] SNS verification failed: ${verifyError}`);
      return NextResponse.json(
        { error: verifyError || "Invalid SNS message" },
        { status: 403 }
      );
    }

    console.log(`[SES Webhook] Verified ${snsMessage.Type} from ${snsMessage.TopicArn}`);

    // Handle subscription confirmation
    if (snsMessage.Type === "SubscriptionConfirmation") {
      return handleSubscriptionConfirmation(snsMessage);
    }

    // Handle unsubscribe confirmation
    if (snsMessage.Type === "UnsubscribeConfirmation") {
      console.log("[SES Webhook] Unsubscribe confirmation received");
      return NextResponse.json({ status: "unsubscribe_acknowledged" });
    }

    // Handle notification
    if (snsMessage.Type === "Notification") {
      return handleNotification(snsMessage);
    }

    return NextResponse.json({ error: "Unknown message type" }, { status: 400 });
  } catch (error) {
    console.error("[SES Webhook] Error processing request:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * Handle SNS subscription confirmation
 * Automatically confirms the subscription by visiting the SubscribeURL
 */
async function handleSubscriptionConfirmation(
  message: SNSMessage
): Promise<NextResponse> {
  if (!message.SubscribeURL) {
    console.error("[SES Webhook] SubscribeURL missing in confirmation");
    return NextResponse.json(
      { error: "Missing SubscribeURL" },
      { status: 400 }
    );
  }

  try {
    // Confirm by fetching the SubscribeURL
    console.log("[SES Webhook] Confirming subscription...");
    const response = await fetch(message.SubscribeURL);

    if (response.ok) {
      console.log("[SES Webhook] Subscription confirmed successfully");
      return NextResponse.json({ status: "subscription_confirmed" });
    } else {
      console.error("[SES Webhook] Failed to confirm subscription:", response.status);
      return NextResponse.json(
        { error: "Failed to confirm subscription" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[SES Webhook] Error confirming subscription:", error);
    return NextResponse.json(
      { error: "Failed to confirm subscription" },
      { status: 500 }
    );
  }
}

/**
 * Handle SES notification (Bounce, Complaint, Delivery)
 */
async function handleNotification(message: SNSMessage): Promise<NextResponse> {
  // Parse the nested SES message
  let sesEvent: SESNotification;
  try {
    sesEvent = JSON.parse(message.Message);
  } catch {
    console.error("[SES Webhook] Failed to parse SES event");
    return NextResponse.json({ error: "Invalid SES event" }, { status: 400 });
  }

  const results: Array<{ email: string; action: string; success: boolean }> = [];

  switch (sesEvent.notificationType) {
    case "Bounce":
      const bounceType = mapBounceType(sesEvent.bounce.bounceType);
      const bounceSubType = sesEvent.bounce.bounceSubType;

      console.log(
        `[SES Webhook] Bounce: ${sesEvent.bounce.bounceType}/${bounceSubType} ` +
          `for ${sesEvent.bounce.bouncedRecipients.length} recipients`
      );

      for (const recipient of sesEvent.bounce.bouncedRecipients) {
        const reason = recipient.diagnosticCode || bounceSubType;
        const result = await handleBounce(recipient.emailAddress, bounceType, reason);
        results.push({
          email: recipient.emailAddress,
          action: result.action,
          success: result.success,
        });
      }
      break;

    case "Complaint":
      console.log(
        `[SES Webhook] Complaint for ${sesEvent.complaint.complainedRecipients.length} recipients`
      );

      for (const recipient of sesEvent.complaint.complainedRecipients) {
        const success = await handleComplaint(recipient.emailAddress);
        results.push({
          email: recipient.emailAddress,
          action: "unsubscribed",
          success,
        });
      }
      break;

    case "Delivery":
      // Log deliveries but don't need to process them
      console.log(
        `[SES Webhook] Delivery confirmed for ${sesEvent.delivery.recipients.length} recipients`
      );
      return NextResponse.json({
        status: "delivery_logged",
        recipients: sesEvent.delivery.recipients,
      });

    default:
      console.log(`[SES Webhook] Unknown notification type: ${(sesEvent as { notificationType: string }).notificationType}`);
      return NextResponse.json({ status: "unknown_type_ignored" });
  }

  return NextResponse.json({
    status: "processed",
    results,
  });
}

/**
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "SES events webhook",
    accepts: ["Bounce", "Complaint", "Delivery"],
  });
}
