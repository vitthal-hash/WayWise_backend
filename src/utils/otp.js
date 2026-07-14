const crypto = require('crypto');
const bcrypt = require('bcryptjs');

/// Cryptographically-random 6-digit code, always zero-padded (crypto's
/// randomInt is uniform, unlike Math.random()-based approaches).
function generateOtp() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
}

async function hashOtp(code) {
  return bcrypt.hash(code, 10);
}

async function compareOtp(code, hash) {
  return bcrypt.compare(code, hash);
}

module.exports = { generateOtp, hashOtp, compareOtp };
