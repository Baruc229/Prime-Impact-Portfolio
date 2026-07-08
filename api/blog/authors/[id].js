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
        const authors = await blogLoad('authors');
        const idx = authors.findIndex(a => a.id === id);
        if (idx === -1) {
          res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
          return;
        }
        authors[idx] = { ...authors[idx], ...data, id: authors[idx].id, createdAt: authors[idx].createdAt };
        await blogSave('authors', authors);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(authors[idx]));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'DELETE') {
    const authors = await blogLoad('authors');
    const idx = authors.findIndex(a => a.id === id);
    if (idx === -1) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }
    authors.splice(idx, 1);
    await blogSave('authors', authors);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
