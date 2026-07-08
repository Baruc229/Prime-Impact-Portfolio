const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

let redis;
try {
  const { Redis } = require('@upstash/redis');
  if (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (e) {}

const DATA_FILE = path.join(os.tmpdir(), 'pia-submissions.json');
const AUTH_FILE = path.join(os.tmpdir(), 'pia-auth.json');

function loadLocal() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {}
  return { nextId: 1, submissions: [] };
}

function saveLocal(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('[DB] Local save error:', e.message);
  }
}

function loadAuthLocal() {
  try {
    if (fs.existsSync(AUTH_FILE)) {
      return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8'));
    }
  } catch (e) {}
  return { tokens: {} };
}

function saveAuthLocal(data) {
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {}
}

async function load() {
  if (redis) {
    try {
      const raw = await redis.get('submissions_data');
      return raw || { nextId: 1, submissions: [] };
    } catch (e) {
      console.error('[DB] Redis load error:', e.message);
    }
  }
  return loadLocal();
}

async function save(data) {
  if (redis) {
    try {
      await redis.set('submissions_data', data);
      return;
    } catch (e) {
      console.error('[DB] Redis save error:', e.message);
    }
  }
  saveLocal(data);
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

async function createSession() {
  const token = generateToken();
  const expiry = Date.now() + 24 * 60 * 60 * 1000;
  if (redis) {
    try {
      await redis.set('session:' + token, 'valid', { ex: 86400 });
      return token;
    } catch (e) {}
  }
  const auth = loadAuthLocal();
  auth.tokens[token] = expiry;
  saveAuthLocal(auth);
  return token;
}

async function validateSession(token) {
  if (!token) return false;
  if (redis) {
    try {
      const val = await redis.get('session:' + token);
      return val === 'valid';
    } catch (e) {
      return false;
    }
  }
  const auth = loadAuthLocal();
  const expiry = auth.tokens[token];
  if (!expiry) return false;
  if (Date.now() > expiry) {
    delete auth.tokens[token];
    saveAuthLocal(auth);
    return false;
  }
  return true;
}

async function destroySession(token) {
  if (redis) {
    try {
      await redis.del('session:' + token);
      return;
    } catch (e) {}
  }
  const auth = loadAuthLocal();
  delete auth.tokens[token];
  saveAuthLocal(auth);
}

// ─── Blog Collections ─────────────────────────────────────────
const BLOG_KEYS = {
  posts: 'blog_posts',
  authors: 'blog_authors',
  badges: 'blog_badges',
  comments: 'blog_comments',
};

const BLOG_FILES = {
  posts: path.join(os.tmpdir(), 'pia-blog-posts.json'),
  authors: path.join(os.tmpdir(), 'pia-blog-authors.json'),
  badges: path.join(os.tmpdir(), 'pia-blog-badges.json'),
  comments: path.join(os.tmpdir(), 'pia-blog-comments.json'),
};

async function blogLoad(collection) {
  if (redis) {
    try {
      const raw = await redis.get(BLOG_KEYS[collection]);
      return raw || [];
    } catch (e) { console.error('[DB] Redis blog load error:', e.message); }
  }
  try {
    if (fs.existsSync(BLOG_FILES[collection])) {
      return JSON.parse(fs.readFileSync(BLOG_FILES[collection], 'utf8'));
    }
  } catch (e) {}
  return [];
}

async function blogSave(collection, data) {
  if (redis) {
    try {
      await redis.set(BLOG_KEYS[collection], data);
      return;
    } catch (e) { console.error('[DB] Redis blog save error:', e.message); }
  }
  try {
    fs.writeFileSync(BLOG_FILES[collection], JSON.stringify(data, null, 2), 'utf8');
  } catch (e) { console.error('[DB] Local blog save error:', e.message); }
}

module.exports = { load, save, createSession, validateSession, destroySession, blogLoad, blogSave };
