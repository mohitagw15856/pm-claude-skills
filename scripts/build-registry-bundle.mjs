#!/usr/bin/env node
// The signed community registry: community/registry.json (every entry reviewed in a
// pull request, its SKILL.md fetched, scanned and hash-pinned by the registry-check
// workflow) published as web/registry/registry.json. The deploy signs that file with
// GitHub's Sigstore-backed build provenance, so anyone can prove a copy came from
// this repository's main branch:
//
//   gh attestation verify registry.json -R mohitagw15856/pm-claude-skills
//
// `pm-claude-skills install @<namespace>/<skill>` resolves names against it and
// refuses any SKILL.md whose hash no longer matches its reviewed pin.
// Deterministic: the same registry always gives the same bytes, so the same digest.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const reg = JSON.parse(readFileSync(join(root, 'community', 'registry.json'), 'utf8'));
const pinned = (reg.skills || []).filter((s) => s.sha256 && s.repo && s.path);
const bundle = {
  spec: 'pm-skills-signed-registry/1',
  source: 'https://github.com/mohitagw15856/pm-claude-skills/blob/main/community/registry.json',
  verify: 'gh attestation verify registry.json -R mohitagw15856/pm-claude-skills',
  skills: pinned.map(({ name, description, repo, path, ref, sha256 }) => ({ name, description, repo, path, ref, sha256 })).sort((a, b) => a.name.localeCompare(b.name)),
};
mkdirSync(join(root, 'web', 'registry'), { recursive: true });
writeFileSync(join(root, 'web', 'registry', 'registry.json'), JSON.stringify(bundle, null, 2) + '\n');
const unpinned = (reg.skills || []).length - pinned.length;
console.log(`Signed-registry bundle: ${pinned.length} pinned skill(s)${unpinned ? `; ${unpinned} unpinned entr${unpinned === 1 ? 'y' : 'ies'} left out (no sha256)` : ''}.`);
