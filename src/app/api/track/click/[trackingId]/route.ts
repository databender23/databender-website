/**
 * Email Click Tracking Endpoint
 *
 * Records the click event and redirects to the destination URL.
 * The tracking ID contains both the lead info and the destination.
 */

import { NextRequest, NextResponse } from "next/server";
import { decodeTrackingId } from "@/lib/sequences/tracking";
import { recordClickEvent } from "@/lib/leads/dynamodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  // Decode the tracking data
  const trackingData = decodeTrackingId(trackingId);

  if (!trackingData) {
    console.warn("[Track Click] Invalid tracking ID:", trackingId);
    // Redirect to homepage if tracking ID is invalid
    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co")
    );
  }

  // Validate destination URL
  const destinationUrl = trackingData.destinationUrl;
  if (!destinationUrl) {
    console.warn("[Track Click] No destination URL in tracking data");
    return NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "https://databender.co")
    );
  }

  // Extract request metadata
  const userAgent = request.headers.get("user-agent") || undefined;
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() || request.headers.get("x-real-ip") || undefined;

  // Record the click event asynchronously (don't block the redirect)
  recordClickEvent(trackingData.leadId, {
    timestamp: new Date().toISOString(),
    emailDay: trackingData.emailDay,
    url: destinationUrl,
    sequenceType: trackingData.sequenceType,
    emailId: trackingData.emailId,
    userAgent,
    ip,
  }).catch((error) => {
    console.error("[Track Click] Failed to record click event:", error);
  });

  // Redirect to the destination URL
  // Use 302 (Found) for temporary redirect - allows browsers to re-track on repeat clicks
  return NextResponse.redirect(destinationUrl, 302);
}
