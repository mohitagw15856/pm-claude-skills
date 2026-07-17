#!/usr/bin/env node
// The Anti-Pattern Museum — extracts every "Do not…" rule from every skill
// into web/museum.json. The rules are the most shareable atoms the library
// owns; until now they only existed inside the handbook's almanac.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const byName = new Map(skills.map((s) => [s.name, s]));

const rules = [];
for (const name of readdirSync(join(root, 'skills'))) {
  const f = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(f)) continue;
  const body = readFileSync(f, 'utf8');
  const m = body.match(/##\s*Anti-Patterns[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i);
  if (!m) continue;
  for (const b of m[1].matchAll(/^[-*]\s*(?:\[[ x]\]\s*)?(.+)$/gm)) {
    const text = b[1].replace(/\*\*/g, '').trim();
    if (text.length > 20) rules.push({ t: text.slice(0, 300), s: name, p: byName.get(name)?.plugin || 'other' });
  }
}
writeFileSync(join(root, 'web', 'museum.json'), JSON.stringify({ built: new Date().toISOString().slice(0, 10), count: rules.length, rules }, null, 0) + '\n');
console.log(`Wrote web/museum.json — ${rules.length} rules from ${new Set(rules.map((r) => r.s)).size} skills.`);
