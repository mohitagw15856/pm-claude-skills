#!/usr/bin/env node
// Validates community/registry.json — structure, namespace rules, and (with
// --fetch) the live SKILL.md each entry points at: SkillSpec conformance level
// + the security-pattern scan the core library uses. Run by the registry-check
// workflow on PRs touching the registry; run locally before submitting:
//
//   node scripts/check-registry.mjs            # structural only, no network
//   node scripts/check-registry.mjs --fetch    # + fetch and validate each skill
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fetchMode = process.argv.includes('--fetch');
const reg = JSON.parse(readFileSync(join(root, 'community', 'registry.json'), 'utf8'));
const errors = [], warnings = [];

if (reg.spec !== 'pm-skills-registry/1') errors.push('spec must be "pm-skills-registry/1"');
if (!Array.isArray(reg.skills)) errors.push('skills must be an array');

// Curated skill names — community entries may not shadow them (typosquat guard).
import { readdirSync } from 'node:fs';
const curated = new Set(readdirSync(join(root, 'skills')));

const seen = new Set();
const NAME_RE = /^[a-z0-9-]+\/[a-z0-9]+(-[a-z0-9]+)*$/;

// Security patterns mirrored from the skill auditor's highest-signal rules.
const BANNED = [
  [/ignore (all |any )?(previous|prior|above) (instructions|rules)/i, 'instruction-override phrasing'],
  [/disregard (your|the) (system prompt|guidelines|instructions)/i, 'instruction-override phrasing'],
  [/curl\s+-?[a-z]*\s*https?:\/\/(?!raw\.githubusercontent|github\.com|docs\.)/i, 'network call to an unvetted URL'],
  [/send (the )?(user('|’)s)? ?(data|input|conversation|api key)/i, 'data-exfiltration instruction'],
  [/\b(api[_-]?key|token|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}/, 'embedded credential'],
];

// ── Packs: benches (Boardroom panels) and scenarios (Gym) ────────────────────
for (const pk of reg.packs || []) {
  const tag = pk.name || '(unnamed pack)';
  if (!pk.name || !NAME_RE.test(pk.name)) errors.push(`${tag}: pack name must be "handle/pack-name"`);
  if (!['bench', 'scenario'].includes(pk.type)) errors.push(`${tag}: type must be bench|scenario`);
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(pk.repo || '')) errors.push(`${tag}: repo must be github.com/<owner>/<repo>`);
  else if ((pk.name||'').split('/')[0].toLowerCase() !== pk.repo.split('/')[3].toLowerCase()) errors.push(`${tag}: namespace must match repo owner`);
  if (!pk.path || !pk.path.endsWith('.json')) errors.push(`${tag}: path must point at a .json pack file`);
  if (pk.type === 'bench' && fetchMode) { /* validated in validateLivePack */ }
}

for (const s of reg.skills || []) {
  const tag = s.name || '(unnamed)';
  if (!s.name || !NAME_RE.test(s.name)) errors.push(`${tag}: name must be "handle/skill-name" (lowercase kebab)`);
  if (seen.has(s.name)) errors.push(`${tag}: duplicate name`);
  seen.add(s.name);
  const [handle, skillName] = (s.name || '').split('/');
  if (curated.has(skillName)) errors.push(`${tag}: shadows the curated skill "${skillName}" — pick a distinct name`);
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(s.repo || '')) errors.push(`${tag}: repo must be a github.com/<owner>/<repo> URL`);
  else {
    const owner = s.repo.split('/')[3].toLowerCase();
    if (handle && owner !== handle.toLowerCase()) errors.push(`${tag}: namespace "${handle}" must match repo owner "${owner}"`);
  }
  if (!s.path || !s.path.endsWith('SKILL.md')) errors.push(`${tag}: path must point at a SKILL.md`);
  if (!s.ref) warnings.push(`${tag}: no ref — defaulting consumers to main; a tag is more stable`);
  if (s.pricing) {
    if (!['free', 'paid'].includes(s.pricing.model)) errors.push(`${tag}: pricing.model must be free|paid`);
    if (s.pricing.model === 'paid' && !/^https:\/\/(.*\.)?(lemonsqueezy\.com|polar\.sh)\//.test(s.pricing.checkout || '')) errors.push(`${tag}: paid entries need a lemonsqueezy/polar checkout URL`);
  }
  if (!s.sha256) warnings.push(`${tag}: no sha256 pin — consumers get whatever the ref serves; pin with: shasum -a 256 SKILL.md`);
  if (!s.description || s.description.length < 30) warnings.push(`${tag}: description missing/short — copy the frontmatter description`);
}

// ── Live validation ───────────────────────────────────────────────────────────
async function validateLive(s) {
  const [owner, repo] = s.repo.replace(/\/$/, '').split('/').slice(3);
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${s.ref || 'main'}/${s.path}`;
  const res = await fetch(url);
  if (!res.ok) return [`${s.name}: fetch failed (${res.status}) — ${url}`];
  const text = await res.text();
  const errs = [];
  // Content pinning: if the entry declares sha256, the fetched file must match it exactly.
  if (s.sha256) {
    const actual = createHash('sha256').update(text).digest('hex');
    if (actual !== s.sha256.replace(/^sha256:/, '')) errs.push(`${s.name}: INTEGRITY — fetched content does not match the pinned sha256 (expected ${s.sha256.slice(0, 19)}…, got sha256:${actual.slice(0, 12)}…)`);
  }
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fm) return [`${s.name}: no YAML frontmatter — fails SkillSpec L1`];
  const name = (fm[1].match(/^name:\s*["']?([\w-]+)["']?\s*$/m) || [])[1];
  const desc = (fm[1].match(/^description:/m) || [])[0];
  if (!name) errs.push(`${s.name}: frontmatter missing name`);
  else if (name !== s.name.split('/')[1]) errs.push(`${s.name}: frontmatter name "${name}" ≠ registry skill name`);
  if (!desc) errs.push(`${s.name}: frontmatter missing description`);
  const body = fm[2] || '';
  // Conformance level (informational)
  const hasL2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  const hasL3 = hasL2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body);
  console.log(`  ${s.name}: SkillSpec ${hasL3 ? 'L3 Trustworthy' : hasL2 ? 'L2 Structured' : 'L1 Loadable'} (${Math.round(text.length / 1024)} KB)`);
  for (const [re, why] of BANNED) if (re.test(text)) errs.push(`${s.name}: SECURITY — ${why}`);
  return errs;
}

async function validateLivePack(pk) {
  const [owner, repo] = pk.repo.replace(/\/$/, '').split('/').slice(3);
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${pk.ref || 'main'}/${pk.path}`;
  const res = await fetch(url);
  if (!res.ok) return [`${pk.name}: fetch failed (${res.status})`];
  const rawText = await res.text();
  let j; try { j = JSON.parse(rawText); } catch { return [`${pk.name}: pack is not valid JSON`]; }
  const errs = [];
  if (pk.sha256) {
    const actual = createHash('sha256').update(rawText).digest('hex');
    if (actual !== pk.sha256.replace(/^sha256:/, '')) errs.push(`${pk.name}: INTEGRITY — fetched pack does not match the pinned sha256`);
  }
  if (pk.type === 'bench') {
    const ex = j.executives || [];
    if (ex.length < 2 || ex.length > 8) errs.push(`${pk.name}: bench needs 2-8 executives`);
    for (const e of ex) for (const f of ['id','name','role','lens','bias']) if (!e[f]) errs.push(`${pk.name}: executive missing ${f}`);
    for (const [re2, why] of BANNED) if (re2.test(JSON.stringify(j))) errs.push(`${pk.name}: SECURITY — ${why}`);
  }
  if (pk.type === 'scenario') {
    for (const f of ['you','them','stakes']) if (!j[f]) errs.push(`${pk.name}: scenario missing ${f}`);
    for (const [re2, why] of BANNED) if (re2.test(JSON.stringify(j))) errs.push(`${pk.name}: SECURITY — ${why}`);
  }
  return errs;
}

(async () => {
  if (fetchMode) {
    for (const pk of reg.packs || []) {
      if (!pk.name || !pk.repo || !pk.path) continue;
      try { errors.push(...await validateLivePack(pk)); }
      catch (e) { errors.push(`${pk.name}: fetch error — ${e.message}`); }
    }
    for (const s of reg.skills || []) {
      if (!s.name || !s.repo || !s.path) continue; // structural errors already recorded
      try { errors.push(...await validateLive(s)); }
      catch (e) { errors.push(`${s.name}: fetch error — ${e.message}`); }
    }
  }
  warnings.forEach((w) => console.warn('⚠ ' + w));
  if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }
  const np = (reg.packs || []).length;
  console.log(`Registry OK — ${reg.skills.length} skill entr${reg.skills.length === 1 ? 'y' : 'ies'}, ${np} pack${np === 1 ? '' : 's'}${fetchMode ? ' (live-validated)' : ' (structural; use --fetch for live checks)'}`);
})();
