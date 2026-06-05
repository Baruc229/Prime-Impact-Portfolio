const { load, validateSession } = require('./_lib/db');
const nodemailer = require('nodemailer');

function escapeCSV(val) {
  const s = val == null ? '' : String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCSV(submissions) {
  const metaKeys = ['id', 'form_type', 'created_at', 'source', 'read'];
  const dataKeys = new Set();
  submissions.forEach(s => { Object.keys(s.data || {}).forEach(k => dataKeys.add(k)); });
  const sortedDataKeys = [...dataKeys].sort();
  const headers = [...metaKeys, ...sortedDataKeys];

  const lines = [headers.map(escapeCSV).join(',')];
  submissions.forEach(s => {
    const row = metaKeys.map(k => escapeCSV(s[k]));
    sortedDataKeys.forEach(k => row.push(escapeCSV(s.data ? s.data[k] : '')));
    lines.push(row.join(','));
  });
  return lines.join('\r\n');
}

function buildEmailHTML(submissions) {
  const total = submissions.length;
  const byType = {};
  submissions.forEach(s => {
    byType[s.form_type] = (byType[s.form_type] || 0) + 1;
  });
  const typeSummary = Object.entries(byType)
    .map(([t, c]) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;text-transform:capitalize">${t}</td><td style="padding:6px 12px;border:1px solid #ddd">${c}</td></tr>`)
    .join('');

  return `
<html><body style="font-family:Inter,system-ui,sans-serif;background:#f5f5f5;padding:24px">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
<div style="background:#0b0c10;padding:20px 24px">
<h1 style="color:#fff;font-size:20px;margin:0">📊 PIA — Export des soumissions</h1>
</div>
<div style="padding:24px">
<p style="color:#333;font-size:14px;line-height:1.6">Bonjour,<br>Voici l'export de <strong>${total} soumission${total > 1 ? 's' : ''}</strong> du tableau de bord PIA.</p>
<table style="border-collapse:collapse;width:100%;margin:16px 0;font-size:13px">
<thead><tr style="background:#f0f0f0"><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Type</th><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Nombre</th></tr></thead>
<tbody>${typeSummary}</tbody>
</table>
<p style="color:#666;font-size:13px">Le fichier CSV complet est joint à cet email.</p>
<hr style="border:none;border-top:1px solid #eee;margin:20px 0">
<p style="color:#999;font-size:11px">Email généré automatiquement depuis le tableau de bord PIA.</p>
</div></div></body></html>`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const auth = req.headers.authorization;
  const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!(await validateSession(token))) {
    res.status(401).json({ error: 'Non authentifié' });
    return;
  }

  if (req.method === 'GET') {
    try {
      const db = await load();
      const csv = toCSV(db.submissions);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="pia-submissions.csv"');
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
      res.status(500).json({ error: 'GMAIL_USER et GMAIL_APP_PASSWORD non configurés dans les variables d\'environnement Vercel' });
      return;
    }
    if (!targetEmail) {
      res.status(400).json({ error: 'Email destinataire manquant' });
      return;
    }

    try {
      const db = await load();
      const csv = toCSV(db.submissions);

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass }
      });

      await transporter.sendMail({
        from: `"PIA Dashboard" <${gmailUser}>`,
        to: targetEmail,
        subject: `📊 Export PIA — ${db.submissions.length} soumission(s) — ${new Date().toLocaleDateString('fr-FR')}`,
        html: buildEmailHTML(db.submissions),
        attachments: [{
          filename: 'pia-submissions.csv',
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
