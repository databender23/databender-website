import { NextResponse } from "next/server";
import { createLead, enrichLeadWithAnalytics } from "@/lib/leads/lead-service";
import { sendSlackAlert } from "@/lib/notifications/slack";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  // Analytics data for lead enrichment
  visitorId?: string;
  sessionId?: string;
  sourcePage?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      visitorId,
      sessionId,
      sourcePage,
    } = body as ContactFormData;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // Create lead in database (fire and forget to not block response)
    (async () => {
      try {
        // Enrich with analytics data if visitorId/sessionId provided
        let analyticsData = {};
        if (visitorId && sessionId) {
          analyticsData = await enrichLeadWithAnalytics(visitorId, sessionId);
        }

        await createLead({
          firstName,
          lastName,
          email,
          company,
          phone,
          message,
          formType: "contact",
          sourcePage: sourcePage || "/contact",
          visitorId,
          sessionId,
          ...analyticsData,
        });
        console.log(`Lead created for ${email}`);
      } catch (err) {
        console.error("Lead creation failed:", err);
      }
    })();

    // Send Slack notification (fire and forget)
    (async () => {
      try {
        await sendSlackAlert({
          type: "conversion",
          conversionType: "contact_form",
          visitorId: visitorId || "unknown",
          page: sourcePage || "/contact",
          company,
          formData: {
            name: `${firstName} ${lastName}`,
            email,
            company,
            message: message.substring(0, 200), // Truncate for notification
          },
        });
      } catch (err) {
        console.error("Slack notification failed:", err);
      }
    })();

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
