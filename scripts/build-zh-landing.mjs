#!/usr/bin/env node
// Chinese landing pages for search engines in China (Baidu, Bing China, 360,
// Sogou): one static page per Simplified Chinese skill at web/zh/<skill>.html,
// plus a hub at web/zh/index.html, with Chinese titles and descriptions,
// schema.org data, hreflang links to the English skill page, and install
// commands that use the domestic mirrors. Appends the pages to web/sitemap.xml
// when it exists (run after scripts/build-skill-pages.mjs).
//
// Built at deploy time; web/zh/ is gitignored.
//
//   node scripts/build-zh-landing.mjs [--out web/zh]
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontmatter, zhPrompt } from '../bin/today.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/build-zh-landing.mjs [--out web/zh]');
  process.exit(0);
}
const oi = argv.indexOf('--out');
const OUT = resolve(root, oi !== -1 && argv[oi + 1] ? argv[oi + 1] : 'web/zh');
const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const GITEE = 'https://gitee.com/mohitagw/pm-claude-skills';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const catalogue = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8')).skills.filter((s) => !s.deprecated);
const byName = new Map(catalogue.map((s) => [s.name, s]));
const BUNDLE_ZH = {
  'pm-china-work': '职场办公', 'pm-china-yearend': '年终总结', 'pm-china-exams': '考试与求职', 'pm-china-life': '生活事务', 'pm-china-compliance': '数据合规',
  'pm-zh-content': '内容平台', 'pm-chuhai': '出海', 'pm-cv': '简历', 'pm-jobsearch': '求职', 'pm-career': '职业发展', 'pm-layoff': '裁员应对',
  'pm-essentials': '产品经理基础', 'pm-planning': '规划与优先级', 'pm-delivery': '项目交付', 'pm-data': '数据分析', 'pm-engineering': '工程',
  'pm-gtm': '市场与发布', 'pm-decoders': '文件解读', 'pm-renters': '租房', 'pm-personal': '个人事务', 'pm-calculators': '计算器', 'pm-cross': '通用',
};

const pages = [];
const dir = join(root, 'skills-i18n', 'zh');
for (const name of readdirSync(dir).sort()) {
  const f = join(dir, name, 'SKILL.md');
  if (!existsSync(f) || !byName.has(name)) continue;
  const { fm, body } = frontmatter(readFileSync(f, 'utf8'));
  const title = ((body.match(/^# (.+)$/m) || [])[1] || name).replace(/技能$/, '').trim();
  const desc = (fm.description || '').replace(/^["']|["']$/g, '');
  const lead = desc.split('。')[0];
  const produces = ((body.match(/##\s*这个技能产出什么[^\n]*\n([\s\S]*?)(?=\n##\s|$)/) || [])[1] || '')
    .split('\n').map((l) => l.replace(/^[-*]\s*/, '').replace(/\*\*/g, '').trim()).filter(Boolean).slice(0, 6);
  const triggers = ((body.match(/##\s*示例触发语[^\n]*\n([\s\S]*?)(?=\n##\s|$)/) || [])[1] || '')
    .split('\n').map((l) => l.replace(/^[-*]\s*/, '').replace(/^[“"「]|[”"」]$/g, '').trim()).filter((l) => /[一-鿿]/.test(l)).slice(0, 4);
  const s = byName.get(name);
  pages.push({ name, title, desc, lead, produces, triggers: triggers.length ? triggers : [zhPrompt(desc)].filter(Boolean), bundle: s.plugin, updated: s.updated });
}

const CSS = `body{margin:0;font-family:'PingFang SC','Noto Sans CJK SC','Microsoft YaHei',-apple-system,'Segoe UI',sans-serif;background:#15181d;color:#eef1f4;line-height:1.75}
a{color:#f2a65a}main{max-width:760px;margin:0 auto;padding:28px 22px 70px}h1{font-size:28px;margin:6px 0}
.crumb{color:#9aa4b1;font-size:13px}.lead{color:#c9d1d9;font-size:16px}.card{background:#1f242b;border:1px solid #2f3640;border-radius:14px;padding:16px 20px;margin:18px 0}
code,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}pre{background:#0f1216;border-radius:10px;padding:12px 14px;overflow-x:auto;font-size:13.5px}
.q{background:#2c3a4a;border-radius:12px;padding:8px 12px;margin:6px 0;display:block}.muted{color:#9aa4b1;font-size:13px}
ul.grid{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}ul.grid li{background:#1f242b;border:1px solid #2f3640;border-radius:12px;padding:10px 14px}
@media (prefers-color-scheme: light){body{background:#f7f4ee;color:#1f2328}.card,ul.grid li{background:#fff;border-color:#e3ddd2}.lead{color:#3d444d}.q{background:#e3eef8}pre{background:#efeae0}a{color:#b5651d}}`;

function page(p) {
  const url = `${BASE}/zh/${p.name}.html`;
  const en = `${BASE}/skill/${p.name}.html`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'TechArticle', inLanguage: 'zh-CN', headline: `${p.title}：AI 技能`, description: p.desc, url,
    dateModified: p.updated || undefined, author: { '@type': 'Person', name: 'Mohit Aggarwal' }, isPartOf: { '@type': 'WebSite', name: 'PM Skills', url: BASE },
    keywords: [p.title, 'AI 技能', 'Agent Skill', 'DeepSeek', '通义千问', 'Claude', BUNDLE_ZH[p.bundle] || ''].filter(Boolean).join('，'),
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PM Skills 中文技能', item: `${BASE}/zh/` },
      { '@type': 'ListItem', position: 2, name: p.title, item: url },
    ],
  }];
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${esc(p.title)}：${esc(p.lead.slice(0, 40))} | PM Skills 中文技能</title>
<meta name="description" content="${esc(p.desc.slice(0, 150))}" />
<meta name="keywords" content="${esc([p.title, 'AI 技能', 'AI 写作', BUNDLE_ZH[p.bundle] || '', 'DeepSeek', '通义千问'].filter(Boolean).join(','))}" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="zh-CN" href="${url}" />
<link rel="alternate" hreflang="en" href="${en}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(p.title)}：PM Skills 中文技能" />
<meta property="og:description" content="${esc(p.lead)}" />
<meta property="og:url" content="${url}" />
<meta property="og:locale" content="zh_CN" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>${CSS}</style>
</head>
<body>
<main>
<div class="crumb"><a href="index.html">中文技能</a> › ${esc(BUNDLE_ZH[p.bundle] || p.bundle)} › ${esc(p.title)}</div>
<h1>${esc(p.title)}</h1>
<p class="lead">${esc(p.desc)}</p>
${p.produces.length ? `<div class="card"><h2 style="font-size:17px;margin:0 0 6px">它能帮你做出什么</h2><ul>${p.produces.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
${p.triggers.length ? `<div class="card"><h2 style="font-size:17px;margin:0 0 6px">直接这样说</h2>${p.triggers.map((t) => `<span class="q">${esc(t)}</span>`).join('')}</div>` : ''}
<div class="card">
<h2 style="font-size:17px;margin:0 0 6px">怎么用</h2>
<p>在线试用，不用安装：<a href="${BASE}/index.html?skill=${encodeURIComponent(p.name)}">打开在线工作台</a>，可以用你自己的 DeepSeek、通义千问、Kimi 或智谱 Key。</p>
<p>装进你的 AI 编程工具（走国内镜像）：</p>
<pre>npx --registry=https://registry.npmmirror.com pm-claude-skills add --agent trae --bundle ${esc(p.bundle)}</pre>
<p class="muted">也可以换成 qoder、lingma（通义灵码）、codebuddy 或 claude。技能原文：<a href="${GITEE}/blob/main/skills-i18n/zh/${p.name}/SKILL.md">Gitee 镜像</a> · <a href="${en}" hreflang="en">English</a></p>
</div>
<p class="muted">PM Skills 是开源的专业技能库（MIT 协议），每个技能是一份 Markdown 文件，告诉 AI 助手怎样把一件专业的事做到资深同事的水平。涉及法律、税务、社保的内容只做参考，以官方最新规定为准。</p>
</main>
</body>
</html>
`;
}

mkdirSync(OUT, { recursive: true });
for (const p of pages) writeFileSync(join(OUT, `${p.name}.html`), page(p));
const groups = {};
for (const p of pages) (groups[p.bundle] ||= []).push(p);
const ORDER = ['pm-china-work', 'pm-china-yearend', 'pm-china-life', 'pm-china-exams', 'pm-china-compliance', 'pm-zh-content', 'pm-chuhai', 'pm-cv'];
const keys = Object.keys(groups).sort((a, b) => ((ORDER.indexOf(a) + 1 || 99) - (ORDER.indexOf(b) + 1 || 99)) || a.localeCompare(b));
writeFileSync(join(OUT, 'index.html'), `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>PM Skills 中文技能：周报、述职、考公、劳动法、出海，一句话出成品</title>
<meta name="description" content="${pages.length} 个简体中文 AI 技能：周报、述职、晋升答辩、申论、考研规划、经济补偿金、个税汇算、小红书、出海。开源免费，支持 DeepSeek、通义千问、Kimi、Claude。" />
<link rel="canonical" href="${BASE}/zh/" />
<link rel="alternate" hreflang="zh-CN" href="${BASE}/zh/" />
<link rel="alternate" hreflang="en" href="${BASE}/" />
<style>${CSS}</style>
</head>
<body>
<main>
<h1>PM Skills 中文技能</h1>
<p class="lead">${pages.length} 个简体中文技能，用中文说需求，AI 交付成品。开源免费（MIT），国内可以通过 <a href="${GITEE}">Gitee 镜像</a> 和 npmmirror 安装。</p>
${keys.map((k) => `<h2 style="font-size:18px;margin-top:26px">${esc(BUNDLE_ZH[k] || k)}</h2><ul class="grid">${groups[k].map((p) => `<li><a href="${p.name}.html">${esc(p.title)}</a><br><span class="muted">${esc(p.lead.slice(0, 34))}</span></li>`).join('')}</ul>`).join('\n')}
</main>
</body>
</html>
`);
// Add the pages to the sitemap built by scripts/build-skill-pages.mjs.
const sm = join(root, 'web', 'sitemap.xml');
if (existsSync(sm) && OUT === join(root, 'web', 'zh')) {
  let xml = readFileSync(sm, 'utf8');
  if (!xml.includes(`${BASE}/zh/`)) {
    const urls = [`${BASE}/zh/`, ...pages.map((p) => `${BASE}/zh/${p.name}.html`)];
    xml = xml.replace('</urlset>', `${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>`);
    writeFileSync(sm, xml);
  }
}
console.log(`Wrote ${pages.length} Chinese landing pages and a hub to ${OUT.replace(`${root}/`, '')}/.`);
