// The local-first workspace — File System Access bridge. Point the web tools at
// a REAL folder on disk, and artifacts stop living in localStorage: Firm minutes
// land in firm-minutes/, Boardroom verdicts and attestations in boardroom/,
// predictions in brain/predictions/. Point Claude Code at the SAME folder and
// the two front doors become one product (/firm reads what the web wrote).
//
// Chromium-only (File System Access API); everything feature-detects and the
// UI hides itself elsewhere. The directory handle persists in IndexedDB, so
// "connect once" survives reloads (the browser re-prompts for permission).
(function (g) {
  'use strict';
  var supported = 'showDirectoryPicker' in g;
  var handle = null;

  // ── Handle persistence (IndexedDB — localStorage can't hold handles) ────────
  function idb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open('pm_workspace', 1);
      r.onupgradeneeded = function () { r.result.createObjectStore('kv'); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function idbSet(k, v) {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var tx = db.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(v, k);
        tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
      });
    });
  }
  function idbGet(k) {
    return idb().then(function (db) {
      return new Promise(function (res, rej) {
        var rq = db.transaction('kv').objectStore('kv').get(k);
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { rej(rq.error); };
      });
    });
  }

  async function connect() {
    if (!supported) return null;
    handle = await g.showDirectoryPicker({ mode: 'readwrite' });
    await idbSet('dir', handle);
    return handle.name;
  }
  async function restore() {
    if (!supported) return null;
    try {
      var h = await idbGet('dir');
      if (!h) return null;
      // Permission may need re-granting after a browser restart; query silently.
      var perm = await h.queryPermission({ mode: 'readwrite' });
      if (perm === 'granted') { handle = h; return h.name; }
      return { name: h.name, needsGrant: true, grant: async function () {
        if (await h.requestPermission({ mode: 'readwrite' }) === 'granted') { handle = h; return h.name; }
        return null;
      } };
    } catch (e) { return null; }
  }
  function connected() { return !!handle; }
  function disconnect() { handle = null; idbSet('dir', null); }

  // ── Write a file at a relative path, creating directories ───────────────────
  async function write(relPath, content) {
    if (!handle) throw new Error('No workspace connected');
    var parts = relPath.split('/').filter(Boolean);
    var dir = handle;
    for (var i = 0; i < parts.length - 1; i++) dir = await dir.getDirectoryHandle(parts[i], { create: true });
    var file = await dir.getFileHandle(parts[parts.length - 1], { create: true });
    var w = await file.createWritable();
    await w.write(content);
    await w.close();
    return relPath;
  }
  async function read(relPath) {
    if (!handle) throw new Error('No workspace connected');
    var parts = relPath.split('/').filter(Boolean);
    var dir = handle;
    for (var i = 0; i < parts.length - 1; i++) dir = await dir.getDirectoryHandle(parts[i]);
    var f = await (await dir.getFileHandle(parts[parts.length - 1])).getFile();
    return f.text();
  }

  // ── The standard UI chip: connect / connected-as / grant ───────────────────
  // Pages call PMWorkspace.chip(container, onChange?) and get a self-managing control.
  async function chip(el, onChange) {
    if (!el) return;
    if (!supported) { el.hidden = true; return; }
    function render(state, extra) {
      el.hidden = false;
      el.style.cssText = 'display:inline-flex;align-items:center;gap:6px;font-size:12px;padding:5px 11px;border-radius:999px;border:1px solid var(--border,#2a313c);background:var(--panel,#161a21);color:var(--muted,#95a0b0);cursor:pointer;';
      if (state === 'connected') {
        el.innerHTML = '🗂 <b style="color:var(--text,#e7ebf0)">' + extra + '</b> · disconnect';
        el.title = 'Artifacts save into this folder on disk — point Claude Code at the same folder and /firm reads them. Click to disconnect.';
        el.onclick = function () { disconnect(); render('off'); if (onChange) onChange(false); };
      } else if (state === 'grant') {
        el.innerHTML = '🗂 ' + extra.name + ' · <b style="color:var(--accent,#d97757)">re-allow</b>';
        el.title = 'The browser needs permission again after restart.';
        el.onclick = async function () { if (await extra.grant()) { render('connected', extra.name); if (onChange) onChange(true); } };
      } else {
        el.innerHTML = '🗂 Connect a folder';
        el.title = 'Local-first: save minutes, verdicts & predictions into a real folder — the same one Claude Code uses.';
        el.onclick = async function () {
          try { var n = await connect(); if (n) { render('connected', n); if (onChange) onChange(true); if (g.pmTrack) g.pmTrack('workspace/connect'); } }
          catch (e) { /* user cancelled */ }
        };
      }
    }
    var r = await restore();
    if (r && typeof r === 'string') render('connected', r);
    else if (r && r.needsGrant) render('grant', r);
    else render('off');
  }

  var slug = function (s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'untitled'; };
  var today = function () { return new Date().toISOString().slice(0, 10); };

  g.PMWorkspace = { supported: supported, connect: connect, restore: restore, connected: connected,
    disconnect: disconnect, write: write, read: read, chip: chip, slug: slug, today: today };
})(window);
