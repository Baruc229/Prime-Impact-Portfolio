const { createSession } = require('./_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
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
