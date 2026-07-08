const { blogLoad, blogSave, validateSession } = require('../_lib/db');

async function handle(req, res) {
  if (req.method !== 'GET') {
    res.writeHead(405); res.end('Method Not Allowed');
    return;
  }

  const auth = req.headers['authorization'];
  if (!auth || !(await validateSession(auth.replace('Bearer ', '')))) {
    res.writeHead(401); res.end('Unauthorized');
    return;
  }

  const posts = await blogLoad('posts');
  const comments = await blogLoad('comments');
  const badges = await blogLoad('badges');

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.status === 'published').length;
  const draftPosts = posts.filter(p => p.status === 'draft').length;
  const totalViews = posts.reduce((s, p) => s + (p.viewCount || 0), 0);
  const totalComments = comments.length;
  const pendingComments = comments.filter(c => c.status === 'pending').length;
  const totalBadges = badges.length;
  const topPosts = [...posts]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 5)
    .map(p => ({ slug: p.slug, title: p.title, views: p.viewCount || 0 }));

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    totalPosts,
    publishedPosts,
    draftPosts,
    totalViews,
    totalComments,
    pendingComments,
    totalBadges,
    topPosts,
  }));
}

module.exports = { handle };
