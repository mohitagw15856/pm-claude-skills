#!/usr/bin/env node
// Generates web/skills.json from the canonical skills/ directory.
// No dependencies — run with: node web/build-skills.mjs
import { readFileSync, readdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const pluginsDir = join(root, 'plugins');

// --- Skill tiers (single source: skill-tiers.json) ---
// Anything not listed is 'stable'. Used to badge/filter skills in the playground.
let TIERS = { productionReady: [], experimental: [] };
const tiersFile = join(root, 'skill-tiers.json');
if (existsSync(tiersFile)) TIERS = { ...TIERS, ...JSON.parse(readFileSync(tiersFile, 'utf8')) };
const productionSet = new Set(TIERS.productionReady);
const experimentalSet = new Set(TIERS.experimental);
const tierFor = (name) =>
  productionSet.has(name) ? 'production' : experimentalSet.has(name) ? 'experimental' : 'stable';

// --- Eval scores (from evals/results.json) ---
// Average the per-model "overall" (a 0–5 rubric score) for each scored skill.
// Only skills with eval cases get a score; the rest stay unscored (honest).
const evalScores = {};
const evalsFile = join(root, 'evals', 'results.json');
if (existsSync(evalsFile)) {
  try {
    const acc = {};
    for (const r of JSON.parse(readFileSync(evalsFile, 'utf8')).results || []) {
      (acc[r.skill] ||= []).push(r.overall);
    }
    for (const [skill, arr] of Object.entries(acc)) {
      evalScores[skill] = {
        score: Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10,
        runs: arr.length,
      };
    }
  } catch { /* leave unscored on parse error */ }
}

// --- Framework attribution (from skill-sources.json) ---
let SOURCES = {};
const sourcesFile = join(root, 'skill-sources.json');
if (existsSync(sourcesFile)) {
  try { SOURCES = JSON.parse(readFileSync(sourcesFile, 'utf8')).sources || {}; } catch { /* ignore */ }
}

// --- Map each skill name -> plugin bundle (for grouping/filtering) ---
const skillToPlugin = {};
if (existsSync(pluginsDir)) {
  for (const plugin of readdirSync(pluginsDir)) {
    const pSkills = join(pluginsDir, plugin, 'skills');
    if (existsSync(pSkills) && statSync(pSkills).isDirectory()) {
      for (const s of readdirSync(pSkills)) skillToPlugin[s] = plugin;
    }
  }
}

// --- Parse YAML-ish frontmatter (name + description only) ---
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      meta[kv[1]] = v;
    }
  }
  return { meta, body: m[2] };
}

// --- Extract input fields from the "Required Inputs" style section ---
function parseInputs(body) {
  const lines = body.split('\n');
  const headingRe = /^#{2,3}\s+.*(required inputs|inputs needed|information needed|what (i|you).*need)/i;
  let i = lines.findIndex((l) => headingRe.test(l));
  if (i === -1) return [];
  const inputs = [];
  for (let j = i + 1; j < lines.length; j++) {
    const line = lines[j];
    if (/^#{1,3}\s/.test(line)) break; // next section
    const bullet = line.match(/^\s*[-*]\s+(.*)$/);
    if (!bullet) continue;
    const content = bullet[1];
    const boldMatch = content.match(/\*\*(.+?)\*\*/);
    if (!boldMatch) continue;
    let label = boldMatch[1].replace(/\s*\/\s*/g, ' / ').trim();
    // hint = remainder after the first bold label
    let rest = content.replace(/\*\*(.+?)\*\*/, '').replace(/^[\s—:-]+/, '').trim();
    rest = rest.replace(/\*\*/g, '').replace(/^\((.*)\)$/, '$1').trim();
    const optional = /optional/i.test(content);
    const long = /notes|description|summary|data|what happened|details|paste|context/i.test(
      label + ' ' + rest
    );
    inputs.push({ label, hint: rest, optional, long });
  }
  return inputs;
}

// First sentence of the description, trimmed — used as the tile one-liner.
function summarize(desc) {
  if (!desc) return '';
  let first = desc.split(/(?<=\.)\s+/)[0].trim();
  // If the first sentence is just a trigger ("Use when…"), fall back to the whole thing.
  if (/^use\b/i.test(first) && desc.length > first.length) first = desc;
  first = first.replace(/\s+/g, ' ').trim();
  if (first.length > 150) first = first.slice(0, 147).replace(/[\s,;:]+\S*$/, '') + '…';
  return first;
}

function titleFromName(name) {
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Freshness: one git pass → skill name → last commit date (live-repo signal).
import { execSync } from 'node:child_process';
const updatedMap = {};
try {
  const log = execSync('git log --pretty=format:"%as" --name-only -- skills/*/SKILL.md', { cwd: join(__dirname, '..'), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  let cur = null;
  for (const line of log.split('\n')) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(line)) cur = line;
    else if (line.startsWith('skills/')) { const n = line.split('/')[1]; if (n && !updatedMap[n]) updatedMap[n] = cur; }
  }
} catch { /* shallow clone etc. — field just stays absent */ }

const skills = [];
for (const name of readdirSync(skillsDir)) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const text = readFileSync(file, 'utf8');
  const { meta, body } = parseFrontmatter(text);
  const titleHeading = body.match(/^#\s+(.+)$/m);
  skills.push({
    name: meta.name || name,
    title: (titleHeading ? titleHeading[1] : titleFromName(meta.name || name)).replace(/\s+Skill$/i, ''),
    description: meta.description || '',
    summary: summarize(meta.description || ''),
    plugin: skillToPlugin[name] || 'other',
    tier: tierFor(name),
    updated: updatedMap[name] || null,
    eval: evalScores[meta.name || name] || null,
    source: SOURCES[meta.name || name] || null,
    inputs: parseInputs(body),
    instructions: body.trim(),
  });
}

skills.sort((a, b) => a.title.localeCompare(b.title));

// --- Skill interconnection graph (deterministic) ---------------------------
// Surface "Related skills" + a per-bundle "reads-first" foundational skill, so the
// catalog reads as a connected system, not a flat list. Pure function of the source,
// so CI's git-diff check stays stable.
const STOP = new Set(('use when asked produces produce structured complete skill skills used into with that this your from each will the and for any output create build write draft make help ready given them they then over you our are using based first start about more also need needs want a an of to in on or by it is be as at any one two its their what which who how get got run plus across same not no its').split(/\s+/));
const termsOf = (s) => {
  const set = new Set();
  for (const w of (s.title + ' ' + s.description).toLowerCase().split(/[^a-z0-9]+/)) {
    if (w.length > 3 && !STOP.has(w)) set.add(w);
  }
  return set;
};
const termMap = new Map(skills.map((s) => [s.name, termsOf(s)]));
for (const s of skills) {
  const mine = termMap.get(s.name);
  const scored = [];
  for (const o of skills) {
    if (o.name === s.name) continue;
    let shared = 0;
    const ot = termMap.get(o.name);
    for (const t of mine) if (ot.has(t)) shared++;
    const score = shared + (o.plugin === s.plugin ? 2 : 0);
    if (score >= 2) scored.push([o.name, score]);
  }
  scored.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  s.related = scored.slice(0, 4).map((x) => x[0]);
}
// Curated foundational ("reads-first") anchor per bundle, validated against the set;
// falls back to the bundle's first production-tier skill if the curated one is absent.
const NAMES = new Set(skills.map((s) => s.name));
const FOUNDATION = {
  'pm-essentials': 'prd-template', 'pm-discovery': 'user-research-synthesis',
  'pm-planning': 'feature-prioritisation', 'pm-delivery': 'sprint-planning',
  'pm-strategy': 'strategic-narrative-generator', 'pm-analytics': 'metrics-framework',
  'pm-data': 'metric-tree-builder', 'pm-cs': 'cs-health-scorecard',
  'pm-people': 'performance-review', 'pm-design': 'design-critique',
  'pm-business': 'board-deck-narrative', 'pm-legal': 'contract-review',
  'pm-finance': 'financial-model-narrative', 'pm-founders': 'startup-idea-validator',
  'pm-education': 'lesson-plan', 'pm-hr': 'job-description-writer',
  'pm-sales': 'sales-battlecard', 'pm-operations': 'sop-writer',
  'pm-research': 'literature-review', 'pm-cross': 'meeting-notes',
  'pm-figma': 'figma-design-review', 'pm-social': 'social-media-strategy',
  'pm-writers': 'aeo-optimizer', 'pm-gtm': 'go-to-market',
  'pm-engineering': 'code-review-checklist',
};
const byPlugin = {};
for (const s of skills) (byPlugin[s.plugin] ||= []).push(s);
for (const s of skills) {
  let anchor = FOUNDATION[s.plugin];
  if (!anchor || !NAMES.has(anchor)) {
    anchor = (byPlugin[s.plugin] || []).filter((x) => x.tier === 'production').map((x) => x.name).sort()[0] || null;
  }
  s.readsFirst = anchor && anchor !== s.name ? anchor : null;
}

// No wall-clock timestamp: the output must be deterministic so CI can verify it
// is in sync with the source skills (a timestamp would make every build differ).
const out = { count: skills.length, skills };
writeFileSync(join(__dirname, 'skills.json'), JSON.stringify(out));
const tierCounts = skills.reduce((a, s) => ((a[s.tier] = (a[s.tier] || 0) + 1), a), {});
console.log(
  `Wrote web/skills.json — ${skills.length} skills, ${new Set(skills.map((s) => s.plugin)).size} bundles ` +
  `(production: ${tierCounts.production || 0}, stable: ${tierCounts.stable || 0}, experimental: ${tierCounts.experimental || 0}).`
);
