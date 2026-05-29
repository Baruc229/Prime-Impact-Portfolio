/* ============================================================
   MAIN.JS — Prime Impact Agency
   Ce script contient toute la logique interactive du site :
   animations au scroll, menus, formulaires et effets visuels.
   Initialisation après injection des composants (components.js).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── WHATSAPP BUTTON INITIALIZATION ── */
  function initWhatsAppButton() {
    const whatsappButtons = document.querySelectorAll('[id^="whatsapp-btn"]');
    if (whatsappButtons.length && typeof i18nManager !== 'undefined') {
      const lang = i18nManager.currentLang || 'fr';
      const phoneNumber = '22993288212';
      const message = lang === 'en' 
        ? 'I need your services for my business' 
        : 'salut pia, j\'ai besoin de vos services de developpement web';
      const encodedMessage = encodeURIComponent(message);
      whatsappButtons.forEach(btn => {
        btn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      });
    }
  }
  
  // Initialise tous les boutons WhatsApp au chargement
  setTimeout(initWhatsAppButton, 100);

  /* ── CUSTOM CURSOR (désactivé pour fluidité) ── */
  // if (window.matchMedia('(pointer: fine)').matches) {
  //   const cursor = document.createElement('div');
  //   cursor.className = 'custom-cursor';
  //   const cursorDot = document.createElement('div');
  //   cursorDot.className = 'custom-cursor-dot';
  //   document.body.appendChild(cursor);
  //   document.body.appendChild(cursorDot);
  //   document.body.classList.add('cursor-disabled');
  //
  //   let mouseX = 0, mouseY = 0;
  //   let cursorX = 0, cursorY = 0;
  //
  //   document.addEventListener('mousemove', (e) => {
  //     mouseX = e.clientX;
  //     mouseY = e.clientY;
  //   });
  //
  //   function animateCursor() {
  //     cursorX += (mouseX - cursorX) * 0.2;
  //     cursorY += (mouseY - cursorY) * 0.2;
  //     cursor.style.left = cursorX + 'px';
  //   cursor.style.top = cursorY + 'px';
  //     cursorDot.style.left = mouseX + 'px';
  //     cursorDot.style.top = mouseY + 'px';
  //     requestAnimationFrame(animateCursor);
  //   }
  //   animateCursor();
  //
  //   const hoverElements = document.querySelectorAll('a, button, input, textarea, .faq-question, .service-card, .project-card');
  //   hoverElements.forEach(el => {
  //     el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  //     el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  //   });
  // }

  /* ── GESTION DU THÈME (Sombre / Clair) ── */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // Charge le thème sauvegardé ou utilise 'dark' par défaut (premium)
  const savedTheme = localStorage.getItem('pia-theme') || 'dark';
  htmlEl.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Alterne entre 'light' et 'dark'
      const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('pia-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    // Change l'icône : Soleil pour le mode sombre, Lune pour le mode clair
    icon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
  }

  /* ── EFFET SCROLL NAVBAR ── 
     Ajoute une classe quand on scrolle pour changer l'apparence du header
  */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── MENU LATÉRAL MOBILE (Side Menu) ── 
     Gère l'ouverture/fermeture du menu latéral sur mobile uniquement.
     Le menu glisse du côté gauche avec un overlay semi-transparent.
  */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobile');
  const mobileOverlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navClose');
  const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-links a, .nav-mobile-cta') : [];

  function openMenu() {
    if (mobileMenu && window.innerWidth < 1200) {
      mobileMenu.classList.add('open');
      mobileOverlay.classList.add('open');
      burger.classList.add('open');
      document.body.classList.add('menu-open');
    }
  }

  function closeMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileOverlay.classList.remove('open');
      burger.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  // Ouvrir le menu au clic sur le burger
  if (burger) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  // Fermer le menu au clic sur la croix
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Fermer le menu au clic sur l'overlay
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  // Fermer le menu au clic sur un lien de navigation
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Fermer le menu si la fenêtre est redimensionnée (e.g., rotation d'écran)
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1200 && mobileMenu) {
      closeMenu();
    }
  });

  /* ── LANGUAGE TOGGLE (Mobile - Direct toggle) ── */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentLang = localStorage.getItem('site_lang') || 'fr';
      const newLang = currentLang === 'fr' ? 'en' : 'fr';
      if (window.i18n) {
        window.i18n.setLang(newLang);
      }
    });
  }

  /* ── LANGUAGE MENU (Desktop - keep dropdown) ── */
  const langMenu = document.getElementById('langMenu');
  if (langMenu) {
    langMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        if (window.i18n) {
          window.i18n.setLang(lang);
        }
        langMenu.classList.remove('show');
      });
    });
  }

  /* ── LANGUAGE CHANGE LISTENER FOR ROTATOR & WHATSAPP ── */
  document.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    const wordsFR = ["vendent pour vous.", "captent l'attention.", "convertissent rapidement.", "maximisent votre visibilité."];
    const wordsEN = ["sell for you.", "capture attention.", "convert quickly.", "maximize your visibility."];
    const rotator = document.getElementById('text-rotator');
    if (rotator) {
      const newWords = lang === 'en' ? wordsEN : wordsFR;
      rotator.textContent = newWords[0];
      window.rotatorWords = newWords;
      window.rotatorIdx = 0;
    }

    // Met à jour tous les boutons WhatsApp avec message pré-rempli selon la langue
    const whatsappButtons = document.querySelectorAll('[id^="whatsapp-btn"]');
    whatsappButtons.forEach(btn => {
      const phoneNumber = '22993288212';
      const message = lang === 'en' 
        ? 'I need your services for my business' 
        : 'salut pia, j\'ai besoin de vos services de developpement web';
      const encodedMessage = encodeURIComponent(message);
      btn.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    });
  });

  /* ── ANIMATIONS D'APPARITION désactivées ── */

  /* ── HERO SERVICE SLIDER ── */
  initHeroSlider();

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const icon = q.querySelector('.faq-icon');
      const isOpen = !!answer.style.maxHeight;
      // Fermer tous
      document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = '');
      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  /* ── MODAL ── */
  const modal = document.getElementById('orderModal');
  const formCont = document.getElementById('form-content');
  const succCont = document.getElementById('success-content');
  const modalClose = document.getElementById('modalClose');

  function openModal(pack) {
    if (!modal) return;
    if (formCont) formCont.style.display = 'block';
    if (succCont) succCont.style.display = 'none';
    const form = document.getElementById('orderForm');
    if (form) form.reset();
    const sel = document.getElementById('packSelect');
    if (sel && pack) sel.value = pack;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Boutons qui ouvrent le modal
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal(btn.dataset.pack || '');
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Formulaire modal
  const orderForm = document.getElementById('orderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.textContent = 'Envoi…'; submitBtn.disabled = true; }
      setTimeout(() => {
        if (formCont) formCont.style.display = 'none';
        if (succCont) succCont.style.display = 'block';
        if (submitBtn) { submitBtn.textContent = 'Envoyer ma demande'; submitBtn.disabled = false; }
      }, 1200);
    });
  }

  /* ── TEXT ROTATOR ── */
  const rotator = document.getElementById('text-rotator');
  if (rotator) {
    const wordsFR = ["vendent pour vous.", "captent l'attention.", "convertissent rapidement.", "maximisent votre visibilité."];
    const wordsEN = ["sell for you.", "capture attention.", "convert quickly.", "maximize your visibility."];
    let currentLang = localStorage.getItem('site_lang') || 'fr';
    window.rotatorWords = currentLang === 'en' ? wordsEN : wordsFR;
    window.rotatorIdx = 0;
    let rotatorTimer;
    
    function rotateWord() {
      rotator.style.animation = 'rotator-out 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
      setTimeout(() => {
        window.rotatorIdx = (window.rotatorIdx + 1) % window.rotatorWords.length;
        rotator.textContent = window.rotatorWords[window.rotatorIdx];
        rotator.style.animation = 'rotator-in 0.45s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
      }, 450);
      rotatorTimer = setTimeout(rotateWord, 3500);
    }
    
    rotatorTimer = setTimeout(rotateWord, 3500);
    
    document.querySelectorAll('.lang-menu button').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        window.rotatorWords = lang === 'en' ? wordsEN : wordsFR;
        window.rotatorIdx = 0;
        rotator.textContent = window.rotatorWords[0];
        rotator.style.animation = 'none';
        clearTimeout(rotatorTimer);
        rotatorTimer = setTimeout(rotateWord, 3500);
      });
    });
  }

  /* ── COMPTEURS ANIMÉS (Section Résultats) ── */
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length) {
    counters.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const val = target < 10 ? (target * ease).toFixed(1) : Math.round(target * ease);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ── SKILLS ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    skillBars.forEach(el => {
      el.style.width = el.dataset.width;
    });
  }

  /* ── DEVIS MULTI-STEP (devis.html) ── */
  initDevisForm();

  /* ── CONTACT FORM VALIDATION (contact.html) ── */
  initContactForm();

  /* ── REALISATIONS FILTER (realisations.html) ── */
  initProjectFilter();

});

/* ─── Validation helpers ─── */
function validateName(val) {
  return val.trim().length >= 3 && /^[\p{L}\s-]{3,}$/u.test(val.trim());
}

function validatePhone(val) {
  if (!val.trim()) return true;
  return /^\+?[\d\s]{4,}$/.test(val.trim().replace(/\s/g, ''));
}

function showFormModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('open');
}

function closeFormModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

window.closeFormModal = closeFormModal;

/* ════════════════════════════════════════════
   CONTACT FORM — Validation JS
════════════════════════════════════════════ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const err = field.parentElement.querySelector('.field-error');
      const val = field.value.trim();

      if (!val) {
        field.classList.add('error');
        if (err) err.style.display = 'block';
        valid = false;
        return;
      }

      if (field.name === 'name' && !validateName(val)) {
        field.classList.add('error');
        if (err) { err.textContent = '3 caractères minimum, lettres uniquement'; err.style.display = 'block'; }
        valid = false;
        return;
      }

      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        field.classList.add('error');
        if (err) { err.textContent = 'Email invalide'; err.style.display = 'block'; }
        valid = false;
        return;
      }

      if (field.name === 'subject' && field.tagName === 'SELECT' && !val) {
        field.classList.add('error');
        if (err) err.style.display = 'block';
        valid = false;
        return;
      }

      field.classList.remove('error');
      if (err) err.style.display = 'none';
    });

    // Phone validation (optional but validated if filled)
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField && phoneField.value.trim()) {
      if (!validatePhone(phoneField.value)) {
        phoneField.classList.add('error');
        const err = phoneField.parentElement.querySelector('.field-error');
        if (err) { err.textContent = 'Numéro invalide (chiffres et + uniquement, 4 car. min)'; err.style.display = 'block'; }
        valid = false;
      }
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Envoi…'; btn.disabled = true; }
      setTimeout(() => {
        btn.textContent = 'Envoyer le message';
        btn.disabled = false;
        form.reset();
        showFormModal('contactModal');
      }, 1000);
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.addEventListener('input', () => validateContactField(f));
    f.addEventListener('blur', () => validateContactField(f));
  });

  function validateContactField(field) {
    const err = field.parentElement.querySelector('.field-error');
    const val = field.value.trim();

    if (!val && field.hasAttribute('required') && field.tagName !== 'SELECT') {
      field.classList.add('error');
      if (err) { err.textContent = 'Ce champ est requis'; err.style.display = 'block'; }
      return;
    }

    if (field.name === 'subject' && field.tagName === 'SELECT') {
      if (val) { field.classList.remove('error'); if (err) err.style.display = 'none'; }
      else { field.classList.add('error'); if (err) err.style.display = 'block'; }
      return;
    }

    if (field.name === 'name' && val && !validateName(val)) {
      field.classList.add('error');
      if (err) { err.textContent = '3 caractères minimum, lettres uniquement'; err.style.display = 'block'; }
      return;
    }

    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      field.classList.add('error');
      if (err) { err.textContent = 'Email invalide'; err.style.display = 'block'; }
      return;
    }

    if (field.name === 'phone' && val && !validatePhone(val)) {
      field.classList.add('error');
      if (err) { err.textContent = 'Numéro invalide (chiffres et + uniquement, 4 car. min)'; err.style.display = 'block'; }
      return;
    }

    field.classList.remove('error');
    if (err) err.style.display = 'none';
  }
}

/* ════════════════════════════════════════════
   DEVIS FORM — Single page validation
════════════════════════════════════════════ */
function initDevisForm() {
  const form = document.getElementById('devisForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      const err = field.parentElement.querySelector('.field-error');
      const val = field.value.trim();

      if (!val) {
        field.classList.add('error');
        if (err) err.style.display = 'block';
        valid = false;
        return;
      }

      if ((field.name === 'prenom' || field.name === 'nom') && !validateName(val)) {
        field.classList.add('error');
        if (err) { err.textContent = '3 caractères minimum, lettres uniquement'; err.style.display = 'block'; }
        valid = false;
        return;
      }

      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        field.classList.add('error');
        if (err) { err.textContent = 'Email invalide'; err.style.display = 'block'; }
        valid = false;
        return;
      }

      field.classList.remove('error');
      if (err) err.style.display = 'none';
    });

    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField && phoneField.value.trim()) {
      if (!validatePhone(phoneField.value)) {
        phoneField.classList.add('error');
        const err = phoneField.parentElement.querySelector('.field-error');
        if (err) { err.textContent = 'Numéro invalide (chiffres et + uniquement, 4 car. min)'; err.style.display = 'block'; }
        valid = false;
      }
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Envoi…'; btn.disabled = true; }
      setTimeout(() => {
        btn.textContent = 'Demander mon devis gratuit';
        btn.disabled = false;
        form.reset();
        showFormModal('devisModal');
      }, 1000);
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.addEventListener('input', () => validateDevisField(f));
    f.addEventListener('blur', () => validateDevisField(f));
  });

  function validateDevisField(field) {
    const err = field.parentElement.querySelector('.field-error');
    const val = field.value.trim();

    if (!val && field.hasAttribute('required') && field.tagName !== 'SELECT') {
      field.classList.add('error');
      if (err) { err.textContent = 'Ce champ est requis'; err.style.display = 'block'; }
      return;
    }

    if (field.name === 'prestation' && field.tagName === 'SELECT') {
      if (val) { field.classList.remove('error'); if (err) err.style.display = 'none'; }
      else { field.classList.add('error'); if (err) err.style.display = 'block'; }
      return;
    }

    if ((field.name === 'prenom' || field.name === 'nom') && val && !validateName(val)) {
      field.classList.add('error');
      if (err) { err.textContent = '3 caractères minimum, lettres uniquement'; err.style.display = 'block'; }
      return;
    }

    if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      field.classList.add('error');
      if (err) { err.textContent = 'Email invalide'; err.style.display = 'block'; }
      return;
    }

    if (field.name === 'phone' && val && !validatePhone(val)) {
      field.classList.add('error');
      if (err) { err.textContent = 'Numéro invalide (chiffres et + uniquement, 4 car. min)'; err.style.display = 'block'; }
      return;
    }

    field.classList.remove('error');
    if (err) err.style.display = 'none';
  }
}

/* ════════════════════════════════════════════
   HERO SLIDER — Synchronized showcase + services
════════════════════════════════════════════ */
function initHeroSlider() {
  const showcaseTrack = document.getElementById('showcaseTrack');
  const showcaseSlides = showcaseTrack ? showcaseTrack.querySelectorAll('.showcase-slide') : [];
  const servicesTrack = document.getElementById('servicesTrack');
  const servicesSlides = servicesTrack ? servicesTrack.querySelectorAll('.services-slide') : [];
  const prevBtn = document.getElementById('showcasePrev');
  const nextBtn = document.getElementById('showcaseNext');
  if (!showcaseSlides.length) return;

  let current = 0;
  let interval;

  function goTo(index) {
    showcaseSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    servicesSlides.forEach((s, i) => s.classList.toggle('active', i === index));

    if (servicesTrack && servicesSlides[index]) {
      const slide = servicesSlides[index];
      const targetLeft = slide.offsetLeft - servicesTrack.clientWidth / 2 + slide.offsetWidth / 2;
      servicesTrack.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }

    current = index;
    resetAuto();
  }

  function next() { goTo((current + 1) % showcaseSlides.length); }
  function prev() { goTo((current - 1 + showcaseSlides.length) % showcaseSlides.length); }
  function resetAuto() { clearInterval(interval); interval = setInterval(next, 5000); }

  goTo(0);

  if (prevBtn) prevBtn.addEventListener('click', prev);
  if (nextBtn) nextBtn.addEventListener('click', next);

  servicesSlides.forEach(slide => {
    slide.addEventListener('click', () => goTo(parseInt(slide.dataset.slide)));
  });

  resetAuto();
}

/* ════════════════════════════════════════════
   PROJECT FILTER — realisations.html
════════════════════════════════════════════ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projects.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      projects.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) card.classList.add('reveal', 'active');
      });
    });
  });
});

/* ── PAGE LOAD FADE-IN (TEST) ── */
window.addEventListener('load', () => {
  document.body.classList.remove('page-loading');
});