// Minimal multi-provider completion client (Node 18+ fetch, zero dependencies).
// Used by the Council for cross-provider adversarial review — the point is that
// the critic is a DIFFERENT vendor's model than the author.
//
// Keys come from the environment: ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY.

import { modelFor, requestShape } from './models.mjs';

const PROVIDERS = {
  anthropic: {
    env: 'ANTHROPIC_API_KEY',
    defaultModel: modelFor('default'),
    async complete({ key, model, system, user, maxTokens }) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model, ...requestShape(model, maxTokens), system, messages: [{ role: 'user', content: user }] }),
      });
      if (!res.ok) throw new Error(`anthropic ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return (await res.json()).content.map((c) => c.text || '').join('');
    },
  },
  openai: {
    env: 'OPENAI_API_KEY',
    defaultModel: 'gpt-4o',
    async complete({ key, model, system, user, maxTokens }) {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: maxTokens, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
      });
      if (!res.ok) throw new Error(`openai ${res.status}: ${(await res.text()).slice(0, 200)}`);
      return (await res.json()).choices[0].message.content || '';
    },
  },
  gemini: {
    env: 'GEMINI_API_KEY',
    defaultModel: 'gemini-2.5-flash',
    async complete({ key, model, system, user, maxTokens }) {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: 'user', parts: [{ text: user }] }], generationConfig: { maxOutputTokens: maxTokens } }),
      });
      if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 200)}`);
      const j = await res.json();
      return (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('');
    },
  },
};

export function provider(id) {
  const p = PROVIDERS[id];
  if (!p) throw new Error(`Unknown provider "${id}" — use: ${Object.keys(PROVIDERS).join(', ')}`);
  return p;
}
export function available() {
  return Object.entries(PROVIDERS).filter(([, p]) => process.env[p.env]).map(([id]) => id);
}
export async function complete(id, { model, system, user, maxTokens = 4096 }) {
  const p = provider(id);
  const key = process.env[p.env];
  if (!key) throw new Error(`${p.env} not set (needed for provider "${id}")`);
  return p.complete({ key, model: model || p.defaultModel, system, user, maxTokens });
}
