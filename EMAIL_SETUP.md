# Email Integration Setup Guide

## Overview
Your portfolio now has email integration! When users submit the contact form, emails will be sent to your Gmail inbox and a confirmation email will be sent to the user.

## Setup Instructions

### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled

### Step 2: Generate Gmail App Password
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. You may need to sign in again
3. Select "Mail" as the app and "Windows Computer" (or your device) as the device
4. Click "Generate"
5. Copy the generated 16-character password

### Step 3: Configure Environment Variables
1. Open `.env.local` file in your project root
2. Update the following values:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   EMAIL_TO=your-email@gmail.com
   ```
3. Save the file

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### Step 4: Test the Integration

1. Make sure your dev server is running (`npm run dev`)
2. Go to http://localhost:3000 in your browser
3. Scroll to the "Let's Connect" contact section
4. Fill out the form with test data
5. Click "Send Message"
6. You should see "Message Sent!" confirmation
7. Check your Gmail inbox for the submission

## Email Features

✅ **Admin Email**: Contains the user's submission details
✅ **User Confirmation Email**: Automatic confirmation sent to the user
✅ **Error Handling**: Graceful error messages if something goes wrong
✅ **Form Validation**: Validates name, email, and message fields
✅ **Beautiful HTML**: Professional email templates with formatting

## How It Works

### Contact Form Flow:
1. User fills out the form and clicks "Send Message"
2. Form data is sent to `/api/contact` endpoint via POST request
3. Server validates the input
4. Nodemailer sends two emails:
   - One to your Gmail (admin notification)
   - One to the user (confirmation)
5. Success message is shown to the user
6. Form is cleared for new submissions

### API Endpoint: `/api/contact`
- **Method**: POST
- **Body**: `{ name: string, email: string, message: string }`
- **Response**: `{ message: string }` on success or `{ error: string }` on failure

## Troubleshooting

### "Failed to send email" error
1. Verify `.env.local` has correct Gmail credentials
2. Check that 2-Factor Authentication is enabled on Gmail
3. Ensure you used an App Password, not your regular Gmail password
4. Restart the dev server after updating `.env.local`

### Emails not appearing in inbox
1. Check Gmail spam/trash folders
2. Verify EMAIL_TO is correct in `.env.local`
3. Check browser console for error messages
4. Check server logs for detailed error information

### App Password not working
1. Make sure 2-Factor Authentication is enabled first
2. Generate a new App Password and try again
3. Some Google Workspace accounts may have restrictions

## Files Modified/Created

- **`.env.local`** - Environment variables for email configuration
- **`app/api/contact/route.ts`** - API endpoint for handling form submissions
- **`components/Contact.tsx`** - Updated form with email submission logic

## Security Notes

- `.env.local` is excluded from git (see `.gitignore`)
- Email passwords are never exposed to the client
- Form validation prevents invalid submissions
- Sensitive data is only processed on the server

## Next Steps (Optional)

- Add rate limiting to prevent spam
- Add CAPTCHA verification to the form
- Store submissions in a database
- Add email templates with your branding
