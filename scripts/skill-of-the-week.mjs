#!/usr/bin/env node
// Picks a "skill of the week" deterministically (rotates through the
// production-tier skills by ISO week), composes ready-to-post copy for X and
// LinkedIn, and:
//   - writes web/skill-of-the-week.json (for the site / README to display)
//   - appends the posts to the GitHub Actions job summary
//   - if POST_WEBHOOK_URL is set, POSTs { text, network } so you can wire it to
//     Zapier / Make / Buffer / a Slack webhook to auto-publish.
//
// Run locally:  node scripts/skill-of-the-week.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';
const PLAY = 'https://mohitagw15856.github.io/pm-claude-skills';

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) { let v = kv[2].trim(); if (/^["'].*["']$/.test(v)) v = v.slice(1, -1); meta[kv[1]] = v; }
  }
  const body = m ? m[2] : text;
  const title = (body.match(/^#\s+(.+)$/m)?.[1] || '').replace(/\s+Skill$/i, '');
  return { meta, title };
}

function firstSentence(desc) {
  let s = (desc || '').split(/(?<=\.)\s+/)[0].trim();
  if (/^use\b/i.test(s)) s = (desc || '').replace(/\s+/g, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

// Pool = production-tier skills (the most impressive to feature).
const tiers = existsSync(join(root, 'skill-tiers.json'))
  ? JSON.parse(readFileSync(join(root, 'skill-tiers.json'), 'utf8'))
  : { productionReady: [] };
let pool = (tiers.productionReady || []).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')));
if (!pool.length) pool = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')));
pool.sort();

// Deterministic weekly rotation.
const weeks = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
const name = pool[weeks % pool.length];
const { meta, title } = parseFrontmatter(readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8'));
const summary = firstSentence(meta.description);
const link = `${PLAY}/index.html?skill=${name}`;

const xPost =
  `🛠️ Skill of the week: ${title}\n\n${summary}\n\n` +
  `Run it free in your browser (no install) 👇\n${link}\n\n#ClaudeAI #AItools #ProductManagement`;

const liPost =
  `🛠️ Skill of the week: ${title}\n\n${summary}\n\n` +
  `It's one of 174 open-source AI skills that make Claude, ChatGPT, and Gemini produce real professional work. ` +
  `Try this one free in the browser — no install:\n${link}\n\n⭐ ${REPO}`;

const out = { week: weeks, skill: name, title, summary, link, generatedAt: new Date().toISOString(), posts: { x: xPost, linkedin: liPost } };
writeFileSync(join(root, 'web', 'skill-of-the-week.json'), JSON.stringify(out, null, 2) + '\n');

console.log(`Skill of the week (#${weeks}): ${title} (${name})\n`);
console.log('--- X ---\n' + xPost + '\n\n--- LinkedIn ---\n' + liPost);

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## 🛠️ Skill of the week: ${title}\n\n${summary}\n\n[Run it](${link})\n\n` +
    `### X / Twitter\n\`\`\`\n${xPost}\n\`\`\`\n\n### LinkedIn\n\`\`\`\n${liPost}\n\`\`\`\n`);
}

// Optional auto-publish hook (Zapier / Make / Buffer / Slack incoming webhook).
const webhook = process.env.POST_WEBHOOK_URL;
if (webhook) {
  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: xPost, linkedin: liPost, skill: name, link }),
    });
    console.log(`\nPosted to webhook: HTTP ${res.status}`);
  } catch (e) {
    console.error('Webhook post failed:', e.message);
    process.exitCode = 1;
  }
}
