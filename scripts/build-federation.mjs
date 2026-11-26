#!/usr/bin/env node
// Federation crawler — reads web/federation-registry.json, fetches each
// member's federation.json + skills index, and aggregates web/federated.json
// (the file cross-library search consumes). Network at
// build time by design: run manually or on the weekly cron, commit the output.
// Degrades per-member: a dead library is marked unreachable, never dropped.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const registry = JSON.parse(readFileSync(join(root, 'web', 'federation-registry.json'), 'utf8'));

const getLocal = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const get = async (url) => {
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`http ${r.status}`);
  return r.json();
};

const members = [];
for (const m of registry.members) {
  try {
    const fed = m.local ? getLocal(m.local) : await get(m.federation);
    if (fed.spec !== 'skill-federation/0.1') throw new Error(`unsupported spec ${fed.spec}`);
    const idx = m.local_index ? getLocal(m.local_index) : await get(fed.skills_index);
    const skills = (idx.skills || []).map((s) => ({ name: s.name, description: (s.description || '').slice(0, 300) }));
    members.push({ repo: m.repo, name: fed.name, homepage: fed.repo, license: fed.license || '?', badge: fed.skillspec_badge || null, count: skills.length, skills, ok: true });
    console.log(`✓ ${m.repo} — ${skills.length} skills`);
  } catch (e) {
    members.push({ repo: m.repo, ok: false, error: e.message });
    console.error(`✗ ${m.repo} — ${e.message}`);
  }
}

const total = members.filter((m) => m.ok).reduce((n, m) => n + m.count, 0);
writeFileSync(join(root, 'web', 'federated.json'), JSON.stringify({
  spec: 'skill-federation/0.1', built: new Date().toISOString().slice(0, 10),
  libraries: members.length, skills: total, members,
}, null, 1) + '\n');
console.log(`Wrote web/federated.json — ${members.filter((m) => m.ok).length}/${members.length} libraries · ${total} skills federated.`);
