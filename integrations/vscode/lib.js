// Pure helpers for the VS Code extension: no dependency on the vscode module, so they
// can be tested with plain Node.
'use strict';

const API = 'https://pm-skills-mcp.pm-claude-skills.workers.dev';
const NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// A name must be a real string: String(undefined) is "undefined", which would pass the pattern.
const isName = (v) => typeof v === 'string' && NAME.test(v);

function searchUrl(query, limit = 20) {
  const q = String(query || '').trim().slice(0, 200);
  if (!q) throw new Error('Type what you need, for example "explain a metric drop".');
  const n = Math.min(50, Math.max(1, Number.isInteger(limit) ? limit : 20));
  return `${API}/v1/search?q=${encodeURIComponent(q)}&limit=${n}`;
}

function skillUrl(name) {
  if (!isName(name)) throw new Error(`"${name}" is not a skill name.`);
  return `${API}/v1/skills/${name}`;
}

function sourceUrl(name) {
  if (!isName(name)) throw new Error(`"${name}" is not a skill name.`);
  return `https://github.com/mohitagw15856/pm-claude-skills/blob/main/skills/${name}/SKILL.md`;
}

// Search results as quick-pick rows. Anything that is not a well-formed skill is dropped.
function toItems(body) {
  const rows = body && Array.isArray(body.skills) ? body.skills : [];
  return rows
    .filter((s) => s && isName(s.name))
    .map((s) => ({
      label: String(s.title || s.name),
      description: String(s.name),
      detail: String(s.description || '').replace(/\s+/g, ' ').slice(0, 180),
      name: String(s.name),
    }));
}

// What gets pasted into a chat or a file: the skill's instructions, then the user's task.
function asPrompt(skill, task) {
  const instructions = String((skill && skill.instructions) || '').trim();
  if (!instructions) throw new Error('That skill came back with no instructions.');
  const header = `# ${skill.title || skill.name}`;
  const t = String(task || '').trim();
  return `${header}\n\n${instructions}\n\n---\n\n${t ? `Task: ${t}` : 'Task: [describe what you need here]'}\n`;
}

module.exports = { API, searchUrl, skillUrl, sourceUrl, toItems, asPrompt };
