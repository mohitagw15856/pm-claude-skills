#!/usr/bin/env node
// Prompt audit: find skill text written for older models.
//
// Prompts are fitted to a model generation. Text that an older model needed
// (shouted emphasis, "think step by step", a named model version, long runs of
// prohibitions) is read literally by current models and tends to make output
// more rigid, not better. This script scans every skills/*/SKILL.md for the
// greppable signals of those patterns and ranks the skills worth a human look.
//
// It finds candidates. It does not prove a line is harmful: removing an
// instruction is a hypothesis to test by running the skill before and after.
// The one pattern treated as a defect is a named model version, because that is
// a fact that has simply gone stale; --check fails on it.
//
//   node scripts/prompt-audit.mjs              summary to the terminal
//   node scripts/prompt-audit.mjs --write      also write docs/PROMPT-AUDIT.md
//   node scripts/prompt-audit.mjs --json       machine-readable findings
//   node scripts/prompt-audit.mjs --check      exit 1 if any skill names a model version
//   node scripts/prompt-audit.mjs --skill x    one skill, every finding with its line
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const has = (f) => process.argv.includes(f);
const opt = (f) => { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : ''; };

// Each pattern: what it is, why it matters now, how sure a match is, and its weight in the ranking.
const PATTERNS = [
  { id: 'model-version', weight: 10, confidence: 'high', defect: true,
    label: 'Names a model version',
    why: 'A version in the text goes stale at the next release and tells readers the skill is tied to it. Describe the capability needed instead.',
    re: /\b(?:Claude\s+)?(?:Opus|Sonnet|Haiku|Fable)\s+\d(?:\.\d)?\b|\bclaude-(?:\d|opus|sonnet|haiku|fable)[\w.-]*|\bGPT-?\d(?:\.\d)?\w*\b|\bGemini\s+\d(?:\.\d)?\b/gi,
    // A skill about choosing or comparing models names them on purpose.
    exempt: (name) => /model|llm|token|prompt|benchmark|migration|agent|eval|ai-|local-|router|fine-?tun|cost/.test(name) },
  { id: 'shouting', weight: 2, confidence: 'medium',
    label: 'Emphasis in capitals',
    why: 'Current models follow the system prompt closely, so MUST and NEVER in capitals over-apply. State the constraint at normal volume with its reason.',
    re: /\b(?:MUST(?: NOT)?|NEVER|ALWAYS|CRITICAL|IMPORTANT|DO NOT|MANDATORY|ABSOLUTELY)\b|!!+/g, threshold: 4 },
  { id: 'scaffold', weight: 4, confidence: 'high',
    label: 'Reasoning scaffold',
    why: 'Thinking is built in and steered by effort. "Think step by step" and scratchpad tags add nothing and can leak into output.',
    re: /think(?:ing)? step[- ]by[- ]step|take a deep breath|<\/?(?:scratchpad|thinking)>|don'?t overthink|think (?:harder|carefully) (?:before|about)/gi },
  { id: 'role-only', weight: 2, confidence: 'medium',
    label: 'Generic role opener',
    why: 'A role line is fine when it carries context. "You are an expert" with nothing specific after it adds no information.',
    re: /^You are (?:a|an) (?:helpful|expert|world-class|experienced|professional|senior)\b[^.\n]{0,60}\.?$/gim },
  { id: 'recap', weight: 1, confidence: 'low',
    label: 'Scattered repetition',
    why: '"Remember," and "As stated above" usually mark an instruction given twice. One clear statement is followed; repeats read as extra weight.',
    re: /^(?:[-*]\s*)?(?:Remember[,:]|Again[,:]|As (?:stated|mentioned|noted) (?:above|earlier)|Once again)\b/gim },
  { id: 'hedge', weight: 1, confidence: 'low',
    label: 'Hedged requirement',
    why: '"Try to" and "if possible" are read literally as permission to skip. If it is required, say so; if it is optional, say when.',
    re: /\b(?:try to|if possible|ideally,|where possible|as much as possible)\b/gi, threshold: 3 },
  { id: 'prohibition-run', weight: 2, confidence: 'low',
    label: 'Long run of prohibitions outside Anti-Patterns',
    why: 'Three or more consecutive "Do not" lines in the method describe the fence, not the goal. Say what good looks like. The Anti-Patterns section is the house standard and is not counted.',
    custom: 'prohibitionRun' },
  { id: 'length', weight: 1, confidence: 'low',
    label: 'Very long skill',
    why: 'A skill that cannot be read in one sitting usually over-specifies the method. Length alone is not a fault: check what the extra text is doing.',
    custom: 'length', threshold: 450 },
];

const stripFrontmatter = (md) => { const m = md.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/); return m ? { body: md.slice(m[0].length), offset: m[0].split(/\r?\n/).length - 1, front: m[0] } : { body: md, offset: 0, front: '' }; };

// Text inside fenced code and inside the Anti-Patterns, Example Trigger Phrases and
// output-template sections is content the skill produces or quotes, not instruction.
function instructionLines(body) {
  const out = [];
  let fence = false, section = '';
  body.split(/\r?\n/).forEach((line, i) => {
    if (/^\s*```/.test(line)) { fence = !fence; return; }
    const h = line.match(/^#{2,3}\s+(.*)$/);
    if (h) section = h[1].toLowerCase();
    if (fence) return;
    out.push({ n: i + 1, line, section });
  });
  return out;
}
const QUOTED = /anti-?pattern|example trigger|trigger phrases/;

function audit(name) {
  const md = readFileSync(join(root, 'skills', name, 'SKILL.md'), 'utf8');
  const { body, offset, front } = stripFrontmatter(md);
  const lines = instructionLines(body);
  const findings = [];
  const add = (p, n, text) => findings.push({ pattern: p.id, line: n + offset, text: text.trim().slice(0, 140) });

  for (const p of PATTERNS) {
    if (p.exempt && p.exempt(name)) continue;
    if (p.custom === 'length') {
      const total = md.split(/\r?\n/).length;
      if (total > p.threshold) findings.push({ pattern: p.id, line: 1, text: `${total} lines` });
      continue;
    }
    if (p.custom === 'prohibitionRun') {
      let run = [];
      const flush = () => { if (run.length >= 3) add(p, run[0].n, `${run.length} consecutive prohibitions, starting: ${run[0].line}`); run = []; };
      for (const l of lines) {
        if (QUOTED.test(l.section)) { flush(); continue; }
        if (/^\s*(?:[-*]|\d+[.)])?\s*\**(?:Do not|Don't|Never|Avoid)\b/i.test(l.line)) run.push(l); else if (l.line.trim()) flush();
      }
      flush();
      continue;
    }
    const hits = [];
    // The description is trigger text: model names there are stale facts too, but capitals are not judged.
    if (p.id === 'model-version') for (const m of front.matchAll(p.re)) hits.push({ n: front.slice(0, m.index).split(/\r?\n/).length - offset, text: m[0] });
    for (const l of lines) {
      if (QUOTED.test(l.section) && p.id !== 'model-version') continue;
      for (const m of l.line.matchAll(p.re)) hits.push({ n: l.n, text: p.id === 'model-version' ? `${m[0]}: ${l.line}` : l.line });
    }
    if (hits.length >= (p.threshold || 1)) {
      const seen = new Set();
      for (const h of hits) { const k = h.n + '|' + p.id; if (!seen.has(k)) { seen.add(k); add(p, h.n, h.text); } }
    }
  }
  const score = findings.reduce((s, f) => s + PATTERNS.find((p) => p.id === f.pattern).weight, 0);
  return { name, score, findings };
}

const only = opt('--skill');
const names = readdirSync(join(root, 'skills')).filter((n) => existsSync(join(root, 'skills', n, 'SKILL.md')) && (!only || n === only)).sort();
if (only && !names.length) { console.error(`No skill called "${only}".`); process.exit(2); }
const results = names.map(audit);
const flagged = results.filter((r) => r.findings.length).sort((a, b) => b.score - a.score || (a.name < b.name ? -1 : 1));
const byPattern = Object.fromEntries(PATTERNS.map((p) => [p.id, { skills: 0, findings: 0 }]));
for (const r of flagged) for (const id of new Set(r.findings.map((f) => f.pattern))) { byPattern[id].skills++; byPattern[id].findings += r.findings.filter((f) => f.pattern === id).length; }
const defects = flagged.filter((r) => r.findings.some((f) => PATTERNS.find((p) => p.id === f.pattern).defect));

if (has('--json')) { console.log(JSON.stringify({ scanned: names.length, flagged: flagged.length, byPattern, results: flagged }, null, 2)); process.exit(0); }

if (only) {
  const r = results[0];
  if (!r.findings.length) console.log(`${r.name}: no dated patterns found.`);
  for (const f of r.findings) console.log(`skills/${r.name}/SKILL.md:${f.line}  [${f.pattern}]  ${f.text}`);
  process.exit(0);
}

const table = PATTERNS.map((p) => `| ${p.label} | ${p.confidence} | ${byPattern[p.id].skills} | ${byPattern[p.id].findings} | ${p.why} |`).join('\n');
if (has('--write')) {
  const top = flagged.slice(0, 40).map((r) => {
    const kinds = [...new Set(r.findings.map((f) => PATTERNS.find((p) => p.id === f.pattern).label))].join('; ');
    const first = r.findings[0];
    return `| [${r.name}](../skills/${r.name}/SKILL.md) | ${r.score} | ${kinds} | line ${first.line} |`;
  }).join('\n');
  const doc = `# Prompt audit: skill text written for older models

Generated by \`node scripts/prompt-audit.mjs --write\`. Do not edit by hand.

Prompts are fitted to a model generation. Text an older model needed, such as shouted emphasis, reasoning scaffolds, a named model version or long runs of prohibitions, is read literally by current models and tends to make output more rigid. This report lists where those patterns appear in the library so a person can look.

**${names.length} skills scanned, ${flagged.length} with at least one signal, ${defects.length} naming a model version.**

## How to read this

A match is a candidate, not a verdict. The scanner cannot tell an instruction that still earns its place from one that has outlived its model, and length is never a reason to delete. Before removing a line, run the skill on a real input with and without it and compare. Three things are deliberately not flagged: the Anti-Patterns section (the house standard, and prohibitions against known failures are worth keeping), text inside code fences and example trigger phrases, and skills whose subject is models or prompting.

The one pattern treated as a defect is a named model version. It is a stale fact, not a judgment call, so \`node scripts/prompt-audit.mjs --check\` fails on it and it runs in \`npm run check\`.

## Patterns

| Pattern | Confidence | Skills | Findings | Why it matters on current models |
|---|---|---|---|---|
${table}

## Skills to look at first

Ranked by weighted signals. See every finding for a skill with \`node scripts/prompt-audit.mjs --skill <name>\`.

| Skill | Score | Signals | First finding |
|---|---|---|---|
${top}

## What to do with a finding

1. Read the line in context. Ask whether the model could already know it. Keep what only the author knows: the audience, the quality bar, the reason behind a constraint.
2. For emphasis in capitals, rewrite at normal volume and add the reason. Do not simply delete the rule.
3. For a hedge, decide whether the thing is required. Say so plainly either way.
4. For a run of prohibitions in the method, try stating what a good result looks like, and keep the prohibitions that guard against a failure you have seen.
5. Test the change on a real input before and after. Removal is a hypothesis.
6. Run this audit again when the model line-up changes. The registry is \`data/models.json\`.
`;
  writeFileSync(join(root, 'docs', 'PROMPT-AUDIT.md'), doc);
  console.log('Wrote docs/PROMPT-AUDIT.md');
}

if (has('--check')) {
  for (const r of defects) for (const f of r.findings.filter((x) => x.pattern === 'model-version')) console.error(`  ✗ skills/${r.name}/SKILL.md:${f.line} names a model version (${f.text.slice(0, 60)}). Describe the capability needed instead.`);
  if (defects.length) process.exit(1);
  console.log(`prompt audit: no skill names a model version ✓  (${flagged.length} of ${names.length} skills carry softer signals; see docs/PROMPT-AUDIT.md)`);
  process.exit(0);
}

console.log(`Prompt audit: ${names.length} skills scanned, ${flagged.length} with at least one signal.\n`);
for (const p of PATTERNS) console.log(`  ${String(byPattern[p.id].skills).padStart(4)} skills  ${p.label} (${p.confidence} confidence)`);
console.log('\nTop 10:');
for (const r of flagged.slice(0, 10)) console.log(`  ${String(r.score).padStart(3)}  ${r.name}`);
