// Cost & privacy helper. Estimates token cost for a run (bring-your-own-key
// means you pay the provider directly, so it's fair to show what a run costs)
// and tracks a local running total. Estimates only — real billing is your
// provider's. Prices are per 1M tokens (USD), updated periodically; a model not
// in the table falls back to a conservative default. Exposes window.PMCost.
(function (g) {
  'use strict';
  // [inputPer1M, outputPer1M] USD. Approximate public list prices.
  var PRICES = {
    'claude-opus-4-8': [15, 75], 'claude-sonnet-4-6': [3, 15], 'claude-haiku-4-5-20251001': [0.8, 4],
    'gpt-4o': [2.5, 10], 'gpt-4o-mini': [0.15, 0.6], 'o4-mini': [1.1, 4.4],
    'gemini-2.0-flash': [0.1, 0.4], 'gemini-1.5-pro': [1.25, 5], 'gemini-1.5-flash': [0.075, 0.3],
  };
  var DEFAULT = [3, 15];
  var KEY = 'pm_cost_total_v1';
  // ~4 chars/token is the standard rough heuristic for English.
  function tokens(str) { return Math.max(1, Math.ceil((str || '').length / 4)); }
  function priceFor(model) {
    if (PRICES[model]) return PRICES[model];
    for (var k in PRICES) if (model && model.indexOf(k) === 0) return PRICES[k];
    return DEFAULT;
  }
  // opts: {model, inputText, outputText} → {inTok, outTok, usd}
  function estimate(opts) {
    var p = priceFor(opts.model);
    var inTok = tokens(opts.inputText), outTok = tokens(opts.outputText);
    var usd = (inTok / 1e6) * p[0] + (outTok / 1e6) * p[1];
    return { inTok: inTok, outTok: outTok, usd: usd };
  }
  function record(usd) {
    try { var t = +(localStorage.getItem(KEY) || 0) + usd; localStorage.setItem(KEY, String(t)); return t; } catch (e) { return usd; }
  }
  function total() { try { return +(localStorage.getItem(KEY) || 0); } catch (e) { return 0; } }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }
  function fmt(usd) { return usd < 0.01 ? '<$0.01' : '$' + usd.toFixed(usd < 1 ? 3 : 2); }
  // Free/local providers cost nothing.
  function isFree(model, providerId) { return providerId === 'webllm' || providerId === 'ollama'; }

  g.PMCost = { estimate: estimate, record: record, total: total, reset: reset, fmt: fmt, isFree: isFree, PRICES: PRICES, priceFor: priceFor, tokens: tokens };
})(window);
