/* ============================================================
   COMPONENTS.JS — Header & Footer partagés (PIA)
   Ce script permet de centraliser le code HTML commun à toutes
   les pages (barre de navigation, pied de page, modale).
   Appelé AVANT main.js sur chaque page.
   ============================================================ */

// Lien WhatsApp global utilisé sur tout le site
const WA_LINK = 'https://wa.me/33600000000'; // ← Remplace par le vrai numéro

/**
 * CONSTRUIT LE HEADER (Barre de navigation)
 * Détecte la page active pour souligner le bon lien.
 */
function buildHeader() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const links = [
    { href: 'index.html',        label: 'Accueil', i18n: 'nav.home' },
    { href: 'services.html',     label: 'Services', i18n: 'nav.services' },
    { href: 'realisations.html', label: 'Réalisations', i18n: 'nav.portfolio' },
    { href: 'a-propos.html',     label: 'À propos', i18n: 'nav.about' },
    { href: 'temoignages.html',  label: 'Témoignages', i18n: 'nav.testimonials' },
    { href: 'contact.html',      label: 'Contact', i18n: 'nav.contact' },
  ];
  
  // Génère dynamiquement les liens HTML avec data-i18n pour la traduction
  const navLinksHTML = links.map(l =>
    `<a href="${l.href}" class="${l.href === currentPage ? 'active' : ''}" data-i18n="${l.i18n}">${l.label}</a>`
  ).join('');

  return `
  <div class="noise-overlay"></div>
  <div class="glow-blob glow-top-left"></div>
  <div class="glow-blob glow-bottom-right"></div>

  <header class="navbar" id="navbar">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">/_PIA</a>
      <nav class="nav-links" id="nav-links">
        ${navLinksHTML}
      </nav>
      <div class="nav-actions">
        <div class="lang-switcher">
          <button data-lang="fr" class="active">FR</button>
          <span>|</span>
          <button data-lang="en">EN</button>
        </div>
        <button class="lang-btn" id="langToggle" aria-label="Changer la langue" onclick="toggleLangMenu(event)">
          <i class="fa-solid fa-globe"></i>
        </button>
        <div class="lang-menu" id="langMenu">
          <button data-lang="fr" class="active">FR</button>
          <button data-lang="en">EN</button>
        </div>
        <button class="theme-toggle" id="themeToggle" aria-label="Changer le thème">
          <i class="ph ph-moon"></i>
        </button>
        <a href="${WA_LINK}" class="btn-whatsapp-nav" target="_blank" rel="noopener" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
        <a href="devis.html" class="btn btn-primary nav-cta" data-i18n="nav.quote">Devis gratuit</a>
        <button class="nav-burger" id="navBurger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <!-- Mobile menu -->
    <div class="nav-mobile" id="navMobile">
      <button class="nav-close" id="navClose" aria-label="Fermer le menu">
        <i class="ph ph-x"></i>
      </button>
      <nav class="nav-links">
        ${navLinksHTML}
      </nav>
      <a href="devis.html" class="btn btn-primary" data-i18n="nav.cta_mobile">Demander un devis</a>
    </div>
  </header>`;
}

/**
 * CONSTRUIT LE FOOTER & LA MODALE
 * Contient le pied de page et le code de la fenêtre surgissante de demande de devis.
 */
function buildFooter() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" style="text-decoration:none;color:inherit;"><h3>/_PIA</h3></a>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.7;" data-i18n="footer.desc">
            Agence web & marketing digital spécialisée dans la création de sites performants, tunnels de vente et référencement SEO.
          </p>
          <div class="social-links">
            <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="${WA_LINK}" target="_blank" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.services">Services</h4>
          <ul class="footer-links">
            <li><a href="services.html" data-i18n="footer.services.1">Création de site web</a></li>
            <li><a href="services.html" data-i18n="footer.services.2">Tunnels de vente</a></li>
            <li><a href="services.html" data-i18n="footer.services.3">Landing page</a></li>
            <li><a href="services.html" data-i18n="footer.services.4">Référencement SEO</a></li>
            <li><a href="services.html" data-i18n="footer.services.5">Audit & stratégie</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.agency">Agence</h4>
          <ul class="footer-links">
            <li><a href="a-propos.html" data-i18n="nav.about">À propos</a></li>
            <li><a href="realisations.html" data-i18n="nav.portfolio">Réalisations</a></li>
            <li><a href="temoignages.html" data-i18n="nav.testimonials">Témoignages</a></li>
            <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
            <li><a href="mentions-legales.html">Mentions légales</a></li>
            <li><a href="politique-confidentialite.html">Confidentialité</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.start">Démarrer</h4>
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:16px;" data-i18n="footer.start.text">Un projet en tête ? Parlons-en.</p>
          <a href="devis.html" class="btn btn-primary" style="width:100%;margin-bottom:12px;" data-i18n="footer.btn.quote">Obtenir un devis</a>
          <a href="${WA_LINK}" class="btn btn-whatsapp" target="_blank" style="width:100%;"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p><span data-i18n="footer.rights">Tous droits réservés.</span> © ${new Date().getFullYear()} Prime Impact Agency.</p>
      </div>
    </div>
  </footer>

  <!-- MODAL COMMANDE -->
  <div class="modal-overlay" id="orderModal">
    <div class="modal-container">
      <button class="modal-close" id="modalClose"><i class="ph ph-x"></i></button>
      <div id="form-content">
        <h2 style="font-size:28px;margin-bottom:8px;text-transform:uppercase;" data-i18n="modal.title">Démarrer un projet</h2>
        <p style="color:var(--text-muted);margin-bottom:28px;" data-i18n="modal.subtitle">Un expert vous rappelle sous 24h.</p>
        <form id="orderForm">
          <div class="form-group">
            <label class="form-label" data-i18n="modal.name">Votre nom</label>
            <input type="text" class="form-control" required placeholder="Jean Dupont" data-i18n="modal.name.input">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="modal.email">Email</label>
            <input type="email" class="form-control" required placeholder="jean@exemple.com" data-i18n="modal.email.input">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="modal.phone">Téléphone</label>
            <input type="tel" class="form-control" placeholder="06 12 34 56 78">
          </div>
          <div class="form-group">
            <label class="form-label" data-i18n="modal.message">Message</label>
            <textarea class="form-control" rows="3" placeholder="Décrivez brièvement votre projet..." data-i18n="modal.message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:8px;" data-i18n="modal.submit">Envoyer ma demande</button>
        </form>
      </div>
      <div id="success-content" style="display:none;text-align:center;padding:40px 0;">
        <i class="ph ph-check-circle" style="font-size:72px;color:var(--accent-blue);margin-bottom:16px;"></i>
        <h2 style="font-size:28px;margin-bottom:8px;text-transform:uppercase;" data-i18n="modal.success.title">Demande reçue !</h2>
        <p style="color:var(--text-muted);" data-i18n="modal.success.text">Nous vous contactons très vite.</p>
      </div>
    </div>
  </div>`;
}

/* ── INJECTION AUTOMATIQUE ── 
   Ce bloc s'exécute dès que le script est chargé pour insérer
   le header et le footer dans l'élément #app de la page.
*/
(function () {
  const app = document.getElementById('app');
  if (!app) { console.warn('components.js: #app not found'); return; }
  
  // Insère le header au début de #app
  app.insertAdjacentHTML('afterbegin', buildHeader());
  // Insère le footer à la fin de #app
  app.insertAdjacentHTML('beforeend', buildFooter());
})();
