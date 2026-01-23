/**
 * Email Templates API
 *
 * GET - List all templates
 * POST - Create a new template
 */

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import {
  listTemplates,
  createTemplate,
  seedDefaultTemplates,
} from "@/lib/email/templates";

export async function GET() {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Seed defaults if needed (first request will create them)
    await seedDefaultTemplates();

    const templates = await listTemplates();
    return NextResponse.json({ templates });
  } catch (error) {
    console.error("[API] List templates error:", error);
    return NextResponse.json(
      { error: "Failed to list templates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, category, subject, body: templateBody } = body;

    // Validate required fields
    if (!name || !category || !subject || !templateBody) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "name, category, subject, and body are required",
        },
        { status: 400 }
      );
    }

    const template = await createTemplate({
      name,
      category,
      subject,
      body: templateBody,
    });

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    console.error("[API] Create template error:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}
