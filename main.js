/* ============================================================
   MAIN.JS — Prime Impact Agency
   Ce script contient toute la logique interactive du site :
   animations au scroll, menus, formulaires et effets visuels.
   Initialisation après injection des composants (components.js).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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

  /* ── MOBILE BURGER ── */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('navMobile');
  const navClose = document.getElementById('navClose');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    // Close button
    if (navClose) {
      navClose.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    }
    // Fermer au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── LANGUAGE TOGGLE ── */
  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('langMenu');
  if (langToggle && langMenu) {
    // Direct click handler
    langToggle.onclick = function(e) {
      e.stopPropagation();
      langMenu.classList.toggle('show');
    };
    
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('show');
    });
    document.addEventListener('click', () => {
      langMenu.classList.remove('show');
    });
    langMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        if (window.i18n) {
          window.i18n.setLang(lang);
        }
        langMenu.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        langMenu.classList.remove('show');
        // Close mobile menu when changing language
        if (burger && mobileMenu) {
          burger.classList.remove('open');
          mobileMenu.classList.remove('open');
        }
      });
    });
  }

  /* ── LANGUAGE CHANGE LISTENER FOR ROTATOR ── */
  document.addEventListener('languageChanged', (e) => {
    const lang = e.detail.lang;
    const wordsFR = ["vendre pour vous.", "capter l'attention.", "convertir rapidement.", "maximiser votre visibilité."];
    const wordsEN = ["sell for you.", "capture attention.", "convert quickly.", "maximize your visibility."];
    const rotator = document.getElementById('text-rotator');
    if (rotator) {
      const newWords = lang === 'en' ? wordsEN : wordsFR;
      rotator.textContent = newWords[0];
      window.rotatorWords = newWords;
      window.rotatorIdx = 0;
    }
  });

  /* ── ANIMATIONS D'APPARITION (Scroll Reveal) ── 
     Fait apparaître les éléments avec la classe .reveal quand ils entrent à l'écran.
  */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

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
    const wordsFR = ["vendre pour vous.", "capter l'attention.", "convertir rapidement.", "maximiser votre visibilité."];
    const wordsEN = ["sell for you.", "capture attention.", "convert quickly.", "maximize your visibility."];
    let currentLang = localStorage.getItem('site_lang') || 'fr';
    window.rotatorWords = currentLang === 'en' ? wordsEN : wordsFR;
    window.rotatorIdx = 0;
    
    setInterval(() => {
      rotator.classList.add('fade-out');
      setTimeout(() => {
        window.rotatorIdx = (window.rotatorIdx + 1) % window.rotatorWords.length;
        rotator.textContent = window.rotatorWords[window.rotatorIdx];
        rotator.classList.remove('fade-out');
        rotator.classList.add('fade-in');
        setTimeout(() => rotator.classList.remove('fade-in'), 400);
      }, 400);
    }, 3000);
    
    document.querySelectorAll('.lang-menu button').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        words = lang === 'en' ? wordsEN : wordsFR;
        idx = 0;
        rotator.textContent = words[0];
      });
    });
  }

  /* ── COMPTEURS ANIMÉS (Section Résultats) ── 
     Incrémente les chiffres de 0 à la valeur cible quand on scrolle dessus.
  */
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1800; // Durée de l'animation en ms
        const start = performance.now();
        
        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3); // Effet de lissage (OutCubic)
          const val = target < 10 ? (target * ease).toFixed(1) : Math.round(target * ease);
          el.textContent = prefix + val + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        cObs.unobserve(el); // L'animation ne s'exécute qu'une seule fois
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  /* ── SKILLS ANIMATION ── */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length) {
    const sObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.width = el.dataset.width;
          sObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(b => sObs.observe(b));
  }

  /* ── DEVIS MULTI-STEP (devis.html) ── */
  initDevisForm();

  /* ── CONTACT FORM VALIDATION (contact.html) ── */
  initContactForm();

  /* ── REALISATIONS FILTER (realisations.html) ── */
  initProjectFilter();

});

/* ════════════════════════════════════════════
   DEVIS FORM — Multi-step
════════════════════════════════════════════ */
function initDevisForm() {
  const form = document.getElementById('devisForm');
  if (!form) return;

  const steps = form.querySelectorAll('.devis-step');
  const progress = document.getElementById('devisProgress');
  const stepLabel = document.getElementById('devisStepLabel');
  let current = 0;

  function showStep(n) {
    steps.forEach((s, i) => s.classList.toggle('active', i === n));
    if (progress) progress.style.width = `${((n + 1) / steps.length) * 100}%`;
    if (stepLabel) stepLabel.textContent = `Étape ${n + 1} sur ${steps.length}`;
    current = n;
  }

  showStep(0);

  form.querySelectorAll('.btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (current < steps.length - 1) showStep(current + 1);
    });
  });

  form.querySelectorAll('.btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (current > 0) showStep(current - 1);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const confirm = document.getElementById('devisConfirm');
    if (confirm) {
      form.style.display = 'none';
      confirm.style.display = 'block';
    }
  });
}

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
      if (!field.value.trim()) {
        field.classList.add('error');
        if (err) err.style.display = 'block';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('error');
        if (err) { err.textContent = 'Email invalide'; err.style.display = 'block'; }
        valid = false;
      } else {
        field.classList.remove('error');
        if (err) err.style.display = 'none';
      }
    });

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Envoi…'; btn.disabled = true; }
      setTimeout(() => {
        const success = document.getElementById('contactSuccess');
        if (success) { form.style.display = 'none'; success.style.display = 'block'; }
      }, 1200);
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea, select').forEach(f => {
    f.addEventListener('input', () => {
      f.classList.remove('error');
      const err = f.parentElement.querySelector('.field-error');
      if (err) err.style.display = 'none';
    });
  });
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
}