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
      models: [['claude-fable-5', 'Fable 5 ✨ (newest)'], ['claude-opus-4-8', 'Opus 4.8'], ['claude-sonnet-4-6', 'Sonnet 4.6'], ['claude-haiku-4-5-20251001', 'Haiku 4.5']],
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
      name: 'Gemini', keyStore: 'gemini_api_key', free: true,
      placeholder: 'AIza… (free Google AI Studio key — no credit card)', keyUrl: 'https://aistudio.google.com/apikey',
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

  // In-browser model — zero key, zero cost, fully private. Runs via WebLLM on WebGPU.
  // The model weights download once (cached by the browser); generation never leaves the device.
  PROVIDERS.webllm = {
    name: 'In-browser', keyStore: 'pm_webllm_noop', local: true,
    placeholder: '(no key needed — the model runs in your browser)', keyUrl: 'https://github.com/mlc-ai/web-llm',
    models: [
      ['Qwen2.5-1.5B-Instruct-q4f16_1-MLC', 'Qwen2.5 1.5B · fastest (~1GB)'],
      ['Llama-3.2-3B-Instruct-q4f16_1-MLC', 'Llama 3.2 3B (~2GB)'],
      ['Phi-3.5-mini-instruct-q4f16_1-MLC', 'Phi-3.5 mini (~2.5GB)'],
    ],
    // buildReq/delta/errOf are unused — stream() routes local providers to streamLocal().
  };

  // Sponsored "try Claude free, no key" — calls the hosted Worker's capped /try endpoint
  // (the owner pays, hard-limited). No key from the user. Only usable when the deployment
  // has it enabled; the UI hides it otherwise. Non-streaming (the proxy returns full text).
  var TRY_ENDPOINT = 'https://pm-skills-mcp.pm-claude-skills.workers.dev/try';
  PROVIDERS.tryclaude = {
    name: 'Claude (free trial)', keyStore: 'pm_try_noop', local: true, proxy: true, free: true,
    placeholder: '(no key — a few free Claude runs, on the house)', keyUrl: 'https://mohitagw15856.github.io/pm-claude-skills/',
    models: [['claude-haiku', 'Claude Haiku (free trial)']],
  };
  async function streamTry(opts) {
    var res = await fetch(TRY_ENDPOINT, {
      method: 'POST', headers: { 'content-type': 'application/json' }, signal: opts.signal,
      body: JSON.stringify({ system: opts.system || '', prompt: opts.userMessage || '' }),
    });
    var data = await res.json().catch(function () { return {}; });
    if (!res.ok) throw new Error(data.message || 'Free Claude trial unavailable — use a free Gemini key or your own key.');
    var text = data.text || '';
    if (opts.onDelta) opts.onDelta(text);
    return text;
  }
  // Probe whether the free trial is live on this deployment (so the UI can show/hide it).
  var _tryEnabled = null;
  async function tryEnabled() {
    if (_tryEnabled !== null) return _tryEnabled;
    try { var r = await fetch(TRY_ENDPOINT, { method: 'GET' }); var j = await r.json(); _tryEnabled = !!j.enabled; }
    catch (_) { _tryEnabled = false; }
    return _tryEnabled;
  }

  // Lazy WebLLM engine (loaded only when someone actually picks the in-browser provider).
  var _engine = null, _engineModel = null;
  async function getEngine(model, onProgress) {
    if (!('gpu' in navigator)) throw new Error('Your browser has no WebGPU. Use Chrome or Edge 113+ (desktop), or switch to the free Gemini key.');
    if (_engine && _engineModel === model) return _engine;
    var webllm = await import('https://esm.run/@mlc-ai/web-llm');
    if (_engine) { try { await _engine.unload(); } catch (_) {} }
    _engine = await webllm.CreateMLCEngine(model, { initProgressCallback: onProgress });
    _engineModel = model;
    return _engine;
  }
  async function streamLocal(opts) {
    var engine = await getEngine(opts.model, function (r) { if (opts.onProgress) opts.onProgress(r); });
    if (opts.signal && opts.signal.aborted) return '';
    // Stop the moment the user hits Stop — interrupt generation immediately, don't wait for the next token.
    if (opts.signal) opts.signal.addEventListener('abort', function () { try { engine.interruptGenerate(); } catch (_) {} }, { once: true });
    var messages = [];
    if (opts.system) messages.push({ role: 'system', content: opts.system });
    messages.push({ role: 'user', content: opts.userMessage });
    var chunks = await engine.chat.completions.create({ messages: messages, stream: true, max_tokens: 4096 });
    var acc = '';
    for await (var chunk of chunks) {
      if (opts.signal && opts.signal.aborted) { try { engine.interruptGenerate(); } catch (_) {} break; }
      var t = (chunk.choices && chunk.choices[0] && chunk.choices[0].delta && chunk.choices[0].delta.content) || '';
      if (t) { acc += t; if (opts.onDelta) opts.onDelta(acc); }
    }
    return acc;
  }

  // New visitors default to the free, no-credit-card path (Gemini). Anyone who has already
  // chosen a provider keeps their choice.
  function providerId() { var p = localStorage.getItem(PROVIDER_STORE); return PROVIDERS[p] ? p : 'gemini'; }
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
    if (kf) {
      kf.value = cfg.local ? '' : (localStorage.getItem(cfg.keyStore) || cfg.default || '');
      kf.placeholder = cfg.placeholder;
      kf.disabled = !!cfg.local; // in-browser model needs no key
      var fieldWrap = kf.closest('.key-field');
      if (fieldWrap) fieldWrap.style.opacity = cfg.local ? '.5' : '';
    }
    var gk = d.getElementById('getKeyLink');
    if (gk) {
      gk.href = cfg.keyUrl;
      gk.textContent = cfg.local ? 'Runs in your browser — no key, no cost →'
        : cfg.free ? 'Get a FREE ' + cfg.name + ' key (no credit card) →'
        : 'Get your ' + cfg.name + ' key →';
    }
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
    // The free-Claude-trial option only makes sense when the deployment has it enabled —
    // remove it otherwise (and fall back if it was the saved choice).
    if (ps) {
      var opt = ps.querySelector('option[value="tryclaude"]');
      if (opt) tryEnabled().then(function (on) {
        if (!on) { opt.remove(); if (providerId() === 'tryclaude') { localStorage.setItem(PROVIDER_STORE, 'gemini'); ps.value = 'gemini'; applyProvider(); } }
      });
    }
  }

  // Provider-aware SSE streaming. opts: {key, model, system, userMessage, signal, onDelta(acc)}.
  // Returns the full accumulated text.
  async function stream(opts) {
    var prov = current();
    if (prov.proxy) return streamTry(opts);
    if (prov.local) return streamLocal(opts);
    var req = prov.buildReq(opts);
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
