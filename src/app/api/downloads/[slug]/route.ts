import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Map of valid guide slugs to their PDF filenames
const VALID_GUIDES: Record<string, string> = {
  "associate-multiplier": "associate-multiplier.pdf",
  "last-vendor": "last-vendor.pdf",
  "partner-succession": "partner-succession.pdf",
  "win-more-pitches": "win-more-pitches.pdf",
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
