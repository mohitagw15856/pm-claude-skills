// Search in the visitor's language: the translated skill descriptions
// (web/i18n-desc/, built by scripts/build-i18n-desc.mjs) are added to what the
// search pages match against. The language is the first of the browser's
// languages that has descriptions, or the one chosen in a page's picker.
(function (g) {
  var cache = {};
  function pick(available, wanted) {
    var prefs = (wanted ? [wanted] : []).concat(navigator.languages || [navigator.language || 'en']);
    for (var i = 0; i < prefs.length; i++) {
      var p = String(prefs[i] || '');
      if (/^zh-(TW|HK|Hant)/i.test(p) && available['zh-TW']) return 'zh-TW';
      var base = p.split('-')[0].toLowerCase();
      if (available[p]) return p;
      if (available[base]) return base;
      if (base === 'en') return null;
    }
    return null;
  }
  // {name: description} in the visitor's language, or {} when there is none.
  function load(wanted) {
    return fetch('i18n-desc/index.json').then(function (r) { return r.ok ? r.json() : { languages: {} }; }).then(function (idx) {
      var lang = pick(idx.languages || {}, wanted);
      if (!lang) return { lang: null, descriptions: {}, languages: idx.languages || {} };
      if (cache[lang]) return { lang: lang, descriptions: cache[lang], languages: idx.languages };
      return fetch('i18n-desc/' + lang + '.json').then(function (r) { return r.ok ? r.json() : {}; }).then(function (d) { cache[lang] = d; return { lang: lang, descriptions: d, languages: idx.languages }; });
    }).catch(function () { return { lang: null, descriptions: {}, languages: {} }; });
  }
  // Words in any script: letters, combining marks (Devanagari, Bengali, Arabic
  // vowel signs) and digits; Han and Thai have no spaces, so they are split into
  // overlapping two-character pairs.
  function tokens(s, stop) {
    var low = String(s || '').toLowerCase();
    var words = (low.match(/[\p{L}\p{M}\p{N}]+/gu) || []).filter(function (w) { return !/[㐀-鿿฀-๿]/.test(w) && w.length > 2 && !(stop && stop.has(w)); });
    var pairs = (low.match(/[㐀-鿿]+|[฀-๿]+/g) || []).reduce(function (a, run) { for (var i = 0; i < run.length - 1; i++) a.push(run[i] + run[i + 1]); return a; }, []);
    return words.concat(pairs);
  }
  g.PMi18nDesc = { load: load, tokens: tokens };
})(window);
