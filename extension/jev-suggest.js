/* PM Skills — contextual discovery v2 (decision-layer idea #4).
 * context-rules.json is the local, zero-network v1: host/keyword rules → 1–3 skills.
 * This module is the OPT-IN v2: when the user has saved a decision-model key in the
 * extension's options (chrome.storage.local.jevApiKey), the page's title, host and
 * first ~500 words are sent to the model with one Choice question over the rule
 * labels, and the model picks the situation. The rules stay the fallback and the
 * `never` list (auth/banking hosts) is honoured before anything is read.
 *
 * Privacy (stricter than v1): nothing is sent unless a key is present; never on
 * `never` hosts; only title + host + 500 words; no URL query strings; no storage of
 * the page text. State this in STORE.md when enabling.
 *
 * Works in the extension AND in node (for the self-test): pass fetchFn/storage. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module && module.exports) module.exports = api;
  root.pmJevSuggest = api;
})(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : window), function () {
  'use strict';
  const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';

  function excerpt(doc, max = 500) {
    const text = (doc.body && doc.body.innerText ? doc.body.innerText : '').replace(/\s+/g, ' ').trim();
    return text.split(' ').slice(0, max).join(' ');
  }
  function onNeverHost(host, never) { return (never || []).some((n) => host === n || host.endsWith('.' + n) || host.includes(n)); }

  // Returns { rule, skills, label, method, p, confidence } or null.
  async function pickSkillForPage({ rules, never, doc, host, apiKey, fetchFn, threshold = 0.6 }) {
    if (!apiKey || !rules || !rules.length) return null;
    if (onNeverHost(host, never)) return null;
    const criteria = { none: 'an ordinary page — a feed, a search, news, a product page, or anything none of the situations describe' };
    for (const r of rules) criteria[r.id] = r.label;
    const state = { host, title: (doc.title || '').slice(0, 200), excerpt: excerpt(doc) };
    const body = { model: 'jev-latest', state, questions: { situation: { type: 'choice', instructions: 'Which real-life situation is this page about, if any? Only pick a situation when the page itself is that document or that step — a lease, a job posting, a bill, a benefits form, a collections notice — not when it merely mentions the topic.', criteria } } };
    let data;
    try {
      const res = await (fetchFn || fetch)(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + apiKey }, body: JSON.stringify(body) });
      if (!res.ok) return null;
      data = await res.json();
    } catch { return null; }
    const a = data && data.answers && data.answers.situation;
    if (!a || a.choice === 'none') return null;
    const p = (a.probabilities && a.probabilities[a.choice]) || 0;
    const conf = typeof a.confidence === 'number' ? a.confidence : p;
    if (p < threshold) return null;
    const rule = rules.find((r) => r.id === a.choice);
    return rule ? { rule: rule.id, skills: rule.suggest, label: rule.label, method: 'jev', p, confidence: conf } : null;
  }

  async function loadKey(storage) {
    try { const got = await new Promise((res) => storage.get(['jevApiKey'], res)); return got && got.jevApiKey ? String(got.jevApiKey) : ''; } catch { return ''; }
  }

  return { pickSkillForPage, excerpt, onNeverHost, loadKey };
});

// node self-test:  node extension/jev-suggest.js --selftest
if (typeof process !== 'undefined' && process.argv && process.argv.includes('--selftest')) {
  (async () => {
    const { readFileSync } = await import('node:fs');
    const { resolve, dirname } = await import('node:path');
    const m = globalThis.pmJevSuggest;
    const cfg = JSON.parse(readFileSync(resolve(dirname(process.argv[1]), 'context-rules.json'), 'utf8'));
    let pass = 0, fail = 0; const ok = (c, msg) => (c ? pass++ : (fail++, console.error('  ✗', msg)));
    const doc = { title: 'Residential Lease Agreement', body: { innerText: 'THIS LEASE is made between Landlord and Tenant. Security deposit of $2,000 is due at signing. Term: 12 months. Early termination fee…' } };
    const fetchFn = async (u, o) => ({ ok: true, json: async () => ({ answers: { situation: { type: 'choice', choice: 'lease', probabilities: { lease: 0.92, none: 0.05 }, confidence: 0.87 } } }) });
    const r = await m.pickSkillForPage({ rules: cfg.rules, never: cfg.never, doc, host: 'docs.example.com', apiKey: 'k', fetchFn });
    ok(r && r.rule === 'lease' && r.skills.includes('lease-decoder'), 'lease page → lease rule');
    ok((await m.pickSkillForPage({ rules: cfg.rules, never: cfg.never, doc, host: 'docs.example.com', apiKey: '', fetchFn })) === null, 'no key → null (sends nothing)');
    const bank = (cfg.never || [])[0] || 'bank.example';
    ok((await m.pickSkillForPage({ rules: cfg.rules, never: cfg.never, doc, host: bank, apiKey: 'k', fetchFn })) === null, `never host (${bank}) → null`);
    const low = async () => ({ ok: true, json: async () => ({ answers: { situation: { choice: 'lease', probabilities: { lease: 0.4 }, confidence: 0.2 } } }) });
    ok((await m.pickSkillForPage({ rules: cfg.rules, never: cfg.never, doc, host: 'x.com', apiKey: 'k', fetchFn: low })) === null, 'weak pick → null');
    ok(m.excerpt(doc, 3) === 'THIS LEASE is', 'excerpt caps words');
    console.log(`jev-suggest (extension) self-test: ${pass} passed · ${fail} failed`);
    process.exit(fail ? 1 : 0);
  })();
}
