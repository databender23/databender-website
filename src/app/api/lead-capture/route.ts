import { NextResponse } from "next/server";

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
      formType,
      resourceSlug,
      resourceTitle,
      submittedAt,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
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

    // In production, you would:
    // 1. Store in CRM (HubSpot, Salesforce, etc.)
    // 2. Send email with the resource (using Resend, SendGrid)
    // 3. Trigger email nurture sequence
    // 4. For audits: Create task/notification for sales team

    // Log the submission
    console.log("Lead capture submission:", {
      formType,
      resourceSlug,
      resourceTitle,
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      submittedAt,
    });

    // Example: Send resource email with Resend (uncomment and add API key)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // if (formType === "guide") {
    //   await resend.emails.send({
    //     from: 'Databender <resources@databender.co>',
    //     to: [email],
    //     subject: `Your Guide: ${resourceTitle}`,
    //     html: `
    //       <h2>Here's your guide!</h2>
    //       <p>Hi ${firstName},</p>
    //       <p>Thanks for downloading "${resourceTitle}".</p>
    //       <p><a href="${process.env.SITE_URL}/downloads/${resourceSlug}.pdf">Download your guide</a></p>
    //     `,
    //   });
    // }
    //
    // if (formType === "audit") {
    //   // Notify sales team
    //   await resend.emails.send({
    //     from: 'Databender <notifications@databender.co>',
    //     to: ['sales@databender.co'],
    //     subject: `New Audit Request: ${resourceTitle} from ${company}`,
    //     html: `
    //       <h2>New Audit Request</h2>
    //       <p><strong>Audit:</strong> ${resourceTitle}</p>
    //       <p><strong>Contact:</strong> ${firstName} ${lastName}</p>
    //       <p><strong>Email:</strong> ${email}</p>
    //       <p><strong>Company:</strong> ${company}</p>
    //       <p><strong>Message:</strong> ${message || 'None'}</p>
    //     `,
    //   });
    // }

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
