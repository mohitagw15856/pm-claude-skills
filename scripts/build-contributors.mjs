#!/usr/bin/env node
// Contributor credits in the all-contributors format (.all-contributorsrc is the
// source of truth, so the all-contributors bot and CLI work with it too). Renders
// the table between the ALL-CONTRIBUTORS-LIST markers in README.md and the levels
// card docs/readme-assets/contributor-levels.svg.
//
//   node scripts/build-contributors.mjs                         # write the table and the card
//   node scripts/build-contributors.mjs --check                 # fail if either is stale
//   node scripts/build-contributors.mjs --add <login> <type,type>   # add or extend someone, then write
//
// Types (all-contributors keys): code, content, translation, review, bug, doc,
// plugin, ideas, infra, maintenance. --add reads the public profile from the
// GitHub API (no token needed; GITHUB_TOKEN raises the rate limit). Emails are
// never read or printed.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const RC = join(root, '.all-contributorsrc');
const README = join(root, 'README.md');
const CARD = join(root, 'docs', 'readme-assets', 'contributor-levels.svg');
const START = '<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->';
const END = '<!-- ALL-CONTRIBUTORS-LIST:END -->';
const TYPES = {
  code: ['💻', 'Code'], content: ['🖋', 'Skills and content'], translation: ['🌍', 'Translation'], review: ['👀', 'Review'],
  bug: ['🐛', 'Bug reports and fixes'], doc: ['📖', 'Documentation'], plugin: ['🔌', 'Skill libraries'], ideas: ['🤔', 'Ideas'],
  infra: ['🚇', 'Infrastructure'], maintenance: ['🚧', 'Maintenance'],
};
const LOGIN = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const has = (n) => process.argv.includes(`--${n}`);

const rc = JSON.parse(readFileSync(RC, 'utf8'));

function table() {
  const per = rc.contributorsPerLine || 6;
  const people = rc.contributors;
  const rows = [];
  for (let i = 0; i < people.length; i += per) {
    const cells = people.slice(i, i + per).map((c) => {
      const badges = c.contributions.map((t) => `<span title="${esc((TYPES[t] || ['', t])[1])}">${(TYPES[t] || ['❓'])[0]}</span>`).join(' ');
      return `      <td align="center" valign="top" width="${Math.floor(100 / per)}%"><a href="${esc(c.profile)}"><img src="${esc(c.avatar_url)}${c.avatar_url.includes('?') ? '&' : '?'}s=${rc.imageSize || 72}" width="${rc.imageSize || 72}px;" alt="${esc(c.name)}"/><br /><sub><b>${esc(c.name)}</b></sub></a><br />${badges}</td>`;
    });
    rows.push(`    <tr>\n${cells.join('\n')}\n    </tr>`);
  }
  return `${START}\n<!-- prettier-ignore-start -->\n<!-- markdownlint-disable -->\n<table>\n  <tbody>\n${rows.join('\n')}\n  </tbody>\n</table>\n\n<!-- markdownlint-restore -->\n<!-- prettier-ignore-end -->\n\n${END}`;
}

// The levels card: what counts as a contribution, and how many people have made each kind.
function card(dark) {
  const c = dark ? { bg: '#0d1117', panel: '#161b22', text: '#e6edf3', muted: '#8b949e', line: '#30363d', accent: '#f2a65a' }
                 : { bg: '#ffffff', panel: '#f6f8fa', text: '#1f2328', muted: '#57606a', line: '#d0d7de', accent: '#c46f1f' };
  const counts = Object.fromEntries(Object.keys(TYPES).map((t) => [t, rc.contributors.filter((p) => p.contributions.includes(t)).length]));
  const steps = [
    ['🐛', 'Report or fix a bug', 'bug', 'Open an issue or a pull request'],
    ['🌍', 'Translate a skill', 'translation', 'Claim one on the translation board'],
    ['🖋', 'Write a skill', 'content', 'make-me-a-skill, then skillcheck'],
    ['👀', 'Review', 'review', 'Check other people\'s skills and translations'],
    ['🚧', 'Maintain', 'maintenance', 'Look after a bundle or a language'],
  ];
  const w = 860, rowH = 50, top = 70, h = top + steps.length * rowH + 30;
  const rows = steps.map(([emoji, title, key, how], i) => {
    const y = top + i * rowH;
    const n = counts[key] || 0;
    return `<g transform="translate(24 ${y})"><rect width="${w - 48}" height="${rowH - 10}" rx="10" fill="${c.panel}" stroke="${c.line}"/>`
      + `<text x="18" y="27" font-size="18">${emoji}</text><text x="52" y="20" font-size="15" font-weight="700" fill="${c.text}">${i + 1}. ${esc(title)}</text>`
      + `<text x="52" y="35" font-size="12.5" fill="${c.muted}">${esc(how)}</text>`
      + `<text x="${w - 72}" y="27" text-anchor="end" font-size="13" fill="${c.accent}" font-weight="700">${n} ${n === 1 ? 'person' : 'people'}</text></g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="Ways to contribute, from reporting a bug to maintaining a bundle, with how many people have done each">`
    + `<style>text{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Noto Sans CJK SC",sans-serif}</style>`
    + `<rect width="${w}" height="${h}" rx="14" fill="${c.bg}"/>`
    + `<text x="24" y="38" font-size="20" font-weight="800" fill="${c.text}">Levels of contribution</text>`
    + `<text x="24" y="56" font-size="13" fill="${c.muted}">${rc.contributors.length} contributors so far. Every level is credited in the table below the wall.</text>`
    + rows + `</svg>\n`;
}

async function add(login, types) {
  if (!LOGIN.test(login || '')) throw new Error('--add needs a GitHub login');
  const list = String(types || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!list.length || list.some((t) => !TYPES[t])) throw new Error(`types must be from: ${Object.keys(TYPES).join(', ')}`);
  const headers = { 'User-Agent': 'pm-claude-skills-contributors', Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(`https://api.github.com/users/${login}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${login}`);
  const u = await res.json();
  const existing = rc.contributors.find((c) => c.login.toLowerCase() === u.login.toLowerCase());
  if (existing) existing.contributions = [...new Set([...existing.contributions, ...list])];
  else rc.contributors.push({ login: u.login, name: u.name || u.login, avatar_url: u.avatar_url, profile: u.html_url, contributions: list });
  writeFileSync(RC, JSON.stringify(rc, null, 2) + '\n');
  console.log(`${existing ? 'Updated' : 'Added'} ${u.login}: ${list.join(', ')}`);
}

const i = process.argv.indexOf('--add');
if (i !== -1) await add(process.argv[i + 1], process.argv[i + 2]);

const readme = readFileSync(README, 'utf8');
const a = readme.indexOf(START), b = readme.indexOf(END);
if (a === -1 || b === -1) { console.error(`README.md is missing the ${START} … ${END} markers.`); process.exit(1); }
const nextReadme = readme.slice(0, a) + table() + readme.slice(b + END.length);
const cards = { [CARD]: card(true), [CARD.replace('.svg', '-light.svg')]: card(false) };
if (has('check')) {
  const stale = [];
  if (nextReadme !== readme) stale.push('README.md contributors table');
  for (const [p, svg] of Object.entries(cards)) { let cur = ''; try { cur = readFileSync(p, 'utf8'); } catch { /* missing */ } if (cur !== svg) stale.push(p.slice(root.length + 1)); }
  if (stale.length) { console.error(`Contributors: stale ${stale.join(', ')}. Run node scripts/build-contributors.mjs`); process.exit(1); }
  console.log(`Contributors: ${rc.contributors.length} credited, table and card up to date. ✓`);
} else {
  writeFileSync(README, nextReadme);
  for (const [p, svg] of Object.entries(cards)) writeFileSync(p, svg);
  console.log(`Wrote the contributors table (${rc.contributors.length} people) and the levels card.`);
}
