// `pm-claude-skills generate` — turn a doc (URL or file) into a SKILL.md that
// follows this library's authoring standard. Uses the Anthropic API.
//
//   ANTHROPIC_API_KEY=sk-ant-... npx pm-claude-skills generate --from ./process.md
//   ... generate --from https://example.com/runbook --name incident-runbook
//   ... generate --from notes.txt --out ./skills --dry-run
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { complete, parseSkill } from './lib/anthropic.mjs';

function getArg(argv, name, def) {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 ? argv[i + 1] : def;
}

// Strip tags/scripts/styles from HTML to rough text (good enough for an LLM).
function htmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function loadSource(from) {
  if (/^https?:\/\//i.test(from)) {
    const res = await fetch(from);
    if (!res.ok) throw new Error(`Could not fetch ${from} (HTTP ${res.status}).`);
    const text = await res.text();
    return /<html|<body|<div/i.test(text) ? htmlToText(text) : text;
  }
  if (!existsSync(from)) throw new Error(`No such file: ${from}`);
  return readFileSync(from, 'utf8');
}

const META_PROMPT = `You convert a team's documentation into a single Claude/Agent "skill" file (SKILL.md) that follows this exact standard. Output ONLY the file content, starting with the YAML frontmatter — no code fences, no preamble.

Required structure:
---
name: <lowercase-hyphenated, derived from the doc's purpose>
description: "<one sentence on what it does>. Use when <trigger phrases a user would say>. Produces <the concrete artifact>."
---

# <Title> Skill

<one-line value summary>

## What This Skill Produces
- <deliverables>

## Required Inputs
Ask for (if not provided):
- <inputs to gather; never invent them>

## Process
1. <steps>

## Output Format
<a concrete template — headings/tables — of the final artifact>

## Quality Checks
- [ ] <checks the output must pass>

## Anti-Patterns
- [ ] Do not <mistakes this skill prevents>

Rules: be specific to the documentation provided; turn its rules/process into the skill. The description MUST contain "Use when" and "Produces". Do not include any text outside the file.`;

export async function run(argv) {
  const from = getArg(argv, 'from');
  if (!from || argv.includes('--help')) {
    console.log('Usage: pm-claude-skills generate --from <url|file> [--name x] [--out dir] [--model m] [--dry-run] [--force]');
    return from ? 0 : 1;
  }
  const apiKey = process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) { console.error('Set ANTHROPIC_API_KEY to generate a skill.'); return 1; }
  const model = getArg(argv, 'model', 'claude-sonnet-4-6');
  const outDir = getArg(argv, 'out', 'skills');
  const dryRun = argv.includes('--dry-run');

  console.error(`Reading ${from}…`);
  const source = (await loadSource(from)).slice(0, 24000); // cap context

  console.error(`Generating a SKILL.md with ${model}…`);
  const out = await complete({
    apiKey, model, system: META_PROMPT,
    messages: [{ role: 'user', content: `Documentation to convert into a skill:\n\n${source}` }],
    maxTokens: 3000,
  });

  const cleaned = out.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();
  const { meta } = parseSkill(cleaned);
  const name = getArg(argv, 'name', meta.name);
  if (!name) { console.error('Could not determine a skill name — pass --name.'); return 1; }

  if (dryRun) {
    console.log(cleaned);
    console.error(`\n[dry-run] Would write ${join(outDir, name, 'SKILL.md')}`);
    return 0;
  }
  const dir = join(outDir, name);
  const file = join(dir, 'SKILL.md');
  if (existsSync(file) && !argv.includes('--force')) {
    console.error(`Error: ${file} already exists (use --force to overwrite).`);
    return 1;
  }
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, cleaned + '\n');
  console.log(`Created ${file}`);
  console.log('Next: review it, then validate — node scripts/skillcheck.mjs && node scripts/skill-audit.mjs');
  return 0;
}
