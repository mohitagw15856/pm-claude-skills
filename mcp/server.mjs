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
import { parseInputs } from '../bin/lib/inputs.mjs';

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

// Typed inputs: each skill's "Required Inputs" section parsed into structured
// fields (same parse the playground form and CLI prompting use). Cached lazily.
const inputsCache = new Map();
function skillInputs(s) {
  if (!inputsCache.has(s.name)) {
    const inputs = parseInputs(s.body).map((i) => ({
      ...i,
      arg: i.label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 48) || 'input',
    }));
    inputsCache.set(s.name, inputs);
  }
  return inputsCache.get(s.name);
}
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

// Workflow recipes (chains of skills). Optional — absent in older installs.
function loadWorkflows() {
  const f = join(PKG_ROOT, 'workflows.json');
  if (!existsSync(f)) return [];
  try { return JSON.parse(readFileSync(f, 'utf8')).workflows || []; } catch { return []; }
}
const WORKFLOWS = loadWorkflows();
const wfById = new Map(WORKFLOWS.map((w) => [w.id, w]));

// ── Tools ───────────────────────────────────────────────────────────────────
// Reusable output-schema fragments (so tools declare structured output, not just text).
const SKILL_ITEM = {
  type: 'object',
  properties: {
    name: { type: 'string', description: 'The skill id (use with get_skill).' },
    title: { type: 'string', description: 'Human-readable title.' },
    tier: { type: 'string', description: 'Maturity tier: production | stable | experimental.' },
    description: { type: 'string', description: 'One-line summary of what the skill does.' },
  },
  required: ['name', 'title', 'description'],
};
// All tools are read-only lookups over the bundled library — non-destructive, idempotent, closed-world.
const READONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const TOOLS = [
  {
    name: 'run_skill',
    title: 'Run a skill (no API key — uses YOUR model via MCP sampling)',
    description:
      'Execute a skill on the given input and return the finished artifact. Uses MCP sampling: the generation runs on the CLIENT\'s own model, so no API key is needed by this server. Falls back with a clear message if the client does not support sampling (use get_skill and apply it yourself instead).',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'The skill to run (from list_skills / search_skills).' },
        input: { type: 'string', description: 'The user\'s input for the skill — the raw notes, brief, or task.' },
        inputs: { type: 'object', description: 'Optional structured fields (from get_skill_inputs) — merged into the input as labeled lines.', additionalProperties: { type: 'string' } },
      },
      required: ['name'],
    },
    annotations: { title: 'Run a skill', readOnlyHint: true, openWorldHint: false },
  },
  {
    name: 'list_skills',
    title: 'List skills',
    description: 'List available professional skills (name, title, tier, one-line description). Optionally filter by maturity tier.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: { tier: { type: 'string', enum: ['production', 'stable', 'experimental'], description: 'Optional. Only return skills in this maturity tier.' } },
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
    description: 'Search skills by keyword across name, description, and body. Returns the best-matching skills, ranked.',
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
    description: 'Get the full instructions (the SKILL.md body) for one skill by name. Apply these instructions to the user\'s task.',
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
  {
    name: 'get_skill_inputs',
    title: 'Get a skill\'s typed input schema',
    description: 'Get the structured inputs a skill declares (parsed from its Required Inputs section) as a JSON-schema-shaped object — render a form or collect fields instead of sending a blob of free text. Pass the collected fields to run_skill as `inputs`.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: { name: { type: 'string', description: 'The exact skill id (from list_skills / search_skills).' } },
      required: ['name'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The skill id.' },
        schema: { type: 'object', description: 'JSON-schema object: one string property per declared input; required lists the non-optional ones.' },
      },
      required: ['name', 'schema'],
    },
    annotations: { title: 'Get skill input schema', ...READONLY },
  },
  {
    name: 'list_workflows',
    title: 'List workflow recipes',
    description: 'List workflow recipes — named chains that run several skills in sequence, passing each output forward (e.g. ship-a-feature, close-the-quarter). Use when a task spans multiple steps end to end.',
    inputSchema: { type: 'object', additionalProperties: false, properties: {} },
    outputSchema: {
      type: 'object',
      properties: {
        workflows: {
          type: 'array', description: 'Available workflow recipes.',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Recipe id (use with get_workflow).' },
              name: { type: 'string', description: 'Recipe name.' },
              lifecycle: { type: 'string', description: 'The lifecycle stages it spans.' },
              summary: { type: 'string', description: 'What the recipe accomplishes.' },
              skills: { type: 'array', items: { type: 'string' }, description: 'The ordered skill ids in the chain.' },
            },
            required: ['id', 'name', 'skills'],
          },
        },
      },
      required: ['workflows'],
    },
    annotations: { title: 'List workflow recipes', ...READONLY },
  },
  {
    name: 'get_workflow',
    title: 'Get a workflow recipe',
    description: 'Get one workflow recipe by id: the ordered list of skills to run and what each produces. Run each step in order with get_skill, carrying every output forward as context for the next.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: { id: { type: 'string', description: 'The workflow id, e.g. "ship-a-feature" (from list_workflows).' } },
      required: ['id'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Recipe id.' },
        name: { type: 'string', description: 'Recipe name.' },
        lifecycle: { type: 'string', description: 'The lifecycle stages it spans.' },
        summary: { type: 'string', description: 'What the recipe accomplishes.' },
        steps: {
          type: 'array', description: 'Ordered steps; run each with get_skill, carrying output forward.',
          items: {
            type: 'object',
            properties: {
              skill: { type: 'string', description: 'The skill id to run at this step.' },
              produces: { type: 'string', description: 'What this step produces.' },
              passes: { type: ['string', 'null'], description: 'What to carry forward to the next step.' },
            },
            required: ['skill'],
          },
        },
      },
      required: ['id', 'name', 'steps'],
    },
    annotations: { title: 'Get a workflow recipe', ...READONLY },
  },
];

// Each tool returns { text, structured }: human-readable text content (back-compat) plus a
// structured object matching the tool's outputSchema.
const skillItem = (s) => ({ name: s.name, title: s.title, tier: s.tier, description: s.description });

function runTool(name, args = {}) {
  if (name === 'list_skills') {
    const list = SKILLS.filter((s) => !args.tier || s.tier === args.tier);
    const text = `${list.length} skills:\n` + list.map((s) => `- ${s.name} [${s.tier}] — ${s.description}`).join('\n');
    return { text, structured: { count: list.length, skills: list.map(skillItem) } };
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
    const matches = scored.map(({ s }) => skillItem(s));
    const text = matches.length ? matches.map((s) => `- ${s.name} [${s.tier}] — ${s.description}`).join('\n') : `No skills matched "${args.query}".`;
    return { text, structured: { query: String(args.query || ''), matches } };
  }
  if (name === 'get_skill') {
    const s = byName.get(String(args.name || '').trim());
    if (!s) throw new Error(`Unknown skill "${args.name}". Use search_skills or list_skills to find one.`);
    return { text: s.body, structured: { name: s.name, title: s.title, instructions: s.body } };
  }
  if (name === 'get_skill_inputs') {
    const s2 = byName.get(String(args.name || '').trim());
    if (!s2) throw new Error(`Unknown skill: ${args.name}`);
    const inputs = skillInputs(s2);
    const schema = {
      type: 'object',
      properties: Object.fromEntries(inputs.map((i) => [i.arg, { type: 'string', description: i.label + (i.hint ? ' — ' + i.hint : '') }])),
      required: inputs.filter((i) => !i.optional).map((i) => i.arg),
    };
    const text = inputs.length
      ? `${s2.name} declares ${inputs.length} input(s):\n` + inputs.map((i) => `- ${i.arg}${i.optional ? ' (optional)' : ''}: ${i.label}${i.hint ? ' — ' + i.hint : ''}`).join('\n')
      : `${s2.name} declares no structured inputs — pass free text to run_skill.`;
    return { text, structured: { name: s2.name, schema } };
  }
  if (name === 'list_workflows') {
    const text = WORKFLOWS.length
      ? WORKFLOWS.map((w) => `- ${w.id} (${w.lifecycle}) — ${w.summary}\n    chain: ${w.steps.map((s) => s.skill).join(' → ')}`).join('\n')
      : 'No workflow recipes are available in this install.';
    return { text, structured: { workflows: WORKFLOWS.map((w) => ({ id: w.id, name: w.name, lifecycle: w.lifecycle, summary: w.summary, skills: w.steps.map((s) => s.skill) })) } };
  }
  if (name === 'get_workflow') {
    const w = wfById.get(String(args.id || '').trim());
    if (!w) throw new Error(`Unknown workflow "${args.id}". Use list_workflows to see available recipes.`);
    const steps = w.steps.map((s, i) => `${i + 1}. get_skill("${s.skill}") → produces ${s.produces}.${s.passes ? ` Pass forward: ${s.passes}.` : ''}`).join('\n');
    const text = `Workflow: ${w.name} (${w.lifecycle})\n${w.summary}\n\nRun these in order, carrying each output forward as context for the next:\n${steps}`;
    return { text, structured: { id: w.id, name: w.name, lifecycle: w.lifecycle, summary: w.summary, steps: w.steps.map((s) => ({ skill: s.skill, produces: s.produces, passes: s.passes ?? null })) } };
  }
  throw new Error(`Unknown tool: ${name}`);
}

// ── JSON-RPC plumbing ────────────────────────────────────────────────────────
function send(msg) { process.stdout.write(JSON.stringify(msg) + '\n'); }

// ── Server→client requests (MCP sampling) ───────────────────────────────────
// The server can ask the CLIENT's model to generate (sampling/createMessage) —
// that's how run_skill works with zero API key. Track our outgoing request ids
// and resolve them when the client's response arrives.
let clientCapabilities = {};
let outId = 0;
const pending = new Map();
function requestClient(method, params, timeoutMs = 180000) {
  const id = 'srv-' + (++outId);
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => { pending.delete(id); reject(new Error('client did not respond in time')); }, timeoutMs);
    pending.set(id, { resolve: (v) => { clearTimeout(timer); resolve(v); }, reject: (e) => { clearTimeout(timer); reject(e); } });
    send({ jsonrpc: '2.0', id, method, params });
  });
}

const RUN_SUFFIX =
  '\n\n---\nThe user has provided their input below. Execute this skill now and produce the ' +
  'complete output. Do not ask follow-up questions — work with what is given and note any reasonable assumptions.';
async function runSkillViaSampling(args) {
  const s = byName.get(String(args.name || '').trim());
  if (!s) throw new Error(`Unknown skill "${args.name}". Use search_skills or list_skills to find one.`);
  // Structured fields (from get_skill_inputs) compose into labeled lines; free
  // text rides along after. At least one of the two must carry content.
  if (args.inputs && typeof args.inputs === 'object') {
    const inputs = skillInputs(s);
    const lines = inputs.filter((i) => args.inputs[i.arg] != null && args.inputs[i.arg] !== '')
      .map((i) => `${i.label}: ${args.inputs[i.arg]}`);
    args = { ...args, input: [lines.join('\n'), String(args.input || '')].filter(Boolean).join('\n\n') };
  }
  if (!String(args.input || '').trim()) throw new Error('Provide `input` (free text) and/or `inputs` (structured fields from get_skill_inputs).');
  if (!clientCapabilities.sampling) {
    throw new Error(
      'This MCP client does not support sampling, so the server cannot run the skill for you. ' +
      `Instead: call get_skill("${s.name}") and apply its instructions to the input yourself.`);
  }
  const result = await requestClient('sampling/createMessage', {
    messages: [{ role: 'user', content: { type: 'text', text: String(args.input || '') } }],
    systemPrompt: s.body + RUN_SUFFIX,
    includeContext: 'none',
    maxTokens: 8192,
    modelPreferences: { intelligencePriority: 0.8, hints: [{ name: 'claude' }] },
  });
  const text = result && result.content && result.content.type === 'text' ? result.content.text : JSON.stringify(result && result.content || '');
  return { text, structured: { name: s.name, model: (result && result.model) || null, output: text } };
}
function reply(id, result) { send({ jsonrpc: '2.0', id, result }); }
function fail(id, code, message) { send({ jsonrpc: '2.0', id, error: { code, message } }); }

function handle(msg) {
  const { id, method, params } = msg;
  const isRequest = id !== undefined && id !== null;

  // A message with no method is the client's RESPONSE to one of our requests.
  if (!method && isRequest && pending.has(id)) {
    const p = pending.get(id); pending.delete(id);
    if (msg.error) p.reject(new Error(msg.error.message || 'client error'));
    else p.resolve(msg.result);
    return;
  }

  switch (method) {
    case 'initialize':
      clientCapabilities = (params && params.capabilities) || {};
      return reply(id, {
        protocolVersion: (params && params.protocolVersion) || '2024-11-05',
        capabilities: { tools: {}, prompts: {}, resources: {} },
        serverInfo: {
          name: SERVER_NAME,
          title: 'PM Skills — Professional Agent Skills',
          version: VERSION,
          websiteUrl: 'https://mohitagw15856.github.io/pm-claude-skills/',
          icons: [{ src: 'https://raw.githubusercontent.com/mohitagw15856/pm-claude-skills/main/icon.svg', mimeType: 'image/svg+xml', sizes: ['any'] }],
        },
        instructions:
          'A library of professional Agent Skills (PRDs, launches, postmortems, compliance, growth, and more) plus multi-skill workflow recipes. ' +
          'To answer a professional task: call search_skills (or list_skills) to find the right skill, then get_skill to fetch its instructions and apply them to the user\'s input. ' +
          'For multi-step work that spans discovery → decision → build → ship, use list_workflows / get_workflow and run the chained skills in order, carrying each output forward.',
      });
    case 'tools/list':
      return reply(id, { tools: TOOLS });

    // Each skill is also exposed as an MCP prompt (so it appears in slash-command /
    // prompt pickers) and as a readable resource (skill://<name>).
    case 'prompts/list':
      return reply(id, {
        prompts: SKILLS.map((s) => ({
          name: s.name,
          title: s.title,
          description: s.description,
          arguments: (() => {
            const inputs = skillInputs(s);
            return inputs.length
              ? inputs.map((i) => ({ name: i.arg, description: i.label + (i.hint ? ' — ' + i.hint : ''), required: !i.optional }))
              : [{ name: 'task', description: 'The task or input to apply this skill to.', required: false }];
          })(),
        })),
      });
    case 'prompts/get': {
      const s = byName.get(params && params.name);
      if (!s) return fail(id, -32602, `Unknown prompt: ${params && params.name}`);
      const supplied = (params && params.arguments) || {};
      const inputs = skillInputs(s);
      const lines = inputs
        .filter((i) => supplied[i.arg] != null && supplied[i.arg] !== '')
        .map((i) => `${i.label}: ${supplied[i.arg]}`);
      const task = supplied.task || lines.join('\n');
      const text = s.body + (task ? `\n\n---\nApply this skill now to the following:\n${task}` : '');
      return reply(id, { description: s.description, messages: [{ role: 'user', content: { type: 'text', text } }] });
    }
    case 'resources/list':
      return reply(id, {
        resources: SKILLS.map((s) => ({ uri: `skill://${s.name}`, name: s.title, description: s.description, mimeType: 'text/markdown' })),
      });
    case 'resources/read': {
      const uri = (params && params.uri) || '';
      const s = byName.get(uri.replace(/^skill:\/\//, ''));
      if (!s) return fail(id, -32602, `Unknown resource: ${uri}`);
      return reply(id, { contents: [{ uri, mimeType: 'text/markdown', text: `# ${s.title}\n\n${s.body}` }] });
    }
    case 'tools/call': {
      const toolName = params && params.name;
      if (toolName === 'run_skill') {
        runSkillViaSampling((params && params.arguments) || {})
          .then(({ text, structured }) => reply(id, { content: [{ type: 'text', text }], structuredContent: structured }))
          .catch((e) => reply(id, { content: [{ type: 'text', text: `Error: ${e.message}` }], isError: true }));
        return;
      }
      try {
        const { text, structured } = runTool(toolName, (params && params.arguments) || {});
        return reply(id, { content: [{ type: 'text', text }], structuredContent: structured });
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

process.stderr.write(`[${SERVER_NAME}] MCP server ready — ${SKILLS.length} skills, ${WORKFLOWS.length} workflow recipes, ${TOOLS.length} tools.\n`);
process.stderr.write(`[${SERVER_NAME}] ⭐ Star the repo: https://github.com/mohitagw15856/pm-claude-skills\n`);
const rl = createInterface({ input: process.stdin });
rl.on('line', (line) => {
  const s = line.trim();
  if (!s) return;
  let msg;
  try { msg = JSON.parse(s); } catch { return; } // ignore non-JSON lines
  try { handle(msg); } catch (e) { process.stderr.write(`[${SERVER_NAME}] handler error: ${e.message}\n`); }
});
