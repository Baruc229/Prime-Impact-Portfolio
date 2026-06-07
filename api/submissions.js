const { load, save, validateSession } = require('./_lib/db');
const nodemailer = require('nodemailer');

const TYPE_LABELS = { contact: 'Contact', devis: 'Devis', order: 'Commande' };
const FIELD_LABELS = {
  prenom: 'Prénom', nom: 'Nom', name: 'Nom',
  email: 'Email', phone: 'Téléphone', telephone: 'Téléphone',
  subject: 'Sujet', message: 'Message',
  prestation: 'Prestation', has_site: 'Site existant',
  description: 'Description', budget: 'Budget', packSelect: 'Pack'
};

const path = require('path');
const fs = require('fs');

function formatDate(d) {
  if (!d) return '—';
  try {
    const dt = new Date(d.endsWith('Z') ? d : d + 'Z');
    if (isNaN(dt.getTime())) return '—';
    return dt.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch (e) { return '—'; }
}

function escHTML(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildNotificationHTML(submission) {
  const typeLabel = TYPE_LABELS[submission.form_type] || submission.form_type;
  let fields = '';
  for (const [key, val] of Object.entries(submission.data || {})) {
    if (val == null || val === '') continue;
    const label = FIELD_LABELS[key] || key;
    fields += `<tr><td style="padding:8px 12px;border:1px solid #e0e0e0;font-size:12px;text-transform:uppercase;letter-spacing:0.3px;color:#8e8e93;background:#f8f8fa;white-space:nowrap;vertical-align:top">${escHTML(label)}</td><td style="padding:8px 12px;border:1px solid #e0e0e0;font-size:14px;word-break:break-word;white-space:pre-wrap">${escHTML(String(val))}</td></tr>`;
  }

  return '<html><body style="font-family:Inter,system-ui,sans-serif;background:#f5f5f5;padding:24px">' +
    '<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">' +
    '<div style="background:#0b0c10;padding:20px 24px;display:flex;align-items:center;gap:12px">' +
    '<h1 style="color:#fff;font-size:18px;margin:0">Nouveau ' + escHTML(typeLabel) + '</h1></div>' +
    '<div style="padding:20px 24px">' +
    '<p style="color:#666;font-size:13px;margin:0 0 16px">Reçu le ' + escHTML(formatDate(submission.created_at)) + (submission.source ? ' &middot; Source: ' + escHTML(submission.source) : '') + '</p>' +
    '<table style="border-collapse:collapse;width:100%;font-size:14px">' + fields + '</table>' +
    '<hr style="border:none;border-top:1px solid #eee;margin:20px 0">' +
    '<p style="color:#999;font-size:11px;text-align:center;margin:0">PIA &mdash; Notification automatique</p>' +
    '</div></div></body></html>';
}

async function sendNotificationEmail(submission) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  if (!gmailUser || !gmailPass) return;

  const typeLabel = TYPE_LABELS[submission.form_type] || submission.form_type;
  const name = submission.data?.name || submission.data?.prenom || submission.data?.nom || '';

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', port: 465, secure: true,
      auth: { user: gmailUser, pass: gmailPass }
    });

    await transporter.sendMail({
      from: '"PIA" <' + gmailUser + '>',
      to: gmailUser,
      subject: 'Nouveau ' + typeLabel + (name ? ' — ' + name : ''),
      html: buildNotificationHTML(submission)
    });
  } catch (err) {
    console.error('[EMAIL] Notification error:', err);
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const auth = req.headers.authorization;
    const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : '';
    if (!(await validateSession(token))) {
      res.status(401).json({ error: 'Non authentifié' });
      return;
    }
    try {
      const db = await load();
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      const formType = req.query.form_type || '';

      let filtered = db.submissions;
      if (formType) filtered = filtered.filter(s => s.form_type === formType);

      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      const pageItems = filtered.slice(offset, offset + limit);

      res.json({ submissions: pageItems, total, page, limit, totalPages });
    } catch (err) {
      console.error('[API] List error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
    return;
  }

  if (req.method === 'POST') {
    try {
      const { form_type, data, source } = req.body;
      if (!form_type || !data) {
        res.status(400).json({ error: 'form_type and data are required' });
        return;
      }
      if (!['contact', 'devis', 'order'].includes(form_type)) {
        res.status(400).json({ error: 'Invalid form_type' });
        return;
      }
      if (!data.email && !data.name && !data.nom && !data.prenom) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const db = await load();
      const submission = {
        id: db.nextId++,
        form_type,
        data,
        source: source || '',
        created_at: new Date().toISOString(),
        read: 0
      };
      db.submissions.unshift(submission);
      await save(db);
      sendNotificationEmail(submission);
      res.json({ success: true, id: submission.id });
    } catch (err) {
      console.error('[API] Insert error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
