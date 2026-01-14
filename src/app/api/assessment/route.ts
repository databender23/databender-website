import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads/lead-service";
import { enrollAndSendDay0 } from "@/lib/sequences/processor";

interface AssessmentScores {
  total: number;
  tier: string;
  dataInfrastructure?: number;
  analyticsCapability?: number;
  automationMaturity?: number;
  aiReadiness?: number;
  [key: string]: number | string | undefined;
}

interface AssessmentContact {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
}

interface AssessmentData {
  answers: Record<string, unknown>;
  scores: AssessmentScores;
  contact: AssessmentContact;
  assessmentType?: string;
  visitorId?: string;
  sessionId?: string;
  sourcePage?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, scores, contact, assessmentType, visitorId, sessionId, sourcePage } =
      body as AssessmentData;

    // Validate required fields
    if (!answers || !scores || !contact) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate contact info
    const { firstName, lastName, email, company, phone } = contact;
    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: "Missing contact information" },
        { status: 400 }
      );
    }

    console.log("Assessment submission:", {
      contact: { firstName, lastName, email, company },
      scores: {
        total: scores.total,
        tier: scores.tier,
        dataInfrastructure: scores.dataInfrastructure,
        analyticsCapability: scores.analyticsCapability,
        automationMaturity: scores.automationMaturity,
        aiReadiness: scores.aiReadiness,
      },
      timestamp: new Date().toISOString(),
    });

    // Create lead in database with assessment scores (fire and forget)
    (async () => {
      try {
        // Build assessment scores object with numeric values only
        const assessmentScores: Record<string, number> = {
          total: scores.total,
        };

        // Add category scores if present
        if (scores.dataInfrastructure !== undefined) {
          assessmentScores.dataInfrastructure = scores.dataInfrastructure;
        }
        if (scores.analyticsCapability !== undefined) {
          assessmentScores.analyticsCapability = scores.analyticsCapability;
        }
        if (scores.automationMaturity !== undefined) {
          assessmentScores.automationMaturity = scores.automationMaturity;
        }
        if (scores.aiReadiness !== undefined) {
          assessmentScores.aiReadiness = scores.aiReadiness;
        }

        const lead = await createLead({
          firstName,
          lastName,
          email,
          company,
          phone,
          formType: "assessment",
          resourceSlug: assessmentType || "data-ai-readiness",
          resourceTitle: assessmentType
            ? `${assessmentType.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Assessment`
            : "Data & AI Readiness Assessment",
          sourcePage: sourcePage || "/assessments/data-ai-readiness",
          leadSource: "website",
          visitorId,
          sessionId,
          assessmentScores,
          assessmentTier: scores.tier,
        });
        console.log(`Lead created for ${email} with assessment scores`);

        // Enroll in email sequence and send Day 0 email
        try {
          await enrollAndSendDay0(lead, "assessment");
          console.log(`Assessment sequence started for ${email}`);
        } catch (seqErr) {
          console.error(`Failed to start assessment sequence for ${email}:`, seqErr);
        }
      } catch (err) {
        console.error("Lead creation failed:", err);
      }
    })();

    return NextResponse.json(
      { success: true, message: "Assessment submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Assessment submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
