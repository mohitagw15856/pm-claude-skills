#!/usr/bin/env node
// doclint: a deterministic linter for the documents skills produce (PRDs, status
// updates, postmortems, or any Markdown deliverable). No model is involved, so the
// same file always gets the same findings, and it runs in a git hook or CI in
// milliseconds. It catches what a reviewer should not have to: placeholders left
// in, a PRD with no number in its success metrics, an action item nobody owns.
//
//   npx pm-claude-skills lint prd.md
//   npx pm-claude-skills lint docs/*.md --type prd --strict
//   npx pm-claude-skills lint update.md --json
//   npx pm-claude-skills lint CONTEXT.md --type context
//   npx pm-claude-skills lint docs/*.md --format github     (annotations in a pull request)
//   node bin/doclint.mjs --selftest
//
// Exit status: 0 clean, 1 when an error is found (or a warning under --strict), 2 on bad usage.
// It checks structure and omissions. It cannot tell whether the content is right.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TYPES = {
  prd: {
    label: 'PRD',
    signals: [/\bprd\b/i, /product requirements/i, /\buser stor(y|ies)\b/i, /^#+\s*(problem|non-?goals|requirements)\b/im],
    sections: [
      ['problem', /^(the )?problem|background|context|why/i],
      ['success metrics', /success|metrics?|goals?|outcomes?|kpis?/i],
      ['scope or non-goals', /non-?goals?|out of scope|scope|not doing/i],
      ['risks or open questions', /risks?|open questions?|assumptions?|dependencies/i],
    ],
  },
  update: {
    label: 'status update',
    signals: [/status update/i, /stakeholder update/i, /weekly update/i, /^#+\s*(status|progress|highlights)\b/im],
    sections: [
      ['status or progress', /status|progress|summary|highlights|done|shipped/i],
      ['risks or blockers', /risks?|blockers?|issues?|concerns?|help needed/i],
      ['next steps', /next|upcoming|plan|actions?/i],
    ],
  },
  postmortem: {
    label: 'postmortem',
    signals: [/post-?mortem/i, /incident (report|review)/i, /root cause/i, /^#+\s*timeline\b/im],
    sections: [
      ['timeline', /timeline|sequence of events|what happened/i],
      ['root cause', /root cause|cause|contributing factors?|why/i],
      ['impact', /impact|affected|scope/i],
      ['action items', /actions?|follow-?ups?|remediation|prevention|next steps/i],
    ],
  },
};

Object.assign(TYPES, {
  okr: {
    label: 'OKR document',
    signals: [/\bokrs?\b/i, /key results?/i, /^#+\s*objectives?\b/im],
    sections: [
      ['objectives', /objectives?/i],
      ['key results', /key results?|\bkrs?\b/i],
    ],
  },
  meeting: {
    label: 'meeting notes',
    signals: [/meeting notes/i, /^#+\s*(attendees|decisions|agenda)\b/im, /\battendees\b/i, /\bminutes\b/i],
    sections: [
      ['decisions', /decisions?|outcomes?|agreed/i],
      ['action items', /actions?|next steps?|follow-?ups?|to-?dos?/i],
    ],
  },
  roadmap: {
    label: 'roadmap',
    signals: [/\broadmap\b/i, /^#+\s*(now|next|later)\b/im, /\bq[1-4]\b/i],
    sections: [
      ['what is being worked on', /now|next|later|q[1-4]|themes?|initiatives?|roadmap|h[12]\b/i],
    ],
  },
  context: {
    label: 'team context file',
    signals: [/team context/i, /the assistant must never/i, /^#+\s*our terms\b/im, /^#+\s*what we make\b/im],
    sections: [
      ['what the team makes', /what we (make|build|do)|product|about/i],
      ['who it is for', /who it is for|customers?|users?|audience/i],
      ['terms', /terms|glossary|vocabulary|language/i],
      ['rules for the assistant', /must never|never|rules|do not/i],
    ],
  },
});

const PLACEHOLDERS = [
  [/\bTODO\b/, 'TODO'], [/\bTBD\b/, 'TBD'], [/\bTBC\b/, 'TBC'], [/\bXXX\b/, 'XXX'], [/\bFIXME\b/, 'FIXME'],
  [/lorem ipsum/i, 'lorem ipsum'],
  [/\[(insert|your|add|enter|fill in|name|date|owner|link|placeholder)\b[^\]]*\](?!\()/i, 'a bracketed placeholder'],
  [/<(insert|your|add|enter|fill in|placeholder)\b[^>]*>/i, 'an angle-bracket placeholder'],
];
const VAGUE_DATES = /\b(asap|soon|shortly|in due course|at some point|later this year|next quarter|next sprint|eod|eow|when possible)\b/i;
const FILLER = /\b(leverag(e|es|ed|ing)|robust|seamless(ly)?|delve|game-?changer|synerg(y|ies)|best-in-class|world-class|cutting-edge|holistic)\b/i;
const OWNER = /(@[\w-]+|\bowner\s*[:=]|\bowned by\b|\bassignee\s*[:=]|\bdri\s*[:=]|\(\s*[A-Z][\w.'-]*(\s+[A-Z][\w.'-]*)?\s*\)|[—–-]\s*[A-Z][a-z]+(\s+[A-Z][a-z]+)?\s*$)/;
const DATE = /(\b\d{4}-\d{2}-\d{2}\b|\b\d{1,2}[/.]\d{1,2}([/.]\d{2,4})?\b|\b\d{1,2}(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{1,2}\b|\bQ[1-4]\s*(\d{2}|\d{4})\b|\b(due|by)\s*[:=]?\s*\d)/i;
const ACTION_HEADING = /action items?|next steps?|follow-?ups?|to-?dos?|remediation|owners?/i;
const METRIC_HEADING = /success|metrics?|kpis?|goals?|outcomes?/i;

// Split into lines with code fences blanked, so examples in code blocks are never linted.
function proseLines(text) {
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  let fenced = false;
  return lines.map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return ''; }
    return fenced ? '' : line;
  });
}

function sectionsOf(lines) {
  const out = [];
  let current = { title: '', level: 0, line: 0, body: [] };
  lines.forEach((line, i) => {
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (m) { out.push(current); current = { title: m[2].replace(/[*_`]/g, ''), level: m[1].length, line: i + 1, body: [] }; }
    else current.body.push({ text: line, line: i + 1 });
  });
  out.push(current);
  return out;
}

export function detectType(text) {
  let best = 'generic'; let top = 1;
  for (const [key, def] of Object.entries(TYPES)) {
    const score = def.signals.filter((rx) => rx.test(text)).length;
    if (score > top) { best = key; top = score; }
  }
  return best;
}

export function lint(text, opts = {}) {
  const findings = [];
  const add = (rule, severity, line, message) => findings.push({ rule, severity, line, message });
  const lines = proseLines(String(text));
  const prose = lines.join('\n');
  const type = opts.type && opts.type !== 'auto' ? opts.type : detectType(prose);
  const sections = sectionsOf(lines);
  const headed = sections.filter((s) => s.level > 0);

  if (!prose.trim()) { add('D000', 'error', 1, 'the document is empty'); return { type, findings }; }

  // D001: placeholders left in.
  lines.forEach((line, i) => {
    for (const [rx, name] of PLACEHOLDERS) if (rx.test(line)) { add('D001', 'error', i + 1, `${name} left in the text`); break; }
  });

  // D002: headings with nothing under them (a parent heading followed by a deeper one is fine).
  headed.forEach((s, i) => {
    const hasBody = s.body.some((b) => b.text.trim());
    const next = headed[i + 1];
    if (!hasBody && !(next && next.level > s.level)) add('D002', 'error', s.line, `section "${s.title}" is empty`);
  });

  // D003: sections the document type needs.
  if (TYPES[type]) {
    for (const [name, rx] of TYPES[type].sections) {
      if (!headed.some((s) => rx.test(s.title))) add('D003', 'error', 1, `a ${TYPES[type].label} needs a section for ${name}`);
    }
  }

  // D004: a PRD's success metrics must contain at least one number.
  if (type === 'prd') {
    const metric = headed.filter((s) => METRIC_HEADING.test(s.title));
    if (metric.length && !metric.some((s) => s.body.some((b) => /\d/.test(b.text)))) {
      add('D004', 'error', metric[0].line, `"${metric[0].title}" contains no number, so success cannot be checked`);
    }
  }

  // D005 and D006: action items need an owner and a date.
  for (const s of headed.filter((x) => ACTION_HEADING.test(x.title))) {
    const header = s.body.find((b) => /^\s*\|.*\|\s*$/.test(b.text));
    const cols = header ? header.text.split('|').slice(1, -1).map((c) => c.trim().toLowerCase()) : [];
    const ownerCol = cols.findIndex((c) => /owner|assignee|dri|who/.test(c));
    const dateCol = cols.findIndex((c) => /due|date|when|by/.test(c));
    for (const b of s.body) {
      const t = b.text;
      if (/^\s*\|/.test(t)) {
        if (b === header || /^\s*\|[\s:|-]+\|\s*$/.test(t)) continue;
        const cells = t.split('|').slice(1, -1).map((c) => c.trim());
        if (ownerCol >= 0 && !cells[ownerCol]) add('D005', 'error', b.line, 'action item has no owner');
        if (dateCol >= 0 && !cells[dateCol]) add('D006', 'warning', b.line, 'action item has no date');
      } else if (/^\s*([-*+]|\d+[.)])\s+/.test(t)) {
        const item = t.replace(/^\s*([-*+]|\d+[.)])\s+(\[[ xX]\]\s*)?/, '');
        if (!item.trim()) continue;
        if (!OWNER.test(item)) add('D005', 'error', b.line, 'action item has no owner (name one with @name, "Owner: name" or "(Name)")');
        if (!DATE.test(item)) add('D006', 'warning', b.line, 'action item has no date');
      }
    }
  }

  // D009: an OKR key result with no number cannot be scored.
  if (type === 'okr') {
    for (const s of headed.filter((x) => /key results?|\bkrs?\b/i.test(x.title))) {
      for (const b of s.body) {
        const item = b.text.match(/^\s*([-*+]|\d+[.)])\s+(.*\S)/);
        if (item && !/\d/.test(item[2])) add('D009', 'error', b.line, 'key result has no number, so it cannot be scored');
      }
    }
  }

  // D010: a roadmap table should say why each item is there (an outcome, goal, problem or metric column).
  if (type === 'roadmap') {
    lines.forEach((line, i) => {
      const isHeader = /^\s*\|.*\|\s*$/.test(line) && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || '');
      if (isHeader && !/outcome|goal|why|problem|metric|result|impact/i.test(line)) add('D010', 'warning', i + 1, 'roadmap table has no column for the outcome or reason');
    });
  }

  // D011 to D013: a team context file must be filled in, owned and dated.
  if (type === 'context') {
    lines.forEach((line, i) => {
      if (/^\s*\[[^\]]{3,}\]\s*$/.test(line)) add('D011', 'error', i + 1, 'template instruction left in place of content');
    });
    const owner = lines.findIndex((l) => /\bowner\s*:/i.test(l));
    if (owner < 0) add('D012', 'error', 1, 'no owner is named (add a line such as "Owner: Priya")');
    else if (/\bowner\s*:\s*(\[[^\]]*\]|tbd|tbc|\?+)?\s*(·|\||$)/i.test(lines[owner])) add('D012', 'error', owner + 1, 'the owner is not filled in');
    if (!lines.some((l) => /(last reviewed|last updated|reviewed on|updated)\s*:?\s*.*\d{4}/i.test(l))) add('D013', 'warning', 1, 'no review date (add "Last reviewed: YYYY-MM-DD")');
  }

  // D007: vague timing where a date belongs. D008: filler words.
  lines.forEach((line, i) => {
    const vague = line.match(VAGUE_DATES);
    if (vague && !DATE.test(line)) add('D007', 'warning', i + 1, `"${vague[0]}" is not a date`);
    const filler = line.match(FILLER);
    if (filler) add('D008', 'info', i + 1, `filler word "${filler[0]}"`);
  });

  findings.sort((a, b) => a.line - b.line || a.rule.localeCompare(b.rule));
  return { type, findings };
}

export function summarise(findings) {
  const count = (sev) => findings.filter((f) => f.severity === sev).length;
  return { errors: count('error'), warnings: count('warning'), info: count('info') };
}

function selftest() {
  let fails = 0;
  const rules = (text, opts) => lint(text, opts).findings.map((f) => `${f.rule}@${f.line}`);
  const eq = (label, got, want) => { if (JSON.stringify(got) !== JSON.stringify(want)) { fails++; console.error(`  ✗ ${label}\n      got  ${JSON.stringify(got)}\n      want ${JSON.stringify(want)}`); } };
  const goodPrd = '# PRD: Export\n\n## Problem\nFinance leads retype numbers.\n\n## Success metrics\n- 40% of finance users export in month one\n\n## Non-goals\nNo PDF.\n\n## Risks\nLarge files.\n\n## Next steps\n- Draft spec (Priya) by 2026-12-01\n';
  eq('a complete PRD is clean', rules(goodPrd), []);
  eq('type is detected', lint(goodPrd).type, 'prd');
  eq('CRLF input lints the same', rules(goodPrd.replace(/\n/g, '\r\n')), []);
  eq('metrics without a number', rules(goodPrd.replace('- 40% of finance users export in month one', '- Users love it')), ['D004@6']);
  eq('missing section', rules(goodPrd.replace('## Non-goals\nNo PDF.\n\n', '')), ['D003@1']);
  eq('placeholder and empty section', rules('# Notes\n\n## Plan\nTBD\n\n## Empty\n\n## Last\ntext\n'), ['D001@4', 'D002@6']);
  eq('a parent heading over a child is not empty', rules('# Doc\n\n## Parent\n\n### Child\ntext\n'), []);
  eq('unowned and undated action items', rules('# Notes\n\n## Action items\n- Fix the export\n- Ship it @sam by 3 Dec\n'), ['D005@4', 'D006@4']);
  eq('action table with an empty owner cell', rules('# Notes\n\n## Action items\n| Task | Owner | Due |\n|---|---|---|\n| A | Sam | 2026-12-01 |\n| B |  |  |\n'), ['D005@7', 'D006@7']);
  eq('code blocks are not linted', rules('# Notes\n\nSee:\n\n```\nTODO lorem ipsum [insert name]\n```\n'), []);
  eq('a Markdown link is not a placeholder', rules('# Notes\n\nRead the [name of the doc](https://example.com).\n'), []);
  eq('vague timing and filler', rules('# Notes\n\nWe will ship soon with a robust design.\n'), ['D007@3', 'D008@3']);
  eq('empty document', rules('  \n'), ['D000@1']);
  eq('zero is a number in metrics', rules(goodPrd.replace('- 40% of finance users export in month one', '- 0 support tickets about export')), []);
  eq('forced type', lint('# Thing\n\ntext\n', { type: 'postmortem' }).findings.filter((f) => f.rule === 'D003').length, 4);
  eq('OKR key result with no number', rules('# OKRs Q1\n\n## Objective\nWin enterprise.\n\n## Key results\n- Close 12 enterprise deals\n- Delight customers\n'), ['D009@8']);
  eq('meeting notes need decisions and actions', rules('# Meeting notes\n\nAttendees: Ana, Ben\n\n## Discussion\nTalked.\n', { type: 'meeting' }), ['D003@1', 'D003@1']);
  eq('roadmap table with no outcome column', rules('# Roadmap\n\n## Now\n| Item | Team |\n|---|---|\n| SSO | Core |\n\n## Next\n| Item | Outcome |\n|---|---|\n| Audit log | Pass security review |\n'), ['D010@4']);
  const ctx = '# Team context: Pay\n\nOwner: [name] · Last reviewed: 2026-11-28\n\n## What we make\n[Two sentences: the product.]\n\n## Who it is for\nFinance leads.\n\n## Our terms\nLedger.\n\n## The assistant must never\n- Invent numbers.\n';
  eq('unfilled context file', rules(ctx), ['D001@3', 'D012@3', 'D011@6']);
  eq('a filled context file is clean', rules(ctx.replace('[name]', 'Priya').replace('[Two sentences: the product.]', 'Rota software.')), []);
  eq('context with no owner line or date', rules('# Team context\n\n## What we make\nX.\n\n## Customers\nY.\n\n## Glossary\nZ.\n\n## Rules\n- Never invent.\n', { type: 'context' }), ['D012@1', 'D013@1']);
  console.log(fails ? `doclint selftest: ${fails} failure(s)` : 'doclint selftest: 21 passed ✓');
  return fails ? 1 : 0;
}

export function run(argv = process.argv.slice(2)) {
  if (argv.includes('--selftest')) return selftest();
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log('Usage: pm-claude-skills lint <file.md> [more files] [--type auto|prd|update|postmortem|okr|meeting|roadmap|context|generic] [--strict] [--json] [--format github]\n\nRules: D000 empty document · D001 placeholder left in · D002 empty section · D003 missing section for the type\n       D004 PRD metrics with no number · D005 action item with no owner · D006 action item with no date\n       D007 vague timing · D008 filler word · D009 key result with no number · D010 roadmap table with no outcome column\n       D011 context template line not filled in · D012 context file with no owner · D013 context file with no review date');
    return 0;
  }
  const flag = (f) => argv.includes(f);
  let type = 'auto';
  let format = 'text';
  const files = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--type') { type = argv[++i]; continue; }
    if (argv[i] === '--format') { format = argv[++i]; continue; }
    if (argv[i].startsWith('--')) continue;
    files.push(argv[i]);
  }
  if (!['auto', 'generic', ...Object.keys(TYPES)].includes(type)) { console.error(`Unknown --type "${type}". Use auto, generic, ${Object.keys(TYPES).join(', ')}.`); return 2; }
  if (!['text', 'github'].includes(format)) { console.error(`Unknown --format "${format}". Use text or github.`); return 2; }
  if (!files.length) { console.error('Give at least one Markdown file. See --help.'); return 2; }
  const report = [];
  for (const file of files) {
    let text;
    try { text = readFileSync(file, 'utf8'); } catch (e) { console.error(`Cannot read ${file}: ${e.code || e.message}`); return 2; }
    report.push({ file, ...lint(text, { type }) });
  }
  const all = report.flatMap((r) => r.findings);
  const totals = summarise(all);
  if (flag('--json')) console.log(JSON.stringify({ files: report, totals }, null, 2));
  else if (format === 'github') {
    // GitHub Actions workflow commands: each finding is shown on its line in the pull request.
    const clean = (v) => String(v).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
    const prop = (v) => clean(v).replace(/:/g, '%3A').replace(/,/g, '%2C');
    for (const r of report) for (const f of r.findings) {
      const level = f.severity === 'error' ? 'error' : f.severity === 'warning' ? 'warning' : 'notice';
      console.log(`::${level} file=${prop(r.file)},line=${f.line},title=${prop(f.rule)}::${clean(f.message)}`);
    }
    console.log(`${totals.errors} error(s), ${totals.warnings} warning(s), ${totals.info} note(s) in ${report.length} file(s).`);
  }
  else {
    for (const r of report) {
      console.log(`${r.file}  (${TYPES[r.type] ? TYPES[r.type].label : 'generic document'})`);
      if (!r.findings.length) console.log('  ✓ no findings');
      for (const f of r.findings) console.log(`  ${f.severity === 'error' ? '✗' : f.severity === 'warning' ? '!' : '·'} ${String(f.line).padStart(4)}  ${f.rule}  ${f.message}`);
    }
    console.log(`\n${totals.errors} error(s), ${totals.warnings} warning(s), ${totals.info} note(s) in ${report.length} file(s).`);
  }
  return totals.errors || (flag('--strict') && totals.warnings) ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(run());
