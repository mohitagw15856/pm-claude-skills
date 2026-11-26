#!/usr/bin/env node
// Drift check for Claude model references.
//
// data/models.json is the registry. This script reads every tracked file that is
// not a historical record and looks at each Claude model id it names:
//
//   unknown   an id the registry does not list (a typo, or a model newer than the
//             registry): always an error. Add it to data/models.json or fix it.
//   legacy    a model Anthropic still serves but has replaced. Allowed only where
//             data/model-refs-baseline.json already records it, and never more
//             often than recorded. So legacy references can fall, not grow.
//   current   fine.
//
// Historical records (sample outputs, benchmark results, changelogs, training
// data) name the model that produced them. They are facts and are not scanned.
//
//   node scripts/check-model-refs.mjs            check against the baseline
//   node scripts/check-model-refs.mjs --update   rewrite the baseline (after migrating files)
//   node scripts/check-model-refs.mjs --report   list every legacy reference by file
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { REGISTRY, modelInfo } from '../bin/lib/models.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = join(root, 'data', 'model-refs-baseline.json');
const has = (f) => process.argv.includes(f);

// Records of what a named model produced at the time. Rewriting them would falsify them.
const RECORDS = [
  /^examples\/samples\//, /^skillbench\/reports\//, /^skillbench\/results\.json$/, /^skillbench\/REPORT\.md$/, /^skillbench\/community\//,
  /^training\//, /^dataset\//, /^web\/samples\.json$/, /^web\/modelbench\.json$/, /^evals\/results/, /^evals\/zh-routing-results\.json$/,
  /^CHANGELOG\.md$/, /^RELEASE_NOTES\.md$/, /^EVOLUTION\.md$/, /^BUILD_NOTES\.md$/, /^newsletters?\//, /^announcements\//, /^firm-sessions\//,
  /^skill-releases\//, /^docs\/case-studies\//, /^docs\/paper\//, /^docs\/reports\//, /^data\/evolution-log\.json$/, /^CASE_STUDIES\.md$/, /^growth\//, /^proposals\//,
];
// Frozen task sets and eval inputs: a model name inside a task's text is part of the task.
const FIXTURES = [/^skillbench\/tasks[^/]*\.json$/, /^evals\/cases[^/]*\.json$/, /^evals\/gold\//, /^evals\/adversarial\//, /^evals\/robustness\//];
// Generated or vendored trees, and the registry itself.
const SKIP = [
  /^exports\//, /^node_modules\//, /^dist\//, /^plugins\/[^/]+\/skills\//, /^i18n\//, /^skills-i18n\//, /(^|\/)package-lock\.json$/,
  /^data\/models\.json$/, /^data\/model-refs-baseline\.json$/, /^bin\/lib\/models\.mjs$/, /^scripts\/check-model-refs\.mjs$/,
  /^tests\/anthropic-client-test\.mjs$/, /^cockpit\/src-tauri\/target\//,
];
const TEXT = /\.(md|mjs|cjs|js|ts|tsx|json|ya?ml|html|py|sh|toml|txt|svg|css)$/i;
const ID = /claude-(?:fable|mythos|opus|sonnet|haiku)-\d[a-z0-9]*(?:-\d[a-z0-9]*)*|claude-\d(?:-\d)?-(?:opus|sonnet|haiku)(?:-\d{8})?/g;

const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 })
  .split('\0').filter((f) => f && TEXT.test(f) && !SKIP.some((r) => r.test(f)) && !RECORDS.some((r) => r.test(f)) && !FIXTURES.some((r) => r.test(f)));

const legacy = {}, unknown = [];
let current = 0;
for (const f of files) {
  let text;
  try { text = readFileSync(join(root, f), 'utf8'); } catch { continue; }
  if (!text.includes('claude-')) continue;
  for (const m of text.matchAll(ID)) {
    const info = modelInfo(m[0]);
    if (!info) {
      const line = text.slice(0, m.index).split('\n').length;
      unknown.push({ file: f, line, id: m[0] });
    } else if (info.status === 'legacy') legacy[f] = (legacy[f] || 0) + 1;
    else current++;
  }
}
const totalLegacy = Object.values(legacy).reduce((a, b) => a + b, 0);

// The playground's price table cannot import the registry, so compare it here.
const priceDrift = [];
try {
  const pmcost = readFileSync(join(root, 'web', 'pmcost.js'), 'utf8');
  for (const m of pmcost.matchAll(/'(claude-[a-z0-9-]+)':\s*\[\s*([\d.]+)\s*,\s*([\d.]+)\s*\]/g)) {
    const info = modelInfo(m[1]);
    if (info && Number.isFinite(info.input) && (Number(m[2]) !== info.input || Number(m[3]) !== info.output)) {
      priceDrift.push(`web/pmcost.js prices ${m[1]} at [${m[2]}, ${m[3]}]; data/models.json says [${info.input}, ${info.output}]`);
    }
  }
  for (const c of REGISTRY.current) if (!pmcost.includes(`'${c.id}'`)) priceDrift.push(`web/pmcost.js has no price for the current model ${c.id}`);
} catch { /* the page is optional in a partial checkout */ }
const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => (a < b ? -1 : 1)));

if (has('--report')) {
  for (const [f, n] of Object.entries(legacy).sort((a, b) => b[1] - a[1])) console.log(`${String(n).padStart(4)}  ${f}`);
  console.log(`\n${totalLegacy} legacy reference(s) in ${Object.keys(legacy).length} file(s); ${current} current.`);
  process.exit(0);
}

if (has('--update')) {
  if (unknown.length) { for (const u of unknown) console.error(`  ✗ ${u.file}:${u.line} names "${u.id}", which data/models.json does not list`); process.exit(1); }
  writeFileSync(BASELINE, JSON.stringify({
    _comment: 'Legacy Claude model references that are allowed to remain, by file. Written by scripts/check-model-refs.mjs --update. The check fails if a count rises or a new file appears, so this can only shrink. Each remaining file is a live API call site that needs a test call before it moves; see docs/MODELS.md.',
    registryChecked: REGISTRY.checked,
    total: totalLegacy,
    files: sorted(legacy),
  }, null, 2) + '\n');
  console.log(`Baseline written: ${totalLegacy} legacy reference(s) in ${Object.keys(legacy).length} file(s).`);
  process.exit(0);
}

let failed = false;
for (const d of priceDrift) { failed = true; console.error('  ✗ ' + d); }
for (const u of unknown) { failed = true; console.error(`  ✗ ${u.file}:${u.line} names "${u.id}", which data/models.json does not list. Add it to the registry or correct it.`); }

const base = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')).files || {} : {};
for (const [f, n] of Object.entries(legacy)) {
  const allowed = base[f] || 0;
  if (n > allowed) {
    failed = true;
    console.error(`  ✗ ${f} names a legacy model ${n} time(s); the baseline allows ${allowed}. Use a role from bin/lib/models.mjs or a current id from data/models.json.`);
  }
}
const shrunk = Object.entries(base).filter(([f, n]) => (legacy[f] || 0) < n).length;
if (failed) { console.error('\nModel reference check failed. Registry: data/models.json. Guide: docs/MODELS.md'); process.exit(1); }
console.log(`model refs: ${current} current, ${totalLegacy} legacy within the baseline, 0 unknown ✓${shrunk ? `  (${shrunk} file(s) now below their baseline: run --update to ratchet down)` : ''}`);
