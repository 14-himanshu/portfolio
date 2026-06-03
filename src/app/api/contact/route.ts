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

    // Attempt to send email
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend's default test sender
      to: process.env.CONTACT_EMAIL as string, // Read from environment variables
      subject: `New Project Inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${details}`,
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
