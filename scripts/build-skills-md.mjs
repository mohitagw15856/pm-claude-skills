// Generates SKILLS.md — the full per-skill catalog — from web/skills.json, grouped by domain then
// bundle. Kept in sync by `npm run check` (which diffs it), so it can never drift again.
// Usage: node scripts/build-skills-md.mjs            (writes SKILLS.md)
//        node scripts/build-skills-md.mjs --check    (fails if SKILLS.md is out of date)
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));

// Same domain grouping as the playground landing (web/app.js DOMAINS), so docs and UI agree.
const DOMAINS = [
  { emoji: '🚀', label: 'Product', bundles: ['pm-essentials', 'pm-discovery', 'pm-planning', 'pm-delivery', 'pm-strategy', 'pm-advanced', 'pm-rituals'] },
  { emoji: '📣', label: 'Marketing & Growth', bundles: ['pm-gtm', 'pm-growth', 'pm-copy', 'pm-social', 'pm-creator', 'pm-pmm'] },
  { emoji: '💻', label: 'Engineering & AI', bundles: ['pm-engineering', 'pm-craft', 'pm-qa', 'pm-ai', 'pm-dataeng', 'pm-security'] },
  { emoji: '📊', label: 'Data & Analytics', bundles: ['pm-data', 'pm-analytics'] },
  { emoji: '🎨', label: 'Design & Content', bundles: ['pm-design', 'pm-figma', 'pm-uxwriting', 'pm-writers', 'pm-visuals'] },
  { emoji: '🤝', label: 'Customers & Sales', bundles: ['pm-cs', 'pm-support', 'pm-sales', 'pm-recruiting'] },
  { emoji: '💰', label: 'Finance, Ops & Business', bundles: ['pm-finance', 'pm-money', 'pm-calculators', 'pm-accounting', 'pm-operations', 'pm-business', 'pm-consulting', 'pm-founders'] },
  { emoji: '⚖️', label: 'Legal & Compliance', bundles: ['pm-legal', 'pm-compliance'] },
  { emoji: '🧑', label: 'You & Career', bundles: ['pm-personal', 'pm-career', 'pm-jobsearch', 'pm-comms', 'pm-people', 'pm-hr', 'pm-lifeadmin'] },
  { emoji: '🌍', label: 'Industries & Public Sector', bundles: ['pm-health', 'pm-research', 'pm-education', 'pm-nonprofit', 'pm-crisis', 'pm-localization', 'pm-realestate', 'pm-ecommerce', 'pm-documents', 'pm-devrel', 'pm-gov', 'pm-cross'] },
];

// Any bundle not explicitly mapped lands in the final domain, so nothing is ever dropped.
const mapped = new Set(DOMAINS.flatMap((d) => d.bundles));
const allBundles = [...new Set(skills.map((s) => s.plugin))];
for (const b of allBundles) if (!mapped.has(b)) DOMAINS[DOMAINS.length - 1].bundles.push(b);

const esc = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
const byName = (a, b) => a.name.localeCompare(b.name);
const evalBadge = (s) => (s.eval ? `✅ ${s.eval.score}/5` : '—');

let out = `# 🗂️ All ${skills.length} Skills — full catalog\n\n`;
out += `> The complete per-skill breakdown, grouped by domain. For an interactive, searchable version see the [**live catalog**](https://mohitagw15856.github.io/pm-claude-skills/catalog.html); to run any skill in your browser, use the [**Playground**](https://mohitagw15856.github.io/pm-claude-skills/). Back to the [README](README.md).\n>\n`;
out += `> _Auto-generated from \`web/skills.json\` by \`scripts/build-skills-md.mjs\` — do not edit by hand; run \`node scripts/build-skills-md.mjs\`._\n\n`;

// Contents
out += `**Jump to:** ${DOMAINS.map((d) => `[${d.emoji} ${d.label}](#${d.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')})`).join(' · ')}\n\n`;

for (const d of DOMAINS) {
  const bundles = [...new Set(d.bundles)].filter((b) => allBundles.includes(b));
  const domSkills = skills.filter((s) => bundles.includes(s.plugin));
  if (!domSkills.length) continue;
  out += `## ${d.emoji} ${d.label} (${domSkills.length} skills)\n\n`;
  for (const b of bundles.sort()) {
    const list = skills.filter((s) => s.plugin === b).sort(byName);
    if (!list.length) continue;
    const scored = list.filter((s) => s.eval).length;
    out += `### \`${b}\` — ${list.length} skill${list.length === 1 ? '' : 's'}${scored ? ` · ${scored} eval-scored` : ''}\n\n`;
    out += `| Skill | What it does | Eval |\n|---|---|---|\n`;
    for (const s of list) {
      out += `| **${esc(s.title)}** (\`${s.name}\`) | ${esc(s.summary || s.description)} | ${evalBadge(s)} |\n`;
    }
    out += `\n`;
  }
}

const scoredTotal = skills.filter((s) => s.eval).length;
out += `---\n\n_${skills.length} skills across ${allBundles.length} bundles · ${scoredTotal} eval-scored (${Math.round((scoredTotal / skills.length) * 100)}%). See the [leaderboard](https://mohitagw15856.github.io/pm-claude-skills/leaderboard.html)._\n`;

const path = join(root, 'SKILLS.md');
if (check) {
  const current = (() => { try { return readFileSync(path, 'utf8'); } catch { return ''; } })();
  if (current !== out) {
    console.error('SKILLS.md is out of date — run `node scripts/build-skills-md.mjs`.');
    process.exit(1);
  }
  console.log('SKILLS.md is up to date.');
} else {
  writeFileSync(path, out);
  console.log(`Wrote SKILLS.md — ${skills.length} skills across ${allBundles.length} bundles.`);
}
