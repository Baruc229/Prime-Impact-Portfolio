const { blogLoad, blogSave, validateSession } = require('../_lib/db');

async function generateSlug(title, existingPosts, excludeId) {
  let slug = title.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!slug) slug = 'article';
  let unique = slug;
  let count = 1;
  while (existingPosts.some(p => p.slug === unique && p.id !== excludeId)) {
    unique = slug + '-' + (count++);
  }
  return unique;
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

async function handle(req, res) {
  if (req.method === 'GET') {
    const url = new URL(req.url, 'http://localhost');
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 20;
    const status = url.searchParams.get('status') || '';
    const badge = url.searchParams.get('badge') || '';
    const search = url.searchParams.get('search') || '';
    const lang = url.searchParams.get('lang') || '';

    const posts = await blogLoad('posts');
    let filtered = [...posts];

    if (status) filtered = filtered.filter(p => p.status === status);
    if (badge) filtered = filtered.filter(p => p.badgeIds && p.badgeIds.includes(badge));
    if (lang) filtered = filtered.filter(p => p.lang === lang);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q)
      );
    }

    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit).map(p => ({
      ...p,
      content: undefined,
    }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ posts: items, total, page, totalPages }));
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
        const posts = await blogLoad('posts');

        const slug = await generateSlug(data.title || 'article', posts);
        const now = new Date().toISOString();

        const post = {
          id: uuid(),
          slug,
          title: data.title || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          authorId: data.authorId || '',
          badgeIds: data.badgeIds || [],
          resourceFile: data.resourceFile || '',
          status: data.status || 'draft',
          scheduledAt: data.scheduledAt || null,
          lang: data.lang || 'fr',
          translations: data.translations || {},
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          viewCount: 0,
          createdAt: now,
          updatedAt: now,
          publishedAt: data.status === 'published' ? now : null,
        };

        posts.push(post);
        await blogSave('posts', posts);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(post));
      } catch (e) {
        res.writeHead(400); res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(405); res.end('Method Not Allowed');
}

module.exports = { handle, generateSlug };
