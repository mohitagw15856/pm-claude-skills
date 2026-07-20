// mcp-audit — your MCP servers are charging you rent. This measures it.
//
//   pm-claude-skills mcp-audit                 # static: what's configured, when last used
//   pm-claude-skills mcp-audit --connect       # + spawn each stdio server, count real tool schemas
//   pm-claude-skills mcp-audit --days 14       # unused-threshold (default 30)
//
// What it does:
//   - reads your Claude Code MCP configs (~/.claude.json + ./.mcp.json)
//   - scans ~/.claude/projects/**.jsonl for mcp__<server>__ tool calls → last-used dates
//   - with --connect: speaks MCP (initialize + tools/list) to each stdio server and
//     token-estimates the schemas that ride EVERY message while the server is enabled
//   - verdict: "disconnect these N, save ~X tokens per message"
//
// --connect spawns the server commands from YOUR config (same as Claude Code does at
// startup) with an 8s timeout each. Nothing is sent anywhere; estimates are chars/4 ±15%.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { spawn } from 'node:child_process';

const toks = (s) => Math.max(1, Math.ceil(s.length / 4));
const getArg = (argv, name) => { const i = argv.indexOf(`--${name}`); return i >= 0 ? argv[i + 1] : undefined; };

function loadConfigs() {
  const servers = {}; // name -> {transport, command/url, source}
  const addFrom = (obj, source) => {
    for (const [name, cfg] of Object.entries(obj || {})) {
      if (servers[name]) continue; // first definition wins, matching lookup order
      servers[name] = {
        name, source,
        transport: cfg.url ? (cfg.type || 'http') : 'stdio',
        command: cfg.command ? [cfg.command, ...(cfg.args || [])].join(' ') : (cfg.url || ''),
        raw: cfg,
      };
    }
  };
  const globalPath = join(homedir(), '.claude.json');
  try {
    const g = JSON.parse(readFileSync(globalPath, 'utf8'));
    addFrom(g.mcpServers, '~/.claude.json');
    // per-project entries in the global file
    for (const [proj, pcfg] of Object.entries(g.projects || {})) addFrom(pcfg.mcpServers, `~/.claude.json [${proj.split('/').pop()}]`);
  } catch {}
  try { addFrom(JSON.parse(readFileSync('.mcp.json', 'utf8')).mcpServers, './.mcp.json'); } catch {}
  return servers;
}

function scanUsage(serverNames) {
  // last time each server's tools appear in any session log
  const lastUsed = Object.fromEntries(serverNames.map((n) => [n, null]));
  const projRoot = join(homedir(), '.claude', 'projects');
  if (!existsSync(projRoot)) return lastUsed;
  for (const dir of readdirSync(projRoot)) {
    const d = join(projRoot, dir);
    let files = [];
    try { files = readdirSync(d).filter((f) => f.endsWith('.jsonl')); } catch { continue; }
    for (const f of files) {
      const p = join(d, f);
      let mtime;
      try { mtime = statSync(p).mtime; } catch { continue; }
      // cheap pre-filter: skip files older than every current best
      if (serverNames.every((n) => lastUsed[n] && lastUsed[n] >= mtime)) continue;
      let text;
      try { text = readFileSync(p, 'utf8'); } catch { continue; }
      for (const n of serverNames) {
        if ((!lastUsed[n] || mtime > lastUsed[n]) && text.includes(`mcp__${n}__`)) lastUsed[n] = mtime;
      }
    }
  }
  return lastUsed;
}

// Minimal MCP stdio client: initialize → tools/list, newline-delimited JSON-RPC.
function listTools(cfg, timeoutMs = 8000) {
  return new Promise((resolveP) => {
    const { command, args = [], env = {} } = cfg;
    let child;
    try {
      child = spawn(command, args, { env: { ...process.env, ...env }, stdio: ['pipe', 'pipe', 'ignore'] });
    } catch (e) { return resolveP({ error: e.message }); }
    let buf = '', done = false;
    const finish = (result) => { if (done) return; done = true; try { child.kill(); } catch {} resolveP(result); };
    const timer = setTimeout(() => finish({ error: `no response in ${timeoutMs / 1000}s` }), timeoutMs);
    child.on('error', (e) => { clearTimeout(timer); finish({ error: e.message }); });
    child.stdout.on('data', (chunk) => {
      buf += chunk.toString();
      let idx;
      while ((idx = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, idx).trim(); buf = buf.slice(idx + 1);
        if (!line) continue;
        let msg; try { msg = JSON.parse(line); } catch { continue; }
        if (msg.id === 1) { // initialize response → send initialized + tools/list
          child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
          child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) + '\n');
        } else if (msg.id === 2) {
          clearTimeout(timer);
          const tools = msg.result?.tools || [];
          finish({ tools: tools.length, schemaTokens: toks(JSON.stringify(tools)) });
        }
      }
    });
    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'pm-mcp-audit', version: '1.0' } },
    }) + '\n');
  });
}

export async function run(argv) {
  if (argv.includes('--help')) {
    console.log('Usage: pm-claude-skills mcp-audit [--connect] [--days N] [--json]\nSee the file header for what each mode does.');
    return 0;
  }
  const days = Math.max(1, parseInt(getArg(argv, 'days') || '30', 10) || 30);
  const connect = argv.includes('--connect');
  const servers = loadConfigs();
  const names = Object.keys(servers);
  if (!names.length) { console.log('No MCP servers found in ~/.claude.json or ./.mcp.json — you are paying no rent. 🎉'); return 0; }

  console.log(`Found ${names.length} MCP server(s). Scanning session logs for usage…`);
  const lastUsed = scanUsage(names);

  if (connect) {
    for (const n of names) {
      const s = servers[n];
      if (s.transport !== 'stdio') { s.measure = { error: 'http/sse — schemas not measurable locally' }; continue; }
      process.stdout.write(`  connecting ${n}… `);
      s.measure = await listTools(s.raw);
      console.log(s.measure.error ? `✗ ${s.measure.error}` : `${s.measure.tools} tools ≈ ${s.measure.schemaTokens.toLocaleString()} tokens`);
    }
  }

  const now = Date.now(), cutoff = now - days * 86400e3;
  const rows = names.map((n) => {
    const s = servers[n];
    const used = lastUsed[n];
    const daysAgo = used ? Math.floor((now - used) / 86400e3) : null;
    const stale = !used || used < cutoff;
    return { name: n, source: s.source, transport: s.transport,
      tools: s.measure?.tools ?? null, tokens: s.measure?.schemaTokens ?? null, measureErr: s.measure?.error ?? null,
      lastUsed: used ? used.toISOString().slice(0, 10) : 'never (in logs)', daysAgo, stale };
  });

  if (argv.includes('--json')) { console.log(JSON.stringify({ days, connect, rows }, null, 2)); return 0; }

  console.log(`\n== MCP rent audit (unused threshold: ${days} days) ==`);
  for (const r of rows) {
    const cost = r.tokens != null ? ` · ~${r.tokens.toLocaleString()} tokens/message` : r.measureErr ? ` · (${r.measureErr})` : '';
    const flag = r.stale ? '🔴' : '🟢';
    console.log(`${flag} ${r.name}  [${r.transport}, ${r.source}]${cost}`);
    console.log(`     last used: ${r.lastUsed}${r.daysAgo != null ? ` (${r.daysAgo}d ago)` : ''}`);
  }
  const staleRows = rows.filter((r) => r.stale);
  const savings = staleRows.reduce((a, r) => a + (r.tokens || 0), 0);
  if (staleRows.length) {
    console.log(`\n💸 Disconnect candidates: ${staleRows.map((r) => r.name).join(', ')}`);
    if (connect && savings) console.log(`   → saves ~${savings.toLocaleString()} tokens on EVERY message (schemas ride each turn) — that's rent.`);
    else console.log(`   → run with --connect to measure exactly how many tokens/message they cost you.`);
    console.log(`   Remove with: claude mcp remove <name>   (re-add any time — configs are cheap, tokens aren't)`);
  } else {
    console.log(`\n🟢 Everything configured has been used within ${days} days. Lean setup.`);
  }
  if (!connect) console.log(`\n(Schema costs unmeasured — add --connect to spawn each stdio server and count its real tool schemas. Estimates chars/4, ±15%.)`);
  return 0;
}
