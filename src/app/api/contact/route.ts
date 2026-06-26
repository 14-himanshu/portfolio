import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
// It will fall back to a mock instance if the key is not set so the build doesn't fail
const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(request: Request) {
  try {
    const { name, email, details } = await request.json();

    if (!name || !email || !details) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Using onboarding@resend.dev as the default sender if RESEND_FROM_EMAIL is not set.
    // This helps bypass spam filters when sending to your own verified email.
    // If you have a verified domain on Resend, you can set RESEND_FROM_EMAIL=noreply@yourdomain.com in .env.local
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Attempt to send email
    const data = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: process.env.CONTACT_EMAIL as string, // Read from environment variables
      subject: `New Project Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${details}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #333; margin-top: 0;">New Contact Form Submission</h2>
          <p style="color: #555;"><strong>Name:</strong> ${name}</p>
          <p style="color: #555;"><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
          <p style="color: #444; line-height: 1.6; white-space: pre-wrap;">${details}</p>
        </div>
      `,
    });

    if (data.error) {
      console.error('Resend Error:', data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
