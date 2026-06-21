'use strict';

const KEY_STORE = 'anthropic_api_key';
const MODEL_STORE = 'anthropic_model';
const CONTEXT_STORE = 'pm_skills_context';
const ROLE_STORE = 'pm_skills_role';
const THEME_STORE = 'pm_theme';
const FAV_STORE = 'pm_favs';
const RECENT_STORE = 'pm_recents';
const API_URL = 'https://api.anthropic.com/v1/messages';

const lsGet = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let favs = lsGet(FAV_STORE, []);
let recents = lsGet(RECENT_STORE, []);

// Role → a curated starter set of skill names (the "try these first" for each role).
const ROLES = {
  'Product Manager': ['prd-template', 'rice-prioritisation', 'roadmap-narrative', 'executive-update', 'red-team-review', 'metrics-framework'],
  'Founder / Exec': ['executive-update', 'board-deck-narrative', 'investor-update', 'competitor-teardown', 'red-team-review', 'go-to-market'],
  'Customer Success': ['cs-health-scorecard', 'churn-analysis', 'cs-escalation-brief', 'renewal-playbook', 'qbr-deck', 'account-plan'],
  'Marketing': ['go-to-market', 'product-positioning-doc', 'content-calendar', 'press-release', 'competitor-teardown', 'email-campaign'],
  'Engineering': ['technical-spec-template', 'architecture-decision-record', 'incident-postmortem', 'code-review-checklist', 'rfc-writer', 'runbook-writer'],
};

const el = (id) => document.getElementById(id);
let SKILLS = [];
let current = null;
let controller = null;

const TIER_META = {
  production: { label: 'Production-Ready', cls: 'tier-production', dot: '🟢' },
  stable: { label: 'Stable', cls: 'tier-stable', dot: '🔵' },
  experimental: { label: 'Experimental', cls: 'tier-experimental', dot: '🟡' },
};

// Small "eval-verified" badge for skills scored by the eval harness.
function evalBadgeText(s) {
  return s.eval ? `✅ ${s.eval.score}/5` : '';
}

init();

async function init() {
  const savedKey = localStorage.getItem(KEY_STORE);
  if (savedKey) el('apiKey').value = savedKey;
  const savedModel = localStorage.getItem(MODEL_STORE);
  if (savedModel) el('model').value = savedModel;

  el('apiKey').addEventListener('input', (e) => localStorage.setItem(KEY_STORE, e.target.value.trim()));
  el('model').addEventListener('change', (e) => localStorage.setItem(MODEL_STORE, e.target.value));

  // Skill Memory: restore + auto-save the user's context, used on every run.
  const savedContext = localStorage.getItem(CONTEXT_STORE) || '';
  el('contextInput').value = savedContext;
  updateContextStatus();
  el('contextInput').addEventListener('input', (e) => {
    localStorage.setItem(CONTEXT_STORE, e.target.value);
    updateContextStatus();
  });
  // Ground in a real file: read it in-browser and append to context.
  el('contextFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let text = String(reader.result || '').slice(0, 100000); // cap to keep requests sane
      const box = el('contextInput');
      box.value = (box.value ? box.value + '\n\n' : '') + `--- Data from ${file.name} ---\n${text}`;
      localStorage.setItem(CONTEXT_STORE, box.value);
      updateContextStatus();
      el('contextFileMsg').textContent = `Loaded ${file.name} (${Math.round(file.size / 1024)} KB) into your context.`;
      el('contextBox').open = true;
    };
    reader.readAsText(file);
    e.target.value = '';
  });
  el('keyToggle').addEventListener('click', () => {
    const f = el('apiKey');
    const show = f.type === 'password';
    f.type = show ? 'text' : 'password';
    el('keyToggle').textContent = show ? 'Hide' : 'Show';
  });

  el('search').addEventListener('input', () => renderGallery());
  el('pluginFilter').addEventListener('change', () => renderGallery());
  el('tierFilter').addEventListener('change', () => renderGallery());
  el('evalFilter').addEventListener('change', () => renderGallery());
  el('backBtn').addEventListener('click', showGallery);
  el('runBtn').addEventListener('click', run);
  el('stopBtn').addEventListener('click', () => controller && controller.abort());
  el('copyBtn').addEventListener('click', () => navigator.clipboard.writeText(el('output').dataset.raw || ''));
  el('downloadBtn').addEventListener('click', downloadOutput);
  el('shareHubBtn').addEventListener('click', shareToHub);
  el('imgBtn').addEventListener('click', shareAsImage);

  // Copy the skill's instructions formatted for another assistant.
  el('copyChatgpt').addEventListener('click', () => copyPrompt('chatgpt'));
  el('copyGemini').addEventListener('click', () => copyPrompt('gemini'));
  el('copyClaude').addEventListener('click', () => copyPrompt('claude'));

  // "Which skill do I need?" recommender + shareable links.
  el('recommendInput').addEventListener('input', renderRecommendations);
  el('shareBtn').addEventListener('click', shareSkill);

  // Theme is applied + toggled by nav.js (shared across all pages).

  // ⌘K command palette.
  el('cmdkBtn').addEventListener('click', openCmdk);
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdk(); }
    else if (e.key === 'Escape' && !el('cmdkOverlay').hidden) closeCmdk();
  });
  el('cmdkInput').addEventListener('input', renderCmdk);
  el('cmdkInput').addEventListener('keydown', cmdkNav);
  el('cmdkOverlay').addEventListener('click', (e) => { if (e.target === el('cmdkOverlay')) closeCmdk(); });

  // Critique mode: grade an existing draft instead of generating.
  el('critiqueToggle').addEventListener('change', (e) => {
    const on = e.target.checked;
    el('critiqueWrap').hidden = !on;
    el('inputForm').hidden = on;
    el('compareToggle').closest('.compare-toggle').style.display = on ? 'none' : '';
    el('modelsToggle').closest('.compare-toggle').style.display = on ? 'none' : '';
    el('runBtn').textContent = on ? 'Grade my draft' : 'Run with my Claude key';
  });

  try {
    const res = await fetch('skills.json');
    const data = await res.json();
    SKILLS = data.skills;
  } catch (e) {
    el('gallery').innerHTML = '<p class="empty-msg">Could not load skills.json. Run <code>node web/build-skills.mjs</code> and serve this folder over HTTP.</p>';
    return;
  }

  const bundles = [...new Set(SKILLS.map((s) => s.plugin))].sort();
  const sel = el('pluginFilter');
  for (const b of bundles) {
    const o = document.createElement('option');
    o.value = b;
    o.textContent = b;
    sel.appendChild(o);
  }
  renderGallery();
  applyShareLink(); // open a skill (and prefill inputs) if the URL points to one
  initOnboarding();
  initHero();
}

// ---------- Hero (stats count-up + show/hide) ----------
function countUp(node, to) {
  const start = performance.now(), dur = 900;
  (function step(t) {
    const p = Math.min(1, (t - start) / dur);
    node.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
function initHero() {
  countUp(el('statSkills'), SKILLS.length);
  countUp(el('statEval'), SKILLS.filter((s) => s.eval).length);
  fetch('https://api.github.com/repos/mohitagw15856/pm-claude-skills')
    .then((r) => r.json()).then((d) => { if (d && d.stargazers_count != null) el('statStars').textContent = d.stargazers_count; })
    .catch(() => { el('statStars').textContent = '★'; });
}
function showHero(show) { const h = el('hero'); if (h) h.hidden = !show; }

// ---------- ⌘K command palette ----------
const CMDK_TOOLS = [
  ['canvas.html', '🧩 Workflow Canvas'], ['agent.html', '✨ Auto-Agent'], ['studio.html', '🏗️ Create a skill'],
  ['grade.html', '📝 Grade your work'], ['benchmark.html', '🏆 Benchmark'], ['community.html', '💬 Community'],
  ['leaderboard.html', '📊 Leaderboard'], ['catalog.html', '📚 Catalog'], ['pro.html', '⭐ Pro'],
];
let cmdkResults = [], cmdkSel = 0;
function openCmdk() { el('cmdkOverlay').hidden = false; el('cmdkInput').value = ''; el('cmdkInput').focus(); renderCmdk(); }
function closeCmdk() { el('cmdkOverlay').hidden = true; }
function renderCmdk() {
  const q = el('cmdkInput').value.toLowerCase().replace(/[-_]+/g, ' ').trim();
  const norm = (x) => x.toLowerCase().replace(/[-_]+/g, ' ');
  const skillHits = SKILLS.map((s) => {
    // Rank: title match beats name match beats description match.
    let score = 0;
    if (!q) score = 1;
    else if (norm(s.title).includes(q)) score = 3;
    else if (norm(s.name).includes(q)) score = 2;
    else if (norm(s.description).includes(q)) score = 1;
    return { s, score };
  }).filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.s.eval?.score || 0) - (a.s.eval?.score || 0))
    .slice(0, 8)
    .map(({ s }) => ({ kind: 'Skill', label: s.title, sub: s.plugin, run: () => { closeCmdk(); selectSkill(s); } }));
  const toolHits = CMDK_TOOLS.filter((t) => !q || t[1].toLowerCase().includes(q))
    .map((t) => ({ kind: 'Tool', label: t[1], sub: t[0], run: () => { location.href = t[0]; } }));
  cmdkResults = [...toolHits.slice(0, 4), ...skillHits];
  cmdkSel = 0;
  const list = el('cmdkList');
  if (!cmdkResults.length) { list.innerHTML = '<div class="cmdk-empty">No matches.</div>'; return; }
  list.innerHTML = cmdkResults.map((r, i) =>
    `<div class="cmdk-item${i === 0 ? ' sel' : ''}" data-i="${i}"><span class="ci-kind">${r.kind}</span> <span>${escapeHtml(r.label)}</span><span class="ci-sub">${escapeHtml(r.sub)}</span></div>`
  ).join('');
  [...list.querySelectorAll('.cmdk-item')].forEach((n) => {
    n.addEventListener('click', () => cmdkResults[+n.dataset.i].run());
    n.addEventListener('mousemove', () => setCmdkSel(+n.dataset.i));
  });
}
function setCmdkSel(i) {
  cmdkSel = i;
  [...el('cmdkList').children].forEach((n, j) => n.classList.toggle('sel', j === i));
}
function cmdkNav(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); setCmdkSel(Math.min(cmdkResults.length - 1, cmdkSel + 1)); el('cmdkList').children[cmdkSel].scrollIntoView({ block: 'nearest' }); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); setCmdkSel(Math.max(0, cmdkSel - 1)); el('cmdkList').children[cmdkSel].scrollIntoView({ block: 'nearest' }); }
  else if (e.key === 'Enter') { e.preventDefault(); if (cmdkResults[cmdkSel]) cmdkResults[cmdkSel].run(); }
}

// ---------- Favorites + recents ----------
function isFav(name) { return favs.includes(name); }
function toggleFav(name) {
  favs = isFav(name) ? favs.filter((n) => n !== name) : [name, ...favs];
  lsSet(FAV_STORE, favs); renderGallery();
}
function recordRecent(name) {
  recents = [name, ...recents.filter((n) => n !== name)].slice(0, 8);
  lsSet(RECENT_STORE, recents);
}

// ---------- Skill Memory (context layer) ----------
function getContext() {
  return (el('contextInput').value || '').trim();
}
function updateContextStatus() {
  const has = getContext().length > 0;
  el('contextStatus').textContent = has ? '✓ active' : '';
}

// ---------- Role-based onboarding ----------
function initOnboarding() {
  const chips = el('roleChips');
  for (const role of Object.keys(ROLES)) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'role-chip';
    b.textContent = role;
    b.addEventListener('click', () => chooseRole(role));
    chips.appendChild(b);
  }
  el('roleSkip').addEventListener('click', dismissOnboarding);
  // Show the role prompt only on first visit (no role chosen, not skipped).
  if (!localStorage.getItem(ROLE_STORE) && !location.search.includes('skill=')) {
    el('onboarding').hidden = false;
  }
}
function dismissOnboarding() {
  el('onboarding').hidden = true;
  localStorage.setItem(ROLE_STORE, 'skipped');
}
function chooseRole(role) {
  localStorage.setItem(ROLE_STORE, role);
  el('onboarding').hidden = true;
  const names = (ROLES[role] || []).filter((n) => SKILLS.some((s) => s.name === n));
  el('search').value = '';
  el('pluginFilter').value = '';
  el('tierFilter').value = '';
  renderGallery(names, role); // featured starter set for this role
}

// ---------- Recommender: rank skills by a free-text task description ----------
function scoreSkill(s, terms) {
  const name = s.name.toLowerCase();
  const desc = (s.description || '').toLowerCase();
  const hay = (name + ' ' + desc + ' ' + (s.instructions || '')).toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (name.includes(t)) score += 5;
    if (desc.includes(t)) score += 3;
    else if (hay.includes(t)) score += 1;
  }
  return score;
}

function renderRecommendations() {
  const box = el('recommendResults');
  const q = el('recommendInput').value.toLowerCase().trim();
  if (q.length < 3) { box.hidden = true; box.innerHTML = ''; return; }
  const terms = [...new Set(q.split(/\s+/).filter((t) => t.length > 2))];
  const ranked = SKILLS.map((s) => ({ s, score: scoreSkill(s, terms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (b.s.eval?.score || 0) - (a.s.eval?.score || 0))
    .slice(0, 4);
  box.innerHTML = '';
  if (!ranked.length) { box.hidden = false; box.innerHTML = '<span class="recommend-empty">No close match — try the search below.</span>'; return; }
  const lead = document.createElement('span');
  lead.className = 'recommend-lead';
  lead.textContent = 'Top matches:';
  box.appendChild(lead);
  for (const { s } of ranked) {
    const chip = document.createElement('button');
    chip.className = 'recommend-chip';
    chip.type = 'button';
    chip.textContent = s.title + (s.eval ? `  ✅ ${s.eval.score}/5` : '');
    chip.addEventListener('click', () => { el('recommendInput').value = ''; box.hidden = true; selectSkill(s); });
    box.appendChild(chip);
  }
  box.hidden = false;
}

// ---------- Share an output to the community Hub (prefilled GitHub Discussion) ----------
const REPO_URL = 'https://github.com/mohitagw15856/pm-claude-skills';
function shareToHub() {
  if (!current) return;
  const out = (el('output').dataset.raw || '').trim();
  if (!out) return setStatus('Run the skill first, then share what you got.', true);
  const title = `[Show & Tell] ${current.title}`;
  const body =
    `**Skill:** \`${current.name}\` · made with the [PM Skills playground](https://mohitagw15856.github.io/pm-claude-skills/?skill=${current.name})\n\n` +
    `**What I got:**\n\n${out.slice(0, 5000)}${out.length > 5000 ? '\n\n…(truncated)' : ''}\n\n**Tweaks / notes:** `;
  const url = `${REPO_URL}/discussions/new?category=show-and-tell&title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank', 'noopener');
}

// ---------- Save output as a branded PNG card ----------
async function shareAsImage() {
  if (!current) return;
  const raw = (el('output').dataset.raw || '').trim();
  if (!raw) return setStatus('Run the skill first, then save the image.', true);
  if (typeof html2canvas === 'undefined') return setStatus('Image library not loaded — try again.', true);
  const card = document.createElement('div');
  card.className = 'img-card';
  card.innerHTML =
    `<div class="ic-top"><span>🧠 PM Skills</span>${current.eval ? `<span class="ic-badge">✅ ${current.eval.score}/5</span>` : ''}</div>` +
    `<div class="ic-title">${escapeHtml(current.title)}</div>` +
    `<div class="ic-body markdown">${DOMPurify.sanitize(marked.parse(raw))}</div>` +
    `<div class="ic-foot">Made with PM Skills · mohitagw15856.github.io/pm-claude-skills</div>`;
  document.body.appendChild(card);
  setStatus('Rendering image…');
  try {
    const canvas = await html2canvas(card, { backgroundColor: '#0d0f14', scale: 2, windowWidth: 760 });
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `${current.name}-pm-skills.png`;
    a.click();
    setStatus('Image saved — share it anywhere.');
  } catch (e) {
    setStatus('Could not render the image.', true);
  } finally {
    card.remove();
  }
}

// ---------- Shareable links: ?skill=<name>&i=<base64 inputs> ----------
function shareSkill() {
  if (!current) return;
  const fields = [...el('inputForm').querySelectorAll('input, textarea')];
  const values = fields.map((f) => f.value);
  const url = new URL(location.href.split('?')[0]);
  url.searchParams.set('skill', current.name);
  if (values.some((v) => v.trim())) {
    try {
      const packed = btoa(unescape(encodeURIComponent(JSON.stringify(values))));
      if (packed.length < 1800) url.searchParams.set('i', packed); // keep links sane
    } catch (_) { /* skip inputs if they don't encode */ }
  }
  const link = url.toString();
  navigator.clipboard.writeText(link).then(
    () => { el('shareMsg').textContent = 'Link copied — anyone who opens it lands on this skill, prefilled.'; },
    () => { el('shareMsg').textContent = link; }
  );
}

function applyShareLink() {
  const params = new URLSearchParams(location.search);
  const name = params.get('skill');
  if (!name) return;
  const s = SKILLS.find((x) => x.name === name);
  if (!s) return;
  selectSkill(s);
  const packed = params.get('i');
  if (packed) {
    try {
      const values = JSON.parse(decodeURIComponent(escape(atob(packed))));
      const fields = [...el('inputForm').querySelectorAll('input, textarea')];
      fields.forEach((f, i) => { if (values[i] != null) f.value = values[i]; });
    } catch (_) { /* ignore malformed input payloads */ }
  }
}

// ---------- Gallery (tiles) ----------
function makeCard(s) {
  const meta = TIER_META[s.tier] || TIER_META.stable;
  const card = document.createElement('button');
  card.className = 'skill-card';
  card.innerHTML =
    `<div class="card-tags"><span class="card-bundle"></span><span class="card-eval"></span><span class="card-tier"></span></div>` +
    `<h3 class="card-title"></h3><p class="card-summary"></p>`;
  card.querySelector('.card-bundle').textContent = s.plugin;
  const evalEl = card.querySelector('.card-eval');
  if (s.eval) {
    evalEl.textContent = evalBadgeText(s);
    evalEl.title = `Eval-scored ${s.eval.score}/5 across ${s.eval.runs} model runs`;
  } else {
    evalEl.remove();
  }
  const tierEl = card.querySelector('.card-tier');
  tierEl.textContent = `${meta.dot} ${meta.label}`;
  tierEl.classList.add(meta.cls);
  card.querySelector('.card-title').textContent = s.title;
  card.querySelector('.card-summary').textContent = s.summary || s.description;
  const fav = document.createElement('span');
  fav.className = 'card-fav' + (isFav(s.name) ? ' on' : '');
  fav.textContent = '⭐';
  fav.title = isFav(s.name) ? 'Unfavourite' : 'Favourite';
  fav.addEventListener('click', (e) => { e.stopPropagation(); toggleFav(s.name); });
  card.querySelector('.card-tags').appendChild(fav);
  card.addEventListener('click', () => selectSkill(s));
  return card;
}
function galleryHead(text) {
  const h = document.createElement('h4');
  h.className = 'gallery-head';
  h.textContent = text;
  return h;
}

function renderGallery(featuredNames, roleLabel) {
  const gallery = el('gallery');
  gallery.innerHTML = '';

  // Role-based starter pack: a curated, ordered set with a "show all" escape.
  if (featuredNames && featuredNames.length) {
    const list = featuredNames.map((n) => SKILLS.find((s) => s.name === n)).filter(Boolean);
    const banner = document.createElement('div');
    banner.className = 'starter-banner';
    banner.innerHTML =
      `<span><strong>Your starter pack${roleLabel ? ' for ' + escapeHtml(roleLabel) : ''}</strong> — try these first.</span>` +
      `<button class="link-btn" type="button">Show all ${SKILLS.length} skills →</button>`;
    banner.querySelector('.link-btn').addEventListener('click', () => renderGallery());
    gallery.appendChild(banner);
    el('count').textContent = `${list.length} starter skills`;
    const frag = document.createDocumentFragment();
    for (const s of list) frag.appendChild(makeCard(s));
    gallery.appendChild(frag);
    showHero(false);
    return;
  }

  const q = el('search').value.toLowerCase().trim();
  const bundle = el('pluginFilter').value;
  const tier = el('tierFilter').value;
  const evalOnly = el('evalFilter').checked;
  const isDefault = !q && !bundle && !tier && !evalOnly;
  showHero(isDefault);
  const norm = (x) => x.toLowerCase().replace(/[-_]+/g, ' '); // so "red team" matches "red-team"
  const nq = norm(q);
  const matches = SKILLS.filter((s) => {
    if (bundle && s.plugin !== bundle) return false;
    if (tier && (s.tier || 'stable') !== tier) return false;
    if (evalOnly && !s.eval) return false;
    if (!q) return true;
    return norm(s.title + ' ' + s.description + ' ' + s.name).includes(nq);
  }).sort((a, b) => evalOnly ? (b.eval?.score || 0) - (a.eval?.score || 0) : 0);

  el('count').textContent = `${matches.length} skill${matches.length === 1 ? '' : 's'}`;

  if (!matches.length) {
    gallery.innerHTML = '<p class="empty-msg">No skills match your search.</p>';
    return;
  }

  const frag = document.createDocumentFragment();

  // On the default view, surface favourites + recents first.
  if (isDefault) {
    const find = (n) => SKILLS.find((s) => s.name === n);
    const favList = favs.map(find).filter(Boolean);
    const recentList = recents.map(find).filter(Boolean).filter((s) => !isFav(s.name));
    if (favList.length) { frag.appendChild(galleryHead('⭐ Your favourites')); favList.forEach((s) => frag.appendChild(makeCard(s))); }
    if (recentList.length) { frag.appendChild(galleryHead('🕘 Recently used')); recentList.forEach((s) => frag.appendChild(makeCard(s))); }
    if (favList.length || recentList.length) frag.appendChild(galleryHead(`All ${SKILLS.length} skills`));
  }

  for (const s of matches) frag.appendChild(makeCard(s));
  gallery.appendChild(frag);
}

function showGallery() {
  current = null;
  el('runner').hidden = true;
  el('gallery').hidden = false;
  el('controls').hidden = false;
  renderGallery(); // refresh favourites/recents + hero state
  window.scrollTo({ top: 0 });
}

// ---------- Select & build form ----------
function renderRelated(s) {
  const box = el('skillRelated');
  if (!box) return;
  const find = (n) => SKILLS.find((x) => x.name === n);
  const parts = [];
  if (s.readsFirst) {
    const f = find(s.readsFirst);
    if (f) parts.push(`<span class="rel-lead">Start with</span><button class="rel-chip rel-first" data-n="${f.name}" title="${escapeHtml(f.description)}">${escapeHtml(f.title)}</button>`);
  }
  const rel = (s.related || []).filter((n) => n !== s.readsFirst).map(find).filter(Boolean);
  if (rel.length) {
    parts.push(`<span class="rel-lead">Related</span>` + rel.map((r) => `<button class="rel-chip" data-n="${r.name}" title="${escapeHtml(r.description)}">${escapeHtml(r.title)}</button>`).join(''));
  }
  if (!parts.length) { box.hidden = true; return; }
  box.innerHTML = parts.join('');
  box.hidden = false;
  box.querySelectorAll('.rel-chip').forEach((btn) =>
    btn.addEventListener('click', () => {
      const t = find(btn.dataset.n);
      if (t) { selectSkill(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    }));
}

function selectSkill(s) {
  current = s;
  recordRecent(s.name);
  showHero(false);
  el('gallery').hidden = true;
  el('controls').hidden = true;
  el('runner').hidden = false;
  el('skillBundle').textContent = s.plugin;
  const meta = TIER_META[s.tier] || TIER_META.stable;
  const tierTag = el('skillTier');
  tierTag.textContent = `${meta.dot} ${meta.label}`;
  tierTag.className = 'tier-tag ' + meta.cls;
  const evalTag = el('skillEval');
  if (s.eval) {
    evalTag.textContent = `✅ Eval-scored ${s.eval.score}/5`;
    evalTag.title = `Scored ${s.eval.score}/5 by an LLM judge across ${s.eval.runs} model runs`;
    evalTag.hidden = false;
  } else {
    evalTag.hidden = true;
  }
  el('skillTitle').textContent = s.title;
  el('skillDesc').textContent = s.description;
  const srcEl = el('skillSource');
  if (s.source) {
    srcEl.innerHTML = `📚 Based on ${escapeHtml(s.source).replace(/\*(.+?)\*/g, '<em>$1</em>')}`;
    srcEl.hidden = false;
  } else {
    srcEl.hidden = true;
  }
  renderRelated(s);
  el('elsewhere').open = false;
  el('copyMsg').textContent = '';
  el('shareMsg').textContent = '';
  // Reset critique mode for the newly-selected skill.
  el('critiqueToggle').checked = false;
  el('critiqueWrap').hidden = true;
  el('critiqueInput').value = '';
  el('inputForm').hidden = false;
  el('compareToggle').closest('.compare-toggle').style.display = '';
  el('modelsToggle').checked = false;
  el('runBtn').textContent = 'Run with my Claude key';
  el('outputWrap').hidden = true;
  el('output').innerHTML = '';
  el('output').hidden = false;
  el('compareGrid').hidden = true;
  el('compareGrid').innerHTML = '';
  setStatus('');
  window.scrollTo({ top: 0 });

  const form = el('inputForm');
  form.innerHTML = '';
  if (!s.inputs.length) {
    form.appendChild(makeField({ label: 'Your input / context', hint: 'Describe what you need. This skill did not declare structured inputs.', long: true }, 0));
  } else {
    s.inputs.forEach((inp, i) => form.appendChild(makeField(inp, i)));
  }
}

function makeField(inp, i) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const id = 'f_' + i;
  const opt = inp.optional ? ' <span class="opt">(optional)</span>' : '';
  const hint = inp.hint ? ` <span class="hint">— ${escapeHtml(inp.hint)}</span>` : '';
  wrap.innerHTML = `<label for="${id}">${escapeHtml(inp.label)}${opt}${hint}</label>`;
  const input = inp.long ? document.createElement('textarea') : document.createElement('input');
  input.id = id;
  input.dataset.label = inp.label;
  input.dataset.optional = inp.optional ? '1' : '';
  wrap.appendChild(input);
  return wrap;
}

// Stream one completion from the API into a target node. Returns the full text.
async function streamCompletion({ key, model, system, userMessage, node, signal }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model,
      max_tokens: 8192,
      stream: true,
      ...(system ? { system } : {}),
      messages: [{ role: 'user', content: userMessage }],
    }),
    signal,
  });
  if (!res.ok) throw new Error(parseApiError(await res.text(), res.status));

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let acc = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.startsWith('data:')) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === '[DONE]') continue;
      let evt;
      try { evt = JSON.parse(payload); } catch (_) { continue; }
      if (evt.type === 'content_block_delta' && evt.delta && evt.delta.text) {
        acc += evt.delta.text;
        renderMarkdown(node, acc, true);
      } else if (evt.type === 'error') {
        throw new Error(evt.error ? evt.error.message : 'Stream error from the API.');
      }
    }
  }
  renderMarkdown(node, acc, false);
  return acc;
}

const SKILL_SUFFIX =
  '\n\n---\nThe user has provided their inputs below. Execute this skill now and produce the complete output. Do not ask follow-up questions — work with what is given and note any reasonable assumptions.';

// ---------- Run ----------
async function run() {
  const key = el('apiKey').value.trim();
  if (!key) { flagMissingKey(); return setStatus('👆 Paste your Claude API key (top-right) to run.', true); }
  if (!current) return;
  if (window.pmTrack) pmTrack('run/' + current.name);

  const ctx = getContext();
  const ctxBlock = ctx
    ? `\n\n## About the user and their context (apply this throughout — match their product, audience, and voice)\n${ctx}`
    : '';
  const model = el('model').value;
  const critique = el('critiqueToggle').checked;

  let userMessage, system, plainSystem = '', compare = false, compareModels = false;
  if (critique) {
    const draft = el('critiqueInput').value.trim();
    if (!draft) return setStatus('Paste a draft to grade first.', true);
    userMessage = draft;
    system = `You are a senior reviewer. Grade the user's existing artifact against the standard a top "${current.title}" should meet${current.source ? `, grounded in the framework it follows (${current.source.replace(/\*/g, '')})` : ''}. Do NOT rewrite it from scratch — improve THEIR draft.

Return, in this order:
1. **Score** — rate 1–5 on **structure, completeness, usefulness, grounding**, one line each with why.
2. **Top gaps** — the most important specific, actionable problems, ranked.
3. **Redline** — concrete edits and additions to fix the biggest gaps (quote what to change).

Use the following skill as the rubric for what "good" looks like:
${current.instructions}${ctxBlock}`;
  } else {
    const fields = [...el('inputForm').querySelectorAll('input, textarea')];
    const missing = fields.filter((f) => !f.dataset.optional && !f.value.trim());
    if (missing.length) return setStatus(`Fill in: ${missing.map((f) => f.dataset.label).join(', ')}`, true);
    userMessage = buildUserMessage(fields);
    system = current.instructions + SKILL_SUFFIX + ctxBlock;
    plainSystem = ctx ? ctxBlock.trim() : '';
    compareModels = el('modelsToggle').checked;
    compare = !compareModels && el('compareToggle').checked;
  }

  el('outputWrap').hidden = false;
  el('runBtn').disabled = true;
  el('stopBtn').hidden = false;
  controller = new AbortController();

  // Single → #output. Compare-plain → 2 panes. Compare-models → one pane per model.
  const out = el('output');
  const grid = el('compareGrid');
  const MODELS = [['claude-opus-4-8', 'Opus 4.8'], ['claude-sonnet-4-6', 'Sonnet 4.6'], ['claude-haiku-4-5-20251001', 'Haiku 4.5']];
  let withNode, plainNode;
  if (compareModels) {
    out.hidden = true; grid.hidden = false;
    grid.innerHTML = MODELS.map((m, i) =>
      `<div class="compare-pane"><div class="compare-label">🤖 ${m[1]}</div><article class="output markdown" id="paneM${i}"></article></div>`).join('');
  } else if (compare) {
    out.hidden = true;
    grid.hidden = false;
    grid.innerHTML =
      '<div class="compare-pane"><div class="compare-label">✨ With the skill</div><article class="output markdown" id="paneWith"></article></div>' +
      '<div class="compare-pane"><div class="compare-label">📄 Plain prompt (no skill)</div><article class="output markdown" id="panePlain"></article></div>';
    withNode = el('paneWith');
    plainNode = el('panePlain');
  } else {
    grid.hidden = true;
    out.hidden = false;
    out.innerHTML = '';
    out.dataset.raw = '';
  }

  let acc = '';
  try {
    setStatus(compareModels ? 'Running all 3 models…' : compare ? 'Running both…' : 'Running…');
    if (compareModels) {
      const outs = await Promise.all(MODELS.map((m, i) =>
        streamCompletion({ key, model: m[0], system, userMessage, node: el('paneM' + i), signal: controller.signal })));
      acc = outs[1] || outs[0]; // Sonnet pane for copy/download
    } else if (compare) {
      // Plain = the same inputs with no skill system prompt.
      [acc] = await Promise.all([
        streamCompletion({ key, model, system, userMessage, node: withNode, signal: controller.signal }),
        streamCompletion({ key, model, system: plainSystem, userMessage, node: plainNode, signal: controller.signal }),
      ]);
    } else {
      acc = await streamCompletion({ key, model, system, userMessage, node: out, signal: controller.signal });
    }
    out.dataset.raw = acc; // copy/download use the skill output, in either mode
    setStatus('Done.');
  } catch (e) {
    if (e.name === 'AbortError') {
      setStatus('Stopped.');
    } else {
      setStatus(e.message || 'Request failed.', true);
    }
  } finally {
    el('runBtn').disabled = false;
    el('stopBtn').hidden = true;
    controller = null;
  }
}

// Format the current skill's instructions for another assistant, mirroring the
// per-platform renderers in scripts/build-exports.mjs.
function promptFor(platform) {
  if (!current) return '';
  const body = current.instructions;
  if (platform === 'gemini') {
    return `You are a specialised assistant. ${current.description}\n\nFollow these instructions:\n\n${body}`;
  }
  return body; // chatgpt + claude use the body directly
}

async function copyPrompt(platform) {
  const text = promptFor(platform);
  if (!text) return;
  if (window.pmTrack && current) pmTrack('copy/' + platform + '/' + current.name);
  const labels = { chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'raw' };
  try {
    await navigator.clipboard.writeText(text);
    el('copyMsg').textContent = `Copied ${labels[platform]} prompt — paste it into the tool's instructions.`;
  } catch (_) {
    el('copyMsg').textContent = 'Copy failed — your browser blocked clipboard access.';
  }
}

function buildUserMessage(fields) {
  return fields
    .filter((f) => f.value.trim())
    .map((f) => `## ${f.dataset.label}\n${f.value.trim()}`)
    .join('\n\n');
}

function renderMarkdown(node, text, streaming) {
  node.innerHTML = DOMPurify.sanitize(marked.parse(text, { breaks: true }));
  node.classList.toggle('cursor', streaming);
}

function downloadOutput() {
  const raw = el('output').dataset.raw || '';
  if (!raw) return;
  const blob = new Blob([raw], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${current.name}-output.md`;
  a.click();
  URL.revokeObjectURL(a.href);
}

// ---------- Helpers ----------
function setStatus(msg, isErr) {
  const s = el('status');
  s.textContent = msg;
  s.className = 'status' + (isErr ? ' err' : '');
}

// Draw the eye to the API-key field when someone tries to run without one.
function flagMissingKey() {
  const f = el('apiKey');
  const wrap = f.closest('.key-field');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  f.focus();
  if (wrap) { wrap.classList.remove('pulse'); void wrap.offsetWidth; wrap.classList.add('pulse'); setTimeout(() => wrap.classList.remove('pulse'), 1500); }
}

function parseApiError(text, status) {
  try {
    const j = JSON.parse(text);
    if (j.error && j.error.message) {
      if (status === 401) return 'Invalid API key (401). Check the key and try again.';
      if (status === 429) return 'Rate limit or insufficient credits (429): ' + j.error.message;
      return `API error ${status}: ${j.error.message}`;
    }
  } catch (_) {}
  return `Request failed (${status}).`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
