#!/usr/bin/env node
// The VS Code extension's logic, tested without VS Code: the helpers are pure, and the
// extension file is loaded with a stand-in `vscode` module to check its commands wire up.
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import Module from 'node:module';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'integrations', 'vscode');
const require = createRequire(import.meta.url);
const lib = require(join(dir, 'lib.js'));
let pass = 0; let fail = 0;
const ok = (label, cond, detail = '') => { if (cond) pass++; else { fail++; console.error(`  ✗ ${label} ${detail}`); } };
const throws = (label, fn) => { try { fn(); fail++; console.error(`  ✗ ${label}: did not throw`); } catch { pass++; } };

ok('search address encodes the query', lib.searchUrl('metric drop & why?') === `${lib.API}/v1/search?q=metric%20drop%20%26%20why%3F&limit=20`);
ok('limit is clamped', lib.searchUrl('x', 999).endsWith('limit=50') && lib.searchUrl('x', 0).endsWith('limit=1'));
throws('an empty search is refused', () => lib.searchUrl('   '));
ok('skill address', lib.skillUrl('prd-template') === `${lib.API}/v1/skills/prd-template`);
for (const bad of ['../secrets', 'a/b', 'A', 'x?y=1', '', undefined, null, 7]) throws(`skill name "${bad}" is refused`, () => lib.skillUrl(bad));
throws('source address refuses a path too', () => lib.sourceUrl('../../x'));
const items = lib.toItems({ skills: [{ name: 'prd-template', title: 'PRD', description: 'Write\n a  PRD.' }, { name: '../evil', title: 'x' }, null, { title: 'no name' }] });
ok('only well-formed skills become rows', items.length === 1 && items[0].name === 'prd-template' && items[0].detail === 'Write a PRD.');
ok('a malformed response gives no rows', lib.toItems(null).length === 0 && lib.toItems({ skills: 'x' }).length === 0);
const prompt = lib.asPrompt({ name: 'prd-template', title: 'PRD', instructions: 'Do the thing.' }, 'referral feature');
ok('prompt has the instructions then the task', prompt === '# PRD\n\nDo the thing.\n\n---\n\nTask: referral feature\n');
ok('no task leaves a placeholder', lib.asPrompt({ name: 'x', instructions: 'I' }, '').includes('Task: [describe what you need here]'));
throws('a skill with no instructions is an error', () => lib.asPrompt({ name: 'x' }, 't'));

// Load extension.js with a stand-in vscode module and check the three commands register.
const registered = [];
const fake = { commands: { registerCommand: (id) => { registered.push(id); return { dispose() {} }; } }, window: {}, env: {}, workspace: {}, Uri: {} };
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) { return request === 'vscode' ? 'vscode' : resolve.call(this, request, ...rest); };
require.cache.vscode = { id: 'vscode', filename: 'vscode', loaded: true, exports: fake };
try {
  const ext = require(join(dir, 'extension.js'));
  const ctx = { subscriptions: [] };
  ext.activate(ctx);
  const declared = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).contributes.commands.map((c) => c.command).sort();
  ok('every declared command is registered', JSON.stringify(registered.slice().sort()) === JSON.stringify(declared), registered.join(','));
  ok('subscriptions are kept for disposal', ctx.subscriptions.length === 3);
} finally { Module._resolveFilename = resolve; }
ok('no telemetry or key handling in the extension', !/telemetry|apiKey|api_key|authorization/i.test(readFileSync(join(dir, 'extension.js'), 'utf8').replace(/no telemetry, no key/i, '')));

console.log(`vscode extension: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
