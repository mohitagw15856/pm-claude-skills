#!/usr/bin/env node
// SkillCheck — validate SKILL.md files against the authoring standard.
//
// This is the same validator that keeps 1,099 skills in this repo honest, made
// to run against anybody's skills directory. Skill authoring is a new enough
// craft that most of the mistakes are the same handful, and all of them are
// cheap to catch: a description with no trigger clause, a frontmatter name that
// does not match its folder, template placeholder text nobody deleted.
//
//   npx pm-claude-skills skillcheck                 # ./skills, or wherever it finds them
//   npx pm-claude-skills skillcheck --dir .claude/skills
//   npx pm-claude-skills skillcheck --strict        # warnings fail too
//   npx pm-claude-skills skillcheck --json          # machine-readable
//   npx pm-claude-skills skillcheck --annotate      # inline GitHub PR annotations
//
// No dependencies. Exit code 1 when something failed, which is what makes it
// usable as a CI gate.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

const strict = has('strict');
const asJson = has('json');
// GitHub sets CI=true; annotating there by default is what most people want,
// and it is harmless anywhere else because the lines are just text.
const annotate = has('annotate') || (process.env.GITHUB_ACTIONS === 'true' && !has('no-annotate'));

// --- finding the skills -------------------------------------------------------
// Layouts differ. Guessing badly is worse than saying what was searched, so if
// nothing turns up the error lists every place it looked.
const CANDIDATES = ['skills', '.claude/skills', 'src/skills', '.'];

function findSkillsDir() {
  const explicit = flag('dir');
  // An explicit --dir that does not exist is a typo, and the friendly message
  // below is far more use than a raw ENOENT stack trace out of readdir.
  if (explicit) return existsSync(resolve(explicit)) ? resolve(explicit) : null;
  for (const c of CANDIDATES) {
    const dir = resolve(c);
    if (!existsSync(dir)) continue;
    const hit = readdirSync(dir).some(
      (n) => statSync(join(dir, n)).isDirectory() && existsSync(join(dir, n, 'SKILL.md'))
    );
    if (hit) return dir;
  }
  return null;
}

// --- the standard -------------------------------------------------------------

function parseFrontmatter(text) {
  // Tolerate leading whitespace and CRLF so a file authored on Windows does not
  // produce a false negative.
  const m = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: null, body: text, lines: {} };
  const meta = {};
  const lines = {};
  const head = m[1].split(/\r?\n/);
  head.forEach((line, i) => {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (!kv) return;
    let v = kv[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    meta[kv[1]] = v;
    lines[kv[1]] = i + 2; // +1 for the opening ---, +1 for 1-indexing
  });
  return { meta, body: m[2], lines };
}

function checkSkill(skillsDir, name) {
  const errors = [];
  const warnings = [];
  const file = join(skillsDir, name, 'SKILL.md');
  const at = (line, msg) => ({ line, msg });

  if (!existsSync(file)) {
    errors.push(at(1, 'No SKILL.md in folder.'));
    return { name, file, errors, warnings };
  }

  const text = readFileSync(file, 'utf8');
  const { meta, body, lines } = parseFrontmatter(text);

  if (!meta) {
    errors.push(at(1, 'Missing or malformed YAML frontmatter (--- name/description ---).'));
    return { name, file, errors, warnings };
  }

  if (!meta.name) errors.push(at(1, 'Frontmatter is missing `name`.'));
  else if (meta.name !== name)
    errors.push(at(lines.name ?? 1, `Frontmatter name "${meta.name}" does not match folder "${name}".`));

  if (!meta.description) {
    errors.push(at(1, 'Frontmatter is missing `description`.'));
  } else {
    const d = meta.description;
    const dl = lines.description ?? 1;
    // Placeholder wording from every scaffolder that writes a SKILL.md. The
    // bracketed forms and "Summarise what X does in one line" come from
    // scripts/new-bundle.mjs, whose stubs previously passed this check — so a
    // freshly scaffolded, entirely unwritten bundle validated green.
    if (/your-skill-name|one sentence\.|trigger condition|output description|\[trigger phrases|\[the concrete artifact\]|summarise what .{0,40} does in one line|\bTODO\b/i.test(d))
      errors.push(at(dl, 'Description still contains template placeholder text.'));
    // The trigger clause is the single highest-value line in a skill: it is what
    // a model matches on when deciding whether this skill applies at all.
    if (!/\buse when\b/i.test(d)) warnings.push(at(dl, 'Description has no "Use when …" trigger clause.'));
    if (!/\bproduce(s|d)?\b/i.test(d)) warnings.push(at(dl, 'Description does not state what it Produces.'));
    if (d.length < 40) warnings.push(at(dl, `Description is very short (${d.length} chars).`));
    if (d.length > 700)
      warnings.push(at(dl, `Description is very long (${d.length} chars) — trim for the trigger budget.`));
  }

  const trimmed = body.trim();
  const bodyLine = text.split(/\r?\n/).findIndex((l, i) => i > 2 && l.trim().startsWith('#')) + 1 || 1;

  if (!/^#\s+.+/m.test(trimmed)) errors.push(at(bodyLine, 'Body has no top-level `# Title` heading.'));
  if (/\[Instructions for Claude to follow/i.test(trimmed))
    errors.push(at(bodyLine, 'Body still contains the template stub line.'));
  if (trimmed.length < 300)
    warnings.push(at(bodyLine, `Body is very short (${trimmed.length} chars) for a reusable skill.`));
  if (!/^#{2,3}\s+.*quality check/im.test(trimmed)) warnings.push(at(bodyLine, 'No "Quality Checks" section.'));
  if (!/^#{2,3}\s+.*anti-?pattern/im.test(trimmed)) warnings.push(at(bodyLine, 'No "Anti-Patterns" section.'));

  return { name, file, errors, warnings };
}

// --- run ----------------------------------------------------------------------

export function run() {
  const skillsDir = findSkillsDir();

  if (!skillsDir) {
    const looked = flag('dir') ? [flag('dir')] : CANDIDATES;
    const msg =
      `No skills found. Looked in: ${looked.join(', ')}.\n` +
      `A skill is a folder containing a SKILL.md. Point at yours with --dir <path>.`;
    if (asJson) console.log(JSON.stringify({ skills: 0, errors: 1, warnings: 0, message: msg }, null, 2));
    else console.error(msg);
    process.exit(1);
  }

  const names = readdirSync(skillsDir)
    .filter((n) => {
      try {
        return statSync(join(skillsDir, n)).isDirectory() && existsSync(join(skillsDir, n, 'SKILL.md'));
      } catch {
        return false;
      }
    })
    .sort();

  const results = names.map((n) => checkSkill(skillsDir, n));
  const totalErrors = results.reduce((a, r) => a + r.errors.length, 0);
  const totalWarnings = results.reduce((a, r) => a + r.warnings.length, 0);

  // Inline annotations. The point of an action over a log is that the finding
  // lands on the line in the PR diff rather than in a build log nobody opens.
  if (annotate) {
    for (const r of results) {
      const path = relative(process.cwd(), r.file);
      for (const e of r.errors) console.log(`::error file=${path},line=${e.line},title=SkillCheck::${e.msg}`);
      for (const w of r.warnings)
        console.log(`::${strict ? 'error' : 'warning'} file=${path},line=${w.line},title=SkillCheck::${w.msg}`);
    }
  }

  if (asJson) {
    console.log(
      JSON.stringify(
        {
          dir: relative(process.cwd(), skillsDir) || '.',
          skills: names.length,
          errors: totalErrors,
          warnings: totalWarnings,
          results: results.filter((r) => r.errors.length || r.warnings.length),
        },
        null,
        2
      )
    );
  } else {
    for (const r of results) {
      for (const e of r.errors) console.log(`  ✖ ${r.name}: ${e.msg}`);
      for (const w of r.warnings) console.log(`  ⚠ ${r.name}: ${w.msg}`);
    }
    console.log(
      `\nSkillCheck — ${names.length} skill${names.length === 1 ? '' : 's'} in ${relative(process.cwd(), skillsDir) || '.'} · ` +
        `${totalErrors} error(s) · ${totalWarnings} warning(s)`
    );
  }

  // A repo with zero skills that asked to be checked is a misconfiguration, not
  // a pass. Silently succeeding there is how a broken CI step goes unnoticed.
  if (names.length === 0) {
    if (!asJson) console.error(`No SKILL.md folders in ${skillsDir}. Nothing was checked.`);
    process.exit(1);
  }

  const failed = totalErrors > 0 || (strict && totalWarnings > 0);
  if (failed) {
    if (!asJson) {
      console.log(strict && totalWarnings && !totalErrors ? 'Failed (--strict: warnings count as errors).' : 'Failed.');
    }
    process.exit(1);
  }
  if (!asJson) console.log('All skills valid. ✓');
}

// Only run when invoked directly, so the CLI can import it without side effects.
if (import.meta.url === `file://${process.argv[1]}`) run();
