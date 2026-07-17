#!/usr/bin/env node
// Downloads dashboard — pulls public install counts (npm, PyPI) weekly into
// web/growth.json with history preserved; growth.html renders it. Momentum
// made visible. Sources that need auth (ClawHub, stores) join when keys exist.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'web', 'growth.json');
const prev = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : { history: [] };
const get = async (u) => (await fetch(u, { signal: AbortSignal.timeout(15000) })).json();

const today = new Date().toISOString().slice(0, 10);
const point = { date: today };
try { point.npm_month = (await get('https://api.npmjs.org/downloads/point/last-month/pm-claude-skills')).downloads; } catch {}
try { point.pypi_month = (await get('https://pypistats.org/api/packages/pm-skills/recent')).data.last_month; } catch {}
try { const r = await get('https://api.github.com/repos/mohitagw15856/pm-claude-skills'); point.stars = r.stargazers_count; point.forks = r.forks_count; } catch {}

prev.history = (prev.history || []).filter((h) => h.date !== today);
prev.history.push(point);
prev.history = prev.history.slice(-104);
prev.latest = point;
prev.updated = today;
writeFileSync(out, JSON.stringify(prev, null, 1) + '\n');
console.log('growth.json:', JSON.stringify(point));
