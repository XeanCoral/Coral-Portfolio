/**
 * Debug script to verify EmailJS configuration
 * Run this in the browser console at http://localhost:3000
 */

console.log('=== EmailJS Configuration Debug ===');
console.log('Service ID:', process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
console.log('Template ID:', process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
console.log('Public Key:', process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

// Check if emailjs is loaded
if (typeof emailjs !== 'undefined') {
  console.log('✅ EmailJS library is loaded');
} else {
  console.log('❌ EmailJS library is NOT loaded');
}

// Test sending an email
async function testEmail() {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        user_name: 'Test User',
        user_email: 'test@example.com',
        message: 'This is a test message'
      }
    );
    console.log('✅ Email sent successfully:', result);
  } catch (error) {
    console.log('❌ Email send failed:', error);
  }
}

console.log('To test sending, run: testEmail()');
