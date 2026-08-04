#!/usr/bin/env node
// Build a branded, email-client-safe announcement email from a release.
//
// The subscribe widget is Buttondown on the free plan — which has no API to
// auto-send. So this script's job is to make the *content* effortless: it
// renders a gorgeous HTML email you paste straight into Buttondown (or that the
// release workflow drafts for you if you're on a paid key).
//
// Usage:
//   REL_TAG=v70.0.0 REL_NAME="New skill: Lower My Bill" \
//   REL_BODY="$(cat notes.md)" REL_URL="https://github.com/.../releases/tag/v70.0.0" \
//   node scripts/build-newsletter.mjs
//
//   # or point it at a notes file:
//   node scripts/build-newsletter.mjs --tag v70.0.0 --title "…" --notes notes.md
//
// Outputs newsletters/<tag>.html and newsletters/<tag>.md, prints the HTML to
// stdout, and (in GitHub Actions) appends a preview to $GITHUB_STEP_SUMMARY.
// No dependencies.
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = '#d9605a';
const BRAND_DARK = '#b94a45';
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills/';
const REPO = 'https://github.com/mohitagw15856/pm-claude-skills';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { out[a.slice(2)] = argv[i + 1]; i++; }
  }
  return out;
}
const args = parseArgs(process.argv.slice(2));

const tag = args.tag || process.env.REL_TAG || 'latest';
const title = args.title || process.env.REL_NAME || `New skills — ${tag}`;
const url = args.url || process.env.REL_URL || `${REPO}/releases`;
let body = process.env.REL_BODY || '';
if (args.notes && existsSync(args.notes)) body = readFileSync(args.notes, 'utf8');
if (!body.trim()) body = `New skills just landed in PM Skills (${tag}). Browse the catalogue to see them all.`;

// Live skill count, derived — so the email never lies about the library size.
const skillCount = readdirSync(join(root, 'skills')).filter((n) => {
  try { return statSync(join(root, 'skills', n)).isDirectory() && existsSync(join(root, 'skills', n, 'SKILL.md')); }
  catch { return false; }
}).length;

// ── tiny, safe markdown → email HTML ─────────────────────────────────────────
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function inline(s) {
  return esc(s)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, `<a href="$2" style="color:${BRAND};font-weight:600;">$1</a>`)
    .replace(/`([^`]+)`/g, '<code style="background:#f3f0ee;border-radius:4px;padding:1px 5px;font-size:13px;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
}
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let list = null; // 'ul' | 'ol'
  const closeList = () => { if (list) { out.push(`</${list}>`); list = null; } };
  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { closeList(); continue; }
    let m;
    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      closeList();
      const lvl = m[1].length;
      const size = lvl === 1 ? 22 : lvl === 2 ? 18 : 15;
      out.push(`<h${lvl} style="margin:22px 0 8px;font-size:${size}px;line-height:1.3;color:#1a1a1a;">${inline(m[2])}</h${lvl}>`);
    } else if (/^[-*]\s+/.test(line)) {
      if (list !== 'ul') { closeList(); out.push('<ul style="margin:8px 0 8px 0;padding-left:20px;">'); list = 'ul'; }
      out.push(`<li style="margin:4px 0;color:#333;line-height:1.5;">${inline(line.replace(/^[-*]\s+/, ''))}</li>`);
    } else if (/^\d+\.\s+/.test(line)) {
      if (list !== 'ol') { closeList(); out.push('<ol style="margin:8px 0 8px 0;padding-left:22px;">'); list = 'ol'; }
      out.push(`<li style="margin:4px 0;color:#333;line-height:1.5;">${inline(line.replace(/^\d+\.\s+/, ''))}</li>`);
    } else if (/^(---|___|\*\*\*)$/.test(line.trim())) {
      closeList();
      out.push('<hr style="border:none;border-top:1px solid #eee;margin:18px 0;">');
    } else {
      closeList();
      out.push(`<p style="margin:10px 0;color:#333;line-height:1.6;font-size:15px;">${inline(line)}</p>`);
    }
  }
  closeList();
  return out.join('\n');
}

const bodyHtml = mdToHtml(body);
const btn = (href, label, filled) =>
  `<a href="${href}" style="display:inline-block;margin:6px 8px 6px 0;padding:12px 22px;border-radius:10px;font-weight:700;font-size:15px;text-decoration:none;${
    filled ? `background:${BRAND};color:#ffffff;` : `background:#ffffff;color:${BRAND};border:2px solid ${BRAND};`
  }">${label}</a>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f1ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ee;padding:24px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.06);">
    <!-- header -->
    <tr><td style="background:linear-gradient(135deg,${BRAND},${BRAND_DARK});padding:28px 32px;">
      <div style="font-size:20px;font-weight:800;color:#fff;letter-spacing:.2px;">📬 PM&nbsp;Skills</div>
      <div style="font-size:13px;color:rgba(255,255,255,.9);margin-top:2px;">${skillCount} professional Agent Skills for your AI</div>
    </td></tr>
    <!-- hero -->
    <tr><td style="padding:32px 32px 8px;">
      <div style="display:inline-block;background:#fbeae8;color:${BRAND_DARK};font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;text-transform:uppercase;letter-spacing:.5px;">New release · ${esc(tag)}</div>
      <h1 style="margin:14px 0 4px;font-size:26px;line-height:1.25;color:#1a1a1a;">${esc(title)}</h1>
    </td></tr>
    <!-- body -->
    <tr><td style="padding:8px 32px 4px;">
      ${bodyHtml}
    </td></tr>
    <!-- CTAs -->
    <tr><td style="padding:16px 32px 28px;">
      ${btn(SITE, 'Explore the skills', true)}
      ${btn(url, 'Read the release', false)}
      <p style="margin:14px 0 0;font-size:13px;color:#888;">Or install into your AI tool: <code style="background:#f3f0ee;border-radius:4px;padding:1px 5px;">npx pm-claude-skills add</code></p>
    </td></tr>
    <!-- footer -->
    <tr><td style="background:#faf8f6;padding:22px 32px;border-top:1px solid #f0ece9;">
      <p style="margin:0 0 6px;font-size:13px;color:#999;">You're getting this because you subscribed for new-skill announcements at <a href="${SITE}" style="color:${BRAND};">PM Skills</a>.</p>
      <p style="margin:0;font-size:13px;color:#999;"><a href="${url}" style="color:#999;">Full release notes</a> · <a href="${REPO}" style="color:#999;">GitHub</a> · <a href="{{ unsubscribe_url }}" style="color:#999;">Unsubscribe</a></p>
    </td></tr>
  </table>
  <div style="font-size:12px;color:#bbb;margin-top:14px;">MIT licensed · Made with care</div>
</td></tr>
</table>
</body></html>`;

// A plain-markdown twin (for Buttondown's markdown editor / plain-text part).
const md = `# ${title}

_New release · ${tag} · now ${skillCount} skills_

${body}

---

**Explore the skills:** ${SITE}
**Install:** \`npx pm-claude-skills add\`

Full release notes: ${url}
`;

const dir = join(root, 'newsletters');
mkdirSync(dir, { recursive: true });
const safeTag = tag.replace(/[^\w.-]/g, '_');
writeFileSync(join(dir, `${safeTag}.html`), html);
writeFileSync(join(dir, `${safeTag}.md`), md);

// Job summary in CI so a free-plan maintainer can copy-paste with zero setup.
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY,
    `## 📬 Newsletter ready for ${tag}\n\nDownload the **email-html** artifact, or copy the HTML from \`newsletters/${safeTag}.html\` into Buttondown → new email → HTML.\n\n<details><summary>Markdown version</summary>\n\n\`\`\`markdown\n${md}\n\`\`\`\n</details>\n`);
}

process.stdout.write(html);
process.stderr.write(`\n✓ Wrote newsletters/${safeTag}.html and newsletters/${safeTag}.md (${skillCount} skills)\n`);
