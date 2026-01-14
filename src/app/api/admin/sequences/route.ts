/**
 * Admin Sequences API
 *
 * Manage email sequences: pause, resume, handle replies, view status
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { scanLeadsWithActiveSequences, getLeadByEmail } from "@/lib/leads/dynamodb";
import {
  pauseSequence,
  resumeSequence,
  handleReply,
  handleBounce,
  canEnroll,
} from "@/lib/sequences/sequence-service";
import type { BounceType } from "@/lib/sequences/types";

/**
 * Check admin authentication
 */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_authenticated");
  return authCookie?.value === "true";
}

/**
 * GET: List leads with active sequences or get sequence status for specific email
 */
export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  // Single lead lookup
  if (email) {
    const lead = await getLeadByEmail(email.toLowerCase());
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const enrollCheck = await canEnroll(email);

    return NextResponse.json({
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
      company: lead.company,
      sequence: lead.emailSequence || null,
      canEnroll: enrollCheck.canEnroll,
      canEnrollReason: enrollCheck.reason,
    });
  }

  // List all active sequences
  try {
    const leads = await scanLeadsWithActiveSequences();

    const sequenceSummary = leads.map((lead) => ({
      email: lead.email,
      firstName: lead.firstName,
      lastName: lead.lastName,
      company: lead.company,
      sequenceType: lead.emailSequence?.sequenceType,
      status: lead.emailSequence?.status,
      pauseReason: lead.emailSequence?.pauseReason,
      currentDay: lead.emailSequence?.currentDay,
      enrolledAt: lead.emailSequence?.enrolledAt,
      bounceType: lead.emailSequence?.bounceType,
      bounceCount: lead.emailSequence?.bounceCount,
      repliedAt: lead.emailSequence?.repliedAt,
    }));

    return NextResponse.json({
      total: leads.length,
      sequences: sequenceSummary,
    });
  } catch (error) {
    console.error("[Admin Sequences] Error listing sequences:", error);
    return NextResponse.json(
      { error: "Failed to list sequences" },
      { status: 500 }
    );
  }
}

/**
 * POST: Manage sequence actions
 *
 * Actions:
 * - pause: Pause a sequence with reason
 * - resume: Resume a paused sequence
 * - reply: Mark as replied (pauses sequence)
 * - bounce: Simulate/record a bounce
 */
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, email, reason, bounceType } = body as {
      action: string;
      email: string;
      reason?: string;
      bounceType?: BounceType;
    };

    if (!action || !email) {
      return NextResponse.json(
        { error: "Missing required fields: action, email" },
        { status: 400 }
      );
    }

    switch (action) {
      case "pause": {
        const success = await pauseSequence(email, reason || "manual");
        return NextResponse.json({
          success,
          action: "pause",
          email,
          reason: reason || "manual",
        });
      }

      case "resume": {
        const result = await resumeSequence(email);
        return NextResponse.json({
          success: result.success,
          action: "resume",
          email,
          reason: result.reason,
        });
      }

      case "reply": {
        const success = await handleReply(email);
        return NextResponse.json({
          success,
          action: "reply",
          email,
          message: success
            ? "Sequence paused due to reply"
            : "Failed to process reply",
        });
      }

      case "bounce": {
        const bt = bounceType || "soft";
        const result = await handleBounce(email, bt, reason);
        return NextResponse.json({
          success: result.success,
          action: "bounce",
          email,
          bounceType: bt,
          result: result.action,
        });
      }

      case "check": {
        const enrollCheck = await canEnroll(email);
        const lead = await getLeadByEmail(email.toLowerCase());
        return NextResponse.json({
          success: true,
          action: "check",
          email,
          canEnroll: enrollCheck.canEnroll,
          reason: enrollCheck.reason,
          currentSequence: lead?.emailSequence || null,
        });
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("[Admin Sequences] Error processing action:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
