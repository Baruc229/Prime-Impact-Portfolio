const { load, save, validateSession } = require('../_lib/db');
const { setCors } = require('../_lib/cors');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const auth = req.headers.authorization;
  const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!(await validateSession(token))) {
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  try {
    const db = await load();
    const count = db.submissions.length;
    db.submissions = [];
    await save(db);
    res.json({ success: true, deleted: count });
  } catch (err) {
    console.error('[API] clear error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
