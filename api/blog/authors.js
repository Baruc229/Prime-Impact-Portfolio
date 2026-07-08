const { blogLoad, blogSave, validateSession } = require('../_lib/db');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function handle(req, res) {
  if (req.method === 'GET') {
    const authors = await blogLoad('authors');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(authors));
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
        const authors = await blogLoad('authors');
        const now = new Date().toISOString();
        const author = {
          id: uuid(),
          name: data.name || '',
          avatar: data.avatar || '',
          bio: data.bio || '',
          socialLinks: data.socialLinks || {},
          createdAt: now,
        };
        authors.push(author);
        await blogSave('authors', authors);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(author));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
