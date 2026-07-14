// Uses Brevo's HTTP API directly (no SMTP client needed) — Node 18+
// ships a global fetch, which is why package.json requires node >=18.
const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

async function sendOtpEmail(toEmail, code) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Smart Travel Companion';

  if (!apiKey || !senderEmail) {
    throw new Error('BREVO_API_KEY / BREVO_SENDER_EMAIL are not set.');
  }

  const response = await fetch(BREVO_ENDPOINT, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail }],
      subject: 'Your verification code',
      htmlContent: `
        <div style="font-family: sans-serif; font-size: 15px; color: #141A2E;">
          <p>Your Smart Travel Companion verification code is:</p>
          <p style="font-size: 32px; font-weight: 700; letter-spacing: 6px;">${code}</p>
          <p style="color: #6B7280;">This code expires in 5 minutes. If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Brevo send failed (${response.status}): ${text}`);
  }
}

module.exports = { sendOtpEmail };
