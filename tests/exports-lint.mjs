#!/usr/bin/env node
// Export-dialect lint — 6,000+ generated files across 12 platforms ship on
// every release, and a renderer bug would ship everywhere silently. This
// validates each platform's dialect on a sample of skills (first, last, and a
// middle skill alphabetically) plus platform-wide invariants. Pure Node.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let pass = 0, fail = 0;
const bad = (m) => { fail++; console.error('  ✗ ' + m); };
const ok = () => pass++;

const listSkillFiles = (dir, leaf) => {
  const out = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(join(d, e.name));
      else if (leaf.test(e.name)) out.push(join(d, e.name));
    }
  })(dir);
  return out.sort();
};
const sample = (files) => [files[0], files[Math.floor(files.length / 2)], files[files.length - 1]];

// Per-platform dialect rules: file pattern + content checks on samples.
const DIALECTS = {
  cursor:   { leaf: /\.mdc$/,  check: (t) => /^---\n/.test(t) && /alwaysApply|description/.test(t.slice(0, 400)) || 'missing .mdc frontmatter' },
  windsurf: { leaf: /\.md$/,   check: (t) => /^---\ntrigger: model_decision/.test(t) || 'missing windsurf trigger frontmatter' },
  chatgpt:  { leaf: /^SYSTEM_PROMPT\.md$/, check: (t) => !/^---\n/.test(t) || 'chatgpt export must not carry frontmatter' },
  gemini:   { leaf: /^GEM_INSTRUCTIONS\.md$/, check: (t) => /^You are a specialised assistant\./.test(t) || 'missing gemini role primer' },
  copilot:  { leaf: /\.instructions\.md$/, check: (t) => /^---\napplyTo: "\*\*"/.test(t) || 'missing copilot applyTo frontmatter' },
  aider:    { leaf: /\.md$/,   check: (t) => !/^---\n/.test(t) || 'aider conventions must be plain body' },
  cline:    { leaf: /\.md$/,   check: (t) => t.trim().length > 200 || 'suspiciously empty rule' },
  continue: { leaf: /\.md$/,   check: (t) => t.trim().length > 200 || 'suspiciously empty rule' },
  zed:      { leaf: /\.md$/,   check: (t) => t.trim().length > 200 || 'suspiciously empty rule' },
  roo:      { leaf: /\.md$/,   check: (t) => t.trim().length > 200 || 'suspiciously empty rule' },
  kilocode: { leaf: /\.md$/,   check: (t) => t.trim().length > 200 || 'suspiciously empty rule' },
  obsidian: { leaf: /\.md$/,   check: (t) => /^---\naliases:/.test(t) && /\{\{selection\}\}/.test(t) || 'missing obsidian properties or selection hook' },
  openclaw: {
    leaf: /^SKILL\.md$/,
    check: (t) => {
      if (!/^---\nname: /.test(t)) return 'missing frontmatter name';
      if (!/homepage: https:\/\//.test(t)) return 'missing homepage';
      const m = t.match(/"openclaw": (\{[^\n]*\})/);
      if (!m) return 'missing metadata.openclaw block';
      try { JSON.parse(m[1]); } catch { return 'metadata.openclaw is not valid JSON'; }
      if (/Reads from \/ Writes to the Brain|## Deeper Materials/.test(t)) return 'library-local section leaked into standalone package';
      if (/\.\.\/professional-brain/.test(t)) return 'phantom sibling-skill reference';
      return true;
    },
  },
};

const skillCount = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md'))).length;
console.log(`Export lint — ${Object.keys(DIALECTS).length} dialects, expecting ${skillCount} skills each:`);

for (const [platform, d] of Object.entries(DIALECTS)) {
  const dir = join(root, 'exports', platform);
  if (!existsSync(dir)) { bad(`${platform}: exports dir missing`); continue; }
  const files = listSkillFiles(dir, d.leaf).filter((f) => !f.endsWith(`${platform}/README.md`));
  if (files.length !== skillCount) { bad(`${platform}: ${files.length} files ≠ ${skillCount} skills`); continue; }
  ok();
  let broken = 0;
  for (const f of sample(files)) {
    const r = d.check(readFileSync(f, 'utf8'));
    if (r !== true) { bad(`${platform}: ${f.replace(root + '/', '')} — ${r}`); broken++; }
  }
  if (!broken) ok();
}

// README indexes must state the current count (the PR-146 lesson).
for (const platform of Object.keys(DIALECTS)) {
  const rd = join(root, 'exports', platform, 'README.md');
  if (existsSync(rd) && !readFileSync(rd, 'utf8').includes(`${skillCount} skills exported`)) bad(`${platform}/README.md: stale skill count`);
  else ok();
}

console.log(`\n${pass} passed · ${fail} failed`);
process.exit(fail ? 1 : 0);
