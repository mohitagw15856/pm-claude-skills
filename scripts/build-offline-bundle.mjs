// Offline / air-gapped bundle (product idea #18).
//
// Builds a single downloadable archive — the skills, every platform export,
// the packs, journeys and an OFFLINE-README — for people with privacy needs or
// no reliable internet: exactly the audience of the legal/medical/financial
// skills. Pair with a local model (Ollama, LM Studio, llama.cpp): the README
// explains how. No telemetry, no accounts, nothing to phone home — by design.
//
// Usage:  node scripts/build-offline-bundle.mjs        # → dist/pm-skills-offline-<version>.tar.gz
// Uses `tar` via spawnSync with an argument array — no shell, no eval.

import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const dist = join(ROOT, 'dist');
const readmePath = join(ROOT, 'OFFLINE-README.md');
const out = join(dist, `pm-skills-offline-${version}.tar.gz`);

const readme = `# PM Skills — offline bundle v${version}

Everything in this archive works with **no internet, no account, no telemetry.**
Skills are plain markdown; your AI reads them. Nothing here calls home.

## What's inside
- \`skills/\`      — all canonical skills (one \`SKILL.md\` per folder)
- \`exports/\`     — the same skills rendered for ChatGPT, Gemini, Cursor, Windsurf, Aider, Cline, Continue, Zed, Roo, Kilo, Obsidian, OpenClaw
- \`PACKS.md\`     — curated packs for a moment in your life
- \`JOURNEYS.md\` + \`journeys/\` — packs you can run as an ordered, guided session
- \`variants/\`    — jurisdiction overlays where they exist
- \`SKILLS.md\`    — the full catalogue · \`LICENSE\` — MIT

## Use with a local model (fully offline)
1. Install a local runner — **Ollama**, **LM Studio**, or **llama.cpp** — and pull a capable instruction model.
2. Pick a skill: open \`skills/<name>/SKILL.md\`.
3. Paste the whole file as the **system prompt** (or "instructions"), then ask your question as the user message. That's the entire integration.
4. For a tool that supports rules/instructions files (Cursor, Cline, Continue, Zed…), use the matching folder under \`exports/\` — it's already in that tool's format.

## Use in an air-gapped tool
Copy the \`exports/<tool>/\` folder into the tool's rules/skills directory. No installer needed — they're text files.

## Keep the boundaries
High-stakes skills (money, legal, health, grief, immigration) say "not advice — confirm locally" for a reason. Offline doesn't change that; a local model can be confidently wrong too. Use a jurisdiction variant where one exists and confirm specifics with a real professional.

Source, updates, and the browser playground (online): https://github.com/mohitagw15856/pm-claude-skills
`;

mkdirSync(dist, { recursive: true });
writeFileSync(readmePath, readme);
const members = ['skills', 'exports', 'PACKS.md', 'SKILLS.md', 'LICENSE', 'OFFLINE-README.md', 'JOURNEYS.md', 'journeys', 'variants'].filter(m => existsSync(join(ROOT, m)));
const r = spawnSync('tar', ['-czf', out, '-C', ROOT, '--exclude=journeys/rendered', ...members], { stdio: 'inherit' });
if (r.status !== 0) { console.error('✗ tar failed'); process.exit(r.status || 1); }
const mb = (statSync(out).size / 1048576).toFixed(1);
console.log(`Wrote ${out.replace(ROOT + '/', '')} (${mb} MB) — ${members.length} top-level members, no network, no telemetry.`);
