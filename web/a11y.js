// Accessibility toolkit — a small, dependency-free widget any page can include
// (just add <script src="a11y.js"></script>). Adds a floating ♿ button that opens
// a panel with: high-contrast mode, a dyslexia-friendly font + wider spacing,
// larger text, reduced motion, and a "skip to main content" link for keyboard
// users. Choices persist in localStorage and apply on every page that loads it.
(function () {
  'use strict';
  var KEY = 'pm_a11y_v1';
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function set(p) { var s = Object.assign(get(), p); localStorage.setItem(KEY, JSON.stringify(s)); apply(); return s; }

  function apply() {
    var s = get(), r = document.documentElement;
    r.classList.toggle('a11y-contrast', !!s.contrast);
    r.classList.toggle('a11y-dyslexic', !!s.dyslexic);
    r.classList.toggle('a11y-large', !!s.large);
    r.classList.toggle('a11y-motion', !!s.reduceMotion);
  }

  var css = '' +
    '.a11y-btn{position:fixed;right:14px;bottom:14px;z-index:9998;width:44px;height:44px;border-radius:50%;border:1px solid var(--border,#2a313c);background:var(--panel,#161a21);color:var(--text,#e7ebf0);font-size:20px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35)}' +
    '.a11y-panel{position:fixed;right:14px;bottom:66px;z-index:9999;width:250px;background:var(--panel,#161a21);border:1px solid var(--border,#2a313c);border-radius:14px;padding:12px 14px;box-shadow:0 14px 40px rgba(0,0,0,.45);display:none;font:14px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--text,#e7ebf0)}' +
    '.a11y-panel.open{display:block}.a11y-panel h3{margin:0 0 8px;font-size:13px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted,#9aa4b2)}' +
    '.a11y-panel label{display:flex;align-items:center;gap:9px;padding:6px 0;cursor:pointer}.a11y-panel input{accent-color:var(--accent,#d97757);width:16px;height:16px}' +
    '.a11y-skip{position:absolute;left:-9999px;top:0;z-index:10000;background:var(--accent,#d97757);color:#1a1207;padding:10px 16px;border-radius:0 0 8px 0;font-weight:700;text-decoration:none}' +
    '.a11y-skip:focus{left:0}' +
    'html.a11y-contrast{filter:contrast(1.25)}html.a11y-contrast body{background:#000!important;color:#fff!important}' +
    'html.a11y-dyslexic body,html.a11y-dyslexic textarea,html.a11y-dyslexic input{font-family:"Comic Sans MS","Trebuchet MS",Verdana,sans-serif!important;letter-spacing:.03em!important;word-spacing:.16em!important;line-height:1.7!important}' +
    'html.a11y-large body{font-size:118%!important}' +
    'html.a11y-motion *{animation:none!important;transition:none!important;scroll-behavior:auto!important}' +
    ':focus-visible{outline:3px solid var(--accent,#d97757)!important;outline-offset:2px}';

  function init() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    // Skip link → first main/section/canvas.
    var skip = document.createElement('a'); skip.className = 'a11y-skip'; skip.href = '#a11y-main'; skip.textContent = 'Skip to main content';
    var main = document.querySelector('main, [role=main], .grade-wrap, .mk-wrap, canvas, section, nav');
    if (main) main.id = main.id || 'a11y-main';
    document.body.insertBefore(skip, document.body.firstChild);

    var btn = document.createElement('button'); btn.className = 'a11y-btn'; btn.setAttribute('aria-label', 'Accessibility options'); btn.textContent = '♿';
    var panel = document.createElement('div'); panel.className = 'a11y-panel'; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', 'Accessibility options');
    var s = get();
    var opts = [['contrast', 'High contrast'], ['dyslexic', 'Dyslexia-friendly font'], ['large', 'Larger text'], ['reduceMotion', 'Reduce motion']];
    panel.innerHTML = '<h3>♿ Accessibility</h3>' + opts.map(function (o) {
      return '<label><input type="checkbox" data-k="' + o[0] + '"' + (s[o[0]] ? ' checked' : '') + '> ' + o[1] + '</label>';
    }).join('');
    btn.addEventListener('click', function () { panel.classList.toggle('open'); });
    panel.addEventListener('change', function (e) { if (e.target.dataset.k) { var p = {}; p[e.target.dataset.k] = e.target.checked; set(p); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') panel.classList.remove('open'); });
    document.body.appendChild(btn); document.body.appendChild(panel);
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
