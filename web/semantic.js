// Smart search: rank skills by meaning, not just shared words. Opt-in, because the
// model is a one-time download (23 MB in English, 118 MB for other languages,
// then cached by the browser). Skill vectors are prebuilt (web/embeddings/, by
// scripts/build-embeddings.mjs); only the visitor's question is embedded, in the
// browser. Nothing is sent anywhere.
(function (g) {
  var TF = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.1/+esm';
  var KEY = 'pm-smart-search';
  var S = { idx: null, vec: null, embed: null, model: null, loading: null };
  function lang() { var l = String((navigator.languages || [navigator.language || 'en'])[0] || 'en').toLowerCase(); return l.indexOf('en') === 0 ? 'en' : 'multi'; }
  function isOn() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function setOn(on) { try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) {} }
  function sizeLabel() { return lang() === 'en' ? '23 MB' : '118 MB'; }
  function load(onProgress) {
    if (S.loading) return S.loading;
    var key = lang();
    S.loading = Promise.all([
      fetch('embeddings/index.json').then(function (r) { return r.json(); }),
      fetch('embeddings/' + key + '.bin').then(function (r) { return r.arrayBuffer(); }),
      import(TF),
    ]).then(function (res) {
      S.idx = res[0]; S.vec = new Int8Array(res[1]); S.model = res[0].models[key];
      return res[2].pipeline('feature-extraction', S.model.id, { dtype: S.model.dtype, progress_callback: onProgress });
    }).then(function (p) { S.embed = p; return true; }).catch(function (e) { S.loading = null; throw e; });
    return S.loading;
  }
  // {skill name: cosine similarity, 0 to 1} for the question.
  function scores(q) {
    return S.embed([S.model.query + q], { pooling: 'mean', normalize: true }).then(function (t) {
      var e = t.tolist()[0], d = S.model.dim, out = {};
      for (var r = 0; r < S.idx.names.length; r++) { var s = 0; for (var c = 0; c < d; c++) s += S.vec[r * d + c] * e[c]; out[S.idx.names[r]] = s / 127; }
      return out;
    });
  }
  g.PMSemantic = { isOn: isOn, setOn: setOn, load: load, scores: scores, sizeLabel: sizeLabel, ready: function () { return !!S.embed; } };
})(window);
