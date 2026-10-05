// PM Skills task pane for Word (Office add-in) and WPS (WPS 加载项), and a plain
// browser page when neither host is present. Reads the site's own skill index and
// per-bundle skill bodies, so nothing is fetched from GitHub.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var STORE = 'pm-office-';
  var index = [], bodies = {}, lastResult = '';
  var host = 'browser';

  function status(t) { $('status').textContent = t; }
  function save(k, v) { try { localStorage.setItem(STORE + k, v); } catch (e) { /* storage off */ } }
  function load(k) { try { return localStorage.getItem(STORE + k) || ''; } catch (e) { return ''; } }

  // ── Host adapters ──────────────────────────────────────────────────────────
  function wpsApp() { return window.wps && typeof window.wps.WpsApplication === 'function' ? window.wps.WpsApplication() : null; }
  function getSelection() {
    if (host === 'word') {
      return Word.run(function (ctx) {
        var sel = ctx.document.getSelection();
        sel.load('text');
        return ctx.sync().then(function () { return sel.text || ''; });
      });
    }
    if (host === 'wps') {
      var app = wpsApp();
      return Promise.resolve(app && app.Selection ? String(app.Selection.Text || '') : '');
    }
    return Promise.resolve('');
  }
  function insert(text) {
    if (host === 'word') {
      return Word.run(function (ctx) {
        ctx.document.getSelection().insertText('\n' + text, 'After');
        return ctx.sync();
      }).then(function () { status('Inserted. 已插入。'); });
    }
    if (host === 'wps') {
      var app = wpsApp();
      if (app && app.Selection) { app.Selection.InsertAfter('\n' + text); status('Inserted. 已插入。'); return Promise.resolve(); }
    }
    return (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
      .then(function () { status('Copied to the clipboard; paste it into your document. 已复制，请粘贴到文档中。'); })
      .catch(function () { $('out').hidden = false; $('out').textContent = text; status('Select the text below and copy it. 请手动复制下面的文字。'); });
  }

  // ── Skills ─────────────────────────────────────────────────────────────────
  function fillSkills() {
    var q = $('q').value.trim().toLowerCase();
    var list = index.filter(function (s) {
      if (!q) return true;
      return (s.name + ' ' + (s.title || '') + ' ' + (s.summary || s.description || '')).toLowerCase().indexOf(q) !== -1;
    }).slice(0, 200);
    $('skill').innerHTML = list.map(function (s) {
      return '<option value="' + s.name + '">' + String(s.title || s.name).replace(/[<>&"]/g, '') + '</option>';
    }).join('');
    var saved = load('skill');
    if (saved && list.some(function (s) { return s.name === saved; })) $('skill').value = saved;
  }
  function skillBody(name) {
    if (!NAME.test(name)) return Promise.reject(new Error('bad name'));
    var s = index.find(function (x) { return x.name === name; });
    var bundle = (s && s.plugin) || 'other';
    if (!/^[a-z0-9-]+$/.test(bundle)) return Promise.reject(new Error('bad bundle'));
    if (bodies[bundle]) return Promise.resolve(bodies[bundle][name] || '');
    return fetch('../skills-body/' + encodeURIComponent(bundle) + '.json').then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (j) { bodies[bundle] = j; return j[name] || ''; });
  }
  // The output template: the "Output" section (and any template headings inside it).
  function template(body) {
    var lines = body.split('\n'), out = [], on = false, fence = false;
    for (var i = 0; i < lines.length; i++) {
      var l = lines[i];
      if (/^```/.test(l)) fence = !fence;
      if (!fence && /^## /.test(l)) {
        if (/^## (output|format|structure|template)/i.test(l)) { on = true; continue; }
        if (/^## (quality checks?|anti-patterns?|example|required inputs|framework)/i.test(l)) on = false;
      }
      if (on) out.push(l);
    }
    var t = out.join('\n').trim();
    return t || body;
  }

  // ── Model run ──────────────────────────────────────────────────────────────
  function run() {
    var base = $('base').value.trim().replace(/\/+$/, ''), model = $('model').value.trim(), key = $('key').value.trim();
    if (!/^https?:\/\//.test(base) || !model) { status('Enter an endpoint and a model first. 请先填写接口地址和模型。'); return; }
    save('base', base); save('model', model); if (key) save('key', key);
    var name = $('skill').value;
    status('Running… 运行中…');
    Promise.all([skillBody(name), getSelection()]).then(function (r) {
      var input = [r[1], $('extra').value.trim()].filter(Boolean).join('\n\n');
      if (!input) throw new Error('Select some text in the document or add a note first. 请先选中文字或填写补充说明。');
      return fetch(base + '/chat/completions', {
        method: 'POST',
        headers: Object.assign({ 'content-type': 'application/json' }, key ? { authorization: 'Bearer ' + key } : {}),
        body: JSON.stringify({ model: model, messages: [{ role: 'system', content: r[0] }, { role: 'user', content: input }] }),
      });
    }).then(function (res) {
      return res.json().then(function (j) {
        if (!res.ok) throw new Error((j.error && j.error.message) || ('HTTP ' + res.status));
        return (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || '';
      });
    }).then(function (text) {
      lastResult = text;
      $('out').hidden = false; $('out').textContent = text;
      $('insertOut').disabled = !text;
      status(text ? 'Done. Review it before inserting. 完成，插入前请检查。' : 'The model returned nothing. 模型没有返回内容。');
    }).catch(function (e) { status('Error: ' + e.message); });
  }

  // ── Wiring ─────────────────────────────────────────────────────────────────
  $('q').addEventListener('input', fillSkills);
  $('skill').addEventListener('change', function () { save('skill', $('skill').value); });
  $('preset').addEventListener('change', function () {
    var v = $('preset').value.split('|');
    if (v[0]) { $('base').value = v[0]; $('model').value = v[1] || ''; }
  });
  $('insertTemplate').addEventListener('click', function () {
    skillBody($('skill').value).then(function (b) { return insert(template(b)); }).catch(function (e) { status('Error: ' + e.message); });
  });
  $('insertSkill').addEventListener('click', function () {
    skillBody($('skill').value).then(insert).catch(function (e) { status('Error: ' + e.message); });
  });
  $('run').addEventListener('click', run);
  $('insertOut').addEventListener('click', function () { if (lastResult) insert(lastResult); });
  $('base').value = load('base'); $('model').value = load('model'); $('key').value = load('key');

  function start() {
    $('host').textContent = host === 'word' ? 'Running in Word. 在 Word 中运行。' : host === 'wps' ? 'Running in WPS. 在 WPS 中运行。' : 'Not inside Word or WPS: results are copied to the clipboard. 不在 Word 或 WPS 中，结果会复制到剪贴板。';
    fetch('../skills-index.json').then(function (r) { return r.json(); }).then(function (j) {
      index = (j.skills || []).filter(function (s) { return !s.deprecated; });
      fillSkills();
      status(index.length + ' skills loaded. 已加载 ' + index.length + ' 个技能。');
    }).catch(function () { status('Could not load the skill list. 无法加载技能列表。'); });
  }
  if (wpsApp()) { host = 'wps'; start(); }
  else if (window.Office && Office.onReady) {
    Office.onReady(function (info) { if (info && info.host === Office.HostType.Word) host = 'word'; start(); });
  } else start();
})();
