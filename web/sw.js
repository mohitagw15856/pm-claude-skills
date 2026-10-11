// PM Skills service worker — offline for everything that doesn't need a model.
// Strategy: precache the no-API core (Handbook, Academy, Campaign, Wrapped,
// Reckoning, Charter, shell assets); runtime-cache other same-origin GETs,
// network-first with cache fallback. NEVER touches other origins (API/CDN
// requests pass straight through, and the trial endpoint is never cached).
// The cache name carries the deploy's commit (deploy-playground.yml replaces the
// placeholder), so every deploy installs a fresh cache and drops the old one.
const BUILD = '__PM_BUILD__';
const V = 'pm-skills-' + (BUILD.startsWith('__') ? 'dev' : BUILD);
const CORE = [
  './', './index.html', './styles.css', './nav.js', './i18n.js', './app.js', './providers.js',
  './find.html', './listen.html', './offline.html', './capture.html',
  './handbook.html', './academy.html', './campaign.html', './wrapped.html',
  './reckoning.html', './charter.html', './daily.html', './export-doc.js',
  './workspace.js', './skills.json', './manifest.json',
  './assets/product-notes.jpg', './assets/icon-192.png', './assets/icon-512.png',
];
self.addEventListener('install', (e) => {
  // Cache what exists; one missing file must not block the whole install.
  e.waitUntil(caches.open(V).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null)))));
});
self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Share target (manifest.json): another app shares a photo or text into the
// installed PWA as a POST. A photo is parked in a cache the capture page reads
// once; text goes to the skill search. Nothing leaves the device here.
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'POST' || u.origin !== location.origin || !u.pathname.endsWith('/share-target')) return;
  e.respondWith((async () => {
    const form = await e.request.formData().catch(() => null);
    const file = form && form.get('file');
    if (file && typeof file === 'object' && /^image\//.test(file.type || '')) {
      const inbox = await caches.open('pm-share-inbox');
      await inbox.put('shared-file', new Response(file, { headers: { 'content-type': file.type } }));
      return Response.redirect('./capture.html?mode=skill&shared=1', 303);
    }
    const text = form ? [form.get('title'), form.get('text'), form.get('url')].filter(Boolean).join(' ').slice(0, 500) : '';
    return Response.redirect('./index.html' + (text ? '?q=' + encodeURIComponent(text) : ''), 303);
  })());
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;   // APIs/CDNs pass through
  e.respondWith(
    fetch(e.request).then((res) => {
      // Skill bodies (skills-body/<bundle>.json) and pages are cached as they are
      // used, so a bundle opened once keeps working offline.
      if (res.ok) { const copy = res.clone(); caches.open(V).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then((hit) => hit
      || (e.request.mode === 'navigate' ? caches.match('./offline.html') : new Response('', { status: 503, statusText: 'Offline' }))))
  );
});

// ── Daily streak reminder (item: PWA retention). periodicSync fires ~daily on
// installed PWAs (Chrome); we show one local notification. No server, no push
// subscription, nothing leaves the device.
self.addEventListener('periodicsync', function (e) {
  if (e.tag !== 'daily-streak') return;
  e.waitUntil(self.registration.showNotification('🔥 Today\'s challenge is up', {
    body: 'One professional task a day — keep the streak, share the grid.',
    icon: 'assets/icon-192.png',
    tag: 'pm-daily',
    data: { url: './daily.html' },
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './daily.html';
  e.waitUntil(clients.matchAll({ type: 'window' }).then(function (list) {
    for (var i = 0; i < list.length; i++) if ('focus' in list[i]) { list[i].navigate(url); return list[i].focus(); }
    return clients.openWindow(url);
  }));
});
