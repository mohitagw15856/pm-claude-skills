// Dictation for every text box in the playground: a 🎤 button that dictates into the field
// using the browser's own speech recognition (Chrome, Edge, Safari). Chinese when the page or
// browser is set to Chinese, otherwise the browser language. The button only appears where the
// browser supports speech; the browser's speech service may send audio to its vendor, and
// Chrome's service is not reachable from mainland China (Edge and Safari use their own).
(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return;
  const zh = () => (document.documentElement.lang || navigator.language || '').toLowerCase().startsWith('zh');
  const label = () => (zh() ? '语音输入（使用浏览器的语音服务）' : 'Dictate (uses your browser’s speech service)');
  const style = document.createElement('style');
  style.textContent = '.pm-mic{margin:4px 0 0;padding:4px 10px;font:inherit;font-size:13px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;opacity:.75;cursor:pointer}.pm-mic[aria-pressed="true"]{opacity:1;color:#c0392b}';
  document.head.appendChild(style);
  let active = null;
  function attach(field) {
    if (field.dataset.pmMic || field.type === 'password' || field.closest('[data-no-voice]')) return;
    field.dataset.pmMic = '1';
    const btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'pm-mic'; btn.textContent = '🎤'; btn.title = label();
    btn.setAttribute('aria-label', label()); btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', () => {
      if (active) { active.stop(); return; }
      const rec = new SR();
      rec.lang = zh() ? 'zh-CN' : (navigator.language || 'en-GB');
      rec.interimResults = false; rec.continuous = false;
      const start = field.value;
      rec.onresult = (e) => {
        const text = Array.from(e.results).map((r) => r[0].transcript).join('');
        field.value = start + (start && !/\s$/.test(start) ? ' ' : '') + text;
        field.dispatchEvent(new Event('input', { bubbles: true }));
      };
      rec.onend = () => { active = null; btn.setAttribute('aria-pressed', 'false'); };
      rec.onerror = () => { active = null; btn.setAttribute('aria-pressed', 'false'); };
      active = rec; btn.setAttribute('aria-pressed', 'true'); rec.start();
    });
    field.insertAdjacentElement('afterend', btn);
  }
  const scan = (root) => root.querySelectorAll && root.querySelectorAll('textarea').forEach(attach);
  const start = () => {
    scan(document);
    new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.tagName === 'TEXTAREA') attach(n); scan(n); } })))
      .observe(document.body, { childList: true, subtree: true });
  };
  // Safe to load from <head>: wait for the body before scanning and observing.
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
