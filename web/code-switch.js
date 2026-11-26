// Mixed-language questions (Hinglish, Taglish, Spanglish): widen a search with the
// English words skills are described in. "mera landlord deposit wapas nahi de raha"
// also searches "refund back". Data: web/code-switch.json. No model involved.
(function (g) {
  var MAP = null;
  var ready = fetch('code-switch.json').then(function (r) { return r.ok ? r.json() : {}; }).then(function (j) {
    MAP = {};
    Object.keys(j).forEach(function (lang) { if (lang.charAt(0) !== '_') Object.keys(j[lang]).forEach(function (w) { MAP[w] = (MAP[w] ? MAP[w] + ' ' : '') + j[lang][w]; }); });
  }).catch(function () { MAP = {}; });
  // The question plus English equivalents of any mixed-in words it contains.
  function expand(q) {
    if (!MAP) return q;
    var extra = (String(q).toLowerCase().match(/[\p{L}-]+/gu) || []).map(function (w) { return MAP[w] || ''; }).filter(Boolean);
    return extra.length ? q + ' ' + extra.join(' ') : q;
  }
  // True when the question mixes in words from the map (so answers can reply in kind).
  function mixed(q) { return !!MAP && (String(q).toLowerCase().match(/[\p{L}-]+/gu) || []).some(function (w) { return !!MAP[w]; }); }
  g.PMCodeSwitch = { ready: ready, expand: expand, mixed: mixed };
})(window);
