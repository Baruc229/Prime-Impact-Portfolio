const fs = require('fs');
const path = require('path');
const os = require('os');

let redis;
try {
  const { Redis } = require('@upstash/redis');
  if (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) {
    redis = new Redis({
      url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    console.log('[DB] Redis connected');
  } else {
    console.log('[DB] No Redis env vars found');
  }
} catch (e) {
  console.log('[DB] @upstash/redis not available:', e.message);
}

const DATA_FILE = path.join(os.tmpdir(), 'pia-submissions.json');

function loadLocal() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('[DB] Local load error:', e.message);
  }
  return { nextId: 1, submissions: [] };
}

function saveLocal(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('[DB] Saved locally to', DATA_FILE);
  } catch (e) {
    console.error('[DB] Local save error:', e.message);
  }
}

async function load() {
  if (redis) {
    try {
      const raw = await redis.get('submissions_data');
      console.log('[DB] Loaded from Redis, found:', raw?.submissions?.length || 0, 'submissions');
      return raw || { nextId: 1, submissions: [] };
    } catch (e) {
      console.error('[DB] Redis load error:', e.message);
    }
  }
  const data = loadLocal();
  console.log('[DB] Loaded from local file, found:', data.submissions.length, 'submissions');
  return data;
}

async function save(data) {
  if (redis) {
    try {
      await redis.set('submissions_data', data);
      console.log('[DB] Saved to Redis');
      return;
    } catch (e) {
      console.error('[DB] Redis save error:', e.message);
    }
  }
  saveLocal(data);
}

module.exports = { load, save };
