#!/usr/bin/env node
// Scaffold a new skill that already passes SkillCheck. Lowers the barrier to
// contributing — fill in the blanks instead of remembering the whole structure.
//
// Usage:
//   node scripts/new-skill.mjs --name churn-forecaster --description "..."
//   node scripts/new-skill.mjs            # interactive (prompts for the basics)
//   npm run new-skill -- --name my-skill
//
// No dependencies.
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--force') out.force = true;
    else if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
  }
  return out;
}

const titleCase = (name) =>
  name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

function template({ name, title, description }) {
  return `---
name: ${name}
description: "${description}"
---

# ${title} Skill

One-line summary of the value this skill delivers. <!-- TODO: rewrite -->

## What This Skill Produces

- <!-- TODO: the concrete deliverable(s) this skill outputs -->

## Required Inputs

Ask for (if not already provided):
- <!-- TODO: the inputs to gather; never invent them -->

## Process

1. <!-- TODO: the steps the skill follows -->

## Output Format

<!-- TODO: a concrete template (headings/tables) of the final artifact -->

## Quality Checks

- [ ] <!-- TODO: a check the output must pass before hand-off -->

## Anti-Patterns

- [ ] Do not <!-- TODO: the mistake this skill prevents -->
`;
}

async function resolveInputs(args) {
  let { name, title, description } = args;
  const interactive = !name && process.stdin.isTTY;
  if (interactive) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    name = (await rl.question('Skill name (lowercase-hyphenated): ')).trim();
    description = (await rl.question('Description (what / use when / produces): ')).trim();
    rl.close();
  }
  if (!name) throw new Error('Provide --name (lowercase-hyphenated), or run in a terminal for prompts.');
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) throw new Error(`Invalid name "${name}". Use lowercase letters, numbers, and hyphens.`);
  title = title || titleCase(name);
  // A default description that already satisfies SkillCheck (what / use when / produces).
  description = description || `Summarise what ${title} does in one line. Use when asked to [trigger phrases the user would say]. Produces [the concrete artifact].`;
  return { name, title, description };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let inputs;
  try {
    inputs = await resolveInputs(args);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }

  const dir = join(root, 'skills', inputs.name);
  const file = join(dir, 'SKILL.md');
  if (existsSync(file) && !args.force) {
    console.error(`Error: ${file} already exists (use --force to overwrite).`);
    process.exit(1);
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(file, template(inputs));

  console.log(`Created skills/${inputs.name}/SKILL.md`);
  console.log('\nNext:');
  console.log(`  1. Fill in the TODO sections.`);
  console.log(`  2. node scripts/skillcheck.mjs        # validate it`);
  console.log(`  3. node web/build-skills.mjs && node scripts/build-exports.mjs   # refresh generated artifacts`);
}

main();
