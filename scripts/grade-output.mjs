#!/usr/bin/env node
// grade-output — score a piece of prose against the house prose rules
// (docs/prose-style.md): AI tells, effort-word filler, reading level, and
// templated shape. Deterministic and offline by default (no API), so any skill
// or CI step can call it on its own output as a gate. Add --deep for an optional
// LLM pass that flags likely fabricated specificity.
//
//   node scripts/grade-output.mjs draft.md
//   cat draft.md | node scripts/grade-output.mjs
//   node scripts/grade-output.mjs draft.md --json
//   node scripts/grade-output.mjs draft.md --max-tells 3   # exit 1 if over budget (CI gate)
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const has = (n) => args.includes('--' + n);
const arg = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };
const file = args.find((a) => !a.startsWith('--') && a !== arg('max-tells'));

let text = '';
try { text = file ? readFileSync(file, 'utf8') : readFileSync(0, 'utf8'); }
catch { console.error('Provide a file path or pipe text in.'); process.exit(1); }
if (!text.trim()) { console.error('Empty input.'); process.exit(1); }

// --- deterministic tell detection ------------------------------------------
const TELLS = [
  ['ceremonial-opener', /\b(in today's (fast-paced |digital )?world|let'?s dive in|let'?s dive right in|buckle up|in this article,? we(?:'ll| will))\b/gi],
  ['filler-phrase', /\b(it'?s worth noting that|it is important to note that|needless to say|at the end of the day|when it comes to|in order to)\b/gi],
  ['ceremonial-close', /\b(in conclusion|to sum up|to wrap up|all in all)\b/gi],
  ['service-desk', /\b(great question!?|i'?d be happy to|happy to help|certainly!|absolutely!)\b/gi],
  ['effort-word', /\b(leverage|leveraging|robust|seamless(?:ly)?|holistic|myriad|plethora|delve|utilis[e|ing]|utiliz[e|ing]|game-?changer|best-in-class|cutting-edge|unlock(?:ing)? (?:the )?potential|elevate|supercharge|tapestry|realm)\b/gi],
  ['hype-adverb', /\b(revolutioniz|paradigm shift|transform(?:ative|ing) your)\w*/gi],
];
const lines = text.split('\n');
const hits = [];
for (const [kind, re] of TELLS) {
  let m; re.lastIndex = 0;
  while ((m = re.exec(text))) hits.push({ kind, match: m[0] });
}

// Rule-of-three with identical shape: "X, Y, and Z" where items are short & even.
const ruleOfThree = (text.match(/\b(\w+(?:\s\w+){0,2}), (\w+(?:\s\w+){0,2}),? and (\w+(?:\s\w+){0,2})\b/g) || [])
  .filter((s) => { const parts = s.split(/,| and /).map((p) => p.trim().split(/\s+/).length); return Math.max(...parts) - Math.min(...parts) <= 1; });

// Em dash used as parenthetical substitute: " word — word "
const emDash = (text.match(/\w+\s—\s\w+/g) || []).length;

// --- reading level (rough Flesch-Kincaid grade) ----------------------------
const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length || 1;
const words = (text.match(/\b[\w'-]+\b/g) || []);
const syll = (w) => { w = w.toLowerCase().replace(/[^a-z]/g, ''); if (!w) return 0; const g = w.match(/[aeiouy]+/g); let n = g ? g.length : 1; if (w.endsWith('e')) n = Math.max(1, n - 1); return Math.max(1, n); };
const syllables = words.reduce((a, w) => a + syll(w), 0);
const wps = words.length / sentences;
const spw = syllables / (words.length || 1);
const fkGrade = Math.round((0.39 * wps + 11.8 * spw - 15.59) * 10) / 10;

// --- sentence-length uniformity (templated cadence) ------------------------
const sentLens = text.split(/[.!?]+/).map((s) => s.trim().split(/\s+/).filter(Boolean).length).filter((n) => n > 0);
const mean = sentLens.reduce((a, b) => a + b, 0) / (sentLens.length || 1);
const variance = sentLens.reduce((a, b) => a + (b - mean) ** 2, 0) / (sentLens.length || 1);
const stdev = Math.round(Math.sqrt(variance) * 10) / 10;
const uniform = sentLens.length >= 5 && stdev < 4; // low variance = templated cadence

const tellCount = hits.length + ruleOfThree.length;
// Score: start at 5, dock for tells and uniformity.
let score = 5;
score -= Math.min(2.5, tellCount * 0.4);
score -= uniform ? 0.7 : 0;
score -= emDash > 3 ? 0.4 : 0;
score = Math.max(0, Math.round(score * 10) / 10);

const report = {
  score,
  words: words.length,
  readingGrade: fkGrade,
  sentenceLengthStdev: stdev,
  templatedCadence: uniform,
  emDashParenthetical: emDash,
  tells: hits.reduce((acc, h) => { (acc[h.kind] = acc[h.kind] || []).push(h.match); return acc; }, {}),
  ruleOfThree,
  tellCount,
};

if (has('json')) { console.log(JSON.stringify(report, null, 2)); }
else {
  console.log(`\nProse grade: ${score}/5  ·  ${words.length} words  ·  ~grade ${fkGrade} reading level  ·  cadence stdev ${stdev}${uniform ? ' (templated ⚠)' : ''}`);
  if (!tellCount && !uniform) console.log('Clean — no AI tells detected.');
  for (const [kind, arr] of Object.entries(report.tells)) console.log(`  ⚠ ${kind} (${arr.length}): ${[...new Set(arr)].slice(0, 5).join(', ')}`);
  if (ruleOfThree.length) console.log(`  ⚠ rule-of-three cadence (${ruleOfThree.length}): "${ruleOfThree[0]}"`);
  if (emDash > 3) console.log(`  ⚠ ${emDash} em-dash parenthetical substitutes (consider commas/parentheses)`);
  if (uniform) console.log(`  ⚠ sentence lengths are uniform (stdev ${stdev}) — vary where meaning varies`);
  console.log('\nFull standard: docs/prose-style.md · Fix a draft: the notes-humanizer skill.');
}

const budget = arg('max-tells');
if (budget != null && tellCount > Number(budget)) { console.error(`\nFAIL: ${tellCount} tells over budget of ${budget}.`); process.exit(1); }
