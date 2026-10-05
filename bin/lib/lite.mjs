// "Lite" skills for small local models (Qwen 7B, DeepSeek distills, Llama 8B).
// A full SKILL.md can run to thousands of tokens; small models follow a short,
// structural brief better than a long one. liteify() keeps what drives the output
// (the frontmatter, the opening paragraph, Required Inputs, the output structure
// and the Quality Checks) and drops the rest (examples, anti-pattern essays,
// trigger phrases, background prose). Disclaimers are always kept, wherever they
// appear, so a lite legal or tax skill never loses its "not advice" line.
//
//   import { liteify, liteStats } from './lite.mjs';
//   const lite = liteify(readFileSync('skills/prd-template/SKILL.md', 'utf8'));

const KEEP = /(required inputs|inputs|framework|rules|method|output|format|structure|template|quality checks?|checklist|steps|process)/i;
const DISCLAIMER = /(not (legal|tax|medical|financial|investment) advice|not advice|免责|不构成|不是.{0,6}(建议|意见)|仅供参考|需核实|以官方为准|confirm (with|against)|verify (locally|with)|disclaimer)/i;
const STANDARD = /^(what this skill (produces|does)|when to use|required inputs|inputs|framework|how it works|output (format|structure)|output|format|structure|template|quality checks?|checklist|anti-patterns?|example trigger phrases|examples?|steps|process|notes|references?|related skills)\b/i;

function splitFrontmatter(text) {
  const t = text.replace(/\r\n/g, '\n');
  const m = t.match(/^---\n[\s\S]*?\n---\n/);
  return m ? [m[0], t.slice(m[0].length)] : ['', t];
}

function trimLine(line) {
  // Bullets are kept whole: cutting a rule mid-sentence loses meaning, which costs
  // a small model more than the extra tokens do.
  return line.replace(/[ \t]+$/, '');
}

function compact(lines) {
  const out = [];
  for (const l of lines) {
    if (!l.trim() && (!out.length || !out[out.length - 1].trim())) continue;
    out.push(trimLine(l));
  }
  while (out.length && !out[out.length - 1].trim()) out.pop();
  return out;
}

/** Returns the lite version of a SKILL.md text. Idempotent. */
export function liteify(text) {
  const [fm, body] = splitFrontmatter(text);
  if (/^lite: true$/m.test(fm)) return text;
  const name = (fm.match(/^name:\s*(.+)$/m) || [, 'this skill'])[1].trim();
  const lines = body.split('\n');
  const sections = [];
  let cur = { title: null, lines: [] };
  let fence = false;
  for (const l of lines) {
    if (/^```/.test(l)) fence = !fence;
    if (!fence && /^## /.test(l)) { sections.push(cur); cur = { title: l.slice(3).trim(), lines: [l] }; }
    else cur.lines.push(l);
  }
  sections.push(cur);

  const out = [];
  const kept = [];
  const disclaimers = [];
  // Template headings inside an output section ("## The Ladder") are part of the
  // output, so everything after an output heading is kept until the next standard
  // section heading.
  let inOutput = false;
  for (const s of sections) {
    if (s.title !== null) {
      if (STANDARD.test(s.title)) inOutput = /^output|format|structure|template/i.test(s.title);
      else if (inOutput) { out.push('', ...compact(s.lines)); continue; }
    }
    if (s.title === null) {
      // Intro: the H1 plus the first paragraph after it.
      const h1 = s.lines.findIndex((l) => /^# /.test(l));
      const start = h1 >= 0 ? h1 : 0;
      const para = [];
      for (const l of s.lines.slice(start)) {
        if (para.length > 1 && !l.trim()) break;
        para.push(l);
      }
      out.push(...compact(para));
      for (const l of s.lines) if (DISCLAIMER.test(l) && !para.includes(l)) disclaimers.push(l);
      continue;
    }
    if (KEEP.test(s.title)) { kept.push(s.title); out.push('', ...compact(s.lines)); }
    else for (const l of s.lines) if (DISCLAIMER.test(l)) disclaimers.push(l);
  }
  const seen = new Set(out);
  const extra = disclaimers.filter((l) => !seen.has(l));
  if (extra.length) out.push('', ...compact(extra));
  out.push('', `> Lite version of ${name} for small models. The full skill adds examples, anti-patterns and background: install without --lite to get it.`);
  const liteFm = fm ? fm.replace(/\n---\n$/, '\nlite: true\n---\n') : '';
  return liteFm + out.join('\n').replace(/^\n+/, '') + '\n';
}

/** Size comparison for reports: characters and a rough token estimate. */
export function liteStats(text) {
  const lite = liteify(text);
  const tokens = (s) => Math.ceil([...s].reduce((n, ch) => n + (/[　-鿿가-힯]/.test(ch) ? 1 : 0.25), 0));
  return { fullChars: text.length, liteChars: lite.length, fullTokens: tokens(text), liteTokens: tokens(lite), ratio: lite.length / text.length };
}
