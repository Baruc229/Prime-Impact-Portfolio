const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'submissions.json');

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading data:', e.message);
  }
  return { nextId: 1, submissions: [] };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.post('/api/submissions', (req, res) => {
  try {
    const { form_type, data, source } = req.body;
    if (!form_type || !data) {
      return res.status(400).json({ error: 'form_type and data are required' });
    }
    const db = loadData();
    const submission = {
      id: db.nextId++,
      form_type,
      data,
      source: source || '',
      created_at: new Date().toISOString(),
      read: 0
    };
    db.submissions.unshift(submission);
    saveData(db);
    res.json({ success: true, id: submission.id });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/submissions', (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const formType = req.query.form_type || '';
    const db = loadData();

    let filtered = db.submissions;
    if (formType) {
      filtered = filtered.filter(s => s.form_type === formType);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const pageItems = filtered.slice(offset, offset + limit);

    res.json({
      submissions: pageItems.map(s => ({
        id: s.id,
        form_type: s.form_type,
        source: s.source,
        created_at: s.created_at,
        read: s.read,
        data: s.data
      })),
      total,
      page,
      limit,
      totalPages
    });
  } catch (err) {
    console.error('List error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/submissions/:id', (req, res) => {
  try {
    const db = loadData();
    const row = db.submissions.find(s => s.id === parseInt(req.params.id));
    if (!row) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    row.read = 1;
    saveData(db);
    res.json(row);
  } catch (err) {
    console.error('Get error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/submissions/:id', (req, res) => {
  try {
    const db = loadData();
    const idx = db.submissions.findIndex(s => s.id === parseInt(req.params.id));
    if (idx === -1) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    db.submissions.splice(idx, 1);
    saveData(db);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const db = loadData();
    const total = db.submissions.length;
    const unread = db.submissions.filter(s => s.read === 0).length;
    const today = db.submissions.filter(s => {
      return s.created_at && s.created_at.startsWith(new Date().toISOString().slice(0, 10));
    }).length;

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
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Admin dashboard running at http://localhost:${PORT}`);
  console.log(`Admin UI at http://localhost:${PORT}/admin`);
});
