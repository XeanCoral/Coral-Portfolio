# 🔧 Gmail Setup - Step by Step

## ⚠️ You Got an Error - Here's How to Fix It

The error message was: **"Username and Password not accepted"**

This means your `.env.local` file still has placeholder values. Follow these steps:

## 📋 Step 1: Enable 2-Step Verification (if not already done)

1. Go to **https://myaccount.google.com/security**
2. Look for "2-Step Verification"
3. If not enabled, click "Enable"
4. Follow Google's instructions

## 🔐 Step 2: Generate Gmail App Password

1. Go to **https://myaccount.google.com/apppasswords**
2. You'll see a dropdown with "Select app" and "Select device"
3. **Select "Mail"** from the first dropdown
4. **Select "Windows Computer"** from the second dropdown
5. Click **"Generate"**
6. Google will show you a **16-character password** like: `abcd efgh ijkl mnop`
7. **Copy this password** (you'll need it in the next step)

## ✏️ Step 3: Update `.env.local` File

Open the file `.env.local` in your project root and replace the placeholder values:

**BEFORE:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
```

**AFTER (example):**
```
EMAIL_USER=student@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
EMAIL_TO=student@gmail.com
```

**IMPORTANT:**
- Keep the spaces in the app password
- Use your actual Gmail address
- EMAIL_TO is usually the same as EMAIL_USER
- Never share this file with anyone
- Never commit this to GitHub

## 🔄 Step 4: Restart Your Dev Server

After updating `.env.local`:
1. Stop the dev server (Press `Ctrl+C` in the terminal)
2. Run `npm run dev` to start it again
3. Go to http://localhost:3000

## ✅ Step 5: Test the Form

1. Scroll to the **"Let's Connect"** section
2. Fill in the contact form with test data
3. Click **"Send Message"**
4. You should see **"✓ Message Sent!"**
5. Check your Gmail inbox for the notification email

## 🆘 Troubleshooting

### Still getting "Username and Password not accepted"?
- [ ] Did you generate an **App Password** (not your regular password)?
- [ ] Did you enable **2-Step Verification** first?
- [ ] Did you select **"Mail"** as the app?
- [ ] Is there any extra whitespace in `.env.local`?
- [ ] Did you restart the dev server after updating `.env.local`?

### Email not arriving?
- Check your **Spam/Trash** folders
- Check if EMAIL_TO is correct
- Try generating a new App Password

### "Missing email configuration" error?
- Make sure `.env.local` exists in the project root
- Verify all three variables are set (EMAIL_USER, EMAIL_PASSWORD, EMAIL_TO)
- Restart the dev server

## 💡 Tips

- The App Password is only for this app - it doesn't change your Gmail password
- You can delete this App Password anytime from your Google account
- Each app/device combination needs its own App Password
- The password format includes spaces: `abcd efgh ijkl mnop` ✓ (keep the spaces!)

---

Once you've completed these steps, your email integration will work perfectly! 🚀
