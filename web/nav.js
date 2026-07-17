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
    { href: 'galaxy3d.html', label: '🌌 Galaxy 3D' },
    // Intent-based groups: what do you want to DO right now?
    { group: '✍️ Create', items: [
      ['fineprint.html', '🔍 The Fine Print'],
      ['skillify.html', '⚙️ Skillify (SOP → skill)'],
      ['remix.html', '🔀 Skill Remix'],
      ['studio.html', '🏗️ Create a skill'],
      ['make.html', '🏭 Make it real'],
      ['meeting.html', '🗒️ Meeting → artifacts'],
      ['data.html', '📊 Bring your own data'],
      ['site.html', '🌐 Site builder'],
      ['app.html', '⚙️ Prompt-to-App'],
      ['compose.html', '🧭 Auto-Composer'],
      ['video.html', '🎬 Video export'],
      ['agent.html', '✨ Auto-Agent'],
      ['canvas.html', '🧩 Workflow Canvas'],
      ['workos.html', '🛰️ Work OS'],
      ['consult.html', '💬 Consultant Mode'],
      ['ask.html', '❓ Ask'],
      ['grade.html', '📝 Grade your work'],
      ['xray.html', '🩻 X-ray'],
      ['brain.html', '🧠 Brain'],
      ['voice.html', '🎙️ Voice Mode'],
      ['capture.html', '📷 Live Capture'],
      ['cocanvas.html', '🧑‍🤝‍🧑 Co-Canvas'],
      ['timemachine.html', '⏳ Time Machine'],
    ] },
    { group: '⚔️ Compete', items: [
      ['gym.html', '🥊 The Gym'],
      ['season.html', '🏆 The Season'],
      ['casting.html', '🎬 Season Casting'],
      ['gauntlet.html', '🏆 Gauntlet'],
      ['boardroom.html', '🏛️ Boardroom'],
      ['firm.html', '🏢 The Firm'],
      ['firm-game.html', '🎮 Run the Firm (game)'],
      ['defend.html', '🛡️ Defend'],
      ['stage.html', '🎬 The Stage'],
      ['hiring.html', '🎤 The Panel'],
      ['tower.html', '🏗 Tower of Claims'],
      ['campaign.html', '🗺 Campaign'],
      ['duel.html', '⚔️ Model Duel'],
      ['wartable.html', '⚔️ The War Table'],
      ['teardown.html', '🔨 Teardown Engine'],
      ['live.html', '🎙️ Live Meeting'],
    ] },
    { group: '🎓 Learn', items: [
      ['academy.html', '🎓 Academy'],
      ['path.html', '🧭 The Operator\'s Path'],
      ['certified.html', '🎓 Operator\'s Exam'],
      ['charter.html', '🎓 Charter'],
      ['hub.html', '🧭 Journeys'],
      ['jobs.html', '💼 Job Search'],
      ['learn.html', '🎓 Learn'],
      ['guide.html', '📖 Guide'],
      ['handbook.html', '📖 Handbook'],
      ['examples.html', '📄 Sample outputs'],
      ['reckoning.html', '⚖️ Reckoning'],
      ['ledger.html', '📓 Outcome Ledger'],
      ['deck.html', '🃏 Operator\'s Deck'],
      ['wrapped.html', '🎁 Wrapped'],
      ['morningshow.html', '📻 Morning Show'],
    ] },
    { group: '🏛 Trust', items: [
      ['institute.html', '🏛 The Institute'],
      ['conformant.html', '🏅 Conformant Libraries'],
      ['federation.html', '🌐 The Federation'],
      ['credential.html', '🔏 Credentials'],
      ['leaderboard.html', '📊 Leaderboard'],
      ['coverage.html', '📈 Eval coverage'],
      ['benchmark.html', '🏆 Benchmark'],
      ['modelbench.html', '🤖 Model rankings'],
      ['authors.html', '📈 Author stats'],
      ['status.html', '📈 Vitals'],
      ['cost.html', '💰 Cost & Privacy'],
      ['trends.html', '📈 Trends'],
    ] },
    { group: '🗺 Explore', items: [
      ['semantic.html', '🧠 Semantic Search'],
      ['catalog.html', '📚 Catalog'],
      ['atlas.html', '🗺 The Atlas'],
      ['galaxy.html', '🗺 Galaxy (2D)'],
      ['city.html', '🌃 Skill City'],
      ['spatial.html', '🌌 Spatial 3D'],
      ['holo.html', '🎴 Holo Cards'],
      ['trophy.html', '🏆 Trophy Forge'],
      ['api.html', '🔌 API'],
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
  // ROOT = the directory nav.js was loaded from — pages in subdirectories
  // (/for/*, /skill/*) resolve every internal link against it.
  var ROOT = (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var m = (scripts[i].getAttribute('src') || '').match(/^(.*?)nav\.js/);
      if (m) return m[1];
    }
    return '';
  })();
  var R = function (href) { return /^https?:/.test(href) ? href : ROOT + href; };
  var link = function (href, lbl) { return '<a class="tool' + (href === file ? ' active' : '') + '"' + di(href) + ' href="' + R(href) + '">' + lbl + '</a>'; };
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
    var goHome = function () { location.href = R('index.html'); };
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

  // ── Pages palette: press "/" anywhere (or the 🔎 pill) to jump to any page.
  // With 60+ pages, search beats memory — the palette flattens every NAV entry.
  var ALL_PAGES = [];
  NAV.forEach(function (e) {
    if (e.href) ALL_PAGES.push([e.href, e.label]);
    if (e.items) e.items.forEach(function (i) { if (!i[2]) ALL_PAGES.push([i[0], (e.group ? e.group.replace(/^\S+\s/, '') + ' · ' : '') + i[1]]); });
  });
  var pal = null;
  function openPalette() {
    if (pal) { pal.remove(); pal = null; return; }
    pal = document.createElement('div');
    pal.style.cssText = 'position:fixed;inset:0;background:rgba(5,7,12,.72);z-index:10000;display:flex;justify-content:center;align-items:flex-start;padding-top:12vh';
    pal.innerHTML = '<div style="width:min(560px,92vw);background:#10131a;border:1px solid #2a3140;border-radius:14px;overflow:hidden">' +
      '<input id="palQ" placeholder="Jump to any page…  (Esc closes)" style="width:100%;box-sizing:border-box;padding:14px 16px;font-size:15px;background:#0d1117;color:#e6edf3;border:0;border-bottom:1px solid #2a3140;outline:none" />' +
      '<div id="palHits" style="max-height:50vh;overflow:auto"></div></div>';
    document.body.appendChild(pal);
    var q = pal.querySelector('#palQ'), hits = pal.querySelector('#palHits'), sel = 0, cur = [];
    function draw() {
      var v = q.value.toLowerCase();
      cur = ALL_PAGES.filter(function (pg) { return !v || pg[1].toLowerCase().indexOf(v) >= 0 || pg[0].indexOf(v) >= 0; }).slice(0, 14);
      sel = Math.min(sel, Math.max(0, cur.length - 1));
      hits.innerHTML = cur.map(function (pg, i) {
        return '<div data-h="' + pg[0] + '" style="padding:10px 16px;font-size:13.5px;cursor:pointer;color:' + (i === sel ? '#c9a227' : '#c7cfda') + ';background:' + (i === sel ? '#1a1f29' : 'transparent') + '">' + pg[1] + '</div>';
      }).join('') || '<div style="padding:12px 16px;color:#8b949e;font-size:13px">no page matches</div>';
      Array.prototype.forEach.call(hits.children, function (c) {
        c.onclick = function () { if (c.dataset.h) location.href = R(c.dataset.h); };
      });
    }
    q.addEventListener('input', function () { sel = 0; draw(); });
    q.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { pal.remove(); pal = null; }
      if (e.key === 'ArrowDown') { sel++; draw(); e.preventDefault(); }
      if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); }
      if (e.key === 'Enter' && cur[sel]) location.href = R(cur[sel][0]);
    });
    pal.addEventListener('click', function (e) { if (e.target === pal) { pal.remove(); pal = null; } });
    draw(); q.focus();
    if (window.pmTrack) pmTrack('nav/palette');
  }
  var palBtn = document.createElement('button');
  palBtn.type = 'button'; palBtn.className = 'tool'; palBtn.textContent = '🔎 /';
  palBtn.title = 'Jump to any page (press / anywhere)';
  palBtn.addEventListener('click', openPalette);
  nav.appendChild(palBtn);
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/(INPUT|TEXTAREA|SELECT)/.test(document.activeElement.tagName) && !e.metaKey && !e.ctrlKey) {
      e.preventDefault(); openPalette();
    }
  });
})();

// ── PWA: manifest + offline service worker (registered from every page) ──────
(function () {
  if (!document.querySelector('link[rel="manifest"]')) {
    var l = document.createElement('link'); l.rel = 'manifest';
    var ns = document.querySelector('script[src*="nav.js"]');
    var root2 = ns ? (ns.getAttribute('src').match(/^(.*?)nav\.js/) || ['', ''])[1] : '';
    l.href = root2 + 'manifest.json';
    document.head.appendChild(l);
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register((typeof root2 === 'string' ? root2 : '') + 'sw.js').catch(function () {});
  }
})();
