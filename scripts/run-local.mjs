#!/usr/bin/env node
// run-local — run any skill against a LOCAL model, fully offline. No API key,
// nothing leaves your machine. Talks to any OpenAI-compatible local server
// (Ollama, LM Studio, llama.cpp --api, vLLM). The skill's instructions become
// the system prompt — exactly like the hosted runner, just pointed at localhost.
//
//   node scripts/run-local.mjs executive-update --text "shipped X, churn +2pts…"
//   cat notes.txt | node scripts/run-local.mjs meeting-notes --out summary.md
//   node scripts/run-local.mjs prd-template --text "…" --model qwen2.5 --base http://localhost:11434/v1
//
// Setup (Ollama): `brew install ollama` (or ollama.com), `ollama serve`,
// `ollama pull llama3.1`. Then run the command above — no ANTHROPIC_API_KEY.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const name = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--text' && args[args.indexOf(a) - 1] !== '--model' && args[args.indexOf(a) - 1] !== '--base' && args[args.indexOf(a) - 1] !== '--out');

const BASE = arg('base', process.env.PM_LOCAL_BASE || 'http://localhost:11434/v1');
const MODEL = arg('model', process.env.PM_LOCAL_MODEL || 'llama3.1');

if (!name) { console.error('Usage: node scripts/run-local.mjs <skill> --text "..." [--model llama3.1] [--base http://localhost:11434/v1]'); process.exit(1); }

function skillBody(n) {
  const sj = join(root, 'web', 'skills.json');
  if (existsSync(sj)) { const s = (JSON.parse(readFileSync(sj, 'utf8')).skills || []).find((x) => x.name === n); if (s) return s.body || s.instructions || s.description; }
  const p = join(root, 'skills', n, 'SKILL.md');
  if (existsSync(p)) return readFileSync(p, 'utf8').replace(/^---[\s\S]*?---\n/, '');
  return null;
}
const body = skillBody(name);
if (!body) { console.error(`No skill named "${name}".`); process.exit(1); }

let input = arg('text');
if (!input) { try { input = readFileSync(0, 'utf8'); } catch { /* no stdin */ } }
if (!input || !input.trim()) { console.error('Provide input via --text "..." or piped stdin.'); process.exit(1); }

let res;
try {
  res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: body }, { role: 'user', content: input }], temperature: 0.3, stream: false }),
  });
} catch (e) {
  console.error(`Could not reach a local model at ${BASE} (${e.message}).\n\nStart one first, e.g. Ollama:\n  ollama serve &\n  ollama pull ${MODEL}\n\nOr point --base at LM Studio / llama.cpp / vLLM's OpenAI endpoint.`);
  process.exit(1);
}
if (!res.ok) { console.error(`Local model error ${res.status}: ${(await res.text()).slice(0, 300)}\nIs "${MODEL}" pulled? Try: ollama pull ${MODEL}`); process.exit(1); }
const data = await res.json();
const out = data.choices?.[0]?.message?.content || '';
const outFile = arg('out');
if (outFile) { writeFileSync(join(process.cwd(), outFile), out); console.error(`Wrote ${outFile} (${out.length} chars) — 100% local, nothing left this machine.`); }
else process.stdout.write(out + '\n');
