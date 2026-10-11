#!/usr/bin/env node
// Score a Skill Cup entry: a pull request that adds one skill on this month's
// theme (data/skill-cup.json). Run by the skill-cup workflow when a maintainer
// dispatches it with the PR number, or by hand:
//
//   ANTHROPIC_API_KEY=… GH_TOKEN=… node scripts/score-cup-entry.mjs --pr 412 [--dry-run]
//
// The PR's files are read through the GitHub API as data; nothing from the PR is
// executed. The entry must add skills/<name>/SKILL.md that passes SkillSpec L3 and
// add at least one eval case for it to evals/cases.json. Up to three of those
// cases are run with the skill (the generator model) and blind-judged on the
// SkillBench rubric (the pinned judge). Score = mean of the judged runs, 1-5.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { complete } from '../bin/lib/anthropic.mjs';
import { skillLanguage } from './lib/skill-language.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'skill-cup.json');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const pr = arg('pr');
const dryRun = process.argv.includes('--dry-run');
const GEN = 'claude-haiku-4-5-20251001';
const JUDGE = 'claude-sonnet-4-6';
if (!/^\d+$/.test(pr || '')) { console.error('Usage: node scripts/score-cup-entry.mjs --pr <number> [--dry-run]'); process.exit(1); }

const gh = (path) => JSON.parse(execFileSync('gh', ['api', path], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }));
const fail = (msg) => { console.error(`Not scored: ${msg}`); process.exit(2); };

const repo = process.env.GITHUB_REPOSITORY || 'mohitagw15856/pm-claude-skills';
const p = gh(`repos/${repo}/pulls/${pr}`);
const files = gh(`repos/${repo}/pulls/${pr}/files?per_page=100`);
const added = files.filter((f) => f.status === 'added' && /^skills\/[a-z0-9]+(?:-[a-z0-9]+)*\/SKILL\.md$/.test(f.filename));
if (added.length !== 1) fail(`a Cup entry adds exactly one skills/<name>/SKILL.md (this PR adds ${added.length}).`);
const name = added[0].filename.split('/')[1];
const headRepo = p.head.repo ? p.head.repo.full_name : repo;
const fileAt = (path) => Buffer.from(gh(`repos/${headRepo}/contents/${path}?ref=${p.head.sha}`).content, 'base64').toString('utf8');

const skillMd = fileAt(added[0].filename);
const cases = (JSON.parse(fileAt('evals/cases.json')).cases || []).filter((c) => c.skill === name && typeof c.input === 'string' && c.input.trim()).slice(0, 3);
if (!cases.length) fail(`add at least one eval case for "${name}" to evals/cases.json in the same PR.`);

// SkillSpec level with the published validator, on a temporary copy of the file.
const tmp = join(tmpdir(), `cup-${pr}-${process.pid}`);
mkdirSync(join(tmp, name), { recursive: true });
writeFileSync(join(tmp, name, 'SKILL.md'), skillMd);
let level = 0, errors = [];
try {
  const out = execFileSync(process.execPath, [join(root, 'skillspec', 'cli.mjs'), tmp, '--json'], { encoding: 'utf8' });
  const r = JSON.parse(out).results[0] || {};
  level = r.level || 0; errors = r.errors || [];
} catch (e) {
  try { const r = JSON.parse(e.stdout).results[0] || {}; level = r.level || 0; errors = r.errors || []; } catch { /* unparseable */ }
} finally { rmSync(tmp, { recursive: true, force: true }); }
if (level < 3 || errors.length) fail(`"${name}" must pass SkillSpec L3 with no errors (got L${level}${errors.length ? `; ${errors.slice(0, 3).join('; ')}` : ''}). Run: npx skillspec-check skills/${name}`);

// The cup this entry belongs to: the one open when the PR was opened.
const cup = JSON.parse(readFileSync(FILE, 'utf8'));
const opened = p.created_at.slice(0, 10);
const current = cup.cups.find((c) => c.opens <= opened && opened <= c.closes);
if (!current) fail(`the PR was opened on ${opened}, outside every Cup window.`);
if (current.winner) fail(`the ${current.month} Cup is already closed.`);

console.log(`Scoring #${pr} (${name}, by @${p.user.login}) for the ${current.month} Cup "${current.theme}": ${cases.length} case(s), generator ${GEN}, judge ${JUDGE}.`);
if (dryRun) process.exit(0);
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) fail('ANTHROPIC_API_KEY is not set.');

const RUBRIC = `You are a strict evaluator of professional work artifacts. Score the RESPONSE to the TASK on four dimensions, each 1-5:
- structure: would a senior professional recognise this artifact's shape?
- completeness: are the load-bearing sections present and specific (not padded)?
- usefulness: could the intended reader act on it without a rewrite?
- grounding: does it use the task's facts, label assumptions, avoid fabricated specifics?
The task and response may be in any language: judge them in that language, by the standard of a professional working in it.
Return STRICT JSON only: {"structure":n,"completeness":n,"usefulness":n,"grounding":n}`;
const body = skillMd.replace(/^---[\s\S]*?---\r?\n/, '');
const scores = [];
for (const c of cases) {
  const output = await complete({ apiKey, model: GEN, system: body, messages: [{ role: 'user', content: c.input }], maxTokens: 3000 });
  const raw = await complete({ apiKey, model: JUDGE, system: RUBRIC, messages: [{ role: 'user', content: `TASK:\n${c.input}\n\nRESPONSE:\n${output.slice(0, 14000)}` }], maxTokens: 300 });
  try {
    const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
    const dims = ['structure', 'completeness', 'usefulness', 'grounding'].map((d) => Math.max(1, Math.min(5, +j[d] || 1)));
    scores.push(dims.reduce((a, b) => a + b, 0) / 4);
  } catch { /* an unparseable judgement is dropped */ }
}
if (!scores.length) fail('the judge returned nothing usable; try again.');
const score = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) / 100;

current.entries = current.entries.filter((e) => e.pr !== Number(pr));
current.entries.push({ pr: Number(pr), author: p.user.login, skill: name, lang: skillLanguage(skillMd), score, cases: scores.length, scoredAt: new Date().toISOString().slice(0, 10), generator: GEN, judge: JUDGE });
current.entries.sort((a, b) => b.score - a.score || a.pr - b.pr);
writeFileSync(FILE, JSON.stringify(cup, null, 2) + '\n');
const rank = current.entries.findIndex((e) => e.pr === Number(pr)) + 1;
writeFileSync(join(root, '.cup-result'), `Scored **${score}/5** on ${scores.length} eval case(s) (generator \`${GEN}\`, judge \`${JUDGE}\`). Currently **#${rank} of ${current.entries.length}** in the ${current.month} Skill Cup, "${current.theme}". Leaderboard: https://mohitagw15856.github.io/pm-claude-skills/cup.html`);
console.log(`#${pr}: ${score}/5, rank ${rank} of ${current.entries.length}.`);
