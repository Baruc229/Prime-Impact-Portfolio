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

const attempts = new Map();

async function checkRateLimit(key, maxAttempts, windowSeconds) {
  if (redis) {
    try {
      const count = await redis.incr('rl:' + key);
      if (count === 1) {
        await redis.expire('rl:' + key, windowSeconds);
      }
      return count <= maxAttempts;
    } catch (e) {}
  }
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now - entry.start > windowSeconds * 1000) {
    attempts.set(key, { start: now, count: 1 });
    return true;
  }
  entry.count++;
  return entry.count <= maxAttempts;
}

module.exports = { checkRateLimit };
