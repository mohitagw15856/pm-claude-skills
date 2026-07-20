// prove — paired A/B verification for any SKILL.md: skill-on vs skill-off,
// same tasks, REAL token counts from the API's usage fields, one command.
//
//   pm-claude-skills prove --skill skills/meeting-notes --tasks tasks.txt
//   pm-claude-skills prove --skill ./my-skill --tasks tasks.jsonl --runs 2 --judge
//   pm-claude-skills prove --skill ./my-skill --tasks tasks.txt --dry-run
//
// The honesty rules this tool exists for:
//   - every number in the receipt is a measured api usage figure, never an estimate
//   - single-run results carry a variance warning; --runs 2+ to tighten
//   - the judge (optional, costs extra calls) compares blind with shuffled order
//   - the receipt records the skill's sha256, so a published claim pins its exact text
//
// Costs YOUR key money: it prints the call count and asks (or --yes) before spending.

import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { complete, parseSkill } from './lib/anthropic.mjs';

const BASE_SYSTEM = 'You are a capable professional assistant. Complete the task well.';

function getArg(argv, name) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
}

function loadTasks(file) {
  const raw = readFileSync(file, 'utf8');
  if (file.endsWith('.jsonl')) {
    return raw.split('\n').filter(Boolean).map((l) => {
      const o = JSON.parse(l);
      if (!o.input) throw new Error('each JSONL line needs an "input" field');
      return o.input;
    });
  }
  // plain text / markdown: one task per non-empty line, bullets stripped
  return raw.split('\n').map((l) => l.replace(/^\s*[-*\d.]+\s*/, '').trim()).filter((l) => l.length > 10);
}

function median(xs) {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export async function run(argv) {
  const skillPath = getArg(argv, 'skill');
  const tasksPath = getArg(argv, 'tasks');
  if (!skillPath || !tasksPath || argv.includes('--help')) {
    console.log(`Usage: pm-claude-skills prove --skill <dir|SKILL.md> --tasks <file> [options]

Paired A/B verification: the same tasks run with and without the skill,
token counts taken from the API's real usage fields. Options:
  --runs N       repeats per task per arm (default 1; 2+ recommended)
  --model m      model id (default claude-sonnet-4-6 — same for both arms, always)
  --judge        add a blind judge pass per task pair (extra calls, extra cost)
  --max-tokens N per-response cap (default 2048, same both arms)
  --out FILE     receipt JSON path (default prove-receipt.json)
  --yes          skip the cost confirmation
  --dry-run      print the plan and estimated calls; spend nothing

Tasks file: .jsonl with {"input": "..."} per line, or plain text one task per line.
The receipt pins the skill's sha256 — publish it with your claim.`);
    return skillPath && tasksPath ? 0 : 1;
  }

  const file = statSync(skillPath).isDirectory() ? join(skillPath, 'SKILL.md') : skillPath;
  const skillText = readFileSync(file, 'utf8');
  const { meta, body } = parseSkill(skillText);
  const sha = createHash('sha256').update(skillText).digest('hex').slice(0, 16);
  const tasks = loadTasks(tasksPath);
  const runs = Math.max(1, parseInt(getArg(argv, 'runs') || '1', 10) || 1);
  const model = getArg(argv, 'model') || 'claude-sonnet-4-6';
  const maxTokens = Math.max(256, parseInt(getArg(argv, 'max-tokens') || '2048', 10) || 2048);
  const judge = argv.includes('--judge');
  const outPath = getArg(argv, 'out') || 'prove-receipt.json';

  const pairCalls = tasks.length * runs * 2;
  const judgeCalls = judge ? tasks.length * runs : 0;
  const totalCalls = pairCalls + judgeCalls;

  console.log(`prove: ${meta.name || file} (sha256:${sha}) × ${tasks.length} task(s) × ${runs} run(s)`);
  console.log(`calls: ${pairCalls} paired${judge ? ` + ${judgeCalls} judge` : ''} = ${totalCalls} total on ${model}`);
  if (argv.includes('--dry-run')) {
    tasks.forEach((t, i) => console.log(`  task ${i + 1}: ${t.slice(0, 80)}${t.length > 80 ? '…' : ''}`));
    console.log('dry run — no API calls made, nothing spent.');
    return 0;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY (this runs on your key and your budget).'); return 1; }
  if (totalCalls > 40 && !argv.includes('--yes')) {
    console.error(`${totalCalls} calls exceeds the 40-call guard — re-run with --yes if intended.`);
    return 1;
  }

  const results = [];
  for (let ti = 0; ti < tasks.length; ti++) {
    for (let r = 0; r < runs; r++) {
      const task = tasks[ti];
      process.stdout.write(`task ${ti + 1}/${tasks.length} run ${r + 1}/${runs} … `);
      const off = await complete({ apiKey, model, maxTokens, withUsage: true, system: BASE_SYSTEM, messages: [{ role: 'user', content: task }] });
      const on = await complete({ apiKey, model, maxTokens, withUsage: true, system: `${BASE_SYSTEM}\n\nFollow this skill exactly:\n\n${body}`, messages: [{ role: 'user', content: task }] });
      const row = {
        task: ti + 1, run: r + 1,
        off: { in: off.usage.input_tokens, out: off.usage.output_tokens, stop: off.stopReason },
        on: { in: on.usage.input_tokens, out: on.usage.output_tokens, stop: on.stopReason },
      };
      if (judge) {
        // blind judging: shuffle which response is "1" vs "2" per pair
        const flip = Math.random() < 0.5;
        const [r1, r2] = flip ? [on.text, off.text] : [off.text, on.text];
        const verdictRaw = await complete({
          apiKey, model, maxTokens: 300,
          system: 'You judge which of two responses better completes a task. Answer with strict JSON: {"winner": 1 or 2 or 0, "why": "one sentence"} where 0 means a tie. Judge on task completion, correctness, and usefulness — NOT on length.',
          messages: [{ role: 'user', content: `Task:\n${task}\n\nResponse 1:\n${r1}\n\nResponse 2:\n${r2}` }],
        });
        try {
          const v = JSON.parse(verdictRaw.match(/\{[\s\S]*\}/)[0]);
          row.judge = { winner: v.winner === 0 ? 'tie' : (v.winner === 1) === flip ? 'on' : 'off', why: v.why };
        } catch { row.judge = { winner: 'unparseable', why: verdictRaw.slice(0, 120) }; }
      }
      results.push(row);
      console.log(`off ${row.off.out}t → on ${row.on.out}t${row.judge ? ` · judge: ${row.judge.winner}` : ''}`);
    }
  }

  const outDeltas = results.map((r) => r.on.out - r.off.out);
  const outPct = results.map((r) => r.off.out ? ((r.on.out - r.off.out) / r.off.out) * 100 : 0);
  const skillInputCost = results.map((r) => r.on.in - r.off.in);
  const wins = results.filter((r) => r.judge?.winner === 'on').length;
  const losses = results.filter((r) => r.judge?.winner === 'off').length;
  const ties = results.filter((r) => r.judge?.winner === 'tie').length;

  const receipt = {
    tool: 'pm-claude-skills prove', version: 1, date: new Date().toISOString(),
    skill: { name: meta.name || null, file, sha256_16: sha },
    config: { model, runs, maxTokens, tasks: tasks.length, judge },
    summary: {
      median_output_delta_tokens: median(outDeltas),
      median_output_delta_pct: Math.round(median(outPct) * 10) / 10,
      median_skill_input_overhead_tokens: median(skillInputCost),
      judge: judge ? { skill_wins: wins, skill_losses: losses, ties } : null,
    },
    caveats: [
      'measured on one model with these tasks - claims transfer only that far',
      runs < 2 ? 'single run per task: token counts vary between identical calls; use --runs 2+ before publishing' : null,
      'output-token deltas are not quality: pair with --judge or human review before claiming better',
    ].filter(Boolean),
    results,
  };
  writeFileSync(outPath, JSON.stringify(receipt, null, 2));

  const s = receipt.summary;
  console.log(`\n== prove: ${meta.name || file} ==`);
  console.log(`output tokens: median ${s.median_output_delta_tokens >= 0 ? '+' : ''}${s.median_output_delta_tokens}/response (${s.median_output_delta_pct >= 0 ? '+' : ''}${s.median_output_delta_pct}%) with the skill on`);
  console.log(`input overhead: median +${s.median_skill_input_overhead_tokens} tokens/call (the skill's own text — it rides every request)`);
  if (judge) console.log(`blind judge: skill wins ${wins} · losses ${losses} · ties ${ties} (n=${results.length})`);
  for (const c of receipt.caveats) console.log(`⚠ ${c}`);
  console.log(`receipt: ${outPath} (sha-pinned — publish it with any claim)`);
  console.log(`\nmarkdown for your README:`);
  console.log(`> Verified with [prove](https://github.com/mohitagw15856/pm-claude-skills): output ${s.median_output_delta_pct >= 0 ? '+' : ''}${s.median_output_delta_pct}% tokens, input +${s.median_skill_input_overhead_tokens}t/call${judge ? `, blind-judge ${wins}W/${losses}L/${ties}T` : ''} (n=${results.length}, ${model}, [receipt](./${outPath}))`);
  return 0;
}
