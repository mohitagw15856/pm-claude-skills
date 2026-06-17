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
    inputs: parseInputs(body),
    instructions: body.trim(),
  });
}

skills.sort((a, b) => a.title.localeCompare(b.title));
// No wall-clock timestamp: the output must be deterministic so CI can verify it
// is in sync with the source skills (a timestamp would make every build differ).
const out = { count: skills.length, skills };
writeFileSync(join(__dirname, 'skills.json'), JSON.stringify(out));
const tierCounts = skills.reduce((a, s) => ((a[s.tier] = (a[s.tier] || 0) + 1), a), {});
console.log(
  `Wrote web/skills.json — ${skills.length} skills, ${new Set(skills.map((s) => s.plugin)).size} bundles ` +
  `(production: ${tierCounts.production || 0}, stable: ${tierCounts.stable || 0}, experimental: ${tierCounts.experimental || 0}).`
);
