#!/usr/bin/env node
// Autonomous Firm (moonshot #5) — runs a standing "firm" session unattended and
// writes the output as a dated memo. This is the headless form of web/firm.html /
// commands/firm.md: a chief-of-staff convenes the staff on an agenda, they debate,
// and it produces a decision memo + minutes + a scored prediction.
//
//   ANTHROPIC_API_KEY=… node scripts/firm-session.mjs \
//     --agenda "What should we ship next quarter?" \
//     --context context.md --out firm-sessions
//
// Grounds on real files when --context points at one (your brief, metrics, notes).
// Meant to run on a schedule (see .github/workflows/firm-cron.yml) so a standing
// AI staff delivers recurring work — but the workflow is manual-first so spend is
// always deliberate.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const arg = (name, def) => {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1].startsWith('--') ? process.argv[i + 1] : def;
};

const agenda = arg('agenda', process.env.FIRM_AGENDA || 'Pick the single sharpest open question facing us and resolve it.');
const contextPath = arg('context', process.env.FIRM_CONTEXT || '');
const outDir = arg('out', 'firm-sessions');
const model = process.env.FIRM_MODEL || 'claude-sonnet-4-6';

const context = contextPath && existsSync(contextPath) ? readFileSync(contextPath, 'utf8').slice(0, 20000) : '';

const system = `You are the CHIEF OF STAFF running a session of a standing "Firm" — a small, opinionated executive staff (CEO, CFO, Head of Product, Head of GTM, a skeptic). Convene them on the agenda and produce, in this exact order:

## Memos
One short memo per staff member on the agenda — their real position, not filler. Disagreement is expected.

## Boardroom
A tight synthesis of where they align and where they clash, and the decision the Chair lands on.

## Minutes
Formal minutes: attendees (the staff), the decision, dissent preserved, and an action register (owner + due).

## Prediction
One falsifiable prediction the decision implies, with a confidence % and the date it can be checked — so the firm builds a track record.

Rules: ground in the provided context; do NOT invent numbers, customers, or facts that aren't given (mark unknowns \`[to confirm]\`); be concrete and senior; flag anything that needs a human's real data or sign-off.`;

const userMsg = `Agenda: ${agenda}\n\n${context ? `Context (real files):\n${context}` : 'No context file was provided — reason from first principles and mark assumptions.'}`;

async function main() {
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
}

await main();
