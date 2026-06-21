// Single source of truth for the tools navigation bar, shared by every page
// (static + generated). To add/rename a tool, edit TOOLS here only.
// Each page just needs: <nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
// and <script src="nav.js"></script>.
(function () {
  // Apply the saved theme as early as possible (shared across all pages).
  try { document.documentElement.dataset.theme = localStorage.getItem('pm_theme') || 'dark'; } catch (e) {}

  // --- Privacy-first analytics (cookieless, no PII) ------------------------
  // Tracks anonymous page views + which skills/tools are run — NEVER the API
  // key, inputs, or outputs. Disabled until you set your GoatCounter code.
  // Get one free (open-source, no cookies) at https://www.goatcounter.com →
  // then set ANALYTICS_CODE to your subdomain (e.g. 'pm-skills' for
  // pm-skills.goatcounter.com). Leave empty to keep tracking fully OFF.
  var ANALYTICS_CODE = 'mohitagw';
  window.pmTrack = function () {}; // safe no-op until enabled
  if (ANALYTICS_CODE) {
    var gc = document.createElement('script');
    gc.async = true;
    gc.src = '//gc.zgo.at/count.js';
    gc.setAttribute('data-goatcounter', 'https://' + ANALYTICS_CODE + '.goatcounter.com/count');
    document.head.appendChild(gc);
    // Custom events (e.g. a skill run). Only an event name is sent — nothing else.
    window.pmTrack = function (name) {
      try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: String(name).slice(0, 80), event: true }); } catch (e) {}
    };
  }
  var TOOLS = [
    ['index.html', '▶ Playground'],
    ['ask.html', '❓ Ask'],
    ['canvas.html', '🧩 Workflow Canvas'],
    ['agent.html', '✨ Auto-Agent'],
    ['studio.html', '🏗️ Create a skill'],
    ['grade.html', '📝 Grade your work'],
    ['examples.html', '📄 Sample outputs'],
    ['benchmark.html', '🏆 Benchmark'],
    ['community.html', '💬 Community'],
    ['leaderboard.html', '📊 Leaderboard'],
    ['catalog.html', '📚 Catalog'],
    ['learn.html', '🎓 Learn'],
    ['pro.html', '⭐ Pro'],
  ];
  var nav = document.getElementById('toolbar');
  if (!nav) return;
  var file = (location.pathname.split('/').pop() || 'index.html');
  if (file === '' || file === '/') file = 'index.html';
  nav.innerHTML = TOOLS.map(function (t) {
    var active = t[0] === file ? ' active' : '';
    return '<a class="tool' + active + '" href="' + t[0] + '">' + t[1] + '</a>';
  }).join('');

  // Theme toggle — rendered on every page so it works site-wide.
  var t = document.createElement('button');
  t.type = 'button'; t.className = 'tool theme-pill'; t.title = 'Toggle light / dark';
  var setIcon = function () { t.textContent = document.documentElement.dataset.theme === 'light' ? '☀️' : '🌙'; };
  setIcon();
  t.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('pm_theme', next); } catch (e) {}
    setIcon();
  });
  nav.appendChild(t);
})();
