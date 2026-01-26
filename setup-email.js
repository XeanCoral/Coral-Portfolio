#!/usr/bin/env node

/**
 * Email Configuration Setup Wizard
 * 
 * This script helps you configure your Gmail credentials for the contact form.
 * Run with: node setup-email.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupEmail() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║        Email Configuration Setup for Your Portfolio       ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  console.log('📧 GMAIL SETUP INSTRUCTIONS:\n');
  console.log('1. Go to: https://myaccount.google.com/apppasswords');
  console.log('2. Select "Mail" as the app');
  console.log('3. Select "Windows Computer" (or your device)');
  console.log('4. Click "Generate"');
  console.log('5. Copy the 16-character password\n');

  const gmailAddress = await question('📧 Enter your Gmail address: ');
  const appPassword = await question('🔑 Enter your Gmail App Password (16 characters): ');
  const confirmEmail = await question('📬 Email to receive notifications (usually same as above): ');

  // Validate inputs
  if (!gmailAddress || !gmailAddress.includes('@gmail.com')) {
    console.log('\n❌ Invalid Gmail address. Please use a Gmail account.');
    rl.close();
    return;
  }

  if (!appPassword || appPassword.length < 10) {
    console.log('\n❌ Invalid app password. App passwords are usually 16 characters.');
    rl.close();
    return;
  }

  if (!confirmEmail || !confirmEmail.includes('@')) {
    console.log('\n❌ Invalid email address.');
    rl.close();
    return;
  }

  // Create .env.local
  const envContent = `# Email Configuration
# Last updated: ${new Date().toISOString()}

EMAIL_USER=${gmailAddress}
EMAIL_PASSWORD=${appPassword}
EMAIL_TO=${confirmEmail}
`;

  const envPath = path.join(__dirname, '.env.local');
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Configuration saved to .env.local');
    console.log('🔄 Restarting dev server...\n');
    console.log('📝 Make sure to:');
    console.log('   1. Keep .env.local secure (never commit to git)');
    console.log('   2. Restart your dev server for changes to take effect');
    console.log('   3. Test the contact form at http://localhost:3000\n');
  } catch (error) {
    console.log(`\n❌ Error writing to .env.local: ${error.message}`);
  }

  rl.close();
}

setupEmail().catch(err => {
  console.error('Error:', err);
  rl.close();
  process.exit(1);
});
