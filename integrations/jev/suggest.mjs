#!/usr/bin/env node
// Hook helper: read a Claude Code UserPromptSubmit payload on stdin, route it,
// print one nudge line when the pick is confident. Always exits 0 and stays
// silent on any error — a hook must never block a prompt.
//   echo '{"prompt":"decode this lease"}' | node integrations/jev/suggest.mjs
//   PM_SKILLS_DIR=~/.claude/skills   # restrict to installed skills (default when it exists)
//   JEV_MIN_CONFIDENCE=0.6 JEV_MIN_PROBABILITY=0.7
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { routePrompt, keywordMock } from './route.mjs';
import { loadCatalog, installedOnly } from './catalog.mjs';

export function extractPrompt(payload) {
  try { const j = JSON.parse(payload); if (typeof j.prompt === 'string') return j.prompt; } catch {}
  const m = String(payload).match(/"prompt"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\n/g, ' ').replace(/\\"/g, '"') : String(payload);
}

export function nudge(r, { minConfidence = 0.6, minProbability = 0.7 } = {}) {
  if (!r || !r.skill) return '';
  if (r.method === 'keyword') return '';                       // the bash hook already covers this path
  if ((r.confidence ?? 0) < minConfidence || (r.probability ?? 0) < minProbability) return '';
  const tier = r.tier === 'high-stakes' ? ' (high-stakes: keep the not-advice boundary)' : '';
  const alt = r.alternatives?.length ? ` Alternatives: ${r.alternatives.slice(0, 2).join(', ')}.` : '';
  return `💡 A relevant PM Skill is installed: **${r.skill}**${tier} — confidence ${r.confidence.toFixed(2)}. If it fits this request, apply its framework.${alt}`;
}

export async function run(payload, { env = process.env, transport } = {}) {
  const prompt = extractPrompt(payload).slice(0, 600);
  if (!prompt.trim()) return '';
  let catalog = loadCatalog();
  const dir = env.PM_SKILLS_DIR || join(env.HOME || '', '.claude', 'skills');
  catalog = installedOnly(catalog, dir);
  const r = await routePrompt(prompt, { catalog, transport, env, thresholds: { minConfidence: +env.JEV_MIN_CONFIDENCE || 0.6, minProbability: +env.JEV_MIN_PROBABILITY || 0.7 } });
  return nudge(r, { minConfidence: +env.JEV_MIN_CONFIDENCE || 0.6, minProbability: +env.JEV_MIN_PROBABILITY || 0.7 });
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const catalog = loadCatalog();
  const out = await run('{"prompt":"write the PRD for our referral feature"}', { env: { PM_SKILLS_DIR: '/nonexistent', JEV_API_KEY: 'x' }, transport: keywordMock(catalog) });
  ok(/PM Skill is installed: \*\*[a-z-]*prd/.test(out), `nudges with a PRD skill: ${out.slice(0, 60)}`);
  ok(extractPrompt('{"prompt":"a \\"quoted\\" ask","cwd":"/x"}') === 'a "quoted" ask', 'extracts prompt from payload');
  ok(nudge({ skill: 'x', method: 'jev-two-stage', confidence: 0.3, probability: 0.9 }) === '', 'silent below confidence');
  ok(nudge({ skill: 'x', method: 'keyword' }) === '', 'silent on keyword fallback (bash hook covers it)');
  ok((await run('{"prompt":""}')) === '', 'empty prompt → silent');
  console.log(`jev suggest self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes('--selftest')) process.exit(await selftest());
  let payload = '';
  try {
    process.stdin.setEncoding('utf8');
    for await (const c of process.stdin) { payload += c; if (payload.length > 20000) break; }
    const timer = setTimeout(() => process.exit(0), +(process.env.JEV_HOOK_TIMEOUT_MS || 2500));
    const line = await run(payload);
    clearTimeout(timer);
    if (line) console.log(line);
  } catch {}
  process.exit(0);
}
