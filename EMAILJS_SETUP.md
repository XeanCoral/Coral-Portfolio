# ✅ EmailJS Setup - Send Emails to Your Gmail (FREE & EASY)

## Why EmailJS?
- ✅ Free (up to 200 emails/month)
- ✅ Directly integrated with Gmail
- ✅ No backend server configuration needed
- ✅ Works immediately when set up
- ✅ Professional email delivery

## 📋 Step-by-Step Setup (5 minutes)

### STEP 1: Create EmailJS Account
1. Go to **https://www.emailjs.com**
2. Click **"Create Account"** at the top right
3. Sign up with your email
4. Verify your email address

### STEP 2: Add Gmail Service
1. After login, go to **Dashboard > Services**
2. Click **"Add Service"**
3. Choose **"Gmail"**
4. Click **"Connect with Google"**
5. Sign in with your **personal Gmail account**
6. Grant permission to EmailJS
7. **Copy your Service ID** (looks like: `service_abc123def456`)
8. Save it somewhere safe

### STEP 3: Create Email Template
1. Go to **Dashboard > Email Templates**
2. Click **"Create New Template"**
3. Name it: `contact_form`
4. Replace the template content with:

```
Subject: New Message from {{user_name}}

Name: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

5. Click **"Save"**
6. **Copy your Template ID** (looks like: `template_abc123def456`)
7. Save it somewhere safe

### STEP 4: Get Your Public Key
1. Go to **Dashboard > Account > API Keys**
2. You'll see your **Public Key** (looks like: `abc123def456`)
3. **Copy it** and save it

### STEP 5: Update `.env.local`
Open `.env.local` in your project and replace the placeholder values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123def456
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_contact_form
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123def456
```

⚠️ **IMPORTANT:** These values start with `NEXT_PUBLIC_` which means they're sent to the browser (that's OK for public keys).

### STEP 6: Restart Dev Server
1. Stop your current server (Ctrl+C)
2. Run `npm run dev`
3. Go to http://localhost:3000

### STEP 7: Test It! 🚀
1. Scroll to the **"Let's Connect"** contact section
2. Fill out the form:
   - Name: Your Name
   - Email: test@example.com
   - Message: Test message
3. Click **"Send Message"**
4. You should see **"✓ Message Sent!"**
5. **Check your Gmail inbox** (your personal Gmail that you connected)
6. You'll see the email from "noreply@emailjs.com" with your message!

## 🎯 How It Works

1. User fills out contact form
2. EmailJS sends email directly to your Gmail
3. You receive email with user's message, name, and email
4. User gets instant confirmation

## 📊 Limits

- **Free Plan:** 200 emails/month (≈ 6-7 per day)
- **Pro Plan:** 5,000+ emails/month ($20/month)

If you exceed free limits, upgrade or contact me!

## 🆘 Troubleshooting

### Email not appearing in Gmail?
- [ ] Check **Spam** folder
- [ ] Check **All Mail** folder
- [ ] Verify Service ID is correct
- [ ] Verify Gmail is connected in EmailJS
- [ ] Restart dev server

### "Template not found" error?
- [ ] Template ID must match exactly
- [ ] Template name should be `contact_form`
- [ ] Copy the ID from EmailJS dashboard

### "Invalid public key" error?
- [ ] Make sure you copied the full Public Key
- [ ] Clear browser cache and refresh
- [ ] Restart dev server

### Getting error when sending?
- Check browser console (F12 > Console) for error details
- All IDs must match EmailJS dashboard exactly
- Make sure `.env.local` is saved

## ✨ You're All Set!

Once you complete these steps, emails will flow directly to your personal Gmail when users submit the contact form. It's that simple! 🎉

---

**Got stuck?** 
- Check your EmailJS dashboard at https://www.emailjs.com/dashboard
- All IDs should be in Account > API section
- Service is in Services > Your Gmail Service
