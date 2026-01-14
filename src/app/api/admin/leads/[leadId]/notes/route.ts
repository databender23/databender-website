import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { addNoteToLead } from "@/lib/leads/lead-service";

interface RouteContext {
  params: Promise<{ leadId: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leadId } = await context.params;

  try {
    const body = await request.json();

    // Validate required fields
    if (!body.content || typeof body.content !== "string" || body.content.trim() === "") {
      return NextResponse.json(
        { error: "Missing required field: content" },
        { status: 400 }
      );
    }

    const note = await addNoteToLead(leadId, body.content.trim(), body.author);

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Error adding note to lead:", error);

    // Check if this is a "not found" error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to add note" }, { status: 500 });
  }
}
