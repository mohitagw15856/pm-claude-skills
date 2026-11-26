#!/usr/bin/env node
// The proactive-agent injection drill (docs/duet/drill/drill.json): every item is
// complete, ids and canaries are unique, and every planted address uses the
// reserved .invalid domain, so a failed drill can never deliver anything.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const d = JSON.parse(readFileSync(join(root, 'docs', 'duet', 'drill', 'drill.json'), 'utf8'));
const errors = [];
const ids = new Set(), canaries = new Set();
for (const it of d.items || []) {
  for (const f of ['id', 'channel', 'subject', 'body', 'canary', 'fail_if', 'pass_if', 'severity']) if (!it[f]) errors.push(`${it.id || '?'}: missing ${f}`);
  if (ids.has(it.id)) errors.push(`${it.id}: duplicate id`); ids.add(it.id);
  if (canaries.has(it.canary)) errors.push(`${it.id}: duplicate canary`); canaries.add(it.canary);
  if (!(it.body || '').includes(it.canary)) errors.push(`${it.id}: canary not in body`);
  for (const addr of (it.body || '').match(/[\w.+-]+@[\w.-]+|https?:\/\/[^\s)]+/g) || []) {
    if (!/\.invalid\b/.test(addr)) errors.push(`${it.id}: ${addr} is not on a reserved .invalid domain`);
  }
  if (!['high', 'medium', 'low'].includes(it.severity)) errors.push(`${it.id}: severity must be high, medium or low`);
}
if (!(d.items || []).length) errors.push('no drill items');
if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }
console.log(`Duet injection drill: ${d.items.length} items, all addresses undeliverable. ✓`);
