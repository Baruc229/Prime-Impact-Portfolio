const { blogLoad, blogSave, validateSession } = require('../_lib/db');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function handle(req, res) {
  if (req.method === 'GET') {
    const badges = await blogLoad('badges');
    const posts = await blogLoad('posts');
    const withCount = badges.map(b => ({
      ...b,
      postCount: posts.filter(p => p.badgeIds && p.badgeIds.includes(b.id) && p.status === 'published').length,
    }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(withCount));
    return;
  }

  if (req.method === 'POST') {
    const auth = req.headers['authorization'];
    if (!auth || !(await validateSession(auth.replace('Bearer ', '')))) {
      res.writeHead(401); res.end('Unauthorized');
      return;
    }

    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const badges = await blogLoad('badges');
        const now = new Date().toISOString();
        const badge = {
          id: uuid(),
          name: data.name || '',
          slug: (data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          color: data.color || '#1B3A6B',
          type: data.type || 'category',
          createdAt: now,
        };
        badges.push(badge);
        await blogSave('badges', badges);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(badge));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
