// Test loader for promptfoo. Reads the library's curated cases
// (evals/cases.json) at run time and turns each one into a promptfoo test, so
// there is no generated file to keep in step. One case per skill today.
//
//   node evals/promptfoo/tests.cjs --selftest     # no network, no promptfoo needed
//   node evals/promptfoo/tests.cjs --count
//
// Narrow a run with environment variables:
//   PF_SKILLS=prd-template,meeting-notes    only these skills
//   PF_MAX=10                               at most this many cases
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..', '..');
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseSkill(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { description: '', body: text };
  const d = m[1].match(/^description:\s*(.*)$/m);
  let description = d ? d[1].trim() : '';
  if (/^".*"$/.test(description) || /^'.*'$/.test(description)) description = description.slice(1, -1);
  return { description, body: text.slice(m[0].length) };
}

function parseList(value) {
  return String(value || '').split(',').map((s) => s.trim()).filter(Boolean);
}

function parseMax(value) {
  if (value === undefined || value === null || String(value).trim() === '') return Infinity;
  const n = Number(value);
  return Number.isInteger(n) && n >= 0 ? n : Infinity;
}

function loadCases(root) {
  const doc = JSON.parse(fs.readFileSync(path.join(root, 'evals', 'cases.json'), 'utf8'));
  return Array.isArray(doc.cases) ? doc.cases : [];
}

function buildTests(root, env) {
  const only = new Set(parseList(env.PF_SKILLS));
  const max = parseMax(env.PF_MAX);
  const tests = [];
  const problems = [];
  for (const c of loadCases(root)) {
    if (tests.length >= max) break;
    if (!c || typeof c.skill !== 'string' || !KEBAB.test(c.skill)) { problems.push(`bad skill name: ${JSON.stringify(c && c.skill)}`); continue; }
    if (typeof c.input !== 'string' || c.input.trim() === '') { problems.push(`${c.skill}: empty input`); continue; }
    if (only.size && !only.has(c.skill)) continue;
    const file = path.join(root, 'skills', c.skill, 'SKILL.md');
    if (!fs.existsSync(file)) { problems.push(`${c.skill}: no SKILL.md`); continue; }
    const skill = parseSkill(fs.readFileSync(file, 'utf8'));
    tests.push({
      description: c.skill,
      vars: { skill: c.skill, description: skill.description, skill_body: skill.body, input: c.input },
      metadata: { skill: c.skill },
    });
  }
  return { tests, problems };
}

function selftest() {
  const results = [];
  const eq = (name, got, want) => results.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });

  eq('frontmatter split', parseSkill('---\nname: a\ndescription: "Use when X. Produces Y."\n---\n\n# A\n'), { description: 'Use when X. Produces Y.', body: '\n# A\n' });
  eq('CRLF frontmatter', parseSkill('---\r\nname: a\r\ndescription: D\r\n---\r\n# A\r\n').description, 'D');
  eq('no frontmatter', parseSkill('# A').body, '# A');
  eq('list parse', parseList(' a, b ,,c '), ['a', 'b', 'c']);
  eq('list empty', parseList(undefined), []);
  eq('max unset is no limit', parseMax(undefined), Infinity);
  eq('max zero is zero', parseMax('0'), 0);
  eq('max text is no limit', parseMax('ten'), Infinity);
  eq('max negative is no limit', parseMax('-1'), Infinity);

  const all = buildTests(ROOT, {});
  eq('every case loads', all.problems, []);
  eq('one test per case', all.tests.length, loadCases(ROOT).length);
  eq('every test has a skill body', all.tests.every((t) => t.vars.skill_body.length > 100), true);
  eq('every test has a description', all.tests.every((t) => t.vars.description.length > 20), true);
  eq('PF_MAX limits', buildTests(ROOT, { PF_MAX: '3' }).tests.length, 3);
  eq('PF_MAX zero gives none', buildTests(ROOT, { PF_MAX: '0' }).tests.length, 0);
  eq('PF_SKILLS filters', buildTests(ROOT, { PF_SKILLS: 'prd-template' }).tests.map((t) => t.description), ['prd-template']);
  eq('unknown skill filter gives none', buildTests(ROOT, { PF_SKILLS: '../x' }).tests.length, 0);

  const failed = results.filter((r) => !r.ok);
  for (const r of failed) console.error(`✗ ${r.name}: got ${JSON.stringify(r.got)}, want ${JSON.stringify(r.want)}`);
  console.log(`promptfoo tests selftest: ${results.length - failed.length} passed · ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

// promptfoo calls this.
module.exports = function generateTests() {
  const { tests, problems } = buildTests(ROOT, process.env);
  if (problems.length) throw new Error(`evals/cases.json has problems:\n  ${problems.join('\n  ')}`);
  return tests;
};

if (require.main === module) {
  if (process.argv.includes('--selftest')) selftest();
  else if (process.argv.includes('--count')) console.log(buildTests(ROOT, process.env).tests.length);
  else console.log('Usage: node evals/promptfoo/tests.cjs --selftest | --count');
}
