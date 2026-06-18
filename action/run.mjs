#!/usr/bin/env node
// Runner for the pm-skills GitHub Action. Loads a bundled SKILL.md, runs it on
// the provided input via the Anthropic API, and exposes the result as a step
// output (and optionally a file). Inputs arrive as INPUT_* env vars.
import { readFileSync, existsSync, writeFileSync, appendFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { complete, parseSkill } from '../bin/lib/anthropic.mjs';

const ACTION_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(ACTION_DIR, '..');

const inp = (name, def = '') => (process.env[`INPUT_${name.toUpperCase()}`] ?? def).trim();

// Pure: assemble the system prompt + user message for a skill run (testable offline).
export function buildRequest(skillBody, userInput) {
  const system = skillBody +
    '\n\n---\nExecute this skill now on the input below and produce the complete output. ' +
    'Do not ask follow-up questions — work with what is given and note any reasonable assumptions. ' +
    'Output only the finished artifact (no preamble).';
  return { system, messages: [{ role: 'user', content: userInput }] };
}

async function main() {
  const skill = inp('skill');
  if (!skill) throw new Error('Input `skill` is required.');
  const apiKey = inp('api_key') || process.env.ANTHROPIC_API_KEY || '';
  const model = inp('model', 'claude-sonnet-4-6');
  const maxTokens = parseInt(inp('max_tokens', '4096'), 10) || 4096;

  let input = inp('input');
  const inputFile = inp('input_file');
  if (!input && inputFile && existsSync(inputFile)) input = readFileSync(inputFile, 'utf8');
  if (!input) throw new Error('Provide `input` or `input_file`.');

  const skillFile = join(REPO_ROOT, 'skills', skill, 'SKILL.md');
  if (!existsSync(skillFile)) throw new Error(`Unknown skill "${skill}" (no skills/${skill}/SKILL.md).`);
  const { body } = parseSkill(readFileSync(skillFile, 'utf8'));

  const { system, messages } = buildRequest(body, input);
  console.log(`Running skill "${skill}" with ${model}…`);
  const result = await complete({ apiKey, model, system, messages, maxTokens });

  // Step output (multiline-safe heredoc) + optional file.
  if (process.env.GITHUB_OUTPUT) {
    const d = `EOF_${Math.random().toString(36).slice(2)}`;
    appendFileSync(process.env.GITHUB_OUTPUT, `result<<${d}\n${result}\n${d}\n`);
  }
  const outFile = inp('output_file');
  if (outFile) { writeFileSync(outFile, result + '\n'); console.log(`Wrote ${outFile}`); }

  console.log('\n----- skill output -----\n' + result);
}

// Run only when executed directly (so tests can import buildRequest).
if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  main().catch((e) => { console.error(`Error: ${e.message}`); process.exit(1); });
}
