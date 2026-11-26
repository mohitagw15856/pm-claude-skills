#!/usr/bin/env node
// Rule-change watcher: fetches the official pages in data/rule-sources.json,
// reduces each to its readable text, hashes it, and compares with the last run.
// A changed page names the skills that depend on it, so a person can recheck
// them and stamp them with scripts/rules-reviewed.mjs --review.
//
//   node scripts/watch-rule-sources.mjs --check                  # validate the sources file (no network)
//   node scripts/watch-rule-sources.mjs [--state FILE] [--summary FILE] [--sources FILE] [--only id,id]
//
// --state       previous hashes, rewritten as JSON (default data/rule-sources-state.json,
//               gitignored). A Markdown file holding a rule-watch-state block (an issue
//               body saved by the workflow) is read too.
// --summary     write a Markdown summary when anything changed (for an issue comment);
//               --issue is the same option
// --issue-body  write the tracking issue's body: the sources, their skills, the last
//               check, and the state in a hidden block for the next run
//
// The first run for a source records a baseline and reports nothing. A page that
// fails to fetch is reported as unreachable and keeps its old hash, so a flaky
// site never looks like a rule change. When GITHUB_OUTPUT is set, writes changed=N.
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : null; };
const sourcesFile = resolve(arg('sources') || join(root, 'data', 'rule-sources.json'));
const stateFile = resolve(arg('state') || join(root, 'data', 'rule-sources-state.json'));
const summaryFile = arg('summary') || arg('issue') ? resolve(arg('summary') || arg('issue')) : null;
const bodyFile = arg('issue-body') ? resolve(arg('issue-body')) : null;
const STATE_RE = /<!-- rule-watch-state\s*([\s\S]*?)\s*-->/;
const only = arg('only') ? arg('only').split(',') : null;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const { sources = [] } = JSON.parse(readFileSync(sourcesFile, 'utf8'));
const problems = [];
const ids = new Set();
for (const s of sources) {
  if (!ID.test(s.id || '')) problems.push(`bad id: ${s.id}`);
  if (ids.has(s.id)) problems.push(`duplicate id: ${s.id}`);
  ids.add(s.id);
  let url = null;
  try { url = new URL(s.url); } catch { /* reported below */ }
  // Local http is allowed only for a stub server in the tests.
  if (!url || !(url.protocol === 'https:' || (url.protocol === 'http:' && ['127.0.0.1', 'localhost'].includes(url.hostname)))) problems.push(`${s.id}: url must be https`);
  if (!s.title) problems.push(`${s.id}: title missing`);
  if (!Array.isArray(s.skills) || !s.skills.length) problems.push(`${s.id}: skills must be a non-empty list`);
  for (const k of s.skills || []) if (!ID.test(k) || !existsSync(join(root, 'skills', k, 'SKILL.md'))) problems.push(`${s.id}: no skill ${k}`);
}
if (problems.length) { for (const p of problems) console.error(`✗ ${p}`); process.exit(1); }
if (process.argv.includes('--check')) { console.log(`rule-sources.json valid: ${sources.length} sources, ${new Set(sources.flatMap((s) => s.skills)).size} skills. ✓`); process.exit(0); }

// Readable text only: scripts, styles, navigation and forms change without the
// rules changing (tokens, menus, cookie banners), so they are dropped. If the page
// has a <main> or <article>, only that is kept.
function normalise(html) {
  let h = String(html).replace(/<!--[\s\S]*?-->/g, ' ');
  h = h.replace(/<(script|style|noscript|svg|template|nav|header|footer|form|iframe)\b[\s\S]*?<\/\1>/gi, ' ');
  const main = h.match(/<main\b[\s\S]*?<\/main>/i) || h.match(/<article\b[\s\S]*?<\/article>/i);
  if (main) h = main[0];
  const text = h.replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ').trim();
  return text;
}

function loadState() {
  if (!existsSync(stateFile)) return {};
  const raw = readFileSync(stateFile, 'utf8');
  const block = raw.match(STATE_RE);
  try { return JSON.parse(block ? block[1] : raw || '{}'); } catch { console.log('State unreadable; starting from a fresh baseline.'); return {}; }
}
const state = loadState();
if (!state.sources || typeof state.sources !== 'object') state.sources = {};
const now = new Date().toISOString().slice(0, 10);
const changed = [], unreachable = [], baselined = [];
for (const s of sources) {
  if (only && !only.includes(s.id)) continue;
  let text;
  try {
    const r = await fetch(s.url, { redirect: 'follow', signal: AbortSignal.timeout(30000), headers: { 'user-agent': 'pm-claude-skills rule-watch (+https://github.com/mohitagw15856/pm-claude-skills)', accept: 'text/html,application/xhtml+xml' } });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    text = normalise(await r.text());
    if (text.length < 200) throw new Error(`only ${text.length} characters of text`);
  } catch (e) {
    unreachable.push({ ...s, error: e.message });
    console.log(`? ${s.id}: could not read (${e.message})`);
    continue;
  }
  const sha = createHash('sha256').update(text).digest('hex');
  const prev = state.sources[s.id];
  if (!prev) { baselined.push(s); console.log(`· ${s.id}: baseline recorded`); }
  else if (prev.sha256 !== sha) { changed.push({ ...s, since: prev.checked }); console.log(`✎ ${s.id}: CHANGED since ${prev.checked} (recheck: ${s.skills.join(', ')})`); }
  else console.log(`✓ ${s.id}: unchanged`);
  state.sources[s.id] = { sha256: sha, chars: text.length, checked: now };
}
// Forget sources that were removed from the list.
for (const id of Object.keys(state.sources)) if (!ids.has(id)) delete state.sources[id];
writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');

if (summaryFile && changed.length) {
  const skills = [...new Set(changed.flatMap((c) => c.skills))].sort();
  const lines = [
    `### Rule sources changed (${now})`,
    '',
    `${changed.length} official page${changed.length === 1 ? '' : 's'} changed since the last check. The text differs; that may be a real rule change or a rewording. Check each page, then the skills that depend on it.`,
    '',
    '| Source | Changed since | Skills to recheck |',
    '|---|---|---|',
    ...changed.map((c) => `| [${c.title}](${c.url}) | ${c.since} | ${c.skills.map((k) => `\`${k}\``).join(', ')} |`),
    '',
    'After checking a skill (and fixing it if the rule moved), stamp it:',
    '',
    '```bash',
    ...skills.map((k) => `node scripts/rules-reviewed.mjs --review ${k} --by <your-handle>`),
    '```',
  ];
  if (unreachable.length) lines.push('', `Could not read this run: ${unreachable.map((u) => `${u.id} (${u.error})`).join(', ')}.`);
  writeFileSync(summaryFile, lines.join('\n') + '\n');
}
if (bodyFile) {
  const lines = [
    'This issue tracks the official pages that the rule-based skills depend on. A weekly workflow (rule-watch.yml) reads each page and adds a comment here when its text changes, naming the skills to recheck.',
    '',
    'Keep this issue open: its hidden block holds the last hashes. Closing it makes the next run start a fresh baseline. Sources live in data/rule-sources.json.',
    '',
    '| Source | Skills | Last read |',
    '|---|---|---|',
    ...sources.map((s) => `| [${s.title}](${s.url}) | ${s.skills.map((k) => `\`${k}\``).join(', ')} | ${state.sources[s.id]?.checked || 'not yet'} |`),
    '',
    `<!-- rule-watch-state\n${JSON.stringify(state)}\n-->`,
  ];
  writeFileSync(bodyFile, lines.join('\n') + '\n');
}
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed.length}\n`);
console.log(`\n${changed.length} changed · ${baselined.length} new baseline(s) · ${unreachable.length} unreachable · ${sources.length} source(s).`);
