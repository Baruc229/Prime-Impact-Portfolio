/* ============================================================
   CHAT WIDGET JS — Prime Impact Agency
   Widget de chat temps réel pour les visiteurs
   ============================================================ */

(function () {
  'use strict';

  // ─── Config ──────────────────────────────────────────
  const API_BASE = window.location.origin + '/api/chat';
  const POLL_INTERVAL = 3000;
  const LANG = (document.documentElement.lang || 'fr').substring(0, 2);

  // ─── State ───────────────────────────────────────────
  let sessionId = localStorage.getItem('pia_chat_session') || null;
  let isOpen = false;
  let pollTimer = null;
  let lastTimestamp = 0;
  let unreadCount = 0;

  // ─── DOM ─────────────────────────────────────────────
  function createWidget() {
    // Bubble
    const bubble = document.createElement('button');
    bubble.id = 'pia-chat-bubble';
    bubble.innerHTML = '<i class="fa-solid fa-comments chat-icon-open"></i><i class="fa-solid fa-xmark chat-icon-close"></i><span class="unread-badge" id="pia-chat-unread">0</span>';
    bubble.setAttribute('aria-label', 'Ouvrir le chat');
    bubble.onclick = toggleChat;

    // Window
    const win = document.createElement('div');
    win.id = 'pia-chat-window';
    win.innerHTML = `
      <div class="pia-chat-header">
        <div class="pia-chat-header-avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="pia-chat-header-info">
          <h3>PIA Assistant</h3>
          <span><span class="online-dot"></span> En ligne</span>
        </div>
        <button class="pia-chat-close" id="pia-chat-close-btn" aria-label="Fermer le chat"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="pia-chat-messages" id="pia-chat-messages">
        <div class="pia-chat-typing" id="pia-chat-typing">
          <div class="pia-chat-typing-dots"><span></span><span></span><span></span></div>
        </div>
      </div>
      <div class="pia-chat-input-area">
        <textarea class="pia-chat-input" id="pia-chat-input" placeholder="Écrivez votre message..." rows="1" maxlength="1000"></textarea>
        <button class="pia-chat-send" id="pia-chat-send-btn" aria-label="Envoyer"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
      <div class="pia-chat-footer">Propulsé par Prime Impact Agency</div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(win);

    // Event listeners
    document.getElementById('pia-chat-close-btn').onclick = toggleChat;
    document.getElementById('pia-chat-send-btn').onclick = sendMessage;

    const input = document.getElementById('pia-chat-input');
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    input.addEventListener('input', autoResize);
  }

  function autoResize() {
    const el = document.getElementById('pia-chat-input');
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  }

  // ─── API calls ───────────────────────────────────────
  async function apiCall(endpoint, method, body) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    try {
      const res = await fetch(API_BASE + endpoint, opts);
      return await res.json();
    } catch (e) {
      console.error('[PIA Chat] API error:', e);
      return null;
    }
  }

  async function ensureSession() {
    if (sessionId) {
      const data = await apiCall('/sessions?id=' + sessionId, 'GET');
      if (data && !data.error) return data;
    }
    // Créer une nouvelle session
    const data = await apiCall('/sessions', 'POST', {
      name: 'Visiteur',
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      lang: LANG,
    });
    if (data && data.session) {
      sessionId = data.session.id;
      localStorage.setItem('pia_chat_session', sessionId);
      return data.session;
    }
    return null;
  }

  // ─── Messages ────────────────────────────────────────
  function formatTime(ts) {
    const d = new Date(ts);
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  function addMessageToUI(msg) {
    const container = document.getElementById('pia-chat-messages');
    const typing = document.getElementById('pia-chat-typing');

    const div = document.createElement('div');
    div.className = 'pia-chat-msg ' + msg.sender;
    div.dataset.id = msg.id;

    const avatar = msg.sender === 'bot'
      ? '<i class="fa-solid fa-robot"></i>'
      : msg.sender === 'admin'
        ? '<img src="/assets/SCHALLOM-pro..avif" alt="Schallom" onerror="this.outerHTML=\'<i class=\\\'fa-solid fa-headset\\\'></i>\'">'
        : '<i class="fa-solid fa-user"></i>';
    div.innerHTML = `
      <div class="pia-chat-msg-avatar">${avatar}</div>
      <div>
        <div class="pia-chat-msg-bubble">${escapeHtml(msg.text)}</div>
        <div class="pia-chat-msg-time">${formatTime(msg.timestamp)}</div>
      </div>
    `;

    container.insertBefore(div, typing);
    container.scrollTop = container.scrollHeight;

    // Mark links
    div.querySelectorAll('.pia-chat-msg-bubble').forEach(b => {
      b.innerHTML = b.innerHTML.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function loadExistingMessages() {
    if (!sessionId) return;
    const data = await apiCall('/messages?sessionId=' + sessionId, 'GET');
    if (data && data.messages) {
      data.messages.forEach(msg => {
        addMessageToUI(msg);
        if (msg.timestamp > lastTimestamp) lastTimestamp = msg.timestamp;
      });
    }
  }

  async function sendMessage() {
    const input = document.getElementById('pia-chat-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';

    // Disable send button
    const sendBtn = document.getElementById('pia-chat-send-btn');
    sendBtn.disabled = true;

    // Ensure session
    if (!sessionId) await ensureSession();
    if (!sessionId) return;

    // Optimistic UI: add visitor message immediately
    const tempMsg = {
      id: 'temp_' + Date.now(),
      sender: 'visitor',
      text: text,
      timestamp: Date.now(),
    };
    addMessageToUI(tempMsg);

    // Show typing
    showTyping();

    // Send to API
    const data = await apiCall('/messages', 'POST', {
      sessionId,
      sender: 'visitor',
      senderName: 'Visiteur',
      text,
      lang: LANG,
    });

    hideTyping();

    if (data) {
      // Replace temp message and add bot response
      if (data.visitorMessage) {
        const tempEl = document.querySelector(`[data-id="${tempMsg.id}"]`);
        if (tempEl) tempEl.dataset.id = data.visitorMessage.id;
        lastTimestamp = Math.max(lastTimestamp, data.visitorMessage.timestamp);
      }
      if (data.botMessage) {
        addMessageToUI(data.botMessage);
        lastTimestamp = Math.max(lastTimestamp, data.botMessage.timestamp);
      }
    }

    sendBtn.disabled = false;
  }

  function showTyping() {
    const typing = document.getElementById('pia-chat-typing');
    typing.classList.add('show');
    const container = document.getElementById('pia-chat-messages');
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('pia-chat-typing').classList.remove('show');
  }

  // ─── Polling ─────────────────────────────────────────
  async function pollMessages() {
    if (!sessionId || !isOpen) return;
    const data = await apiCall(`/messages?sessionId=${sessionId}&since=${lastTimestamp}`, 'GET');
    if (data && data.messages) {
      data.messages.forEach(msg => {
        if (msg.timestamp > lastTimestamp) {
          addMessageToUI(msg);
          lastTimestamp = Math.max(lastTimestamp, msg.timestamp);
          if (msg.sender === 'admin' || msg.sender === 'bot') {
            if (!isOpen) {
              unreadCount++;
              updateUnreadBadge();
            }
          }
        }
      });
    }
  }

  function startPolling() {
    stopPolling();
    pollTimer = setInterval(pollMessages, POLL_INTERVAL);
  }

  function stopPolling() {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }

  function updateUnreadBadge() {
    const badge = document.getElementById('pia-chat-unread');
    if (unreadCount > 0) {
      badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  }

  // ─── Toggle ──────────────────────────────────────────
  async function toggleChat() {
    isOpen = !isOpen;
    const bubble = document.getElementById('pia-chat-bubble');
    const win = document.getElementById('pia-chat-window');

    if (isOpen) {
      bubble.classList.add('open');
      win.classList.add('open');
      unreadCount = 0;
      updateUnreadBadge();

      if (!sessionId) {
        await ensureSession();
        if (sessionId) {
          await loadExistingMessages();
          // If no messages, the welcome message was already added by the API
          const data = await apiCall('/messages?sessionId=' + sessionId, 'GET');
          if (data && data.messages && data.messages.length === 0) {
            // Reload to get welcome message
            await loadExistingMessages();
          }
        }
      } else {
        await loadExistingMessages();
      }

      startPolling();
      document.getElementById('pia-chat-input').focus();
    } else {
      bubble.classList.remove('open');
      win.classList.remove('open');
      stopPolling();
    }
  }

  // ─── Init ────────────────────────────────────────────
  function init() {
    createWidget();

    // Check for existing session on load
    if (sessionId) {
      apiCall('/sessions?id=' + sessionId, 'GET').then(data => {
        if (!data || data.error) {
          sessionId = null;
          localStorage.removeItem('pia_chat_session');
        }
      });
    }
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
