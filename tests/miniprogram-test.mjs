#!/usr/bin/env node
// The Mini Program finder is offline, so its router and data are testable in Node:
// build the data into a temp folder, load the same router the app loads, and check
// that Chinese requests land on the right skill and the copied prompt is sane.
import { mkdtempSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const out = mkdtempSync(join(tmpdir(), 'pm-mp-'));
let pass = 0, fail = 0;
const check = (name, ok) => { if (ok) pass++; else { fail++; console.error('  ✗ ' + name); } };

try {
  execFileSync('node', [join(root, 'scripts', 'build-miniprogram.mjs'), '--out', out], { stdio: 'pipe' });
  const router = require(join(root, 'integrations', 'wechat-miniprogram', 'miniprogram', 'utils', 'router.js'));
  const index = require(join(out, 'index.js'));
  const bodies = require(join(out, 'bodies.js'));
  const prepared = router.prepare(index);

  check('index has every live skill', index.length > 1000);
  check('no row is missing a name or description', index.every((s) => s.n && s.d));
  check('rows flagged with a body have one', index.filter((s) => s.b).every((s) => bodies[s.n]));

  const top3 = (q) => router.find(prepared, q, 3).map((s) => s.n);
  const expect = [
    ['帮我写周报', 'cn-weekly-report'],
    ['小红书笔记怎么写', 'xiaohongshu-note'],
    ['双 11 大促方案', 'cn-double11-promotion-plan'],
    ['融资商业计划书 BP', 'cn-financing-bp'],
    ['高新技术企业认定条件', 'cn-high-tech-enterprise-application'],
    ['写 B 站视频脚本', 'bilibili-video-script'],
    ['留学签证材料', 'cn-study-visa-prep'],
    ['write a PRD', 'prd-template'],
  ];
  for (const [q, want] of expect) check(`"${q}" finds ${want} in the top 3 (got ${top3(q).join(', ')})`, top3(q).includes(want));

  check('an empty query returns nothing', router.find(prepared, '   ', 5).length === 0);
  check('the limit is respected', router.find(prepared, '报告', 4).length <= 4);

  const withBody = index.find((s) => s.b);
  const noBody = index.find((s) => !s.b);
  check('a prompt with a body carries the body', router.promptFor(withBody, bodies[withBody.n]).includes(bodies[withBody.n].slice(0, 40)));
  check('a prompt without a body links to the skill on Gitee', router.promptFor(noBody, '').includes('gitee.com/mohitagw/pm-claude-skills/blob/main/skills/' + noBody.n));
} finally {
  rmSync(out, { recursive: true, force: true });
}
console.log(`miniprogram: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
