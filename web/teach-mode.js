// Teach, don't tell: the skill coaches the person through the method so they can
// do it themselves next time, instead of handing over a finished document. One
// instruction layer for the playground and the "How do I" page; no model of its own.
(function (g) {
  var KEY = 'pm-teach-mode';
  var INSTRUCTION = '\n\n## Teach mode\nThe user wants to learn to do this themselves, not to receive a finished document. Coach them through this skill\'s method instead:\n' +
    '1. In two or three sentences, say what a good result looks like and why.\n' +
    '2. Go through the method step by step. For each step: what it is and why it matters, a short worked example using THEIR situation, then a "Your turn:" prompt asking them to do that step, with one hint.\n' +
    '3. Name the two most common mistakes at the step where they happen.\n' +
    '4. End with a self-check list (from the skill\'s quality checks) they can tick against their own draft, and offer to review their draft if they paste it.\n' +
    'Do not write the full deliverable for them. Keep the same facts, cautions and not-advice lines as the skill.';
  function on() { try { return localStorage.getItem(KEY) === '1' || new URLSearchParams(location.search).get('teach') === '1'; } catch (e) { return false; } }
  function set(v) { try { localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) {} }
  function bind(box) { if (!box) return; box.checked = on(); box.addEventListener('change', function () { set(box.checked); }); }
  g.PMTeachMode = { on: on, set: set, bind: bind, instruction: function () { return on() ? INSTRUCTION : ''; } };
})(window);
