// ⚔️ Duels — challenge links. After a run, the EXACT scenario (the Gym's hidden
// world, the Panel's candidate + archetype) plus your score is gzip-compressed
// into a URL fragment. Your challenger faces the identical setup and gets a
// side-by-side scorecard at the end. No server: the link IS the duel.
//
// Honour note, stated plainly: the state travels in the link, so a determined
// challenger could decode it. Duels run on honour — like every good game.
(function (g) {
  'use strict';

  async function gz(str) {
    var cs = new CompressionStream('gzip');
    var blob = new Blob([new TextEncoder().encode(str)]).stream().pipeThrough(cs);
    var buf = new Uint8Array(await new Response(blob).arrayBuffer());
    var s = ''; for (var i = 0; i < buf.length; i++) s += String.fromCharCode(buf[i]);
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  async function gunz(b64) {
    var s = atob(b64.replace(/-/g, '+').replace(/_/g, '/'));
    var buf = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) buf[i] = s.charCodeAt(i);
    var ds = new DecompressionStream('gzip');
    var blob = new Blob([buf]).stream().pipeThrough(ds);
    return new Response(blob).text();
  }

  // Build a challenge link from a payload ({k:'gym'|'panel', ...state, score, name}).
  async function make(payload) {
    var enc = await gz(JSON.stringify(payload));
    if (enc.length > 24000) throw new Error('This session is too large to fit in a duel link.');
    return location.origin + location.pathname + '#duel=' + enc;
  }
  // Read a challenge from the current URL (null if none / corrupt).
  async function read() {
    var m = (location.hash || '').match(/#duel=([A-Za-z0-9_-]+)/);
    if (!m) return null;
    try { return JSON.parse(await gunz(m[1])); } catch (e) { return null; }
  }

  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // The banner shown to a challenger on load.
  function banner(container, duel, line) {
    if (!container) return;
    container.hidden = false;
    container.style.cssText = 'border:1.5px solid var(--accent);border-radius:13px;background:linear-gradient(90deg,rgba(217,119,87,.12),transparent 70%),var(--panel);padding:13px 16px;margin:12px 0;font-size:13.8px;line-height:1.5;';
    container.innerHTML = '<b>⚔️ You\'ve been challenged' + (duel.name ? ' by ' + esc(duel.name) : '') + '.</b> ' + esc(line) +
      '<div style="font-size:11.5px;color:var(--muted);margin-top:5px">Identical scenario, identical hidden state. Their score to beat: <b style="color:var(--accent)">' + esc(String(duel.score)) + '</b>. Duels run on honour — no peeking at the link\'s insides.</div>';
  }

  // Side-by-side scorecard once the challenger finishes.
  function scorecard(container, duel, myScore, unit) {
    if (!container) return;
    var mine = parseFloat(myScore), theirs = parseFloat(duel.score);
    var verdict = isNaN(mine) || isNaN(theirs) ? '' :
      mine > theirs ? '🏆 <b>You win.</b> Send it back with your score — that\'s how rivalries start.' :
      mine < theirs ? '😤 <b>They hold the crown.</b> Same scenario is one reload away.' :
      '🤝 <b>Dead even.</b> Rematch is mandatory.';
    container.hidden = false;
    container.style.cssText = 'border:1px solid var(--border);border-radius:13px;background:var(--panel);padding:15px 18px;margin:14px 0;';
    container.innerHTML = '<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px">⚔️ Duel result</div>' +
      '<div style="display:flex;gap:20px;align-items:center;justify-content:center;text-align:center">' +
      '<div><div style="font-size:30px;font-weight:800">' + esc(String(duel.score)) + '</div><div style="font-size:12px;color:var(--muted)">' + esc(duel.name || 'Challenger') + '</div></div>' +
      '<div style="font-size:18px;color:var(--muted)">vs</div>' +
      '<div><div style="font-size:30px;font-weight:800;color:var(--accent)">' + esc(String(myScore)) + '</div><div style="font-size:12px;color:var(--muted)">You</div></div></div>' +
      '<div style="text-align:center;margin-top:10px;font-size:13.5px">' + verdict + '</div>';
  }

  // "Challenge a friend" button — builds the link and puts it on the clipboard.
  function challengeButton(container, getPayload) {
    if (!container) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ghost'; b.textContent = '⚔️ Challenge a friend';
    b.title = 'Copy a link that puts them in this EXACT scenario — same hidden state — with your score to beat.';
    b.addEventListener('click', function () {
      Promise.resolve(getPayload()).then(function (payload) {
        if (!payload) return;
        var name = (prompt('Name to show on the challenge (blank = anonymous):', '') || '').trim();
        if (name) payload.name = name.slice(0, 40);
        return make(payload).then(function (url) {
          return navigator.clipboard.writeText(url).then(function () {
            b.textContent = '✅ Challenge link copied — send it';
            setTimeout(function () { b.textContent = '⚔️ Challenge a friend'; }, 4000);
          });
        });
      }).catch(function (e) { b.textContent = '⚠ ' + (e.message || 'failed'); });
      if (g.pmTrack) g.pmTrack('duel/create');
    });
    container.appendChild(b);
  }

  g.PMDuel = { make: make, read: read, banner: banner, scorecard: scorecard, challengeButton: challengeButton };
})(window);
