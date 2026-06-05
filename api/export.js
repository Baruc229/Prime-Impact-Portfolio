const { load, validateSession } = require('./_lib/db');
const nodemailer = require('nodemailer');

const FIELD_LABELS = {
  prenom: 'Prénom', nom: 'Nom', name: 'Nom',
  email: 'Email', phone: 'Téléphone', telephone: 'Téléphone',
  subject: 'Sujet', message: 'Message',
  prestation: 'Prestation', has_site: 'Site existant',
  description: 'Description', budget: 'Budget', packSelect: 'Pack'
};

const TYPE_COLUMNS = {
  contact: ['id', 'created_at', 'source', 'name', 'email', 'phone', 'subject', 'message'],
  devis: ['id', 'created_at', 'source', 'name', 'email', 'phone', 'prestation', 'has_site', 'description', 'budget'],
  order: ['id', 'created_at', 'source', 'prenom', 'nom', 'email', 'telephone', 'packSelect']
};

function escapeCSV(val) {
  const s = val == null ? '' : String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function buildCSV(submissions, formType) {
  let columns, filtered;
  if (formType && TYPE_COLUMNS[formType]) {
    columns = TYPE_COLUMNS[formType];
    filtered = submissions.filter(s => s.form_type === formType);
  } else {
    const allCols = new Set();
    filtered = submissions;
    filtered.forEach(s => Object.keys(s.data || {}).forEach(k => allCols.add(k)));
    columns = ['id', 'created_at', 'form_type', 'source', ...allCols];
  }

  const headers = columns.map(c => FIELD_LABELS[c] || c);
  const lines = [headers.map(escapeCSV).join(',')];

  filtered.forEach(s => {
    const row = columns.map(col => {
      if (col === 'id') return s.id;
      if (col === 'created_at') return s.created_at;
      if (col === 'form_type') return s.form_type;
      if (col === 'source') return s.source || '';
      return s.data ? (s.data[col] != null ? s.data[col] : '') : '';
    });
    lines.push(row.map(escapeCSV).join(','));
  });

  return lines.join('\r\n');
}

function buildEmailHTML(submissions) {
  const total = submissions.length;
  const byType = {};
  submissions.forEach(s => { byType[s.form_type] = (byType[s.form_type] || 0) + 1; });
  const typeSummary = Object.entries(byType)
    .map(([t, c]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;text-transform:capitalize">${t}</td><td style="padding:6px 12px;border:1px solid #ddd">${c}</td></tr>`)
    .join('');

  return `<html><body style="font-family:Inter,system-ui,sans-serif;background:#f5f5f5;padding:24px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
<div style="background:#0b0c10;padding:20px 24px">
<h1 style="color:#fff;font-size:20px;margin:0">PIA &mdash; Export des soumissions</h1>
</div>
<div style="padding:24px">
<p style="color:#333;font-size:14px;line-height:1.6">Bonjour,<br>Voici l'export de <strong>${total} soumission${total > 1 ? 's' : ''}</strong> du tableau de bord PIA.</p>
<table style="border-collapse:collapse;width:100%;margin:16px 0;font-size:13px">
<thead><tr style="background:#f0f0f0"><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Type</th><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Nombre</th></tr></thead>
<tbody>${typeSummary}</tbody>
</table>
<p style="color:#666;font-size:13px">Le fichier CSV complet est joint à cet email.</p>
<hr style="border:none;border-top:1px solid #eee;margin:20px 0">
<p style="color:#999;font-size:11px">Email g&eacute;n&eacute;r&eacute; automatiquement depuis le tableau de bord PIA.</p>
</div></div></body></html>`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const token = (req.headers.authorization || '').slice(7);
  if (!(await validateSession(token))) {
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const db = await load();
      const formType = req.query.type && TYPE_COLUMNS[req.query.type] ? req.query.type : null;
      const csv = buildCSV(db.submissions, formType);
      const filename = formType ? `pia-submissions-${formType}.csv` : 'pia-submissions-all.csv';
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.status(200).send('\uFEFF' + csv);
    } catch (err) {
      console.error('[EXPORT] CSV error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
    return;
  }

  if (req.method === 'POST') {
    const { email } = req.body;
    const targetEmail = email || process.env.GMAIL_USER;
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      res.status(500).json({ error: 'GMAIL_USER et GMAIL_APP_PASSWORD non configurés' });
      return;
    }
    if (!targetEmail) {
      res.status(400).json({ error: 'Email destinataire manquant' });
      return;
    }

    try {
      const db = await load();
      const csv = buildCSV(db.submissions, null);

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', port: 465, secure: true,
        auth: { user: gmailUser, pass: gmailPass }
      });

      await transporter.sendMail({
        from: `"PIA Dashboard" <${gmailUser}>`,
        to: targetEmail,
        subject: `Export PIA \u2014 ${db.submissions.length} soumission(s) \u2014 ${new Date().toLocaleDateString('fr-FR')}`,
        html: buildEmailHTML(db.submissions),
        attachments: [{
          filename: 'pia-submissions-all.csv',
          content: '\uFEFF' + csv,
          contentType: 'text/csv; charset=utf-8'
        }]
      });

      res.json({ success: true, sentTo: targetEmail, total: db.submissions.length });
    } catch (err) {
      console.error('[EXPORT] Email error:', err);
      res.status(500).json({ error: 'Erreur d\'envoi : ' + err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
