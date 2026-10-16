#!/usr/bin/env node
// Jurisdiction overlays (overlays/<skill>/<code>.md, see overlays/README.md):
// validates them and publishes web/overlays.json for the playground, which adds
// the visitor's local layer to a skill when it runs.
//
//   node scripts/build-overlays.mjs           # write web/overlays.json
//   node scripts/build-overlays.mjs --check   # validate only (in npm run check)
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'overlays');
const CODE = /^[A-Z]{2}(-[A-Z0-9]{2,3})?$/;
const problems = [];
const out = {};
for (const skill of existsSync(dir) ? readdirSync(dir).filter((d) => statSync(join(dir, d)).isDirectory()) : []) {
  if (!existsSync(join(root, 'skills', skill, 'SKILL.md'))) { problems.push(`${skill}: no such skill`); continue; }
  for (const f of readdirSync(join(dir, skill)).filter((x) => x.endsWith('.md'))) {
    const at = `${skill}/${f}`;
    const md = readFileSync(join(dir, skill, f), 'utf8').replace(/\r\n/g, '\n');
    const fm = (md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) || []);
    if (!fm[1]) { problems.push(`${at}: no frontmatter`); continue; }
    const get = (k) => ((fm[1].match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1] || '').trim();
    const code = get('code'), place = get('place'), status = get('status'), checked = get('checked');
    const sources = [...fm[1].matchAll(/^\s+-\s+(https:\/\/\S+)$/gm)].map((m) => m[1]);
    if (get('skill') !== skill) problems.push(`${at}: skill field must be ${skill}`);
    if (!CODE.test(code) || f !== `${code}.md`) problems.push(`${at}: code must be like GB or US-CA and match the file name`);
    if (!place) problems.push(`${at}: needs a place`);
    if (!['draft', 'reviewed'].includes(status)) problems.push(`${at}: status must be draft or reviewed`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checked)) problems.push(`${at}: checked must be a date`);
    if (!sources.length) problems.push(`${at}: needs at least one https source`);
    const body = fm[2].trim();
    if (body.length < 80 || /<script|ignore (all )?previous instructions/i.test(body)) problems.push(`${at}: body too short or contains blocked text`);
    const stale = (Date.now() - new Date(checked)) / 864e5 > 365;
    (out[skill] = out[skill] || {})[code] = { place, status, checked, stale, sources, maintainers: [...fm[1].matchAll(/^maintainers:\s*\[(.*)\]$/gm)].flatMap((m) => m[1].split(',').map((x) => x.trim().replace(/['"]/g, '')).filter(Boolean)), body };
  }
}
if (problems.length) { console.error(`Overlays: ${problems.length} problem(s)\n  ${problems.join('\n  ')}`); process.exit(1); }
const n = Object.values(out).reduce((a, o) => a + Object.keys(o).length, 0);
if (process.argv.includes('--check')) { console.log(`Overlays: ${n} valid across ${Object.keys(out).length} skill(s). ✓`); process.exit(0); }
writeFileSync(join(root, 'web', 'overlays.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), overlays: out }));
console.log(`Wrote web/overlays.json: ${n} overlay(s).`);
