/* ============================================================
   /api/chat/messages — Récupérer et envoyer des messages
   GET: Récupérer les messages d'une session (+ polling)
   POST: Envoyer un message (visitor ou admin)
   ============================================================ */

const { getSession, addMessage, getMessages } = require('../_lib/chat-db');
const { generateResponse, getInitError } = require('../_lib/chat-kb');
const { setCors } = require('../_lib/cors');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ─── GET: Récupérer les messages ──────────────────────────
  if (req.method === 'GET') {
    try {
      const { sessionId, since } = req.query;
      if (!sessionId) return res.status(400).json({ error: 'Missing sessionId' });

      const session = await getSession(sessionId);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      const sinceNum = since ? parseInt(since) : 0;
      const messages = await getMessages(sessionId, sinceNum > 0 ? sinceNum : undefined);

      return res.json({ messages, session: { status: session.status, lastActive: session.lastActive } });
    } catch (e) {
      console.error('[CHAT] Get messages error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  // ─── POST: Envoyer un message ─────────────────────────────
  if (req.method === 'POST') {
    try {
      const { sessionId, sender, senderName, text, lang } = req.body || {};
      if (!sessionId || !text) return res.status(400).json({ error: 'Missing sessionId or text' });

      const session = await getSession(sessionId);
      if (!session) return res.status(404).json({ error: 'Session not found' });

      // Enregistrer le message du visiteur
      const visitorMsg = await addMessage(sessionId, {
        sender: sender || 'visitor',
        senderName: senderName || session.visitorName || 'Visiteur',
        text: text.trim(),
      });

      // Générer la réponse IA si c'est un message visiteur
      let botMsg = null;
      let aiSource = 'none';
      if (sender === 'visitor' || !sender) {
        const history = await getMessages(sessionId);
        const ai = await generateResponse(text, lang || 'fr', history);
        aiSource = ai.source;
        botMsg = await addMessage(sessionId, {
          sender: 'bot',
          senderName: 'PIA Bot',
          text: ai.text,
        });
      }

      return res.json({ success: true, visitorMessage: visitorMsg, botMessage: botMsg, _debug: { initError: getInitError(), source: aiSource } });
    } catch (e) {
      console.error('[CHAT] Send message error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
