const { blogLoad, blogSave, validateSession } = require('../_lib/db');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

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

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { reject(new Error('Invalid JSON')); } });
  });
}

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function requireAdmin(req, res) {
  const auth = req.headers['authorization'];
  if (!auth || !(await validateSession(auth.replace('Bearer ', '')))) {
    json(res, 401, { error: 'Unauthorized' });
    return false;
  }
  return true;
}

async function handler(req, res) {
  let resource, param, searchParams;
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname.replace(/^\/api\/blog\/?/, '').replace(/\/$/, '');
  const parts = p.split('/');
  resource = parts[0] || '';
  param = parts[1] || '';
  searchParams = url.searchParams;
  console.log('[Blog API]', req.method, req.url, '→ resource:', resource, 'param:', param);

  try {
    switch (resource) {
      case 'posts': {
        if (!param) {
          if (req.method === 'GET') {
            const page = parseInt(searchParams.get('page')) || 1;
            const limit = parseInt(searchParams.get('limit')) || 20;
            const status = searchParams.get('status') || '';
            const badge = searchParams.get('badge') || '';
            const search = searchParams.get('search') || '';
            const lang = searchParams.get('lang') || '';
            const singleSlug = searchParams.get('slug') || '';
            const posts = await blogLoad('posts');
            if (singleSlug) {
              const post = posts.find(p => p.slug === singleSlug);
              if (!post) return json(res, 404, { error: 'Not found' });
              const auth = req.headers['authorization'];
              const isAdmin = auth && (await validateSession(auth.replace('Bearer ', '')));
              if (!isAdmin && post.status !== 'published') return json(res, 404, { error: 'Not found' });
              return json(res, 200, post);
            }
            let filtered = [...posts];
            if (status) filtered = filtered.filter(p => p.status === status);
            if (badge) filtered = filtered.filter(p => p.badgeIds && p.badgeIds.includes(badge));
            if (lang) filtered = filtered.filter(p => p.lang === lang);
            if (search) {
              const q = search.toLowerCase();
              filtered = filtered.filter(p => (p.title || '').toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q));
            }
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const total = filtered.length;
            const totalPages = Math.ceil(total / limit);
            const start = (page - 1) * limit;
            const items = filtered.slice(start, start + limit).map(p => ({ ...p, content: undefined }));
            return json(res, 200, { posts: items, total, page, totalPages });
          }
          if (req.method === 'POST') {
            if (!(await requireAdmin(req, res))) return;
            const data = await readBody(req);
            const posts = await blogLoad('posts');
            const slug = await generateSlug(data.title || 'article', posts);
            const now = new Date().toISOString();
            const post = {
              id: uuid(), slug, title: data.title || '', excerpt: data.excerpt || '',
              content: data.content || '', coverImage: data.coverImage || '',
              authorId: data.authorId || '', badgeIds: data.badgeIds || [],
              resourceFile: data.resourceFile || '', status: data.status || 'draft',
              scheduledAt: data.scheduledAt || null, lang: data.lang || 'fr',
              translations: data.translations || {}, metaTitle: data.metaTitle || '',
              metaDescription: data.metaDescription || '', viewCount: 0,
              createdAt: now, updatedAt: now, publishedAt: data.status === 'published' ? now : null,
            };
            posts.push(post);
            await blogSave('posts', posts);
            return json(res, 201, post);
          }

          // PUT/DELETE with ?slug= query param (Vercel catch‑all workaround)
          const editSlug = searchParams.get('slug') || '';
          if (editSlug) {
            const posts = await blogLoad('posts');
            const idx = posts.findIndex(p => p.slug === editSlug);
            if (idx === -1) return json(res, 404, { error: 'Not found' });

            if (req.method === 'PUT') {
              if (!(await requireAdmin(req, res))) return;
              const data = await readBody(req);
              const newSlug = data.title && data.title !== posts[idx].title
                ? await generateSlug(data.title, posts, posts[idx].id) : posts[idx].slug;
              const now = new Date().toISOString();
              posts[idx] = { ...posts[idx], ...data, slug: newSlug, updatedAt: now,
                publishedAt: data.status === 'published' && !posts[idx].publishedAt ? now : posts[idx].publishedAt };
              await blogSave('posts', posts);
              return json(res, 200, posts[idx]);
            }

            if (req.method === 'DELETE') {
              if (!(await requireAdmin(req, res))) return;
              posts.splice(idx, 1);
              await blogSave('posts', posts);
              return json(res, 200, { success: true });
            }
            return json(res, 405, { error: 'Method not allowed' });
          }

          return json(res, 405, { error: 'Method not allowed' });
        }

        const posts = await blogLoad('posts');
        const idx = posts.findIndex(p => p.slug === param);
        if (idx === -1) return json(res, 404, { error: 'Not found' });

        if (req.method === 'GET') {
          const auth = req.headers['authorization'];
          const isAdmin = auth && (await validateSession(auth.replace('Bearer ', '')));
          if (!isAdmin && posts[idx].status !== 'published') return json(res, 404, { error: 'Not found' });
          if (!isAdmin) { posts[idx].viewCount = (posts[idx].viewCount || 0) + 1; await blogSave('posts', posts); }
          return json(res, 200, posts[idx]);
        }

        if (req.method === 'PUT') {
          if (!(await requireAdmin(req, res))) return;
          const data = await readBody(req);
          const newSlug = data.title && data.title !== posts[idx].title
            ? await generateSlug(data.title, posts, posts[idx].id) : posts[idx].slug;
          const now = new Date().toISOString();
          posts[idx] = { ...posts[idx], ...data, slug: newSlug, updatedAt: now,
            publishedAt: data.status === 'published' && !posts[idx].publishedAt ? now : posts[idx].publishedAt };
          await blogSave('posts', posts);
          return json(res, 200, posts[idx]);
        }

        if (req.method === 'DELETE') {
          if (!(await requireAdmin(req, res))) return;
          posts.splice(idx, 1);
          await blogSave('posts', posts);
          return json(res, 200, { success: true });
        }
        return json(res, 405, { error: 'Method not allowed' });
      }

      case 'badges': {
        if (!param) {
          if (req.method === 'GET') {
            const badges = await blogLoad('badges');
            const allPosts = await blogLoad('posts');
            const withCount = badges.map(b => ({ ...b, postCount: allPosts.filter(p => p.badgeIds && p.badgeIds.includes(b.id) && p.status === 'published').length }));
            return json(res, 200, withCount);
          }
          if (req.method === 'POST') {
            if (!(await requireAdmin(req, res))) return;
            const data = await readBody(req);
            const badges = await blogLoad('badges');
            const badge = { id: uuid(), name: data.name || '', slug: (data.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'), color: data.color || '#1B3A6B', type: data.type || 'category', createdAt: new Date().toISOString() };
            badges.push(badge);
            await blogSave('badges', badges);
            return json(res, 201, badge);
          }

          const editBadgeId = searchParams.get('id') || '';
          if (editBadgeId) {
            const badges = await blogLoad('badges');
            const bIdx = badges.findIndex(b => b.id === editBadgeId);
            if (bIdx === -1) return json(res, 404, { error: 'Not found' });
            if (!(await requireAdmin(req, res))) return;
            if (req.method === 'PUT') {
              const data = await readBody(req);
              badges[bIdx] = { ...badges[bIdx], ...data, id: badges[bIdx].id, createdAt: badges[bIdx].createdAt };
              if (data.name) badges[bIdx].slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              await blogSave('badges', badges);
              return json(res, 200, badges[bIdx]);
            }
            if (req.method === 'DELETE') {
              badges.splice(bIdx, 1);
              await blogSave('badges', badges);
              return json(res, 200, { success: true });
            }
            return json(res, 405, { error: 'Method not allowed' });
          }

          return json(res, 405, { error: 'Method not allowed' });
        }

        const badges = await blogLoad('badges');
        const bIdx = badges.findIndex(b => b.id === param);
        if (bIdx === -1) return json(res, 404, { error: 'Not found' });
        if (!(await requireAdmin(req, res))) return;

        if (req.method === 'PUT') {
          const data = await readBody(req);
          badges[bIdx] = { ...badges[bIdx], ...data, id: badges[bIdx].id, createdAt: badges[bIdx].createdAt };
          if (data.name) badges[bIdx].slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          await blogSave('badges', badges);
          return json(res, 200, badges[bIdx]);
        }

        if (req.method === 'DELETE') {
          badges.splice(bIdx, 1);
          await blogSave('badges', badges);
          return json(res, 200, { success: true });
        }
        return json(res, 405, { error: 'Method not allowed' });
      }

      case 'authors': {
        if (!param) {
          if (req.method === 'GET') {
            const authors = await blogLoad('authors');
            return json(res, 200, authors);
          }
          if (req.method === 'POST') {
            if (!(await requireAdmin(req, res))) return;
            const data = await readBody(req);
            const authors = await blogLoad('authors');
            const author = { id: uuid(), name: data.name || '', avatar: data.avatar || '', bio: data.bio || '', socialLinks: data.socialLinks || {}, createdAt: new Date().toISOString() };
            authors.push(author);
            await blogSave('authors', authors);
            return json(res, 201, author);
          }

          const editAuthorId = searchParams.get('id') || '';
          if (editAuthorId) {
            const authors = await blogLoad('authors');
            const aIdx = authors.findIndex(a => a.id === editAuthorId);
            if (aIdx === -1) return json(res, 404, { error: 'Not found' });
            if (!(await requireAdmin(req, res))) return;
            if (req.method === 'PUT') {
              const data = await readBody(req);
              authors[aIdx] = { ...authors[aIdx], ...data, id: authors[aIdx].id, createdAt: authors[aIdx].createdAt };
              await blogSave('authors', authors);
              return json(res, 200, authors[aIdx]);
            }
            if (req.method === 'DELETE') {
              authors.splice(aIdx, 1);
              await blogSave('authors', authors);
              return json(res, 200, { success: true });
            }
            return json(res, 405, { error: 'Method not allowed' });
          }

          return json(res, 405, { error: 'Method not allowed' });
        }

        const authors = await blogLoad('authors');
        const aIdx = authors.findIndex(a => a.id === param);
        if (aIdx === -1) return json(res, 404, { error: 'Not found' });
        if (!(await requireAdmin(req, res))) return;

        if (req.method === 'PUT') {
          const data = await readBody(req);
          authors[aIdx] = { ...authors[aIdx], ...data, id: authors[aIdx].id, createdAt: authors[aIdx].createdAt };
          await blogSave('authors', authors);
          return json(res, 200, authors[aIdx]);
        }

        if (req.method === 'DELETE') {
          authors.splice(aIdx, 1);
          await blogSave('authors', authors);
          return json(res, 200, { success: true });
        }
        return json(res, 405, { error: 'Method not allowed' });
      }

      case 'comments': {
        if (!param) {
          if (req.method === 'GET') {
            const auth = req.headers['authorization'];
            const isAdmin = auth && (await validateSession(auth.replace('Bearer ', '')));
            const postSlug = searchParams.get('post') || '';
            const status = searchParams.get('status') || '';
            const page = parseInt(searchParams.get('page')) || 1;
            const limit = parseInt(searchParams.get('limit')) || 50;
            const comments = await blogLoad('comments');
            let filtered = [...comments];
            if (postSlug) filtered = filtered.filter(c => c.postSlug === postSlug);
            if (status && isAdmin) filtered = filtered.filter(c => c.status === status);
            if (!isAdmin) filtered = filtered.filter(c => c.status === 'published');
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const total = filtered.length;
            const start = (page - 1) * limit;
            const items = filtered.slice(start, start + limit);
            return json(res, 200, { comments: items, total, page, totalPages: Math.ceil(total / limit) });
          }

          if (req.method === 'POST') {
            const data = await readBody(req);
            const now = new Date().toISOString();
            const comment = { id: uuid(), postSlug: data.postSlug || '', type: data.type || 'comment', authorName: data.authorName || '', authorEmail: data.authorEmail || '', content: data.content || '', rating: data.rating || 0, status: 'pending', adminReply: null, createdAt: now };
            const comments = await blogLoad('comments');
            comments.push(comment);
            await blogSave('comments', comments);
            return json(res, 201, comment);
          }

          const editCommentId = searchParams.get('id') || '';
          if (editCommentId) {
            const comments = await blogLoad('comments');
            const cIdx = comments.findIndex(c => c.id === editCommentId);
            if (cIdx === -1) return json(res, 404, { error: 'Not found' });
            if (!(await requireAdmin(req, res))) return;
            if (req.method === 'PUT') {
              const data = await readBody(req);
              if (data.adminReply !== undefined) comments[cIdx].adminReply = { content: data.adminReply, createdAt: new Date().toISOString() };
              if (data.status) comments[cIdx].status = data.status;
              if (data.content) comments[cIdx].content = data.content;
              await blogSave('comments', comments);
              return json(res, 200, comments[cIdx]);
            }
            if (req.method === 'DELETE') {
              comments.splice(cIdx, 1);
              await blogSave('comments', comments);
              return json(res, 200, { success: true });
            }
            return json(res, 405, { error: 'Method not allowed' });
          }

          return json(res, 405, { error: 'Method not allowed' });
        }

        const comments = await blogLoad('comments');
        const cIdx = comments.findIndex(c => c.id === param);
        if (cIdx === -1) return json(res, 404, { error: 'Not found' });
        if (!(await requireAdmin(req, res))) return;

        if (req.method === 'PUT') {
          const data = await readBody(req);
          if (data.adminReply !== undefined) comments[cIdx].adminReply = { content: data.adminReply, createdAt: new Date().toISOString() };
          if (data.status) comments[cIdx].status = data.status;
          if (data.content) comments[cIdx].content = data.content;
          await blogSave('comments', comments);
          return json(res, 200, comments[cIdx]);
        }

        if (req.method === 'DELETE') {
          comments.splice(cIdx, 1);
          await blogSave('comments', comments);
          return json(res, 200, { success: true });
        }
        return json(res, 405, { error: 'Method not allowed' });
      }

      case 'newsletters': {
        if (req.method === 'GET') {
          if (!(await requireAdmin(req, res))) return;
          const newsletters = await blogLoad('newsletters');
          return json(res, 200, newsletters);
        }
        if (req.method === 'POST') {
          const data = await readBody(req);
          if (!data.email || !data.email.includes('@')) return json(res, 400, { error: 'Email invalide' });
          const newsletters = await blogLoad('newsletters');
          if (newsletters.some(n => n.email === data.email)) return json(res, 200, { success: true, message: 'Déjà inscrit' });
          newsletters.push({ email: data.email, subscribedAt: new Date().toISOString(), source: data.source || 'blog' });
          await blogSave('newsletters', newsletters);
          return json(res, 201, { success: true });
        }
        return json(res, 405, { error: 'Method not allowed' });
      }

      case 'stats': {
        if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });
        if (!(await requireAdmin(req, res))) return;
        const posts = await blogLoad('posts');
        const comments = await blogLoad('comments');
        const badges = await blogLoad('badges');
        const newsletters = await blogLoad('newsletters');
        const topPosts = [...posts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 5).map(p => ({ slug: p.slug, title: p.title, views: p.viewCount || 0 }));
        return json(res, 200, {
          totalPosts: posts.length, publishedPosts: posts.filter(p => p.status === 'published').length,
          draftPosts: posts.filter(p => p.status === 'draft').length,
          totalViews: posts.reduce((s, p) => s + (p.viewCount || 0), 0),
          totalComments: comments.length, pendingComments: comments.filter(c => c.status === 'pending').length,
          totalBadges: badges.length, totalNewsletters: newsletters.length, topPosts,
        });
      }

      default:
        return json(res, 404, { error: 'Not found' });
    }
  } catch (e) {
    return json(res, 400, { error: e.message });
  }
}

module.exports = handler;
