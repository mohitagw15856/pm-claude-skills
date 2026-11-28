#!/usr/bin/env node
// Build a Claude Desktop bundle (.mcpb) of the MCP server: one file a person can open to
// install the server, with no config file to edit and no terminal.
//
// A bundle is a zip with a manifest.json and the server's files. The layout follows the
// MCPB manifest specification, version 0.3 (github.com/anthropics/mcpb, MANIFEST.md).
// The server runs offline from the files in the bundle: it needs Node, which Claude
// Desktop provides, and nothing from npm.
//
//   node scripts/build-mcpb.mjs                      writes dist/pm-skills.mcpb
//   node scripts/build-mcpb.mjs --out web/downloads/pm-skills.mcpb
//   node scripts/build-mcpb.mjs --dir-only           leave the unzipped folder, skip zipping
//   node scripts/build-mcpb.mjs --check              build to a temp folder and start the server from it
//
// Zipping uses the system `zip` command. No npm dependencies.
import { cpSync, mkdirSync, rmSync, writeFileSync, readFileSync, existsSync, mkdtempSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

// Everything mcp/server.mjs reads at runtime, at the same relative paths.
const FILES = ['mcp/server.mjs', 'bin/lib/inputs.mjs', 'package.json', 'skill-tiers.json', 'workflows.json', 'skill-dupes-allow.json', 'LICENSE'];
const DIRS = ['skills', 'schemas/skills'];

export function manifest(version) {
  return {
    manifest_version: '0.3',
    name: 'pm-claude-skills',
    display_name: 'PM Skills',
    version,
    description: 'Professional skills for product work and beyond: search the library, read a skill, run it on your own model, and run the bundled calculators.',
    long_description: 'PM Skills is a free, MIT-licensed library of professional skills (PRDs, stakeholder updates, postmortems, pricing, research synthesis and many more). This bundle runs its MCP server locally from the files inside it. It makes no network calls and needs no API key: skills run on the model already in your client.',
    author: { name: 'Mohit Aggarwal', url: 'https://github.com/mohitagw15856' },
    repository: { type: 'git', url: 'https://github.com/mohitagw15856/pm-claude-skills' },
    homepage: 'https://mohitagw15856.github.io/pm-claude-skills/',
    documentation: 'https://github.com/mohitagw15856/pm-claude-skills/blob/main/mcp/README.md',
    support: 'https://github.com/mohitagw15856/pm-claude-skills/issues',
    license: 'MIT',
    keywords: ['product management', 'skills', 'prd', 'templates', 'calculators'],
    server: {
      type: 'node',
      entry_point: 'server/mcp/server.mjs',
      mcp_config: { command: 'node', args: ['${__dirname}/server/mcp/server.mjs'] },
    },
    tools_generated: false,
    prompts_generated: true,
    compatibility: { platforms: ['darwin', 'win32', 'linux'], runtimes: { node: '>=18.0.0' } },
  };
}

export function stage(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(join(dir, 'server'), { recursive: true });
  for (const f of FILES) {
    if (!existsSync(join(ROOT, f))) continue;
    mkdirSync(dirname(join(dir, 'server', f)), { recursive: true });
    cpSync(join(ROOT, f), join(dir, 'server', f));
  }
  for (const d of DIRS) {
    if (!existsSync(join(ROOT, d))) continue;
    cpSync(join(ROOT, d), join(dir, 'server', d), { recursive: true, filter: (p) => !/(^|[\\/])(__pycache__|\.DS_Store)$/.test(p) && !/\.pyc$/.test(p) });
  }
  writeFileSync(join(dir, 'manifest.json'), JSON.stringify(manifest(pkg.version), null, 2) + '\n');
  return dir;
}

// Start the staged server and ask it for its tool list, exactly as a client would.
export function probe(dir) {
  const r = spawnSync(process.execPath, [join(dir, 'server', 'mcp', 'server.mjs')], {
    input: '{"jsonrpc":"2.0","id":1,"method":"tools/list"}\n', encoding: 'utf8', timeout: 30000, cwd: tmpdir(),
  });
  const line = (r.stdout || '').split('\n').find((l) => l.includes('"id":1'));
  if (!line) throw new Error(`the staged server did not answer: ${(r.stderr || '').trim().split('\n').pop()}`);
  return JSON.parse(line).result.tools.map((t) => t.name);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (args.includes('--check')) {
    const dir = mkdtempSync(join(tmpdir(), 'pm-mcpb-'));
    try {
      stage(dir);
      const m = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8'));
      const problems = [];
      for (const k of ['manifest_version', 'name', 'version', 'description', 'author', 'server']) if (!m[k]) problems.push(`manifest is missing ${k}`);
      if (!m.author || !m.author.name) problems.push('manifest author needs a name');
      if (!existsSync(join(dir, m.server.entry_point))) problems.push(`entry point ${m.server.entry_point} is not in the bundle`);
      if (m.version !== pkg.version) problems.push('manifest version differs from package.json');
      const tools = probe(dir);
      if (!tools.includes('search_skills') || !tools.includes('get_skill')) problems.push(`staged server lists unexpected tools: ${tools.join(', ')}`);
      if (problems.length) { console.error(problems.map((p) => `  ✗ ${p}`).join('\n')); process.exit(1); }
      console.log(`Claude Desktop bundle: manifest valid, staged server starts on its own and lists ${tools.length} tools. ✓`);
    } finally { rmSync(dir, { recursive: true, force: true }); }
    process.exit(0);
  }
  const out = resolve(opt('--out') || join(ROOT, 'dist', 'pm-skills.mcpb'));
  const dir = join(dirname(out), 'pm-skills-mcpb');
  mkdirSync(dirname(out), { recursive: true });
  stage(dir);
  if (args.includes('--dir-only')) { console.log(`Staged ${dir}`); process.exit(0); }
  rmSync(out, { force: true });
  try { execFileSync('zip', ['-r', '-X', '-q', out, '.'], { cwd: dir }); }
  catch (e) { console.error(`Could not run zip (${e.code || e.message}). The unzipped bundle is in ${dir}.`); process.exit(1); }
  rmSync(dir, { recursive: true, force: true });
  console.log(`Wrote ${out} (${(statSync(out).size / 1048576).toFixed(1)} MB, version ${pkg.version}).`);
}
