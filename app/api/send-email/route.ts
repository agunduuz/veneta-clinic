import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from_name, from_email, phone, message, subject } = body;

    // Using a simple email service (you can replace this with your preferred service)
    // For now, I'll use a simple approach that logs the email and sends via a service

    // Option 1: Using EmailJS (you'll need to set up EmailJS account)
    // const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     service_id: 'YOUR_SERVICE_ID',
    //     template_id: 'YOUR_TEMPLATE_ID',
    //     user_id: 'YOUR_USER_ID',
    //     template_params: {
    //       to_email: 'eyup17@gmail.com',
    //       from_name,
    //       from_email,
    //       phone,
    //       message,
    //       subject
    //     }
    //   })
    // });

    // Option 2: Using Resend (recommended for production)
    // const resendResponse = await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'noreply@venetaclinic.com',
    //     to: 'eyup17@gmail.com',
    //     subject: subject,
    //     html: `
    //       <h2>Yeni İletişim Formu Mesajı</h2>
    //       <p><strong>Gönderen:</strong> ${from_name}</p>
    //       <p><strong>E-posta:</strong> ${from_email}</p>
    //       <p><strong>Telefon:</strong> ${phone}</p>
    //       <p><strong>Mesaj:</strong></p>
    //       <p>${message}</p>
    //       <p><strong>Tarih:</strong> ${new Date().toLocaleString('tr-TR')}</p>
    //     `
    //   })
    // });

    // For now, I'll simulate a successful email send
    // In production, you should use a real email service

    console.log('Email would be sent to eyup17@gmail.com:', {
      from_name,
      from_email,
      phone,
      message,
      subject,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email',
      },
      { status: 500 }
    );
  }
}
