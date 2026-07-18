function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const RULES = [
  {
    intent: 'greeting',
    test: /^(bonjour|salut|hello|hey|coucou|bonsoir|bjr|slt|bonjour pia|salut pia|bonsoir pia)\s*[!.?]*$/,
    reply: (lang) => lang === 'en'
      ? 'Hello! Welcome to Prime Impact Agency. I\'m here to help you with any questions about our services, pricing, or anything web & digital. What would you like to know?'
      : 'Bonjour ! Bienvenue sur Prime Impact Agency. Je suis l\'assistant virtuel de PIA. Je peux répondre à toutes vos questions sur nos services, nos tarifs, ou tout ce qui concerne le web et le digital. Comment puis-je vous aider ?',
  },
  {
    intent: 'thanks',
    test: /^(merci|thanks|super|parfait|genial|ok|cool|excellent|merci beaucoup|ok merci|c bon|c'est bon|noted|compris|d'accord)\s*[!.?]*$/,
    reply: (lang) => lang === 'en'
      ? 'You\'re welcome! Feel free to ask anything else.'
      : 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.',
  },
  {
    intent: 'help',
    test: /^(aide|help|menu|options|que sais tu|que peux tu|quoi d'autre|autre chose)\s*[!.?]*$/,
    reply: (lang) => lang === 'en'
      ? 'Here\'s what I can help you with:\n\n• Our services (websites, funnels, SEO...)\n• Pricing & quotes\n• How we work\n• Web & digital questions\n• Contact information\n\nJust ask your question!'
      : 'Voici ce que je peux faire pour vous :\n\n• Nos services (sites web, tunnels, SEO...)\n• Nos tarifs & devis\n• Notre méthode de travail\n• Questions sur le web & le digital\n• Nos coordonnées\n\nPosez-moi simplement votre question !',
  },
  {
    intent: 'services',
    test: /(quel.*service|what.*service|que proposez|what.*offer|nos services|our services|types de site|kind of site|vous faites quoi)/i,
    reply: (lang) => lang === 'en'
      ? 'We offer 5 main services:\n\n1. Website Creation (from 150,000 FCFA)\n2. Sales Funnels & Landing Pages (from 200,000 FCFA)\n3. SEO Optimization (from 100,000 FCFA/month)\n4. Website Redesign (from 120,000 FCFA)\n5. Support & Maintenance (from 30,000 FCFA/month)\n\nWhich service interests you?'
      : 'Nous proposons 5 services principaux :\n\n1. Création de site web (à partir de 150 000 FCFA)\n2. Tunnels de vente & Landing Pages (à partir de 200 000 FCFA)\n3. Référencement SEO (à partir de 100 000 FCFA/mois)\n4. Refonte de site web (à partir de 120 000 FCFA)\n5. Suivi & Maintenance (à partir de 30 000 FCFA/mois)\n\nQuel service vous intéresse ?',
  },
  {
    intent: 'pricing',
    test: /(tarif|prix|price|cost|combien|how much|cout|budget|coute|combien coute|quel est le prix)/i,
    reply: (lang) => lang === 'en'
      ? 'Our pricing:\n\n• Website: from 150,000 FCFA\n• Sales Funnel: from 200,000 FCFA\n• SEO: from 100,000 FCFA/month\n• Redesign: from 120,000 FCFA\n• Landing Page: from 80,000 FCFA\n• Maintenance: from 30,000 FCFA/month\n\nA free quote is always included! Want one?'
      : 'Nos tarifs :\n\n• Site web : à partir de 150 000 FCFA\n• Tunnel de vente : à partir de 200 000 FCFA\n• SEO : à partir de 100 000 FCFA/mois\n• Refonte : à partir de 120 000 FCFA\n• Landing page : à partir de 80 000 FCFA\n• Maintenance : à partir de 30 000 FCFA/mois\n\nUn devis gratuit est toujours inclus ! Vous en voulez un ?',
  },
  {
    intent: 'process',
    test: /(comment.*marche|how.*work|processus|method|process|etape|step|comment.*passe|deroulement)/i,
    reply: (lang) => lang === 'en'
      ? 'Our process in 6 steps:\n\n1. Discovery Call — understand your needs\n2. Proposal & Quote — detailed and free\n3. Design — mockups for validation\n4. Development — building your solution\n5. Testing & Launch — everything works\n6. Support — after-launch assistance\n\nWant to start?'
      : 'Notre processus en 6 étapes :\n\n1. Appel de découverte — comprendre vos besoins\n2. Proposition & devis — détaillé et gratuit\n3. Design — maquettes pour validation\n4. Développement — construction de la solution\n5. Tests & lancement — tout fonctionne\n6. Support — accompagnement après le lancement\n\nVous voulez commencer ?',
  },
  {
    intent: 'timeline',
    test: /(temps|time|duree|duration|delai|deadline|combien de temps|how long|rapide|quick|quand|when.*ready|quand.*pret)/i,
    reply: (lang) => lang === 'en'
      ? 'Timeline depends on the project:\n\n• Simple website: 10-15 business days\n• Complex project: 3-6 weeks\n• Landing page: 5-7 business days\n• SEO: results visible in 3-6 months\n\nWhat project do you have in mind?'
      : 'Les délais dépendent du projet :\n\n• Site simple : 10-15 jours ouvrés\n• Projet complexe : 3-6 semaines\n• Landing page : 5-7 jours ouvrés\n• SEO : résultats visibles en 3-6 mois\n\nQuel projet avez-vous en tête ?',
  },
  {
    intent: 'human',
    test: /(humain|human|personne|someone|parler a|talk to|whatsapp|contact|email|appel|call|joindre|contacter)/i,
    reply: (lang) => lang === 'en'
      ? 'No problem! You can reach our team:\n\nWhatsApp: +229 93 28 82 12\nEmail: contact@primeimpactagency.com\n\nOur team responds within 24h. Want to leave your contact info here too?'
      : 'Pas de problème ! Vous pouvez joindre l\'équipe :\n\nWhatsApp : +229 93 28 82 12\nEmail : contact@primeimpactagency.com\n\nL\'équipe répond sous 24h. Vous voulez laisser vos coordonnées ici aussi ?',
  },
  {
    intent: 'ecommerce',
    test: /(e.?commerce|boutique|shop|vente|product|produit|woocommerce|shopify)/i,
    reply: (lang) => lang === 'en'
      ? 'For e-commerce, we create online stores from 200,000 FCFA with:\n\n• Shopify or WooCommerce\n• Product catalog, cart, checkout\n• Mobile money & card payments\n• Inventory management\n\nWant a quote for your online store?'
      : 'Pour l\'e-commerce, nous créons des boutiques en ligne à partir de 200 000 FCFA avec :\n\n• Shopify ou WooCommerce\n• Catalogue produits, panier, paiement\n• Paiement mobile money & carte\n• Gestion des stocks\n\nVous voulez un devis pour votre boutique ?',
  },
  {
    intent: 'vitrine',
    test: /(vitrine|showcase|site simple|simple site|petit site|small site|site basic|basic site|site internet simple)/i,
    reply: (lang) => lang === 'en'
      ? 'A showcase website starts from 150,000 FCFA. Perfect for presenting your business, services, and contact info. Includes:\n\n• Custom design (no templates)\n• Responsive mobile\n• Contact form\n• Basic SEO\n\nDelivery in 10-15 business days. Interested?'
      : 'Un site vitrine commence à partir de 150 000 FCFA. Idéal pour présenter votre entreprise, vos services et vos coordonnées. Inclus :\n\n• Design sur mesure (zéro template)\n• Adapté mobile\n• Formulaire de contact\n• SEO de base\n\nLivraison sous 10-15 jours ouvrés. Intéressé ?',
  },
  {
    intent: 'saas',
    test: /(saas|application|app.*web|web.*app|logiciel|software|plateforme|platform)/i,
    reply: (lang) => lang === 'en'
      ? 'Custom web applications / SaaS start from 500,000 FCFA. We build:\n\n• Custom dashboards & admin panels\n• User authentication & roles\n• Database integration\n• API development\n\nThis requires a discovery call to understand your needs. Shall we schedule one?'
      : 'Les applications web / SaaS sur mesure commencent à partir de 500 000 FCFA. Nous construisons :\n\n• Tableaux de bord & panneaux d\'admin\n• Authentification & rôles utilisateurs\n• Base de données\n• API sur mesure\n\nCela nécessite un appel découverte. On le planifie ?',
  },
  {
    intent: 'seo',
    test: /(seo|referencement|google|rank|classement|positionnement)/i,
    reply: (lang) => lang === 'en'
      ? 'Our SEO service starts from 100,000 FCFA/month:\n\n• Complete audit & keyword research\n• On-page optimization\n• Technical SEO (speed, mobile, structure)\n• Monthly reports\n• Results visible in 3-6 months\n\nWant to see a sample audit?'
      : 'Notre service SEO commence à partir de 100 000 FCFA/mois :\n\n• Audit complet & recherche de mots-clés\n• Optimisation on-page\n• SEO technique (vitesse, mobile, structure)\n• Rapports mensuels\n• Résultats visibles en 3-6 mois\n\nVous voulez voir un exemple d\'audit ?',
  },
  {
    intent: 'refonte',
    test: /(refonte|redesign|moderniser|update|upgrade|changement|nouveau design|new design)/i,
    reply: (lang) => lang === 'en'
      ? 'A website redesign starts from 120,000 FCFA. We:\n\n• Audit current site (speed, UX, content)\n• Modern design & mobile-first\n• Content migration\n• Admin training included\n\nWant a free audit of your current site?'
      : 'Une refonte de site commence à partir de 120 000 FCFA. Nous :\n\n• Auditions votre site actuel (vitesse, UX, contenu)\n• Design moderne & mobile-first\n• Migration du contenu\n• Formation admin incluse\n\nVous voulez un audit gratuit de votre site actuel ?',
  },
  {
    intent: 'maintenance',
    test: /(maintenance|maintenir|entretien|support|suivi|maintenance|update|mise a jour|mise à jour)/i,
    reply: (lang) => lang === 'en'
      ? 'Our maintenance & support plan starts from 30,000 FCFA/month:\n\n• Monthly updates (security, plugins)\n• Priority WhatsApp support\n• Regular backups\n• Quarterly reports\n• No long-term commitment\n\nWant to subscribe?'
      : 'Notre plan de maintenance & suivi commence à partir de 30 000 FCFA/mois :\n\n• Mises à jour mensuelles (sécurité, plugins)\n• Support prioritaire WhatsApp\n• Sauvegardes régulières\n• Rapports trimestriels\n• Sans engagement\n\nVous voulez souscrire ?',
  },
  {
    intent: 'devis',
    test: /(devis|quote|estimation|proposition|proposal|combien.*pour|combien.*faire|prix.*site)/i,
    reply: (lang) => lang === 'en'
      ? 'We\'d be happy to give you a free quote! To do that, I need a few details:\n\n1. What type of project? (website, funnel, redesign...)\n2. What\'s your activity/business?\n3. Any specific features needed?\n\nOr you can contact us directly:\nWhatsApp: +229 93 28 82 12\nEmail: contact@primeimpactagency.com'
      : 'Nous serions ravis de vous faire un devis gratuit ! Pour cela, j\'ai besoin de quelques informations :\n\n1. Quel type de projet ? (site web, tunnel, refonte...)\n2. Quelle est votre activité ?\n3. Des fonctionnalités spécifiques ?\n\nOu vous pouvez nous contacter directement :\nWhatsApp : +229 93 28 82 12\nEmail : contact@primeimpactagency.com',
  },
  {
    intent: 'immobilier',
    test: /(immobilier|real estate|property|agence immobiliere|notaire|bien|logement|appartement|maison|villa)/i,
    reply: (lang) => lang === 'en'
      ? 'We specialize in real estate websites! Our Elite Immobilier client went from 0 to Top 3 on Google with +300% leads. Real estate packages include:\n\n• Property listings with search & filters\n• Virtual tours, maps & neighborhoods\n• Agent profiles & contact forms\n• SEO optimized for local real estate\n\nInterested in a real estate site?'
      : 'Nous sommes spécialisés dans les sites immobiliers ! Notre client Elite Immobilier est passé de 0 à Top 3 Google avec +300% de leads. Les packages immobiliers incluent :\n\n• Listings avec recherche & filtres\n• Visites virtuelles, cartes & quartiers\n• Profils agents & formulaires\n• SEO optimisé immobilier local\n\nIntéressé par un site immobilier ?',
  },
];

function match(text) {
  const n = normalize(text);
  const raw = text.trim().toLowerCase();
  for (const rule of RULES) {
    if (rule.test.test(n) || rule.test.test(raw)) {
      return rule;
    }
  }
  return null;
}

module.exports = { RULES, match, normalize };
