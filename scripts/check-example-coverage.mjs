// Example-output coverage (product idea #13).
//
// Every skill should carry its own proof — a worked example of the output.
// This reports how many skills have an example-output section, and lists the
// ones that don't, so the field can become part of the standard incrementally
// (report-only by default; --min N fails when coverage is below N%).
//
// Counts headings like "## Example Output", "## Sample Output", "## Worked
// Example". It does NOT count "Example Trigger Phrases" — that's input, not proof.
//
// Usage:  node scripts/check-example-coverage.mjs            # report
//         node scripts/check-example-coverage.mjs --list     # also list skills lacking one
//         node scripts/check-example-coverage.mjs --min 25   # exit 1 below 25% coverage
//         node scripts/check-example-coverage.mjs --selftest

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HEAD = /^#{2,4}\s*(?:example (?:output|deliverable|result)|sample (?:output|deliverable)|worked example|example:)/im;

export function hasExample(md) { return HEAD.test(md); }

export function scan(dir = join(ROOT, 'skills')) {
  const withEx = [], without = [];
  for (const n of readdirSync(dir)) {
    const f = join(dir, n, 'SKILL.md'); if (!existsSync(f)) continue;
    (hasExample(readFileSync(f, 'utf8')) ? withEx : without).push(n);
  }
  return { withEx, without };
}

function selftest() {
  let p = 0, f = 0; const ok = (c, m) => c ? p++ : (f++, console.error('  ✗', m));
  ok(hasExample('## Example Output\n...'), 'counts "Example Output"');
  ok(hasExample('### Worked example\n...'), 'counts "Worked example"');
  ok(!hasExample('## Example Trigger Phrases\n- "x"'), 'does NOT count trigger phrases');
  ok(!hasExample('## Output Format\n...'), 'does NOT count the template');
  console.log(`example-coverage self-test: ${p} passed · ${f} failed`); return f ? 1 : 0;
}

const argv = process.argv.slice(2);
if (argv.includes('--selftest')) process.exit(selftest());
const { withEx, without } = scan();
const total = withEx.length + without.length, pct = total ? Math.round(100 * withEx.length / total) : 0;
console.log(`Example-output coverage: ${withEx.length}/${total} skills (${pct}%) carry a worked example.`);
if (argv.includes('--list')) console.log('Lacking an example:\n  ' + without.sort().join('\n  '));
const mi = argv.indexOf('--min');
if (mi > -1 && pct < Number(argv[mi + 1] || 0)) { console.error(`✗ coverage ${pct}% is below the ${argv[mi + 1]}% floor`); process.exit(1); }
