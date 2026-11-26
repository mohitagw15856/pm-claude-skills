// Agent Arena: community SkillBench submissions (skillbench/community/*.json),
// validated and turned into ranked rows for web/modelbench.json. Used by
// scripts/build-modelbench.mjs and tests/checks/arena.mjs. The protocol is in
// docs/arena.md. Scores are recomputed from the per-task numbers, so a file
// whose headline does not match its own tasks is rejected, not ranked.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { modelFor } from '../../bin/lib/models.mjs';

// The judge is pinned in data/models.json (role "judge"), with the reason beside it.
export const PINNED_JUDGE = modelFor('judge');
const STEM_RE = /^[A-Za-z0-9._-]{1,100}$/;
const ACTIONS_RE = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/actions\/runs\/\d+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const isScore = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 1 && v <= 5;
const isHttps = (u) => { try { return new URL(u).protocol === 'https:'; } catch { return false; } };
const short = (s, n) => typeof s === 'string' && s.trim().length > 0 && s.length <= n;
const mean = (xs) => +(xs.reduce((a, b) => a + b, 0) / xs.length).toFixed(2);

// Returns a list of problems (empty when the submission is valid).
export function validateSubmission(sub, taskSet, { stem = 'submission', today = new Date().toISOString().slice(0, 10) } = {}) {
  const errs = [];
  const e = (m) => errs.push(`${stem}: ${m}`);
  if (!STEM_RE.test(stem)) e('file name may use only letters, digits, dot, dash and underscore');
  if (!sub || typeof sub !== 'object' || Array.isArray(sub)) { e('not a JSON object'); return errs; }
  if (!short(sub.submitted_via, 40)) e('submitted_via is required (skillbench-byo or local)');
  // Provenance: a public Actions run, or (for a local run) the saved outputs, so anyone can re-judge them.
  if (sub.run != null && !ACTIONS_RE.test(sub.run)) e('run must be a GitHub Actions run URL');
  if (sub.run == null && !isHttps(sub.outputs)) e('a local run needs outputs: an https link to the files written by --save-outputs');
  if (sub.agent != null && !short(sub.agent, 80)) e('agent, when given, is a label of at most 80 characters');
  if (!Array.isArray(sub.runs) || sub.runs.length !== 1) { e('runs must hold exactly one run (one PR = one model or agent)'); return errs; }
  const r = sub.runs[0] || {};
  const ids = (taskSet.tasks || []).map((t) => t.id);
  if (!short(r.model, 100)) e('runs[0].model is required');
  if (!DATE_RE.test(r.date || '') || r.date > today) e('runs[0].date must be YYYY-MM-DD and not in the future');
  if (r.taskSetVersion !== taskSet.version) e(`runs[0].taskSetVersion must be ${taskSet.version}, the current task set`);
  if (!short(r.judge, 200)) e('runs[0].judge is required');
  if (!Array.isArray(r.tasks)) { e('runs[0].tasks is missing'); return errs; }
  const got = r.tasks.map((t) => t && t.task);
  const missing = ids.filter((id) => !got.includes(id));
  if (missing.length) e(`missing tasks: ${missing.join(', ')}`);
  if (got.some((id) => !ids.includes(id)) || got.length !== new Set(got).size) e('tasks must list each task of the set exactly once');
  const bad = r.tasks.find((t) => !t || !isScore(t.bare) || !isScore(t.skilled));
  if (bad !== undefined) e(`task ${bad && bad.task}: bare and skilled must be scores from 1 to 5`);
  if (errs.length) return errs;
  const skilled = mean(r.tasks.map((t) => t.skilled)), bare = mean(r.tasks.map((t) => t.bare));
  if (!isScore(r.score) || Math.abs(r.score - skilled) > 0.011) e(`score ${r.score} does not match the mean skilled task score ${skilled}`);
  if (!isScore(r.bare) || Math.abs(r.bare - bare) > 0.011) e(`bare ${r.bare} does not match the mean bare task score ${bare}`);
  if (typeof r.lift !== 'number' || Math.abs(r.lift - (skilled - bare)) > 0.021) e('lift must equal score minus bare');
  return errs;
}

export function arenaRow(sub, stem) {
  const r = sub.runs[0];
  return {
    id: stem,
    model: r.model,
    agent: sub.agent || null,
    score: r.score, bare: r.bare, lift: r.lift,
    judge: r.judge,
    pinnedJudge: r.judge === PINNED_JUDGE,
    date: r.date,
    taskSetVersion: r.taskSetVersion,
    provenance: sub.run ? 'actions' : 'local',
    link: sub.run || sub.outputs,
  };
}

// Reads every submission in dir. Valid ones become rows, best score first.
export function loadArena(dir, taskSet, opts = {}) {
  const rows = [], errors = [];
  if (!existsSync(dir)) return { rows, errors };
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
    const stem = f.slice(0, -5);
    let sub;
    try { sub = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch (err) { errors.push(`${stem}: not valid JSON (${err.message})`); continue; }
    const errs = validateSubmission(sub, taskSet, { ...opts, stem });
    if (errs.length) errors.push(...errs); else rows.push(arenaRow(sub, stem));
  }
  rows.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return { rows, errors };
}
