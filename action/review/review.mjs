#!/usr/bin/env node
// PM Skills Document Reviewer — the action behind "a senior reviewer on every
// PR". Detects changed professional documents, matches each to a skill by
// filename/content signals, reviews the file against that skill's own rubric
// and anti-patterns on the repo owner's key, and posts ONE combined comment.
// Design rules: never fail the build (a review is advice), never review code,
// skip silently when nothing matches, and always disclose the model + skill.
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const { ANTHROPIC_API_KEY, GH_TOKEN, MODEL = 'claude-sonnet-4-6', MAX_FILES = '3', PR, REPO } = process.env;
if (!PR || !REPO) { console.log('Not a pull_request event — nothing to review.'); process.exit(0); }
if (!ANTHROPIC_API_KEY) { console.log('No api_key provided — skipping review.'); process.exit(0); }

const gh = (args, input) => execFileSync('gh', args, { encoding: 'utf8', input, env: { ...process.env, GH_TOKEN } });

// Filename/content → skill matching. Ordered; first hit wins.
const MATCHERS = [
  [/postmortem|post-mortem|incident/i, 'incident-postmortem'],
  [/\brfc[-_/]|adr[-_/]|decision[-_ ]record/i, 'architecture-decision-record'],
  [/\bprd\b|product[-_ ]req/i, 'prd-template'],
  [/runbook/i, 'runbook-writer'],
  [/changelog/i, 'changelog-generator'],
  [/readme/i, 'readme-writer'],
  [/launch[-_ ]?plan|go[-_ ]to[-_ ]market|gtm/i, 'go-to-market'],
  [/board[-_ ](update|pack|deck)/i, 'board-pre-read'],
  [/okr/i, 'okr-builder'],
];

const files = JSON.parse(gh(['api', `repos/${REPO}/pulls/${PR}/files?per_page=100`]));
const docs = files
  .filter((f) => /\.(md|markdown|rst|txt)$/i.test(f.filename) && f.status !== 'removed')
  .map((f) => ({ ...f, skill: (MATCHERS.find(([re]) => re.test(f.filename)) || [])[1] }))
  .filter((f) => f.skill)
  .slice(0, +MAX_FILES);

if (!docs.length) { console.log('No reviewable documents in this PR — done.'); process.exit(0); }

// Pull skill bodies from the published index (no checkout of this repo needed).
const { skills } = await (await fetch('https://mohitagw15856.github.io/pm-claude-skills/skills.json')).json();
const byName = new Map(skills.map((s) => [s.name, s]));

const sections = [];
for (const f of docs) {
  const skill = byName.get(f.skill);
  if (!skill) continue;
  const content = Buffer.from(JSON.parse(gh(['api', `repos/${REPO}/contents/${encodeURIComponent(f.filename)}?ref=${JSON.parse(gh(['api', `repos/${REPO}/pulls/${PR}`])).head.sha}`])).content, 'base64').toString('utf8').slice(0, 24000);
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: MODEL, max_tokens: 1200,
      system: `You review one document against a professional skill's standard. The skill:\n\n${skill.instructions}\n\nOutput EXACTLY this markdown: a one-line verdict (SHIP / SHIP WITH FIXES / NEEDS WORK + one clause why), then "**Top findings**" as 2-4 bullets (each: the issue + the concrete fix, citing the skill's quality checks/anti-patterns where relevant), then if the skill has a Scoring Rubric a "**Score**" line (n/40 with one-phrase-per-dimension). Be specific to THIS document; quote short fragments. No preamble, no praise padding.`,
      messages: [{ role: 'user', content: `File: ${f.filename}\n\n${content}` }],
    }),
  });
  const j = await res.json();
  if (j.content && j.content[0]) sections.push(`### 📄 \`${f.filename}\` · reviewed as **${f.skill}**\n\n${j.content[0].text}`);
}

if (!sections.length) { console.log('Reviews came back empty — not commenting.'); process.exit(0); }

const body = `## 🧠 PM Skills review\n\n${sections.join('\n\n---\n\n')}\n\n<sub>Reviewed by [pm-claude-skills](https://github.com/mohitagw15856/pm-claude-skills) (${MODEL}, your key, your data — [how it works](https://github.com/mohitagw15856/pm-claude-skills/blob/main/action/review/README.md)). Advice, not a gate — this action never fails your build.</sub>`;

// Update our previous comment instead of stacking new ones.
const comments = JSON.parse(gh(['api', `repos/${REPO}/issues/${PR}/comments?per_page=100`]));
const mine = comments.find((c) => c.body && c.body.startsWith('## 🧠 PM Skills review'));
writeFileSync('/tmp/pm-review.md', body);
if (mine) gh(['api', `repos/${REPO}/issues/comments/${mine.id}`, '-X', 'PATCH', '-F', 'body=@/tmp/pm-review.md']);
else gh(['api', `repos/${REPO}/issues/${PR}/comments`, '-F', 'body=@/tmp/pm-review.md']);
console.log(`Posted review for ${sections.length} document(s).`);
