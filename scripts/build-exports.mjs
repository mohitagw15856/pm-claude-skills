#!/usr/bin/env node
// Generates per-platform skill exports from the canonical skills/ directory.
//
// The body of each skills/<name>/SKILL.md is the single source of truth. This
// script renders that body into platform-specific artifacts so the same
// framework can be used on ChatGPT, Claude, and (in future) other tools without
// maintaining the content more than once.
//
// Usage:
//   node scripts/build-exports.mjs                 # (re)generate all platforms
//   node scripts/build-exports.mjs --platform chatgpt
//   node scripts/build-exports.mjs --check         # CI: fail if exports are stale
//
// No dependencies.
import {
  readFileSync, readdirSync, writeFileSync, existsSync, statSync,
  mkdirSync, rmSync,
} from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const pluginsDir = join(root, 'plugins');
const exportsDir = join(root, 'exports');
const VERSION = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
const SITE = 'https://mohitagw15856.github.io/pm-claude-skills';

// ── Provenance ──────────────────────────────────────────────────────────────
// Every exported file says where it came from: library version, source path,
// the SHA-256 of the source SKILL.md (the same hash /.well-known/agent-skills.json
// publishes, so a copy can be verified) and the licence. Markdown dialects get
// an HTML comment the tools ignore; JSON dialects embed the same fields.
const provenance = (s) => ({
  library: 'pm-claude-skills', version: VERSION, source: `skills/${s.name}/SKILL.md`, sha256: s.sha256,
  licence: 'MIT', verify: `${SITE}/.well-known/agent-skills.json`,
});
const provenanceFooter = (s) =>
  `\n<!-- pm-claude-skills v${VERSION} | skill: ${s.name} | source: skills/${s.name}/SKILL.md | sha256: ${s.sha256} | licence: MIT\n` +
  `     verify: this hash is published at ${SITE}/.well-known/agent-skills.json -->\n`;

// ── Platform registry ───────────────────────────────────────────────────────
// To add a new platform, add an entry here. `render` gets
// { name, description, title, body, bundle } and returns the file contents.
// `file` is a fixed filename, or a function (skill) => filename for per-skill names.
const PLATFORMS = {
  chatgpt: {
    label: 'ChatGPT — Custom GPT instructions',
    dir: 'exports/chatgpt',
    file: 'SYSTEM_PROMPT.md',
    groupByBundle: true,
    // A Claude skill body is already a complete system prompt. ChatGPT keeps the
    // "Description" field separate, so we emit the body only (no frontmatter).
    render: ({ body }) => `${body.trim()}\n`,
  },
  gemini: {
    label: 'Google Gemini — Gem instructions',
    dir: 'exports/gemini',
    file: 'GEM_INSTRUCTIONS.md',
    groupByBundle: true,
    // A Gemini Gem takes a single "Instructions" field. The skill body maps to
    // it directly; we add a one-line role primer from the description so the Gem
    // has framing even before the user's first message.
    render: ({ description, body }) =>
      `You are a specialised assistant. ${description}\n\nFollow these instructions:\n\n${body.trim()}\n`,
  },
  cursor: {
    label: 'Cursor — project rule (.mdc)',
    dir: 'exports/cursor',
    file: (s) => `${s.name}.mdc`,
    groupByBundle: true,
    // Cursor reads `.cursor/rules/*.mdc`. Each rule is YAML frontmatter + the body.
    // alwaysApply:false keeps it an opt-in rule the agent pulls in by description.
    render: ({ description, body }) =>
      `---\ndescription: ${JSON.stringify(description)}\nglobs:\nalwaysApply: false\n---\n\n${body.trim()}\n`,
  },
  windsurf: {
    label: 'Windsurf — workspace rule (.md)',
    dir: 'exports/windsurf',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Windsurf reads `.windsurf/rules/*.md`. trigger:model_decision = the agent
    // pulls the rule in when the description matches the task.
    render: ({ description, body }) =>
      `---\ntrigger: model_decision\ndescription: ${JSON.stringify(description)}\n---\n\n${body.trim()}\n`,
  },
  copilot: {
    label: 'GitHub Copilot — custom instructions (.instructions.md)',
    dir: 'exports/copilot',
    file: (s) => `${s.name}.instructions.md`,
    groupByBundle: true,
    // VS Code and github.com Copilot read `.github/instructions/*.instructions.md`.
    // `applyTo` scopes a file; "**" plus a description lets Copilot pick the
    // instruction by relevance. Copilot's coding agent also reads native SKILL.md
    // from `.github/skills/`, which `npx pm-claude-skills add --agent copilot` installs.
    render: ({ description, body }) =>
      `---\napplyTo: "**"\ndescription: ${JSON.stringify(description)}\n---\n\n${body.trim()}\n`,
  },
  aider: {
    label: 'Aider — conventions file (.md)',
    dir: 'exports/aider',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Aider has no auto-discovery dir — you load a file into context with
    // `aider --read <file>`. So this is the plain body, ready to --read.
    render: ({ body }) => `${body.trim()}\n`,
  },
  cline: {
    label: 'Cline — .clinerules/ rule (.md)',
    dir: 'exports/cline',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Drop into `.clinerules/` in your project; Cline loads them as rules.
    render: ({ body }) => `${body.trim()}\n`,
  },
  continue: {
    label: 'Continue.dev — rule (.md)',
    dir: 'exports/continue',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Continue reads markdown rules with optional frontmatter (name + description).
    render: ({ description, body }) =>
      `---\nname: ${JSON.stringify(description.slice(0, 60))}\ndescription: ${JSON.stringify(description)}\n---\n\n${body.trim()}\n`,
  },
  zed: {
    label: 'Zed — .rules file (.md)',
    dir: 'exports/zed',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Zed reads a project `.rules` file; paste/append the skill you want.
    render: ({ body }) => `${body.trim()}\n`,
  },
  roo: {
    label: 'Roo Code — .roo/rules/ rule (.md)',
    dir: 'exports/roo',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Drop into `.roo/rules/` in your project; Roo Code loads them as rules.
    render: ({ body }) => `${body.trim()}\n`,
  },
  kilocode: {
    label: 'Kilo Code — .kilocode/rules/ rule (.md)',
    dir: 'exports/kilocode',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Drop into `.kilocode/rules/` in your project; Kilo Code loads them as rules.
    render: ({ body }) => `${body.trim()}\n`,
  },
  obsidian: {
    label: 'Obsidian — vault skill note (AI-plugin prompt)',
    dir: 'exports/obsidian',
    file: (s) => `${s.name}.md`,
    groupByBundle: true,
    // Drop these into your vault. Each note works three ways: as a custom prompt
    // for the Copilot-for-Obsidian / Text Generator plugins, as a Templater
    // template, or as a plain reference note. The frontmatter maps to Obsidian
    // properties; the footer tells the model to apply the skill to your current
    // note or selection (swap `{{selection}}` for your plugin's variable).
    render: ({ name, title, description, body }) =>
      `---\n` +
      `aliases: [${JSON.stringify(title)}]\n` +
      `tags: [pm-skills, skill]\n` +
      `skill: ${name}\n` +
      `description: ${JSON.stringify(description)}\n` +
      `---\n\n` +
      `${body.trim()}\n\n` +
      `---\n` +
      `<!-- Run as an AI-plugin prompt. {{selection}} is the Text Generator / Templater\n` +
      `     variable for the highlighted text; replace it with your plugin's equivalent\n` +
      `     (e.g. {} in Copilot for Obsidian), or paste your input there manually. -->\n` +
      `Apply the skill above to the following input:\n\n{{selection}}\n`,
  },
  openclaw: {
    label: 'OpenClaw — native SKILL.md with metadata block',
    dir: 'exports/openclaw',
    file: 'SKILL.md',
    groupByBundle: false,
    // OpenClaw reads the same SKILL.md standard (skills without a metadata block
    // are always eligible), so this export only *dresses* the skill: a top-level
    // homepage (shown in the macOS Skills UI) and a metadata.openclaw block with
    // a bundle emoji, so the library looks native rather than merely functional.
    // The flat <skill>/SKILL.md layout is exactly what `clawhub sync` publishes.
    // Sections that assume the library's local layout are stripped — a standalone
    // package must not reference sibling skills (../professional-brain) or
    // references/templates files that don't ship with it; ClawHub's reviewer
    // rightly flags instructions that point at phantom files.
    render: ({ name, description, body, bundle }) =>
      `---\n` +
      `name: ${name}\n` +
      `description: ${JSON.stringify(description)}\n` +
      `homepage: https://mohitagw15856.github.io/pm-claude-skills/skill/${name}.html\n` +
      `metadata:\n` +
      `  {\n` +
      `    "openclaw": { "emoji": ${JSON.stringify(BUNDLE_EMOJI[bundle] || '🧠')} }\n` +
      `  }\n` +
      `---\n\n` +
      `${stripLocalLayoutSections(body).trim()}\n`,
  },
  'gemini-cli': {
    label: 'Gemini CLI — agent skill (.gemini/skills/<name>/SKILL.md)',
    dir: 'exports/gemini-cli',
    file: 'SKILL.md',
    groupByBundle: true,
    // Gemini CLI discovers Agent Skills (the same SKILL.md standard) from
    // .gemini/skills/<name>/ in a project or ~/.gemini/skills/ for the user. The
    // frontmatter keeps only the routing fields; library-local sections are
    // stripped as for every standalone export.
    render: ({ name, description, body }) =>
      `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\n---\n\n${stripLocalLayoutSections(body).trim()}\n`,
    usage: [
      'Copy a skill folder into `.gemini/skills/` in your project (or `~/.gemini/skills/` for every project),',
      'then run `gemini` and describe the task; the CLI picks the skill by its description. Or install the set:',
      '`npx pm-claude-skills add --agent gemini`.',
    ].join('\n'),
  },
  'openai-agents': {
    label: 'OpenAI Agents SDK — agent definition (agent.json)',
    dir: 'exports/openai-agents',
    file: 'agent.json',
    groupByBundle: true,
    footer: false,
    // One Agent(...) per skill, as data rather than code so it works from Python
    // and TypeScript alike: `name` and `instructions` map straight onto the SDK's
    // Agent constructor, `handoff_description` lets a triage agent route to it.
    render: (s) => JSON.stringify({
      name: s.title,
      handoff_description: s.description,
      instructions: stripLocalLayoutSections(s.body).trim(),
      metadata: { skill: s.name, bundle: s.bundle, ...provenance(s) },
    }, null, 2) + '\n',
    usage: [
      '```python',
      'import json',
      'from agents import Agent, Runner',
      '',
      'spec = json.load(open("pm-essentials/prd-template/agent.json"))',
      'prd = Agent(name=spec["name"], instructions=spec["instructions"], handoff_description=spec["handoff_description"])',
      'print(Runner.run_sync(prd, "A referral programme for B2B users").final_output)',
      '```',
      '',
      '```ts',
      'import { Agent, run } from "@openai/agents";',
      'import spec from "./pm-essentials/prd-template/agent.json" with { type: "json" };',
      '',
      'const prd = new Agent({ name: spec.name, instructions: spec.instructions, handoffDescription: spec.handoff_description });',
      'console.log((await run(prd, "A referral programme for B2B users")).finalOutput);',
      '```',
      '',
      'Several specs can be handed to one triage agent as `handoffs`; the `handoff_description` is what it routes on.',
    ].join('\n'),
  },
};

// Drop sections that only make sense inside this repo's layout (sibling-skill
// Brain integration, references/ and templates/ pointers) from standalone
// single-file exports. A section runs from its ## heading to the next ##.
function stripLocalLayoutSections(body) {
  return body.replace(
    /^## (Reads from \/ Writes to the Brain|Deeper Materials)\n[\s\S]*?(?=^## |(?![\s\S]))/gm,
    ''
  );
}

// Bundle → emoji for the OpenClaw metadata block (macOS Skills UI). Unlisted
// bundles fall back to 🧠. Purely cosmetic — never gates eligibility.
const BUNDLE_EMOJI = {
  'pm-construction': '🏗', 'pm-hardware': '🔧', 'pm-supplychain': '📦', 'pm-climate': '🌍',
  'pm-insurance': '🛡', 'pm-banking': '🏦', 'pm-security': '🔐', 'pm-warroom': '⚔️',
  'pm-engineering': '⚙️', 'pm-legal': '⚖️', 'pm-finance': '💰', 'pm-money': '💵',
  'pm-hr': '🧑‍💼', 'pm-sales': '🤝', 'pm-gtm': '🚀', 'pm-pmm': '📣', 'pm-growth': '📈',
  'pm-analytics': '📊', 'pm-data': '📊', 'pm-dataeng': '🛠', 'pm-design': '🎨',
  'pm-figma': '🎨', 'pm-uxwriting': '✍️', 'pm-writers': '✍️', 'pm-copy': '✍️',
  'pm-social': '📱', 'pm-creator': '🎬', 'pm-devrel': '🗣', 'pm-education': '🎓',
  'pm-health': '🩺', 'pm-nonprofit': '💛', 'pm-realestate': '🏠', 'pm-ecommerce': '🛒',
  'pm-support': '🎧', 'pm-cs': '🤗', 'pm-consulting': '💼', 'pm-founders': '🌱',
  'pm-career': '🧭', 'pm-jobsearch': '🔎', 'pm-personal': '👤', 'pm-lifeadmin': '🗓',
  'pm-crisis': '🚨', 'pm-compliance': '📋', 'pm-gov': '🏛', 'pm-research': '🔬',
  'pm-ai': '🤖', 'pm-aiwork': '🤖', 'pm-agentnative': '🦾', 'pm-agentops': '🦾',
  'pm-autopilot': '🛫', 'pm-calculators': '🧮', 'pm-accounting': '🧾', 'pm-recruiting': '🧲',
  'pm-method': '📐', 'pm-vision': '👁', 'pm-craft': '🪚', 'pm-qa': '🧪', 'pm-visuals': '🖼',
  'pm-localization': '🌐', 'pm-documents': '📄', 'pm-comms': '📨', 'pm-essentials': '⭐',
  'pm-discovery': '🔍', 'pm-planning': '🗺', 'pm-delivery': '🚚', 'pm-strategy': '♟',
  'pm-advanced': '🎛', 'pm-rituals': '🔁', 'pm-people': '👥', 'pm-business': '🏢',
  'pm-operations': '🔩', 'pm-cross': '🔗',
};

// ── Helpers (shared shape with web/build-skills.mjs) ────────────────────────
function parseFrontmatter(text) {
  // Tolerate CRLF so skills authored on Windows don't silently export with
  // an empty description (skillcheck.mjs already tolerates it).
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      meta[kv[1]] = v;
    }
  }
  return { meta, body: m[2] };
}

function titleFromName(name) {
  return name.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// skill name -> plugin bundle (for grouping)
function buildBundleMap() {
  const map = {};
  if (!existsSync(pluginsDir)) return map;
  for (const plugin of readdirSync(pluginsDir)) {
    const pSkills = join(pluginsDir, plugin, 'skills');
    if (existsSync(pSkills) && statSync(pSkills).isDirectory()) {
      for (const s of readdirSync(pSkills)) map[s] = plugin;
    }
  }
  return map;
}

function loadSkills() {
  const bundleMap = buildBundleMap();
  const skills = [];
  for (const name of readdirSync(skillsDir)) {
    const file = join(skillsDir, name, 'SKILL.md');
    if (!existsSync(file)) continue;
    const raw = readFileSync(file);
    const { meta, body } = parseFrontmatter(raw.toString('utf8'));
    const titleHeading = body.match(/^#\s+(.+)$/m);
    skills.push({
      name: meta.name || name,
      sha256: createHash('sha256').update(raw).digest('hex'),
      title: (titleHeading ? titleHeading[1] : titleFromName(meta.name || name)).replace(/\s+Skill$/i, ''),
      description: meta.description || '',
      body,
      bundle: bundleMap[name] || 'other',
      // Retired skills are still exported (docs/DEPRECATION.md: no install breaks
      // mid-version) but are not counted in the advertised number.
      deprecated: !!meta.deprecated,
    });
  }
  skills.sort((a, b) => a.name.localeCompare(b.name));
  return skills;
}

// Resolve a platform's output filename for a skill (string or function).
const fileNameFor = (platform, skill) =>
  typeof platform.file === 'function' ? platform.file(skill) : platform.file;

// Build the full path->content map a platform should produce.
function planPlatform(key, platform, skills) {
  const files = new Map();
  const base = join(root, platform.dir);
  for (const skill of skills) {
    const parts = [base];
    if (platform.groupByBundle) parts.push(skill.bundle);
    parts.push(skill.name, fileNameFor(platform, skill));
    files.set(join(...parts), platform.render(skill) + (platform.footer === false ? '' : provenanceFooter(skill)));
  }
  // Generated index for the platform. Derive the extension from an actual
  // rendered filename so the hint matches what each platform emits (only
  // `cursor` uses `.mdc`; every other function-based platform uses `.md`).
  let fileHint;
  if (typeof platform.file === 'function') {
    const sample = skills[0] ? platform.file(skills[0]) : '';
    const ext = sample.slice(sample.lastIndexOf('.'));
    fileHint = ext ? `${ext} rule` : 'rule';
  } else {
    fileHint = platform.file;
  }
  const index = [
    `# ${platform.label}`,
    '',
    `> Auto-generated from \`skills/*/SKILL.md\` by \`scripts/build-exports.mjs\`.`,
    `> **Do not edit these files by hand** — edit the source skill and regenerate.`,
    '',
    `${skills.length} skills exported. Copy a \`${fileHint}\` into the tool to use it.`,
    '',
    ...(platform.usage ? [platform.usage, ''] : []),
    `Every file ends with a provenance ${platform.footer === false ? 'block' : 'comment'}: library version, source path, the SHA-256 of the source`,
    `\`SKILL.md\` and the licence. The same hash is published at \`${SITE}/.well-known/agent-skills.json\`,`,
    'so a copy can be checked against the library with `shasum -a 256` on the source file.',
    '',
    '| Skill | Bundle | Path |',
    '|---|---|---|',
    ...skills.map((s) => {
      const leaf = [...(platform.groupByBundle ? [join(base, s.bundle)] : [base]), s.name, fileNameFor(platform, s)].reduce((a, b) => join(a, b));
      const rel = relative(base, leaf);
      return `| ${s.title} | \`${s.bundle}\` | \`${rel}\` |`;
    }),
    '',
  ].join('\n');
  files.set(join(base, 'README.md'), index);
  return files;
}

function listExistingFiles(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...listExistingFiles(full));
    else out.push(full);
  }
  return out;
}

function writeRootReadme(activePlatforms, skillCount) {
  const lines = [
    '# Multi-Platform Exports',
    '',
    'These folders are **generated** from the canonical `skills/*/SKILL.md` files —',
    'the skill body is the single source of truth. Do not edit anything in `exports/`',
    'by hand; edit the source skill and run:',
    '',
    '```bash',
    'node scripts/build-exports.mjs',
    '```',
    '',
    `Currently exporting **${skillCount} skills** to:`,
    '',
    ...activePlatforms.map(([, p]) => `- **${p.label}** → \`${p.dir}/\``),
    '',
    'Retired skills are exported too, so an existing install never breaks — they are',
    'just not counted above. See `docs/DEPRECATION.md`.',
    '',
    'Adding a new platform is a few lines in the `PLATFORMS` registry of',
    '`scripts/build-exports.mjs` — no content is duplicated.',
    '',
  ];
  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const checkMode = args.includes('--check');
const platIdx = args.indexOf('--platform');
const onlyPlatform = platIdx !== -1 ? args[platIdx + 1] : null;

const skills = loadSkills();
const active = Object.entries(PLATFORMS).filter(([k]) => !onlyPlatform || k === onlyPlatform);
if (onlyPlatform && active.length === 0) {
  console.error(`Unknown platform '${onlyPlatform}'. Known: ${Object.keys(PLATFORMS).join(', ')}`);
  process.exit(2);
}

// Plan every file we intend to produce.
const planned = new Map();
for (const [key, platform] of active) {
  for (const [path, content] of planPlatform(key, platform, skills)) planned.set(path, content);
}
// The root index always lists every registered platform, not just the filtered
// subset, so `--platform x` never drops the others from the overview.
planned.set(join(exportsDir, 'README.md'), writeRootReadme(Object.entries(PLATFORMS), skills.filter((s) => !s.deprecated).length));

if (checkMode) {
  let drift = 0;
  for (const [path, content] of planned) {
    if (!existsSync(path) || readFileSync(path, 'utf8') !== content) {
      console.error(`stale: ${relative(root, path)}`);
      drift++;
    }
  }
  // Orphans: files under an active platform dir that we no longer plan to emit.
  for (const [, platform] of active) {
    for (const path of listExistingFiles(join(root, platform.dir))) {
      if (!planned.has(path)) { console.error(`orphan: ${relative(root, path)}`); drift++; }
    }
  }
  if (drift) {
    console.error(`\n${drift} file(s) out of date. Run: node scripts/build-exports.mjs`);
    process.exit(1);
  }
  console.log(`Exports are up to date (${skills.length} skills × ${active.length} platform(s)).`);
  process.exit(0);
}

// Write mode: clean each active platform dir for deterministic output, then write.
for (const [, platform] of active) {
  rmSync(join(root, platform.dir), { recursive: true, force: true });
}
let written = 0;
for (const [path, content] of planned) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  written++;
}
console.log(`Wrote ${written} files — ${skills.length} skills × ${active.length} platform(s): ${active.map(([k]) => k).join(', ')}.`);
