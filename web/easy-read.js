// Easy Read: the web counterpart of the Claude Code output style
// output-styles/plain-language.md. The same facts in plain language, for second-language speakers,
// people who find reading hard, and anyone in a hurry. One instruction layer,
// shared by the playground and the "How do I" page; no model of its own.
(function (g) {
  var KEY = 'pm-easy-read';
  var INSTRUCTION = '\n\n## Easy Read\nWrite the whole response in Easy Read (about CEFR A2, a reading age of 9 to 11):\n' +
    '- Start with the one thing to do first, in bold.\n' +
    '- Short sentences, at most 15 words, one idea each. Everyday words.\n' +
    '- If you must use a technical word, explain it in brackets the first time.\n' +
    '- Numbered steps for anything to do; short headings; no tables wider than 3 columns.\n' +
    '- No idioms, no sarcasm, no abbreviations without the full words.\n' +
    '- Keep every fact, number, date and warning from the full version. Simplify the language, never the content.';
  function on() { try { return localStorage.getItem(KEY) === '1' || new URLSearchParams(location.search).get('easy') === '1'; } catch (e) { return false; } }
  function set(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }
  // Wire a checkbox: reflects and saves the setting.
  function bind(box) { if (!box) return; box.checked = on(); box.addEventListener('change', function () { set(box.checked); }); }
  g.PMEasyRead = { on: on, set: set, bind: bind, instruction: function () { return on() ? INSTRUCTION : ''; } };
})(window);
