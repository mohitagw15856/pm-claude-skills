#!/usr/bin/env node
// Small-model badge pipeline, offline: scripts/local-eval.mjs runs a skill against
// a stub OpenAI-compatible server (one "small" model writes, another judges),
// --record writes the score, and scripts/build-small-model-badges.mjs turns only
// independently judged runs into shields endpoint JSON. Also checks that the
// Anthropic judge refuses to run without ALLOW_API_SPEND=true.
import { spawn, execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SKILL = 'okr-builder';
const { cases } = JSON.parse(readFileSync(join(root, 'evals', 'cases.json'), 'utf8'));
assert.ok(cases.some((c) => c.skill === SKILL), `evals/cases.json has no ${SKILL} case`);

const seen = [];
const server = createServer((req, res) => {
  let body = '';
  req.on('data', (d) => { body += d; });
  req.on('end', () => {
    res.setHeader('content-type', 'application/json');
    if (req.url === '/v1/models') return res.end(JSON.stringify({ data: [{ id: 'tiny' }, { id: 'big' }] }));
    const j = JSON.parse(body || '{}');
    const user = j.messages.at(-1).content;
    seen.push({ model: j.model, judging: user.includes('strict evaluator'), sawTask: user.includes('--- TASK') });
    const content = user.includes('strict evaluator')
      ? '<think>hmm</think>{"structure":4,"completeness":4,"usefulness":3,"grounding":5}'
      : '# OKRs\n\nObjective: grow retention.\n- KR1: weekly actives from 1,000 to 1,400';
    res.end(JSON.stringify({ choices: [{ message: { content } }] }));
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const endpoint = `http://127.0.0.1:${server.address().port}/v1`;
const dir = mkdtempSync(join(tmpdir(), 'small-model-'));
const run = (args, env = {}) => new Promise((resolve) => {
  const p = spawn(process.execPath, [join(root, 'scripts', 'local-eval.mjs'), ...args], { env: { ...process.env, ALLOW_API_SPEND: '', ...env }, stdio: ['ignore', 'pipe', 'pipe'] });
  let out = '';
  p.stdout.on('data', (d) => { out += d; });
  p.stderr.on('data', (d) => { out += d; });
  p.on('close', (code) => resolve({ code, out }));
});

try {
  const data = join(dir, 'small-model.json');
  writeFileSync(data, JSON.stringify({ runs: [] }));
  const common = ['--endpoint', endpoint, '--model', 'tiny', '--skills', SKILL, '--out', join(dir, 'results.json'), '--data', data, '--record'];

  // An independent local judge: recorded and badged.
  let r = await run([...common, '--judge', 'local:big']);
  assert.equal(r.code, 0, r.out);
  assert.ok(seen.some((s) => s.model === 'tiny' && !s.judging), 'the small model wrote the artifact');
  assert.ok(seen.some((s) => s.model === 'big' && s.judging && s.sawTask), 'the judge model saw the task');
  let rows = JSON.parse(readFileSync(data, 'utf8')).runs;
  assert.equal(rows.length, 1);
  assert.deepEqual({ ...rows[0], date: 'x' }, { skill: SKILL, model: 'tiny', judge: 'local:big', selfJudged: false, judgeVersion: 2, score: 4, cases: rows[0].cases, date: 'x' });

  // A self-judged rerun of another model is recorded but never badged.
  r = await run([...common.map((a) => (a === 'tiny' ? 'big' : a))]);
  assert.equal(r.code, 0, r.out);
  rows = JSON.parse(readFileSync(data, 'utf8')).runs;
  assert.equal(rows.length, 2);
  assert.equal(rows.find((x) => x.model === 'big').selfJudged, true);

  const out = join(dir, 'badges');
  execFileSync(process.execPath, [join(root, 'scripts', 'build-small-model-badges.mjs'), '--data', data, '--out', out], { stdio: 'ignore' });
  const badge = JSON.parse(readFileSync(join(out, `${SKILL}.json`), 'utf8'));
  assert.deepEqual(badge, { schemaVersion: 1, label: 'small model', message: '4.0/5 tiny', color: 'brightgreen' });
  assert.equal(JSON.parse(readFileSync(join(out, 'index.json'), 'utf8')).skills.length, 1);

  // The repo's own data file is valid (empty until someone runs it for real).
  execFileSync(process.execPath, [join(root, 'scripts', 'build-small-model-badges.mjs'), '--check'], { stdio: 'ignore' });

  // Paid judge without permission: refused before any request.
  const before = seen.length;
  r = await run([...common, '--judge', 'anthropic:claude-sonnet-5'], { ANTHROPIC_API_KEY: 'x' });
  assert.notEqual(r.code, 0);
  assert.match(r.out, /ALLOW_API_SPEND/);
  assert.equal(seen.length, before);
  console.log('small-model: local run, independent judge, record and badge, spend gate ✓');
} finally {
  server.close();
  rmSync(dir, { recursive: true, force: true });
}
