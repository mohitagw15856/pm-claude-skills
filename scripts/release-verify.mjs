#!/usr/bin/env node
// Release verify: after a release, prove that what was published actually
// installs and runs. Publishing can succeed on GitHub and still leave npm or
// PyPI behind (an expired token), and a documented command can point at a
// package name that is not ours. Both happened; this is the check for both.
//
// What it checks, in order:
//   1. npm has pm-claude-skills@<version>
//   2. PyPI has pm-skills@<python version from python/pyproject.toml>
//   3. the CLI runs from a clean directory and reports <version>
//   4. the MCP server starts through npx, answers initialize and lists tools
//   5. no living document shows the bare `npx pm-claude-skills-mcp` form
//
// Usage:
//   node scripts/release-verify.mjs                  # version from package.json
//   node scripts/release-verify.mjs --version 80.1.0
//   node scripts/release-verify.mjs --wait 15        # poll the registries for up to 15 minutes
//   node scripts/release-verify.mjs --skip-run       # registry and docs checks only
//   node scripts/release-verify.mjs --json
//   node scripts/release-verify.mjs --selftest       # no network
//
// No dependencies. Exit 0 when every check passes, 1 otherwise.
import { readFileSync, mkdtempSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NPM_PACKAGE = 'pm-claude-skills';
const MCP_BIN = 'pm-claude-skills-mcp';
const PYPI_PACKAGE = 'pm-skills';
const MIN_TOOLS = 3;

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
export const isVersion = (v) => typeof v === 'string' && SEMVER.test(v);

export function parseArgs(argv) {
  const out = { wait: 0 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--selftest') out.selftest = true;
    else if (a === '--json') out.json = true;
    else if (a === '--skip-run') out.skipRun = true;
    else if (a === '--version') out.version = argv[++i];
    else if (a === '--wait') out.wait = Number(argv[++i]);
  }
  if (!Number.isFinite(out.wait) || out.wait < 0) out.wait = 0;
  return out;
}

export function pythonVersion(toml) {
  const m = toml.match(/^version\s*=\s*"([^"]+)"/m);
  return m ? m[1] : null;
}

// The bare form resolves an npm package of that name, which is not this
// library. The working form names the package with -p.
const BARE = /npx\s+(?:-y\s+)?pm-claude-skills-mcp\b|"-y",\s*"pm-claude-skills-mcp"/;
export const hasBareMcpCommand = (text) => text.split('\n').some((line) => BARE.test(line));

// Newline-delimited JSON-RPC. Returns the result for each id that answered.
export function parseRpc(stdout) {
  const byId = new Map();
  for (const line of stdout.split('\n')) {
    const s = line.trim();
    if (!s.startsWith('{')) continue;
    try {
      const msg = JSON.parse(s);
      if (msg && msg.id !== undefined && msg.id !== null) byId.set(msg.id, msg);
    } catch { /* not a protocol line */ }
  }
  return byId;
}

export function judgeMcp(stdout, version) {
  const byId = parseRpc(stdout);
  const init = byId.get(1);
  const tools = byId.get(2);
  if (!init || !init.result) return { ok: false, detail: 'no answer to initialize' };
  const reported = init.result.serverInfo && init.result.serverInfo.version;
  if (reported !== version) return { ok: false, detail: `server reports ${reported}, expected ${version}` };
  const list = tools && tools.result && Array.isArray(tools.result.tools) ? tools.result.tools : null;
  if (!list) return { ok: false, detail: 'no answer to tools/list' };
  if (list.length < MIN_TOOLS) return { ok: false, detail: `${list.length} tools listed, expected at least ${MIN_TOOLS}` };
  return { ok: true, detail: `version ${reported}, ${list.length} tools` };
}

async function registryHas(url) {
  try {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function waitFor(url, minutes) {
  const deadline = Date.now() + minutes * 60_000;
  for (;;) {
    if (await registryHas(url)) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((r) => setTimeout(r, 15_000));
  }
}

function runCli(version, cwd) {
  const r = spawnSync('npx', ['-y', `${NPM_PACKAGE}@${version}`, '--version'], { cwd, encoding: 'utf8', timeout: 240_000 });
  const out = `${r.stdout || ''}`.trim();
  if (r.status !== 0) return { ok: false, detail: `exit ${r.status}: ${(r.stderr || '').trim().split('\n').pop()}` };
  return out.includes(version) ? { ok: true, detail: out.split('\n').pop() } : { ok: false, detail: `printed "${out.slice(0, 80)}"` };
}

function runMcp(version, cwd) {
  return new Promise((resolve) => {
    const child = spawn('npx', ['-y', '-p', `${NPM_PACKAGE}@${version}`, MCP_BIN], { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '';
    let done = false;
    const finish = (verdict) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      child.kill();
      resolve(verdict);
    };
    const timer = setTimeout(() => finish({ ok: false, detail: 'timed out after 240s' }), 240_000);
    child.stdout.on('data', (d) => {
      stdout += d;
      if (parseRpc(stdout).has(2)) finish(judgeMcp(stdout, version));
    });
    child.on('error', (e) => finish({ ok: false, detail: e.message }));
    child.on('exit', () => finish(judgeMcp(stdout, version)));
    const send = (msg) => child.stdin.write(`${JSON.stringify(msg)}\n`);
    send({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'release-verify', version: '1' } } });
    send({ jsonrpc: '2.0', method: 'notifications/initialized' });
    send({ jsonrpc: '2.0', id: 2, method: 'tools/list' });
  });
}

const LIVING_DOCS = ['README.md', 'CHEATSHEET.md', 'QUICKSTART.md', 'mcp/README.md', 'mcp-remote/README.md', 'connectors/README.md', 'docs/installation.md'];

function checkDocs() {
  const offenders = LIVING_DOCS.filter((f) => existsSync(join(ROOT, f)) && hasBareMcpCommand(readFileSync(join(ROOT, f), 'utf8')));
  return offenders.length
    ? { ok: false, detail: `bare MCP command in: ${offenders.join(', ')}` }
    : { ok: true, detail: `${LIVING_DOCS.length} documents use the package form` };
}

function selftest() {
  const t = [];
  const eq = (name, got, want) => t.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });
  eq('version accepts semver', isVersion('80.1.0'), true);
  eq('version accepts prerelease', isVersion('80.1.0-rc.1'), true);
  eq('version rejects shell text', isVersion('80.1.0; rm -rf /'), false);
  eq('version rejects empty', isVersion(''), false);
  eq('version rejects zero as number', isVersion(0), false);
  eq('wait defaults to 0', parseArgs([]).wait, 0);
  eq('wait keeps 0 when given 0', parseArgs(['--wait', '0']).wait, 0);
  eq('wait rejects negative', parseArgs(['--wait', '-5']).wait, 0);
  eq('wait rejects text', parseArgs(['--wait', 'soon']).wait, 0);
  eq('python version parsed', pythonVersion('[project]\nname = "pm-skills"\nversion = "0.49.0"\n'), '0.49.0');
  eq('python version with CRLF', pythonVersion('[project]\r\nversion = "0.49.0"\r\n'), '0.49.0');
  eq('python version missing', pythonVersion('[project]\nname = "x"\n'), null);
  eq('bare command caught', hasBareMcpCommand('claude mcp add pm-skills -- npx -y pm-claude-skills-mcp'), true);
  eq('bare command without -y caught', hasBareMcpCommand('run npx pm-claude-skills-mcp now'), true);
  eq('bare json args caught', hasBareMcpCommand('"args": ["-y", "pm-claude-skills-mcp"]'), true);
  eq('package form passes', hasBareMcpCommand('npx -y -p pm-claude-skills pm-claude-skills-mcp'), false);
  eq('package json args pass', hasBareMcpCommand('"args": ["-y", "-p", "pm-claude-skills", "pm-claude-skills-mcp"]'), false);
  const good = [
    '{"jsonrpc":"2.0","id":1,"result":{"serverInfo":{"version":"80.1.0"}}}',
    'a log line that is not json',
    '{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"a"},{"name":"b"},{"name":"c"}]}}',
  ].join('\n');
  eq('mcp good answer', judgeMcp(good, '80.1.0').ok, true);
  eq('mcp wrong version', judgeMcp(good, '80.2.0').ok, false);
  eq('mcp too few tools', judgeMcp(good.replace(',{"name":"b"},{"name":"c"}', ''), '80.1.0').ok, false);
  eq('mcp silent server', judgeMcp('', '80.1.0').ok, false);
  eq('mcp broken line ignored', judgeMcp(`{"jsonrpc":\n${good}`, '80.1.0').ok, true);
  const failed = t.filter((x) => !x.ok);
  for (const x of failed) console.error(`✗ ${x.name}: got ${JSON.stringify(x.got)}, want ${JSON.stringify(x.want)}`);
  console.log(`release-verify selftest: ${t.length - failed.length} passed · ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.selftest) return selftest();

  const version = args.version || JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
  if (!isVersion(version)) {
    console.error(`Error: "${version}" is not a version (expected something like 80.1.0).`);
    process.exit(1);
  }
  const pyVersion = pythonVersion(readFileSync(join(ROOT, 'python', 'pyproject.toml'), 'utf8'));
  const results = [];
  const record = (name, verdict) => results.push({ name, ...verdict });

  const npmUrl = `https://registry.npmjs.org/${NPM_PACKAGE}/${version}`;
  const onNpm = await waitFor(npmUrl, args.wait);
  record(`npm has ${NPM_PACKAGE}@${version}`, { ok: onNpm, detail: onNpm ? 'found' : 'not found. Publish with: npm publish' });

  if (pyVersion && isVersion(pyVersion)) {
    const onPypi = await waitFor(`https://pypi.org/pypi/${PYPI_PACKAGE}/${pyVersion}/json`, args.wait);
    record(`PyPI has ${PYPI_PACKAGE}@${pyVersion}`, { ok: onPypi, detail: onPypi ? 'found' : 'not found' });
  } else {
    record('PyPI version readable', { ok: false, detail: 'no version in python/pyproject.toml' });
  }

  if (args.skipRun) {
    record('CLI and MCP run', { ok: true, detail: 'skipped (--skip-run)' });
  } else if (!onNpm) {
    record('CLI and MCP run', { ok: false, detail: 'skipped, the version is not on npm' });
  } else {
    const dir = mkdtempSync(join(tmpdir(), 'release-verify-'));
    try {
      record('CLI runs from a clean directory', runCli(version, dir));
      record('MCP server answers through npx', await runMcp(version, dir));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  record('documents use the working MCP command', checkDocs());

  const failed = results.filter((r) => !r.ok);
  if (args.json) {
    console.log(JSON.stringify({ version, pythonVersion: pyVersion, ok: failed.length === 0, results }, null, 2));
  } else {
    console.log(`Release verify: ${NPM_PACKAGE} ${version}\n`);
    for (const r of results) console.log(`  ${r.ok ? '✓' : '✗'} ${r.name}: ${r.detail}`);
    console.log(failed.length ? `\n${failed.length} check(s) failed.` : '\nAll checks passed.');
  }
  process.exit(failed.length ? 1 : 0);
}

const invokedDirectly = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (invokedDirectly) main();
