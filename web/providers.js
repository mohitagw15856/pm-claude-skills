// Shared multi-model provider layer for every tool page (playground, grade, agent, canvas).
// Run any skill with your own Claude, OpenAI, or Gemini key. All three support direct
// browser calls over SSE `data:` lines — only the request shape and how a text delta is
// extracted differ, which is all this registry abstracts. Load this BEFORE a page's script.
(function (g) {
  'use strict';
  var PROVIDER_STORE = 'pm_provider';

  var PROVIDERS = {
    anthropic: {
      name: 'Claude', keyStore: 'anthropic_api_key',
      placeholder: 'sk-ant-… (your Anthropic API key)', keyUrl: 'https://console.anthropic.com/settings/keys',
      models: [['claude-opus-4-8', 'Opus 4.8'], ['claude-sonnet-4-6', 'Sonnet 4.6'], ['claude-haiku-4-5-20251001', 'Haiku 4.5']],
      buildReq: function (o) {
        return {
          url: 'https://api.anthropic.com/v1/messages',
          headers: { 'content-type': 'application/json', 'x-api-key': o.key, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
          body: Object.assign({ model: o.model, max_tokens: 8192, stream: true }, o.system ? { system: o.system } : {}, { messages: [{ role: 'user', content: o.userMessage }] }),
        };
      },
      delta: function (e) { return (e.type === 'content_block_delta' && e.delta && e.delta.text) ? e.delta.text : ''; },
      errOf: function (e) { return (e.type === 'error' && e.error) ? (e.error.message || 'Stream error') : ''; },
    },
    openai: {
      name: 'OpenAI', keyStore: 'openai_api_key',
      placeholder: 'sk-… (your OpenAI API key)', keyUrl: 'https://platform.openai.com/api-keys',
      models: [['gpt-4o', 'GPT-4o'], ['gpt-4o-mini', 'GPT-4o mini'], ['gpt-4.1', 'GPT-4.1']],
      buildReq: function (o) {
        var messages = [];
        if (o.system) messages.push({ role: 'system', content: o.system });
        messages.push({ role: 'user', content: o.userMessage });
        return {
          url: 'https://api.openai.com/v1/chat/completions',
          headers: { 'content-type': 'application/json', authorization: 'Bearer ' + o.key },
          body: { model: o.model, stream: true, messages: messages },
        };
      },
      delta: function (e) { return (e.choices && e.choices[0] && e.choices[0].delta && e.choices[0].delta.content) || ''; },
      errOf: function (e) { return e.error ? (e.error.message || 'OpenAI error') : ''; },
    },
    gemini: {
      name: 'Gemini', keyStore: 'gemini_api_key',
      placeholder: 'AIza… (your Google AI Studio key)', keyUrl: 'https://aistudio.google.com/apikey',
      models: [['gemini-2.0-flash', 'Gemini 2.0 Flash'], ['gemini-1.5-pro', 'Gemini 1.5 Pro'], ['gemini-1.5-flash', 'Gemini 1.5 Flash']],
      buildReq: function (o) {
        return {
          url: 'https://generativelanguage.googleapis.com/v1beta/models/' + o.model + ':streamGenerateContent?alt=sse&key=' + encodeURIComponent(o.key),
          headers: { 'content-type': 'application/json' },
          body: Object.assign({}, o.system ? { system_instruction: { parts: [{ text: o.system }] } } : {}, { contents: [{ role: 'user', parts: [{ text: o.userMessage }] }] }),
        };
      },
      delta: function (e) { try { return e.candidates[0].content.parts[0].text || ''; } catch (_) { return ''; } },
      errOf: function (e) { return e.error ? (e.error.message || 'Gemini error') : ''; },
    },
  };

  PROVIDERS.ollama = {
    name: 'Ollama', keyStore: 'ollama_base_url', default: 'http://localhost:11434',
    placeholder: 'http://localhost:11434 (your Ollama URL)', keyUrl: 'https://ollama.com/download',
    models: [['llama3.2', 'Llama 3.2'], ['qwen2.5', 'Qwen 2.5'], ['mistral', 'Mistral'], ['gemma2', 'Gemma 2'], ['phi3', 'Phi-3']],
    // Ollama ships an OpenAI-compatible endpoint. NOTE: to call it from a hosted page,
    // start Ollama with OLLAMA_ORIGINS set (e.g. OLLAMA_ORIGINS=* ollama serve) or CORS blocks it.
    buildReq: function (o) {
      var base = (o.key || 'http://localhost:11434').replace(/\/+$/, '');
      var messages = [];
      if (o.system) messages.push({ role: 'system', content: o.system });
      messages.push({ role: 'user', content: o.userMessage });
      return { url: base + '/v1/chat/completions', headers: { 'content-type': 'application/json' }, body: { model: o.model, stream: true, messages: messages } };
    },
    delta: function (e) { return (e.choices && e.choices[0] && e.choices[0].delta && e.choices[0].delta.content) || ''; },
    errOf: function (e) { return e.error ? (e.error.message || 'Ollama error') : ''; },
  };

  function providerId() { var p = localStorage.getItem(PROVIDER_STORE); return PROVIDERS[p] ? p : 'anthropic'; }
  function current() { return PROVIDERS[providerId()]; }
  function modelStoreKey(p) { return 'pm_model_' + p; }

  function parseApiError(text, status) {
    try { var j = JSON.parse(text); if (j.error && j.error.message) {
      if (status === 401) return 'Invalid API key (401). Check the key and try again.';
      if (status === 429) return 'Rate limit or insufficient credits (429): ' + j.error.message;
      return 'API error ' + status + ': ' + j.error.message;
    } } catch (_) {}
    return 'Request failed (' + status + ').';
  }

  // Populate #model + #apiKey + #getKeyLink (where present) for the active provider.
  function applyProvider() {
    var cfg = current(), p = providerId(), d = document;
    var msel = d.getElementById('model');
    if (msel) {
      msel.innerHTML = cfg.models.map(function (m) { return '<option value="' + m[0] + '">' + m[1] + '</option>'; }).join('');
      var saved = localStorage.getItem(modelStoreKey(p));
      if (saved && cfg.models.some(function (m) { return m[0] === saved; })) msel.value = saved;
    }
    var kf = d.getElementById('apiKey');
    if (kf) { kf.value = localStorage.getItem(cfg.keyStore) || cfg.default || ''; kf.placeholder = cfg.placeholder; }
    var gk = d.getElementById('getKeyLink');
    if (gk) { gk.href = cfg.keyUrl; gk.textContent = 'Get your ' + cfg.name + ' key →'; }
  }

  // Wire #provider + #apiKey + #model listeners + initial fill. Call once on load.
  function initProviderUI() {
    var d = document, ps = d.getElementById('provider');
    if (ps) {
      ps.value = providerId();
      ps.addEventListener('change', function (e) { localStorage.setItem(PROVIDER_STORE, e.target.value); applyProvider(); });
    }
    applyProvider();
    var kf = d.getElementById('apiKey');
    if (kf) kf.addEventListener('input', function (e) { localStorage.setItem(current().keyStore, e.target.value.trim()); });
    var ms = d.getElementById('model');
    if (ms) ms.addEventListener('change', function (e) { localStorage.setItem(modelStoreKey(providerId()), e.target.value); });
  }

  // Provider-aware SSE streaming. opts: {key, model, system, userMessage, signal, onDelta(acc)}.
  // Returns the full accumulated text.
  async function stream(opts) {
    var prov = current(), req = prov.buildReq(opts);
    var res = await fetch(req.url, { method: 'POST', headers: req.headers, body: JSON.stringify(req.body), signal: opts.signal });
    if (!res.ok) throw new Error(parseApiError(await res.text(), res.status));
    var reader = res.body.getReader(), dec = new TextDecoder(), buf = '', acc = '';
    while (true) {
      var r = await reader.read();
      if (r.done) break;
      buf += dec.decode(r.value, { stream: true });
      var lines = buf.split('\n'); buf = lines.pop();
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.indexOf('data:') !== 0) continue;
        var payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        var evt; try { evt = JSON.parse(payload); } catch (_) { continue; }
        var t = prov.delta(evt);
        if (t) { acc += t; if (opts.onDelta) opts.onDelta(acc); }
        else { var er = prov.errOf(evt); if (er) throw new Error(er); }
      }
    }
    return acc;
  }

  g.PMProviders = {
    PROVIDERS: PROVIDERS, providerId: providerId, current: current, modelStoreKey: modelStoreKey,
    applyProvider: applyProvider, initProviderUI: initProviderUI, stream: stream, parseApiError: parseApiError,
  };
})(window);
