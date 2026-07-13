// PM Skills — Watch-me-work Coach (content script).
// As you type in a doc / issue / email, it quietly matches what you're drafting
// to the best-fit professional skill and offers a one-click nudge. Everything is
// local: the text you type never leaves your browser — only a suggestion appears.
(function () {
  'use strict';
  var PLAYGROUND = 'https://mohitagw15856.github.io/pm-claude-skills';
  var SKILLS = [];
  var lastSuggested = '';
  var dismissed = {}; // per-page-session: don't re-nag a dismissed skill

  // Load the bundled skill index (name/title/summary/bundle).
  try {
    fetch(chrome.runtime.getURL('coach-skills.json'))
      .then(function (r) { return r.json(); })
      .then(function (d) { SKILLS = d || []; })
      .catch(function () {});
  } catch (e) { /* not in an extension context */ }

  var STOP = new Set(('the a an and or to of in for on with your you we it this that is are be as at by from will can our their they i').split(' '));
  function keywords(text) {
    var words = (text.toLowerCase().match(/[a-z][a-z-]{2,}/g) || []).filter(function (w) { return !STOP.has(w); });
    var freq = {};
    for (var i = 0; i < words.length; i++) freq[words[i]] = (freq[words[i]] || 0) + 1;
    return freq;
  }

  function bestSkill(text) {
    if (!SKILLS.length || text.length < 120) return null;
    var freq = keywords(text.slice(0, 4000));
    var best = null, bestScore = 0;
    for (var i = 0; i < SKILLS.length; i++) {
      var s = SKILLS[i];
      var hay = (s.n + ' ' + s.t + ' ' + s.s + ' ' + s.p).toLowerCase();
      var score = 0;
      for (var w in freq) {
        if (hay.indexOf(w) !== -1) score += (s.n.indexOf(w) !== -1 ? 3 : 1) * Math.min(freq[w], 3);
      }
      if (score > bestScore) { bestScore = score; best = s; }
    }
    // Require a real signal so the nudge stays rare and welcome.
    return bestScore >= 6 ? best : null;
  }

  function chip() {
    var c = document.getElementById('pm-coach-chip');
    if (c) return c;
    c = document.createElement('div');
    c.id = 'pm-coach-chip';
    c.hidden = true;
    c.innerHTML = '<span class="pm-coach-emoji">💡</span><span class="pm-coach-text"></span>' +
      '<a class="pm-coach-run" target="_blank" rel="noopener">Run →</a>' +
      '<button class="pm-coach-x" title="Dismiss" aria-label="Dismiss">×</button>';
    (document.body || document.documentElement).appendChild(c);
    c.querySelector('.pm-coach-x').addEventListener('click', function () {
      c.hidden = true;
      if (c.dataset.skill) dismissed[c.dataset.skill] = true;
    });
    return c;
  }

  function suggest(text) {
    var s = bestSkill(text);
    if (!s || s.n === lastSuggested || dismissed[s.n]) { if (!s) hide(); return; }
    lastSuggested = s.n;
    var c = chip();
    c.dataset.skill = s.n;
    c.querySelector('.pm-coach-text').textContent = 'Drafting this? Try the ' + s.t + ' skill';
    c.querySelector('.pm-coach-run').href = PLAYGROUND + '/?skill=' + encodeURIComponent(s.n);
    c.hidden = false;
  }
  function hide() { var c = document.getElementById('pm-coach-chip'); if (c) c.hidden = true; }

  function editableText(node) {
    if (!node) return '';
    if (node.tagName === 'TEXTAREA' || (node.tagName === 'INPUT' && node.type === 'text')) return node.value || '';
    if (node.isContentEditable || node.getAttribute('role') === 'textbox') return node.innerText || '';
    return '';
  }

  var timer = null;
  function onActivity(e) {
    var text = editableText(e.target);
    if (!text) return;
    clearTimeout(timer);
    // Wait for a pause in typing so the nudge appears when you stop to think.
    timer = setTimeout(function () { suggest(text); }, 2500);
  }
  document.addEventListener('input', onActivity, true);
  document.addEventListener('focusin', function (e) { if (!editableText(e.target)) hide(); }, true);
})();
