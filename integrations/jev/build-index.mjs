#!/usr/bin/env node
// Snapshot the live catalogue into integrations/jev/index.json so the npm package
// (pm-skills-jev-picker) routes without the repo. Run before publishing.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { slim } from './catalog.mjs';
const HERE = dirname(fileURLToPath(import.meta.url));
const src = JSON.parse(readFileSync(join(HERE, '..', '..', 'web', 'skills-index.json'), 'utf8'));
const skills = src.skills.filter((s) => !s.deprecated).map(slim).map(({ description, ...rest }) => rest);
let tiers = {};
try { tiers = JSON.parse(readFileSync(join(HERE, '..', '..', 'data', 'risk-tiers.json'), 'utf8')).tiers || {}; } catch {}
for (const s of skills) s.risk = tiers[s.name]?.tier || null;
writeFileSync(join(HERE, 'index.json'), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), count: skills.length, skills }));
console.log(`integrations/jev/index.json — ${skills.length} skills`);
