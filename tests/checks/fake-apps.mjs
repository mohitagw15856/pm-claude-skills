#!/usr/bin/env node
// The fake-apps MCP sandbox: it speaks MCP over stdio, serves the fixtures, records
// drafts, refuses and logs every action tool, and its data stays on .invalid domains.
import { spawn } from 'node:child_process';
import { readFileSync, mkdtempSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const dir = join(root, 'integrations', 'fake-apps-mcp');
const fixtures = readFileSync(join(dir, 'fixtures.json'), 'utf8');
for (const a of fixtures.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g) || []) assert.match(a, /\.invalid$/, `fixture address ${a} must use a reserved .invalid domain`);

const logFile = join(mkdtempSync(join(tmpdir(), 'fake-apps-')), 'actions.log');
const child = spawn(process.execPath, [join(dir, 'server.mjs')], { env: { ...process.env, FAKE_APPS_LOG: logFile } });
let buf = '';
const waiting = new Map();
child.stdout.on('data', (d) => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const m = JSON.parse(buf.slice(0, i)); buf = buf.slice(i + 1); waiting.get(m.id)?.(m); } });
let n = 0;
const call = (method, params) => new Promise((res) => { const id = ++n; waiting.set(id, res); child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n'); });

const init = await call('initialize', { protocolVersion: '2025-06-18' });
assert.equal(init.result.serverInfo.name, 'fake-apps');
const list = await call('tools/list');
const names = list.result.tools.map((t) => t.name);
for (const t of ['gmail_search', 'stripe_overview', 'gusto_payroll_preview', 'create_draft', 'gmail_send', 'stripe_refund']) assert.ok(names.includes(t), `missing tool ${t}`);
const inbox = JSON.parse((await call('tools/call', { name: 'gmail_search', arguments: { query: 'wholesale' } })).result.content[0].text);
assert.equal(inbox.length, 1);
const draft = JSON.parse((await call('tools/call', { name: 'create_draft', arguments: { to: 'orders@harbourstores.invalid', subject: 'Re: order' } })).result.content[0].text);
assert.equal(draft.status, 'drafted');
const sent = await call('tools/call', { name: 'gmail_send', arguments: { details: 'test' } });
assert.equal(sent.result.isError, true);
assert.equal(JSON.parse(sent.result.content[0].text).status, 'refused');
const bad = await call('tools/call', { name: 'no_such_tool' });
assert.ok(bad.error);
child.kill();
const logged = readFileSync(logFile, 'utf8');
assert.match(logged, /ATTEMPTED gmail_send/); assert.match(logged, /DRAFT to=orders@harbourstores\.invalid/);
console.log(`Fake-apps sandbox: ${names.length} tools, reads, drafts and refused actions all behave. ✓`);
