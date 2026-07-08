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
        const comments = await blogLoad('comments');
        const idx = comments.findIndex(c => c.id === id);
        if (idx === -1) {
          res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
          return;
        }

        if (data.adminReply !== undefined) {
          comments[idx].adminReply = {
            content: data.adminReply,
            createdAt: new Date().toISOString(),
          };
        }
        if (data.status) comments[idx].status = data.status;
        if (data.content) comments[idx].content = data.content;

        await blogSave('comments', comments);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments[idx]));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'DELETE') {
    const comments = await blogLoad('comments');
    const idx = comments.findIndex(c => c.id === id);
    if (idx === -1) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }
    comments.splice(idx, 1);
    await blogSave('comments', comments);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
