/* ============================================================
   TRACKER.JS — Cookie Consent Professionnel + Tracking
   Multilingue FR/EN - Réactif aux changements de langue - Mobile Optimisé
   ============================================================ */

const API_URL = window.PIA_API_URL || 'http://localhost:5000';

const COOKIE_CONFIG = {
  consentKey: 'pia-consent-v2',
  expiryDays: 180,
  apiEndpoint: '/api/consent'
};

// ============================================================
// TRADUCTIONS
// ============================================================
const cookieTranslations = {
  fr: {
    banner: {
      title: "Politique de cookies",
      text: "Nous utilisons des cookies et technologies similaires pour améliorer votre expérience sur notre site. Les cookies nous aident à comprendre comment vous utilisez notre site, à sécuriser votre connexion, à mémoriser vos préférences et à vous proposer du contenu personnalisé.",
      learnMore: "En savoir plus sur notre",
      privacyPolicy: "Politique de confidentialité",
      and: "et nos",
      termsOfUse: "Conditions d'utilisation",
      categories: { required: "Obligatoire", optional: "Optionnel" },
      labels: { necessary: "Cookies strictement nécessaires", analytics: "Cookies analytiques", marketing: "Cookies marketing" }
    },
    buttons: {
      acceptAll: "Accepter tout", rejectAll: "Refuser tout", customize: "Personnaliser",
      save: "Enregistrer", manage: "Gérer mes préférences"
    },
    modal: {
      title: "Gérer mes préférences",
      description: {
        necessary: "Ces cookies sont essentiels au fonctionnement de notre site. Ils vous permettent de naviguer sur le site, d'accéder aux zones sécurisées et de mémoriser vos préférences.",
        analytics: "Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations anonymisées pour améliorer les performances.",
        marketing: "Ces cookies sont utilisés pour afficher des publicités pertinentes. Nous respectons votre vie privée."
      }
    }
  },
  en: {
    banner: {
      title: "Cookie Policy",
      text: "We use cookies and similar technologies to improve your experience on our site. Cookies help us understand how you use our site, secure your connection and provide personalized content.",
      learnMore: "Learn more about our",
      privacyPolicy: "Privacy Policy",
      and: "and our",
      termsOfUse: "Terms of Use",
      categories: { required: "Required", optional: "Optional" },
      labels: { necessary: "Strictly necessary", analytics: "Analytics", marketing: "Marketing" }
    },
    buttons: {
      acceptAll: "Accept all", rejectAll: "Reject all", customize: "Customize",
      save: "Save", manage: "Manage preferences"
    },
    modal: {
      title: "Manage preferences",
      description: {
        necessary: "These cookies are essential for the site to function. They allow navigation, secure access and preference storage.",
        analytics: "These cookies help understand visitor interactions through anonymized data to improve performance.",
        marketing: "These cookies display relevant advertisements. We respect your privacy."
      }
    }
  }
};

// ============================================================
// DÉTECTION DE LANGUE - Dynamique
// ============================================================
function getCurrentLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  if (urlLang === 'fr' || urlLang === 'en') return urlLang;
  
  const storedLang = localStorage.getItem('site_lang');
  if (storedLang === 'fr' || storedLang === 'en') return storedLang;
  
  const htmlLang = document.documentElement.lang;
  if (htmlLang && (htmlLang.startsWith('fr') || htmlLang.startsWith('en'))) {
    return htmlLang.startsWith('fr') ? 'fr' : 'en';
  }
  
  const navLang = navigator.language || navigator.userLanguage;
  if (navLang && navLang.startsWith('en')) return 'en';
  
  return 'fr';
}

function t(key) {
  const lang = getCurrentLanguage();
  const keys = key.split('.');
  let value = cookieTranslations[lang];
  for (const k of keys) {
    if (value && value[k]) value = value[k];
    else return key;
  }
  return value;
}

// ============================================================
// THÈME
// ============================================================
function getThemeColors() {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  if (theme === 'dark') {
    return {
      bg: '#111216', text: '#FFFFFF', textMuted: '#9BA1A6', border: 'rgba(255,255,255,0.08)',
      accent: '#339AF0', accentGold: '#FFFFFF', buttonPrimary: '#339AF0', surface: '#1A1C23'
    };
  }
  return {
    bg: '#FFFFFF', text: '#0B0C10', textMuted: '#5F6368', border: 'rgba(0,0,0,0.08)',
    accent: '#0056D2', accentGold: '#000000', buttonPrimary: '#0056D2', surface: '#F5F5F5'
  };
}

// ============================================================
// COOKIE CONSENT - Réactif
// ============================================================
(function() {
  function getConsentFromStorage() {
    try {
      const stored = localStorage.getItem(COOKIE_CONFIG.consentKey);
      if (!stored) return null;
      const data = JSON.parse(stored);
      if (new Date() > new Date(data.expiry)) {
        localStorage.removeItem(COOKIE_CONFIG.consentKey);
        return null;
      }
      return data;
    } catch (e) { return null; }
  }

  function saveConsentToStorage(consentData) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + COOKIE_CONFIG.expiryDays);
    localStorage.setItem(COOKIE_CONFIG.consentKey, JSON.stringify({
      ...consentData, expiry: expiry.toISOString(), updatedAt: new Date().toISOString()
    }));
  }

  async function sendConsentToAPI(consentData) {
    try {
      await fetch(`${API_URL}${COOKIE_CONFIG.apiEndpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: consentData.analytics && consentData.marketing ? 'accepted' : 
                  (!consentData.analytics && !consentData.marketing) ? 'refused' : 'partial',
          cookies: JSON.stringify({ necessary: true, analytics: consentData.analytics || false, marketing: consentData.marketing || false }),
          userAgent: navigator.userAgent
        })
      });
    } catch (e) {}
  }

  // Remove existing banner/modal
  function cleanup() {
    document.getElementById('pia-cookie-banner')?.remove();
    document.getElementById('pia-cookie-modal')?.remove();
  }

  function showCookieBanner() {
    cleanup();
    const colors = getThemeColors();
    const banner = document.createElement('div');
    banner.id = 'pia-cookie-banner';
    banner.innerHTML = `
      <style>
        #pia-cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: ${colors.bg};
          border-top: 1px solid ${colors.border};
          padding: 16px 20px;
          z-index: 9999;
          font-family: 'Roboto Condensed', -apple-system, BlinkMacSystemFont, sans-serif;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
          animation: slideUp 0.4s ease-out;
        }
        @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pia-cookie-container {
          max-width: 1400px;
          margin: 0 auto;
        }
.pia-cookie-header {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }
        .pia-cookie-icon {
          font-size: 18px;
          flex-shrink: 0;
          line-height: 1;
        }
        .pia-cookie-title {
          font-size: 13px;
          font-weight: 700;
          color: ${colors.text};
          margin: 0 0 3px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .pia-cookie-text {
          font-size: 12px;
          color: ${colors.textMuted};
          line-height: 1.4;
          margin: 0;
        }
        .pia-cookie-icon {
          font-size: 24px;
          flex-shrink: 0;
          line-height: 1;
        }
        .pia-cookie-title {
          font-size: 14px;
          font-weight: 700;
          color: ${colors.text};
          margin: 0 0 4px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .pia-cookie-text {
          font-size: 12px;
          color: ${colors.textMuted};
          line-height: 1.4;
          margin: 0;
        }
        .pia-cookie-text a {
          color: ${colors.accent};
          text-decoration: underline;
        }
        .pia-cookie-categories {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .pia-cookie-category {
          display: inline-flex;
          align-items: center;
          padding: 6px 12px;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          font-size: 12px;
          color: ${colors.text};
          font-weight: 500;
        }
        .pia-cookie-category.analytics .icon { color: #3b82f6; }
        .pia-cookie-category.marketing .icon { color: #f59e0b; }
        .pia-cookie-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }
.pia-cookie-btn {
          padding: 8px 14px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          font-family: inherit;
        }
        .pia-cookie-btn-primary {
          background: ${colors.buttonPrimary};
          color: #fff;
        }
        .pia-cookie-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px ${colors.buttonPrimary}50;
        }
        .pia-cookie-btn-secondary {
          background: transparent;
          border: 1px solid ${colors.border};
          color: ${colors.text};
        }
        .pia-cookie-btn-secondary:hover {
          border-color: ${colors.accent};
          color: ${colors.accent};
        }
        .pia-cookie-link {
          font-size: 10px;
          color: ${colors.textMuted};
          cursor: pointer;
          text-decoration: underline;
          padding: 4px 8px;
        }
        .pia-cookie-link:hover {
          color: ${colors.accent};
        }
        
        /* MOBILE - Optimisé */
        @media (max-width: 600px) {
          #pia-cookie-banner {
            padding: 14px 16px;
          }
          .pia-cookie-header {
            flex-direction: row;
            align-items: flex-start;
            gap: 10px;
          }
          .pia-cookie-icon {
            font-size: 20px;
          }
          .pia-cookie-title {
            font-size: 13px;
          }
          .pia-cookie-text {
            font-size: 11px;
            line-height: 1.3;
          }
          .pia-cookie-categories {
            gap: 8px;
          }
.pia-cookie-category {
            padding: 5px 8px;
            font-size: 11px;
          }
          .pia-cookie-category .icon {
            font-size: 12px;
          }
          .pia-cookie-buttons {
            flex-direction: row;
            width: 100%;
            justify-content: center;
          }
          .pia-cookie-btn {
            flex: 1;
            min-width: 0;
            padding: 8px 10px;
            font-size: 10px;
          }
          .pia-cookie-link {
            display: none;
          }
        }
        
        @media (max-width: 400px) {
          .pia-cookie-buttons {
            flex-direction: column;
          }
          .pia-cookie-btn {
            width: 100%;
          }
        }
      </style>
      
      <div class="pia-cookie-container">
        <div class="pia-cookie-header">
          <div class="pia-cookie-icon">🍪</div>
          <div style="flex: 1;">
            <h3 class="pia-cookie-title">${t('banner.title')}</h3>
            <p class="pia-cookie-text">${t('banner.text')} ${t('banner.learnMore')} <a href="politique-confidentialite.html">${t('banner.privacyPolicy')}</a> ${t('banner.and')} <a href="mentions-legales.html">${t('banner.termsOfUse')}</a>.</p>
          </div>
        </div>
        
        <div class="pia-cookie-categories">
          <div class="pia-cookie-category necessary">
            <span>${t('banner.labels.necessary')}</span>
          </div>
          <div class="pia-cookie-category analytics">
            <span>${t('banner.labels.analytics')}</span>
          </div>
          <div class="pia-cookie-category marketing">
            <span>${t('banner.labels.marketing')}</span>
          </div>
        </div>
        
        <div class="pia-cookie-buttons">
          <button class="pia-cookie-btn pia-cookie-btn-primary" onclick="PIA_Cookie.acceptAll()">${t('buttons.acceptAll')}</button>
          <button class="pia-cookie-btn pia-cookie-btn-secondary" onclick="PIA_Cookie.rejectAll()">${t('buttons.rejectAll')}</button>
          <button class="pia-cookie-btn pia-cookie-btn-secondary" onclick="PIA_Cookie.showPreferences()">${t('buttons.customize')}</button>
          <span class="pia-cookie-link" onclick="PIA_Cookie.showPreferences()">${t('buttons.manage')}</span>
        </div>
      </div>`;
    document.body.appendChild(banner);
  }

  function showCookieModal() {
    cleanup();
    const colors = getThemeColors();
    const modal = document.createElement('div');
    modal.id = 'pia-cookie-modal';
    modal.innerHTML = `
      <style>
        #pia-cookie-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pia-cookie-modal-content {
          background: ${colors.bg};
          border: 1px solid ${colors.border};
          border-radius: 16px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .pia-cookie-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid ${colors.border};
        }
        .pia-cookie-modal-title {
          font-size: 16px;
          font-weight: 700;
          color: ${colors.text};
          margin: 0;
          text-transform: uppercase;
        }
        .pia-cookie-modal-close {
          background: none;
          border: none;
          font-size: 22px;
          color: ${colors.textMuted};
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        .pia-cookie-modal-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pia-cookie-preference-item {
          padding: 14px;
          background: ${colors.surface};
          border: 1px solid ${colors.border};
          border-radius: 10px;
        }
        .pia-cookie-preference-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .pia-cookie-preference-name {
          font-size: 13px;
          font-weight: 600;
          color: ${colors.text};
        }
        .pia-cookie-preference-name .required-badge {
          display: none;
        }
        .pia-cookie-preference-toggle {
          position: relative;
          width: 44px;
          height: 24px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .pia-cookie-preference-toggle input { opacity: 0; width: 0; height: 0; }
        .pia-cookie-slider {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: ${colors.border};
          border-radius: 20px;
          transition: 0.3s;
        }
        .pia-cookie-slider:before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          left: 3px;
          bottom: 3px;
          background: ${colors.textMuted};
          border-radius: 50%;
          transition: 0.3s;
        }
        .pia-cookie-preference-toggle input:checked + .pia-cookie-slider { background: ${colors.accent}; }
        .pia-cookie-preference-toggle input:checked + .pia-cookie-slider:before { transform: translateX(20px); background: #fff; }
        .pia-cookie-preference-toggle input:disabled + .pia-cookie-slider { opacity: 0.5; cursor: not-allowed; }
.pia-cookie-preference-desc {
          font-size: 12px;
          color: ${colors.textMuted};
          line-height: 1.5;
          margin: 0;
        }
        .pia-cookie-modal-footer {
          padding: 16px;
          border-top: 1px solid ${colors.border};
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
.pia-cookie-modal-btn {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          font-family: inherit;
          flex: 1;
          min-width: 90px;
        }
        .pia-cookie-modal-btn-primary { background: ${colors.accent}; color: #fff; }
        .pia-cookie-modal-btn-secondary { background: transparent; border: 1px solid ${colors.border}; color: ${colors.text}; }
        
        /* Mobile modal */
        @media (max-width: 500px) {
          #pia-cookie-modal { padding: 12px; }
          .pia-cookie-modal-content { border-radius: 12px; }
          .pia-cookie-modal-title { font-size: 14px; }
          .pia-cookie-preference-name { font-size: 12px; }
          .pia-cookie-preference-desc { font-size: 11px; }
          .pia-cookie-preference-toggle { width: 40px; height: 20px; }
          .pia-cookie-slider:before { width: 14px; height: 14px; }
          .pia-cookie-preference-toggle input:checked + .pia-cookie-slider:before { transform: translateX(20px); }
          .pia-cookie-modal-btn { font-size: 10px; padding: 12px 10px; }
          .pia-cookie-modal-footer { flex-direction: row; }
        }
      </style>
      
      <div class="pia-cookie-modal-content">
        <div class="pia-cookie-modal-header">
          <h2 class="pia-cookie-modal-title">${t('modal.title')}</h2>
          <button class="pia-cookie-modal-close" onclick="PIA_Cookie.closePreferences()">×</button>
        </div>
        
        <div class="pia-cookie-modal-body">
          <div class="pia-cookie-preference-item">
            <div class="pia-cookie-preference-header">
              <span class="pia-cookie-preference-name">${t('banner.labels.necessary')}</span>
              <label class="pia-cookie-preference-toggle">
                <input type="checkbox" checked disabled>
                <span class="pia-cookie-slider"></span>
              </label>
            </div>
            <p class="pia-cookie-preference-desc">${t('modal.description.necessary')}</p>
          </div>
          
          <div class="pia-cookie-preference-item">
            <div class="pia-cookie-preference-header">
              <span class="pia-cookie-preference-name">${t('banner.labels.analytics')}</span>
              <label class="pia-cookie-preference-toggle">
                <input type="checkbox" id="pia-cookie-analytics">
                <span class="pia-cookie-slider"></span>
              </label>
            </div>
            <p class="pia-cookie-preference-desc">${t('modal.description.analytics')}</p>
          </div>
          
          <div class="pia-cookie-preference-item">
            <div class="pia-cookie-preference-header">
              <span class="pia-cookie-preference-name">${t('banner.labels.marketing')}</span>
              <label class="pia-cookie-preference-toggle">
                <input type="checkbox" id="pia-cookie-marketing">
                <span class="pia-cookie-slider"></span>
              </label>
            </div>
            <p class="pia-cookie-preference-desc">${t('modal.description.marketing')}</p>
          </div>
        </div>
        
        <div class="pia-cookie-modal-footer">
          <button class="pia-cookie-modal-btn pia-cookie-modal-btn-secondary" onclick="PIA_Cookie.acceptAll()">${t('buttons.acceptAll')}</button>
          <button class="pia-cookie-modal-btn pia-cookie-modal-btn-secondary" onclick="PIA_Cookie.rejectAll()">${t('buttons.rejectAll')}</button>
          <button class="pia-cookie-modal-btn pia-cookie-modal-btn-primary" onclick="PIA_Cookie.savePreferences()">${t('buttons.save')}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) PIA_Cookie.closePreferences(); });
  }

  // ============================================================
  // COOKIE API
  // ============================================================
  window.PIA_Cookie = {
    acceptAll: function() {
      const consent = { necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
      saveConsentToStorage(consent);
      sendConsentToAPI(consent);
      cleanup();
      PIA_Tracker.trackPage();
    },
    rejectAll: function() {
      const consent = { necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
      saveConsentToStorage(consent);
      sendConsentToAPI(consent);
      cleanup();
    },
    savePreferences: function() {
      const analytics = document.getElementById('pia-cookie-analytics')?.checked || false;
      const marketing = document.getElementById('pia-cookie-marketing')?.checked || false;
      const consent = { necessary: true, analytics, marketing, timestamp: new Date().toISOString() };
      saveConsentToStorage(consent);
      sendConsentToAPI(consent);
      cleanup();
      if (analytics) PIA_Tracker.trackPage();
    },
    showPreferences: function() {
      showCookieModal();
    },
    closePreferences: function() {
      cleanup();
    },
    refresh: function() {
      const consent = getConsentFromStorage();
      if (!consent) {
        showCookieBanner();
      }
    }
  };

  // ============================================================
  // TRACKING
  // ============================================================
  const PIA_Tracker = {
    async trackPage() {
      const page = window.location.pathname.split('/').pop() || 'index';
      try {
        await fetch(`${API_URL}/api/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'page_view', page, referrer: document.referrer || 'direct', url: window.location.href })
        });
      } catch (e) {}
    },
    async trackLead(formData, source) {
      try {
        await fetch(`${API_URL}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name || formData.nom || 'Anonymous',
            email: formData.email,
            phone: formData.phone || formData.telephone || '',
            subject: formData.subject || formData.sujet || source,
            message: formData.message || '',
            source
          })
        });
      } catch (e) {}
    }
  };
  window.PIA_Tracker = PIA_Tracker;

  // ============================================================
  // ÉCOUTEUR CHANGEMENT DE LANGUE
  // ============================================================
  let lastLang = getCurrentLanguage();
  
  // Écouter les changements de localStorage (pour le changement de langue)
  window.addEventListener('storage', function(e) {
    if (e.key === 'site_lang' && e.newValue !== lastLang) {
      lastLang = e.newValue;
      const consent = getConsentFromStorage();
      if (!consent) {
        showCookieBanner();
      }
    }
  });
  
  // Also check periodically for language changes (backup)
  setInterval(function() {
    const currentLang = getCurrentLanguage();
    if (currentLang !== lastLang) {
      lastLang = currentLang;
      const consent = getConsentFromStorage();
      if (!consent) {
        showCookieBanner();
      }
    }
  }, 1000);
  
  // ============================================================
  // THEME CHANGE DETECTION - Immediate update
  // ============================================================
  let lastTheme = document.documentElement.getAttribute('data-theme');
  const themeObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'data-theme') {
        const newTheme = document.documentElement.getAttribute('data-theme');
        if (newTheme !== lastTheme) {
          lastTheme = newTheme;
          // Refresh banner with new theme colors
          const consent = getConsentFromStorage();
          if (!consent) {
            cleanup();
            showCookieBanner();
          }
        }
      }
    });
  });
  
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });

  // ============================================================
  // INITIALISATION
  // ============================================================
  const existingConsent = getConsentFromStorage();
  if (!existingConsent) {
    showCookieBanner();
  } else if (existingConsent.analytics) {
    PIA_Tracker.trackPage();
  }

  // Form tracking
  setTimeout(() => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm && !contactForm.dataset.piaTracked) {
      contactForm.dataset.piaTracked = 'true';
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(contactForm));
        await PIA_Tracker.trackLead(data, 'contact');
        contactForm.submit();
      });
    }
    const devisForm = document.getElementById('devisForm');
    if (devisForm && !devisForm.dataset.piaTracked) {
      devisForm.dataset.piaTracked = 'true';
      devisForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(devisForm));
        await PIA_Tracker.trackLead(data, 'devis');
        devisForm.submit();
      });
    }
  }, 800);

  // Footer link
  setTimeout(() => {
    const footerLinks = document.querySelector('.footer-links ul');
    if (footerLinks && !footerLinks.querySelector('[onclick*="Cookie"]')) {
      const link = document.createElement('li');
      link.innerHTML = `<a href="#" onclick="PIA_Cookie.showPreferences(); return false;">${t('buttons.manage')}</a>`;
      footerLinks.appendChild(link);
    }
  }, 1500);
})();