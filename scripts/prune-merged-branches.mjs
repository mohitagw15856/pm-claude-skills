#!/usr/bin/env node
// List, and on request delete, branches on GitHub whose pull request has merged.
//
// A branch is offered for deletion only when all of these hold:
//   - a pull request from that branch (in this repository, not a fork) is merged;
//   - the branch tip is still the commit that pull request merged, so nothing was added after;
//   - no open pull request uses it;
//   - it is not named in KEEP below, and no workflow or script in this repository names it.
//
//   node scripts/prune-merged-branches.mjs           list what would be deleted (changes nothing)
//   node scripts/prune-merged-branches.mjs --apply   delete them
//
// Deleting is done one branch at a time and only if its tip has not moved since it was
// read. A deleted branch can be restored from its pull request page. Needs the gh CLI.
import { execFileSync, spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KEEP = new Set(['main', 'media', 'exports']);
const run = (cmd, args) => execFileSync(cmd, args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const branches = new Map(run('git', ['ls-remote', '--heads', 'origin']).trim().split('\n').filter(Boolean).map((l) => {
  const [sha, ref] = l.split(/\s+/);
  return [ref.replace('refs/heads/', ''), sha];
}));
const merged = JSON.parse(run('gh', ['pr', 'list', '--state', 'merged', '--limit', '2000', '--json', 'headRefName,headRefOid,number,isCrossRepository'])).filter((p) => !p.isCrossRepository);
const open = new Set(JSON.parse(run('gh', ['pr', 'list', '--state', 'open', '--json', 'headRefName'])).map((p) => p.headRefName));
// A branch name that appears in a workflow or script is probably one a job reads or reuses.
const referenced = (name) => spawnSync('git', ['grep', '-q', '-F', '-e', name, '--', '.github', 'scripts', 'bin'], { cwd: ROOT }).status === 0;

const remove = []; const kept = [];
for (const [name, tip] of [...branches].sort()) {
  if (KEEP.has(name)) { kept.push([name, 'always kept']); continue; }
  if (open.has(name)) { kept.push([name, 'has an open pull request']); continue; }
  const prs = merged.filter((p) => p.headRefName === name);
  if (!prs.length) { kept.push([name, 'no merged pull request']); continue; }
  if (!prs.some((p) => p.headRefOid === tip)) { kept.push([name, 'has commits after its pull request merged']); continue; }
  if (referenced(name)) { kept.push([name, 'named in a workflow or script']); continue; }
  remove.push([name, tip, prs.find((p) => p.headRefOid === tip).number]);
}

console.log(`${branches.size} branches on GitHub. ${remove.length} can go, ${kept.length} stay.\n`);
console.log('Staying:');
for (const [name, why] of kept) console.log(`  ${name}  (${why})`);
console.log(`\n${process.argv.includes('--apply') ? 'Deleting' : 'Would delete'}:`);
let done = 0; let failed = 0;
for (const [name, tip, pr] of remove) {
  if (!process.argv.includes('--apply')) { console.log(`  ${name}  (merged in #${pr})`); continue; }
  // --force-with-lease makes the delete conditional on the tip still being the one checked.
  const r = spawnSync('git', ['push', '-q', 'origin', `--force-with-lease=refs/heads/${name}:${tip}`, `:refs/heads/${name}`], { cwd: ROOT, encoding: 'utf8' });
  if (r.status === 0) { done++; console.log(`  deleted ${name}  (#${pr})`); } else { failed++; console.log(`  NOT deleted ${name}: ${(r.stderr || '').trim().split('\n').pop()}`); }
}
if (process.argv.includes('--apply')) console.log(`\nDeleted ${done}, failed ${failed}.`);
else console.log('\nNothing was changed. To delete these, run: node scripts/prune-merged-branches.mjs --apply');
