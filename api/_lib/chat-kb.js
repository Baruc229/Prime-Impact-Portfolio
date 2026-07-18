/* ============================================================
   CHAT KNOWLEDGE BASE v4 — Claude AI (Anthropic) + Fallback PIA
   Utilise Claude pour répondre intelligemment
   Fallback sur les réponses pré-écrites si l'API échoue
   ============================================================ */

const { match } = require('./quick-replies');

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

// ─── Salutations & réponses pré-écrites (0 coût API) ──────

// ─── Claude Client (Anthropic API) ──────────────────────────
let initError = null;

function getApiKey() {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    initError = 'ANTHROPIC_API_KEY not set';
    console.error('[CHAT-KB] ANTHROPIC_API_KEY not set');
    return null;
  }
  return key;
}

// ─── Claude Response ────────────────────────────────────────
async function askClaude(text, history, lang) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  // Build messages for Claude's API format
  const messages = (history || []).map(m => ({
    role: m.sender === 'visitor' ? 'user' : 'assistant',
    content: m.text,
  })).slice(-10);

  messages.push({ role: 'user', content: text });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[CHAT-KB] Claude API error:', res.status, errBody);
      return null;
    }

    const data = await res.json();
    const responseText = data.content?.[0]?.text || null;
    console.log('[CHAT-KB] Claude response OK, length:', responseText ? responseText.length : 0);
    return responseText;
  } catch (e) {
    console.error('[CHAT-KB] Claude fetch error:', e.message);
    return null;
  }
}

// ─── Main: Generate Response ────────────────────────────────
async function generateResponse(text, lang, history) {
  // Check for quick replies first (gratuit, 0 appel API)
  const rule = match(text);
  if (rule) {
    const responseText = rule.reply(lang);
    return { text: responseText, intent: rule.intent, source: 'quick' };
  }

  // Try Claude AI
  const claudeResponse = await askClaude(text, history, lang);
  if (claudeResponse) {
    return { text: claudeResponse, intent: 'ai', source: 'claude' };
  }

  // Fallback: Claude indisponible — message d'attente
  const fallback = lang === 'en'
    ? 'Thanks for your question! A member of our team will respond to you shortly.\n\nIn the meantime, you can also reach us directly:\n📱 WhatsApp: ' + CONTACT.whatsappNum + '\n📧 Email: ' + CONTACT.email
    : 'Merci pour votre question ! Un membre de notre équipe va vous répondre très rapidement.\n\nEn attendant, vous pouvez aussi nous joindre directement :\n📱 WhatsApp : ' + CONTACT.whatsappNum + '\n📧 Email : ' + CONTACT.email;

  return { text: fallback, intent: 'fallback', source: 'fallback' };
}

// ─── Welcome Message ────────────────────────────────────────
function getWelcomeMessage(lang) {
  return lang === 'en'
    ? 'Hello! I\'m the PIA virtual assistant. I can help you with:\n\n• Our services & pricing\n• Web & digital questions\n• How we work\n\nJust ask your question!'
    : 'Bonjour ! Je suis l\'assistant virtuel de PIA. Je peux vous aider avec :\n\n• Nos services & tarifs\n• Questions sur le web & le digital\n• Notre méthode de travail\n\nPosez-moi simplement votre question !';
}

module.exports = { generateResponse, getWelcomeMessage, normalize, getInitError: () => initError };
