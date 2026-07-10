/* ============================================================
   CHAT KNOWLEDGE BASE v2 — Moteur IA complet pour PIA
   Répond à TOUTES les questions simples des visiteurs
   ============================================================ */

const CONTACT = {
  whatsapp: 'https://wa.me/22993288212',
  whatsappNum: '+229 93 28 82 12',
  email: 'contact@primeimpactagency.com',
  site: 'https://primeimpactagency.com',
  facebook: 'https://www.facebook.com/share/196KYqfDUw/',
  linkedin: 'https://www.linkedin.com/in/schallom-sogbossi-4a6040322',
};

// ─── Normalisation ──────────────────────────────────────────
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Score-based intent detection ───────────────────────────
// Chaque intention a des mots-clés pondérés. Celle qui a le
// meilleur score gagne. Ça permet de gérer les questions
// qui contiennent plusieurs intentions.
function detectIntent(text) {
  const n = normalize(text);

  // Réponses rapides (pas besoin de scoring)
  if (/^(bonjour|salut|hello|hey|coucou|bonsoir|bjr|slt|bonjour pia|salut pia|bonsoir pia)\s*[!.?]*$/.test(n)) return 'greeting';
  if (/^(merci|thanks|super|parfait|genial|ok|cool|excellent|merci beaucoup|ok merci|c bon|c'est bon|noted|compris|d'accord)\s*[!.?]*$/.test(n)) return 'thanks';
  if (/^(aide|help|menu|options|que sais tu|que peux tu|quoi d'autre|autre chose)\s*[!.?]*$/.test(n)) return 'help_menu';

  // Scores par intention
  const scores = {};

  // --- Demande d'humain ---
  const humanKw = ['humain', 'parler a quelqu\'un', 'un conseiller', 'un agent', 'un responsable', 'parler a un humain', 'personne reel', 'real person', 'human', 'operator', 'someone', 'speak to'];
  humanKw.forEach(k => { if (n.includes(k)) scores.human_request = (scores.human_request || 0) + 10; });

  // --- Tarifs / Prix ---
  const priceKw = ['prix', 'tarif', 'cout', 'coute', 'combien', 'budget', 'cher', 'tarifs', 'coutent', 'couter', 'coupe', 'cout', 'pricing', 'price', 'how much', 'cost', 'fcfa', 'euro', 'euros', 'millier', 'million', 'millions'];
  priceKw.forEach(k => { if (n.includes(k)) scores.pricing = (scores.pricing || 0) + 10; });

  // --- Création de site ---
  const websiteKw = ['site web', 'site internet', 'creation de site', 'creer un site', 'website', 'landing page', 'page web', 'page d\'accueil', 'page d\'accueil', 'page vitrine', 'site vitrine', 'site e-commerce', 'ecommerce', 'site one page', 'one page'];
  websiteKw.forEach(k => { if (n.includes(k)) scores.service_website = (scores.service_website || 0) + 10; });

  // --- Tunnel de vente ---
  const funnelKw = ['tunnel', 'funnel', 'tunnel de vente', 'conversion', 'lead', 'parcours client', 'page de vente', 'sales page', 'page de capture', 'squeeze page', 'webinaire', 'email marketing', 'sequence email', 'sequence d\'email'];
  funnelKw.forEach(k => { if (n.includes(k)) scores.service_funnel = (scores.service_funnel || 0) + 10; });

  // --- SEO ---
  const seoKw = ['seo', 'referencement', 'referencement naturel', 'google', 'ranking', 'positionnement', 'premiere page', 'premiere page google', 'page 1', 'page 2', 'visibilite', 'trafic organique', 'optimisation seo', 'audit seo', ' mots cles', 'search engine'];
  seoKw.forEach(k => { if (n.includes(k)) scores.service_seo = (scores.service_seo || 0) + 10; });

  // --- Refonte ---
  const redesignKw = ['refonte', 'redesign', 'moderniser', 'renover', 'ameliorer mon site', 'upgrade', 'ameliorer', 'nouveau design', 'design moderne', 'rafraichir', 'metre a jour', 'update site'];
  redesignKw.forEach(k => { if (n.includes(k)) scores.service_redesign = (scores.service_redesign || 0) + 10; });

  // --- Suivi / Maintenance ---
  const supportKw = ['suivi', 'accompagnement', 'maintenance', 'support', 'aide technique', 'bug', 'panne', 'probleme technique', 'site est tombe', 'ne marche plus', 'erreur', 'update', 'mise a jour', 'hebergement', 'hosting', 'serveur', 'monitoring'];
  supportKw.forEach(k => { if (n.includes(k)) scores.service_support = (scores.service_support || 0) + 10; });

  // --- Services général ---
  const servicesKw = ['service', 'offre', 'prestation', 'proposez', 'faites', 'solutions', 'que proposez', 'que faites', 'vos services', 'vos offres', 'que peux', 'savoir faire', 'competences', 'expertise', 'specialites'];
  servicesKw.forEach(k => { if (n.includes(k)) scores.services_general = (scores.services_general || 0) + 8; });

  // --- Processus / Délais ---
  const processKw = ['processus', 'demarche', 'etape', 'comment ca marche', 'fonctionnement', 'workflow', 'delai', 'temps', 'duree', 'combien de temps', 'rapidement', 'vite', 'deadline', 'calendrier', 'planning', 'urgent', 'rapidite', 'promptement'];
  processKw.forEach(k => { if (n.includes(k)) scores.process = (scores.process || 0) + 10; });

  // --- Technologies ---
  const techKw = ['technologie', 'tech', 'framework', 'react', 'next', 'wordpress', 'php', 'node', 'outils', 'stack', 'langage', 'html', 'css', 'javascript', 'typescript', 'angular', 'vue', 'svelte', 'laravel', 'django', 'python', 'ruby', 'shopify', 'woocommerce', 'prestashop', 'wix', 'squarespace', 'webflow'];
  techKw.forEach(k => { if (n.includes(k)) scores.technologies = (scores.technologies || 0) + 10; });

  // --- À propos ---
  const aboutKw = ['qui etes', 'qui es tu', 'qui sommes', 'a propos', 'presentation', 'presentation', 'equipe', 'agence', 'pia', 'prime impact', 'schallom', 'sogbossi', 'fondateur', 'qui c\'est', 'vous etes qui', 'parlez moi de vous', 'racontez moi'];
  aboutKw.forEach(k => { if (n.includes(k)) scores.about = (scores.about || 0) + 10; });

  // --- Contact ---
  const contactKw = ['contact', 'telephone', 'email', 'mail', 'adresse', 'whatsapp', 'appeler', 'joindre', 'reachable', 'numero', 'tel', 'sms', 'whatsapp'];
  contactKw.forEach(k => { if (n.includes(k)) scores.contact = (scores.contact || 0) + 10; });

  // --- Horaires ---
  const hoursKw = ['heure', 'horaire', 'ouvert', 'ferme', 'disponible', 'quand', 'jours', 'weekend', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche', 'travaillez', 'working hours', 'schedule', 'disponibilite'];
  hoursKw.forEach(k => { if (n.includes(k)) scores.hours = (scores.hours || 0) + 10; });

  // --- Portfolio ---
  const portfolioKw = ['realisation', 'portfolio', 'projet', 'exemple', 'client', 'travaux', 'showcase', 'showreel', 'travaux passes', 'avez vous', 'avez-vous', 'montrez', 'voyons', 'galerie'];
  portfolioKw.forEach(k => { if (n.includes(k)) scores.portfolio = (scores.portfolio || 0) + 10; });

  // --- Blog ---
  const blogKw = ['blog', 'article', 'tutorial', 'tutoriel', 'guide', 'conseil', 'astuce', 'tips', 'ressource', 'formation', 'apprendre', 'documentation'];
  blogKw.forEach(k => { if (n.includes(k)) scores.blog = (scores.blog || 0) + 8; });

  // --- Devis ---
  const devisKw = ['devis', 'soumission', 'estimation', 'proposition', 'devis gratuit', 'quote', 'estimate', 'offre de prix', 'proposition commerciale'];
  devisKw.forEach(k => { if (n.includes(k)) scores.devis = (scores.devis || 0) + 10; });

  // --- SaaS / App ---
  const saasKw = ['saas', 'application', 'app', 'logiciel', 'plateforme', 'mvp', 'minimum viable', 'startup', 'produit digital', 'produit numerique', 'logiciel sur mesure', 'application web', 'application mobile', 'mobile app'];
  saasKw.forEach(k => { if (n.includes(k)) scores.saas = (scores.saas || 0) + 10; });

  // --- WordPress spécifique ---
  const wpKw = ['wordpress', 'wp', 'elementor', 'divi', 'theme wordpress', 'plugin', 'blog wordpress', 'site wordpress'];
  wpKw.forEach(k => { if (n.includes(k)) scores.wordpress = (scores.wordpress || 0) + 10; });

  // --- E-commerce ---
  const ecomKw = ['e-commerce', 'ecommerce', 'boutique en ligne', 'boutique en ligne', 'shopify', 'woocommerce', 'prestashop', 'vendre en ligne', 'vente en ligne', 'produit', 'catalogue', 'paiement', 'stripe', 'paypal', 'panier', 'cart'];
  ecomKw.forEach(k => { if (n.includes(k)) scores.ecommerce = (scores.ecommerce || 0) + 10; });

  // --- Réseaux sociaux ---
  const socialKw = ['reseau social', 'reseaux sociaux', 'social media', 'facebook', 'instagram', 'tiktok', 'twitter', 'linkedin', 'youtube', 'publicite', 'pub', 'ads', 'campagne', 'community management', 'social media marketing'];
  socialKw.forEach(k => { if (n.includes(k)) scores.social_media = (scores.social_media || 0) + 10; });

  // --- Email marketing ---
  const emailKw = ['email marketing', 'newsletter', 'mailchimp', 'brevo', 'sendinblue', 'email automation', 'sequence email', 'email campagne', 'campagne email', 'newsletters'];
  emailKw.forEach(k => { if (n.includes(k)) scores.email_marketing = (scores.email_marketing || 0) + 10; });

  // --- Design / UI-UX ---
  const designKw = ['design', 'ui', 'ux', 'interface', 'maquette', 'mockup', 'figma', 'photoshop', 'illustration', 'charte graphique', 'logo', 'branding', 'identite visuelle', 'identite de marque', 'brand identity', 'design graphique'];
  designKw.forEach(k => { if (n.includes(k)) scores.design = (scores.design || 0) + 10; });

  // --- Analytics ---
  const analyticsKw = ['analytics', 'google analytics', 'ga4', 'stats', 'statistiques', 'mesure', 'tracking', 'pixel', 'meta pixel', 'facebook pixel', 'conversion', 'kpi', 'metrique', 'rapport', 'dashboard', 'donnee', 'donnees', 'data'];
  analyticsKw.forEach(k => { if (n.includes(k)) scores.analytics = (scores.analytics || 0) + 10; });

  // --- Localisation ---
  const locationKw = ['ou etes', 'ou etes vous', 'localisation', 'bureau', 'adresse', 'ou travaillez', 'ou sont vos bureaux', 'benin', 'togo', 'nigeria', 'africa', 'ou est', 'base', 'situe', 'geographique'];
  locationKw.forEach(k => { if (n.includes(k)) scores.location = (scores.location || 0) + 10; });

  // --- Types de clients ---
  const clientKw = ['type de client', 'client type', 'avec qui travaillez', 'qui sont vos clients', 'entreprise', 'startup', 'pme', 'tpe', 'entrepreneur', 'independant', 'freelance', 'grande entreprise', 'ong', 'association', 'immobilier', 'coaching', 'sante', 'education', 'restaurant', 'commerce'];
  clientKw.forEach(k => { if (n.includes(k)) scores.clients = (scores.clients || 0) + 10; });

  // --- Concurrence / Comparaison ---
  const compKw = ['concurrent', 'concurrence', 'difference', 'comparer', 'pourquoi vous', 'pourquoi pia', 'pourquoi pas', 'avantage', 'atout', 'mieux que', 'superieur', 'recommandez', 'meilleur', 'best'];
  compKw.forEach(k => { if (n.includes(k)) scores.comparison = (scores.comparison || 0) + 10; });

  // --- Questions fermées (oui/non) ---
  const yesNoKw = ['est ce que', 'est-ce que', 'pouvez vous', 'pouvez-vous', 'faites vous', 'faites-vous', 'acceptez', 'pouvez', 'etes vous en mesure', 'c possible', 'c\'est possible', 'est ce possible', 'est-ce possible'];
  yesNoKw.forEach(k => { if (n.includes(k)) scores.yes_no = (scores.yes_no || 0) + 5; });

  // Trouver la meilleure intention
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sorted.length > 0 && sorted[0][1] >= 10) {
    return sorted[0][0];
  }

  // Fallback: chercher des indices contextuels dans le texte
  // Si le texte parle du web/digital de manière générale
  const webDigitalKw = ['web', 'internet', 'digital', 'en ligne', 'online', 'site', 'net', 'techno', 'informatique', 'ordinateur', 'ordinateur', 'appli', 'programmation', 'developpement', 'code'];
  if (webDigitalKw.some(k => n.includes(k))) return 'web_general';

  return 'unknown';
}

// ─── Génération de réponse ──────────────────────────────────
function generateResponse(text, lang) {
  const intent = detectIntent(text);
  const isEn = lang === 'en';

  const R = {};

  // ── Salutations ──
  R.greeting = isEn
    ? 'Hello! Welcome to Prime Impact Agency. I\'m here to help you with any questions about our services, pricing, or anything web & digital. What would you like to know?'
    : 'Bonjour ! Bienvenue sur Prime Impact Agency. Je suis l\'assistant virtuel de PIA. Je peux répondre à toutes vos questions sur nos services, nos tarifs, ou tout ce qui concerne le web et le digital. Comment puis-je vous aider ?';

  // ── Merci ──
  R.thanks = isEn
    ? 'You\'re welcome! Feel free to ask anything else. I\'m here to help!'
    : 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.';

  // ── Menu d'aide ──
  R.help_menu = isEn
    ? 'Here\'s what I can help you with:\n\n'
      + '• Our services (websites, funnels, SEO...)\n'
      + '• Pricing & quotes\n'
      + '• How we work\n'
      + '• Web & digital questions\n'
      + '• Contact information\n\n'
      + 'Just ask your question!'
    : 'Voici ce que je peux faire pour vous :\n\n'
      + '• Nos services (sites web, tunnels, SEO...)\n'
      + '• Nos tarifs & devis\n'
      + '• Notre méthode de travail\n'
      + '• Questions sur le web & le digital\n'
      + '• Nos coordonnées\n\n'
      + 'Posez-moi simplement votre question !';

  // ── Demande d'humain ──
  R.human_request = isEn
    ? 'Of course! I\'ll connect you with our team directly:'
    : 'Bien sûr ! Je vous mets en contact avec notre équipe :';

  // ── Tarifs ──
  R.pricing = isEn
    ? 'Here are our general price ranges:\n\n'
      + '• Website creation: from 150,000 FCFA\n'
      + '• Sales funnel: from 200,000 FCFA\n'
      + '• SEO optimization: from 100,000 FCFA/month\n'
      + '• Website redesign: from 120,000 FCFA\n'
      + '• SaaS / Web App: from 500,000 FCFA\n'
      + '• Landing page: from 80,000 FCFA\n\n'
      + 'The price depends on the complexity, features and your specific needs. For an accurate quote, contact us:'
    : 'Voici nos fourchettes de prix :\n\n'
      + '• Création de site web : à partir de 150 000 FCFA\n'
      + '• Tunnel de vente : à partir de 200 000 FCFA\n'
      + '• Référencement SEO : à partir de 100 000 FCFA/mois\n'
      + '• Refonte de site web : à partir de 120 000 FCFA\n'
      + '• SaaS / Application web : à partir de 500 000 FCFA\n'
      + '• Landing page : à partir de 80 000 FCFA\n\n'
      + 'Le prix dépend de la complexité, des fonctionnalités et de vos besoins spécifiques. Pour un devis précis, contactez-nous :';

  // ── Création de site ──
  R.service_website = isEn
    ? 'We create high-performance, modern websites:\n\n'
      + '• Responsive design (mobile, tablet, desktop)\n'
      + '• Optimized for conversions & sales\n'
      + '• Fast loading (under 3 seconds)\n'
      + '• SEO-friendly architecture\n'
      + '• Custom or CMS (WordPress, etc.)\n'
      + '• Contact forms, maps, social integration\n\n'
      + 'Types of sites we build:\n'
      + '• Corporate / showcase sites\n'
      + '• Landing pages\n'
      + '• E-commerce (online stores)\n'
      + '• Blogs\n\n'
      + 'Want a free quote? Contact us:'
    : 'Nous créons des sites web performants et modernes :\n\n'
      + '• Design responsive (mobile, tablette, desktop)\n'
      + '• Optimisé pour les conversions et les ventes\n'
      + '• Chargement rapide (moins de 3 secondes)\n'
      + '• Architecture SEO-friendly\n'
      + '• Sur mesure ou avec CMS (WordPress, etc.)\n'
      + '• Formulaires de contact, cartes, réseaux sociaux\n\n'
      + 'Types de sites que nous créons :\n'
      + '• Sites vitrine / corporate\n'
      + '• Landing pages\n'
      + '• E-commerce (boutiques en ligne)\n'
      + '• Blogs\n\n'
      + 'Vous voulez un devis gratuit ? Contactez-nous :';

  // ── Tunnel de vente ──
  R.service_funnel = isEn
    ? 'A sales funnel is a sequence of pages that guides visitors toward a purchase. Here\'s what we build:\n\n'
      + '• Landing pages optimized for conversion\n'
      + '• Lead capture pages (squeeze pages)\n'
      + '• Sales pages with persuasive copy\n'
      + '• Automated email sequences\n'
      + '• A/B testing to improve results\n'
      + '• Analytics & tracking (ROI, conversions)\n\n'
      + 'Perfect for: coaches, info-products, startups, e-commerce.\n'
      + 'Want to boost your sales? Contact us:'
    : 'Un tunnel de vente est une séquence de pages qui guide le visiteur vers l\'achat. Voici ce que nous construisons :\n\n'
      + '• Landing pages optimisées pour la conversion\n'
      + '• Pages de capture de leads (squeeze pages)\n'
      + '• Pages de vente avec copywriting persuasif\n'
      + '• Séquences d\'emails automatisées\n'
      + '• A/B testing pour améliorer les résultats\n'
      + '• Analytics & tracking (ROI, conversions)\n\n'
      + 'Idéal pour : coaches, produits info, startups, e-commerce.\n'
      + 'Vous voulez booster vos ventes ? Contactez-nous :';

  // ── SEO ──
  R.service_seo = isEn
    ? 'SEO (Search Engine Optimization) helps your website rank higher on Google. Here\'s what we do:\n\n'
      + '• Complete SEO audit of your site\n'
      + '• Keyword research & strategy\n'
      + '• On-page optimization (titles, meta, content)\n'
      + '• Technical SEO (speed, mobile, structure)\n'
      + '• Link building strategy\n'
      + '• Monthly reports with progress\n\n'
      + 'Results typically visible within 3-6 months.\n'
      + 'Want to rank #1 on Google? Contact us:'
    : 'Le SEO (référencement naturel) permet à votre site d\'apparaître en haut des résultats Google. Voici ce que nous faisons :\n\n'
      + '• Audit SEO complet de votre site\n'
      + '• Recherche et stratégie de mots-clés\n'
      + '• Optimisation on-page (titres, méta, contenu)\n'
      + '• SEO technique (vitesse, mobile, structure)\n'
      + '• Stratégie de link building\n'
      + '• Rapports mensuels avec progression\n\n'
      + 'Les résultats sont visibles en 3 à 6 mois généralement.\n'
      + 'Vous voulez être n°1 sur Google ? Contactez-nous :';

  // ── Refonte ──
  R.service_redesign = isEn
    ? 'We redesign your website to make it modern and effective:\n\n'
      + '• Complete UI/UX redesign\n'
      + '• Performance optimization\n'
      + '• Mobile-first approach\n'
      + '• Improved user experience\n'
      + '• Modern design & interactions\n'
      + '• Better conversion rates\n\n'
      + 'When to consider a redesign:\n'
      + '• Your site looks outdated (5+ years)\n'
      + '• It\'s slow or not mobile-friendly\n'
      + '• Low conversion rates\n'
      + '• You want to add new features\n\n'
      + 'Want to modernize your site? Contact us:'
    : 'Nous refontons votre site pour le rendre moderne et efficace :\n\n'
      + '• Refonte UI/UX complète\n'
      + '• Optimisation des performances\n'
      + '• Approche mobile-first\n'
      + '• Expérience utilisateur améliorée\n'
      + '• Design moderne & interactions\n'
      + '• Meilleurs taux de conversion\n\n'
      + 'Quand envisager une refonte :\n'
      + '• Votre site a l\'air dépassé (5+ ans)\n'
      + '• Il est lent ou pas mobile-friendly\n'
      + '• Faible taux de conversion\n'
      + '• Vous voulez ajouter de nouvelles fonctionnalités\n\n'
      + 'Vous voulez moderniser votre site ? Contactez-nous :';

  // ── Suivi / Maintenance ──
  R.service_support = isEn
    ? 'We offer ongoing support and maintenance:\n\n'
      + '• Technical monitoring 24/7\n'
      + '• Regular updates (WordPress, plugins)\n'
      + '• Bug fixes & support\n'
      + '• Performance monitoring\n'
      + '• Security updates\n'
      + '• Monthly reports\n\n'
      + 'Our support plans start at 30,000 FCFA/month.\n'
      + 'Need support? Contact us:'
    : 'Nous offrons un suivi et accompagnement continu :\n\n'
      + '• Surveillance technique 24/7\n'
      + '• Mises à jour régulières (WordPress, plugins)\n'
      + '• Correction de bugs & support\n'
      + '• Monitoring des performances\n'
      + '• Mises à jour de sécurité\n'
      + '• Rapports mensuels\n\n'
      + 'Nos forfaits d\'accompagnement commencent à 30 000 FCFA/mois.\n'
      + 'Besoin d\'un accompagnement ? Contactez-nous :';

  // ── Services général ──
  R.services_general = isEn
    ? 'We offer a full range of digital services:\n\n'
      + '• Website creation (corporate, e-commerce, landing pages)\n'
      + '• Sales funnels & lead generation\n'
      + '• SEO & Google ranking\n'
      + '• Website redesign & modernization\n'
      + '• Support & maintenance\n'
      + '• SaaS & custom web applications\n\n'
      + 'Which service interests you? Or visit our services page:'
    : 'Nous offrons une gamme complète de services digitaux :\n\n'
      + '• Création de sites web (vitrine, e-commerce, landing pages)\n'
      + '• Tunnels de vente & génération de leads\n'
      + '• SEO & classement Google\n'
      + '• Refonte & modernisation de sites\n'
      + '• Suivi & maintenance\n'
      + '• SaaS & applications web sur mesure\n\n'
      + 'Quel service vous intéresse ? Ou visitez notre page services :';

  // ── Processus / Délais ──
  R.process = isEn
    ? 'Here\'s how we work:\n\n'
      + '1. Discovery call — We understand your needs\n'
      + '2. Proposal & quote — We send a detailed proposal\n'
      + '3. Design — We create mockups for validation\n'
      + '4. Development — We build your solution\n'
      + '5. Testing & launch — We ensure everything works\n'
      + '6. Support — We accompany you after launch\n\n'
      + 'Typical timelines:\n'
      + '• Landing page: 1-2 weeks\n'
      + '• Corporate site: 2-4 weeks\n'
      + '• E-commerce: 3-6 weeks\n'
      + '• Sales funnel: 2-4 weeks\n'
      + '• SaaS: 2-6 months\n\n'
      + 'Ready to start? Contact us:'
    : 'Voici comment nous travaillons :\n\n'
      + '1. Appel de découverte — Nous comprenons vos besoins\n'
      + '2. Proposition & devis — Nous envoyons une proposition détaillée\n'
      + '3. Design — Nous créons des maquettes pour validation\n'
      + '4. Développement — Nous construisons votre solution\n'
      + '5. Tests & lancement — Nous vérifions que tout fonctionne\n'
      + '6. Support — Nous vous accompagnons après le lancement\n\n'
      + 'Délais moyens :\n'
      + '• Landing page : 1 à 2 semaines\n'
      + '• Site vitrine : 2 à 4 semaines\n'
      + '• E-commerce : 3 à 6 semaines\n'
      + '• Tunnel de vente : 2 à 4 semaines\n'
      + '• SaaS : 2 à 6 mois\n\n'
      + 'Prêt à commencer ? Contactez-nous :';

  // ── Technologies ──
  R.technologies = isEn
    ? 'We use modern, proven technologies:\n\n'
      + '• Frontend: HTML5, CSS3, JavaScript, React, Next.js\n'
      + '• Backend: Node.js, PHP, Python\n'
      + '• CMS: WordPress, Shopify, custom solutions\n'
      + '• Hosting: Vercel, optimized servers\n'
      + '• Tools: Google Analytics, Hotjar, Figma\n'
      + '• Databases: MySQL, PostgreSQL, MongoDB\n\n'
      + 'We choose the best tech stack for each project.\n'
      + 'Want to know more? Contact us:'
    : 'Nous utilisons des technologies modernes et éprouvées :\n\n'
      + '• Frontend : HTML5, CSS3, JavaScript, React, Next.js\n'
      + '• Backend : Node.js, PHP, Python\n'
      + '• CMS : WordPress, Shopify, solutions sur mesure\n'
      + '• Hébergement : Vercel, serveurs optimisés\n'
      + '• Outils : Google Analytics, Hotjar, Figma\n'
      + '• Bases de données : MySQL, PostgreSQL, MongoDB\n\n'
      + 'Nous choisissons la meilleure stack technique pour chaque projet.\n'
      + 'Vous voulez en savoir plus ? Contactez-nous :';

  // ── À propos ──
  R.about = isEn
    ? 'Prime Impact Agency (PIA) is a web & digital marketing agency founded by Schallom Sogbossi.\n\n'
      + 'Our mission: help entrepreneurs and SMBs grow their business online with high-performing digital solutions.\n\n'
      + 'We specialize in:\n'
      + '• Creating high-performance websites\n'
      + '• Building sales funnels\n'
      + '• SEO optimization\n'
      + '• Supporting entrepreneurs & SMBs\n\n'
      + 'We work with clients across various industries (real estate, e-commerce, coaching, etc.).\n'
      + 'Learn more about us:'
    : 'Prime Impact Agency (PIA) est une agence web & marketing digital fondée par Schallom Sogbossi.\n\n'
      + 'Notre mission : aider les entrepreneurs et PME à développer leur activité en ligne avec des solutions digitales performantes.\n\n'
      + 'Nous sommes spécialisés dans :\n'
      + '• La création de sites web performants\n'
      + '• La construction de tunnels de vente\n'
      + '• L\'optimisation SEO\n'
      + '• L\'accompagnement des entrepreneurs & PME\n\n'
      + 'Nous travaillons avec des clients de divers secteurs (immobilier, e-commerce, coaching, etc.).\n'
      + 'En savoir plus sur nous :';

  // ── Contact ──
  R.contact = isEn
    ? 'Here\'s how to reach us:\n\n'
      + '📱 WhatsApp: ' + CONTACT.whatsappNum + '\n'
      + '📧 Email: ' + CONTACT.email + '\n'
      + '🌐 Website: ' + CONTACT.site + '\n'
      + '💼 LinkedIn: ' + CONTACT.linkedin + '\n'
      + '📘 Facebook: ' + CONTACT.facebook
    : 'Voici comment nous joindre :\n\n'
      + '📱 WhatsApp : ' + CONTACT.whatsappNum + '\n'
      + '📧 Email : ' + CONTACT.email + '\n'
      + '🌐 Site web : ' + CONTACT.site + '\n'
      + '💼 LinkedIn : ' + CONTACT.linkedin + '\n'
      + '📘 Facebook : ' + CONTACT.facebook;

  // ── Horaires ──
  R.hours = isEn
    ? 'We\'re available 7 days a week:\n\n'
      + '• Monday - Friday: 8am - 7pm\n'
      + '• Saturday: 9am - 5pm\n'
      + '• Sunday: By appointment\n\n'
      + 'For urgent requests, contact us via WhatsApp:'
    : 'Nous sommes disponibles 7 jours sur 7 :\n\n'
      + '• Lundi - Vendredi : 8h - 19h\n'
      + '• Samedi : 9h - 17h\n'
      + '• Dimanche : Sur rendez-vous\n\n'
      + 'Pour les demandes urgentes, contactez-nous via WhatsApp :';

  // ── Portfolio ──
  R.portfolio = isEn
    ? 'Check out our portfolio of completed projects — real results for real businesses:'
    : 'Découvrez nos réalisations — des vrais résultats pour de vraies entreprises :';

  // ── Blog ──
  R.blog = isEn
    ? 'We share tips, guides and best practices on our blog. Check it out for valuable insights on web, SEO and digital marketing:'
    : 'Nous partageons des conseils, guides et bonnes pratiques sur notre blog. Consultez-le pour des astuces précieuses sur le web, le SEO et le marketing digital :';

  // ── Devis ──
  R.devis = isEn
    ? 'To get a free, detailed quote, fill out our form — it only takes 2 minutes!'
    : 'Pour obtenir un devis gratuit et détaillé, remplissez notre formulaire — cela ne prend que 2 minutes !';

  // ── SaaS ──
  R.saas = isEn
    ? 'A SaaS (Software as a Service) is a web application sold on subscription. Here\'s what you need to know:\n\n'
      + '• It\'s a custom platform (not a template)\n'
      + '• Price depends on complexity & features\n'
      + '• Typical features: database, user accounts, payments, dashboards\n\n'
      + 'At PIA, SaaS projects start from 500,000 FCFA for a simple solution.\n'
      + 'Examples: booking platforms, management tools, marketplaces, CRM, LMS.\n\n'
      + 'For an accurate quote, contact us:'
    : 'Un SaaS (Software as a Service) est une application web vendue en abonnement. Voici ce qu\'il faut savoir :\n\n'
      + '• C\'est une plateforme sur mesure (pas un template)\n'
      + '• Le prix dépend de la complexité et des fonctionnalités\n'
      + '• Fonctionnalités typiques : base de données, comptes utilisateurs, paiements, tableaux de bord\n\n'
      + 'Chez PIA, les projets SaaS commencent à partir de 500 000 FCFA pour une solution simple.\n'
      + 'Exemples : plateformes de réservation, outils de gestion, marketplaces, CRM, LMS.\n\n'
      + 'Pour un devis précis, contactez-nous :';

  // ── WordPress spécifique ──
  R.wordpress = isEn
    ? 'Yes, we work with WordPress! Here\'s what we offer:\n\n'
      + '• Custom WordPress sites (not just templates)\n'
      + '• Theme customization & development\n'
      + '• Plugin configuration & development\n'
      + '• WooCommerce for e-commerce\n'
      + '• WordPress optimization & security\n'
      + '• Migration from other platforms\n\n'
      + 'WordPress is great for: blogs, corporate sites, e-commerce, portfolios.\n'
      + 'Want a WordPress site? Contact us:'
    : 'Oui, nous travaillons avec WordPress ! Voici ce que nous proposons :\n\n'
      + '• Sites WordPress personnalisés (pas que des templates)\n'
      + '• Personnalisation & développement de thèmes\n'
      + '• Configuration & développement de plugins\n'
      + '• WooCommerce pour l\'e-commerce\n'
      + '• Optimisation & sécurité WordPress\n'
      + '• Migration depuis d\'autres plateformes\n\n'
      + 'WordPress est idéal pour : blogs, sites vitrine, e-commerce, portfolios.\n'
      + 'Vous voulez un site WordPress ? Contactez-nous :';

  // ── E-commerce ──
  R.ecommerce = isEn
    ? 'We build online stores that sell. Here\'s what we offer:\n\n'
      + '• Custom e-commerce sites\n'
      + '• Shopify, WooCommerce, PrestaShop\n'
      + '• Product catalog & inventory management\n'
      + '• Secure payment integration (Stripe, PayPal, mobile money)\n'
      + '• Order tracking & management\n'
      + '• SEO for product pages\n\n'
      + 'Want to sell online? Contact us:'
    : 'Nous créons des boutiques en ligne qui vendent. Voici ce que nous proposons :\n\n'
      + '• Sites e-commerce sur mesure\n'
      + '• Shopify, WooCommerce, PrestaShop\n'
      + '• Catalogue produits & gestion des stocks\n'
      + '• Intégration de paiement sécurisé (Stripe, PayPal, mobile money)\n'
      + '• Suivi & gestion des commandes\n'
      + '• SEO pour les fiches produits\n\n'
      + 'Vous voulez vendre en ligne ? Contactez-nous :';

  // ── Réseaux sociaux ──
  R.social_media = isEn
    ? 'We help you grow your social media presence:\n\n'
      + '• Social media strategy\n'
      + '• Content creation & scheduling\n'
      + '• Community management\n'
      + '• Paid advertising (Facebook Ads, Instagram, TikTok)\n'
      + '• Analytics & reporting\n\n'
      + 'Want to boost your social media? Contact us:'
    : 'Nous vous aidons à développer votre présence sur les réseaux sociaux :\n\n'
      + '• Stratégie réseaux sociaux\n'
      + '• Création de contenu & planification\n'
      + '• Community management\n'
      + '• Publicité payante (Facebook Ads, Instagram, TikTok)\n'
      + '• Analytics & reporting\n\n'
      + 'Vous voulez booster vos réseaux sociaux ? Contactez-nous :';

  // ── Email marketing ──
  R.email_marketing = isEn
    ? 'We set up effective email marketing campaigns:\n\n'
      + '• Newsletter design & setup\n'
      + '• Automated email sequences (welcome, nurture, follow-up)\n'
      + '• Platform setup (Mailchimp, Brevo, etc.)\n'
      + '• List segmentation & targeting\n'
      + '• A/B testing & optimization\n'
      + '• Performance tracking\n\n'
      + 'Want to boost your email marketing? Contact us:'
    : 'Nous mettons en place des campagnes d\'email marketing efficaces :\n\n'
      + '• Design & configuration de newsletters\n'
      + '• Séquences d\'emails automatisées (bienvenue, nurturing, relance)\n'
      + '• Configuration de plateformes (Mailchimp, Brevo, etc.)\n'
      + '• Segmentation & ciblage de la liste\n'
      + '• A/B testing & optimisation\n'
      + '• Suivi des performances\n\n'
      + 'Vous voulez booster votre email marketing ? Contactez-nous :';

  // ── Design / UI-UX ──
  R.design = isEn
    ? 'We create beautiful, functional designs:\n\n'
      + '• UI/UX design for websites & apps\n'
      + '• Wireframes & mockups (Figma)\n'
      + '• Logo & brand identity\n'
      + '• Visual identity & branding\n'
      + '• Design systems\n'
      + '• Prototyping & user testing\n\n'
      + 'Good design = better conversions + happier users.\n'
      + 'Want a beautiful design? Contact us:'
    : 'Nous créons des designs beaux et fonctionnels :\n\n'
      + '• Design UI/UX pour sites web & applications\n'
      + '• Wireframes & maquettes (Figma)\n'
      + '• Logo & identité de marque\n'
      + '• Identité visuelle & branding\n'
      + '• Systèmes de design\n'
      + '• Prototypage & tests utilisateurs\n\n'
      + 'Un bon design = de meilleures conversions + des utilisateurs plus satisfaits.\n'
      + 'Vous voulez un beau design ? Contactez-nous :';

  // ── Analytics ──
  R.analytics = isEn
    ? 'We help you understand your data:\n\n'
      + '• Google Analytics 4 setup & configuration\n'
      + '• Conversion tracking (goals, events)\n'
      + '• Custom dashboards & reports\n'
      + '• Heatmaps & user behavior (Hotjar)\n'
      + '• A/B testing & optimization\n'
      + '• ROI measurement\n\n'
      + 'Data-driven decisions = better results.\n'
      + 'Want to track your performance? Contact us:'
    : 'Nous vous aidons à comprendre vos données :\n\n'
      + '• Configuration Google Analytics 4\n'
      + '• Suivi des conversions (objectifs, événements)\n'
      + '• Tableaux de bord & rapports personnalisés\n'
      + '• Heatmaps & comportement utilisateur (Hotjar)\n'
      + '• A/B testing & optimisation\n'
      + '• Mesure du ROI\n\n'
      + 'Des décisions basées sur les données = de meilleurs résultats.\n'
      + 'Vous voulez suivre vos performances ? Contactez-nous :';

  // ── Localisation ──
  R.location = isEn
    ? 'We are based in Benin and work with clients across Africa and worldwide.\n\n'
      + '📍 Cotonou, Benin\n'
      + '🌐 We work remotely with clients everywhere\n\n'
      + 'Our clients are in: Benin, Togo, Nigeria, France, and other countries.\n'
      + 'Contact us:'
    : 'Nous sommes basés au Bénin et travaillons avec des clients partout en Afrique et dans le monde.\n\n'
      + '📍 Cotonou, Bénin\n'
      + '🌐 Nous travaillons à distance avec des clients partout\n\n'
      + 'Nos clients sont au : Bénin, Togo, Nigeria, France, et autres pays.\n'
      + 'Contactez-nous :';

  // ── Types de clients ──
  R.clients = isEn
    ? 'We work with a wide range of clients:\n\n'
      + '• Entrepreneurs & solopreneurs\n'
      + '• Startups & tech companies\n'
      + '• SMEs & SMBs (PME/TPE)\n'
      + '• Coaches & consultants\n'
      + '• E-commerce businesses\n'
      + '• Real estate agencies\n'
      + '• NGOs & associations\n\n'
      + 'Whether you\'re just starting out or established, we can help.\n'
      + 'Want to work with us? Contact us:'
    : 'Nous travaillons avec une large gamme de clients :\n\n'
      + '• Entrepreneurs & solopreneurs\n'
      + '• Startups & entreprises tech\n'
      + '• PME & TPE\n'
      + '• Coachs & consultants\n'
      + '• Entreprises e-commerce\n'
      + '• Agences immobilières\n'
      + '• ONG & associations\n\n'
      + 'Que vous soyez débutant ou établi, nous pouvons vous aider.\n'
      + 'Vous voulez travailler avec nous ? Contactez-nous :';

  // ── Comparaison / Pourquoi PIA ──
  R.comparison = isEn
    ? 'Why choose PIA? Here\'s what makes us different:\n\n'
      + '• Results-driven approach (not just pretty design)\n'
      + '• Focus on conversions & ROI\n'
      + '• Full-service: from strategy to implementation\n'
      + '• Transparent pricing, no hidden fees\n'
      + '• Fast delivery & responsive support\n'
      + '• We understand African & international markets\n\n'
      + 'We don\'t just build websites — we build digital growth engines.\n'
      + 'Want to see if we\'re the right fit? Contact us:'
    : 'Pourquoi choisir PIA ? Voici ce qui nous différencie :\n\n'
      + '• Approche orientée résultats (pas juste du joli design)\n'
      + '• Focus sur les conversions & le ROI\n'
      + '• Tout-en-un : de la stratégie à l\'implémentation\n'
      + '• Tarifs transparents, sans frais cachés\n'
      + '• Livraison rapide & support réactif\n'
      + '• Nous comprenons les marchés africains & internationaux\n\n'
      + 'Nous ne créons pas juste des sites web — nous créons des moteurs de croissance digitale.\n'
      + 'Vous voulez voir si nous sommes faits pour vous ? Contactez-nous :';

  // ── Questions fermées (oui/non) ──
  R.yes_no = isEn
    ? 'Yes, we can definitely help you with that! Could you tell me more about what you need so I can give you the best information?'
    : 'Oui, nous pouvons absolument vous aider avec cela ! Pouvez-vous me donner plus de détails sur ce dont vous avez besoin pour que je puisse vous donner la meilleure information ?';

  // ── Questions web générales ──
  R.web_general = isEn
    ? 'Great question about web/digital! Here are some things we can help with:\n\n'
      + '• Building a website or landing page\n'
      + '• Improving your Google ranking (SEO)\n'
      + '• Setting up a sales funnel\n'
      + '• Online store creation\n'
      + '• Digital marketing strategy\n\n'
      + 'What specifically would you like to know?'
    : 'Bonne question sur le web/le digital ! Voici quelques domaines où nous pouvons aider :\n\n'
      + '• Créer un site web ou une landing page\n'
      + '• Améliorer votre classement Google (SEO)\n'
      + '• Mettre en place un tunnel de vente\n'
      + '• Créer une boutique en ligne\n'
      + '• Stratégie de marketing digital\n\n'
      + 'Qu\'est-ce que vous aimeriez savoir précisément ?';

  // ── Inconnu ──
  R.unknown = isEn
    ? 'That\'s a good question! I may not have the exact answer, but our team definitely can help. Here\'s what I suggest:\n\n'
      + '• Try asking about our services, pricing, or process\n'
      + '• Or contact our team directly for a personalized answer:'
    : 'C\'est une bonne question ! Je n\'ai peut-être pas la réponse exacte, mais notre équipe peut vous aider. Voici ce que je vous propose :\n\n'
      + '• Essayez de poser une question sur nos services, tarifs ou processus\n'
      + '• Ou contactez directement notre équipe pour une réponse personnalisée :';

  const base = R[intent] || R.unknown;

  // Ajouter contact pour les intentions pertinentes
  const withContact = ['pricing', 'human_request', 'service_website', 'service_funnel', 'service_seo', 'service_redesign', 'service_support', 'services_general', 'process', 'technologies', 'about', 'contact', 'portfolio', 'devis', 'saas', 'wordpress', 'ecommerce', 'social_media', 'email_marketing', 'design', 'analytics', 'location', 'clients', 'comparison', 'yes_no', 'web_general', 'unknown'];

  if (withContact.includes(intent)) {
    const contactBlock = isEn
      ? '\n\n📱 WhatsApp: ' + CONTACT.whatsappNum + '\n📧 Email: ' + CONTACT.email
      : '\n\n📱 WhatsApp : ' + CONTACT.whatsappNum + '\n📧 Email : ' + CONTACT.email;
    return { text: base + contactBlock, intent };
  }

  return { text: base, intent };
}

// ─── Message de bienvenue ───────────────────────────────────
function getWelcomeMessage(lang) {
  const isEn = lang === 'en';
  return isEn
    ? 'Hello! I\'m the PIA virtual assistant. I can help you with:\n\n'
      + '• Our services & pricing\n'
      + '• Web & digital questions\n'
      + '• How we work\n\n'
      + 'Just ask your question!'
    : 'Bonjour ! Je suis l\'assistant virtuel de PIA. Je peux vous aider avec :\n\n'
      + '• Nos services & tarifs\n'
      + '• Questions sur le web & le digital\n'
      + '• Notre méthode de travail\n\n'
      + 'Posez-moi simplement votre question !';
}

module.exports = { generateResponse, getWelcomeMessage, normalize, detectIntent };
