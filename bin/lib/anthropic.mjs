// Minimal, dependency-free Anthropic Messages API client (Node 18+ global fetch).
// Shared by the GitHub Action runner, the eval harness, and skill generation.
// No SDK, no install — just a thin POST wrapper.

import { modelFor, requestShape } from './models.mjs';

// ANTHROPIC_BASE_URL points at a compatible server or a local stand-in for tests.
const API_URL = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '') + '/v1/messages';

/**
 * Call the Anthropic Messages API and return the concatenated text output.
 * Adds a per-request timeout and limited retries so a slow/transient failure
 * can't hang a CI job forever.
 * @param {object} o
 * @param {string} o.apiKey  - Anthropic API key.
 * @param {string} [o.model] - Model id (default: the registry's "default" role, data/models.json).
 * @param {string} [o.effort]- low | medium | high | xhigh | max. Current models only; omitted, the API default applies.
 * @param {string} [o.system]- System prompt.
 * @param {Array}  o.messages- [{role, content}] messages.
 * @param {number} [o.maxTokens] - Room for the visible answer. Current models think first, so the request
 *                                 ceiling is this plus thinking headroom (see requestShape in models.mjs).
 * @param {number} [o.timeoutMs] - Per-request timeout (default 120s).
 * @param {number} [o.retries]   - Retries on timeout / 429 / 5xx (default 2).
 * @returns {Promise<string>}
 */
export async function complete({ apiKey, model = modelFor('default'), system, messages, maxTokens = 4096, effort, timeoutMs = 120000, retries = 5, withUsage = false }) {
  if (!apiKey) throw new Error('Missing Anthropic API key (set ANTHROPIC_API_KEY).');
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    let waitMs = Math.min(30000, 1000 * 2 ** attempt) + Math.floor(Math.random() * 500); // capped backoff + jitter
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model, ...requestShape(model, maxTokens, effort), ...(system ? { system } : {}), messages }),
        signal: ctrl.signal,
      });
      if (res.ok) {
        const data = await res.json();
        // Thinking blocks carry no `text`, so only the answer is joined here.
        const text = (data.content || []).map((c) => (c.type === undefined || c.type === 'text' ? c.text || '' : '')).join('').trim();
        // An empty answer with one of these stop reasons is a failure, not a result:
        // returning '' would be scored or saved as if the model had said nothing.
        if (!text && data.stop_reason === 'refusal') throw new Error(`Anthropic API: ${model} declined this request (stop_reason refusal).`);
        if (!text && data.stop_reason === 'max_tokens') throw new Error(`Anthropic API: ${model} used all of max_tokens before answering. Raise maxTokens or lower effort.`);
        // withUsage: return the real token accounting (the prove harness runs on
        // measured usage, never estimates) alongside the text.
        if (withUsage) return { text, usage: data.usage || {}, model: data.model, stopReason: data.stop_reason };
        return text;
      }
      const body = await res.text().catch(() => '');
      // Retry transient server / rate-limit / overloaded errors; fail fast on other 4xx.
      if ((res.status === 429 || res.status === 529 || res.status >= 500) && attempt < retries) {
        const ra = parseFloat(res.headers.get('retry-after')); // server-advised wait wins
        if (ra > 0) waitMs = Math.min(60000, ra * 1000) + 250;
        lastErr = new Error(`Anthropic API ${res.status}`);
      } else {
        throw new Error(`Anthropic API ${res.status}: ${body.slice(0, 500)}`);
      }
    } catch (e) {
      if (e.name === 'AbortError') e = new Error(`Anthropic API request timed out after ${timeoutMs}ms`);
      const retryable = /timed out/.test(e.message) || e.name === 'TypeError' || /Anthropic API (429|529|5\d\d)/.test(e.message);
      if (!retryable || attempt >= retries) throw e;
      lastErr = e;
    } finally {
      clearTimeout(timer);
    }
    await new Promise((r) => setTimeout(r, waitMs));
  }
  throw lastErr || new Error('Anthropic API request failed.');
}

/** Parse "name: value" YAML-ish frontmatter + body from a SKILL.md string. */
export function parseSkill(text) {
  // Tolerate CRLF so SKILL.md files authored on Windows parse correctly —
  // otherwise `run` and `chain` fall through to `text.trim()` and send the raw
  // '---' frontmatter to the model as part of the system prompt.
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
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
