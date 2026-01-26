import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.error('Missing email environment variables')
      return NextResponse.json(
        { error: 'Email configuration is missing. Please check environment variables.' },
        { status: 500 }
      )
    }

    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL

    // Send admin notification email
    const adminEmailResult = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #666; margin-top: 20px; font-size: 12px;">
            This is an automated message from your portfolio contact form.
          </p>
        </div>
      `,
    })

    // Send user confirmation email
    const userEmailResult = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank You, ${name}!</h2>
          <p>I've received your message and appreciate you taking the time to reach out.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your Message:</strong></p>
            <p style="background-color: white; padding: 15px; border-left: 4px solid #007bff; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p>I'll get back to you as soon as possible. In the meantime, feel free to check out my work on my portfolio.</p>
          <p style="color: #666; margin-top: 20px;">Best regards,<br>Xean Nelson</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">
            This is an automated response from my portfolio. Please don't reply to this email.
          </p>
        </div>
      `,
    })

    // Check if both emails were sent successfully
    if (adminEmailResult.error || userEmailResult.error) {
      console.error('Email sending error:', adminEmailResult.error || userEmailResult.error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Detailed error:', errorMessage)
    return NextResponse.json(
      { error: `Failed to send email: ${errorMessage}` },
      { status: 500 }
    )
  }
}

