/**
 * Lead Import API
 *
 * Bulk import leads from CSV file with optional sequence enrollment.
 *
 * Expected CSV columns (case-insensitive):
 * - email (required)
 * - firstName or first_name
 * - lastName or last_name
 * - company
 * - phone
 * - industry
 * - tier (A, B, C)
 * - tags (comma-separated)
 * - notes
 *
 * Query params:
 * - sequenceType: "assessment" | "guide-legal" | "guide-general" (optional)
 * - skipExisting: "true" to skip leads that already exist
 * - dryRun: "true" to validate without importing
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Papa from "papaparse";
import { createLead } from "@/lib/leads/lead-service";
import { getLeadByEmail } from "@/lib/leads/dynamodb";
import { enrollAndSendDay0 } from "@/lib/sequences/processor";
import { canEnroll } from "@/lib/sequences/sequence-service";
import type { SequenceType } from "@/lib/sequences/types";
import type { CreateLeadInput, LeadTier } from "@/lib/leads/types";

interface CSVRow {
  email?: string;
  firstName?: string;
  first_name?: string;
  lastName?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  industry?: string;
  tier?: string;
  tags?: string;
  notes?: string;
  message?: string;
  [key: string]: string | undefined;
}

interface ImportResult {
  row: number;
  email: string;
  status: "created" | "updated" | "skipped" | "error";
  enrolled?: boolean;
  error?: string;
}

/**
 * Check admin authentication
 */
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_authenticated");
  return authCookie?.value === "true";
}

/**
 * Normalize CSV column names to handle different formats
 */
function normalizeRow(row: CSVRow): {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  industry?: string;
  tier?: LeadTier;
  tags?: string[];
  notes?: string;
  message?: string;
} {
  const email = (row.email || row.Email || row.EMAIL || "").trim().toLowerCase();
  const firstName = (row.firstName || row.first_name || row.FirstName || row.FIRST_NAME || "").trim();
  const lastName = (row.lastName || row.last_name || row.LastName || row.LAST_NAME || "").trim();
  const company = (row.company || row.Company || row.COMPANY || "").trim() || undefined;
  const phone = (row.phone || row.Phone || row.PHONE || "").trim() || undefined;
  const industry = (row.industry || row.Industry || row.INDUSTRY || "").trim() || undefined;
  const tierRaw = (row.tier || row.Tier || row.TIER || "").trim().toUpperCase();
  const tagsRaw = (row.tags || row.Tags || row.TAGS || "").trim();
  const notes = (row.notes || row.Notes || row.NOTES || "").trim() || undefined;
  const message = (row.message || row.Message || row.MESSAGE || "").trim() || undefined;

  // Validate tier
  let tier: LeadTier | undefined;
  if (tierRaw === "A" || tierRaw === "B" || tierRaw === "C") {
    tier = tierRaw;
  }

  // Parse tags
  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : undefined;

  return {
    email,
    firstName,
    lastName,
    company,
    phone,
    industry,
    tier,
    tags,
    notes,
    message,
  };
}

/**
 * Validate an email address
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST: Import leads from CSV
 */
export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get query params
    const { searchParams } = new URL(request.url);
    const sequenceType = searchParams.get("sequenceType") as SequenceType | null;
    const skipExisting = searchParams.get("skipExisting") === "true";
    const dryRun = searchParams.get("dryRun") === "true";

    // Validate sequence type if provided
    if (sequenceType && !["assessment", "guide-legal", "guide-general"].includes(sequenceType)) {
      return NextResponse.json(
        { error: "Invalid sequenceType. Must be: assessment, guide-legal, or guide-general" },
        { status: 400 }
      );
    }

    // Get form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Use multipart/form-data with 'file' field." },
        { status: 400 }
      );
    }

    // Read file content
    const csvContent = await file.text();

    // Parse CSV
    const parseResult = Papa.parse<CSVRow>(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parseResult.errors.length > 0) {
      return NextResponse.json(
        {
          error: "CSV parsing errors",
          details: parseResult.errors.slice(0, 10),
        },
        { status: 400 }
      );
    }

    const rows = parseResult.data;
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "CSV file is empty or has no data rows" },
        { status: 400 }
      );
    }

    console.log(`[Lead Import] Processing ${rows.length} rows, dryRun=${dryRun}, sequenceType=${sequenceType}`);

    const results: ImportResult[] = [];
    let created = 0;
    let updated = 0;
    let skipped = 0;
    let errors = 0;
    let enrolled = 0;

    for (let i = 0; i < rows.length; i++) {
      const rowNum = i + 2; // +2 for header row + 1-indexed
      const row = rows[i];
      const normalized = normalizeRow(row);

      // Validate email
      if (!normalized.email) {
        results.push({
          row: rowNum,
          email: "",
          status: "error",
          error: "Missing email",
        });
        errors++;
        continue;
      }

      if (!isValidEmail(normalized.email)) {
        results.push({
          row: rowNum,
          email: normalized.email,
          status: "error",
          error: "Invalid email format",
        });
        errors++;
        continue;
      }

      // Check if lead exists
      const existingLead = await getLeadByEmail(normalized.email);
      const isUpdate = !!existingLead;

      if (isUpdate && skipExisting) {
        results.push({
          row: rowNum,
          email: normalized.email,
          status: "skipped",
        });
        skipped++;
        continue;
      }

      // Dry run - don't actually create
      if (dryRun) {
        results.push({
          row: rowNum,
          email: normalized.email,
          status: isUpdate ? "updated" : "created",
          enrolled: sequenceType ? true : undefined,
        });
        if (isUpdate) updated++;
        else created++;
        continue;
      }

      // Create or update lead
      try {
        const leadInput: CreateLeadInput = {
          email: normalized.email,
          firstName: normalized.firstName || "Unknown",
          lastName: normalized.lastName || "",
          company: normalized.company,
          phone: normalized.phone,
          identifiedIndustry: normalized.industry,
          message: normalized.message,
          formType: "contact", // Using contact as fallback type for imports
          sourcePage: "/admin/leads/import",
          leadSource: "csv-import", // Mark as imported lead (vs website-generated)
        };

        const lead = await createLead(leadInput);

        // Update tier and tags if provided (createLead might not handle these)
        // This would need additional logic in lead-service if we want to update these fields

        let didEnroll = false;

        // Enroll in sequence if requested
        if (sequenceType && lead) {
          const enrollCheck = await canEnroll(normalized.email);
          if (enrollCheck.canEnroll) {
            await enrollAndSendDay0(lead, sequenceType);
            didEnroll = true;
            enrolled++;
          }
        }

        results.push({
          row: rowNum,
          email: normalized.email,
          status: isUpdate ? "updated" : "created",
          enrolled: didEnroll,
        });

        if (isUpdate) updated++;
        else created++;
      } catch (error) {
        results.push({
          row: rowNum,
          email: normalized.email,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        });
        errors++;
      }
    }

    console.log(`[Lead Import] Complete: ${created} created, ${updated} updated, ${skipped} skipped, ${errors} errors, ${enrolled} enrolled`);

    return NextResponse.json({
      success: true,
      dryRun,
      summary: {
        total: rows.length,
        created,
        updated,
        skipped,
        errors,
        enrolled,
      },
      // Only include detailed results if there are errors or it's a dry run
      results: dryRun || errors > 0 ? results : undefined,
      // Always include error rows
      errorRows: results.filter((r) => r.status === "error"),
    });
  } catch (error) {
    console.error("[Lead Import] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * GET: Return import template and instructions
 */
export async function GET() {
  const isAuth = await isAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    endpoint: "Lead Import",
    method: "POST",
    contentType: "multipart/form-data",
    queryParams: {
      sequenceType: "Optional. One of: assessment, guide-legal, guide-general. Enrolls imported leads in email sequence.",
      skipExisting: "Optional. Set to 'true' to skip leads that already exist (by email).",
      dryRun: "Optional. Set to 'true' to validate CSV without importing.",
    },
    csvColumns: {
      required: ["email"],
      optional: [
        "firstName (or first_name)",
        "lastName (or last_name)",
        "company",
        "phone",
        "industry",
        "tier (A, B, or C)",
        "tags (comma-separated)",
        "notes",
        "message",
      ],
    },
    example: {
      curl: `curl -X POST '${process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co"}/api/admin/leads/import?sequenceType=assessment&dryRun=true' \\
  -H 'Cookie: admin_authenticated=true' \\
  -F 'file=@leads.csv'`,
      csvExample: `email,firstName,lastName,company,industry,tier
john@example.com,John,Doe,Acme Inc,manufacturing,A
jane@company.com,Jane,Smith,Tech Corp,legal,B`,
    },
  });
}
