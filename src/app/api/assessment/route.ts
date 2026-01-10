import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, scores, contact } = body;

    // Validate required fields
    if (!answers || !scores || !contact) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate contact info
    const { firstName, lastName, email, company } = contact;
    if (!firstName || !lastName || !email || !company) {
      return NextResponse.json(
        { error: "Missing contact information" },
        { status: 400 }
      );
    }

    // In production, you would:
    // 1. Store assessment results in database
    // 2. Send results email to user
    // 3. Send notification to sales team
    // 4. Add to CRM for follow-up
    // 5. Trigger email nurture sequence

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

    // Example: Send results email (uncomment and configure)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // // Send to user
    // await resend.emails.send({
    //   from: 'Databender <assessments@databender.co>',
    //   to: [email],
    //   subject: 'Your Data & AI Readiness Assessment Results',
    //   html: generateResultsEmail(scores, firstName),
    // });
    //
    // // Notify sales team
    // await resend.emails.send({
    //   from: 'Databender <notifications@databender.co>',
    //   to: ['sales@databender.co'],
    //   subject: `New Assessment: ${firstName} ${lastName} from ${company} (${scores.tier})`,
    //   html: `
    //     <h2>New Assessment Completed</h2>
    //     <p><strong>Contact:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company}</p>
    //     <p><strong>Score:</strong> ${scores.total}/100 (${scores.tier})</p>
    //     <h3>Category Scores:</h3>
    //     <ul>
    //       <li>Data Infrastructure: ${scores.dataInfrastructure}/25</li>
    //       <li>Analytics Capability: ${scores.analyticsCapability}/25</li>
    //       <li>Automation Maturity: ${scores.automationMaturity}/25</li>
    //       <li>AI Readiness: ${scores.aiReadiness}/25</li>
    //     </ul>
    //   `,
    // });

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
