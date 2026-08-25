#!/usr/bin/env node
// Static accessibility audit across every page in web/.
//
// The library ships an `accessibility-audit` skill and web/a11y.js gives
// visitors a contrast/dyslexia/motion panel — but the playground's own pages
// had never been audited. Lighthouse gates accessibility at 0.9, on two URLs,
// once a week. There are 94 pages.
//
// These are the WCAG 2.2 failures decidable from the markup alone, which is
// most of the ones that actually bite: an image with no alt text, an input with
// no label, a button whose only content is an icon, a zoom-disabling viewport.
// Contrast, focus order and screen-reader flow need a browser and stay with
// Lighthouse; this catches the cheap, common, high-impact half on every push.
//
//   node scripts/check-a11y.mjs            # report
//   node scripts/check-a11y.mjs --check    # exit 1 on any error-level finding
//   node scripts/check-a11y.mjs --json
//   node scripts/check-a11y.mjs --page web/index.html
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = join(root, 'web');
const has = (f) => process.argv.includes(f);
const arg = (f) => { const i = process.argv.indexOf(f); return i >= 0 ? process.argv[i + 1] : ''; };

const ERROR = 'error';
const WARN = 'warn';

// Strip comments and inline script/style so their contents cannot be mistaken
// for markup — a `<img>` inside a JS template string is not a real image here.
const strip = (html) => html
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '<style></style>');

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i'));
  if (!m) return null;
  return (m[2] ?? m[3] ?? m[4] ?? '').trim();
};
const hasAttr = (tag, name) => new RegExp(`\\b${name}\\b`, 'i').test(tag);

const hidden = (tag) =>
  hasAttr(tag, 'hidden') ||
  (attr(tag, 'aria-hidden') || '').toLowerCase() === 'true' ||
  /display\s*:\s*none/i.test(attr(tag, 'style') || '');

// An element is named if it has text, an ARIA label, a title — or, for a link
// or button wrapping an image, that image's alt text, which is how a great many
// icon and thumbnail links are correctly labelled.
const named = (tag, inner) => {
  if (attr(tag, 'aria-label') || attr(tag, 'aria-labelledby') || attr(tag, 'title')) return true;
  if (!inner) return false;
  for (const img of inner.match(/<img\b[^>]*>/gi) || []) {
    if ((attr(img, 'alt') || '').trim()) return true;
  }
  return inner.replace(/<[^>]+>/g, '').trim().length > 0;
};

function auditPage(file) {
  const raw = readFileSync(file, 'utf8');
  const html = strip(raw);
  const rel = 'web/' + basename(file);
  const out = [];
  const add = (level, rule, detail) => out.push({ page: rel, level, rule, detail });

  // ── Document-level ────────────────────────────────────────────────────────
  const htmlTag = (html.match(/<html\b[^>]*>/i) || [''])[0];
  if (htmlTag && !attr(htmlTag, 'lang')) add(ERROR, 'html-lang', '<html> has no lang attribute — screen readers guess the language');

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1].trim();
  if (!title) add(ERROR, 'page-title', 'no non-empty <title>');

  const viewport = (html.match(/<meta\b[^>]*name\s*=\s*["']?viewport["']?[^>]*>/i) || [''])[0];
  if (viewport) {
    const c = (attr(viewport, 'content') || '').toLowerCase();
    if (/user-scalable\s*=\s*no/.test(c) || /maximum-scale\s*=\s*1(\.0)?\b/.test(c)) {
      add(ERROR, 'zoom-disabled', 'viewport prevents pinch-zoom (WCAG 1.4.4)');
    }
  }

  // ── Images ────────────────────────────────────────────────────────────────
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    const role = (attr(tag, 'role') || '').toLowerCase();
    if (role === 'presentation' || role === 'none') continue;
    if (!hasAttr(tag, 'alt')) {
      add(ERROR, 'img-alt', `<img> without alt: ${(attr(tag, 'src') || '?').slice(0, 70)}`);
    }
  }

  // ── Form controls ─────────────────────────────────────────────────────────
  const labelFor = new Set();
  for (const tag of html.match(/<label\b[^>]*>/gi) || []) {
    const f = attr(tag, 'for');
    if (f) labelFor.add(f);
  }
  // Controls wrapped in their own <label> are labelled implicitly — no `for`
  // needed, and it is the more robust pattern for radios and checkboxes.
  const implicit = new Set();
  for (const m of html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)) {
    const text = m[1].replace(/<[^>]+>/g, '').trim();
    for (const c of m[1].match(/<(input|select|textarea)\b[^>]*>/gi) || []) {
      if (text) implicit.add(c);
    }
  }
  for (const tag of html.match(/<(input|select|textarea)\b[^>]*>/gi) || []) {
    const type = (attr(tag, 'type') || '').toLowerCase();
    if (['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) continue;
    if (hidden(tag)) continue;
    const id = attr(tag, 'id');
    const labelled = (id && labelFor.has(id)) || implicit.has(tag)
      || attr(tag, 'aria-label') || attr(tag, 'aria-labelledby') || attr(tag, 'title');
    if (!labelled) {
      add(ERROR, 'control-label', `${(tag.match(/<(\w+)/) || [, '?'])[1]}${id ? `#${id}` : ''}${type ? `[type=${type}]` : ''} has no label`);
    }
  }

  // ── Buttons and links need an accessible name ─────────────────────────────
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const btn = '<button' + m[1] + '>';
    if (hidden(btn)) continue;
    if (!named(btn, m[2])) add(ERROR, 'button-name', 'a <button> has no text or aria-label');
  }
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const tag = '<a' + m[1] + '>';
    if (!attr(tag, 'href') || hidden(tag)) continue;
    if (!named(tag, m[2])) add(ERROR, 'link-name', `an <a href="${(attr(tag, 'href') || '').slice(0, 50)}"> has no text or aria-label`);
  }

  // ── Headings ──────────────────────────────────────────────────────────────
  const levels = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => +m[1]);
  if (levels.length) {
    if (levels[0] !== 1) add(WARN, 'heading-start', `first heading is h${levels[0]}, not h1`);
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        add(WARN, 'heading-skip', `h${levels[i - 1]} jumps to h${levels[i]}`);
        break; // one report per page is enough to act on
      }
    }
  }

  // ── Focus and identity ────────────────────────────────────────────────────
  for (const tag of html.match(/<[^>]*\btabindex\s*=\s*["']?[1-9]\d*["']?[^>]*>/gi) || []) {
    add(WARN, 'positive-tabindex', `tabindex="${attr(tag, 'tabindex')}" overrides natural focus order`);
    break;
  }
  const ids = [...html.matchAll(/\bid\s*=\s*("([^"]*)"|'([^']*)')/gi)].map((m) => m[2] ?? m[3]);
  const dupes = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dupes.length) add(ERROR, 'duplicate-id', `duplicate id(s): ${dupes.slice(0, 5).join(', ')}`);

  return out;
}

const pages = arg('--page')
  ? [join(root, arg('--page'))]
  : readdirSync(webDir).filter((n) => n.endsWith('.html')).sort().map((n) => join(webDir, n));

const findings = pages.filter(existsSync).flatMap(auditPage);
const errors = findings.filter((f) => f.level === ERROR);
const warns = findings.filter((f) => f.level === WARN);

if (has('--json')) {
  console.log(JSON.stringify({ pages: pages.length, errors: errors.length, warnings: warns.length, findings }, null, 2));
} else {
  console.log(`Accessibility audit — ${pages.length} page(s), ${errors.length} error(s), ${warns.length} warning(s)\n`);
  const byRule = {};
  for (const f of findings) (byRule[f.rule] ||= []).push(f);
  for (const [rule, list] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
    const lvl = list[0].level === ERROR ? '✗' : '⚠';
    console.log(`${lvl} ${rule} — ${list.length}`);
    for (const f of list.slice(0, 6)) console.log(`    ${f.page}: ${f.detail}`);
    if (list.length > 6) console.log(`    … and ${list.length - 6} more`);
    console.log('');
  }
  console.log(errors.length ? 'Errors are WCAG failures decidable from markup. Fix or justify each.' : 'No markup-level accessibility errors. ✓');
}

if (has('--check') && errors.length) process.exit(1);
