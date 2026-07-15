/* ============================================================
   CHAT KNOWLEDGE BASE v3 — Gemini AI + Fallback PIA
   Utilise Gemini pour répondre intelligemment
   Fallback sur les réponses pré-écrites si l'API échoue
   ============================================================ */

const { GoogleGenAI } = require('@google/genai');

const CONTACT = {
  whatsapp: 'https://wa.me/22993288212',
  whatsappNum: '+229 93 28 82 12',
  email: 'contact@primeimpactagency.com',
  site: 'https://primeimpactagency.com',
  facebook: 'https://www.facebook.com/share/196KYqfDUw/',
  linkedin: 'https://www.linkedin.com/in/schallom-sogbossi-4a6040322',
};

// ─── System Prompt PIA (toutes les infos du site) ──────────
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Prime Impact Agency (PIA), une agence web & marketing digital fondée par Schallom Sogbossi. Tu réponds aux questions des visiteurs du site primeimpactagency.com.

## INFORMATIONS SUR L'AGENCE
- Nom : Prime Impact Agency (PIA)
- Fondateur : Schallom Sogbossi (Webmaster & Web Marketing Expert)
- Basé à : Cotonou, Bénin (travaille à distance avec des clients partout)
- Disponibilité : Lun-Ven 8h-19h, Sam 9h-17h, Dim sur rendez-vous
- Philosophie : Un site web n'est pas une vitrine — c'est un outil de vente

## NOS 5 SERVICES PRINCIPAUX

### 1. Création de site web (à partir de 150 000 FCFA)
- Sites vitrine, e-commerce, immobilier, réservation, blog, portfolio
- Design 100% sur mesure (zéro templates), responsive, premium
- SEO intégré dès la conception
- CMS : WordPress, Shopify
- Délai : site vitrine 10-15 jours ouvrés, projet complexe 3-6 semaines

### 2. Tunnels de vente & Landing Pages (à partir de 200 000 FCFA)
- Pages complètes : offre → upsell/downsell → confirmation
- Landing pages optimisées conversion
- Emails automatisés (panier abandonné, nurturing, onboarding)
- Outils : WPFunnels, Cartflows, Omnisend
- Idéal pour : coaches, produits info, startups, e-commerce

### 3. Référencement SEO (à partir de 100 000 FCFA/mois)
- Audit SEO complet, recherche de mots-clés, optimisation on-page
- SEO technique (vitesse, mobile, structure), netlinking
- Rapport mensuel, résultats visibles en 3-6 mois

### 4. Refonte de site web (à partir de 120 000 FCFA)
- Audit complet (performance, structure, contenu, comportement visiteurs)
- Nouveau design moderne, optimisation vitesse, mobile-first
- Formation admin incluse, migration de contenu

### 5. Suivi & Accompagnement (à partir de 30 000 FCFA/mois)
- Maintenance mensuelle (mises à jour, sauvegardes, sécurité)
- Support prioritaire WhatsApp
- Rapport trimestriel, pas d'engagement long

## AUTRES SERVICES
- SaaS / Application web : à partir de 500 000 FCFA
- Landing page seule : à partir de 80 000 FCFA
- Audit & stratégie digitale
- Réseaux sociaux & publicité
- Email marketing

## PROCESSUS DE TRAVAIL (6 étapes)
1. Appel de découverte — comprendre les besoins
2. Proposition & devis — proposition détaillée gratuite
3. Design — maquettes pour validation
4. Développement — construction de la solution
5. Tests & lancement — vérification que tout fonctionne
6. Support — accompagnement après le lancement

## RÉSULTATS & CHIFFRES CLÉS
- 25+ entrepreneurs accompagnés
- 100% de satisfaction client
- Sites chargent en moins de 3 secondes
- Augmentation moyenne du taux de conversion après refonte
- Exemples de résultats :
  - Boutique Mode Prestige : +180% revenus, +420 leads/mois
  - Elite Immobilier Lyon : +300% leads, Top 3 Google
  - Coaching Business Pro : 38% conversion, ROI x4

## TARIFS (fourchettes en FCFA)
- Site vitrine : à partir de 150 000 FCFA
- Tunnel de vente : à partir de 200 000 FCFA
- SEO : à partir de 100 000 FCFA/mois
- Refonte : à partir de 120 000 FCFA
- SaaS/App : à partir de 500 000 FCFA
- Landing page : à partir de 80 000 FCFA
- Maintenance : à partir de 30 000 FCFA/mois
- Le prix dépend de la complexité. Devis toujours gratuit.

## TECHNOLOGIES
- Frontend : HTML5, CSS3, JavaScript, React, Next.js, Framer, Flutter
- Backend : Node.js, PHP, Python
- CMS : WordPress, Shopify
- E-commerce : Shopify, WooCommerce, PrestaShop
- Paiement : Stripe, PayPal, mobile money
- Design : Figma
- Analytics : Google Analytics, Hotjar
- Hosting : Vercel

## SECTEURS D'ACTIVITÉS
Immobilier, e-commerce, coaching, santé, construction, restauration, conseil, ONG, associations, etc.

## CONTACT
- WhatsApp : +229 93 28 82 12
- Email : contact@primeimpactagency.com
- Site : https://primeimpactagency.com
- LinkedIn : https://www.linkedin.com/in/schallom-sogbossi-4a6040322
- Facebook : https://www.facebook.com/share/196KYqfDUw/

## RÈGLES DE RÉPONSE
- Réponds toujours en français (ou en anglais si le visiteur écrit en anglais)
- Sois chaleureux, professionnel et concis
- Utilise des emojis avec modération
- Si on te demande un prix, donne toujours la fourchette et propose un devis gratuit
- Si on te demande de parler à un humain, donne le WhatsApp et l'email et dis que l'équipe répond sous 24h
- Ne invente JAMAIS de prix ou d'informations que tu ne connais pas
- Si tu ne sais pas, dis-le honnêtement et oriente vers le contact
- Termine toujours par une question ou un appel à l'action
- N'utilise pas de markdown (pas de **, pas de #), écris en texte simple
- Garde les réponses courtes (max 150 mots sauf si on demande des détails)`;

// ─── Normalisation ──────────────────────────────────────────
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Salutations & remerciements (réponses rapides) ─────────
const QUICK_REPLIES = {
  greeting: /^(bonjour|salut|hello|hey|coucou|bonsoir|bjr|slt|bonjour pia|salut pia|bonsoir pia)\s*[!.?]*$/,
  thanks: /^(merci|thanks|super|parfait|genial|ok|cool|excellent|merci beaucoup|ok merci|c bon|c'est bon|noted|compris|d'accord)\s*[!.?]*$/,
  help: /^(aide|help|menu|options|que sais tu|que peux tu|quoi d'autre|autre chose)\s*[!.?]*$/,
  services: /(quel.*service|what.*service|que proposez|what.*offer|nos services|our services)/i,
  pricing: /(tarif|prix|price|cost|combien|how much|cout|budget)/i,
  process: /(comment.*marche|how.*work|processus|method|process|etape|step)/i,
  timeline: /(temps|time|duree|duration|delai|deadline|combien de temps|how long|rapide|quick)/i,
  human: /(humain|human|personne|someone|parler a|talk to|whatsapp|contact|email|appel|call)/i,
};

function detectQuickReply(text) {
  const n = normalize(text);
  const raw = text.trim().toLowerCase();
  for (const [intent, regex] of Object.entries(QUICK_REPLIES)) {
    if (regex.test(n) || regex.test(raw)) return intent;
  }
  return null;
}

const QUICK_RESPONSES = {
  greeting: (lang) => lang === 'en'
    ? 'Hello! Welcome to Prime Impact Agency. I\'m here to help you with any questions about our services, pricing, or anything web & digital. What would you like to know?'
    : 'Bonjour ! Bienvenue sur Prime Impact Agency. Je suis l\'assistant virtuel de PIA. Je peux répondre à toutes vos questions sur nos services, nos tarifs, ou tout ce qui concerne le web et le digital. Comment puis-je vous aider ?',
  thanks: (lang) => lang === 'en'
    ? 'You\'re welcome! Feel free to ask anything else.'
    : 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions.',
  help: (lang) => lang === 'en'
    ? 'Here\'s what I can help you with:\n\n• Our services (websites, funnels, SEO...)\n• Pricing & quotes\n• How we work\n• Web & digital questions\n• Contact information\n\nJust ask your question!'
    : 'Voici ce que je peux faire pour vous :\n\n• Nos services (sites web, tunnels, SEO...)\n• Nos tarifs & devis\n• Notre méthode de travail\n• Questions sur le web & le digital\n• Nos coordonnées\n\nPosez-moi simplement votre question !',
  services: (lang) => lang === 'en'
    ? 'We offer 5 main services:\n\n1. Website Creation (from 150,000 FCFA)\n2. Sales Funnels & Landing Pages (from 200,000 FCFA)\n3. SEO Optimization (from 100,000 FCFA/month)\n4. Website Redesign (from 120,000 FCFA)\n5. Support & Maintenance (from 30,000 FCFA/month)\n\nWhich service interests you?'
    : 'Nous proposons 5 services principaux :\n\n1. Création de site web (à partir de 150 000 FCFA)\n2. Tunnels de vente & Landing Pages (à partir de 200 000 FCFA)\n3. Référencement SEO (à partir de 100 000 FCFA/mois)\n4. Refonte de site web (à partir de 120 000 FCFA)\n5. Suivi & Maintenance (à partir de 30 000 FCFA/mois)\n\nQuel service vous intéresse ?',
  pricing: (lang) => lang === 'en'
    ? 'Our pricing:\n\n• Website: from 150,000 FCFA\n• Sales Funnel: from 200,000 FCFA\n• SEO: from 100,000 FCFA/month\n• Redesign: from 120,000 FCFA\n• Landing Page: from 80,000 FCFA\n• Maintenance: from 30,000 FCFA/month\n\nA free quote is always included! Want one?'
    : 'Nos tarifs :\n\n• Site web : à partir de 150 000 FCFA\n• Tunnel de vente : à partir de 200 000 FCFA\n• SEO : à partir de 100 000 FCFA/mois\n• Refonte : à partir de 120 000 FCFA\n• Landing page : à partir de 80 000 FCFA\n• Maintenance : à partir de 30 000 FCFA/mois\n\nUn devis gratuit est toujours inclus ! Vous en voulez un ?',
  process: (lang) => lang === 'en'
    ? 'Our process in 6 steps:\n\n1. Discovery Call — understand your needs\n2. Proposal & Quote — detailed and free\n3. Design — mockups for validation\n4. Development — building your solution\n5. Testing & Launch — everything works\n6. Support — after-launch assistance\n\nWant to start?'
    : 'Notre processus en 6 étapes :\n\n1. Appel de découverte — comprendre vos besoins\n2. Proposition & devis — détaillé et gratuit\n3. Design — maquettes pour validation\n4. Développement — construction de la solution\n5. Tests & lancement — tout fonctionne\n6. Support — accompagnement après le lancement\n\nVous voulez commencer ?',
  timeline: (lang) => lang === 'en'
    ? 'Timeline depends on the project:\n\n• Simple website: 10-15 business days\n• Complex project: 3-6 weeks\n• Landing page: 5-7 business days\n• SEO: results visible in 3-6 months\n\nWhat project do you have in mind?'
    : 'Les délais dépendent du projet :\n\n• Site simple : 10-15 jours ouvrés\n• Projet complexe : 3-6 semaines\n• Landing page : 5-7 jours ouvrés\n• SEO : résultats visibles en 3-6 mois\n\nQuel projet avez-vous en tête ?',
  human: (lang) => lang === 'en'
    ? 'No problem! You can reach our team:\n\n📱 WhatsApp: +229 93 28 82 12\n📧 Email: contact@primeimpactagency.com\n\nOur team responds within 24h. Want to leave your contact info here too?'
    : 'Pas de problème ! Vous pouvez joindre l\'équipe :\n\n📱 WhatsApp : +229 93 28 82 12\n📧 Email : contact@primeimpactagency.com\n\nL\'équipe répond sous 24h. Vous voulez laisser vos coordonnées ici aussi ?',
};

// ─── Gemini Client ──────────────────────────────────────────
let genAI = null;
let initError = null;

function initGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    initError = 'GEMINI_API_KEY not set';
    console.error('[CHAT-KB] GEMINI_API_KEY not set');
    return false;
  }
  try {
    genAI = new GoogleGenAI({ apiKey });
    initError = null;
    console.log('[CHAT-KB] Gemini initialized OK, key starts with:', apiKey.substring(0, 6));
    return true;
  } catch (e) {
    initError = e.message;
    console.error('[CHAT-KB] Gemini init error:', e.message);
    return false;
  }
}

// ─── Gemini Response ────────────────────────────────────────
async function askGemini(text, history, lang) {
  if (!genAI) {
    if (!initGemini()) return null;
  }

  try {
    const messages = (history || []).map(m => ({
      role: m.sender === 'visitor' ? 'user' : 'model',
      parts: [{ text: m.text }],
    })).slice(-10);

    messages.push({ role: 'user', parts: [{ text }] });

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: messages,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });
    const responseText = result.text;
    console.log('[CHAT-KB] Gemini response OK, length:', responseText ? responseText.length : 0);
    return responseText || null;
  } catch (e) {
    console.error('[CHAT-KB] Gemini error:', e.message, e.status || '', e.code || '');
    return null;
  }
}

// ─── Main: Generate Response ────────────────────────────────
async function generateResponse(text, lang, history) {
  // Check for quick replies first (greeting, thanks, help)
  const quickIntent = detectQuickReply(text);
  if (quickIntent && QUICK_RESPONSES[quickIntent]) {
    const responseText = QUICK_RESPONSES[quickIntent](lang);
    return { text: responseText, intent: quickIntent, source: 'quick' };
  }

  // Try Gemini AI
  const geminiResponse = await askGemini(text, history, lang);
  if (geminiResponse) {
    return { text: geminiResponse, intent: 'ai', source: 'gemini' };
  }

  // Fallback: return a simple message if Gemini fails
  const fallback = lang === 'en'
    ? 'I\'m having trouble connecting right now. You can reach our team directly:\n\n📱 WhatsApp: ' + CONTACT.whatsappNum + '\n📧 Email: ' + CONTACT.email
    : 'J\'ai un petit souci de connexion pour le moment. Vous pouvez nous joindre directement :\n\n📱 WhatsApp : ' + CONTACT.whatsappNum + '\n📧 Email : ' + CONTACT.email;

  return { text: fallback, intent: 'fallback', source: 'fallback' };
}

// ─── Welcome Message ────────────────────────────────────────
function getWelcomeMessage(lang) {
  return lang === 'en'
    ? 'Hello! I\'m the PIA virtual assistant. I can help you with:\n\n• Our services & pricing\n• Web & digital questions\n• How we work\n\nJust ask your question!'
    : 'Bonjour ! Je suis l\'assistant virtuel de PIA. Je peux vous aider avec :\n\n• Nos services & tarifs\n• Questions sur le web & le digital\n• Notre méthode de travail\n\nPosez-moi simplement votre question !';
}

module.exports = { generateResponse, getWelcomeMessage, normalize, getInitError: () => initError };
