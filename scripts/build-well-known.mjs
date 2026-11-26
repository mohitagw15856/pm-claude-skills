#!/usr/bin/env node
// /.well-known/agent-skills.json: one file an agent can fetch to learn which
// skills this site publishes, where each SKILL.md lives, and the SHA-256 it
// should have. The format is described in docs/spec/well-known-agent-skills.md
// and checked by scripts/check-well-known.mjs.
//
// Built from web/skills.json and skills/<name>/SKILL.md at deploy time and
// written to web/.well-known/agent-skills.json (gitignored). Deterministic: the
// same library gives the same bytes. Options: --out <file>.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const RAW = 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main';
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const i = process.argv.indexOf('--out');
const out = i > 0 ? resolve(process.argv[i + 1]) : join(root, 'web', '.well-known', 'agent-skills.json');

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const idx = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));
const skills = [];
for (const s of idx.skills || []) {
  if (s.deprecated || !NAME_RE.test(s.name || '')) continue;
  const file = join(root, 'skills', s.name, 'SKILL.md');
  if (!existsSync(file)) continue;
  skills.push({
    name: s.name,
    title: s.title || s.name,
    summary: s.summary || '',
    bundle: s.plugin || null,
    tier: s.tier || null,
    updated: s.updated || null,
    skill_md: `${RAW}/skills/${s.name}/SKILL.md`,
    sha256: createHash('sha256').update(readFileSync(file)).digest('hex'),
    zip: `${SITE}/skill-zip/${s.name}.zip`,
    page: `${SITE}/skill/${s.name}.html`,
  });
}
skills.sort((a, b) => a.name.localeCompare(b.name));
const doc = {
  spec: 'agent-skills-discovery/0.1',
  spec_url: `${REPO}/blob/main/docs/spec/well-known-agent-skills.md`,
  publisher: { name: 'PM Claude Skills', url: SITE, repo: REPO },
  version: pkg.version,
  license: 'MIT',
  format: 'SKILL.md (Agent Skills: YAML frontmatter with name and description, then Markdown)',
  install: {
    'claude-code': '/plugin marketplace add mohitagw15856/pm-claude-skills',
    npx: 'npx pm-claude-skills add --skills <name>',
    mcp: 'npx -y -p pm-claude-skills pm-claude-skills-mcp',
  },
  count: skills.length,
  skills,
};
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(doc, null, 2) + '\n');
console.log(`Wrote ${out.replace(root + '/', '')}: ${skills.length} skills.`);
