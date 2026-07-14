const express = require('express');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const OtpCode = require('../models/OtpCode');
const { generateOtp, hashOtp, compareOtp } = require('../utils/otp');
const { sendOtpEmail } = require('../utils/mailer');
const { requireAuth } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_TTL_MINUTES = 5;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_SECONDS = 45;

// Coarse per-IP limit as a backstop against abuse; the per-email cooldown
// below is the one that actually matters for normal use.
const otpRequestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this device. Try again later.' },
});

router.post(
  '/request-otp',
  otpRequestLimiter,
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }

    const recent = await OtpCode.findOne({ email }).sort({ createdAt: -1 });
    if (recent) {
      const elapsedMs = Date.now() - recent.createdAt.getTime();
      const cooldownMs = RESEND_COOLDOWN_SECONDS * 1000;
      if (elapsedMs < cooldownMs) {
        const waitSeconds = Math.ceil((cooldownMs - elapsedMs) / 1000);
        return res
          .status(429)
          .json({ error: `Please wait ${waitSeconds}s before requesting another code.` });
      }
    }

    const code = generateOtp();
    const codeHash = await hashOtp(code);

    await OtpCode.create({
      email,
      codeHash,
      expiresAt: new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000),
    });

    await sendOtpEmail(email, code);

    res.json({
      message: 'Verification code sent.',
      expiresInSeconds: OTP_TTL_MINUTES * 60,
    });
  }),
);

router.post(
  '/verify-otp',
  asyncHandler(async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase();
    const code = String(req.body.code || '').trim();

    if (!EMAIL_RE.test(email) || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ error: 'Enter the 6-digit code sent to your email.' });
    }

    const otp = await OtpCode.findOne({ email, consumed: false }).sort({ createdAt: -1 });
    if (!otp) {
      return res.status(400).json({ error: 'No active code for this email. Request a new one.' });
    }
    if (otp.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ error: 'That code expired. Request a new one.' });
    }
    if (otp.attempts >= MAX_ATTEMPTS) {
      return res.status(429).json({ error: 'Too many incorrect attempts. Request a new code.' });
    }

    const isMatch = await compareOtp(code, otp.codeHash);
    if (!isMatch) {
      otp.attempts += 1;
      await otp.save();
      return res.status(400).json({
        error: 'Incorrect code.',
        attemptsRemaining: MAX_ATTEMPTS - otp.attempts,
      });
    }

    otp.consumed = true;
    await otp.save();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, lastLoginAt: new Date() });
    } else {
      user.lastLoginAt = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );

    res.json({ token, user: { id: user._id, email: user.email } });
  }),
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ id: user._id, email: user.email, createdAt: user.createdAt });
  }),
);

module.exports = router;
