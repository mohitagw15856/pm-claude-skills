// Minimal, dependency-free Anthropic Messages API client (Node 18+ global fetch).
// Shared by the GitHub Action runner, the eval harness, and skill generation.
// No SDK, no install — just a thin POST wrapper.

const API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * Call the Anthropic Messages API and return the concatenated text output.
 * @param {object} o
 * @param {string} o.apiKey  - Anthropic API key.
 * @param {string} [o.model] - Model id (default claude-sonnet-4-6).
 * @param {string} [o.system]- System prompt.
 * @param {Array}  o.messages- [{role, content}] messages.
 * @param {number} [o.maxTokens]
 * @returns {Promise<string>}
 */
export async function complete({ apiKey, model = 'claude-sonnet-4-6', system, messages, maxTokens = 4096 }) {
  if (!apiKey) throw new Error('Missing Anthropic API key (set ANTHROPIC_API_KEY).');
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model, max_tokens: maxTokens, ...(system ? { system } : {}), messages }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 500)}`);
  }
  const data = await res.json();
  return (data.content || []).map((c) => c.text || '').join('').trim();
}

/** Parse "name: value" YAML-ish frontmatter + body from a SKILL.md string. */
export function parseSkill(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta = {};
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
      if (kv) {
        let v = kv[2].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        meta[kv[1]] = v;
      }
    }
  }
  return { meta, body: m ? m[2].trim() : text.trim() };
}
