#!/usr/bin/env node
// Announcement gate. One file, announcements/current.json, holds the single
// current notice. `doctor` reads it from the package and the playground reads
// the copy at web/announcement.json. This script validates the file and keeps
// the copy in step.
//
//   node scripts/check-announcement.mjs            # validate and write the web copy
//   node scripts/check-announcement.mjs --check    # validate, fail if the copy is out of step
//   node scripts/check-announcement.mjs --selftest
//
// An expired announcement is a warning, not a failure: it simply stops showing.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate, isActive, activeAnnouncement, formatAnnouncement, LIMITS } from '../bin/lib/announce.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'announcements', 'current.json');
const COPY = join(ROOT, 'web', 'announcement.json');

function selftest() {
  const t = [];
  const eq = (name, got, want) => t.push({ name, ok: JSON.stringify(got) === JSON.stringify(want), got, want });
  const base = { id: 'a-notice', level: 'info', title: 'Title', body: 'Body text.', from: '2026-01-01', until: '2026-01-31' };
  const doc = (over) => ({ schemaVersion: 1, announcement: over === null ? null : { ...base, ...over } });

  eq('none is valid', validate(doc(null)), []);
  eq('full notice is valid', validate(doc({ url: 'https://example.com/x' })), []);
  eq('array rejected', validate([]).length > 0, true);
  eq('missing key rejected', validate({ schemaVersion: 1 }).length > 0, true);
  eq('wrong schema version', validate({ schemaVersion: 2, announcement: null }), ['schemaVersion must be 1']);
  eq('bad id', validate(doc({ id: 'Not Kebab' })), ['id must be kebab-case']);
  eq('bad level', validate(doc({ level: 'shout' })).length, 1);
  eq('empty title', validate(doc({ title: '   ' })), ['title is required']);
  eq('long body', validate(doc({ body: 'x'.repeat(LIMITS.body + 1) })).length, 1);
  eq('markup rejected', validate(doc({ body: 'see <script>' })), ['body must be plain text, no markup']);
  eq('http url rejected', validate(doc({ url: 'http://example.com' })), ['url must be an https address']);
  eq('script url rejected', validate(doc({ url: 'javascript:alert(1)' })), ['url must be an https address']);
  eq('impossible date rejected', validate(doc({ from: '2026-13-40' })).length > 0, true);
  eq('until before from', validate(doc({ from: '2026-02-01', until: '2026-01-01' })), ['until is before from']);
  eq('active on first day', isActive(base, '2026-01-01'), true);
  eq('active on last day', isActive(base, '2026-01-31'), true);
  eq('not active before', isActive(base, '2025-12-31'), false);
  eq('not active after', isActive(base, '2026-02-01'), false);
  eq('null is never active', isActive(null, '2026-01-10'), false);
  eq('invalid doc yields nothing', activeAnnouncement(doc({ level: 'shout' }), '2026-01-10'), null);
  eq('valid doc yields the notice', activeAnnouncement(doc({}), '2026-01-10').id, 'a-notice');
  eq('format names the level', formatAnnouncement({ ...base, level: 'action' }).includes('Action needed'), true);

  const failed = t.filter((x) => !x.ok);
  for (const x of failed) console.error(`✗ ${x.name}: got ${JSON.stringify(x.got)}, want ${JSON.stringify(x.want)}`);
  console.log(`check-announcement selftest: ${t.length - failed.length} passed · ${failed.length} failed`);
  process.exit(failed.length ? 1 : 0);
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) return selftest();
  const checkOnly = args.includes('--check');

  if (!existsSync(SOURCE)) {
    console.error('✗ announcements/current.json is missing. Use {"schemaVersion": 1, "announcement": null} for none.');
    process.exit(1);
  }
  let doc;
  try {
    doc = JSON.parse(readFileSync(SOURCE, 'utf8'));
  } catch (e) {
    console.error(`✗ announcements/current.json is not valid JSON: ${e.message}`);
    process.exit(1);
  }
  const problems = validate(doc);
  if (problems.length) {
    console.error('✗ announcements/current.json:');
    for (const p of problems) console.error(`    ${p}`);
    process.exit(1);
  }

  const wanted = `${JSON.stringify(doc, null, 2)}\n`;
  const have = existsSync(COPY) ? readFileSync(COPY, 'utf8') : null;
  if (have !== wanted) {
    if (checkOnly) {
      console.error('✗ web/announcement.json is out of step. Run: node scripts/check-announcement.mjs');
      process.exit(1);
    }
    writeFileSync(COPY, wanted);
  }

  const a = doc.announcement;
  const today = new Date().toISOString().slice(0, 10);
  if (a === null) console.log('Announcement check clean: none set.');
  else if (isActive(a, today)) console.log(`Announcement check clean: "${a.title}" showing until ${a.until}.`);
  else if (today > a.until) console.log(`Announcement check clean, with a warning: "${a.title}" expired on ${a.until}. Set it to null.`);
  else console.log(`Announcement check clean: "${a.title}" starts on ${a.from}.`);
}

main();
