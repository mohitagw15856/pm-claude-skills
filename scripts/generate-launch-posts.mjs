#!/usr/bin/env node
// Generates launch content from the repo's recent merged PRs.
//
// Reads the last ~10 merged PRs to main, asks Claude to pick out the genuinely
// new / groundbreaking features, and writes a ready-to-post launch draft —
// Hacker News, X thread, LinkedIn, Reddit, Product Hunt — PLUS a paste-ready
// "Medium article" prompt you can run in Claude to draft the full article.
// The workflow (.github/workflows/generate-launch-posts.yml) then opens a PR
// with the draft.
//
// Env (provided by the workflow):
//   ANTHROPIC_API_KEY  - required (skipped with a clear error if absent)
//   GITHUB_TOKEN       - to read PRs (optional for public repos, used if present)
//   GITHUB_REPOSITORY  - owner/repo (defaults to this repo)
//   PR_COUNT           - how many merged PRs to consider (default 10)
//   MODEL              - Claude model id (default: the "default" role in data/models.json)
//
// Usage:
//   node scripts/generate-launch-posts.mjs            # full run (needs API key)
//   node scripts/generate-launch-posts.mjs --dry-run  # fetch PRs + print the prompt only
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete } from '../bin/lib/anthropic.mjs';
import { modelFor } from '../bin/lib/models.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = process.env.GITHUB_REPOSITORY || 'mohitagw15856/pm-claude-skills';
const GH_TOKEN = process.env.GITHUB_TOKEN || '';
const API_KEY = process.env.ANTHROPIC_API_KEY;
const PR_COUNT = Math.max(1, Math.min(30, Number(process.env.PR_COUNT) || 10));
const MODEL = process.env.MODEL || modelFor('default');
const DRY_RUN = process.argv.includes('--dry-run');

// PRs that are automation noise, not feature news — filtered out.
const NOISE = /^(chore\(evals\)|chore: skill of the week|chore\(samples\))/i;
const BOT_AUTHORS = new Set(['github-actions[bot]', 'dependabot[bot]']);

async function fetchMergedPRs() {
  const url = `https://api.github.com/repos/${REPO}/pulls?state=closed&base=main&sort=updated&direction=desc&per_page=30`;
  const headers = { accept: 'application/vnd.github+json', 'user-agent': 'pm-skills-launch-gen' };
  if (GH_TOKEN) headers.authorization = `Bearer ${GH_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  const prs = await res.json();
  return prs
    .filter((p) => p.merged_at)
    .filter((p) => !BOT_AUTHORS.has(p.user?.login))
    .filter((p) => !NOISE.test(p.title || ''))
    .slice(0, PR_COUNT)
    .map((p) => ({
      number: p.number,
      title: p.title,
      mergedAt: p.merged_at,
      url: p.html_url,
      body: (p.body || '').replace(/\r/g, '').slice(0, 1800),
    }));
}

function buildDigest(prs) {
  return prs
    .map((p) => `### PR #${p.number} — ${p.title}\nMerged: ${p.mergedAt}\n${p.body || '(no description)'}`)
    .join('\n\n');
}

const SYSTEM = `You are the launch/marketing engineer for an open-source project, "PM Skills"
(https://github.com/mohitagw15856/pm-claude-skills) — a large MIT library of professional
"skill" files (SKILL.md) that make AI assistants produce real professional work (PRDs,
roadmaps, postmortems…), plus integrations and tooling around them.

You will be given the project's most recently MERGED pull requests. Your job:

1. Identify the genuinely NEW, groundbreaking, or noteworthy features across those PRs.
   Ignore routine chores, version bumps, and doc typo fixes. Group related PRs into a
   small number of coherent "launch stories" (usually 1–3).
2. For each launch story, write ready-to-POST copy in this voice: concrete, specific,
   honest, no breathless hype. Hacker News punishes marketing speak; LinkedIn hides
   outbound links in the body (put links in the first comment); X is a numbered thread.

Output GitHub-Flavored Markdown ONLY (no preamble), with this structure:

# Launch draft — <today's date>

> One-paragraph summary of what shipped and the launch stories you identified.

## Launch stories
For EACH story, a section:
### Story <N> — <short name>  (best channel: <HN | X | LinkedIn | Reddit | Product Hunt>)
- **Hacker News — Show HN**: a factual title line + a body (4–8 short paragraphs).
- **X / Twitter thread**: 4–6 numbered tweets.
- **LinkedIn**: a post, with a note to put the link in the first comment.
- **Reddit**: a title + body + which subreddits + a self-promo caution.
- **Product Hunt**: name, tagline, description, maker's first comment.
(Only include the channels that fit the story; HN + X + LinkedIn at minimum.)

## Medium article — generation prompt
A single, paste-ready prompt the user can give to Claude to write a FULL Medium article
about the most important launch story. The prompt must specify: target audience, the angle/
thesis, an outline (intro hook, the problem, what shipped and why it's different, how it
works with a concrete example, what's next, CTA), desired length (~1,200–1,800 words),
voice (first-person practitioner, specific, no hype), and instruct Claude to include real
links to the repo and the live playground. Put the prompt in a fenced code block.

Rules:
- Use REAL, current facts only from the PRs and the known links below. Do not invent metrics,
  dates, or features not supported by the PRs.
- Known links you may use: repo https://github.com/mohitagw15856/pm-claude-skills ·
  playground https://mohitagw15856.github.io/pm-claude-skills/ ·
  REST API https://pm-skills-mcp.pm-claude-skills.workers.dev/v1/skills
- Referral tracking: on every **playground** link (the github.io ones), append a
  \`?ref=<channel>\` query param matching where it's posted — \`?ref=hn\`, \`?ref=x\`,
  \`?ref=reddit\`, \`?ref=producthunt\`, \`?ref=linkedin\`. (GitHub repo links don't need it.)
- If a number isn't in the PRs, don't state it.`;

async function main() {
  const prs = await fetchMergedPRs();
  if (prs.length === 0) {
    console.error('No qualifying merged PRs found (after filtering automation noise).');
    process.exit(1);
  }
  console.error(`Considering ${prs.length} merged PR(s): ${prs.map((p) => '#' + p.number).join(', ')}`);

  const today = new Date().toISOString().slice(0, 10);
  const userMsg = `Today is ${today}. Here are the most recently merged PRs, newest first.\n\n${buildDigest(prs)}\n\nWrite the launch draft now.`;

  if (DRY_RUN) {
    console.log('--- SYSTEM ---\n' + SYSTEM + '\n\n--- USER ---\n' + userMsg);
    return;
  }
  if (!API_KEY) {
    console.error('::error::ANTHROPIC_API_KEY is not set.');
    process.exit(1);
  }

  const draft = await complete({ apiKey: API_KEY, model: MODEL, system: SYSTEM, messages: [{ role: 'user', content: userMsg }], maxTokens: 8192 });

  const header = `<!-- Generated by scripts/generate-launch-posts.mjs (${MODEL}) on ${today}\n` +
    `     from merged PRs: ${prs.map((p) => '#' + p.number).join(', ')}.\n` +
    `     Review and edit before posting — verify every number and link. -->\n\n`;
  const outDir = join(root, 'docs', 'launch-drafts');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `launch-posts-${today}.md`);
  writeFileSync(outPath, header + draft.trim() + '\n');
  console.error(`Wrote ${outPath} (${draft.length} chars).`);
}

main().catch((e) => { console.error('::error::' + e.message); process.exit(1); });
