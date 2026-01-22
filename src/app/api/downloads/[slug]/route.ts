import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Map of valid guide slugs to their PDF filenames
const VALID_GUIDES: Record<string, string> = {
  // Legal guides
  "associate-multiplier": "associate-multiplier.pdf",
  "last-vendor": "last-vendor.pdf",
  "partner-succession": "partner-succession.pdf",
  "win-more-pitches": "win-more-pitches.pdf",
  "own-your-ai": "own-your-ai.pdf",
  "economics-of-legal-ai": "economics-of-legal-ai.pdf",
  "simplify-tech-stack": "simplify-tech-stack.pdf",
  // Healthcare guides
  "hipaa-compliant-ai": "hipaa-compliant-ai.pdf",
  "institutional-knowledge-healthcare": "institutional-knowledge-healthcare.pdf",
  "document-intelligence-healthcare": "document-intelligence-healthcare.pdf",
  "prior-auth-burden": "prior-auth-burden.pdf",
  "pe-healthcare-operations": "pe-healthcare-operations.pdf",
  // Manufacturing guides
  "data-cleanup-manufacturing": "data-cleanup-manufacturing.pdf",
  "lead-scoring-manufacturing": "lead-scoring-manufacturing.pdf",
  "operational-visibility-playbook": "operational-visibility-playbook.pdf",
  "manufacturing-ai-privacy": "manufacturing-ai-privacy.pdf",
  "do-more-with-fewer-people": "do-more-with-fewer-people.pdf",
  "90-day-data-roadmap": "90-day-data-roadmap.pdf",
  "supply-chain-visibility-playbook": "supply-chain-visibility-playbook.pdf",
  "erp-integration-guide": "erp-integration-guide.pdf",
  // CRE Broker guides
  "entity-resolution-cre": "entity-resolution-cre.pdf",
  "data-room-review": "data-room-review.pdf",
  "deal-prioritization": "deal-prioritization.pdf",
  // CRE Property Manager guides
  "portfolio-visibility-cre": "portfolio-visibility-cre.pdf",
  "investor-reporting-cre": "investor-reporting-cre.pdf",
  "lease-intelligence-cre": "lease-intelligence-cre.pdf",
  "debt-maturity-wall": "debt-maturity-wall.pdf",
  "cam-reconciliation-guide": "cam-reconciliation-guide.pdf",
  // Construction guides
  "project-visibility-playbook": "project-visibility-playbook.pdf",
  "change-order-recovery": "change-order-recovery.pdf",
  "construction-post-acquisition": "construction-post-acquisition.pdf",
  // Distribution guides
  "inventory-intelligence-guide": "inventory-intelligence-guide.pdf",
  "customer-profitability-distribution": "customer-profitability-distribution.pdf",
  "pricing-discipline-distribution": "pricing-discipline-distribution.pdf",
  "distribution-labor-shortage-playbook": "distribution-labor-shortage-playbook.pdf",
  "distribution-tariff-response-guide": "distribution-tariff-response-guide.pdf",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Validate slug to prevent path traversal
  const filename = VALID_GUIDES[slug];
  if (!filename) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  try {
    // Read the PDF file from the public/downloads directory
    const filePath = path.join(process.cwd(), "public", "downloads", filename);
    const fileBuffer = await readFile(filePath);

    // Create response with proper headers for corporate environments
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        // Proper MIME type for PDFs
        "Content-Type": "application/pdf",
        // Trigger download with readable filename
        "Content-Disposition": `attachment; filename="${filename}"`,
        // Content length for progress indicators
        "Content-Length": fileBuffer.length.toString(),
        // Cache for 1 hour (helps with repeated downloads)
        "Cache-Control": "public, max-age=3600",
        // Security headers that work with corporate proxies
        "X-Content-Type-Options": "nosniff",
        // Allow embedding in same-origin frames only
        "X-Frame-Options": "SAMEORIGIN",
      },
    });

    return response;
  } catch (error) {
    console.error("PDF download error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
