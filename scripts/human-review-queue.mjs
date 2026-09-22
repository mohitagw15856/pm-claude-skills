#!/usr/bin/env node
// Human-review queue prioritiser (decision-layer idea #10).
// config/human-review.json starts empty (0 of the high-stakes skills reviewed). This ranks
// the unreviewed high-stakes skills by "harm if wrong" so expert reviewers start with the
// worst — and writes docs/HUMAN-REVIEW-QUEUE.md + data/human-review-queue.json.
//   node scripts/human-review-queue.mjs            # heuristic ranking (no key) or model-scored (JEV_API_KEY)
//   node scripts/human-review-queue.mjs --top 25 --write
//   node scripts/human-review-queue.mjs --selftest
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ask, score, noul, configured, mockTransport } from '../integrations/jev/client.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const HARM = [
  'inconvenience — a wrong answer wastes time or money that is easily recovered',
  'material loss — a wrong answer could cost a meaningful sum, a deadline or a benefit, but is recoverable',
  'serious — a wrong answer could cost a job, housing, a legal right, or significant money, with limited recourse',
  'severe — a wrong answer could affect health, safety, liberty, immigration status or lead to irreversible financial harm',
];
const HEUR = [[/\b(court|appeal|eviction|immigration|visa|deport|custody|garnish|bankrupt|foreclos)/i, 3], [/\b(medic|diagnos|medication|dosage|surgery|symptom|mental health|suicid|overdose)/i, 3], [/\b(tax|IRS|HMRC|401k|pension|mortgage|loan|insurance|claim|benefit|severance|settlement)/i, 2], [/\b(lease|deposit|contract|salary|negotiat|employment|termination|PIP)/i, 1]];

export function highStakes() {
  const tiers = JSON.parse(readFileSync(join(ROOT, 'data', 'risk-tiers.json'), 'utf8')).tiers || {};
  return Object.entries(tiers).filter(([, v]) => v.tier === 'high-stakes').map(([k]) => k);
}
export function reviewed() {
  try { return new Set((JSON.parse(readFileSync(join(ROOT, 'config', 'human-review.json'), 'utf8')).reviews || []).map((r) => r.skill)); } catch { return new Set(); }
}
export function describe(name) {
  const p = join(ROOT, 'skills', name, 'SKILL.md'); if (!existsSync(p)) return '';
  const fm = (readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/) || [, ''])[1];
  return (fm.match(/^description:\s*"?([\s\S]*?)"?\s*$/m)?.[1] || '').replace(/\s+/g, ' ').slice(0, 600);
}
export function heuristicScore(desc) { let h = 0; for (const [re, w] of HEUR) if (re.test(desc)) h = Math.max(h, w); const figures = /\b(specific|exact|figures|amounts|deadline|days|limit)\b/i.test(desc) ? 0.5 : 0; return { harm: h, figures }; }

export async function rank(names, { transport, env = process.env } = {}) {
  const live = transport || configured(env);
  const rows = [];
  for (const name of names) {
    const desc = describe(name); if (!desc) continue;
    if (!live) { const h = heuristicScore(desc); rows.push({ skill: name, harm: h.harm, figures: h.figures, method: 'heuristic' }); continue; }
    const r = await ask({ skill: name, description: desc }, {
      harm: score('If this skill gave a confidently wrong answer to the person using it, how bad is the realistic worst case?', HARM),
      figures: noul('Does this skill produce jurisdiction-specific legal, medical, tax or financial figures, deadlines or thresholds that change over time?'),
    }, { transport, env });
    rows.push({ skill: name, harm: +r.answers.harm.level, harmScore: +r.answers.harm.score.toFixed(2), figures: +r.answers.figures.noul.toFixed(2), confidence: +r.answers.harm.confidence.toFixed(2), method: 'jev' });
  }
  rows.sort((a, b) => (b.harm + b.figures) - (a.harm + a.figures) || a.skill.localeCompare(b.skill));
  rows.forEach((r, i) => (r.rank = i + 1));
  return rows;
}
export function render(rows, method) {
  const lines = [`# Human-review queue — start here`, ``, `Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/human-review-queue.mjs\` (${method}). The unreviewed **high-stakes** skills (\`data/risk-tiers.json\`), ranked by realistic harm if the output is wrong, then by whether the skill produces jurisdiction-specific figures that go stale. Reviewers: take the top of the list first — the program is in [EXPERT-REVIEW-PROGRAM.md](EXPERT-REVIEW-PROGRAM.md); record a review in \`config/human-review.json\`.`, ``, `| # | Skill | Harm if wrong (0–3) | Jurisdiction figures | Method |`, `|---:|---|---:|---:|---|`];
  for (const r of rows) lines.push(`| ${r.rank} | [\`${r.skill}\`](../skills/${r.skill}/SKILL.md) | ${r.harm} | ${r.figures} | ${r.method} |`);
  lines.push('', `Harm levels: ${HARM.map((h, i) => `**${i}** ${h.split(' — ')[0]}`).join(' · ')}.`, '', method === 'heuristic' ? '_Heuristic ranking (keyword classes). Set `JEV_API_KEY` and re-run for a model-scored queue with confidence per row._' : '_Model-scored. Re-run after each batch of reviews; reviewed skills drop off._');
  return lines.join('\n') + '\n';
}
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const hs = highStakes(); ok(hs.length > 100, `high-stakes list (${hs.length})`);
  const rows = await rank(hs.slice(0, 12), { env: {} });
  ok(rows.length === 12 && rows[0].rank === 1 && rows.every((r) => r.method === 'heuristic'), 'heuristic ranks 12');
  ok(heuristicScore('help appeal an eviction in court').harm === 3, 'eviction → harm 3');
  const t = mockTransport((k, q, state) => (k === 'harm' ? (/lease/i.test(state.description) ? 2 : 1) : 0.8));
  const jr = await rank(['lease-decoder', 'prd-template'], { transport: t });
  ok(jr[0].skill === 'lease-decoder' && jr[0].method === 'jev', 'model-scored ordering');
  ok(/\| 1 \|/.test(render(jr, 'jev')), 'renders a table');
  console.log(`human-review-queue self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const argv = process.argv.slice(2); const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i !== -1 ? argv[i + 1] : d; };
  if (argv.includes('--selftest')) process.exit(await selftest());
  const done = reviewed(); const names = highStakes().filter((n) => !done.has(n));
  const rows = (await rank(names)).slice(0, +arg('top', '0') || undefined);
  const method = rows[0]?.method || 'heuristic';
  console.log(`${names.length} unreviewed high-stakes skills · top ${Math.min(10, rows.length)}:`);
  for (const r of rows.slice(0, 10)) console.log(`  ${String(r.rank).padStart(3)}. ${r.skill}  harm=${r.harm} figures=${r.figures}`);
  if (argv.includes('--write')) {
    writeFileSync(join(ROOT, 'docs', 'HUMAN-REVIEW-QUEUE.md'), render(rows, method));
    writeFileSync(join(ROOT, 'data', 'human-review-queue.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), method, unreviewed: names.length, rows }, null, 1));
    console.log('→ docs/HUMAN-REVIEW-QUEUE.md · data/human-review-queue.json');
  }
}
