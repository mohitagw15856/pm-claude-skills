#!/usr/bin/env node
// Validates config/partners.json, the organisations that have checked skills for
// the people they serve (docs/PARTNER-PROGRAM.md). With --write, it also writes
// web/partners.json (gitignored) with only current verifications, for
// partners.html; deploy-playground runs that.
//
//   node scripts/check-partners.mjs            # validate
//   node scripts/check-partners.mjs --write    # validate, then publish web/partners.json
//   node scripts/check-partners.mjs --file x.json   # validate another file (tests)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fi = process.argv.indexOf('--file');
const file = fi > 0 ? process.argv[fi + 1] : join(root, 'config', 'partners.json');
const cfg = JSON.parse(readFileSync(file, 'utf8'));
const KINDS = ['charity', 'legal-aid', 'advice-service', 'union', 'public-service', 'professional-body', 'school', 'health-service', 'employer', 'community-group'];
const errors = [];
const months = Number(cfg.validity_months || 12);
const today = new Date().toISOString().slice(0, 10);
const ids = new Set();

if (!Array.isArray(cfg.partners)) errors.push('partners must be an array');
for (const p of cfg.partners || []) {
  const tag = p.id || '(no id)';
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.id || '')) errors.push(`${tag}: id must be lowercase kebab-case`);
  if (ids.has(p.id)) errors.push(`${tag}: duplicate id`);
  ids.add(p.id);
  if (!p.name || p.name.length < 3) errors.push(`${tag}: needs the organisation's name`);
  if (!KINDS.includes(p.kind)) errors.push(`${tag}: kind must be one of ${KINDS.join(', ')}`);
  if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(p.url || '')) errors.push(`${tag}: url must be the organisation's https website`);
  if (!p.region) errors.push(`${tag}: region is required (where its checks apply, for example "England and Wales")`);
  if (!/^https:\/\/github\.com\/mohitagw15856\/pm-claude-skills\/issues\/\d+$/.test(p.issue || '')) errors.push(`${tag}: issue must link the partner-verification issue`);
  if (!Array.isArray(p.verified) || !p.verified.length) errors.push(`${tag}: verified must list at least one skill`);
  for (const v of p.verified || []) {
    const vt = `${tag} / ${v.skill || '(no skill)'}`;
    if (!v.skill || !existsSync(join(root, 'skills', v.skill, 'SKILL.md'))) errors.push(`${vt}: not a skill in skills/`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date || '') || v.date > today) errors.push(`${vt}: date must be YYYY-MM-DD and not in the future`);
    if (!v.checked_by || v.checked_by.length < 5) errors.push(`${vt}: checked_by must say whose role checked it (for example "a supervising solicitor")`);
  }
}
if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }

const current = (d) => { const x = new Date(`${d}T00:00:00Z`); x.setUTCMonth(x.getUTCMonth() + months); return x.toISOString().slice(0, 10) >= today; };
const live = (cfg.partners || []).map((p) => ({ ...p, verified: p.verified.filter((v) => current(v.date)) })).filter((p) => p.verified.length);
if (process.argv.includes('--write')) {
  writeFileSync(join(root, 'web', 'partners.json'), JSON.stringify({ validity_months: months, partners: live }, null, 1) + '\n');
}
console.log(`Partners OK: ${(cfg.partners || []).length} partner(s), ${live.reduce((n, p) => n + p.verified.length, 0)} current verification(s).${process.argv.includes('--write') ? ' Wrote web/partners.json.' : ''}`);
