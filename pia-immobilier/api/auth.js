const { createSession } = require('./_lib/db');
const { setCors } = require('./_lib/cors');
const { checkRateLimit } = require('./_lib/rate-limit');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    if (!(await checkRateLimit('login:' + ip, 5, 900))) {
      return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' });
    }

    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('[AUTH] ADMIN_PASSWORD not set in env vars');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!password || password !== adminPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = await createSession();
    return res.json({ success: true, token });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
