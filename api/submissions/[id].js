const { load, save } = require('../_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
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
      console.error('Get error:', err);
      res.status(500).json({ error: 'Internal server error' });
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
      console.error('Delete error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
