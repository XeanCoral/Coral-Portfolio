import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('[v0] Missing email environment variables')
      return NextResponse.json(
        { error: 'Email service not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD.' },
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    console.log('[v0] Sending email to:', process.env.GMAIL_USER)

    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Your personal Gmail
      replyTo: email, // User's email for replies
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0 0 12px 0;">
              <strong style="color: #374151;">Name:</strong><br/>
              <span style="color: #6b7280;">${name}</span>
            </p>
            
            <p style="margin: 0 0 12px 0;">
              <strong style="color: #374151;">Email:</strong><br/>
              <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
            </p>
            
            <p style="margin: 0;">
              <strong style="color: #374151;">Message:</strong><br/>
              <div style="color: #6b7280; background-color: #f3f4f6; padding: 12px; border-radius: 4px; margin-top: 8px; white-space: pre-wrap; word-wrap: break-word;">
${message}
              </div>
            </p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; text-align: center; margin: 20px 0 0 0; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            This email was sent from your portfolio contact form. Reply directly to ${email} to respond.
          </p>
        </div>
      `,
      text: `New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    console.log('[v0] Email sent to your Gmail successfully')

    // Send confirmation email to the user
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'We received your message',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1f2937;">Thank you for reaching out!</h2>
            <p style="color: #6b7280;">Hi ${name},</p>
            <p style="color: #6b7280;">I've received your message and will get back to you as soon as possible.</p>
            <p style="color: #6b7280;">Best regards,<br/>Xean Coral</p>
          </div>
        `,
      })
    } catch (confirmError) {
      console.log('[v0] Confirmation email failed (non-critical):', confirmError)
      // Don't fail the whole request if confirmation email fails
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Email error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to send email'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
