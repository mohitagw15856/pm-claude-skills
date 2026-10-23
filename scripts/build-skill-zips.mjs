#!/usr/bin/env node
// One ZIP per skill, ready to upload to claude.ai (Settings, Skills, Upload skill),
// which makes the skill available in Claude and in Claude Duet. claude.ai expects
// the skill FOLDER inside the ZIP (<name>.zip contains <name>/SKILL.md); zipping
// the files directly is rejected as "missing required Skill.md file".
// Writes web/skill-zip/<name>.zip (gitignored; built at deploy). No dependencies.
//
//   node scripts/build-skill-zips.mjs            # every skill
//   node scripts/build-skill-zips.mjs --only a,b # just these (tests)
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skillsDir = join(root, 'skills');
const outDir = join(root, 'web', 'skill-zip');
const oi = process.argv.indexOf('--only');
const only = oi > 0 ? new Set(process.argv[oi + 1].split(',')) : null;

const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = (buf) => { let c = -1; for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; };

// A fixed timestamp (1 January 2026), so the same skill always builds the same bytes.
const DOS_TIME = 0, DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;

function zip(entries) {
  const locals = [], centrals = [];
  let offset = 0;
  for (const { name, data } of entries) {
    const nameBuf = Buffer.from(name, 'utf8');
    const comp = deflateRawSync(data, { level: 9 });
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6); local.writeUInt16LE(8, 8);
    local.writeUInt16LE(DOS_TIME, 10); local.writeUInt16LE(DOS_DATE, 12); local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(comp.length, 18); local.writeUInt32LE(data.length, 22); local.writeUInt16LE(nameBuf.length, 26); local.writeUInt16LE(0, 28);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x0800, 8); central.writeUInt16LE(8, 10);
    central.writeUInt16LE(DOS_TIME, 12); central.writeUInt16LE(DOS_DATE, 14); central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(comp.length, 20); central.writeUInt32LE(data.length, 24); central.writeUInt16LE(nameBuf.length, 28);
    central.writeUInt32LE(offset, 42);
    locals.push(local, nameBuf, comp); centrals.push(central, nameBuf);
    offset += 30 + nameBuf.length + comp.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...locals, cd, end]);
}

const files = (dir) => readdirSync(dir).flatMap((e) => { const p = join(dir, e); return statSync(p).isDirectory() ? files(p) : [p]; });

mkdirSync(outDir, { recursive: true });
let n = 0, bytes = 0;
for (const name of readdirSync(skillsDir).sort()) {
  if (only && !only.has(name)) continue;
  const dir = join(skillsDir, name);
  if (!existsSync(join(dir, 'SKILL.md'))) continue;
  const entries = files(dir).filter((p) => !p.endsWith('.DS_Store')).sort().map((p) => ({ name: `${name}/${relative(dir, p).split(sep).join('/')}`, data: readFileSync(p) }));
  const buf = zip(entries);
  writeFileSync(join(outDir, `${name}.zip`), buf);
  n++; bytes += buf.length;
}
console.log(`Wrote web/skill-zip/: ${n} skill ZIPs, ${(bytes / 1048576).toFixed(1)} MB, each with the skill folder at its root.`);
