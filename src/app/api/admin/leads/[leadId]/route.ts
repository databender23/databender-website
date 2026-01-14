import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { getLeadById, updateLeadStatus } from "@/lib/leads/lead-service";
import type { UpdateLeadInput, LeadStatus, LeadTier } from "@/lib/leads/types";

interface RouteContext {
  params: Promise<{ leadId: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leadId } = await context.params;

  try {
    const lead = await getLeadById(leadId);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { leadId } = await context.params;

  try {
    const body = await request.json();

    // Validate status if provided
    const validStatuses: LeadStatus[] = [
      "new",
      "contacted",
      "qualified",
      "opportunity",
      "customer",
      "lost",
    ];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    // Validate tier if provided
    const validTiers: LeadTier[] = ["A", "B", "C"];
    if (body.tier && !validTiers.includes(body.tier)) {
      return NextResponse.json(
        { error: `Invalid tier. Must be one of: ${validTiers.join(", ")}` },
        { status: 400 }
      );
    }

    const updates: UpdateLeadInput = {
      status: body.status,
      tier: body.tier,
      industry: body.industry,
      tags: body.tags,
      assignedTo: body.assignedTo,
    };

    await updateLeadStatus(leadId, updates);

    // Fetch the updated lead to return
    const updatedLead = await getLeadById(leadId);

    return NextResponse.json({ lead: updatedLead });
  } catch (error) {
    console.error("Error updating lead:", error);

    // Check if this is a "not found" error
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
