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
      // docs/DEPRECATION.md promises a retired name keeps resolving here while
      // dropping out of the catalogue. That was documented but never carried
      // through to this server, so retired skills were still being listed.
      deprecated: meta.deprecated || null,
      supersededBy: meta.supersededBy || null,
      body: body.trim(),
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

const SKILLS = loadSkills();
// SKILLS resolves any name ever published; LIVE is what browse and search show.
const LIVE = SKILLS.filter((s) => !s.deprecated);
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
    name: 'check_contrast',
    title: 'Check colour contrast',
    description:
      'Compute the real WCAG 2.1 contrast ratio and APCA lightness contrast for a foreground/background pair, and return the nearest passing colour in the same hue. Use whenever a skill needs a contrast number — accessibility-audit, design-system-audit, design-handoff-brief, brand-guidelines, any Figma review. A ratio cannot be judged by eye: #777777 on white is 4.478 (fails AA) and #767676 is 4.542 (passes), and no amount of looking separates those. Deterministic arithmetic — no model call, no network.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        foreground: { type: 'string', description: 'The text colour, as a six-digit hex, e.g. "#8ab4f8".' },
        background: { type: 'string', description: 'The colour it sits on, as a six-digit hex, e.g. "#ffffff".' },
        level: { type: 'string', enum: ['AA', 'AA-large', 'AAA'], description: 'The bar to clear. Defaults to AA (4.5:1), the legal standard in most jurisdictions.' },
      },
      required: ['foreground', 'background'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        ratio: { type: 'number', description: 'WCAG 2.1 contrast ratio, 1 to 21.' },
        passes: { type: 'boolean', description: 'Whether it clears the requested level.' },
        grade: { type: 'string', description: 'fail / aa-large / aa / aaa.' },
        apca: { type: 'number', description: 'APCA Lc, signed. Positive is dark text on light.' },
        apcaUse: { type: 'string', description: 'What APCA says this contrast is good enough for.' },
        nearestPassing: { type: 'string', description: 'A close colour to the foreground that clears the level, holding the hue roughly steady. Null if it already passes. For an exact perceptual answer on saturated colours, run `npx notugly fix <fg> <bg>`, which walks OKLCh lightness instead of RGB.' },
        says: { type: 'string', description: 'A one-line summary suitable for pasting into an audit table.' },
      },
      required: ['ratio', 'passes', 'grade', 'says'],
    },
    annotations: { title: 'Check colour contrast', ...READONLY },
  },
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
    name: 'disambiguate_skill',
    title: 'Choose between similar skills',
    description: 'When two or more skills look like they do the same job, this says which one to use and why. Call it after search_skills returns near-identical candidates, or before assuming a skill is missing — the library has 1000+ skills and the same job is often named differently than you expect.',
    inputSchema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: 'A skill id you are considering, e.g. "threat-model". Returns its confusable neighbours, whether it has been retired, and the family of skills sharing its first word.' },
      },
      required: ['name'],
    },
    outputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'The skill asked about.' },
        retired: { type: ['object', 'null'], description: 'Set when this name is retired; names the successor to use instead.' },
        confusable: { type: 'array', description: 'Skills that look like this one, each with the rule for choosing between them.', items: { type: 'object' } },
        family: { type: 'array', description: 'Other skills sharing the same first word — where a guessed name usually lands.', items: { type: 'object' } },
      },
      required: ['name', 'confusable'],
    },
    annotations: { title: 'Choose between similar skills', ...READONLY },
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

// ── EXPERIMENTAL: MCP Apps (SEP-1300 draft) — an interactive skill picker the
// host may render as an embedded UI. Off by default (MCP_APPS=1 enables);
// the draft is moving, so this ships labeled experimental and additive-only.
const MCP_APPS = process.env.MCP_APPS === '1';
const PICKER_HTML = () => `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
body{font-family:system-ui;background:#0d1117;color:#e6edf3;margin:0;padding:14px}
input,select,textarea{width:100%;box-sizing:border-box;background:#161b22;color:#e6edf3;border:1px solid #30363d;border-radius:8px;padding:8px;margin:4px 0}
button{background:#8a5cf5;color:#fff;border:0;border-radius:8px;padding:9px 16px;font-weight:700;cursor:pointer;margin-top:8px}
label{font-size:12px;color:#8b949e}</style></head><body>
<h3 style="margin:0 0 8px">Run a skill</h3>
<select id="sk">${SKILLS.slice().sort((a, b) => a.name.localeCompare(b.name)).map((s) => `<option value="${s.name}">${s.title}</option>`).join('')}</select>
<div id="form"></div>
<button id="go">Run</button>
<script>
const INPUTS=${JSON.stringify(Object.fromEntries(SKILLS.map((s) => [s.name, skillInputs(s)])))};
const sk=document.getElementById('sk'),form=document.getElementById('form');
function draw(){const list=INPUTS[sk.value]||[];form.innerHTML=list.map((i,n)=>'<label>'+i.label+(i.optional?' (optional)':'')+'</label>'+(i.long?'<textarea':'<input')+' data-arg="'+i.arg+'" id="f'+n+'"'+(i.long?'></textarea>':' />'))
  .join('')||'<label>Your input</label><textarea id="f0" data-arg="task"></textarea>';}
sk.addEventListener('change',draw);draw();
document.getElementById('go').addEventListener('click',()=>{
  const args={};form.querySelectorAll('[data-arg]').forEach((f)=>{if(f.value)args[f.dataset.arg]=f.value;});
  // MCP Apps draft: the embedded app asks the host to call a tool on its behalf.
  window.parent.postMessage({jsonrpc:'2.0',id:Date.now(),method:'tools/call',params:{name:'run_skill',arguments:{name:sk.value,inputs:args}}},'*');
});
</script></body></html>`;

// Each tool returns { text, structured }: human-readable text content (back-compat) plus a
// structured object matching the tool's outputSchema.
const skillItem = (s) => ({ name: s.name, title: s.title, tier: s.tier, description: s.description });


// --- contrast ----------------------------------------------------------------
//
// Inlined rather than imported. This server is the thing people run with npx and
// it has no dependencies; adding one for forty lines of arithmetic would be a
// poor trade. The maths is WCAG 2.1 relative luminance and APCA-W3 0.1.9 — the
// same implementation as notugly, which is where the fuller toolkit lives
// (npx notugly fix / onepager / vision) if a skill needs more than one pair.

const HEX = (h) => {
  const m = String(h).trim().replace(/^#/, '');
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m.slice(0, 6);
  if (!/^[0-9a-f]{6}$/i.test(full)) throw new Error(`"${h}" is not a six-digit hex colour.`);
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
};

const luminance = (hex) => {
  const [r, g, b] = HEX(hex).map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratioOf = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// APCA-W3 0.1.9. Asymmetric on purpose: dark-on-light and light-on-dark are not
// equally readable, which WCAG 2 does not model.
const apcaOf = (text, bg) => {
  const Y = (hex) => {
    const [r, g, b] = HEX(hex);
    return 0.2126729 * (r / 255) ** 2.4 + 0.7151522 * (g / 255) ** 2.4 + 0.072175 * (b / 255) ** 2.4;
  };
  const clamp = (y) => (y < 0.022 ? y + (0.022 - y) ** 1.414 : y);
  const t = clamp(Y(text));
  const b = clamp(Y(bg));
  if (Math.abs(b - t) < 0.0005) return 0;
  const sapc = b > t ? (b ** 0.56 - t ** 0.57) * 1.14 : (b ** 0.65 - t ** 0.62) * 1.14;
  const out = b > t ? (sapc < 0.1 ? 0 : sapc - 0.027) : sapc > -0.1 ? 0 : sapc + 0.027;
  return +(out * 100).toFixed(2);
};

const APCA_USE = [
  [90, 'anything, including thin body text'],
  [75, 'body text at normal weight'],
  [60, 'body text at 16px or larger'],
  [45, 'large or bold text only'],
  [30, 'headlines and non-essential text'],
  [15, 'decorative only — do not put words here'],
  [0, 'invisible'],
];

function checkContrast(args) {
  const fg = String(args.foreground || '');
  const bg = String(args.background || '');
  const target = { AA: 4.5, 'AA-large': 3, AAA: 7 }[args.level] ?? 4.5;

  const ratio = +ratioOf(fg, bg).toFixed(2);
  const passes = ratio >= target;
  const grade = ratio >= 7 ? 'aaa' : ratio >= 4.5 ? 'aa' : ratio >= 3 ? 'aa-large' : 'fail';
  const lc = apcaOf(fg, bg);
  const apcaUse = (APCA_USE.find(([min]) => Math.abs(lc) >= min) || [0, 'invisible'])[1];

  // Walk all three channels outward together until it clears. That holds hue
  // roughly steady and is within a fraction of a degree of the proper OKLCh
  // answer for mid-chroma colours — but near the gamut edge a channel clips and
  // the hue drifts, so the output points at `npx notugly fix` for that case
  // rather than quietly being slightly wrong.
  //
  // Both directions, because the obvious one is wrong more often than you would
  // think — a mid-grey on a mid-blue is sometimes cheaper to fix by lightening.
  let nearestPassing = null;
  if (!passes) {
    const [r, g, b] = HEX(fg);
    for (let step = 1; step <= 255 && !nearestPassing; step++) {
      for (const dir of [-1, 1]) {
        const shift = (v) => Math.max(0, Math.min(255, Math.round(v + dir * step)));
        const cand = '#' + [shift(r), shift(g), shift(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
        if (ratioOf(cand, bg) >= target) { nearestPassing = cand; break; }
      }
    }
  }

  const says = passes
    ? `${fg} on ${bg} is ${ratio}:1 — passes ${args.level || 'AA'} (${grade.toUpperCase()}). APCA Lc ${lc}, good for ${apcaUse}.`
    : `${fg} on ${bg} is ${ratio}:1 — needs ${target}. ${nearestPassing ? `${nearestPassing} clears it.` : 'Nothing at this hue clears it; the background is the problem.'}`;

  return {
    text: says,
    structured: { ratio, passes, grade, apca: lc, apcaUse, nearestPassing, says },
  };
}

// Reviewed look-alike pairs and their tie-break reasons, from the same file
// that gates duplicate detection in CI. Read lazily so a missing file degrades
// to "no guidance" rather than breaking the server.
let DUPE_PAIRS = null;
function dupePairs() {
  if (DUPE_PAIRS) return DUPE_PAIRS;
  try {
    DUPE_PAIRS = JSON.parse(readFileSync(join(PKG_ROOT, 'skill-dupes-allow.json'), 'utf8')).pairs || [];
  } catch { DUPE_PAIRS = []; }
  return DUPE_PAIRS;
}

function runTool(name, args = {}) {
  if (name === 'check_contrast') return checkContrast(args);
  if (name === 'disambiguate_skill') {
    const want = String(args.name || '').trim();
    if (!want) throw new Error('name is required');
    const self = SKILLS.find((s) => s.name === want);

    const confusable = dupePairs()
      .filter((p) => p.a === want || p.b === want)
      .map((p) => {
        const other = p.a === want ? p.b : p.a;
        const o = SKILLS.find((s) => s.name === other);
        return { other, title: o ? o.title : null, howToChoose: p.reason };
      });

    const retired = self && self.deprecated
      ? { since: self.deprecated, useInstead: self.supersededBy || null }
      : null;

    const head = want.split('-')[0];
    const family = head.length < 3 ? [] : SKILLS
      .filter((s) => s.name !== want && s.name.split('-')[0] === head && !s.deprecated)
      .map((s) => ({ name: s.name, title: s.title, summary: (s.description || '').split(/(?<=\.)\s/)[0] }));

    const lines = [];
    if (!self) lines.push(`No skill named "${want}". It may have been renamed — check the family below, or call search_skills.`);
    if (retired) lines.push(`"${want}" is retired (${retired.since})${retired.useInstead ? `. Use "${retired.useInstead}" instead.` : ' and is no longer maintained.'}`);
    if (confusable.length) {
      lines.push(`${confusable.length} skill(s) are commonly confused with "${want}":`);
      for (const c of confusable) lines.push(`- ${c.other} — ${c.howToChoose}`);
    } else if (self && !retired) {
      lines.push(`No skill is commonly confused with "${want}".`);
    }
    if (family.length) {
      lines.push('', `Others in the "${head}-*" family:`);
      for (const f of family.slice(0, 15)) lines.push(`- ${f.name} — ${f.summary}`);
    }
    return { text: lines.join('\n'), structured: { name: want, retired, confusable, family } };
  }
  if (name === 'list_skills') {
    const list = LIVE.filter((s) => !args.tier || s.tier === args.tier);
    const text = `${list.length} skills:\n` + list.map((s) => `- ${s.name} [${s.tier}] — ${s.description}`).join('\n');
    return { text, structured: { count: list.length, skills: list.map(skillItem) } };
  }
  if (name === 'search_skills') {
    const q = String(args.query || '').toLowerCase().trim();
    if (!q) throw new Error('query is required');
    const terms = q.split(/\s+/);
    const scored = LIVE.map((s) => {
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
    // A retired name still returns its instructions — that is the contract —
    // but the caller is told, once, where the maintained version lives.
    const notice = s.deprecated
      ? `> This skill was retired on ${s.deprecated}${s.supersededBy ? ` and is superseded by "${s.supersededBy}"` : ''}. It still runs; prefer the successor for new work.\n\n`
      : '';
    return {
      text: notice + s.body,
      structured: {
        name: s.name, title: s.title, instructions: s.body,
        ...(s.deprecated ? { deprecated: s.deprecated, supersededBy: s.supersededBy } : {}),
      },
    };
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
        resources: [
          ...(MCP_APPS ? [{ uri: 'ui://pm-skills/picker', name: 'Skill picker (experimental MCP App)', description: 'Interactive skill picker + typed input form. Experimental: SEP-1300 draft.', mimeType: 'text/html' }] : []),
          ...SKILLS.map((s) => ({ uri: `skill://${s.name}`, name: s.title, description: s.description, mimeType: 'text/markdown' })),
        ],
      });
    case 'resources/read': {
      const uri = (params && params.uri) || '';
      if (MCP_APPS && uri === 'ui://pm-skills/picker')
        return reply(id, { contents: [{ uri, mimeType: 'text/html', text: PICKER_HTML() }] });
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
