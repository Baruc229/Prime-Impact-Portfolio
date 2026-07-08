const { blogLoad, blogSave, validateSession } = require('../_lib/db');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function handle(req, res) {
  if (req.method === 'GET') {
    const auth = req.headers['authorization'];
    const isAdmin = auth && (await validateSession(auth.replace('Bearer ', '')));

    const url = new URL(req.url, 'http://localhost');
    const postSlug = url.searchParams.get('post') || '';
    const status = url.searchParams.get('status') || '';
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 50;

    const comments = await blogLoad('comments');
    let filtered = [...comments];

    if (postSlug) filtered = filtered.filter(c => c.postSlug === postSlug);
    if (status && isAdmin) filtered = filtered.filter(c => c.status === status);
    if (!isAdmin) filtered = filtered.filter(c => c.status === 'published');

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ comments: items, total, page, totalPages }));
    return;
  }

  if (req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const now = new Date().toISOString();
        const comment = {
          id: uuid(),
          postSlug: data.postSlug || '',
          type: data.type || 'comment',
          authorName: data.authorName || '',
          authorEmail: data.authorEmail || '',
          content: data.content || '',
          rating: data.rating || 0,
          status: 'pending',
          adminReply: null,
          createdAt: now,
        };

        const comments = await blogLoad('comments');
        comments.push(comment);
        await blogSave('comments', comments);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comment));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
