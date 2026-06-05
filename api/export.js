const { load, validateSession } = require('./_lib/db');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const XLSX = require('xlsx');

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

const FORMAT_LABELS = { csv: 'CSV', html: 'Rapport HTML', pdf: 'PDF', xlsx: 'Excel (XLSX)' };
const TYPE_LABELS = { contact: 'Contact', devis: 'Devis', order: 'Commande' };

function escCSV(val) {
  const s = val == null ? '' : String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) return '"' + s.replace(/"/g, '""') + '"';
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
  const lines = [headers.map(escCSV).join(',')];
  filtered.forEach(s => {
    const row = columns.map(col => {
      if (col === 'id') return s.id;
      if (col === 'created_at') return s.created_at;
      if (col === 'form_type') return s.form_type;
      if (col === 'source') return s.source || '';
      return s.data ? (s.data[col] != null ? s.data[col] : '') : '';
    });
    lines.push(row.map(escCSV).join(','));
  });
  return lines.join('\r\n');
}

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

function buildHTML(submissions) {
  const grouped = {};
  submissions.forEach(s => {
    if (!grouped[s.form_type]) grouped[s.form_type] = [];
    grouped[s.form_type].push(s);
  });

  let sections = '';
  for (const [type, items] of Object.entries(grouped)) {
    const typeLabel = TYPE_LABELS[type] || type;
    let rows = '';
    items.forEach(s => {
      let fields = '';
      for (const [key, val] of Object.entries(s.data || {})) {
        if (val == null || val === '') continue;
        const label = FIELD_LABELS[key] || key;
        const isLong = key === 'message' || key === 'description';
        fields += `<div class="field ${isLong ? 'long' : ''}"><span class="field-label">${escHTML(label)}</span><span class="field-value">${isLong ? escHTML(String(val)) : escHTML(String(val))}</span></div>`;
      }
      rows += `<div class="card">
        <div class="card-header"><span class="badge ${type}">${escHTML(typeLabel)}</span><span class="date">${escHTML(formatDate(s.created_at))}</span></div>
        <div class="card-body">${fields}</div>
        <div class="card-footer">ID: ${s.id}${s.source ? ' &middot; Source: ' + escHTML(s.source) : ''}</div>
      </div>`;
    });
    sections += `<h2 class="section-title"><span class="section-count">${items.length}</span> ${escHTML(typeLabel)}</h2><div class="cards">${rows}</div>`;
  }

  const total = submissions.length;
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>Rapport PIA</title>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f2f2f7;color:#1c1c1e;padding:24px}
.report{max-width:800px;margin:0 auto}
.header{text-align:center;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #e0e0e0}
.header h1{font-size:24px;font-weight:700}
.header p{color:#666;font-size:14px;margin-top:4px}
.section-title{font-size:16px;font-weight:600;margin:24px 0 12px;display:flex;align-items:center;gap:8px}
.section-count{display:inline-flex;align-items:center;justify-content:center;background:#007aff;color:#fff;font-size:12px;font-weight:600;width:24px;height:24px;border-radius:12px}
.cards{display:flex;flex-direction:column;gap:12px}
.card{background:#fff;border:1px solid #e0e0e0;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.card-header{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f8f8fa;border-bottom:1px solid #e0e0e0;font-size:12px}
.badge{display:inline-block;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.3px}
.badge.contact{background:rgba(0,122,255,0.12);color:#007aff}
.badge.devis{background:rgba(52,199,89,0.12);color:#34c759}
.badge.order{background:rgba(255,149,0,0.12);color:#ff9500}
.date{color:#666}
.card-body{padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px}
.field{display:flex;flex-direction:column;gap:2px}
.field.long{grid-column:1 / -1}
.field-label{font-size:10px;text-transform:uppercase;letter-spacing:0.3px;color:#8e8e93}
.field-value{font-size:14px;word-break:break-word;white-space:pre-wrap;line-height:1.5}
.card-footer{padding:8px 14px;font-size:11px;color:#8e8e93;border-top:1px solid #f0f0f0}
@media print{body{background:#fff;padding:0}.card{break-inside:avoid;box-shadow:none}}
</style></head><body>
<div class="report">
<div class="header"><h1>Rapport PIA</h1><p>${total} soumission${total > 1 ? 's' : ''} &middot; ${new Date().toLocaleDateString('fr-FR')}</p></div>
${sections}
</div></body></html>`;
}

function buildPDF(submissions) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    const buffers = [];
    doc.on('data', chunk => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    const grouped = {};
    submissions.forEach(s => {
      if (!grouped[s.form_type]) grouped[s.form_type] = [];
      grouped[s.form_type].push(s);
    });

    doc.font('Helvetica-Bold').fontSize(22).text('Rapport PIA', { align: 'center' });
    doc.font('Helvetica').fontSize(11).fillColor('#666').text(submissions.length + ' soumission' + (submissions.length > 1 ? 's' : '') + ' — ' + new Date().toLocaleDateString('fr-FR'), { align: 'center' });
    doc.moveDown(1.5);

    for (const [type, items] of Object.entries(grouped)) {
      if (doc.y > 650) doc.addPage();
      doc.font('Helvetica-Bold').fontSize(14).fillColor('#007aff').text((TYPE_LABELS[type] || type) + ' (' + items.length + ')');
      doc.moveDown(0.5);

      items.forEach((s, idx) => {
        if (doc.y > 680) doc.addPage();
        doc.font('Helvetica-Bold').fontSize(10).fillColor('#1c1c1e');
        const titleParts = [];
        const name = s.data?.name || s.data?.prenom || s.data?.nom;
        if (name) titleParts.push(String(name));
        if (s.data?.email) titleParts.push(String(s.data.email));
        doc.text((idx + 1) + '. ' + titleParts.join(' — ') || '#' + s.id);
        doc.font('Helvetica').fontSize(9).fillColor('#666').text(formatDate(s.created_at));

        for (const [key, val] of Object.entries(s.data || {})) {
          if (val == null || val === '') continue;
          const label = FIELD_LABELS[key] || key;
          const isLong = key === 'message' || key === 'description';
          if (isLong) {
            doc.font('Helvetica-Bold').fontSize(8).fillColor('#8e8e93').text(label.toUpperCase());
            doc.font('Helvetica').fontSize(9).fillColor('#1c1c1e').text(String(val), { indent: 0 });
          } else {
            doc.font('Helvetica-Bold').fontSize(8).fillColor('#8e8e93').text(label.toUpperCase() + ': ', { continued: true });
            doc.font('Helvetica').fontSize(9).fillColor('#1c1c1e').text(String(val));
          }
        }
        doc.moveDown(0.3);
        if (s.source) {
          doc.font('Helvetica').fontSize(8).fillColor('#8e8e93').text('Source: ' + s.source);
        }
        doc.moveDown(0.7);
      });
    }
    doc.end();
  });
}

function buildXLSX(submissions) {
  const wb = XLSX.utils.book_new();

  const grouped = {};
  submissions.forEach(s => {
    if (!grouped[s.form_type]) grouped[s.form_type] = { items: [], columns: TYPE_COLUMNS[s.form_type] || [] };
    grouped[s.form_type].items.push(s);
  });

  let hasAll = false;
  for (const [type, { items, columns }] of Object.entries(grouped)) {
    const headers = columns.map(c => FIELD_LABELS[c] || c);
    const rows = items.map(s => {
      const row = {};
      columns.forEach(col => {
        const label = FIELD_LABELS[col] || col;
        if (col === 'id') row[label] = s.id;
        else if (col === 'created_at') row[label] = s.created_at;
        else if (col === 'source') row[label] = s.source || '';
        else row[label] = s.data && s.data[col] != null ? s.data[col] : '';
      });
      return row;
    });
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, (TYPE_LABELS[type] || type).substring(0, 31));
    hasAll = true;
  }

  if (!hasAll) {
    const ws = XLSX.utils.aoa_to_sheet([['Aucune soumission']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Données');
  }

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

function formatFilename(format, formType) {
  const f = FORMAT_LABELS[format] || format;
  const ext = format;
  const typePart = formType ? '-' + formType : '-all';
  return 'pia-' + typePart + '.' + ext;
}

function contentType(format) {
  const map = { csv: 'text/csv; charset=utf-8', html: 'text/html; charset=utf-8', pdf: 'application/pdf', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
  return map[format] || 'application/octet-stream';
}

function buildEmailHTML(submissions, format) {
  const total = submissions.length;
  const byType = {};
  submissions.forEach(s => { byType[s.form_type] = (byType[s.form_type] || 0) + 1; });
  const typeSummary = Object.entries(byType).map(([t, c]) =>
    '<tr><td style="padding:6px 12px;border:1px solid #ddd;text-transform:capitalize">' + t + '</td><td style="padding:6px 12px;border:1px solid #ddd">' + c + '</td></tr>'
  ).join('');
  const fmtLabel = FORMAT_LABELS[format] || format.toUpperCase();

  return '<html><body style="font-family:Inter,system-ui,sans-serif;background:#f5f5f5;padding:24px">' +
    '<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08)">' +
    '<div style="background:#0b0c10;padding:20px 24px">' +
    '<h1 style="color:#fff;font-size:20px;margin:0">PIA &mdash; Export des soumissions</h1></div>' +
    '<div style="padding:24px">' +
    '<p style="color:#333;font-size:14px;line-height:1.6">Bonjour,<br>Voici l\'export de <strong>' + total + ' soumission' + (total > 1 ? 's' : '') + '</strong> au format <strong>' + fmtLabel + '</strong>.</p>' +
    '<table style="border-collapse:collapse;width:100%;margin:16px 0;font-size:13px">' +
    '<thead><tr style="background:#f0f0f0"><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Type</th><th style="padding:6px 12px;border:1px solid #ddd;text-align:left">Nombre</th></tr></thead>' +
    '<tbody>' + typeSummary + '</tbody></table>' +
    '<p style="color:#666;font-size:13px">Le fichier est joint à cet email.</p>' +
    '<hr style="border:none;border-top:1px solid #eee;margin:20px 0">' +
    '<p style="color:#999;font-size:11px">Email g&eacute;n&eacute;r&eacute; automatiquement depuis le tableau de bord PIA.</p>' +
    '</div></div></body></html>';
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
      const format = req.query.format || 'csv';
      const formType = req.query.type && TYPE_COLUMNS[req.query.type] ? req.query.type : null;

      let data, filename;
      switch (format) {
        case 'csv':
          data = '\uFEFF' + buildCSV(db.submissions, formType);
          break;
        case 'html':
          data = buildHTML(db.submissions);
          break;
        case 'pdf':
          data = await buildPDF(db.submissions);
          break;
        case 'xlsx':
          data = buildXLSX(db.submissions);
          break;
        default:
          return res.status(400).json({ error: 'Format invalide. Utilisez csv, html, pdf ou xlsx.' });
      }

      filename = formatFilename(format, formType || (format === 'csv' ? '' : null));
      res.setHeader('Content-Type', contentType(format));
      res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
      res.status(200).send(data);
    } catch (err) {
      console.error('[EXPORT] Error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
    return;
  }

  if (req.method === 'POST') {
    const { email, format } = req.body;
    const targetEmail = email || process.env.GMAIL_USER;
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const outFormat = format || 'csv';

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

      let content, filename, attachContentType;
      switch (outFormat) {
        case 'csv':
          content = '\uFEFF' + buildCSV(db.submissions, null);
          attachContentType = 'text/csv; charset=utf-8';
          break;
        case 'html':
          content = buildHTML(db.submissions);
          attachContentType = 'text/html; charset=utf-8';
          break;
        case 'pdf':
          content = await buildPDF(db.submissions);
          attachContentType = 'application/pdf';
          break;
        case 'xlsx':
          content = buildXLSX(db.submissions);
          attachContentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          break;
        default:
          return res.status(400).json({ error: 'Format invalide' });
      }
      filename = formatFilename(outFormat, 'all');

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', port: 465, secure: true,
        auth: { user: gmailUser, pass: gmailPass }
      });

      await transporter.sendMail({
        from: '"PIA Dashboard" <' + gmailUser + '>',
        to: targetEmail,
        subject: 'Export PIA \u2014 ' + db.submissions.length + ' soumission(s) \u2014 ' + new Date().toLocaleDateString('fr-FR'),
        html: buildEmailHTML(db.submissions, outFormat),
        attachments: [{ filename, content, contentType: attachContentType }]
      });

      res.json({ success: true, sentTo: targetEmail, total: db.submissions.length, format: outFormat });
    } catch (err) {
      console.error('[EXPORT] Email error:', err);
      res.status(500).json({ error: 'Erreur d\'envoi : ' + err.message });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
