#!/usr/bin/env node
// The paid-expert rules in check-registry.mjs: a complete paid entry passes, and
// each missing piece (checkout, price, currency, credential, profile) fails.
//   node tests/registry-paid-test.mjs
import { writeFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = mkdtempSync(join(tmpdir(), 'reg-'));
const good = {
  name: 'jane-doe/lease-review-pro', description: 'A solicitor-written lease review that flags the ten clauses tenants most often regret signing.',
  repo: 'https://github.com/jane-doe/lease-skills', path: 'preview/SKILL.md', ref: 'v1.0.0', sha256: 'sha256:' + 'a'.repeat(64),
  pricing: { model: 'paid', price: '19.00', currency: 'GBP', checkout: 'https://polar.sh/jane-doe/lease-review-pro' },
  expert: { name: 'Jane Doe', credential: 'Solicitor in England and Wales, 12 years in residential property', profile: 'https://example.org/jane-doe' },
};
const run = (entry) => {
  const f = join(dir, 'r.json');
  writeFileSync(f, JSON.stringify({ spec: 'pm-skills-registry/1', skills: [entry] }));
  return spawnSync(process.execPath, [join(root, 'scripts', 'check-registry.mjs'), '--file', f], { encoding: 'utf8' });
};
let fails = 0;
const expect = (label, entry, ok, re) => {
  const r = run(entry); const out = r.stdout + r.stderr;
  if ((r.status === 0) !== ok || (re && !re.test(out))) { fails++; console.error(`✗ ${label}\n${out}`); }
};
const without = (path, val) => { const e = structuredClone(good); const [a, b] = path.split('.'); if (b) e[a][b] = val; else e[a] = val; return e; };
expect('complete paid entry passes', good, true);
expect('free entry needs no expert', { ...without('expert', undefined), pricing: { model: 'free' } }, true);
expect('checkout host', without('pricing.checkout', 'https://evil.example/pay'), false, /checkout URL/);
expect('GitHub Sponsors checkout allowed', without('pricing.checkout', 'https://github.com/sponsors/jane-doe'), true);
expect('price format', without('pricing.price', '19 pounds'), false, /pricing\.price/);
expect('currency', without('pricing.currency', 'pounds'), false, /currency/);
expect('credential', without('expert.credential', ''), false, /credential/);
expect('profile', without('expert.profile', 'http://insecure.example'), false, /profile/);
if (fails) process.exit(1);
console.log('Registry paid-entry rules: 8 cases pass. ✓');
