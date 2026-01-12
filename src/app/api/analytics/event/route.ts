import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { trackEvent, updateSession } from "@/lib/analytics/dynamodb";
import type { AnalyticsEvent, TrackedEvent } from "@/lib/analytics/events";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, visitorId, sessionId, device } = body as {
      event: AnalyticsEvent;
      visitorId: string;
      sessionId: string;
      device: "desktop" | "mobile" | "tablet";
    };

    if (!event || !visitorId || !sessionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || undefined;
    const timestamp = new Date().toISOString();

    const trackedEvent: TrackedEvent = {
      eventId: uuidv4(),
      visitorId,
      sessionId,
      timestamp,
      userAgent,
      ...event,
    };

    // Track the event
    await trackEvent(trackedEvent);

    // Update session info for pageviews
    if (event.eventType === "pageview") {
      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1, // This will be incremented in a real implementation
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: false,
      });
    }

    // Mark conversion for form submissions and chat leads
    if (event.eventType === "form_submit" || event.eventType === "chat_lead_detected") {
      await updateSession({
        sessionId,
        visitorId,
        startTime: timestamp,
        pageCount: 1,
        entryPage: event.page,
        exitPage: event.page,
        device,
        isConverted: true,
        conversionType: event.eventType === "chat_lead_detected" ? "chat_lead" : (event.data?.formName as string) || "form",
      });
    }

    return NextResponse.json({ success: true, eventId: trackedEvent.eventId });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
