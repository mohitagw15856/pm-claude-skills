#!/usr/bin/env node
// Checks the USSD menu: every skill exists, every screen fits, the secret path is
// enforced and SMS goes out only when configured. No network: fetch is stubbed.
//   node integrations/ussd/test.mjs
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import worker, { screen } from './src/index.js';
import { MENU } from './src/menu.js';
import { MENU as AFRICA } from './src/menu-africa.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
for (const t of [...MENU, ...AFRICA]) for (const [name] of t.skills) assert.ok(existsSync(join(root, 'skills', name, 'SKILL.md')), `menu skill missing: ${name}`);

const sent = [];
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('africastalking')) { sent.push(Object.fromEntries(opts.body)); return new Response('{}', { status: 201 }); }
  return new Response(JSON.stringify({ description: 'Get a deposit back 🔑 — with a dated letter and the evidence that counts. Use when a landlord keeps money.' }));
};

const env = {};
const first = await screen(env, '', '+254700000001');
assert.match(first, /^CON /);
assert.ok(first.length <= 182, 'first screen too long');
for (let i = 1; i <= MENU.length; i++) {
  const s = await screen(env, String(i), '');
  assert.match(s, /^CON /); assert.ok(s.length <= 182, `topic ${i} screen too long: ${s.length}`);
  for (let j = 1; j <= MENU[i - 1].skills.length; j++) {
    const leaf = await screen(env, `${i}*${j}`, '');
    assert.match(leaf, /^END /); assert.ok(leaf.length <= 182, `leaf ${i}*${j} too long: ${leaf.length}`);
    assert.doesNotMatch(leaf, /Use when/);
    assert.doesNotMatch(leaf, /[\u2014\u{1F000}-\u{1FFFF}]/u, 'non-GSM character on screen');
  }
}
assert.equal(await screen(env, '2*0', ''), first, '0 goes back');
assert.match(await screen(env, '9', ''), /^END Sorry/);
assert.match(await screen(env, '1*1*5', ''), /^END Sorry/);
assert.equal(sent.length, 0, 'no SMS without AT keys');

const smsEnv = { AT_API_KEY: 'k', AT_USERNAME: 'sandbox', AT_SANDBOX: 'true' };
assert.match(await screen(smsEnv, '2*1', '+254700000001'), /sent you the link by SMS/);
assert.equal(sent.length, 1); assert.match(sent[0].message, /index\.html\?skill=security-deposit-recovery/);
await screen(smsEnv, '2*1', 'not-a-number');
assert.equal(sent.length, 1, 'no SMS to a malformed number');

const post = (path, text) => worker.fetch(new Request(`https://x${path}`, { method: 'POST', body: new URLSearchParams({ text, phoneNumber: '' }) }), { USSD_SECRET: 's3cret' }, {});
assert.equal((await post('/wrong', '')).status, 403);
assert.equal((await worker.fetch(new Request('https://x/s3cret', { method: 'POST', body: new URLSearchParams({ text: '' }) }), {}, {})).status, 403, 'no secret set, no service');
assert.match(await (await post('/s3cret', '1')).text(), /^CON Money and work/);

// The Africa menu (USSD_MENU = "africa"): same limits, different topics.
const af = { USSD_MENU: 'africa' };
const afFirst = await screen(af, '', '');
assert.match(afFirst, /^CON PM Skills: work and money\n1\. Nigeria/);
assert.ok(afFirst.length <= 182, 'africa first screen too long');
for (let i = 1; i <= AFRICA.length; i++) {
  const s = await screen(af, String(i), '');
  assert.match(s, /^CON /); assert.ok(s.length <= 182, `africa topic ${i} screen too long: ${s.length}`);
  for (let j = 1; j <= AFRICA[i - 1].skills.length; j++) {
    const leaf = await screen(af, `${i}*${j}`, '');
    assert.match(leaf, /^END /); assert.ok(leaf.length <= 182, `africa leaf ${i}*${j} too long: ${leaf.length}`);
    assert.doesNotMatch(leaf, /[\u2014\u{1F000}-\u{1FFFF}]/u, 'non-GSM character on screen');
  }
}
assert.match(await screen({ USSD_MENU: 'nope' }, '', ''), /^CON PM Skills: free help/, 'an unknown menu name falls back to the default');
assert.match(await screen({ USSD_MENU: 'constructor' }, '', ''), /^CON PM Skills: free help/, 'a prototype key is not a menu');
console.log('USSD: both menus, screens, secret path and SMS checks pass. ✓');
