#!/usr/bin/env node
// The self-growing library. Mines a list of real-world professional requests
// (data/skill-requests.json — seedable from GitHub issues labelled
// "skill-request"), measures each against the existing catalog by lexical
// similarity, and surfaces the biggest GAPS — asks the library can't yet
// answer. For the top uncovered gap it scaffolds a ready-to-finish SKILL.md
// draft under proposals/, which the grow workflow opens as a PR for human
// review. Deterministic and zero-cost: no model calls, no network.
//
//   node scripts/mine-gaps.mjs            # write proposals/GAPS.md (+ scaffold top gap)
//   node scripts/mine-gaps.mjs --report   # report only, don't scaffold
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const reportOnly = process.argv.includes('--report');

const STOP = new Set('a an the and or for to of in on with your you our we it is are be as by from that this how do does make write create use using guide plan get set new skill professional work help when produces run into via per not no can into about into'.split(/\s+/));
const tok = (s) => (String(s || '').toLowerCase().match(/[a-z0-9]+/g) || []).filter((w) => w.length > 2 && !STOP.has(w));
const bag = (s) => new Set(tok(s));
function jaccard(a, b) { let inter = 0; for (const x of a) if (b.has(x)) inter++; const uni = a.size + b.size - inter; return uni ? inter / uni : 0; }

const skills = (JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills) || [];
const skillBags = skills.map((s) => ({ name: s.name, title: s.title, bag: bag([s.name, s.title, s.summary || s.description || '', (s.keywords || []).join(' ')].join(' ')) }));

const requests = JSON.parse(readFileSync(join(root, 'data', 'skill-requests.json'), 'utf8')).requests || [];

// Score each request against its nearest existing skill. Low nearest-similarity = a gap.
const GAP_THRESHOLD = 0.16; // below this, nothing in the catalog really covers it
const scored = requests.map((r) => {
  const rb = bag([r.topic, r.ask].join(' '));
  let best = { sim: 0, name: null, title: null };
  for (const s of skillBags) { const sim = jaccard(rb, s.bag); if (sim > best.sim) best = { sim, name: s.name, title: s.title }; }
  const demand = Math.max(1, +r.demand || 1);
  // Gap score rewards low coverage and high demand.
  const gapScore = (1 - best.sim) * Math.log2(demand + 1);
  return { ...r, nearest: best, covered: best.sim >= GAP_THRESHOLD, gapScore };
});
const gaps = scored.filter((r) => !r.covered).sort((a, b) => b.gapScore - a.gapScore);
const covered = scored.filter((r) => r.covered);

// --- Report -----------------------------------------------------------------
const date = new Date().toISOString().slice(0, 10);
const md = `# Library gaps — ${date}

The [self-growing pipeline](../scripts/mine-gaps.mjs) measured **${requests.length}** real-world requests against the **${skills.length}** skills in the catalog. It found **${gaps.length}** genuinely uncovered and **${covered.length}** already served.

_Method: lexical (Jaccard token overlap) against each skill's name, title, and description — honest but shallow, so treat this as a shortlist for human judgement, not a verdict._

## 🕳️ Biggest gaps (ranked)
${gaps.length ? gaps.map((g, i) => `${i + 1}. **${g.topic}** — _"${g.ask}"_ \`demand:${g.demand || 1}\` · nearest: ${g.nearest.name ? `\`${g.nearest.name}\` (${(g.nearest.sim * 100).toFixed(0)}%)` : 'none'}`).join('\n') : '_None — the catalog covers every tracked request._'}

## ✅ Already covered
${covered.length ? covered.map((c) => `- **${c.topic}** → \`${c.nearest.name}\` (${(c.nearest.sim * 100).toFixed(0)}%)`).join('\n') : '_—_'}

---
_Seed the request list from GitHub issues labelled \`skill-request\` (the grow workflow appends them), or edit [data/skill-requests.json](../data/skill-requests.json) directly._
`;

if (!existsSync(join(root, 'proposals'))) mkdirSync(join(root, 'proposals'), { recursive: true });
writeFileSync(join(root, 'proposals', 'GAPS.md'), md);
console.log(`Wrote proposals/GAPS.md — ${gaps.length} gap(s), ${covered.length} covered.`);

if (reportOnly || !gaps.length) process.exit(0);

// --- Scaffold the top uncovered gap that isn't already drafted/shipped ------
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const existingSkills = new Set(readdirSync(join(root, 'skills')));
const top = gaps.map((g) => ({ g, name: slug(g.slug || g.topic) })).find((x) => x.name && !existingSkills.has(x.name) && !existsSync(join(root, 'proposals', x.name)));

if (!top) { console.log('Top gaps already drafted or shipped — nothing new to scaffold.'); process.exit(0); }

const { g, name } = top;
const title = name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const desc = (g.description || `${g.ask} Use when a user asks about ${g.topic.toLowerCase()}. Produces a structured, professional deliverable.`).replace(/"/g, "'");
const draft = `---
name: ${name}
description: "${desc}"
---

# ${title} Skill

<!-- AUTO-DRAFTED by scripts/mine-gaps.mjs from a real request the catalog didn't cover.
     This is a scaffold for a human to complete — it does NOT yet meet the authoring
     standard. Requested topic: "${g.topic}" — ask: "${g.ask}". -->

One-line summary of the value this skill delivers. <!-- TODO: rewrite -->

## What This Skill Produces

- <!-- TODO: the concrete deliverable(s) -->

## Required Inputs

Ask for (if not already provided):
- <!-- TODO: the inputs to gather; never invent them -->

## Process

1. <!-- TODO: the steps the skill follows -->

## Output Format

<!-- TODO: a concrete template (headings/tables) of the final artifact -->

## Quality Checks

- [ ] <!-- TODO: a check the output must pass before hand-off -->

## Anti-Patterns

- [ ] Do not <!-- TODO: the mistake this skill prevents -->
`;
mkdirSync(join(root, 'proposals', name), { recursive: true });
writeFileSync(join(root, 'proposals', name, 'SKILL.md'), draft);
console.log(`Scaffolded proposals/${name}/SKILL.md (from gap "${g.topic}").`);
