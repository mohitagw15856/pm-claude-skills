#!/usr/bin/env node
// Skill duplication detector.
//
// A library this size stops being able to see itself. Authors add a skill that
// already exists under a different noun — `security-threat-model` next to
// `threat-model`, `debt-payoff` next to `debt-payoff-plan` — because searching
// 1000+ folders for a synonym is harder than writing the file. This finds those
// pairs mechanically so review does not have to.
//
// Two signals, either of which flags a pair:
//   * a weighted Jaccard over the identity (folder name plus H1 title) and the
//     description. Identity carries the weight — two skills that describe
//     similar work are common and fine; two skills *named* the same thing are
//     the actual defect.
//   * containment — one skill's identity tokens are a subset of the other's.
//     This is the classic accretion pattern (`threat-model` inside
//     `security-threat-model`, `youtube-script` inside `youtube-script-writer`)
//     and it survives however differently the two descriptions are worded.
//
// Intentional near-neighbours are declared, not guessed:
//   * variant families — `<skill>-live` is the connector-backed twin of
//     `<skill>` by design, so a pair separated only by a known suffix is exempt
//   * skill-dupes-allow.json — pairs a human reviewed and kept, each with a
//     reason, so the exemption is a decision on the record rather than a
//     threshold nobody dares raise
//
//   node scripts/skill-dupes.mjs                  # report, human-readable
//   node scripts/skill-dupes.mjs --json           # machine-readable
//   node scripts/skill-dupes.mjs --check          # exit 1 on undeclared pairs
//   node scripts/skill-dupes.mjs --threshold 0.5  # widen the net
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const allowFile = join(root, 'skill-dupes-allow.json');

const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  if (i < 0) return fallback;
  const v = process.argv[i + 1];
  return v === undefined || v.startsWith('--') ? fallback : v;
};
const has = (flag) => process.argv.includes(flag);

const THRESHOLD = (() => {
  const raw = arg('--threshold', '0.6');
  const n = Number(raw);
  // Guard the falsy-zero and NaN cases explicitly; a bad flag must not silently
  // become a threshold of 0 and flag all ~600k pairs.
  if (!Number.isFinite(n) || n <= 0 || n > 1) {
    console.error(`--threshold must be a number in (0, 1]; got ${JSON.stringify(raw)}`);
    process.exit(2);
  }
  return n;
})();

// Suffixes that mark a deliberate variant of an existing skill rather than a
// copy of it. Keep this list short — every entry is a licence to duplicate.
const VARIANT_SUFFIXES = ['-live'];

// Words that carry no disambiguating signal in this library: every other skill
// is a "structured guide that produces a plan when asked".
const STOP = new Set(`a an the of for and to or in on with without use used when asked produces
produce structured complete create creates write writes writing plan planning skill claude any that
this it is from into by as at your you build building make makes get gets one two guide template
what how why who where new real live full quick simple based per via about across after before
document documents doc output outputs format formats section sections step steps run runs`.split(/\s+/).filter(Boolean));

// Two-character tokens are kept deliberately: `ai`, `pr`, `qa`, `hr` are the
// most disambiguating words in several of these names, and dropping them makes
// `pr-description-writer` look like a subset of `job-description-writer`.
const tokens = (s) => new Set(
  String(s || '').toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/)
    .filter((t) => t.length > 1 && !STOP.has(t))
    // Crude stem so plan/plans/planning collapse, but never down to a stub that
    // would collide with an unrelated short word.
    .map((t) => { const st = t.replace(/(ing|ers|er|ed|s)$/, ''); return st.length >= 3 ? st : t; })
    .filter(Boolean),
);

// True when every token of `small` appears in `big` and `small` is not trivial.
const subset = (small, big) => {
  if (small.size < 2 || small.size >= big.size) return false;
  for (const t of small) if (!big.has(t)) return false;
  return true;
};

const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const t of a) if (b.has(t)) inter++;
  return inter / (a.size + b.size - inter);
};

function parseFrontmatter(text) {
  // Same tolerance as bin/skillcheck.mjs: leading whitespace and CRLF must not
  // produce a false negative on a file authored on Windows.
  const m = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    meta[kv[1]] = v;
  }
  return { meta, body: m[2] };
}

// ── Load the library ─────────────────────────────────────────────────────────
const skills = [];
for (const name of readdirSync(skillsDir).sort()) {
  const file = join(skillsDir, name, 'SKILL.md');
  if (!existsSync(file) || !statSync(join(skillsDir, name)).isDirectory()) continue;
  const { meta, body } = parseFrontmatter(readFileSync(file, 'utf8'));
  const title = (body.split(/\r?\n/).find((l) => /^#\s+\S/.test(l)) || '').replace(/^#\s+/, '').trim();
  // A retired skill is not a duplicate of the skill that replaced it — that is
  // the whole point of the tombstone. See docs/DEPRECATION.md.
  if (meta.deprecated) continue;
  skills.push({
    name,
    title: title || name,
    description: meta.description || '',
    identity: tokens(`${name} ${title}`),
    desc: tokens(meta.description || ''),
  });
}

// ── Declared exemptions ──────────────────────────────────────────────────────
const key = (a, b) => [a, b].sort().join(' <-> ');
const allow = new Map();
if (existsSync(allowFile)) {
  const raw = JSON.parse(readFileSync(allowFile, 'utf8'));
  for (const entry of raw.pairs || []) allow.set(key(entry.a, entry.b), entry.reason || '');
}

const isVariantPair = (a, b) => VARIANT_SUFFIXES.some((sfx) => a === b + sfx || b === a + sfx);

// ── Compare ──────────────────────────────────────────────────────────────────
const pairs = [];
for (let i = 0; i < skills.length; i++) {
  for (let j = i + 1; j < skills.length; j++) {
    const a = skills[i];
    const b = skills[j];
    if (isVariantPair(a.name, b.name)) continue;
    const idScore = jaccard(a.identity, b.identity);
    if (idScore < 0.3) continue; // cheap gate before the costlier blend
    const score = idScore * 0.75 + jaccard(a.desc, b.desc) * 0.25;
    // Containment: every distinguishing word of one skill appears in the other,
    // so the smaller is a strict special case of the larger — or a duplicate of
    // it. Require 2+ tokens so short generic names do not swamp the report.
    const contained = subset(a.identity, b.identity) || subset(b.identity, a.identity);
    if (score < THRESHOLD && !contained) continue;
    pairs.push({
      a: a.name,
      b: b.name,
      score: Math.round(score * 100) / 100,
      identity: Math.round(idScore * 100) / 100,
      signal: contained ? 'containment' : 'similarity',
      allowed: allow.has(key(a.name, b.name)),
      reason: allow.get(key(a.name, b.name)) || null,
    });
  }
}
pairs.sort((x, y) => y.score - x.score || x.a.localeCompare(y.a) || x.b.localeCompare(y.b));

const undeclared = pairs.filter((p) => !p.allowed);

if (has('--json')) {
  console.log(JSON.stringify({ threshold: THRESHOLD, scanned: skills.length, pairs }, null, 2));
} else {
  console.log(`Skill dupes — ${skills.length} skills · threshold ${THRESHOLD} · ${pairs.length} pair(s), ${undeclared.length} undeclared\n`);
  for (const p of pairs) {
    const tag = p.signal === 'containment' ? '⊂' : ' ';
    console.log(`  ${p.allowed ? '✓' : '✗'} ${tag} ${String(p.score).padEnd(5)} ${p.a} <-> ${p.b}${p.reason ? `\n          ↳ ${p.reason}` : ''}`);
  }
  if (undeclared.length) {
    console.log(`\n${undeclared.length} undeclared pair(s). Either merge them, or add to skill-dupes-allow.json with a reason.`);
  } else {
    console.log('\nNo undeclared duplicate pairs. ✓');
  }
}

if (has('--check') && undeclared.length) process.exit(1);
