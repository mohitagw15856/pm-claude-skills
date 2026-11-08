// Unpack an offline bundle (scripts/build-offline-bundle.mjs) for `serve --bundle`.
// The archive is .tar.zst or .tar.gz; it is decompressed with Node's zlib and
// extracted once into <stateDir>/offline/<archive name>/, then reused. Returns
// the directory that holds org/, web/ and skills/.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import * as zlib from 'node:zlib';

export function unpackBundle(file, stateDir) {
  if (!file || file.startsWith('--')) throw new Error('--bundle needs the path to a pm-skills-offline-<version>.tar.zst or .tar.gz file.');
  const archive = resolve(file);
  if (!existsSync(archive)) throw new Error(`Bundle not found: ${archive}`);
  const name = basename(archive).replace(/\.tar\.(zst|gz)$/, '');
  const dest = join(stateDir, 'offline', name);
  const marker = join(dest, '.unpacked');
  if (existsSync(marker) && statSync(marker).mtimeMs >= statSync(archive).mtimeMs) return dest;
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  const packed = readFileSync(archive);
  let tar;
  if (archive.endsWith('.zst')) {
    if (typeof zlib.zstdDecompressSync !== 'function') throw new Error(`Reading a .tar.zst bundle needs Node 22.15 or newer (this is ${process.version}); download the .tar.gz instead.`);
    tar = zlib.zstdDecompressSync(packed);
  } else if (archive.endsWith('.gz')) tar = zlib.gunzipSync(packed);
  else throw new Error('The bundle must end in .tar.zst or .tar.gz.');
  const tarPath = join(dest, 'bundle.tar');
  writeFileSync(tarPath, tar);
  const r = spawnSync('tar', ['-xf', tarPath, '-C', dest], { stdio: 'inherit' });
  rmSync(tarPath, { force: true });
  if (r.status !== 0) throw new Error('tar could not extract the bundle.');
  if (!existsSync(join(dest, 'org', 'server.mjs'))) throw new Error('This bundle has no org/server.mjs; it was built with --no-web. Use the default bundle for serve.');
  writeFileSync(marker, new Date().toISOString() + '\n');
  console.log(`Unpacked ${basename(archive)} into ${dest}`);
  return dest;
}
