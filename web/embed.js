// PM Skills embeddable widget. Drop this on any page:
//   <div data-pm-skill="prd-template"></div>
//   <script src="https://mohitagw15856.github.io/pm-claude-skills/embed.js" async></script>
// It renders a compact, branded "Run this skill" card that links back to the
// playground (prefilled). Self-contained, no dependencies, no tracking.
(function () {
  var BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
  var CSS =
    '.pmskill{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;max-width:460px;border:1px solid #2a313c;border-radius:14px;background:#161a21;color:#e7ebf0;padding:16px 18px;line-height:1.5}' +
    '.pmskill .pmtop{display:flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.03em;text-transform:uppercase;color:#e89b82;font-weight:600;margin-bottom:6px}' +
    '.pmskill .pmtitle{font-size:17px;font-weight:700;margin:0 0 4px}' +
    '.pmskill .pmdesc{font-size:13px;color:#95a0b0;margin:0 0 14px}' +
    '.pmskill .pmrun{display:inline-block;background:linear-gradient(135deg,#e0855f,#d9605a);color:#1a1207;font-weight:700;font-size:14px;text-decoration:none;padding:9px 16px;border-radius:9px}' +
    '.pmskill .pmrun:hover{filter:brightness(1.06)}' +
    '.pmskill .pmfoot{font-size:11px;color:#6b7585;margin-top:12px}.pmskill .pmfoot a{color:#95a0b0}' +
    '.pmskill .pmbadge{font-size:10px;font-weight:700;color:#6ee7b7;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.35);border-radius:99px;padding:2px 7px;margin-left:auto}';

  function injectCSS() {
    if (document.getElementById('pmskill-css')) return;
    var s = document.createElement('style'); s.id = 'pmskill-css'; s.textContent = CSS; document.head.appendChild(s);
  }
  var esc = function (t) { var d = document.createElement('div'); d.textContent = t == null ? '' : t; return d.innerHTML; };

  function render(elArr, skills) {
    var byName = {}; skills.forEach(function (s) { byName[s.name] = s; });
    elArr.forEach(function (host) {
      var name = host.getAttribute('data-pm-skill');
      var s = byName[name];
      if (!s) { host.innerHTML = '<div class="pmskill"><p class="pmdesc">Skill "' + esc(name) + '" not found.</p></div>'; return; }
      var play = BASE + '/index.html?skill=' + encodeURIComponent(s.name);
      var badge = s.eval ? '<span class="pmbadge">✅ ' + s.eval.score + '/5</span>' : '';
      host.innerHTML =
        '<div class="pmskill">' +
        '<div class="pmtop"><span>🧠 ' + esc(s.plugin || 'PM Skills') + '</span>' + badge + '</div>' +
        '<h3 class="pmtitle">' + esc(s.title) + '</h3>' +
        '<p class="pmdesc">' + esc(s.summary || s.description || '') + '</p>' +
        '<a class="pmrun" href="' + play + '" target="_blank" rel="noopener">▶ Run this skill free</a>' +
        '<div class="pmfoot">Powered by <a href="' + BASE + '/" target="_blank" rel="noopener">PM Skills</a> — 175 open-source AI agent skills</div>' +
        '</div>';
    });
  }

  function init() {
    var hosts = [].slice.call(document.querySelectorAll('[data-pm-skill]'));
    if (!hosts.length) return;
    injectCSS();
    fetch(BASE + '/skills.json').then(function (r) { return r.json(); }).then(function (d) { render(hosts, d.skills || []); })
      .catch(function () { hosts.forEach(function (h) { h.innerHTML = '<div class="pmskill"><a class="pmrun" href="' + BASE + '/">▶ Open PM Skills</a></div>'; }); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
