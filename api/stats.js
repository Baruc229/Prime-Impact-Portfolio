const { load } = require('./_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const db = await load();
      const total = db.submissions.length;
      const unread = db.submissions.filter(s => s.read === 0).length;
      const today = db.submissions.filter(s =>
        s.created_at && s.created_at.startsWith(new Date().toISOString().slice(0, 10))
      ).length;

      const typeCount = {};
      db.submissions.forEach(s => {
        typeCount[s.form_type] = (typeCount[s.form_type] || 0) + 1;
      });
      const byType = Object.entries(typeCount).map(([form_type, count]) => ({ form_type, count }));

      res.json({ total, unread, today, byType });
    } catch (err) {
      console.error('Stats error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
