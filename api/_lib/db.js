const fs = require('fs');
const path = require('path');

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

const DATA_FILE = path.join(__dirname, '..', '..', 'tmp', 'submissions.json');

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadLocal() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {}
  return { nextId: 1, submissions: [] };
}

function saveLocal(data) {
  ensureDir(DATA_FILE);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

async function load() {
  if (redis) {
    try {
      const raw = await redis.get('submissions_data');
      return raw || { nextId: 1, submissions: [] };
    } catch (e) {
      console.error('Redis load error:', e.message);
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
      console.error('Redis save error:', e.message);
    }
  }
  saveLocal(data);
}

module.exports = { load, save };
