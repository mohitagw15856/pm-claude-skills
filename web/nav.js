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
  // Top-level links stay flat; everything else is tucked into two dropdown groups so the bar
  // stays short. To add/move a tool, edit this list only.
  var NAV = [
    { href: 'index.html', label: '▶ Playground' },
    { href: 'galaxy.html', label: '🌌 Galaxy' },
    { group: 'Tools', items: [
      ['agent.html', '✨ Auto-Agent'],
      ['canvas.html', '🧩 Workflow Canvas'],
      ['ask.html', '❓ Ask'],
      ['brain.html', '🧠 Brain'],
      ['grade.html', '📝 Grade your work'],
      ['studio.html', '🏗️ Create a skill'],
    ] },
    { group: 'Explore', items: [
      ['catalog.html', '📚 Catalog'],
      ['examples.html', '📄 Sample outputs'],
      ['leaderboard.html', '📊 Leaderboard'],
      ['benchmark.html', '🏆 Benchmark'],
      ['learn.html', '🎓 Learn'],
      ['guide.html', '📖 Guide'],
      ['community.html', '💬 Community'],
    ] },
    { href: 'pro.html', label: '⭐ Pro' },
    // Always-visible way back to the source — opens the GitHub repo in a new tab.
    { href: 'https://github.com/mohitagw15856/pm-claude-skills', label: '★ GitHub', external: true, cta: true },
  ];
  var nav = document.getElementById('toolbar');
  if (!nav) return;
  var file = (location.pathname.split('/').pop() || 'index.html');
  if (file === '' || file === '/') file = 'index.html';
  var link = function (href, lbl) { return '<a class="tool' + (href === file ? ' active' : '') + '" href="' + href + '">' + lbl + '</a>'; };
  nav.innerHTML = NAV.map(function (it) {
    if (it.external) return '<a class="tool' + (it.cta ? ' cta' : '') + '" href="' + it.href + '" target="_blank" rel="noopener">' + it.label + '</a>';
    if (it.href) return link(it.href, it.label);
    var here = it.items.some(function (t) { return t[0] === file; });
    return '<span class="tool-group">'
      + '<button type="button" class="tool group-btn' + (here ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' + it.group + ' ▾</button>'
      + '<span class="group-menu" hidden>' + it.items.map(function (t) { return link(t[0], t[1]); }).join('') + '</span>'
      + '</span>';
  }).join('');

  // Dropdown open/close (click to toggle, outside-click / Escape to close).
  var groups = [].slice.call(nav.querySelectorAll('.tool-group'));
  function closeAll(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.querySelector('.group-menu').hidden = true;
      g.querySelector('.group-btn').setAttribute('aria-expanded', 'false');
    });
  }
  groups.forEach(function (g) {
    var btn = g.querySelector('.group-btn'), menu = g.querySelector('.group-menu');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = menu.hidden;
      closeAll(g);
      menu.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });
  document.addEventListener('click', function () { closeAll(null); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(null); });

  // Make the Product Notes brand/logo a way home (every page) — clicking it returns
  // to the Playground, the conventional "logo = home" affordance that was missing.
  var brand = document.querySelector('.brand');
  if (brand && file !== 'index.html') {
    brand.style.cursor = 'pointer';
    brand.setAttribute('role', 'link');
    brand.setAttribute('tabindex', '0');
    brand.title = 'Back to the Playground';
    var goHome = function () { location.href = 'index.html'; };
    brand.addEventListener('click', function (e) { if (!e.target.closest('a,button,select,input')) goHome(); });
    brand.addEventListener('keydown', function (e) { if (e.key === 'Enter') goHome(); });
  }

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
