/* ============================================================
   CHAT KNOWLEDGE BASE — Moteur IA pour le chat PIA
   Détection d'intention + réponses contextuelles
   ============================================================ */

const CONTACT = {
  whatsapp: 'https://wa.me/22993288212',
  whatsappNum: '+229 93 28 82 12',
  email: 'contact@primeimpactagency.com',
  site: 'https://primeimpactagency.com',
};

const GREETINGS = ['bonjour', 'salut', 'hello', 'coucou', 'hey', 'bonsoir', 'bjr', 'slt', 'bonjour pia', 'salut pia'];
const THANKS = ['merci', 'thanks', 'super', 'parfait', 'génial', 'ok merci', 'ok', 'cool', 'excellent'];
const HUMAN_REQUEST = ['humain', 'parler à quelqu\'un', 'un conseiller', 'un agent', 'un responsable', 'parler à un humain', 'parler à quelqu\'un', 'personne', 'réel', 'real', 'human', 'operator'];

// ─── Normalisation ──────────────────────────────────────────
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\sàâäéèêëïîôùûüÿçœæ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Détection d'intention ──────────────────────────────────
function detectIntent(text) {
  const n = normalize(text);

  // Salutations
  if (GREETINGS.some(g => n.includes(g)) && n.length < 30) return 'greeting';
  // Remerciements
  if (THANKS.some(t => n.startsWith(t)) && n.length < 25) return 'thanks';
  // Demande d'humain
  if (HUMAN_REQUEST.some(h => n.includes(h))) return 'human_request';

  // Tarifs / Prix
  const priceKeywords = ['prix', 'tarif', 'cout', 'coute', 'combien', 'budget', 'cher', 'prix', 'tarifs', 'coutent', 'couter', 'coûte', 'coût', 'pricing', 'price', 'budget', 'millier', 'million', 'fcfa', 'euro', 'euros'];
  if (priceKeywords.some(k => n.includes(k))) return 'pricing';

  // Services
  const serviceKeywords = ['service', 'offre', 'prestation', 'proposez', 'faites', 'solutions'];
  const websiteKeywords = ['site web', 'site internet', 'creation de site', 'créer un site', 'website', 'landing page', 'page web', 'page d\'accueil'];
  const funnelKeywords = ['tunnel', 'funnel', 'vente', 'conversion', 'lead', 'parcours client'];
  const seoKeywords = ['seo', 'referencement', 'référencement', 'google', 'ranking', 'positionnement', 'seo', 'referencement naturel'];
  const redesignKeywords = ['refonte', 'redesign', 'moderniser', 'rénover', 'améliorer mon site', 'upgrade'];
  const supportKeywords = ['suivi', 'accompagnement', 'maintenance', 'support', 'aide technique', 'bug', 'panne'];

  if (websiteKeywords.some(k => n.includes(k))) return 'service_website';
  if (funnelKeywords.some(k => n.includes(k))) return 'service_funnel';
  if (seoKeywords.some(k => n.includes(k))) return 'service_seo';
  if (redesignKeywords.some(k => n.includes(k))) return 'service_redesign';
  if (supportKeywords.some(k => n.includes(k))) return 'service_support';
  if (serviceKeywords.some(k => n.includes(k))) return 'services_general';

  // Processus
  const processKeywords = ['processus', 'démarche', 'étape', 'comment ça marche', 'fonctionnement', 'workflow', 'délai', 'temps', 'durée', 'combien de temps'];
  if (processKeywords.some(k => n.includes(k))) return 'process';

  // Technologies
  const techKeywords = ['technologie', 'tech', 'framework', 'react', 'next', 'wordpress', 'php', 'node', 'outils', 'stack', 'langage'];
  if (techKeywords.some(k => n.includes(k))) return 'technologies';

  // À propos
  const aboutKeywords = ['qui êtes', 'qui es tu', 'qui sommes', 'à propos', 'presentation', 'présentation', 'équipe', 'agence', 'pia', 'prime impact'];
  if (aboutKeywords.some(k => n.includes(k))) return 'about';

  // Contact
  const contactKeywords = ['contact', 'téléphone', 'email', 'mail', 'adresse', 'whatsapp', 'appeler', 'joindre', 'reachable'];
  if (contactKeywords.some(k => n.includes(k))) return 'contact';

  // Horaires
  const hoursKeywords = ['heure', 'horaire', 'ouvert', 'fermé', 'disponible', 'quand', 'jours', 'weekend'];
  if (hoursKeywords.some(k => n.includes(k))) return 'hours';

  // Portfolio / réalisations
  const portfolioKeywords = ['réalisation', 'portfolio', 'projet', 'exemple', 'client', 'travaux', 'showcase'];
  if (portfolioKeywords.some(k => n.includes(k))) return 'portfolio';

  // Blog
  const blogKeywords = ['blog', 'article', 'tutorial', 'tutoriel', 'guide', 'conseil'];
  if (blogKeywords.some(k => n.includes(k))) return 'blog';

  // Devis
  const devisKeywords = ['devis', 'soumission', 'estimation', 'proposition'];
  if (devisKeywords.some(k => n.includes(k))) return 'devis';

  // SaaS / App
  const saasKeywords = ['saas', 'application', 'app', 'logiciel', 'plateforme', 'mvp'];
  if (saasKeywords.some(k => n.includes(k))) return 'saas';

  return 'unknown';
}

// ─── Génération de réponse ──────────────────────────────────
function generateResponse(text, lang) {
  const intent = detectIntent(text);
  const isEn = lang === 'en';

  const responses = {
    greeting: isEn
      ? 'Hello! Welcome to Prime Impact Agency. I\'m here to help you with any questions about our services. How can I assist you today?'
      : 'Bonjour ! Bienvenue sur Prime Impact Agency. Je suis l\'assistant virtuel et je suis l pour vous aider. Comment puis-je vous assister ?',    thanks: isEn
      ? 'You\'re welcome! Don\'t hesitate to ask if you have any other questions.'
      : 'De rien ! N\'hésitez pas si vous avez d\'autres questions.',
    human_request: isEn
      ? 'Of course! I\'ll connect you with our team. You can reach us directly via:'
      : 'Bien sûr ! Je vous mets en contact avec notre équipe. Vous pouvez nous joindre directement via :',
    pricing: isEn
      ? 'Great question! Our services are tailored to each project. Here are our general ranges:\n\n'
        + '• Website creation: from 150,000 FCFA\n'
        + '• Sales funnel: from 200,000 FCFA\n'
        + '• SEO optimization: from 100,000 FCFA/month\n'
        + '• Website redesign: from 120,000 FCFA\n'
        + '• SaaS / Web App: from 500,000 FCFA\n\n'
        + 'For an accurate quote, I invite you to contact us directly:'
      : 'Bonne question ! Nos services sont adaptés à chaque projet. Voici nos fourchettes de prix :\n\n'
        + '• Création de site web : à partir de 150 000 FCFA\n'
        + '• Tunnel de vente : à partir de 200 000 FCFA\n'
        + '• Référencement SEO : à partir de 100 000 FCFA/mois\n'
        + '• Refonte de site web : à partir de 120 000 FCFA\n'
        + '• SaaS / Application web : à partir de 500 000 FCFA\n\n'
        + 'Pour un devis précis, je vous invite à nous contacter directement :',
    service_website: isEn
      ? 'We create high-performance, modern websites tailored to your needs:\n\n'
        + '• Responsive design (mobile, tablet, desktop)\n'
        + '• Optimized for conversions\n'
        + '• Fast loading speeds\n'
        + '• SEO-friendly architecture\n'
        + '• Custom or CMS-based (WordPress, etc.)\n\n'
        + 'Want a free quote? Visit our service page or contact us:'
      : 'Nous créons des sites web performants et modernes, adaptés à vos besoins :\n\n'
        + '• Design responsive (mobile, tablette, desktop)\n'
        + '• Optimisé pour les conversions\n'
        + '• Temps de chargement rapide\n'
        + '• Architecture SEO-friendly\n'
        + '• Sur mesure ou avec CMS (WordPress, etc.)\n\n'
        + 'Vous voulez un devis gratuit ? Visitez notre page service ou contactez-nous :',
    service_funnel: isEn
      ? 'We build sales funnels that convert visitors into customers:\n\n'
        + '• Landing pages optimized for conversion\n'
        + '• Lead capture sequences\n'
        + '• Automated email sequences\n'
        + '• A/B testing setup\n'
        + '• Analytics & tracking\n\n'
        + 'Want to boost your sales? Contact us:'
      : 'Nous créons des tunnels de vente qui transforment vos visiteurs en clients :\n\n'
        + '• Landing pages optimisées pour la conversion\n'
        + '• Séquences de capture de leads\n'
        + '• Séquences d\'emails automatisées\n'
        + '• Configuration A/B testing\n'
        + '• Analytics & tracking\n\n'
        + 'Vous voulez booster vos ventes ? Contactez-nous :',
    service_seo: isEn
      ? 'We optimize your website to rank on Google:\n\n'
        + '• In-depth SEO audit\n'
        + '• Keyword research & strategy\n'
        + '• On-page optimization\n'
        + '• Technical SEO (speed, structure)\n'
        + '• Link building strategy\n'
        + '• Monthly reporting\n\n'
        + 'Want to rank #1 on Google? Contact us:'
      : 'Nous optimisons votre site pour être visible sur Google :\n\n'
        + '• Audit SEO approfondi\n'
        + '• Recherche et stratégie de mots-clés\n'
        + '• Optimisation on-page\n'
        + '• SEO technique (vitesse, structure)\n'
        + '• Stratégie de link building\n'
        + '• Rapport mensuel\n\n'
        + 'Vous voulez être n°1 sur Google ? Contactez-nous :',
    service_redesign: isEn
      ? 'We redesign your website to make it modern and effective:\n\n'
        + '• Complete UI/UX redesign\n'
        + '• Performance optimization\n'
        + '• Mobile-first approach\n'
        + '• Improved user experience\n'
        + '• Modern design & interactions\n\n'
        + 'Want to modernize your site? Contact us:'
      : 'Nous refontons votre site pour le rendre moderne et efficace :\n\n'
        + '• Refonte UI/UX complète\n'
        + '• Optimisation des performances\n'
        + '• Approche mobile-first\n'
        + '• Expérience utilisateur améliorée\n'
        + '• Design moderne & interactions\n\n'
        + 'Vous voulez moderniser votre site ? Contactez-nous :',
    service_support: isEn
      ? 'We offer ongoing support and maintenance:\n\n'
        + '• Technical monitoring 24/7\n'
        + '• Regular updates\n'
        + '• Bug fixes & support\n'
        + '• Performance monitoring\n'
        + '• Monthly reports\n\n'
        + 'Need support? Contact us:'
      : 'Nous offrons un suivi et accompagnement continu :\n\n'
        + '• Surveillance technique 24/7\n'
        + '• Mises à jour régulières\n'
        + '• Correction de bugs & support\n'
        + '• Monitoring des performances\n'
        + '• Rapports mensuels\n\n'
        + 'Besoin d\'un accompagnement ? Contactez-nous :',
    services_general: isEn
      ? 'We offer a full range of digital services:\n\n'
        + '• Website creation\n'
        + '• Sales funnels\n'
        + '• SEO optimization\n'
        + '• Website redesign\n'
        + '• Support & maintenance\n\n'
        + 'Which service interests you? Or visit our services page:'
      : 'Nous offrons une gamme complète de services digitaux :\n\n'
        + '• Création de site web\n'
        + '• Tunnels de vente\n'
        + '• Référencement SEO\n'
        + '• Refonte de site web\n'
        + '• Suivi & accompagnement\n\n'
        + 'Quel service vous intéresse ? Ou visitez notre page services :',
    process: isEn
      ? 'Here\'s how we work:\n\n'
        + '1. Discovery call — We understand your needs\n'
        + '2. Proposal & quote — We send you a detailed proposal\n'
        + '3. Design — We create mockups for validation\n'
        + '4. Development — We build your solution\n'
        + '5. Testing & launch — We ensure everything works\n'
        + '6. Support — We accompany you after launch\n\n'
        + 'Ready to start? Contact us:'
      : 'Voici comment nous travaillons :\n\n'
        + '1. Appel de découverte — Nous comprenons vos besoins\n'
        + '2. Proposition & devis — Nous vous envoyons une proposition détaillée\n'
        + '3. Design — Nous créons des maquettes pour validation\n'
        + '4. Développement — Nous construisons votre solution\n'
        + '5. Tests & lancement — Nous nous assurons que tout fonctionne\n'
        + '6. Support — Nous vous accompagnons après le lancement\n\n'
        + 'Prêt à commencer ? Contactez-nous :',
    technologies: isEn
      ? 'We use modern, proven technologies:\n\n'
        + '• Frontend: HTML5, CSS3, JavaScript, React\n'
        + '• Backend: Node.js, PHP\n'
        + '• CMS: WordPress, custom solutions\n'
        + '• Hosting: Vercel, optimized servers\n'
        + '• Tools: Google Analytics, Hotjar, A/B testing\n\n'
        + 'Want to know more? Contact us:'
      : 'Nous utilisons des technologies modernes et éprouvées :\n\n'
        + '• Frontend : HTML5, CSS3, JavaScript, React\n'
        + '• Backend : Node.js, PHP\n'
        + '• CMS : WordPress, solutions sur mesure\n'
        + '• Hébergement : Vercel, serveurs optimisés\n'
        + '• Outils : Google Analytics, Hotjar, A/B testing\n\n'
        + 'Vous voulez en savoir plus ? Contactez-nous :',
    about: isEn
      ? 'Prime Impact Agency (PIA) is a web & digital marketing agency founded by Schallom Sogbossi. We specialize in:\n\n'
        + '• Creating high-performance websites\n'
        + '• Building sales funnels\n'
        + '• SEO optimization\n'
        + '• Supporting entrepreneurs & SMBs\n\n'
        + 'We work with clients across various industries (real estate, e-commerce, coaching, etc.).\n'
        + 'Learn more about us:'
      : 'Prime Impact Agency (PIA) est une agence web & marketing digital fondée par Schallom Sogbossi. Nous sommes spécialisés dans :\n\n'
        + '• La création de sites web performants\n'
        + '• La construction de tunnels de vente\n'
        + '• L\'optimisation SEO\n'
        + '• L\'accompagnement des entrepreneurs & PME\n\n'
        + 'Nous travaillons avec des clients de divers secteurs (immobilier, e-commerce, coaching, etc.).\n'
        + 'En savoir plus sur nous :',
    contact: isEn
      ? 'Here\'s how to reach us:'
      : 'Voici comment nous joindre :',
    hours: isEn
      ? 'We\'re available 7 days a week:\n\n'
        + '• Monday - Friday: 8am - 7pm\n'
        + '• Saturday: 9am - 5pm\n'
        + '• Sunday: By appointment\n\n'
        + 'For urgent requests, contact us via WhatsApp:'
      : 'Nous sommes disponibles 7 jours sur 7 :\n\n'
        + '• Lundi - Vendredi : 8h - 19h\n'
        + '• Samedi : 9h - 17h\n'
        + '• Dimanche : Sur rendez-vous\n\n'
        + 'Pour les demandes urgentes, contactez-nous via WhatsApp :',
    portfolio: isEn
      ? 'Check out our portfolio of completed projects:'
      : 'Découvrez nos réalisations de projets terminés :',
    blog: isEn
      ? 'We share tips, guides and best practices on our blog:'
      : 'Nous partageons des conseils, guides et bonnes pratiques sur notre blog :',
    devis: isEn
      ? 'To get a free quote, fill out our form — it only takes 2 minutes!'
      : 'Pour obtenir un devis gratuit, remplissez notre formulaire — cela ne prend que 2 minutes !',
    saas: isEn
      ? 'Great question! A SaaS (Software as a Service) is a custom web application that varies enormously in price depending on:\n\n'
        + '• Complexity (database, features, integrations)\n'
        + '• Number of planned users\n'
        + '• Advanced features (payments, API, analytics)\n\n'
        + 'At PIA, SaaS projects generally start from 500,000 FCFA for a simple solution, but can be much higher depending on your needs.\n\n'
        + 'For an accurate quote, contact us directly:'
      : 'Bonne question ! Un SaaS (Software as a Service) est une application web sur mesure qui varie énormément en prix selon :\n\n'
        + '• La complexité (base de données, nombre de fonctionnalités, intégrations)\n'
        + '• Le nombre d\'utilisateurs prévus\n'
        + '• Les fonctionnalités avancées (paiements, API, analytics)\n\n'
        + 'Chez PIA, les projets SaaS commencent généralement à partir de 500 000 FCFA pour une solution simple, mais peuvent être bien plus élevés selon vos besoins.\n\n'
        + 'Pour un devis précis, contactez-nous directement :',
    unknown: isEn
      ? 'That\'s a great question! I don\'t have a specific answer for that, but our team can help you. Contact us directly:'
      : 'C\'est une bonne question ! Je n\'ai pas de réponse spécifique à cela, mais notre équipe peut vous aider. Contactez-nous directement :',
  };

  const base = responses[intent] || responses.unknown;

  // Ajouter les infos de contact pour les intentions pertinentes
  const contactIntents = ['pricing', 'human_request', 'service_website', 'service_funnel', 'service_seo', 'service_redesign', 'service_support', 'services_general', 'process', 'technologies', 'about', 'contact', 'portfolio', 'devis', 'saas', 'unknown'];

  if (contactIntents.includes(intent)) {
    const contactBlock = isEn
      ? '\n\n📱 WhatsApp: ' + CONTACT.whatsappNum + '\n📧 Email: ' + CONTACT.email
      : '\n\n📱 WhatsApp : ' + CONTACT.whatsappNum + '\n📧 Email : ' + CONTACT.email;

    const links = isEn
      ? '\n\n🔗 Visit our website: ' + CONTACT.site
      : '\n\n🔗 Visitez notre site : ' + CONTACT.site;

    return { text: base + contactBlock + links, intent };
  }

  return { text: base, intent };
}

// ─── Message de bienvenue ───────────────────────────────────
function getWelcomeMessage(lang) {
  const isEn = lang === 'en';
  return isEn
    ? 'Hello! I\'m the PIA virtual assistant. I can help you with:\n\n'
      + '• Our services & pricing\n'
      + '• How we work\n'
      + '• General questions about web & digital\n\n'
      + 'How can I help you today?'
    : 'Bonjour ! Je suis l\'assistant virtuel de PIA. Je peux vous aider avec :\n\n'
      + '• Nos services & tarifs\n'
      + '• Notre méthode de travail\n'
      + '• Questions générales sur le web & le digital\n\n'
      + 'Comment puis-je vous aider aujourd\'hui ?';
}

module.exports = { generateResponse, getWelcomeMessage, normalize, detectIntent };
