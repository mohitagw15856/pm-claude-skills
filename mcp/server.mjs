#!/usr/bin/env node
// pm-claude-skills MCP server — exposes the skill library to any MCP client
// (Claude Desktop, etc.) over stdio. Tools: list_skills, search_skills, get_skill.
//
// Run directly: node mcp/server.mjs   (or, once published: npx pm-claude-skills-mcp)
// Configure in an MCP client, e.g. Claude Desktop claude_desktop_config.json:
//   { "mcpServers": { "pm-claude-skills": { "command": "npx", "args": ["-y", "pm-claude-skills-mcp"] } } }
//
// Pure Node standard library — no dependencies. Protocol: newline-delimited
// JSON-RPC 2.0 (the MCP stdio transport). All logging goes to stderr so it
// never corrupts the protocol stream on stdout.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { createRequire } from 'node:module';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const VERSION = (() => { try { return createRequire(import.meta.url)('../package.json').version; } catch { return '0.0.0'; } })();
const SERVER_NAME = 'pm-claude-skills';

// ── Build the in-memory skill index once at startup ─────────────────────────
function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      meta[kv[1]] = v;
    }
  }
  return { meta, body: m[2] };
}

function loadTiers() {
  const f = join(PKG_ROOT, 'skill-tiers.json');
  if (!existsSync(f)) return {};
  try {
    const t = JSON.parse(readFileSync(f, 'utf8'));
    const map = {};
    for (const n of t.productionReady || []) map[n] = 'production';
    for (const n of t.experimental || []) map[n] = 'experimental';
    return map;
  } catch { return {}; }
}

function loadSkills() {
  const dir = join(PKG_ROOT, 'skills');
  const tiers = loadTiers();
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const file = join(dir, name, 'SKILL.md');
    if (!existsSync(file) || !statSync(join(dir, name)).isDirectory()) continue;
    const { meta, body } = parseFrontmatter(readFileSync(file, 'utf8'));
    const titleMatch = body.match(/^#\s+(.+)$/m);
    out.push({
      name: meta.name || name,
      title: (titleMatch ? titleMatch[1] : name).replace(/\s+Skill$/i, ''),
      description: meta.description || '',
      tier: tiers[name] || 'stable',
      body: body.trim(),
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

const SKILLS = loadSkills();
const byName = new Map(SKILLS.map((s) => [s.name, s]));

// ── Tools ───────────────────────────────────────────────────────────────────
const TOOLS = [
  {
    name: 'list_skills',
    description: 'List available professional skills (name, title, tier, one-line description). Optionally filter by tier.',
    inputSchema: {
      type: 'object',
      properties: { tier: { type: 'string', enum: ['production', 'stable', 'experimental'], description: 'Only skills in this maturity tier.' } },
    },
  },
  {
    name: 'search_skills',
    description: 'Search skills by keyword across name, description, and body. Returns the best matches.',
    inputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'Keywords describing the task, e.g. "prioritise backlog" or "customer churn".' }, limit: { type: 'number', description: 'Max results (default 10).' } },
      required: ['query'],
    },
  },
  {
    name: 'get_skill',
    description: 'Get the full instructions (the SKILL.md body) for one skill by name. Apply these instructions to the user\'s task.',
    inputSchema: { type: 'object', properties: { name: { type: 'string', description: 'The exact skill name, e.g. "rice-prioritisation".' } }, required: ['name'] },
  },
];

function runTool(name, args = {}) {
  if (name === 'list_skills') {
    const list = SKILLS.filter((s) => !args.tier || s.tier === args.tier);
    const text = list.map((s) => `- ${s.name} [${s.tier}] — ${s.description}`).join('\n');
    return `${list.length} skills:\n${text}`;
  }
  if (name === 'search_skills') {
    const q = String(args.query || '').toLowerCase().trim();
    if (!q) throw new Error('query is required');
    const terms = q.split(/\s+/);
    const scored = SKILLS.map((s) => {
      const hay = (s.name + ' ' + s.description + ' ' + s.body).toLowerCase();
      let score = 0;
      for (const t of terms) {
        if (s.name.toLowerCase().includes(t)) score += 5;
        if (s.description.toLowerCase().includes(t)) score += 3;
        if (hay.includes(t)) score += 1;
      }
      return { s, score };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, Math.max(1, Math.min(args.limit || 10, 50)));
    if (!scored.length) return `No skills matched "${args.query}".`;
    return scored.map(({ s }) => `- ${s.name} [${s.tier}] — ${s.description}`).join('\n');
  }
  if (name === 'get_skill') {
    const s = byName.get(String(args.name || '').trim());
    if (!s) throw new Error(`Unknown skill "${args.name}". Use search_skills or list_skills to find one.`);
    return s.body;
  }
  throw new Error(`Unknown tool: ${name}`);
}

// ── JSON-RPC plumbing ────────────────────────────────────────────────────────
function send(msg) { process.stdout.write(JSON.stringify(msg) + '\n'); }
function reply(id, result) { send({ jsonrpc: '2.0', id, result }); }
function fail(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;

  switch (method) {
    case 'initialize':
      return reply(id, {
        protocolVersion: (params && params.protocolVersion) || '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: SERVER_NAME, version: VERSION },
      });
    case 'tools/list':
      return reply(id, { tools: TOOLS });
    case 'tools/call': {
      const toolName = params && params.name;
      try {
        const text = runTool(toolName, (params && params.arguments) || {});
        return reply(id, { content: [{ type: 'text', text }] });
      } catch (e) {
        return reply(id, { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true });
      }
    }
    case 'ping':
      return reply(id, {});
    case 'notifications/initialized':
    case 'notifications/cancelled':
      return; // notifications: no response
    default:
      if (isRequest) fail(id, -32601, `Method not found: ${method}`);
  }
}

process.stderr.write(`[${SERVER_NAME}] MCP server ready — ${SKILLS.length} skills, ${TOOLS.length} tools.\n`);
const rl = createInterface({ input: process.stdin });
rl.on('line', (line) => {
  const s = line.trim();
  if (!s) return;
  let msg;
  try { msg = JSON.parse(s); } catch { return; } // ignore non-JSON lines
  try { handle(msg); } catch (e) { process.stderr.write(`[${SERVER_NAME}] handler error: ${e.message}\n`); }
});
