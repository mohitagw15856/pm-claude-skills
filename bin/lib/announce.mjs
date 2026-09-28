// The one current announcement, read from a file that ships with the package.
// No network: `npx pm-claude-skills` always runs the latest package, so the
// bundled file is already current. Used by `doctor` and validated by
// scripts/check-announcement.mjs. The playground reads a copy of the same file.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export const LEVELS = ['info', 'change', 'action'];
export const LIMITS = { title: 80, body: 280 };
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DAY = /^\d{4}-\d{2}-\d{2}$/;

// Returns a list of problems. An empty list means the document is valid.
export function validate(doc) {
  const problems = [];
  if (!doc || typeof doc !== 'object' || Array.isArray(doc)) return ['the file must hold a JSON object'];
  if (doc.schemaVersion !== 1) problems.push('schemaVersion must be 1');
  if (!('announcement' in doc)) return [...problems, 'the "announcement" key is required (use null for none)'];
  const a = doc.announcement;
  if (a === null) return problems;
  if (typeof a !== 'object' || Array.isArray(a)) return [...problems, 'announcement must be an object or null'];

  if (typeof a.id !== 'string' || !ID.test(a.id)) problems.push('id must be kebab-case');
  if (!LEVELS.includes(a.level)) problems.push(`level must be one of: ${LEVELS.join(', ')}`);
  for (const field of ['title', 'body']) {
    const v = a[field];
    if (typeof v !== 'string' || v.trim() === '') problems.push(`${field} is required`);
    else if (v.length > LIMITS[field]) problems.push(`${field} is ${v.length} characters, the limit is ${LIMITS[field]}`);
    else if (/[<>]/.test(v)) problems.push(`${field} must be plain text, no markup`);
  }
  if (a.url !== undefined && (typeof a.url !== 'string' || !/^https:\/\/[^\s<>"']+$/.test(a.url))) problems.push('url must be an https address');
  for (const field of ['from', 'until']) {
    const v = a[field];
    if (typeof v !== 'string' || !DAY.test(v) || Number.isNaN(Date.parse(`${v}T00:00:00Z`))) problems.push(`${field} must be a date as YYYY-MM-DD`);
  }
  if (problems.length === 0 && a.until < a.from) problems.push('until is before from');
  return problems;
}

// `today` is a YYYY-MM-DD string so the comparison is a plain string compare.
export function isActive(a, today) {
  return Boolean(a) && a.from <= today && today <= a.until;
}

export function activeAnnouncement(doc, today = new Date().toISOString().slice(0, 10)) {
  if (validate(doc).length) return null;
  return isActive(doc.announcement, today) ? doc.announcement : null;
}

export function readAnnouncement(root, today) {
  const p = join(root, 'announcements', 'current.json');
  if (!existsSync(p)) return null;
  try {
    return activeAnnouncement(JSON.parse(readFileSync(p, 'utf8')), today);
  } catch {
    return null;
  }
}

export function formatAnnouncement(a) {
  const label = { info: 'Notice', change: 'Changed', action: 'Action needed' }[a.level] || 'Notice';
  const lines = [`\x1b[1m📣 ${label}: ${a.title}\x1b[0m`, `  ${a.body}`];
  if (a.url) lines.push(`  \x1b[2m${a.url}\x1b[0m`);
  return lines.join('\n');
}
