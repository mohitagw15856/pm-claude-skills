#!/usr/bin/env node
// The catalogue, generated so it cannot drift: every bundle and skill with its
// description, category and install commands, from the repo itself.
//
//   node scripts/build-catalogue.mjs           # write docs/catalogue.md + docs/catalogue.json
//                                              # and regenerate the README "What you can do" rows
//   node scripts/build-catalogue.mjs --check   # exit 1 if any of the three is stale
//
// The README table's prose (the job, what you get, what you bring) is curated
// in CURATED below, not invented from data; this script verifies every curated
// bundle still exists and owns the rows between the WHAT-YOU-CAN-DO markers.
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { both, esc, FONT } from './lib/readme-svg.mjs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const read = (p) => readFileSync(join(root, p), 'utf8');

// Curated rows for the README table; each bundle must exist in the marketplace.
const CURATED = [
  { job: 'Turn research into decisions', bundle: 'pm-discovery', icon: '🔎', get: 'Interview guides, job stories, synthesis with quotes and prevalence', bring: 'Transcripts or raw notes' },
  { job: 'Write the PRD and the updates', bundle: 'pm-essentials', icon: '📝', get: 'PRD, meeting notes, stakeholder updates, competitive analysis', bring: 'A feature brief; your goals' },
  { job: 'Plan the quarter', bundle: 'pm-planning', icon: '🗓', get: 'OKRs, RICE/MoSCoW/Kano prioritisation, roadmap narrative', bring: 'A backlog and a company goal' },
  { job: 'Ship the sprint and the launch', bundle: 'pm-delivery', icon: '🚀', get: 'Sprint plans, tech specs, A/B test plans, launch checklists', bring: 'Stories, capacity, dates' },
  { job: 'Read the numbers', bundle: 'pm-data', icon: '📈', get: 'Metrics frameworks, cohort and churn analysis, dashboard briefs', bring: 'Your metrics or a CSV' },
  { job: 'Watch the market', bundle: 'pm-strategy', icon: '🧭', get: 'Competitor teardowns, signal tracking, stakeholder influence maps', bring: 'Competitor names and sources' },
  { job: 'Launch and sell it', bundle: 'pm-gtm', icon: '📣', get: 'GTM plans, content calendars, email campaigns', bring: 'A product and an audience' },
  { job: 'Keep the customers', bundle: 'pm-cs', icon: '🤝', get: 'Health scorecards, QBR decks, churn analysis, renewal playbooks', bring: 'Account data, close notes' },
  { job: 'Make the hard call', bundle: 'pm-decisions', icon: '⚖️', get: 'Typed ship-or-slip, renew-or-churn, hire-or-pass calls with probabilities', bring: "The decision's real state" },
  { job: 'Escape the average answer', bundle: 'pm-thinking', icon: '🧠', get: 'Red-teaming, five clashing minds, decision panels', bring: 'A plan or question worth attacking' },
  { job: 'Read before you sign', bundle: 'pm-decoders', icon: '🔍', get: 'Leases, bills, benefits and contracts decoded with the money maths', bring: 'The document itself' },
  { job: 'Land the next job', bundle: 'pm-jobsearch', icon: '💼', get: 'JD decoding, outreach, interview prep, follow-up sequences', bring: 'The JD and your CV' },
  { job: '用中文工作', bundle: 'pm-china-work', icon: '🇨🇳', get: '周报、述职、复盘，中国职场的写法', bring: '你的工作记录' },
];

const descOf = (name) => {
  const fm = (read(`skills/${name}/SKILL.md`).match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  if (/^deprecated:/m.test(fm)) return null;
  const m = fm.match(/^description:\s*(["']?)([\s\S]*?)\1\s*(?=\n[a-z_-]+:|$)/m);
  const d = (m ? m[2] : '').replace(/\s+/g, ' ').trim();
  return d.split(/(?<=\.)\s/)[0];   // first sentence
};

const duetReady = (() => { try { return JSON.parse(read('data/duet-ready.json')).skills || {}; } catch { return {}; } })();
const marketplace = JSON.parse(read('.claude-plugin/marketplace.json')).plugins;
const bundles = marketplace.map((p) => {
  const dir = join(root, 'plugins', p.name, 'skills');
  const skills = existsSync(dir)
    ? readdirSync(dir).filter((n) => existsSync(join(dir, n, 'SKILL.md'))).sort()
        .map((n) => ({ name: n, description: existsSync(join(root, 'skills', n, 'SKILL.md')) ? descOf(n) : null, ...(duetReady[n] ? { duet_ready: duetReady[n].tier } : {}) }))
        .filter((s) => s.description !== null)
    : [];
  return {
    bundle: p.name, description: p.description || '', category: p.category || '',
    install: { claude_code: `/plugin install ${p.name}@pm-claude-skills`, any_tool: `npx pm-claude-skills add --bundle ${p.name}` },
    skills,
  };
}).sort((a, b) => a.bundle.localeCompare(b.bundle));

for (const row of CURATED) {
  if (!bundles.some((b) => b.bundle === row.bundle)) {
    console.error(`✗ README table names bundle "${row.bundle}" which is not in the marketplace. Fix CURATED in scripts/build-catalogue.mjs.`);
    process.exit(1);
  }
}

const totalSkills = new Set(bundles.flatMap((b) => b.skills.map((s) => s.name))).size;
const json = JSON.stringify({ generated_by: 'scripts/build-catalogue.mjs', bundles: bundles.length, skills: totalSkills, items: bundles }, null, 2) + '\n';

let md = `# Catalogue

<sub>Generated by \`scripts/build-catalogue.mjs\`; edit the script or the skills, not this file. ${bundles.length} bundles, ${totalSkills} live skills. Machine-readable: [catalogue.json](catalogue.json). Searchable: the [playground](https://mohitagw15856.github.io/pm-claude-skills/).</sub>

⚡ marks [Duet-ready](duet/README.md) skills (tiers in [data/duet-ready.json](../data/duet-ready.json)). Install any bundle in Claude Code with \`/plugin install <bundle>@pm-claude-skills\`, or in any supported tool with \`npx pm-claude-skills add --bundle <bundle>\`.

`;
for (const b of bundles) {
  md += `## ${b.bundle}\n\n${b.description}\n\n\`${b.install.any_tool}\`\n\n`;
  if (b.skills.length) {
    md += `| Skill | What it does |\n|---|---|\n`;
    for (const s of b.skills) md += `| [${s.name}](../skills/${s.name}/SKILL.md)${s.duet_ready ? ' ⚡' : ''} | ${s.description.replace(/\|/g, '\\|')} |\n`;
    md += '\n';
  }
}

const rows = CURATED.map((r) => `| ${r.job} | [${r.bundle}](plugins/${r.bundle}/) | ${r.get} | ${r.bring} |`).join('\n');
const block = `<!-- WHAT-YOU-CAN-DO:START -->\n| Your job this week | Bundle | What you get | What you bring |\n|---|---|---|---|\n${rows}\n<!-- WHAT-YOU-CAN-DO:END -->`;
const readme = read('README.md');
if (!readme.includes('<!-- WHAT-YOU-CAN-DO:START -->')) { console.error('✗ README.md is missing the WHAT-YOU-CAN-DO markers.'); process.exit(1); }
const newReadme = readme.replace(/<!-- WHAT-YOU-CAN-DO:START -->[\s\S]*?<!-- WHAT-YOU-CAN-DO:END -->/, block);

// The same curated bundles as a grid image above the table (docs/readme-assets/bundles*.svg).
function bundleGrid(c) {
  const W = 920, cols = 3, tw = 288, th = 92, gap = 14, top = 84;
  const rows = Math.ceil(CURATED.length / cols), H = top + rows * (th + gap) + 34;
  const accents = [c.blue, c.purple, c.green, c.amber, c.red];
  const o = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" ${FONT}>`,
    `<title>What you can do: a bundle for each job you have this week, from turning research into decisions to reading before you sign.</title>`,
    `<rect width="${W}" height="${H}" rx="16" fill="${c.bg}"/>`,
    `<text x="${W / 2}" y="40" text-anchor="middle" font-size="22" font-weight="700" fill="${c.text}">Pick the job you have this week</text>`,
    `<text x="${W / 2}" y="64" text-anchor="middle" font-size="13" fill="${c.muted}">Each one is a bundle of skills. Install one, or all ${bundles.length}.</text>`];
  CURATED.forEach((r, i) => {
    // Centre a short last row, so 13 bundles do not leave one tile stranded on the left.
    const row = Math.floor(i / cols), inRow = Math.min(cols, CURATED.length - row * cols);
    const offset = (W - (inRow * tw + (inRow - 1) * gap)) / 2;
    const x = offset + (i % cols) * (tw + gap), y = top + row * (th + gap), col = accents[i % accents.length];
    const n = (bundles.find((b) => b.bundle === r.bundle) || { skills: [] }).skills.length;
    o.push(`<rect x="${x}" y="${y}" width="${tw}" height="${th}" rx="12" fill="${c.panel}" stroke="${c.border}"/>`,
      `<rect x="${x}" y="${y}" width="5" height="${th}" rx="2" fill="${col}"/>`,
      `<text x="${x + 22}" y="${y + 38}" font-size="22">${r.icon || '•'}</text>`,
      `<text x="${x + 58}" y="${y + 36}" font-size="14.5" font-weight="700" fill="${c.text}">${esc(r.job)}</text>`,
      `<text x="${x + 58}" y="${y + 58}" font-size="11.5" font-family="ui-monospace,monospace" fill="${col}">${esc(r.bundle)}</text>`,
      `<text x="${x + 58}" y="${y + 77}" font-size="11.5" fill="${c.muted}">skills: ${n}</text>`);
  });
  o.push(`<text x="${W / 2}" y="${H - 14}" text-anchor="middle" font-size="12" fill="${c.muted}">npx pm-claude-skills add --bundle &lt;name&gt;  ·  every bundle: docs/catalogue.md</text>`, '</svg>');
  return o.join('\n');
}
const gridImages = both('bundles', bundleGrid);
const stale = [];
const same = (p, want) => { try { return read(p) === want; } catch { return false; } };
if (!same('docs/catalogue.md', md)) stale.push('docs/catalogue.md');
if (!same('docs/catalogue.json', json)) stale.push('docs/catalogue.json');
if (newReadme !== readme) stale.push('README.md (WHAT-YOU-CAN-DO rows)');
for (const [f, svg] of Object.entries(gridImages)) if (!same(f, svg)) stale.push(f);

if (CHECK) {
  if (stale.length) { console.error(`✗ Catalogue out of date: ${stale.join(', ')}. Run: node scripts/build-catalogue.mjs`); process.exit(1); }
  console.log(`Catalogue current: ${bundles.length} bundles, ${totalSkills} skills. ✓`);
} else {
  writeFileSync(join(root, 'docs', 'catalogue.md'), md);
  writeFileSync(join(root, 'docs', 'catalogue.json'), json);
  if (newReadme !== readme) writeFileSync(join(root, 'README.md'), newReadme);
  for (const [f, svg] of Object.entries(gridImages)) writeFileSync(join(root, f), svg);
  console.log(`Wrote docs/catalogue.md + docs/catalogue.json (${bundles.length} bundles, ${totalSkills} skills)${newReadme !== readme ? ' and refreshed the README rows' : ''}.`);
}
