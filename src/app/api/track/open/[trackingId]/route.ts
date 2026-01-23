/**
 * Email Open Tracking Endpoint
 *
 * Serves a 1x1 transparent GIF and records the open event.
 * The tracking ID is decoded to identify the lead and email.
 */

import { NextRequest, NextResponse } from "next/server";
import { decodeTrackingId, TRANSPARENT_GIF } from "@/lib/sequences/tracking";
import { recordOpenEvent } from "@/lib/leads/dynamodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  // Always return the transparent GIF first, then record async
  // This ensures the email client gets a fast response
  // Convert Buffer to Uint8Array for NextResponse compatibility
  const gifData = new Uint8Array(TRANSPARENT_GIF);
  const response = new NextResponse(gifData, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": TRANSPARENT_GIF.length.toString(),
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });

  // Decode and record the open event (fire and forget)
  const trackingData = decodeTrackingId(trackingId);

  if (trackingData) {
    // Extract request metadata
    const userAgent = request.headers.get("user-agent") || undefined;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0].trim() || request.headers.get("x-real-ip") || undefined;

    // Record the open event asynchronously (don't await)
    recordOpenEvent(trackingData.leadId, {
      timestamp: new Date().toISOString(),
      emailDay: trackingData.emailDay,
      sequenceType: trackingData.sequenceType,
      emailId: trackingData.emailId,
      userAgent,
      ip,
    }).catch((error) => {
      console.error("[Track Open] Failed to record open event:", error);
    });
  } else {
    console.warn("[Track Open] Invalid tracking ID:", trackingId);
  }

  return response;
}
