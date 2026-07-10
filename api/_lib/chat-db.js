/* ============================================================
   CHAT DB — Fonctions de base de données pour le chat
   Upstash Redis + fallback local (fichiers JSON)
   ============================================================ */

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

const CHAT_FILE = path.join(os.tmpdir(), 'pia-chat.json');

function loadLocal() {
  try {
    if (fs.existsSync(CHAT_FILE)) return JSON.parse(fs.readFileSync(CHAT_FILE, 'utf8'));
  } catch (e) {}
  return { sessions: {}, messages: {} };
}

function saveLocal(data) {
  try { fs.writeFileSync(CHAT_FILE, JSON.stringify(data, null, 2), 'utf8'); } catch (e) {}
}

function genId() { return crypto.randomBytes(8).toString('hex'); }

// ─── Sessions ───────────────────────────────────────────────
async function createSession(visitorData) {
  const id = genId();
  const session = {
    id,
    visitorName: visitorData.name || 'Visiteur',
    visitorEmail: visitorData.email || '',
    page: visitorData.page || '/',
    userAgent: visitorData.userAgent || '',
    status: 'active',
    unreadBy: 'admin',
    createdAt: Date.now(),
    lastActive: Date.now(),
  };
  if (redis) {
    try {
      await redis.set('chat:session:' + id, session);
      const list = (await redis.get('chat:session_list')) || [];
      list.push(id);
      await redis.set('chat:session_list', list);
      return session;
    } catch (e) { console.error('[CHAT-DB] Redis createSession error:', e.message); }
  }
  const data = loadLocal();
  data.sessions[id] = session;
  saveLocal(data);
  return session;
}

async function getSession(id) {
  if (redis) {
    try { return await redis.get('chat:session:' + id); } catch (e) {}
  }
  return loadLocal().sessions[id] || null;
}

async function updateSession(id, updates) {
  if (redis) {
    try {
      const session = await redis.get('chat:session:' + id);
      if (!session) return null;
      Object.assign(session, updates);
      await redis.set('chat:session:' + id, session);
      return session;
    } catch (e) {}
  }
  const data = loadLocal();
  if (!data.sessions[id]) return null;
  Object.assign(data.sessions[id], updates);
  saveLocal(data);
  return data.sessions[id];
}

async function getActiveSessions() {
  if (redis) {
    try {
      const list = (await redis.get('chat:session_list')) || [];
      const sessions = [];
      for (const id of list) {
        const s = await redis.get('chat:session:' + id);
        if (s && s.status !== 'deleted') sessions.push(s);
      }
      return sessions.sort((a, b) => b.lastActive - a.lastActive);
    } catch (e) {}
  }
  const data = loadLocal();
  return Object.values(data.sessions)
    .filter(s => s.status !== 'deleted')
    .sort((a, b) => b.lastActive - a.lastActive);
}

async function deleteSession(id) {
  if (redis) {
    try {
      await redis.del('chat:session:' + id);
      const list = (await redis.get('chat:session_list')) || [];
      await redis.set('chat:session_list', list.filter(i => i !== id));
      await redis.del('chat:messages:' + id);
      return;
    } catch (e) {}
  }
  const data = loadLocal();
  delete data.sessions[id];
  delete data.messages[id];
  saveLocal(data);
}

// ─── Messages ───────────────────────────────────────────────
async function addMessage(sessionId, msg) {
  const message = {
    id: genId(),
    sessionId,
    sender: msg.sender, // 'visitor' | 'bot' | 'admin'
    senderName: msg.senderName || msg.sender,
    text: msg.text,
    timestamp: Date.now(),
  };

  const updates = { lastActive: Date.now() };
  // Only mark as unread by admin when a visitor sends (not when bot auto-responds)
  if (msg.sender === 'visitor') {
    updates.unreadBy = 'admin';
  } else if (msg.sender === 'admin') {
    updates.unreadBy = 'visitor';
  }

  if (redis) {
    try {
      const messages = (await redis.get('chat:messages:' + sessionId)) || [];
      messages.push(message);
      await redis.set('chat:messages:' + sessionId, messages);
      const session = await redis.get('chat:session:' + sessionId);
      if (session) {
        Object.assign(session, updates);
        await redis.set('chat:session:' + sessionId, session);
      }
      return message;
    } catch (e) { console.error('[CHAT-DB] Redis addMessage error:', e.message); }
  }

  const data = loadLocal();
  if (!data.messages[sessionId]) data.messages[sessionId] = [];
  data.messages[sessionId].push(message);
  saveLocal(data);
  if (data.sessions[sessionId]) {
    Object.assign(data.sessions[sessionId], updates);
    saveLocal(data);
  }
  return message;
}

async function getMessages(sessionId, since) {
  if (redis) {
    try {
      const messages = (await redis.get('chat:messages:' + sessionId)) || [];
      if (since) return messages.filter(m => m.timestamp > since);
      return messages;
    } catch (e) {}
  }
  const data = loadLocal();
  const msgs = data.messages[sessionId] || [];
  if (since) return msgs.filter(m => m.timestamp > since);
  return msgs;
}

module.exports = { createSession, getSession, updateSession, getActiveSessions, deleteSession, addMessage, getMessages };
