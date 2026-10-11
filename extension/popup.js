// Popup logic: the Insert tab (skill count) + the Lint tab ("Grammarly for
// professional judgment" — lint the user's own text against a skill's Quality
// Checks and Anti-Patterns using their own Anthropic key; judgment only, no
// generation). The key lives in chrome.storage.local and is sent only to
// api.anthropic.com when the user clicks Lint.
const $ = (id) => document.getElementById(id);
let SKILLS = [];
let LAST = null; // last lint result, for copy-as-markdown

// ── Load the bundled catalog (also feeds the Insert tab's count) ─────────────
fetch(chrome.runtime.getURL('skills.json'))
  .then((r) => r.json())
  .then((data) => {
    SKILLS = (Array.isArray(data) ? data : data.skills || []).filter((s) => s && s.title && s.instructions);
    const n = SKILLS.length;
    if (n) $('count').textContent = n;
    const dl = $('skillDl');
    for (const s of SKILLS) {
      const o = document.createElement('option');
      o.value = s.title;
      dl.appendChild(o);
    }
  })
  .catch(() => {});

// ── Tabs ─────────────────────────────────────────────────────────────────────
function showTab(lint) {
  $('viewInsert').hidden = lint;
  $('viewLint').hidden = !lint;
  $('tabInsert').classList.toggle('on', !lint);
  $('tabLint').classList.toggle('on', lint);
}
$('tabInsert').addEventListener('click', () => showTab(false));
$('tabLint').addEventListener('click', () => showTab(true));

// ── Restore key + prefill selection from the active tab ─────────────────────
chrome.storage.local.get(['pm_lint_key', 'pm_lint_skill'], (v) => {
  if (v.pm_lint_key) $('lintKey').value = v.pm_lint_key;
  if (v.pm_lint_skill) $('lintSkill').value = v.pm_lint_skill;
});
$('lintKey').addEventListener('input', () => chrome.storage.local.set({ pm_lint_key: $('lintKey').value.trim() }));
$('lintSkill').addEventListener('input', () => chrome.storage.local.set({ pm_lint_skill: $('lintSkill').value.trim() }));

(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id || !/^https?:/.test(tab.url || '')) return;
    const res = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => String(window.getSelection ? window.getSelection().toString() : ''),
    });
    const sel = res && res[0] && res[0].result && res[0].result.trim();
    if (sel && sel.length > 40 && !$('lintText').value) {
      $('lintText').value = sel;
      showTab(true);
    }
  } catch (_) { /* no injection permission on this page — paste fallback stands */ }
})();

// ── Skill matching ───────────────────────────────────────────────────────────
const tokens = (t) => (t.toLowerCase().match(/[a-z]{4,}/g) || []);
function autoDetect(text) {
  const tt = new Set(tokens(text));
  let best = null, bestScore = 0;
  for (const s of SKILLS) {
    let score = 0;
    for (const w of new Set(tokens(s.title + ' ' + s.description))) if (tt.has(w)) score++;
    if (score > bestScore) { bestScore = score; best = s; }
  }
  return bestScore >= 3 ? best : null;
}
const byTitleOrName = (q) =>
  SKILLS.find((s) => s.title.toLowerCase() === q.toLowerCase() || s.name === q.toLowerCase().trim().replace(/\s+/g, '-')) ||
  SKILLS.find((s) => s.title.toLowerCase().includes(q.toLowerCase()));

// Pull the two checklist sections out of a skill's SKILL.md body.
function checklists(s) {
  const grab = (heading) => {
    const m = s.instructions.split(new RegExp('^## +' + heading + '\\s*$', 'im'))[1];
    if (!m) return [];
    return m.split(/^## /m)[0].split('\n')
      .map((l) => l.replace(/^[-*] *(\[[ x]\] *)?/, '').trim())
      .filter((l) => l && !l.startsWith('#'));
  };
  return { checks: grab('Quality Checks'), anti: grab('Anti-Patterns') };
}

// ── Lint ─────────────────────────────────────────────────────────────────────
$('lintBtn').addEventListener('click', async () => {
  const text = $('lintText').value.trim();
  const key = $('lintKey').value.trim();
  if (text.length < 60) return status('Paste at least a paragraph of your own writing.', true);
  if (!key) return status('Enter your Anthropic API key (stored only in this browser).', true);

  const skill = $('lintSkill').value.trim() ? byTitleOrName($('lintSkill').value.trim()) : autoDetect(text);
  if (!skill) return status($('lintSkill').value.trim() ? 'No skill by that name — pick one from the list.' : 'Could not auto-detect the document type — pick a skill.', true);
  const { checks, anti } = checklists(skill);
  if (!checks.length && !anti.length) return status(`"${skill.title}" has no lintable checklist — pick another skill.`, true);

  $('lintDetected').hidden = false;
  $('lintDetected').textContent = 'Linting against: ' + skill.title + ' (' + skill.plugin + ')';
  $('lintBtn').disabled = true; $('lintResults').innerHTML = ''; $('lintCopy').hidden = true;
  status('Applying ' + skill.title + "'s quality bar…");

  const system =
    'You are a strict reviewer applying one skill\'s quality bar to a text the user wrote themselves. Judge only — do not rewrite. ' +
    'Return STRICT JSON only, no code fences, shaped exactly: {"verdicts":[{"check":"...","status":"pass|fail|n/a","note":"one specific sentence, quoting the text where possible"}],"summary":"one sentence overall"}. ' +
    'Evaluate every item below as its own verdict. For Anti-Patterns, status "pass" means the text does NOT commit the anti-pattern.\n\n' +
    'QUALITY CHECKS:\n' + checks.map((c) => '- ' + c).join('\n') +
    (anti.length ? '\n\nANTI-PATTERNS:\n' + anti.map((c) => '- ' + c).join('\n') : '');
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1500,
        system,
        messages: [{ role: 'user', content: 'THE TEXT TO LINT:\n\n' + text.slice(0, 16000) }],
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error((data.error && data.error.message) || 'Request failed (' + res.status + ').');
    const raw = ((data.content && data.content[0] && data.content[0].text) || '').replace(/^```(json)?|```$/gm, '').trim();
    const parsed = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
    render(skill, parsed);
    status('');
  } catch (e) {
    status(e.message || 'Lint failed.', true);
  } finally {
    $('lintBtn').disabled = false;
  }
});

function render(skill, r) {
  LAST = { skill, r };
  const box = $('lintResults');
  const fails = (r.verdicts || []).filter((v) => v.status === 'fail').length;
  box.innerHTML = '<div class="summary">' + esc(r.summary || '') + (fails ? ' (' + fails + ' to fix)' : ' ✓') + '</div>';
  for (const v of r.verdicts || []) {
    const row = document.createElement('div');
    row.className = 'verdict';
    const cls = v.status === 'pass' ? 'pass' : v.status === 'fail' ? 'fail' : 'na';
    row.innerHTML = '<span class="chip ' + cls + '">' + cls.toUpperCase() + '</span><span><span class="c">' + esc(v.check || '') + '</span><span class="n">' + esc(v.note || '') + '</span></span>';
    box.appendChild(row);
  }
  $('lintCopy').hidden = false;
}
$('lintCopy').addEventListener('click', () => {
  if (!LAST) return;
  const md = '## Lint: ' + LAST.skill.title + '\n\n' + (LAST.r.summary || '') + '\n\n' +
    (LAST.r.verdicts || []).map((v) => '- **' + (v.status || '?').toUpperCase() + '** ' + v.check + (v.note ? ' — ' + v.note : '')).join('\n');
  navigator.clipboard.writeText(md).then(() => status('Copied.'), () => status('Copy failed.', true));
});
function status(m, err) { const s = $('lintStatus'); s.textContent = m; s.className = 'status' + (err ? ' err' : ''); }
function esc(t) { return String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// ── Contextual discovery: a skill for the page you are on ───────────────────
// On click, through activeTab: read the current tab's text in the page, match it
// against context-rules.json here (context-match.js), and suggest skills. Nothing
// about the page leaves the browser.
const PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills/index.html?skill=';
async function suggestForTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !/^https?:/.test(tab.url || '')) return;
    const [{ result } = {}] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () => ({ host: location.hostname, url: location.href, text: document.body ? document.body.innerText.slice(0, 50000) : '' }) });
    const cfg = await (await fetch(chrome.runtime.getURL('context-rules.json'))).json();
    const hit = result && pmContextMatch.matchPage({ rules: cfg.rules, never: cfg.never, ...result });
    if (!hit) return;
    const box = $('ctx');
    const p = document.createElement('p');
    p.textContent = hit.label;
    box.appendChild(p);
    for (const name of hit.suggest.slice(0, 3)) {
      const a = document.createElement('a');
      a.href = PLAYGROUND + encodeURIComponent(name);
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = name;
      box.appendChild(a);
    }
    box.hidden = false;
  } catch { /* pages the extension cannot read (chrome://, the Web Store) */ }
}
suggestForTab();

// Opt-in "as I browse": request the permission, then register context-nudge.js
// for all pages; switching it off unregisters it and gives the permission back.
const NUDGE_ID = 'pm-context-nudge';
chrome.scripting.getRegisteredContentScripts({ ids: [NUDGE_ID] }).then((list) => { $('nudgeToggle').checked = list.length > 0; }).catch(() => {});
$('nudgeToggle').addEventListener('change', async (e) => {
  if (e.target.checked) {
    const ok = await chrome.permissions.request({ origins: ['<all_urls>'] });
    if (!ok) { e.target.checked = false; return; }
    await chrome.scripting.registerContentScripts([{ id: NUDGE_ID, matches: ['<all_urls>'], js: ['context-match.js', 'context-nudge.js'], css: ['context-nudge.css'], runAt: 'document_idle', persistAcrossSessions: true }]).catch(() => {});
  } else {
    await chrome.scripting.unregisterContentScripts({ ids: [NUDGE_ID] }).catch(() => {});
    await chrome.permissions.remove({ origins: ['<all_urls>'] }).catch(() => {});
  }
});
