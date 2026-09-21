// Gaps → requested-skills list (governance idea #17).
//
// Turns the gap-miner's output (data/skill-requests.json: the asks people
// actually make, ranked by demand) into a public, claimable list — so the
// library's own analytics become contributor magnets instead of a private
// file. Emits ROADMAP-REQUESTS.md: a demand-ranked table, which asks are
// already covered by an existing skill, and ready-to-paste issue bodies for
// the uncovered ones.
//
// NOTE: the curated strategic direction lives in ROADMAP.md (hand-written —
// never overwritten by this script). This file is the demand-driven companion.
//
// Usage:  node scripts/gaps-to-roadmap.mjs          # writes ROADMAP-REQUESTS.md
//         node scripts/gaps-to-roadmap.mjs --dry    # print, don't write

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'data', 'skill-requests.json');
const OUT = join(ROOT, 'ROADMAP-REQUESTS.md');

const STOP = new Set(['a','an','the','for','to','of','and','or','my','me','help','write','how','do','i','with','in','on','that','this','get','new','plan']);
const tokens = s => (s || '').toLowerCase().replace(/[^a-z0-9 -]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w));

// Index existing skills by name + description tokens so we can tell "already covered".
function loadSkillIndex() {
  const dir = join(ROOT, 'skills');
  const idx = [];
  for (const name of readdirSync(dir)) {
    const f = join(dir, name, 'SKILL.md');
    if (!existsSync(f)) continue;
    const head = readFileSync(f, 'utf8').slice(0, 1200);
    const desc = (head.match(/description:\s*"([^"]*)"/) || [,''])[1];
    idx.push({ name, toks: new Set([...tokens(name.replace(/-/g, ' ')), ...tokens(desc)]) });
  }
  return idx;
}

// A request is "covered" if some skill shares ≥2 meaningful tokens with the topic+ask.
export function coverage(req, idx) {
  const want = tokens(`${req.topic} ${req.ask}`);
  let best = null, bestN = 0;
  for (const s of idx) {
    const n = want.filter(w => s.toks.has(w)).length;
    if (n > bestN) { bestN = n; best = s.name; }
  }
  return bestN >= 2 ? { covered: true, by: best, score: bestN } : { covered: false, by: null, score: bestN };
}

export function buildRoadmap(requests, idx, when = new Date().toISOString().slice(0, 10)) {
  const rows = requests
    .map(r => ({ ...r, cov: coverage(r, idx) }))
    .sort((a, b) => (b.demand || 0) - (a.demand || 0));
  const open = rows.filter(r => !r.cov.covered);
  const done = rows.filter(r => r.cov.covered);

  let md = `# Requested skills — what people ask for, ranked by demand\n\n`;
  md += `Generated ${when} from the gap-miner (\`data/skill-requests.json\`). The library's *direction* is the hand-written [ROADMAP.md](ROADMAP.md); this is its demand-driven companion. **Open** rows are uncovered and claimable — pick one, open an issue titled \`Skill: <topic>\` (or comment on the existing one), and build it to the [standard](SKILL-AUTHORING-STANDARD.md). **Covered** rows already have a skill; improve it instead.\n\n`;
  md += `## Open — claim one (${open.length})\n\n| Demand | Topic | The ask | Nearest existing |\n|---:|---|---|---|\n`;
  for (const r of open) md += `| ${r.demand ?? '—'} | **${r.topic}** | ${r.ask} | ${r.cov.by ? '`' + r.cov.by + '` (weak)' : '—'} |\n`;
  md += `\n## Covered — improve, don't duplicate (${done.length})\n\n| Demand | Topic | Covered by |\n|---:|---|---|\n`;
  for (const r of done) md += `| ${r.demand ?? '—'} | ${r.topic} | \`${r.cov.by}\` |\n`;
  md += `\n## Ready-to-open issue bodies (open rows)\n\n`;
  for (const r of open.slice(0, 15)) {
    md += `<details><summary><b>${r.topic}</b> (demand ${r.demand ?? '—'})</summary>\n\n`;
    md += `**Skill request:** ${r.topic}\n\n**The ask, in a user's words:** "${r.ask}"\n\n**Demand signal:** ${r.demand ?? '—'} (gap-miner)\n\n**To build:** follow [SKILL-AUTHORING-STANDARD.md](SKILL-AUTHORING-STANDARD.md) — trigger-first description, framework, output format, quality checks, anti-patterns. Run \`node scripts/skillcheck.mjs\` before opening the PR.\n\n_Labels: good first skill · help wanted_\n\n</details>\n\n`;
  }
  md += `\n*Regenerate with \`node scripts/gaps-to-roadmap.mjs\` after each gap-miner run.*\n`;
  return { md, open: open.length, covered: done.length };
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) {
  const idx = [{ name: 'prd-template', toks: new Set(['prd','product','requirements','document','feature','write']) }];
  const c = coverage({ topic: 'PRD writing', ask: 'Help me write a product requirements document for a new feature' }, idx);
  const u = coverage({ topic: 'Zebra grooming', ask: 'How do I groom a zebra' }, idx);
  const ok = c.covered && c.by === 'prd-template' && !u.covered;
  console.log(`gaps-to-roadmap self-test: ${ok ? '3 passed · 0 failed' : 'FAILED'}`);
  process.exit(ok ? 0 : 1);
}
const data = JSON.parse(readFileSync(SRC, 'utf8'));
const requests = Array.isArray(data) ? data : (data.requests || []);
const { md, open, covered } = buildRoadmap(requests, loadSkillIndex());
if (argv.includes('--dry')) console.log(md);
else { writeFileSync(OUT, md); console.log(`Wrote ROADMAP-REQUESTS.md — ${open} open · ${covered} covered (from ${requests.length} requests).`); }
