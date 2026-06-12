/* ============================================================
   COMPONENTS.JS — Header & Footer partagés (PIA)
   Ce script permet de centraliser le code HTML commun à toutes
   les pages (barre de navigation, pied de page, modale).
   Appelé AVANT main.js sur chaque page.
   ============================================================ */

// Lien WhatsApp global utilisé sur tout le site
const WA_LINK = 'https://wa.me/22993288212'; // ← Remplace par le vrai numéro

/**
 * CONSTRUIT LE HEADER (Barre de navigation)
 * Détecte la page active pour souligner le bon lien.
 */
function buildHeader() {
  const currentPage = window.location.pathname.replace(/\/$/, '') || '/';
  const links = [
    { href: '/',        label: 'Accueil', i18n: 'nav.home' },
    { href: '/realisations', label: 'Réalisations', i18n: 'nav.portfolio' },
    { href: '/a-propos',     label: 'À propos', i18n: 'nav.about' },
    { href: '/temoignages',  label: 'Témoignages', i18n: 'nav.testimonials' },
    { href: '/contact',      label: 'Contact', i18n: 'nav.contact' },
  ];
  
  const servicePages = [
    { href: '/creation-site',      label: 'Création de site web',      i18n: 'nav.services.1' },
    { href: '/tunnels-vente',       label: 'Tunnels de vente',          i18n: 'nav.services.2' },
    { href: '/referencement-seo',    label: 'Référencement SEO',         i18n: 'nav.services.4' },
    { href: '/refonte-site',         label: 'Refonte de site web',       i18n: 'nav.services.6' },
    { href: '/suivi-accompagnement', label: 'Suivi & Accompagnement',    i18n: 'nav.services.7' },
  ];

  const isServicePage = servicePages.some(s => s.href === currentPage);
  const isActiveService = isServicePage || currentPage === '/services';

  // Items du méga menu
  const megaItemsHTML = servicePages.map(s =>
    `<a href="${s.href}" class="mega-link${s.href === currentPage ? ' active' : ''}">
      <span class="mega-link-title" data-i18n="${s.i18n}">${s.label}</span>
    </a>`
  ).join('');

  // Lien standard helper
  const linkHTML = l => `<a href="${l.href}" class="${l.href === currentPage ? 'active' : ''}" data-i18n="${l.i18n}">${l.label}</a>`;

  const serviceTrigger = `<span class="nav-mega-trigger${isActiveService ? ' active' : ''}" data-i18n="nav.services">Services <i class="ph ph-caret-down"></i></span>`;

  const megaDropdown = `<div class="mega-menu">
            <div class="mega-menu-inner">
              <div class="mega-menu-header">
                <span class="mega-menu-title" data-i18n="nav.services.all">Tous nos services</span>
                <a href="/services" class="mega-menu-cta" data-i18n="nav.services.seeAll">Voir tout →</a>
              </div>
              <div class="mega-menu-grid">
                ${megaItemsHTML}
              </div>
            </div>
          </div>`;

  // Desktop : services inline après Accueil
  const desktopLinks = links.map((l, i) => {
    if (i === 0) {
      return `${linkHTML(l)}
        <div class="nav-item-has-mega">
          ${serviceTrigger}
          ${megaDropdown}
        </div>`;
    }
    return linkHTML(l);
  }).join('');

  const mobileServiceHTML = servicePages.map(s =>
    `<a href="${s.href}" class="${s.href === currentPage ? 'active' : ''}" data-i18n="${s.i18n}">${s.label}</a>`
  ).join('');

  // Mobile : services en liens directs après Accueil
  const mobileLinks = links.map((l, i) => {
    if (i === 0) {
      return `${linkHTML(l)}
        ${mobileServiceHTML}`;
    }
    return linkHTML(l);
  }).join('');

  return `
  <div class="noise-overlay"></div>

  <header class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <img src="assets/pia-logo-white-sm.png" alt="PIA" class="logo-white">
        <img src="assets/pia-logo-dark-sm.png" alt="PIA" class="logo-dark">
      </a>
      <nav class="nav-links" id="nav-links">
        ${desktopLinks}
      </nav>
      <div class="nav-actions">
        <div class="lang-switcher">
          <button data-lang="fr" class="active">FR</button>
          <span>|</span>
          <button data-lang="en">EN</button>
        </div>
        <button class="lang-btn" id="langToggle" data-i18n-aria="nav.aria.lang" aria-label="Changer la langue">
          <i class="fa-solid fa-globe"></i>
        </button>
        <div class="lang-menu" id="langMenu">
          <button data-lang="fr" class="active">FR</button>
          <button data-lang="en">EN</button>
        </div>
        <button class="theme-toggle" id="themeToggle" data-i18n-aria="nav.aria.theme" aria-label="Changer le thème">
          <i class="ph ph-sun"></i>
        </button>
        <a href="${WA_LINK}" class="btn-whatsapp-nav" target="_blank" rel="noopener" data-i18n-aria="nav.aria.whatsapp" aria-label="WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
        <a href="/devis" class="btn btn-primary nav-cta" data-i18n="nav.quote">Devis gratuit</a>
        <button class="nav-burger" id="navBurger" data-i18n-aria="nav.aria.menu" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <!-- Mobile menu (Side Menu) -->
    <div class="nav-overlay" id="navOverlay"></div>
    <div class="nav-mobile" id="navMobile">
      <!-- Header du menu latéral -->
      <div class="nav-mobile-header">
<a href="/" class="nav-logo">
          <img src="assets/pia-logo-white-sm.png" alt="PIA" class="logo-white">
          <img src="assets/pia-logo-dark-sm.png" alt="PIA" class="logo-dark">
        </a>
        <button class="nav-close" id="navClose" data-i18n-aria="nav.aria.close" aria-label="Fermer le menu">
          <i class="ph ph-x"></i>
        </button>
      </div>

      <!-- Contenu du menu latéral (Navigation + CTA) -->
      <div class="nav-mobile-content">
        <nav class="nav-links">
          ${mobileLinks}
        </nav>
        <a href="/devis" class="btn btn-primary nav-mobile-cta" data-i18n="nav.quote">Devis gratuit</a>
      </div>

      <!-- Pied du menu latéral -->
      <div class="nav-mobile-footer">
        <div class="nav-socials">
          <a href="https://www.linkedin.com/in/schallom-sogbossi-4a6040322" target="_blank" rel="noopener" data-i18n-aria="nav.aria.linkedin" aria-label="LinkedIn">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://www.facebook.com/share/196KYqfDUw/" target="_blank" rel="noopener" data-i18n-aria="nav.aria.facebook" aria-label="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="${WA_LINK}" target="_blank" rel="noopener" data-i18n-aria="nav.aria.whatsapp" aria-label="WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
        </div>
        <div class="nav-copyright"><span data-i18n="footer.rights">Tous droits réservés.</span> © ${new Date().getFullYear()} Prime Impact Agency.</div>
      </div>
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
          <a href="/" style="text-decoration:none;color:inherit;">
            <img src="assets/pia-logo-white-sm.png" alt="PIA" style="height:68px;">
          </a>
          <p style="color:var(--text-muted);font-size:14px;line-height:1.7;" data-i18n="footer.desc">
            Agence web & marketing digital spécialisée dans la création de sites performants, tunnels de vente et référencement SEO.
          </p>
          <div class="social-links">
            <a href="https://www.linkedin.com/in/schallom-sogbossi-4a6040322" target="_blank" data-i18n-aria="nav.aria.linkedin" aria-label="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
            <a href="https://www.facebook.com/share/196KYqfDUw/" target="_blank" data-i18n-aria="nav.aria.facebook" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="${WA_LINK}" target="_blank" data-i18n-aria="nav.aria.whatsapp" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.services">Services</h4>
          <ul class="footer-links">
            <li><a href="/creation-site" data-i18n="footer.services.1">Création de site web</a></li>
            <li><a href="/tunnels-vente" data-i18n="footer.services.2">Tunnels de vente</a></li>
            <li><a href="/referencement-seo" data-i18n="footer.services.4">Référencement SEO</a></li>
            <li><a href="/refonte-site" data-i18n="footer.services.6">Refonte de site web</a></li>
            <li><a href="/suivi-accompagnement" data-i18n="footer.services.7">Suivi & Accompagnement</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.agency">Agence</h4>
          <ul class="footer-links">
            <li><a href="/a-propos" data-i18n="nav.about">À propos</a></li>
            <li><a href="/realisations" data-i18n="nav.portfolio">Réalisations</a></li>
            <li><a href="/temoignages" data-i18n="nav.testimonials">Témoignages</a></li>
            <li><a href="/contact" data-i18n="nav.contact">Contact</a></li>
            <li><a href="/mentions-legales">Mentions légales</a></li>
            <li><a href="/politique-confidentialite">Confidentialité</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-title" data-i18n="footer.start">Démarrer</h4>
          <p style="color:var(--text-muted);font-size:14px;margin-bottom:16px;" data-i18n="footer.start.text">Un projet en tête ? Parlons-en.</p>
          <a href="/devis" class="btn btn-primary" style="width:100%;margin-bottom:12px;" data-i18n="footer.btn.quote">Obtenir un devis</a>
          <a id="whatsapp-btn-footer" href="${WA_LINK}" class="btn btn-whatsapp" style="width:100%;" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> <span data-i18n="index.hero.cta.contact">Contactez-moi</span></a>
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
            <input type="tel" class="form-control" data-i18n="modal.phone.input" placeholder="06 12 34 56 78">
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
