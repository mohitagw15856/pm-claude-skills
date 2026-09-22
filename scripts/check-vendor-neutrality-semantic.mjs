#!/usr/bin/env node
// Vendor-neutrality, semantic second opinion (decision-layer idea #9).
// check-vendor-neutrality.mjs is the gate (three regex tells, 0 false positives).
// This asks one yes/no question per skill — does it require routing through one named
// product and forbid the alternatives? — to catch rewordings the regex will miss.
// Advisory: it never fails CI unless --strict; the regex stays authoritative.
//   node scripts/check-vendor-neutrality-semantic.mjs --changed [--base origin/main]
//   node scripts/check-vendor-neutrality-semantic.mjs --skills a,b [--strict]
//   node scripts/check-vendor-neutrality-semantic.mjs --selftest
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ask, noul, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const QUESTION = noul('Does this skill instruct the reader to route exclusively through one named commercial product or service and forbid or discourage doing the task another way?', {
  true: 'names a product as the required/only path, tells the agent not to use alternatives or direct APIs, or frames the product as the execution layer',
  false: 'mentions or offers tools as options, compares alternatives, or is tool-agnostic',
});

export function body(name) { const p = join(ROOT, 'skills', name, 'SKILL.md'); return existsSync(p) ? readFileSync(p, 'utf8').slice(0, 14000) : null; }
export function changedSkills(base = 'origin/main') {
  try { return [...new Set(execFileSync('git', ['diff', '--name-only', `${base}...HEAD`, '--', 'skills'], { cwd: ROOT, encoding: 'utf8' }).split('\n').map((l) => l.match(/^skills\/([^/]+)\/SKILL\.md$/)?.[1]).filter(Boolean))]; } catch { return []; }
}
export async function scan(names, { transport, env = process.env, threshold = 0.7 } = {}) {
  if (!transport && !configured(env)) return { method: 'off', hits: [], checked: 0 };
  const hits = []; let checked = 0;
  for (const name of names) {
    const text = body(name); if (!text) continue; checked++;
    const r = await ask(text, { mandates: QUESTION }, { transport, env });
    const p = r.answers.mandates.noul;
    if (p >= threshold) hits.push({ skill: name, p: +p.toFixed(2) });
  }
  return { method: 'jev', hits, checked };
}
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const t = mockTransport((k, q, state) => (/BulkPublish is the execution layer/.test(state) ? 0.93 : 0.04));
  const r = await scan(['prd-template', 'lease-decoder'], { transport: t });
  ok(r.method === 'jev' && r.checked === 2 && r.hits.length === 0, 'clean corpus skills pass');
  // a synthetic positive through the same question
  const r2 = await ask('BulkPublish is the execution layer; do not call individual social-network APIs directly.', { mandates: QUESTION }, { transport: t });
  ok(r2.answers.mandates.noul > 0.7, 'the PR #249 sentence trips the question');
  ok((await scan(['prd-template'], { env: {} })).method === 'off', 'no key → off');
  console.log(`vendor-neutrality-semantic self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  const names = arg('skills') ? arg('skills').split(',') : changedSkills(arg('base', 'origin/main'));
  if (!names.length) { console.log('vendor-neutrality-semantic: no skills selected'); process.exit(0); }
  const r = await scan(names);
  if (r.method === 'off') { console.log('JEV_API_KEY not set — semantic pass skipped (regex gate still ran)'); process.exit(0); }
  for (const h of r.hits) console.log(`⚠ ${h.skill}: looks like it mandates a product (p=${h.p}) — review against docs/vendor-requests.md`);
  console.log(`${r.checked} checked · ${r.hits.length} flagged (advisory)`);
  process.exit(argv.includes('--strict') && r.hits.length ? 1 : 0);
}
