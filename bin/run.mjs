// `pm-claude-skills run <skill>` — run a skill headless with your own key, so every skill is
// scriptable and CI-usable (not just installable or browser-only). Input comes from --text,
// --input <file>, or stdin; the finished artifact prints to stdout (or --out <file>).
// Needs ANTHROPIC_API_KEY, or --local [model] for a free local model: Ollama by default,
// or any OpenAI-compatible server at PM_SKILLS_BASE_URL. Pure Node, no dependencies.
import { readFileSync, existsSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { complete, parseSkill } from './lib/anthropic.mjs';
import { parseInputs, promptInputs } from './lib/inputs.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SKILLS_DIR = join(PKG_ROOT, 'skills');
const SUFFIX =
  '\n\n---\nThe user has provided their input below. Execute this skill now and produce the ' +
  'complete output. Do not ask follow-up questions — work with what is given and note any ' +
  'reasonable assumptions.';

const getArg = (argv, name, def) => { const i = argv.indexOf('--' + name); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };

async function readStdin() {
  if (process.stdin.isTTY) return '';
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8').trim();
}

// An OpenAI-compatible chat call (Ollama, LM Studio, llama.cpp, vLLM): no key unless the server wants one.
async function completeLocal({ model, system, input }) {
  const base = (process.env.PM_SKILLS_BASE_URL || 'http://localhost:11434/v1').replace(/\/+$/, '');
  let r;
  try {
    r = await fetch(base + '/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(process.env.PM_SKILLS_LOCAL_KEY ? { authorization: 'Bearer ' + process.env.PM_SKILLS_LOCAL_KEY } : {}) },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: system }, { role: 'user', content: input }], stream: false }),
    });
  } catch { throw new Error(`no local model server at ${base}. Install Ollama (https://ollama.com), then: ollama pull ${model}`); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`local model error ${r.status}: ${(j.error && (j.error.message || j.error)) || 'see the server log'}${r.status === 404 ? `. Try: ollama pull ${model}` : ''}`);
  return String((j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '').trim();
}

export async function run(argv) {
  const skill = argv[0] && !argv[0].startsWith('--') ? argv[0] : '';
  if (!skill || argv.includes('--help') || argv.includes('-h')) {
    console.log(`Run a skill headless with your own key (output → stdout).

Usage:
  pm-claude-skills run <skill> [--text "…"] [--input <file>] [--model <m>] [--out <file>] [--local [model]]
  cat notes.txt | pm-claude-skills run meeting-notes        # input can be piped

Examples:
  pm-claude-skills run prd-template --text "a referral program for B2B users"
  cat q2-notes.md | pm-claude-skills run executive-update --out update.md

Needs ANTHROPIC_API_KEY, or --local for a free local model (Ollama, default qwen2.5:3b;
set PM_SKILLS_BASE_URL for another OpenAI-compatible server, PM_SKILLS_LOCAL_MODEL to
make local the default). See available skills with:  pm-claude-skills list
No setup at all? Run any skill free in the browser: https://mohitagw15856.github.io/pm-claude-skills/`);
    return skill ? 0 : 1;
  }

  const file = join(SKILLS_DIR, skill, 'SKILL.md');
  if (!existsSync(file)) {
    const all = existsSync(SKILLS_DIR) ? readdirSync(SKILLS_DIR).filter((n) => { try { return statSync(join(SKILLS_DIR, n)).isDirectory(); } catch { return false; } }) : [];
    const near = all.filter((n) => n.includes(skill) || skill.includes(n)).slice(0, 6);
    console.error(`Unknown skill "${skill}".` + (near.length ? ` Did you mean: ${near.join(', ')}?` : ' Run `pm-claude-skills list` to see all skills.'));
    return 1;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  // --local [model]: a model on this machine, so a run costs nothing. PM_SKILLS_LOCAL_MODEL makes it the default.
  const li = argv.indexOf('--local');
  const localModel = li !== -1 ? (argv[li + 1] && !argv[li + 1].startsWith('--') ? argv[li + 1] : (process.env.PM_SKILLS_LOCAL_MODEL || 'qwen2.5:3b')) : (process.env.PM_SKILLS_LOCAL_MODEL || '');
  if (!apiKey && !localModel) {
    console.error('Set ANTHROPIC_API_KEY to run a skill, or add --local to use a free local model (Ollama). Or use the browser playground (no setup): https://mohitagw15856.github.io/pm-claude-skills/');
    return 1;
  }

  // Resolve input: --text wins, then --input <file>, then piped stdin.
  let input = getArg(argv, 'text', '');
  const inFile = getArg(argv, 'input');
  if (!input && inFile) {
    if (!existsSync(inFile)) { console.error(`Input file not found: ${inFile}`); return 1; }
    input = readFileSync(inFile, 'utf8');
  }
  if (!input) input = await readStdin();
  const { body } = parseSkill(readFileSync(file, 'utf8'));
  if ((!input || !input.trim()) && process.stdin.isTTY) {
    // No input but a human at the terminal: prompt field-by-field from the
    // skill's own declared inputs (same parse the playground form uses).
    const declared = parseInputs(body);
    if (declared.length) input = await promptInputs(declared, skill);
  }
  if (!input || !input.trim()) {
    console.error('No input given. Provide --text "…", --input <file>, pipe via stdin, or run in a terminal to be prompted field-by-field.');
    return 1;
  }

  const model = localModel || getArg(argv, 'model', 'claude-sonnet-4-6');
  console.error(`▶ Running ${skill} with ${model}${localModel ? ' (local)' : ''}…`);
  let out;
  try {
    out = localModel
      ? await completeLocal({ model, system: body + SUFFIX, input })
      : await complete({ apiKey, model, system: body + SUFFIX, messages: [{ role: 'user', content: input }], maxTokens: 8192 });
  } catch (e) { console.error(`✗ ${e.message}`); return 1; }

  const outFile = getArg(argv, 'out');
  if (outFile) { writeFileSync(outFile, out + '\n'); console.error(`✅ Wrote ${outFile}`); }
  else process.stdout.write(out + '\n');

  // Opt-in telemetry: skill NAME only, never content or identity, and only when
  // the user set PM_SKILLS_TELEMETRY=1. Fire-and-forget; failures are silent.
  if (process.env.PM_SKILLS_TELEMETRY === '1') {
    fetch('https://pm-skills-mcp.pm-claude-skills.workers.dev/ping', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ skill }),
    }).catch(() => {});
  }
  return 0;
}
