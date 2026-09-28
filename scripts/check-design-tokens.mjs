#!/usr/bin/env node
// Design token gate. Two rules:
//   1. Every token listed in design-system/MASTER.md exists in web/styles.css
//      with the same value, and the stylesheet defines no token the document
//      does not list.
//   2. A ratchet: the number of raw colours, font sizes, radii and spacing
//      values in the stylesheet may not go above design-system/baseline.json.
//      They may only come down.
//
//   node scripts/check-design-tokens.mjs            # exit 1 on any failure
//   node scripts/check-design-tokens.mjs --report   # print the counts, exit 0
//   node scripts/check-design-tokens.mjs --selftest
//
// No dependencies.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CSS = join(ROOT, 'web', 'styles.css');
const MASTER = join(ROOT, 'design-system', 'MASTER.md');
const BASELINE = join(ROOT, 'design-system', 'baseline.json');

const DARK = /:root\s*\{([\s\S]*?)\}/;
const LIGHT = /html\[data-theme="light"\]\s*\{([\s\S]*?)\}/;
const norm = (v) => v.trim().replace(/\s+/g, ' ');

export function parseDeclarations(block) {
  const out = new Map();
  for (const m of block.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) out.set(m[1], norm(m[2]));
  return out;
}

export function cssTokens(css) {
  const dark = css.match(DARK);
  const light = css.match(LIGHT);
  return {
    dark: dark ? parseDeclarations(dark[1]) : new Map(),
    light: light ? parseDeclarations(light[1]) : new Map(),
  };
}

// Rows look like: | `--bg` | `#0d0f14` | `#f7f6f3` | Page background |
// The light cell is "same" when the light theme does not override the token.
export function masterTokens(md) {
  const dark = new Map();
  const light = new Map();
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`(--[a-z0-9-]+)`\s*\|\s*`([^`]+)`\s*\|\s*(`([^`]+)`|same)\s*\|/);
    if (!m) continue;
    dark.set(m[1], norm(m[2]));
    if (m[4]) light.set(m[1], norm(m[4]));
  }
  return { dark, light };
}

export function compareTokens(css, master) {
  const problems = [];
  for (const theme of ['dark', 'light']) {
    for (const [name, value] of master[theme]) {
      if (!css[theme].has(name)) problems.push(`${name} (${theme}) is in MASTER.md but not in web/styles.css`);
      else if (css[theme].get(name) !== value) problems.push(`${name} (${theme}): MASTER.md says ${value}, web/styles.css says ${css[theme].get(name)}`);
    }
    for (const name of css[theme].keys()) {
      if (!master[theme].has(name)) problems.push(`${name} (${theme}) is in web/styles.css but not in MASTER.md`);
    }
  }
  return problems;
}

// What the ratchet counts. Token blocks are removed first, so defining a token
// never counts as a raw value.
export function measure(css) {
  const body = css.replace(DARK, '').replace(LIGHT, '');
  const distinct = (re, pick = (m) => m[1]) => new Set([...body.matchAll(re)].map((m) => pick(m).trim().toLowerCase())).size;
  const spacing = new Set();
  for (const m of body.matchAll(/(?:padding|margin|gap)[a-z-]*\s*:\s*([^;]+);/g)) {
    for (const v of m[1].matchAll(/\b\d+(?:\.\d+)?px/g)) spacing.add(v[0]);
  }
  return {
    rawColours: distinct(/(#[0-9a-fA-F]{3,8})\b/g),
    fontSizes: distinct(/font-size\s*:\s*([0-9.]+(?:px|rem|em))/g),
    radii: distinct(/border-radius\s*:\s*([^;]+);/g),
    spacingValues: spacing.size,
  };
}

export function compareBaseline(now, baseline) {
  const over = [];
  const lower = [];
  for (const key of Object.keys(now)) {
    const limit = baseline[key];
    if (!Number.isInteger(limit) || limit < 0) { over.push(`${key}: no valid baseline`); continue; }
    if (now[key] > limit) over.push(`${key}: ${now[key]}, the baseline is ${limit}. Use an existing value or a token`);
    else if (now[key] < limit) lower.push(`${key}: ${now[key]}, the baseline is ${limit}. Lower the baseline to lock in the gain`);
  }
  return { over, lower };
}

function selftest() {
  const t = [];
  const eq = (name, got, want) => t.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });

  const css = [
    ':root {', '  --bg: #000;', '  --grad: linear-gradient(135deg,  #111 0%, #222 100%);', '}',
    'html[data-theme="light"] {', '  --bg: #fff;', '}',
    'a { color: #ABC; font-size: 12px; border-radius: 8px; padding: 4px 8px; }',
    'b { color: #abc; font-size: 12.5px; border-radius: 8px; margin: 0 8px; gap: 0; }',
  ].join('\n');
  const tokens = cssTokens(css);
  eq('dark tokens read', [...tokens.dark.keys()], ['--bg', '--grad']);
  eq('values are normalised', tokens.dark.get('--grad'), 'linear-gradient(135deg, #111 0%, #222 100%)');
  eq('light tokens read', [...tokens.light], [['--bg', '#fff']]);
  eq('no token blocks gives empty maps', cssTokens('a{}').dark.size, 0);

  const md = [
    '| Token | Dark | Light | Use |', '|---|---|---|---|',
    '| `--bg` | `#000` | `#fff` | Background |',
    '| `--grad` | `linear-gradient(135deg, #111 0%, #222 100%)` | same | Accent |',
    'a line that is not a row',
  ].join('\r\n');
  const master = masterTokens(md);
  eq('master rows read through CRLF', [...master.dark.keys()], ['--bg', '--grad']);
  eq('"same" adds no light entry', [...master.light.keys()], ['--bg']);
  eq('matching sets have no problems', compareTokens(tokens, master), []);

  const changed = masterTokens(md.replace('`#000`', '`#010101`'));
  eq('a changed value is reported', compareTokens(tokens, changed).length, 1);
  const missing = masterTokens(md.split('\r\n').filter((l) => !l.includes('--grad')).join('\r\n'));
  eq('an undocumented token is reported', compareTokens(tokens, missing), ['--grad (dark) is in web/styles.css but not in MASTER.md']);

  const m = measure(css);
  eq('colours are counted without case, outside token blocks', m.rawColours, 1);
  eq('font sizes counted', m.fontSizes, 2);
  eq('radii counted', m.radii, 1);
  eq('spacing counted, zero without a unit ignored', m.spacingValues, 2);

  eq('at the baseline passes', compareBaseline(m, { ...m }), { over: [], lower: [] });
  eq('above the baseline fails', compareBaseline(m, { ...m, radii: 0 }).over.length, 1);
  eq('a baseline of zero is respected', compareBaseline({ radii: 0 }, { radii: 0 }).over, []);
  eq('below the baseline is a note', compareBaseline(m, { ...m, fontSizes: 5 }).lower.length, 1);
  eq('a missing baseline fails', compareBaseline(m, {}).over.length, 4);

  const failed = t.filter((x) => !x.ok);
  for (const x of failed) console.error(`✗ ${x.name}: got ${JSON.stringify(x.got)}, want ${JSON.stringify(x.want)}`);
  console.log(`check-design-tokens selftest: ${t.length - failed.length} passed · ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) return selftest();

  for (const [p, label] of [[CSS, 'web/styles.css'], [MASTER, 'design-system/MASTER.md'], [BASELINE, 'design-system/baseline.json']]) {
    if (!existsSync(p)) { console.error(`✗ ${label} is missing`); process.exit(1); }
  }
  const css = readFileSync(CSS, 'utf8');
  const now = measure(css);
  if (args.includes('--report')) {
    console.log(JSON.stringify(now, null, 2));
    return;
  }

  const tokenProblems = compareTokens(cssTokens(css), masterTokens(readFileSync(MASTER, 'utf8')));
  const { over, lower } = compareBaseline(now, JSON.parse(readFileSync(BASELINE, 'utf8')).counts || {});
  for (const p of tokenProblems) console.error(`  ✗ ${p}`);
  for (const p of over) console.error(`  ✗ ${p}`);
  for (const p of lower) console.log(`  ▲ ${p}`);

  const failed = tokenProblems.length + over.length;
  if (failed) {
    console.error(`\nDesign token check failed: ${failed} problem(s).`);
    process.exit(1);
  }
  console.log(`Design token check clean: tokens match, ${now.rawColours} raw colours, ${now.fontSizes} font sizes, ${now.radii} radii, ${now.spacingValues} spacing values.`);
}

const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) main();
