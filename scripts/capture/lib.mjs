// Shared helpers for the README capture scripts in scripts/capture/.
// Playwright is not a repo dependency: point NODE_PATH at any node_modules that has
// playwright or playwright-core, e.g.
//   NODE_PATH=/path/to/node_modules node scripts/capture/record-search.mjs
// The browser is the newest cached Playwright Chromium, or CHROMIUM_PATH if set.
import { createRequire } from 'node:module';
import { existsSync, readdirSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const assets = join(root, 'docs', 'readme-assets');

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const name of ['playwright', 'playwright-core']) {
    try { return require(name); } catch { /* try the next */ }
  }
  console.error('Playwright not found. Set NODE_PATH to a node_modules containing playwright or playwright-core.');
  process.exit(1);
}

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = process.platform === 'darwin' ? join(homedir(), 'Library', 'Caches', 'ms-playwright') : join(homedir(), '.cache', 'ms-playwright');
  if (!existsSync(cache)) return undefined;
  const dirs = readdirSync(cache).filter((d) => /^chromium-\d+$/.test(d)).sort((a, b) => +b.split('-')[1] - +a.split('-')[1]);
  for (const d of dirs) {
    for (const rel of [
      'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      'chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
      'chrome-linux/chrome', 'chrome-linux64/chrome',
    ]) {
      const p = join(cache, d, rel);
      if (existsSync(p)) return p;
    }
  }
  return undefined;
}

export async function launch() {
  const { chromium } = loadPlaywright();
  return chromium.launch({ executablePath: findChromium(), args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2' };

// A throwaway static server so pages can fetch() their JSON. Returns { url, close }.
export function serve(dir) {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = join(dir, path);
      if (path.endsWith('/')) file = join(file, 'index.html');
      try {
        const body = await readFile(file);
        res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
        res.end(body);
      } catch { res.writeHead(404); res.end(); }
    });
    server.listen(0, '127.0.0.1', () => resolve({ url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((r) => server.close(r)) }));
  });
}

// Encode PNG frames (each with a duration in ms) into an animated lossy WebP with img2webp.
export function encodeWebp(frames, outFile, quality = 70) {
  const args = ['-loop', '0', '-lossy', '-q', String(quality), '-m', '6', '-mixed'];
  for (const { file, ms } of frames) args.push('-d', String(Math.round(ms)), file);
  args.push('-o', outFile);
  const r = spawnSync(process.env.IMG2WEBP || 'img2webp', args, { stdio: ['ignore', 'ignore', 'inherit'] });
  if (r.status !== 0) { console.error('img2webp failed (install libwebp: brew install webp)'); process.exit(1); }
}
