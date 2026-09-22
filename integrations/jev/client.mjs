// Minimal client for a calibrated decision model (TypeSafe AI's Jev, "System One").
// POST /v1/systemone — a state plus typed questions in, typed answers with
// probabilities and confidence out. No text generation, no dependencies.
//
//   import { ask, choice, score, noul, decide } from './client.mjs';
//   const { answers } = await ask(prompt, { lane: choice('Which lane?', { a: '…', b: '…' }) });
//
// Every caller in this repo passes a `transport` in --selftest so nothing here
// needs a network or a key to be exercised. Set JEV_API_KEY to go live.
// Optional: JEV_BASE_URL (default https://api.typesafe.ai), JEV_MODEL (jev-latest).

export const DEFAULTS = Object.freeze({
  baseUrl: 'https://api.typesafe.ai',
  model: 'jev-latest',
  timeoutMs: 8000,
  retries: 2,
  maxChoiceOptions: 255,
  maxScoreLevels: 10,
});

export function configured(env = process.env) { return typeof env.JEV_API_KEY === 'string' && env.JEV_API_KEY.length > 0; }

// ── question builders ─────────────────────────────────────────────────────────
export function noul(instructions, criteria) {
  const q = { type: 'noul', instructions };
  if (criteria) q.criteria = criteria; // { true: '…', false: '…' }
  return q;
}
export function choice(instructions, criteria) {
  const n = Object.keys(criteria || {}).length;
  if (n < 2) throw new Error('choice needs at least 2 options');
  if (n > DEFAULTS.maxChoiceOptions) throw new Error(`choice allows at most ${DEFAULTS.maxChoiceOptions} options (got ${n}); chunk them`);
  return { type: 'choice', instructions, criteria };
}
export function score(instructions, levels) {
  if (!Array.isArray(levels) || levels.length < 2 || levels.length > DEFAULTS.maxScoreLevels) throw new Error('score needs 2–10 ordered level descriptions');
  return { type: 'score', instructions, criteria: levels };
}

// ── transport ─────────────────────────────────────────────────────────────────
const RETRYABLE = new Set([429, 529, 502, 503]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function httpTransport({ apiKey, baseUrl = DEFAULTS.baseUrl, timeoutMs = DEFAULTS.timeoutMs, retries = DEFAULTS.retries, fetchFn = globalThis.fetch } = {}) {
  if (!apiKey) throw new Error('JEV_API_KEY is not set');
  if (typeof fetchFn !== 'function') throw new Error('fetch is unavailable (Node 18+ required)');
  return async function send(body) {
    let lastErr;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeoutMs);
      try {
        const res = await fetchFn(`${baseUrl.replace(/\/$/, '')}/v1/systemone`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
          body: JSON.stringify(body),
          signal: ctrl.signal,
        });
        if (res.ok) return await res.json();
        const text = await res.text().catch(() => '');
        lastErr = new Error(`jev ${res.status}: ${text.slice(0, 200)}`);
        lastErr.status = res.status;
        if (!RETRYABLE.has(res.status)) throw lastErr;
      } catch (e) {
        lastErr = e;
        if (e.name !== 'AbortError' && !(e.status && RETRYABLE.has(e.status))) throw e;
      } finally { clearTimeout(t); }
      await sleep(250 * 2 ** attempt);
    }
    throw lastErr;
  };
}

// A deterministic transport for self-tests: `answerFor(key, question, state)` returns
// the option name (choice), level index (score) or probability (noul).
export function mockTransport(answerFor, { model = 'jev-mock' } = {}) {
  return async function send(body) {
    const answers = {};
    for (const [key, q] of Object.entries(body.questions)) {
      const a = answerFor(key, q, body.state);
      if (q.type === 'choice') {
        const opts = Object.keys(q.criteria);
        const pick = opts.includes(a) ? a : opts[0];
        const probabilities = Object.fromEntries(opts.map((o) => [o, o === pick ? 0.9 : 0.1 / Math.max(1, opts.length - 1)]));
        answers[key] = { type: 'choice', choice: pick, probabilities, confidence: 0.85 };
      } else if (q.type === 'score') {
        const idx = Math.min(q.criteria.length - 1, Math.max(0, Number(a) || 0));
        const probabilities = Object.fromEntries(q.criteria.map((_, i) => [String(i), i === idx ? 0.9 : 0.1 / Math.max(1, q.criteria.length - 1)]));
        const legend = Object.fromEntries(q.criteria.map((d, i) => [String(i), d]));
        answers[key] = { type: 'score', score: idx, probabilities, confidence: 0.85, legend };
      } else {
        answers[key] = { type: 'noul', noul: typeof a === 'number' ? a : (a ? 0.9 : 0.1) };
      }
    }
    return { model, answers, usage: { input_tokens: JSON.stringify(body.state).length >> 2, output_tokens: Object.keys(answers).length } };
  };
}

// ── ask ───────────────────────────────────────────────────────────────────────
export async function ask(state, questions, opts = {}) {
  const env = opts.env || process.env;
  const transport = opts.transport || httpTransport({
    apiKey: env.JEV_API_KEY, baseUrl: env.JEV_BASE_URL || opts.baseUrl, timeoutMs: opts.timeoutMs, retries: opts.retries, fetchFn: opts.fetchFn,
  });
  const body = { model: opts.model || env.JEV_MODEL || DEFAULTS.model, state, questions };
  const t0 = Date.now();
  const res = await transport(body);
  return { answers: normalise(res.answers || {}), model: res.model, usage: res.usage, ms: Date.now() - t0 };
}

// Read answers defensively: distributions may sum to 0.99; SDK shapes vary a little.
export function normalise(answers) {
  const out = {};
  for (const [k, a] of Object.entries(answers)) {
    const n = { ...a };
    if (n.type === 'noul' || n.type === 'boolean') { n.type = 'noul'; n.noul = num(n.noul ?? n.probability); }
    if (n.type === 'choice') n.confidence = num(n.confidence ?? topGap(n.probabilities));
    if (n.type === 'score') { n.score = num(n.score); n.confidence = num(n.confidence ?? topGap(n.probabilities)); n.level = n.probabilities ? argmax(n.probabilities) : String(Math.round(n.score)); }
    out[k] = n;
  }
  return out;
}
const num = (v) => (Number.isFinite(+v) ? +v : 0);
function argmax(p) { let best = null; for (const [k, v] of Object.entries(p || {})) if (best === null || v > p[best]) best = k; return best; }
function topGap(p) { const v = Object.values(p || {}).sort((a, b) => b - a); return v.length > 1 ? Math.max(0, v[0] - v[1]) : (v[0] || 0); }

// Threshold helper — the Vercel/TypeSafe pattern: act automatically only when the
// answer is confident AND the winning option is probable; otherwise hand to a human.
export function decide(answer, { minConfidence = 0.6, minProbability = 0.7 } = {}) {
  if (!answer) return { ok: false, reason: 'no answer' };
  if (answer.type === 'noul') return { ok: true, pick: answer.noul >= 0.5, probability: answer.noul, confidence: Math.abs(answer.noul - 0.5) * 2, reason: 'noul' };
  const pick = answer.type === 'choice' ? answer.choice : answer.level;
  const probability = num(answer.probabilities?.[pick]);
  const confidence = num(answer.confidence);
  const ok = confidence >= minConfidence && probability >= minProbability;
  return { ok, pick, probability, confidence, reason: ok ? 'auto' : `below threshold (conf ${confidence.toFixed(2)} / p ${probability.toFixed(2)}) — route to a human` };
}

// Split >255 options into chunks (for flat routing over a big catalogue).
export function chunk(arr, size = DEFAULTS.maxChoiceOptions) {
  const out = []; for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size)); return out;
}

// ── self-test ─────────────────────────────────────────────────────────────────
export async function selftest() {
  let pass = 0, fail = 0; const ok = (c, m) => (c ? pass++ : (fail++, console.error('  ✗', m)));
  const t = mockTransport((key, q) => (q.type === 'choice' ? 'b' : q.type === 'score' ? 2 : 0.8));
  const { answers } = await ask('hello', { c: choice('pick', { a: 'A', b: 'B' }), s: score('rate', ['low', 'mid', 'high']), n: noul('true?') }, { transport: t });
  ok(answers.c.choice === 'b', 'choice picks b');
  ok(answers.s.level === '2' && answers.s.score === 2, 'score level 2');
  ok(Math.abs(answers.n.noul - 0.8) < 1e-9, 'noul 0.8');
  ok(decide(answers.c).ok === true && decide(answers.c).pick === 'b', 'decide auto on confident choice');
  ok(decide({ type: 'choice', choice: 'a', probabilities: { a: 0.5, b: 0.5 }, confidence: 0.1 }).ok === false, 'decide holds on a coin flip');
  ok(decide(answers.n).pick === true, 'decide noul true');
  let threw = false; try { choice('x', { a: 'A' }); } catch { threw = true; } ok(threw, 'choice rejects <2 options');
  ok(chunk(Array(600).fill(0)).length === 3, 'chunk 600 → 3');
  // retry path: 429 then 200
  let calls = 0;
  const fetchFn = async () => { calls++; return calls === 1 ? { ok: false, status: 429, text: async () => 'slow down' } : { ok: true, json: async () => ({ answers: { n: { type: 'noul', noul: 0.3 } } }) }; };
  const r = await ask('s', { n: noul('q') }, { transport: httpTransport({ apiKey: 'k', fetchFn, retries: 1 }) });
  ok(calls === 2 && r.answers.n.noul === 0.3, 'retries once on 429');
  ok(normalise({ b: { type: 'boolean', probability: 0.7 } }).b.noul === 0.7, 'normalises SDK boolean shape');
  console.log(`jev client self-test: ${pass} passed · ${fail} failed`);
  return fail ? 1 : 0;
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href && process.argv.includes('--selftest')) {
  process.exit(await selftest());
}
