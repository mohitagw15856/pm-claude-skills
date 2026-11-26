// Offline / air-gapped bundle (product idea #18, extended for the serve command).
//
// Builds a single downloadable archive for people with privacy needs or no
// reliable internet: the skills, every platform export, the packs, journeys,
// the pipelines and contracts, a trimmed copy of the web playground with its
// built catalogue, and the Org Edition server, so `pm-claude-skills serve
// --bundle <file>` hosts the whole library on a laptop with nothing fetched.
// Pair with a local model (Ollama, LM Studio, llama.cpp): OFFLINE-README.md
// explains how. No telemetry, no accounts, nothing to phone home, by design.
//
//   node scripts/build-offline-bundle.mjs            # dist/pm-skills-offline-<version>.tar.gz (+ .sha256)
//   node scripts/build-offline-bundle.mjs --zstd     # dist/pm-skills-offline-<version>.tar.zst (smaller; Node 22.15+)
//   node scripts/build-offline-bundle.mjs --no-web   # skills and exports only (the pre-2026-11 shape)
//
// Uses `tar` via spawnSync with an argument array (no shell), and Node's own
// zlib for zstd so the build needs no zstd binary. Published as a release asset
// by .github/workflows/release-assets.yml.

import { readFileSync, writeFileSync, mkdirSync, statSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import * as zlib from 'node:zlib';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const useZstd = argv.includes('--zstd');
const withWeb = !argv.includes('--no-web');
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const dist = join(ROOT, 'dist');
const readmePath = join(ROOT, 'OFFLINE-README.md');
const ext = useZstd ? 'tar.zst' : 'tar.gz';
const out = join(dist, `pm-skills-offline-${version}.${ext}`);

if (useZstd && typeof zlib.zstdCompressSync !== 'function') {
  console.error(`✗ --zstd needs Node 22.15 or newer (zlib.zstdCompressSync); this is ${process.version}. Drop the flag for .tar.gz.`);
  process.exit(2);
}

const readme = `# PM Skills — offline bundle v${version}

Everything in this archive works with **no internet, no account, no telemetry.**
Skills are plain markdown; your AI reads them. Nothing here calls home.

## What's inside
- \`skills/\`      — all canonical skills (one \`SKILL.md\` per folder)
- \`exports/\`     — the same skills rendered for ChatGPT, Gemini, Cursor, Windsurf, Copilot, Aider, Cline, Continue, Zed, Roo, Kilo, Obsidian, OpenClaw, Gemini CLI and the OpenAI Agents SDK
- \`pipelines/\` + \`schemas/\` — the typed pipelines and the per-skill contracts they are checked against
- \`PACKS.md\`     — curated packs for a moment in your life
- \`JOURNEYS.md\` + \`journeys/\` — packs you can run as an ordered, guided session
- \`overlays/\`    — jurisdiction overlays (local rules) where they exist
- \`SKILLS.md\`    — the full catalogue · \`LICENSE\` — MIT
${withWeb ? `- \`web/\` + \`org/\`  — the browser playground (with its built catalogue) and the Org Edition server\n` : ''}
## Serve it on a laptop (fully offline)
${withWeb ? `\`\`\`bash
node org/server.mjs --port 8080        # from inside the extracted folder
# or, from any machine with Node and the CLI:
npx pm-claude-skills serve --bundle pm-skills-offline-${version}.${ext}
\`\`\`
Open http://localhost:8080 for the playground and the \`/v1\` API. Model calls still need a key or a local model; browsing, searching and reading every skill works with nothing else.
` : 'This bundle was built with --no-web; use the default build for the playground and server.\n'}
## Use with a local model (fully offline)
1. Install a local runner — **Ollama**, **LM Studio**, or **llama.cpp** — and pull a capable instruction model.
2. Pick a skill: open \`skills/<name>/SKILL.md\`.
3. Paste the whole file as the **system prompt** (or "instructions"), then ask your question as the user message. That's the entire integration.
4. For a tool that supports rules/instructions files (Cursor, Cline, Continue, Zed…), use the matching folder under \`exports/\` — it's already in that tool's format.

## Use in an air-gapped tool
Copy the \`exports/<tool>/\` folder into the tool's rules/skills directory. No installer needed — they're text files.

## Verify it
\`pm-skills-offline-${version}.${ext}.sha256\` holds the archive hash; every exported file ends with the SHA-256 of its source skill, the same hash published at /.well-known/agent-skills.json on the site.

## Keep the boundaries
High-stakes skills (money, legal, health, grief, immigration) say "not advice — confirm locally" for a reason. Offline doesn't change that; a local model can be confidently wrong too. Use a jurisdiction variant where one exists and confirm specifics with a real professional.

Source, updates, and the browser playground (online): https://github.com/mohitagw15856/pm-claude-skills
`;

mkdirSync(dist, { recursive: true });
writeFileSync(readmePath, readme);
// Generated inputs: build them if this checkout has none.
const build = (script) => spawnSync(process.execPath, [join(ROOT, script)], { cwd: ROOT, stdio: 'ignore' });
if (!existsSync(join(ROOT, 'exports', 'openclaw'))) build('scripts/build-exports.mjs');
if (withWeb && !existsSync(join(ROOT, 'web', 'skills.json'))) build('web/build-skills.mjs');

const members = ['skills', 'exports', 'pipelines', 'schemas', 'PACKS.md', 'SKILLS.md', 'LICENSE', 'OFFLINE-README.md', 'JOURNEYS.md', 'journeys', 'overlays']
  .filter((m) => existsSync(join(ROOT, m)));
const excludes = ['--exclude=journeys/rendered'];
if (withWeb) {
  members.push('org', 'web', 'package.json');
  // The playground, not the whole site: generated per-skill pages, ZIPs, media and
  // mirrors stay out so the bundle stays a download rather than a disk image.
  for (const d of ['skill', 'skill-zip', 'live', 'offline', 'zh', 'i18n', 'docs-assets', 'lobehub', 'registry', 'releases', 'tech-tree', 'badge', 'newsletters', 'campus', 'ab', 'i18n-desc', 'skills-body', 'schemas', 'print', 'personas']) {
    if (existsSync(join(ROOT, 'web', d))) excludes.push(`--exclude=web/${d}`);
  }
  excludes.push('--exclude=org/sessions-data', '--exclude=org/private-skills', '--exclude=*.mp4', '--exclude=*.pdf', '--exclude=*.png', '--exclude=*.jpg', '--exclude=*.webp', '--exclude=*.gif');
}

const tarPath = join(dist, `pm-skills-offline-${version}.tar`);
rmSync(tarPath, { force: true });
const r = spawnSync('tar', ['-cf', tarPath, '-C', ROOT, ...excludes, ...members], { stdio: 'inherit' });
if (r.status !== 0) { console.error('✗ tar failed'); process.exit(r.status || 1); }
const raw = readFileSync(tarPath);
const packed = useZstd ? zlib.zstdCompressSync(raw, { params: { [zlib.constants.ZSTD_c_compressionLevel]: 19 } }) : zlib.gzipSync(raw, { level: 9 });
writeFileSync(out, packed);
rmSync(tarPath, { force: true });
const sha = createHash('sha256').update(packed).digest('hex');
writeFileSync(`${out}.sha256`, `${sha}  ${out.split('/').pop()}\n`);
const mb = (statSync(out).size / 1048576).toFixed(1);
console.log(`Wrote ${out.replace(ROOT + '/', '')} (${mb} MB, ${members.length} top-level members${withWeb ? ', playground and server included' : ''}) and its .sha256. No network, no telemetry.`);
// Keep the exclusion list honest: warn if a heavy directory slipped in.
if (withWeb) {
  const heavy = readdirSync(join(ROOT, 'web')).filter((d) => !excludes.includes(`--exclude=web/${d}`) && existsSync(join(ROOT, 'web', d)) && statSync(join(ROOT, 'web', d)).isDirectory());
  if (heavy.length) console.log(`  web/ directories included: ${heavy.join(', ')}`);
}
