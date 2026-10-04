#!/usr/bin/env node
// Read-only MCP server over a folder of Markdown and JSON files.
// Stdio transport (newline-delimited JSON-RPC 2.0), Node standard library only.
//
//   node server.mjs /absolute/path/to/folder
//
// Safety, by construction:
//   - three tools only: list_documents, search_documents, read_document
//   - no write, delete, rename or network code anywhere in this file
//   - every path is resolved and must stay inside the root folder (symlinks included)
//   - only .md, .markdown and .json files are served, each capped in size
//   - logs go to stderr so they never corrupt the protocol stream on stdout
import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { join, relative, resolve, sep, extname } from 'node:path';
import { createInterface } from 'node:readline';

const ROOT = realpathSync(resolve(process.argv[2] || '.'));
const ALLOWED = new Set(['.md', '.markdown', '.json']);
const MAX_BYTES = 512 * 1024;
const MAX_FILES = 5000;
const log = (...a) => process.stderr.write(a.join(' ') + '\n');

function inside(p) {
  const real = realpathSync(p);
  return real === ROOT || real.startsWith(ROOT + sep) ? real : null;
}
function listFiles() {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name.startsWith('.') || out.length >= MAX_FILES) continue;
      const full = join(dir, name);
      const real = inside(full);
      if (!real) continue; // a symlink pointing outside the root
      const st = statSync(real);
      if (st.isDirectory()) walk(full);
      else if (ALLOWED.has(extname(name).toLowerCase()) && st.size <= MAX_BYTES) out.push(relative(ROOT, full).split(sep).join('/'));
    }
  };
  walk(ROOT);
  return out.sort();
}
function readDoc(rel) {
  if (typeof rel !== 'string' || !rel || rel.includes('\0')) throw new Error('path must be a non-empty string');
  const full = resolve(ROOT, rel);
  if (!existsSync(full)) throw new Error('document not found; call list_documents for valid paths');
  const real = inside(full);
  if (!real) throw new Error('path is outside the served folder');
  if (!ALLOWED.has(extname(real).toLowerCase())) throw new Error('only .md and .json files are served');
  if (statSync(real).size > MAX_BYTES) throw new Error('file is larger than the size cap');
  return readFileSync(real, 'utf8');
}

const TOOLS = [
  { name: 'list_documents', description: 'List every Markdown and JSON document in the served folder, as relative paths.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true } },
  { name: 'search_documents', description: 'Case-insensitive text search across documents. Returns matching paths with a short excerpt.',
    inputSchema: { type: 'object', properties: { query: { type: 'string', minLength: 2 }, limit: { type: 'integer', minimum: 1, maximum: 50 } }, required: ['query'], additionalProperties: false },
    annotations: { readOnlyHint: true } },
  { name: 'read_document', description: 'Return the full text of one document by its relative path from list_documents.',
    inputSchema: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'], additionalProperties: false },
    annotations: { readOnlyHint: true } },
];

function callTool(name, args = {}) {
  if (name === 'list_documents') return listFiles().join('\n') || '(no documents)';
  if (name === 'search_documents') {
    const q = String(args.query || '').toLowerCase();
    if (q.length < 2) throw new Error('query must be at least 2 characters');
    const limit = Math.min(Number(args.limit) || 10, 50);
    const hits = [];
    for (const rel of listFiles()) {
      const text = readDoc(rel); const i = text.toLowerCase().indexOf(q);
      if (i !== -1) hits.push(`${rel}: …${text.slice(Math.max(0, i - 60), i + 100).replace(/\s+/g, ' ')}…`);
      if (hits.length >= limit) break;
    }
    return hits.join('\n') || `No documents contain "${args.query}".`;
  }
  if (name === 'read_document') return readDoc(args.path);
  throw new Error(`unknown tool: ${name}`);
}

function handle(msg) {
  const { id, method, params } = msg;
  if (method === 'initialize') {
    return { protocolVersion: params?.protocolVersion || '2025-06-18', capabilities: { tools: {} },
      serverInfo: { name: 'readonly-docs', version: '1.0.0' } };
  }
  if (method === 'ping') return {};
  if (method === 'tools/list') return { tools: TOOLS };
  if (method === 'tools/call') {
    try { return { content: [{ type: 'text', text: callTool(params?.name, params?.arguments) }] }; }
    catch (e) { return { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true }; }
  }
  if (id === undefined) return undefined; // notifications such as notifications/initialized
  throw Object.assign(new Error(`method not found: ${method}`), { code: -32601 });
}

createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'parse error' } }) + '\n'); return; }
  try {
    const result = handle(msg);
    if (msg.id !== undefined && result !== undefined) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, result }) + '\n');
  } catch (e) {
    if (msg.id !== undefined) process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: msg.id, error: { code: e.code || -32603, message: e.message } }) + '\n');
  }
});
log(`readonly-docs serving ${ROOT} (read-only, ${listFiles().length} documents)`);
