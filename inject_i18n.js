const fs = require('fs');
const path = require('path');

const files = ['index.html', '/a-propos', '/devis', '/contact', '/realisations', '/services', '/temoignages'];

files.forEach(f => {
  let p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('i18n.js')) {
      content = content.replace('<script src="components.js"></script>', '<script src="i18n.js"></script>\n  <script src="components.js"></script>');
      fs.writeFileSync(p, content, 'utf8');
      console.log('Added i18n to ' + f);
    }
  }
});
