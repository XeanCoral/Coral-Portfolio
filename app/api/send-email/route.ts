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
    const { name, email, message } = await request.json()

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

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

    // Optional: Send confirmation email to the user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1f2937;">Thank you for reaching out!</h2>
          <p style="color: #6b7280;">Hi ${name},</p>
          <p style="color: #6b7280;">I've received your message and will get back to you as soon as possible.</p>
          <p style="color: #6b7280;">Best regards,<br/>Your Portfolio Owner</p>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
