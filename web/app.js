'use strict';

const KEY_STORE = 'anthropic_api_key';
const MODEL_STORE = 'anthropic_model';
const API_URL = 'https://api.anthropic.com/v1/messages';

const el = (id) => document.getElementById(id);
let SKILLS = [];
let current = null;
let controller = null;

const TIER_META = {
  production: { label: 'Production-Ready', cls: 'tier-production', dot: '🟢' },
  stable: { label: 'Stable', cls: 'tier-stable', dot: '🔵' },
  experimental: { label: 'Experimental', cls: 'tier-experimental', dot: '🟡' },
};

init();

async function init() {
  const savedKey = localStorage.getItem(KEY_STORE);
  if (savedKey) el('apiKey').value = savedKey;
  const savedModel = localStorage.getItem(MODEL_STORE);
  if (savedModel) el('model').value = savedModel;

  el('apiKey').addEventListener('input', (e) => localStorage.setItem(KEY_STORE, e.target.value.trim()));
  el('model').addEventListener('change', (e) => localStorage.setItem(MODEL_STORE, e.target.value));
  el('keyToggle').addEventListener('click', () => {
    const f = el('apiKey');
    const show = f.type === 'password';
    f.type = show ? 'text' : 'password';
    el('keyToggle').textContent = show ? 'Hide' : 'Show';
  });

  el('search').addEventListener('input', renderGallery);
  el('pluginFilter').addEventListener('change', renderGallery);
  el('tierFilter').addEventListener('change', renderGallery);
  el('backBtn').addEventListener('click', showGallery);
  el('runBtn').addEventListener('click', run);
  el('stopBtn').addEventListener('click', () => controller && controller.abort());
  el('copyBtn').addEventListener('click', () => navigator.clipboard.writeText(el('output').dataset.raw || ''));
  el('downloadBtn').addEventListener('click', downloadOutput);

  // Copy the skill's instructions formatted for another assistant.
  el('copyChatgpt').addEventListener('click', () => copyPrompt('chatgpt'));
  el('copyGemini').addEventListener('click', () => copyPrompt('gemini'));
  el('copyClaude').addEventListener('click', () => copyPrompt('claude'));

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
}

// ---------- Gallery (tiles) ----------
function renderGallery() {
  const q = el('search').value.toLowerCase().trim();
  const bundle = el('pluginFilter').value;
  const tier = el('tierFilter').value;
  const gallery = el('gallery');
  gallery.innerHTML = '';

  const matches = SKILLS.filter((s) => {
    if (bundle && s.plugin !== bundle) return false;
    if (tier && (s.tier || 'stable') !== tier) return false;
    if (!q) return true;
    return (s.title + ' ' + s.description + ' ' + s.name).toLowerCase().includes(q);
  });

  el('count').textContent = `${matches.length} skill${matches.length === 1 ? '' : 's'}`;

  if (!matches.length) {
    gallery.innerHTML = '<p class="empty-msg">No skills match your search.</p>';
    return;
  }

  const frag = document.createDocumentFragment();
  for (const s of matches) {
    const meta = TIER_META[s.tier] || TIER_META.stable;
    const card = document.createElement('button');
    card.className = 'skill-card';
    card.innerHTML =
      `<div class="card-tags"><span class="card-bundle"></span><span class="card-tier"></span></div>` +
      `<h3 class="card-title"></h3><p class="card-summary"></p>`;
    card.querySelector('.card-bundle').textContent = s.plugin;
    const tierEl = card.querySelector('.card-tier');
    tierEl.textContent = `${meta.dot} ${meta.label}`;
    tierEl.classList.add(meta.cls);
    card.querySelector('.card-title').textContent = s.title;
    card.querySelector('.card-summary').textContent = s.summary || s.description;
    card.addEventListener('click', () => selectSkill(s));
    frag.appendChild(card);
  }
  gallery.appendChild(frag);
}

function showGallery() {
  current = null;
  el('runner').hidden = true;
  el('gallery').hidden = false;
  el('controls').hidden = false;
  window.scrollTo({ top: 0 });
}

// ---------- Select & build form ----------
function selectSkill(s) {
  current = s;
  el('gallery').hidden = true;
  el('controls').hidden = true;
  el('runner').hidden = false;
  el('skillBundle').textContent = s.plugin;
  const meta = TIER_META[s.tier] || TIER_META.stable;
  const tierTag = el('skillTier');
  tierTag.textContent = `${meta.dot} ${meta.label}`;
  tierTag.className = 'tier-tag ' + meta.cls;
  el('skillTitle').textContent = s.title;
  el('skillDesc').textContent = s.description;
  el('elsewhere').open = false;
  el('copyMsg').textContent = '';
  el('outputWrap').hidden = true;
  el('output').innerHTML = '';
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

// ---------- Run ----------
async function run() {
  const key = el('apiKey').value.trim();
  if (!key) return setStatus('Enter your Claude API key first.', true);
  if (!current) return;

  const fields = [...el('inputForm').querySelectorAll('input, textarea')];
  const missing = fields.filter((f) => !f.dataset.optional && !f.value.trim());
  if (missing.length) return setStatus(`Fill in: ${missing.map((f) => f.dataset.label).join(', ')}`, true);

  const userMessage = buildUserMessage(fields);
  const system = current.instructions +
    '\n\n---\nThe user has provided their inputs below. Execute this skill now and produce the complete output. Do not ask follow-up questions — work with what is given and note any reasonable assumptions.';

  const out = el('output');
  out.innerHTML = '';
  out.dataset.raw = '';
  el('outputWrap').hidden = false;
  el('runBtn').disabled = true;
  el('stopBtn').hidden = false;
  setStatus('Running…');

  controller = new AbortController();
  let acc = '';
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: el('model').value,
        max_tokens: 8192,
        stream: true,
        system,
        messages: [{ role: 'user', content: userMessage }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(parseApiError(await res.text(), res.status));

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
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
        try {
          evt = JSON.parse(payload);
        } catch (_) {
          continue; // skip an unparseable / partial SSE line
        }
        if (evt.type === 'content_block_delta' && evt.delta && evt.delta.text) {
          acc += evt.delta.text;
          renderMarkdown(out, acc, true);
        } else if (evt.type === 'error') {
          throw new Error(evt.error ? evt.error.message : 'Stream error from the API.');
        }
      }
    }
    renderMarkdown(out, acc, false);
    out.dataset.raw = acc;
    setStatus('Done.');
  } catch (e) {
    if (e.name === 'AbortError') {
      out.dataset.raw = acc;
      renderMarkdown(out, acc, false);
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
