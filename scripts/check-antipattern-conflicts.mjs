#!/usr/bin/env node
// Contradiction sweep over the Anti-Pattern Almanac.
//
// Every skill ends with the mistakes that separate juniors from seniors, and
// the handbook compiles those into ~2,300 rules presented as one coherent body
// of professional judgment. Nothing has ever checked that it *is* coherent.
// With 1153 skills written over months, two of them advising opposite things
// about the same practice is a question of when, not whether — and a
// contradiction inside a corpus that claims to be judgment is worse than a gap.
//
// This runs in two stages, because contradiction is not decidable by string
// matching and pretending otherwise produces a tool that cries wolf:
//
//   1. RECALL (free, offline). Reduce ~18 million possible rule pairs to a few
//      hundred worth looking at, by finding rules where one forbids roughly
//      what another prescribes. This stage over-generates on purpose — most of
//      what it returns is two skills loudly agreeing, because "do not close
//      without named owners" and "every item needs a named owner" share every
//      distinctive word while saying the same thing.
//   2. JUDGE (--judge, costs tokens). An LLM reads each candidate pair and
//      rules agree / contradict / unrelated. This is the stage that produces
//      findings; stage 1 only produces a shortlist.
//
// Run stage 1 alone and you get a reading list, not a verdict. That is stated
// in the output rather than left for someone to discover.
//
//   node scripts/check-antipattern-conflicts.mjs              # top candidates
//   node scripts/check-antipattern-conflicts.mjs --all        # every candidate
//   node scripts/check-antipattern-conflicts.mjs --json
//   node scripts/check-antipattern-conflicts.mjs --min 3      # score floor
//   ANTHROPIC_API_KEY=… node scripts/check-antipattern-conflicts.mjs --judge
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const has = (f) => process.argv.includes(f);
const arg = (f, d) => { const i = process.argv.indexOf(f); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const MIN = Number(arg('--min', '2')) || 2;

// ── Extract the rules, exactly as build-handbook.mjs does ────────────────────
const rules = [];
for (const name of readdirSync(skillsDir).sort()) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file)) continue;
  const body = readFileSync(file, 'utf8');
  if (/^deprecated:/m.test(body.split('---')[1] || '')) continue; // retired rules are not live advice
  const anti = (body.match(/##\s*Anti-Patterns\s*\n([\s\S]*?)(?=\n##\s|$)/i) || [])[1] || '';
  for (const line of anti.split('\n')) {
    const t = line.replace(/^-\s*\[\s*\]\s*/, '').replace(/^-\s*/, '').trim();
    if (t.length > 12) rules.push({ skill: name, text: t.replace(/\*\*/g, '') });
  }
}

// ── Split each rule into what it forbids and what it prescribes ─────────────
// Every line in an Anti-Patterns section is already a prohibition, so polarity
// is not a property of the rule — it is a property of each *half* of it.
// "Restating the error instead of explaining it" forbids restating AND
// prescribes explaining, and an earlier version of this script read those two
// halves as two rules pointing opposite ways, which made almost every
// candidate a pair of skills loudly agreeing with each other.
//
// A real contradiction is therefore: skill A forbids X, while skill B
// prescribes X.
// Words that appear in every other rule tell you nothing about what one is
// *about*, so they cannot support a claim that two rules concern the same thing.
const STOP = new Set(`a an the of for and to or in on with without use used using when
what how why who where this that these those it its is are be been being do does did not
your you their they them he she we our us i me my but if then than so such as at by from
into onto over under out up down off about across after before during while because
never avoid stop skip only just also more most less least very really actually
one two three first second next last other another same different new old good bad
thing things way ways time times people person work working make makes making get gets
which whom whose can could should would will shall may might must
instead rather even still yet already always often usually rarely sometimes
writing written write writes reading read reads doing done`.split(/\s+/).filter(Boolean));

const subject = (t) => new Set(
  String(t || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/)
    .filter((w) => w.length > 3 && !STOP.has(w))
    .map((w) => w.replace(/(ing|ies|ers|er|ed|s)$/, ''))
    .filter((w) => w.length > 2),
);

const SPLIT = [
  /^(.*?)\s+instead of\s+(.*)$/i,          // forbids ← | → prescribes
  /^(?:do not|don't|never|avoid)\s+(.*?)\s*[—–:.-]\s*(.*)$/i,
  /^(.*?)\s+rather than\s+(.*)$/i,
  /^(.*?)\s+when you should\s+(.*)$/i,
];
const PRESCRIBE_ONLY = /^(?:failing to|forgetting to|omitting|not |no |skipping|neglecting|ignoring|leaving out|missing)\s*(.*)$/i;

function halves(t) {
  const clean = t.replace(/^(?:do not|don't|never|avoid)\s+/i, (m) => m).trim();
  for (const re of SPLIT) {
    const m = clean.match(re);
    if (m && m[1] && m[2]) return { forbids: m[1], prescribes: m[2] };
  }
  const p = clean.match(PRESCRIBE_ONLY);
  // "Failing to X" forbids the omission, which is the same as prescribing X.
  if (p && p[1]) return { forbids: '', prescribes: p[1] };
  // "…until/without/unless Y" embeds a requirement: Y is prescribed, not
  // forbidden. Without this, every "do not ship without tests" reads as
  // forbidding tests, and the report fills with skills agreeing.
  const embedded = clean.match(/^(.*?)\s+(?:until|without|unless|before)\s+(.*)$/i);
  if (embedded) return { forbids: embedded[1], prescribes: embedded[2] };
  return { forbids: clean, prescribes: '' };
}

for (const r of rules) {
  const h = halves(r.text);
  r.forbids = subject(h.forbids);
  r.prescribes = subject(h.prescribes);
  r.subject = subject(r.text);
}

// ── Pair A-forbids-X against B-prescribes-X ─────────────────────────────────
const df = new Map();
for (const r of rules) for (const w of r.subject) df.set(w, (df.get(w) || 0) + 1);
const RARE = (w) => (df.get(w) || 0) <= rules.length * 0.02;

const byPrescribed = new Map();
for (const r of rules) {
  for (const w of r.prescribes) {
    if (!RARE(w)) continue;
    if (!byPrescribed.has(w)) byPrescribed.set(w, []);
    byPrescribed.get(w).push(r);
  }
}

const seen = new Set();
const candidates = [];
for (const a of rules) {
  if (!a.forbids.size) continue;
  const pool = new Map();
  for (const w of a.forbids) {
    if (!RARE(w)) continue;
    for (const b of byPrescribed.get(w) || []) {
      if (b.skill === a.skill) continue;
      pool.set(b, (pool.get(b) || 0) + 1);
    }
  }
  for (const [b, overlap] of pool) {
    if (overlap < MIN) continue;
    const key = `${a.skill}|${a.text}##${b.skill}|${b.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const shared = [...a.forbids].filter((w) => b.prescribes.has(w) && RARE(w)).sort();
    candidates.push({ score: shared.length, shared, a, b });
  }
}
candidates.sort((x, y) => y.score - x.score);

// ── Stage 2: adjudicate ─────────────────────────────────────────────────────
let judged = null;
if (has('--judge')) {
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) { console.error('--judge needs ANTHROPIC_API_KEY.'); process.exit(1); }
  const model = arg('--model', 'claude-haiku-4-5-20251001');
  const pool = candidates.slice(0, Number(arg('--limit', '120')) || 120);
  console.error(`Judging ${pool.length} candidate pair(s) with ${model}…`);
  judged = [];
  const BATCH = 15;
  for (let i = 0; i < pool.length; i += BATCH) {
    const chunk = pool.slice(i, i + BATCH);
    const payload = chunk.map((c, k) => ({
      id: i + k,
      rule_a: { skill: c.a.skill, rule: c.a.text },
      rule_b: { skill: c.b.skill, rule: c.b.text },
    }));
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model, max_tokens: 4096,
          system: `You judge whether two rules of professional practice contradict each other.
Both rules come from "Anti-Patterns" sections, so both describe things NOT to do.
For each pair return one of:
  "agree"       — they advise the same thing, possibly in different words
  "contradict"  — following one would violate the other, in a context where both could apply
  "unrelated"   — they share vocabulary but concern different subjects
Two skills addressing different contexts (different professions, audiences, or stages) are NOT contradicting; say unrelated.
Reply with ONLY a JSON array of {id, verdict, why} where why is at most 20 words.`,
          messages: [{ role: 'user', content: JSON.stringify(payload) }],
        }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error?.message || res.status);
      const text = (j.content?.[0]?.text || '').trim();
      const parsed = JSON.parse(text.slice(text.indexOf('['), text.lastIndexOf(']') + 1));
      for (const v of parsed) {
        const c = candidates[v.id];
        if (c) judged.push({ ...v, a: c.a, b: c.b });
      }
    } catch (e) { console.error(`  batch ${i / BATCH + 1} failed: ${e.message}`); }
  }
  const contradictions = judged.filter((v) => v.verdict === 'contradict');
  const counts = judged.reduce((m, v) => ((m[v.verdict] = (m[v.verdict] || 0) + 1), m), {});
  if (has('--json')) {
    console.log(JSON.stringify({ rules: rules.length, counts, contradictions: contradictions.map((v) => ({ why: v.why, a: { skill: v.a.skill, rule: v.a.text }, b: { skill: v.b.skill, rule: v.b.text } })) }, null, 2));
  } else {
    console.log(`\nJudged ${judged.length}: ${Object.entries(counts).map(([k, n]) => `${n} ${k}`).join(' · ')}\n`);
    if (!contradictions.length) console.log('No contradictions found in the corpus. ✓');
    for (const v of contradictions) {
      console.log(`  ✗ ${v.why}`);
      console.log(`      ${v.a.skill}: ${v.a.text.slice(0, 130)}`);
      console.log(`      ${v.b.skill}: ${v.b.text.slice(0, 130)}\n`);
    }
  }
  process.exit(0);
}

const shown = has('--all') ? candidates : candidates.slice(0, 25);

if (has('--json')) {
  console.log(JSON.stringify({
    rules: rules.length,
    skillsWithRules: new Set(rules.map((r) => r.skill)).size,
    candidates: shown.map((c) => ({
      score: c.score, shared: c.shared,
      forbids: { skill: c.a.skill, rule: c.a.text },
      prescribes: { skill: c.b.skill, rule: c.b.text },
    })),
  }, null, 2));
} else {
  console.log(`Anti-pattern corpus — ${rules.length} rules across ${new Set(rules.map((r) => r.skill)).size} skills`);
  console.log(`${candidates.length} contradiction candidate(s) at >= ${MIN} shared distinctive term(s)\n`);
  for (const c of shown) {
    console.log(`  [${c.score}] ${c.shared.join(', ')}`);
    console.log(`      forbids     ${c.a.skill}: ${c.a.text.slice(0, 130)}`);
    console.log(`      prescribes  ${c.b.skill}: ${c.b.text.slice(0, 130)}\n`);
  }
  if (!has('--all') && candidates.length > shown.length) {
    console.log(`… ${candidates.length - shown.length} more — pass --all to see them.`);
  }
  console.log('Stage 1 only — these are a shortlist, NOT findings. Most pairs here are');
  console.log('two skills agreeing in different words. Run with --judge (needs an API');
  console.log('key) to have each pair adjudicated, or read them yourself.');
}
