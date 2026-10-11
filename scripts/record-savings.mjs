#!/usr/bin/env node
// Record an accepted ROI story (.github/ISSUE_TEMPLATE/roi-story.yml) in
// data/savings.json, which feeds the public hours-saved and money-saved counter.
// Runs from the record-savings workflow when a maintainer labels the issue
// `roi-accepted`, or by hand:
//
//   node scripts/record-savings.mjs --issue 412             # reads the issue with gh
//   node scripts/record-savings.mjs --issue 412 --body-file body.md
//
// Only numbers the reporter typed are recorded. Hours are never converted into
// money: money counts only when the reporter names an amount that was not spent.
// Implausible values are refused, so a maintainer edits the issue and relabels.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(root, 'data', 'savings.json');
const arg = (n) => { const i = process.argv.indexOf(`--${n}`); return i !== -1 ? process.argv[i + 1] : undefined; };
const issue = arg('issue');
if (!/^\d+$/.test(issue || '')) { console.error('Usage: node scripts/record-savings.mjs --issue <number> [--body-file <path>]'); process.exit(1); }

const raw = arg('body-file')
  ? JSON.stringify({ body: readFileSync(arg('body-file'), 'utf8'), createdAt: new Date().toISOString() })
  : execFileSync('gh', ['issue', 'view', issue, '--json', 'body,createdAt'], { encoding: 'utf8' });
const { body, createdAt } = JSON.parse(raw);
const text = String(body || '').replace(/\r\n/g, '\n');

// Issue-form bodies render fields as "### <Label>\n\n<value>".
const field = (label) => {
  const m = text.match(new RegExp(`###\\s*${label}[^\\n]*\\n+([\\s\\S]*?)(?=\\n###\\s|$)`, 'i'));
  const v = m ? m[1].trim() : '';
  return v === '_No response_' ? '' : v;
};
const num = (s) => { const m = String(s).replace(/,/g, '').match(/\d+(?:\.\d+)?/); return m ? Number(m[0]) : null; };

const skills = field('Which skill').split(/[\s,]+/).map((s) => s.trim().toLowerCase()).filter((s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && existsSync(join(root, 'skills', s, 'SKILL.md')));
const hoursPerUse = num(field('Hours saved per use'));
const uses = num(field('Times you have used it'));
const moneyText = field('Money saved');
const money = moneyText ? num(moneyText) : null;
const currency = moneyText ? ((moneyText.toUpperCase().match(/\b[A-Z]{3}\b/) || [])[0] || null) : null;
const credit = field('How should we credit you');

const problems = [
  !skills.length && 'no recognised skill name',
  !(hoursPerUse > 0 && hoursPerUse <= 200) && 'hours saved per use must be a number between 0 and 200',
  !(Number.isInteger(uses) && uses >= 1 && uses <= 1000) && 'times used must be a whole number between 1 and 1000',
  moneyText && !(money > 0 && money <= 1_000_000 && currency) && 'money saved must be an amount up to 1,000,000 with a three-letter currency code',
].filter(Boolean);
if (problems.length) { console.error(`Issue #${issue} not recorded: ${problems.join('; ')}.`); process.exit(2); }

const ledger = existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : { entries: [] };
ledger.entries = ledger.entries.filter((e) => e.issue !== Number(issue));
ledger.entries.push({
  issue: Number(issue), date: String(createdAt).slice(0, 10), skills, hoursPerUse, uses,
  hours: Math.round(hoursPerUse * uses * 10) / 10,
  ...(money ? { money, currency } : {}),
  credit: /anonymous/i.test(credit) ? 'anonymous' : /role only/i.test(credit) ? 'role' : 'name',
});
ledger.entries.sort((a, b) => a.issue - b.issue);
writeFileSync(FILE, JSON.stringify(ledger, null, 2) + '\n');
console.log(`Recorded #${issue}: ${skills.join(', ')}, ${hoursPerUse} h × ${uses} uses${money ? `, ${money} ${currency}` : ''}.`);
