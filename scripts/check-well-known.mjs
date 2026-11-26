#!/usr/bin/env node
// Validate an agent-skills.json discovery file (docs/spec/well-known-agent-skills.md).
// Works on any site's file, not only this one:
//
//   node scripts/check-well-known.mjs https://example.com/.well-known/agent-skills.json
//   node scripts/check-well-known.mjs web/.well-known/agent-skills.json --verify 20
//
// --verify N fetches N skills' SKILL.md (spread across the list) and checks each
// SHA-256 and the frontmatter name; --root <dir> reads them from a local checkout
// instead of the network. Exits 1 on any problem.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const src = args.find((a, i) => !a.startsWith('--') && !['--verify', '--root'].includes(args[i - 1]));
if (!src) { console.error('Usage: check-well-known.mjs <file-or-url> [--verify N] [--root dir]'); process.exit(2); }
const verify = Number(opt('--verify') || 0), localRoot = opt('--root');

const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_RE = /^[0-9a-f]{64}$/;
const isHttps = (u) => { try { return new URL(u).protocol === 'https:'; } catch { return false; } };
const errors = [];
const err = (m) => errors.push(m);

const text = /^https:\/\//.test(src) ? await (await fetch(src)).text() : readFileSync(src, 'utf8');
let doc;
try { doc = JSON.parse(text); } catch (e) { console.error(`✗ not JSON: ${e.message}`); process.exit(1); }

if (typeof doc.spec !== 'string' || !/^agent-skills-discovery\/\d+\.\d+$/.test(doc.spec)) err('spec must be "agent-skills-discovery/<major>.<minor>"');
if (!doc.publisher || typeof doc.publisher.name !== 'string' || !isHttps(doc.publisher.url)) err('publisher needs a name and an https url');
if (!Array.isArray(doc.skills) || !doc.skills.length) err('skills must be a non-empty array');
const skills = Array.isArray(doc.skills) ? doc.skills : [];
if (doc.count !== undefined && doc.count !== skills.length) err(`count is ${doc.count} but skills has ${skills.length}`);
const seen = new Set();
skills.forEach((s, n) => {
  const at = `skills[${n}]${s && s.name ? ` (${s.name})` : ''}`;
  if (!s || typeof s !== 'object') return err(`${at} is not an object`);
  if (!NAME_RE.test(s.name || '') || s.name.length > 64) err(`${at}: name must be kebab-case, at most 64 characters`);
  if (seen.has(s.name)) err(`${at}: duplicate name`);
  seen.add(s.name);
  if (!isHttps(s.skill_md)) err(`${at}: skill_md must be an https URL`);
  if (!HEX_RE.test(s.sha256 || '')) err(`${at}: sha256 must be 64 lowercase hex characters`);
  for (const k of ['zip', 'page']) if (s[k] != null && !isHttps(s[k])) err(`${at}: ${k} must be an https URL when present`);
  if (typeof s.summary !== 'string') err(`${at}: summary must be a string`);
});
const sorted = skills.map((s) => s && s.name).join('\n') === [...skills.map((s) => s && s.name)].sort((a, b) => String(a).localeCompare(String(b))).join('\n');
if (!sorted) err('skills should be sorted by name (keeps the file diffable and deterministic)');

if (verify && !errors.length) {
  const step = Math.max(1, Math.floor(skills.length / verify));
  for (let k = 0; k < skills.length && k / step < verify; k += step) {
    const s = skills[k];
    let body;
    if (localRoot) {
      const f = join(localRoot, 'skills', s.name, 'SKILL.md');
      if (!existsSync(f)) { err(`${s.name}: no ${f}`); continue; }
      body = readFileSync(f);
    } else {
      const r = await fetch(s.skill_md);
      if (!r.ok) { err(`${s.name}: ${s.skill_md} returned ${r.status}`); continue; }
      body = Buffer.from(await r.arrayBuffer());
    }
    if (createHash('sha256').update(body).digest('hex') !== s.sha256) err(`${s.name}: SKILL.md does not match its sha256`);
    const m = body.toString('utf8').replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
    const fmName = m && (m[1].match(/^name:\s*["']?([^"'\n]+?)["']?\s*$/m) || [])[1];
    if (fmName !== s.name) err(`${s.name}: SKILL.md frontmatter name is ${fmName || 'missing'}`);
  }
}

if (errors.length) { for (const e of errors.slice(0, 40)) console.error(`✗ ${e}`); if (errors.length > 40) console.error(`… and ${errors.length - 40} more`); process.exit(1); }
console.log(`agent-skills.json valid: ${skills.length} skills${verify ? `, ${Math.min(verify, skills.length)} hash-checked` : ''}. ✓`);
