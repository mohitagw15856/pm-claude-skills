#!/usr/bin/env node
// Tells search engines about new and changed pages after a deploy, so the
// Chinese pages reach Baidu, Bing (which also powers Bing China and many
// domestic engines through IndexNow) and Yandex without waiting for a crawl.
//
//   Baidu   POST data.zz.baidu.com/urls with BAIDU_PUSH_TOKEN (百度搜索资源平台 → 普通收录 → API 提交).
//           The site must be verified there first; set the repository variable
//           BAIDU_SITE_VERIFICATION and the deploy adds the meta tag to index.html.
//   IndexNow  POST api.indexnow.org with INDEXNOW_KEY; the deploy publishes the
//           key file at /<key>.txt, which is how IndexNow checks ownership.
//
// Each engine is skipped when its secret is absent. Baidu's quota is small, so
// the Chinese pages go first and the list is capped (BAIDU_LIMIT, default 100).
//
//   node scripts/push-search-engines.mjs [--sitemap web/sitemap.xml] [--dry-run]
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/push-search-engines.mjs [--sitemap web/sitemap.xml] [--dry-run]   (env: BAIDU_PUSH_TOKEN, INDEXNOW_KEY)');
  process.exit(0);
}
const si = argv.indexOf('--sitemap');
const SITEMAP = resolve(root, si !== -1 && argv[si + 1] ? argv[si + 1] : 'web/sitemap.xml');
const DRY = argv.includes('--dry-run');
const SITE = 'https://mohitagw15856.github.io';
const BASE = `${SITE}/pm-claude-skills`;

let xml = '';
if (existsSync(SITEMAP)) xml = readFileSync(SITEMAP, 'utf8');
else {
  try { const r = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(15000) }); if (r.ok) xml = await r.text(); } catch { /* none */ }
}
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()).filter((u) => u.startsWith(BASE));
if (!urls.length) { console.log('No sitemap URLs found; nothing to push.'); process.exit(0); }
// Chinese pages and the hubs first: they matter most for the domestic engines.
const rank = (u) => (u.includes('/zh/') ? 0 : /\/(index\.html)?$|\/live-cards|\/bainian|\/zhufu|\/nianzhong|\/tiaoxiu|\/city-data/.test(u) ? 1 : 2);
const ordered = [...urls].sort((a, b) => rank(a) - rank(b));
let failed = 0;

const baidu = process.env.BAIDU_PUSH_TOKEN;
if (baidu) {
  const limit = Number(process.env.BAIDU_LIMIT || 100);
  const batch = ordered.slice(0, limit);
  if (DRY) console.log(`[dry-run] Baidu: would push ${batch.length} URL(s).`);
  else {
    try {
      const r = await fetch(`http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}&token=${encodeURIComponent(baidu)}`, { method: 'POST', headers: { 'content-type': 'text/plain' }, body: batch.join('\n'), signal: AbortSignal.timeout(20000) });
      const body = await r.text();
      console.log(`Baidu: HTTP ${r.status} ${body.slice(0, 200)}`);
      if (!r.ok) failed++;
    } catch (e) { console.log(`Baidu: ${e.message}`); failed++; }
  }
} else console.log('Baidu: skipped (no BAIDU_PUSH_TOKEN).');

const key = process.env.INDEXNOW_KEY;
if (key) {
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) { console.log('IndexNow: INDEXNOW_KEY must be 8-128 letters, digits or dashes.'); failed++; }
  else if (DRY) console.log(`[dry-run] IndexNow: would push ${ordered.length} URL(s).`);
  else {
    try {
      const r = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, signal: AbortSignal.timeout(20000),
        body: JSON.stringify({ host: 'mohitagw15856.github.io', key, keyLocation: `${BASE}/${key}.txt`, urlList: ordered.slice(0, 10000) }),
      });
      console.log(`IndexNow: HTTP ${r.status}`);
      if (r.status >= 400) failed++;
    } catch (e) { console.log(`IndexNow: ${e.message}`); failed++; }
  }
} else console.log('IndexNow: skipped (no INDEXNOW_KEY).');

// A failed ping is worth a warning, not a red deploy.
if (failed) console.log(`::warning::${failed} search-engine push(es) failed; the pages will still be found by crawling.`);
