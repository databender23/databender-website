import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, company, phone, message } = body;

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

    // In production, you would:
    // 1. Send email notification (using Resend, SendGrid, AWS SES)
    // 2. Store in database or CRM
    // 3. Trigger automation workflows

    // For now, log the submission
    console.log("Contact form submission:", {
      firstName,
      lastName,
      email,
      company,
      phone,
      message,
      timestamp: new Date().toISOString(),
    });

    // Example: Send email with Resend (uncomment and add API key)
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'Databender <notifications@databender.co>',
    //   to: ['info@databender.co'],
    //   subject: `New Contact Form: ${firstName} ${lastName} from ${company}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company}</p>
    //     <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

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
