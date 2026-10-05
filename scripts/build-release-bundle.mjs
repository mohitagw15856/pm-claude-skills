#!/usr/bin/env node
// A verifiable release bundle: every skill in one deterministic tarball, a
// CycloneDX SBOM listing each SKILL.md with its SHA-256, and a checksum file.
// The deploy signs both with GitHub's Sigstore-backed build provenance
// (actions/attest-build-provenance), so anyone can prove a copy came from this
// repository: `gh attestation verify <file> -R mohitagw15856/pm-claude-skills`.
// `npx pm-claude-skills verify --release` checks installed skills against the SBOM.
//
// Releases are immutable, so the files are served from Pages:
//   /releases/pm-skills-<version>.tar.gz   (+ .sha256)
//   /releases/pm-skills-<version>.sbom.cdx.json
//   /releases/latest.json
//
//   node scripts/build-release-bundle.mjs [--out web/releases]
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
if (argv.includes('--help') || argv.includes('-h')) {
  console.log('Usage: node scripts/build-release-bundle.mjs [--out web/releases]');
  process.exit(0);
}
const oi = argv.indexOf('--out');
const OUT = resolve(root, oi !== -1 && argv[oi + 1] ? argv[oi + 1] : 'web/releases');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const VERSION = pkg.version;
const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

// What goes in: the skills, their translations and the bundle manifests, plus the licence.
const INCLUDE = ['skills', 'skills-i18n', 'plugins', 'LICENSE', 'package.json'];
const files = [];
const walk = (p) => {
  const st = statSync(p);
  if (st.isDirectory()) { for (const e of readdirSync(p).sort()) if (!e.startsWith('.')) walk(join(p, e)); }
  else files.push(p);
};
for (const i of INCLUDE) if (existsSync(join(root, i))) walk(join(root, i));
files.sort();

// Minimal deterministic ustar writer: fixed mtime, owner and mode, sorted paths.
function header(name, size) {
  const h = Buffer.alloc(512, 0);
  let prefix = '';
  if (Buffer.byteLength(name) > 100) { const cut = name.lastIndexOf('/', 154); prefix = name.slice(0, cut); name = name.slice(cut + 1); }
  if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) throw new Error(`path too long for ustar: ${prefix}/${name}`);
  const put = (str, off, len) => h.write(str, off, len, 'utf8');
  const oct = (n, len) => n.toString(8).padStart(len - 1, '0') + '\0';
  put(name, 0, 100); put(oct(0o644, 8), 100, 8); put(oct(0, 8), 108, 8); put(oct(0, 8), 116, 8);
  put(oct(size, 12), 124, 12); put(oct(1577836800, 12), 136, 12); // 2020-01-01T00:00:00Z
  put('        ', 148, 8); put('0', 156, 1); put('ustar\0', 257, 6); put('00', 263, 2); put(prefix, 345, 155);
  let sum = 0; for (const b of h) sum += b;
  put(sum.toString(8).padStart(6, '0') + '\0 ', 148, 8);
  return h;
}
const chunks = [];
const components = [];
for (const f of files) {
  const rel = relative(root, f).split(sep).join('/');
  const data = readFileSync(f);
  chunks.push(header(`pm-skills-${VERSION}/${rel}`, data.length), data, Buffer.alloc((512 - (data.length % 512)) % 512, 0));
  const m = rel.match(/^(skills|skills-i18n\/[^/]+)\/([^/]+)\/SKILL\.md$/);
  if (m) components.push({
    type: 'data', 'bom-ref': rel, name: m[2], group: m[1] === 'skills' ? 'skills' : m[1].replace('skills-i18n/', 'skills-i18n:'),
    version: VERSION, hashes: [{ alg: 'SHA-256', content: sha256(data) }], properties: [{ name: 'path', value: rel }],
  });
}
chunks.push(Buffer.alloc(1024, 0));
const tar = Buffer.concat(chunks);
const tgz = gzipSync(tar, { level: 9 });
// gzip carries an mtime in bytes 4-7 and an OS byte; zero them so the archive is byte-for-byte reproducible.
tgz.writeUInt32LE(0, 4); tgz[9] = 255;

const base = `pm-skills-${VERSION}`;
const tgzHash = sha256(tgz);
const sbom = {
  bomFormat: 'CycloneDX', specVersion: '1.5', serialNumber: `urn:uuid:${createHash('sha1').update(`${base}:${tgzHash}`).digest('hex').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12}).*$/, '$1-$2-$3-$4-$5')}`, version: 1,
  metadata: {
    component: { type: 'application', name: 'pm-claude-skills', version: VERSION, purl: `pkg:npm/pm-claude-skills@${VERSION}`, hashes: [{ alg: 'SHA-256', content: tgzHash }],
      externalReferences: [{ type: 'vcs', url: 'https://github.com/mohitagw15856/pm-claude-skills' }] },
    licenses: [{ license: { id: 'MIT' } }],
  },
  components,
};
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, `${base}.tar.gz`), tgz);
writeFileSync(join(OUT, `${base}.tar.gz.sha256`), `${tgzHash}  ${base}.tar.gz\n`);
writeFileSync(join(OUT, `${base}.sbom.cdx.json`), JSON.stringify(sbom, null, 2) + '\n');
writeFileSync(join(OUT, 'latest.json'), JSON.stringify({
  version: VERSION, bundle: `${base}.tar.gz`, sha256: tgzHash, sbom: `${base}.sbom.cdx.json`, skills: components.filter((c) => c.group === 'skills').length,
  verify: `gh attestation verify ${base}.tar.gz -R mohitagw15856/pm-claude-skills`,
}, null, 2) + '\n');
console.log(`Wrote ${base}.tar.gz (${(tgz.length / 1048576).toFixed(1)} MB, ${files.length} files) and an SBOM of ${components.length} SKILL.md files to ${OUT.replace(`${root}/`, '')}/.`);
