const { load, save } = require('./_lib/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { form_type, data, source } = req.body;
      if (!form_type || !data) {
        res.status(400).json({ error: 'form_type and data are required' });
        return;
      }
      const db = await load();
      const submission = {
        id: db.nextId++,
        form_type,
        data,
        source: source || '',
        created_at: new Date().toISOString(),
        read: 0
      };
      db.submissions.unshift(submission);
      await save(db);
      res.json({ success: true, id: submission.id });
    } catch (err) {
      console.error('Insert error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  if (req.method === 'GET') {
    try {
      const db = await load();
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      const formType = req.query.form_type || '';

      let filtered = db.submissions;
      if (formType) {
        filtered = filtered.filter(s => s.form_type === formType);
      }

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const pageItems = filtered.slice(offset, offset + limit);

      res.json({
        submissions: pageItems,
        total,
        page,
        limit,
        totalPages
      });
    } catch (err) {
      console.error('List error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
