#!/usr/bin/env node
// The claude.ai ZIPs (scripts/build-skill-zips.mjs): each holds the skill folder
// at its root (<name>/SKILL.md), which claude.ai requires, and every entry's CRC
// matches its data. Builds two skills into a temporary copy of the output folder.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateRawSync } from 'node:zlib';
import assert from 'node:assert/strict';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
execFileSync(process.execPath, [join(root, 'scripts', 'build-skill-zips.mjs'), '--only', 'standing-orders,excel-model'], { stdio: 'ignore' });
const CRC = new Int32Array(256).map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c; });
const crc32 = (b) => { let c = -1; for (const x of b) c = CRC[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ -1) >>> 0; };
for (const name of ['standing-orders', 'excel-model']) {
  const buf = readFileSync(join(root, 'web', 'skill-zip', `${name}.zip`));
  const eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const names = [];
  for (let i = 0; i < count; i++) {
    const nameLen = buf.readUInt16LE(p + 28), extra = buf.readUInt16LE(p + 30), comment = buf.readUInt16LE(p + 32);
    const crc = buf.readUInt32LE(p + 16), local = buf.readUInt32LE(p + 42), size = buf.readUInt32LE(p + 20);
    const entry = buf.slice(p + 46, p + 46 + nameLen).toString('utf8');
    const lName = buf.readUInt16LE(local + 26), lExtra = buf.readUInt16LE(local + 28);
    const data = inflateRawSync(buf.slice(local + 30 + lName + lExtra, local + 30 + lName + lExtra + size));
    assert.equal(crc32(data), crc, `${name}: CRC mismatch for ${entry}`);
    names.push(entry);
    p += 46 + nameLen + extra + comment;
  }
  assert.ok(names.includes(`${name}/SKILL.md`), `${name}: SKILL.md must sit inside the ${name}/ folder`);
  assert.ok(names.every((n) => n.startsWith(`${name}/`)), `${name}: every entry must be inside the skill folder`);
}
console.log('Skill ZIPs for claude.ai: folder at the root, CRCs valid. ✓');
