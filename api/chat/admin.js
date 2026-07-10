/* ============================================================
   /api/chat/admin — Endpoints admin pour gérer les chats
   GET: Lister les sessions actives
   POST: Envoyer un message en tant qu'admin
   DELETE: Supprimer une session
   ============================================================ */

const { validateSession } = require('../_lib/db');
const { getActiveSessions, getSession, addMessage, deleteSession } = require('../_lib/chat-db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Vérifier l'auth admin
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  if (!token || !(await validateSession(token))) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  // ─── GET: Lister les sessions ─────────────────────────────
  if (req.method === 'GET') {
    try {
      const sessions = await getActiveSessions();
      const { getMessages } = require('../_lib/chat-db');
      const result = [];
      for (const s of sessions) {
        const msgs = await getMessages(s.id);
        const unreadCount = msgs.filter(m => m.sender !== 'admin' && m.timestamp > (s.lastAdminRead || 0)).length;
        const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
        result.push({
          ...s,
          unreadCount,
          messageCount: msgs.length,
          lastMessage: lastMsg ? lastMsg.text.substring(0, 100) : '',
          lastMessageTime: lastMsg ? lastMsg.timestamp : s.createdAt,
        });
      }
      return res.json(result);
    } catch (e) {
      console.error('[CHAT-ADMIN] List error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // ─── POST: Envoyer un message admin ───────────────────────
  if (req.method === 'POST') {
    try {
      const { sessionId, text } = req.body || {};
      if (!sessionId || !text) return res.status(400).json({ error: 'Missing sessionId or text' });

      const session = await getSession(sessionId);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      const msg = await addMessage(sessionId, {
        sender: 'admin',
        senderName: 'PIA Admin',
        text: text.trim(),
      });

      return res.json({ success: true, message: msg });
    } catch (e) {
      console.error('[CHAT-ADMIN] Send error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // ─── DELETE: Supprimer une session ────────────────────────
  if (req.method === 'DELETE') {
    try {
      const { sessionId } = req.query;
      if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });
      await deleteSession(sessionId);
      return res.json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
