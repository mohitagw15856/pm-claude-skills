#!/usr/bin/env node
// Point the Homebrew formula at a published npm version.
//
// Run after `npm publish`: it downloads that version's tarball from the npm registry,
// computes its SHA-256 and rewrites the url and sha256 lines in Formula/pm-claude-skills.rb.
// The formula can only name a version that is already on npm, so this is a release step,
// not a check.
//
//   node scripts/update-formula.mjs            use the version in package.json
//   node scripts/update-formula.mjs 84.1.0     use a specific published version
//
// No dependencies.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FORMULA = join(ROOT, 'Formula', 'pm-claude-skills.rb');
const version = process.argv[2] || JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
if (!/^\d+\.\d+\.\d+$/.test(version)) { console.error(`"${version}" is not a version like 84.1.0`); process.exit(2); }

const url = `https://registry.npmjs.org/pm-claude-skills/-/pm-claude-skills-${version}.tgz`;
const res = await fetch(url);
if (!res.ok) { console.error(`npm does not have pm-claude-skills@${version} (HTTP ${res.status}). Publish it first.`); process.exit(1); }
const sha = createHash('sha256').update(Buffer.from(await res.arrayBuffer())).digest('hex');

let text = readFileSync(FORMULA, 'utf8');
const before = text;
text = text.replace(/^(\s*url ")[^"]+(")/m, `$1${url}$2`).replace(/^(\s*sha256 ")[0-9a-f]{64}(")/m, `$1${sha}$2`);
if (!text.includes(url) || !text.includes(sha)) { console.error('Could not find the url and sha256 lines in the formula.'); process.exit(1); }
writeFileSync(FORMULA, text);
console.log(text === before ? `Formula already points at ${version}.` : `Formula now points at ${version} (sha256 ${sha.slice(0, 12)}…).`);
