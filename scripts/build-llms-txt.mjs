#!/usr/bin/env node
// Generate web/llms.txt (an agent-discoverable index of the library, per the llms.txt
// convention) and web/llms-full.txt (every skill's full instructions in one file).
// Lets any AI / answer engine discover and use the skills. Run after web/build-skills.mjs.
//   node scripts/build-llms-txt.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://mohitagw15856.github.io/pm-claude-skills';
const { skills } = JSON.parse(readFileSync(join(root, 'web', 'skills.json'), 'utf8'));

// Group by bundle for a readable index.
const byBundle = {};
for (const s of skills) (byBundle[s.plugin] ||= []).push(s);
const bundles = Object.keys(byBundle).sort();

const head =
  `# PM Skills — ${skills.length} professional Agent Skills\n\n` +
  `> Open-source SKILL.md instruction files that teach any AI (Claude, ChatGPT, Gemini, local models) to produce professional-grade work — PRDs, launch plans, postmortems, rubrics, contracts, pitch decks and more — across 21 professions. ${skills.filter((s) => s.eval).length} are eval-scored (avg ~4.8/5). Run free in the browser, install via the \`skills\` CLI or \`npx pm-claude-skills\`, or connect over MCP.\n\n` +
  `## Use\n` +
  `- [Playground](${BASE}/): run any skill in your browser with your own Claude/OpenAI/Gemini/Ollama key\n` +
  `- [MCP server](https://github.com/mohitagw15856/pm-claude-skills/tree/main/mcp): \`npx -y pm-claude-skills-mcp\` — search & fetch skills on demand\n` +
  `- [Catalog](${BASE}/catalog.html) · [Leaderboard](${BASE}/leaderboard.html) · [GitHub](https://github.com/mohitagw15856/pm-claude-skills)\n`;

const index = [head];
for (const b of bundles) {
  index.push(`\n## ${b}\n`);
  for (const s of byBundle[b].sort((a, x) => a.title.localeCompare(x.title))) {
    index.push(`- [${s.title}](${BASE}/skill/${s.name}.html): ${s.summary || s.description}`);
  }
}
writeFileSync(join(root, 'web', 'llms.txt'), index.join('\n') + '\n');

// Full dump: every skill's instructions, for agents that want the whole library inline.
const full = [head, '\n---\n\n# Full skill instructions\n'];
for (const s of skills.slice().sort((a, b) => a.title.localeCompare(b.title))) {
  full.push(`\n## ${s.title} (\`${s.name}\`) — ${s.plugin}\n\n${s.instructions}\n`);
}
writeFileSync(join(root, 'web', 'llms-full.txt'), full.join('\n') + '\n');

console.log(`Wrote web/llms.txt (${skills.length} skills, ${bundles.length} bundles) + web/llms-full.txt.`);
