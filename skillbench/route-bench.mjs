#!/usr/bin/env node
// Route-bench (decision-layer idea #17): how well does each router find the right skill?
// Ground truth = evals/cases.json (a curated input per skill). Methods:
//   keyword   — the shell hook's keyword overlap (offline, free)
//   jev-2s    — pack → skill, two typed Choice calls (needs JEV_API_KEY)
//   jev-flat  — chunked flat Choice over the whole catalogue (needs JEV_API_KEY)
//   worker    — POST /route on a deployed pm-skills worker (Workers AI binding; needs NO key at all)
// Reports top-1 / top-3 accuracy, median latency, calls per route → skillbench/reports/route-bench.md
//   node skillbench/route-bench.mjs [--limit 100] [--methods keyword,jev-2s] [--write]
//   node skillbench/route-bench.mjs --worker https://pm-skills-mcp.pm-claude-skills.workers.dev --write
//   node skillbench/route-bench.mjs --selftest
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routePrompt, keywordMock } from '../integrations/jev/route.mjs';
import { loadCatalog, keywordRank } from '../integrations/jev/catalog.mjs';
import { configured } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export function cases(limit = 0) {
  const all = JSON.parse(readFileSync(join(ROOT, 'evals', 'cases.json'), 'utf8')).cases.filter((c) => c.skill && c.input);
  return limit ? all.slice(0, limit) : all;
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };

export async function runMethod(method, list, catalog, { transport, worker, fetchFn = globalThis.fetch } = {}) {
  let top1 = 0, top3 = 0; const lat = []; let calls = 0; const misses = []; let served = null;
  for (const c of list) {
    const t0 = Date.now(); let got, alts = [];
    if (method === 'keyword') { const kr = keywordRank(c.input, catalog.skills, { topK: 3 }); got = kr[0]?.skill; alts = kr.slice(1).map((x) => x.skill); calls += 0; }
    else if (method === 'worker') {
      const res = await fetchFn(`${worker.replace(/\/$/, '')}/route`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ prompt: c.input }) });
      const r = res.ok ? await res.json() : {}; got = r.skill || null; alts = r.alternatives || []; calls += 2;
      if (!served && r.method) served = String(r.method).replace(/^jev-two-stage via /, '');
    }
    else { const r = await routePrompt(c.input, { catalog, transport, twoStage: method === 'jev-2s' }); got = r.skill; alts = r.alternatives || []; calls += (r.stages || []).length; }
    lat.push(Date.now() - t0);
    if (got === c.skill) { top1++; top3++; } else if (alts.includes(c.skill)) top3++; else misses.push({ want: c.skill, got });
  }
  const n = list.length || 1;
  return { method: served ? `worker · ${served}` : method, n: list.length, top1: +(top1 / n).toFixed(3), top3: +(top3 / n).toFixed(3), medianMs: median(lat), callsPerRoute: +(calls / n).toFixed(2), misses: misses.slice(0, 10) };
}
export function render(rows, note) {
  const L = ['# Route-bench — which router finds the right skill?', '', `Generated ${new Date().toISOString().slice(0, 10)} by \`skillbench/route-bench.mjs\`. Ground truth: \`evals/cases.json\` (one curated ask per skill). A route is **top-1** when the router's pick is the case's skill, **top-3** when it is among the pick and the two alternatives.`, '', '| Method | Cases | Top-1 | Top-3 | Median ms | Model calls / route |', '|---|---:|---:|---:|---:|---:|'];
  for (const r of rows) L.push(`| ${r.method} | ${r.n} | ${(r.top1 * 100).toFixed(1)}% | ${(r.top3 * 100).toFixed(1)}% | ${r.medianMs} | ${r.callsPerRoute} |`);
  L.push('', '## Sample misses', '');
  for (const r of rows) { L.push(`**${r.method}**`); for (const m of r.misses) L.push(`- wanted \`${m.want}\`, got \`${m.got || '(none)'}\``); L.push(''); }
  if (note) L.push(note, '');
  L.push('Cost basis for the model rows: published input price per million tokens × tokens per route (pack criteria ≈ 6k, skill criteria ≈ 4–25k). Latency is end-to-end from this machine. Re-run with `JEV_API_KEY` set to fill the model rows; the keyword row is the floor every router must beat.');
  return L.join('\n') + '\n';
}
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const list = cases(20); ok(list.length === 20, 'loads 20 cases');
  const catalog = loadCatalog();
  const k = await runMethod('keyword', list, catalog); ok(k.top1 >= 0 && k.top1 <= 1 && k.n === 20, `keyword baseline runs (top-1 ${k.top1})`);
  const j = await runMethod('jev-2s', list.slice(0, 5), catalog, { transport: keywordMock(catalog) }); ok(j.n === 5 && j.callsPerRoute >= 2, `mock jev-2s runs with ${j.callsPerRoute} calls/route`);
  const w = await runMethod('worker', list.slice(0, 3), catalog, { worker: 'https://w.example', fetchFn: async (u, o) => ({ ok: true, json: async () => ({ skill: JSON.parse(o.body).prompt ? list.find((c) => c.input === JSON.parse(o.body).prompt)?.skill : null, alternatives: [] }) }) }); ok(w.n === 3 && w.top1 === 1 && w.callsPerRoute === 2 && /^worker/.test(w.method), 'worker method posts to /route');
  ok(/Top-1/.test(render([k, j])), 'renders');
  console.log(`route-bench self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  const list = cases(+arg('limit', '0') || 0); const catalog = loadCatalog();
  const worker = arg('worker', '');
  const wanted = arg('methods', configured() ? 'keyword,jev-2s,jev-flat' : worker ? 'keyword,worker' : 'keyword').split(',');
  const rows = []; let note = '';
  for (const m of wanted) {
    if (m === 'worker' && !worker) { note = '_worker row pending: pass --worker <url>._'; continue; }
    if (m !== 'keyword' && m !== 'worker' && !configured()) { note = `_Model rows (${m}) pending: set a provider credential (JEV_API_KEY, AI_GATEWAY_API_KEY, or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID) and re-run — or use --worker <url>._`; continue; }
    const r = await runMethod(m, list, catalog, { worker }); rows.push(r);
    console.log(`${m.padEnd(9)} n=${r.n} top1=${(r.top1 * 100).toFixed(1)}% top3=${(r.top3 * 100).toFixed(1)}% median=${r.medianMs}ms calls/route=${r.callsPerRoute}`);
  }
  if (argv.includes('--write')) { writeFileSync(join(ROOT, 'skillbench', 'reports', 'route-bench.md'), render(rows, note)); console.log('→ skillbench/reports/route-bench.md'); }
}
