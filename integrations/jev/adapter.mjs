// LLM adapter: the System One request shape served by a Claude model.
// Same idea as TypeSafe's own `system-one-adapter` (an LLM-backed drop-in for their
// client), so every typed question in this repo keeps working with no Jev credential —
// on the ANTHROPIC_API_KEY that already funds the playground's free runs. Answers are
// labelled `model: adapter:<claude model>` and are NOT Jev: no calibration guarantee,
// slower (1–3 s), pricier per call. Treat them as the honest fallback and the
// comparison row in route-bench, not as the thing being benchmarked.
//
// Default model is claude-haiku-4-5 (a 130-way classification per call, hundreds of
// calls per bench run — cost matters more than depth here). Override with
// JEV_ADAPTER_MODEL (e.g. claude-sonnet-5 or claude-opus-5 for a stronger judge).
// Raw fetch, no SDK: this folder ships as a zero-dependency npm package.

const API_URL = 'https://api.anthropic.com/v1/messages';
export const DEFAULT_ADAPTER_MODEL = 'claude-haiku-4-5';

export const SYSTEM = `You are a calibrated decision engine. You do not write prose. You read a STATE and answer typed QUESTIONS with probabilities.
Rules:
- For a "choice" question, read the option descriptions and pick by meaning, not by name. List only the options with probability ≥ 0.01 (at most 8 of them, summing to about 1); omitted options count as 0.
- For a "score" question, give a probability for every level index "0".."n-1" in the order the levels are listed (sum to 1). Keys are the index strings, not the level text.
- For a "noul" question, give one probability that the statement is true.
- Be calibrated: spread probability when you are unsure, concentrate it when the answer is clear. Never output 1.0 unless it is certain.
Output ONLY a JSON object: {"answers": {"<question id>": {"probabilities": {...}} | {"probability": p}}}. No markdown, no commentary.`;

export function buildUser(state, questions) {
  const q = {};
  for (const [id, x] of Object.entries(questions)) {
    if (x.type === 'choice') q[id] = { type: 'choice', instructions: x.instructions, options: x.criteria };
    else if (x.type === 'score') q[id] = { type: 'score', instructions: x.instructions, levels: Object.fromEntries(x.criteria.map((d, i) => [String(i), d])) };
    else q[id] = { type: 'noul', instructions: x.instructions, ...(x.criteria ? { criteria: x.criteria } : {}) };
  }
  return JSON.stringify({ state, questions: q });
}

export function parseAnswers(text, questions) {
  const m = String(text).match(/\{[\s\S]*\}/);
  if (!m) throw new Error('adapter: no JSON in response');
  let j; try { j = JSON.parse(m[0]); } catch { throw new Error('adapter: bad JSON in response'); }
  const raw = j.answers || j; const answers = {};
  for (const [id, q] of Object.entries(questions)) {
    const a = raw[id] || {};
    if (q.type === 'noul') { answers[id] = { type: 'noul', noul: clamp(+(a.probability ?? a.noul ?? a.p ?? 0)) }; continue; }
    const keys = q.type === 'choice' ? Object.keys(q.criteria) : q.criteria.map((_, i) => String(i));
    const p = {}; let sum = 0;
    for (const k of keys) { const v = Math.max(0, +(a.probabilities?.[k] ?? 0) || 0); p[k] = v; sum += v; }
    if (sum <= 0) { for (const k of keys) p[k] = 1 / keys.length; sum = 1; }
    for (const k of keys) p[k] = p[k] / sum;
    const sorted = keys.slice().sort((x, y) => p[y] - p[x]);
    const confidence = keys.length > 1 ? +(p[sorted[0]] - p[sorted[1]]).toFixed(4) : 1;
    if (q.type === 'choice') answers[id] = { type: 'choice', choice: sorted[0], probabilities: p, confidence };
    else { const score = keys.reduce((s, k) => s + (+k) * p[k], 0); answers[id] = { type: 'score', score: +score.toFixed(4), probabilities: p, confidence, legend: Object.fromEntries(q.criteria.map((d, i) => [String(i), d])) }; }
  }
  return answers;
}
const clamp = (v) => Math.min(1, Math.max(0, Number.isFinite(v) ? v : 0));

export function adapterTransport({ apiKey, model = DEFAULT_ADAPTER_MODEL, fetchFn = globalThis.fetch, timeoutMs = 30000, retries = 2 } = {}) {
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
  return async function send(body) {
    const user = buildUser(body.state, body.questions);
    let lastErr;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        const res = await fetchFn(API_URL, { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model, max_tokens: 2048, system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: user }] }), signal: ctrl.signal });
        if (res.ok) {
          const data = await res.json();
          const text = (data.content || []).map((c) => c.text || '').join('');
          return { model: `adapter:${data.model || model}`, answers: parseAnswers(text, body.questions), usage: data.usage };
        }
        lastErr = new Error(`anthropic ${res.status}`); lastErr.status = res.status;
        if (!(res.status === 429 || res.status === 529 || res.status >= 500)) throw lastErr;
      } catch (e) { lastErr = e; if (e.name !== 'AbortError' && !(e.status && (e.status === 429 || e.status === 529 || e.status >= 500))) throw e; }
      finally { clearTimeout(t); }
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
    throw lastErr;
  };
}

export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const qs = { lane: { type: 'choice', instructions: 'which?', criteria: { a: 'A', b: 'B', c: 'C' } }, sev: { type: 'score', instructions: 'rate', criteria: ['low', 'mid', 'high'] }, ok: { type: 'noul', instructions: 'true?' } };
  const a = parseAnswers('Sure:\n{"answers":{"lane":{"probabilities":{"a":0.2,"b":0.7,"c":0.1}},"sev":{"probabilities":{"0":0.1,"1":0.2,"2":0.7}},"ok":{"probability":0.9}}}', qs);
  ok(a.lane.choice === 'b' && Math.abs(a.lane.confidence - 0.5) < 1e-6, 'choice argmax + confidence');
  ok(Math.abs(a.sev.score - 1.6) < 1e-6 && a.sev.legend['2'] === 'high', 'score expectation + legend');
  ok(a.ok.noul === 0.9, 'noul');
  const b = parseAnswers('{"answers":{"lane":{"probabilities":{"a":2,"b":6}}}}', { lane: qs.lane });
  ok(Math.abs(b.lane.probabilities.b - 0.75) < 1e-6 && b.lane.probabilities.c === 0, 'renormalises and fills missing options');
  let threw = false; try { parseAnswers('nope', qs); } catch { threw = true; } ok(threw, 'rejects non-JSON');
  const u = JSON.parse(buildUser('s', qs)); ok(u.questions.sev.levels['1'] === 'mid' && u.questions.lane.options.a === 'A', 'user payload shape');
  let seen; const t = adapterTransport({ apiKey: 'k', fetchFn: async (url, o) => { seen = JSON.parse(o.body); return { ok: true, json: async () => ({ model: 'claude-haiku-4-5', content: [{ type: 'text', text: '{"answers":{"ok":{"probability":0.3}}}' }], usage: { input_tokens: 10 } }) }; } });
  const r = await t({ state: 's', questions: { ok: qs.ok } });
  ok(seen.model === DEFAULT_ADAPTER_MODEL && seen.system[0].cache_control && r.model === 'adapter:claude-haiku-4-5' && r.answers.ok.noul === 0.3, 'transport calls Messages API with a cached system prompt');
  console.log(`jev adapter self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}
import { fileURLToPath } from 'node:url';
if (process.argv.includes('--selftest') && process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) process.exit(await selftest());
