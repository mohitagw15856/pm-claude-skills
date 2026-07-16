#!/usr/bin/env node
// The localized edition — a public front door for each translated language.
// The playground UI already speaks EN/ZH (i18n.js) and scripts/translate-skills
// produces translated SKILL.md files under i18n/<lang>/. This turns those into a
// browsable, static landing page per language: a titled grid of the localized
// skills, each linking into the playground, with the translation-provenance
// honesty note carried through. → web/editions/<lang>.html
//
//   node scripts/build-localized-landing.mjs           # all languages under i18n/
//   node scripts/build-localized-landing.mjs --lang es # just one
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Per-language display strings for the landing chrome (kept small on purpose;
// the source of truth for full UI i18n is web/i18n.js).
const L = {
  es: { name: 'Español', tag: 'La biblioteca de habilidades profesionales, en español.', lead: 'Habilidades de código abierto que enseñan a la IA la estructura que usa un profesional senior. Ejecuta cualquiera en el playground.', run: 'Abrir', note: 'Traducción automática — revisión pendiente. Se agradecen correcciones de hablantes nativos vía PR.', all: 'Ver todas las habilidades' },
  pt: { name: 'Português', tag: 'A biblioteca de habilidades profissionais, em português.', lead: 'Habilidades de código aberto que ensinam a IA a estrutura que um profissional sênior usa. Execute qualquer uma no playground.', run: 'Abrir', note: 'Tradução automática — revisão pendente. Correções de falantes nativos são bem-vindas via PR.', all: 'Ver todas as habilidades' },
  hi: { name: 'हिन्दी', tag: 'पेशेवर कौशल पुस्तकालय, हिंदी में।', lead: 'ओपन-सोर्स कौशल जो AI को वरिष्ठ पेशेवर की संरचना सिखाते हैं। किसी को भी playground में चलाएँ।', run: 'खोलें', note: 'मशीन अनुवाद — समीक्षा लंबित। मूल वक्ताओं से सुधार का स्वागत है।', all: 'सभी कौशल देखें' },
  ja: { name: '日本語', tag: 'プロフェッショナルスキルのライブラリを、日本語で。', lead: 'シニアプロが使う構造をAIに教えるオープンソースのスキル。playgroundでどれでも実行できます。', run: '開く', note: '機械翻訳 — レビュー待ち。ネイティブによる修正を歓迎します。', all: 'すべてのスキルを見る' },
  de: { name: 'Deutsch', tag: 'Die Bibliothek professioneller Skills, auf Deutsch.', lead: 'Open-Source-Skills, die der KI die Struktur eines erfahrenen Profis beibringen. Führe jeden im Playground aus.', run: 'Öffnen', note: 'Maschinell übersetzt — Überprüfung ausstehend. Korrekturen von Muttersprachlern per PR willkommen.', all: 'Alle Skills ansehen' },
  fr: { name: 'Français', tag: 'La bibliothèque de compétences professionnelles, en français.', lead: 'Des compétences open-source qui enseignent à l\'IA la structure d\'un professionnel expérimenté. Exécutez-en une dans le playground.', run: 'Ouvrir', note: 'Traduction automatique — révision en attente. Corrections de locuteurs natifs bienvenues via PR.', all: 'Voir toutes les compétences' },
  ko: { name: '한국어', tag: '전문 스킬 라이브러리, 한국어로.', lead: '시니어 전문가의 구조를 AI에게 가르치는 오픈소스 스킬. playground에서 무엇이든 실행하세요.', run: '열기', note: '기계 번역 — 검토 대기 중. 원어민의 수정 PR을 환영합니다.', all: '모든 스킬 보기' },
  zh: { name: '中文', tag: '专业技能库，中文版。', lead: '开源技能，教会 AI 资深专家所用的结构。在技能场中运行任意一个。', run: '打开', note: '机器翻译 — 待审校。欢迎母语者通过 PR 修正。', all: '查看所有技能' },
};

const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';

// Parse the minimal frontmatter (name + description) and the first localized H1.
function readSkill(dir, name) {
  const p = join(dir, name, 'SKILL.md');
  if (!existsSync(p)) return null;
  const raw = readFileSync(p, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  const block = fm ? fm[1] : '';
  const nm = (block.match(/^name:\s*(.+)$/m) || [])[1];
  const desc = (block.match(/^description:\s*"?([\s\S]*?)"?\s*$/m) || [])[1] || '';
  const h1 = (raw.split(/\n---\n/).slice(1).join('\n---\n').match(/^#\s+(.+)$/m) || [])[1];
  return { name: (nm || name).trim(), title: (h1 || name).trim(), desc: desc.replace(/\s+/g, ' ').trim().slice(0, 180) };
}

function build(lang) {
  const dir = join(root, 'i18n', lang, 'skills');
  if (!existsSync(dir)) { console.log(`- ${lang}: no i18n/${lang}/skills — skipping`); return; }
  const t = L[lang] || { name: lang, tag: '', lead: '', run: 'Open', note: 'Machine-translated — review pending.', all: 'All skills' };
  const names = readdirSync(dir).filter((n) => existsSync(join(dir, n, 'SKILL.md'))).sort();
  const cards = names.map((n) => readSkill(dir, n)).filter(Boolean);
  const grid = cards.map((s) => `<a class="card" href="${SITE}/?skill=${encodeURIComponent(s.name)}">
    <h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p><span class="run">${esc(t.run)} →</span></a>`).join('\n');

  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(t.name)} · PM Skills</title>
<meta name="description" content="${esc(t.tag)}">
<style>
:root{--bg:#0d1117;--panel:#161b22;--border:#30363d;--text:#e6edf3;--muted:#9198a1;--accent:#d9605a}
*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:var(--bg);color:var(--text)}
.wrap{max-width:1000px;margin:0 auto;padding:28px 22px 70px}
header{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap}
h1{font-size:26px;margin:0}.tag{color:var(--muted);font-size:15px}
.lead{color:var(--muted);font-size:14.5px;margin:10px 0 4px;max-width:70ch}
.note{font-size:12.5px;color:var(--muted);background:var(--panel);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:0 8px 8px 0;padding:9px 13px;margin:14px 0}
.langs{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 8px}
.langs a{font-size:12.5px;color:var(--text);text-decoration:none;border:1px solid var(--border);border-radius:999px;padding:5px 11px;background:var(--panel)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;margin-top:16px}
.card{display:block;border:1px solid var(--border);border-radius:12px;background:var(--panel);padding:14px;text-decoration:none;color:var(--text)}
.card:hover{border-color:var(--accent)}
.card h3{margin:0 0 6px;font-size:15px}.card p{margin:0 0 8px;font-size:12.5px;color:var(--muted);line-height:1.4}
.card .run{font-size:12px;color:var(--accent);font-weight:700}
.count{color:var(--muted);font-size:13px}
a.home{color:var(--accent);text-decoration:none;font-size:13px}
</style></head><body>
<div class="wrap">
  <header><h1>PM Skills</h1><span class="tag">${esc(t.tag)}</span></header>
  <p class="lead">${esc(t.lead)}</p>
  <div class="langs">${Object.keys(L).filter((k) => existsSync(join(root, 'i18n', k, 'skills'))).map((k) => `<a href="${k}.html">${esc(L[k].name)}</a>`).join('')}<a href="${SITE}/">English ↗</a></div>
  <p class="note">${esc(t.note)}</p>
  <p class="count">${cards.length} · <a class="home" href="${SITE}/">${esc(t.all)} ↗</a></p>
  <div class="grid">
${grid}
  </div>
</div>
</body></html>`;

  const outDir = join(root, 'web', 'editions');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, `${lang}.html`), html);
  console.log(`- ${lang}: wrote web/editions/${lang}.html (${cards.length} skills)`);
}

const only = arg('lang');
const langs = only ? [only] : readdirSync(join(root, 'i18n')).filter((d) => existsSync(join(root, 'i18n', d, 'skills')));
if (!langs.length) { console.log('No translated editions found under i18n/.'); process.exit(0); }
console.log(`Building localized landings for: ${langs.join(', ')}`);
for (const l of langs) build(l);
