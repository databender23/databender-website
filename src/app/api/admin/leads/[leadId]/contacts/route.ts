import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { recordContact } from "@/lib/leads/lead-service";
import type { ContactChannel } from "@/lib/leads/types";

interface RouteContext {
  params: Promise<{ leadId: string }>;
}

const VALID_CHANNELS: ContactChannel[] = ["linkedin", "email", "phone", "other"];

export async function POST(request: NextRequest, context: RouteContext) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leadId } = await context.params;

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.channel || typeof body.channel !== "string") {
      return NextResponse.json(
        { error: "Missing required field: channel" },
        { status: 400 }
      );
    }

    // Validate channel value
    if (!VALID_CHANNELS.includes(body.channel as ContactChannel)) {
      return NextResponse.json(
        { error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(", ")}` },
        { status: 400 }
      );
    }

    const contact = await recordContact(
      leadId,
      body.channel as ContactChannel,
      body.campaign?.trim() || undefined,
      body.notes?.trim() || undefined
    );

    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    console.error("Error recording contact for lead:", error);

    // Check if this is a "not found" error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to record contact" }, { status: 500 });
  }
}
