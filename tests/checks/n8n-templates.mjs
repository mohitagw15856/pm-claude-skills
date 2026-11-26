#!/usr/bin/env node
// Structural check for the n8n workflow templates: valid JSON, unique node names, every
// connection points at a node that exists, lookups go to the public API, the skill name
// taken from a request is URL-encoded, and no credential or key is embedded in a file.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'integrations', 'n8n');
const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const errors = [];
const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
if (files.length < 2) errors.push(`expected at least 2 templates, found ${files.length}`);
for (const f of files) {
  const raw = readFileSync(join(dir, f), 'utf8');
  let wf;
  try { wf = JSON.parse(raw); } catch (e) { errors.push(`${f}: not valid JSON (${e.message})`); continue; }
  const names = (wf.nodes || []).map((n) => n.name);
  if (!wf.name || !names.length) errors.push(`${f}: needs a name and nodes`);
  if (new Set(names).size !== names.length) errors.push(`${f}: duplicate node names`);
  if (wf.active !== false) errors.push(`${f}: templates must ship inactive`);
  for (const n of wf.nodes || []) {
    if (!n.type || !/^(@?[\w-]+\/)?[\w-]+\.[\w]+$/.test(n.type) || typeof n.typeVersion !== 'number') errors.push(`${f}: node "${n.name}" needs a type and a numeric typeVersion`);
    if (n.credentials) errors.push(`${f}: node "${n.name}" embeds a credential reference; leave it for the user to pick`);
  }
  for (const [from, outs] of Object.entries(wf.connections || {})) {
    if (!names.includes(from)) errors.push(`${f}: connection from unknown node "${from}"`);
    for (const branch of outs.main || []) for (const c of branch) if (!names.includes(c.node)) errors.push(`${f}: connection to unknown node "${c.node}"`);
  }
  const linked = new Set(Object.values(wf.connections || {}).flatMap((o) => (o.main || []).flat().map((c) => c.node)));
  const roots = names.filter((n) => !linked.has(n));
  if (roots.length !== 1) errors.push(`${f}: expected exactly one start node, found ${roots.length}`);
  if (!raw.includes(`${API}/v1/`)) errors.push(`${f}: does not call the public API`);
  if (/sk-ant-|x-api-key|Bearer\s+[A-Za-z0-9]/.test(raw)) errors.push(`${f}: looks like it embeds a key`);
  for (const m of raw.matchAll(/\/v1\/skills\/\{\{([^}]*)\}\}/g)) if (!m[1].includes('encodeURIComponent')) errors.push(`${f}: a skill name is placed in a URL without encoding`);
}
if (errors.length) { console.error(errors.map((e) => `  ✗ ${e}`).join('\n')); process.exit(1); }
console.log(`n8n templates: ${files.length} workflow(s) well formed. ✓`);
