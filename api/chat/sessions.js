/* ============================================================
   /api/chat/sessions — Créer ou récupérer une session de chat
   POST: Créer une nouvelle session
   GET: Récupérer une session par ID
   ============================================================ */

const { createSession, getSession } = require('../_lib/chat-db');
const { getWelcomeMessage } = require('../_lib/chat-kb');
const { addMessage } = require('../_lib/chat-db');
const { setCors } = require('../_lib/cors');

module.exports = async (req, res) => {
  setCors(req, res);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    try {
      const { name, email, page, userAgent, lang } = req.body || {};
      const session = await createSession({ name: name || 'Visiteur', email: email || '', page: page || '/', userAgent: userAgent || '' });

      // Message de bienvenue du bot
      const welcomeText = getWelcomeMessage(lang || 'fr');
      await addMessage(session.id, { sender: 'bot', senderName: 'PIA Bot', text: welcomeText });

      return res.json({ success: true, session, welcome: welcomeText });
    } catch (e) {
      console.error('[CHAT] Session create error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'Missing session ID' });
      const session = await getSession(id);
      if (!session) return res.status(404).json({ error: 'Session not found' });
      return res.json(session);
    } catch (e) {
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
