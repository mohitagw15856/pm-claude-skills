// Remote MCP server for PM Skills — a Cloudflare Worker speaking MCP over the
// Streamable HTTP transport, so anyone can add the library as a URL connector in
// ChatGPT, Claude.ai, Cursor, etc. (no install). Stateless; skills are fetched from
// the public catalog and cached at the edge.
//
// Deploy: cd mcp-remote && npx wrangler deploy  (free Cloudflare account)
// Then add the printed https://…workers.dev/  URL as an MCP/connector endpoint.

const SKILLS_URL = 'https://mohitagw15856.github.io/pm-claude-skills/skills.json';
const WORKFLOWS_URL = 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/workflows.json';
const REGISTRY_URL = 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/community/registry.json';
const SERVER = {
  name: 'pm-claude-skills',
  title: 'PM Skills — Professional Agent Skills',
  version: 'remote-1.2.0',
  websiteUrl: 'https://mohitagw15856.github.io/pm-claude-skills/',
  icons: [{ src: 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/icon.svg', mimeType: 'image/svg+xml', sizes: ['any'] }],
};
const INSTRUCTIONS =
  'A library of professional Agent Skills (PRDs, launches, postmortems, compliance, growth, careers & more). ' +
  "To answer a professional task: call search_skills (or list_skills) to find the right skill, then get_skill to fetch its instructions and apply them to the user's input.";

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

const SKILL_ITEM = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'The skill id (use with get_skill).' },
    title: { type: 'string', description: 'Human-readable title.' },
    bundle: { type: 'string', description: 'The bundle the skill belongs to.' },
    description: { type: 'string', description: 'One-line summary of what the skill does.' },
  },
  required: ['name', 'description'],
};
// All tools are read-only lookups over the bundled library — non-destructive, idempotent, closed-world.
const READONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const TOOLS = [
  {
    name: 'list_skills',
    title: 'List skills',
    description: 'List every available professional skill (name, title, bundle, one-line description). Optionally filter by bundle.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: { bundle: { type: 'string', description: 'Optional. Only return skills in this bundle, e.g. "pm-essentials".' } },
    },
    outputSchema: {
      type: 'object',
      properties: { count: { type: 'integer', description: 'Number of skills returned.' }, skills: { type: 'array', description: 'The matching skills.', items: SKILL_ITEM } },
      required: ['count', 'skills'],
    },
    annotations: { title: 'List skills', ...READONLY },
  },
  {
    name: 'search_skills',
    title: 'Search skills',
    description: 'Search skills by keyword across name, title, and description. Returns the best matches, ranked.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        query: { type: 'string', description: 'Keywords describing the task, e.g. "prioritise backlog" or "customer churn".' },
        limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Maximum number of results to return (default 10).' },
      },
      required: ['query'],
    },
    outputSchema: {
      type: 'object',
      properties: { query: { type: 'string', description: 'The query that was searched.' }, matches: { type: 'array', description: 'Matching skills, best first.', items: SKILL_ITEM } },
      required: ['query', 'matches'],
    },
    annotations: { title: 'Search skills', ...READONLY },
  },
  {
    name: 'get_skill',
    title: 'Get a skill',
    description: "Get a skill's full instructions (the SKILL.md body) by name. Apply them to the user's task.",
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: { name: { type: 'string', description: 'The exact skill id, e.g. "rice-prioritisation" (from list_skills / search_skills).' } },
      required: ['name'],
    },
    outputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'The skill id.' }, title: { type: 'string', description: 'Human-readable title.' }, instructions: { type: 'string', description: 'The full SKILL.md body to apply to the task.' } },
      required: ['name', 'instructions'],
    },
    annotations: { title: 'Get a skill', ...READONLY },
  },
];

// Each tool returns { text, structured }: human-readable text + a structured object matching outputSchema.
const skillItem = (s) => ({ name: s.name, title: s.title, bundle: s.plugin, description: s.description });

async function runTool(name, args) {
  const skills = await getSkills();
  if (name === 'list_skills') {
    const list = args.bundle ? skills.filter((s) => s.plugin === args.bundle) : skills;
    const text = list.map((s) => `- ${s.name} (${s.plugin}): ${s.description}`).join('\n');
    return { text, structured: { count: list.length, skills: list.map(skillItem) } };
  }
  if (name === 'search_skills') {
    const hits = searchSkills(skills, args.query, args.limit || 10);
    const matches = hits.map(skillItem);
    const text = matches.length ? matches.map((s) => `- ${s.name}: ${s.description}`).join('\n') : 'No matching skills.';
    return { text, structured: { query: String(args.query || ''), matches } };
  }
  if (name === 'get_skill') {
    const s = skills.find((x) => x.name === args.name);
    if (!s) return { text: `No skill named "${args.name}". Use search_skills to find one.`, structured: { name: String(args.name || ''), title: '', instructions: '' } };
    return { text: `# ${s.title}\n\n${s.body}`, structured: { name: s.name, title: s.title, instructions: s.body } };
  }
  throw new Error('Unknown tool: ' + name);
}

async function handle(msg) {
  const { id, method, params = {} } = msg;
  const result = async () => {
    switch (method) {
      case 'initialize':
        return { protocolVersion: params.protocolVersion || '2025-03-26', capabilities: { tools: {}, prompts: {}, resources: {} }, serverInfo: SERVER, instructions: INSTRUCTIONS };
      case 'tools/list':
        return { tools: TOOLS };
      case 'tools/call': {
        try { const { text, structured } = await runTool(params.name, params.arguments || {}); return { content: [{ type: 'text', text }], structuredContent: structured }; }
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
        'GET /v1/community': 'List community-registry skills (namespaced handle/skill; not curated — see community/README.md).',
        'GET /v1/community/{handle}/{skill}': 'One community skill, fetched live from its author repo.',
      },
      note: 'Read-only, no auth, CORS-open. Same catalogue as the MCP connector (POST /).',
    });
  }

  // /v1/community  and  /v1/community/{handle}/{skill} — the community registry.
  // Entries are validated on PR (structure + security scan) but NOT curated/eval-scored;
  // responses carry community: true so consumers can distinguish at a glance.
  if (seg[1] === 'community') {
    let registry;
    try {
      const r = await fetch(REGISTRY_URL, { cf: { cacheTtl: 900, cacheEverything: true } });
      registry = await r.json();
    } catch { return jsonResponse({ error: 'Registry unavailable.' }, 502); }
    const entries = (registry.skills || []).map((s) => ({ ...s, community: true }));
    if (seg.length === 2) return jsonResponse({ count: entries.length, note: 'Community skills — validated, not curated. See community/README.md.', skills: entries });
    const name = decodeURIComponent(seg.slice(2).join('/'));
    const entry = entries.find((s) => s.name === name);
    if (!entry) return jsonResponse({ error: `No community skill "${name}". GET /v1/community for the list.` }, 404);
    const [owner, repo] = entry.repo.replace(/\/$/, '').split('/').slice(3);
    const raw = `https://raw.githubusercontent.com/${owner}/${repo}/${entry.ref || 'main'}/${entry.path}`;
    const fr = await fetch(raw, { cf: { cacheTtl: 900, cacheEverything: true } });
    if (!fr.ok) return jsonResponse({ error: `Upstream fetch failed (${fr.status}) — the author's repo may have moved.`, source: raw }, 502);
    const text = await fr.text();
    if (url.searchParams.get('format') === 'md') {
      return new Response(text, { headers: { 'content-type': 'text/markdown; charset=utf-8', ...CORS } });
    }
    return jsonResponse({ ...entry, source: raw, instructions: text.replace(/^---[\s\S]*?---\n/, '') });
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

// ── Agent-to-agent (A2A) discovery ───────────────────────────────────────────
// Other AI agents can discover this service via the standard well-known agent
// card, then "hire" the library over a minimal JSON-RPC message/send endpoint:
// send a task description, get back the best-matching skill's full instructions
// to execute themselves. Read-only, no LLM calls server-side, same catalogue.
const WORKER_URL = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const REPO_URL = 'https://github.com/mohitagw15856/pm-claude-skills';
const AGENT_CARD = {
  name: 'PM Skills Library',
  description:
    'A library of professional Agent Skills (PRDs, launches, postmortems, compliance, growth, careers & more). ' +
    'Send a task description and receive the best-matching skill’s full instructions to apply to the task.',
  url: WORKER_URL + '/a2a',
  version: SERVER.version,
  provider: { organization: 'pm-claude-skills', url: REPO_URL },
  capabilities: { streaming: false, pushNotifications: false, stateTransitionHistory: false },
  defaultInputModes: ['text/plain', 'application/json'],
  defaultOutputModes: ['text/plain', 'application/json'],
  skills: [
    {
      id: 'search-skills',
      name: 'Search skills',
      description: 'Search skills by keyword across name, title, and description. Returns the best matches, ranked.',
      tags: ['discovery', 'search', 'catalog'],
      examples: ['prioritise backlog', 'customer churn', 'which skill should I use for a launch plan?'],
    },
    {
      id: 'get-skill',
      name: 'Get a skill',
      description: "Get a skill's full instructions (the SKILL.md body) by name, to apply to the calling agent's task.",
      tags: ['skill', 'instructions', 'retrieval'],
      examples: ['get rice-prioritisation', 'fetch the incident-postmortem skill'],
    },
    {
      id: 'get-workflow',
      name: 'Get a workflow recipe',
      description: 'Fetch a multi-skill recipe (an ordered chain of skills where each output feeds the next).',
      tags: ['workflow', 'recipe', 'chain'],
      examples: ['ship-a-feature', 'launch-a-product'],
    },
  ],
};

const rpcError = (id, code, message) =>
  jsonResponse({ jsonrpc: '2.0', id: id === undefined ? null : id, error: { code, message } });

async function handleA2A(request) {
  let body;
  try { body = await request.json(); } catch { return rpcError(null, -32600, 'Invalid request: body is not JSON.'); }
  const { id, method, params = {} } = body || {};
  if (!body || body.jsonrpc !== '2.0' || typeof method !== 'string') return rpcError(id, -32600, 'Invalid request: expected JSON-RPC 2.0.');
  if (method !== 'message/send') return rpcError(id, -32601, 'Method not found: ' + method + ' (this agent supports message/send).');

  const parts = (params.message && params.message.parts) || [];
  const query = parts.map((p) => (p && (p.text || (p.kind === 'text' && p.content))) || '').join(' ').trim();
  if (!query) return rpcError(id, -32600, 'Invalid request: params.message.parts must contain text describing the task.');

  const skills = await getSkills();
  // Direct skill-name mention wins; otherwise rank by token overlap — A2A
  // queries are whole sentences, so whole-phrase substring search (fine for
  // the REST /v1/search keywords) would almost never match here.
  const qTokens = new Set(query.toLowerCase().match(/[a-z]{4,}/g) || []);
  const ranked = skills
    .map((s) => {
      let score = 0;
      for (const w of new Set((s.title + ' ' + s.description).toLowerCase().match(/[a-z]{4,}/g) || [])) if (qTokens.has(w)) score++;
      for (const w of s.name.split('-')) if (w.length >= 4 && qTokens.has(w)) score += 2;
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.s);
  const named = skills.find((s) => query.toLowerCase().includes(s.name));
  const best = named || ranked[0];
  if (!best) {
    return jsonResponse({
      jsonrpc: '2.0', id,
      result: { kind: 'message', role: 'agent', messageId: crypto.randomUUID(), metadata: { skill: null, bundle: null, runnerUp: null }, parts: [{ kind: 'text', text: 'No matching skill found. Try different keywords, or GET ' + WORKER_URL + '/v1/skills for the catalogue.' }] },
    });
  }
  const runnerUp = ranked.filter((s) => s.name !== best.name)[0];
  return jsonResponse({
    jsonrpc: '2.0', id,
    result: {
      kind: 'message', role: 'agent', messageId: crypto.randomUUID(),
      metadata: { skill: best.name, bundle: best.plugin, runnerUp: runnerUp ? runnerUp.name : null },
      parts: [
        { kind: 'text', text: `Best-match skill: ${best.name} (${best.plugin}) — ${best.description}` + (runnerUp ? `\nRunner-up: ${runnerUp.name} — ${runnerUp.description}` : '') },
        { kind: 'text', text: `Apply these instructions to the task:\n\n# ${best.title}\n\n${best.body}` },
      ],
    },
  });
}

// ── "Try Claude free, no key" — a SPONSORED, CAPPED proxy ────────────────────
// Ships OFF. It only runs when you provision (a) the ANTHROPIC_API_KEY secret and
// (b) a KV namespace bound as TRY_KV (for the rate-limit counters). It fails CLOSED:
// if the key OR the KV binding is missing, it refuses — so you can NEVER spend
// unbounded. Guards, in order: kill-switch env → key present → KV present →
// per-IP daily cap → global daily cap. Uses cheap Haiku + a low token cap, so the
// global cap bounds your worst-case daily spend to a few dollars. Heavy/serious
// users are nudged to bring their own key (free Gemini or their own Claude).
const TRY = { model: 'claude-haiku-4-5-20251001', maxTokens: 1200, perIpPerDay: 5, globalPerDay: 100, maxInputChars: 8000 };

function tryConfigured(env) { return !!(env && env.ANTHROPIC_API_KEY && env.TRY_KV && env.TRY_ENABLED !== 'false'); }
// GET /try/stats — public runs-served counter (counts only, never content).
// Default: shields.io endpoint JSON for a README badge; ?format=json for raw.
async function tryStats(url, env) {
  const total = tryConfigured(env) ? +((await env.TRY_KV.get('try:total')) || 0) : 0;
  if (url.searchParams.get('format') === 'json') {
    return jsonResponse({ freeRunsServed: total, perIpPerDay: TRY.perIpPerDay, globalPerDay: TRY.globalPerDay });
  }
  return new Response(JSON.stringify({ schemaVersion: 1, label: 'free skill runs served', message: '🔥 ' + total.toLocaleString('en-US'), color: 'd97757' }),
    { headers: { 'content-type': 'application/json', 'cache-control': 'public, s-maxage=300, max-age=300', ...CORS } });
}
function tryStatus(env) {
  return jsonResponse({ enabled: tryConfigured(env), perIpPerDay: TRY.perIpPerDay, model: 'Claude Haiku', note: tryConfigured(env) ? 'A few free Claude runs per day, sponsor-funded. Bring your own key for more — or fund runs for everyone: https://github.com/sponsors/mohitagw15856' : 'Free Claude trial not configured on this deployment.' });
}
async function handleTry(request, env) {
  if (!tryConfigured(env)) return jsonResponse({ error: 'disabled', message: 'Free Claude trial is not enabled here. Use the free Gemini key or your own key.' }, 503);

  const ip = request.headers.get('cf-connecting-ip') || 'anon';
  const day = new Date().toISOString().slice(0, 10);
  const ipKey = `try:ip:${day}:${ip}`, globalKey = `try:global:${day}`;
  const [ipN, globalN] = await Promise.all([env.TRY_KV.get(ipKey), env.TRY_KV.get(globalKey)]);
  if (+(globalN || 0) >= TRY.globalPerDay) return jsonResponse({ error: 'global_cap', message: "The free Claude trial hit today's shared limit — the free runs are sponsor-funded. Grab a free Gemini key (no card), or help raise the cap: https://github.com/sponsors/mohitagw15856" }, 429);
  if (+(ipN || 0) >= TRY.perIpPerDay) return jsonResponse({ error: 'ip_cap', message: `That's your ${TRY.perIpPerDay} free Claude runs today — they're sponsor-funded. Add a free Gemini key to keep going, or fund more runs for everyone: https://github.com/sponsors/mohitagw15856` }, 429);

  let payload;
  try { payload = await request.json(); } catch { return jsonResponse({ error: 'bad_json' }, 400); }
  const prompt = String(payload.prompt || '').slice(0, TRY.maxInputChars);
  const system = String(payload.system || '').slice(0, 12000);
  if (!prompt.trim()) return jsonResponse({ error: 'no_prompt' }, 400);

  // Count first (fail-safe: a hammered endpoint can't exceed the cap even if a call errors).
  const total = +((await env.TRY_KV.get('try:total')) || 0) + 1;
  await Promise.all([
    env.TRY_KV.put(ipKey, String(+(ipN || 0) + 1), { expirationTtl: 172800 }),
    env.TRY_KV.put(globalKey, String(+(globalN || 0) + 1), { expirationTtl: 172800 }),
    env.TRY_KV.put('try:total', String(total)),   // cumulative, never expires
  ]);

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: TRY.model, max_tokens: TRY.maxTokens, ...(system ? { system } : {}), messages: [{ role: 'user', content: prompt }] }),
  });
  if (!res.ok) return jsonResponse({ error: 'upstream', message: 'Claude is busy — try again, or use your own key.' }, 502);
  const data = await res.json();
  const text = (data.content || []).map((c) => c.text || '').join('');
  const remaining = Math.max(0, TRY.perIpPerDay - (+(ipN || 0) + 1));
  return jsonResponse({ text, model: 'claude-haiku', remaining });
}


// ── SkillSpec badge: GET /badge?repo=owner/repo[&ref=main] ────────────────────
// Live-grades a repo's SKILL.md files against SkillSpec and returns shields.io
// endpoint JSON, so any skills repo can wear its conformance level:
//   ![SkillSpec](https://img.shields.io/endpoint?url=<this-worker>/badge%3Frepo%3Downer/repo)
// Cached hard (6h) — grading is a courtesy, not a DoS vector.
function gradeSkill(text) {
  const fm = text.match(/^\s*---\r?\n([\s\S]*?)\r?\n\s*---\r?\n?([\s\S]*)$/);
  if (!fm) return 0;
  const name = /^name:\s*.+$/m.test(fm[1]), desc = /^description:\s*.+$/m.test(fm[1]);
  if (!name || !desc) return 0;
  const body = fm[2] || '';
  const l2 = /##\s*(What This Skill Produces|Required Inputs|Input)/i.test(body) && /##\s*(Output|Deliverable)|##[^\n]*\b(Template|Structure|Format)\b/i.test(body);
  const l3 = l2 && /##\s*Quality Checks/i.test(body) && /##\s*Anti-Patterns/i.test(body);
  return l3 ? 3 : l2 ? 2 : 1;
}
async function handleBadge(url, env) {
  const repo = url.searchParams.get('repo') || '';
  const m = repo.match(/^([\w.-]+)\/([\w.-]+)$/);
  // ok=false responses carry no-cache so a rate-limited moment doesn't stick for 6h.
  const shield = (message, color, ok = false) => new Response(JSON.stringify({ schemaVersion: 1, label: 'SkillSpec', message, color }),
    { headers: { 'content-type': 'application/json', 'cache-control': ok ? 'public, s-maxage=21600, max-age=3600' : 'no-store', 'x-badge-ok': ok ? '1' : '0', ...CORS } });
  if (!m) return shield('bad repo param', 'lightgrey');
  const [, owner, name] = m;
  try {
    // A GITHUB_TOKEN secret (wrangler secret put GITHUB_TOKEN) lifts the shared-IP
    // rate limit from 60/h to 5000/h; the badge degrades gracefully without it.
    const gh = { headers: { 'User-Agent': 'pm-skills-badge', Accept: 'application/vnd.github+json',
      ...(env && env.GITHUB_TOKEN ? { authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}) } };
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${name}`, gh);
    if (repoRes.status === 403 || repoRes.status === 429) return shield('rate limited — retry soon', 'lightgrey');
    if (!repoRes.ok) return shield('repo not found', 'lightgrey');
    const ref = url.searchParams.get('ref') || (await repoRes.json()).default_branch;
    const treeRes = await fetch(`https://api.github.com/repos/${owner}/${name}/git/trees/${encodeURIComponent(ref)}?recursive=1`, gh);
    if (treeRes.status === 403 || treeRes.status === 429) return shield('rate limited — retry soon', 'lightgrey');
    const tree = await treeRes.json();
    const paths = (tree.tree || []).filter((e) => e.type === 'blob' && (e.path.endsWith('/SKILL.md') || e.path === 'SKILL.md')).map((e) => e.path).slice(0, 20);
    if (!paths.length) return shield('no skills found', 'lightgrey', true);
    const levels = await Promise.all(paths.map(async (p) => {
      try { const r = await fetch(`https://raw.githubusercontent.com/${owner}/${name}/${ref}/${p}`); return r.ok ? gradeSkill(await r.text()) : 0; }
      catch { return 0; }
    }));
    const min = Math.min(...levels);
    const label = ['not loadable', 'L1 Loadable', 'L2 Structured', 'L3 Trustworthy'][min];
    const color = ['red', 'yellow', 'green', 'brightgreen'][min];
    const suffix = paths.length >= 20 ? '20+ skills' : `${paths.length} skill${paths.length === 1 ? '' : 's'}`;
    return shield(`${label} \u00b7 ${suffix}`, color, true);
  } catch (e) {
    return shield('unavailable', 'lightgrey');
  }
}


// ── /signal: ephemeral WebRTC signaling for multiplayer arenas ────────────────
// Stores ONLY SDP offer/answer blobs (no session content ever touches the
// worker — the arena traffic is peer-to-peer). Keys expire in 5 minutes.
async function handleSignal(request, url, env) {
  if (!env.TRY_KV) return jsonResponse({ error: 'no_kv', message: 'signaling not configured' }, 503);
  const room = (url.searchParams.get('room') || '').replace(/[^A-Za-z0-9-]/g, '').slice(0, 24);
  const role = url.searchParams.get('role') === 'answer' ? 'answer' : 'offer';
  if (!room) return jsonResponse({ error: 'bad_room' }, 400);
  const key = `sig:${room}:${role}`;
  if (request.method === 'POST') {
    const body = await request.text();
    if (body.length > 32768) return jsonResponse({ error: 'too_big' }, 413);
    await env.TRY_KV.put(key, body, { expirationTtl: 300 });
    return jsonResponse({ ok: true });
  }
  const v = await env.TRY_KV.get(key);
  return v ? new Response(v, { headers: { 'content-type': 'application/json', ...CORS } }) : jsonResponse({ waiting: true }, 404);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    const url = new URL(request.url);
    // A2A: standard discovery card + minimal message/send endpoint (see handleA2A).
    if (url.pathname === '/.well-known/agent-card.json' && (request.method === 'GET' || request.method === 'HEAD')) {
      return jsonResponse(AGENT_CARD);
    }
    if (url.pathname === '/signal') {
      return handleSignal(request, url, env);
    }
    // ── Verifiable credentials: Ed25519-sign claim payloads (charter, exam,
    // season results). Honest scope: a signature makes a credential
    // tamper-evident and timestamped — it attests "these claims + this
    // transcript hash were presented at this time", not that the run was
    // proctored. Public key at /cred/pubkey; anyone verifies offline.
    // ── Skill of the Day: deterministic by UTC date — same skill for everyone,
    // embeddable anywhere. /today.json for apps; /today/badge for READMEs via
    // shields endpoint. Zero state: the date is the seed.
    if ((url.pathname === '/today.json' || url.pathname === '/today/badge') && (request.method === 'GET' || request.method === 'HEAD')) {
      const skills = await getSkills();
      const day = Math.floor(Date.now() / 86400000);
      const s2 = skills[((day % skills.length) + skills.length) % skills.length];
      if (url.pathname === '/today/badge') {
        return new Response(JSON.stringify({ schemaVersion: 1, label: '🎯 skill of the day', message: s2.name, color: '8a5cf5', cacheSeconds: 3600 }),
          { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600', ...CORS } });
      }
      return new Response(JSON.stringify({
        date: new Date().toISOString().slice(0, 10), name: s2.name, title: s2.title,
        description: s2.description,
        run: 'https://mohitagw15856.github.io/pm-claude-skills/index.html?skill=' + s2.name,
        page: 'https://mohitagw15856.github.io/pm-claude-skills/skill/' + s2.name + '.html',
      }, null, 2), { headers: { 'content-type': 'application/json', 'cache-control': 'public, max-age=3600', ...CORS } });
    }
    // ── Verdict API: grade any text against a skill's own rubric, on the
    // CALLER's Anthropic key (never ours — zero cost to this service). The
    // rubrics become infrastructure: CI gates, editor plugins, anything.
    if (url.pathname === '/verdict' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return jsonResponse({ error: 'bad json' }, 400); }
      const { text, skill, key, model } = body || {};
      if (!text || !skill || !key) return jsonResponse({ error: 'need { text, skill, key } — key is YOUR Anthropic key; it is forwarded to Anthropic and never stored' }, 400);
      if (String(text).length > 60000) return jsonResponse({ error: 'text too large (60KB cap)' }, 413);
      const skills = await getSkills();
      const s = skills.find((x) => x.name === skill);
      if (!s) return jsonResponse({ error: `unknown skill: ${skill}` }, 404);
      const rubric = (s.instructions.match(/##\s*Scoring Rubric[\s\S]*?(?=\n##\s|$)/i) || [''])[0];
      const sys = `You grade one document against the "${s.title}" skill's standard.\n\nThe skill:\n${s.instructions.slice(0, 20000)}\n\nReturn ONLY JSON: {"score": <0-40 integer${rubric ? ', per the skill\'s Scoring Rubric dimensions' : ', 4 dimensions x 0-10: structure, completeness, judgment, actionability'}>, "dimensions": {"<dim>": <0-10>, ...}, "verdict": "<SHIP|SHIP WITH FIXES|NEEDS WORK>", "top_fix": "<the single highest-impact fix, one sentence>"}`;
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({ model: model || 'claude-haiku-4-5-20251001', max_tokens: 500, system: sys, messages: [{ role: 'user', content: String(text) }] }),
      });
      if (!r.ok) return jsonResponse({ error: `anthropic: ${r.status}`, detail: (await r.text()).slice(0, 300) }, 502);
      const j = await r.json();
      const raw = (j.content && j.content[0] && j.content[0].text) || '';
      let graded;
      try { graded = JSON.parse((raw.match(/\{[\s\S]*\}/) || ['{}'])[0]); } catch { graded = { raw }; }
      return jsonResponse({ skill: s.name, max: 40, model: model || 'claude-haiku-4-5-20251001', ...graded }, 200);
    }
    if (url.pathname === '/cred/pubkey' && (request.method === 'GET' || request.method === 'HEAD')) {
      if (!env.SIGNING_JWK) return jsonResponse({ error: 'signing not configured' }, 503);
      const { d, ...pub } = JSON.parse(env.SIGNING_JWK);
      return jsonResponse({ kid: 'pm-skills-2026', alg: 'Ed25519', jwk: pub });
    }
    if (url.pathname === '/cred/sign' && request.method === 'POST') {
      if (!env.SIGNING_JWK) return jsonResponse({ error: 'signing not configured' }, 503);
      let claims;
      try { claims = await request.json(); } catch { return jsonResponse({ error: 'bad json' }, 400); }
      const body = JSON.stringify(claims);
      if (body.length > 4096) return jsonResponse({ error: 'claims too large' }, 413);
      const payload = { v: 1, kid: 'pm-skills-2026', iat: new Date().toISOString(), claims };
      const data = new TextEncoder().encode(JSON.stringify(payload));
      const key = await crypto.subtle.importKey('jwk', JSON.parse(env.SIGNING_JWK), { name: 'Ed25519' }, false, ['sign']);
      const sig = await crypto.subtle.sign('Ed25519', key, data);
      const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      return jsonResponse({ credential: b64u(data) + '.' + b64u(sig) });
    }
    if (url.pathname === '/badge' && (request.method === 'GET' || request.method === 'HEAD')) {
      const key = new Request(url.toString());
      const cache = caches.default;
      const hit = await cache.match(key);
      if (hit) return hit;
      const res = await handleBadge(url, env);
      if (res.headers.get('x-badge-ok') === '1') { try { await cache.put(key, res.clone()); } catch { /* best-effort */ } }
      return res;
    }
    if (url.pathname === '/a2a') {
      if (request.method === 'POST') return handleA2A(request);
      if (request.method === 'GET') return jsonResponse({ hint: 'POST JSON-RPC 2.0 message/send here. Discovery: GET /.well-known/agent-card.json' });
      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    }
    // Capped, sponsored "try Claude free, no key" endpoint (off until configured — see handleTry).
    if (url.pathname === '/try/stats' && (request.method === 'GET' || request.method === 'HEAD')) {
      return tryStats(url, env);
    }
    if (url.pathname === '/try') {
      if (request.method === 'GET') return tryStatus(env);   // frontend probes this to show/hide the button (already a Response)
      if (request.method === 'POST') return handleTry(request, env);
      return new Response('Method Not Allowed', { status: 405, headers: CORS });
    }
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
