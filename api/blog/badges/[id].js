const { blogLoad, blogSave, validateSession } = require('../../_lib/db');

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];

  if (!id) {
    res.writeHead(400); res.end(JSON.stringify({ error: 'Missing id' }));
    return;
  }

  const auth = req.headers['authorization'];
  if (!auth || !(await validateSession(auth.replace('Bearer ', '')))) {
    res.writeHead(401); res.end('Unauthorized');
    return;
  }

  if (req.method === 'PUT') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const badges = await blogLoad('badges');
        const idx = badges.findIndex(b => b.id === id);
        if (idx === -1) {
          res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
          return;
        }
        badges[idx] = { ...badges[idx], ...data, id: badges[idx].id, createdAt: badges[idx].createdAt };
        if (data.name) badges[idx].slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await blogSave('badges', badges);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(badges[idx]));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'DELETE') {
    const badges = await blogLoad('badges');
    const idx = badges.findIndex(b => b.id === id);
    if (idx === -1) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }
    badges.splice(idx, 1);
    await blogSave('badges', badges);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
