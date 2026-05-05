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
  "footer.services.3": { "fr": "Landing page", "en": "Landing Pages" },
  "footer.services.4": { "fr": "Référencement SEO", "en": "SEO Optimization" },
  "footer.services.5": { "fr": "Audit & stratégie", "en": "Audit & Strategy" },
  "footer.agency": { "fr": "Agence", "en": "Agency" },
  "footer.start": { "fr": "Démarrer", "en": "Get Started" },
  "footer.start.text": { "fr": "Un projet en tête ? Parlons-en.", "en": "Have a project in mind? Let's talk." },
  "footer.btn.quote": { "fr": "Obtenir un devis", "en": "Get a Quote" },
  "footer.rights": { "fr": "Tous droits réservés. © 2026 Prime Impact Agency.", "en": "All rights reserved. © 2026 Prime Impact Agency." },

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
  "index.hero.badge": { "fr": "_L'Agence_des_Sites_qui_Vendent_", "en": "_The_Agency_For_Websites_That_Sell_" },
  "index.hero.title": { "fr": "Nous concevons des sites web qui ont le devoir de", "en": "We design websites that have a duty to" },
  "index.hero.rotator": { "fr": "vendre pour vous.", "en": "sell for you." },
  "index.hero.kw1": { "fr": "Stratégie", "en": "Strategy" },
  "index.hero.kw2": { "fr": "Développement", "en": "Development" },
  "index.hero.kw3": { "fr": "Performance", "en": "Performance" },
  "index.hero.cta": { "fr": "Démarrer mon projet", "en": "Start my project" },
  "index.hero.proof": { "fr": "Entrepreneurs accompagnés", "en": "Entrepreneurs supported" },
  "index.hero.float.title": { "fr": "Résultats Garantis", "en": "Guaranteed Results" },
  "index.hero.float.sub": { "fr": "Expertise 100% orientée ROI", "en": "100% ROI-focused expertise" },

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
  "index.methode.sub": { "fr": "Chaque projet suit un processus rigoureux pour garantir des résultats concrets et durables.", "en": "Every project follows a rigorous process to guarantee concrete and lasting results." },
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
  "index.resultats.sub": { "fr": "Des chiffres concrets obtenus pour nos clients.", "en": "Concrete figures achieved for our clients." },
  "index.resultats.1.label": { "fr": "Taux de conversion", "en": "Conversion Rate" },
  "index.resultats.1.desc": { "fr": "Augmentation moyenne du taux de conversion après refonte", "en": "Average conversion rate increase after redesign" },
  "index.resultats.2.label": { "fr": "Leads / mois", "en": "Leads / month" },
  "index.resultats.2.desc": { "fr": "Prospects générés chaque mois grâce aux tunnels de vente", "en": "Prospects generated every month thanks to sales funnels" },
  "index.resultats.3.label": { "fr": "Vitesse de chargement", "en": "Loading Speed" },
  "index.resultats.3.desc": { "fr": "Temps de chargement moyen de nos sites, optimisés Core Web Vitals", "en": "Average loading time of our sites, Core Web Vitals optimized" },
  "index.resultats.4.label": { "fr": "Trafic organique SEO", "en": "Organic SEO Traffic" },
  "index.resultats.4.desc": { "fr": "Augmentation du trafic naturel après optimisation SEO", "en": "Increase in natural traffic after SEO optimization" },

  // --- Index: Features ---
  "index.features.badge": { "fr": "_Pourquoi_nous_choisir_", "en": "_Why_choose_us_" },
  "index.features.title": { "fr": "Une agence pensée pour votre", "en": "An agency designed for your" },
  "index.features.title.hl": { "fr": "impact", "en": "impact" },
  "index.features.sub": { "fr": "Nous ne livrons pas juste un site — nous construisons une<br>machine à vendre, adaptée à vos ambitions.", "en": "We don't just deliver a site — we build a<br>selling machine, adapted to your ambitions." },
  "index.features.author.name": { "fr": "Schallom — Fondateur de PIA", "en": "Schallom — Founder of PIA" },
  "index.features.author.role": { "fr": "Webmaster & Expert en web marketing", "en": "Webmaster & Web Marketing Expert" },
  "index.features.author.quote": { "fr": "Notre objectif : comprendre vos besoins en<br>profondeur et vous accompagner de A à Z pour<br>obtenir des résultats concrets.", "en": "Our goal: to deeply understand your needs<br>and accompany you from A to Z to<br>achieve concrete results." },
  "index.features.1.title": { "fr": "Expertise technique", "en": "Technical Expertise" },
  "index.features.1.desc": { "fr": "WordPress, Shopify, WPFunnels, Cartflows, Omnisend — maîtrisés sur le bout des doigts pour des solutions sur-mesure.", "en": "WordPress, Shopify, WPFunnels, Cartflows, Omnisend — mastered for tailor-made solutions." },
  "index.features.2.title": { "fr": "Accompagnement A à Z", "en": "A to Z Support" },
  "index.features.2.desc": { "fr": "Stratégie, design, développement, automatisations marketing — une équipe de 3 experts à vos côtés à chaque étape.", "en": "Strategy, design, development, marketing automations — a team of 3 experts by your side at every step." },
  "index.features.3.title": { "fr": "Résultats concrets", "en": "Concrete Results" },
  "index.features.3.desc": { "fr": "Des sites qui convertissent, des tunnels de vente performants et des automatisations qui travaillent pour vous 24h/24.", "en": "Websites that convert, high-performing sales funnels, and automations working for you 24/7." },
  "index.metrics.1": { "fr": "entrepreneurs accompagnés avec succès", "en": "entrepreneurs successfully supported" },
  "index.metrics.2": { "fr": "experts dédiés à votre projet", "en": "dedicated experts for your project" },
  "index.metrics.3": { "fr": "des projets livrés sur-mesure", "en": "tailor-made projects delivered" },

  // --- Index: Skills ---
  "index.skills.badge": { "fr": "_MON_EXPERTISE_", "en": "_MY_EXPERTISE_" },
  "index.skills.title": { "fr": "Compétences que je maîtrise.", "en": "Skills I master." },
  "index.skills.sub": { "fr": "L'alliance parfaite entre maîtrise technique et savoir-être pour mener à bien vos projets.", "en": "The perfect blend of technical mastery and interpersonal skills to succeed in your projects." },
  "index.skills.hard": { "fr": "Compétences Techniques", "en": "Technical Skills" },
  "index.skills.soft": { "fr": "Soft Skills", "en": "Soft Skills" },

  // --- Index: Technical Skills (Hard Skills) ---
  "index.skills.wordpress": { "fr": "WordPress", "en": "WordPress" },
  "index.skills.wpfunnels": { "fr": "WPFunnels / Cartflows", "en": "WPFunnels / Cartflows" },
  "index.skills.automations": { "fr": "Automatisations (Omnisend, IA...)", "en": "Automations (Omnisend, AI...)" },
  "index.skills.shopify": { "fr": "Shopify", "en": "Shopify" },
  "index.skills.design": { "fr": "Figma / Framer / React / Flutter", "en": "Figma / Framer / React / Flutter" },
  "index.skills.seo": { "fr": "SEO", "en": "SEO" },
  "index.skills.web": { "fr": "HTML / CSS / JS / React", "en": "HTML / CSS / JS / React" },

  // --- Index: Soft Skills ---
  "index.skills.communication": { "fr": "Communication & Écoute", "en": "Communication & Listening" },
  "index.skills.problemsolving": { "fr": "Résolution de problèmes", "en": "Problem-solving" },
  "index.skills.timemanagement": { "fr": "Gestion du temps", "en": "Time Management" },
  "index.skills.adaptability": { "fr": "Adaptabilité", "en": "Adaptability" },

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
  "index.services.sub": { "fr": "Des solutions digitales sur-mesure, pensées pour la performance et la conversion.", "en": "Tailor-made digital solutions, designed for performance and conversion." },
  "index.services.1.title": { "fr": "Création de site web", "en": "Website Creation" },
  "index.services.1.desc": { "fr": "Sites vitrines, e-commerce ou sur-mesure, conçus pour convertir vos visiteurs en clients.", "en": "Showcase, e-commerce or tailor-made sites, designed to convert your visitors into clients." },
  "index.services.1.p1": { "fr": "Design unique et premium", "en": "Unique and premium design" },
  "index.services.1.p2": { "fr": "100% responsive mobile", "en": "100% mobile responsive" },
  "index.services.1.p3": { "fr": "Optimisé SEO dès la conception", "en": "SEO optimized from conception" },
  "index.services.2.title": { "fr": "Tunnels de vente", "en": "Sales Funnels" },
  "index.services.2.desc": { "fr": "Des funnels haute conversion qui capturent, qualifient et convertissent vos prospects automatiquement.", "en": "High-converting funnels that automatically capture, qualify, and convert your prospects." },
  "index.services.2.p1": { "fr": "WPFunnels & Cartflows", "en": "WPFunnels & Cartflows" },
  "index.services.2.p2": { "fr": "Email automation Omnisend", "en": "Omnisend email automation" },
  "index.services.2.p3": { "fr": "A/B testing inclus", "en": "A/B testing included" },
  "index.services.3.title": { "fr": "Référencement SEO", "en": "SEO Optimization" },
  "index.services.3.desc": { "fr": "Stratégie SEO complète pour dominer Google sur vos mots-clés cibles et générer du trafic qualifié.", "en": "Complete SEO strategy to dominate Google on your target keywords and generate qualified traffic." },
  "index.services.3.p1": { "fr": "Audit technique complet", "en": "Comprehensive technical audit" },
  "index.services.3.p2": { "fr": "Optimisation on-page & off-page", "en": "On-page & off-page optimization" },
  "index.services.3.p3": { "fr": "Reporting mensuel détaillé", "en": "Detailed monthly reporting" },
  "index.services.btn": { "fr": "Voir tous nos services →", "en": "See all our services →" },

  // --- Index: Realisations ---
  "index.realisations.badge": { "fr": "_NOS_RÉALISATIONS_", "en": "_OUR_PORTFOLIO_" },
  "index.realisations.title": { "fr": "Nos réalisations.", "en": "Our work." },
  "index.realisations.sub": { "fr": "Des projets concrets, des clients satisfaits, des résultats prouvés.", "en": "Concrete projects, satisfied clients, proven results." },
  "index.realisations.tag.ecom": { "fr": "E-commerce", "en": "E-commerce" },
  "index.realisations.tag.vitrine": { "fr": "Site vitrine", "en": "Showcase site" },
  "index.realisations.tag.landing": { "fr": "Landing page", "en": "Landing page" },
  "index.realisations.1.desc": { "fr": "Boutique Shopify haut de gamme avec tunnel de vente et automatisation email.", "en": "High-end Shopify store with sales funnel and email automation." },
  "index.realisations.2.desc": { "fr": "Site vitrine premium pour agence immobilière avec prise de RDV automatisée.", "en": "Premium showcase site for real estate agency with automated appointment booking." },
  "index.realisations.3.desc": { "fr": "Landing page ultra-optimisée pour une offre de coaching avec tunnel de conversion.", "en": "Ultra-optimized landing page for a coaching offer with conversion funnel." },
  "index.realisations.btn": { "fr": "Voir le projet →", "en": "View project →" },
  "index.realisations.allbtn": { "fr": "Voir toutes nos réalisations", "en": "See all our work" },

  // --- Index: Engagements ---
  "index.engagements.badge": { "fr": "_NOS_ENGAGEMENTS_", "en": "_OUR_COMMITMENTS_" },
  "index.engagements.title": { "fr": "Nos Engagements : Les garanties PIA.", "en": "Our Commitments: The PIA Guarantees." },
  "index.engagements.sub": { "fr": "Faire confiance à PIA, c'est s'assurer d'un service luxueux avec des garanties solides.", "en": "Trusting PIA means ensuring a luxurious service with solid guarantees." },
  "index.engagements.1.title": { "fr": "Sur-mesure absolu", "en": "Absolute tailor-made" },
  "index.engagements.1.desc": { "fr": "Aucun template générique n'est utilisé. Chaque design est unique et pensé pour votre marque.", "en": "No generic templates are used. Every design is unique and created for your brand." },
  "index.engagements.2.title": { "fr": "Livraison Rapide", "en": "Fast Delivery" },
  "index.engagements.2.desc": { "fr": "Des projets livrés entre 7 et 21 jours selon la complexité, sans aucun compromis sur la qualité.", "en": "Projects delivered between 7 and 21 days depending on complexity, without compromising quality." },
  "index.engagements.3.title": { "fr": "Approche Mobile-First", "en": "Mobile-First Approach" },
  "index.engagements.3.desc": { "fr": "Des sites pensés avant tout pour la navigation sur smartphone, là où se trouvent la majorité des utilisateurs.", "en": "Sites designed primarily for smartphone navigation, where the majority of users are." },
  "index.engagements.4.title": { "fr": "SEO Intégré", "en": "Integrated SEO" },
  "index.engagements.4.desc": { "fr": "Les bonnes pratiques de référencement (SEO) sont appliquées dès la première ligne de code.", "en": "Good SEO practices are applied from the very first line of code." },
  "index.engagements.5.title": { "fr": "Support Post-Lancement", "en": "Post-Launch Support" },
  "index.engagements.5.desc": { "fr": "30 jours d'accompagnement inclus après la mise en ligne pour s'assurer que tout fonctionne parfaitement.", "en": "30 days of support included after going live to ensure everything works perfectly." },
  "index.engagements.6.title": { "fr": "Résultats Garantis", "en": "Guaranteed Results" },
  "index.engagements.6.desc": { "fr": "Un focus absolu sur le ROI (Retour Sur Investissement) et le suivi des métriques de conversion.", "en": "Absolute focus on ROI (Return on Investment) and tracking conversion metrics." },

  // --- Index: Témoignages ---
  "index.temoignages.badge": { "fr": "_TÉMOIGNAGES_", "en": "_TESTIMONIALS_" },
  "index.temoignages.title": { "fr": "Ils nous font confiance.", "en": "They trust us." },
  "index.temoignages.sub": { "fr": "Des entrepreneurs qui ont transformé leur présence digitale avec Prime Impact Agency.", "en": "Entrepreneurs who transformed their digital presence with Prime Impact Agency." },

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
  "services.hero.sub": { "fr": "Des solutions digitales complètes pour attirer, convertir et fidéliser vos clients.", "en": "Complete digital solutions to attract, convert and retain your clients." },
  
  "services.cat1.title": { "fr": "Création & Refonte", "en": "Creation & Redesign" },
  "services.cat1.sub": { "fr": "Des fondations solides et un design qui reflète votre excellence.", "en": "Solid foundations and a design that reflects your excellence." },
  
  "services.web.title": { "fr": "Création de site internet", "en": "Website creation" },
  "services.web.desc": { "fr": "Des sites élégants, structurés et sur-mesure pour asseoir la crédibilité et l'image de marque de votre entreprise.", "en": "Elegant, structured and tailor-made sites to establish the credibility and brand image of your company." },
  "services.web.p1": { "fr": "Design unique pensé pour votre image", "en": "Unique design tailored to your brand" },
  "services.web.p2": { "fr": "100% responsive mobile & tablette", "en": "100% responsive for mobile & tablet" },
  "services.web.p3": { "fr": "Optimisation SEO on-page incluse", "en": "On-page SEO optimization included" },
  
  "services.redesign.title": { "fr": "Refonte de site web", "en": "Website redesign" },
  "services.redesign.desc": { "fr": "Modernisation complète et repositionnement digital pour les sites vieillissants qui ne reflètent plus la qualité de l'entreprise.", "en": "Complete modernization and digital repositioning for aging sites that no longer reflect the company's quality." },
  "services.redesign.p1": { "fr": "Audit complet de l'existant", "en": "Complete audit of the existing site" },
  "services.redesign.p2": { "fr": "Nouveau design & UX améliorée", "en": "New design & improved UX" },
  "services.redesign.p3": { "fr": "Conservation du SEO existant", "en": "Preservation of existing SEO" },
  
  "services.cat2.title": { "fr": "Acquisition & Conversion", "en": "Acquisition & Conversion" },
  "services.cat2.sub": { "fr": "Des systèmes pensés pour attirer des visiteurs et les transformer en clients.", "en": "Systems designed to attract visitors and turn them into clients." },
  
  "services.funnel.title": { "fr": "Tunnel de vente (Funnels)", "en": "Sales Funnel (Funnels)" },
  "services.funnel.desc": { "fr": "Des systèmes automatisés (pages d'offre, upsell, downsell) pour guider le visiteur jusqu'à l'achat de manière fluide.", "en": "Automated systems (offer pages, upsell, downsell) to guide the visitor smoothly to purchase." },
  "services.funnel.p1": { "fr": "Stratégie funnel personnalisée", "en": "Personalized funnel strategy" },
  "services.funnel.p2": { "fr": "Intégration WPFunnels / Cartflows", "en": "WPFunnels / Cartflows integration" },
  "services.funnel.p3": { "fr": "Automatisation email Omnisend", "en": "Omnisend email automation" },
  
  "services.landing.title": { "fr": "Landing Page", "en": "Landing Page" },
  "services.landing.desc": { "fr": "Des pages d'atterrissage à fort impact visuel, dotées d'un copywriting persuasif pour générer des leads ou des ventes.", "en": "High-impact landing pages with persuasive copywriting to generate leads or sales." },
  "services.landing.p1": { "fr": "Copywriting orienté conversion", "en": "Conversion-oriented copywriting" },
  "services.landing.p2": { "fr": "Formulaire de capture optimisé", "en": "Optimized capture form" },
  "services.landing.p3": { "fr": "Compatible Google Ads / Meta Ads", "en": "Compatible with Google Ads / Meta Ads" },
  
  "services.seo.title": { "fr": "Référencement Naturel (SEO)", "en": "Organic SEO" },
  "services.seo.desc": { "fr": "Optimisation technique et sémantique pour être visible durablement sur Google et attirer un trafic qualifié.", "en": "Technical and semantic optimization to be sustainably visible on Google and attract qualified traffic." },
  "services.seo.p1": { "fr": "Recherche de mots-clés stratégiques", "en": "Strategic keyword research" },
  "services.seo.p2": { "fr": "Optimisation technique & on-page", "en": "Technical & on-page optimization" },
  "services.seo.p3": { "fr": "Netlinking & backlinks", "en": "Netlinking & backlinks" },
  
  "services.cat3.title": { "fr": "Stratégie & Accompagnement", "en": "Strategy & Support" },
  "services.cat3.sub": { "fr": "Nous ne vous laissons jamais seul après le lancement.", "en": "We never leave you alone after the launch." },
  
  "services.audit.title": { "fr": "Audit & Stratégie Digitale", "en": "Digital Audit & Strategy" },
  "services.audit.desc": { "fr": "Analyse approfondie de la présence en ligne (diagnostic UX, structure) pour fournir un plan d'optimisation clair.", "en": "In-depth analysis of online presence (UX diagnosis, structure) to provide a clear optimization plan." },
  "services.audit.p1": { "fr": "Audit SEO technique complet", "en": "Comprehensive technical SEO audit" },
  "services.audit.p2": { "fr": "Analyse UX & taux de conversion", "en": "UX & conversion rate analysis" },
  "services.audit.p3": { "fr": "Plan d'action prioritaire", "en": "Priority action plan" },
  
  "services.support.title": { "fr": "Suivi & Accompagnement", "en": "Follow-up & Support" },
  "services.support.desc": { "fr": "Un support continu après le lancement, garantissant sérénité, maintenance et conseils stratégiques.", "en": "Continuous support after launch, ensuring peace of mind, maintenance and strategic advice." },
  "services.support.p1": { "fr": "Maintenance technique mensuelle", "en": "Monthly technical maintenance" },
  "services.support.p2": { "fr": "Mises à jour & sécurité", "en": "Updates & security" },
  "services.support.p3": { "fr": "Support prioritaire WhatsApp", "en": "Priority WhatsApp support" },
  
  "services.btn.quote": { "fr": "Demander un devis", "en": "Request a quote" },
  
  "services.process.badge": { "fr": "_PROCESSUS_", "en": "_PROCESS_" },
  "services.process.title": { "fr": "De la vision au lancement,<br>en", "en": "From vision to launch,<br>in" },
  "services.process.title.hl": { "fr": "4 étapes", "en": "4 steps" },
  "services.process.sub": { "fr": "Un processus transparent et structuré pour un résultat final irréprochable.", "en": "A transparent and structured process for a flawless final result." },
  "services.process.1.title": { "fr": "Découverte & Stratégie", "en": "Discovery & Strategy" },
  "services.process.1.desc": { "fr": "Nous analysons votre marché, vos objectifs et concevons l'architecture et la stratégie de conversion idéale.", "en": "We analyze your market, your goals and design the ideal architecture and conversion strategy." },
  "services.process.2.title": { "fr": "UX / UI Design", "en": "UX / UI Design" },
  "services.process.2.desc": { "fr": "Création de maquettes haute fidélité. Nous validons ensemble l'aspect visuel avant toute ligne de code.", "en": "Creation of high-fidelity mockups. We validate the visual aspect together before any code is written." },
  "services.process.3.title": { "fr": "Développement", "en": "Development" },
  "services.process.3.desc": { "fr": "Intégration pixel-perfect, développement technique fluide et optimisation complète des performances.", "en": "Pixel-perfect integration, smooth technical development and complete performance optimization." },
  "services.process.4.title": { "fr": "Lancement & Formation", "en": "Launch & Training" },
  "services.process.4.desc": { "fr": "Tests finaux, mise en ligne officielle et formation pour vous rendre 100% autonome sur votre outil.", "en": "Final tests, official go-live and training to make you 100% autonomous on your tool." },
  
  "services.cta.title": { "fr": "Vous ne savez pas lequel choisir ?", "en": "Not sure which one to choose?" },
  "services.cta.sub": { "fr": "Décrivez-nous votre projet, on vous recommande la solution idéale — sans engagement.", "en": "Describe your project to us, we will recommend the ideal solution — without commitment." },
  "services.cta.btn": { "fr": "Obtenir un devis gratuit", "en": "Get a free quote" },

  // ============================================================
  // A-PROPOS.HTML
  // ============================================================
  "about.hero.badge": { "fr": "Notre histoire", "en": "Our history" },
  "about.hero.title1": { "fr": "À propos de", "en": "About" },
  "about.hero.sub": { "fr": "Une agence fondée sur une conviction simple : un bon site web doit travailler pour vous, pas juste vous représenter.", "en": "An agency founded on a simple conviction: a good website should work for you, not just represent you." },
  
  "about.history.badge": { "fr": "_Notre_histoire_", "en": "_Our_history_" },
  "about.history.title": { "fr": "De la passion au métier.", "en": "From passion to profession." },
  "about.history.p1": { "fr": "Prime Impact Agency est née d'une observation simple de son fondateur, <strong>Schallom</strong> : beaucoup de sites existent, mais très peu vendent réellement. Trop d'entrepreneurs voient leurs visiteurs repartir sans jamais cliquer.", "en": "Prime Impact Agency was born from a simple observation by its founder, <strong>Schallom</strong>: many sites exist, but very few actually sell. Too many entrepreneurs see their visitors leave without ever clicking." },
  "about.history.p2": { "fr": "La mission de PIA est de transformer ces sites obsolètes en <strong>véritables machines d'acquisition digitales</strong>. Nous allions esthétique premium et stratégie d'acquisition pour générer de la croissance.", "en": "PIA's mission is to transform these obsolete sites into <strong>true digital acquisition machines</strong>. We combine premium aesthetics and acquisition strategy to generate growth." },
  "about.history.p3": { "fr": "Aujourd'hui, PIA repose sur l'excellence d'un trio passionné : <strong>Schallom, Jeffried et Donné</strong>, unissant leurs compétences en Stratégie, Design et Développement.", "en": "Today, PIA is based on the excellence of a passionate trio: <strong>Schallom, Jeffried, and Donné</strong>, uniting their skills in Strategy, Design, and Development." },
  
  "about.metrics.team": { "fr": "Dans l'équipe", "en": "In the team" },
  "about.metrics.custom": { "fr": "Sur-mesure", "en": "Tailor-made" },
  
  "about.team.badge": { "fr": "_NOTRE_ÉQUIPE_", "en": "_OUR_TEAM_" },
  "about.team.title": { "fr": "L'équipe derrière vos succès.", "en": "The team behind your success." },
  "about.team.sub": { "fr": "3 experts aux compétences complémentaires dédiés à votre réussite.", "en": "3 experts with complementary skills dedicated to your success." },
  
  "about.team.1.tag": { "fr": "Stratégie & Management", "en": "Strategy & Management" },
  "about.team.1.role": { "fr": "Fondateur", "en": "Founder" },
  "about.team.1.bio": { "fr": "Visionnaire de l'agence, Schallom pilote les projets de A à Z. Expert en web marketing, il s'assure que chaque site devienne une véritable machine d'acquisition.", "en": "Visionary of the agency, Schallom pilots projects from A to Z. Web marketing expert, he ensures that every site becomes a true acquisition machine." },
  
  "about.team.2.tag": { "fr": "Code & Architecture", "en": "Code & Architecture" },
  "about.team.2.role": { "fr": "Expert Technique", "en": "Technical Expert" },
  "about.team.2.bio": { "fr": "Architecte du web, Jeffried crée des bases solides, sécurisées et ultra-rapides. Maître du Front-end et Back-end, rien ne résiste à son code robuste.", "en": "Web architect, Jeffried creates solid, secure, and ultra-fast foundations. Master of Front-end and Back-end, nothing resists his robust code." },
  
  "about.team.3.tag": { "fr": "UI/UX & Branding", "en": "UI/UX & Branding" },
  "about.team.3.role": { "fr": "Expert Créatif", "en": "Creative Expert" },
  "about.team.3.bio": { "fr": "L'œil artistique de PIA. Donné transforme vos idées en interfaces intuitives, esthétiques et pensées pour séduire et convertir chaque visiteur.", "en": "PIA's artistic eye. Donné transforms your ideas into intuitive, aesthetic interfaces designed to seduce and convert every visitor." },
  
  "about.skills.title": { "fr": "Compétences & Outils", "en": "Skills & Tools" },
  "about.skills.sub": { "fr": "Notre stack technique au service de vos projets.", "en": "Our tech stack at the service of your projects." },
  "about.skills.soft1": { "fr": "Communication & Écoute", "en": "Communication & Listening" },
  "about.skills.soft2": { "fr": "Résolution de problèmes", "en": "Problem solving" },
  "about.skills.soft3": { "fr": "Gestion du temps", "en": "Time management" },
  "about.skills.soft4": { "fr": "Adaptabilité", "en": "Adaptability" },
  
  "about.values.title": { "fr": "Mission & Valeurs", "en": "Mission & Values" },
  "about.values.sub": { "fr": "Ce qui guide chacun de nos projets.", "en": "What guides each of our projects." },
  "about.values.1.title": { "fr": "Notre mission", "en": "Our mission" },
  "about.values.1.desc": { "fr": "Aider les entrepreneurs et PME à exploiter tout le potentiel du digital pour attirer plus de clients, automatiser leur croissance et bâtir une marque forte.", "en": "To help entrepreneurs and SMEs exploit the full potential of digital to attract more clients, automate their growth, and build a strong brand." },
  "about.values.2.title": { "fr": "Transparence", "en": "Transparency" },
  "about.values.2.desc": { "fr": "Pas de jargon inutile, pas de frais cachés. On vous explique tout, on justifie chaque choix et on vous rend autonome sur votre propre outil.", "en": "No useless jargon, no hidden fees. We explain everything, justify each choice, and make you autonomous on your own tool." },
  "about.values.3.title": { "fr": "Excellence", "en": "Excellence" },
  "about.values.3.desc": { "fr": "On ne sort pas un projet dont on n'est pas fiers. Chaque ligne de code, chaque pixel, chaque mot est pensé pour maximiser votre impact.", "en": "We don't release a project we aren't proud of. Every line of code, every pixel, every word is designed to maximize your impact." },
  
  "about.cta.title": { "fr": "Travaillons ensemble.", "en": "Let's work together." },
  "about.cta.sub": { "fr": "Votre projet mérite une équipe engagée et des résultats concrets.", "en": "Your project deserves a committed team and concrete results." },

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
  "contact.info.loc.val": { "fr": "France (remote)", "en": "France (remote)" },
  "contact.info.loc.sub": { "fr": "On travaille avec toute la France", "en": "We work with all of France" },
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
  "contact.error.req": { "fr": "Ce champ est requis", "en": "This field is required" },
  "contact.error.email": { "fr": "Email invalide", "en": "Invalid email" },
  "contact.error.sub": { "fr": "Veuillez choisir un sujet", "en": "Please choose a subject" },
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
  "testi.hero.sub": { "fr": "Des résultats concrets, des entrepreneurs satisfaits. Voici leurs retours.", "en": "Concrete results, satisfied entrepreneurs. Here is their feedback." },
  
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
