#!/usr/bin/env node
// 内网离线包: the intranet offline pack.
//
// One zip for machines with no internet (government, banks, SOEs, factories,
// 信创 desktops): every skill, the Chinese translations, the bundle manifests,
// a working copy of the CLI (no npm install needed; it has no dependencies),
// a catalogue page that opens straight from file://, and INSTALL-zh.md.
// Unlike scripts/build-offline-bundle.mjs (a tar.gz with every platform
// export), this leaves out exports/ to stay small enough for Pages and Gitee.
//
//   node scripts/build-offline-pack.mjs               # dist/pm-skills-offline.zip (+ .sha256)
//   node scripts/build-offline-pack.mjs --out web/offline
//   node scripts/build-offline-pack.mjs --max-mb 40   # fail if the zip is larger (default 40)
//
// Uses the system `zip` through spawnSync with an argument array: no shell.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { join, dirname, basename, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildZhCards } from './build-share-cards.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (f, d) => { const i = process.argv.indexOf(f); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const outDir = resolve(ROOT, arg('--out', 'dist'));
const rel = relative(ROOT, outDir);
if (rel.startsWith('..') || isAbsolute(rel)) { console.error(`✗ --out must be inside the repository: ${outDir}`); process.exit(2); }
const maxMb = Number(arg('--max-mb', '40'));
if (!Number.isFinite(maxMb) || maxMb <= 0) { console.error('✗ --max-mb must be a positive number'); process.exit(2); }

const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const version = pkg.version;
const NAME = 'pm-skills-offline';
const stage = join(ROOT, 'dist', '.offline-stage');
const top = join(stage, NAME);
const zipPath = join(outDir, `${NAME}.zip`);
const SKIP = new Set(['.DS_Store', '__pycache__', 'node_modules', '.git', 'Thumbs.db']);
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// ── Stage the files ──────────────────────────────────────────────────────────
rmSync(stage, { recursive: true, force: true });
mkdirSync(top, { recursive: true });
const copy = (from, to = from) => {
  const src = join(ROOT, from);
  if (!existsSync(src)) return false;
  cpSync(src, join(top, to), { recursive: true, filter: (p) => !SKIP.has(basename(p)) && !p.endsWith('.pyc') });
  return true;
};
// The pack root is also the CLI's package root, so `node bin/cli.mjs add …` works in place.
const members = ['bin', 'mcp', 'skills', 'skills-i18n', 'plugins', 'agents', 'commands', 'output-styles', 'templates',
  'workflows.json', 'skill-tiers.json', 'skill-sources.json', 'skill-dupes-allow.json', 'LICENSE', 'PACKS.md', 'icon.svg'].filter((m) => copy(m));
// Rule-file agents (Cursor, Windsurf, Aider, Kilo Code) install from exports/<agent>; the
// other exports are for tools with their own importers and stay out to keep the zip small.
const RULEFILE_EXPORTS = ['cursor', 'windsurf', 'aider', 'kilocode'].filter((a) => copy(join('exports', a)));
// A trimmed package.json: same name, version, bin and type, nothing to install.
writeFileSync(join(top, 'package.json'), JSON.stringify({
  name: pkg.name, version, description: `${pkg.description || 'PM Skills'} (offline pack)`, type: pkg.type, bin: pkg.bin,
  engines: pkg.engines, license: pkg.license, homepage: pkg.homepage, repository: pkg.repository,
}, null, 2) + '\n');

// ── Catalogue data ───────────────────────────────────────────────────────────
const fmOf = (raw) => {
  const m = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (!m) return fm;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"')) { try { v = JSON.parse(v); } catch { v = v.slice(1, -1); } } else v = v.replace(/^'|'$/g, '');
    fm[kv[1]] = v;
  }
  return fm;
};
const bundleOf = new Map();
const bundles = [];
for (const b of readdirSync(join(ROOT, 'plugins')).sort()) {
  const dir = join(ROOT, 'plugins', b, 'skills');
  if (!NAME_RE.test(b) || !existsSync(dir)) continue;
  let n = 0;
  for (const s of readdirSync(dir)) if (existsSync(join(dir, s, 'SKILL.md'))) { if (!bundleOf.has(s)) bundleOf.set(s, b); n++; }
  if (n) bundles.push([b, n]);
}
const zh = buildZhCards().out;
const tw = new Set(existsSync(join(ROOT, 'skills-i18n', 'zh-TW')) ? readdirSync(join(ROOT, 'skills-i18n', 'zh-TW')) : []);
const trim = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);
const rows = [];
for (const name of readdirSync(join(ROOT, 'skills')).sort()) {
  const f = join(ROOT, 'skills', name, 'SKILL.md');
  if (!NAME_RE.test(name) || !existsSync(f)) continue;
  const fm = fmOf(readFileSync(f, 'utf8'));
  if (fm.deprecated) continue;
  const z = zh[name];
  rows.push([name, trim(fm.description || '', 240), bundleOf.get(name) || '', z ? z.title : '', z ? trim(z.description, 200) : '', tw.has(name) ? 1 : 0]);
}
const DATA = JSON.stringify({ version, bundles, skills: rows }).replace(/</g, '\\u003c');

// ── index.html: a catalogue that works from file:// (no fetch, no CDN) ─────
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PM Skills 离线目录 · Offline catalogue</title>
<style>
  :root { --bg: #f7f6f3; --panel: #ffffff; --text: #1d1f24; --muted: #5d636e; --border: #dcd8cf; --accent: #2f5d50; --chip: #e6efe9; }
  @media (prefers-color-scheme: dark) { :root { --bg: #111317; --panel: #1a1d23; --text: #e9e7e2; --muted: #a2a8b3; --border: #2e323a; --accent: #8fc7b4; --chip: #20302b; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.6 -apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", "Segoe UI", sans-serif; }
  main { max-width: 980px; margin: 0 auto; padding: 20px 16px 60px; }
  h1 { font-size: 24px; margin: 0 0 4px; }
  .muted { color: var(--muted); font-size: 13.5px; }
  .bar { display: grid; grid-template-columns: 1fr 260px; gap: 10px; margin: 16px 0 8px; }
  label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 4px; }
  input, select { width: 100%; padding: 9px 12px; font-size: 15px; border: 1px solid var(--border); border-radius: 10px; background: var(--panel); color: var(--text); }
  input:focus-visible, select:focus-visible, a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  ul { list-style: none; padding: 0; margin: 12px 0 0; }
  li { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; }
  li h2 { font-size: 16px; margin: 0 0 4px; }
  li h2 a { color: var(--accent); }
  li p { margin: 4px 0 0; }
  .chip { display: inline-block; background: var(--chip); border-radius: 999px; padding: 0 9px; font-size: 12px; margin-left: 6px; color: var(--text); }
  .links a { margin-right: 12px; font-size: 13.5px; color: var(--accent); }
  code { background: var(--chip); padding: 1px 5px; border-radius: 5px; font-size: 13px; }
  button { font: inherit; padding: 8px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--panel); color: var(--text); cursor: pointer; }
  @media (max-width: 640px) { .bar { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>
  <h1>PM Skills 离线目录</h1>
  <p class="muted">版本 <span id="ver"></span>，<span id="count"></span> 个技能。这个页面直接从本地文件打开，不联网。安装方法见 <a href="INSTALL-zh.md">INSTALL-zh.md</a>。<br>
    <span lang="en">Offline catalogue: opens from file://, makes no network requests. Click a skill to read its SKILL.md.</span></p>
  <div class="bar">
    <div><label for="q">搜索 · Search</label><input id="q" type="search" placeholder="例如：周报、补偿金、PRD" autocomplete="off" /></div>
    <div><label for="b">技能包 · Bundle</label><select id="b"><option value="">全部技能包 · All bundles</option></select></div>
  </div>
  <p class="muted" id="hint" role="status" aria-live="polite"></p>
  <p id="cmdline" class="muted"></p>
  <ul id="list"></ul>
  <p><button id="more" type="button" hidden>显示更多 · Show more</button></p>
</main>
<script>
const DATA = ${DATA};
const $ = (id) => document.getElementById(id);
$('ver').textContent = DATA.version; $('count').textContent = DATA.skills.length.toLocaleString('zh-CN');
for (const [b, n] of DATA.bundles) { const o = document.createElement('option'); o.value = b; o.textContent = b + ' (' + n + ')'; $('b').append(o); }
let limit = 60;
function render() {
  const q = $('q').value.trim().toLowerCase(), b = $('b').value;
  const hits = DATA.skills.filter((s) => (!b || s[2] === b) && (!q || s[0].includes(q) || s[1].toLowerCase().includes(q) || s[3].includes(q) || s[4].includes(q)));
  if (q) hits.sort((x, y) => (y[3] ? 1 : 0) - (x[3] ? 1 : 0));
  $('hint').textContent = hits.length + ' 个结果 · results';
  $('cmdline').textContent = b ? '只装这个包：node bin/cli.mjs add --agent trae --bundle ' + b : '';
  const list = $('list'); list.textContent = '';
  for (const s of hits.slice(0, limit)) {
    const li = document.createElement('li');
    const h = document.createElement('h2'); const a = document.createElement('a');
    a.href = (s[3] ? 'skills-i18n/zh/' : 'skills/') + s[0] + '/SKILL.md'; a.textContent = s[3] ? s[3] + ' · ' + s[0] : s[0];
    h.append(a);
    if (s[2]) { const c = document.createElement('span'); c.className = 'chip'; c.textContent = s[2]; h.append(c); }
    li.append(h);
    const p = document.createElement('p'); p.textContent = s[4] || s[1]; li.append(p);
    const links = document.createElement('p'); links.className = 'links';
    const en = document.createElement('a'); en.href = 'skills/' + s[0] + '/SKILL.md'; en.textContent = 'English'; links.append(en);
    if (s[3]) { const z = document.createElement('a'); z.href = 'skills-i18n/zh/' + s[0] + '/SKILL.md'; z.textContent = '简体中文'; links.append(z); }
    if (s[5]) { const t = document.createElement('a'); t.href = 'skills-i18n/zh-TW/' + s[0] + '/SKILL.md'; t.textContent = '繁體中文'; links.append(t); }
    li.append(links); list.append(li);
  }
  $('more').hidden = hits.length <= limit;
}
$('q').addEventListener('input', () => { limit = 60; render(); });
$('b').addEventListener('change', () => { limit = 60; render(); });
$('more').addEventListener('click', () => { limit += 120; render(); });
render();
</script>
</body>
</html>
`;
writeFileSync(join(top, 'index.html'), html);

// ── INSTALL-zh.md ────────────────────────────────────────────────────────────
const install = `# PM Skills 内网离线包 v${version}

这个包在没有互联网的电脑上也能用：不需要 npm、不需要账号、没有遥测，不会访问任何网络地址。

## 包里有什么

- \`index.html\`：离线目录，双击用浏览器打开，可以搜索、按技能包筛选
- \`skills/\`：全部技能（英文原版，每个文件夹一个 \`SKILL.md\`）
- \`skills-i18n/\`：译文，\`zh\` 是简体中文，\`zh-TW\` 是繁体中文
- \`plugins/\`：技能包清单（用于 \`--bundle\` 只装部分技能）
- \`mcp/\`：本地 MCP 服务器，\`node mcp/server.mjs\`（stdio），Cherry Studio 等支持 MCP 的客户端可以接入
- \`exports/\`：Cursor、Windsurf、Aider、Kilo Code 格式的规则文件
- \`bin/\`：命令行工具，只依赖 Node.js 18 或更新版本，不需要 \`npm install\`
- \`agents/\`、\`commands/\`、\`output-styles/\`：Claude Code 用的子智能体、斜杠命令和输出样式

## 先校验文件

把 \`${NAME}.zip\` 和 \`${NAME}.zip.sha256\` 放在同一个文件夹：

- Linux、统信 UOS、银河麒麟：\`sha256sum -c ${NAME}.zip.sha256\`
- macOS：\`shasum -a 256 -c ${NAME}.zip.sha256\`
- Windows PowerShell：\`(Get-FileHash ${NAME}.zip -Algorithm SHA256).Hash\`，与 .sha256 文件里的值比对（不区分大小写）

## 安装到 AI 工具（有 Node.js）

在解压后的 \`${NAME}\` 文件夹里运行：

\`\`\`bash
# Trae（项目里的 .trae/rules/），也可换成 qoder、lingma（通义灵码）、codebuddy
node bin/cli.mjs add --agent trae --target /你的项目/.trae/rules

# Claude Code（写入 ~/.claude/skills/）
node bin/cli.mjs add --agent claude

# 只装中文职场、考试和生活三个包
node bin/cli.mjs add --agent lingma --target /你的项目/.lingma/rules --bundle pm-china-work,pm-china-exams,pm-china-life

# 先看看会写哪些文件
node bin/cli.mjs add --agent trae --dry-run
\`\`\`

Cursor、Windsurf、Aider、Kilo Code 也一样：\`node bin/cli.mjs add --agent cursor --target /你的项目/.cursor/rules\`（规则文件在 \`exports/\` 里）。

## 安装到 AI 工具（没有 Node.js）

技能就是文本文件，直接复制即可：

- Claude Code：把 \`skills/\` 下需要的文件夹复制到 \`~/.claude/skills/\`（Windows 是 \`%USERPROFILE%\\.claude\\skills\\\`）
- Trae、通义灵码、CodeBuddy：在项目里新建 \`.trae/rules/\`（或 \`.lingma/rules/\`、\`.codebuddy/rules/\`），把 \`SKILL.md\` 复制进去并改名为 \`<技能名>.md\`
- 想用中文版：用 \`skills-i18n/zh/<技能名>/SKILL.md\` 替换同名技能的 \`SKILL.md\`

## 配合本地模型

把任意一个 \`SKILL.md\` 的全文作为系统提示词（system prompt），再把你的问题作为用户消息发给本地模型（Ollama、LM Studio、vLLM 等）即可。详见仓库里的 \`docs/zh/local-models.md\`。

## 更新

在能联网的电脑上重新下载最新的离线包，校验后拷进内网，解压覆盖旧文件夹，再运行一次上面的 \`add\` 命令。

- GitHub Pages：https://mohitagw15856.github.io/pm-claude-skills/offline/${NAME}.zip
- Gitee 发行版：https://gitee.com/mohitagw/pm-claude-skills/releases

完整说明：https://gitee.com/mohitagw/pm-claude-skills/blob/main/docs/zh/offline.md · 协议：MIT
`;
writeFileSync(join(top, 'INSTALL-zh.md'), install);

// ── Zip and checksum ─────────────────────────────────────────────────────────
mkdirSync(outDir, { recursive: true });
rmSync(zipPath, { force: true });
const z = spawnSync('zip', ['-r', '-X', '-q', '-9', zipPath, NAME], { cwd: stage, stdio: 'inherit' });
if (z.status !== 0) { console.error('✗ zip failed (is the zip command installed?)'); process.exit(z.status || 1); }
const hash = createHash('sha256').update(readFileSync(zipPath)).digest('hex');
writeFileSync(`${zipPath}.sha256`, `${hash}  ${NAME}.zip\n`);
rmSync(stage, { recursive: true, force: true });

const mb = statSync(zipPath).size / 1048576;
console.log(`Wrote ${relative(ROOT, zipPath)} (${mb.toFixed(1)} MB, ${rows.length} skills, ${Object.keys(zh).length} in Chinese, ${members.length + 3} top-level entries, exports for ${RULEFILE_EXPORTS.join('/')})`);
console.log(`sha256 ${hash}`);
if (mb > maxMb) { console.error(`✗ ${mb.toFixed(1)} MB is over the ${maxMb} MB limit`); process.exit(1); }
