window.PIA_API_URL = 'https://pia-login.onrender.com';
window.PIA_ADMIN_API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : 'https://pia-admin.vercel.app';