const ALLOWED_ORIGINS = [
  'https://primeimpactagency.com',
  'https://prime-impact.vercel.app',
  'https://pia-immobilier.vercel.app',
];

function setCors(req, res) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
}

module.exports = { setCors };
