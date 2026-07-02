// Living artifacts — skill outputs you can grab, not just read.
// Skills (via PMArtifacts.promptFor) emit ONE ```artifact fenced block of typed
// JSON after their markdown; PMArtifacts.enhance() replaces that block with an
// interactive component: a RICE board with live re-ranking sliders, a roadmap
// timeline, a journey map with an emotion curve, or an animated scorecard.
// Vanilla JS + inline SVG, no dependencies. Load AFTER marked/DOMPurify,
// call enhance() after streaming settles (same contract as PMDiagrams/PMCharts).
(function (g) {
  'use strict';

  // Which skills get which renderer, and the schema line added to their prompt.
  var MAP = {
    'rice-prioritisation': 'rice-board',
    'rice-impact-matrix': 'rice-board',
    'feature-prioritisation': 'rice-board',
    'roadmap-narrative': 'timeline',
    'roadmap-presentation': 'timeline',
    'customer-journey-map': 'journey-map',
    'cs-health-scorecard': 'scorecard',
    'product-health-analysis': 'scorecard',
    'team-health-check': 'scorecard',
    'design-system-audit': 'scorecard',
  };

  var SCHEMAS = {
    'rice-board':
      '{"renderer":"rice-board","rows":[{"name":"<initiative>","reach":<users/qtr number>,"impact":<0.25|0.5|1|2|3>,"confidence":<0.5-1>,"effort":<person-months number>}]}',
    'timeline':
      '{"renderer":"timeline","lanes":[{"label":"<period e.g. Q3 2026>","items":[{"name":"<item>","kind":"<discover|build|launch|measure>","note":"<one line>"}]}]}',
    'journey-map':
      '{"renderer":"journey-map","stages":[{"name":"<stage>","emotion":<-2..2>,"doing":"<one line>","pain":"<one line>","opportunity":"<one line>"}]}',
    'scorecard':
      '{"renderer":"scorecard","items":[{"label":"<dimension>","score":<number>,"max":<number>,"note":"<one line>"}]}',
  };

  function promptFor(skillName) {
    var r = MAP[skillName];
    if (!r) return '';
    return '\n\n## Living artifact (required)\nAfter the complete markdown output, append exactly ONE fenced code block tagged `artifact` containing ONLY minified JSON matching this shape (restate the same data as the document — invent nothing new):\n```artifact\n' + SCHEMAS[r] + '\n```';
  }

  // ── Shared helpers ──────────────────────────────────────────────────────────
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  var CSS =
    '.pm-art{border:1px solid var(--border,#2a313c);border-radius:14px;background:var(--panel,#161a21);padding:14px 16px;margin:14px 0;font-size:13.5px}' +
    '.pm-art h4{margin:0 0 10px;font-size:13px;letter-spacing:.04em;text-transform:uppercase;color:var(--accent,#d97757)}' +
    '.pm-art .hint{color:var(--muted,#8b93a1);font-size:11.5px;margin-top:8px}' +
    '.pm-art table{width:100%;border-collapse:collapse}.pm-art td,.pm-art th{padding:6px 8px;border-top:1px solid var(--border,#2a313c);text-align:left;font-size:12.5px}' +
    '.pm-art tr.art-row{transition:transform .35s ease, background .35s}' +
    '.pm-art .bar{height:8px;border-radius:4px;background:linear-gradient(90deg,#d97757,#ffb454);transition:width .4s ease}' +
    '.pm-art input[type=range]{width:80px;accent-color:#d97757;vertical-align:middle}' +
    '.pm-art .rank{font-weight:800;color:var(--accent,#d97757)}' +
    '.pm-art .lane{display:inline-block;vertical-align:top;min-width:150px;margin-right:10px}' +
    '.pm-art .lane b{display:block;border-bottom:2px solid var(--accent,#d97757);padding-bottom:4px;margin-bottom:8px}' +
    '.pm-art .tl-item{border:1px solid var(--border,#2a313c);border-radius:9px;padding:6px 9px;margin-bottom:6px;cursor:pointer}' +
    '.pm-art .tl-item small{display:block;color:var(--muted,#8b93a1)}' +
    '.pm-art .tl-item .note{display:none;color:var(--muted,#8b93a1);font-size:11.5px;margin-top:4px}' +
    '.pm-art .tl-item.open .note{display:block}' +
    '.pm-art .stage-cards{display:flex;gap:8px;overflow-x:auto;padding-top:6px}' +
    '.pm-art .stage{flex:1;min-width:130px;border:1px solid var(--border,#2a313c);border-radius:9px;padding:7px 9px;font-size:11.8px}' +
    '.pm-art .stage b{display:block;margin-bottom:3px}.pm-art .stage .p{color:#ff8fa3}.pm-art .stage .o{color:#5ad19a}' +
    '.pm-art .gauge{display:flex;align-items:center;gap:10px;margin:7px 0}' +
    '.pm-art .gauge .lbl{width:36%;font-size:12.5px}.pm-art .gauge .tr{flex:1;height:10px;border-radius:5px;background:var(--panel-2,#1d232c);overflow:hidden}' +
    '.pm-art .gauge .fill{height:100%;border-radius:5px;width:0;transition:width .8s cubic-bezier(.2,.8,.2,1)}' +
    '.pm-art .gauge .val{width:52px;text-align:right;font-weight:700}';
  function ensureCss() {
    if (document.getElementById('pm-art-css')) return;
    var st = document.createElement('style');
    st.id = 'pm-art-css';
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  // ── rice-board: sliders re-rank live ────────────────────────────────────────
  function riceBoard(data) {
    var rows = (data.rows || []).slice(0, 15).map(function (r, i) {
      return { name: String(r.name || 'item ' + (i + 1)), reach: +r.reach || 0, impact: +r.impact || 1, confidence: +r.confidence || 0.8, effort: Math.max(+r.effort || 1, 0.25) };
    });
    if (!rows.length) return null;
    var box = h('div', 'pm-art');
    box.appendChild(h('h4', '', '🎛 Live RICE board — drag the sliders, watch the ranking re-sort'));
    var table = h('table');
    table.innerHTML = '<thead><tr><th></th><th>Initiative</th><th>Reach</th><th>Impact</th><th>Confidence</th><th>Effort</th><th style="min-width:120px">RICE</th></tr></thead>';
    var tbody = h('tbody');
    table.appendChild(tbody);
    box.appendChild(table);
    box.appendChild(h('div', 'hint', 'Sliders recompute (reach × impact × confidence) ÷ effort. This is exploration — the document above is the committed version.'));

    function score(r) { return (r.reach * r.impact * r.confidence) / r.effort; }
    function render() {
      var max = Math.max.apply(null, rows.map(score)) || 1;
      var sorted = rows.slice().sort(function (a, b) { return score(b) - score(a); });
      tbody.innerHTML = '';
      sorted.forEach(function (r, rank) {
        var tr = h('tr', 'art-row');
        tr.appendChild(h('td', 'rank', '#' + (rank + 1)));
        tr.appendChild(h('td', '', r.name));
        tr.appendChild(h('td', '', r.reach.toLocaleString()));
        var tdI = h('td'); var selI = h('select');
        [0.25, 0.5, 1, 2, 3].forEach(function (v) { var o = h('option', '', String(v)); o.value = v; if (v === r.impact) o.selected = true; selI.appendChild(o); });
        selI.addEventListener('change', function () { r.impact = +selI.value; render(); });
        tdI.appendChild(selI); tr.appendChild(tdI);
        var tdC = h('td'); var rng = h('input'); rng.type = 'range'; rng.min = 50; rng.max = 100; rng.step = 5; rng.value = Math.round(r.confidence * 100);
        var cv = h('span', '', ' ' + Math.round(r.confidence * 100) + '%');
        rng.addEventListener('input', function () { r.confidence = +rng.value / 100; cv.textContent = ' ' + rng.value + '%'; render(); });
        tdC.appendChild(rng); tdC.appendChild(cv); tr.appendChild(tdC);
        var tdE = h('td'); var eff = h('input'); eff.type = 'number'; eff.min = 0.25; eff.step = 0.25; eff.value = r.effort; eff.style.width = '54px';
        eff.addEventListener('change', function () { r.effort = Math.max(+eff.value || 0.25, 0.25); render(); });
        tdE.appendChild(eff); tr.appendChild(tdE);
        var tdS = h('td');
        var bar = h('div', 'bar'); bar.style.width = Math.max((score(r) / max) * 100, 3) + '%';
        tdS.appendChild(h('b', '', String(Math.round(score(r)))));
        tdS.appendChild(bar); tr.appendChild(tdS);
        tbody.appendChild(tr);
      });
    }
    render();
    return box;
  }

  // ── timeline: period lanes with expandable items ────────────────────────────
  function timeline(data) {
    var lanes = (data.lanes || []).slice(0, 8);
    if (!lanes.length) return null;
    var KIND = { discover: '🔭', build: '🛠️', launch: '🚀', measure: '📊' };
    var box = h('div', 'pm-art');
    box.appendChild(h('h4', '', '🗺 Roadmap timeline — click an item for its why'));
    var wrap = h('div'); wrap.style.overflowX = 'auto'; wrap.style.whiteSpace = 'nowrap';
    lanes.forEach(function (l) {
      var lane = h('div', 'lane');
      lane.appendChild(h('b', '', String(l.label || '')));
      (l.items || []).slice(0, 10).forEach(function (it) {
        var d = h('div', 'tl-item');
        d.style.whiteSpace = 'normal';
        d.appendChild(h('span', '', (KIND[it.kind] || '•') + ' ' + String(it.name || '')));
        d.appendChild(h('small', '', String(it.kind || '')));
        if (it.note) d.appendChild(h('div', 'note', String(it.note)));
        d.addEventListener('click', function () { d.classList.toggle('open'); });
        lane.appendChild(d);
      });
      wrap.appendChild(lane);
    });
    box.appendChild(wrap);
    return box;
  }

  // ── journey-map: emotion curve + stage cards ────────────────────────────────
  function journeyMap(data) {
    var stages = (data.stages || []).slice(0, 10);
    if (stages.length < 2) return null;
    var box = h('div', 'pm-art');
    box.appendChild(h('h4', '', '🧭 Journey map — the emotion curve'));
    var W = Math.max(stages.length * 130, 420), H = 120, pad = 20;
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, width: '100%', height: '110' });
    var y = function (e) { return H / 2 - (Math.max(-2, Math.min(2, +e || 0)) / 2) * (H / 2 - pad); };
    var x = function (i) { return pad + (i * (W - 2 * pad)) / (stages.length - 1); };
    svg.appendChild(svgEl('line', { x1: 0, y1: H / 2, x2: W, y2: H / 2, stroke: 'rgba(139,147,161,.35)', 'stroke-dasharray': '4 4' }));
    var dPath = stages.map(function (s, i) { return (i ? 'L' : 'M') + x(i) + ' ' + y(s.emotion); }).join(' ');
    var path = svgEl('path', { d: dPath, fill: 'none', stroke: '#d97757', 'stroke-width': 2.5, 'stroke-linecap': 'round' });
    // draw-in animation
    svg.appendChild(path);
    stages.forEach(function (s, i) {
      var e = +s.emotion || 0;
      svg.appendChild(svgEl('circle', { cx: x(i), cy: y(e), r: 5, fill: e >= 0 ? '#5ad19a' : '#ff8fa3' }));
      var t = svgEl('text', { x: x(i), y: y(e) + (e >= 0 ? -10 : 18), 'text-anchor': 'middle', fill: 'currentColor', 'font-size': '10' });
      t.textContent = s.name;
      svg.appendChild(t);
    });
    box.appendChild(svg);
    try {
      var len = path.getTotalLength ? 1200 : 0;
      if (len) { path.style.strokeDasharray = len; path.style.strokeDashoffset = len; path.style.transition = 'stroke-dashoffset 1.1s ease'; requestAnimationFrame(function () { path.style.strokeDashoffset = 0; }); }
    } catch (_) {}
    var cards = h('div', 'stage-cards');
    stages.forEach(function (s) {
      var c = h('div', 'stage');
      c.appendChild(h('b', '', String(s.name || '')));
      if (s.doing) c.appendChild(h('div', '', '👣 ' + s.doing));
      if (s.pain) c.appendChild(h('div', 'p', '⚡ ' + s.pain));
      if (s.opportunity) c.appendChild(h('div', 'o', '💡 ' + s.opportunity));
      cards.appendChild(c);
    });
    box.appendChild(cards);
    return box;
  }

  // ── scorecard: animated gauges ───────────────────────────────────────────────
  function scorecard(data) {
    var items = (data.items || []).slice(0, 12);
    if (!items.length) return null;
    var box = h('div', 'pm-art');
    box.appendChild(h('h4', '', '📟 Scorecard'));
    items.forEach(function (it) {
      var max = +it.max || 10, val = Math.max(0, Math.min(+it.score || 0, max)), pct = (val / max) * 100;
      var g = h('div', 'gauge');
      var lbl = h('div', 'lbl', String(it.label || ''));
      if (it.note) lbl.title = String(it.note);
      var tr = h('div', 'tr'), fill = h('div', 'fill');
      fill.style.background = pct >= 70 ? '#5ad19a' : pct >= 40 ? '#ffb454' : '#ff5c5c';
      tr.appendChild(fill);
      g.appendChild(lbl); g.appendChild(tr); g.appendChild(h('div', 'val', val + '/' + max));
      box.appendChild(g);
      requestAnimationFrame(function () { setTimeout(function () { fill.style.width = pct + '%'; }, 30); });
    });
    box.appendChild(h('div', 'hint', 'Hover a dimension for its note.'));
    return box;
  }

  var RENDERERS = { 'rice-board': riceBoard, 'timeline': timeline, 'journey-map': journeyMap, 'scorecard': scorecard };

  // Replace ```artifact fenced blocks (rendered by marked as <pre><code>) with components.
  function enhance(node) {
    if (!node) return;
    ensureCss();
    var codes = node.querySelectorAll('pre > code');
    for (var i = 0; i < codes.length; i++) {
      var c = codes[i];
      var txt = (c.textContent || '').trim();
      var isTagged = /language-artifact/.test(c.className || '');
      if (!isTagged && !(txt.startsWith('{') && txt.indexOf('"renderer"') > -1)) continue;
      var data;
      try { data = JSON.parse(txt); } catch (_) { continue; }
      var fn = RENDERERS[data.renderer];
      if (!fn) continue;
      var comp;
      try { comp = fn(data); } catch (_) { comp = null; }
      if (comp) c.parentElement.replaceWith(comp);
    }
  }

  g.PMArtifacts = { promptFor: promptFor, enhance: enhance, MAP: MAP };
})(window);
