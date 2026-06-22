// Remote MCP server for PM Skills — a Cloudflare Worker speaking MCP over the
// Streamable HTTP transport, so anyone can add the library as a URL connector in
// ChatGPT, Claude.ai, Cursor, etc. (no install). Stateless; skills are fetched from
// the public catalog and cached at the edge.
//
// Deploy: cd mcp-remote && npx wrangler deploy  (free Cloudflare account)
// Then add the printed https://…workers.dev/  URL as an MCP/connector endpoint.

const SKILLS_URL = 'https://mohitagw15856.github.io/pm-claude-skills/skills.json';
const WORKFLOWS_URL = 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/workflows.json';
const SERVER = { name: 'pm-claude-skills', version: 'remote-1.0.0' };

let CACHE = null;
async function getSkills() {
  if (CACHE) return CACHE;
  const r = await fetch(SKILLS_URL, { cf: { cacheTtl: 3600, cacheEverything: true } });
  const j = await r.json();
  CACHE = (j.skills || []).map((s) => ({ name: s.name, title: s.title, description: s.description, plugin: s.plugin, tier: s.tier || null, inputs: s.inputs || null, source: s.source || null, body: s.instructions || '' }));
  return CACHE;
}

let WF_CACHE = null;
async function getWorkflows() {
  if (WF_CACHE) return WF_CACHE;
  const r = await fetch(WORKFLOWS_URL, { cf: { cacheTtl: 3600, cacheEverything: true } });
  const j = await r.json();
  WF_CACHE = j.workflows || [];
  return WF_CACHE;
}

// Keyword search shared by the MCP tool and the REST API. Ranks by how often the
// query substring appears across name/title/description.
function searchSkills(skills, query, limit) {
  const q = String(query || '').toLowerCase();
  if (!q) return [];
  return skills
    .map((s) => ({ s, n: (s.title + ' ' + s.description + ' ' + s.name).toLowerCase().split(q).length - 1 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.s);
}

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, authorization, mcp-session-id, mcp-protocol-version',
};

const TOOLS = [
  { name: 'list_skills', description: 'List every available skill (name + description). Optionally filter by bundle.', inputSchema: { type: 'object', properties: { bundle: { type: 'string' } } } },
  { name: 'search_skills', description: 'Search skills by keyword and return the best matches.', inputSchema: { type: 'object', properties: { query: { type: 'string' }, limit: { type: 'number' } }, required: ['query'] } },
  { name: 'get_skill', description: 'Get a skill\'s full instructions by name. Apply them to the user\'s task.', inputSchema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } },
];

async function runTool(name, args) {
  const skills = await getSkills();
  if (name === 'list_skills') {
    const list = args.bundle ? skills.filter((s) => s.plugin === args.bundle) : skills;
    return list.map((s) => `- ${s.name} (${s.plugin}): ${s.description}`).join('\n');
  }
  if (name === 'search_skills') {
    const hits = searchSkills(skills, args.query, args.limit || 10);
    return hits.length ? hits.map((s) => `- ${s.name}: ${s.description}`).join('\n') : 'No matching skills.';
  }
  if (name === 'get_skill') {
    const s = skills.find((x) => x.name === args.name);
    return s ? `# ${s.title}\n\n${s.body}` : `No skill named "${args.name}". Use search_skills to find one.`;
  }
  throw new Error('Unknown tool: ' + name);
}

async function handle(msg) {
  const { id, method, params = {} } = msg;
  const result = async () => {
    switch (method) {
      case 'initialize':
        return { protocolVersion: params.protocolVersion || '2025-03-26', capabilities: { tools: {}, prompts: {}, resources: {} }, serverInfo: SERVER };
      case 'tools/list':
        return { tools: TOOLS };
      case 'tools/call': {
        try { return { content: [{ type: 'text', text: await runTool(params.name, params.arguments || {}) }] }; }
        catch (e) { return { content: [{ type: 'text', text: 'Error: ' + e.message }], isError: true }; }
      }
      case 'prompts/list': {
        const s = await getSkills();
        return { prompts: s.map((x) => ({ name: x.name, title: x.title, description: x.description, arguments: [{ name: 'task', description: 'The task to apply this skill to.', required: false }] })) };
      }
      case 'prompts/get': {
        const s = (await getSkills()).find((x) => x.name === params.name);
        if (!s) throw new Error('Unknown prompt');
        const task = (params.arguments && params.arguments.task) || '';
        return { description: s.description, messages: [{ role: 'user', content: { type: 'text', text: s.body + (task ? `\n\n---\nApply this skill now to:\n${task}` : '') } }] };
      }
      case 'resources/list': {
        const s = await getSkills();
        return { resources: s.map((x) => ({ uri: `skill://${x.name}`, name: x.title, description: x.description, mimeType: 'text/markdown' })) };
      }
      case 'resources/read': {
        const uri = params.uri || '';
        const s = (await getSkills()).find((x) => x.name === uri.replace(/^skill:\/\//, ''));
        if (!s) throw new Error('Unknown resource');
        return { contents: [{ uri, mimeType: 'text/markdown', text: `# ${s.title}\n\n${s.body}` }] };
      }
      case 'ping':
        return {};
      default:
        return undefined; // notifications / unknown → no result
    }
  };

  // notifications (no id) get no response
  if (id === undefined || id === null) return null;
  try {
    const r = await result();
    if (r === undefined) return { jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found: ' + method } };
    return { jsonrpc: '2.0', id, result: r };
  } catch (e) {
    return { jsonrpc: '2.0', id, error: { code: -32603, message: e.message } };
  }
}

// ── REST API ─────────────────────────────────────────────────────────────────
// A plain read-only JSON API over the same catalogue the MCP tools serve, so
// no-code / HTTP tools (n8n's HTTP Request node, Lovable apps, Make, Zapier…)
// can use the library without speaking MCP. Read-only, no auth, CORS-open.
const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data, null, 2), { status, headers: { 'content-type': 'application/json; charset=utf-8', ...CORS } });

const publicSkill = (s) => ({ name: s.name, title: s.title, description: s.description, bundle: s.plugin, tier: s.tier });
const fullSkill = (s) => ({ name: s.name, title: s.title, description: s.description, bundle: s.plugin, tier: s.tier, inputs: s.inputs, source: s.source, instructions: s.body });

async function handleRest(url) {
  const seg = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean); // e.g. ['v1','skills','prd-template']

  // GET /v1 — index
  if (seg.length === 1) {
    return jsonResponse({
      service: 'pm-skills REST API',
      version: 'v1',
      endpoints: {
        'GET /v1/skills': 'List skills. Filters: ?bundle=<plugin> ?q=<search> ?limit=N',
        'GET /v1/skills/{name}': 'One skill with full instructions. Add ?format=md for raw markdown.',
        'GET /v1/search?q=<query>': 'Search skills by keyword.',
        'GET /v1/workflows': 'List workflow recipes (skill chains).',
        'GET /v1/workflows/{id}': 'One workflow recipe with its ordered steps.',
      },
      note: 'Read-only, no auth, CORS-open. Same catalogue as the MCP connector (POST /).',
    });
  }

  // /v1/skills  and  /v1/skills/{name}
  if (seg[1] === 'skills') {
    const skills = await getSkills();
    if (seg.length === 2) {
      const q = url.searchParams.get('q');
      const bundle = url.searchParams.get('bundle');
      const limit = Number(url.searchParams.get('limit')) || 0;
      let list = bundle ? skills.filter((s) => s.plugin === bundle) : skills;
      if (q) list = searchSkills(list, q, limit || 50);
      else if (limit) list = list.slice(0, limit);
      return jsonResponse({ count: list.length, skills: list.map(publicSkill) });
    }
    const name = decodeURIComponent(seg.slice(2).join('/'));
    const s = skills.find((x) => x.name === name);
    if (!s) return jsonResponse({ error: `No skill named "${name}". Try GET /v1/search?q=` }, 404);
    const fmt = url.searchParams.get('format');
    if (fmt === 'md' || fmt === 'markdown') {
      return new Response(`# ${s.title}\n\n${s.body}`, { headers: { 'content-type': 'text/markdown; charset=utf-8', ...CORS } });
    }
    return jsonResponse(fullSkill(s));
  }

  // /v1/search?q=
  if (seg[1] === 'search') {
    const q = url.searchParams.get('q') || '';
    if (!q) return jsonResponse({ error: 'Pass a query: GET /v1/search?q=churn' }, 400);
    const hits = searchSkills(await getSkills(), q, Number(url.searchParams.get('limit')) || 10);
    return jsonResponse({ query: q, count: hits.length, skills: hits.map(publicSkill) });
  }

  // /v1/workflows  and  /v1/workflows/{id}
  if (seg[1] === 'workflows') {
    const wfs = await getWorkflows();
    if (seg.length === 2) {
      return jsonResponse({
        count: wfs.length,
        workflows: wfs.map((w) => ({ id: w.id, name: w.name, command: w.command, summary: w.summary, lifecycle: w.lifecycle, steps: (w.steps || []).map((st) => st.skill) })),
      });
    }
    const w = wfs.find((x) => x.id === seg[2]);
    if (!w) return jsonResponse({ error: `No workflow "${seg[2]}". See GET /v1/workflows` }, 404);
    return jsonResponse(w);
  }

  return jsonResponse({ error: 'Unknown endpoint. See GET /v1' }, 404);
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    if ((request.method === 'GET' || request.method === 'HEAD') && url.pathname.startsWith('/v1')) {
      return handleRest(url);
    }
    if (request.method === 'GET' || request.method === 'HEAD') {
      // MCP Streamable HTTP: a client opening the optional SSE stream sends Accept:
      // text/event-stream. This server is stateless (no server-initiated messages), so
      // we signal "no stream" with 405 per spec; humans/health-checks get a JSON blurb.
      const accept = request.headers.get('accept') || '';
      if (accept.includes('text/event-stream')) return new Response('This MCP server has no server-initiated stream; send JSON-RPC via POST.', { status: 405, headers: CORS });
      return new Response(JSON.stringify({ server: SERVER, transport: 'streamable-http', hint: 'POST MCP JSON-RPC here, or add this URL as an MCP connector.', rest: 'GET /v1 for a read-only REST API (skills, search, workflows) — for n8n, Lovable, Make, etc.' }), { headers: { 'content-type': 'application/json', ...CORS } });
    }
    if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: CORS });
    let body;
    try { body = await request.json(); } catch { return new Response('Bad JSON', { status: 400, headers: CORS }); }
    const out = Array.isArray(body) ? (await Promise.all(body.map(handle))).filter(Boolean) : await handle(body);
    if (out === null || (Array.isArray(out) && out.length === 0)) return new Response(null, { status: 202, headers: CORS });
    return new Response(JSON.stringify(out), { headers: { 'content-type': 'application/json', ...CORS } });
  },
};
