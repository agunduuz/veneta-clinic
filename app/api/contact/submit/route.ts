// app/api/contact/submit/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST - Contact form submission
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, locale } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        message,
        locale: locale || "tr",
        status: "new",
      },
    });

    // Get contact page for email settings
    const contactPage = await prisma.contactPage.findUnique({
      where: { locale: locale || "tr" },
    });

    // Send email
    if (contactPage) {
      try {
        const emailData = {
          to_email: contactPage.emailRecipient,
          from_name: `${firstName} ${lastName}`,
          from_email: email,
          phone: phone,
          message: message,
          subject: contactPage.emailSubject,
        };

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({ success: true, submission }, { status: 201 });
  } catch (error) {
    console.error("Contact submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
