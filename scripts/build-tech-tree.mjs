#!/usr/bin/env node
// Builds site/tech-tree/data.json: the whole library as a research tree.
// Bundles are branches, skills are nodes. Node states:
//   researched   a shipped skill
//   in research  one of the three most-voted open requests
//   proposed     every other open request
// Requests come from site/tech-tree/votes.json (the voting board has no machine-readable
// votes). Seed or refresh it with:
//   node scripts/build-tech-tree.mjs --seed-votes      add open rows from SKILL_REQUEST.md
//   node scripts/build-tech-tree.mjs --refresh-votes   re-count 👍 on open skill-request issues
// No dependencies.
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'site', 'tech-tree');
const votesPath = join(outDir, 'votes.json');
const REPO = 'mohitagw15856/pm-claude-skills';
const has = (f) => process.argv.includes(`--${f}`);
const IN_RESEARCH = 3;

function frontmatter(path) {
  const text = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z_-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').replace(/\\"/g, '"');
  }
  return out;
}
// Em dashes in source descriptions become commas, to match the page's house style.
const trim = (raw, n) => { const s = raw.replace(/\s*\u2014\s*/g, ', '); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s; };

// ── Shipped skills, by bundle ────────────────────────────────────────────────
// The canonical list of live skills is skills/ (deprecated aliases excluded).
const live = new Map();
const zhDesc = (name) => {
  const f = join(root, 'skills-i18n', 'zh', name, 'SKILL.md');
  if (!existsSync(f)) return '';
  const d = (frontmatter(f).description || '').replace(/\s*\u2014\s*/g, '，');
  return d.length > 200 ? d.slice(0, 199) + '…' : d; // Chinese has few spaces, so cut by character
};
for (const name of readdirSync(join(root, 'skills')).sort()) {
  const file = join(root, 'skills', name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const fm = frontmatter(file);
  if (!fm.deprecated) live.set(name, fm);
}
const market = JSON.parse(readFileSync(join(root, '.claude-plugin', 'marketplace.json'), 'utf8'));
const shipped = new Set();
const branches = [];
for (const plugin of market.plugins) {
  const dir = join(root, 'plugins', plugin.name, 'skills');
  if (!existsSync(dir)) continue;
  const nodes = [];
  for (const name of readdirSync(dir).sort()) {
    const fm = live.get(name);
    if (!fm) continue; // a deprecated alias or a stray folder
    shipped.add(name);
    const zh = zhDesc(name);
    nodes.push({ id: name, name, description: trim(fm.description || '', 320), ...(zh ? { zh } : {}), state: 'researched' });
  }
  if (!nodes.length) continue;
  branches.push({
    id: plugin.name,
    name: plugin.name.replace(/^pm-/, '').replace(/-/g, ' '),
    description: trim(plugin.description || '', 300),
    install: `npx pm-claude-skills add --agent claude --bundle ${plugin.name}`,
    plugin: `/plugin install ${plugin.name}@${market.name}`,
    nodes,
  });
}
branches.sort((a, b) => a.name.localeCompare(b.name));
// Live skills that no bundle includes still belong on the tree.
const loose = [...live.keys()].filter((n) => !shipped.has(n));
if (loose.length) {
  for (const n of loose) shipped.add(n);
  branches.push({
    id: 'standalone', name: 'standalone skills',
    description: 'Skills not yet in a bundle. Install them with the full library.',
    install: 'npx pm-claude-skills add --agent claude',
    plugin: '',
    nodes: loose.map((name) => ({ id: name, name, description: trim(live.get(name).description || '', 320), ...(zhDesc(name) ? { zh: zhDesc(name) } : {}), state: 'researched' })),
  });
}

// ── Requests (votes.json) ────────────────────────────────────────────────────
let votes = existsSync(votesPath) ? JSON.parse(readFileSync(votesPath, 'utf8')) : { requests: [] };
const byName = new Map(votes.requests.map((r) => [r.name, r]));

if (has('seed-votes')) {
  const board = readFileSync(join(root, 'SKILL_REQUEST.md'), 'utf8');
  const open = board.split('## Requested Skills (Open)')[1]?.split('\n---')[0] || '';
  for (const row of open.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*([^|]+?)\s*\|/gm)) {
    if (!byName.has(row[1])) byName.set(row[1], { name: row[1], profession: row[2], votes: 0, issue: null });
  }
}
if (has('refresh-votes')) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/issues?labels=skill-request&state=open&per_page=100`,
    { headers: { accept: 'application/vnd.github+json', 'user-agent': 'pm-skills-tech-tree' } });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: try again later or set no flags to build from votes.json`);
  for (const issue of await res.json()) {
    const m = issue.title.match(/(?:^\[?skill\]?:?\s*|^request:\s*)`?([a-z0-9][a-z0-9-]+)`?/i);
    if (!m) continue;
    const name = m[1].toLowerCase();
    const prev = byName.get(name) || { name, profession: '', votes: 0, issue: null };
    byName.set(name, { ...prev, votes: issue.reactions?.['+1'] || 0, issue: issue.html_url });
  }
}
// Shipped requests leave the board.
const requests = [...byName.values()].filter((r) => !shipped.has(r.name));
if (has('seed-votes') || has('refresh-votes')) {
  votes = {
    _comment: 'Open skill requests and their votes, read by scripts/build-tech-tree.mjs. Refresh with --refresh-votes (counts 👍 on open skill-request issues) or --seed-votes (adds open rows from SKILL_REQUEST.md). Shipped names are removed automatically.',
    updated: new Date().toISOString().slice(0, 10),
    requests,
  };
  mkdirSync(outDir, { recursive: true });
  writeFileSync(votesPath, JSON.stringify(votes, null, 2) + '\n');
}

// Stable sort: most votes first, ties keep the board's order.
const ranked = requests.map((r, i) => ({ ...r, i })).sort((a, b) => (b.votes - a.votes) || (a.i - b.i));
const queue = ranked.map((r, rank) => ({
  id: r.name, name: r.name,
  description: `Requested${r.profession ? ` for ${r.profession.trim()}` : ''}. ${r.votes} vote${r.votes === 1 ? '' : 's'}.${r.issue ? '' : ' Vote by opening or reacting to a skill-request issue.'}`,
  state: rank < IN_RESEARCH ? 'in-research' : 'proposed',
  votes: r.votes, issue: r.issue,
}));
if (queue.length) {
  branches.unshift({
    id: 'requested', name: 'research queue',
    description: 'Skills the community has asked for. The three with the most votes are in research; the rest are proposed.',
    install: `https://github.com/${REPO}/issues/new?labels=skill-request&title=Skill:%20`,
    plugin: '', nodes: queue, queue: true,
  });
}

const data = {
  _comment: 'Generated by scripts/build-tech-tree.mjs from .claude-plugin/marketplace.json, plugins/ and site/tech-tree/votes.json. Do not edit by hand.',
  generated: new Date().toISOString(),
  repo: `https://github.com/${REPO}`,
  counts: {
    branches: branches.filter((b) => !b.queue).length,
    researched: shipped.size, // unique skills; a few appear in more than one bundle
    inResearch: queue.filter((x) => x.state === 'in-research').length,
    proposed: queue.filter((x) => x.state === 'proposed').length,
  },
  branches,
};
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'data.json'), JSON.stringify(data) + '\n');
console.log(`Wrote site/tech-tree/data.json: ${data.counts.branches} branches, ${data.counts.researched} researched, ${data.counts.inResearch} in research, ${data.counts.proposed} proposed.`);
