#!/usr/bin/env node
// check-partners.mjs: a complete partner passes; missing or invented pieces fail;
// an expired verification is left out of web/partners.json.
import { writeFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = mkdtempSync(join(tmpdir(), 'partners-'));
const recent = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
const good = { id: 'riverside-advice', name: 'Riverside Advice Centre', kind: 'advice-service', url: 'https://riverside.example.org', region: 'England and Wales',
  issue: 'https://github.com/mohitagw15856/pm-claude-skills/issues/999', verified: [{ skill: 'security-deposit-recovery', date: recent, checked_by: 'a housing caseworker' }] };
const run = (partners) => { const f = join(dir, 'p.json'); writeFileSync(f, JSON.stringify({ validity_months: 12, partners })); const r = spawnSync(process.execPath, [join(root, 'scripts', 'check-partners.mjs'), '--file', f], { encoding: 'utf8' }); return { ok: r.status === 0, out: r.stdout + r.stderr }; };
const cases = [
  ['complete partner passes', [good], true, /1 current/],
  ['expired verification is not current', [{ ...good, verified: [{ ...good.verified[0], date: '2020-01-01' }] }], true, /0 current/],
  ['unknown skill', [{ ...good, verified: [{ ...good.verified[0], skill: 'no-such-skill' }] }], false, /not a skill/],
  ['future date', [{ ...good, verified: [{ ...good.verified[0], date: '2999-01-01' }] }], false, /future/],
  ['no issue link', [{ ...good, issue: '' }], false, /issue/],
  ['bad kind', [{ ...good, kind: 'influencer' }], false, /kind/],
  ['http url', [{ ...good, url: 'http://riverside.example.org' }], false, /url/],
  ['duplicate id', [good, good], false, /duplicate/],
];
let fails = 0;
for (const [label, partners, ok, re] of cases) { const r = run(partners); if (r.ok !== ok || !re.test(r.out)) { fails++; console.error(`✗ ${label}\n${r.out}`); } }
if (fails) process.exit(1);
console.log(`Partner checks: ${cases.length} cases pass. ✓`);
