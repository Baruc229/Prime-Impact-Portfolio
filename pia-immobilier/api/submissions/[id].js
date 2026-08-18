const { load, save, validateSession } = require('../_lib/db');
const { setCors } = require('../_lib/cors');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const auth = req.headers.authorization;
  const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!(await validateSession(token))) {
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  const id = parseInt(req.query.id);

  if (req.method === 'GET') {
    try {
      const db = await load();
      const row = db.submissions.find(s => s.id === id);
      if (!row) {
        res.status(404).json({ error: 'Submission not found' });
        return;
      }
      row.read = 1;
      await save(db);
      res.json(row);
    } catch (err) {
      console.error('[API] Get error:', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const db = await load();
      const idx = db.submissions.findIndex(s => s.id === id);
      if (idx === -1) {
        res.status(404).json({ error: 'Submission not found' });
        return;
      }
      db.submissions.splice(idx, 1);
      await save(db);
      res.json({ success: true });
    } catch (err) {
      console.error('[API] Delete error:', err);
      res.status(500).json({ error: 'Erreur serveur' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
