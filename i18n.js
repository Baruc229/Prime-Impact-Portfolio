/* ============================================================
   I18N.JS — Moteur de traduction multilingue
   Ce script gère le changement de langue (FR/EN) dynamiquement
   sans recharger la page.
   ============================================================ */

/**
 * DICTIONNAIRE DE TRADUCTION
 * Chaque clé correspond à un attribut [data-i18n] dans le HTML.
 * Format: "cle": { "fr": "Texte en français", "en": "English text" }
 */
const translations = {
  // --- Navigation & Header (Barre de navigation) ---
  "nav.home": { "fr": "Accueil", "en": "Home" },
  "nav.services": { "fr": "Services", "en": "Services" },
  "nav.portfolio": { "fr": "Réalisations", "en": "Portfolio" },
  "nav.about": { "fr": "À propos", "en": "About us" },
  "nav.testimonials": { "fr": "Témoignages", "en": "Testimonials" },
  "nav.contact": { "fr": "Contact", "en": "Contact" },
  "nav.quote": { "fr": "Devis gratuit", "en": "Free Quote" },
  "nav.cta_mobile": { "fr": "Demander un devis", "en": "Request a Quote" },
  "nav.services.all": { "fr": "Tous nos services", "en": "All our services" },
  "nav.services.seeAll": { "fr": "Voir tout →", "en": "See all →" },
  "nav.services.seeAllMobile": { "fr": "Voir tous nos services →", "en": "See all our services →" },
  "nav.services.1": { "fr": "Création de site web", "en": "Website Creation" },
  "nav.services.2": { "fr": "Tunnels de vente & Landing Pages", "en": "Sales Funnels & Landing Pages" },
  "nav.services.4": { "fr": "Référencement SEO", "en": "SEO Optimization" },
  "nav.services.6": { "fr": "Refonte de site web", "en": "Website Redesign" },
  "nav.services.7": { "fr": "Suivi & Accompagnement", "en": "Support & Maintenance" },

  /**
   * CONVENTION DE NOMMAGE DES CLÉS :
   * - nav.* : Barre de navigation
   * - footer.* : Pied de page
   * - modal.* : Formulaire surgissant
   * - index.* : Contenu de la page d'accueil
   * - services.* : Contenu de la page services
   * - etc.
   * 
   * Pour les placeholders de formulaires, utilisez .ph à la fin de la clé.
   */

  // --- Footer (Pied de page) ---
  "footer.desc": { 
    "fr": "Agence web & marketing digital spécialisée dans la création de sites performants, tunnels de vente et référencement SEO.", 
    "en": "Web & digital marketing agency specialized in creating high-performance websites, sales funnels, and SEO optimization." 
  },
  "footer.services": { "fr": "Services", "en": "Services" },
  "footer.services.1": { "fr": "Création de site web", "en": "Website Creation" },
  "footer.services.2": { "fr": "Tunnels de vente", "en": "Sales Funnels" },
  "footer.services.4": { "fr": "Référencement SEO", "en": "SEO Optimization" },
  "footer.services.6": { "fr": "Refonte de site web", "en": "Website Redesign" },
  "footer.services.7": { "fr": "Suivi & Accompagnement", "en": "Support & Maintenance" },
  "footer.agency": { "fr": "Agence", "en": "Agency" },
  "footer.start": { "fr": "Démarrer", "en": "Get Started" },
  "footer.start.text": { "fr": "Un projet en tête ? Parlons-en.", "en": "Have a project in mind? Let's talk." },
  "footer.btn.quote": { "fr": "Obtenir un devis", "en": "Get a Quote" },
  "footer.rights": { "fr": "Tous droits réservés.", "en": "All rights reserved." },

  // --- Formulaire de Contact Modal ---
  "modal.title": { "fr": "Démarrer un projet", "en": "Start a Project" },
  "modal.subtitle": { "fr": "Un expert vous rappelle sous 24h.", "en": "An expert will call you back within 24h." },
  "modal.name": { "fr": "Votre nom", "en": "Your name" },
  "modal.email": { "fr": "Email", "en": "Email" },
  "modal.phone": { "fr": "Téléphone", "en": "Phone" },
  "modal.message": { "fr": "Message", "en": "Message" },
  "modal.message.ph": { "fr": "Décrivez brièvement votre projet...", "en": "Briefly describe your project..." },
  "modal.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "modal.success.title": { "fr": "Demande reçue !", "en": "Request received!" },
  "modal.success.text": { "fr": "Nous vous contactons très vite.", "en": "We will contact you very soon." },

  // --- Index: Hero ---
  "index.hero.badge": { "fr": "Chez PIA", "en": "At PIA" },
  "index.hero.title": { "fr": "Nous concevons des sites web qui", "en": "We design websites that" },
  "index.hero.subtitle": { "fr": "qui ont le devoir de", "en": "that have a duty to" },
  "index.hero.rotator": { "fr": "vendent pour vous.", "en": "sell for you." },
  "index.hero.kw1": { "fr": "Stratégie", "en": "Strategy" },
  "index.hero.kw2": { "fr": "Développement", "en": "Development" },
  "index.hero.kw3": { "fr": "Performance", "en": "Performance" },
  "index.hero.cta.portfolio": { "fr": "Mes projets", "en": "My projects" },
  "index.hero.cta.contact": { "fr": "Audit gratuit", "en": "Get a free audit" },
  "index.hero.whatsapp.message.fr": { "fr": "salut pia, j'ai besoin de vos services de developpement web", "en": "salut pia, j'ai besoin de vos services de developpement web" },
  "index.hero.whatsapp.message.en": { "fr": "I need your services for my business", "en": "I need your services for my business" },
  "index.hero.cta": { "fr": "Démarrer mon projet", "en": "Start my project" },
  "index.hero.proof": { "fr": "Entrepreneurs accompagnés", "en": "Entrepreneurs supported" },
  "index.hero.float.title": { "fr": "Expertise Web", "en": "Web Expertise" },
  "index.hero.float.sub": { "fr": "Stratégie & développement", "en": "Strategy & development" },
  "index.hero.desc": { "fr": "Chaque projet qu'on livre est conçu pour une seule chose : que votre investissement vous revienne, et au-delà. Votre succès est la seule mesure de notre travail.", "en": "Every project we deliver is designed for one thing: to make your investment pay back — and beyond. Your success is the only measure of our work." },
  "index.hero.slide.1": { "fr": "Site e-commerce", "en": "E-commerce Site" },
  "index.hero.slide.2": { "fr": "Site vitrine", "en": "Showcase Site" },
  "index.hero.slide.3": { "fr": "SaaS", "en": "SaaS" },
  "index.hero.slide.4": { "fr": "Site immobilier", "en": "Real Estate Site" },
  "index.hero.slide.5": { "fr": "Landing page", "en": "Landing Page" },

  // --- Index: Tools & Constat ---
  "index.tools.label": { "fr": "Technologies maîtrisées", "en": "Mastered Technologies" },
  "index.constat.badge": { "fr": "_LE_CONSTAT_", "en": "_THE_REALITY_" },
  "index.constat.title": { "fr": "Beaucoup de sites existent, mais très peu vendent.", "en": "Many websites exist, but very few actually sell." },
  "index.constat.sub": { "fr": "Des visiteurs qui repartent sans jamais cliquer, un parcours utilisateur flou : votre site actuel vous coûte des clients chaque jour.", "en": "Visitors leaving without clicking, unclear user journeys: your current website is costing you clients every single day." },
  "index.constat.bad.title": { "fr": "Vous vous reconnaissez ?", "en": "Does this sound familiar?" },
  "index.constat.bad.1": { "fr": "Votre site ne génère aucun trafic organique", "en": "Your website generates no organic traffic" },
  "index.constat.bad.2": { "fr": "Vous ne recevez jamais de prospects via votre site", "en": "You never receive leads through your site" },
  "index.constat.bad.3": { "fr": "Le site est lent, les visiteurs repartent immédiatement", "en": "The site is slow, visitors leave immediately" },
  "index.constat.bad.4": { "fr": "Le design est dépassé, il ne donne pas confiance", "en": "The design is outdated, it doesn't inspire trust" },
  "index.constat.bad.5": { "fr": "Aucune page n'est optimisée pour convertir", "en": "No page is optimized for conversion" },
  "index.constat.bad.6": { "fr": "Vous êtes invisible sur Google", "en": "You are invisible on Google" },
  "index.constat.good.title": { "fr": "Ce que ça vous coûte", "en": "What it's costing you" },
  "index.constat.good.1": { "fr": "Des clients perdus au profit de vos concurrents mieux positionnés", "en": "Lost clients to better-positioned competitors" },
  "index.constat.good.2": { "fr": "Des revenus manqués chaque mois, sans même le savoir", "en": "Missed revenue every month, without even knowing it" },
  "index.constat.good.3": { "fr": "Une crédibilité et une image de marque dégradées", "en": "A degraded credibility and brand image" },
  "index.constat.good.4": { "fr": "Des investissements publicitaires gaspillés sans base solide", "en": "Wasted advertising investments without a solid foundation" },
  "index.constat.btn.quote": { "fr": "Obtenir un devis", "en": "Get a quote" },
  "index.constat.btn.approach": { "fr": "Mon approche", "en": "My approach" },

  // --- Index: Methode ---
  "index.methode.badge": { "fr": "_NOTRE_MÉTHODE_", "en": "_OUR_METHOD_" },
  "index.methode.title": { "fr": "Notre méthode, étape par étape.", "en": "Our method, step by step." },
  "index.methode.sub": { "fr": "Chaque projet suit un processus clair, de la stratégie au suivi après lancement.", "en": "Every project follows a clear process, from strategy to post-launch follow-up." },
  "index.methode.1.title": { "fr": "On vous écoute vraiment", "en": "We truly listen to you" },
  "index.methode.1.desc": { "fr": "Comprendre votre métier, vos défis, vos objectifs avant de toucher au moindre pixel.", "en": "Understanding your business, your challenges, your goals before touching a single pixel." },
  "index.methode.2.title": { "fr": "Analyse & Stratégie", "en": "Analysis & Strategy" },
  "index.methode.2.desc": { "fr": "Étude des meilleurs acteurs de votre domaine, plan d'action clair et mesurable.", "en": "Study of the best players in your field, clear and measurable action plan." },
  "index.methode.3.title": { "fr": "Design & Expérience", "en": "Design & Experience" },
  "index.methode.3.desc": { "fr": "Beau et simple, le visiteur est guidé vers l'action en quelques secondes. 100% responsive.", "en": "Beautiful and simple, the visitor is guided to action in seconds. 100% responsive." },
  "index.methode.4.title": { "fr": "Construction & Performance", "en": "Build & Performance" },
  "index.methode.4.desc": { "fr": "Outils performants, site rapide et sécurisé. Optimisé pour tous les appareils.", "en": "High-performance tools, fast and secure site. Optimized for all devices." },
  "index.methode.5.title": { "fr": "Automatisations intelligentes", "en": "Smart Automations" },
  "index.methode.5.desc": { "fr": "Répondre aux questions, prendre des RDV, relancer des clients 24h/24 sans effort.", "en": "Answer questions, book meetings, follow up with clients 24/7 effortlessly." },
  "index.methode.6.title": { "fr": "Suivi & Améliorations", "en": "Tracking & Improvements" },
  "index.methode.6.desc": { "fr": "Analyse des résultats, optimisations régulières pour que ça s'améliore en continu.", "en": "Result analysis, regular optimizations for continuous improvement." },
  "index.methode.btn": { "fr": "Démarrer mon projet →", "en": "Start my project →" },

  // --- Index: Resultats ---
  "index.resultats.badge": { "fr": "_NOS_RÉSULTATS_", "en": "_OUR_RESULTS_" },
  "index.resultats.title": { "fr": "Des résultats mesurables.", "en": "Measurable results." },
  "index.resultats.sub": { "fr": "Des chiffres obtenus pour nos clients.", "en": "Figures achieved for our clients." },
  "index.resultats.1.label": { "fr": "Taux de conversion", "en": "Conversion Rate" },
  "index.resultats.1.desc": { "fr": "Augmentation moyenne du taux de conversion après refonte", "en": "Average conversion rate increase after redesign" },
  "index.resultats.2.label": { "fr": "Leads / mois", "en": "Leads / month" },
  "index.resultats.2.desc": { "fr": "Prospects générés chaque mois grâce aux tunnels de vente", "en": "Prospects generated every month thanks to sales funnels" },
  "index.resultats.3.label": { "fr": "Vitesse de chargement", "en": "Loading Speed" },
  "index.resultats.3.desc": { "fr": "Temps de chargement moyen de nos sites, optimisés Core Web Vitals", "en": "Average loading time of our sites, Core Web Vitals optimized" },
  "index.resultats.4.label": { "fr": "Trafic organique SEO", "en": "Organic SEO Traffic" },
  "index.resultats.4.desc": { "fr": "Augmentation du trafic naturel après optimisation SEO", "en": "Increase in natural traffic after SEO optimization" },

  // --- Index: Services Slider ---
  "index.slider.1": { "fr": "Création de site web", "en": "Website creation" },
  "index.slider.2": { "fr": "Refonte de site web", "en": "Website redesign" },
  "index.slider.3": { "fr": "Tunnel de vente", "en": "Sales funnel" },
  "index.slider.4": { "fr": "Landing page", "en": "Landing page" },
  "index.slider.5": { "fr": "Référencement SEO", "en": "SEO optimization" },
  "index.slider.6": { "fr": "Audit & stratégie", "en": "Audit & strategy" },

  // --- Index: Features ---
  "index.features.badge": { "fr": "_Pourquoi_nous_choisir_", "en": "_Why_choose_us_" },
  "index.features.title": { "fr": "Une agence pensée pour votre", "en": "An agency designed for your" },
  "index.features.title.hl": { "fr": "impact", "en": "impact" },
  "index.features.sub": { "fr": "Chez PIA, un site n'est pas une vitrine — c'est un outil de vente pensé pour vos objectifs.", "en": "At PIA, a site isn't a showcase — it's a sales tool built for your goals." },
  "index.features.author.name": { "fr": "Schallom — Fondateur de PIA", "en": "Schallom — Founder of PIA" },
  "index.features.author.role": { "fr": "Webmaster & Expert en web marketing", "en": "Webmaster & Web Marketing Expert" },
  "index.features.author.quote": { "fr": "Mon objectif : comprendre vos besoins en<br>profondeur et vous accompagner de A à Z pour<br>obtenir des résultats qui comptent.", "en": "My goal: to deeply understand your needs<br>and accompany you from A to Z to<br>achieve results that matter." },
  "index.features.1.title": { "fr": "Expertise technique", "en": "Technical Expertise" },
  "index.features.1.desc": { "fr": "WordPress, Shopify, WPFunnels, Cartflows, Omnisend — au service de vos projets.", "en": "WordPress, Shopify, WPFunnels, Cartflows, Omnisend — at the service of your projects." },
  "index.features.2.title": { "fr": "Accompagnement A à Z", "en": "A to Z Support" },
  "index.features.2.desc": { "fr": "Stratégie, design, développement, automatisations marketing — un accompagnement complet à chaque étape.", "en": "Strategy, design, development, marketing automations — full support at every step." },
  "index.features.3.title": { "fr": "Résultats mesurables", "en": "Measurable Results" },
  "index.features.3.desc": { "fr": "Des sites qui convertissent, des tunnels de vente performants et des automatisations qui travaillent pour vous 24h/24.", "en": "Websites that convert, high-performing sales funnels, and automations working for you 24/7." },
  "index.metrics.1": { "fr": "entrepreneurs accompagnés", "en": "entrepreneurs supported" },
  "index.metrics.2": { "fr": "expert dédié à votre projet", "en": "dedicated expert for your project" },
  "index.metrics.3": { "fr": "des projets livrés sur-mesure", "en": "tailor-made projects delivered" },

  // --- Index: Skills ---
  "index.skills.badge": { "fr": "Expertise", "en": "Expertise" },
  "index.skills.title": { "fr": "Compétences que je maîtrise.", "en": "Skills I master." },
  "index.skills.sub": { "fr": "La technique et l'humain, au service de votre projet.", "en": "Technology and people, serving your project." },
  "index.skills.hard": { "fr": "Compétences Techniques", "en": "Technical Skills" },
  "index.skills.soft": { "fr": "Soft Skills", "en": "Soft Skills" },

  // --- Index: Technical Skills (Hard Skills) ---
  "index.skills.wordpress": { "fr": "WordPress", "en": "WordPress" },
  "index.skills.wpfunnels": { "fr": "Funnel building", "en": "Funnel building" },
  "index.skills.automations": { "fr": "Automatisations (Omnisend, IA...)", "en": "Automations (Omnisend, AI...)" },
  "index.skills.shopify": { "fr": "Shopify", "en": "Shopify" },
  "index.skills.design": { "fr": "Figma / Framer / React / Flutter", "en": "Figma / Framer / React / Flutter" },
  "index.skills.seo": { "fr": "SEO", "en": "SEO" },

  // --- Index: Soft Skills ---
  "index.skills.communication": { "fr": "Communication & Écoute", "en": "Communication & Listening" },
  "index.skills.problemsolving": { "fr": "Résolution de problèmes", "en": "Problem-solving" },
  "index.skills.timemanagement": { "fr": "Discipline & Rigueur", "en": "Discipline & Rigor" },
  "index.skills.adaptability": { "fr": "Autonomie", "en": "Autonomy" },
  "index.skills.pressure": { "fr": "Travail sous pression", "en": "Working under pressure" },

  // --- Index: Realisations (Projets) ---
  "index.realisations.project1.title": { "fr": "Boutique Mode Prestige", "en": "Prestige Fashion Store" },
  "index.realisations.project1.result1": { "fr": "+180% CA", "en": "+180% Revenue" },
  "index.realisations.project1.result2": { "fr": "+420 leads/mois", "en": "+420 leads/month" },
  
  "index.realisations.project2.title": { "fr": "Élite Immobilier Lyon", "en": "Elite Real Estate Lyon" },
  "index.realisations.project2.result1": { "fr": "+300% leads", "en": "+300% leads" },
  "index.realisations.project2.result2": { "fr": "Top 3 Google", "en": "Top 3 Google" },
  
  "index.realisations.project3.title": { "fr": "Coaching Business Pro", "en": "Professional Coaching" },
  "index.realisations.project3.result1": { "fr": "38% conversion", "en": "38% conversion" },
  "index.realisations.project3.result2": { "fr": "ROI x4", "en": "ROI x4" },

  // --- Index: Services ---
  "index.services.badge": { "fr": "_NOS_SERVICES_", "en": "_OUR_SERVICES_" },
  "index.services.title": { "fr": "Ce que nous faisons.", "en": "What we do." },
  "index.services.sub": { "fr": "Des solutions digitales sur-mesure pour répondre à vos objectifs.", "en": "Tailor-made digital solutions to meet your goals." },
  "index.services.1.title": { "fr": "Création de site web", "en": "Website Creation" },
  "index.services.1.desc": { "fr": "Sites vitrines, e-commerce ou sur-mesure, conçus pour convertir vos visiteurs en clients.", "en": "Showcase, e-commerce or tailor-made sites, designed to convert your visitors into clients." },
  "index.services.1.p1": { "fr": "Design unique et premium", "en": "Unique and premium design" },
  "index.services.1.p2": { "fr": "100% responsive mobile", "en": "100% mobile responsive" },
  "index.services.1.p3": { "fr": "Optimisé SEO dès la conception", "en": "SEO optimized from conception" },
  "index.services.1.p4": { "fr": "Design sur-mesure unique", "en": "Unique custom design" },
  "index.services.2.title": { "fr": "Tunnels de vente", "en": "Sales Funnels" },
  "index.services.2.desc": { "fr": "Des funnels qui captent les bons prospects et les transforment en clients, sans effort manuel.", "en": "Funnels that capture the right prospects and turn them into clients, without manual effort." },
  "index.services.2.p1": { "fr": "WPFunnels & Cartflows", "en": "WPFunnels & Cartflows" },
  "index.services.2.p2": { "fr": "Copywriting orienté conversion", "en": "Conversion-focused copywriting" },
  "index.services.2.p3": { "fr": "Lead capture & formulaire", "en": "Lead capture & forms" },
  "index.services.2.p4": { "fr": "A/B testing & optimisation", "en": "A/B testing & optimization" },
  "index.services.3.title": { "fr": "Référencement SEO", "en": "SEO Optimization" },
  "index.services.3.desc": { "fr": "Stratégie SEO complète pour gagner en visibilité sur Google et attirer plus de visiteurs.", "en": "Complete SEO strategy to gain visibility on Google and attract more visitors." },
  "index.services.3.p1": { "fr": "Audit technique complet", "en": "Comprehensive technical audit" },
  "index.services.3.p2": { "fr": "Optimisation on-page & off-page", "en": "On-page & off-page optimization" },
  "index.services.3.p3": { "fr": "Reporting mensuel détaillé", "en": "Detailed monthly reporting" },
  "index.services.3.p4": { "fr": "Netlinking stratégique", "en": "Strategic link building" },
  "index.services.4.title": { "fr": "Refonte de site web", "en": "Website Redesign" },
  "index.services.4.desc": { "fr": "Modernisation complète pour les sites qui ne reflètent plus la qualité de votre entreprise.", "en": "Complete modernization for websites that no longer reflect your company's quality." },
  "index.services.4.p1": { "fr": "Audit complet & diagnostic", "en": "Full audit & diagnostic" },
  "index.services.4.p2": { "fr": "UX/UI redesign complet", "en": "Complete UX/UI redesign" },
  "index.services.4.p3": { "fr": "Migration sans perte SEO", "en": "SEO-safe migration" },
  "index.services.4.p4": { "fr": "Performance & rapidité", "en": "Performance & speed" },
  "index.services.5.title": { "fr": "Landing Page", "en": "Landing Page" },
  "index.services.5.desc": { "fr": "Des pages conçues pour capter l'attention et transformer vos visiteurs en leads ou en clients.", "en": "Pages designed to capture attention and turn visitors into leads or clients." },
  "index.services.5.p1": { "fr": "Copywriting orienté conversion", "en": "Conversion-focused copywriting" },
  "index.services.5.p2": { "fr": "Formulaire de capture optimisé", "en": "Optimized lead capture form" },
  "index.services.5.p3": { "fr": "Compatible Google Ads & Meta", "en": "Google Ads & Meta compatible" },
  "index.services.5.p4": { "fr": "Design ultra-impactant", "en": "High-impact design" },
  "index.services.6.title": { "fr": "Audit & Stratégie Digitale", "en": "Digital Audit & Strategy" },
  "index.services.6.desc": { "fr": "Analyse approfondie de votre présence en ligne pour un plan d'action clair et priorisé.", "en": "In-depth analysis of your online presence for a clear, prioritized action plan." },
  "index.services.6.p1": { "fr": "Audit SEO technique complet", "en": "Complete technical SEO audit" },
  "index.services.6.p2": { "fr": "Analyse UX & conversion", "en": "UX & conversion analysis" },
  "index.services.6.p3": { "fr": "Benchmark concurrentiel", "en": "Competitive benchmark" },
  "index.services.6.p4": { "fr": "Plan d'action prioritaire", "en": "Priority action plan" },
  "index.services.7.title": { "fr": "Suivi & Accompagnement", "en": "Support & Maintenance" },
  "index.services.7.desc": { "fr": "Un suivi après lancement incluant maintenance, conseils et évolution de votre projet.", "en": "Post-launch support including maintenance, advice and project evolution." },
  "index.services.7.p1": { "fr": "Maintenance technique mensuelle", "en": "Monthly technical maintenance" },
  "index.services.7.p2": { "fr": "Mises à jour & sécurité", "en": "Updates & security" },
  "index.services.7.p3": { "fr": "Support prioritaire WhatsApp", "en": "Priority WhatsApp support" },
  "index.services.7.p4": { "fr": "Formation & autonomie", "en": "Training & autonomy" },
  "index.services.btn": { "fr": "Voir tous nos services →", "en": "See all our services →" },

  // --- Index: Realisations ---
  "index.realisations.badge": { "fr": "_NOS_RÉALISATIONS_", "en": "_OUR_PORTFOLIO_" },
  "index.realisations.title": { "fr": "Nos réalisations.", "en": "Our work." },
  "index.realisations.sub": { "fr": "Des clients satisfaits, des résultats qui parlent d'eux-mêmes.", "en": "Satisfied clients, results that speak for themselves." },
  "index.realisations.tag.ecom": { "fr": "E-commerce", "en": "E-commerce" },
  "index.realisations.tag.vitrine": { "fr": "Site vitrine", "en": "Showcase site" },
  "index.realisations.tag.landing": { "fr": "Landing page", "en": "Landing page" },
  "index.realisations.1.desc": { "fr": "Boutique Shopify haut de gamme avec tunnel de vente et automatisation email.", "en": "High-end Shopify store with sales funnel and email automation." },
  "index.realisations.2.desc": { "fr": "Site vitrine premium pour agence immobilière avec prise de RDV automatisée.", "en": "Premium showcase site for real estate agency with automated appointment booking." },
  "index.realisations.3.desc": { "fr": "Landing page ultra-optimisée pour une offre de coaching avec tunnel de conversion.", "en": "Ultra-optimized landing page for a coaching offer with conversion funnel." },
  "index.realisations.btn": { "fr": "Voir le projet →", "en": "View project →" },
  "index.realisations.allbtn": { "fr": "Voir toutes nos réalisations", "en": "See all our work" },

  // --- Index: Engagements ---

  // --- Index: Témoignages ---
  "index.temoignages.badge": { "fr": "_TÉMOIGNAGES_", "en": "_TESTIMONIALS_" },
  "index.temoignages.title": { "fr": "Ils nous font confiance.", "en": "They trust us." },
  "index.temoignages.sub": { "fr": "Des entrepreneurs qui ont donné un nouveau souffle à leur activité avec PIA.", "en": "Entrepreneurs who gave their business a new lease on life with PIA." },

  // --- Index: FAQ ---
  "index.faq.badge": { "fr": "_FAQ_", "en": "_FAQ_" },
  "index.faq.title": { "fr": "Questions fréquentes.", "en": "Frequently asked questions." },
  "index.faq.sub": { "fr": "Tout ce que vous devez savoir avant de démarrer.", "en": "Everything you need to know before starting." },
  "index.faq.1.q": { "fr": "Combien coûte la création d'un site web ?", "en": "How much does it cost to create a website?" },
  "index.faq.1.a": { "fr": "Nos projets démarrent à partir de 475€ pour un site vitrine. Le tarif dépend du type de projet, des fonctionnalités souhaitées et de la complexité. Nous établissons toujours un devis détaillé et gratuit avant tout engagement.", "en": "Our projects start at €475 for a showcase site. The price depends on the type of project, desired features, and complexity. We always provide a detailed and free quote before any commitment." },
  "index.faq.2.q": { "fr": "Combien de temps faut-il pour créer mon site ?", "en": "How long does it take to create my site?" },
  "index.faq.2.a": { "fr": "Un site vitrine est livré en 10 à 15 jours ouvrés. Un projet plus complexe (marketplace, tunnel de vente complet) peut prendre 3 à 6 semaines. Nous vous donnons un calendrier précis dès le démarrage.", "en": "A showcase site is delivered in 10 to 15 working days. A more complex project (marketplace, full sales funnel) can take 3 to 6 weeks. We give you a precise schedule right from the start." },
  "index.faq.3.q": { "fr": "Je ne suis pas dans l'immobilier, travaillez-vous dans d'autres secteurs ?", "en": "I'm not in real estate, do you work in other sectors?" },
  "index.faq.3.a": { "fr": "Absolument. Nous accompagnons des entrepreneurs de tous secteurs : coaching, e-commerce, restauration, santé, BTP, consulting… Notre approche s'adapte à votre activité, pas l'inverse.", "en": "Absolutely. We support entrepreneurs from all sectors: coaching, e-commerce, restaurants, health, construction, consulting... Our approach adapts to your business, not the other way around." },
  "index.faq.4.q": { "fr": "Que se passe-t-il après la livraison du site ?", "en": "What happens after the site is delivered?" },
  "index.faq.4.a": { "fr": "Nous proposons des formules de suivi mensuel (maintenance, optimisations, reporting SEO). Vous n'êtes jamais laissé seul. Une formation à la prise en main de votre site est incluse dans chaque projet.", "en": "We offer monthly support packages (maintenance, optimizations, SEO reporting). You are never left alone. Training to manage your site is included in every project." },
  "index.faq.5.q": { "fr": "Pourrai-je modifier mon site moi-même ?", "en": "Will I be able to modify my site myself?" },
  "index.faq.5.a": { "fr": "Oui. Nous construisons sur des CMS intuitifs (WordPress, Shopify) et vous formons à leur utilisation. Vous serez autonome pour les modifications courantes comme les textes, images ou ajout de produits.", "en": "Yes. We build on intuitive CMS (WordPress, Shopify) and train you how to use them. You will be autonomous for common modifications like text, images, or adding products." },

  // --- Index: CTA Finale ---
  "index.cta.title": { "fr": "Prêt à passer à l'action ?", "en": "Ready to take action?" },
  "index.cta.sub": { "fr": "Ne laissez plus un mauvais site vous coûter des clients. Démarrons ensemble.", "en": "Don't let a bad website cost you clients anymore. Let's start together." },

  // ============================================================
  // SERVICES.HTML
  // ============================================================
  "services.hero.badge": { "fr": "_Ce_que_nous_faisons_", "en": "_What_we_do_" },
  "services.hero.title1": { "fr": "Nos", "en": "Our" },
  "services.hero.title2": { "fr": "Services", "en": "Services" },
  "services.hero.sub": { "fr": "Des solutions complètes pour développer votre clientèle et faire décoller votre activité.", "en": "Complete solutions to grow your client base and boost your business." },
  
  "services.cat1.title": { "fr": "Création & Refonte", "en": "Creation & Redesign" },
  "services.cat1.sub": { "fr": "Des fondations solides et un design à votre image.", "en": "Solid foundations and a design that reflects you." },
  
  "services.web.title": { "fr": "Création de site internet", "en": "Website creation" },
  "services.web.desc": { "fr": "Des sites sur-mesure avec les fonctionnalités adaptées à vos objectifs : vitrine, e-commerce, booking, blog, portfolio et plus encore.", "en": "Tailor-made sites with the right features for your goals: showcase, e-commerce, booking, blog, portfolio and more." },
  "services.web.p1": { "fr": "Design unique pensé pour votre image", "en": "Unique design tailored to your brand" },
  "services.web.p2": { "fr": "100% responsive mobile & tablette", "en": "100% responsive for mobile & tablet" },
  "services.web.p3": { "fr": "Optimisation SEO on-page incluse", "en": "On-page SEO optimization included" },
  
  "services.redesign.title": { "fr": "Refonte de site web", "en": "Website redesign" },
  "services.redesign.desc": { "fr": "Modernisation complète et repositionnement digital pour les sites vieillissants qui ne reflètent plus la qualité de l'entreprise.", "en": "Complete modernization and digital repositioning for aging sites that no longer reflect the company's quality." },
  "services.redesign.p1": { "fr": "Audit complet de l'existant", "en": "Complete audit of the existing site" },
  "services.redesign.p2": { "fr": "Nouveau design & UX améliorée", "en": "New design & improved UX" },
  "services.redesign.p3": { "fr": "Conservation du SEO existant", "en": "Preservation of existing SEO" },
  
  "services.cat2.title": { "fr": "Acquisition & Conversion", "en": "Acquisition & Conversion" },
  "services.cat2.sub": { "fr": "Des systèmes conçus pour attirer des visiteurs et les transformer en clients.", "en": "Systems designed to attract visitors and turn them into clients." },
  
  "services.funnel.title": { "fr": "Tunnel de vente (Funnels)", "en": "Sales Funnel (Funnels)" },
  "services.funnel.desc": { "fr": "Des pages d'offre, upsell et downsell qui guident le visiteur jusqu'à l'achat, sans friction.", "en": "Offer pages, upsells and downsells that guide the visitor to purchase, friction-free." },
  "services.funnel.p1": { "fr": "Stratégie funnel personnalisée", "en": "Personalized funnel strategy" },
  "services.funnel.p2": { "fr": "Intégration WPFunnels / Cartflows", "en": "WPFunnels / Cartflows integration" },
  "services.funnel.p3": { "fr": "Automatisation email Omnisend", "en": "Omnisend email automation" },
  
  "services.landing.title": { "fr": "Landing Page", "en": "Landing Page" },
  "services.landing.desc": { "fr": "Des pages conçues pour capter l'attention et transformer vos visiteurs en leads ou en clients.", "en": "Pages designed to grab attention and turn your visitors into leads or customers." },
  "services.landing.p1": { "fr": "Copywriting orienté conversion", "en": "Conversion-oriented copywriting" },
  "services.landing.p2": { "fr": "Formulaire de capture optimisé", "en": "Optimized capture form" },
  "services.landing.p3": { "fr": "Compatible Google Ads / Meta Ads", "en": "Compatible with Google Ads / Meta Ads" },
  
  "services.seo.title": { "fr": "Référencement Naturel (SEO)", "en": "Organic SEO" },
  "services.seo.desc": { "fr": "Optimisation technique et sémantique pour être visible sur Google et attirer les bons visiteurs.", "en": "Technical and semantic optimization to be visible on Google and attract the right visitors." },
  "services.seo.p1": { "fr": "Recherche de mots-clés stratégiques", "en": "Strategic keyword research" },
  "services.seo.p2": { "fr": "Optimisation technique & on-page", "en": "Technical & on-page optimization" },
  "services.seo.p3": { "fr": "Netlinking & backlinks", "en": "Netlinking & backlinks" },
  
  "services.cat3.title": { "fr": "Stratégie & Accompagnement", "en": "Strategy & Support" },
  "services.cat3.sub": { "fr": "Accompagnement et conseil même après la mise en ligne.", "en": "Support and advice even after going live." },
  
  "services.audit.title": { "fr": "Audit & Stratégie Digitale", "en": "Digital Audit & Strategy" },
  "services.audit.desc": { "fr": "Analyse approfondie de la présence en ligne (diagnostic UX, structure) pour fournir un plan d'optimisation clair.", "en": "In-depth analysis of online presence (UX diagnosis, structure) to provide a clear optimization plan." },
  "services.audit.p1": { "fr": "Audit SEO technique complet", "en": "Comprehensive technical SEO audit" },
  "services.audit.p2": { "fr": "Analyse UX & taux de conversion", "en": "UX & conversion rate analysis" },
  "services.audit.p3": { "fr": "Plan d'action prioritaire", "en": "Priority action plan" },
  
  "services.support.title": { "fr": "Suivi & Accompagnement", "en": "Follow-up & Support" },
  "services.support.desc": { "fr": "Un suivi après lancement incluant maintenance, conseils et évolution de votre projet.", "en": "Post-launch follow-up including maintenance, advice and project evolution." },
  "services.support.p1": { "fr": "Maintenance technique mensuelle", "en": "Monthly technical maintenance" },
  "services.support.p2": { "fr": "Mises à jour & sécurité", "en": "Updates & security" },
  "services.support.p3": { "fr": "Support prioritaire WhatsApp", "en": "Priority WhatsApp support" },
  
  "services.btn.quote": { "fr": "Demander un devis", "en": "Request a quote" },
  
  "services.process.badge": { "fr": "_PROCESSUS_", "en": "_PROCESS_" },
  "services.process.title": { "fr": "De la vision au lancement,<br>en", "en": "From vision to launch,<br>in" },
  "services.process.title.hl": { "fr": "3 étapes", "en": "3 steps" },
  "services.process.sub": { "fr": "Un processus structuré du brief au lancement.", "en": "A structured process from brief to launch." },
  "services.process.1.title": { "fr": "Découverte & Stratégie", "en": "Discovery & Strategy" },
  "services.process.1.desc": { "fr": "Nous analysons votre marché, vos objectifs et concevons l'architecture et la stratégie de conversion idéale.", "en": "We analyze your market, your goals and design the ideal architecture and conversion strategy." },
  "services.process.2.title": { "fr": "UX / UI Design", "en": "UX / UI Design" },
  "services.process.2.desc": { "fr": "Création de maquettes haute fidélité. Nous validons ensemble l'aspect visuel avant toute ligne de code.", "en": "Creation of high-fidelity mockups. We validate the visual aspect together before any code is written." },
  "services.process.3.title": { "fr": "Développement & Lancement", "en": "Development & Launch" },
  "services.process.3.desc": { "fr": "Un code soigné et optimisé, suivi de tests finaux, mise en ligne officielle et formation pour vous rendre 100% autonome.", "en": "Clean, optimized code followed by final tests, official launch and training to make you 100% autonomous." },
  
  "services.newsletter.badge": { "fr": "_RESTONS_CONNECTÉS_", "en": "_STAY_CONNECTED_" },
  "services.newsletter.title": { "fr": "Recevez nos actualités", "en": "Get our latest news" },
  "services.newsletter.sub": { "fr": "Conseils web, tendances digitales et offres exclusives — une fois par mois.", "en": "Web tips, digital trends and exclusive offers — once a month." },
  "services.newsletter.name": { "fr": "Votre prénom", "en": "Your first name" },
  "services.newsletter.email": { "fr": "Votre email", "en": "Your email" },
  "services.newsletter.btn": { "fr": "S'abonner", "en": "Subscribe" },

  // ============================================================
  // A-PROPOS.HTML
  // ============================================================
  "about.hero.badge": { "fr": "Notre histoire", "en": "Our story" },
  "about.hero.title1": { "fr": "À propos de", "en": "About" },
  "about.hero.sub": { "fr": "PIA est née d'un constat : un bon site web doit travailler pour vous, pas juste vous représenter.", "en": "PIA was born from a simple observation: a good website should work for you, not just represent you." },

  "about.history.badge": { "fr": "_Notre_histoire_", "en": "_Our_story_" },
  "about.history.title": { "fr": "De la passion au métier.", "en": "From passion to profession." },
  "about.history.p1": { "fr": "Prime Impact Agency est née d'un constat de son fondateur, <strong>Schallom</strong> : beaucoup de sites existent, mais très peu vendent réellement. Trop d'entrepreneurs voient leurs visiteurs repartir sans jamais cliquer.", "en": "Prime Impact Agency was born from an observation by its founder, <strong>Schallom</strong>: many sites exist, but very few actually sell. Too many entrepreneurs see their visitors leave without ever clicking." },
  "about.history.p2": { "fr": "La mission de PIA est de transformer ces sites obsolètes en <strong>machines d'acquisition digitales</strong>. Nous allions esthétique premium et stratégie marketing pour générer de la croissance.", "en": "PIA's mission is to transform these obsolete sites into <strong>digital acquisition machines</strong>. We combine premium aesthetics and marketing strategy to generate growth." },
  "about.history.p3": { "fr": "Aujourd'hui, PIA mise sur l'expertise unique d'un passionné : stratégie, design et développement, réunis au service de votre croissance.", "en": "Today, PIA relies on the unique expertise of one passionate professional: strategy, design, and development, united for your growth." },
  
  "about.metrics.team": { "fr": "Seul à bord", "en": "Solo at the helm" },
  "about.metrics.custom": { "fr": "Sur-mesure", "en": "Tailor-made" },
  
  "about.team.badge": { "fr": "_QUI_SUIS-JE_", "en": "_WHO_I_AM_" },
  "about.team.title": { "fr": "Derrière PIA.", "en": "Behind PIA." },
  "about.team.sub": { "fr": "Un expert à vos côtés, du code à la stratégie.", "en": "An expert by your side, from code to strategy." },
  "about.team.1.tag": { "fr": "Web Master & Stratégie", "en": "Web Master & Strategy" },
  "about.team.1.role": { "fr": "Fondateur — Web Master", "en": "Founder — Web Master" },
  "about.team.1.bio": { "fr": "Web Master et stratège marketing, je conçois des sites web performants et élabore des stratégies digitales sur-mesure pour développer votre activité.", "en": "Web Master and marketing strategist, I design high-performance websites and develop tailored digital strategies to grow your business." },
  
  "about.skills.title": { "fr": "Compétences & Outils", "en": "Skills & Tools" },
  "about.skills.sub": { "fr": "Mon stack technique au service de vos projets.", "en": "My tech stack at the service of your projects." },
  "about.skills.soft1": { "fr": "Communication & Écoute", "en": "Communication & Listening" },
  "about.skills.soft2": { "fr": "Résolution de problèmes", "en": "Problem solving" },
  "about.skills.soft3": { "fr": "Discipline & Rigueur", "en": "Discipline & Rigor" },
  "about.skills.soft4": { "fr": "Autonomie", "en": "Autonomy" },
  "about.skills.soft5": { "fr": "Travail sous pression", "en": "Working under pressure" },
  
  "about.values.title": { "fr": "Mission & Valeurs", "en": "Mission & Values" },
  "about.values.sub": { "fr": "Ce qui guide chacun de mes projets.", "en": "What guides each of my projects." },
  "about.values.1.title": { "fr": "Ma mission", "en": "My mission" },
  "about.values.1.desc": { "fr": "Aider les entrepreneurs et PME à exploiter le digital pour attirer plus de clients, automatiser leur croissance et construire une marque forte.", "en": "To help entrepreneurs and SMEs leverage digital to attract more clients, automate their growth, and build a strong brand." },
  "about.values.2.title": { "fr": "Transparence", "en": "Transparency" },
  "about.values.2.desc": { "fr": "Pas de jargon inutile, pas de frais cachés. Je vous explique tout, je justifie chaque choix et je vous rends autonome sur votre propre outil.", "en": "No useless jargon, no hidden fees. I explain everything, justify each choice, and make you autonomous on your own tool." },
  "about.values.3.title": { "fr": "Excellence", "en": "Excellence" },
  "about.values.3.desc": { "fr": "Je ne sors pas un projet dont je ne suis pas fier. Chaque détail est pensé pour maximiser votre impact.", "en": "I don't release a project I'm not proud of. Every detail is designed to maximize your impact." },
  
  "about.cta.title": { "fr": "Travaillons ensemble.", "en": "Let's work together." },
  "about.cta.sub": { "fr": "Votre projet mérite un engagement fort et des résultats mesurables.", "en": "Your project deserves strong commitment and measurable results." },

  // ============================================================
  // DEVIS.HTML
  // ============================================================
  "devis.title": { "fr": "Parlez-nous de votre projet.", "en": "Tell us about your project." },
  "devis.sub": { "fr": "Remplissez ce formulaire en quelques clics pour obtenir une estimation gratuite et détaillée.", "en": "Fill out this form in a few clicks to get a free, detailed estimate." },
  "devis.step1": { "fr": "Étape 1 sur 3", "en": "Step 1 of 3" },
  "devis.q1.title": { "fr": "De quoi avez-vous besoin ?", "en": "What do you need?" },
  "devis.q1.label": { "fr": "Type de prestation souhaitée", "en": "Type of service desired" },
  "devis.q1.opt0": { "fr": "Sélectionnez une option...", "en": "Select an option..." },
  "devis.q1.opt1": { "fr": "Site Vitrine / Corporate", "en": "Showcase / Corporate Site" },
  "devis.q1.opt2": { "fr": "Boutique E-commerce", "en": "E-commerce Store" },
  "devis.q1.opt3": { "fr": "Tunnel de Vente / Landing Page", "en": "Sales Funnel / Landing Page" },
  "devis.q1.opt4": { "fr": "Prestation SEO / Référencement", "en": "SEO Services" },
  "devis.q1.opt5": { "fr": "Autre / Je ne sais pas encore", "en": "Other / I don't know yet" },
  "devis.q2.label": { "fr": "Avez-vous déjà un site web existant ?", "en": "Do you already have an existing website?" },
  "devis.q2.opt1": { "fr": "Oui, je veux le refondre", "en": "Yes, I want to redesign it" },
  "devis.q2.opt2": { "fr": "Non, c'est une création", "en": "No, it's a new creation" },
  "devis.btn.next": { "fr": "Suivant", "en": "Next" },
  "devis.step2.title": { "fr": "Détails & Budget", "en": "Details & Budget" },
  "devis.q3.label": { "fr": "Description brève de votre projet", "en": "Brief description of your project" },
  "devis.q3.placeholder": { "fr": "Quels sont vos objectifs principaux ? Qui sont vos clients ? Quelles fonctionnalités sont indispensables ?", "en": "What are your main goals? Who are your clients? What features are essential?" },
  "devis.q4.label": { "fr": "Budget estimé alloué au projet", "en": "Estimated budget allocated for the project" },
  "devis.q4.opt0": { "fr": "Sélectionnez une fourchette...", "en": "Select a range..." },
  "devis.q4.opt1": { "fr": "1 500 € - 3 000 € (Site vitrine standard)", "en": "€1,500 - €3,000 (Standard showcase site)" },
  "devis.q4.opt2": { "fr": "3 000 € - 5 000 € (Vitrine premium / E-commerce)", "en": "€3,000 - €5,000 (Premium showcase / E-commerce)" },
  "devis.q4.opt3": { "fr": "5 000 € - 10 000 € (Projet complexe / Sur-mesure)", "en": "€5,000 - €10,000 (Complex / Tailor-made project)" },
  "devis.q4.opt4": { "fr": "Plus de 10 000 €", "en": "More than €10,000" },
  "devis.q4.opt5": { "fr": "Je ne sais pas / À définir", "en": "I don't know / To be defined" },
  "devis.btn.prev": { "fr": "Précédent", "en": "Previous" },
  "devis.step3.title": { "fr": "Vos coordonnées", "en": "Your contact details" },
  "devis.q5.label1": { "fr": "Prénom", "en": "First Name" },
  "devis.q5.label2": { "fr": "Nom", "en": "Last Name" },
  "devis.q5.label3": { "fr": "Email professionnel", "en": "Professional Email" },
  "devis.q5.label4": { "fr": "Téléphone", "en": "Phone number" },
  "devis.btn.submit": { "fr": "Demander mon devis", "en": "Request my quote" },
  "devis.success.title": { "fr": "Demande envoyée !", "en": "Request sent!" },
  "devis.success.desc": { "fr": "Merci pour votre confiance. Notre équipe va étudier votre projet en détail et vous recontactera sous 24 à 48 heures pour en discuter.", "en": "Thank you for your trust. Our team will study your project in detail and will contact you within 24 to 48 hours to discuss it." },
  "devis.success.btn": { "fr": "Retour à l'accueil", "en": "Return to homepage" },

  // --- Formulaire simple-page ---
  "devis.form.prenom.ph": { "fr": "John", "en": "John" },
  "devis.form.nom.ph": { "fr": "Doe", "en": "Doe" },
  "devis.form.email.ph": { "fr": "john@monentreprise.com", "en": "john@mycompany.com" },
  "devis.form.phone.ph": { "fr": "votre numero whatsapp", "en": "your whatsapp number" },
  "devis.form.type.label": { "fr": "Type de projet *", "en": "Project type *" },
  "devis.form.type.ph": { "fr": "Choisissez une option...", "en": "Choose an option..." },
  "devis.form.has_site.oui": { "fr": "Oui, refonte", "en": "Yes, redesign" },
  "devis.form.has_site.non": { "fr": "Non, création", "en": "No, new creation" },
  "devis.form.desc.label": { "fr": "Décrivez votre projet *", "en": "Describe your project *" },
  "devis.form.desc.ph": { "fr": "Objectifs, cibles, fonctionnalités souhaitées…", "en": "Goals, targets, desired features…" },
  "devis.form.submit": { "fr": "Demander mon devis gratuit", "en": "Request my free quote" },
  "devis.form.sending": { "fr": "Envoi…", "en": "Sending…" },
  "devis.form.footnote": { "fr": "Réponse sous 24–48h · Sans engagement", "en": "Response within 24-48h · No commitment" },
  "devis.form.prenom.err": { "fr": "3 caractères minimum, lettres uniquement", "en": "Min 3 characters, letters only" },
  "devis.form.nom.err": { "fr": "3 caractères minimum, lettres uniquement", "en": "Min 3 characters, letters only" },
  "devis.form.email.err": { "fr": "Email invalide", "en": "Invalid email" },
  "devis.form.phone.err": { "fr": "Numéro invalide (chiffres et + uniquement, 4 car. min)", "en": "Invalid number (digits and + only, min 4 chars)" },
  "devis.form.type.err": { "fr": "Veuillez sélectionner une option", "en": "Please select an option" },
  "devis.form.desc.err": { "fr": "Ce champ est requis", "en": "This field is required" },
  "devis.form.ok": { "fr": "OK", "en": "OK" },

  // ============================================================
  // CONTACT.HTML
  // ============================================================
  "contact.hero.badge": { "fr": "_Parlons_de_votre_projet_", "en": "_Let's_talk_about_your_project_" },
  "contact.hero.title1": { "fr": "Nous", "en": "Contact" },
  "contact.hero.title2": { "fr": "contacter", "en": "us" },
  "contact.hero.sub": { "fr": "Réponse garantie sous 24h. Sans engagement, sans pression.", "en": "Guaranteed response within 24h. No commitment, no pressure." },
  "contact.info.wapp": { "fr": "Disponible lun–sam, 9h–19h", "en": "Available Mon–Sat, 9am–7pm" },
  "contact.info.email": { "fr": "Réponse sous 24h ouvrées", "en": "Response within 24 business hours" },
  "contact.info.loc": { "fr": "Localisation", "en": "Location" },
  "contact.info.loc.val": { "fr": "Cotonou", "en": "Cotonou" },
  "contact.info.loc.sub": { "fr": "On travaille partout dans le monde — freelance", "en": "We work worldwide — freelance" },
  "contact.badge.time": { "fr": "Réponse sous 24h", "en": "Response within 24h" },
  "contact.badge.trust": { "fr": "Sans engagement", "en": "No commitment" },
  "contact.form.title": { "fr": "Envoyez-nous un message", "en": "Send us a message" },
  "contact.form.name": { "fr": "Nom complet *", "en": "Full name *" },
  "contact.form.phone": { "fr": "Téléphone", "en": "Phone number" },
  "contact.form.subject": { "fr": "Sujet *", "en": "Subject *" },
  "contact.form.sub0": { "fr": "Choisir un sujet…", "en": "Choose a subject…" },
  "contact.form.sub1": { "fr": "Création de site web", "en": "Website creation" },
  "contact.form.sub2": { "fr": "Tunnel de vente", "en": "Sales funnel" },
  "contact.form.sub3": { "fr": "Référencement SEO", "en": "SEO Services" },
  "contact.form.sub4": { "fr": "Audit & stratégie", "en": "Audit & strategy" },
  "contact.form.sub5": { "fr": "Autre demande", "en": "Other request" },
  "contact.form.msg.ph": { "fr": "Décrivez brièvement votre projet ou votre question…", "en": "Briefly describe your project or your question…" },
  "contact.form.btn": { "fr": "Envoyer le message", "en": "Send message" },
  "contact.form.sending": { "fr": "Envoi…", "en": "Sending…" },
  "contact.error.name": { "fr": "3 caractères minimum, lettres uniquement", "en": "Min 3 characters, letters only" },
  "contact.error.req": { "fr": "Ce champ est requis", "en": "This field is required" },
  "contact.error.email": { "fr": "Email invalide", "en": "Invalid email" },
  "contact.error.sub": { "fr": "Veuillez choisir un sujet", "en": "Please choose a subject" },
  "contact.error.phone": { "fr": "Numéro invalide (chiffres et + uniquement, 4 car. min)", "en": "Invalid number (digits and + only, min 4 chars)" },
  "contact.success.title": { "fr": "Message envoyé !", "en": "Message sent!" },
  "contact.success.sub": { "fr": "Nous vous répondrons sous 24h ouvrées.", "en": "We will respond within 24 business hours." },
  "contact.process.badge": { "fr": "_APRÈS_L'ENVOI_", "en": "_AFTER_SENDING_" },
  "contact.process.title": { "fr": "Ce qui se passe ensuite.", "en": "What happens next." },
  "contact.process.sub": { "fr": "Notre processus est simple, rapide et sans mauvaise surprise.", "en": "Our process is simple, fast, and without bad surprises." },
  "contact.process.1.title": { "fr": "1. Analyse", "en": "1. Analysis" },
  "contact.process.1.desc": { "fr": "Nous lisons attentivement votre demande et analysons votre présence digitale actuelle sous 24h ouvrées.", "en": "We carefully read your request and analyze your current digital presence within 24 business hours." },
  "contact.process.2.title": { "fr": "2. Réponse Personnalisée", "en": "2. Personalized Response" },
  "contact.process.2.desc": { "fr": "Nous vous envoyons une réponse détaillée par message (WhatsApp ou email) avec nos premières recommandations et notre vision de votre projet.", "en": "We send you a detailed response by message (WhatsApp or email) with our first recommendations and our vision of your project." },
  "contact.process.3.title": { "fr": "3. Proposition", "en": "3. Proposal" },
  "contact.process.3.desc": { "fr": "Nous vous envoyons une proposition commerciale détaillée, transparente et sur-mesure pour votre projet.", "en": "We send you a detailed, transparent, and tailor-made commercial proposal for your project." },

  // --- Additional contact keys ---
  "contact.info.wapp.label": { "fr": "WhatsApp", "en": "WhatsApp" },
  "contact.info.email.label": { "fr": "Email", "en": "Email" },
  "contact.form.email.label": { "fr": "Email *", "en": "Email *" },
  "contact.form.msg.label": { "fr": "Message *", "en": "Message *" },
  "contact.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "contact.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },
  "contact.form.phone.ph": { "fr": "votre numero whatsapp", "en": "your whatsapp number" },
  "contact.success.btn": { "fr": "OK", "en": "OK" },

  // ============================================================
  // REALISATIONS.HTML
  // ============================================================
  "port.hero.badge": { "fr": "_Notre_portfolio_", "en": "_Our_portfolio_" },
  "port.hero.title1": { "fr": "Nos", "en": "Our" },
  "port.hero.title2": { "fr": "Réalisations", "en": "Portfolio" },
  "port.hero.sub": { "fr": "Des projets concrets, des clients satisfaits, des résultats mesurables.", "en": "Concrete projects, satisfied clients, measurable results." },
  
  "port.filter.all": { "fr": "Tous", "en": "All" },
  "port.filter.ecom": { "fr": "E-commerce", "en": "E-commerce" },
  "port.filter.land": { "fr": "Landing page", "en": "Landing page" },
  "port.filter.vitr": { "fr": "Site vitrine", "en": "Showcase site" },
  "port.filter.tunn": { "fr": "Tunnel de vente", "en": "Sales funnel" },
  
  "port.p1.tag": { "fr": "E-commerce", "en": "E-commerce" },
  "port.p1.title": { "fr": "Boutique Mode Prestige", "en": "Prestige Fashion Store" },
  "port.p1.desc": { "fr": "Boutique Shopify haut de gamme avec tunnel de vente, upsells et automatisation email pour maximiser la Lifetime Value des clients.", "en": "High-end Shopify store with sales funnel, upsells, and email automation to maximize customer Lifetime Value." },
  "port.metric.ca": { "fr": "CA généré", "en": "Revenue generated" },
  "port.metric.conv": { "fr": "Taux conv.", "en": "Conv. rate" },
  
  "port.p2.tag": { "fr": "Site vitrine", "en": "Showcase site" },
  "port.p2.title": { "fr": "Élite Immobilier Lyon", "en": "Elite Real Estate Lyon" },
  "port.p2.desc": { "fr": "Site vitrine premium pour agence immobilière avec module de prise de RDV automatisée et suivi SEO mensuel strict.", "en": "Premium showcase site for real estate agency with automated appointment scheduling module and strict monthly SEO tracking." },
  "port.metric.leads": { "fr": "Leads qualifiés", "en": "Qualified leads" },
  "port.metric.google": { "fr": "Google", "en": "Google" },
  
  "port.p3.tag": { "fr": "Landing page", "en": "Landing page" },
  "port.p3.title": { "fr": "Coaching Business Pro", "en": "Pro Business Coaching" },
  "port.p3.desc": { "fr": "Landing page haute conversion pour une offre de coaching B2B. Design ultra-rapide et formulaire de qualification intégré.", "en": "High-conversion landing page for a B2B coaching offer. Ultra-fast design and integrated qualification form." },
  "port.metric.conv_rate": { "fr": "Taux conversion", "en": "Conversion rate" },
  "port.metric.roi": { "fr": "ROI Ads", "en": "Ads ROI" },
  
  "port.p4.tag": { "fr": "Tunnel de vente", "en": "Sales funnel" },
  "port.p4.title": { "fr": "Formation Investissement LMNP", "en": "LMNP Investment Training" },
  "port.p4.desc": { "fr": "Funnel complet : page d'opt-in, webinaire automatisé, séquence d'emails de relance et page de vente haute conversion.", "en": "Complete funnel: opt-in page, automated webinar, follow-up email sequence, and high-conversion sales page." },
  "port.metric.leads_gen": { "fr": "Leads générés", "en": "Leads generated" },
  "port.metric.ca_60": { "fr": "CA en 60 jours", "en": "Revenue in 60 days" },
  
  "port.btn.case": { "fr": "Découvrir l'étude de cas →", "en": "Discover the case study →" },
  
  "port.cta.title": { "fr": "Votre projet sera ici.", "en": "Your project will be here." },
  "port.cta.sub": { "fr": "Rejoignez les entrepreneurs qui ont transformé leur présence digitale.", "en": "Join the entrepreneurs who have transformed their digital presence." },

  // ============================================================
  // TEMOIGNAGES.HTML
  // ============================================================
  "testi.hero.badge": { "fr": "_Ce_qu'ils_disent_", "en": "_What_they_say_" },
  "testi.hero.title1": { "fr": "Nos", "en": "Our" },
  "testi.hero.title2": { "fr": "Clients", "en": "Clients" },
  "testi.hero.title3": { "fr": "témoignent", "en": "testify" },
  "testi.hero.sub": { "fr": "Des entrepreneurs satisfaits partagent leur expérience avec PIA.", "en": "Satisfied entrepreneurs share their experience with PIA." },
  
  "testi.stats.1": { "fr": "Note moyenne sur 25+ avis", "en": "Average rating from 25+ reviews" },
  "testi.stats.2": { "fr": "Satisfaction client", "en": "Client satisfaction" },
  "testi.stats.3": { "fr": "Entrepreneurs accompagnés", "en": "Entrepreneurs supported" },
  
  "testi.featured.text": { "fr": "« Grâce au nouveau site et au tunnel de vente, notre agence a doublé son acquisition de mandats exclusifs en 3 mois. Prime Impact Agency a parfaitement compris les enjeux du premium. »", "en": "« Thanks to the new site and sales funnel, our agency doubled its acquisition of exclusive mandates in 3 months. Prime Impact Agency perfectly understood the stakes of premium. »" },
  "testi.featured.name": { "fr": "Caroline H.", "en": "Caroline H." },
  "testi.featured.role": { "fr": "Fondatrice, Agence Immobilière Prestige", "en": "Founder, Prestige Real Estate Agency" },

  "index.testi.1.text": { "fr": "« Notre taux de conversion a bondi de 300% en deux mois. Le design nous permet de rentrer des mandats exclusifs bien plus facilement. L'équipe a parfaitement compris nos besoins. »", "en": "« Our conversion rate jumped 300% in two months. The design allows us to get exclusive mandates much more easily. The team perfectly understood our needs. »" },
  "index.testi.1.role": { "fr": "Directeur d'Agence, Lyon", "en": "Agency Director, Lyon" },
  "index.testi.2.text": { "fr": "« Une maîtrise technique bluffante. Le système de réservation fonctionne sans accroc et l'interface est d'une fluidité exemplaire. Je recommande sans hésiter. »", "en": "« Stunning technical mastery. The booking system works flawlessly and the interface is exemplary smooth. I highly recommend. »" },
  "index.testi.2.role": { "fr": "Investisseur LMNP, Paris", "en": "LMNP Investor, Paris" },
  "index.testi.3.text": { "fr": "« La marketplace fonctionne parfaitement, nos 8 agents gèrent leurs annonces eux-mêmes. Un gain de temps monumental pour la direction. Service irréprochable. »", "en": "« The marketplace works perfectly, our 8 agents manage their ads themselves. A monumental time saver for management. Flawless service. »" },
  "index.testi.3.role": { "fr": "Réseau Immobilier National", "en": "National Real Estate Network" },

  "testi.t4.text": { "fr": "« Le rendu final correspond parfaitement à l'image haut de gamme que nous souhaitions projeter à notre clientèle internationale. Résultats au-delà des attentes. »", "en": "« The final result perfectly matches the high-end image we wanted to project to our international clientele. Results beyond expectations. »" },
  "testi.t4.role": { "fr": "Chasseuse Immo, Bordeaux", "en": "Real Estate Hunter, Bordeaux" },
  "testi.t5.text": { "fr": "« Notre chiffre d'affaires en ligne a triplé en 60 jours après la mise en place du tunnel de vente. L'accompagnement est vraiment au top, disponibles et professionnels. »", "en": "« Our online revenue tripled in 60 days after implementing the sales funnel. The support is truly top-notch, available and professional. »" },
  "testi.t5.role": { "fr": "Formateur en investissement, Nantes", "en": "Investment Trainer, Nantes" },
  "testi.t6.text": { "fr": "« Avant PIA, mon site ne générait aucun prospect. Maintenant je reçois des demandes qualifiées chaque semaine. Le SEO a vraiment changé la donne pour mon cabinet. »", "en": "« Before PIA, my site generated no prospects. Now I receive qualified requests every week. SEO has really changed the game for my firm. »" },
  "testi.t6.role": { "fr": "Expert-Comptable, Paris", "en": "Chartered Accountant, Paris" },
  "testi.t7.text": { "fr": "« Design magnifique, livraison dans les délais, et une équipe à l'écoute tout au long du projet. Ma boutique en ligne dépasse maintenant mes objectifs mensuels. »", "en": "« Beautiful design, delivered on time, and a team that listens throughout the project. My online store now exceeds my monthly goals. »" },
  "testi.t7.role": { "fr": "Créatrice de mode artisanale, Marseille", "en": "Handcrafted Fashion Designer, Marseille" },
  "testi.t8.text": { "fr": "« Je n'imaginais pas qu'une refonte puisse autant changer les choses. Mes visiteurs restent plus longtemps, demandent plus de devis. ROI positif dès le 2e mois. »", "en": "« I never imagined a redesign could change things so much. My visitors stay longer, ask for more quotes. Positive ROI from the 2nd month. »" },
  "testi.t8.role": { "fr": "Artisan BTP, Toulouse", "en": "Construction Craftsman, Toulouse" },
  "testi.t9.text": { "fr": "« L'automatisation des relances client a révolutionné ma façon de travailler. Je perds moins de prospects et je gagne du temps chaque semaine. Excellent investissement. »", "en": "« Automating client follow-ups has revolutionized the way I work. I lose fewer prospects and save time every week. Excellent investment. »" },
  "testi.t9.role": { "fr": "Coach nutrition & bien-être, Lyon", "en": "Nutrition & Wellness Coach, Lyon" },
  
  "testi.cta.title": { "fr": "Votre témoignage sera ici.", "en": "Your testimonial will be here." },
  "testi.cta.sub": { "fr": "Rejoignez les entrepreneurs qui ont transformé leur présence digitale avec PIA.", "en": "Join the entrepreneurs who have transformed their digital presence with PIA." },
  "testi.success.btn": { "fr": "OK", "en": "OK" },

  // ============================================================
  // SEO (Title & Meta Description)
  // ============================================================
  "seo.index.title": { "fr": "Prime Impact Agency — Création de sites web et Tunnels de vente", "en": "Prime Impact Agency — Website Creation and Sales Funnels" },
  "seo.index.desc": { "fr": "Agence web & marketing digital. Nous concevons des sites internet vitrines, e-commerce et tunnels de vente pensés pour l'acquisition client et le SEO.", "en": "Web & digital marketing agency. We design showcase websites, e-commerce stores, and sales funnels built for client acquisition and SEO." },
  
  "seo.services.title": { "fr": "Nos Services — Prime Impact Agency", "en": "Our Services — Prime Impact Agency" },
  "seo.services.desc": { "fr": "Découvrez nos services de création de sites web, conception de tunnels de vente (funnels) et optimisation SEO pour booster votre activité.", "en": "Discover our website creation, sales funnel design, and SEO optimization services to boost your business." },
  
  "seo.apropos.title": { "fr": "À Propos — Prime Impact Agency", "en": "About Us — Prime Impact Agency" },
  "seo.apropos.desc": { "fr": "Découvrez l'équipe de Prime Impact Agency, notre vision orientée résultats et les valeurs qui animent chaque projet digital.", "en": "Discover the Prime Impact Agency team, our results-oriented vision, and the values driving every digital project." },
  
  "seo.devis.title": { "fr": "Demander un devis — Prime Impact Agency", "en": "Request a Quote — Prime Impact Agency" },
  "seo.devis.desc": { "fr": "Obtenez un devis gratuit pour votre projet de création de site web ou tunnel de vente avec Prime Impact Agency.", "en": "Get a free quote for your website creation or sales funnel project with Prime Impact Agency." },
  
  "seo.contact.title": { "fr": "Contact — Prime Impact Agency", "en": "Contact Us — Prime Impact Agency" },
  "seo.contact.desc": { "fr": "Contactez Prime Impact Agency : réponse sous 24h, sans engagement. WhatsApp, email ou formulaire.", "en": "Contact Prime Impact Agency: response within 24h, no commitment. WhatsApp, email, or form." },
  
  "seo.realisations.title": { "fr": "Réalisations — Prime Impact Agency", "en": "Portfolio — Prime Impact Agency" },
  "seo.realisations.desc": { "fr": "Découvrez les réalisations de Prime Impact Agency : sites e-commerce, vitrines, landing pages et tunnels de vente.", "en": "Discover Prime Impact Agency's portfolio: e-commerce sites, showcases, landing pages, and sales funnels." },
  
  "seo.temoignages.title": { "fr": "Témoignages — Prime Impact Agency", "en": "Testimonials — Prime Impact Agency" },
  "seo.temoignages.desc": { "fr": "Découvrez les avis de nos clients : +25 entrepreneurs accompagnés, 100% de satisfaction.", "en": "Discover our clients' reviews: 25+ entrepreneurs supported, 100% satisfaction." },

  "seo.service-creation.title": { "fr": "Création site web | PIA", "en": "Website Creation | PIA" },
  "seo.service-creation.desc": { "fr": "Création de sites web professionnels & sur mesure : vitrine, e-commerce, plateforme immobilier, site de réservation.", "en": "Professional & custom website creation: showcase, e-commerce, real estate platform, booking site." },
  "seo.service-tunnels.title": { "fr": "Tunnels de vente | PIA", "en": "Sales Funnels | PIA" },
  "seo.service-tunnels.desc": { "fr": "Tunnels de conversion, landing pages et entonnoirs de vente qui transforment vos visiteurs en clients.", "en": "Conversion funnels, landing pages, and sales funnels that turn visitors into customers." },
  "seo.service-refonte.title": { "fr": "Refonte site web | PIA", "en": "Website Redesign | PIA" },
  "seo.service-refonte.desc": { "fr": "Refonte de site web professionnelle & sur mesure : vitrine, e-commerce, PME.", "en": "Professional & custom website redesign: showcase, e-commerce, SMB." },
  "seo.service-seo.title": { "fr": "Référencement SEO | PIA", "en": "SEO | PIA" },
  "seo.service-seo.desc": { "fr": "Optimisation technique et sémantique pour être visible sur Google et attirer les bons visiteurs.", "en": "Technical and semantic optimization to be visible on Google and attract the right visitors." },
  "seo.service-suivi.title": { "fr": "Suivi & Accompagnement | PIA", "en": "Support & Maintenance | PIA" },
  "seo.service-suivi.desc": { "fr": "Maintenance technique, mises à jour sécurité, support prioritaire et formation pour rester autonome après le lancement.", "en": "Technical maintenance, security updates, priority support, and training to stay autonomous after launch." },

  // ── Création site web ──
  "service-creation.tag.1": { "fr": "Pourquoi un site", "en": "Why a website" },
  "service-creation.tag.2": { "fr": "Nos services", "en": "Our services" },
  "service-creation.tag.3": { "fr": "Méthode", "en": "Method" },
  "service-creation.tag.4": { "fr": "Design", "en": "Design" },
  "service-creation.tag.5": { "fr": "Engagement", "en": "Commitment" },
  "service-creation.h1": { "fr": "Création de <span class=\"hl\">Site Web</span>", "en": "Website <span class=\"hl\">Creation</span>" },
  "service-creation.slider.1": { "fr": "Site vitrine", "en": "Showcase site" },
  "service-creation.slider.2": { "fr": "E-commerce", "en": "E-commerce" },
  "service-creation.slider.3": { "fr": "Immobilier", "en": "Real Estate" },
  "service-creation.slider.4": { "fr": "Réservation", "en": "Booking" },
  "service-creation.slider.5": { "fr": "Blog", "en": "Blog" },
  "service-creation.slider.6": { "fr": "Portfolio", "en": "Portfolio" },
  "service-creation.cta": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-creation.s1.title": { "fr": "Pourquoi un site web ?", "en": "Why a website?" },
  "service-creation.s1.p1": { "fr": "Dans un environnement où vos clients potentiels passent l'essentiel de leur temps en ligne, l'absence de site web constitue un handicap concurrentiel direct. Un site professionnel ne se limite pas à une présence en ligne : c'est un outil commercial qui travaille 24h/24, 7j/7 pour capter, convaincre et convertir — même en dehors de vos heures d'ouverture.", "en": "In a world where your potential customers spend most of their time online, not having a website is a direct competitive disadvantage. A professional site is not just an online presence — it's a sales tool that works 24/7 to attract, convince, and convert, even when you're asleep." },
  "service-creation.s1.p2": { "fr": "Un site mal conçu peut nuire à votre image. C'est pourquoi chaque projet que nous accompagnons débute par une phase de réflexion stratégique approfondie : identifier vos objectifs, analyser votre marché, comprendre vos clients. Le résultat doit être une vitrine numérique parfaitement alignée avec votre positionnement.", "en": "A poorly designed site can damage your image. That's why every project we take on starts with in-depth strategic thinking: identifying your goals, analyzing your market, understanding your customers. The result must be a digital showcase perfectly aligned with your positioning." },
  "service-creation.s1.lh": { "fr": "<strong>Les bénéfices concrets d'un site professionnel :</strong>", "en": "<strong>What you gain with a professional site:</strong>" },
  "service-creation.s1.li1": { "fr": "Une visibilité permanente auprès de votre audience cible", "en": "Permanent visibility with your target audience" },
  "service-creation.s1.li2": { "fr": "Une crédibilité et une légitimité renforcées face à la concurrence", "en": "Enhanced credibility against your competitors" },
  "service-creation.s1.li3": { "fr": "Un générateur de leads qualifiés qui fonctionne en continu", "en": "A qualified lead generator that works continuously" },
  "service-creation.s1.li4": { "fr": "Un hub central pour orchestrer l'ensemble de vos actions marketing", "en": "A central hub to orchestrate all your marketing efforts" },
  "service-creation.s2.title": { "fr": "Ce que nous créons pour vous", "en": "What we build for you" },
  "service-creation.s2.p1": { "fr": "Chaque projet est unique. Secteur d'activité, cible, objectifs — aucun paramètre n'est laissé au hasard. Voici les types de sites que nous réalisons :", "en": "Every project is unique. Industry, target audience, goals — no detail is left to chance. Here are the types of sites we build:" },
  "service-creation.s2.li1": { "fr": "<strong>Site vitrine</strong> — Présentez votre activité avec une identité visuelle forte et une navigation pensée pour capter vos prospects dès les premières secondes.", "en": "<strong>Showcase site</strong> — Present your business with a strong visual identity and navigation designed to capture prospects from the first seconds." },
  "service-creation.s2.li2": { "fr": "<strong>Site e-commerce</strong> — Lancez votre boutique en ligne avec catalogue produits, panier, tunnel de paiement sécurisé et gestion des expéditions.", "en": "<strong>E-commerce site</strong> — Launch your online store with product catalog, cart, secure checkout, and shipping management." },
  "service-creation.s2.li3": { "fr": "<strong>Plateforme immobilière</strong> — Recherche multicritère, fiches détaillées, plans interactifs et formulaire de contact intégré pour gérer vos annonces efficacement.", "en": "<strong>Real estate platform</strong> — Multi-criteria search, detailed listings, interactive maps, and integrated contact forms to manage your properties." },
  "service-creation.s2.li4": { "fr": "<strong>Site de réservation</strong> — Calendrier temps réel, paiement en ligne, confirmation automatique. Idéal pour locations saisonnières, services ou billetterie.", "en": "<strong>Booking site</strong> — Real-time calendar, online payment, automatic confirmation. Perfect for rentals, services, or ticketing." },
  "service-creation.s2.li5": { "fr": "<strong>Blog &amp; Portfolio</strong> — Mise en valeur de votre expertise ou de vos réalisations avec une maquette éditoriale soignée et une galerie visuelle optimisée.", "en": "<strong>Blog &amp; Portfolio</strong> — Showcase your expertise or work with a polished editorial layout and an optimized visual gallery." },
  "service-creation.s3.title": { "fr": "Notre méthode de travail", "en": "Our work method" },
  "service-creation.s3.p1": { "fr": "Tout commence par un échange approfondi. Nous analysons votre activité, votre marché, vos objectifs. Nous posons les questions qui permettent de comprendre précisément votre métier et vos attentes. Cette phase est fondamentale : elle conditionne l'ensemble du projet.", "en": "It all starts with an in-depth conversation. We analyze your business, your market, your goals. We ask the questions that help us truly understand your work and expectations. This phase is fundamental — it shapes the entire project." },
  "service-creation.s3.p2": { "fr": "Une fois la stratégie validée, nous concevons l'architecture du site et le parcours utilisateur. Nous réalisons ensuite des maquettes fonctionnelles pour que vous visualisiez le résultat avant toute phase de développement. Validation et ajustements se font ensemble, en toute transparence.", "en": "Once the strategy is set, we design the site architecture and user journey. We then create functional mockups so you can see the result before any development. Validation and adjustments are done together, in full transparency." },
  "service-creation.s3.p3": { "fr": "À l'issue de la validation, nous développons votre site avec des tests rigoureux sur mobile, tablette et desktop. L'objectif est de garantir une expérience irréprochable avant la mise en ligne officielle.", "en": "After validation, we develop your site with rigorous testing on mobile, tablet, and desktop. The goal is to guarantee a flawless experience before the official launch." },
  "service-creation.s4.title": { "fr": "Un design sur mesure", "en": "Custom design" },
  "service-creation.s4.p1": { "fr": "Nous ne travaillons pas à partir de templates. Votre site est unique car votre entreprise l'est. Palette chromatique, typographie, grille de mise en page — chaque élément est sélectionné pour traduire votre identité et établir une connexion durable avec vos visiteurs.", "en": "We don't work from templates. Your site is unique because your business is. Color palette, typography, layout grid — every element is chosen to convey your identity and build a lasting connection with your visitors." },
  "service-creation.s4.p2": { "fr": "L'expérience utilisateur guide chacune de nos décisions. Notre objectif est simple : permettre à vos visiteurs de trouver l'information recherchée en quelques secondes, susciter l'intérêt et les conduire naturellement vers l'action. Chaque composant est pensé pour fluidifier ce parcours.", "en": "User experience drives every decision we make. Our goal is simple: help your visitors find what they need in seconds, spark their interest, and guide them naturally toward action. Every component is designed to smooth this journey." },
  "service-creation.s4.lh": { "fr": "<strong>Ce qui distingue nos réalisations :</strong>", "en": "<strong>What sets our work apart:</strong>" },
  "service-creation.s4.li1": { "fr": "Une identité visuelle originale, conçue pour marquer les esprits", "en": "An original visual identity designed to stand out" },
  "service-creation.s4.li2": { "fr": "Un parcours utilisateur optimisé pour maximiser le taux de conversion", "en": "An optimized user journey to maximize conversion rates" },
  "service-creation.s4.li3": { "fr": "Un site rapide, intuitif et parfaitement adapté à tous les écrans", "en": "A fast, intuitive site perfectly adapted to all screens" },
  "service-creation.s5.title": { "fr": "Un accompagnement durable", "en": "Ongoing support" },
  "service-creation.s5.p1": { "fr": "La livraison du projet n'est pas une fin en soi. Nous formons chaque client à l'administration de son site afin qu'il puisse gérer ses contenus en autonomie : ajouter un produit, modifier un texte, publier un article — sans dépendre de nous pour chaque mise à jour.", "en": "Project delivery is not an end in itself. We train every client to manage their site independently: adding a product, editing text, publishing an article — without relying on us for every update." },
  "service-creation.s5.p2": { "fr": "Notre disponibilité reste cependant permanente. Un doute, une question, une évolution souhaitée ? Un message suffit. Nous construisons des relations de confiance sur la durée, bien au-delà de la simple mise en ligne.", "en": "But we remain available. A doubt, a question, a desired change? Just send a message. We build lasting relationships of trust, far beyond the initial launch." },
  "service-creation.s5.lh": { "fr": "<strong>Ce que nous garantissons :</strong>", "en": "<strong>What we guarantee:</strong>" },
  "service-creation.s5.li1": { "fr": "Formation complète à l'administration et la gestion de votre site", "en": "Full training on site administration and management" },
  "service-creation.s5.li2": { "fr": "Assistance technique réactive après la livraison", "en": "Responsive technical support after delivery" },
  "service-creation.s5.li3": { "fr": "Évolutions et améliorations possibles à tout moment", "en": "Updates and improvements possible at any time" },
  "service-creation.modal.title": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-creation.modal.sub": { "fr": "Parlez-nous de votre projet, nous vous proposons la solution adaptée.", "en": "Tell us about your project, we'll propose the right solution." },
  "service-creation.form.name": { "fr": "Votre nom", "en": "Your name" },
  "service-creation.form.email": { "fr": "Votre email", "en": "Your email" },
  "service-creation.form.type": { "fr": "Type de site", "en": "Site type" },
  "service-creation.form.select": { "fr": "Sélectionnez...", "en": "Select..." },
  "service-creation.form.opt1": { "fr": "Site vitrine", "en": "Showcase site" },
  "service-creation.form.opt2": { "fr": "Site e-commerce", "en": "E-commerce site" },
  "service-creation.form.opt3": { "fr": "Plateforme immobilier", "en": "Real estate platform" },
  "service-creation.form.opt4": { "fr": "Site de réservation", "en": "Booking site" },
  "service-creation.form.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "service-creation.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "service-creation.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },

  // ── Tunnels de vente ──
  "service-tunnels.tag.1": { "fr": "Pourquoi un tunnel", "en": "Why a funnel" },
  "service-tunnels.tag.2": { "fr": "Nos solutions", "en": "Our solutions" },
  "service-tunnels.tag.3": { "fr": "Méthode", "en": "Method" },
  "service-tunnels.tag.4": { "fr": "Design", "en": "Design" },
  "service-tunnels.tag.5": { "fr": "Résultats", "en": "Results" },
  "service-tunnels.h1": { "fr": "Tunnels de vente <span class=\"hl\">&amp; Landing Pages</span>", "en": "Sales Funnels <span class=\"hl\">&amp; Landing Pages</span>" },
  "service-tunnels.slider.1": { "fr": "Funnel complet", "en": "Full funnel" },
  "service-tunnels.slider.2": { "fr": "Landing page", "en": "Landing Page" },
  "service-tunnels.slider.3": { "fr": "Email automation", "en": "Email Automation" },
  "service-tunnels.slider.4": { "fr": "Page de remerciement", "en": "Thank You Page" },
  "service-tunnels.slider.5": { "fr": "Tests A/B", "en": "A/B Tests" },
  "service-tunnels.slider.6": { "fr": "Analytics", "en": "Analytics" },
  "service-tunnels.cta": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-tunnels.s1.title": { "fr": "Pourquoi un tunnel de vente ?", "en": "Why a sales funnel?" },
  "service-tunnels.s1.p1": { "fr": "Attirer des visiteurs sur votre site, c'est bien. Les transformer en clients, c'est mieux. Un tunnel de vente n'est pas une simple page : c'est un parcours pensé pour guider chaque visiteur pas à pas, de la découverte jusqu'à l'achat, sans friction ni distraction.", "en": "Getting visitors to your site is good. Turning them into customers is better. A sales funnel is not just a page — it's a journey designed to guide every visitor step by step, from discovery to purchase, without friction or distraction." },
  "service-tunnels.s1.p2": { "fr": "Sans tunnel structuré, vos visiteurs arrivent, regardent, et repartent sans laisser de trace. Avec un funnel bien conçu, chaque visiteur est accompagné, rassuré, convaincu — et le taux de conversion fait la différence entre un site qui coûte et un site qui rapporte.", "en": "Without a structured funnel, visitors come, look, and leave without a trace. With a well-designed funnel, every visitor is guided, reassured, convinced — and the conversion rate is the difference between a site that costs and a site that pays." },
  "service-tunnels.s1.lh": { "fr": "<strong>Ce que vous gagnez avec un tunnel optimisé :</strong>", "en": "<strong>What you gain with an optimized funnel:</strong>" },
  "service-tunnels.s1.li1": { "fr": "Un parcours d'achat fluide qui réduit les abandons et maximise les ventes", "en": "A smooth purchase journey that reduces drop-offs and maximizes sales" },
  "service-tunnels.s1.li2": { "fr": "Des pages pensées pour capter l'attention et maintenir l'intérêt jusqu'à l'action", "en": "Pages designed to capture attention and maintain interest until the action" },
  "service-tunnels.s1.li3": { "fr": "Une automatisation qui relance vos prospects et fidélise vos clients sans effort", "en": "Automation that re-engages prospects and retains customers effortlessly" },
  "service-tunnels.s1.li4": { "fr": "Des données claires pour savoir précisément ce qui fonctionne et ce qui s'améliore", "en": "Clear data to know exactly what works and what improves" },
  "service-tunnels.s2.title": { "fr": "Ce que nous créons pour vous", "en": "What we build for you" },
  "service-tunnels.s2.p1": { "fr": "Chaque projet de conversion est unique. Nous concevons des solutions sur mesure, adaptées à votre offre et à votre audience.", "en": "Every conversion project is unique. We design tailored solutions adapted to your offer and audience." },
  "service-tunnels.s2.li1": { "fr": "<strong>Funnels complets</strong> — De la page d'offre à la confirmation, en passant par l'upsell et le downsell. Un tunnel fluide qui maximise la valeur de chaque visiteur.", "en": "<strong>Complete funnels</strong> — From offer page to confirmation, including upsell and downsell. A smooth funnel that maximizes every visitor's value." },
  "service-tunnels.s2.li2": { "fr": "<strong>Landing pages</strong> — Des pages ultra-optimisées pour une action unique : inscription, achat, téléchargement, réservation. Design percutant, message clair, zéro distraction.", "en": "<strong>Landing pages</strong> — Ultra-optimized pages for a single action: signup, purchase, download, booking. Striking design, clear message, zero distraction." },
  "service-tunnels.s2.li3": { "fr": "<strong>Séquences email automatisées</strong> — Relance des paniers abandonnés, séquences de nurturing, onboarding client. Chaque email est pensé pour maintenir l'engagement et générer des ventes.", "en": "<strong>Automated email sequences</strong> — Abandoned cart recovery, nurturing sequences, client onboarding. Every email is crafted to maintain engagement and drive sales." },
  "service-tunnels.s2.li4": { "fr": "<strong>Pages de remerciement et confirmation</strong> — Le dernier kilomètre de l'expérience client, trop souvent négligé. Une page de remerciement soignée renforce la confiance et ouvre la porte à la prochaine vente.", "en": "<strong>Thank you &amp; confirmation pages</strong> — The last mile of the customer experience, often overlooked. A polished thank-you page builds trust and opens the door to the next sale." },
  "service-tunnels.s3.title": { "fr": "Notre méthode de conversion", "en": "Our conversion method" },
  "service-tunnels.s3.p1": { "fr": "Un tunnel performant ne se construit pas au hasard. Chaque étape repose sur une analyse rigoureuse du comportement de vos visiteurs et des principes éprouvés de persuasion.", "en": "A high-performing funnel is not built by chance. Every step relies on rigorous analysis of visitor behavior and proven persuasion principles." },
  "service-tunnels.s3.p2": { "fr": "Nous commençons par étudier votre offre, votre audience et vos objectifs. Ensuite, nous concevons l'architecture du funnel : quelles pages, dans quel ordre, avec quels messages. Puis nous rédigeons un copywriting orienté conversion, sans jargon, sans détours.", "en": "We start by studying your offer, audience, and goals. Then we design the funnel architecture: which pages, in which order, with which messages. Then we write conversion-focused copy, no jargon, no detours." },
  "service-tunnels.s3.p3": { "fr": "Le design vient soutenir le message : chaque bouton, chaque image, chaque espace blanc est pensé pour guider l'œil et faciliter la décision. Enfin, nous testons et ajustons pour garantir les meilleurs résultats possibles.", "en": "Design supports the message: every button, every image, every white space is crafted to guide the eye and ease the decision. Finally, we test and tweak to ensure the best possible results." },
  "service-tunnels.s4.title": { "fr": "Un design qui convertit", "en": "Design that converts" },
  "service-tunnels.s4.p1": { "fr": "Dans un tunnel de vente, le design n'est pas une décoration : c'est un outil de persuasion. Couleurs, typographie, hiérarchie visuelle — chaque élément est choisi pour créer un sentiment de confiance et guider l'utilisateur vers l'action.", "en": "In a sales funnel, design is not decoration — it's a persuasion tool. Colors, typography, visual hierarchy — every element is chosen to build trust and guide the user toward action." },
  "service-tunnels.s4.p2": { "fr": "Nous concevons des pages épurées, sans bruit visuel, où l'attention est focalisée sur ce qui compte vraiment : votre offre et le bouton d'action. Pas de distractions, pas de liens superflus, pas de tentations de quitter la page.", "en": "We design clean pages with no visual noise, where attention is focused on what truly matters: your offer and the call-to-action. No distractions, no unnecessary links, no temptation to leave the page." },
  "service-tunnels.s4.lh": { "fr": "<strong>Ce qui distingue nos créations :</strong>", "en": "<strong>What sets our creations apart:</strong>" },
  "service-tunnels.s4.li1": { "fr": "Un design épuré qui met votre offre au centre de l'attention", "en": "A clean design that puts your offer at the center of attention" },
  "service-tunnels.s4.li2": { "fr": "Un parcours visuel fluide qui guide naturellement vers l'action", "en": "A smooth visual journey that naturally guides toward action" },
  "service-tunnels.s4.li3": { "fr": "Des pages rapides à charger, optimisées pour tous les appareils", "en": "Fast-loading pages optimized for all devices" },
  "service-tunnels.s5.title": { "fr": "Des résultats mesurables", "en": "Measurable results" },
  "service-tunnels.s5.p1": { "fr": "Ce qui distingue un tunnel de vente bien conçu, c'est qu'on peut mesurer son efficacité. Taux de conversion, valeur moyenne par client, coût par acquisition, rétention — chaque indicateur est suivi pour savoir exactement ce qui fonctionne.", "en": "What sets a well-designed sales funnel apart is that you can measure its effectiveness. Conversion rate, average customer value, acquisition cost, retention — every metric is tracked to know exactly what works." },
  "service-tunnels.s5.p2": { "fr": "Nous mettons en place les outils de suivi nécessaires dès le départ. Vous saurez combien de visiteurs deviennent des leads, combien de leads deviennent des clients, et combien chaque client vous rapporte en moyenne. Pas de suppositions, des données.", "en": "We set up the necessary tracking tools from the start. You'll know how many visitors become leads, how many leads become customers, and how much each customer brings on average. No assumptions, just data." },
  "service-tunnels.s5.lh": { "fr": "<strong>Ce que nous mettons en place :</strong>", "en": "<strong>What we set up:</strong>" },
  "service-tunnels.s5.li1": { "fr": "Suivi des conversions et des objectifs sur chaque étape du funnel", "en": "Conversion and goal tracking at every funnel stage" },
  "service-tunnels.s5.li2": { "fr": "Tests A/B pour optimiser les pages et les messages en continu", "en": "A/B testing to continuously optimize pages and messages" },
  "service-tunnels.s5.li3": { "fr": "Rapports clairs pour visualiser la performance de chaque campagne", "en": "Clear reports to visualize each campaign's performance" },
  "service-tunnels.s5.li4": { "fr": "Recommandations d'évolution basées sur les données réelles", "en": "Improvement recommendations based on real data" },
  "service-tunnels.modal.title": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-tunnels.modal.sub": { "fr": "Parlez-nous de votre projet de conversion, nous vous proposons la solution adaptée.", "en": "Tell us about your conversion project, we'll propose the right solution." },
  "service-tunnels.form.name": { "fr": "Votre nom", "en": "Your name" },
  "service-tunnels.form.email": { "fr": "Votre email", "en": "Your email" },
  "service-tunnels.form.type": { "fr": "Type de projet", "en": "Project type" },
  "service-tunnels.form.select": { "fr": "Sélectionnez...", "en": "Select..." },
  "service-tunnels.form.opt1": { "fr": "Tunnel de vente", "en": "Sales funnel" },
  "service-tunnels.form.opt2": { "fr": "Landing page", "en": "Landing page" },
  "service-tunnels.form.opt3": { "fr": "Automatisation email", "en": "Email automation" },
  "service-tunnels.form.opt4": { "fr": "Autre", "en": "Other" },
  "service-tunnels.form.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "service-tunnels.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "service-tunnels.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },

  // ── Refonte site ──
  "service-refonte.tag.1": { "fr": "Le problème", "en": "The problem" },
  "service-refonte.tag.2": { "fr": "Bénéfices", "en": "Benefits" },
  "service-refonte.tag.3": { "fr": "Process", "en": "Process" },
  "service-refonte.tag.4": { "fr": "Pour qui", "en": "For whom" },
  "service-refonte.tag.5": { "fr": "Inclus", "en": "Included" },
  "service-refonte.h1": { "fr": "Votre site <span class=\"hl\">mérite mieux</span>", "en": "Your site <span class=\"hl\">deserves better</span>" },
  "service-refonte.hook.p1": { "fr": "Votre site existe déjà. Mais ressemble-t-il encore à votre entreprise ? Est-il assez rapide, assez moderne, assez convaincant pour retenir vos visiteurs ?", "en": "Your site already exists. But does it still look like your business? Is it fast enough, modern enough, convincing enough to keep your visitors?" },
  "service-refonte.hook.p2": { "fr": "Nous redonnons vie à votre plateforme pour qu'elle travaille enfin pour vous, sans compromis.", "en": "We bring your platform back to life so it finally works for you, without compromise." },
  "service-refonte.cta": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-refonte.s1.title": { "fr": "Le problème", "en": "The problem" },
  "service-refonte.s1.p1": { "fr": "Votre site a été créé il y a quelques années. Il était beau, fonctionnel, vous en étiez fier. Mais le temps passe, les technologies évoluent, et ce qui séduisait vos visiteurs hier les fait fuir aujourd'hui.", "en": "Your site was built a few years ago. It was beautiful, functional, you were proud of it. But time passes, technology evolves, and what attracted visitors yesterday drives them away today." },
  "service-refonte.s1.p2": { "fr": "Vous le sentez : les visiteurs arrivent, puis repartent. Le taux de conversion baisse, le site est lent sur mobile, la navigation n'est plus fluide. Pire encore, votre entreprise a grandi, changé de direction, et le site ne vous ressemble plus. Il donne une image dépassée alors que vous êtes en pleine évolution.", "en": "You can feel it: visitors come, then leave. The conversion rate drops, the site is slow on mobile, navigation is no longer smooth. Worse, your business has grown, changed direction, and the site no longer reflects who you are. It conveys an outdated image while you're evolving." },
  "service-refonte.s1.lh": { "fr": "<strong>Les signes qui ne trompent pas :</strong>", "en": "<strong>The unmistakable signs:</strong>" },
  "service-refonte.s1.li1": { "fr": "Temps de chargement trop long, les visiteurs abandonnent avant même de voir la page", "en": "Loading times too long, visitors leave before even seeing the page" },
  "service-refonte.s1.li2": { "fr": "Design vieillissant qui donne une image amateur de votre entreprise", "en": "Outdated design that makes your business look amateur" },
  "service-refonte.s1.li3": { "fr": "Pas adapté au mobile — plus de la moitié de vos visiteurs ont une mauvaise expérience", "en": "Not mobile-friendly — over half your visitors have a poor experience" },
  "service-refonte.s1.li4": { "fr": "Difficile à mettre à jour, vous dépendez de quelqu'un pour chaque modification", "en": "Hard to update, you depend on someone for every change" },
  "service-refonte.s2.title": { "fr": "Ce que la refonte change concrètement", "en": "What redesign actually changes" },
  "service-refonte.s2.p1": { "fr": "Une refonte bien menée ne se limite pas à changer les couleurs. C'est une remise à plat complète de l'expérience utilisateur, des performances et de l'image de marque.", "en": "A well-executed redesign is not just about changing colors. It's a complete overhaul of user experience, performance, and brand image." },
  "service-refonte.s2.li1": { "fr": "<strong>Un site qui charge en 2 secondes</strong> — plus vos pages sont rapides, plus vos visiteurs restent et achètent", "en": "<strong>A site that loads in 2 seconds</strong> — the faster your pages, the more visitors stay and buy" },
  "service-refonte.s2.li2": { "fr": "<strong>Un design adapté à votre image actuelle</strong> — votre site reflète enfin qui vous êtes vraiment", "en": "<strong>A design that fits your current image</strong> — your site finally reflects who you truly are" },
  "service-refonte.s2.li3": { "fr": "<strong>Une expérience parfaite sur mobile</strong> — vos clients vous consultent depuis leur téléphone, soyez irréprochable", "en": "<strong>A perfect mobile experience</strong> — your clients visit from their phones, be flawless" },
  "service-refonte.s2.li4": { "fr": "<strong>Un site que vous gérez vous-même</strong> — modifier un texte, ajouter un produit, publier un article sans dépendre de personne", "en": "<strong>A site you manage yourself</strong> — edit text, add products, publish articles without depending on anyone" },
  "service-refonte.s3.title": { "fr": "Notre process en 5 étapes", "en": "Our 5-step process" },
  "service-refonte.s3.p1": { "fr": "Chaque refonte suit une méthode éprouvée pour garantir un résultat à la hauteur de vos attentes.", "en": "Every redesign follows a proven method to guarantee results that meet your expectations." },
  "service-refonte.s3.step1": { "fr": "<strong>Audit complet</strong> — Nous analysons votre site actuel : performances, structure, contenu, comportement des visiteurs. Nous identifions ce qui fonctionne et ce qui doit changer.", "en": "<strong>Full audit</strong> — We analyze your current site: performance, structure, content, visitor behavior. We identify what works and what needs to change." },
  "service-refonte.s3.step2": { "fr": "<strong>Maquettage</strong> — Nous concevons les nouvelles pages, les parcours utilisateur et l'identité visuelle. Vous validez chaque écran avant le développement.", "en": "<strong>Mockups</strong> — We design the new pages, user journeys, and visual identity. You validate every screen before development." },
  "service-refonte.s3.step3": { "fr": "<strong>Développement</strong> — Nous construisons le nouveau site avec les technologies adaptées à vos besoins. Optimisation de la vitesse, du référencement et de l'accessibilité.", "en": "<strong>Development</strong> — We build the new site with the right technologies for your needs. Speed, SEO, and accessibility optimization." },
  "service-refonte.s3.step4": { "fr": "<strong>Tests</strong> — Validation sur mobile, tablette et desktop. Vérification des formulaires, des liens, des performances. Rien n'est laissé au hasard.", "en": "<strong>Testing</strong> — Validation on mobile, tablet, and desktop. Checking forms, links, performance. Nothing is left to chance." },
  "service-refonte.s3.step5": { "fr": "<strong>Livraison &amp; mise en ligne</strong> — Migration du contenu, mise en production, formation à l'administration du site. Vous êtes autonome dès le premier jour.", "en": "<strong>Delivery &amp; launch</strong> — Content migration, production deployment, site administration training. You're autonomous from day one." },
  "service-refonte.s4.title": { "fr": "Pour qui est-ce fait ?", "en": "Who is it for?" },
  "service-refonte.s4.p1": { "fr": "La refonte concerne tous ceux qui possèdent déjà un site mais en ont dépassé les limites. Peu importe votre secteur ou la taille de votre projet.", "en": "Redesign is for anyone who already has a site but has outgrown its limits. No matter your industry or project size." },
  "service-refonte.s4.li1": { "fr": "<strong>Artisans &amp; commerçants</strong> — Votre site a été fait rapidement il y a des années. Il ne vous ressemble plus et ne génère plus de contacts.", "en": "<strong>Artisans &amp; retailers</strong> — Your site was thrown together years ago. It no longer reflects you and doesn't generate leads." },
  "service-refonte.s4.li2": { "fr": "<strong>E-commerçants</strong> — Votre boutique en ligne est lente, le tunnel d'achat fait fuir vos clients, les ventes stagnent.", "en": "<strong>E-commerce</strong> — Your online store is slow, the checkout drives customers away, sales are stagnant." },
  "service-refonte.s4.li3": { "fr": "<strong>PME en croissance</strong> — Vous avez changé de positionnement, élargi votre offre, embauché. Votre site doit refléter cette nouvelle dimension.", "en": "<strong>Growing SMBs</strong> — You've changed your positioning, expanded your offer, hired new people. Your site must reflect this new scale." },
  "service-refonte.s4.li4": { "fr": "<strong>Associations &amp; institutions</strong> — Vous avez besoin d'un site moderne qui transmet votre message avec clarté et impact, sans maintenance complexe.", "en": "<strong>Associations &amp; institutions</strong> — You need a modern site that conveys your message with clarity and impact, without complex maintenance." },
  "service-refonte.s5.title": { "fr": "Ce qui est inclus", "en": "What's included" },
  "service-refonte.s5.p1": { "fr": "Nous ne livrons pas un site, nous livrons une solution complète, prête à l'emploi.", "en": "We don't just deliver a site, we deliver a complete, ready-to-use solution." },
  "service-refonte.s5.li1": { "fr": "<strong>Audit technique et fonctionnel</strong> complet de votre site existant", "en": "<strong>Full technical and functional audit</strong> of your existing site" },
  "service-refonte.s5.li2": { "fr": "<strong>Migration de tout votre contenu</strong> — textes, images, produits, sans perte de données", "en": "<strong>Full content migration</strong> — text, images, products, without data loss" },
  "service-refonte.s5.li3": { "fr": "<strong>Formation à l'administration</strong> — vous apprenez à gérer votre site en toute autonomie", "en": "<strong>Admin training</strong> — learn to manage your site independently" },
  "service-refonte.s5.li4": { "fr": "<strong>Support après livraison</strong> — nous restons disponibles pour les ajustements et les questions", "en": "<strong>Post-delivery support</strong> — we remain available for adjustments and questions" },
  "service-refonte.s5.li5": { "fr": "<strong>Garantie de satisfaction</strong> — nous travaillons avec vous jusqu'à ce que le résultat soit à la hauteur", "en": "<strong>Satisfaction guarantee</strong> — we work with you until the result meets your expectations" },
  "service-refonte.cta-article": { "fr": "Pas encore convaincu ?<br>On commence juste par une conversation.", "en": "Not convinced yet?<br>Let's start with just a conversation." },
  "service-refonte.modal.title": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-refonte.modal.sub": { "fr": "Parlez-nous de votre projet de refonte, nous vous proposons la solution adaptée.", "en": "Tell us about your redesign project, we'll propose the right solution." },
  "service-refonte.form.name": { "fr": "Votre nom", "en": "Your name" },
  "service-refonte.form.email": { "fr": "Votre email", "en": "Your email" },
  "service-refonte.form.type": { "fr": "Type de service", "en": "Service type" },
  "service-refonte.form.select": { "fr": "Sélectionnez...", "en": "Select..." },
  "service-refonte.form.opt1": { "fr": "Vitrine", "en": "Showcase" },
  "service-refonte.form.opt2": { "fr": "E-commerce", "en": "E-commerce" },
  "service-refonte.form.opt3": { "fr": "Landing page", "en": "Landing page" },
  "service-refonte.form.opt4": { "fr": "Blog", "en": "Blog" },
  "service-refonte.form.opt5": { "fr": "Autre", "en": "Other" },
  "service-refonte.form.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "service-refonte.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "service-refonte.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },

  // ── SEO ──
  "service-seo.tag.1": { "fr": "Le problème", "en": "The problem" },
  "service-seo.tag.2": { "fr": "Bénéfices", "en": "Benefits" },
  "service-seo.tag.3": { "fr": "Process", "en": "Process" },
  "service-seo.tag.4": { "fr": "Pour qui", "en": "For whom" },
  "service-seo.tag.5": { "fr": "Inclus", "en": "Included" },
  "service-seo.h1": { "fr": "Référencement <span class=\"hl\">SEO</span>", "en": "<span class=\"hl\">SEO</span> Services" },
  "service-seo.hook.p1": { "fr": "Votre site existe, mais personne ne le trouve sur Google. Pourtant, vos concurrents sont bien classés et captent vos clients avant vous.", "en": "Your site exists, but nobody finds it on Google. Yet your competitors are well-ranked and capture your customers before you." },
  "service-seo.hook.p2": { "fr": "Nous vous aidons à gagner les premières positions pour attirer les visiteurs qui comptent vraiment.", "en": "We help you reach the top positions to attract the visitors who truly matter." },
  "service-seo.cta": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-seo.s1.title": { "fr": "Le problème", "en": "The problem" },
  "service-seo.s1.p1": { "fr": "Vous avez un site, des produits, des services. Mais quand un client potentiel tape ce que vous faites dans Google, vous n'apparaissez pas. Ou alors en page 5, là où personne ne va.", "en": "You have a site, products, services. But when a potential customer types what you do into Google, you don't appear. Or on page 5, where nobody goes." },
  "service-seo.s1.p2": { "fr": "Pendant ce temps, vos concurrents captent le trafic, les appels et les ventes. Le pire, c'est que vous ne le savez même pas. Vous continuez à payer des publicités pour compenser, alors qu'une bonne optimisation SEO pourrait vous amener des visiteurs gratuits et qualifiés chaque jour.", "en": "Meanwhile, your competitors capture traffic, calls, and sales. The worst part is you don't even know it. You keep paying for ads to compensate, when good SEO could bring you free, qualified visitors every day." },
  "service-seo.s1.lh": { "fr": "<strong>Les signes que votre SEO est négligé :</strong>", "en": "<strong>Signs your SEO is neglected:</strong>" },
  "service-seo.s1.li1": { "fr": "Votre site n'apparaît pas sur les mots-clés principaux de votre métier", "en": "Your site doesn't appear on your main business keywords" },
  "service-seo.s1.li2": { "fr": "Vous dépendez uniquement des publicités payantes pour avoir du trafic", "en": "You rely solely on paid advertising for traffic" },
  "service-seo.s1.li3": { "fr": "Vos pages mettent trop de temps à charger, Google les pénalise", "en": "Your pages load too slowly, Google penalizes them" },
  "service-seo.s1.li4": { "fr": "Vous ne savez pas quels mots-clés vos clients utilisent pour vous trouver", "en": "You don't know which keywords your customers use to find you" },
  "service-seo.s2.title": { "fr": "Ce que le SEO change concrètement", "en": "What SEO actually changes" },
  "service-seo.s2.p1": { "fr": "Un bon référencement, ce n'est pas de la magie. C'est un travail méthodique qui finit toujours par payer. Et les résultats sont durables.", "en": "Good SEO is not magic. It's methodical work that always pays off. And the results are sustainable." },
  "service-seo.s2.li1": { "fr": "<strong>Des visiteurs gratuits tous les jours</strong> — plus besoin de payer pour chaque clic, Google vous amène du trafic qualifié en continu", "en": "<strong>Free visitors every day</strong> — no more paying per click, Google brings you qualified traffic continuously" },
  "service-seo.s2.li2": { "fr": "<strong>Vous apparaissez quand on vous cherche</strong> — vos clients potentiels vous trouvent au moment précis où ils ont besoin de vous", "en": "<strong>You appear when people search</strong> — potential customers find you at the exact moment they need you" },
  "service-seo.s2.li3": { "fr": "<strong>Une crédibilité naturelle</strong> — être en première page de Google inspire confiance, être absent fait douter", "en": "<strong>Natural credibility</strong> — being on Google's first page inspires trust, being absent creates doubt" },
  "service-seo.s2.li4": { "fr": "<strong>Un investissement rentable sur le long terme</strong> — contrairement aux pubs, le SEO continue de fonctionner sans budget mensuel", "en": "<strong>A profitable long-term investment</strong> — unlike ads, SEO keeps working without a monthly budget" },
  "service-seo.s3.title": { "fr": "Notre process en 5 étapes", "en": "Our 5-step process" },
  "service-seo.s3.p1": { "fr": "Chaque mission SEO suit une méthode rigoureuse pour des résultats visibles et mesurables.", "en": "Every SEO mission follows a rigorous method for visible, measurable results." },
  "service-seo.s3.step1": { "fr": "<strong>Audit SEO complet</strong> — Nous analysons votre site, votre positionnement et votre concurrence. Nous identifions les opportunités et les blocages.", "en": "<strong>Full SEO audit</strong> — We analyze your site, positioning, and competition. We identify opportunities and blockers." },
  "service-seo.s3.step2": { "fr": "<strong>Recherche de mots-clés</strong> — Nous déterminons les termes précis que vos clients utilisent pour vous trouver et priorisons les plus porteurs.", "en": "<strong>Keyword research</strong> — We determine the exact terms your customers use to find you and prioritize the most impactful ones." },
  "service-seo.s3.step3": { "fr": "<strong>Optimisation technique &amp; contenu</strong> — Correction des problèmes techniques, optimisation des pages existantes et création de contenu ciblé.", "en": "<strong>Technical &amp; content optimization</strong> — Fixing technical issues, optimizing existing pages, and creating targeted content." },
  "service-seo.s3.step4": { "fr": "<strong>Netlinking</strong> — Déploiement d'une stratégie de backlinks pour renforcer l'autorité de votre site aux yeux de Google.", "en": "<strong>Netlinking</strong> — Deploying a backlink strategy to strengthen your site's authority in Google's eyes." },
  "service-seo.s3.step5": { "fr": "<strong>Suivi &amp; reporting</strong> — Mesure des positions, du trafic et des conversions. Ajustements continus et reporting mensuel transparent.", "en": "<strong>Tracking &amp; reporting</strong> — Measuring positions, traffic, and conversions. Continuous adjustments and transparent monthly reporting." },
  "service-seo.s4.title": { "fr": "Pour qui est-ce fait ?", "en": "Who is it for?" },
  "service-seo.s4.p1": { "fr": "Le SEO est utile à toutes les entreprises qui veulent être trouvées sur Google. Mais certaines en ont un besoin urgent.", "en": "SEO is useful for any business that wants to be found on Google. But some need it urgently." },
  "service-seo.s4.li1": { "fr": "<strong>Artisans &amp; commerces locaux</strong> — Vous voulez que les clients de votre quartier vous trouvent quand ils cherchent votre service sur Google.", "en": "<strong>Local artisans &amp; shops</strong> — You want local customers to find you when they search for your service on Google." },
  "service-seo.s4.li2": { "fr": "<strong>E-commerçants</strong> — Vos produits sont excellents mais personne ne les voit. Le SEO vous amène des acheteurs sans payer la publicité.", "en": "<strong>E-commerce</strong> — Your products are great but nobody sees them. SEO brings buyers without paying for ads." },
  "service-seo.s4.li3": { "fr": "<strong>PME &amp; start-up</strong> — Vous lancez votre activité et devez vous faire connaître. Le SEO est le levier le plus rentable pour construire votre visibilité.", "en": "<strong>SMBs &amp; startups</strong> — You're launching and need to get known. SEO is the most cost-effective lever to build visibility." },
  "service-seo.s4.li4": { "fr": "<strong>Blogueurs &amp; créateurs</strong> — Vous produisez du contenu de qualité mais personne ne le lit faute de visibilité dans les moteurs de recherche.", "en": "<strong>Bloggers &amp; creators</strong> — You produce great content but nobody reads it due to lack of search engine visibility." },
  "service-seo.s5.title": { "fr": "Ce qui est inclus", "en": "What's included" },
  "service-seo.s5.p1": { "fr": "Nous ne promettons pas des résultats en 24 heures. Nous mettons en place un travail de fond qui dure et qui rapporte.", "en": "We don't promise results in 24 hours. We set up foundational work that lasts and pays off." },
  "service-seo.s5.li1": { "fr": "<strong>Audit technique et sémantique</strong> complet de votre site avec recommandations priorisées", "en": "<strong>Full technical and semantic audit</strong> of your site with prioritized recommendations" },
  "service-seo.s5.li2": { "fr": "<strong>Optimisation de toutes vos pages</strong> — balises, contenu, structure, maillage interne", "en": "<strong>Optimization of all your pages</strong> — tags, content, structure, internal linking" },
  "service-seo.s5.li3": { "fr": "<strong>Stratégie de contenu</strong> — articles de blog et pages ciblés sur les mots-clés porteurs", "en": "<strong>Content strategy</strong> — blog posts and pages targeting high-potential keywords" },
  "service-seo.s5.li4": { "fr": "<strong>Campagne de netlinking</strong> pour renforcer votre autorité et gagner des positions", "en": "<strong>Netlinking campaign</strong> to strengthen your authority and gain positions" },
  "service-seo.s5.li5": { "fr": "<strong>Reporting mensuel</strong> détaillé avec vos positions, votre trafic et les actions réalisées", "en": "<strong>Monthly reporting</strong> with your positions, traffic, and completed actions" },
  "service-seo.cta-article": { "fr": "Pas encore convaincu ?<br>On commence juste par une conversation.", "en": "Not convinced yet?<br>Let's start with just a conversation." },
  "service-seo.modal.title": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-seo.modal.sub": { "fr": "Parlez-nous de votre projet SEO, nous vous proposons la solution adaptée.", "en": "Tell us about your SEO project, we'll propose the right solution." },
  "service-seo.form.name": { "fr": "Votre nom", "en": "Your name" },
  "service-seo.form.email": { "fr": "Votre email", "en": "Your email" },
  "service-seo.form.type": { "fr": "Type de projet", "en": "Project type" },
  "service-seo.form.select": { "fr": "Sélectionnez...", "en": "Select..." },
  "service-seo.form.opt1": { "fr": "Audit SEO", "en": "SEO audit" },
  "service-seo.form.opt2": { "fr": "Optimisation SEO", "en": "SEO optimization" },
  "service-seo.form.opt3": { "fr": "Netlinking", "en": "Netlinking" },
  "service-seo.form.opt4": { "fr": "Autre", "en": "Other" },
  "service-seo.form.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "service-seo.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "service-seo.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },

  // ── Suivi & Accompagnement ──
  "service-suivi.tag.1": { "fr": "Le problème", "en": "The problem" },
  "service-suivi.tag.2": { "fr": "Bénéfices", "en": "Benefits" },
  "service-suivi.tag.3": { "fr": "Process", "en": "Process" },
  "service-suivi.tag.4": { "fr": "Pour qui", "en": "For whom" },
  "service-suivi.tag.5": { "fr": "Inclus", "en": "Included" },
  "service-suivi.h1": { "fr": "Suivi &amp; <span class=\"hl\">Accompagnement</span>", "en": "Support &amp; <span class=\"hl\">Maintenance</span>" },
  "service-suivi.hook.p1": { "fr": "Un site ne se termine pas au lancement. Sans suivi, il vieillit, se dégrade et finit par ne plus fonctionner comme au premier jour.", "en": "A site doesn't end at launch. Without maintenance, it ages, degrades, and eventually stops working like it did on day one." },
  "service-suivi.hook.p2": { "fr": "Nous assurons la pérennité de votre projet avec un accompagnement sur mesure, pour que votre site reste performant, sécurisé et à jour.", "en": "We ensure the longevity of your project with tailored support, so your site stays performant, secure, and up to date." },
  "service-suivi.cta": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-suivi.s1.title": { "fr": "Le problème", "en": "The problem" },
  "service-suivi.s1.p1": { "fr": "Votre site a été livré, tout fonctionne. Puis les semaines passent. Une mise à jour de sécurité est disponible, vous ne l'installez pas. Un plugin pose problème, vous ne le savez pas. Un formulaire ne fonctionne plus, vous le découvrez quand un client s'en plaint.", "en": "Your site was delivered, everything works. Then weeks pass. A security update is available, you don't install it. A plugin causes issues, you don't know. A form stops working, you find out when a customer complains." },
  "service-suivi.s1.p2": { "fr": "Un site laissé sans maintenance, c'est comme une voiture sans révision. Ça roule encore un moment, puis ça casse. Et plus vous attendez, plus la facture est salée. Sans compter le risque de sécurité : un site non mis à jour est une porte ouverte pour les attaques.", "en": "A site left without maintenance is like a car without a service. It runs for a while, then breaks down. And the longer you wait, the bigger the bill. Not to mention security risks: an unmaintained site is an open door for attacks." },
  "service-suivi.s1.lh": { "fr": "<strong>Les risques d'un site sans suivi :</strong>", "en": "<strong>The risks of an unmaintained site:</strong>" },
  "service-suivi.s1.li1": { "fr": "Failles de sécurité non corrigées qui mettent vos données et celles de vos clients en danger", "en": "Unpatched security vulnerabilities that put your and your customers' data at risk" },
  "service-suivi.s1.li2": { "fr": "Site lent et dégradé à force d'accumuler des mises à jour non compatibles", "en": "Slow, degraded site from accumulating incompatible updates" },
  "service-suivi.s1.li3": { "fr": "Fonctionnalités qui cessent de marcher sans que vous vous en rendiez compte", "en": "Features that stop working without you noticing" },
  "service-suivi.s1.li4": { "fr": "Perte de données en cas de problème, faute de sauvegardes régulières", "en": "Data loss in case of problems due to lack of regular backups" },
  "service-suivi.s2.title": { "fr": "Ce que le suivi change concrètement", "en": "What maintenance actually changes" },
  "service-suivi.s2.p1": { "fr": "Un accompagnement régulier, ce n'est pas une dépense. C'est un investissement qui vous évite des urgences coûteuses et vous garantit la tranquillité.", "en": "Regular support is not an expense. It's an investment that prevents costly emergencies and guarantees peace of mind." },
  "service-suivi.s2.li1": { "fr": "<strong>Votre site reste sécurisé</strong> — mises à jour appliquées, surveillance active, sauvegardes automatiques. Vous dormez tranquille.", "en": "<strong>Your site stays secure</strong> — updates applied, active monitoring, automatic backups. Sleep peacefully." },
  "service-suivi.s2.li2": { "fr": "<strong>Vous gagnez du temps</strong> — nous gérons la technique, vous gérez votre métier. Pas besoin de comprendre les mises à jour et les correctifs.", "en": "<strong>You save time</strong> — we handle the tech, you run your business. No need to understand updates and fixes." },
  "service-suivi.s2.li3": { "fr": "<strong>Votre site évolue avec vous</strong> — ajout de fonctionnalités, modifications, améliorations. Vous avez un interlocuteur unique qui connaît votre projet.", "en": "<strong>Your site evolves with you</strong> — feature additions, changes, improvements. You have a single contact who knows your project." },
  "service-suivi.s2.li4": { "fr": "<strong>Vous restez autonome</strong> — formé à l'administration, vous gérez vos contenus au quotidien sans dépendre de nous pour chaque petite action.", "en": "<strong>You stay autonomous</strong> — trained on administration, you manage your daily content without depending on us for every small action." },
  "service-suivi.s3.title": { "fr": "Notre process en 5 étapes", "en": "Our 5-step process" },
  "service-suivi.s3.p1": { "fr": "Chaque accompagnement est adapté à vos besoins, mais suit toujours une méthode structurée.", "en": "Each support plan is tailored to your needs, but always follows a structured method." },
  "service-suivi.s3.step1": { "fr": "<strong>Audit initial</strong> — État des lieux complet de votre site : sécurité, performances, mises à jour, contenu. Nous identifions les actions prioritaires.", "en": "<strong>Initial audit</strong> — Complete assessment of your site: security, performance, updates, content. We identify priority actions." },
  "service-suivi.s3.step2": { "fr": "<strong>Plan d'accompagnement</strong> — Nous définissons ensemble la formule adaptée : maintenance mensuelle, support prioritaire, formation, ou tout à la fois.", "en": "<strong>Support plan</strong> — We define the right plan together: monthly maintenance, priority support, training, or all of the above." },
  "service-suivi.s3.step3": { "fr": "<strong>Maintenance continue</strong> — Mises à jour régulières, sauvegardes automatiques, surveillance de la sécurité et des performances. Votre site est entre de bonnes mains.", "en": "<strong>Ongoing maintenance</strong> — Regular updates, automatic backups, security and performance monitoring. Your site is in good hands." },
  "service-suivi.s3.step4": { "fr": "<strong>Formation &amp; autonomie</strong> — Nous vous formons à la gestion quotidienne de votre site : ajouter des pages, modifier des textes, publier des articles.", "en": "<strong>Training &amp; autonomy</strong> — We train you to manage your site daily: adding pages, editing text, publishing articles." },
  "service-suivi.s3.step5": { "fr": "<strong>Évolution &amp; amélioration</strong> — Au fil du temps, nous faisons évoluer votre site pour répondre à vos nouveaux besoins : nouvelles fonctionnalités, designs, optimisations.", "en": "<strong>Evolution &amp; improvement</strong> — Over time, we evolve your site to meet new needs: new features, designs, optimizations." },
  "service-suivi.s4.title": { "fr": "Pour qui est-ce fait ?", "en": "Who is it for?" },
  "service-suivi.s4.p1": { "fr": "L'accompagnement est fait pour tous ceux qui veulent que leur site reste performant sans y passer leur temps.", "en": "Support is for anyone who wants their site to stay performant without spending their time on it." },
  "service-suivi.s4.li1": { "fr": "<strong>Entrepreneurs &amp; indépendants</strong> — Vous avez un site mais pas le temps ni l'envie de gérer la technique. Nous le faisons pour vous.", "en": "<strong>Entrepreneurs &amp; freelancers</strong> — You have a site but no time or desire to handle the tech. We do it for you." },
  "service-suivi.s4.li2": { "fr": "<strong>PME &amp; associations</strong> — Votre site est essentiel à votre activité mais personne en interne n'a les compétences pour le maintenir.", "en": "<strong>SMBs &amp; associations</strong> — Your site is essential but nobody in-house has the skills to maintain it." },
  "service-suivi.s4.li3": { "fr": "<strong>Agences &amp; freelances</strong> — Vous avez livré un site à un client et voulez lui proposer un service de maintenance sans le gérer vous-même.", "en": "<strong>Agencies &amp; freelancers</strong> — You delivered a site to a client and want to offer maintenance without handling it yourself." },
  "service-suivi.s4.li4": { "fr": "<strong>Créateurs de contenu</strong> — Vous voulez vous concentrer sur votre contenu et laisser la technique à quelqu'un de confiance.", "en": "<strong>Content creators</strong> — You want to focus on your content and leave the tech to someone you trust." },
  "service-suivi.s5.title": { "fr": "Ce qui est inclus", "en": "What's included" },
  "service-suivi.s5.p1": { "fr": "Nous proposons des formules flexibles, adaptées à vos besoins réels. Pas d'engagement long, pas de piège.", "en": "We offer flexible plans adapted to your real needs. No long-term commitment, no tricks." },
  "service-suivi.s5.li1": { "fr": "<strong>Maintenance mensuelle</strong> — mises à jour, sauvegardes, surveillance de la sécurité et des performances", "en": "<strong>Monthly maintenance</strong> — updates, backups, security and performance monitoring" },
  "service-suivi.s5.li2": { "fr": "<strong>Support prioritaire WhatsApp</strong> — posez vos questions, signalez un problème, nous répondons rapidement", "en": "<strong>Priority WhatsApp support</strong> — ask questions, report issues, we respond quickly" },
  "service-suivi.s5.li3": { "fr": "<strong>Formation personnalisée</strong> — apprenez à gérer votre site en autonomie, à votre rythme", "en": "<strong>Personalized training</strong> — learn to manage your site independently, at your own pace" },
  "service-suivi.s5.li4": { "fr": "<strong>Évolutions et améliorations</strong> — ajout de fonctionnalités, modifications de design, optimisation SEO", "en": "<strong>Updates and improvements</strong> — feature additions, design changes, SEO optimization" },
  "service-suivi.s5.li5": { "fr": "<strong>Bilan trimestriel</strong> — rapport sur l'état de votre site, les actions réalisées et les recommandations", "en": "<strong>Quarterly review</strong> — report on your site's status, actions taken, and recommendations" },
  "service-suivi.cta-article": { "fr": "Pas encore convaincu ?<br>On commence juste par une conversation.", "en": "Not convinced yet?<br>Let's start with just a conversation." },
  "service-suivi.modal.title": { "fr": "Discutons de vos besoins", "en": "Let's discuss your needs" },
  "service-suivi.modal.sub": { "fr": "Parlez-nous de votre projet, nous vous proposons la formule adaptée.", "en": "Tell us about your project, we'll propose the right plan." },
  "service-suivi.form.name": { "fr": "Votre nom", "en": "Your name" },
  "service-suivi.form.email": { "fr": "Votre email", "en": "Your email" },
  "service-suivi.form.type": { "fr": "Type de besoin", "en": "Type of need" },
  "service-suivi.form.select": { "fr": "Sélectionnez...", "en": "Select..." },
  "service-suivi.form.opt1": { "fr": "Maintenance mensuelle", "en": "Monthly maintenance" },
  "service-suivi.form.opt2": { "fr": "Support prioritaire", "en": "Priority support" },
  "service-suivi.form.opt3": { "fr": "Formation", "en": "Training" },
  "service-suivi.form.opt4": { "fr": "Autre", "en": "Other" },
  "service-suivi.form.submit": { "fr": "Envoyer ma demande", "en": "Send my request" },
  "service-suivi.form.name.ph": { "fr": "Jean Dupont", "en": "John Doe" },
  "service-suivi.form.email.ph": { "fr": "jean@exemple.com", "en": "john@example.com" },

  // ============================================================
  // MENTIONS LÉGALES
  // ============================================================
  "legal.mentions.title": { "fr": "Mentions Légales", "en": "Legal Notice" },
  "legal.mentions.sub": { "fr": "Les informations légales relatives à Prime Impact Agency.", "en": "Legal information regarding Prime Impact Agency." },
  "legal.mentions.h1": { "fr": "1. Éditeur du site", "en": "1. Site Editor" },
  "legal.mentions.p1": { "fr": "Le site Prime Impact Agency est édité par :", "en": "The Prime Impact Agency website is edited by:" },
  "legal.mentions.h2": { "fr": "2. Hébergement", "en": "2. Hosting" },
  "legal.mentions.p2": { "fr": "Le site est hébergé par :", "en": "The site is hosted by:" },
  "legal.mentions.h3": { "fr": "3. Propriété intellectuelle", "en": "3. Intellectual Property" },
  "legal.mentions.p3": { "fr": "L'ensemble du contenu de ce site est la propriété exclusive de Prime Impact Agency.", "en": "All content on this site is the exclusive property of Prime Impact Agency." },
  "legal.mentions.h4": { "fr": "4. Responsabilité", "en": "4. Liability" },
  "legal.mentions.p4": { "fr": "Prime Impact Agency s'efforce de fournir des informations aussi précises que possible.", "en": "Prime Impact Agency strives to provide information as accurate as possible." },
  "legal.mentions.h5": { "fr": "5. Liens hypertextes", "en": "5. Hypertext Links" },
  "legal.mentions.p5": { "fr": "Le site peut contenir des liens vers d'autres sites.", "en": "The site may contain links to other sites." },
  "legal.mentions.h6": { "fr": "6. Droit applicable", "en": "6. Applicable Law" },
  "legal.mentions.p6": { "fr": "Les présentes mentions légales sont régies par le droit français.", "en": "These legal notices are governed by French law." },

  // ============================================================
  // POLITIQUE DE CONFIDENTIALITÉ
  // ============================================================
  "legal.privacy.title": { "fr": "Politique de Confidentialité", "en": "Privacy Policy" },
  "legal.privacy.sub": { "fr": "Comment nous protégeons et utilisons vos données personnelles.", "en": "How we protect and use your personal data." },
  "legal.privacy.badge": { "fr": "_VOS_DONNÉES_", "en": "_YOUR_DATA_" },
  "legal.privacy.h1": { "fr": "1. Introduction", "en": "1. Introduction" },
  "legal.privacy.p1": { "fr": "La présente politique de confidentialité décrit comment nous collectons et protégeons vos données.", "en": "This privacy policy describes how we collect and protect your data." },
  "legal.privacy.h2": { "fr": "2. Données collectées", "en": "2. Data Collected" },
  "legal.privacy.p2": { "fr": "Nous collectons les données suivantes :", "en": "We collect the following data:" },
  "legal.privacy.h3": { "fr": "3. Utilisation des données", "en": "3. Use of Data" },
  "legal.privacy.p3": { "fr": "Vos données sont utilisées pour :", "en": "Your data is used for:" },
  "legal.privacy.h4": { "fr": "4. Cookies", "en": "4. Cookies" },
  "legal.privacy.p4": { "fr": "Notre site utilise des cookies pour améliorer votre expérience.", "en": "Our site uses cookies to improve your experience." },
  "legal.privacy.h5": { "fr": "5. Conservation des données", "en": "5. Data Retention" },
  "legal.privacy.p5": { "fr": "Vos données sont conservées pour une durée maximale de 3 ans.", "en": "Your data is kept for a maximum of 3 years." },
  "legal.privacy.h6": { "fr": "6. Vos droits", "en": "6. Your Rights" },
  "legal.privacy.p6": { "fr": "Vous disposez des droits suivants :", "en": "You have the following rights:" },
  "legal.privacy.h7": { "fr": "7. Sécurité", "en": "7. Security" },
  "legal.privacy.p7": { "fr": "Nous mettons en œuvre des mesures de sécurité appropriées.", "en": "We implement appropriate security measures." },
  "legal.privacy.h8": { "fr": "8. Contact", "en": "8. Contact" },
  "legal.privacy.p8": { "fr": "Pour toute question, contactez-nous à :", "en": "For any questions, contact us at:" },
  "legal.privacy.cookies.link": { "fr": "Gérer mes préférences cookies", "en": "Manage my cookie preferences" },

  // SEO Legal Pages
  "legal.mentions.seo.title": { "fr": "Mentions Légales — Prime Impact Agency", "en": "Legal Notice — Prime Impact Agency" },
  "legal.privacy.seo.title": { "fr": "Politique de Confidentialité — Prime Impact Agency", "en": "Privacy Policy — Prime Impact Agency" },
  "legal.mentions.badge": { "fr": "_INFORMATIONS_LÉGALES_", "en": "_LEGAL_INFORMATION_" },

  // Privacy page additional translations
  "legal.privacy.data.1": { "fr": "Données que vous nous fournissez", "en": "Data you provide to us" },
  "legal.privacy.data.2": { "fr": "Données de navigation", "en": "Navigation data" },
  "legal.privacy.data.3": { "fr": "Données techniques", "en": "Technical data" },
  "legal.privacy.use.1": { "fr": "Répondre à vos demandes de contact et devis", "en": "Respond to your contact and quote requests" },
  "legal.privacy.use.2": { "fr": "Améliorer notre site et nos services", "en": "Improve our site and services" },
  "legal.privacy.use.3": { "fr": "Vous envoyer des informations sur nos prestations", "en": "Send you information about our services" },
  "legal.privacy.use.4": { "fr": "Analyser les performances de notre site", "en": "Analyze our site's performance" },
  "legal.privacy.right.1": { "fr": "Droit d'accès", "en": "Right to access" },
  "legal.privacy.right.1.desc": { "fr": "Obtenir une copie de vos données", "en": "Obtain a copy of your data" },
  "legal.privacy.right.2": { "fr": "Droit de rectification", "en": "Right to rectification" },
  "legal.privacy.right.2.desc": { "fr": "Corriger des données inexactes", "en": "Correct inaccurate data" },
  "legal.privacy.right.3": { "fr": "Droit à l'effacement", "en": "Right to erasure" },
  "legal.privacy.right.3.desc": { "fr": "Demander la suppression de vos données", "en": "Request deletion of your data" },
  "legal.privacy.right.4": { "fr": "Droit d'opposition", "en": "Right to object" },
  "legal.privacy.right.4.desc": { "fr": "Vous opposer au traitement", "en": "Object to processing" },
  "legal.privacy.right.5": { "fr": "Droit à la portabilité", "en": "Right to portability" },
  "legal.privacy.right.5.desc": { "fr": "Recevoir vos données dans un format structuré", "en": "Receive your data in a structured format" },
  "legal.privacy.right.action": { "fr": "Pour exercer ces droits, contactez-nous à :", "en": "To exercise these rights, contact us at:" }
};

/**
 * CLASSE I18NMANAGER
 * Gère la détection, le stockage et l'application des langues.
 */
class I18nManager {
  constructor() {
    // Détermine la langue à utiliser au chargement
    this.currentLang = this.getInitialLang();
    // Initialise le moteur
    this.init();
  }

  /**
   * Détermine la langue initiale selon 3 critères :
   * 1. Paramètre dans l'URL (?lang=en)
   * 2. Choix précédent stocké dans le navigateur
   * 3. Langue par défaut du système de l'utilisateur
   */
  getInitialLang() {
    // 1. URL parameter (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'fr' || urlLang === 'en') return urlLang;

    // 2. LocalStorage
    const storedLang = localStorage.getItem('site_lang');
    if (storedLang === 'fr' || storedLang === 'en') return storedLang;

    // 3. Browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('en')) return 'en';

    // Default
    return 'fr';
  }

  /**
   * Change la langue du site
   * @param {string} lang - 'fr' ou 'en'
   */
  setLang(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    this.currentLang = lang;
    
    // Sauvegarde le choix pour la prochaine visite
    localStorage.setItem('site_lang', lang);
    
    // Met à jour l'URL sans recharger la page (utile pour le SEO)
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('lang', lang);
    window.history.pushState({}, '', newUrl);

    // Applique les changements visuels
    this.applyTranslations();
    this.updateSEO();
    this.updateActiveSwitcher();
    
    // Déclenche un événement pour les autres composants (rotator, etc.)
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  init() {
    // Vérifie si le DOM est déjà chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.applyTranslations();
        this.updateSEO();
        this.setupSwitcher();
      });
    } else {
      // Si le DOM est déjà chargé, applique directement les traductions
      this.applyTranslations();
      this.updateSEO();
      this.setupSwitcher();
    }
  }

  /**
   * Parcourt le DOM pour traduire tous les éléments avec [data-i18n]
   */
  applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][this.currentLang]) {
        // Cas particulier : Champs de formulaire (Placeholder)
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
           const placeholderKey = key + '.ph';
           if(translations[placeholderKey] && translations[placeholderKey][this.currentLang]) {
              el.setAttribute('placeholder', translations[placeholderKey][this.currentLang]);
           }
        } else {
           // Injection du texte ou HTML traduit
           el.innerHTML = translations[key][this.currentLang];
        }
      }
    });
  }

  updateSEO() {
    // 1. Balise HTML lang
    document.documentElement.lang = this.currentLang;

    // 2. Mettre à jour le <title> et meta description dynamiquement
    const path = window.location.pathname;
    let pageKey = "index";
    
    if (path.includes("services.html")) pageKey = "services";
    else if (path.includes("a-propos.html")) pageKey = "apropos";
    else if (path.includes("devis.html")) pageKey = "devis";
    else if (path.includes("contact.html")) pageKey = "contact";
    else if (path.includes("realisations.html")) pageKey = "realisations";
    else if (path.includes("temoignages.html")) pageKey = "temoignages";
    else if (path.includes("service-creation-site.html")) pageKey = "service-creation";
    else if (path.includes("service-tunnels-vente.html")) pageKey = "service-tunnels";
    else if (path.includes("service-refonte-site.html")) pageKey = "service-refonte";
    else if (path.includes("service-referencement-seo.html")) pageKey = "service-seo";
    else if (path.includes("service-suivi-accompagnement.html")) pageKey = "service-suivi";

    const titleKey = `seo.${pageKey}.title`;
    const descKey = `seo.${pageKey}.desc`;

    if (translations[titleKey] && translations[titleKey][this.currentLang]) {
      document.title = translations[titleKey][this.currentLang];
    }
    
    if (translations[descKey] && translations[descKey][this.currentLang]) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", translations[descKey][this.currentLang]);
      }
    }
  }

  setupSwitcher() {
    const switchers = document.querySelectorAll('.lang-switcher button');
    switchers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        this.setLang(lang);
      });
    });
    this.updateActiveSwitcher();
  }

  updateActiveSwitcher() {
    const switchers = document.querySelectorAll('.lang-switcher button');
    switchers.forEach(btn => {
      if (btn.getAttribute('data-lang') === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

// Initialisation globale
window.i18n = new I18nManager();
