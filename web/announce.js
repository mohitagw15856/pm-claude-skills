// The one current announcement, shown as a slim bar at the top of the page.
// Reads announcement.json (a copy of announcements/current.json, same origin,
// no third party). Text is set with textContent, never as markup. Dismissing
// it is remembered per announcement id, in this browser only.
(function () {
  var KEY = 'pm_announce_dismissed';
  var LABEL = { info: 'Notice', change: 'Changed', action: 'Action needed' };

  function dismissed(id) {
    try { return localStorage.getItem(KEY) === id; } catch (e) { return false; }
  }
  function remember(id) {
    try { localStorage.setItem(KEY, id); } catch (e) {}
  }
  function usable(a, today) {
    return a && typeof a.id === 'string' && typeof a.title === 'string' && typeof a.body === 'string' &&
      typeof a.from === 'string' && typeof a.until === 'string' && a.from <= today && today <= a.until;
  }

  function css() {
    if (document.getElementById('pm-announce-css')) return;
    var st = document.createElement('style');
    st.id = 'pm-announce-css';
    st.textContent = [
      '.pm-announce{display:flex;gap:12px;align-items:flex-start;justify-content:center;padding:10px 16px;',
      'background:var(--panel,#161a21);color:var(--text,#e7ebf0);border-bottom:1px solid var(--accent,#d97757);font-size:14px;line-height:1.45}',
      '.pm-announce p{margin:0;max-width:72ch}',
      '.pm-announce strong{color:var(--accent-2,#e89b82)}',
      '.pm-announce a{color:inherit;text-decoration:underline}',
      '.pm-announce button{flex:none;background:none;border:1px solid var(--border,#2a313c);color:inherit;',
      'border-radius:8px;padding:2px 10px;font:inherit;cursor:pointer;min-height:28px}',
      '.pm-announce button:focus-visible,.pm-announce a:focus-visible{outline:2px solid var(--accent,#d97757);outline-offset:2px}',
      'html[data-theme="light"] .pm-announce{background:#fff;color:#1a1d23}',
      'html[data-theme="light"] .pm-announce strong{color:#a8452a}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  function render(a) {
    css();
    var bar = document.createElement('div');
    bar.className = 'pm-announce';
    bar.setAttribute('role', 'status');

    var p = document.createElement('p');
    var strong = document.createElement('strong');
    strong.textContent = (LABEL[a.level] || LABEL.info) + ': ' + a.title + '. ';
    p.appendChild(strong);
    p.appendChild(document.createTextNode(a.body + ' '));
    if (typeof a.url === 'string' && /^https:\/\//.test(a.url)) {
      var link = document.createElement('a');
      link.href = a.url;
      link.rel = 'noopener';
      link.textContent = 'Read more';
      p.appendChild(link);
    }

    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Dismiss';
    close.setAttribute('aria-label', 'Dismiss this announcement');
    close.addEventListener('click', function () { remember(a.id); bar.remove(); });

    bar.appendChild(p);
    bar.appendChild(close);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function start() {
    if (typeof fetch !== 'function') return;
    fetch('announcement.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (doc) {
        var a = doc && doc.schemaVersion === 1 ? doc.announcement : null;
        var today = new Date().toISOString().slice(0, 10);
        if (usable(a, today) && !dismissed(a.id)) render(a);
      })
      .catch(function () {});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
