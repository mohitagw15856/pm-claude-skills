#!/usr/bin/env node
// Load the uTools preload in Node with a stand-in for window.utools and check the
// three list-mode callbacks: enter, search and select.
import { mkdtempSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const work = mkdtempSync(join(tmpdir(), 'pm-utools-'));
let pass = 0, fail = 0;
const check = (name, ok) => { if (ok) pass++; else { fail++; console.error('  ✗ ' + name); } };

try {
  // Work on a copy so the test never writes generated data into the repo.
  for (const f of ['plugin.json', 'preload.js', 'package.json', 'logo.png']) cpSync(join(root, 'integrations', 'utools', f), join(work, f));
  const require = createRequire(join(work, 'x.js'));

  const calls = [];
  globalThis.window = { utools: {
    copyText: (t) => calls.push(['copy', t]), showNotification: (t) => calls.push(['notify', t]),
    hideMainWindow: () => calls.push(['hide']), outPlugin: () => calls.push(['out']),
  } };

  // Without data the plugin explains how to build it instead of throwing.
  require(join(work, 'preload.js'));
  let list = null;
  globalThis.window.exports.pm_find.args.enter({ type: 'text' }, (l) => { list = l; });
  check('without data it shows the build command', list.length === 1 && /build-miniprogram/.test(list[0].description));

  execFileSync('node', [join(root, 'scripts', 'build-miniprogram.mjs'), '--out', join(work, 'data'), '--with-router'], { stdio: 'pipe' });
  check('the build drops the router beside the data', existsSync(join(work, 'data', 'router.js')));
  delete require.cache[require.resolve(join(work, 'preload.js'))];
  require(join(work, 'preload.js'));
  const args = globalThis.window.exports.pm_find.args;

  args.enter({ type: 'text' }, (l) => { list = l; });
  check('enter with no text shows a hint', list.length === 1 && !list[0].name);
  args.enter({ type: 'over', payload: '帮我写周报' }, (l) => { list = l; });
  check('selected text is searched on enter', list.some((r) => r.name === 'cn-weekly-report'));
  args.search({}, '双 11 大促方案', (l) => { list = l; });
  check('search finds the promotion plan', list.some((r) => r.name === 'cn-double11-promotion-plan'));
  args.search({}, 'zzzzqqqq', (l) => { list = l; });
  check('no match gives one explanatory row', list.length === 1 && !list[0].name);

  args.select({}, { name: 'cn-weekly-report' });
  check('select copies a prompt and closes', calls.some((c) => c[0] === 'copy' && c[1].length > 200) && calls.some((c) => c[0] === 'out'));
  const before = calls.length;
  args.select({}, { name: '' });
  check('selecting a hint row does nothing', calls.length === before);

  const plugin = JSON.parse(execFileSync('cat', [join(work, 'plugin.json')], { encoding: 'utf8' }));
  check('plugin.json points at files that exist', existsSync(join(work, plugin.preload)) && existsSync(join(work, plugin.logo)));
  check('the feature code matches the preload export', plugin.features[0].code === 'pm_find');
} finally {
  rmSync(work, { recursive: true, force: true });
}
console.log(`utools: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
