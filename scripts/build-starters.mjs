#!/usr/bin/env node
// Starter templates: one ready-to-clone project per persona (web/personas.json)
// with the team config, a CI check and the agent instructions already in place.
// "Use this template" on GitHub is the lowest-friction way into the library, so
// each folder under starters/ is also published as a template repository by
// scripts/publish-starters.sh (owner step; needs gh).
//
//   node scripts/build-starters.mjs           # (re)write starters/<persona>/
//   node scripts/build-starters.mjs --check   # fail if a starter is stale
//
// The lockfile is deliberately not generated here: a team runs
// `npx pm-claude-skills lock` once after its first sync, so the pins are theirs
// and never stale on day one. The CI workflow checks the lock only once it exists.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const { personas } = JSON.parse(readFileSync(join(root, 'web', 'personas.json'), 'utf8'));
const { workflows } = JSON.parse(readFileSync(join(root, 'workflows.json'), 'utf8'));
const OUT = join(root, 'starters');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const major = pkg.version.split('.')[0];

const skillDesc = (name) => {
  const p = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(p)) throw new Error(`persona skill ${name} does not exist`);
  return ((readFileSync(p, 'utf8').match(/^description:\s*"?([^"\n]+)/m) || [])[1] || '').split(/\. /)[0].replace(/\.$/, '');
};

function files(p) {
  const recipe = p.recipe ? workflows.find((w) => w.id === p.recipe) : null;
  const config = {
    $schema: `${SITE}/schemas/pm-skills.schema.json`,
    version: `${major}.x`,
    agents: ['claude', 'cursor'],
    bundles: ['pm-essentials'],
    skills: p.skills,
    lite: false,
  };
  const readme = `# ${p.name} starter (PM Skills)

${p.useWhen} This repository is a ready-made workspace: the skills a ${p.name.toLowerCase()} reaches for first, installed the same way on every laptop, checked in CI.

## Start

\`\`\`bash
npx pm-claude-skills sync          # installs the set in .pm-skills.json for Claude Code and Cursor
npx pm-claude-skills lock          # pins the exact skill contents; commit pm-skills.lock
npx pm-claude-skills doctor        # confirms what is installed and what is stale
\`\`\`

Then open the project in your agent and describe the task; the skill is picked by its description.

## What is in the loadout

| Skill | Does |
|---|---|
${p.skills.map((s) => `| [\`${s}\`](${SITE}/skill/${s}.html) | ${skillDesc(s)} |`).join('\n')}

Plus the \`pm-essentials\` bundle (meeting notes, stakeholder updates, research synthesis and the PRD template).
${recipe ? `\n**End-to-end recipe:** \`/${recipe.id}\` runs ${recipe.steps.map((s) => s.skill).join(' > ')} as one chain (\`npx pm-claude-skills chain ${recipe.id} --input notes.md\`).\n` : ''}${p.subagent ? `**Subagent:** \`${p.subagent}\` is installed with the Claude Code set; delegate to it from any session.\n` : ''}
## Change the set

Edit \`.pm-skills.json\` (bundles, skills, agents), run \`npx pm-claude-skills sync\`, then \`npx pm-claude-skills lock\` and commit both files. CI runs \`sync --check\` and \`lock --check\` on every pull request, so the team never drifts.

Browse the whole library: ${SITE}/ · Source: ${REPO}
`;
  const workflow = `name: PM Skills check

# The team's skill set stays identical on every laptop: this fails a pull request
# when .pm-skills.json no longer installs cleanly, or when pm-skills.lock (once
# the team has generated it) no longer matches the library.
on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: '24'
      - name: Install the team set
        run: npx -y pm-claude-skills sync
      - name: The set still installs as configured
        run: npx -y pm-claude-skills sync --check
      - name: The lockfile still matches (once the team has one)
        if: \${{ hashFiles('pm-skills.lock') != '' }}
        run: npx -y pm-claude-skills lock --check
`;
  const claudeMd = `# Working in this repository

- Professional artefacts (PRDs, updates, postmortems, plans) use the PM Skills library installed in \`.claude/skills\`; prefer a skill over improvising structure. Find one with \`npx pm-claude-skills find "<task>"\`.
- The team set is \`.pm-skills.json\`; \`pm-skills.lock\` pins it. Change the set by editing the config, then \`npx pm-claude-skills sync && npx pm-claude-skills lock\`.
- Shared memory for every skill: \`npx pm-claude-skills memory show\` (one file, read first).
${p.subagent ? `- Delegate end-to-end ${p.name.toLowerCase()} work to the \`${p.subagent}\` subagent.\n` : ''}`;
  const gitignore = `# PM Skills installs are reproducible from .pm-skills.json; install folders are not committed.
.claude/skills/
.cursor/rules/
node_modules/
`;
  return {
    'README.md': readme,
    '.pm-skills.json': JSON.stringify(config, null, 2) + '\n',
    '.github/workflows/pm-skills-check.yml': workflow,
    'CLAUDE.md': claudeMd,
    '.gitignore': gitignore,
  };
}

const index = `# Starter templates

One ready-to-clone project per persona: the team config (\`.pm-skills.json\`), a CI check that keeps every laptop on the same skills, agent instructions (\`CLAUDE.md\`) and a README that explains the loadout. Generated from [\`web/personas.json\`](../web/personas.json) by \`scripts/build-starters.mjs\`; do not edit by hand.

| Starter | For | Loadout |
|---|---|---|
${personas.map((p) => `| [\`${p.id}\`](${p.id}/) | ${p.useWhen} | ${p.skills.length} skills + pm-essentials |`).join('\n')}

**Use one:** copy the folder into a new repository, or, once published, click "Use this template" on \`pm-skills-starter-${personas[0].id}\` and friends. Then \`npx pm-claude-skills sync\`.

**Publish them as GitHub template repositories (owner step, needs \`gh\`):** \`scripts/publish-starters.sh\` creates or updates one \`pm-skills-starter-<persona>\` repository per folder and marks it as a template.
`;

let stale = 0, written = 0;
const planned = new Map([[join(OUT, 'README.md'), index]]);
for (const p of personas) for (const [rel, content] of Object.entries(files(p))) planned.set(join(OUT, p.id, rel), content);
for (const [path, content] of planned) {
  if (check) { if (!existsSync(path) || readFileSync(path, 'utf8') !== content) { console.error(`stale: ${path.replace(root + '/', '')}`); stale++; } continue; }
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content); written++;
}
// Orphans: a persona that was removed or renamed.
if (existsSync(OUT)) for (const d of readdirSync(OUT, { withFileTypes: true })) {
  if (d.isDirectory() && !personas.some((p) => p.id === d.name)) {
    if (check) { console.error(`orphan: starters/${d.name}`); stale++; } else { rmSync(join(OUT, d.name), { recursive: true }); console.log(`removed orphan starters/${d.name}`); }
  }
}
if (check) { if (stale) { console.error(`${stale} starter file(s) out of date. Run: node scripts/build-starters.mjs`); process.exit(1); } console.log(`Starters are up to date (${personas.length} personas).`); }
else console.log(`Wrote ${written} files for ${personas.length} starters under starters/.`);
