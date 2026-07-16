// Single source of truth for the tools navigation bar, shared by every page
// (static + generated). To add/rename a tool, edit TOOLS here only.
// Each page just needs: <nav class="toolbar-nav" id="toolbar" aria-label="Tools"></nav>
// and <script src="nav.js"></script>.
(function () {
  // Apply the saved theme as early as possible (shared across all pages).
  try { document.documentElement.dataset.theme = localStorage.getItem('pm_theme') || 'dark'; } catch (e) {}

  // --- Self-contained nav CSS ---------------------------------------------
  // The grouped-dropdown + CTA styles used to live only in styles.css, but the
  // generated pages (catalog.html, leaderboard.html, community.html) ship their
  // own inline <style> and don't link styles.css — so their Tools/Explore
  // dropdowns rendered unstyled and broke the header. Injecting the rules here
  // keeps nav.js the single source of truth and makes the bar work everywhere.
  // var() fallbacks cover pages that don't define the full token set.
  if (!document.getElementById('pm-nav-css')) {
    var st = document.createElement('style');
    st.id = 'pm-nav-css';
    st.textContent = [
      '.toolbar-nav .tool.cta{color:var(--text,#e7ebf0);border-color:var(--accent,#d97757);font-weight:700}',
      '.toolbar-nav .tool.cta:hover{background:var(--accent-grad,linear-gradient(135deg,#e0855f,#d9605a));color:#1a1207;border-color:transparent}',
      '.toolbar-nav .tool-group{position:relative;display:inline-flex}',
      '.toolbar-nav .group-btn{cursor:pointer;font-family:inherit}',
      '.toolbar-nav .group-menu{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);z-index:60;display:flex;flex-direction:column;gap:3px;min-width:200px;max-height:min(70vh,520px);overflow-y:auto;padding:7px;background:var(--panel,#161a21);border:1px solid var(--border,#2a313c);border-radius:12px;box-shadow:0 12px 34px rgba(0,0,0,.45)}',
      '.toolbar-nav .group-menu[hidden]{display:none}',
      '.toolbar-nav .group-menu .tool{white-space:nowrap;text-align:left}',
      'html[data-theme="light"] .toolbar-nav .group-menu{background:#fff}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

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
    { href: 'daily.html', label: '🔥 Daily' },
    { href: 'jobs.html', label: '💼 Job Search' },
    { href: 'hub.html', label: '🧭 Journeys' },
    { href: 'galaxy3d.html', label: '🌌 Galaxy 3D' },
    { group: '🆕 New', items: [
      ['make.html', '🏭 Make it real'],
      ['teardown.html', '🔨 Teardown Engine'],
      ['deck.html', '🃏 Operator\'s Deck'],
      ['firm-game.html', '🎮 Run the Firm (game)'],
      ['compose.html', '🧭 Auto-Composer'],
      ['live.html', '🎙️ Live Meeting'],
      ['morningshow.html', '📻 Morning Show'],
      ['consult.html', '💬 Consultant Mode'],
      ['certified.html', '🎓 Operator\'s Exam'],
    ] },
    { group: 'Tools', items: [
      ['firm.html', '🏢 The Firm'],
      ['boardroom.html', '🏛️ Boardroom'],
      ['stage.html', '🎬 The Stage'],
      ['defend.html', '🛡️ Defend'],
      ['gym.html', '🥊 The Gym'],
      ['gauntlet.html', '🏆 Gauntlet'],
      ['hiring.html', '🎤 The Panel'],
      ['campaign.html', '🗺 Campaign'],
      ['season.html', '🏆 The Season'],
      ['charter.html', '🎓 Charter'],
      ['tower.html', '🏗 Tower of Claims'],
      ['reckoning.html', '⚖️ Reckoning'],
      ['academy.html', '🎓 Academy'],
      ['xray.html', '🩻 X-ray'],
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
      ['coverage.html', '📈 Eval coverage'],
      ['benchmark.html', '🏆 Benchmark'],
      ['modelbench.html', '🤖 Model rankings'],
      ['learn.html', '🎓 Learn'],
      ['wrapped.html', '🎁 Wrapped'],
      ['institute.html', '🏛 The Institute'],
      ['handbook.html', '📖 Handbook'],
      ['city.html', '🌃 Skill City'],
      ['trophy.html', '🏆 Trophy Forge'],
      ['galaxy.html', '🗺 Galaxy (2D)'],
      ['status.html', '📈 Vitals'],
      ['atlas.html', '🗺 The Atlas'],
      ['morningshow.html', '📻 Morning Show'],
      ['guide.html', '📖 Guide'],
      ['community.html', '💬 Community'],
      // External (GitHub doc): a 3rd truthy element renders it as a new-tab link.
      ['https://github.com/mohitagw15856/pm-claude-skills/blob/main/COMMUNITY-SKILLS.md', '🌐 Community Skills', true],
    ] },
    { href: 'pro.html', label: '⭐ Pro' },
    // Always-visible way back to the source — opens the GitHub repo in a new tab.
    { href: 'https://github.com/mohitagw15856/pm-claude-skills', label: '★ GitHub', external: true, cta: true },
  ];
  var nav = document.getElementById('toolbar');
  if (!nav) return;
  var file = (location.pathname.split('/').pop() || 'index.html');
  if (file === '' || file === '/') file = 'index.html';
  // Map nav targets to i18n keys (used by i18n.js when the UI language is switched).
  var NAVKEY = {
    'index.html': 'nav.playground', 'daily.html': 'nav.daily', 'jobs.html': 'nav.jobs', 'hub.html': 'nav.journeys', 'galaxy.html': 'nav.galaxy', 'pro.html': 'nav.pro',
    'agent.html': 'nav.agent', 'canvas.html': 'nav.canvas', 'ask.html': 'nav.ask', 'brain.html': 'nav.brain', 'grade.html': 'nav.grade', 'studio.html': 'nav.studio',
    'catalog.html': 'nav.catalog', 'examples.html': 'nav.examples', 'leaderboard.html': 'nav.leaderboard', 'coverage.html': 'nav.coverage',
    'benchmark.html': 'nav.benchmark', 'learn.html': 'nav.learn', 'guide.html': 'nav.guide', 'community.html': 'nav.community',
    'https://github.com/mohitagw15856/pm-claude-skills/blob/main/COMMUNITY-SKILLS.md': 'nav.communitySkills',
    'Tools': 'nav.tools', 'Explore': 'nav.explore',
  };
  var di = function (href) { return NAVKEY[href] ? ' data-i18n="' + NAVKEY[href] + '"' : ''; };
  var link = function (href, lbl) { return '<a class="tool' + (href === file ? ' active' : '') + '"' + di(href) + ' href="' + href + '">' + lbl + '</a>'; };
  nav.innerHTML = NAV.map(function (it) {
    if (it.external) return '<a class="tool' + (it.cta ? ' cta' : '') + '" href="' + it.href + '" target="_blank" rel="noopener">' + it.label + '</a>';
    if (it.href) return link(it.href, it.label);
    var here = it.items.some(function (t) { return t[0] === file; });
    return '<span class="tool-group">'
      + '<button type="button" class="tool group-btn' + (here ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false"><span' + di(it.group) + '>' + it.group + '</span> ▾</button>'
      + '<span class="group-menu" hidden>' + it.items.map(function (t) { return t[2] ? '<a class="tool"' + di(t[0]) + ' href="' + t[0] + '" target="_blank" rel="noopener">' + t[1] + '</a>' : link(t[0], t[1]); }).join('') + '</span>'
      + '</span>';
  }).join('');
  // Apply UI translations to the freshly-built nav (no-op if i18n.js isn't loaded on this page).
  if (window.PMi18n) window.PMi18n.apply();

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

  // UI-language toggle (🌐 中文 / 🌐 English) — rendered on every page that loads i18n.js. Switches the
  // interface chrome; the 🌐 output selector / Translate button handle the generated skill content.
  if (window.PMi18n) {
    var lt = document.createElement('button');
    lt.type = 'button'; lt.className = 'tool lang-pill'; lt.title = 'Switch interface language · 切换界面语言';
    // Show a globe + the language you'd switch TO, so it reads as an obvious language control.
    var setLangIcon = function () { lt.textContent = window.PMi18n.getLang() === 'zh' ? '🌐 English' : '🌐 中文'; };
    setLangIcon();
    lt.addEventListener('click', function () {
      window.PMi18n.setLang(window.PMi18n.getLang() === 'zh' ? 'en' : 'zh');
      setLangIcon();
    });
    nav.appendChild(lt);
  }
})();

// ── PWA: manifest + offline service worker (registered from every page) ──────
(function () {
  if (!document.querySelector('link[rel="manifest"]')) {
    var l = document.createElement('link'); l.rel = 'manifest'; l.href = 'manifest.json';
    document.head.appendChild(l);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
