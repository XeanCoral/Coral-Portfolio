# Email Setup Instructions

Your portfolio contact form is ready to send emails directly to your Gmail account. Follow these steps to activate it:

## Step 1: Enable 2-Factor Authentication (if not already enabled)
1. Go to https://myaccount.google.com/security
2. Sign in with your Gmail account
3. Find "2-Step Verification" and enable it if needed

## Step 2: Generate Google App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your device type)
3. Google will generate a 16-character password
4. Copy this password (you'll use it next)

## Step 3: Add Environment Variables
1. Open the **Vars** section in the v0 sidebar (left side of your screen)
2. Add two new environment variables:
   - **GMAIL_USER**: Your Gmail email address (e.g., xean.coral@urios.edu.ph)
   - **GMAIL_APP_PASSWORD**: The 16-character password from Step 2

## Step 4: Test Your Form
1. Fill out the contact form on your portfolio
2. Submit it
3. You should receive an email in your Gmail inbox within seconds
4. The form will show a "Message sent successfully!" confirmation

## How It Works
- Contact form submissions are sent to your Gmail inbox
- Visitors receive an automatic confirmation email
- You can reply directly to visitor emails using Gmail's reply function
- All emails are formatted beautifully with proper styling

## Troubleshooting
- If emails don't arrive, check that your environment variables are correctly set
- Make sure you're using an App Password, not your regular Gmail password
- App Passwords only work if 2-Factor Authentication is enabled
- Check your spam folder in case emails are filtered there

Your portfolio is now fully functional with email capabilities!
