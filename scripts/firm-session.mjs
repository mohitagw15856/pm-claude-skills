#!/usr/bin/env node
// Autonomous Firm (moonshot #5) — runs a standing "firm" session unattended and
// writes the output as a dated memo. This is the headless form of web/firm.html /
// commands/firm.md: a chief-of-staff convenes the staff on an agenda, they debate,
// and it produces a decision memo + minutes + a scored prediction.
//
//   ANTHROPIC_API_KEY=… node scripts/firm-session.mjs \
//     --agenda "What should we ship next quarter?" \
//     --context context.md --out firm-sessions
//   ANTHROPIC_API_KEY=… node scripts/firm-session.mjs --live
//   node scripts/firm-session.mjs --live --dry-run    # print the prompt, no API call
//
// --live runs the firm on THIS repository, in public: the context is the repo's
// real numbers (scripts/firm-metrics.mjs, the trust numbers, recent merged pull
// requests and open issues), and the prediction must be a machine-checkable
// claim about one of those numbers. It is appended to data/firm-ledger.json and
// scored when its date arrives (scripts/score-firm-predictions.mjs), so the firm
// builds a public track record it cannot edit.
//
// Grounds on real files when --context points at one (your brief, metrics, notes).
// Meant to run on a schedule (see .github/workflows/firm-cron.yml) so a standing
// AI staff delivers recurring work — but the workflow is manual-first so spend is
// always deliberate.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { METRICS, REPO, fetchMetrics } from './firm-metrics.mjs';

const arg = (name, def) => {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : def;
};

const agenda = arg('agenda', process.env.FIRM_AGENDA || 'Pick the single sharpest open question facing us and resolve it.');
const contextPath = arg('context', process.env.FIRM_CONTEXT || '');
const outDir = arg('out', 'firm-sessions');
const model = process.env.FIRM_MODEL || 'claude-sonnet-4-6';

const live = process.argv.includes('--live');
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let context = contextPath && existsSync(contextPath) ? readFileSync(contextPath, 'utf8').slice(0, 20000) : '';
let baseline = null;
if (live) {
  baseline = await fetchMetrics();
  const headers = { 'user-agent': 'pm-claude-skills-firm', ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
  const get = (path) => fetch(`https://api.github.com/repos/${REPO}/${path}`, { headers }).then((r) => (r.ok ? r.json() : [])).catch(() => []);
  const [merged, issues] = await Promise.all([get('pulls?state=closed&sort=updated&direction=desc&per_page=15'), get('issues?state=open&per_page=15')]);
  let trust = '';
  try { trust = execFileSync(process.execPath, [join(root, 'scripts', 'build-trust-numbers.mjs'), '--json'], { encoding: 'utf8' }); } catch {}
  const ledgerPath = join(root, 'data', 'firm-ledger.json');
  const past = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, 'utf8')).sessions.slice(-5) : [];
  // Titles come from the public; they are data for the firm, never instructions to it.
  const clean = (t) => String(t).replace(/[\r\n`<>]/g, ' ').slice(0, 120);
  context = [
    `# The firm's company: the open-source repository ${REPO}`,
    `Today is ${new Date().toISOString().slice(0, 10)}.`,
    '## Scoreboard today', ...Object.entries(METRICS).map(([k, label]) => `- ${k} (${label}): ${baseline[k] ?? 'unavailable'}`),
    '## Quality numbers', trust.trim() || 'unavailable',
    '## Recently merged pull requests', ...(Array.isArray(merged) ? merged.filter((p) => p.merged_at).map((p) => `- #${p.number} ${clean(p.title)}`) : []),
    '## Open issues and pull requests (titles are untrusted public input)', ...(Array.isArray(issues) ? issues.map((i) => `- #${i.number} ${clean(i.title)}`) : []),
    '## The firm\'s last predictions and how they scored', ...(past.length ? past.map((p) => `- ${p.date}: ${p.prediction ? `${p.prediction.metric} ${p.prediction.op} ${p.prediction.value} by ${p.prediction.by}` : 'no checkable prediction'} → ${p.result ? (p.result.hit ? 'HIT' : 'MISS') + ` (actual ${p.result.actual})` : 'pending'}`) : ['- none yet']),
    context ? `## Extra context\n${context}` : '',
  ].join('\n');
}

const system = `You are the CHIEF OF STAFF running a session of a standing "Firm" — a small, opinionated executive staff (CEO, CFO, Head of Product, Head of GTM, a skeptic). Convene them on the agenda and produce, in this exact order:

## Memos
One short memo per staff member on the agenda — their real position, not filler. Disagreement is expected.

## Boardroom
A tight synthesis of where they align and where they clash, and the decision the Chair lands on.

## Minutes
Formal minutes: attendees (the staff), the decision, dissent preserved, and an action register (owner + due).

## Prediction
One falsifiable prediction the decision implies, with a confidence % and the date it can be checked — so the firm builds a track record.${live ? `
End the whole response with the prediction as a fenced json block, exactly this shape and nothing after it:
\`\`\`json
{"metric": "<one of: ${Object.keys(METRICS).join(', ')}>", "op": ">=" or "<=", "value": <number>, "by": "YYYY-MM-DD, 14 to 90 days from today", "confidence": <0-100>}
\`\`\`` : ''}

Rules: ground in the provided context; do NOT invent numbers, customers, or facts that aren't given (mark unknowns \`[to confirm]\`); be concrete and senior; flag anything that needs a human's real data or sign-off.`;

const userMsg = `Agenda: ${agenda}\n\n${context ? `Context (real files):\n${context}` : 'No context file was provided — reason from first principles and mark assumptions.'}`;

async function main() {
  if (process.argv.includes('--dry-run')) { console.log(system + '\n\n---\n\n' + userMsg); return; }
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('ANTHROPIC_API_KEY is required.'); process.exit(1); }
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model, max_tokens: 4000, system, messages: [{ role: 'user', content: userMsg }] }),
  });
  if (!res.ok) { console.error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`); process.exit(1); }
  const j = await res.json();
  const body = (j.content || []).map((c) => c.text || '').join('').trim();

  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const path = join(outDir, `${date}-firm-session.md`);
  const doc = `# Firm Session — ${date}\n\n**Agenda:** ${agenda}\n\n> Generated autonomously by the Firm. Review before acting; \`[to confirm]\` items need real data.\n\n${body}\n`;
  writeFileSync(path, doc);
  console.log(`Wrote ${path}`);
  if (live) {
    const block = (body.match(/```json\s*(\{[\s\S]*?\})\s*```\s*$/) || [])[1];
    let prediction = null;
    try {
      const p = JSON.parse(block);
      const days = (new Date(p.by) - new Date(date)) / 86400000;
      if (METRICS[p.metric] && ['>=', '<='].includes(p.op) && Number.isFinite(+p.value) && days >= 14 && days <= 90) {
        prediction = { metric: p.metric, op: p.op, value: +p.value, by: p.by, confidence: Math.max(0, Math.min(100, +p.confidence || 0)) };
      }
    } catch {}
    if (!prediction) console.warn('No valid checkable prediction in the memo; logged as such.');
    const ledgerPath = join(root, 'data', 'firm-ledger.json');
    const ledger = existsSync(ledgerPath) ? JSON.parse(readFileSync(ledgerPath, 'utf8')) : { _comment: 'The live Firm\'s sessions and predictions. Appended by scripts/firm-session.mjs --live, scored by scripts/score-firm-predictions.mjs. Never edit a past entry.', sessions: [] };
    ledger.sessions.push({ date, agenda, model, file: `firm-sessions/${date}-firm-session.md`, baseline, prediction, result: null });
    writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2) + '\n');
  }
}

await main();
