import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { timingSafeEqual } from "crypto";
import { getLeadByEmail, updateLead, addLeadNote } from "@/lib/leads/dynamodb";
import type { LeadStatus, LeadTier, LeadNote } from "@/lib/leads/types";

/**
 * Webhook endpoint for external automation tools (Instantly, Apollo.io, Dripify)
 * to update lead status and record contact activities.
 *
 * Authentication: x-api-key header must match WEBHOOK_API_KEY env var
 */

type WebhookAction = "update_status" | "record_contact" | "add_note" | "update_tier";
type ContactChannel = "linkedin" | "email" | "phone" | "other";

interface WebhookPayload {
  action: WebhookAction;
  email: string;
  // For update_status
  status?: LeadStatus;
  // For record_contact
  channel?: ContactChannel;
  campaign?: string;
  contactNotes?: string;
  // For add_note
  note?: string;
  author?: string;
  // For update_tier
  tier?: LeadTier;
}

interface WebhookResponse {
  success: boolean;
  lead?: {
    email: string;
    status: LeadStatus;
    updatedAt: string;
  };
  error?: string;
}

/**
 * Validate the API key from request headers using timing-safe comparison
 * Prevents timing attacks that could leak key information
 */
function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.WEBHOOK_API_KEY;

  if (!expectedKey) {
    console.error("WEBHOOK_API_KEY environment variable not configured");
    return false;
  }

  if (!apiKey) {
    return false;
  }

  // Use timing-safe comparison to prevent timing attacks
  try {
    const apiKeyBuffer = Buffer.from(apiKey, "utf-8");
    const expectedKeyBuffer = Buffer.from(expectedKey, "utf-8");

    // Buffers must be same length for timingSafeEqual
    if (apiKeyBuffer.length !== expectedKeyBuffer.length) {
      return false;
    }

    return timingSafeEqual(apiKeyBuffer, expectedKeyBuffer);
  } catch {
    return false;
  }
}

/**
 * Log webhook calls for debugging
 */
function logWebhookCall(
  action: string,
  email: string,
  success: boolean,
  details?: Record<string, unknown>
): void {
  console.log(
    JSON.stringify({
      type: "webhook_call",
      timestamp: new Date().toISOString(),
      action,
      email,
      success,
      ...details,
    })
  );
}

export async function POST(request: Request): Promise<NextResponse<WebhookResponse>> {
  try {
    // Validate API key
    if (!validateApiKey(request)) {
      logWebhookCall("unknown", "unknown", false, { reason: "invalid_api_key" });
      return NextResponse.json(
        { success: false, error: "Invalid API key" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = (await request.json()) as WebhookPayload;
    const { action, email } = body;

    // Validate required fields
    if (!email) {
      logWebhookCall(action || "unknown", "missing", false, {
        reason: "missing_email",
      });
      return NextResponse.json(
        { success: false, error: "Missing required field: email" },
        { status: 400 }
      );
    }

    if (!action) {
      logWebhookCall("missing", email, false, { reason: "missing_action" });
      return NextResponse.json(
        { success: false, error: "Missing required field: action" },
        { status: 400 }
      );
    }

    // Validate action type
    const validActions: WebhookAction[] = [
      "update_status",
      "record_contact",
      "add_note",
      "update_tier",
    ];
    if (!validActions.includes(action)) {
      logWebhookCall(action, email, false, { reason: "invalid_action" });
      return NextResponse.json(
        {
          success: false,
          error: `Invalid action: ${action}. Must be one of: ${validActions.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Find lead by email
    let lead;
    try {
      lead = await getLeadByEmail(email);
    } catch (dbError) {
      console.error("DynamoDB error looking up lead:", dbError);
      logWebhookCall(action, email, false, {
        reason: "database_error",
        error: dbError instanceof Error ? dbError.message : String(dbError)
      });
      return NextResponse.json(
        { success: false, error: "Database error looking up lead" },
        { status: 503 }
      );
    }

    if (!lead) {
      logWebhookCall(action, email, false, { reason: "lead_not_found" });
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();

    // Perform the requested action
    switch (action) {
      case "update_status": {
        if (!body.status) {
          logWebhookCall(action, email, false, { reason: "missing_status" });
          return NextResponse.json(
            { success: false, error: "Missing required field: status" },
            { status: 400 }
          );
        }

        const validStatuses: LeadStatus[] = [
          "new",
          "contacted",
          "qualified",
          "opportunity",
          "customer",
          "lost",
        ];
        if (!validStatuses.includes(body.status)) {
          logWebhookCall(action, email, false, { reason: "invalid_status" });
          return NextResponse.json(
            {
              success: false,
              error: `Invalid status: ${body.status}. Must be one of: ${validStatuses.join(", ")}`,
            },
            { status: 400 }
          );
        }

        await updateLead(lead.email, lead.createdAt, {
          status: body.status,
          lastActivityAt: now,
        });

        logWebhookCall(action, email, true, {
          previousStatus: lead.status,
          newStatus: body.status,
        });

        return NextResponse.json({
          success: true,
          lead: {
            email: lead.email,
            status: body.status,
            updatedAt: now,
          },
        });
      }

      case "record_contact": {
        // Record contact as a structured note
        const channel = body.channel || "other";
        const campaign = body.campaign || "Unknown campaign";
        const contactNotes = body.contactNotes || "";

        const noteContent = [
          `[Contact via ${channel.toUpperCase()}]`,
          `Campaign: ${campaign}`,
          contactNotes ? `Notes: ${contactNotes}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        const note: LeadNote = {
          id: uuidv4(),
          content: noteContent,
          author: "Automation",
          createdAt: now,
        };

        await addLeadNote(lead.email, lead.createdAt, note);

        // Also update status to "contacted" if currently "new"
        let newStatus = lead.status;
        if (lead.status === "new") {
          newStatus = "contacted";
          await updateLead(lead.email, lead.createdAt, {
            status: "contacted",
            lastActivityAt: now,
          });
        } else {
          await updateLead(lead.email, lead.createdAt, {
            lastActivityAt: now,
          });
        }

        logWebhookCall(action, email, true, {
          channel,
          campaign,
          statusChanged: lead.status === "new",
        });

        return NextResponse.json({
          success: true,
          lead: {
            email: lead.email,
            status: newStatus,
            updatedAt: now,
          },
        });
      }

      case "add_note": {
        if (!body.note) {
          logWebhookCall(action, email, false, { reason: "missing_note" });
          return NextResponse.json(
            { success: false, error: "Missing required field: note" },
            { status: 400 }
          );
        }

        const note: LeadNote = {
          id: uuidv4(),
          content: body.note,
          author: body.author || "Automation",
          createdAt: now,
        };

        await addLeadNote(lead.email, lead.createdAt, note);
        await updateLead(lead.email, lead.createdAt, {
          lastActivityAt: now,
        });

        logWebhookCall(action, email, true, {
          author: note.author,
          noteLength: body.note.length,
        });

        return NextResponse.json({
          success: true,
          lead: {
            email: lead.email,
            status: lead.status,
            updatedAt: now,
          },
        });
      }

      case "update_tier": {
        if (!body.tier) {
          logWebhookCall(action, email, false, { reason: "missing_tier" });
          return NextResponse.json(
            { success: false, error: "Missing required field: tier" },
            { status: 400 }
          );
        }

        const validTiers: LeadTier[] = ["A", "B", "C"];
        if (!validTiers.includes(body.tier)) {
          logWebhookCall(action, email, false, { reason: "invalid_tier" });
          return NextResponse.json(
            {
              success: false,
              error: `Invalid tier: ${body.tier}. Must be one of: ${validTiers.join(", ")}`,
            },
            { status: 400 }
          );
        }

        await updateLead(lead.email, lead.createdAt, {
          tier: body.tier,
          lastActivityAt: now,
        });

        logWebhookCall(action, email, true, {
          previousTier: lead.tier,
          newTier: body.tier,
        });

        return NextResponse.json({
          success: true,
          lead: {
            email: lead.email,
            status: lead.status,
            updatedAt: now,
          },
        });
      }

      default: {
        // This should never happen due to earlier validation
        logWebhookCall(action, email, false, { reason: "unhandled_action" });
        return NextResponse.json(
          { success: false, error: "Unhandled action" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Webhook error:", error);
    logWebhookCall("unknown", "unknown", false, {
      reason: "internal_error",
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
