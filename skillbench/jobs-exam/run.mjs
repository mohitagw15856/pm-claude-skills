#!/usr/bin/env node
// Sit the jobs exam: each model answers each paper, and the answers are stored
// under random ids (answers/<paper>.json) so expert graders can't tell which
// model wrote what. The id-to-model key goes to a separate file that stays out
// of git until grading closes (then publish it with the results).
//
//   node skillbench/jobs-exam/run.mjs --models local:qwen2.5:3b,local:llama3.1:8b
//   node skillbench/jobs-exam/run.mjs --models cf:@cf/meta/llama-3.1-8b-instruct --only some-paper
//
// Free by default: local:<model> (Ollama or any OpenAI-compatible server at
// LOCAL_BASE_URL) and cf:<model> (Cloudflare Workers AI's free allowance, with
// CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN). Paid APIs (claude-*, gpt-*)
// need --allow-api-spend, so a run never spends credit by accident.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const models = String(arg('models', '')).split(',').map((s) => s.trim()).filter(Boolean);
const only = String(arg('only', '')).split(',').filter(Boolean);
const keyFile = arg('key', join(here, '.key.json'));
const allowSpend = process.argv.includes('--allow-api-spend');
if (!models.length) { console.error('Usage: run.mjs --models local:<model>[,cf:<model>] [--only <paper-id>] [--key <file>] [--allow-api-spend]'); process.exit(1); }

const SYSTEM = 'You are a capable, qualified professional in the occupation named below, doing this task for real at work. Produce the finished piece of work, not advice about how to do it. Be accurate with any figures.';
const VENDOR = /\b(claude|gpt-?\d*|chatgpt|gemini|llama|qwen|deepseek|mistral|anthropic|openai|meta ai)\b/gi;

async function answer(model, paper) {
  const user = `Occupation: ${paper.occupation} (${paper.region})\n\n${paper.task}`;
  let url, headers = { 'content-type': 'application/json' }, body;
  if (model.startsWith('local:')) {
    url = (process.env.LOCAL_BASE_URL || 'http://localhost:11434/v1').replace(/\/+$/, '') + '/chat/completions';
    if (process.env.LOCAL_API_KEY) headers.authorization = 'Bearer ' + process.env.LOCAL_API_KEY;
    body = { model: model.slice(6), messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }], stream: false };
  } else if (model.startsWith('cf:')) {
    url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`;
    headers.authorization = 'Bearer ' + process.env.CLOUDFLARE_API_TOKEN;
    body = { model: model.slice(3), messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }] };
  } else if (/^claude/.test(model)) {
    if (!allowSpend) throw new Error(`${model} uses paid API credit; add --allow-api-spend if you mean it`);
    url = 'https://api.anthropic.com/v1/messages';
    Object.assign(headers, { 'x-api-key': process.env.ANTHROPIC_API_KEY || '', 'anthropic-version': '2023-06-01' });
    body = { model, max_tokens: 3000, system: SYSTEM, messages: [{ role: 'user', content: user }] };
  } else if (/^(gpt|o\d)/.test(model)) {
    if (!allowSpend) throw new Error(`${model} uses paid API credit; add --allow-api-spend if you mean it`);
    url = 'https://api.openai.com/v1/chat/completions';
    headers.authorization = 'Bearer ' + (process.env.OPENAI_API_KEY || '');
    body = { model, messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }] };
  } else throw new Error(`unknown model "${model}" (use local:, cf:, claude-* or gpt-*)`);
  const r = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${model}: ${r.status} ${JSON.stringify(j.error || j.errors || '').slice(0, 200)}`);
  const text = j.content ? j.content.map((c) => c.text || '').join('') : (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
  // Graders must not learn the model from the answer itself.
  return text.replace(VENDOR, '[model]').trim();
}

const cfg = JSON.parse(readFileSync(join(here, 'papers.json'), 'utf8'));
const papers = (cfg.papers || []).filter((p) => !only.length || only.includes(p.id));
if (!papers.length) { console.error('No papers to sit yet. Papers come from practitioners: see README.md.'); process.exit(1); }
const key = existsSync(keyFile) ? JSON.parse(readFileSync(keyFile, 'utf8')) : {};
mkdirSync(join(here, 'answers'), { recursive: true });
let failed = 0;
for (const p of papers) {
  const file = join(here, 'answers', `${p.id}.json`);
  const list = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : [];
  for (const m of models) {
    try {
      const text = await answer(m, p);
      const id = randomBytes(4).toString('hex');
      list.push({ id, text });
      key[id] = { model: m, paper: p.id, at: new Date().toISOString().slice(0, 10) };
      console.log(`✓ ${p.id} ← ${m}`);
    } catch (e) { failed++; console.error(`✗ ${p.id} ← ${e.message}`); }
  }
  // Shuffle so order doesn't reveal the model either.
  for (let i = list.length - 1; i > 0; i--) { const k = randomBytes(1)[0] % (i + 1); [list[i], list[k]] = [list[k], list[i]]; }
  writeFileSync(file, JSON.stringify(list, null, 1) + '\n');
}
writeFileSync(keyFile, JSON.stringify(key, null, 1) + '\n');
console.log(`Answers in answers/. Key (keep private until grading closes): ${keyFile}`);
process.exit(failed ? 1 : 0);
