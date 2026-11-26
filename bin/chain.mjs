// `pm-claude-skills chain <workflow>` — run a whole workflow recipe headless:
// every skill in the chain executes in order, each output carried forward as
// context for the next. Raw notes in, a folder of finished artifacts out —
// optionally including REAL Office files via the stdlib document tools.
//
//   pm-claude-skills chain --list
//   pm-claude-skills chain run-discovery --input notes.txt
//   pm-claude-skills chain ship-a-feature --text "referral program for B2B" --out-dir ./artifacts
//   cat notes.md | pm-claude-skills chain close-the-quarter --deck   # + a real .pptx at the end
//
// Needs ANTHROPIC_API_KEY (your key, one call per step). Pure Node + optional
// python3 only for --deck/--doc (the same zero-dependency scripts the document
// skills ship).
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { complete, parseSkill } from './lib/anthropic.mjs';
import { modelFor } from './lib/models.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const getArg = (argv, name, def) => { const i = argv.indexOf('--' + name); return i !== -1 && argv[i + 1] ? argv[i + 1] : def; };

const SUFFIX =
  '\n\n---\nExecute this skill now on the material below and produce the complete output. ' +
  'Do not ask follow-up questions — work with what is given and note any reasonable assumptions.';

async function readStdin() {
  if (process.stdin.isTTY) return '';
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8').trim();
}

function loadWorkflows() {
  try { return JSON.parse(readFileSync(join(PKG_ROOT, 'workflows.json'), 'utf8')).workflows || []; }
  catch { return []; }
}

export async function run(argv) {
  const workflows = loadWorkflows();
  const id = argv[0] && !argv[0].startsWith('--') ? argv[0] : '';

  if (argv.includes('--list') || (!id && !argv.includes('--help'))) {
    console.log('Workflow chains — run several skills as one pipeline, each output feeding the next:\n');
    for (const w of workflows) console.log(`  ${w.id.padEnd(22)} ${w.steps.map((s) => s.skill).join(' → ')}`);
    console.log('\nRun one:  pm-claude-skills chain <id> --text "…" | --input <file> | stdin   [--out-dir <dir>] [--model <m>] [--deck] [--doc]');
    console.log('--deck / --doc additionally produce a real .pptx / .docx from the final artifact (needs python3, no pip installs).');
    return id ? 0 : (argv.includes('--list') ? 0 : 1);
  }
  if (argv.includes('--help') || argv.includes('-h')) return run(['--list']);

  const w = workflows.find((x) => x.id === id);
  if (!w) { console.error(`Unknown chain "${id}". See them all:  pm-claude-skills chain --list`); return 1; }

  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY to run a chain (one API call per step).'); return 1; }

  let input = getArg(argv, 'text', '');
  const inFile = getArg(argv, 'input');
  if (!input && inFile) {
    if (!existsSync(inFile)) { console.error(`Input file not found: ${inFile}`); return 1; }
    input = readFileSync(inFile, 'utf8');
  }
  if (!input) input = await readStdin();
  if (!input.trim()) { console.error('No input. Provide --text "…", --input <file>, or pipe via stdin.'); return 1; }

  const model = getArg(argv, 'model', modelFor('default'));
  const outDir = getArg(argv, 'out-dir', `./${w.id}-artifacts`);
  mkdirSync(outDir, { recursive: true });

  console.error(`⛓  ${w.name} — ${w.steps.length} steps, model ${model}\n   ${w.steps.map((s) => s.skill).join(' → ')}\n`);
  let carried = `THE ORIGINAL BRIEF / RAW MATERIAL:\n\n${input}`;
  const outputs = [];

  for (let i = 0; i < w.steps.length; i++) {
    const step = w.steps[i];
    const file = join(PKG_ROOT, 'skills', step.skill, 'SKILL.md');
    if (!existsSync(file)) { console.error(`  ✗ step ${i + 1}: skill "${step.skill}" not found — skipping`); continue; }
    const { body } = parseSkill(readFileSync(file, 'utf8'));
    process.stderr.write(`  ${i + 1}/${w.steps.length} ${step.skill} … `);
    const t0 = Date.now();
    const out = await complete({ apiKey, model, system: body + SUFFIX, messages: [{ role: 'user', content: carried }], maxTokens: 8192 });
    const fname = `${String(i + 1).padStart(2, '0')}-${step.skill}.md`;
    writeFileSync(join(outDir, fname), out + '\n');
    outputs.push({ skill: step.skill, file: fname, out });
    console.error(`✔ ${((Date.now() - t0) / 1000).toFixed(1)}s → ${fname}`);
    // Carry forward: the original material + this step's artifact (the chain's contract).
    carried += `\n\n---\nOUTPUT OF THE PREVIOUS STEP (${step.skill} — ${step.produces}):\n\n${out}`;
    if (carried.length > 150000) carried = carried.slice(-150000);   // context hygiene on long chains
  }

  if (!outputs.length) { console.error('\nNo steps ran.'); return 1; }
  const last = outputs[outputs.length - 1];

  // ── Optional: real Office files from the final artifact (stdlib python) ────
  for (const [flag, script, ext, label] of [
    ['--deck', join(PKG_ROOT, 'skills', 'slide-deck', 'scripts', 'pptx_tool.py'), 'pptx', 'deck'],
    ['--doc', join(PKG_ROOT, 'skills', 'word-document', 'scripts', 'docx_tool.py'), 'docx', 'document'],
  ]) {
    if (!argv.includes(flag)) continue;
    if (!existsSync(script)) { console.error(`  (${flag}: tool script missing — skipped)`); continue; }
    const target = join(outDir, `${w.id}.${ext}`);
    const args = ext === 'pptx'
      ? [script, 'build', target, '--outline-file', join(outDir, last.file)]
      : [script, 'create', target, '--text-file', join(outDir, last.file)];
    const r = spawnSync('python3', args, { encoding: 'utf8' });
    if (r.status === 0) console.error(`  📎 real ${label}: ${target}`);
    else console.error(`  (${flag} failed: ${(r.stderr || r.stdout || '').split('\n')[0]})`);
  }

  console.error(`\n✅ ${outputs.length} artifacts in ${outDir}/ — final: ${last.file}`);
  return 0;
}
