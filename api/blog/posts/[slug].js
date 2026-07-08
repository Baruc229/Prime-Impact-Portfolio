const { blogLoad, blogSave, validateSession } = require('../../_lib/db');
const { generateSlug } = require('../posts');

async function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const parts = url.pathname.replace(/\/$/, '').split('/');
  const slug = parts[parts.length - 1];

  if (!slug) {
    res.writeHead(400); res.end(JSON.stringify({ error: 'Missing slug' }));
    return;
  }

  if (req.method === 'GET') {
    const posts = await blogLoad('posts');
    const post = posts.find(p => p.slug === slug);
    if (!post) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    const auth = req.headers['authorization'];
    const isAdmin = auth && (await validateSession(auth.replace('Bearer ', '')));

    if (!isAdmin && post.status !== 'published') {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    if (!isAdmin) {
      post.viewCount = (post.viewCount || 0) + 1;
      await blogSave('posts', posts);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(post));
    return;
  }

  if (req.method === 'PUT') {
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
        const posts = await blogLoad('posts');
        const idx = posts.findIndex(p => p.slug === slug);
        if (idx === -1) {
          res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
          return;
        }

        const newSlug = data.title && data.title !== posts[idx].title
          ? await generateSlug(data.title, posts, posts[idx].id)
          : posts[idx].slug;

        const now = new Date().toISOString();
        posts[idx] = {
          ...posts[idx],
          ...data,
          slug: newSlug,
          updatedAt: now,
          publishedAt: data.status === 'published' && !posts[idx].publishedAt ? now : posts[idx].publishedAt,
        };

        await blogSave('posts', posts);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts[idx]));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  if (req.method === 'DELETE') {
    const auth = req.headers['authorization'];
    if (!auth || !(await validateSession(auth.replace('Bearer ', '')))) {
      res.writeHead(401); res.end('Unauthorized');
      return;
    }

    const posts = await blogLoad('posts');
    const idx = posts.findIndex(p => p.slug === slug);
    if (idx === -1) {
      res.writeHead(404); res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    posts.splice(idx, 1);
    await blogSave('posts', posts);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle };
