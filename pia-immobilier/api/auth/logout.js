const { destroySession } = require('../_lib/db');
const { setCors } = require('../_lib/cors');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer ')) {
      await destroySession(auth.slice(7));
    }
    return res.json({ success: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
};
