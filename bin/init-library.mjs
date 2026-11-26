// `pm-claude-skills init-library` — library-in-a-box: scaffold YOUR OWN skills
// library with this ecosystem's infrastructure baked in: SkillSpec CI gate, the
// live badge, an example L3 skill, a skills.json build step, and a
// federation.json so the library is discoverable from day one.
//
//   pm-claude-skills init-library my-skills --name "Acme Skills" [--owner acme]
//
// Pure Node. The scaffold has zero dependence on this package at runtime —
// the CI uses npx skillspec-check; everything else is yours.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const arg = (argv, n, d) => { const i = argv.indexOf('--' + n); return i >= 0 && argv[i + 1] ? argv[i + 1] : d; };

export async function run(argv) {
  const dirArg = argv.find((a) => !a.startsWith('--') );
  if (!dirArg || argv.includes('--help')) {
    console.log(`init-library — scaffold your own conformant skills library (library-in-a-box)

  pm-claude-skills init-library my-skills --name "Acme Skills" --owner acme

Creates: skills/ with an example L3 skill · SkillSpec CI gate · badge README ·
scripts/build-index.mjs (skills.json) · federation.json (discoverable day one).`);
    return dirArg ? 0 : 2;
  }
  const dir = resolve(dirArg);
  if (existsSync(join(dir, 'skills'))) { console.error(`${dirArg}/skills already exists — refusing to overwrite.`); return 1; }
  const name = arg(argv, 'name', basename(dir));
  const owner = arg(argv, 'owner', 'YOUR-GITHUB-USER');
  const repo = `${owner}/${basename(dir)}`;

  mkdirSync(join(dir, 'skills', 'example-review'), { recursive: true });
  mkdirSync(join(dir, '.github', 'workflows'), { recursive: true });
  mkdirSync(join(dir, 'scripts'), { recursive: true });

  writeFileSync(join(dir, 'skills', 'example-review', 'SKILL.md'), `---
name: example-review
description: "Review any document against your team's bar. Use when asked to review this doc, check my draft, or give feedback before I send it. Produces a structured review with ranked findings and a ship/hold call."
---

# Example Review Skill

Replace this with your team's actual judgment — this scaffold passes SkillSpec L3 so your CI is green from commit one.

## What This Skill Produces
- A structured review: ranked findings, each with the fix
- A ship / hold call with the one blocking issue named

## Required Inputs
Ask for these if not provided:
- **The document** to review (paste it)
- **The audience** it's for
- **The bar** — what "good" means for this document type on your team

## Output Format
### Verdict: SHIP / HOLD — [one sentence why]
| # | Finding | Severity | The fix |
|---|---|---|---|

## Quality Checks
- [ ] Every finding carries a concrete fix, not just a complaint
- [ ] The verdict names the single blocking issue when holding

## Anti-Patterns
- [ ] Do not pad with praise — findings are the deliverable
- [ ] Do not hold for nitpicks — severity decides the verdict
`);

  writeFileSync(join(dir, '.github', 'workflows', 'skillcheck.yml'), `name: SkillCheck
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npx skillspec-check skills/ --min-level 1   # raise to 3 as you harden
      - run: node scripts/build-index.mjs --check
`);

  writeFileSync(join(dir, 'scripts', 'build-index.mjs'), `#!/usr/bin/env node
// Builds skills.json (the index federation crawlers and playgrounds consume).
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
const skills = [];
for (const n of readdirSync('skills')) {
  const f = 'skills/' + n + '/SKILL.md';
  if (!existsSync(f)) continue;
  const t = readFileSync(f, 'utf8');
  const d = (t.match(/^description:\\s*["']?(.+?)["']?$/m) || [])[1] || '';
  skills.push({ name: n, description: d });
}
const out = JSON.stringify({ count: skills.length, skills }, null, 2) + '\\n';
if (process.argv.includes('--check')) {
  if (existsSync('skills.json') && readFileSync('skills.json', 'utf8') === out) process.exit(0);
  console.error('skills.json is stale — run: node scripts/build-index.mjs'); process.exit(1);
}
writeFileSync('skills.json', out);
console.log('Wrote skills.json — ' + skills.length + ' skill(s)');
`);

  writeFileSync(join(dir, 'federation.json'), JSON.stringify({
    spec: 'skill-federation/0.1',
    name, repo: `https://github.com/${repo}`,
    skills_index: `https://raw.githubusercontent.com/${repo}/main/skills.json`,
    license: 'MIT',
    skillspec_badge: `https://img.shields.io/endpoint?url=${encodeURIComponent(`https://pm-skills-mcp.pm-claude-skills.workers.dev/badge?repo=${repo}`)}`,
  }, null, 2) + '\n');

  writeFileSync(join(dir, 'README.md'), `# ${name}

![SkillSpec](https://img.shields.io/endpoint?url=${encodeURIComponent(`https://pm-skills-mcp.pm-claude-skills.workers.dev/badge?repo=${repo}`)})

An [Agent Skills](https://github.com/mohitagw15856/skillspec) library. Every skill is a \`SKILL.md\` that works in Claude Code, Cursor, OpenClaw, Hermes, and anything else that reads the standard.

## Use it
\`\`\`bash
npx skills add ${repo}                 # or copy skills/<name>/ anywhere SKILL.md loads
\`\`\`

## Contribute
1. \`skills/<kebab-name>/SKILL.md\` — description with "Use when …" triggers, inputs, output format, quality checks, anti-patterns.
2. \`npx skillspec-check skills/\` must pass (CI gates on it).
3. \`node scripts/build-index.mjs\` before committing.

Scaffolded with [pm-claude-skills init-library](https://github.com/mohitagw15856/pm-claude-skills) · federated via [federation.json](federation.json) — list yours in the [federation index](https://mohitagw15856.github.io/pm-claude-skills/federation.html).
`);

  writeFileSync(join(dir, 'skills.json'), JSON.stringify({ count: 1, skills: [{ name: 'example-review', description: 'Review any document against your team\'s bar. Use when asked to review this doc, check my draft, or give feedback before I send it. Produces a structured review with ranked findings and a ship/hold call.' }] }, null, 2) + '\n');

  console.log(`🏗  ${name} scaffolded at ${dir}
  skills/example-review/   an L3 skill to replace with your first real one
  .github/workflows/       SkillSpec CI gate (green from commit one)
  federation.json          discoverable by the federation crawler
Next: git init && git add -A && git commit -m "skills library" && gh repo create ${repo} --public --source ${dirArg} --push
Then: PR your repo into the federation registry (federation/ in pm-claude-skills).`);
  return 0;
}
