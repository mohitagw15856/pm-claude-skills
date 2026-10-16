#!/usr/bin/env node
// SkillBench runner — score MODELS (not skills) on the frozen professional-work
// task set. Each model runs every task twice: bare (task only) and skilled
// (task + the matching SKILL.md). A pinned judge scores all outputs on the
// library's fixed 1–5 rubric, two passes, mean taken.
//
//   ANTHROPIC_API_KEY=… node skillbench/run-skillbench.mjs --models claude-sonnet-4-6
//   … OPENAI_API_KEY=… GEMINI_API_KEY=… --models claude-fable-5,gpt-4o,gemini-2.0-flash
//   --dry-run            plan + cost estimate, no API calls
//   --judge <model>      override the pinned judge (discloses in results)
//   --tasks <path>       alternate task set (default: skillbench/tasks.json)
//   --skip-missing-keys  run only the listed models whose provider key is set
//   --only <ids>         run only these task ids (comma-separated); for diagnosis
//   --save-outputs <dir> also write each bare and skilled output to <dir> as Markdown
//   --out <path>         results file (default: skillbench/results.json; the Chinese
//                        task set writes skillbench/results-zh.json)
//
// Appends per-model entries to skillbench/results.json (existing models are replaced).
// Providers are inferred from the model id: claude-* → Anthropic, gpt-*/o*-* → OpenAI,
// gemini-* → Google, and the Chinese providers through their OpenAI-compatible APIs:
// deepseek-* (DEEPSEEK_API_KEY), qwen-* (DASHSCOPE_API_KEY), kimi-*/moonshot-*
// (MOONSHOT_API_KEY), glm-* (ZHIPU_API_KEY), doubao-* (ARK_API_KEY). No dependencies.
// Free routes, no top-up needed: modelscope:<org>/<model> uses ModelScope API-Inference's
// daily free quota (MODELSCOPE_TOKEN), hf:<org>/<model> uses Hugging Face Inference
// Providers' monthly free credits (HF_TOKEN), sf:<org>/<model> uses SiliconFlow
// (SILICONFLOW_API_KEY; several open models are free there, the rest pay-as-you-go,
// sign-up with a mainland phone number). The prefix is stripped before the call.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : d; };
const has = (n) => process.argv.includes(`--${n}`);

const HARNESS_VERSION = '1.1';
// --judges a,b,c runs a cross-family panel (1 pass each, mean + spread recorded);
// --judge keeps the single-judge behaviour (2 passes, mean). v2 default panels
// exist so no single family grades its own outputs unchallenged.
const JUDGES = (arg('judges', '') || arg('judge', 'claude-sonnet-4-6')).split(',').map((s) => s.trim()).filter(Boolean);
const JUDGE = JUDGES.join('+');
let models = (arg('models', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const dryRun = has('dry-run');
if (!models.length) { console.error('Usage: --models model-a,model-b [--dry-run]'); process.exit(1); }

const taskFile = JSON.parse(readFileSync(arg('tasks', join(__dirname, 'tasks.json')), 'utf8'));
const taskSetVersion = taskFile.version;
const only = (arg('only', '') || '').split(',').map((x) => x.trim()).filter(Boolean);
const tasks = only.length ? taskFile.tasks.filter((t) => only.includes(t.id)) : taskFile.tasks;
if (only.length && !tasks.length) { console.error(`--only matched no task ids in the task set.`); process.exit(1); }
const saveDir = arg('save-outputs', '');
const outPath = arg('out', join(__dirname, 'results.json'));

// ── Provider adapters (single-shot completion; no streaming needed) ──────────
// OpenAI-compatible endpoints, matched by model-id prefix: [pattern, base URL, key env var].
// Same hosts as the playground's providers (web/providers.js).
const COMPAT = [
  [/^modelscope:/, process.env.MODELSCOPE_INFERENCE_URL || 'https://api-inference.modelscope.ai/v1', 'MODELSCOPE_TOKEN', 'modelscope:'],
  [/^hf:/, 'https://router.huggingface.co/v1', 'HF_TOKEN', 'hf:'],
  // A model you serve yourself (Ollama, vLLM, llama.cpp): local:<model>. Ollama ignores
  // the key, but one must be set (LOCAL_API_KEY=x) so a missing key is never silent.
  // Cloudflare Workers AI (Qwen, DeepSeek and others on a free daily allowance):
  // cf:@cf/<org>/<model>, with CLOUDFLARE_ACCOUNT_ID and a token allowed to use Workers AI.
  [/^cf:/, `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID || 'missing-account-id'}/ai/v1`, 'CLOUDFLARE_API_TOKEN', 'cf:'],
  // A second self-hosted server for the judge (so a model is not judged by itself):
  // local-judge:<model> at JUDGE_BASE_URL. No API credit.
  [/^local-judge:/, process.env.JUDGE_BASE_URL || 'http://localhost:8000/v1', 'LOCAL_API_KEY', 'local-judge:'],
  [/^local:/, process.env.LOCAL_BASE_URL || 'http://localhost:11434/v1', 'LOCAL_API_KEY', 'local:'],
  [/^sf:/, process.env.SILICONFLOW_BASE_URL || 'https://api.siliconflow.cn/v1', 'SILICONFLOW_API_KEY', 'sf:'],
  [/^(gpt|o\d|chatgpt)/, process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1', 'OPENAI_API_KEY'],
  [/^deepseek/, 'https://api.deepseek.com', 'DEEPSEEK_API_KEY'],
  [/^qwen/, 'https://dashscope.aliyuncs.com/compatible-mode/v1', 'DASHSCOPE_API_KEY'],
  [/^(kimi|moonshot)/, 'https://api.moonshot.cn/v1', 'MOONSHOT_API_KEY'],
  [/^glm/, 'https://open.bigmodel.cn/api/paas/v4', 'ZHIPU_API_KEY'],
  [/^doubao/, 'https://ark.cn-beijing.volces.com/api/v3', 'ARK_API_KEY'],
];
function providerOf(model) {
  if (/^claude/.test(model)) return 'anthropic';
  if (COMPAT.some(([re]) => re.test(model))) return 'openai';
  if (/^gemini/.test(model)) return 'google';
  throw new Error(`Cannot infer provider for "${model}" (expected claude-*, gpt-*, gemini-*, deepseek-*, qwen-*, kimi-*, glm-*, doubao-*, modelscope:*, hf:*, sf:*, cf:* or local:*).`);
}
// The env var a model's provider needs, for --skip-missing-keys.
function keyVarOf(model) {
  const prov = providerOf(model);
  if (prov === 'anthropic') return 'ANTHROPIC_API_KEY';
  if (prov === 'google') return 'GEMINI_API_KEY';
  return COMPAT.find(([re]) => re.test(model))[2];
}
// --skip-missing-keys: a scheduled run lists every model it would like and runs
// the ones whose provider key is set, instead of failing on the first missing key.
if (has('skip-missing-keys')) {
  const skipped = models.filter((m) => !process.env[keyVarOf(m)]);
  if (skipped.length) console.log(`Skipping (no provider key set): ${skipped.join(', ')}`);
  models = models.filter((m) => process.env[keyVarOf(m)]);
  if (!models.length) { console.log('No model has a provider key set; nothing to run.'); process.exit(0); }
}
async function complete({ model, system, user, maxTokens = 4096 }) {
  const prov = providerOf(model);
  if (prov === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error('ANTHROPIC_API_KEY not set (needed for ' + model + ')');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model, max_tokens: maxTokens, ...(system ? { system } : {}), messages: [{ role: 'user', content: user }] }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(`${model}: ${j.error?.message || res.status}`);
    return j.content?.[0]?.text || '';
  }
  if (prov === 'openai') {
    const [, base, keyVar, prefix = ''] = COMPAT.find(([re]) => re.test(model));
    const key = process.env[keyVar];
    if (!key) throw new Error(keyVar + ' not set (needed for ' + model + ')');
    const msgs = [];
    if (system) msgs.push({ role: 'system', content: system });
    msgs.push({ role: 'user', content: user });
    const res = await fetch(base.replace(/\/$/, '') + '/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key },
      body: JSON.stringify({ model: model.slice(prefix.length), max_tokens: maxTokens, messages: msgs }),
    });
    const j = await res.json();
    if (!res.ok) throw new Error(`${model}: ${j.error?.message || res.status}`);
    // Reasoning models put their thinking in <think> blocks; the judge scores the answer.
    return (j.choices?.[0]?.message?.content || '').replace(/<think>[\s\S]*?<\/think>\s*/g, '').trim();
  }
  // google
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set (needed for ' + model + ')');
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...(system ? { system_instruction: { parts: [{ text: system }] } } : {}), contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { maxOutputTokens: maxTokens } }),
  });
  const j = await res.json();
  if (!res.ok) throw new Error(`${model}: ${j.error?.message || res.status}`);
  return j.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
}

// ── The rubric judge (same dimensions as the library's skill evals) ───────────
const RUBRIC = `You are a strict evaluator of professional work artifacts. Score the RESPONSE to the TASK on four dimensions, each 1-5:
- structure: would a senior professional recognise this artifact's shape?
- completeness: are the load-bearing sections present and specific (not padded)?
- usefulness: could the intended reader act on it without a rewrite?
- grounding: does it use the task's facts, label assumptions, avoid fabricated specifics?
Return STRICT JSON only: {"structure":n,"completeness":n,"usefulness":n,"grounding":n}`;
async function judgeOnce(judgeModel, taskInput, output) {
  const raw = await complete({ model: judgeModel, system: RUBRIC, user: `TASK:\n${taskInput}\n\nRESPONSE:\n${output.slice(0, 14000)}`, maxTokens: 300 });
  try {
    const j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
    const dims = ['structure', 'completeness', 'usefulness', 'grounding'].map((d) => Math.max(1, Math.min(5, +j[d] || 0)));
    return dims.every((v) => v >= 1) ? dims.reduce((a, b) => a + b, 0) / 4 : null;
  } catch { return null; }
}
// Single judge: 2 passes (v1 behaviour). Panel: 1 pass per judge, mean + spread.
async function judgeScore(taskInput, output) {
  const passes = [];
  const perJudge = {};
  for (const jm of JUDGES) {
    const n = JUDGES.length === 1 ? 2 : 1;
    const mine = [];
    for (let i = 0; i < n; i++) { const s = await judgeOnce(jm, taskInput, output); if (s != null) mine.push(s); }
    if (mine.length) { const m = mine.reduce((a, b) => a + b, 0) / mine.length; perJudge[jm] = +m.toFixed(2); passes.push(m); }
  }
  if (!passes.length) return { score: null };
  const score = +(passes.reduce((a, b) => a + b, 0) / passes.length).toFixed(2);
  const spread = JUDGES.length > 1 ? +(Math.max(...passes) - Math.min(...passes)).toFixed(2) : undefined;
  return { score, ...(spread !== undefined ? { spread, perJudge } : {}) };
}

// v2 ground truth: tasks may carry checks — regexes the output must (or must
// not) match. Deterministic, judge-free evidence alongside the rubric score.
function groundTruth(task, output) {
  if (!task.checks || !task.checks.length) return undefined;
  let pass = 0;
  const failed = [];
  for (const c of task.checks) {
    const hit = new RegExp(c.re, c.flags || 'i').test(output);
    const ok = c.absent ? !hit : hit;
    if (ok) pass++; else failed.push(c.why || c.re);
  }
  return { pass, total: task.checks.length, ...(failed.length ? { failed: failed.slice(0, 4) } : {}) };
}

const skillBody = (name) => readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8').replace(/^---[\s\S]*?---\n/, '');

// ── Plan / dry run ────────────────────────────────────────────────────────────
const genCalls = models.length * tasks.length * 2;
const judgeCalls = genCalls * 2;
console.log(`SkillBench v${taskSetVersion} · ${models.length} model(s) × ${tasks.length} tasks × 2 modes = ${genCalls} generations + ${judgeCalls} judge passes (judge: ${JUDGE})`);
if (dryRun) { console.log('~rough cost: generations dominate; expect the cost of ~' + genCalls + ' medium completions per full run. Dry run — no calls made.'); process.exit(0); }

// ── Run ───────────────────────────────────────────────────────────────────────
const results = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : { _comment: 'SkillBench results. One entry per model per run. See skillbench/README.md.', runs: [] };
const failedModels = [];
for (const model of models) {
  console.log(`\n▶ ${model}`);
  const perTask = [];
  for (const t of tasks) {
    process.stdout.write(`  ${t.id} … `);
    const entry = { task: t.id, domain: t.domain };
    try {
      const bare = await complete({ model, user: t.input });
      const jb = await judgeScore(t.input, bare);
      entry.bare = jb.score; if (jb.spread !== undefined) { entry.bareSpread = jb.spread; entry.bareJudges = jb.perJudge; }
      const gtB = groundTruth(t, bare); if (gtB) entry.gtBare = gtB;
      const skilled = await complete({ model, system: skillBody(t.skill), user: t.input });
      const js = await judgeScore(t.input, skilled);
      entry.skilled = js.score; if (js.spread !== undefined) { entry.skilledSpread = js.spread; entry.skilledJudges = js.perJudge; }
      const gtS = groundTruth(t, skilled); if (gtS) entry.gtSkilled = gtS;
      if (saveDir) {
        mkdirSync(saveDir, { recursive: true });
        const safe = model.replace(/[^a-zA-Z0-9.-]+/g, '_');
        writeFileSync(join(saveDir, `${safe}--${t.id}.md`), `# ${t.id} · ${model}\n\n## Task\n\n${t.input}\n\n## Bare (score ${entry.bare})\n\n${bare}\n\n## With skill (score ${entry.skilled})\n\n${skilled}\n`);
      }
      console.log(`bare ${entry.bare ?? '–'}${gtB ? ` (gt ${gtB.pass}/${gtB.total})` : ''} · skilled ${entry.skilled ?? '–'}${gtS ? ` (gt ${gtS.pass}/${gtS.total})` : ''}`);
    } catch (e) {
      entry.error = String(e.message || e).slice(0, 200);
      console.log('ERROR ' + entry.error);
    }
    perTask.push(entry);
  }
  const ok = perTask.filter((x) => x.skilled != null);
  const mean = (k) => ok.length ? +(ok.reduce((s, x) => s + x[k], 0) / ok.length).toFixed(2) : null;
  const run = {
    model, date: new Date().toISOString().slice(0, 10),
    taskSetVersion, harness: HARNESS_VERSION, judge: JUDGE,
    score: mean('skilled'), bare: mean('bare'),
    lift: ok.length ? +(mean('skilled') - mean('bare')).toFixed(2) : null,
    tasks: perTask,
  };
  // A run where every task failed (quota, outage) must not overwrite a good earlier one.
  // A run where every task failed (quota, outage, no credit) is never saved: it
  // would replace good scores, or publish an empty row. Report why instead.
  if (!ok.length) {
    const why = (perTask.find((x) => x.error) || {}).error || 'no scores';
    const hint = /\b402\b/.test(why) ? ' (402 Payment Required: the provider\'s free credits are used up)' : /\b(401|403)\b/.test(why) ? ' (the key is missing a permission or is wrong)' : /\b429\b/.test(why) ? ' (rate-limited)' : '';
    console.log(`  ✗ every task failed, nothing saved: ${why}${hint}`);
    failedModels.push(`${model}: ${why}${hint}`);
    continue;
  }
  results.runs = results.runs.filter((r) => !(r.model === model && r.taskSetVersion === taskSetVersion));
  results.runs.push(run);
  console.log(`  → SkillBench ${run.score ?? '–'} · bare ${run.bare ?? '–'} · skill lift ${run.lift > 0 ? '+' : ''}${run.lift ?? '–'}`);
}
// A diagnostic --only run covers a few tasks; saving it would replace the model's full run.
if (only.length && !process.argv.includes('--out')) console.log('\n--only: diagnostic run, results not saved (pass --out to save them).');
else { writeFileSync(outPath, JSON.stringify(results, null, 2) + '\n'); console.log(`\nWrote ${outPath}`); }
if (failedModels.length) {
  console.error(`\n${failedModels.length} of ${models.length} model(s) produced no scores:\n  ${failedModels.join('\n  ')}`);
  if (process.env.GITHUB_ACTIONS) for (const f of failedModels) console.log(`::warning::${f}`);
  if (failedModels.length === models.length) process.exit(1);
}
