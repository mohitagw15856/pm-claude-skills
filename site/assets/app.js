// Shared client logic for the PM Skills site. No framework, no build step.
// The catalogue is fetched live from the canonical skills.json, so this site
// always reflects the latest release without a redeploy.
const CATALOG_URL = 'https://mohitagw15856.github.io/pm-claude-skills/skills.json';
const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const qs = (k) => new URLSearchParams(location.search).get(k);
const byName = (skills, n) => skills.find((s) => s.name === n);

let CATALOG = null;
async function catalog() {
  if (CATALOG) return CATALOG;
  const res = await fetch(CATALOG_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('catalog ' + res.status);
  const data = await res.json();
  CATALOG = { count: data.count, skills: data.skills || [] };
  return CATALOG;
}

const TIER_LABEL = { production: '🏆 Production-ready', stable: '✓ Stable', experimental: '⚗ Experimental' };
const prettyBundle = (p) => (p || '').replace(/^pm-/, '').replace(/(^|\s)\S/g, (m) => m.toUpperCase());
const evalScore = (s) => (s && s.eval && typeof s.eval.score === 'number') ? s.eval.score : null;

function card(s) {
  const tier = TIER_LABEL[s.tier] || s.tier || '';
  const sc = evalScore(s);
  return `<a class="card" href="skill.html?name=${encodeURIComponent(s.name)}">
    <div class="card-top"><span class="bundle">${esc(prettyBundle(s.plugin))}</span>${sc ? `<span class="score">★ ${sc}</span>` : ''}</div>
    <h3>${esc(s.title || s.name)}</h3>
    <p>${esc(s.summary || (s.description || '').slice(0, 140))}</p>
    <span class="tier">${esc(tier)}</span>
  </a>`;
}

// ---- Catalogue page -------------------------------------------------------
async function initCatalogue() {
  const grid = document.getElementById('grid');
  const searchEl = document.getElementById('search');
  const bundleEl = document.getElementById('bundleFilter');
  const tierEl = document.getElementById('tierFilter');
  const countEl = document.getElementById('resultCount');
  let data;
  try { data = await catalog(); } catch (e) { grid.innerHTML = `<p class="err">Couldn't load the catalogue. <a href="${CATALOG_URL}">Open the raw data →</a></p>`; return; }

  const bundles = [...new Set(data.skills.map((s) => s.plugin))].sort();
  bundleEl.innerHTML = '<option value="">All bundles</option>' + bundles.map((b) => `<option value="${esc(b)}">${esc(prettyBundle(b))}</option>`).join('');

  function render() {
    const q = (searchEl.value || '').toLowerCase().trim();
    const b = bundleEl.value, t = tierEl.value;
    const out = data.skills.filter((s) => {
      if (b && s.plugin !== b) return false;
      if (t && s.tier !== t) return false;
      if (!q) return true;
      return (s.name + ' ' + (s.title || '') + ' ' + (s.description || '') + ' ' + (s.summary || '')).toLowerCase().includes(q);
    });
    countEl.textContent = `${out.length} skill${out.length === 1 ? '' : 's'}`;
    grid.innerHTML = out.length ? out.slice(0, 600).map(card).join('') : '<p class="err">No skills match. Try a broader search.</p>';
  }
  [searchEl, bundleEl, tierEl].forEach((el) => el.addEventListener('input', render));
  const preset = qs('q'); if (preset) searchEl.value = preset;
  render();
}

// ---- Skill detail page ----------------------------------------------------
function exampleFor(s) {
  // Build a realistic "try this" prompt from the skill's own inputs.
  const first = (s.inputs || []).find((i) => !i.optional) || (s.inputs || [])[0];
  if (first && first.hint) return `${s.title}: ${first.hint}`;
  return (s.description || '').split('.').slice(0, 1)[0];
}

async function initSkill() {
  const wrap = document.getElementById('skill');
  const name = qs('name');
  let data; try { data = await catalog(); } catch (e) { wrap.innerHTML = '<p class="err">Couldn\'t load this skill.</p>'; return; }
  const s = byName(data.skills, name);
  if (!s) { wrap.innerHTML = `<p class="err">No skill named “${esc(name)}”. <a href="catalogue.html">Browse the catalogue →</a></p>`; return; }
  document.title = `${s.title} · PM Skills`;

  const inputs = (s.inputs || []).map((i) => `<li><b>${esc(i.label)}</b>${i.optional ? ' <span class="opt">(optional)</span>' : ''}${i.hint ? ` — <span class="hint">${esc(i.hint)}</span>` : ''}</li>`).join('');
  const related = (s.related || []).map((n) => { const r = byName(data.skills, n); return r ? `<a class="chip" href="skill.html?name=${encodeURIComponent(n)}">${esc(r.title || n)}</a>` : ''; }).join('');
  const runUrl = `${PLAYGROUND}/?skill=${encodeURIComponent(s.name)}`;

  wrap.innerHTML = `
    <a class="back" href="catalogue.html">← All skills</a>
    <div class="detail-head">
      <span class="bundle">${esc(prettyBundle(s.plugin))}</span>
      <span class="tier">${esc(TIER_LABEL[s.tier] || s.tier || '')}</span>
      ${evalScore(s) ? `<span class="score">★ ${evalScore(s)} eval</span>` : ''}
    </div>
    <h1>${esc(s.title || s.name)}</h1>
    <p class="lead">${esc(s.description || s.summary || '')}</p>

    <div class="power">
      <div class="power-col">
        <h2>What it needs</h2>
        <ul class="inputs">${inputs || '<li>Just describe your task.</li>'}</ul>
      </div>
      <div class="power-col">
        <h2>See its power</h2>
        <p class="example-label">Try it with something like:</p>
        <blockquote class="example">${esc(exampleFor(s))}</blockquote>
        <a class="btn primary" href="${runUrl}" target="_blank" rel="noopener">▶ Run it live in the Playground</a>
        <a class="btn ghost" href="${PLAYGROUND}/?skill=${encodeURIComponent(s.name)}&sample=1" target="_blank" rel="noopener">📄 See a sample output — no key</a>
      </div>
    </div>

    ${s.instructions ? `<details class="instructions"><summary>Read the full skill (the framework it uses)</summary><pre>${esc(s.instructions)}</pre></details>` : ''}

    ${related ? `<h2 class="rel-h">Related skills</h2><div class="chips">${related}</div>` : ''}

    <div class="install">
      <h2>Use it anywhere</h2>
      <p>In Claude Code: <code>/plugin</code> → search <b>pm-skills</b>. Elsewhere: <code>npx pm-claude-skills add</code>. Or read the source: <a href="${REPO}/blob/main/skills/${encodeURIComponent(s.name)}/SKILL.md" target="_blank" rel="noopener">SKILL.md →</a></p>
    </div>`;
}

// ---- Featured (home) ------------------------------------------------------
const FEATURED = [
  ['lease-decoder', 'Paste a lease → the traps, the money math, and what to ask, before you sign.'],
  ['executive-update', 'Rough notes → a crisp exec briefing that leads with the one thing that matters.'],
  ['incident-postmortem', 'A messy outage → a blameless timeline, root cause, and owned action items.'],
  ['salary-negotiation', 'Rehearse the real conversation against a tough counterpart, then debrief.'],
  ['decision-helper', 'Torn between two options → a weighted call and the one question that breaks the tie.'],
  ['whats-for-dinner', "What's in the fridge → three dinners tonight, ranked by effort. No shopping trip."],
  ['lower-my-bill', 'Your provider hiked the price → a call script + the leverage that actually lowers the bill.'],
  ['warranty-claim', 'It broke just out of warranty → the claim, the proof, and the consumer-law backstop.'],
  ['identity-theft-recovery', 'Your identity was stolen → the calm, correct first moves to contain the damage and rebuild.'],
  ['houseplant-care', 'Your plant is dying → the real cause, the fix, and a care routine it will actually thrive on.'],
];
async function initFeatured() {
  const el = document.getElementById('featured');
  if (!el) return;
  let data; try { data = await catalog(); } catch (e) { return; }
  const countEl = document.getElementById('skillCount');
  if (countEl) countEl.textContent = data.count || data.skills.length;
  el.innerHTML = FEATURED.map(([n, ex]) => {
    const s = byName(data.skills, n); if (!s) return '';
    return `<a class="feature" href="skill.html?name=${encodeURIComponent(n)}">
      <h3>${esc(s.title)}</h3><p>${esc(ex)}</p><span class="go">See its power →</span></a>`;
  }).join('');
}

// ---- Newsletter form ------------------------------------------------------
function initNewsletter() {
  document.querySelectorAll('form.newsletter').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      const msg = form.querySelector('.nl-msg');
      const btn = form.querySelector('button');
      const email = input.value.trim();
      msg.textContent = ''; msg.className = 'nl-msg'; btn.disabled = true; btn.dataset.label = btn.dataset.label || btn.textContent; btn.textContent = 'Subscribing…';
      try {
        const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
        const data = await r.json().catch(() => ({}));
        if (r.ok && data.ok) { msg.textContent = data.status === 'already' ? "You're already on the list — thanks! 💛" : "You're in! Watch your inbox when new skills drop. 🎉"; msg.classList.add('ok'); form.reset(); }
        else { msg.textContent = data.error || 'Something went wrong. Please try again.'; msg.classList.add('bad'); }
      } catch (err) { msg.textContent = 'Network error. Please try again.'; msg.classList.add('bad'); }
      finally { btn.disabled = false; btn.textContent = btn.dataset.label; }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNewsletter();
  if (document.getElementById('grid')) initCatalogue();
  if (document.getElementById('skill')) initSkill();
  if (document.getElementById('featured')) initFeatured();
});
