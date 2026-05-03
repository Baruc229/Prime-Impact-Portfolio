const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/\.custom-cursor\s*\{[^}]+\}/g, '');
css = css.replace(/\.custom-cursor-follower\s*\{[^}]+\}/g, '');
css = css.replace(/\.custom-cursor-follower\.active\s*\{[^}]+\}/g, '');
css = css.replace(/\[data-theme="dark"\]\s*\.custom-cursor-follower\.active\s*\{[^}]+\}/g, '');

// Replace cursor: none with cursor: pointer
css = css.replace(/cursor:\s*none\s*!important;/g, '');
css = css.replace(/cursor:\s*none;/g, 'cursor: pointer;');

// Fix body fallback
css = css.replace(/body\s*\{([^}]*)\}/, (match, inner) => {
    return 'body {' + inner.replace(/cursor:\s*pointer;/, '') + '}';
});

// Remove touch devices rule
css = css.replace(/\/\*\s*Disable custom cursor on touch devices\s*\*\/[\s\S]*?body,\s*a,\s*button,\s*\.faq-question,\s*\.theme-toggle,\s*\.btn,\s*\.modal-close\s*\{\s*cursor:\s*auto\s*!important;\s*\}/, '');

fs.writeFileSync('style.css', css);

let mainJs = fs.readFileSync('main.js', 'utf8');
// remove custom cursor event listener in main.js
mainJs = mainJs.replace(/\/\*\s*── CUSTOM CURSOR ──\s*\*\/[\s\S]*?(?=\/\*\s*── TEXT ROTATOR ──\s*\*\/)/, '');
fs.writeFileSync('main.js', mainJs);

let comp = fs.readFileSync('components.js', 'utf8');
comp = comp.replace(/<div class="custom-cursor" id="custom-cursor"><\/div>\s*/g, '');
comp = comp.replace(/<div class="custom-cursor-follower" id="custom-cursor-follower"><\/div>\s*/g, '');
fs.writeFileSync('components.js', comp);

console.log('Done!');
